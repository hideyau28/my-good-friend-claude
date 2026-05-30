'use client'

import { useSearchParams } from 'next/navigation'

/**
 * 訂閱 PRG 回饋 banner。讀 ?subscribed=1 / ?newsletter_error=1
 * （由 /api/newsletter 嘅 redirect 帶返嚟）。
 *
 * Client component（用 useSearchParams）—— 喺 NewsletterCTA 用 <Suspense>
 * 包住，靜態頁就唔使整頁轉 dynamic render。
 */
export function NewsletterStatus() {
  const params = useSearchParams()
  const subscribed = params.get('subscribed') === '1'
  const failed = params.get('newsletter_error') === '1'

  if (!subscribed && !failed) return null

  return (
    <div
      role="status"
      className={
        'max-w-md mx-auto mb-8 border px-5 py-3 font-serif text-sm leading-relaxed bg-[var(--color-paper)] ' +
        (subscribed
          ? 'border-[var(--color-rule)] text-[var(--color-ink-2)]'
          : 'border-[var(--color-seal)] text-[var(--color-seal-deep)]')
      }
    >
      {subscribed
        ? '多謝訂閱！下個禮拜日，新一篇送到你 inbox。'
        : '訂閱一時接唔到，唔該再試多次，或者直接 email 我哋。'}
    </div>
  )
}
