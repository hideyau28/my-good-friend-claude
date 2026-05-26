import { Seal } from './Seal'
import { SectionLabel } from './ColumnRule'

/**
 * 訂閱區塊 — 副刊風格嘅 CTA。
 *
 * Form 嘅開關由 env var `NEXT_PUBLIC_NEWSLETTER_ENABLED` 控制：
 *   - 未設定 / falsy → show「即將開通」state + email fallback（誠實，唔扮 working）
 *   - "true"          → show 真 form，POST 去 /api/newsletter（需要 BEEHIIV_* env vars）
 *
 * Newsletter service 接通流程喺 HANDOFF.md「Newsletter backend」section。
 */
const CONTACT_EMAIL = 'yau@flowstudiohk.com'

function isEnabled() {
  return process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === 'true'
}

export function NewsletterCTA() {
  const enabled = isEnabled()
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

        {enabled ? <SignupForm /> : <ComingSoonFallback />}

        <div className="mt-6 flex items-center justify-center gap-2 text-xs font-serif text-[var(--color-ink-mute)]">
          <Seal char="證" size={20} />
          <span>免費 · 隨時退訂 · 唔會 spam</span>
        </div>
      </div>
    </section>
  )
}

function SignupForm() {
  return (
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
  )
}

function ComingSoonFallback() {
  return (
    <div className="max-w-md mx-auto">
      <div className="border border-[var(--color-rule)] bg-[var(--color-paper)] px-5 py-4 mb-4 font-serif">
        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
          <span className="seal-text font-bold">訂閱通道執緊緊</span>
          <br />
          newsletter service 仲未接通。想第一時間收到新文章——
          <br />
          直接 email 我哋寫一句「訂閱」就得。
        </p>
      </div>
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('訂閱「我的好朋友 Claude」')}&body=${encodeURIComponent('我想訂閱每週日嘅 newsletter，新文上線時請通知我。')}`}
        className="inline-block px-6 py-3 font-serif font-bold bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-seal-deep)] transition-colors rounded-sm no-underline"
      >
        Email 「訂閱」畀我
      </a>
    </div>
  )
}
