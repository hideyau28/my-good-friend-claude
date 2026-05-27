import { resolveTools, type ToolEntry } from '@/lib/tools-registry'

interface ArticleToolsProps {
  toolsNeeded: readonly string[]
}

/**
 * 文末「文中工具」block — 將文章 frontmatter 嘅 toolsNeeded array
 * 轉做有 link 嘅 list，方便讀者一 click 落單 / sign up。
 *
 * 設計原則：
 * - 唔做 banner / pop-up — anti-hype voice，副刊感
 * - 只 list 文中真係提過嘅 tool（從 toolsNeeded resolve，registry 入面有 entry 嗰啲）
 * - 任何 affiliate link 都明確標「* affiliate」disclosure
 * - 樣式：serif、paper grain、square border、跟 Site design system
 */
export function ArticleTools({ toolsNeeded }: ArticleToolsProps) {
  const tools = resolveTools(toolsNeeded)
  if (tools.length === 0) return null

  const hasAnyAffiliate = tools.some((t) => t.hasAffiliate)

  return (
    <section
      aria-labelledby="article-tools-heading"
      className="max-w-3xl mx-auto px-6 my-12"
    >
      <div className="border border-[var(--color-rule)] bg-[var(--color-paper-2)] p-6 md:p-7">
        <div className="flex items-baseline gap-3 mb-5 pb-3 border-b border-[var(--color-rule-soft)]">
          <span className="seal-text font-black text-sm tracking-wider">◉</span>
          <h3
            id="article-tools-heading"
            className="font-serif font-black text-base md:text-lg text-[var(--color-ink)] tracking-wide uppercase"
          >
            文中工具 · 連結
          </h3>
        </div>

        <ul className="space-y-4">
          {tools.map((tool) => (
            <ToolRow key={tool.name} tool={tool} />
          ))}
        </ul>

        {hasAnyAffiliate && (
          <p className="mt-5 pt-4 border-t border-[var(--color-rule-soft)] font-serif text-xs text-[var(--color-ink-mute)] leading-relaxed">
            <span className="seal-text font-bold">*</span> 標咗 affiliate
            嘅連結，我哋幫你 sign up
            會收到少少 commission，唔影響你個價錢，亦唔影響我哋推薦邊個工具。
          </p>
        )}
      </div>
    </section>
  )
}

function ToolRow({ tool }: { tool: ToolEntry }) {
  const targetUrl = tool.affiliateUrl ?? tool.url
  const pricingLabel =
    tool.pricing === 'free'
      ? '免費'
      : tool.pricing === 'paid'
        ? '付費'
        : tool.pricing === 'freemium'
          ? '免費 / 付費 plan'
          : null

  return (
    <li className="font-serif">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <a
          href={targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[var(--color-ink)] underline underline-offset-2 hover:text-[var(--color-seal-deep)] transition-colors"
        >
          {tool.name}
          {tool.hasAffiliate && (
            <span
              className="ml-1 seal-text text-xs font-bold not-italic"
              title="Affiliate link — 詳情見下方"
              aria-label="affiliate link"
            >
              *
            </span>
          )}
        </a>
        {pricingLabel && (
          <span className="text-xs text-[var(--color-ink-mute)] tracking-wide">
            · {pricingLabel}
          </span>
        )}
      </div>
      {tool.description && (
        <p className="mt-1 text-sm text-[var(--color-ink-soft)] leading-relaxed">
          {tool.description}
        </p>
      )}
    </li>
  )
}
