import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Changelog — Corpus Stack',
  description: 'A running record of additions and changes to Corpus Stack.',
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
          <div className="max-w-xl mx-auto text-center bg-bg px-10 py-8">
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight mb-4">
              Changelog
            </h1>
            <p className="text-[14px] md:text-[16px] text-muted">
              A running record of additions and changes to Corpus Stack.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-text/25" />

      {entries.map((entry, i) => (
        <div key={i} className="grid grid-cols-1 md:grid-cols-[220px_1px_1fr]">
          <div className="px-6 py-8 md:py-16 md:pr-10 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-3 md:gap-0">
            <time className="text-[11px] font-mono uppercase tracking-widest text-muted md:mb-3">
              {entry.date}
            </time>
            <span
              className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 shrink-0"
              style={tagStyles[entry.tag]}
            >
              {entry.tag}
            </span>
          </div>

          <div className="hidden md:block bg-text/25 self-stretch" aria-hidden="true" />

          <div className="px-6 pb-12 pt-0 md:py-16 md:pl-10">
            <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-6">
              {entry.title}
            </h2>
            <ul className="space-y-3">
              {entry.items.map((item, j) => (
                <li
                  key={j}
                  className="grid grid-cols-[16px_1fr] gap-3 text-[14px] leading-relaxed text-muted"
                >
                  <span className="text-muted select-none">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <div className="border-t border-text/25" />

      <div className="grid grid-cols-1 md:grid-cols-[220px_1px_1fr]">
        <div className="px-6 py-8 md:py-16 md:pr-10">
          <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 border border-accent text-accent">
            BROWSE
          </span>
        </div>

        <div className="hidden md:block bg-text/25 self-stretch" aria-hidden="true" />

        <div className="px-6 pb-12 pt-0 md:py-16 md:pl-10">
          <h2 className="text-xl md:text-2xl font-medium tracking-tight mb-4">
            Explore 202 curated resources
          </h2>
          <p className="text-[14px] text-muted leading-relaxed mb-6 max-w-lg">
            Search by keyword, or filter by section, stack, type, and
            difficulty.
          </p>
          <Link
            href="/browse"
            className="link-mono group inline-flex items-center gap-1.5 text-[13px]"
          >
            Open Browse
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}