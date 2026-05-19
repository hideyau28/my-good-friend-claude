'use client'

import { isValidElement, useMemo, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PromptBlockProps {
  /** Prompt 內容。可以係 string，亦可以係 MDX 入面嘅 React 子節點。 */
  children: ReactNode
  /** 標籤（例如「完整 prompt」、「變化：DSE 操卷」） */
  label?: string
  className?: string
}

/**
 * 由 ReactNode 抽取純 text。
 * MDX 入面 <PromptBlock>...</PromptBlock> 嘅 children 會被 compile 成
 * React elements（<p>、<br>），所以我哋要 walk 落 tree 抽 text。
 */
function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode }
    return extractText(props.children)
  }
  return ''
}

/**
 * Prompt 區塊：MDX 入面用 <PromptBlock label="..."> 包住一段 prompt。
 * 有 copy 掣，撳一下複製。
 */
export function PromptBlock({ children, label = '完整 prompt', className }: PromptBlockProps) {
  const text = useMemo(() => extractText(children).trim(), [children])
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  return (
    <div
      className={cn(
        'my-6 border-2 border-[var(--color-rule-strong)] bg-[var(--color-paper-2)]',
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b-2 border-[var(--color-rule-strong)] bg-[var(--color-paper-3)]">
        <span className="seal-text text-sm">◉ {label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="font-serif text-xs px-3 py-1 border border-[var(--color-ink-2)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] transition-colors"
        >
          {copied ? '已 copy' : 'Copy'}
        </button>
      </div>
      <pre className="px-4 py-4 font-sans text-sm leading-relaxed whitespace-pre-wrap break-words text-[var(--color-ink-2)]">
        {text}
      </pre>
    </div>
  )
}
