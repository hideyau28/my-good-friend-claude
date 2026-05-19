import { getLunar } from 'chinese-lunar-calendar'

const CHINESE_DIGITS = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const CHINESE_WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

/**
 * Convert a number to traditional Chinese era digits.
 * 2026 → 二〇二六
 * 19  → 一九
 */
function toChineseEra(n: number): string {
  return String(n)
    .split('')
    .map((d) => CHINESE_DIGITS[Number(d)])
    .join('')
}

/**
 * Format a date in the 副刊 masthead style:
 *   二〇二六年五月十九日 · 星期二 · 農曆四月初三
 */
export function formatMastheadDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(d.getTime())) return ''

  const yyyy = toChineseEra(d.getFullYear())
  const m = d.getMonth() + 1
  const day = d.getDate()
  const weekday = CHINESE_WEEKDAYS[d.getDay()]

  const lunar = getLunar(d.getFullYear(), m, day)
  const lunarStr = lunar?.dateStr ?? ''

  return `${yyyy}年${m}月${day}日 · 星期${weekday}${lunarStr ? ` · 農曆${lunarStr}` : ''}`
}

/**
 * Short ISO-ish display: 2026/5/19
 */
export function formatShortDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(d.getTime())) return ''
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}

/**
 * Issue number → 第 024 期（zero-padded to 3 digits）
 */
export function formatIssueNumber(issue: number): string {
  return `第 ${String(issue).padStart(3, '0')} 期`
}
