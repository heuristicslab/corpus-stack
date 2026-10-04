import Link from 'next/link'
import { Orb } from './Orb'

export function Footer() {
  return (
    <footer className="border-t border-text/25 mt-auto">
      <div className="px-6 py-16">
        <div className="flex justify-center mb-12 text-border">
          <Orb size={120} />
        </div>
        <div className="text-center">
          <p className="text-[14px] text-muted max-w-md mx-auto leading-relaxed">
            The best way to learn is to build.
            <br />
            The second best is to find something worth building.
          </p>
        </div>
      </div>

      <div className="border-t border-text/25" />

      <div className="px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-muted font-mono">
        <div className="flex items-center gap-4">
          <Link href="/about" className="link-mono">
            About
          </Link>
          <Link href="/changelog" className="link-mono">
            Changelog
          </Link>
          <a
            href="https://github.com/njokinjeri/personal-toolbox"
            target="_blank"
            rel="noopener noreferrer"
            className="link-mono"
          >
            GitHub
          </a>
        </div>
        <div>© 2026 Corpus Stack</div>
      </div>
    </footer>
  )
}