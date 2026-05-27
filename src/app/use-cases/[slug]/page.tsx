import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { useCases } from '#site/content'
import { MastheadCompact } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { UseCaseHeader } from '@/components/use-case/UseCaseHeader'
import { ArticleHero } from '@/components/use-case/ArticleHero'
import { MdxRenderer } from '@/components/use-case/MdxRenderer'
import { RelatedNext } from '@/components/use-case/RelatedNext'
import { UseCaseJsonLd } from '@/components/use-case/JsonLd'
import { InteractiveLessonCTA } from '@/components/use-case/InteractiveLessonCTA'
import { ArticleTools } from '@/components/use-case/ArticleTools'
import { NewsletterCTA } from '@/components/design/NewsletterCTA'
import { getRelatedUseCases, getUseCaseBySlug } from '@/lib/content'

/**
 * Read the raw .mdx source for a slug and strip the YAML frontmatter.
 * Runs at build time (static generation) — bundles the article body for
 * the InteractiveLessonCTA copy-to-clipboard payload.
 */
async function loadArticleRaw(slug: string): Promise<string> {
  try {
    const path = join(process.cwd(), 'content', 'use-cases', `${slug}.mdx`)
    const raw = await readFile(path, 'utf-8')
    // Strip leading YAML frontmatter block
    return raw.replace(/^---\n[\s\S]*?\n---\n/, '').trim()
  } catch (err) {
    console.error(`[use-case page] failed to load raw mdx for ${slug}`, err)
    return ''
  }
}

export function generateStaticParams() {
  return useCases.map((uc) => ({ slug: uc.slug }))
}

type Params = Promise<{ slug: string }>

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { slug } = await props.params
  const useCase = getUseCaseBySlug(slug)
  if (!useCase) return {}
  return {
    title: useCase.title,
    description: useCase.description,
    keywords: useCase.keywords,
    openGraph: {
      title: useCase.title,
      description: useCase.description,
      type: 'article',
      publishedTime: useCase.publishedAt,
      modifiedTime: useCase.updatedAt,
    },
  }
}

export default async function UseCasePage(props: { params: Params }) {
  const { slug } = await props.params
  const useCase = getUseCaseBySlug(slug)
  if (!useCase) notFound()

  const [related, articleRaw] = await Promise.all([
    Promise.resolve(getRelatedUseCases(useCase, 3)),
    loadArticleRaw(slug),
  ])

  return (
    <>
      <UseCaseJsonLd useCase={useCase} />
      <MastheadCompact />
      <article>
        <ArticleHero useCase={useCase} />
        <UseCaseHeader useCase={useCase} hideTitle={Boolean(useCase.heroImage)} />
        <div className="max-w-3xl mx-auto px-6 pb-12 prose-content">
          <MdxRenderer code={useCase.body} />
        </div>
        <ArticleTools toolsNeeded={useCase.toolsNeeded} />
        {articleRaw && (
          <InteractiveLessonCTA
            title={useCase.title}
            slug={useCase.slug}
            articleRaw={articleRaw}
          />
        )}
        <RelatedNext related={related} />
      </article>
      <NewsletterCTA />
      <Footer />
    </>
  )
}
