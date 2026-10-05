import { describe, it, expect } from 'vitest'
import {
  getTotalCount,
  getSectionCounts,
  getStackCounts,
  browseResources,
  getResourceById,
  getRelatedResources,
} from '@/lib/resources'

describe('resources — data integrity', () => {
  it('returns exactly 202 resources', async () => {
    const total = await getTotalCount()
    expect(total).toBe(202)
  })

  it('every section count is greater than zero', async () => {
    const sections = await getSectionCounts()
    expect(sections.length).toBeGreaterThan(0)
    for (const s of sections) {
      expect(s.count).toBeGreaterThan(0)
    }
  })

  it('every stack count is greater than zero', async () => {
    const stacks = await getStackCounts()
    expect(stacks.length).toBeGreaterThan(0)
    for (const s of stacks) {
      expect(s.count).toBeGreaterThan(0)
    }
  })

  it('fetches resource by id', async () => {
    const resource = await getResourceById(2)
    expect(resource).not.toBeNull()
    expect(resource?.name).toBe('CS50X')
  })

  it('returns null for a non-existent id', async () => {
    const resource = await getResourceById(99999)
    expect(resource).toBeNull()
  })

  it('every resource has required fields', async () => {
    const { resources } = await browseResources({}, 1)
    for (const r of resources) {
      expect(r.id).toBeGreaterThan(0)
      expect(r.name).toBeTruthy()
      expect(r.resource_url).toMatch(/^https?:\/\//)
      expect(r.section).toBeTruthy()
      expect(r.stack).toBeTruthy()
      expect(r.resource_type).toBeTruthy()
    }
  })

  it('filters by section', async () => {
    const { resources } = await browseResources({ section: 'AI' }, 1)
    expect(resources.length).toBeGreaterThan(0)
    for (const r of resources) {
      expect(r.section).toBe('AI')
    }
  })

  it('difficulty filter uses prefix matching', async () => {
    const { resources } = await browseResources({ difficulty: 'Beginner' }, 1)
    expect(resources.length).toBeGreaterThan(0)
    for (const r of resources) {
      expect(r.difficulty).toMatch(/^Beginner/)
    }
  })

  it('search matches resource name', async () => {
    const { resources } = await browseResources({ q: 'rust' }, 1)
    expect(resources.length).toBeGreaterThan(0)
    for (const r of resources) {
      const match =
        r.name.toLowerCase().includes('rust') ||
        r.description.toLowerCase().includes('rust')
      expect(match).toBe(true)
    }
  })

  it('related resources share the same stack', async () => {
    const resource = await getResourceById(2)
    expect(resource).not.toBeNull()
    if (!resource) return
    const related = await getRelatedResources(resource, 4)
    for (const r of related) {
      expect(r.stack).toBe(resource.stack)
      expect(r.id).not.toBe(resource.id)
    }
  })

  it('pagination returns 50 per page', async () => {
    const { resources, totalPages } = await browseResources({}, 1)
    expect(resources.length).toBe(50)
    expect(totalPages).toBeGreaterThan(1)
  })

  it('last page returns remaining resources', async () => {
    const { totalPages } = await browseResources({}, 1)
    const { resources } = await browseResources({}, totalPages)
    expect(resources.length).toBe(2)
  })
})
