import { describe, it, expect } from 'vitest'
import { getCurrentTheme } from '@/lib/theme'

describe('getCurrentTheme', () => {
  it('returns a theme object', () => {
    const theme = getCurrentTheme()
    expect(theme).toHaveProperty('label')
    expect(theme).toHaveProperty('stack')
    expect(theme).toHaveProperty('link')
  })

  it('returns AI & ML for October 2026 (anchor)', () => {
    const theme = getCurrentTheme(new Date('2026-10-15'))
    expect(theme.label).toBe('AI & Machine Learning')
  })

  it('returns Cybersecurity for November 2026', () => {
    const theme = getCurrentTheme(new Date('2026-11-15'))
    expect(theme.label).toBe('Cybersecurity')
  })

  it('wraps around after 6 months', () => {
    const theme = getCurrentTheme(new Date('2027-04-15'))
    expect(theme.label).toBe('AI & Machine Learning')
  })
})
