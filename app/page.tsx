import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  getTotalCount,
  getSectionCounts,
  getStackCounts,
  getRecentResources,
  getAIHighlights,
} from '@/lib/resources'

function DifficultyLabel({ value }: { value: string | null }) {
  if (!value) return null
  if (value.includes('→')) {
    const [from, to] = value.split('→').map((s) => s.trim())
    return (
      <span className="inline-flex items-center gap-1">
        {from}
        <ArrowRight className="w-3 h-3" />
        {to}
      </span>
    )
  }
  return <span>{value}</span>
}

function Meta({ items }: { items: (string | null | undefined)[] }) {
  const clean = items.filter(Boolean) as string[]
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap">
      {clean.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {item.includes('→') ? <DifficultyLabel value={item} /> : item}
          {i < clean.length - 1 && <span className="text-muted">·</span>}
        </span>
      ))}
    </span>
  )
}

export default async function Home() {
  const [total, sections, stacks, recent, aiHighlights] = await Promise.all([
    getTotalCount(),
    getSectionCounts(),
    getStackCounts(),
    getRecentResources(5),
    getAIHighlights(4),
  ])

  return (
    <div>
      <section className="px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 max-w-3xl">
          Find what&apos;s worth learning.
        </h1>
        <p className="text-muted text-base md:text-lg max-w-2xl mb-10">
          A curated archive of {total} free technical resources. Verified for
          quality. Accessible everywhere. Forever free.
        </p>

        <form action="/browse" method="get" className="max-w-2xl">
          <div className="flex border border-text/25 bg-surface focus-within:border-accent transition-colors">
            <input
              type="text"
              name="q"
              placeholder="Search resources..."
              className="flex-1 px-4 py-3 bg-transparent outline-none text-[15px] placeholder:text-muted"
            />
            <button
              type="submit"
              className="px-6 border-l border-text/25 text-[13px] font-mono text-muted hover:text-accent hover:bg-bg transition-colors"
            >
              SEARCH
            </button>
          </div>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-[12px] font-mono text-muted">
          <span>Popular:</span>
          {['JavaScript', 'Python', 'Docker', 'React', 'Linux'].map((tag, i, arr) => (
            <span key={tag} className="inline-flex items-center gap-2">
              <Link href={`/browse?q=${tag}`} className="link-mono">
                {tag}
              </Link>
              {i < arr.length - 1 && <span>·</span>}
            </span>
          ))}
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent mb-2">
              This month
            </div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
              AI
            </h2>
          </div>
          <Link
            href="/browse?section=AI"
            className="link-mono inline-flex items-center gap-1 text-[13px]"
          >
            Explore all AI
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-text/25 border border-text/25">
          {aiHighlights.map((r) => (
            <Link
              key={r.id}
              href={`/resource/${r.id}`}
              className="bg-bg p-5 hover:bg-surface transition-colors block"
            >
              <div className="font-medium mb-1">{r.name}</div>
              <div className="text-[12px] font-mono text-muted">
                <Meta items={[r.resource_type, r.difficulty]} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6">
          Explore by section
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-text/25 border border-text/25">
          {sections.map(({ section, count }) => (
            <Link
              key={section}
              href={`/browse?section=${encodeURIComponent(section)}`}
              className="bg-bg p-5 hover:bg-surface transition-colors group"
            >
              <div className="font-medium mb-2 group-hover:text-accent transition-colors">
                {section}
              </div>
              <div className="text-[12px] font-mono text-muted">
                {count} {count === 1 ? 'resource' : 'resources'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6">
          Explore by stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-text/25 border border-text/25">
          {stacks.map(({ stack, count }) => (
            <Link
              key={stack}
              href={`/browse?stack=${encodeURIComponent(stack)}`}
              className="bg-bg p-5 hover:bg-surface transition-colors group"
            >
              <div className="font-medium mb-2 group-hover:text-accent transition-colors">
                {stack}
              </div>
              <div className="text-[12px] font-mono text-muted">
                {count} {count === 1 ? 'resource' : 'resources'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted">
            Recently added
          </h2>
          <Link
            href="/browse"
            className="link-mono inline-flex items-center gap-1 text-[13px]"
          >
            Browse all {total}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="border-t border-text/25">
          {recent.map((r) => (
            <Link
              key={r.id}
              href={`/resource/${r.id}`}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6 py-5 border-b border-text/25 hover:bg-surface transition-colors"
            >
              <div className="min-w-0">
                <div className="font-medium mb-1">{r.name}</div>
                <div className="text-[13px] text-muted line-clamp-1">
                  {r.description}
                </div>
              </div>
              <div className="text-[12px] font-mono text-muted md:text-right shrink-0">
                <Meta items={[r.resource_type, r.stack]} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}