import type { UseCase } from '@/lib/content'

/**
 * Structured-data (JSON-LD) builders.
 *
 * 2026 reality check on what each type actually buys us:
 * - BreadcrumbList → STILL an active Google rich result (breadcrumb trail in SERP).
 * - WebSite + SearchAction → sitelinks search box (active).
 * - Organization → entity / Knowledge Graph signal, brand consistency.
 * - HowTo → classic rich result deprecated (2023), but still consumed by AI
 *   answer engines (SGE / ChatGPT / Perplexity) and helps semantic understanding.
 *   Our articles are genuinely step-by-step, so it's honest + cheap + future-proof.
 * - Article → Top Stories / Discover eligibility + general understanding.
 *
 * Everything is emitted as a single `@graph` per page so crawlers see one
 * connected entity model rather than disjoint blobs.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://my-good-friend-claude.vercel.app'

export const SITE_NAME = '我的好朋友 Claude'
export const SITE_DESC = '一齊由零開始用 Claude — 寫畀香港人嘅 AI 教學副刊'

/** Stable @id for the site-wide Organization / WebSite nodes (for @graph refs). */
const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

export interface HowToStep {
  name: string
  text: string
}

/**
 * Parse「跟住做」numbered steps out of the raw (frontmatter-stripped) MDX body.
 *
 * Article shape:
 *   ## 跟住做
 *   ### 1. <step title>
 *   <prose paragraph>        ← used as step text
 *   <PromptBlock> / code / lists ← skipped for the text field
 *   ### 2. ...
 *   ## 變化 ...               ← section ends here
 *
 * Returns [] when no parseable steps (caller then omits HowTo from the graph).
 */
export function extractHowToSteps(raw: string): HowToStep[] {
  if (!raw) return []

  // Isolate the 跟住做 section (up to the next H2).
  const startMatch = raw.match(/^##\s+跟住做\s*$/m)
  if (!startMatch || startMatch.index === undefined) return []
  const afterStart = raw.slice(startMatch.index + startMatch[0].length)
  const nextH2 = afterStart.search(/^##\s+/m)
  const section = nextH2 === -1 ? afterStart : afterStart.slice(0, nextH2)

  // Split into ### blocks.
  const blocks = section.split(/^###\s+/m).slice(1)
  const steps: HowToStep[] = []

  for (const block of blocks) {
    const lines = block.split('\n')
    const rawTitle = (lines.shift() ?? '').trim()
    // Strip leading「1. 」/「1：」numbering.
    const name = rawTitle.replace(/^\d+[.:、．]\s*/, '').trim()
    if (!name) continue

    // First prose paragraph = step text. Skip blanks, JSX, code fences,
    // blockquotes, list bullets, warning lines.
    let text = ''
    let inFence = false
    for (const line of lines) {
      const t = line.trim()
      if (t.startsWith('```')) {
        inFence = !inFence
        continue
      }
      if (inFence) continue
      if (!t) {
        if (text) break // paragraph ended
        continue
      }
      if (
        t.startsWith('<') ||
        t.startsWith('>') ||
        t.startsWith('-') ||
        t.startsWith('*') ||
        t.startsWith('⚠') ||
        t.startsWith('#') ||
        /^\d+\.\s/.test(t)
      ) {
        if (text) break
        continue
      }
      text += (text ? ' ' : '') + t
      if (text.length > 200) break
    }

    // Clean markdown emphasis / inline code / links → plain text.
    text = text
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()

    if (text.length > 180) text = text.slice(0, 177).trimEnd() + '…'

    steps.push({ name, text: text || name })
  }

  return steps
}

/** Shared Organization node. */
function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESC,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/opengraph-image`,
    },
  }
}

/**
 * Site-wide WebSite + Organization graph. Emitted once on the home page.
 * The WebSite.potentialAction enables the sitelinks search box.
 */
export function buildWebSiteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(),
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESC,
        publisher: { '@id': ORG_ID },
        inLanguage: 'zh-Hant-HK',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${SITE_URL}/use-cases?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }
}

/**
 * Per-article graph: Article + (optional) HowTo + BreadcrumbList, all linked.
 */
export function buildUseCaseGraph(useCase: UseCase, steps: HowToStep[]) {
  const url = `${SITE_URL}/use-cases/${useCase.slug}`
  const ogImage = `${url}/opengraph-image`

  const graph: Record<string, unknown>[] = [
    organizationNode(),
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: useCase.title,
      description: useCase.description,
      image: ogImage,
      datePublished: useCase.publishedAt,
      dateModified: useCase.updatedAt ?? useCase.publishedAt,
      author: { '@type': 'Person', name: '一個香港人' },
      publisher: { '@id': ORG_ID },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: 'zh-Hant-HK',
      keywords: useCase.keywords.join(', '),
      articleSection: useCase.section,
      timeRequired: `PT${useCase.timeMinutes}M`,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首頁', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Use Case 庫',
          item: `${SITE_URL}/use-cases`,
        },
        { '@type': 'ListItem', position: 3, name: useCase.title, item: url },
      ],
    },
  ]

  if (steps.length > 0) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: useCase.title,
      description: useCase.description,
      totalTime: `PT${useCase.timeMinutes}M`,
      inLanguage: 'zh-Hant-HK',
      step: steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
        url: `${url}#step-${i + 1}`,
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

/**
 * /use-cases listing graph: CollectionPage + ItemList + BreadcrumbList.
 * `items` should already be the order shown on the page.
 */
export function buildListingGraph(
  items: { slug: string; title: string }[],
  opts?: { title?: string; description?: string },
) {
  const url = `${SITE_URL}/use-cases`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#collection`,
        url,
        name: opts?.title ?? 'Use Case 庫',
        description:
          opts?.description ?? '所有香港真實情境嘅 Claude AI use case，跟住做就得。',
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'zh-Hant-HK',
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首頁', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Use Case 庫', item: url },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${url}#itemlist`,
        numberOfItems: items.length,
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/use-cases/${it.slug}`,
          name: it.title,
        })),
      },
    ],
  }
}

/** Render helper — a <script type="application/ld+json"> with the given object. */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  }
}
