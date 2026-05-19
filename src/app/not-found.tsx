import Link from 'next/link'
import { MastheadCompact } from '@/components/design/Masthead'
import { Footer } from '@/components/design/Footer'
import { Seal } from '@/components/design/Seal'

export default function NotFound() {
  return (
    <>
      <MastheadCompact />
      <main className="max-w-2xl mx-auto px-6 py-32 text-center">
        <Seal char="缺" size={96} className="mx-auto mb-8" />
        <h1 className="font-serif font-black text-5xl mb-4">呢一頁未出版</h1>
        <p className="font-serif text-lg text-[var(--color-ink-soft)] mb-8">
          冇呢期 use case，或者 URL 打錯咗。
        </p>
        <Link
          href="/"
          className="inline-block font-serif font-bold underline underline-offset-4 hover:text-[var(--color-seal-deep)]"
        >
          返去頭版 →
        </Link>
      </main>
      <Footer />
    </>
  )
}
