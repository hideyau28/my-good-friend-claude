import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { getAllUseCases, getUseCaseBySlug, CATEGORY_LABELS } from '@/lib/content'

export const runtime = 'nodejs'
export const alt = '我的好朋友 Claude — Use Case'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return getAllUseCases().map((u) => ({ slug: u.slug }))
}

type Params = Promise<{ slug: string }>

export default async function OpenGraphImage(props: { params: Params }) {
  const { slug } = await props.params
  const uc = getUseCaseBySlug(slug)
  if (!uc) notFound()

  const cat = CATEGORY_LABELS[uc.category]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F7F2E2',
          padding: '64px 72px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        {/* Top: compact masthead */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 16,
            borderBottom: '2px solid #BDB29A',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: '#C42424',
                color: '#F7F2E2',
                border: '3px solid #971818',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 700,
                transform: 'rotate(-3deg)',
              }}
            >
              友
            </div>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#0F0B05' }}>
              我的好朋友 Claude
            </span>
          </div>
          <div style={{ fontSize: 20, color: '#7A6B56', display: 'flex', gap: 16 }}>
            <span style={{ color: '#C42424', fontWeight: 700, letterSpacing: 2 }}>
              第 {String(uc.issue).padStart(3, '0')} 期
            </span>
            <span>·</span>
            <span>{cat.name}</span>
            <span>·</span>
            <span>{uc.audience[0]}</span>
          </div>
        </div>

        {/* Middle: title */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', padding: '32px 0' }}>
          <div
            style={{
              fontSize: uc.title.length > 28 ? 64 : 80,
              color: '#0F0B05',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            {uc.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: '#44372A',
              marginTop: 24,
              lineHeight: 1.4,
            }}
          >
            {uc.description.length > 90 ? uc.description.slice(0, 90) + '…' : uc.description}
          </div>
        </div>

        {/* Bottom: meta strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 20,
            borderTop: '4px solid #0F0B05',
            fontSize: 20,
            color: '#44372A',
          }}
        >
          <span>
            難度 {'★'.repeat(uc.difficulty)}
            {'☆'.repeat(3 - uc.difficulty)} · {uc.timeMinutes} 分鐘
          </span>
          <span style={{ fontStyle: 'italic' }}>【編者撰】一個香港人</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
