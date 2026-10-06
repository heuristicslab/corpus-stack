// app/sitemap.ts — Auto-generated sitemap

import type { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://corpus-stack.vercel.app'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/browse`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/changelog`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const { data } = await supabase.from('resources').select('id, updated_at')
  const resourcePages: MetadataRoute.Sitemap =
    data?.map((r) => ({
      url: `${baseUrl}/resource/${r.id}`,
      lastModified: r.updated_at ? new Date(r.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })) ?? []

  return [...staticPages, ...resourcePages]
}