import { EditorByline } from '@/components/design/EditorByline'
import { Seal } from '@/components/design/Seal'
import { formatIssueNumber, formatMastheadDate } from '@/lib/date'
import { CATEGORY_LABELS, type UseCase } from '@/lib/content'

interface UseCaseHeaderProps {
  useCase: UseCase
}

export function UseCaseHeader({ useCase }: UseCaseHeaderProps) {
  const cat = CATEGORY_LABELS[useCase.category]

  return (
    <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
      {/* 期號 + 分類 + 受眾 一條 meta 線 */}
      <div className="flex flex-wrap items-center gap-3 text-sm font-serif text-[var(--color-ink-mute)] mb-6">
        <span className="seal-text">{formatIssueNumber(useCase.issue)}</span>
        <span className="text-[var(--color-rule)]">|</span>
        <span>{cat.name}</span>
        <span className="text-[var(--color-rule)]">|</span>
        <span>{useCase.audience.join('、')}</span>
        <span className="text-[var(--color-rule)]">|</span>
        <time dateTime={useCase.publishedAt}>{formatMastheadDate(useCase.publishedAt)}</time>
      </div>

      {/* 標題（serif、大、收緊 leading） */}
      <h1 className="font-serif font-black text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-ink)] mb-6">
        {useCase.title}
      </h1>

      {/* lead description */}
      <p className="text-lg md:text-xl text-[var(--color-ink-soft)] leading-relaxed mb-8 max-w-2xl">
        {useCase.description}
      </p>

      {/* 工具 + 難度 + 時間 */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-4 border-y border-[var(--color-rule-soft)] text-sm">
        <span className="font-serif text-[var(--color-ink-mute)]">
          難度 <strong className="text-[var(--color-ink-2)]">
            {'★'.repeat(useCase.difficulty)}{'☆'.repeat(3 - useCase.difficulty)}
          </strong>
        </span>
        <span className="font-serif text-[var(--color-ink-mute)]">
          時間 <strong className="text-[var(--color-ink-2)]">{useCase.timeMinutes} 分鐘</strong>
        </span>
        {useCase.toolsNeeded.length > 0 && (
          <span className="font-serif text-[var(--color-ink-mute)]">
            用具 <strong className="text-[var(--color-ink-2)]">{useCase.toolsNeeded.join('、')}</strong>
          </span>
        )}
        <span className="ml-auto flex items-center gap-2">
          <Seal char="評" size={28} />
          <EditorByline meta="一個香港人" />
        </span>
      </div>
    </header>
  )
}
