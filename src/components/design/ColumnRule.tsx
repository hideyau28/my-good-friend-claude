import { cn } from '@/lib/utils'

/**
 * 副刊欄目分隔線。預設係 double rule（粗 + 細）。
 * variant="single" 用淨一條幼線（內頁用）。
 */
export function ColumnRule({
  variant = 'double',
  className,
}: {
  variant?: 'double' | 'single'
  className?: string
}) {
  if (variant === 'double') {
    return <div className={cn('rule-double pt-2 my-8', className)} />
  }
  return (
    <hr
      className={cn(
        'border-0 border-t border-[var(--color-rule-soft)] my-8',
        className,
      )}
    />
  )
}

/**
 * 欄目標題 — 用喺 section header 之上嘅 「XX / YY」 chip。
 */
export function SectionLabel({
  number,
  label,
  className,
}: {
  number: string
  label: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 font-serif text-sm tracking-[0.15em] uppercase text-[var(--color-ink-mute)]',
        className,
      )}
    >
      <span className="seal-text text-base">{number}</span>
      <span className="border-b border-[var(--color-rule)] flex-1" />
      <span>{label}</span>
    </div>
  )
}
