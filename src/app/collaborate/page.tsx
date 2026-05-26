import type { Metadata } from 'next'
import { Masthead } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { Seal } from '@/components/design/Seal'
import { SectionLabel } from '@/components/design/ColumnRule'
import { EditorByline } from '@/components/design/EditorByline'
import { NewsletterCTA } from '@/components/design/NewsletterCTA'

// ⚠️ TODO before going live:
//   1. Replace CONTACT_EMAIL below with your real collab email.
//   2. (Optional) Fill in pricing anchors after first few clients.
const CONTACT_EMAIL = 'yau@flowstudiohk.com'

export const metadata: Metadata = {
  title: '合作 · Collaborate',
  description:
    '我寫「我的好朋友 Claude」，亦幫人 build 嘢——web app、Shopify、AI workflow 自動化。HK-based，AI-native workflow。',
}

export default function CollaboratePage() {
  return (
    <>
      <Masthead />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <SectionLabel number="◉" label="合作 · COLLABORATE" className="mb-6" />
        <h1 className="font-serif font-black text-4xl md:text-6xl leading-tight mb-6">
          我寫嘢，
          <br />
          亦幫人 build 嘢。
        </h1>

        <div className="flex items-center gap-4 mb-10">
          <Seal char="合" size={64} />
          <EditorByline meta="揾我合作 · BUILD · ADVISE · AUTOMATE" />
        </div>

        <div className="prose-content">
          <p>
            「我的好朋友 Claude」係我寫嘅副刊，記低 HK 場景嘅 Claude 用法。寫嘢之餘，我亦同小團隊、startup、SME 一齊 build 真嘢——web app、Shopify、內部工具、AI workflow 自動化。
          </p>

          <p>
            如果你嗰邊有個 idea 想 ship，或者一個 process 重重複複嘥緊員工時間，呢一頁係我 typically 點 work、做邊類嘢、唔做邊類嘢。讀完仲想傾 → email 我。
          </p>

          <h2>讀緊呢個 site 嘅人</h2>
          <ul>
            <li><strong>HK 25-45 歲</strong>——打工仔、老闆、創作者、學生家長、消費者</li>
            <li>對 AI 持<strong>懷疑但開放</strong>——唔係 hype crowd</li>
            <li>主要 sections：寵物、遊戲、旅遊、商家</li>
            <li>Cantonese-literate，鐘意 HK 場景具體 detail</li>
          </ul>

          <h2>三個我帶嚟嘅 edge</h2>

          <h3>1. AI-native 速度 3-5x</h3>
          <p>
            唔係「我加咗 AI 幫手」嗰類。我 workflow 整個 built around <strong>Claude Code + parallel agent worktrees</strong>——code generation、review、testing、deploy 全部 agent-augmented。同 traditional dev 比，相同 scope 嘅 timeline 短 3-5 倍。
          </p>

          <h3>2. Production shipping evidence</h3>
          <p>
            我 ship 過嘅嘢唔係 tutorial code，係 production system：
          </p>
          <ul>
            <li><strong>StockFlow POS</strong>——multi-tenant retail platform，Supabase RLS、Shopify bidirectional sync、HK 零售場景</li>
            <li><strong>Bull Kicks</strong>——Shopify Plus 自定 storefront，Lighthouse perf 34 → 85，包 lifestyle redesign + 5 個 AI photo + typography overhaul</li>
            <li><strong>我的好朋友 Claude</strong>——你而家睇緊呢個 site，Next.js + Velite + 報紙視覺 design system</li>
          </ul>

          <h3>3. HK 場景 literacy</h3>
          <p>
            唔需要解釋乜嘢係 MPF、點解 SME 用 WhatsApp 多過 email、二手貨 supplier 點 source、強積金扣稅項點計。我喺呢個 context 已 native，溝通直接落地。
          </p>

          <h2>四種傾偈方式</h2>

          <h3>一．AI-augmented MVP build</h3>
          <p>
            旗艦 service。你有個 idea——SaaS、internal tool、客 facing app——想 ship。
          </p>
          <ul>
            <li><strong>Stack</strong>：Next.js + Supabase + Claude Code agent workflow</li>
            <li><strong>Format</strong>：4-8 週、weekly demo、source code 你完全 own</li>
            <li><strong>Output</strong>：production-deployed app（Vercel / 自己 host 都得）+ Git repo + 文件</li>
            <li><strong>Cost</strong>：視乎 scope，傾完出 written quote</li>
            <li><strong>唔啱</strong>：enterprise compliance heavy / 需要 dedicated FT engineering team / native mobile（iOS / Android）</li>
          </ul>

          <h3>二．Shopify custom theme / app</h3>
          <p>
            Bull Kicks-level brand + performance。
          </p>
          <ul>
            <li><strong>Scope</strong>：custom theme、checkout customization、Storefront API integration、custom Shopify app（如：inventory sync、POS integration、自動化 fulfillment）</li>
            <li><strong>Format</strong>：2-6 週，視乎 customization level</li>
            <li><strong>Output</strong>：performance budget hit（Lighthouse 80+）、brand-aligned visual、文件交接</li>
            <li><strong>適合</strong>：HK / 亞洲 SME 想 launch / migrate / scale 個 Shopify store</li>
          </ul>

          <h3>三．AI workflow audit + automation build</h3>
          <p>
            公司 5-30 人。每個員工每星期花 5-10 小時做 repetitive task——報表、email、客 enquiry、報價、inventory 對賬。
          </p>
          <ul>
            <li><strong>Week 1</strong>：入嚟 audit，跟 3-5 個員工 shadow，pin 邊啲 task 自動化 ROI 最高，design workflow</li>
            <li><strong>Week 2-4</strong>：build + deploy 第一個 automation（Claude Skill / n8n / custom integration）</li>
            <li><strong>Output</strong>：1-3 個 production automation + 員工短訓 + 1 份 ROI report</li>
            <li><strong>唔似</strong>：傳統顧問——我哋唔淨係出 PowerPoint，係 build 同 deploy</li>
          </ul>

          <h3>四．Pair-build day</h3>
          <p>
            一日 paired session（remote 或 in-person HK）。你 own laptop，我 own laptop，screen share。
          </p>
          <ul>
            <li><strong>Use case</strong>：你想學 Claude Code、stuck 喺一個 bug、想 prototype 一個 idea、想 spin up 一個 internal tool</li>
            <li><strong>Format</strong>：1 日 8 小時 + 1 hr lunch buffer</li>
            <li><strong>Output</strong>：一日內 ship to staging + 你帶走嘅 workflow knowledge</li>
            <li><strong>適合</strong>：solo founder、細 team、自己學嘢嘅 dev、想 sample 我 working style 嘅 client</li>
          </ul>

          <h2>唔做嘅嘢</h2>
          <ul>
            <li>「AI 革命」/「未來已嚟」generic hype content</li>
            <li>MLM、高 risk 投資、crypto pump-and-dump</li>
            <li>Native mobile app（React Native / iOS / Android）——冇 portfolio evidence，唔接</li>
            <li>Deadline-rush content（48 hr 內必須 ship 嗰類 emergency）</li>
            <li>Ghostwriting on someone else's platform——我寫嘅嘢只 publish 喺呢度</li>
            <li>「Build 一個 ChatGPT killer」/「Vibe coding 出個 SaaS 30 日上 line」嗰類 unrealistic scope</li>
          </ul>

          <h2>點 contact</h2>
          <p>
            <strong>Email</strong>：<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
          <ul>
            <li><strong>Subject prefix</strong>：「[合作] 一句 summary」——方便我 triage</li>
            <li><strong>內容</strong>：你係邊個、想 build 咩、有冇 deadline、budget range（如有）</li>
            <li><strong>Response time</strong>：5-7 working days。Urgent rush 唔做。</li>
            <li><strong>HK 客戶優先</strong>，但 remote 國際 client 都接（Bull Kicks 已 ship global）</li>
          </ul>

          <h2>FAQ</h2>

          <h3>收費點計？</h3>
          <p>
            未開始講 scope 前報 number 對你對我都唔 fair。傾完 scope + timeline + deliverable，我會出 written quote。一般 MVP build 嘅 ballpark：HK 5-figure 起；workshop / pair-build day 嘅 ballpark：HK 4-figure。
          </p>

          <h3>Source code / IP 邊個 own？</h3>
          <p>
            你 client 完全 own。我交付 = MIT-style 你想點用都得。我會 keep 一個 anonymized version 喺自己 reference repo 學嘢用，但唔會 publish。
          </p>

          <h3>Maintenance / 後續 update?</h3>
          <p>
            Build 完之後可以傾 monthly maintenance retainer（reasonable rate），或者你 hire 自己 dev 接手——我會交完整文件 + walk-through。
          </p>

          <h3>Exclusivity？</h3>
          <p>
            我可以同唔同 industry 嘅 multiple client 同時 work。但 same 直接 competitor（e.g. 兩間做同樣產品嘅 startup）我會 disclose，client 接受先 take。
          </p>

          <h3>你會用 AI 寫嘅 code 嗎？</h3>
          <p>
            會。我嘅 workflow 整個 built around Claude Code。但所有 code 都係我自己 review、test、debug、deploy——AI agent 唔等於 outsource，係 multiplier。你 final 接收 嘅 code 同 traditional dev 寫嘅冇分別，可能 quality 仲高（因為 multiple review iterations cheap）。
          </p>

          <h3>我未 ready commit 一個 project，可唔可以先傾下？</h3>
          <p>
            可以。Pair-build day 就係呢個 use case——一日 trial，我哋 see fit。或者直接 email 我問下，我 typically 30 分鐘 free intro call 都 OK。
          </p>

          <blockquote>
            我 build 每樣嘢都係問自己：「呢個 system 對 client 真係解決問題？」唔淨係寫 code，係 design 一個 client 用得到嘅工具。傾偈時你會見到呢個 mindset。
          </blockquote>

          <p>
            <em>—— 寫嘢 + build 嘢嘅人</em>
          </p>
        </div>
      </main>
      <NewsletterCTA />
      <Footer />
    </>
  )
}
