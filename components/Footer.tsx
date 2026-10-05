// components/Footer.tsx — Site footer

import Link from 'next/link'
import { Orb } from './Orb'

export function Footer() {
  return (
    <footer className="border-text/25 mt-auto border-t">
      <div className="px-6 py-16">
        <div className="text-border mb-12 flex justify-center">
          <Orb size={120} />
        </div>
        <div className="text-center">
          <p className="text-muted mx-auto max-w-md text-[14px] leading-relaxed">
            The best way to learn is to build.
            <br />
            The second best is to find something worth building.
          </p>
        </div>
      </div>

      <div className="border-text/25 border-t" />

      <div className="text-muted flex flex-col items-center justify-between gap-4 px-6 py-6 font-mono text-[12px] md:flex-row">
        <div className="flex items-center gap-4">
          <Link href="/about" className="link-mono">
            About
          </Link>
          <Link href="/changelog" className="link-mono">
            Changelog
          </Link>
          <a
            href="https://github.com/heuristicslab/corpus-stack"
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
