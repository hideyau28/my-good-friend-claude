import Link from 'next/link'
import { cn } from '@/lib/utils'
import { formatIssueNumber } from '@/lib/date'
import type { UseCase } from '@/lib/content'

interface UseCaseCardProps {
  useCase: UseCase
  variant?: 'default' | 'featured'
  className?: string
}

export function UseCaseCard({
  useCase,
  variant = 'default',
  className,
}: UseCaseCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <article
      className={cn(
        'group relative border border-[var(--color-rule)] bg-[var(--color-paper)] hover:bg-[var(--color-paper-3)] transition-colors',
        isFeatured && 'md:col-span-2 paper-grain',
        className,
      )}
    >
      <Link href={`/use-cases/${useCase.slug}`} className="block p-6 no-underline">
        <div className="flex items-center gap-2 mb-3 text-xs font-serif text-[var(--color-ink-mute)] uppercase tracking-wider">
          <span className="seal-text">{formatIssueNumber(useCase.issue)}</span>
          <span>·</span>
          <span>{useCase.subcategory}</span>
        </div>

        <h3
          className={cn(
            'font-serif font-bold text-[var(--color-ink)] group-hover:text-[var(--color-seal-deep)] transition-colors mb-3',
            isFeatured ? 'text-2xl md:text-3xl leading-tight' : 'text-xl leading-snug',
          )}
        >
          {useCase.title}
        </h3>

        <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed mb-4 line-clamp-2">
          {useCase.description}
        </p>

        <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-ink-mute)]">
          {useCase.audience.map((a) => (
            <span
              key={a}
              className="px-2 py-0.5 bg-[var(--color-paper-3)] border border-[var(--color-rule-soft)] rounded-sm"
            >
              {a}
            </span>
          ))}
          <span>·</span>
          <span>{'★'.repeat(useCase.difficulty)}{'☆'.repeat(3 - useCase.difficulty)}</span>
          <span>·</span>
          <span>{useCase.timeMinutes} 分鐘</span>
        </div>
      </Link>
    </article>
  )
}
