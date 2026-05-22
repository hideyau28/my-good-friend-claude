'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SECTIONS } from '@/lib/content'

const TIERS = [
  { href: '/learn/chat', label: 'Chat', subtitle: '入門', match: '/learn/chat' },
  { href: '/learn/cowork', label: 'Cowork', subtitle: '進階', match: '/learn/cowork' },
  { href: '/learn/code', label: 'Code', subtitle: '進深', match: '/learn/code' },
] as const

/**
 * Static skeleton — rendered during SSR / Suspense fallback. No active state,
 * but matches SubNav's layout exactly so there's no layout shift on hydration.
 */
export function SubNavSkeleton({ maxW }: { maxW: string }) {
  return (
    <div className="border-t border-[var(--color-rule-soft)] bg-[var(--color-paper-2)]">
      <div
        className={cn(
          'mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 font-serif',
          maxW,
        )}
      >
        <nav aria-label="課程階段" className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          {TIERS.map((t, i) => (
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
              {i < TIERS.length - 1 && (
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
      <div className={cn('mx-auto px-6 py-2 border-t border-[var(--color-rule-soft)] font-serif', maxW)}>
        <nav aria-label="報紙版面" className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-xs">
          <span className="seal-text font-bold mr-2 tracking-[0.1em]">版面</span>
          {SECTIONS.map((sec, i) => (
            <span key={sec} className="flex items-baseline">
              <Link
                href={`/use-cases?section=${encodeURIComponent(sec)}`}
                className="px-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-seal)] transition-colors no-underline"
              >
                {sec}
              </Link>
              {i < SECTIONS.length - 1 && (
                <span aria-hidden className="text-[var(--color-rule)]">
                  ·
                </span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}

/**
 * 副刊版面欄 — 兩條 row：
 *   Row 1: 3 tier curriculum + Use Case 庫 link
 *   Row 2: 9 newspaper sections (財經 / 職場 / ...)
 *
 * Active state highlighting:
 *   - Tier nav: matches pathname prefix /learn/{tier}
 *   - 全部 Use Case 庫: pathname = /use-cases AND no ?section= param
 *   - Each section pill: pathname = /use-cases AND ?section= matches
 *
 * Client component since usePathname / useSearchParams are client-only hooks.
 * The rest of the Masthead stays server-rendered.
 */
export function SubNav({ maxW }: { maxW: string }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeSectionParam = searchParams.get('section')

  const isUseCaseRoute = pathname === '/use-cases'
  const isAllUseCases = isUseCaseRoute && !activeSectionParam

  return (
    <div className="border-t border-[var(--color-rule-soft)] bg-[var(--color-paper-2)]">
      {/* Row 1: curriculum tiers + library */}
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
          {TIERS.map((t, i) => {
            const isActive = pathname === t.match
            return (
              <span key={t.href} className="flex items-center gap-2">
                <Link
                  href={t.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'transition-colors no-underline',
                    isActive
                      ? 'text-[var(--color-seal)]'
                      : 'text-[var(--color-ink-soft)] hover:text-[var(--color-seal)]',
                  )}
                >
                  <span className={cn('font-bold', isActive && 'underline underline-offset-4')}>
                    {t.label}
                  </span>
                  <span
                    className={cn(
                      'ml-1.5 text-xs uppercase tracking-[0.15em]',
                      isActive
                        ? 'text-[var(--color-seal-deep)]'
                        : 'text-[var(--color-ink-mute)]',
                    )}
                  >
                    {t.subtitle}
                  </span>
                </Link>
                {i < TIERS.length - 1 && (
                  <span aria-hidden className="text-[var(--color-rule)]">
                    ·
                  </span>
                )}
              </span>
            )
          })}
        </nav>
        <Link
          href="/use-cases"
          aria-current={isAllUseCases ? 'page' : undefined}
          className={cn(
            'text-sm transition-colors no-underline',
            isAllUseCases
              ? 'text-[var(--color-seal)] font-bold underline underline-offset-4'
              : 'text-[var(--color-ink-soft)] hover:text-[var(--color-seal)]',
          )}
        >
          Use Case 庫 →
        </Link>
      </div>

      {/* Row 2: newspaper sections — flat browse bar */}
      <div
        className={cn(
          'mx-auto px-6 py-2 border-t border-[var(--color-rule-soft)] font-serif',
          maxW,
        )}
      >
        <nav
          aria-label="報紙版面"
          className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-xs"
        >
          <span className="seal-text font-bold mr-2 tracking-[0.1em]">版面</span>
          {SECTIONS.map((sec, i) => {
            const isActive =
              isUseCaseRoute && activeSectionParam === sec
            return (
              <span key={sec} className="flex items-baseline">
                <Link
                  href={`/use-cases?section=${encodeURIComponent(sec)}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'px-1.5 transition-colors no-underline',
                    isActive
                      ? 'text-[var(--color-seal)] font-bold underline underline-offset-4'
                      : 'text-[var(--color-ink-soft)] hover:text-[var(--color-seal)]',
                  )}
                >
                  {sec}
                </Link>
                {i < SECTIONS.length - 1 && (
                  <span aria-hidden className="text-[var(--color-rule)]">
                    ·
                  </span>
                )}
              </span>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
