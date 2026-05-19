import { Seal } from './Seal'
import { SectionLabel } from './ColumnRule'

/**
 * 訂閱區塊 — 副刊風格嘅 CTA。
 * 預設係 stub form，將來連 Beehiiv／ConvertKit API。
 */
export function NewsletterCTA() {
  return (
    <section
      id="newsletter"
      className="paper-grain border-y-[3px] border-[var(--color-rule-strong)] my-16"
    >
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <SectionLabel number="◉" label="訂閱本副刊" className="justify-center mb-6" />
        <h2 className="font-serif text-3xl md:text-4xl mb-3 text-[var(--color-ink)]">
          每週日早上，
          <br />
          一道新菜送到你 inbox。
        </h2>
        <p className="font-serif text-base text-[var(--color-ink-soft)] leading-relaxed mb-8 max-w-xl mx-auto">
          一篇 use case、一個香港情境、一個跟得到嘅做法。
          冇 sell course、冇話你「再唔學就會失業」。
        </p>
        <form
          action="/api/newsletter"
          method="post"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="你嘅 email"
            className="flex-1 px-4 py-3 font-sans bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-sm focus:outline-none focus:border-[var(--color-seal)]"
          />
          <button
            type="submit"
            className="px-6 py-3 font-serif font-bold bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-seal-deep)] transition-colors rounded-sm"
          >
            訂閱
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-serif text-[var(--color-ink-mute)]">
          <Seal char="證" size={20} />
          <span>免費 · 隨時退訂 · 唔會 spam</span>
        </div>
      </div>
    </section>
  )
}
