import Link from 'next/link'
import { Masthead } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { Seal } from '@/components/design/Seal'
import { SectionLabel } from '@/components/design/ColumnRule'
import { EditorByline } from '@/components/design/EditorByline'
import { NewsletterCTA } from '@/components/design/NewsletterCTA'
import { UseCaseCard } from '@/components/use-case/UseCaseCard'
import { getAllUseCases, getFeaturedUseCases, CATEGORY_LABELS, type Category } from '@/lib/content'

export default function HomePage() {
  const featured = getFeaturedUseCases(6)
  const all = getAllUseCases()
  const totalUseCases = all.length
  const countByCategory = all.reduce<Record<Category, number>>(
    (acc, u) => ({ ...acc, [u.category]: (acc[u.category] ?? 0) + 1 }),
    { chat: 0, cowork: 0, code: 0 },
  )

  return (
    <>
      <Masthead />

      <main className="max-w-6xl mx-auto px-6">
        {/* ───────── 頭版 LEAD STORY ───────── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 pt-12 pb-16">
          <div>
            <SectionLabel number="頭版" label="LEAD STORY" className="mb-6" />
            <h2 className="font-serif font-black text-4xl md:text-6xl leading-[1.05] text-[var(--color-ink)] mb-6">
              教香港人實際落地用 Claude，由零開始一齊行。
            </h2>
            <p className="font-serif text-lg md:text-xl leading-relaxed text-[var(--color-ink-2)] mb-6 max-w-xl">
              打工仔、小店主、學生家長都用得——冇 demo、冇花巧，
              每一個 use case 都係由真實情境出發、有完整步驟、跟得到、做得到。
            </p>
            <EditorByline meta={`一個香港人 · 已寫 ${totalUseCases}+ 個 use case · 2,400+ 位讀者訂閱`} />
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/use-cases"
                className="px-6 py-3 font-serif font-bold bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-seal-deep)] transition-colors no-underline"
              >
                睇 Use Case →
              </Link>
              <Link
                href="/about"
                className="px-6 py-3 font-serif font-bold border-2 border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors no-underline"
              >
                點樣開始
              </Link>
            </div>
          </div>

          {/* 印章區塊 */}
          <aside className="flex flex-col items-center justify-center bg-[var(--color-paper-2)] border-2 border-[var(--color-rule-strong)] p-8 paper-grain">
            <Seal char="友" size={120} className="mb-6" />
            <p className="font-serif text-center text-sm text-[var(--color-ink-soft)] leading-relaxed">
              呢度冇人會 sell 你 course、
              <br />冇人會話你「再唔學 AI 就會失業」。
              <br />
              <br />
              只係一個用咗 Claude 兩年嘅
              <br />
              香港人，記低佢覺得真係 work 嘅做法。
            </p>
          </aside>
        </section>

        {/* ───────── 入門路徑 ───────── */}
        <section className="rule-double pt-12 pb-16">
          <SectionLabel number="01" label="三條入門路徑" className="mb-8" />
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-3">
            由邊度入手？睇你想做啲乜。
          </h2>
          <p className="font-serif text-lg text-[var(--color-ink-soft)] max-w-2xl mb-10">
            Claude 唔係一個 app，係三條入門路徑。由淺到深，揀啱你嗰條，唔使周圍試。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EntryCard
              num="01"
              category="chat"
              title="Claude Chat"
              subtitle={CATEGORY_LABELS.chat.cn}
              body="第一次用就由呢度入手。打字傾偈、問問題、寫 caption、改 email——識用 WhatsApp 就識用，唔使裝任何嘢。"
              count={countByCategory.chat}
              topics={['寫嘢', '搵資料', '日常決定']}
              cta="由 Chat 開始 →"
            />
            <EntryCard
              num="02"
              category="cowork"
              title="Cowork"
              subtitle={CATEGORY_LABELS.cowork.cn}
              body="想啲嘢自動幫你做？用 Projects 同 Skills 整 workflow。重覆嘅嘢交畀 Claude——客人查詢、報表整理，唔使次次問。"
              count={countByCategory.cowork}
              topics={['Projects', 'Skills', 'Artifacts', 'Sheets 整合']}
              cta="學自動化 →"
            />
            <EntryCard
              num="03"
              category="code"
              title="Claude Code"
              subtitle={CATEGORY_LABELS.code.cn}
              body="識少少 code、或者想學嘅人。由開 terminal 到部署網站，一步步落實做出嘢嚟。"
              count={countByCategory.code}
              topics={['安裝', 'Slash cmd', 'MCP', 'Subagents', 'Hooks', 'Worktrees']}
              cta="行入 Code →"
            />
          </div>
        </section>

        {/* ───────── 精選 use case ───────── */}
        <section className="rule-double pt-12 pb-16">
          <SectionLabel number="02" label="本期精選" className="mb-8" />
          <h2 className="font-serif font-black text-3xl md:text-5xl leading-tight mb-3">
            真實香港情境，跟住做就得。
          </h2>
          <p className="font-serif text-lg text-[var(--color-ink-soft)] max-w-2xl mb-10">
            唔係搬外國嘅例子。每個 use case 都係香港人日日撞到嘅情況，附完整步驟同 prompt。
          </p>
          {featured.length === 0 ? (
            <p className="font-serif text-[var(--color-ink-mute)] italic">
              （仲未有 featured use case，去 content/use-cases/ 加 frontmatter featured: true）
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {featured.map((uc, i) => (
                <UseCaseCard
                  key={uc.slug}
                  useCase={uc}
                  variant={i === 0 ? 'featured' : 'default'}
                />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link
              href="/use-cases"
              className="inline-block font-serif font-bold underline underline-offset-4 hover:text-[var(--color-seal-deep)]"
            >
              翻開成個 Use Case 庫 →
            </Link>
          </div>
        </section>
      </main>

      <NewsletterCTA />
      <Footer />
    </>
  )
}

function EntryCard({
  num,
  category,
  title,
  subtitle,
  body,
  count,
  topics,
  cta,
}: {
  num: string
  category: 'chat' | 'cowork' | 'code'
  title: string
  subtitle: string
  body: string
  count: number
  topics: string[]
  cta: string
}) {
  return (
    <Link
      href={`/learn/${category}`}
      className="block group border-2 border-[var(--color-rule-strong)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)] transition-colors p-6 no-underline flex flex-col"
    >
      <div className="flex items-baseline justify-between mb-3">
        <span className="seal-text font-black text-2xl">№ {num}</span>
        <span className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
          {subtitle}
        </span>
      </div>
      <h3 className="font-serif font-black text-2xl md:text-3xl text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-seal-deep)] transition-colors">
        {title}
      </h3>
      <p className="font-serif text-sm leading-relaxed text-[var(--color-ink-soft)] mb-4">
        {body}
      </p>
      <div className="mt-auto pt-4 border-t border-[var(--color-rule)]">
        <p className="font-serif text-xs text-[var(--color-ink-mute)] mb-3 leading-relaxed">
          <strong className="seal-text font-bold">{count} 篇文</strong>
          <span className="mx-2 text-[var(--color-rule)]">·</span>
          {topics.join(' · ')}
        </p>
        <span className="font-serif text-sm font-bold underline underline-offset-4">
          {cta}
        </span>
      </div>
    </Link>
  )
}
