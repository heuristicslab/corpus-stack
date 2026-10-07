// lib/theme.ts — Monthly theme rotation

export type MonthlyTheme = {
  label: string
  stack: string
  link: string
}

// The cycle. Order matters — the site walks through these in sequence.
// Add or remove entries freely; the rotation adjusts automatically.
const THEME_CYCLE: MonthlyTheme[] = [
  {
    label: 'AI & Machine Learning',
    stack: 'AI & Machine Learning',
    link: '/browse?stack=AI%20%26%20Machine%20Learning',
  },
  {
    label: 'Cybersecurity',
    stack: 'Cybersecurity',
    link: '/browse?stack=Cybersecurity',
  },
  {
    label: 'Web Development',
    stack: 'Web Development',
    link: '/browse?stack=Web%20Development',
  },
  {
    label: 'Design & Creative Technology',
    stack: 'Design & Creative Technology',
    link: '/browse?stack=Design%20%26%20Creative%20Technology',
  },
  {
    label: 'Cloud & DevOps',
    stack: 'Cloud & DevOps',
    link: '/browse?stack=Cloud%20%26%20DevOps',
  },
  {
    label: 'Computer Science',
    stack: 'Computer Science',
    link: '/browse?stack=Computer%20Science',
  },
]

// Anchor: which month + year = index 0 of the cycle.
// Change this if you want to shift which theme shows when.
const ANCHOR_YEAR = 2026
const ANCHOR_MONTH = 9 // October (0-indexed)

// Get the theme for a given date. Defaults to now.
export function getCurrentTheme(date: Date = new Date()): MonthlyTheme {
  const year = date.getFullYear()
  const month = date.getMonth()

  // Total months since the anchor
  const monthsSinceAnchor = (year - ANCHOR_YEAR) * 12 + (month - ANCHOR_MONTH)

  // Modulo to get the position in the cycle
  // (using a positive modulo to handle dates before the anchor)
  const index =
    ((monthsSinceAnchor % THEME_CYCLE.length) + THEME_CYCLE.length) %
    THEME_CYCLE.length

  return THEME_CYCLE[index]
}
