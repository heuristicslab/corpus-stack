// app/page.tsx — Homepage

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  getTotalCount,
  getSectionCounts,
  getStackCounts,
  getRecentResources,
  getMonthlyHighlights,
} from '@/lib/resources'
import { getCurrentTheme } from '@/lib/theme'
import { Meta } from '@/components/Meta'

export default async function Home() {
  const theme = getCurrentTheme()

  const [total, sections, stacks, recent, highlights] = await Promise.all([
    getTotalCount(),
    getSectionCounts(),
    getStackCounts(),
    getRecentResources(5),
    getMonthlyHighlights(theme.stack, 4),
  ])

  return (
    <div>
      <section className="px-6 py-24 md:py-32">
        <h1 className="mb-6 max-w-3xl text-4xl font-medium tracking-tight md:text-6xl">
          Find what&apos;s worth learning.
        </h1>
        <p className="text-muted mb-10 max-w-2xl text-base md:text-lg">
          {total} free resources for learning, building, and exploring
          technology.
          <br />
          <span className="text-text/70">
            Verified. Accessible. Forever free.
          </span>
        </p>

        <form action="/browse" method="get" className="max-w-2xl">
          <div className="border-text/25 bg-surface focus-within:border-accent flex border transition-colors">
            <input
              type="text"
              name="q"
              placeholder="Search resources..."
              className="placeholder:text-muted flex-1 bg-transparent px-4 py-3 text-[15px] outline-none"
            />
            <button
              type="submit"
              className="border-text/25 text-muted hover:text-accent hover:bg-bg border-l px-6 font-mono text-[13px] transition-colors"
            >
              SEARCH
            </button>
          </div>
        </form>

        <div className="text-muted mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[12px]">
          <span>Popular:</span>
          {['JavaScript', 'Python', 'Docker', 'React', 'Linux'].map(
            (tag, i, arr) => (
              <span key={tag} className="inline-flex items-center gap-2">
                <Link href={`/browse?q=${tag}`} className="link-mono">
                  {tag}
                </Link>
                {i < arr.length - 1 && <span>·</span>}
              </span>
            ),
          )}
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-0">
          <div>
            <div className="text-accent mb-2 font-mono text-[11px] tracking-widest uppercase">
              This month
            </div>
            <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
              {theme.label}
            </h2>
          </div>
          <Link
            href={theme.link}
            className="link-mono inline-flex items-center gap-1 text-[13px]"
          >
            Explore all {theme.label}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="bg-text/25 border-text/25 grid grid-cols-1 gap-px border md:grid-cols-2">
          {highlights.map((r) => (
            <Link
              key={r.id}
              href={`/resource/${r.id}`}
              className="bg-bg hover:bg-surface block p-5 transition-colors"
            >
              <div className="mb-1 font-medium">{r.name}</div>
              <div className="text-muted font-mono text-[12px]">
                <Meta items={[r.resource_type, r.difficulty]} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <h2 className="text-muted mb-6 font-mono text-[11px] tracking-widest uppercase">
          Explore by section
        </h2>

        <div className="bg-text/25 border-text/25 grid grid-cols-2 gap-px border md:grid-cols-5">
          {sections.map(({ section, count }) => (
            <Link
              key={section}
              href={`/browse?section=${encodeURIComponent(section)}`}
              className="bg-bg hover:bg-surface group p-5 transition-colors"
            >
              <div className="group-hover:text-accent mb-2 font-medium transition-colors">
                {section}
              </div>
              <div className="text-muted font-mono text-[12px]">
                {count} {count === 1 ? 'resource' : 'resources'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <h2 className="text-muted mb-6 font-mono text-[11px] tracking-widest uppercase">
          Explore by stack
        </h2>

        <div className="bg-text/25 border-text/25 grid grid-cols-2 gap-px border md:grid-cols-3">
          {stacks.map(({ stack, count }) => (
            <Link
              key={stack}
              href={`/browse?stack=${encodeURIComponent(stack)}`}
              className="bg-bg hover:bg-surface group p-5 transition-colors"
            >
              <div className="group-hover:text-accent mb-2 font-medium transition-colors">
                {stack}
              </div>
              <div className="text-muted font-mono text-[12px]">
                {count} {count === 1 ? 'resource' : 'resources'}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-muted font-mono text-[11px] tracking-widest uppercase">
            Recently added
          </h2>
          <Link
            href="/browse"
            className="link-mono inline-flex items-center gap-1 text-[13px]"
          >
            Browse all {total}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="border-text/25 border-t">
          {recent.map((r) => (
            <Link
              key={r.id}
              href={`/resource/${r.id}`}
              className="border-text/25 hover:bg-surface grid grid-cols-1 gap-2 border-b py-5 transition-colors md:grid-cols-[1fr_auto] md:gap-6"
            >
              <div className="min-w-0">
                <div className="mb-1 font-medium">{r.name}</div>
                <div className="text-muted line-clamp-1 text-[13px]">
                  {r.description}
                </div>
              </div>
              <div className="text-muted shrink-0 font-mono text-[12px] md:text-right">
                <Meta items={[r.resource_type, r.stack]} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
