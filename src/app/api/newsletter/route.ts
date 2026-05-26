import { NextResponse } from 'next/server'

/**
 * Newsletter signup endpoint.
 *
 * 接 Beehiiv API。Env vars 喺 Vercel project settings 設定：
 *   - BEEHIIV_PUBLICATION_ID
 *   - BEEHIIV_API_KEY
 *
 * 如果 env vars 未設定，會 return 503——故意 fail loud，避免再出現
 *「form 提交成功但 email 全部 console.log 丟失」嘅情況。
 *
 * 之後想換 ConvertKit / Buttondown / 自己 DB，改 forwardToBeehiiv 一個 function 就得。
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ForwardResult {
  ok: boolean
  status: number
  reason?: string
}

async function forwardToBeehiiv(email: string): Promise<ForwardResult> {
  const pubId = process.env.BEEHIIV_PUBLICATION_ID
  const apiKey = process.env.BEEHIIV_API_KEY

  if (!pubId || !apiKey) {
    return {
      ok: false,
      status: 503,
      reason:
        'Newsletter backend 未配置（BEEHIIV_PUBLICATION_ID / BEEHIIV_API_KEY missing）',
    }
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'my-good-friend-claude',
          utm_medium: 'site-form',
        }),
      },
    )

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      return {
        ok: false,
        status: 502,
        reason: `Beehiiv API returned ${res.status}: ${text.slice(0, 200)}`,
      }
    }

    return { ok: true, status: 200 }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, status: 502, reason: `Beehiiv fetch failed: ${msg}` }
  }
}

export async function POST(req: Request) {
  let email = ''
  try {
    const formData = await req.formData()
    email = String(formData.get('email') ?? '').trim().toLowerCase()
  } catch {
    return NextResponse.json(
      { ok: false, error: '無效嘅 request format' },
      { status: 400 },
    )
  }

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: '請輸入正確嘅 email address' },
      { status: 400 },
    )
  }

  const result = await forwardToBeehiiv(email)

  if (!result.ok) {
    // Loud server-side log——確保 ops 睇到，唔好靜雞雞食咗 email。
    console.error('[newsletter] forward failed', {
      email,
      status: result.status,
      reason: result.reason,
    })
    return NextResponse.json(
      {
        ok: false,
        error:
          result.status === 503
            ? '訂閱服務暫時未開通，請稍後再試。'
            : '訂閱失敗，請稍後再試或 email 我哋。',
      },
      { status: result.status },
    )
  }

  // 成功——對 form post 嘅回應：redirect 返 home + 一個 success query
  const url = new URL(req.url)
  url.pathname = '/'
  url.searchParams.set('subscribed', '1')
  return NextResponse.redirect(url, 303)
}
