# 廣東話中英混雜清理 Audit — 第一輪

> 由 Claude Code 先做初稿清理，再由 Hermes 收尾補齊 audit / 驗證。日期：2026-05-29

## 今次改咗嘅檔案

- `docs/cantonese-style-guide.md`
  - 新增全站廣東話內容風格指南。
  - 包含可保留英文白名單、常見中英混雜對照、語氣守則、MDX / SEO 審稿 checklist。
- `content/use-cases/dse-prep-mental-claude.mdx`
  - 清理 DSE 家長心理支援文章入面大量不自然英文動詞、形容詞、工作術語。
  - 保留必要 SEO / 香港常用名詞：Claude、Claude Chat、DSE、JUPAS、HK、IB、Bio、Chem、mock、prompt、EAP。
- `docs/cantonese-cleanup-audit.md`
  - 本報告，記錄規則同下一步。

## 主要替換規則

- 英文動詞改廣東話動作：
  - `set 界線` → `劃界線`
  - `fix` → `搞掂` / `處理`
  - `optimize` → `改善`
  - `dump` → `坦白寫低` / `坦白交代`
  - `handle` → `處理`
  - `commit 做` → `承諾做`
- 英文心理 / 家庭術語改自然說法：
  - `self-harm` → `自傷`
  - `acute crisis` / `急 case` → `緊急危機` / `緊急情況`
  - `helpline` / `crisis hotline` → `求助熱線` / `危機求助熱線`
  - `counsellor` → `輔導老師`（學校語境）
  - `GP` → `家庭醫生`
- 英文管理術語改人話：
  - `default` → `慣性`
  - `backfire` → `適得其反` / `反效果`
  - `script` → `對白範本` / `講法`
  - `check-in` → `關心一下`
  - `checkpoint` → `檢查點`
  - `metric` → `指標`
  - `pattern` → `模式`
- 保留語境上自然或 SEO 需要嘅英文：
  - `Claude`, `Claude Chat`, `DSE`, `JUPAS`, `HK`, `IB`, `Bio`, `Chem`, `mock`, `prompt`, `EAP`。

## 下一批高優先頁

建議優先清理以下文章 / 頁面，因為內容容易有英文工作術語、AI 術語或家長/教育語境：

1. `content/use-cases/claude-code-install-claude.mdx` — 技術教學容易混入 install、setup、workflow、terminal。
2. `content/use-cases/claude-code-claudemd-mastery.mdx` — Claude Code / CLAUDE.md 教學，需保留技術名詞但清理英文動詞。
3. `content/use-cases/cowork-dse-study-plan-automation.mdx` — DSE + automation 語境，容易中英混雜。
4. `content/use-cases/parent-teacher-feedback-claude.mdx` — 教育 / 家長語境，適合套用今次心理健康用語規則。
5. `content/use-cases/mental-health-journaling-claude.mdx` — 心理健康語氣要一致，避免英文術語過多。

## 第二輪清理（2026-05-29）

> Claude Code 先分批處理 5 篇高優先頁；由於多次到達 `max-turns`，最後由 Hermes 補齊本 audit section 並做驗證。

### 第二輪改咗嘅檔案

- `content/use-cases/claude-code-install-claude.mdx`
- `content/use-cases/claude-code-claudemd-mastery.mdx`
- `content/use-cases/cowork-dse-study-plan-automation.mdx`
- `content/use-cases/parent-teacher-feedback-claude.mdx`
- `content/use-cases/mental-health-journaling-claude.mdx`

### 第二輪主要替換規則

- 技術教學頁保留必要英文名詞（`Claude Code`, `terminal`, `npm`, `pnpm`, `repo`, `commit`, `PR`, `README`, `docs`, `workflow`），但清理不自然英文動詞同管理語氣。
- DSE / 家長頁沿用第一輪規則：`default` → `慣性`、`backfire` → `適得其反`、`script` → `對白範本` / `講法`、`pattern` → `模式`。
- 心理健康頁維持溫和直接：`self-harm` → `自傷`、`helpline` → `求助熱線`、`counsellor` → `輔導老師` / `心理輔導員`、`GP` → `家庭醫生`（除非係 PromptBlock label 內保留搜尋/專業語境）。
- 保留 SEO / 香港讀者常用詞：`Claude`, `AI`, `prompt`, `DSE`, `JUPAS`, `HK`, `mock`, `EAP`。

### 第三輪建議

1. 跑一個非白名單英文掃描，按「用戶可見文案」排序，先清 metadata `title` / `description`。
2. 優先處理仍有大量技術英文字嘅 Claude Code 系列：hooks、slash commands、security review、model routing。
3. 再處理商業 / Cowork automation 系列，統一 `workflow`、`dashboard`、`automation` 等詞嘅保留準則。
4. 最後掃 `src/components/` 入面 button、CTA、aria-label 等短文案，避免頁面內容清咗但 UI 仲有突兀英文。

## 第三輪執行（2026-05-29）

> Claude Code 執行：指南升級 → 建掃描器 → genre-spread 試點批校準。

### 指南升級到第二版

經外部廣東話編輯（Gemini）審閱，已 fold 入 `docs/cantonese-style-guide.md`：

- 白名單增刪（剔 date / gathering / hobby；加日常科技、職場、免死動詞 Keep · Send · Share）
- 對照表 +9 個（run / trigger / draft / follow up / make sense / read-only / sync 等）
- 譯法執靚（optimize → 執靚、dump → 一口氣打晒出嚟、over-bearing → 控制慾強）
- 新增 §3.5 英文動詞 + 助詞、§3.6 防大陸用語（視頻 / 屏幕 / 質量 / 激活 / 給力）

### 掃描器

新增 `scripts/scan-cantonese.mjs`：剝走白名單 / code / JSX / URL 後數非白名單英文，以「細楷」為真信號（避開人名 / 品牌 / 領域縮寫虛高），另 flag 大陸用語同英文動詞 + 助詞。

- **全站 baseline：27,915 個細楷英文 token（141 篇）**

### 試點批（3 篇，校準用）

| 文章 | 清前 | 清後 | 備註 |
| --- | --- | --- | --- |
| pet-end-of-life-grief-claude | 845 | 11 | 敏感語氣 |
| cowork-freelancer-monthly-invoicing | 540 | 241 | 殘留係刻意保留嘅英文客戶 email 範本 |
| sleep-insomnia-tracker-claude | 82 | 35 | 大陸用語 13 → 0 |

### 校準決定（已確認）

- **保留**：invoice（loanword + SEO）、Cowork（product name）、客戶 email 範本（client deliverable）、Toggl / Clockify / GP / CPAP / NET 30 / HKD 等品牌·技術·領域詞。
- **照譯**：vet → 獸醫、client → 客戶、rate → 收費·時薪、logistics → 事務、hospice → 寧養、cremation → 火化、grief → 哀傷 等。

### 下一步

Phase 3 每批 5 篇，worst-first（按細楷密度，避開純技術詞虛高），逐批 build + commit。

## 後續建議

- 用 `docs/cantonese-style-guide.md` 做每篇 MDX 嘅審稿基準。
- 下一輪可以寫一個簡單掃描腳本，列出非白名單英文詞，協助批量清理。
- 每次只清 3–5 篇，避免一次過大改令語氣漂移。
