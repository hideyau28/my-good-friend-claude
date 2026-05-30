import Image from 'next/image'
import { Seal } from '@/components/design/Seal'
import { formatIssueNumber } from '@/lib/date'
import { CATEGORY_BADGES, type UseCase } from '@/lib/content'

interface ArticleHeroProps {
  useCase: UseCase
}

/**
 * Article hero — newspaper plate / magazine cover style.
 *
 * 兩個模式：
 *   1. useCase.heroImage 設咗 → magazine cover: image + title overlay
 *      浮喺圖右側既有 paper 空白上面（呼應 GPT 生圖嘅 asymmetric
 *      composition）
 *   2. 否則 → procedural typographic hero（紅印章大字 motif）
 *
 * Photo 模式會 render 文章 H1，所以 UseCaseHeader 應該配合
 * 用 hideTitle prop 唔再 render 標題避免重複。
 */
export function ArticleHero({ useCase }: ArticleHeroProps) {
  if (useCase.heroImage) {
    return <PhotoHero useCase={useCase} />
  }
  return <ProceduralHero useCase={useCase} />
}

function PhotoHero({ useCase }: ArticleHeroProps) {
  const badge = CATEGORY_BADGES[useCase.category]

  return (
    <section className="border-y-[3px] border-double border-[var(--color-ink)] -mt-px bg-[var(--color-paper-2)]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-[3fr_2fr]">
        {/* Image column — desktop 4:3 crop（object-left 保 scene 主體），mobile full 16:9 */}
        <div className="relative aspect-[16/9] md:aspect-[4/3] border-b md:border-b-0 md:border-r border-[var(--color-rule)]">
          <Image
            src={useCase.heroImage!}
            alt={useCase.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover md:object-left"
          />
        </div>

        {/* Title column — paper-2 backdrop, 報紙封面 typography */}
        <div className="flex flex-col justify-between p-6 md:p-8 lg:p-10 paper-grain">
          <div>
            <span className="font-serif seal-text text-xs md:text-sm font-bold tracking-[0.2em] uppercase">
              {formatIssueNumber(useCase.issue)}
            </span>
            <h1 className="font-serif font-black text-2xl md:text-3xl lg:text-4xl leading-[1.08] text-[var(--color-ink)] mt-4">
              {useCase.title}
            </h1>
          </div>
          <div className="flex items-center gap-2.5 mt-6 font-serif text-xs text-[var(--color-ink-soft)] uppercase tracking-[0.15em]">
            <span className="flex items-center gap-1.5">
              <span aria-hidden>{badge.symbol}</span>
              <span>{badge.label}</span>
            </span>
            <span className="text-[var(--color-rule)]">·</span>
            <span className="text-[var(--color-ink)] font-bold">{useCase.section}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProceduralHero({ useCase }: ArticleHeroProps) {
  const motif = pickMotif(useCase)
  const badge = CATEGORY_BADGES[useCase.category]

  return (
    <section
      aria-hidden
      className="paper-grain border-y-[3px] border-double border-[var(--color-ink)] -mt-px"
    >
      <div className="relative max-w-5xl mx-auto px-6 py-14 md:py-20">
        <div className="flex items-center justify-between mb-10 font-serif text-sm tracking-[0.15em] uppercase">
          <span className="seal-text font-bold">
            {formatIssueNumber(useCase.issue)}
          </span>
          <span className="hidden md:block flex-1 mx-6 border-t border-[var(--color-rule)]" />
          <span className="text-[var(--color-ink-soft)] flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span aria-hidden>{badge.symbol}</span>
              <span>{badge.label}</span>
            </span>
            <span className="text-[var(--color-rule)]">·</span>
            <span className="text-[var(--color-ink)] font-bold">{useCase.section}</span>
          </span>
        </div>

        <div className="flex flex-col items-center">
          <Seal char={motif} size={140} className="text-[6rem] md:text-[8rem]" />
          <p className="mt-6 font-serif text-base md:text-lg tracking-[0.25em] text-[var(--color-ink-soft)]">
            {useCase.subcategory}
          </p>
        </div>

        <span aria-hidden className="absolute top-3 left-3 text-[var(--color-rule)] font-serif text-xs select-none">◢</span>
        <span aria-hidden className="absolute top-3 right-3 text-[var(--color-rule)] font-serif text-xs select-none">◣</span>
        <span aria-hidden className="absolute bottom-3 left-3 text-[var(--color-rule)] font-serif text-xs select-none">◥</span>
        <span aria-hidden className="absolute bottom-3 right-3 text-[var(--color-rule)] font-serif text-xs select-none">◤</span>
      </div>
    </section>
  )
}

function pickMotif(useCase: UseCase): string {
  const han = /[一-鿿]/
  const fromSub = useCase.subcategory.match(han)
  if (fromSub) return fromSub[0]
  const fromTitle = useCase.title.match(han)
  if (fromTitle) return fromTitle[0]
  return '◉'
}
