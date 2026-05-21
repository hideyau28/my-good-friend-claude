import Image from 'next/image'
import { Seal } from '@/components/design/Seal'
import { formatIssueNumber } from '@/lib/date'
import { CATEGORY_BADGES, type UseCase } from '@/lib/content'

interface ArticleHeroProps {
  useCase: UseCase
}

/**
 * Article hero — newspaper plate style.
 *
 * 兩個模式：
 *   1. useCase.heroImage 設咗 → render real photo / illustration
 *   2. 否則 → procedural typographic hero（紅印章大字 motif）
 *
 * 同樣外框（double-rule border + paper-grain）令兩種 mode
 * 視覺一致。Procedural 模式由 subcategory 第一個中文字做 motif。
 */
export function ArticleHero({ useCase }: ArticleHeroProps) {
  if (useCase.heroImage) {
    return <PhotoHero useCase={useCase} />
  }
  return <ProceduralHero useCase={useCase} />
}

function PhotoHero({ useCase }: ArticleHeroProps) {
  return (
    <section
      aria-hidden
      className="border-y-[3px] border-double border-[var(--color-ink)] -mt-px bg-[var(--color-paper-2)]"
    >
      <div className="relative max-w-5xl mx-auto aspect-[16/9]">
        <Image
          src={useCase.heroImage!}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
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
        {/* 頂條：左 issue stamp、右 section + tier badge */}
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

        {/* 中心 motif：seal 風 + 大字 */}
        <div className="flex flex-col items-center">
          <Seal char={motif} size={140} className="text-[6rem] md:text-[8rem]" />
          <p className="mt-6 font-serif text-base md:text-lg tracking-[0.25em] text-[var(--color-ink-soft)]">
            {useCase.subcategory}
          </p>
        </div>

        {/* 裝飾 corner marks */}
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
