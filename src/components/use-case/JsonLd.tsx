import type { UseCase } from '@/lib/content'
import {
  buildUseCaseGraph,
  jsonLdScriptProps,
  type HowToStep,
} from '@/lib/structured-data'

/**
 * Article JSON-LD — 畀 Google + AI answer engines 識認文章 metadata。
 *
 * Emits a single @graph：Article + BreadcrumbList +（如果有 parseable 步驟）HowTo。
 * 見 src/lib/structured-data.ts 嘅 2026 rich-result reality notes。
 */
export function UseCaseJsonLd({
  useCase,
  steps = [],
}: {
  useCase: UseCase
  steps?: HowToStep[]
}) {
  const graph = buildUseCaseGraph(useCase, steps)
  return <script {...jsonLdScriptProps(graph)} />
}
