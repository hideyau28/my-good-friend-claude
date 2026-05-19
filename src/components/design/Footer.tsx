import Link from 'next/link'
import { Seal } from './Seal'

/**
 * 報底版權區 — 副刊風格嘅 footer。
 */
export function Footer() {
  return (
    <footer className="border-t-[3px] border-[var(--color-rule-strong)] mt-20 paper-grain">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Seal char="友" size={40} />
              <span className="font-serif font-bold text-lg">我的好朋友 Claude</span>
            </div>
            <p className="font-serif text-sm text-[var(--color-ink-soft)] leading-relaxed">
              一齊由零開始用 Claude。
              <br />
              寫畀香港人嘅獨立教學副刊。
            </p>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[var(--color-ink-mute)] mb-3">
              欄目
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/use-cases" className="hover:text-[var(--color-seal)] no-underline">Use Case 庫</Link></li>
              <li><Link href="/use-cases?category=chat" className="hover:text-[var(--color-seal)] no-underline">日常用 Chat</Link></li>
              <li><Link href="/use-cases?category=cowork" className="hover:text-[var(--color-seal)] no-underline">自動化 Cowork</Link></li>
              <li><Link href="/use-cases?category=code" className="hover:text-[var(--color-seal)] no-underline">開發者 Code</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.2em] text-[var(--color-ink-mute)] mb-3">
              關於 / 訂閱
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-[var(--color-seal)] no-underline">關於本副刊</Link></li>
              <li><Link href="/#newsletter" className="hover:text-[var(--color-seal)] no-underline">每週日訂閱</Link></li>
              <li><a href="https://instagram.com" className="hover:text-[var(--color-seal)] no-underline">Instagram</a></li>
              <li><a href="https://threads.net" className="hover:text-[var(--color-seal)] no-underline">Threads</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-rule-soft)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--color-ink-mute)] font-serif">
          <span>© 二〇二六年 · 我的好朋友 Claude · 香港獨立發行</span>
          <span>本副刊內容由人手撰寫，部分由 Claude AI 協助。</span>
        </div>
      </div>
    </footer>
  )
}
