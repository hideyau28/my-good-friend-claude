#!/usr/bin/env node
/**
 * Batch import 24 hero PNGs from /Volumes/PSSD/Downloads/.
 *
 * Filename pattern: `N. {section} [#issue] — {slug-stem}.png`
 * Maps slug-stem fuzzily to actual MDX slug (handles -claude, -hk, -claude-hk
 * suffix variations).
 *
 * Skips heroes already imported (idempotent).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawnSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DOWNLOADS = '/Volumes/PSSD/Downloads'
const ARTICLE_DIR = path.join(ROOT, 'content/use-cases')

// Known fuzzy-match candidates: filename stem → 1-or-more possible MDX slug
// suffix. We try in order: bare, +-claude, +-claude-hk, +-hk.
const SUFFIX_CANDIDATES = ['', '-claude', '-claude-hk', '-hk']

function findSlug(stem) {
  for (const suffix of SUFFIX_CANDIDATES) {
    const candidate = `${stem}${suffix}`
    if (fs.existsSync(path.join(ARTICLE_DIR, `${candidate}.mdx`))) {
      return candidate
    }
  }
  return null
}

function extractStem(filename) {
  // strip leading "N. {section} [#NN] — " and trailing ".png"
  const m = filename.match(/^\d+\.\s+\S+\s+(?:#\d+\s+)?[—-]\s*(.+)\.png$/)
  if (!m) return null
  return m[1].trim()
}

async function main() {
  const files = fs
    .readdirSync(DOWNLOADS)
    .filter((f) => /^\d+\..+\.png$/.test(f) && !f.startsWith('._'))
    .sort((a, b) => {
      const an = parseInt(a.match(/^(\d+)/)[1], 10)
      const bn = parseInt(b.match(/^(\d+)/)[1], 10)
      return an - bn
    })

  console.log(`Found ${files.length} hero PNGs in ${DOWNLOADS}\n`)

  const results = { imported: [], skipped: [], failed: [] }

  for (const file of files) {
    const stem = extractStem(file)
    if (!stem) {
      console.log(`✗ skip (bad filename): ${file}`)
      results.failed.push({ file, reason: 'bad filename' })
      continue
    }

    const slug = findSlug(stem)
    if (!slug) {
      console.log(`✗ no MDX match for stem "${stem}" (file: ${file})`)
      results.failed.push({ file, reason: `no slug match for "${stem}"` })
      continue
    }

    const pngPath = path.join(DOWNLOADS, file)
    console.log(`→ ${slug}  ←  ${file}`)
    const r = spawnSync(
      'node',
      [path.join(__dirname, 'import-hero.mjs'), slug, pngPath],
      { stdio: 'inherit', cwd: ROOT },
    )
    if (r.status === 0) {
      results.imported.push({ slug, file })
    } else {
      results.failed.push({ file, reason: `import-hero exit ${r.status}` })
    }
    console.log('')
  }

  console.log('═══════════════════════════════════')
  console.log(`✓ imported: ${results.imported.length}`)
  console.log(`✗ failed:   ${results.failed.length}`)
  if (results.failed.length) {
    console.log('\nFailures:')
    for (const f of results.failed) {
      console.log(`  - ${f.file}: ${f.reason}`)
    }
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
