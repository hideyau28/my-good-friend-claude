// 廣東話清理診斷掃描器（純讀，唔改任何嘢）
// 用法：node scripts/scan-cantonese.mjs
// 規則 source of truth：docs/cantonese-style-guide.md（第二版）
//
// 計法：只將「全細楷」英文字當「疑似中英夾雜」(low)，因為真正要清嘅夾雜
// 多數係 mid-sentence 細楷字（reject / client / review）。大寫開頭嘅專有
// 名詞、ALL-CAPS 縮寫另立 prop 欄當參考，唔當違規。
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = 'content/use-cases';

// §1 可保留英文白名單（lowercased 單 token；multiword 拆成單字）
const WHITELIST = new Set([
  'claude', 'claude.md', 'claude.ai', 'chat', 'code', 'projects', 'ai', 'chatgpt', 'gemini', 'copilot', 'cursor',
  'dse', 'jupas', 'ib', 'gce', 'ielts', 'igcse', 'ap', 'sat',
  'whatsapp', 'telegram', 'signal', 'instagram', 'youtube', 'discord', 'slack', 'notion', 'google', 'sheets', 'docs',
  'api', 'prompt', 'workflow', 'dashboard', 'automation', 'next.js', 'next', 'js', 'vercel',
  'typescript', 'mdx', 'seo', 'mcp', 'sdk', 'cli', 'git', 'github', 'ide', 'vs', 'json', 'html', 'css',
  'ok', 'sorry', 'cafe', 'podcast', 'gp', 'eap',
  'app', 'email', 'link', 'post', 'ui', 'ux', 'it',
  'cv', 'interview', 'offer',
  'keep', 'send', 'share',
  'counsellor', 'ptsd', 'adhd', 'ocd',
  'tutor', 'mock',
]);

const CLEANED = new Set([
  'dse-prep-mental-claude', 'claude-code-install-claude', 'claude-code-claudemd-mastery',
  'cowork-dse-study-plan-automation', 'parent-teacher-feedback-claude', 'mental-health-journaling-claude',
]);

const MAINLAND = ['視頻', '屏幕', '質量', '激活', '給力', '走心', '靠譜'];

function buildScanText(raw) {
  let body = raw;
  let fm = '';
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (m) {
    body = raw.slice(m[0].length);
    for (const key of ['title', 'description']) {
      const v = m[1].match(new RegExp('^' + key + ':\\s*(.*)$', 'm'));
      if (v) fm += ' ' + v[1].replace(/^["']|["']$/g, '');
    }
  }
  body = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/^\s*(import|export)\s.*$/gm, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/<\/?[A-Za-z][^>]*>/g, ' ');
  return fm + ' ' + body;
}

function analyze(slug, raw) {
  const text = buildScanText(raw);
  const tokens = text.match(/[A-Za-z][A-Za-z]*(?:[.'\-][A-Za-z]+)*/g) || [];
  const lowFreq = new Map();
  const propFreq = new Map();
  let low = 0, prop = 0;
  for (const t of tokens) {
    if (t.replace(/[^A-Za-z]/g, '').length < 2) continue;
    const key = t.toLowerCase();
    if (WHITELIST.has(key)) continue;
    if (/[A-Z]/.test(t)) { prop++; propFreq.set(t, (propFreq.get(t) || 0) + 1); }
    else { low++; lowFreq.set(key, (lowFreq.get(key) || 0) + 1); }
  }
  const chars = text.replace(/\s+/g, '').length || 1;
  const density = +(low / chars * 1000).toFixed(1);
  let banned = 0;
  const bannedHits = [];
  for (const w of MAINLAND) {
    const n = text.split(w).length - 1;
    if (n > 0) { banned += n; bannedHits.push(`${w}×${n}`); }
  }
  const zhu = text.match(/[A-Za-z]{2,}\s?(?:咗|緊|過)/g) || [];
  const top = [...lowFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 7).map(([w, n]) => `${w}×${n}`);
  const topProp = [...propFreq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([w, n]) => `${w}×${n}`);
  return { slug, low, prop, density, banned, bannedHits, zhu: zhu.length, zhuHits: [...new Set(zhu)].slice(0, 4), top, topProp };
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.mdx'));
const results = files.map((f) => analyze(f.replace(/\.mdx$/, ''), readFileSync(join(DIR, f), 'utf8')));
results.sort((a, b) => b.low - a.low);

const totalLow = results.reduce((s, r) => s + r.low, 0);
const totalProp = results.reduce((s, r) => s + r.prop, 0);
const totalBanned = results.reduce((s, r) => s + r.banned, 0);
const totalZhu = results.reduce((s, r) => s + r.zhu, 0);

console.log('\n=== 疑似中英夾雜掃描 (baseline) ===');
console.log(`檔案數                        : ${results.length}`);
console.log(`細楷英文 token (low, 真信號)   : ${totalLow}`);
console.log(`大寫專有名詞/縮寫 (prop, 參考) : ${totalProp}`);
console.log(`大陸用語命中                   : ${totalBanned}`);
console.log(`英文動詞+助詞命中              : ${totalZhu}`);

console.log('\n=== Top 45 (按細楷英文字數排序) ===');
console.log('  # | low | dens | 禁 | 助 | slug');
results.slice(0, 45).forEach((r, i) => {
  const mark = CLEANED.has(r.slug) ? ' ★已清' : '';
  console.log(`${String(i + 1).padStart(3)} |${String(r.low).padStart(4)} |${String(r.density).padStart(5)} |${String(r.banned).padStart(3)} |${String(r.zhu).padStart(3)} | ${r.slug}${mark}`);
  console.log(`      └ ${r.top.join(', ')}${r.bannedHits.length ? '  ⚠禁:' + r.bannedHits.join(',') : ''}${r.zhuHits.length ? '  ⚠助:' + r.zhuHits.join(',') : ''}`);
});

console.log('\n=== 其餘 46-141 (一行式) ===');
results.slice(45).forEach((r, i) => {
  const mark = CLEANED.has(r.slug) ? ' ★' : '';
  process.stdout.write(`${String(i + 46).padStart(3)}.${r.slug}(${r.low})${mark}  `);
  if ((i + 1) % 3 === 0) process.stdout.write('\n');
});

console.log('\n\n=== 大陸用語命中（必清，低誤報）===');
results.filter((r) => r.banned > 0).forEach((r) => console.log(`${r.slug}: ${r.bannedHits.join(', ')}`));

console.log('\n=== 嗰 6 篇「已清」現狀 (verify) ===');
results.filter((r) => CLEANED.has(r.slug)).sort((a, b) => b.low - a.low).forEach((r) => {
  console.log(`${r.slug}: low=${r.low} dens=${r.density} 禁=${r.banned} 助=${r.zhu} | ${r.top.join(', ')}`);
});
