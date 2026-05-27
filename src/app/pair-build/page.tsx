import type { Metadata } from 'next'
import Link from 'next/link'
import { Masthead } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { Seal } from '@/components/design/Seal'
import { SectionLabel } from '@/components/design/ColumnRule'
import { EditorByline } from '@/components/design/EditorByline'

// 你日後 join Calendly / Tally 之後填 URL，UI 即時 swap 為 embed booking。
// 暫時 fallback：直接 email yau@flowstudiohk.com
const BOOKING_URL = process.env.NEXT_PUBLIC_PAIR_BUILD_BOOKING_URL ?? ''
const CONTACT_EMAIL = 'yau@flowstudiohk.com'

export const metadata: Metadata = {
  title: 'Pair-build day · 一日同你 ship 嘢',
  description:
    '一日 paired session — 你 own laptop 我 own laptop，screen share，朝 10 晚 6 一齊 build 你嗰個卡住嘅 project。Claude Code + AI-augmented workflow 實戰示範，當日 ship 到 staging。HK $5-15k。',
  keywords: [
    'pair programming HK',
    'Claude Code workshop',
    'AI dev pair session',
    'developer mentorship HK',
    'AI MVP 一日 build',
    '香港 AI consultant',
  ],
  openGraph: {
    title: 'Pair-build day · 一日同你 ship 嘢',
    description:
      '一日 paired build session，朝 10 晚 6 同你 ship 個 stuck 嘅 project。',
    type: 'website',
  },
}

export default function PairBuildPage() {
  const hasBooking = Boolean(BOOKING_URL)

  return (
    <>
      <Masthead />
      <main className="max-w-3xl mx-auto px-6 py-12">
        <SectionLabel
          number="◉"
          label="PAIR-BUILD DAY · 一日 build 嘢"
          className="mb-6"
        />

        <h1 className="font-serif font-black text-4xl md:text-6xl leading-tight mb-8">
          一日。
          <br />
          同你 ship 嘢。
        </h1>

        <div className="flex items-center gap-6 mb-12">
          <Seal char="日" size={64} />
          <EditorByline meta="PAIR · BUILD · SHIP · 朝 10 晚 6" />
        </div>

        <div className="prose-content">
          <p>
            一日 paired session。你 own laptop，我 own laptop，screen share。
            朝 10 晚 6（食晏 1 hr buffer）一齊 build 你嗰個卡住咗嘅 project。
          </p>

          <p>
            <strong>唔係 workshop、唔係 lecture、唔係 PowerPoint
            consulting</strong>——係兩個人坐喺度，你話想做咩，我哋一齊
            ship 到 staging 為止。
          </p>

          {/* ───────── 點解 pair-build ───────── */}
          <h2>點解唔自己 google / 自己 prompt 解決？</h2>

          <p>
            如果你已經坐喺度 google 過幾日、prompt 過 Claude 幾十次都 stuck
            喺度——通常唔係知識問題，係 <strong>workflow 問題</strong>：
          </p>

          <ul>
            <li>用緊 Claude Chat copy-paste 嚟回，根本應該開 Claude Code</li>
            <li>嗰個 bug Claude 解唔到，係因為你 prompt 冇畀啱
              context（你冇話佢睇邊個 file）
            </li>
            <li>你 setup 卡咗喺一個 env / permission / config issue，自己
              google 唔到啱嘅答案
            </li>
            <li>你 architecture 一早行歪咗，每次想加 feature 都要重寫</li>
          </ul>

          <p>
            呢類 friction，<strong>同一個用 Claude 兩年嘅人坐 6 個鐘，
            通常半日就 unblock</strong>。
          </p>

          {/* ───────── A typical day ───────── */}
          <h2>典型一日</h2>

          <ul>
            <li>
              <strong>10:00 – 10:30</strong>：傾你個 project、痛點、想 ship
              咗咩出嚟。Confirm 今日 scope（must / should / nice-to-have）
            </li>
            <li>
              <strong>10:30 – 12:30</strong>：setup（如果未 setup）
              + 開工。我 demo 我嘅 workflow，你跟住做
            </li>
            <li>
              <strong>12:30 – 13:30</strong>：lunch buffer
            </li>
            <li>
              <strong>13:30 – 16:30</strong>：主菜——build、debug、refactor
              邊個係 must。一齊 ship 第一個 milestone 上 staging
            </li>
            <li>
              <strong>16:30 – 17:30</strong>：再衝一個 milestone，或者收尾
              + cleanup
            </li>
            <li>
              <strong>17:30 – 18:00</strong>：handoff doc——今日做咗咩、未做
              咗咩、下一步、佢 own laptop 點繼續
            </li>
          </ul>

          <p>
            朝 10 晚 6 = 7 個鐘真正 build 時間，唔包食晏。 <strong>強度同
            日常返工差唔多</strong>——唔係 4 小時 chill workshop。
          </p>

          {/* ───────── 啱邊個 ───────── */}
          <h2>啱邊個</h2>

          <ul>
            <li>
              <strong>Solo founder / indie hacker</strong>——MVP 卡咗喺
              認知 / setup / 第一個 deploy
            </li>
            <li>
              <strong>2-5 人嘅 dev team lead</strong>——想引入 Claude Code
              workflow 但唔知由邊度開始
            </li>
            <li>
              <strong>由其他 stack 過渡嘅 dev</strong>——想學 Next.js /
              Supabase / Shopify Hydrogen 等等，停留喺 tutorial 級唔上到
              真 project
            </li>
            <li>
              <strong>想 sample 我 working style 嘅 client</strong>——大
              project commit 之前一日試水，啱 fit 再傾 4-8 週 MVP build
            </li>
          </ul>

          <h2>唔啱邊個</h2>

          <ul>
            <li>
              冇 specific project / 純粹想「學 AI 點用」——你應該睇我嘅
              副刊文章先（免費），再諗清楚
            </li>
            <li>
              想 outsource 寫晒 code——pair-build 係 with you，唔係 for you
            </li>
            <li>
              Stack 我冇用過嘅（Java enterprise、Rails legacy、native
              mobile）——畀我 add value 唔到
            </li>
            <li>
              48 hr 內要 ship to production——pair-build 出 staging，唔做
              production push（除非已經 set 好 CI/CD）
            </li>
          </ul>

          {/* ───────── 過往 case ───────── */}
          <h2>過往 pair-build session（sample）</h2>

          <p>
            <em>
              （Case study 詳細寫緊。以下係幾個 reference example，標 *
              嗰啲係 anonymized client。）
            </em>
          </p>

          <ul>
            <li>
              <strong>HK Shopify Plus brand owner</strong> *——卡喺 custom
              theme 嘅 cart drawer JS。一日由 manually toggle 變
              Liquid + Alpine.js state machine，Lighthouse perf
              78 → 92
            </li>
            <li>
              <strong>新加坡 SaaS founder</strong> *——MVP 第一版用 Bubble
              砌完想 migrate Next.js + Supabase。一日 ship 到 auth + 3 個
              core CRUD page 上 staging
            </li>
            <li>
              <strong>HK 細店主 → mini SaaS</strong> *——將自家內部
              用緊嘅 Google Sheet 報表 logic 包成可以 sell 嘅 web app。
              一日 ship landing + signup + 第一個 paid feature
            </li>
            <li>
              <strong>Indie dev → Claude Code 入門</strong> *——之前
              full Cursor + GPT-4，一日學 worktrees + subagents +
              MCP 點 set，工作流程 3-5× 速度
            </li>
          </ul>

          {/* ───────── 收費 ───────── */}
          <h2>收費</h2>

          <ul>
            <li>
              <strong>HK$5,000 – HK$15,000 一日</strong>，視乎 scope
              + 你 stack 我熟唔熟悉
            </li>
            <li>
              呢個 range 嘅 anchor：細 project / solo founder ~5-8k；
              SME 客 + 多人觀摩 / 我哋熟 stack ~10-15k
            </li>
            <li>
              <strong>包：</strong>1 日 pair session、handoff doc、之後 7
              日 async follow-up（email / Slack DM 跟手尾）
            </li>
            <li>
              <strong>唔包：</strong>之後嘅 maintenance / 第二日 follow-up
              session（要傾另一單）
            </li>
            <li>
              Remote（Zoom / Tuple / Google Meet）或者 in-person
              HK（你個 office / 我哋約 cafe）都得
            </li>
          </ul>

          {/* ───────── 流程 ───────── */}
          <h2>流程</h2>

          <ol>
            <li>
              <strong>你 book 一日</strong>（下面 CTA 預約 / email）
            </li>
            <li>
              <strong>前一個禮拜 30 分鐘 intro call</strong>——傾你 project
              現狀、scope、確認 fit。如果唔 fit 我會直接講
            </li>
            <li>
              <strong>付半費 deposit</strong>——confirm 嗰日
            </li>
            <li>
              <strong>當日 10:00 開始 ship 嘢</strong>
            </li>
            <li>
              <strong>之後 7 日 async follow-up</strong>——你跟住做嗰陣
              撞到嘅 quick question，我 reply
            </li>
            <li>
              <strong>剩低半費結清</strong>
            </li>
          </ol>

          {/* ───────── FAQ ───────── */}
          <h2>FAQ</h2>

          <h3>Stack 你熟咩？</h3>
          <p>
            主力 Next.js / TypeScript / Supabase / Postgres / Tailwind /
            shadcn / Shopify Liquid + Hydrogen / Stripe / Vercel /
            Claude Code 全套 dev workflow。Python / FastAPI / Astro 都做過
            但 less 主力。Native mobile（iOS / Android）唔接。
          </p>

          <h3>如果我冇個 specific project，淨係想學 Claude Code？</h3>
          <p>
            一日可以開個 toy project 教你 setup + workflow——例如「起一個
            自己用嘅 dashboard」或者「將你嘅 GitHub repo 接落 Claude Code
            + MCP」。但你最好有個 idea / repo 喺手，呢類 abstract
            learning 一日效率較低。
          </p>

          <h3>呢個收費同請一個 senior dev 點比？</h3>
          <p>
            HK senior dev 大概 HK$1,200-2,500 / 日（contract），10-15k 嘅
            range 顯然貴啲。Pair-build 嘅 value 唔係「我幫你寫 code」，係
            「我幫你 unblock + workflow design + 教 transfer
            knowledge」。如果你純粹想請人寫嘢，pair-build 唔係最 cost-
            efficient 嘅選擇——hire dev 啱啲。
          </p>

          <h3>遠距離 vs 親身？</h3>
          <p>
            兩個 yield 我覺得差唔多。Remote 嘅 advantage：你係自己 setup
            最 efficient。In-person 嘅 advantage：白板畫 architecture
            +食晏傾偈嘅 byproduct。你揀。
          </p>

          <h3>取消 / rescheduling policy？</h3>
          <p>
            > 14 日前取消：full refund。 7-14 日前：deposit 唔退但可以
            reschedule 一次。 &lt; 7 日：deposit 唔退、reschedule 我盡量
            accommodate 但唔保證有 slot。
          </p>

          <h3>NDA / IP 邊個 own？</h3>
          <p>
            你 client 完全 own 嗰日寫嘅 code 同 architecture。我會 keep
            一個 anonymized「workflow lessons learned」notes 做 internal
            reference，唔會 publish。NDA 簽嘅話我都 OK。
          </p>

          {/* ───────── 預約 CTA ───────── */}
          <h2 id="book">預約</h2>

          {hasBooking ? (
            <div className="my-8 border-2 border-[var(--color-rule-strong)] paper-grain p-6">
              <p className="font-serif text-sm text-[var(--color-ink-soft)] mb-4">
                揀啱日子，30 分鐘 intro call 我哋傾下 fit 唔 fit：
              </p>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 font-serif font-bold bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-seal-deep)] transition-colors rounded-sm no-underline"
              >
                預約 intro call →
              </a>
            </div>
          ) : (
            <div className="my-8 border-2 border-[var(--color-rule-strong)] paper-grain p-6">
              <p className="font-serif text-sm text-[var(--color-ink-soft)] mb-4">
                Booking system 仲未接 — 暫時直接 email 預約：
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('[Pair-build] 想預約一日 session')}&body=${encodeURIComponent('Hi，我想預約 pair-build day。\n\n我嘅 project / stack：\n想 ship 嘅 milestone：\n你 prefer 嘅日子（任意 2-3 個 weekday）：\n預算 range：\n\n等你 reply confirm intro call。')}`}
                className="inline-block px-6 py-3 font-serif font-bold bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-seal-deep)] transition-colors rounded-sm no-underline"
              >
                Email 預約 →
              </a>
              <p className="mt-4 font-serif text-xs text-[var(--color-ink-mute)]">
                收到後 1-2 個 working day 內覆。 Subject 入面寫 prefix
                <code>[Pair-build]</code>，方便我 triage。
              </p>
            </div>
          )}

          <p className="mt-12 text-sm text-[var(--color-ink-mute)]">
            <em>
              想睇我哋日常 build 緊咩、用緊邊啲 workflow？返{' '}
              <Link href="/" className="underline">首頁</Link> 睇副刊嘅 use
              case，或者去{' '}
              <Link href="/collaborate" className="underline">/collaborate</Link>{' '}
              睇其他 service offering（4-8 週 MVP build、Shopify、AI
              workflow audit）。
            </em>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
