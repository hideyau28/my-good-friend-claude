import { useCases } from '#site/content'

export type UseCase = (typeof useCases)[number]

export function getAllUseCases(): UseCase[] {
  return [...useCases].sort((a, b) => b.issue - a.issue)
}

export function getFeaturedUseCases(limit = 6): UseCase[] {
  return getAllUseCases()
    .filter((u) => u.featured)
    .slice(0, limit)
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug)
}

export function getRelatedUseCases(useCase: UseCase, limit = 2): UseCase[] {
  const related = useCase.related
    .map(getUseCaseBySlug)
    .filter((u): u is UseCase => Boolean(u))
  if (related.length >= limit) return related.slice(0, limit)
  // 不夠就 fall back 揀同 audience 或同 category 嘅其他 use case
  const fallback = getAllUseCases().filter(
    (u) =>
      u.slug !== useCase.slug &&
      !related.find((r) => r.slug === u.slug) &&
      (u.category === useCase.category ||
        u.audience.some((a) => useCase.audience.includes(a))),
  )
  return [...related, ...fallback].slice(0, limit)
}

export const CATEGORY_LABELS = {
  chat: { name: 'Claude Chat', cn: '日常用 · 零門檻' },
  cowork: { name: 'Cowork', cn: '自動化 · 進階' },
  code: { name: 'Claude Code', cn: '開發者 · 進深' },
} as const

export const CATEGORIES = ['chat', 'cowork', 'code'] as const
export type Category = (typeof CATEGORIES)[number]

export const AUDIENCES = ['打工仔', '老闆', '學生家長', '創作者', '消費者'] as const
export type Audience = (typeof AUDIENCES)[number]

// 報紙版面 — 讀者揾文章嘅主要 axis（按報紙版次序排）
export const SECTIONS = [
  '財經',
  '職場',
  '商家',
  '親子',
  '生活',
  '文化',
  '科技',
  '遊戲',
  '其他',
] as const
export type Section = (typeof SECTIONS)[number]

// Section 副標題 — newspaper masthead style
export const SECTION_DESCRIPTIONS: Record<Section, string> = {
  財經: '報稅 · 保險 · 投資',
  職場: '搵工 · 合約 · 寫嘢',
  商家: '小店 · 自動化 · 出單',
  親子: '功課 · 學校 · 教養',
  生活: '醫健 · 飲食 · 行程',
  文化: '寫作 · 創作 · 翻譯',
  科技: 'Code · 工具 · 設定',
  遊戲: '遊戲 · 娛樂（即將上線）',
  其他: '冇得分類嘅冷門 use case',
}

// Tool-tier badge — 喺 card 上面顯示用咩 Claude 路徑
export const CATEGORY_BADGES: Record<Category, { label: string; symbol: string }> = {
  chat: { label: '入門', symbol: '💬' },
  cowork: { label: '進階', symbol: '🔧' },
  code: { label: '進深', symbol: '⚡' },
}
