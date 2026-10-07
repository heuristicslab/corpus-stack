// app/robots.ts — Auto-generated robots.txt

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://corpus-stack.vercel.app/sitemap.xml',
  }
}
