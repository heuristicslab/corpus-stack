import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-300 mx-auto px-6 py-32 text-center">
      <div className="text-[100px] font-mono uppercase tracking-widest text-muted mb-4">
        404
      </div>
      <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
        Not found.
      </h1>
      <p className="text-muted mb-8">
        Ooops the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-[13px] font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </div>
  )
}