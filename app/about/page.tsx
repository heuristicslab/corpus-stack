import Link from 'next/link'
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
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[11px] font-mono uppercase tracking-widest text-muted mb-4">
            About
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">
            A curated map of free technical education.
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-xl mx-auto">
            Corpus Stack is an open archive of the world&apos;s best free
            technical resources. Every entry is verified against three
            non-negotiable criteria before it earns a place.
          </p>
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <figure className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl md:text-4xl font-medium tracking-tight leading-tight mb-6">
            &ldquo;Access to knowledge is a right, not a privilege.&rdquo;
          </blockquote>
          <figcaption className="text-[12px] font-mono uppercase tracking-widest text-muted">
            — Aaron Swartz
          </figcaption>
        </figure>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6 text-center">
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
                i < arr.length - 1 ? 'border-b border-text/15' : ''
              }`}
            >
              <div className="text-[13px] font-mono text-muted pt-0.5">
                {t.n}
              </div>
              <div>
                <div className="font-medium mb-2">{t.title}</div>
                <div className="text-[14px] text-muted leading-relaxed">
                  {t.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6 text-center">
            Why it exists
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              The internet is saturated with resource lists. Most are static,
              eventually fill with broken links, and offer no editorial
              judgment about what is actually worth your time.
            </p>
            <p>
              Corpus Stack eliminates curation fatigue. Every resource is
              manually reviewed. Every link is checked. Descriptions are
              written to help you decide, not to market.
            </p>
            <p>
              This is a living archive, not a directory. Resources are added
              monthly, verified regularly, and removed when they no longer
              meet the standard.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-muted mb-6 text-center">
            How resources are added
          </h2>
          <div className="space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              The archive is open-source and community-driven. Anyone can
              suggest a resource. Every suggestion goes through the three
              tenets before it appears.
            </p>
            <p>
              If you know a free resource that belongs here, submit it. If
              you find a broken link or something that no longer qualifies,
              report it. That&apos;s how the archive stays honest.
            </p>
          </div>
          <div className="mt-8 text-center">
            <a
              href="https://github.com/njokinjeri/personal-toolbox"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-mono"
            >
              Submit on GitHub
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      <div className="border-t border-text/25" />

      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[14px] text-muted tracking-tight">
            For anyone curious enough to learn.
          </p>
        </div>
      </section>
    </div>
  )
}