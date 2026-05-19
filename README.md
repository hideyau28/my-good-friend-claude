# 我的好朋友 Claude

> 一齊由零開始用 Claude — 寫畀香港人嘅獨立 AI 教學副刊。

Tech stack：Next.js 15 (App Router) · TypeScript · MDX · Velite · Tailwind v4 · Pagefind · Vercel。

純內容站，冇 DB、冇 auth。每個 use case 係一個 MDX 檔，frontmatter 包住 metadata，Velite 編譯成 type-safe content layer。

## 快速跑

```bash
# 1. Install deps
pnpm install

# 2. (一次) copy env
cp .env.local.example .env.local

# 3. Run dev server (會同時 watch MDX)
pnpm dev
# → http://localhost:4321

# 4. Production build (build + Pagefind index)
pnpm build
pnpm start
```

第一次 `pnpm dev` 跑嘅時候 Velite 會 generate 一個 `.velite/` 目錄畀 TypeScript 識得 `#site/content`。如果 import 紅線，重啟 dev server。

## 加一篇新 use case

```bash
content/use-cases/your-slug.mdx
```

Frontmatter 範例 — 跟 `velite.config.ts` 嘅 schema：

```yaml
---
title: "你嘅標題（廣東話、scannable）"
slug: "your-slug"
issue: 25                          # 期號（自動排序用）
publishedAt: 2026-05-26
audience: ["打工仔"]                 # 打工仔 / 老闆 / 學生家長 / 創作者 / 消費者
category: "chat"                   # chat / cowork / code
subcategory: "寫嘢同溝通"
difficulty: 1                      # 1-3 星
timeMinutes: 10
toolsNeeded: ["Claude Chat"]
description: "一句講晒嘅 lead，會用喺 SEO meta + 列表卡。"
keywords: ["claude", "..."]
related: ["other-slug"]            # 「下期預告」用
featured: true                     # 上首頁
---

## 情境
...

<PromptBlock label="完整 prompt">
（你嘅 prompt 內容）
</PromptBlock>
```

可用 MDX components：

- `<PromptBlock label="...">` — 帶 copy 掣嘅 prompt 框
- `<Seal char="X" />` — 紅印章內聯版

## 目錄結構

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (字體、metadata)
│   ├── page.tsx            # 首頁（副刊滿載）
│   ├── about/page.tsx      # 關於本副刊
│   ├── use-cases/
│   │   ├── page.tsx        # Use case 庫列表
│   │   └── [slug]/page.tsx # 單個 use case（清潔內頁）
│   ├── api/newsletter/route.ts
│   ├── not-found.tsx
│   └── globals.css         # Tailwind v4 + 副刊 design tokens
├── components/
│   ├── design/             # 副刊 design system
│   │   ├── Masthead.tsx    # 報頭（滿載 + 縮細兩版）
│   │   ├── Seal.tsx        # 朱紅印章
│   │   ├── DateLine.tsx    # 二〇二六年五月十九日 · 農曆…
│   │   ├── ColumnRule.tsx  # 欄目線 + SectionLabel
│   │   ├── EditorByline.tsx
│   │   ├── NewsletterCTA.tsx
│   │   └── Footer.tsx
│   └── use-case/
│       ├── UseCaseCard.tsx
│       ├── UseCaseHeader.tsx
│       ├── PromptBlock.tsx  (client component)
│       ├── RelatedNext.tsx  # 下期預告
│       └── MdxRenderer.tsx
├── lib/
│   ├── content.ts          # 由 Velite import + helpers
│   ├── date.ts             # 公曆 → 農曆、期號 format
│   └── utils.ts            # cn() helper
└── ...

content/
├── use-cases/              # MDX use case files
└── pages/                  # 其他 long-form pages (未用)

velite.config.ts            # Content schema
next.config.mjs             # Velite build hook
postcss.config.mjs          # Tailwind v4 + PostCSS
```

## 部署到 Vercel

```bash
vercel
```

或者連 GitHub repo，push 上 main 就 auto deploy。`vercel.json` 已經 set 咗 `pnpm build`（會跑 Velite + Next build + Pagefind）。

如果 Pagefind 喺 Vercel build 有 issue，可以暫時 disable：將 `package.json` 入面 `build` script 嘅 `&& pnpm pagefind` 拎走。

## 對應設計參考

Design 來源係 `/outputs/design/supplement.html`（副刊風 — 方向 D）。Pattern 2 落地：
- **首頁 + About + 訂閱頁** → 副刊滿載（用 `<Masthead />`）
- **Use case 庫 + 單頁** → 副刊輕量（用 `<MastheadCompact />`，但保留紅印章、宋體標題、農曆日期、編者撰、下期預告）
