import type { Metadata } from 'next'
import Link from 'next/link'
import { MastheadCompact } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { SectionLabel } from '@/components/design/ColumnRule'
import { UseCaseCard } from '@/components/use-case/UseCaseCard'
import {
  getAllUseCases,
  CATEGORY_LABELS,
  CATEGORIES,
  AUDIENCES,
  type Audience,
  type Category,
} from '@/lib/content'

export const metadata: Metadata = {
  title: 'Use Case 庫',
  description: '所有真實香港情境，跟住做就得。',
}

type SearchParams = Promise<{ category?: string; audience?: string }>

function buildHref(params: { audience?: Audience; category?: Category }) {
  const qs = new URLSearchParams()
  if (params.audience) qs.set('audience', params.audience)
  if (params.category) qs.set('category', params.category)
  const s = qs.toString()
  return s ? `/use-cases?${s}` : '/use-cases'
}

export default async function UseCasesIndexPage(props: { searchParams: SearchParams }) {
  const { category, audience } = await props.searchParams
  const activeAudience = AUDIENCES.find((a) => a === audience)
  const activeCategory = CATEGORIES.find((c) => c === category)
  const allCases = getAllUseCases()

  // Apply audience filter first (used for category nav counts so they stay
  // meaningful when scoping by category)
  const audienceFiltered = activeAudience
    ? allCases.filter((u) => u.audience.includes(activeAudience))
    : allCases

  const filtered = activeCategory
    ? audienceFiltered.filter((u) => u.category === activeCategory)
    : audienceFiltered

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    label: CATEGORY_LABELS[cat],
    items: filtered.filter((u) => u.category === cat),
    // Total within audience scope, regardless of active category
    countInAudience: audienceFiltered.filter((u) => u.category === cat).length,
  }))

  return (
    <>
      <MastheadCompact />
      <main className="max-w-5xl mx-auto px-6 py-12">
        <SectionLabel number="◉" label="USE CASE 庫" className="mb-6" />
        <h1 className="font-serif font-black text-4xl md:text-6xl leading-tight mb-4">
          所有香港情境，
          <br />
          一頁睇晒。
        </h1>
        <p className="font-serif text-lg text-[var(--color-ink-soft)] max-w-2xl mb-8">
          {filtered.length} 個 use case，按入門路徑分類。
        </p>

        {/* Audience filter chips */}
        <div className="mb-8">
          <div className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--color-ink-mute)] mb-2">
            篩選 受眾
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref({ category: activeCategory })}
              aria-pressed={!activeAudience}
              className={
                'font-serif text-sm px-3 py-1.5 border transition-colors ' +
                (!activeAudience
                  ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                  : 'bg-[var(--color-paper)] text-[var(--color-ink-soft)] border-[var(--color-rule)] hover:bg-[var(--color-paper-3)]')
              }
            >
              全部
            </Link>
            {AUDIENCES.map((a) => {
              const isActive = activeAudience === a
              return (
                <Link
                  key={a}
                  href={buildHref({
                    audience: isActive ? undefined : a,
                    category: activeCategory,
                  })}
                  aria-pressed={isActive}
                  className={
                    'font-serif text-sm px-3 py-1.5 border transition-colors ' +
                    (isActive
                      ? 'bg-[var(--color-ink)] text-[var(--color-paper)] border-[var(--color-ink)]'
                      : 'bg-[var(--color-paper)] text-[var(--color-ink-soft)] border-[var(--color-rule)] hover:bg-[var(--color-paper-3)]')
                  }
                >
                  {a}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Sticky category filter nav */}
        <nav
          aria-label="分類篩選"
          className="sticky top-0 z-10 -mx-6 px-6 py-3 mb-10 bg-[var(--color-paper)]/95 backdrop-blur border-y border-[var(--color-rule)]"
        >
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 font-serif text-sm">
            <Link
              href={buildHref({ audience: activeAudience })}
              aria-pressed={!activeCategory}
              className={
                'transition-colors ' +
                (!activeCategory
                  ? 'text-[var(--color-ink)] font-black underline underline-offset-4'
                  : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]')
              }
            >
              全部
              <span className="text-[var(--color-ink-mute)] font-normal ml-1.5">
                {audienceFiltered.length}
              </span>
            </Link>
            {grouped.map(({ cat, label, countInAudience }) => {
              const isActive = activeCategory === cat
              return (
                <Link
                  key={cat}
                  href={buildHref({
                    audience: activeAudience,
                    category: isActive ? undefined : cat,
                  })}
                  aria-pressed={isActive}
                  className={
                    'transition-colors ' +
                    (isActive
                      ? 'text-[var(--color-ink)] font-black underline underline-offset-4'
                      : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]')
                  }
                >
                  {label.name}
                  <span className="text-[var(--color-ink-mute)] font-normal ml-1.5">
                    {countInAudience}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {grouped.map(({ cat, label, items }) => {
          if (items.length === 0) return null
          return (
            <section key={cat} id={cat} className="mb-16 scroll-mt-20">
              <div className="flex items-baseline justify-between mb-6 pb-3 border-b-2 border-[var(--color-ink)]">
                <h2 className="font-serif font-black text-2xl md:text-3xl">
                  {label.name}
                </h2>
                <span className="font-serif text-sm text-[var(--color-ink-mute)] uppercase tracking-[0.2em]">
                  {label.cn}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((uc) => (
                  <UseCaseCard key={uc.slug} useCase={uc} />
                ))}
              </div>
            </section>
          )
        })}

        {filtered.length === 0 && (
          <p className="font-serif text-center text-[var(--color-ink-mute)] py-20">
            未有匹配嘅 use case。
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
