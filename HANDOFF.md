# 📋 SESSION HANDOFF — my-good-friend-claude

_Last session ended: 2026-05-24, deep voice retone round 4 — strict bar <0.30 established_

## 🌐 Live URLs

- Production: https://my-good-friend-claude.vercel.app
- Collab page: https://my-good-friend-claude.vercel.app/collaborate
- Repo: https://github.com/hideyau28/my-good-friend-claude
- Dev port: 4321 (launch.json name: `next-dev`)
- Project dir: symlinked at `/Users/ngyau/stockflow-pos/.my-good-friend-claude`

## 📊 Current state (top of main)

- Top commit: `7e0b65d` content(voice): deep retone round 4 — 7 articles to strict bar
- **84 articles** (chat 61 / cowork 11 / code 12) — 42 featured
- **12 sections** — 財經 · 職場 · 商家 · 親子 · 寵物 · 生活 · 健康 · 旅遊 · 文化 · 科技 · 遊戲 · 其他
- Highest issue: **088** / Next issue: **089**
- ✅ 84/84 articles have hero illustrations (100% coverage)

## ⚠️ Voice retone IN PROGRESS (resume here)

**新 strict bar**：每篇 ratio <0.30（廣東話為主，只保留 brand / 法律條款引文 / code literal / HK-specific 縮寫）。Round 4 完成 8 篇深 retone（commit `7e0b65d` + `05e2f12`）。**剩 44 篇 ratio ≥0.35 要做**。

### Workflow（Gemini 協作）

1. I paste 一篇 article + reminder 畀你
2. 你 copy 落 Gemini（佢識用 native HK 字眼）
3. Gemini 出 retoned 版本
4. 你 paste 返畀我，我 restore `<PromptBlock>` 結構 + frontmatter `---` + apply

**畀 Gemini 嘅 system prompt**（每 session 開頭 paste 一次）：

```
你係幫一個香港 Claude 教學 newsletter 做語氣 retone 嘅 editor。

STRICT 新標準：除咗以下保留，其他全部廣東話。
✅ 保留英文：
- Brand / product / ticker (Claude, IG, Notion, VOO, S&P 500, MPF, ETF, IFA 等)
- Code literal / file path / API endpoint (`.gitignore`, `~/.claude/`, `cmd+K`)
- Quoted English sample（信入面真實字眼 e.g.「Dear Mr. Tony」、合約條款 quote）
- 縮寫 (HR, BD, CRM, KPI, etc.)
- $ 金額 (HK$、$10/月)
❌ 全部轉中文：
- workflow → 工作流程 / fix → 修補 / review → 檢視 / draft → 草稿 / framework → 框架
- 所有 SAT-word adjective、adverb、verb
- 連 HK office 偶爾講嘅 (deadline, email, vendor, output, input, value, context, trigger, leverage, feedback, etc.) 都轉中文

Target ratio < 0.30。Pet 文：BB → 主子。

OUTPUT：純 MDX，由 `---` 開始到文末。<PromptBlock> tag 保留。Code block 100% 唔郁。
```

### 剩低嘅 45 篇（issue order）

```
#031 0.45 cowork-auto-backup-files-photos
#032 0.43 cowork-weekly-inbox-triage
#033 0.51 cowork-social-media-scheduler
#034 0.40 claude-code-chrome-extension
#035 0.52 run-local-llm-mac-claude-ollama
#036 0.54 claude-code-legacy-codebase-onboarding
#039 0.48 claude-fiction-writing-partner
#040 0.47 newsletter-editorial-calendar-claude
#041 0.49 travel-itinerary-claude-day-by-day
#043 0.37 hong-kong-tax-prep-claude
#044 0.39 doctor-visit-prep-claude
#048 0.37 youtube-game-guide-extract-claude
#049 0.38 trpg-gm-prep-claude
#056 0.39 pet-grooming-routine-claude
#057 0.44 pet-puppy-kitten-first-month-claude
#058 0.49 mmo-guild-recruit-post-claude
#059 0.53 game-review-write-claude
#060 0.65 new-game-prep-claude
#061 0.76 trpg-world-building-claude
#062 0.63 visa-application-claude
#063 0.71 family-trip-itinerary-claude
#064 0.71 packing-list-claude
#065 0.66 tax-refund-claude
#066 0.54 mental-health-journaling-claude
#067 0.71 home-exercise-plan-hk-claude
#068 0.73 sleep-insomnia-tracker-claude
#069 0.70 chronic-condition-management-claude
#070 0.65 dse-prep-mental-claude
#071 0.79 summer-camp-application-letter-claude
#072 0.76 primary-school-makeup-request-claude
#073 0.75 sibling-conflict-mediation-claude
#074 0.81 mpf-review-claude
#075 0.76 emergency-fund-claude
#076 0.80 monthly-budget-hk-claude
#079 0.37 claude-skills-build-claude
#080 0.46 claude-google-sheets-integration-claude
#081 0.47 claude-artifacts-deep-dive-claude
#082 0.46 claude-long-conversation-management-claude
#083 0.39 claude-code-install-claude
#084 0.56 claude-code-slash-commands-claude
#085 0.65 claude-code-mcp-servers-claude
#086 0.52 claude-code-subagents-claude
#087 0.53 claude-code-hooks-claude
#088 0.60 claude-code-worktrees-claude
```

### Voice reference articles（已達 <0.30 標準，可參考揀字）

最 native：
- #053 pet-insurance-review-claude (0.09)
- #027 insurance-policy-review-claude (0.06)
- #077 investment-portfolio-review-claude (0.09)
- #028 employment-contract-review-claude (0.09)
- #018 english-email-polish-hk (0.14)

### HK-native vocabulary bank（已 calibrate）

| 英文 | 廣東話 |
|---|---|
| generic / boilerplate | 行貨 |
| weak / no backbone | 冇底氣 |
| Garden leave | 冷河期 |
| Constructive dismissal | 推定解僱 |
| labour tribunal | 勞資審裁處 |
| information asymmetry | 資訊不對等 |
| face-saving | 落台階 |
| take it personally | 放喺心上 |
| abstract comparison | 紙上談兵 |
| scaffold | 搭棚 |
| net positive/negative | 利多於弊 / 弊多於利 |
| friction | 阻力 |
| working memory | 短暫記憶 |
| mental model | 操作思維 |
| context switching | 切換情境 |
| cross-contaminate | 撈亂 |
| paradox | 死結 |
| compounds | 利疊利 |
| cage (寵物) | 飛機籠 |
| deductible | 墊底費 |
| exclusion (保險) | 唔保事項 / 不保項目 |
| mixed-breed dog | 唐狗 |
| exotic pets | 珍禽異獸 |
| destroy financials | 搞冧 |
| sure loss | 輸梗嘅 |
| stand out | 突圍而出 |
| Disclaimer | 利益申報 |
| Pet (in pet section): BB | **主子** |

## 🛠 Key infra files

| File | Purpose |
|---|---|
| `velite.config.ts` | Content schema + SECTION enum |
| `src/lib/content.ts` | SECTIONS / CATEGORY_BADGES / SECTION_DESCRIPTIONS / TIER_CURRICULUM / pickFirstRead |
| `src/app/collaborate/page.tsx` | ⚠️ CONTACT_EMAIL placeholder still active |
| `scripts/import-hero.mjs` / `batch-import-heroes.mjs` | Hero pipeline |
| `HERO-PROMPTS-BATCH.md` | 59 hero prompt completed |

## 🎨 Hero illustration status

- ✅ **84 / 84 articles have heroes** (100% coverage as of 2026-05-24)
- **Master style**: 16:9 cream paper / 4-color (#FBF7EA #F7F2E2 #C42424 #0F0B05) / ink hatching / no faces / vermillion 朱紅 印章 corner

## 🔓 Remaining backlog

1. **Voice retone — 45 articles remaining** (see list above)
2. **Replace `/collaborate` email** placeholder (`hello@my-good-friend-claude.com`) — production launch blocker
3. **Pricing anchors** on `/collaborate` FAQ — after first paid quote
4. Custom domain (currently `my-good-friend-claude.vercel.app`)
5. `/collaborate` Calendly / Tally form upgrade later

## 🚀 How to resume

下個 session：

- 「繼續 retone — 由 #031 開始」 — 我會 paste #031 落嚟，你 paste 落 Gemini，循環
- 「改 /collaborate email 做 [real-email]」
- 「我想 deepen [section name]」
- 「Preview server start」（會跑 next-dev port 4321）

## 🔑 Conventions to keep

### Content
- **Issue number sequential**, next = `089`
- **Cantonese voice**, HK detail (街名、銀行、店名、政府部門)
- **Article structure**: 情境 → 跟住做 (4 steps) → 變化 (3) → 一個 mindset
- **PromptBlock label**: `完整 prompt — XXX` 或 `變化 N — XXX`
- **印章 字** = subcategory 嘅 representative 中文字 (e.g., 寵 / 食 / 衡 / 償)

### Voice (NEW strict bar 2026-05-24)
- Target ratio <0.30（每篇 prose 英文比例）
- Quick check: `node -e "const t=require('fs').readFileSync('content/use-cases/SLUG.mdx','utf8').split(/^---$/m).slice(2).join(''); const cn=(t.match(/[一-鿿]/g)||[]).length; const codeEn=((t.match(/\`\`\`[\s\S]*?\`\`\`/g)||[]).join('').match(/[a-zA-Z]+/g)||[]).length; const en=(t.match(/[a-zA-Z]+/g)||[]).length-codeEn; console.log((en/(cn+en)).toFixed(2))"`

### Velite lint
- `title` max 80 chars
- `description` max 200 chars
- 避開 `<digit` 字面（MDX 當 JSX tag 解析）

### Git
- Commit format: `type(scope): description` HEREDOC
- 唔包 co-author footer (per project preference)
- Build + push → Vercel auto-deploy 2-3 min

## 📦 Recent commits

```
7e0b65d content(voice): deep retone round 4 — 7 articles to strict bar (<0.30)
25cd34c docs: HANDOFF — voice retone done, calibration rules captured
7af55e1 content(voice): retone round 3 surgical SAT-word cleanup
37fcc73 content(voice): retone round 2 — cowork tutorials + code tutorials + 職場
3c9d1bb content(voice): retone 12 articles to HK Cantonese natural codeswitch
b6b0bd3 content(hero): batch import — 84/84 articles now have heroes
```

---

Sleep well. 等你 wake up 開新 session 直接 reference 呢 file。👋
