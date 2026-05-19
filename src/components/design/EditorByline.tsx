import { cn } from '@/lib/utils'

interface EditorBylineProps {
  className?: string
  /** 「編者撰」嘅副文（例如「一個香港人 · 第 024 期」） */
  meta?: string
}

/**
 * 編者撰 byline — 副刊靈魂之一：唔出真名，但有口吻。
 */
export function EditorByline({ className, meta }: EditorBylineProps) {
  return (
    <div className={cn('font-serif text-sm text-[var(--color-ink-soft)]', className)}>
      <span className="seal-text mr-2">【編者撰】</span>
      {meta && <span className="text-[var(--color-ink-mute)]">{meta}</span>}
    </div>
  )
}
