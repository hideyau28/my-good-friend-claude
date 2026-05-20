import type { Metadata } from 'next'
import Link from 'next/link'
import { MastheadCompact } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { SectionLabel } from '@/components/design/ColumnRule'
import { UseCaseCard } from '@/components/use-case/UseCaseCard'
import {
  getAllUseCases,
  SECTIONS,
  SECTION_DESCRIPTIONS,
  AUDIENCES,
  type Audience,
  type Section,
} from '@/lib/content'

export const metadata: Metadata = {
  title: 'Use Case 庫',
  description: '所有真實香港情境，跟住做就得。',
}

type SearchParams = Promise<{ section?: string; audience?: string }>

function buildHref(params: { audience?: Audience; section?: Section }) {
  const qs = new URLSearchParams()
  if (params.audience) qs.set('audience', params.audience)
  if (params.section) qs.set('section', params.section)
  const s = qs.toString()
  return s ? `/use-cases?${s}` : '/use-cases'
}

export default async function UseCasesIndexPage(props: { searchParams: SearchParams }) {
  const { section, audience } = await props.searchParams
  const activeAudience = AUDIENCES.find((a) => a === audience)
  const activeSection = SECTIONS.find((s) => s === section)
  const allCases = getAllUseCases()

  // Apply audience filter first (used for section nav counts so they stay
  // meaningful when scoping by section)
  const audienceFiltered = activeAudience
    ? allCases.filter((u) => u.audience.includes(activeAudience))
    : allCases

  const filtered = activeSection
    ? audienceFiltered.filter((u) => u.section === activeSection)
    : audienceFiltered

  const grouped = SECTIONS.map((sec) => ({
    section: sec,
    description: SECTION_DESCRIPTIONS[sec],
    items: filtered.filter((u) => u.section === sec),
    countInAudience: audienceFiltered.filter((u) => u.section === sec).length,
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
          {filtered.length} 個 use case，按報紙版面分類。
        </p>

        {/* Audience filter chips */}
        <div className="mb-8">
          <div className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--color-ink-mute)] mb-2">
            篩選 受眾
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={buildHref({ section: activeSection })}
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
                    section: activeSection,
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

        {/* Sticky section filter nav (newspaper-style) */}
        <nav
          aria-label="版面篩選"
          className="sticky top-0 z-10 -mx-6 px-6 py-3 mb-10 bg-[var(--color-paper)]/95 backdrop-blur border-y border-[var(--color-rule)]"
        >
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1 font-serif text-sm">
            <Link
              href={buildHref({ audience: activeAudience })}
              aria-pressed={!activeSection}
              className={
                'transition-colors ' +
                (!activeSection
                  ? 'text-[var(--color-ink)] font-black underline underline-offset-4'
                  : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]')
              }
            >
              全部
              <span className="text-[var(--color-ink-mute)] font-normal ml-1.5">
                {audienceFiltered.length}
              </span>
            </Link>
            {grouped.map(({ section: sec, countInAudience }) => {
              const isActive = activeSection === sec
              const isEmpty = countInAudience === 0
              return (
                <Link
                  key={sec}
                  href={buildHref({
                    audience: activeAudience,
                    section: isActive ? undefined : sec,
                  })}
                  aria-pressed={isActive}
                  className={
                    'transition-colors ' +
                    (isActive
                      ? 'text-[var(--color-ink)] font-black underline underline-offset-4'
                      : isEmpty
                        ? 'text-[var(--color-ink-mute)] hover:text-[var(--color-ink-soft)]'
                        : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]')
                  }
                >
                  {sec}
                  <span className="text-[var(--color-ink-mute)] font-normal ml-1.5">
                    {countInAudience}
                  </span>
                </Link>
              )
            })}
          </div>
        </nav>

        {grouped.map(({ section: sec, description, items }) => {
          if (items.length === 0) return null
          return (
            <section key={sec} id={sec} className="mb-16 scroll-mt-20">
              <div className="flex items-baseline justify-between mb-6 pb-3 border-b-2 border-[var(--color-ink)]">
                <h2 className="font-serif font-black text-2xl md:text-3xl">{sec}</h2>
                <span className="font-serif text-sm text-[var(--color-ink-mute)] uppercase tracking-[0.2em]">
                  {description}
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
            {activeSection
              ? `「${activeSection}」版未有文章，即將上線。`
              : '未有匹配嘅 use case。'}
          </p>
        )}
      </main>
      <Footer />
    </>
  )
}
