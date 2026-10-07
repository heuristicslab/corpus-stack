// lib/resources.ts — Supabase data queries

import { supabase } from './supabase'

export type Resource = {
  id: number
  name: string
  description: string
  resource_url: string
  section: string
  stack: string
  technologies: string[] | null
  frameworks: string[] | null
  tools: string[] | null
  resource_type: string
  difficulty: string | null
  github_url: string | null
  maintainer: string | null
  access_model: string | null
  openness_license: string | null
  official: boolean
  verified: boolean
  last_verified: string | null
}

export async function getTotalCount(): Promise<number> {
  const { count } = await supabase
    .from('resources')
    .select('*', { count: 'exact', head: true })
  return count ?? 0
}

export async function getSectionCounts(): Promise<
  { section: string; count: number }[]
> {
  const { data } = await supabase.from('resources').select('section')
  if (!data) return []

  const counts = new Map<string, number>()
  for (const row of data) {
    counts.set(row.section, (counts.get(row.section) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([section, count]) => ({ section, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getStackCounts(): Promise<
  { stack: string; count: number }[]
> {
  const { data } = await supabase.from('resources').select('stack')
  if (!data) return []

  const counts = new Map<string, number>()
  for (const row of data) {
    counts.set(row.stack, (counts.get(row.stack) ?? 0) + 1)
  }

  return Array.from(counts.entries())
    .map(([stack, count]) => ({ stack, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getRecentResources(limit = 5): Promise<Resource[]> {
  const { data } = await supabase
    .from('resources')
    .select('*')
    .order('id', { ascending: false })
    .limit(limit)
  return (data as Resource[]) ?? []
}

export async function getMonthlyHighlights(
  stack: string,
  limit = 4,
): Promise<Resource[]> {
  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('stack', stack)
    .limit(limit)
  return (data as Resource[]) ?? []
}

export type BrowseFilters = {
  q?: string
  section?: string
  stack?: string
  type?: string
  difficulty?: string
}

export const PAGE_SIZE = 50

export type BrowseResult = {
  resources: Resource[]
  total: number
  page: number
  totalPages: number
}

export async function browseResources(
  filters: BrowseFilters,
  page = 1,
): Promise<BrowseResult> {
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1

  let query = supabase
    .from('resources')
    .select('*', { count: 'exact' })
    .order('name', { ascending: true })
    .range(from, to)

  if (filters.q) {
    const term = `%${filters.q}%`
    query = query.or(`name.ilike.${term},description.ilike.${term}`)
  }
  if (filters.section) query = query.eq('section', filters.section)
  if (filters.stack) query = query.eq('stack', filters.stack)
  if (filters.type) query = query.eq('resource_type', filters.type)
  if (filters.difficulty)
    query = query.ilike('difficulty', `${filters.difficulty}%`)

  const { data, count } = await query

  const total = count ?? 0
  return {
    resources: (data as Resource[]) ?? [],
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  }
}

export async function getAllSections(): Promise<string[]> {
  const { data } = await supabase.from('resources').select('section')
  if (!data) return []
  return Array.from(new Set(data.map((r) => r.section))).sort()
}

export async function getAllStacks(): Promise<string[]> {
  const { data } = await supabase.from('resources').select('stack')
  if (!data) return []
  return Array.from(new Set(data.map((r) => r.stack))).sort()
}

export async function getAllTypes(): Promise<string[]> {
  const { data } = await supabase.from('resources').select('resource_type')
  if (!data) return []
  return Array.from(new Set(data.map((r) => r.resource_type))).sort()
}

export async function getResourceById(id: number): Promise<Resource | null> {
  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single()
  return (data as Resource) ?? null
}

export async function getRelatedResources(
  resource: Resource,
  limit = 4,
): Promise<Resource[]> {
  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('stack', resource.stack)
    .neq('id', resource.id)
    .limit(limit)
  return (data as Resource[]) ?? []
}
