'use client'

import { useState } from 'react'
import { Seal } from '@/components/design/Seal'

interface InteractiveLessonCTAProps {
  title: string
  slug: string
  articleRaw: string
}

/**
 * 「與 Claude 一齊行一次」CTA — 喺 use-case 文末出現。
 *
 * 撳一撳：將「tutor 指示 + 成篇文 raw 內容」write 入 clipboard。
 * 讀者去 claude.ai paste 入去，Claude 即用廣東話 step-by-step 帶佢行一次篇文。
 *
 * 呢個 prompt 同 .claude/skills/cantonese-usecase-tutor 入面個 skill 同一個 logic，
 * 只係包裝做一個 portable 嘅 single message，等讀者唔需要 install skill 都用得到。
 */
export function InteractiveLessonCTA({
  title,
  slug,
  articleRaw,
}: InteractiveLessonCTAProps) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const buildPrompt = (): string => `你而家係「我的好朋友 Claude」副刊嘅廣東話 use-case tutor。我啱啱睇咗呢篇〈${title}〉(slug: \`${slug}\`)，想互動行一次。

# 教學流程

**Turn 0 — 開場（一個 turn 搞掂）**
- 用廣東話一句歡迎：「OK，我哋一齊行一次呢篇〈[title 簡短版]〉。」
- Paraphrase 篇文「情境」section 做 conversational 2–3 句廣東話（唔好直接 quote，要 conversational rewrite）。
- 問我 1–2 條 personal question 等我 ground 自己 context。例：「你撞過呢類情況未？」「你想 apply 落邊一 part — 邊個對象、邊件事？」「你而家最 stuck 嗰一 step 係邊？（cold start 就講『未開始』就 OK）」

**Turn 1 到 N — 每個「跟住做」numbered step 一個 turn**
- Explain 呢一 step 嘅 WHY（1–2 句），唔好淨係 paraphrase WHAT。
- 如果 step 入面有 PromptBlock：揀 1–2 個最 context-dependent 嘅 placeholder（唔好揀 tone/format 嗰類 meta），quote 出嚟叫我填。
- 如果 step 冇 PromptBlock（pure setup / install / concept）：問一條 prerequisite check（yes/no）或者 comprehension Q。
- 收到我答案後：
  - 太 vague（例：「我老闆」）— 鼓勵但 push：「『老闆』OK，加埋係邊個 department 同 dynamic、Claude 出嘅 sharp 好多。」
  - 夠 specific — confirm + 微調建議。
  - 明顯 cold start — 唔好卡死，畀 generic placeholder 通過、行落去。
- 過渡：「Ready 行下一 step？」或直接落下一個。

**「變化」section 唔行**——做完 numbered steps 就直接去結尾。

**最終 turn — 交 deliverable（三樣嘢）**

1. **Personalized 「行得即得」block**
   - 如果篇文有 PromptBlock：將個 prompt 完整 reproduce 一次，將我填過嘅 placeholder substitute 入去。冇填嘅留住 \`[原 placeholder text]\`。format 做 markdown code block 等我 copy。
   - 如果篇文係 setup/install/config 教學（冇 PromptBlock）：出個按我 setup 微調嘅 checklist 或 config snippet。

2. **Mindset takeaway**：quote 篇文結尾嗰段 blockquote 嘅核心一句，加你自己 1–2 句廣東話 reflection。

3. **下一步建議**：睇 frontmatter 個 \`related:\` array（如果有），揀 1–2 個 slug，每個一句解釋點解相關。

# Voice 規矩
- **廣東話 ONLY**——用「呢個」「點解」「啲」「嚟」「咁」，唔好用「這個」「為什麼」「的」「來」「這樣」。
- **Anti-hype**——唔好「AI 革命」「未來已嚟」「讓我們一起探索」呢類客套或 buzzword。
- **Specific over generic**——寫實例（「假如你 send 畀老闆」）多過 abstract（「對於利益相關者」）。
- **HK office literacy 假設**——deadline、強積金、vendor、email、WhatsApp、銀行、政府部門等 context 唔使解。
- **每個 turn 80–150 字**（除咗開場 + 結尾可以稍長）——讀者可能喺手機。
- **每個 turn 都要有 reader input hook**——唔好連續 3 個 turn 都係你獨白。

# 重要 guardrails
- **唔好 invent content**——文冇講某個 angle 就唔好憑空加。
- **唔好假裝 understand**——我答得唔 clear 就問返「你意思係 X，定 Y？」
- 任何時候 reproduce prompt：用 \`[方括號]\` 包 placeholder，**唔好用 \`{大括號}\`**。

# 篇文內容（source of truth）

\`\`\`markdown
${articleRaw}
\`\`\`

由 Turn 0 開始問我。`

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(buildPrompt())
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('[InteractiveLessonCTA] clipboard write failed', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section
      aria-labelledby="interactive-lesson-heading"
      className="max-w-3xl mx-auto px-6 my-12"
    >
      <div className="border-2 border-[var(--color-rule-strong)] paper-grain p-6 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <Seal char="試" size={56} />
          <div className="flex-1">
            <h3
              id="interactive-lesson-heading"
              className="font-serif font-black text-xl md:text-2xl text-[var(--color-ink)] mb-2 leading-tight"
            >
              睇完想同 Claude 一齊行一次？
            </h3>
            <p className="font-serif text-sm md:text-base text-[var(--color-ink-soft)] mb-5 leading-relaxed">
              撳一撳，就將成段 tutor 指示（連埋成篇文嘅內容）抄入剪貼簿。
              貼入 Claude.ai 或 Claude Desktop，佢會用廣東話帶你一步一步行，
              每步問你填關鍵位，最後畀返一個專為你情況寫嘅 prompt 帶走。
            </p>
            <button
              type="button"
              onClick={handleClick}
              aria-live="polite"
              className="font-serif font-bold px-5 py-3 bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-seal-deep)] transition-colors rounded-sm"
            >
              {status === 'copied'
                ? '✓ 抄好喇 — 貼入 Claude 就行'
                : status === 'error'
                  ? '✗ 抄唔到，揀晒段文字自己抄'
                  : '撳一撳，抄入剪貼簿 →'}
            </button>
            {status === 'copied' && (
              <p className="mt-4 font-serif text-xs text-[var(--color-ink-mute)]">
                開{' '}
                <a
                  className="underline underline-offset-2 hover:text-[var(--color-seal)]"
                  href="https://claude.ai/new"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  claude.ai/new
                </a>{' '}
                ，撳一下貼（⌘V / Ctrl+V），Claude 就會用廣東話開場。
              </p>
            )}
            {status === 'error' && (
              <p className="mt-4 font-serif text-xs text-[var(--color-seal-deep)]">
                你個瀏覽器唔畀 access 剪貼簿。試吓喺新 tab
                開，或者換 Safari / Chrome。
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
