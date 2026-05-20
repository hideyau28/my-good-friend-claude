import Link from 'next/link'
import { DateLine } from './DateLine'
import { Seal } from './Seal'
import { cn } from '@/lib/utils'

/**
 * 滿載報頭 — 用喺首頁 / About / 訂閱頁。
 * 包含：印章、品牌大字、tagline、日期條、導航。
 */
export function Masthead({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'paper-grain border-b-[3px] border-[var(--color-rule-strong)]',
        className,
      )}
    >
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        {/* 上條：印章 + 品牌 + 導航 */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <Link href="/" className="flex items-center gap-4 no-underline">
            <Seal char="友" size={64} />
            <div>
              <h1 className="font-serif font-black text-3xl md:text-5xl leading-none text-[var(--color-ink)]">
                我的好朋友 Claude
              </h1>
              <p className="font-serif tracking-wider text-sm mt-2 text-[var(--color-ink-soft)]">
                MY GOOD FRIEND CLAUDE · A HK SUPPLEMENT
              </p>
            </div>
          </Link>
          <Nav />
        </div>

        {/* 下條：日期、副刊資訊、tagline */}
        <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-[var(--color-rule-soft)]">
          <div className="flex flex-col gap-1">
            <DateLine />
            <span className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--color-ink-mute)]">
              獨立發行 · INDEPENDENT · 於香港
            </span>
          </div>
          <p className="font-serif italic text-lg text-[var(--color-ink-2)]">
            一齊 · 由零開始 · 用 Claude
          </p>
        </div>
      </div>
      <SubNav maxW="max-w-6xl" />
    </header>
  )
}

/**
 * 縮細報頭 — 用喺 use case 內頁、列表頁。
 * 簡化版本：細印章 + 品牌名 + 細導航。
 */
export function MastheadCompact({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'border-b border-[var(--color-rule-soft)] bg-[var(--color-paper)]',
        className,
      )}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Seal char="友" size={32} />
          <span className="font-serif font-bold text-lg">我的好朋友 Claude</span>
        </Link>
        <Nav compact />
      </div>
      <SubNav maxW="max-w-5xl" />
    </header>
  )
}

/**
 * 上邊 utility nav — 純識別位（關於、訂閱）。
 * Use Case 庫 同 tier 入口已經移落 SubNav。
 */
function Nav({ compact = false }: { compact?: boolean }) {
  const items = [
    { href: '/about', label: '關於' },
    { href: '/#newsletter', label: '訂閱' },
  ]
  return (
    <nav
      className={cn(
        'flex items-center gap-1 font-serif',
        compact ? 'text-sm' : 'text-base',
      )}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="px-3 py-1.5 hover:text-[var(--color-seal)] transition-colors no-underline"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

/**
 * 副刊版面欄 — 兩個 main entry：3 tier curriculum + Use Case 庫。
 * 報紙感嘅 section bar，persistent 喺所有 page。
 */
function SubNav({ maxW }: { maxW: string }) {
  const tiers = [
    { href: '/learn/chat', label: 'Chat', subtitle: '入門' },
    { href: '/learn/cowork', label: 'Cowork', subtitle: '進階' },
    { href: '/learn/code', label: 'Code', subtitle: '進深' },
  ]
  return (
    <div className="border-t border-[var(--color-rule-soft)] bg-[var(--color-paper-2)]">
      <div
        className={cn(
          'mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-serif',
          maxW,
        )}
      >
        <nav
          aria-label="課程階段"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm"
        >
          {tiers.map((t, i) => (
            <span key={t.href} className="flex items-center gap-2">
              <Link
                href={t.href}
                className="text-[var(--color-ink-soft)] hover:text-[var(--color-seal)] transition-colors no-underline"
              >
                <span className="font-bold">{t.label}</span>
                <span className="ml-1.5 text-xs uppercase tracking-[0.15em] text-[var(--color-ink-mute)]">
                  {t.subtitle}
                </span>
              </Link>
              {i < tiers.length - 1 && (
                <span aria-hidden className="text-[var(--color-rule)]">
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>
        <Link
          href="/use-cases"
          className="text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-seal)] transition-colors no-underline"
        >
          Use Case 庫 →
        </Link>
      </div>
    </div>
  )
}
