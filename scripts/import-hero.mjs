#!/usr/bin/env node
/**
 * Import a hero image for a use-case article:
 *  1. Convert PNG → webp (quality 85) into public/hero/{slug}.webp
 *  2. Add or update `heroImage:` line in the article's MDX frontmatter
 *
 * Usage:
 *   node scripts/import-hero.mjs <slug> <png-path>
 *
 * Example:
 *   node scripts/import-hero.mjs doctor-visit-prep-claude \
 *     "/Volumes/PSSD/Downloads/ChatGPT Image 2026年5月21日 上午11_30_00.png"
 *
 * Idempotent — re-running on the same slug just re-converts and re-writes
 * the frontmatter line.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

async function main() {
  const [, , slug, pngPath] = process.argv
  if (!slug || !pngPath) {
    console.error('Usage: node scripts/import-hero.mjs <slug> <png-path>')
    process.exit(1)
  }

  // 1. Verify article exists
  const mdxPath = path.join(ROOT, 'content/use-cases', `${slug}.mdx`)
  if (!fs.existsSync(mdxPath)) {
    console.error(`✗ article not found: content/use-cases/${slug}.mdx`)
    process.exit(1)
  }

  // 2. Verify source PNG
  if (!fs.existsSync(pngPath)) {
    console.error(`✗ source image not found: ${pngPath}`)
    process.exit(1)
  }

  // 3. Convert to webp
  const heroDir = path.join(ROOT, 'public/hero')
  fs.mkdirSync(heroDir, { recursive: true })
  const outPath = path.join(heroDir, `${slug}.webp`)
  const info = await sharp(pngPath).webp({ quality: 85 }).toFile(outPath)
  const kb = Math.round(info.size / 1024)
  console.log(`✓ converted: public/hero/${slug}.webp (${info.width}×${info.height}, ${kb} KB)`)

  // 4. Add or update heroImage in frontmatter (idempotent)
  const raw = fs.readFileSync(mdxPath, 'utf8')
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!fmMatch) {
    console.error('✗ could not parse frontmatter')
    process.exit(1)
  }
  const heroLine = `heroImage: "/hero/${slug}.webp"`
  let next
  if (/^heroImage:/m.test(fmMatch[1])) {
    next = raw.replace(/^heroImage:.*$/m, heroLine)
    console.log(`✓ updated heroImage in frontmatter`)
  } else {
    // Insert after `subcategory:` line, falling back to right before closing ---
    if (/^subcategory:.*$/m.test(fmMatch[1])) {
      next = raw.replace(/^(subcategory:.*)$/m, `$1\n${heroLine}`)
    } else {
      next = raw.replace(/^---\n([\s\S]*?)\n---/, `---\n$1\n${heroLine}\n---`)
    }
    console.log(`✓ added heroImage to frontmatter`)
  }
  fs.writeFileSync(mdxPath, next)
  console.log(`\nDone. Article: /use-cases/${slug}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
