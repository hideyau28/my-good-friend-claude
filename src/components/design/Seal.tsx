import { cn } from '@/lib/utils'

/**
 * 朱紅印章 —— 副刊嘅靈魂視覺記號。
 * 預設用「友」字（「我的好朋友 Claude」嘅縮寫），可換。
 * 通常用喺 page header、section marker、related links。
 */
interface SealProps {
  char?: string
  size?: number
  className?: string
}

export function Seal({ char = '友', size = 56, className }: SealProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex items-center justify-center select-none',
        'font-serif font-bold text-paper',
        'border-[3px] border-seal-deep rounded-sm',
        '-rotate-3 shadow-[1px_1px_0_rgba(0,0,0,0.06)]',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.55,
        backgroundColor: 'var(--color-seal)',
        color: 'var(--color-paper)',
        borderColor: 'var(--color-seal-deep)',
      }}
    >
      {char}
    </span>
  )
}

/**
 * 小印章 —— 用做 section marker (內聯版本)。
 */
export function SealInline({ char = '◉', className }: { char?: string; className?: string }) {
  return (
    <span
      className={cn('seal-text text-base', className)}
      aria-hidden="true"
    >
      {char}
    </span>
  )
}
