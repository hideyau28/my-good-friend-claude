import { NextResponse } from 'next/server'

/**
 * Newsletter signup stub.
 * 之後接 Beehiiv / ConvertKit / Mailchimp 嗰陣，
 * 喺呢度 call 佢哋嘅 API 就得。
 */
export async function POST(req: Request) {
  const formData = await req.formData()
  const email = String(formData.get('email') ?? '').trim()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 })
  }

  // TODO: 接落 Beehiiv API
  console.log('[newsletter] new signup:', email)

  // 對 form post 嘅回應：redirect 返 home + 一個 success query
  const url = new URL(req.url)
  url.pathname = '/'
  url.searchParams.set('subscribed', '1')
  return NextResponse.redirect(url, 303)
}
