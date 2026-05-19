import type { Metadata } from 'next'
import { Masthead } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { Seal } from '@/components/design/Seal'
import { SectionLabel } from '@/components/design/ColumnRule'
import { EditorByline } from '@/components/design/EditorByline'
import { NewsletterCTA } from '@/components/design/NewsletterCTA'

export const metadata: Metadata = {
  title: '關於本副刊',
  description: '一個香港人，用 Claude 兩年，記低真係 work 嘅做法。',
}

export default function AboutPage() {
  return (
    <>
      <Masthead />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <SectionLabel number="◉" label="關於 · ABOUT" className="mb-6" />
        <h1 className="font-serif font-black text-4xl md:text-6xl leading-tight mb-6">
          一個香港人，
          <br />
          想記低真係 work 嘅做法。
        </h1>

        <div className="flex items-center gap-4 mb-10">
          <Seal char="撰" size={64} />
          <EditorByline meta="一個香港人 · 二〇二六年五月起連載" />
        </div>

        <div className="prose-content">
          <p>
            呢度唔係科技雜誌，亦唔係 AI 速成班。佢係寫畀「日日要做嘢、又覺得 AI 好離地」嘅香港人睇嘅——你嘅工作可能同 AI 完全冇關係，但你都應該識用。
          </p>

          <p>
            每一期我會揀一個真實香港情境——老闆畀份報告要 summary、小朋友功課唔識教、IG caption 寫到無感覺——拆解步驟，畀埋現成 prompt 你 copy 即用。
          </p>

          <blockquote>
            呢度冇人會 sell 你 course、冇人會話你「再唔學 AI 就會失業」。
            只係一個用咗 Claude 兩年嘅香港人，記低佢覺得真係 work 嘅做法。
            如果有用，慢慢嚟；冇用，唔好勉強。
          </blockquote>

          <h2>點解係副刊？</h2>
          <p>
            因為呢度唔係日日新聞，係慢慢儲嘅一本書。
            副刊嘅好處係：你可以一期一期睇，亦可以喺幾年之後翻返出嚟搵嗰個你忘記咗點做嘅情境。
            每一篇 use case 都係一個「期」，有編號、有日期，方便你日後翻睇。
          </p>

          <h2>邊個適合睇？</h2>
          <ul>
            <li><strong>打工仔</strong>——寫 email、整 PPT、做 research、執報告。</li>
            <li><strong>小店主</strong>——回覆客戶、寫 caption、整 menu、跑數。</li>
            <li><strong>學生家長</strong>——陪小朋友做功課、解釋概念、整溫習表。</li>
            <li><strong>創作者</strong>——brainstorm、起標題、改文案、剪 transcript。</li>
            <li>同埋——任何一個「想識用，但覺得 AI 教學都係寫畀工程師睇」嘅香港人。</li>
          </ul>

          <h2>幾耐出一篇？</h2>
          <p>
            每星期日早上九點，準時出一篇。訂閱咗就會收到 email；你亦可以直接喺呢個網站翻睇所有舊期。
          </p>
        </div>
      </main>
      <NewsletterCTA />
      <Footer />
    </>
  )
}
