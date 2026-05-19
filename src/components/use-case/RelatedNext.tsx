import Link from 'next/link'
import { SectionLabel } from '@/components/design/ColumnRule'
import type { UseCase } from '@/lib/content'

interface RelatedNextProps {
  related: UseCase[]
}

/**
 * 下期預告 — 副刊 metaphor 直接延伸到 use case 嘅 related links。
 */
export function RelatedNext({ related }: RelatedNextProps) {
  if (related.length === 0) return null
  return (
    <section className="max-w-3xl mx-auto px-6 my-16">
      <SectionLabel number="◉" label="下期預告 · 相關情境" className="mb-6" />
      <ul className="divide-y divide-[var(--color-rule-soft)]">
        {related.map((useCase) => (
          <li key={useCase.slug}>
            <Link
              href={`/use-cases/${useCase.slug}`}
              className="flex items-start justify-between gap-4 py-4 group no-underline"
            >
              <div className="flex-1">
                <h3 className="font-serif text-lg font-bold text-[var(--color-ink)] group-hover:text-[var(--color-seal-deep)] transition-colors leading-snug">
                  {useCase.title}
                </h3>
                <p className="text-sm text-[var(--color-ink-soft)] mt-1 line-clamp-1">
                  {useCase.description}
                </p>
              </div>
              <span className="font-serif text-sm text-[var(--color-ink-mute)] whitespace-nowrap pt-1">
                {useCase.audience[0]} · {useCase.timeMinutes} 分鐘
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
