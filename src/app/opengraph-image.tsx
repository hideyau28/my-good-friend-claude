import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '我的好朋友 Claude — 一齊由零開始用 Claude'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#F7F2E2',
          padding: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'serif',
        }}
      >
        {/* Top row: seal + nameplate */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div
            style={{
              width: 88,
              height: 88,
              background: '#C42424',
              color: '#F7F2E2',
              border: '4px solid #971818',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 700,
              transform: 'rotate(-3deg)',
            }}
          >
            友
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, color: '#7A6B56', letterSpacing: 4 }}>
              MY GOOD FRIEND CLAUDE · A HK SUPPLEMENT
            </div>
            <div style={{ fontSize: 40, color: '#0F0B05', fontWeight: 900, marginTop: 4 }}>
              我的好朋友 Claude
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 96,
              color: '#0F0B05',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
            }}
          >
            一齊由零開始
            <br />用 Claude。
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#44372A',
              marginTop: 32,
              fontStyle: 'italic',
            }}
          >
            教香港人實際落地用 Claude AI — 打工仔、小店主、學生家長都用得。
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            borderTop: '4px solid #0F0B05',
            paddingTop: 16,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 20,
            color: '#7A6B56',
          }}
        >
          <span>獨立發行 · INDEPENDENT · 於香港</span>
          <span>my-good-friend-claude.com</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
