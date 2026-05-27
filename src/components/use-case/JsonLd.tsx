import type { UseCase } from '@/lib/content'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://my-good-friend-claude.vercel.app'
const SITE_NAME = '我的好朋友 Claude'

/**
 * Article JSON-LD — 畀 Google 識認文章 metadata。
 * Render 入 use case 頁面，會喺 <head> 出 <script type="application/ld+json">。
 */
export function UseCaseJsonLd({ useCase }: { useCase: UseCase }) {
  const url = `${SITE_URL}/use-cases/${useCase.slug}`
  const ogImage = `${url}/opengraph-image`

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: useCase.title,
    description: useCase.description,
    image: ogImage,
    datePublished: useCase.publishedAt,
    dateModified: useCase.updatedAt ?? useCase.publishedAt,
    author: {
      '@type': 'Person',
      name: '一個香港人',
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/opengraph-image`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'zh-Hant-HK',
    keywords: useCase.keywords.join(', '),
    articleSection: useCase.subcategory,
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  )
}
