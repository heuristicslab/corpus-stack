// app/changelog/page.tsx — Changelog

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Changelog — Corpus Stack',
  description:
    'A running record of additions, updates, and verification cycles for the Corpus Stack archive.',
  alternates: {
    canonical: '/changelog',
  },
  openGraph: {
    title: 'Changelog — Corpus Stack',
    description:
      'A running record of additions, updates, and verification cycles for the Corpus Stack archive.',
    url: '/changelog',
  },
}
type Tag = 'NEW' | 'IMPROVED' | 'FIXED'

type Entry = {
  date: string
  tag: Tag
  title: string
  items: string[]
}

const entries: Entry[] = [
  {
    date: 'October 5, 2026',
    tag: 'NEW',
    title: 'Corpus Stack launches',
    items: [
      '202 curated resources across 10 sections and 9 stacks.',
      'Every entry reviewed against the three tenets before publishing.',
      'Search, filters, pagination, and resource detail pages live.',
      'Automated daily backups deployed.',
      'Monthly theme introduced: AI.',
    ],
  },
]

const tagStyles: Record<Tag, React.CSSProperties> = {
  NEW: {
    backgroundColor: 'transparent',
    color: '#16A34A',
    border: '1px solid #16A34A',
  },
  IMPROVED: {
    backgroundColor: 'transparent',
    color: '#6366F1',
    border: '1px solid #6366F1',
  },
  FIXED: {
    backgroundColor: 'transparent',
    color: '#71717A',
    border: '1px solid #E4E4E7',
  },
}

export default function ChangelogPage() {
  return (
    <div>
      <section
        className="relative"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(24,24,27,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(24,24,27,0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          backgroundPosition: 'top left',
        }}
      >
        <div className="px-6 py-24 md:py-32">
          <div className="bg-bg mx-auto max-w-xl px-10 py-8 text-center">
            <h1 className="mb-4 text-5xl font-medium tracking-tight md:text-6xl">
              Changelog
            </h1>
            <p className="text-muted text-[14px] md:text-[16px]">
              A running record of additions and changes to Corpus Stack.
            </p>
          </div>
        </div>
      </section>

      <div className="border-text/25 border-t" />

      {entries.map((entry, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-[220px_1px_1fr]">
          <div className="flex flex-row items-center justify-between gap-3 px-6 py-8 md:flex-col md:items-start md:justify-start md:gap-0 md:py-16 md:pr-10">
            <time className="text-muted font-mono text-[11px] tracking-widest uppercase md:mb-3">
              {entry.date}
            </time>
            <span
              className="inline-block shrink-0 px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase"
              style={tagStyles[entry.tag]}
            >
              {entry.tag}
            </span>
          </div>

          <div
            className="bg-text/25 hidden self-stretch md:block"
            aria-hidden="true"
          />

          <div className="px-6 pt-0 pb-12 md:py-16 md:pl-10">
            <h2 className="mb-6 text-xl font-medium tracking-tight md:text-2xl">
              {entry.title}
            </h2>
            <ul className="space-y-3">
              {entry.items.map((item, j) => (
                <li
                  key={j}
                  className="text-muted grid grid-cols-[16px_1fr] gap-3 text-[14px] leading-relaxed"
                >
                  <span className="text-muted select-none">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="border-text/25 border-t" />

      <div className="grid grid-cols-1 md:grid-cols-[220px_1px_1fr]">
        <div className="px-6 py-8 md:py-16 md:pr-10">
          <span className="border-accent text-accent inline-block border px-2 py-0.5 font-mono text-[10px] tracking-widest uppercase">
            BROWSE
          </span>
        </div>

        <div
          className="bg-text/25 hidden self-stretch md:block"
          aria-hidden="true"
        />

        <div className="px-6 pt-0 pb-12 md:py-16 md:pl-10">
          <h2 className="mb-4 text-xl font-medium tracking-tight md:text-2xl">
            Explore 202 curated resources
          </h2>
          <p className="text-muted mb-6 max-w-lg text-[14px] leading-relaxed">
            Search by keyword, or filter by section, stack, type, and
            difficulty.
          </p>
          <Link
            href="/browse"
            className="link-mono group inline-flex items-center gap-1.5 text-[13px]"
          >
            Open Browse
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
