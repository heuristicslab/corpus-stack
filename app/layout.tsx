// app/layout.tsx — Root layout

import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://corpus-stack.vercel.app'),
  title: {
    default: 'Corpus Stack',
    template: '%s',
  },
  description:
    'A curated map of the internet for developers. 200+ verified free resources covering web development, computer science, AI, cloud, and cybersecurity.',
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Corpus Stack' }],
  openGraph: {
    title: 'Corpus Stack',
    description:
      'A curated map of the internet for developers. 200+ verified free resources.',
    url: 'https://corpus-stack.vercel.app',
    siteName: 'Corpus Stack',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Corpus Stack',
    description:
      'A curated map of the internet for developers. 200+ verified free resources.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <Header />

        <div className="flex flex-1 flex-col">
          <div className="relative mx-auto flex w-full max-w-300 flex-1 flex-col">
            <div
              className="bg-text/25 pointer-events-none absolute top-0 bottom-0 left-0 w-px"
              aria-hidden="true"
            />
            <div
              className="bg-text/25 pointer-events-none absolute top-0 right-0 bottom-0 w-px"
              aria-hidden="true"
            />

            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
