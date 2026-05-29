# 廣東話人手覆核 Handover — 交畀 Gemini（外部廣東話編輯）

> 日期：2026-05-29　·　範圍：`content/use-cases/*.mdx`　·　分支：`content/cantonese-cleanup`
> 上游：機器清理（第三輪）已完成 133 篇，跟 `docs/cantonese-style-guide.md`（第二版）。呢份係交畀你做最後人手覆核嘅清單。

---

## 0. 你嘅任務

機器已經清咗一輪中英夾雜、大陸用語、英文動詞 + 助詞。你今次唔使由零做，**只需要**：

1. **裁決下面 §3 嘅 5 條「方針問題」** — 機器遇到拿唔準嘅地方一律保守保留咗，要你一句話定案（清定留）。
2. **逐篇睇 §4 嘅 flag** — 每條都係機器特登標出嚟、需要人眼判斷嘅位（多數係「保留咗英文 / deliverable，啱唔啱？」）。
3. **順手捉語氣** — 如果讀落有翻譯腔、唔似人講嘢，直接改。**以 §2 嘅 8 篇 exemplar 為準繩**。

**唔使**重新掃全文搵英文字 — 殘留嘅細楷英文絕大多數係技術術語白名單、官方引文、或者用戶要照抄入 Claude 嘅 deliverable，唔係夾雜。

---

## 1. 硬規則（覆核時都唔可以破，否則 build 會死或者破壞結構）

- ❌ **任何地方唔好出現 `{…}`（花括號）** — 喺 MDX 係 JSX expression，prerender 會當佢做 JS 評估，`pnpm build` 會死。要 placeholder 就用 `[方括號]`、「」或《》。`<PromptBlock>` 入面尤其要小心。
- ❌ 唔好改 frontmatter 嘅 **key / slug / category / section / subcategory / keywords / related** 嘅結構。`keywords` 陣列完全唔好郁（保留英文搜尋詞）。
- ✅ `title` ≤ 80 字、`description` ≤ 200 字 — 改完要守返。
- ❌ 唔好改 **code block（三反引號）、行內 code（單反引號）、`[方括號]` placeholder、URL / link、import / export 行、component 名、求助熱線電話號碼**。
- ✅ `<PromptBlock label="…">…</PromptBlock>` 嘅標籤同 label 結構要保留；label 文字可以改字，但唔好拆散結構、唔好加花括號。

---

## 2. 語氣準繩 — 8 篇已定稿 exemplar（唔好改，當參考）

讀呢 8 篇感受目標語氣（街坊大姐姐傾偈、你-直接、短句、中文標點、敏感題溫和直接）：

`pet-end-of-life-grief-claude` · `cowork-freelancer-monthly-invoicing` · `sleep-insomnia-tracker-claude` · `eta-online-visa-prep-claude` · `bno-visa-application-prep-claude` · `breastfeeding-troubleshoot-claude-hk` · `elder-care-decision-claude-hk` · `lost-pet-flyer-claude`

---

## 3. 5 條方針問題（請逐條裁決：清 / 留）

機器將呢幾類拿唔準嘅嘢一律保留咗，等你一鎚定音。裁完我可以再開一輪批量套用。

| # | 方針問題 | 涉及篇數 | 機器現狀 | 你嘅裁決 |
|---|---------|---------|---------|---------|
| 1 | 技術 loanword（`session` / `token` / `folder` / `directory` / `repo` / `branch` / `terminal` / `panel` 等）喺 dev 語境要唔要中文化（例 folder→資料夾）？ | 61 | 保留英文 | ☐ 清　☐ 留 |
| 2 | `<PromptBlock>` / 用戶要照抄入 Claude 嘅 deliverable prompt 內文，要唔要連埋清英文？ | 65 | 保留原文 | ☐ 清　☐ 留 |
| 3 | `title` / `description` 仍含英文搜尋詞（SEO 考量），要唔要再純中文化？ | 51 | 保留（SEO） | ☐ 清　☐ 留 |
| 4 | code block / fenced 內嘅中英混雜（按硬規則保留），要唔要破例清散文化嘅部分？ | 22 | 一律保留 | ☐ 清　☐ 留 |
| 5 | 刻意保留嘅「示範 / 反面教材」英文句（demo 用，例：行貨開場白「Overall, this video…」），確認當示範保留？ | 14 | 保留 | ☐ 確認　☐ 要譯 |

> 註：第 2、4 條如果裁「清」，要逐句人手判斷（deliverable 內有啲英文係用戶真係要照抄嘅指令 / 欄位名，唔可以一刀切譯）。

---

## 4. 逐篇 flag（123 篇有 flag；其餘 10 篇機器判斷乾淨）

> 格式：每篇下面係機器特登標出、需要人眼判斷嘅位。✅ = 你同意保留就剔；✏️ = 要改就喺嗰篇直接改。

#### `apology-email-template-claude`
- PromptBlock 內保留咗英文 email 樣本引文（如 "I'm writing to apologize"、"will be resolved"）同目標語氣句 "Accountable adult, not penitent child"，當佢哋係 deliverable / 範例引文處理；如果編輯方針想連引文都譯，需要人手再覆核。
- frontmatter description 保留咗 apology email / invoice / deadline 等英文（loanword + SEO），冇改動。

#### `cancer-screening-decision-claude-hk`
- 敏感健康題材：保留咗一批已成醫學標準詞嘅英文（screening、guideline、evidence-based、false positive、over-diagnosis、biopsy、imaging、oncology 等），因屬領域術語白名單，如編輯方針想進一步中文化呢類字可人手再覆核
- 部分 PromptBlock 表格欄位同 bullet 仍夾英文臨床詞（如 Evidence level、lead-time bias、salpingo-oophorectomy），當作 deliverable / 引文保留原文，未譯

#### `cantonese-to-written-claude`
- 兩段 blockquote（line 24 原文廣東話口語示範、line 28 過度正式中文反面教材）係刻意保留嘅示範例子，冇改動，建議覆核確認符合意圖
- PromptBlock 入面保留咗一啲屬於文案作者語氣嘅英文 loanword（voice、podcast、newsletter、freelancer、Q&A、IG），當作白名單處理

#### `car-insurance-comparison-hk-claude`
- title 仍含 "quote" 同 "no-claim discount"——當作保險業內常用詞同搜尋詞保留，若要更純廣東話可再議
- PromptBlock 內引文 'permanently installed accessories'、'hire and reward'、'Agreed value vs market value' 等視為條款原文 / 官方術語保留

#### `chronic-condition-management-claude`
- code block 內嘅 "For 糖尿/高血壓/哮喘" 同 Y/N 欄位係 deliverable 範本文字，按硬規則保留冇譯；如編輯部想連範本內嘅 For 都中文化，需要另開指引。

#### `claude-artifacts-deep-dive-claude`
- 保留咗 prompt 範本同迭代指令 code block 入面嘅英文 (vermillion、hover effect、case study、reference line 等)，因為嗰啲係用戶會直接 copy 入 Claude 嘅 deliverable，唔當夾雜處理。
- title 入面 HTML / code / chart / 長文 屬技術詞，照保留未改。

#### `claude-code-api-docs-generator`
- slash command markdown block 內有 Run pnpm openapi:emit 等英文 Run 字眼，但屬於 code block（reader 直接 copy 入 .claude/commands 嘅 config），按硬規則 4 未郁；如要求連 code block 內中英文都統一可再覆核
- title 同 description 內仍保留 OpenAPI spec / TypeScript types / example response 等英文，因屬技術術語白名單，title 仍 ≤80 字、description ≤200 字

#### `claude-code-chrome-extension`
- line 137「重新整理唔會唔見」同 line 110「重新載入個 extension」嘅「重新整理/重新載入」屬 reload/refresh 嘅可接受 HK 講法，冇改；如果編輯部想更口語可考慮「reload 完都唔會唔見」。

#### `claude-code-claudemd-mastery`
- code block 內嘅 deliverable 例子（line 139「都會 read」、line 153「你 read 過呢個 repo」、line 68-70 commands、line 92-94 MDX gotcha）按硬規則 4 保留原文，當中夾英文動詞屬刻意示範用戶要照抄嘅內容，無改

#### `claude-code-database-migration-safe`
- 保留咗英文 epigraph「Schema change is not an event. It's a process that spans a week.」當作引文，冇譯——如要全中文可再覆核
- frontmatter description 保留咗 naive ALTER TABLE / dual-write backfill / maintenance window 等技術詞，當作領域術語處理

#### `claude-code-debugging-stuck-bug`
- PromptBlock 入面係作者寫畀讀者照抄嘅 prompt，當作 deliverable 處理：只清咗明顯嘅英文動詞謂語（disambiguate→分辨、Cleanup→收尾），保留咗『逐行讀晒』『提議 fix』等已經夾得自然嘅 whitelisted 用法，無大改結構。如要更徹底淨化 prompt 內文可人手再覆核。

#### `claude-code-dependency-upgrades`
- 散文入面有意保留咗 framework / bump / lockfile / triage(分流時保留英文上下文如 Breaking change triage 標題改成中文) / smoke test / staging / runtime 等領域常用 loanword，當作技術術語白名單處理；如編輯部想再收緊呢類詞可人手再過一轉。

#### `claude-code-deploy-preview-verify`
- title 內保留咗 'verify' 改成「核實」；'smoke test'、'Slack'、'Vercel preview' 作為技術/品牌詞保留。
- 散文內保留咗多個技術 loanword（smoke、flaky、regression、pipeline、headless browser、HTTP 層、env var、route、SSR、checkout、preview URL 等），屬白名單技術詞，未譯。
- code block 入面 .claude/commands/ship.md 內容（含中英混雜 description 同步驟）按規則 4 完全保留未改。

#### `claude-code-env-config-management`
- title 同 description 保留咗大量 domain 英文（env config / dev/staging/prod / environment / secret / single source of truth），呢啲係技術術語兼搜尋詞，冇譯；如果想再地道可人手再睇。
- drift 喺技術 / CI 語境（drift detection hook、exit 1、PR 變紅嗰幾句）保留英文，淨係喺敘述語境改做「走樣」，前後夾雜咗中英兩種講法，可人手統一。
- code block 同兩段畀讀者照抄落 Claude 嘅 prompt deliverable（env-add.md、env-sync 指令）一律冇改，按 deliverable 規則保留。

#### `claude-code-git-workflow`
- 三段 conflict / cherry-pick / squash 嘅 prompt 範本係用戶照抄畀 Claude 嘅 deliverable，內裏仲有少量英文（resolve、cherry-pick、conflict markers），按「引文/deliverable 原文保留」原則冇譯；如想連 prompt 範本都全廣東話化要再確認
- 變化 3 嘅 Agent({...}) 喺 fenced code block 內，花括號唔會被 MDX 評估，安全保留

#### `claude-code-headless-automation`
- section 標題刻意保留少量技術英文做 anchor（headless、cron、GitHub Actions PR review），符合白名單；若編輯部想再純化標題可人手再睇一次。

#### `claude-code-install-claude`
- 「folder」「directory」「panel」「session」「console」當技術 loanword 喺呢篇 Claude Code 入門 dev 語境保留，冇譯——如果風格指南想連呢類都中譯（例：folder→資料夾）要人手再過一次

#### `claude-code-legacy-codebase-onboarding`
- 第 64 行 deliverable 標記 「⚠️ Needs verification」 同第 93 行 「dead code candidates」 屬要 Claude 照用嘅 output label，按 deliverable 規則保留咗英文，如果想全中文化可人手覆核

#### `claude-code-mcp-servers-claude`
- 散文行文入面保留咗 MCP / MCP server / PR / repo / token / API key / commit / shell / web search / standup / database / SDK 等技術縮寫同 loanword（屬白名單）；prompt 範例「List open PR 喺…」同「List task 喺…」係用戶要照打嘅指令文字，按 deliverable 規則原文保留。

#### `claude-code-model-routing-cost-control`
- PromptBlock 同 slash-command 檔屬 deliverable，當中嘅技術指令（model: claude-haiku-4-5、/model 指令）刻意保留英文，如要進一步本地化要再確認
- code fence 內嘅 Cantonese 文案（haiku.md/sonnet.md/opus.md 描述）按規則 4 冇郁，如想統一語氣可另議

#### `claude-code-monorepo-navigation`
- 正文保留咗大量技術 / loanword 英文（Claude Code, monorepo, package, context, token, grep, subagent, refactor, scope 喺標題作 routing/scoped 等），呢啲屬白名單或域內術語，冇譯；title 入面 context routing / scoped CLAUDE.md / package-level slash commands 係技術片語亦保留。如要更徹底中文化可人手再覆核標題。

#### `claude-code-performance-debugging`
- 兩個 fenced code block（cadence 流程同 profiler 指令）入面有英文 inline comment 同中文混雜，但按硬規則 code block 一律唔郁，故保留原文未清。
- 表格 Tool 欄列出 clinic.js / py-spy / pprof 等工具名，當技術 deliverable 保留未譯。

#### `claude-code-prompt-patterns-dev`
- title 同 description 內仍有 leverage、plan-first、constrain-output、verify-with-test、show-me、explain-then-do 等英文 pattern 名 — 屬技術術語兼全篇核心命名，故意保留；如想 title 更純中文需編輯定奪。
- 正文留低 feature / spec / scope / diff / impl / business logic 等高頻 dev loanword，呢類喺技術文脈下慣用且 PromptBlock 內要照抄，未譯。

#### `claude-code-safe-refactor`
- 保留咗大量域內英文技術詞（refactor、characterization test、mechanical transformation、commit、callsite、edge case、fallback、throw 等），因為呢啲喺技術 use-case 屬慣用語且多數喺 copy-paste deliverable 內；如要進一步本地化需 product 決定統一譯名。

#### `claude-code-security-review-workflow`
- 散文有意保留咗大量領域縮寫（PR、RBAC、IDOR、CVE、merge、endpoint、severity、finding 等），呢啲屬技術白名單；如果想更貼街坊語氣可再人手收窄，但會影響技術精準度。
- title / description 內含 OWASP top 10、secrets exposure、permission bypass、CVE 等英文技術詞，屬 SEO 搜尋詞範疇，冇郁。

#### `claude-code-slash-commands-claude`
- code block 入面嘅 markdown 命令檔範本（release-notes / refactor-function / read-only-review）夾住英文指示句，因為係用戶要照抄入 .md 檔嘅 deliverable，按硬規則無郁；如編輯想連範本內文都本地化，需另行確認。

#### `claude-code-subagents-claude`
- 「並行 / parallel」呢個概念詞全篇出現好多次，我統一用咗「並行」中文，但個別位仍保留 subagent / Agent 工具名等技術 token，符合白名單。
- code block 入面嘅 ASCII 圖同 prompt 範例（例如『主 session (你 in interactive Claude Code)』『我哋 spawn 4 個 subagents parallel:』）係喺三反引號內，按硬規則冇改；如想清理需確認係咪當 deliverable。

#### `claude-code-tdd-pair-workflow`
- 「你 own test、Claude own impl／own spec」呢個 own-as-verb 係全篇核心 motif（連 title/description 都有），冇譯，保留咗以免破壞貫穿全文嘅分工框架；如果要 100% 清英文動詞謂語，可考慮統一改做「你負責 test、Claude 負責 impl」，但會影響語氣節奏，留畀人手定奪。

#### `claude-code-test-coverage-strategy`
- 散文同 PromptBlock 內仍保留咗大量純技術英文（Critical/Hot/Cold path、payment、auth、null、Unicode、DB timeout 等），呢啲屬白名單技術詞同 deliverable prompt 內容，按規則冇譯；如要更地道可再人手斟酌。

#### `claude-code-tutorial-website`
- 「error message / error」全篇保留做技術 loanword（同 debug 情境一致）；如要全部譯做「錯誤訊息」可再做一輪，但會犧牲開發者語感。

#### `claude-code-worktrees-claude`
- title 仍含 git 術語 stash／feature（屬白名單，刻意保留，未改）
- code fence 內嘅 prompt 例子同 Agent({...}) 區塊含英文同花括號，因屬受保護 code block 故未動——若想連例子文案都本地化需另行確認

#### `claude-content-repurpose`
- PromptBlock 內文係用戶照抄嘅 deliverable，按規則保留原文（仍夾住 hook / conversational / storytelling / takeaway / CTA 等英文），冇改動；如想連 prompt 內文都本地化要另行確認。
- 正文白名單 loanword 如 caption、hashtag、thread、post、blog、newsletter 一律保留。

#### `claude-fiction-writing-partner`
- title/heading/prose 都有用「brainstorm」，當作 HK 創作圈通用 loanword 保留以同 title + keywords 一致；如果編輯部想全篇譯成「腦力激盪/構思」要連 title 一齊改先唔會 inconsistent。

#### `claude-google-sheets-integration-claude`
- 兩個嵌入 Claude 嘅 prompt 喺 fenced code block 內（含 monthly sales 報表 analyst、EXECUTIVE SUMMARY 等英文），按規則 4 唔郁；如想 prompt 內文都本地化要另外確認
- frontmatter difficulty/timeMinutes 等值結構未郁；title 已去 setup 字眼但仍含品牌/loanword，屬正常保留

#### `claude-language-learning-conversation-partner`
- 「band score」保留咗（IELTS 官方分數術語、喺用戶讀嘅 prompt 入面）
- 兩句官方／用戶會照打嘅英文引文（Talk about your hobby、Continue our scenario from last session）按 deliverable 原則保留

#### `claude-long-conversation-management-claude`
- 第 14 行 description 含 "context window 食滿"，屬白名單技術詞，無改；如要更地道可考慮但會改動 SEO description。
- code block 內仍有中英夾雜（例如 system prompt 入面「誠實 唔賣弄」「自嘲 OK 但唔好 weak」），按硬規則 4 code block 唔改，保持原狀。

#### `claude-pdf-summary`
- 「撮要 this」係全篇刻意嘲笑懶 prompt 嘅 motif，保留冇譯；PromptBlock 內嘅 finding/decision/risk、Decisions taken、Action items、trend/outlier/data/column/noise、follow-up question 等屬於讀者照抄嘅 prompt deliverable，按規則保留原文。

#### `claude-projects-setup-claude`
- 三個 code block 入面仍有中英夾雜（system prompt 範本），按規則 4／deliverable 原則刻意保留，如要連範本一齊本地化需另開指示

#### `claude-skills-build-claude`
- 正文保留咗大量 inline 英文技術／流程詞（workflow、invocation、context、library、submit→改咗做提交但前文後理仍多英文），呢啲多數係領域用語白名單範圍，冇硬譯；若編輯部想再收緊中英比例可人手覆檢第 4、6 步同變化段。
- Title 仍含「Claude Skills」「skill」「prompt」三個英文詞但全屬保留白名單，長度 < 80 字 OK。

#### `claude-tsa-homework-hk`
- PromptBlock 內文（用戶會 copy 嘅 deliverable）入面亦清咗 hint/highlight/keyword 等夾雜英文，令對白更地道；如果想保留原文照抄風格可人手覆核。

#### `consumer-council-complaint-claude-hk`
- description 入面保留咗 package / upsell 改成「被加推」；package 因係常見 loanword 而保留，如要更地道可考慮改「套餐」
- 正文多處保留 chargeback（loanword 兼無統一中譯），如編輯部偏好「拒付」可再統一

#### `cowork-auto-backup-files-photos`
- 第 97 行 prompt 入面嘅電郵標題範本「[月份] Family Backup Audit Report — [N] 個緊急標示」屬於 deliverable 輸出規格（要 Claude 照用嘅 email subject），按保留原則冇譯；如要全中文標題可再人手決定。

#### `cowork-competitor-pricing-monitor`
- PromptBlock 入面保留咗 deliverable 性質嘅技術詞（Pricing change / Positioning change / Feature announcement / hero headline / CTA / TL;DR / monthly strategic memo 等），因為呢啲係用戶要照抄入 prompt 嘅指令字眼，硬譯反而會令 Claude 輸出走樣；如要更純廣東話可再覆核。
- code block 內嘅註解（例如『我嘅 take：』）按硬規則 4 冇改，因為喺三反引號 sample brief 之內。

#### `cowork-course-content-drip-scheduler`
- title/description 內保留咗 Cowork、cohort、drip、lesson、assignment、reminder 等域內英文詞（屬白名單 loanword/技術詞），title 仍 ≤80 字、description ≤200 字
- PromptBlock 內 'individualisation' 類欄位如 subject/body/Week N · [lesson title] 視為 deliverable 引文原文保留，未譯

#### `cowork-customer-support-triage`
- 輸出格式標籤同 prompt 入面嘅 URGENT / FAQ-answerable / COMPLAINT / sentiment score / risk flag / short code 等刻意保留英文，因為佢哋係 deliverable 嘅機讀標籤同 prompt 指令，譯咗會同例子報告對唔到。如要全中文化需連 prompt 同例子一齊改。
- title 仍含 inbox / FAQ（白名單 loanword / 縮寫），長度 33 字在 80 字內。

#### `cowork-dse-study-plan-automation`
- 「儀表板」(dashboard) 出現兩次，當作標準中文詞保留；如要更口語可改「面板」，但唔係硬性問題
- 「爆鐘」係地道廣東話 slang，保留
- description 入面「HK 家長」嘅 HK 屬縮寫白名單範圍，保留未改

#### `cowork-expense-automation`
- title/description 仍保留 Gmail / .xlsx / Cowork / HKD 等白名單詞，符合規則；如想 description 再縮短「HK 打工仔嘅 Cowork 入門用法」可考慮但現時長度合格。

#### `cowork-hk-property-listing-watchlist`
- PromptBlock 同 code block 入面保留咗 STRONG / WORTH-LOOK / deal-breaker 呢啲 marker，因為係 output format 標籤，照英文最一致；如果想全中文要連 prompt 邏輯一齊改。
- spec template code block 內文（用途／預算等）冇郁，跟硬規則 code block 唔改；如果想連 template 都地道化要另議。

#### `cowork-hk-tax-prep-ongoing`
- 情境段落『結構性 bug』保留咗——『bug』喺度係刻意嘅比喻 wordplay（將報稅時序錯配講成系統 bug），屬可接受 loanword 用法；如要更貼地可改『結構性錯配』，但會蝕咗原本嘅幽默感。
- PromptBlock 內保留咗『supporting doc』『pre-ruling』『territorial source』『withholding tax』等技術 / 官方稅務詞，因屬 deliverable / 領域術語語境。

#### `cowork-job-search-daily-scanner`
- PromptBlock 內部係用戶照抄嘅 prompt deliverable，當中夾雜嘅 search 指令同 UI 標籤（Location/Posted/Keywords/Tier A/B 等）同少量英文動詞（extract/convert/flag）按規則當作 deliverable 保留未譯，若編輯方針想連 prompt 正文都地道化可再覆核。
- frontmatter title/description 含較多英文技術詞（passive job search/shortlist/salary band 等），屬該領域慣用語故保留，未郁 keywords。

#### `cowork-newsletter-feedback-aggregation`
- PromptBlock 同 code block 入面仲有保留嘅英文結構詞（Stream 1/2/3、TL;DR、referral/direct/social/unknown、module、FAQ、handle、quote tweet），因為呢啲係用戶要照抄嘅 deliverable 標籤同搜尋/平台原詞，按規則保留；如果 exemplar 要求連 PromptBlock 內嘅 Stream 標題都中譯，可再覆核。

#### `cowork-order-automation`
- 變化 3 PromptBlock 內保留咗『唔需要自動 send 提示畀客』——send 係免死金牌 loanword，但同中文『提示』並排略生硬，如要更地道可改『唔使自動通知客』，留返人手定奪。

#### `cowork-pet-health-log-automation`
- 保留咗報告 deliverable 入面少量約定俗成嘅技術詞（baseline、Bristol-like scale、HHHHHMM scale、red flag、QOL、formed / soft / 水樣 質地分類、palliative care），因為呢啲係獸醫 / 用戶照抄嘅欄位用語；如要全面本地化可再覆核。
- voice note、photo→相、project、folder / sub-folder、schema→欄位、Y/N 等 loanword 按白名單保留。

#### `cowork-portfolio-monthly-rebalance-check`
- PromptBlock 入面仍刻意保留咗部分技術／流程英文詞（如 drift、threshold、flag、rebalance、in-band、band、pool、context、audit、statement、sector、EPS surprise、Read-only→已改唯讀），因為呢啲係用戶要照抄落 Cowork 嘅 prompt deliverable，過度漢化反而失去精確度。如編輯部想連 prompt 內文都全面中文化，可再覆核呢個取捨。
- Section 1 嘅表格欄位 'Drift threshold'、'Brokerage' 同 frontmatter toolsNeeded 嘅英文（Brokerage account exports (CSV) 等）按硬規則保留未郁，當作 schema/deliverable 結構。

#### `cowork-receipt-warranty-management`
- PromptBlock 內保留咗「淨係出 data」嘅 data 一字（屬輸出指令語境，唔係夾雜文案），如要徹底中文化可改「淨係出數據」，但 data 喺技術指令脈絡常見，故保留；可人手覆核。
- title 改後為 38 字、description 未郁（內含地道詞「冚唪唥」保留），兩者均在字數上限內。

#### `cowork-rss-content-watchlist`
- code block 內嘅英文註解（# 你 30 個 niche feed、published content）按硬規則 4 冇郁
- Notion Properties 行（Date, Angle, Source URLs, Effort, Timeliness, Status）係 deliverable schema，原文保留
- PromptBlock label「完整 prompt — 每朝 RSS watchlist」同變化 1/2 嘅 feed pack 字眼保留，因屬技術／品牌詞

#### `cowork-sales-pipeline-automation`
- email 主題範本「Pipeline Review 草稿備妥 — X% 覆蓋比率」係 Claude 要照出嘅 deliverable 文字，當作引文保留咗，未譯。如要全中文可人手再睇。

#### `cowork-shopify-daily-ops-dashboard`
- 變化 2 PromptBlock 內仍有少量並列英文指標詞（impressions/clicks/conversions 旁邊已加中文），保留 ROAS / campaign / pixel 作技術詞；如要更徹底可人手再睇 label 內 'ad spend / ROAS' 一句。

#### `cowork-social-media-scheduler`
- Email subject「Weekly Social Schedule Ready for Review — N posts queued」保留咗英文，當佢係 Claude 要產出嘅 deliverable 引文；如果想全篇中文化可人手覆核。

#### `cowork-stripe-monthly-saas-review`
- PromptBlock 內仍保留大量混合英文（MRR/ARR/churn/cohort/subscription/customer 等指標同 Stripe API 詞），呢啲屬技術定義一句一個英文難免，已盡量將謂語動詞同形容詞譯返，但句內英文密度仍偏高，如需更徹底口語化要再人手權衡。

#### `cowork-weekly-inbox-triage`
- 「247 unread, 35 from this weekend」(line 24) 保留咗做 Gmail 介面顯示嘅原文引用，當作 UI quote 處理；如果編輯部想譯成中文可再睇。
- 「中繼資料」(metadata) 同「規律監察」讀起嚟略書面，但唔算大陸用語亦無更佳地道替代，維持原狀。

#### `cowork-weekly-life-review-journal`
- title 仍夾雜大量保留 loanword（Cowork / calendar / journal / message / life review），長度約 50 字喺 80 字內，結構照原樣冇郁；如想再純化要 product owner 拍板
- 保留咗示範用嘅英文反面例子「You did great this week!」（屬故意展示雞湯 anti-pattern），冇譯
- 全文有意保留嘅領域詞偏多（weekly review / section / highlight / energy drain / pattern / commitment / prompt / sync / markdown），有啲句一句多過一個英文詞，但多數屬白名單技術/領域詞；如要嚴格收緊每句一個英文詞需要人手再過一轉

#### `critical-thinking-children-claude`
- title 由原英文版改成「教細路批判思考⋯」，仍在 80 字以內；如編輯部想保留 critical thinking 英文 keyword 喺標題可人手覆核
- 保留咗『google』做動詞（loanword 慣用），如要全中文化可改『上網查』

#### `dating-app-profile-rewrite-claude-hk`
- 敏感話題（LGBTQ+ / 出櫃）段落已用溫和直接口吻處理，self-description / 出櫃狀態 placeholder 保留原樣，建議人手再睇一次語氣係咪夠 inclusive。
- PromptBlock 內保留咗較多 dating 領域英文術語（positioning / signal vs gatekeep / opening message 等），因屬用戶要照用嘅 prompt 內容；如要再收緊中英混雜可人手再審。

#### `doctor-visit-prep-claude`
- 醫療術語雙語 gloss（Chief complaint / HPI / red flag symptoms / first-line investigation / prognosis 等）保留咗，因為佢哋係幫病人同醫生溝通嘅參考術語；如果風格指南想全部淨中文，可人手再覆核。

#### `domestic-helper-interview-prep-claude`
- PromptBlock 內兩句引號英文（"Can you give me a specific example?" 同 "will you be happy living with us"）保留咗 — 因為對外傭面試係用英文進行，呢兩句屬可照用嘅對白範本／反面示範，非夾雜。如編輯部認為要中譯可再覆核。
- Placeholder 內 [Candidate A note] 等保留英文 — 屬用戶照填嘅 label，未改；如需統一改 [候選人 A 筆記] 可再決定。

#### `driving-school-selection-hk-claude`
- title 保留咗白名單詞 Claude，符合品牌保留規則；description 仍含 Claude（品牌詞，刻意保留）

#### `dse-prep-mental-claude`
- 「mock」（line 34、138）保留咗，因為係香港學生對 DSE 模擬試嘅慣用叫法，當 exam name 處理；如要全面譯做「模擬試」可再覆核

#### `emergency-fund-claude`
- 第 99-101 行「公婆」原文指配偶父母，已統一改為「家中長輩 / 父母」以符合一般廣東話語感，若原意特指岳父母可人手覆核
- 產品名「凱基 Saver」「雪佛 Liquid USD fund」按品牌保留英文，未核實係咪真實在售產品名

#### `english-email-polish-hk`
- 原文情境 email（line 24）同正文引用都有「同 finance 睇吓過」，似係故意示範用戶原稿嘅口語錯字，所以兩處都保留冇改；如果想統一可再確認

#### `family-trip-itinerary-claude`
- title 仍含英文 trip/USJ vs：屬白名單 loanword 故保留，未郁；如編採想全中文化需人手覆核
- 行程內 menu / shopping / BB 車 大量出現，按白名單保留，未逐個中譯——如要更中文化可人手再睇

#### `fertility-clinic-comparison-hk-claude`
- PromptBlock 內保留咗一批醫療/copy-field 英文（Quoted success rate、base cycle cost、freeze-all、stimulation monitoring 等）因屬用戶要照填/照抄嘅 deliverable 欄位同國際標準術語；如要進一步本地化呢啲欄位標籤需人手確認唔影響醫療準確性。

#### `funeral-planning-checklist-claude-hk`
- title 同 description 仍保留少量必要英文/品牌詞（Claude、SCMP、checklist）；如要 100% 中文需再確認編輯偏好。
- 正文保留咗 "specific 拜祭點" 一處英文形容詞（紀念花園段），語感上頗自然，未譯，可再覆核。
- 保留咗已同化的 hotline 一度改為求助熱線、WhatsApp / email / Facebook / iCloud 等 loanword 及平台名照原則保留。

#### `gacha-pull-analysis-claude`
- 第 78 行 blockquote 入面『仲有 [幾日] week』原本中英唔通，已改做『仲有 [幾日] 完場』；如果原意係指『仲有幾多個 week』可人手再斟酌措辭。
- fenced code block（sample Claude output，82-95 行）按硬規則保留原狀，入面仍有 Quick answer / Reasoning / Trap warning 等英文標題未譯。
- PromptBlock 入面 budget / pity / banner / baseline / ROI / team comp / monthly pass tier / hype man 等屬遊戲圈慣用語，已保留；如要進一步本地化可再覆核。

#### `game-review-write-claude`
- 4 軸 dump example block 同 3 個 PromptBlock 入面留咗大量英文遊戲術語（Scadutree Fragment、hit-box、stagger window、monetization、F2P 等）同英文寫作指令（Frame、snapshot、IGN-speak）。呢啲當作用戶要照抄畀 Claude 嘅 deliverable / 領域術語保留，冇譯——如想更地道可再覆核，但會影響 prompt 實用性。

#### `home-exercise-plan-hk-claude`
- title 同 toolsNeeded 內含 gym / dumbbell / Claude Chat 等 loanword/品牌詞，按白名單保留未改
- PromptBlock 內 log code block（WEEK X DAY Y 等）係用戶照抄模板，整段保留未郁
- 'NET 30' 類縮寫唔適用呢篇；冇 self-harm/suicide 內容，紅燈段落已用具體醫療指示（GP/物理治療師）保持溫和直接

#### `home-renovation-contractor-vetting-claude`
- description 內保留「hidden cost」（屬一致使用嘅術語，且為 SEO 關鍵概念）；如要求純中文可再議。
- PromptBlock 內部仍保留大量 tech 術語（included/另計、Variation order、grand total 等），因屬用戶照抄落 prompt 嘅 deliverable 內容，按硬規則保守處理。

#### `hong-kong-mortgage-comparison`
- title 仲保留咗英文「fine print」（≤80 字、讀落自然，當 loanword 處理冇譯）
- PromptBlock 入面部分 field-style 詞（H+X%/P-X%、cap/floor、tier、APR、cashback rate、mile earn rate）按 deliverable 原則保留英文，因為係用戶要照抄問 Claude 嘅技術欄位

#### `hong-kong-school-comparison-claude`
- PromptBlock 同提示句入面保留咗少量白名單 / loanword 英文（prospectus、open day、STEAM strand、SEN、sales pitch、hint、IB / GCSE），呢啲係技術詞或讀者要照用嘅嘢；如果想再地道化可人手覆核但會偏離既定 exemplar。

#### `hong-kong-tax-prep-claude`
- body 第 48 行保留咗「或 employer's return」—— 屬僱主報稅表官方別稱（讀者實際會收到呢個英文名嘅文件），所以冇譯；如要全清可改成「僱主報稅表」。
- description 用咗「報稅 香港」呢類搜尋詞式排列，屬 SEO 取向，冇改。

#### `hong-kong-tenancy-agreement-claude`
- 保留咗部分慣常法律／租務英文術語做技術詞：break clause、outgoings、permitted use、reinstatement、standard tenancy agreement、due diligence、fair wear and tear / any damage 等官方引述條文字眼——呢啲係用戶要喺租約對照嘅實際用語，故意唔譯，若 exemplar 要求全中文可再覆核。

#### `insurance-policy-review-claude`
- toolsNeeded frontmatter 值「保險 policy PDF」保留咗 policy 一字（屬結構性值，PDF 為白名單），冇改；如要再執靚可人手覆核

#### `investment-portfolio-review-claude`
- Sharpe ratio／Sortino ratio 屬投資界慣用技術詞，保留英文；如要全中文化可改「夏普比率／索提諾比率」
- placeholder「[貼返你上面整理好嘅組合內容]」原文係 [paste 你嘅組合 dump]，已改成地道講法兼保留方括號，請確認語意一致

#### `jp-rpg-translation-claude`
- 「社工報告」類問題唔適用；但有幾個 loanword（sub、console、alt-tab、rdr session 改成「遊戲時間」、tip、worth it）有意保留或輕度處理，如要更徹底地道化可再覆核。
- PromptBlock 內保留咗部分英文（platform、build、role、tier、route、ending、social link、affinity、debuff、furigana），因屬玩家照抄/技術詞性質；若編採想再清可人手定奪。

#### `kindergarten-interview-prep-hk-claude`
- 變化 2 PromptBlock 內保留咗「家長書面文章（300-500 字 English）」嘅 English 一字，因為佢係 deliverable 規格（指明要用英文寫），照規則屬唔郁範圍；如編輯想統一改「英文」可再覆核。
- 保留 playgroup 一字（loanword 性質，香港家長慣用），如要譯做「親子小組」可人手定奪。

#### `linkedin-cold-outreach-claude`
- 第 90 行標題「Send 完，唔好追」同第 59 行「純 connect」有保留：send 屬免死金牌、connect 對應 LinkedIn 個 Connect 掣，故此冇譯；如要全面去英文可再覆核。
- PromptBlock 入面啲英文引文（如 I came across your profile、I'll share my own experience back）當係用戶要照抄嘅 deliverable 範例，按規則保留原文。

#### `mac-shortcut-claude-prompt`
- PromptBlock 入面嘅英文 prompt（Polish/Translate/Summarize/Explain 等）當作 deliverable 保留未譯，因為係讀者要照抄畀 Claude 嘅嘢；如想全部本地化可人手再覆核

#### `mental-health-journaling-claude`
- 第 224 行『落地（grounding）』保留咗英文做註解，因為 5-4-3-2-1 grounding 係心理學常見術語，譯名後加英文方便讀者對照，如要全清可再覆核
- frontmatter description 入面保留咗 deadline（白名單技術／loanword 邊界詞），title 用『香港打工仔』取代『HK 打工仔』，未超 80 字

#### `mmo-guild-recruit-post-claude`
- 最後一句 sign-off「Happy recruiting」保留咗（遊戲語境慣用結尾語，譯出反而生硬）——如要全清可再睇
- 思維框架段落特登引述嘅概念詞「marketing」「announcement」保留（作者用引號對比，屬刻意修辭）
- 例子 post 內嘅 carry / wipe 屬遊戲術語兼引述範本，照保留

#### `monthly-budget-hk-claude`
- PromptBlock 入面嘅「Section 1-7」標題照保留咗英文 Section 字（屬於 prompt 內部結構錨點），無譯成中文；如果 exemplar 慣例係要全中文標題，可再 review。
- description 改後約 90 字，title 未改，兩者都喺長度上限內。

#### `mpf-review-claude`
- 保留咗『benchmark』、『alpha』、『Sharpe ratio』、『ETF』、『VC』呢類退休/投資術語縮寫做原文（屬白名單技術詞）；如果想全部中譯需另行確認。
- 『review』作名詞喺幾處保留（如『做 review』『每年 review』），語氣同 exemplar 一致，未強行譯做『檢視』。

#### `new-game-prep-claude`
- 「alt-tab」喺全篇係核心比喻詞（情境段落反覆出現），白名單冇列但為咗 consistency 保留咗，未譯
- PromptBlock 內保留咗官方遊戲提示引文「The grove watches you closely」同 reddit/wiki/OBS/spec 等技術詞，當作 deliverable 原文處理

#### `newsletter-editorial-calendar-claude`
- title 仍保留咗 idea 一字（白名單 loanword），其餘已譯；如要全中文化 title 需再確認
- PromptBlock 內 Week 1 至 Week 12 / Week N 屬使用者照抄嘅排程標籤，按 deliverable 原則保留英文未譯

#### `octopus-auto-reload-budget-claude`
- 「省」呢個字喺長輩段落原文用咗（樂悠咭省落嘅錢），雖然唔屬明確禁詞清單，但稍嫌書面，已部分改成「慳」，可人手再睇下要唔要全部統一
- 保留咗大量 reward／cashback／AAVS／top-up／e-wallet 等財經 loanword，呢啲喺香港信用卡語境屬通用，如想更口語化可人手再評估

#### `packing-list-claude`
- title 同部分位仍保留英文 loanword「trip」（出現多次，屬旅遊語境常用口語），未譯以免語氣漂移；如要全部統一做「旅行 / 出門」可再 pass。
- PromptBlock 內文係用戶要照抄畀 Claude 嘅指令，已就地清語氣但保留所有 emoji 標題同步驟結構，未改動任何 deliverable 欄位 / 數字。

#### `parent-teacher-feedback-claude`
- description 內保留咗英文 loanword「Claude」「prompt」（屬白名單），長度仍在 200 字內。
- 情境段「行貨投訴」屬地道廣東話，保留未改。

#### `pet-grooming-routine-claude`
- 「fear-free grooming」保留咗做括號內技術 gloss（前面有中文「無恐懼美容」），如要全清英文可考慮刪走括號
- 「book」（book 返／盡快 book／book 之前）當地道 loanword 保留，無譯

#### `pet-insurance-review-claude`
- 「claim」全篇保留做香港保險慣用 loanword（如 claim 錢 / claim 幾多次），未譯；如要更嚴可改「索償」。
- title 同 frontmatter toolsNeeded 入面嘅「plan」「brochure」「broker」屬保留 loanword，未郁。

#### `pet-picky-eater-diet-transition-claude`
- frontmatter toolsNeeded 值入面有 "現有寵物糧食 brand + 食量記錄" 嘅 "brand"，因為係 array 值結構，按硬規則 1 冇郁；如果想統一可人手考慮改「牌子」。
- PromptBlock label 同內文保留咗部分功能性英文 placeholder 標籤（species / age / weight / brand / line 等）同 timeline、baseline notes，因為係用戶要照填嘅 deliverable 欄位；屬白名單／結構性保留，冇譯。

#### `pet-puppy-kitten-first-month-claude`
- 保留咗 SPCA / HK / HKD / Day 1-7 等白名單寫法，同埋 Adaptil、Tapo、Wyze、FIV/FeLV 等品牌與醫療縮寫；行貨、OK 屬地道粵語/loanword 冇改。

#### `pet-sitter-handover-claude`
- title 仍保留 sitter／trip 等 loanword（符合白名單），長度 OK 在 80 字內
- PromptBlock 內 deliverable 的中英斜線分隔（如 WhatsApp／電話）視為用戶照抄結構，已統一用全形斜線但未動英文搜尋／品牌詞

#### `postpartum-mental-health-claude`
- 「baby blue」屬產後情緒醫學常用詞，保留咗冇譯——如要本地化可考慮「初為人母嘅情緒低潮」，但會犧牲讀者搜尋對照，建議維持。
- description 改完約 92 字，title 改完約 38 字，兩者都喺上限以內；keywords 陣列完全冇郁（保留英文搜尋詞）。

#### `primary-school-makeup-request-claude`
- 第 197-198 行避免句子清單入面嘅「Sorry to bother 你」「請理解...」係刻意示範家長唔好寫嘅生硬英文／道歉句，作為反面教材保留原狀，冇譯。如要全面去英文可人手再睇。
- 保留白名單英文：行 58 嘅整段英文 email 範本（家長照打嘅 draft，屬引文 deliverable）、YouTube、email、PDF、SEN/DSE/GP/ADHD/HKEAA 等縮寫、post、OK — 一律冇譯。

#### `property-offer-negotiation-claude-hk`
- title 同 description 為咗保留搜尋友善度，刻意留低 offer / listing / agent / portal / BATNA 等 loanword 同縮寫，未有全譯
- 「即供 / 建期 / 呼吸 plan」屬地產業界慣用詞，plan 一字保留未譯

#### `resignation-letter-claude-hk`
- 結尾保留咗一句全英文 "Write it like a professional. Even if you don't feel like one right now." — 判斷係刻意嘅英文金句收尾（呼應全篇教寫英文信嘅 deliverable 語境），冇譯。如果編輯部想統一改成廣東話可再覆核。

#### `restaurant-menu-allergy-filter-claude`
- title 同 description 入面保留咗『menu』（HK 飲食場景常用近 loanword），冇改動；如要全面中文化可再覆核。
- PromptBlock 入面嘅 Part 1-4 英文標籤當作 deliverable 結構保留，未譯。

#### `run-local-llm-mac-claude-ollama`
- 變化 2 將「修飾」用作審查語境保留，但其他位「修飾文字」一律改咗做「執靚」；如想全篇統一可再覆核。

#### `sibling-conflict-mediation-claude`
- frontmatter toolsNeeded 值入面有「經常衝突嘅 pattern」一個英文 pattern 字，因為硬規則話 toolsNeeded 值結構唔好郁，所以冇改 — 如要統一可人手覆核改做「規律」。

#### `steam-game-similar-recommendation-claude`
- 「backlog」喺變化 1 嘅 PromptBlock 同引言保留咗（gaming 圈常用 loanword、又喺 deliverable 範本入面），如果想更地道可考慮改「未玩清單／未通關清單」
- 「梳化雙人」(couch co-op) 保留原文，屬地道講法

#### `student-part-time-job-claude-hk`
- 保留咗 transferable→可轉移技能 嘅譯法、prompt / application / interview / trial 等視為領域詞或 loanword 保留；如編輯部想連 application 都中文化可再議。
- 「行為基準」「job post」「job description」「career page」屬 deliverable / 引用語境，按規則保留原文。

#### `summer-camp-application-letter-claude`
- 三段以 > 引起嘅英文壞信示範（lines 35/41/47）係刻意展示『行貨英文草稿』，按引文保留原則冇譯——若編輯部想全文中文化可人手再睇
- gelato（line 377）當食物名 loanword 保留咗，如要本地化可改『意式雪糕』
- medical form 部分大量保留 NIL / PRN / 2 puffs 等官方表格用語，假設係用戶照抄落表，冇譯

#### `supplementary-tutoring-decision-claude-hk`
- title 仍保留英文 phonics（白名單領域詞，無譯）；keywords 內 "tutoring decision HK" 等英文搜尋詞按硬規則完全不動

#### `tax-refund-claude`
- 第 56 行海關員對白保留咗英文「sales tax exemption」做真實口語質感（同句已有中文蓋印/處理），如要全清可再譯
- check-in 當作旅遊 loanword 保留（步驟 258/264），符合白名單精神但可人手覆核

#### `trpg-gm-prep-claude`
- PromptBlock 入面嘅英文 TRPG 術語 gloss（Setting / Tone / Want / Need / Plot hook / Voice / RAW / house ruling）視為玩家要照抄嘅 deliverable 術語，保留未譯；如要求全中文化可再覆核。
- 「group chat」「boss」作為桌遊圈通用 loanword 保留。

#### `trpg-world-building-claude`
- code block 內保留咗英文 placeholder field（[I planned to:]、layer、canonize、Acts 1-3 弧、emergent、mastermind、wildcard、in-fiction、flavour），因為喺三反引號 code block 入面、屬唔可改範圍——如想連 code block field label 都中文化要另行確認。
- PromptBlock 內保留咗兩句完整英文引文（『Hold on, let me check my notes』同單人 RPG 個 Given my protagonist... 問句），當作對白／可照抄範本處理，未譯。

#### `utility-bill-dispute-letter-claude`
- 「質素」一詞已沿用（OFCA 段「服務質素」屬官方用語，非大陸詞）；信件英文主旨範本 Formal Complaint — Account ... 屬用戶照抄 deliverable，按規則原文保留；chargeback 保留英文但已加中文 gloss 退款追討。

#### `vet-visit-prep-claude`
- PromptBlock 入面有少量保留咗嘅技術／醫療縮寫（Day -X、yyyy-mm-dd、X-ray、24 小時急症旁嘅脈絡），當作 deliverable 欄位處理冇譯；若編採想連 prompt 內所有英文都本地化，可再覆核。

#### `visa-application-claude`
- 原文第 388 行『802 開頭 HK 號碼格式 +852』疑似有誤——802 係美國 Vermont 區號，HK 號碼唔會 802 開頭。我已改寫成『HK 號碼用 +852 格式』去除錯誤資訊，但建議人手覆核原意。
- ESTA 收費寫 US$21（fee $4 + 處理 $17）——數字未核實，如要準確請查官網。

#### `wedding-speech-claude-hong-kong`
- title 同 description 入面仍保留咗 chatbot / Claude / ChatGPT / prompt 等白名單詞，屬刻意保留；如要再純化中文需另行確認。
- PromptBlock 內仍夾少量英文（如 bullet point），因屬 deliverable 內容兼白名單詞而保留。

#### `whatsapp-customer-reply-hk`
- 「professional customer service rep」係故意保留嘅反面 prompt 例子（引號內），冇譯
- quick reply / Quick Replies 當 WhatsApp Business 產品功能名保留；Settings → Business tools 等 UI 路徑亦原文保留

#### `whatsapp-group-chat-summary-claude`
- title 入面保留咗『WhatsApp group chat 摘要』同『decision + action』改咗做『決定 + 行動』，但 group chat 屬白名單故留；如要更純可再議。
- description（frontmatter）保留咗原狀，因含搜尋詞性質嘅英文（chat summary ai 等），且未超 200 字，按硬規則 keywords 旁邊 description 只清突兀英文，現有英文屬可接受 loanword/品牌詞。

#### `youtube-game-guide-extract-claude`
- 結尾『GG，打贏 boss 之後返去 like + comment 條片』屬遊戲文化語氣，刻意保留；如要更純廣東話可再議。
- 變化 3『去刷 (farm)』保留咗中文動詞『刷』+英文 gloss，視為遊戲行話；可考慮刪 (farm)。

#### `youtube-transcript-summary-claude`
- 主 PromptBlock 內保留咗英文例句「Overall, this video covers a wide range of topics」——呢句係故意用嚟示範要避免嘅行貨開場白，所以冇譯，屬刻意保留。

---

## 5. 殘留「英文動詞 + 助詞」spot-check（79 個，多數喺 code / deliverable 內）

機器將呢類由 160 清到 79，餘下大多喺 code block / copy-paste prompt 內（刻意保留）。如果你裁定方針問題 #2 / #4 要清，呢啲位順手捉：散文若見「英文字 + 咗/緊/過」（例 `swipe 過`、`drift 過`、`commit 咗`），轉返中文動詞（「掃過」「走樣咗」「已提交」）。跑 `node scripts/scan-cantonese.mjs` 個 `⚠助` 欄睇實時清單。

## 6. 交收後

裁決完 §3 + 標完 §4，交返畀我，我會：
1. 按你嘅方針裁決開多一輪批量清理（針對 §3 揀「清」嗰幾類）。
2. 跑 `node scripts/scan-cantonese.mjs` + `pnpm build` 再驗一次。
3. 你滿意先 merge `content/cantonese-cleanup` 落 `main`。
