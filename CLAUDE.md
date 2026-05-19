# 我的好朋友 Claude — Claude Code Config

## Stack

Next.js 15 (App Router) + TypeScript (strict) + MDX + Velite + Tailwind v4 + Pagefind + Vercel。 純內容站、無 DB、無 auth。

## Commands

- `pnpm dev` — Start dev server (parallel: velite --watch + next dev)
- `pnpm build` — Full build: velite → next build → pagefind index
- `pnpm typecheck` — TypeScript strict check, 改完 schema 要跑
- `pnpm lint` — ESLint
- `pnpm pagefind` — 單獨 rebuild search index

## Development Rules

- TDD 唔強制（呢個係內容站，邏輯極少），但 schema 改 / lib helper 要寫單元測試
- 3 attempts max — 同一個 approach 試三次唔得就 stop 重新諗
- IMPLEMENTATION_PLAN.md — 大改動先 stage plan
- **唔好直接 hardcode 顏色** — 用 `globals.css` 入面個 `@theme` block 嘅 token（`var(--color-seal)` etc.）
- **副刊 metaphor 要 consistent** — 加新 page 之前諗清楚屬於門面層、列表層、定內容層（睇 README）
- 廣東話文案先寫、再 review；唔好出 lorem ipsum 同 placeholder text

## File Conventions

- Components: PascalCase（`Masthead.tsx`、`UseCaseCard.tsx`）
- Hooks: camelCase + use prefix（暫未有）
- Lib utilities: camelCase（`formatMastheadDate`、`getAllUseCases`）
- MDX use cases: kebab-case slug（`tsa-homework-helper.mdx`）
- Route: kebab-case（`/use-cases/[slug]`）

## MDX Gotchas

- **`{...}` 喺 MDX 入面係 JSX expression**，prerender 會試評估佢做 JS。寫 placeholder 嘅時候用 `[placeholder]`、`「placeholder」` 或 `《placeholder》`，唔好用 `{placeholder}`，否則 build 會死喺 `ReferenceError: xxx is not defined`。
- 呢個 gotcha 喺 `<PromptBlock>` 入面尤其要小心，因為 PromptBlock children 係 MDX JSX context。

## Content Schema

MDX frontmatter schema 喺 `velite.config.ts`。改 schema 嘅時候：
1. 改 `velite.config.ts`
2. 改 `src/lib/content.ts` 嘅 helper（如果 query 邏輯影響到）
3. 改 `src/components/use-case/UseCaseHeader.tsx` 或 `UseCaseCard.tsx` 嘅 render
4. 跑 `pnpm typecheck` 確認

## Design System

Source of truth：`src/app/globals.css` 入面個 `@theme` block。
副刊靈魂三件套：
- **紅印章**（`<Seal />`）— 識別記號，每頁都應該有至少一個
- **宋體標題**（`var(--font-serif)`）— H1/H2 永遠用
- **農曆日期 + 期號**（`<DateLine />` / `formatIssueNumber()`）— 副刊感嘅錨點

唔可以 break：
- **唔好用 chatbot / robot / AI 工具感重嘅 icon**（roboty、generic SaaS）
- **唔好用圓角 > 4px**（副刊係 print metaphor，唔係 web 2.0 卡片）
- **唔好用漸變色**（gradient）

## Deployment

Vercel。Push 去 `main` 自動 deploy。Region: `hkg1`（喺 `vercel.json`）。 環境變數喺 `.env.local.example`，喺 Vercel project settings 設置。
