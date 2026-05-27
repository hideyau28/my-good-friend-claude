import { getAllUseCases } from '@/lib/content'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://my-good-friend-claude.vercel.app'
const SITE_TITLE = '我的好朋友 Claude'
const SITE_DESC = '一齊由零開始用 Claude — 寫畀香港人嘅 AI 教學副刊'
const AUTHOR = 'editor@example.com (一個香港人)'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(date: string | Date): string {
  return new Date(date).toUTCString()
}

export async function GET() {
  const useCases = getAllUseCases()
  const lastBuild = useCases[0]
    ? new Date(useCases[0].updatedAt ?? useCases[0].publishedAt)
    : new Date()

  const items = useCases
    .map((uc) => {
      const link = `${SITE_URL}/use-cases/${uc.slug}`
      return `
    <item>
      <title>${escapeXml(uc.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(uc.publishedAt)}</pubDate>
      <author>${AUTHOR}</author>
      <description>${escapeXml(uc.description)}</description>
      <category>${escapeXml(uc.category)}</category>
      ${uc.audience.map((a) => `<category domain="audience">${escapeXml(a)}</category>`).join('\n      ')}
    </item>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-Hant-HK</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
