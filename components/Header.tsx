// components/Header.tsx — Site header

import Link from 'next/link'
import { Orb } from './Orb'

export function Header() {
  return (
    <header className="border-border bg-bg border-b">
      <div className="mx-auto flex h-14 max-w-300 items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <Orb size={22} />
          <span className="text-[15px] font-semibold tracking-tight">
            Corpus Stack
          </span>
        </Link>

        <nav className="text-muted flex items-center gap-6 text-[13px]">
          <Link href="/browse" className="hover:text-text transition-colors">
            Browse
          </Link>
          <Link href="/about" className="hover:text-text transition-colors">
            About
          </Link>
          <Link href="/changelog" className="hover:text-text transition-colors">
            Changelog
          </Link>
        </nav>
      </div>
    </header>
  )
}
