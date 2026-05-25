# 📋 SESSION HANDOFF — my-good-friend-claude

_Last session ended: 2026-05-26, voice retone batch session — 34/45 done via direct Claude retone_

## 🌐 Live URLs

- Production: https://my-good-friend-claude.vercel.app
- Collab page: https://my-good-friend-claude.vercel.app/collaborate
- Repo: https://github.com/hideyau28/my-good-friend-claude
- Dev port: 4321 (launch.json name: `next-dev`)
- Project dir: `/Users/ngyau/Projects/my-good-friend-claude`

## 📊 Current state (top of main)

- Top commit: `df4f4ce` content(voice): retone #076 monthly-budget-hk-claude (0.80 → 0.10)
- **84 articles** (chat 61 / cowork 11 / code 12) — 42 featured
- **12 sections** — 財經 · 職場 · 商家 · 親子 · 寵物 · 生活 · 健康 · 旅遊 · 文化 · 科技 · 遊戲 · 其他
- Highest issue: **088** / Next issue: **089**
- ✅ 84/84 articles have hero illustrations (100% coverage)

## ⚠️ Voice retone IN PROGRESS (resume here)

**新 strict bar**：每篇 ratio <0.30（廣東話為主，只保留 brand / 法律條款引文 / code literal / HK-specific 縮寫）。**累計完成 34 篇，剩 11 篇要做（全部係 #079-#088 嘅 code 教學）**。

### Workflow（直接 Claude retone — 取代咗 Gemini 協作）

**由 2026-05-25 session 起 workflow 改為**：

1. Claude 直接 Read source file
2. Claude 一氣呵成 retone + restore `<PromptBlock>` 結構 + frontmatter delimiters
3. Write 出嚟，verify ratio + commit

**唔再需要 paste 落 Gemini 來回**。Claude direct retone 嘅 quality benchmark：

- Ratio：14 篇 Gemini retoned 平均 0.07，7 篇 Claude direct 平均 0.09 — 兩者都遠低於 0.30 bar
- Native HK vocab density：Claude direct 高 3.3 倍（per-1000-char 0.53 vs 0.16）— 用更多「行貨」「肉麻」「夾硬」「拋光」等 punchy HK vocab
- 結構保留：兩者 100% PromptBlock / frontmatter / code block 完整

下個 session resume：直接 cd 過去 + Read 下一篇 source + retone + commit。

### Gemini 協作 workflow（legacy — fallback only if Claude direct 有問題）

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

### 已完成（2026-05-25 batch）— 27 篇

```
✅ #031 cowork-auto-backup-files-photos       (0.45 → 0.06) commit 50c9157
✅ #032 cowork-weekly-inbox-triage            (0.43 → 0.06) commit dbf27e4
✅ #033 cowork-social-media-scheduler         (0.51 → 0.12) commit 070fd76
✅ #034 claude-code-chrome-extension          (0.40 → 0.11) commit ea26cff
✅ #035 run-local-llm-mac-claude-ollama       (0.52 → 0.07) commit 7bd5be3
✅ #036 claude-code-legacy-codebase-onboarding(0.54 → 0.07) commit 326ea5d
✅ #039 claude-fiction-writing-partner        (0.48 → 0.03) commit 1782af2
✅ #040 newsletter-editorial-calendar-claude  (0.47 → 0.09) commit 8414658
✅ #041 travel-itinerary-claude-day-by-day    (0.49 → 0.05) commit 08c23d9
✅ #043 hong-kong-tax-prep-claude             (0.37 → 0.05) commit 71281d0
✅ #044 doctor-visit-prep-claude              (0.39 → 0.04) commit bcdbefe
✅ #048 youtube-game-guide-extract-claude     (0.37 → 0.06) commit 14507df
✅ #049 trpg-gm-prep-claude                   (0.38 → 0.05) commit 7d31ec6
✅ #056 pet-grooming-routine-claude           (0.39 → 0.02) commit 2e07941
✅ #057 pet-puppy-kitten-first-month-claude   (0.44 → 0.03) commit 82bd989
✅ #058 mmo-guild-recruit-post-claude         (0.49 → 0.12) commit c6f978f
✅ #059 game-review-write-claude              (0.53 → 0.16) commit 9e66888
✅ #060 new-game-prep-claude                  (0.65 → 0.11) commit f650422
✅ #061 trpg-world-building-claude            (0.76 → 0.10) commit 43c6902
✅ #062 visa-application-claude               (0.63 → 0.14) commit ac4b0cb
✅ #063 family-trip-itinerary-claude          (0.71 → 0.09) commit 19abeb4
✅ #064 packing-list-claude                   (0.71 → 0.10) commit 28c00ee
✅ #065 tax-refund-claude                     (0.66 → 0.11) commit b28b010
✅ #066 mental-health-journaling-claude       (0.54 → 0.06) commit 0d3f105
✅ #067 home-exercise-plan-hk-claude          (0.71 → 0.10) commit 01b1923
✅ #068 sleep-insomnia-tracker-claude         (0.73 → 0.05) commit b30e38b
✅ #069 chronic-condition-management-claude   (0.70 → 0.05) commit 33144c8
✅ #070 dse-prep-mental-claude                (0.65 → 0.08) commit aa69971
✅ #071 summer-camp-application-letter-claude (0.79 → 0.08) commit c0aa107
✅ #072 primary-school-makeup-request-claude  (0.76 → 0.07) commit 5d251c5
✅ #073 sibling-conflict-mediation-claude     (0.75 → 0.05) commit 18a22b2
✅ #074 mpf-review-claude                     (0.81 → 0.13) commit d324139
✅ #075 emergency-fund-claude                 (0.76 → 0.12) commit 6b715f3
✅ #076 monthly-budget-hk-claude              (0.80 → 0.10) commit df4f4ce
```

### 剩低嘅 11 篇（issue order）— 下個 session 由 #079 開始

全部係 code 教學，ratio 較低（0.37-0.65），但 code literal 多要留意。

```
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

**Verify ratio command**（每篇 commit 前用）：
```bash
node -e "const t=require('fs').readFileSync('content/use-cases/SLUG.mdx','utf8').split(/^---\$/m).slice(2).join(''); const cn=(t.match(/[一-鿿]/g)||[]).length; const codeEn=((t.match(/\`\`\`[\\s\\S]*?\`\`\`/g)||[]).join('').match(/[a-zA-Z]+/g)||[]).length; const en=(t.match(/[a-zA-Z]+/g)||[]).length-codeEn; console.log((en/(cn+en)).toFixed(2))"
```

**Commit message format**：
```
content(voice): retone #NNN slug-name (BEFORE → AFTER)
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
