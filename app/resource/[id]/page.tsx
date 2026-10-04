import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
    ArrowLeft,
    ArrowRight,
    ExternalLink,
    Check,
} from 'lucide-react'
import {
    getResourceById,
    getRelatedResources,
    type Resource,
} from '@/lib/resources'

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

function DifficultyLabel({ value }: { value: string }) {
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

function MetaList({
    label,
    value,
}: {
    label: string
    value: React.ReactNode
}) {
    return (
        <div className="grid grid-cols-[140px_1fr] gap-4 py-3 border-b border-text/15 last:border-0">
            <div className="text-[11px] font-mono uppercase tracking-widest text-muted pt-0.5">
                {label}
            </div>
            <div className="text-[14px]">{value}</div>
        </div>
    )
}

export default async function ResourcePage({
    params,
}: {
    params: Params
}) {
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
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                    Browse
                </Link>
            </div>

            <div className="border-t border-text/25" />

            <section className="px-6 py-12">
                <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-3">
                    {resource.section} · {resource.stack}
                </div>
                <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 max-w-3xl">
                    {resource.name}
                </h1>
                <p className="text-base md:text-lg text-muted max-w-3xl leading-relaxed mb-8">
                    {resource.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    <a
                        href={resource.resource_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-mono"
                    >
                        Visit resource
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    {resource.github_url && (
                        <a
                            href={resource.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-mono"
                        >
                            GitHub
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    )}
                </div>
            </section>

            <div className="border-t border-text/25" />

            <section className="px-6 py-12">
                <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6">
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
                    <MetaList
                        label="Official"
                        value={resource.official ? 'Yes' : 'No'}
                    />
                    <MetaList
                        label="Verified"
                        value={
                            resource.verified ? (
                                <span className="inline-flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-success" />
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
                    <div className="border-t border-text/25" />
                    <section className="px-6 py-12">
                        <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6">
                            Related in {resource.stack}
                        </h2>

                        <div className="border-t border-text/25">
                            {related.map((r) => (
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