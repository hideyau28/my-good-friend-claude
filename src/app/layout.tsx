import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: '我的好朋友 Claude — 一齊由零開始用 Claude',
    template: '%s · 我的好朋友 Claude',
  },
  description:
    '教香港人實際落地用 Claude AI，由零開始一齊行。打工仔、小店主、學生家長都用得——冇 demo、冇花巧，每個 use case 都係由真實情境出發，跟得到、做得到。',
  keywords: ['Claude AI', 'Claude 教學', 'Claude 香港', 'AI 教學', 'ChatGPT 香港', 'Cowork', 'Claude Code', '人工智能'],
  authors: [{ name: '我的好朋友 Claude' }],
  openGraph: {
    title: '我的好朋友 Claude',
    description: '一齊由零開始用 Claude — 寫畀香港人嘅 AI 教學副刊',
    locale: 'zh_HK',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://my-good-friend-claude.vercel.app',
  ),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-HK">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
