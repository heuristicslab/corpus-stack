import Link from 'next/link'
import { Orb } from './Orb'

export function Header() {
  return (
    <header className="border-b border-border bg-bg">
      <div className="max-w-300 mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
        >
          <Orb size={22} />
          <span className="font-semibold tracking-tight text-[15px]">
            Corpus Stack
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-[13px] text-muted">
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