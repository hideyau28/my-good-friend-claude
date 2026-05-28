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

## 後續建議

- 用 `docs/cantonese-style-guide.md` 做每篇 MDX 嘅審稿基準。
- 下一輪可以寫一個簡單掃描腳本，列出非白名單英文詞，協助批量清理。
- 每次只清 3–5 篇，避免一次過大改令語氣漂移。
