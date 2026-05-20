#!/usr/bin/env node
// Idempotently add `section:` field to every use-case MDX frontmatter based
// on the slug→section mapping below. Re-running is safe (skips files that
// already have a section).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIR = path.join(ROOT, 'content/use-cases')

const MAPPING = {
  // 財經
  'hong-kong-mortgage-comparison': '財經',
  'hong-kong-tax-prep-claude': '財經',
  'insurance-policy-review-claude': '財經',
  // 職場
  'apology-email-template-claude': '職場',
  'cover-letter-hong-kong-template': '職場',
  'claude-pdf-summary': '職場',
  'employment-contract-review-claude': '職場',
  'english-email-polish-hk': '職場',
  'linkedin-cold-outreach-claude': '職場',
  'resignation-letter-claude-hk': '職場',
  // 商家
  'cowork-auto-backup-files-photos': '商家',
  'cowork-expense-automation': '商家',
  'cowork-order-automation': '商家',
  'cowork-sales-pipeline-automation': '商家',
  'cowork-social-media-scheduler': '商家',
  'cowork-weekly-inbox-triage': '商家',
  'saas-tool-comparison-claude-hk': '商家',
  'whatsapp-customer-reply-hk': '商家',
  // 親子
  'claude-language-learning-conversation-partner': '親子',
  'claude-tsa-homework-hk': '親子',
  'critical-thinking-children-claude': '親子',
  'hong-kong-school-comparison-claude': '親子',
  'parent-teacher-feedback-claude': '親子',
  // 生活
  'doctor-visit-prep-claude': '生活',
  'restaurant-menu-allergy-filter-claude': '生活',
  'travel-itinerary-claude-day-by-day': '生活',
  'wedding-speech-claude-hong-kong': '生活',
  'whatsapp-group-chat-summary-claude': '生活',
  'youtube-transcript-summary-claude': '生活',
  // 文化
  'cantonese-to-written-claude': '文化',
  'claude-content-repurpose': '文化',
  'claude-fiction-writing-partner': '文化',
  'newsletter-editorial-calendar-claude': '文化',
  // 科技
  'claude-code-chrome-extension': '科技',
  'claude-code-legacy-codebase-onboarding': '科技',
  'claude-code-tutorial-website': '科技',
  'claude-code-vs-cursor-vs-copilot-hk': '科技',
  'mac-shortcut-claude-prompt': '科技',
  'run-local-llm-mac-claude-ollama': '科技',
  // 遊戲: (none yet)
  // 其他
  'hong-kong-tenancy-agreement-claude': '其他',
}

let updated = 0
let skipped = 0
let unmapped = []

for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith('.mdx')) continue
  const slug = f.replace(/\.mdx$/, '')
  const section = MAPPING[slug]
  if (!section) {
    unmapped.push(slug)
    continue
  }
  const filePath = path.join(DIR, f)
  const raw = fs.readFileSync(filePath, 'utf8')

  if (/^section:\s/m.test(raw)) {
    skipped++
    continue
  }

  // Insert `section:` right after the `category:` line, preserving indentation
  const next = raw.replace(
    /^(category:\s*"[^"]*")$/m,
    `$1\nsection: "${section}"`,
  )
  if (next === raw) {
    console.error(`could not insert section in ${f} (no category line found)`)
    continue
  }
  fs.writeFileSync(filePath, next)
  updated++
}

console.log(`updated: ${updated}`)
console.log(`skipped (already tagged): ${skipped}`)
if (unmapped.length) {
  console.log(`UNMAPPED (${unmapped.length}):`)
  unmapped.forEach((s) => console.log('  -', s))
}
