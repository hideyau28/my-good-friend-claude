import type { Metadata } from 'next'
import { MastheadCompact } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { SectionLabel } from '@/components/design/ColumnRule'
import { UseCaseCard } from '@/components/use-case/UseCaseCard'
import { getAllUseCases, CATEGORY_LABELS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Use Case 庫',
  description: '所有真實香港情境，跟住做就得。',
}

type SearchParams = Promise<{ category?: string; audience?: string }>

export default async function UseCasesIndexPage(props: { searchParams: SearchParams }) {
  const { category, audience } = await props.searchParams
  const allCases = getAllUseCases()

  let filtered = allCases
  if (category && category in CATEGORY_LABELS) {
    filtered = filtered.filter((u) => u.category === category)
  }
  if (audience) {
    filtered = filtered.filter((u) => u.audience.includes(audience as never))
  }

  // 按 category group
  const grouped = (['chat', 'cowork', 'code'] as const).map((cat) => ({
    cat,
    label: CATEGORY_LABELS[cat],
    items: filtered.filter((u) => u.category === cat),
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
        <p className="font-serif text-lg text-[var(--color-ink-soft)] max-w-2xl mb-10">
          {filtered.length} 個 use case，按入門路徑分類。
          {category && (
            <>
              {' '}（篩選：<strong>{CATEGORY_LABELS[category as keyof typeof CATEGORY_LABELS]?.name}</strong>）
            </>
          )}
        </p>

        {grouped.map(({ cat, label, items }) => {
          if (items.length === 0) return null
          return (
            <section key={cat} className="mb-16">
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
