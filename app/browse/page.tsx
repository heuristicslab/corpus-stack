import Link from 'next/link'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import {
  browseResources,
  getAllSections,
  getAllStacks,
  getAllTypes,
  type BrowseFilters,
} from '@/lib/resources'
import { Meta } from '@/app/components/Meta'

export const metadata = {
  title: 'Browse — Corpus Stack',
}

type SearchParams = Promise<BrowseFilters & { page?: string }>


export default async function BrowsePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10) || 1)

  const filters: BrowseFilters = {
    q: params.q,
    section: params.section,
    stack: params.stack,
    type: params.type,
    difficulty: params.difficulty,
  }

  const [result, sections, stacks, types] = await Promise.all([
    browseResources(filters, page),
    getAllSections(),
    getAllStacks(),
    getAllTypes(),
  ])

  const { resources, total, totalPages } = result
  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  return (
    <div>
      <div className="px-6 py-10">
        <form action="/browse" method="get">
          <div className="flex border border-text/25 bg-surface focus-within:border-accent transition-colors">
            <input
              type="text"
              name="q"
              defaultValue={filters.q ?? ''}
              placeholder="Search free technical resources..."
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
      </div>

      <div className="border-t border-text/25" />

      <div className="px-6 py-6 space-y-4">
        <FilterRow
          label="Section"
          options={sections}
          current={filters.section}
          param="section"
          filters={filters}
        />
        <FilterRow
          label="Stack"
          options={stacks}
          current={filters.stack}
          param="stack"
          filters={filters}
        />
        <FilterRow
          label="Type"
          options={types}
          current={filters.type}
          param="type"
          filters={filters}
        />
        <FilterRow
          label="Difficulty"
          options={difficulties}
          current={filters.difficulty}
          param="difficulty"
          filters={filters}
        />
      </div>

      <div className="border-t border-text/25" />

      <div className="px-6 py-8">
        <div className="flex items-baseline justify-between mb-6">
          <div className="text-[13px] font-mono text-muted">
            {total} {total === 1 ? 'result' : 'results'}
            {totalPages > 1 && (
              <span className="ml-2">
                · page {page} of {totalPages}
              </span>
            )}
          </div>
          {(filters.q ||
            filters.section ||
            filters.stack ||
            filters.type ||
            filters.difficulty) && (
              <Link
                href="/browse"
                className="link-mono inline-flex items-center gap-1 text-[13px]"
              >
                Clear filters
                <X className="w-3.5 h-3.5" />
              </Link>
            )}
        </div>

        {resources.length === 0 ? (
          <div className="border border-text/25 p-12 text-center">
            <div className="text-muted mb-2">No results.</div>
            <div className="text-[13px] text-muted">
              Try a different search or remove filters.
            </div>
          </div>
        ) : (
          <>
            <div className="border-t border-text/25">
              {resources.map((r) => (
                <Link
                  key={r.id}
                  href={`/resource/${r.id}`}
                  className="block py-5 border-b border-text/25 hover:bg-surface transition-colors"
                  style={{
                    contentVisibility: 'auto',
                    containIntrinsicSize: '0 96px',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2 md:gap-6">
                    <div className="min-w-0">
                      <div className="font-medium mb-1">{r.name}</div>
                      <div className="text-[13px] text-muted line-clamp-1 mb-2">
                        {r.description}
                      </div>
                      <div className="text-[11px] font-mono text-muted">
                        <Meta
                          items={[
                            r.technologies?.slice(0, 4).join(', '),
                            r.difficulty,
                          ]}
                        />
                      </div>
                    </div>
                    <div className="text-[12px] font-mono text-muted md:text-right shrink-0">
                      <Meta items={[r.resource_type, r.stack]} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                page={page}
                totalPages={totalPages}
                filters={filters}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

function Pagination({
  page,
  totalPages,
  filters,
}: {
  page: number
  totalPages: number
  filters: BrowseFilters
}) {
  const buildHref = (p: number) => {
    const params = new URLSearchParams()
    if (filters.q) params.set('q', filters.q)
    if (filters.section) params.set('section', filters.section)
    if (filters.stack) params.set('stack', filters.stack)
    if (filters.type) params.set('type', filters.type)
    if (filters.difficulty) params.set('difficulty', filters.difficulty)
    if (p > 1) params.set('page', String(p))
    const qs = params.toString()
    return qs ? `/browse?${qs}` : '/browse'
  }

  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <div className="flex items-center justify-between mt-8 pt-4 border-t border-text/25">
      {hasPrev ? (
        <Link
          href={buildHref(page - 1)}
          className="link-mono group inline-flex items-center gap-1.5 text-[13px]"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          Previous
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[13px] font-mono text-text/25">
          <ArrowLeft className="w-3.5 h-3.5" />
          Previous
        </span>
      )}

      <div className="text-[12px] font-mono text-muted">
        Page {page} / {totalPages}
      </div>

      {hasNext ? (
        <Link
          href={buildHref(page + 1)}
          className="link-mono group inline-flex items-center gap-1.5 text-[13px]"
        >
          Next
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-[13px] font-mono text-text/25">
          Next
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      )}
    </div>
  )
}

function FilterRow({
  label,
  options,
  current,
  param,
  filters,
}: {
  label: string
  options: string[]
  current?: string
  param: string
  filters: BrowseFilters
}) {
  const buildHref = (value?: string) => {
    const params = new URLSearchParams()
    if (filters.q) params.set('q', filters.q)
    for (const key of ['section', 'stack', 'type', 'difficulty'] as const) {
      if (key === param) {
        if (value) params.set(key, value)
      } else if (filters[key]) {
        params.set(key, filters[key] as string)
      }
    }
    const qs = params.toString()
    return qs ? `/browse?${qs}` : '/browse'
  }

  const base =
    'px-2.5 py-1 border text-[12px] font-mono transition-colors inline-block'
  const inactive =
    'border-text/25 text-muted hover:border-accent hover:text-accent'

  return (
    <div className="flex items-start gap-4 text-[13px]">
      <div className="w-20 shrink-0 text-[11px] font-mono uppercase tracking-widest text-muted pt-1">
        {label}
      </div>
      <div className="flex flex-wrap gap-1">
        <Link
          href={buildHref(undefined)}
          className={`${base} ${!current ? '' : inactive}`}
          style={
            !current
              ? {
                backgroundColor: '#18181B',
                color: '#FAFAF9',
                borderColor: '#18181B',
              }
              : undefined
          }
        >
          All
        </Link>
        {options.map((opt) => {
          const isActive = current === opt
          return (
            <Link
              key={opt}
              href={buildHref(opt)}
              className={`${base} ${isActive ? '' : inactive}`}
              style={
                isActive
                  ? {
                    backgroundColor: '#18181B',
                    color: '#FAFAF9',
                    borderColor: '#18181B',
                  }
                  : undefined
              }
            >
              {opt}
            </Link>
          )
        })}
      </div>
    </div>
  )
}