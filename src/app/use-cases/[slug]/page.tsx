import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useCases } from '#site/content'
import { MastheadCompact } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { UseCaseHeader } from '@/components/use-case/UseCaseHeader'
import { MdxRenderer } from '@/components/use-case/MdxRenderer'
import { RelatedNext } from '@/components/use-case/RelatedNext'
import { UseCaseJsonLd } from '@/components/use-case/JsonLd'
import { NewsletterCTA } from '@/components/design/NewsletterCTA'
import { getRelatedUseCases, getUseCaseBySlug } from '@/lib/content'

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

  const related = getRelatedUseCases(useCase, 3)

  return (
    <>
      <UseCaseJsonLd useCase={useCase} />
      <MastheadCompact />
      <article>
        <UseCaseHeader useCase={useCase} />
        <div className="max-w-3xl mx-auto px-6 pb-12 prose-content">
          <MdxRenderer code={useCase.body} />
        </div>
        <RelatedNext related={related} />
      </article>
      <NewsletterCTA />
      <Footer />
    </>
  )
}
