import { defineConfig, defineCollection, s } from 'velite'

// 受眾標籤
const AUDIENCE = ['打工仔', '老闆', '學生家長', '創作者', '消費者'] as const

// 三大入口分類
const CATEGORY = ['chat', 'cowork', 'code'] as const

const useCases = defineCollection({
  name: 'UseCase',
  pattern: 'use-cases/**/*.mdx',
  schema: s
    .object({
      title: s.string().max(80),
      slug: s.slug('use-cases'),
      issue: s.number().int().positive(),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      audience: s.array(s.enum(AUDIENCE)).min(1),
      category: s.enum(CATEGORY),
      subcategory: s.string(),
      difficulty: s.number().int().min(1).max(3),
      timeMinutes: s.number().int().positive(),
      toolsNeeded: s.array(s.string()).default([]),
      description: s.string().max(200),
      keywords: s.array(s.string()).default([]),
      related: s.array(s.string()).default([]),
      featured: s.boolean().default(false),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      permalink: `/use-cases/${data.slug}`,
    })),
})

const pages = defineCollection({
  name: 'Page',
  pattern: 'pages/**/*.mdx',
  schema: s.object({
    title: s.string(),
    slug: s.slug('pages'),
    description: s.string().optional(),
    body: s.mdx(),
  }),
})

export default defineConfig({
  root: 'content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { useCases, pages },
  mdx: {
    rehypePlugins: [],
    remarkPlugins: [],
  },
})
