import { formatMastheadDate } from '@/lib/date'
import { cn } from '@/lib/utils'

interface DateLineProps {
  date?: Date | string
  className?: string
}

/**
 * 副刊日期條 — 「二〇二六年五月十九日 · 星期二 · 農曆四月初三」
 * 唔傳 date 嘅話用今日（運行時計）。
 */
export function DateLine({ date = new Date(), className }: DateLineProps) {
  return (
    <time
      className={cn(
        'font-serif text-sm tracking-wide text-[var(--color-ink-soft)]',
        className,
      )}
      dateTime={typeof date === 'string' ? date : date.toISOString()}
    >
      {formatMastheadDate(date)}
    </time>
  )
}
