// app/not-found.tsx — 404 page

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-300 px-6 py-32 text-center">
      <div className="text-muted mb-4 font-mono text-[100px] tracking-widest uppercase">
        404
      </div>
      <h1 className="mb-4 text-3xl font-medium tracking-tight md:text-4xl">
        Not found.
      </h1>
      <p className="text-muted mb-8">
        Ooops the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="group text-muted hover:text-text inline-flex items-center gap-1.5 font-mono text-[13px] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
        Back home
      </Link>
    </div>
  )
}
