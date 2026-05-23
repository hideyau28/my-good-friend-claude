# 📋 SESSION HANDOFF — my-good-friend-claude

_Last session ended: 2026-05-24, 24 articles + 1 new section + 1 collab page shipped_

## 🌐 Live URLs

- Production: https://my-good-friend-claude.vercel.app
- Collab page: https://my-good-friend-claude.vercel.app/collaborate
- Repo: https://github.com/hideyau28/my-good-friend-claude
- Dev port: 4321 (launch.json name: `next-dev`)
- Project dir: symlinked at `/Users/ngyau/stockflow-pos/.my-good-friend-claude`

## 📊 Current state (top of main)

- Top commit: `8b69c23` fix(content): trim MCP article description
- **84 articles** (chat 61 / cowork 11 / code 12) — 42 featured
- **12 sections** — 財經 · 職場 · 商家 · 親子 · 寵物 · 生活 · 健康 · 旅遊 · 文化 · 科技 · 遊戲 · 其他
- Highest issue: **088**
- Next issue: **089**

### Section counts (per .velite/useCases.json)

| Section | Articles | Subtitle |
|---|---|---|
| 商家 | 13 | 小店 · 自動化 · 出單 |
| 科技 | 12 | Code · 工具 · 設定 |
| 親子 | 9 | 功課 · 學校 · 教養 |
| 遊戲 | 9 | 攻略 · 抽卡 · 玩 game 輔助 |
| 寵物 | 8 | 獸醫 · 飲食 · 行為 |
| 職場 | 7 | 搵工 · 合約 · 寫嘢 |
| 財經 | 7 | 報稅 · 保險 · 投資 |
| 生活 | 6 | 醫健 · 飲食 · 行程 |
| 健康 | 4 | 睡眠 · 運動 · 心理 _(NEW this session)_ |
| 文化 | 4 | 寫作 · 創作 · 翻譯 |
| 旅遊 | 4 | 簽證 · 行程 · packing |
| 其他 | 1 | 冇得分類嘅冷門 use case |

## 🛠 Key infra files

| File | Purpose |
|---|---|
| `velite.config.ts` | Content schema + SECTION enum |
| `src/lib/content.ts` | SECTIONS / CATEGORY_BADGES / SECTION_DESCRIPTIONS / TIER_CURRICULUM / pickFirstRead |
| `src/components/design/Masthead.tsx` | 報頭 — nav 「關於 · 合作 · 訂閱」 |
| `src/components/design/SubNav.tsx` | 'use client' — section nav with active-state |
| `src/app/collaborate/page.tsx` | `/collaborate` page — TSX, ⚠️ CONTACT_EMAIL placeholder still active |
| `scripts/import-hero.mjs` | Single hero PNG → webp + frontmatter |
| `scripts/batch-import-heroes.mjs` | Batch import with fuzzy slug match |
| `HERO-PROMPTS-BATCH.md` | 48 hero prompt ready to copy (issues 50-77) |

## 🎨 Hero illustration status

- **Master style**: 16:9 cream paper / 4-color (#FBF7EA #F7F2E2 #C42424 #0F0B05) / ink hatching / no faces / vermillion 朱紅 印章 corner
- **Done**: 24 + 24 = **48 articles have heroes** (mostly session 1 + sessions 2-3 batch 1)
- **Pending**: 11 articles (issues 78-88, tutorials) — prompts NOT YET appended to HERO-PROMPTS-BATCH.md
- **Tooling**: `node scripts/batch-import-heroes.mjs` (drop PNGs in `/Volumes/PSSD/Downloads/` with filename pattern `N. {section} [#issue] — {slug-stem}.png`)

## 🔓 Open backlog (priority order)

### 🔥 Quick wins
1. **Append 11 tutorial hero prompts** (issues 78-88) to HERO-PROMPTS-BATCH.md — 10 min
2. **Replace `/collaborate` email** placeholder (`hello@my-good-friend-claude.com`) — production launch-ready blocker
3. **Pricing anchors** on `/collaborate` FAQ — after first paid quote

### ✍️ More articles (if you want to keep writing)
- **職場 deepen** — interview prep / salary negotiation / 同事 conflict / promotion 點 ask
- **文化 deepen** — 自家 substack 起步 / 中譯英 polish / book club 帶讀 / 海外 conference 投稿
- **旅遊 deepen** — 老人家 trip / 蜜月 trip / business trip prep / 海外 medical emergency
- **生活 deepen** — HK 細空間 home setup / 搬屋 logistics / 同 partner 同住 first time
- **健康 deepen** (just launched) — 經期管理 / 男士 prostate check / 大病 second opinion / 老人家 護理

### 🎨 Hero illustrations
- 11 tutorial heroes (78-88) — append prompts → user generates → batch import

### 🔧 Polish
- Homepage `/` — add tutorial section / CTA pointing to `/learn/cowork` + `/learn/code`
- `/learn/cowork` + `/learn/code` — verify new tutorials surface correctly (auto via velite, but check)
- OG image gen — Velite occasionally times out fetching Google Fonts (handoff 1 note)
- Custom domain (currently `my-good-friend-claude.vercel.app`)
- `/collaborate` Calendly / Tally form upgrade later

## 🚀 How to resume

下個 session 揀任一句直接 ping：

- 「開 my-good-friend-claude，繼續寫文章 + 出 hero — 睇 HANDOFF」
- 「Append 11 個 tutorial hero prompts」
- 「改 /collaborate email 做 [real-email]」
- 「Preview server start」（會跑 next-dev port 4321）
- 「我出咗 hero 圖喺 /Volumes/PSSD/Downloads/，import 全部」
- 「我想 deepen [section name]」

## 🔑 Conventions to keep

### Content
- **Issue number sequential**, next = `089`
- **Cantonese voice**, HK detail (街名、銀行、店名、政府部門)
- **Article structure**: 情境 → 跟住做 (4 steps) → 變化 (3) → 一個 mindset
- **PromptBlock label**: `完整 prompt — XXX` 或 `變化 N — XXX`
- **Featured = true** 嗰啲先做 hero illustration
- **印章 字** = subcategory 嘅 representative 中文字 (e.g., 寵 / 食 / 衡 / 償)

### Velite lint (學到嘅 gotchas)
- `title` max 80 chars
- `description` max 200 chars
- 避開 `<digit` 字面（MDX 當 JSX tag 解析）— 用「少於 N」 / 「低於 N」 / 「&lt;N」
- 中文 char = JS string length 1（按 code unit count）

### Voice tuning (session 3 user feedback)
- HK Cantonese + 必要 English（technical terms / brand / 真 HK habit）
- **避免** gratuitous mid-sentence English（「acceptable」/「sustainable」/「baseline」 改 中）
- 代碼 block 全 English（natural）
- 早期 articles 如 `pet-sitter-handover-claude` 係 voice reference

### Git
- Commit format: `type(scope): description` HEREDOC
- 唔包 co-author footer (per project preference)
- Build + push → Vercel auto-deploy 2-3 min

## 📦 Session 3 commits (for reference)

```
8b69c23 fix(content): trim MCP article description under 200 char
5b0479a content: 11 Claude tool tutorials (issues 078-088)
9fe345f content: deepen 財經 section with 4 new articles (issues 074-077)
85936d6 content: deepen 親子 section with 4 new articles (issues 070-073)
008be2d feat(taxonomy): add 健康 section + 4 launch articles (issues 066-069)
```

## 🎯 Session 2 + 3 combined achievement

| Metric | Session 1 end | Session 3 end |
|---|---|---|
| Articles | 49 | 84 (+35) |
| Sections | 10 | 12 (+2: 旅遊 + 健康) |
| Pages | masthead + about | + /collaborate |
| Heroes done | 24 (session 1) | 48 |
| Featured count | ~15 | 42 |
| Tutorial coverage | 0 | 12 code + 11 cowork |

---

Sleep well. 等你 wake up 開新 session 直接 reference 呢 file。👋
