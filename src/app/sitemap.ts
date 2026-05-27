import type { MetadataRoute } from 'next'
import { getAllUseCases } from '@/lib/content'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://my-good-friend-claude.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/use-cases`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  const useCaseRoutes: MetadataRoute.Sitemap = getAllUseCases().map((uc) => ({
    url: `${SITE_URL}/use-cases/${uc.slug}`,
    lastModified: new Date(uc.updatedAt ?? uc.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...useCaseRoutes]
}
