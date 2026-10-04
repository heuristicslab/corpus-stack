import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Inter } from 'next/font/google'
import { Header } from '@/app/components/Header'
import { Footer } from '@/app/components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Corpus Stack',
  description: 'A curated archive of free technical education.',
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
      <body className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 flex flex-col">
          <div className="max-w-300 mx-auto w-full relative flex-1 flex flex-col">
            <div
              className="absolute left-0 top-0 bottom-0 w-px bg-text/25 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-px bg-text/25 pointer-events-none"
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