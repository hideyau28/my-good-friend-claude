/**
 * Tools registry — 連結文章「toolsNeeded」field 落實際 URL。
 *
 * 一個 use case 文章嘅 frontmatter 寫住 `toolsNeeded: ["Claude Chat", "Notion"]`。
 * 文章頁面尾部會自動 render `<ArticleTools />`，每個 tool 出 link。
 *
 * Affiliate URL：當 Anthropic / Notion / 第三方 partner program 有 affiliate code，
 * 直接喺呢個 file `affiliateUrl` field 填，公開地 disclose（hasAffiliate = true）。
 *
 * 加新 tool：直接喺呢個 file 加 entry。Slug 配對行 case-insensitive partial match
 * （見 `findTool` function），所以 toolsNeeded 寫「Claude Code CLI」或「Claude Code」
 * 都會 match 到同一個 entry。
 */

export interface ToolEntry {
  /** Canonical display name shown in the article footer block. */
  name: string
  /** Patterns from frontmatter `toolsNeeded` that should resolve to this tool.
   *  Case-insensitive substring match. Order matters (first matching pattern wins). */
  matches: string[]
  /** URL to link to. Use affiliateUrl below if applicable. */
  url: string
  /** Optional affiliate URL (overrides url if set). Disclose with hasAffiliate=true. */
  affiliateUrl?: string
  /** Set true when affiliateUrl is filled — UI shows「* affiliate」disclosure. */
  hasAffiliate?: boolean
  /** Short Cantonese description (~10–25 字) showing under the link. */
  description?: string
  /** Optional：免費 / 付費 / freemium — for transparency. */
  pricing?: 'free' | 'paid' | 'freemium'
}

const TOOLS: ToolEntry[] = [
  // ────────────── Anthropic / Claude ──────────────
  {
    name: 'Claude（Web / Mobile）',
    matches: ['Claude Chat', 'Claude.ai'],
    url: 'https://claude.ai/',
    description: '入門必備 — 免費版可以試，重 prep 嘅文要 Pro plan',
    pricing: 'freemium',
  },
  {
    name: 'Claude Desktop（Pro / Max plan）',
    matches: ['Claude Desktop', 'Claude Cowork', 'Pro/Max', 'Pro / Max'],
    url: 'https://claude.ai/download',
    description: 'Cowork 自動化要桌面版 + Pro 或 Max plan',
    pricing: 'paid',
  },
  {
    name: 'Claude Code CLI',
    matches: ['Claude Code', 'Claude Code CLI', 'Claude Code 安裝'],
    url: 'https://docs.claude.com/en/docs/claude-code/overview',
    description: '開發者用 — terminal 入面同 Claude pair coding',
    pricing: 'paid',
  },
  {
    name: 'Anthropic API key',
    matches: ['Anthropic API', 'API key'],
    url: 'https://console.anthropic.com/',
    description: '攞 API key 用 Claude Code / 接落自己 app',
    pricing: 'paid',
  },

  // ────────────── Dev tools ──────────────
  {
    name: 'GitHub',
    matches: ['GitHub'],
    url: 'https://github.com/',
    description: 'Repo hosting — 寫 code 必備',
    pricing: 'freemium',
  },
  {
    name: 'Cursor',
    matches: ['Cursor'],
    url: 'https://cursor.sh/',
    description: 'AI 編輯器 — Claude Code 嘅 IDE 競爭者',
    pricing: 'freemium',
  },

  // ────────────── Productivity / 工作 ──────────────
  {
    name: 'Notion',
    matches: ['Notion'],
    url: 'https://www.notion.com/',
    description: '筆記 + DB + wiki 一站搞掂',
    pricing: 'freemium',
  },
  {
    name: 'Google Workspace',
    matches: ['Google Sheet', 'Google Drive', 'Gmail', 'Google Calendar'],
    url: 'https://workspace.google.com/',
    description: 'Drive / Sheets / Gmail / Calendar 套裝',
    pricing: 'freemium',
  },
  {
    name: 'Outlook',
    matches: ['Outlook'],
    url: 'https://outlook.com/',
    description: 'Microsoft 嘅 email + calendar',
    pricing: 'freemium',
  },
  {
    name: 'Slack',
    matches: ['Slack'],
    url: 'https://slack.com/',
    description: 'Team chat — 多嘢 channel 嗰種',
    pricing: 'freemium',
  },

  // ────────────── 內容 / 創作 ──────────────
  {
    name: 'MacWhisper',
    matches: ['Whisper', 'MacWhisper'],
    url: 'https://goodsnooze.gumroad.com/l/macwhisper',
    description: 'Mac 本地跑 Whisper — 廣東話 transcription 最 reliable',
    pricing: 'freemium',
  },
  {
    name: 'Beehiiv（Newsletter platform）',
    matches: ['Beehiiv', 'newsletter'],
    url: 'https://www.beehiiv.com/',
    description: '我哋 newsletter 用緊嘅 platform',
    pricing: 'freemium',
  },
  {
    name: 'Substack',
    matches: ['Substack'],
    url: 'https://substack.com/',
    description: 'Newsletter 平台另一選擇',
    pricing: 'freemium',
  },

  // ────────────── E-commerce / SaaS ──────────────
  {
    name: 'Shopify',
    matches: ['Shopify'],
    url: 'https://www.shopify.com/',
    description: '開網店、checkout、payment 一條龍',
    pricing: 'paid',
  },
  {
    name: 'Stripe',
    matches: ['Stripe'],
    url: 'https://stripe.com/',
    description: 'Payment processing — SaaS 必備',
    pricing: 'paid',
  },
  {
    name: 'Vercel',
    matches: ['Vercel'],
    url: 'https://vercel.com/',
    description: 'Next.js 部署平台 — 呢個 site 都用緊',
    pricing: 'freemium',
  },
]

/**
 * Resolve a `toolsNeeded` string from frontmatter into a registered tool.
 * Case-insensitive substring match. Returns undefined if no entry found.
 */
export function findTool(toolName: string): ToolEntry | undefined {
  const lower = toolName.toLowerCase()
  return TOOLS.find((t) => t.matches.some((m) => lower.includes(m.toLowerCase())))
}

/**
 * Map an article's `toolsNeeded` array into a deduplicated list of resolved
 * ToolEntry objects. Unknown / fallback items are filtered out — these are
 * usually article-specific items like「過去 5 年旅遊紀錄」which aren't tools.
 */
export function resolveTools(toolsNeeded: readonly string[]): ToolEntry[] {
  const seen = new Set<string>()
  const result: ToolEntry[] = []
  for (const t of toolsNeeded) {
    const entry = findTool(t)
    if (entry && !seen.has(entry.name)) {
      seen.add(entry.name)
      result.push(entry)
    }
  }
  return result
}
