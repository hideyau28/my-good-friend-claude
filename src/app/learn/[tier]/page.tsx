import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MastheadCompact } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { SectionLabel } from '@/components/design/ColumnRule'
import { UseCaseCard } from '@/components/use-case/UseCaseCard'
import {
  getAllUseCases,
  pickFirstRead,
  CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_BADGES,
  SECTIONS,
  SECTION_DESCRIPTIONS,
  TIER_CURRICULUM,
  type Category,
} from '@/lib/content'

type Params = Promise<{ tier: string }>

export function generateStaticParams() {
  return CATEGORIES.map((tier) => ({ tier }))
}

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { tier } = await props.params
  if (!isCategory(tier)) return {}
  const c = TIER_CURRICULUM[tier]
  return {
    title: c.title,
    description: c.intro,
  }
}

function isCategory(value: string): value is Category {
  return (CATEGORIES as readonly string[]).includes(value)
}

export default async function TierLearnPage(props: { params: Params }) {
  const { tier } = await props.params
  if (!isCategory(tier)) notFound()

  const curriculum = TIER_CURRICULUM[tier]
  const tierArticles = getAllUseCases().filter((u) => u.category === tier)
  const firstRead = pickFirstRead(tierArticles)
  const restArticles = firstRead
    ? tierArticles.filter((u) => u.slug !== firstRead.slug)
    : tierArticles

  const groupedBySection = SECTIONS.map((sec) => ({
    section: sec,
    description: SECTION_DESCRIPTIONS[sec],
    items: restArticles.filter((u) => u.section === sec),
  })).filter((g) => g.items.length > 0)

  const badge = CATEGORY_BADGES[tier]

  return (
    <>
      <MastheadCompact />
      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb (P6) */}
        <nav
          aria-label="麵包屑"
          className="font-serif text-xs text-[var(--color-ink-mute)] mb-6 uppercase tracking-[0.15em]"
        >
          <Link href="/" className="hover:text-[var(--color-ink)]">
            首頁
          </Link>
          <span className="mx-2 text-[var(--color-rule)]">/</span>
          <span className="seal-text">{curriculum.eyebrow.replace(/\s/g, '')}</span>
          <span className="mx-2 text-[var(--color-rule)]">·</span>
          <span className="text-[var(--color-ink-soft)]">{CATEGORY_LABELS[tier].name}</span>
        </nav>

        {/* Tier hero */}
        <SectionLabel number={curriculum.eyebrow} label="課 程 階 段" className="mb-6" />
        <div className="flex items-baseline gap-3 mb-3 font-serif text-sm text-[var(--color-ink-mute)] uppercase tracking-[0.2em]">
          <span aria-hidden>{badge.symbol}</span>
          <span>{badge.label}</span>
          <span className="text-[var(--color-rule)]">·</span>
          <span>{CATEGORY_LABELS[tier].cn}</span>
        </div>
        <h1 className="font-serif font-black text-4xl md:text-6xl leading-tight mb-6">
          {curriculum.title}
        </h1>
        <p className="font-serif text-lg md:text-xl text-[var(--color-ink-2)] leading-relaxed max-w-3xl mb-10">
          {curriculum.intro}
        </p>

        {/* First read MOVED UP (P1) + quick-start label (P5) */}
        {firstRead && (
          <section className="mb-12">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
              <SectionLabel number="◉" label="由 呢 篇 開 始" className="flex-1 min-w-[200px]" />
              <span className="font-serif text-xs uppercase tracking-[0.15em] font-bold seal-text">
                ⚡ {firstRead.timeMinutes} 分鐘 quick start
              </span>
            </div>
            <h2 className="font-serif font-black text-2xl md:text-3xl mb-6">
              第一篇，由呢度入手。
            </h2>
            <UseCaseCard useCase={firstRead} variant="featured" />
          </section>
        )}

        {/* Compact summary strip (P2 + P3) — 你會學識 inline 3-col + prereq one-liner */}
        <section className="mb-12 py-6 border-y border-[var(--color-rule)]">
          <h3 className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--color-ink-mute)] mb-4">
            本階段你會學識
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
            {curriculum.learnings.map((l) => (
              <div key={l} className="font-serif text-sm leading-relaxed flex gap-2 text-[var(--color-ink-2)]">
                <span className="seal-text font-bold shrink-0">▸</span>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <p className="mt-5 font-serif text-xs text-[var(--color-ink-mute)] leading-relaxed">
            <strong className="text-[var(--color-ink-soft)]">入學要求：</strong>
            {curriculum.prereq}
            <span className="mx-2 text-[var(--color-rule)]">·</span>
            本階段共 <strong className="text-[var(--color-ink)]">{tierArticles.length}</strong> 篇文章
          </p>
        </section>

        {/* Rest of tier, grouped by section */}
        {groupedBySection.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif font-black text-2xl md:text-3xl mb-3">
              本階段全部文章
            </h2>
            <p className="font-serif text-[var(--color-ink-soft)] mb-10">
              按版面分，揀同你工作 / 生活相關嘅。想 cross-cut 揀，可以去{' '}
              <Link
                href="/use-cases"
                className="underline underline-offset-4 hover:text-[var(--color-seal-deep)]"
              >
                Use Case 庫
              </Link>
              。
            </p>

            {groupedBySection.map(({ section: sec, description, items }) => (
              <section key={sec} className="mb-12">
                <div className="flex items-baseline justify-between mb-5 pb-2 border-b border-[var(--color-rule)]">
                  <h3 className="font-serif font-black text-xl md:text-2xl">{sec}</h3>
                  <span className="font-serif text-xs text-[var(--color-ink-mute)] uppercase tracking-[0.2em]">
                    {description}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {items.map((uc) => (
                    <UseCaseCard key={uc.slug} useCase={uc} />
                  ))}
                </div>
              </section>
            ))}
          </section>
        )}

        {/* Empty tier fallback */}
        {tierArticles.length === 0 && (
          <section className="text-center py-20">
            <p className="font-serif text-[var(--color-ink-mute)] italic">
              本階段嘅文章即將上線。
            </p>
          </section>
        )}

        {/* Next tier CTA */}
        {curriculum.nextTier && (
          <section className="mt-16 pt-12 border-t-4 border-double border-[var(--color-ink)] text-center">
            <SectionLabel number="→" label="下 一 階" className="mb-6" />
            <p className="font-serif text-lg text-[var(--color-ink-soft)] mb-4">
              {curriculum.nextTeaser}
            </p>
            <Link
              href={`/learn/${curriculum.nextTier}`}
              className="inline-block px-6 py-3 font-serif font-bold bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-seal-deep)] transition-colors no-underline"
            >
              {TIER_CURRICULUM[curriculum.nextTier].title} →
            </Link>
          </section>
        )}

        {/* Code tier end — graduation */}
        {!curriculum.nextTier && (
          <section className="mt-16 pt-12 border-t-4 border-double border-[var(--color-ink)] text-center">
            <p className="font-serif text-lg text-[var(--color-ink-soft)] mb-4">
              三階段都行完。識用、自動化、寫到 code——AI 入到你 daily workflow，就成個關。
            </p>
            <Link
              href="/use-cases"
              className="inline-block px-6 py-3 font-serif font-bold border-2 border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors no-underline"
            >
              翻開成個 Use Case 庫 →
            </Link>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
