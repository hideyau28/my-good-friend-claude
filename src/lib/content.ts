import { useCases } from '#site/content'

export type UseCase = (typeof useCases)[number]

export function getAllUseCases(): UseCase[] {
  return [...useCases].sort((a, b) => b.issue - a.issue)
}

export function getFeaturedUseCases(limit = 6): UseCase[] {
  return getAllUseCases()
    .filter((u) => u.featured)
    .slice(0, limit)
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((u) => u.slug === slug)
}

export function getRelatedUseCases(useCase: UseCase, limit = 2): UseCase[] {
  const related = useCase.related
    .map(getUseCaseBySlug)
    .filter((u): u is UseCase => Boolean(u))
  if (related.length >= limit) return related.slice(0, limit)
  // 不夠就 fall back 揀同 audience 或同 category 嘅其他 use case
  const fallback = getAllUseCases().filter(
    (u) =>
      u.slug !== useCase.slug &&
      !related.find((r) => r.slug === u.slug) &&
      (u.category === useCase.category ||
        u.audience.some((a) => useCase.audience.includes(a))),
  )
  return [...related, ...fallback].slice(0, limit)
}

export const CATEGORY_LABELS = {
  chat: { name: 'Claude Chat', cn: '日常用 · 零門檻' },
  cowork: { name: 'Cowork', cn: '自動化 · 進階' },
  code: { name: 'Claude Code', cn: '開發者 · 進深' },
} as const

export const CATEGORIES = ['chat', 'cowork', 'code'] as const
export type Category = (typeof CATEGORIES)[number]

export const AUDIENCES = ['打工仔', '老闆', '學生家長', '創作者', '消費者'] as const
export type Audience = (typeof AUDIENCES)[number]
