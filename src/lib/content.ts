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
  '寵物',
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
  寵物: '獸醫 · 飲食 · 行為',
  生活: '醫健 · 飲食 · 行程',
  文化: '寫作 · 創作 · 翻譯',
  科技: 'Code · 工具 · 設定',
  遊戲: '攻略 · 抽卡 · 玩 game 輔助',
  其他: '冇得分類嘅冷門 use case',
}

// Tool-tier badge — 喺 card 上面顯示用咩 Claude 路徑
export const CATEGORY_BADGES: Record<Category, { label: string; symbol: string }> = {
  chat: { label: '入門', symbol: '💬' },
  cowork: { label: '進階', symbol: '🔧' },
  code: { label: '進深', symbol: '⚡' },
}

// Curriculum framing for /learn/[tier] landing pages
export const TIER_CURRICULUM: Record<
  Category,
  {
    eyebrow: string
    title: string
    intro: string
    learnings: string[]
    prereq: string
    nextTier: Category | null
    nextTeaser: string
  }
> = {
  chat: {
    eyebrow: '第 一 階',
    title: 'Claude Chat · 零門檻起步',
    intro:
      '識用 WhatsApp 就識用。打字傾偈、問問題、寫嘢、做決定——日常生活就用得，唔使裝任何嘢、唔使學 prompt engineering。',
    learnings: [
      '由「我唔識用 AI」到識傾出有用嘅 output',
      '揀啱用例：邊類嘢真係慳到時間，邊類唔好交畀 AI',
      '建立日常 workflow：每日用 Claude 做幾樣固定嘢',
    ],
    prereq: '冇前置條件。打開 claude.ai，就由呢度入手。',
    nextTier: 'cowork',
    nextTeaser: '想啲嘢自動幫你做？跳去 Cowork →',
  },
  cowork: {
    eyebrow: '第 二 階',
    title: 'Cowork · 自動化你日日做嘅嘢',
    intro:
      '熟手用 Chat 之後，下一步係用 Projects 同 Skills 整 workflow。重覆嘅嘢——客人查詢、報表整理、social media post——交畀 Claude，唔使每次都從零問。',
    learnings: [
      '用 Projects 將 context（公司文件、品牌 voice）餵畀 Claude',
      '用 Skills / Artifacts 將 prompt 變成 reusable template',
      '同其他 tool（Sheets、Notion、Slack）做 lightweight integration',
    ],
    prereq: '識用 Claude Chat 一個月以上，知道自己嘅 daily prompt pattern。',
    nextTier: 'code',
    nextTeaser: '想完全 own 個 workflow？學 Claude Code →',
  },
  code: {
    eyebrow: '第 三 階',
    title: 'Claude Code · 用 CLI 落實做嘢',
    intro:
      '由開 terminal 到部署網站，一步一步落手做出嚟。唔需要係 senior dev——識少少 code，想真正 ship 嘢嘅人都用得。',
    learnings: [
      'Claude Code CLI 嘅 setup + 第一個項目',
      '同 Git / GitHub / Vercel 等工具配合',
      '由 prompt 到 production：planning、test、deploy 嘅 loop',
    ],
    prereq: '見過 terminal、會 git clone。唔使係全職開發者。',
    nextTier: null,
    nextTeaser: '',
  },
}

// 揀「Suggested First Read」：tier 入面 difficulty 最低 + featured 優先
export function pickFirstRead(useCases: UseCase[]): UseCase | undefined {
  const sorted = [...useCases].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1
    if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty
    return a.issue - b.issue
  })
  return sorted[0]
}
