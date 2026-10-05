// app/resource/[id]/page.tsx — Resource detail

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink, Check } from 'lucide-react'
import { getResourceById, getRelatedResources } from '@/lib/resources'
import { DifficultyLabel } from '@/components/Meta'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params
  const resource = await getResourceById(parseInt(id, 10))
  if (!resource) return { title: 'Not found — Corpus Stack' }
  return {
    title: `${resource.name} — Corpus Stack`,
    description: resource.description,
    openGraph: {
      title: resource.name,
      description: resource.description,
      url: `/resource/${resource.id}`,
    },
  }
}

function MetaList({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-text/15 grid grid-cols-[140px_1fr] gap-4 border-b py-3 last:border-0">
      <div className="text-muted pt-0.5 font-mono text-[11px] tracking-widest uppercase">
        {label}
      </div>
      <div className="text-[14px]">{value}</div>
    </div>
  )
}

export default async function ResourcePage({ params }: { params: Params }) {
  const { id } = await params
  const resourceId = parseInt(id, 10)
  if (isNaN(resourceId)) notFound()

  const resource = await getResourceById(resourceId)
  if (!resource) notFound()

  const related = await getRelatedResources(resource, 4)

  return (
    <div>
      <div className="px-6 py-6">
        <Link
          href="/browse"
          className="link-mono group inline-flex items-center gap-1.5 text-[13px]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Browse
        </Link>
      </div>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-12">
        <div className="text-muted mb-3 font-mono text-[11px] tracking-widest uppercase">
          {resource.section} · {resource.stack}
        </div>
        <h1 className="mb-6 max-w-3xl text-3xl font-medium tracking-tight md:text-5xl">
          {resource.name}
        </h1>
        <p className="text-muted mb-8 max-w-3xl text-base leading-relaxed md:text-lg">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-2">
          <a
            href={resource.resource_url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[13px]"
          >
            Visit resource
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          {resource.github_url && (
            <a
              href={resource.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[13px]"
            >
              GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-12">
        <h2 className="text-muted mb-6 font-mono text-[11px] tracking-widest uppercase">
          Details
        </h2>

        <div>
          <MetaList label="Section" value={resource.section} />
          <MetaList label="Stack" value={resource.stack} />
          <MetaList label="Type" value={resource.resource_type} />
          {resource.difficulty && (
            <MetaList
              label="Difficulty"
              value={<DifficultyLabel value={resource.difficulty} />}
            />
          )}
          {resource.technologies && resource.technologies.length > 0 && (
            <MetaList
              label="Technologies"
              value={resource.technologies.join(', ')}
            />
          )}
          {resource.frameworks && resource.frameworks.length > 0 && (
            <MetaList
              label="Frameworks"
              value={resource.frameworks.join(', ')}
            />
          )}
          {resource.tools && resource.tools.length > 0 && (
            <MetaList label="Tools" value={resource.tools.join(', ')} />
          )}
          {resource.maintainer && (
            <MetaList label="Maintainer" value={resource.maintainer} />
          )}
          {resource.access_model && (
            <MetaList label="Access" value={resource.access_model} />
          )}
          {resource.openness_license && (
            <MetaList label="License" value={resource.openness_license} />
          )}
          <MetaList label="Official" value={resource.official ? 'Yes' : 'No'} />
          <MetaList
            label="Verified"
            value={
              resource.verified ? (
                <span className="inline-flex items-center gap-1.5">
                  <Check className="text-success h-3.5 w-3.5" />
                  {resource.last_verified ?? 'Yes'}
                </span>
              ) : (
                'Pending'
              )
            }
          />
        </div>
      </section>

      {related.length > 0 && (
        <>
          <div className="border-text/25 border-t" />
          <section className="px-6 py-12">
            <h2 className="text-muted mb-6 font-mono text-[11px] tracking-widest uppercase">
              Related in {resource.stack}
            </h2>

            <div className="border-text/25 border-t">
              {related.map((r) => (
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
                    {r.resource_type}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
