// app/about/page.tsx — About

import { ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About — Corpus Stack',
  description:
    'Corpus Stack is an open archive of the world’s best free technical education.',
}

export default function AboutPage() {
  return (
    <div>
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-muted mb-4 font-mono text-[11px] tracking-widest uppercase">
            About
          </div>
          <h1 className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">
            A curated map of free technical education.
          </h1>
          <p className="text-muted mx-auto max-w-xl text-lg leading-relaxed">
            Corpus Stack is an open archive of the world&apos;s best free
            technical resources. Every entry is verified against three
            non-negotiable criteria before it earns a place.
          </p>
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <figure className="mx-auto max-w-4xl text-center">
          <blockquote className="mb-6 text-2xl leading-tight font-medium tracking-tight md:text-4xl">
            &ldquo;Access to knowledge is a right, not a privilege.&rdquo;
          </blockquote>
          <figcaption className="text-muted font-mono text-[12px] tracking-widest uppercase">
            — Aaron Swartz
          </figcaption>
        </figure>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-muted mb-6 text-center font-mono text-[11px] tracking-widest uppercase">
            The three tenets
          </h2>

          {[
            {
              n: '01',
              title: 'Strictly free',
              body: 'No paywalls, no first-month-free trials, no hidden costs. If accessing the resource requires payment at any point, it does not belong here.',
            },
            {
              n: '02',
              title: 'Location-agnostic',
              body: 'Content must be accessible globally without regional restrictions or institution-only emails. Knowledge should not depend on where you were born or which school you attended.',
            },
            {
              n: '03',
              title: 'High utility',
              body: 'Actionable material: documentation hubs, MOOCs, interactive tutorials, sandboxes, verified references. No filler. No AI-generated noise.',
            },
          ].map((t, i, arr) => (
            <div
              key={t.n}
              className={`grid grid-cols-[60px_1fr] gap-6 py-6 ${
                i < arr.length - 1 ? 'border-text/15 border-b' : ''
              }`}
            >
              <div className="text-muted pt-0.5 font-mono text-[13px]">
                {t.n}
              </div>
              <div>
                <div className="mb-2 font-medium">{t.title}</div>
                <div className="text-muted text-[14px] leading-relaxed">
                  {t.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-muted mb-6 text-center font-mono text-[11px] tracking-widest uppercase">
            Why it exists
          </h2>
          <div className="text-muted space-y-4 text-[15px] leading-relaxed">
            <p>
              The internet is saturated with resource lists. Most are static,
              eventually fill with broken links, and offer no editorial judgment
              about what is actually worth your time.
            </p>
            <p>
              Corpus Stack eliminates curation fatigue. Every resource is
              manually reviewed. Every link is checked. Descriptions are written
              to help you decide, not to market.
            </p>
            <p>
              This is a living archive, not a directory. Resources are added
              monthly, verified regularly, and removed when they no longer meet
              the standard.
            </p>
          </div>
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-muted mb-6 text-center font-mono text-[11px] tracking-widest uppercase">
            How resources are added
          </h2>
          <div className="text-muted space-y-4 text-[15px] leading-relaxed">
            <p>
              The archive is open-source and community-driven. Anyone can
              suggest a resource. Every suggestion goes through the three tenets
              before it appears.
            </p>
            <p>
              If you know a free resource that belongs here, submit it. If you
              find a broken link or something that no longer qualifies, report
              it. That&apos;s how the archive stays honest.
            </p>
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/heuristicslab/corpus-stack"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 font-mono text-[13px]"
            >
              Submit on GitHub
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      <div className="border-text/25 border-t" />

      <section className="px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-muted text-[14px] tracking-tight">
            For anyone curious enough to learn.
          </p>
        </div>
      </section>
    </div>
  )
}
