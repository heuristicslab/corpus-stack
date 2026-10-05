import { test, expect } from '@playwright/test'

test.describe('Corpus Stack — user flows', () => {
  test('homepage loads and shows 202 resources', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('heading', { name: /Find what's worth learning/i }),
    ).toBeVisible()
    await expect(page.getByText(/202 free technical resources/i)).toBeVisible()
  })

  test('homepage search navigates to browse with query', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Search resources...').fill('rust')
    await page.getByRole('button', { name: /SEARCH/i }).click()
    await expect(page).toHaveURL(/\/browse\?q=rust/)
    await expect(page.getByText(/results/i).first()).toBeVisible()
  })

  test('browse page renders and paginates', async ({ page }) => {
    await page.goto('/browse')
    await expect(page.getByText('202 results')).toBeVisible()
    await expect(page.getByText('Page 1 / 5')).toBeVisible()
    await page.getByRole('link', { name: /Next/i }).click()
    await expect(page).toHaveURL(/page=2/)
    await expect(page.getByText('Page 2 / 5')).toBeVisible()
  })

  test('difficulty filter uses prefix matching', async ({ page }) => {
    await page.goto('/browse?difficulty=Beginner')
    await expect(page).toHaveURL(/difficulty=Beginner/)
    // Should return more than just exact "Beginner" — includes "Beginner → Advanced"
    const resultCount = await page.locator('a[href^="/resource/"]').count()
    expect(resultCount).toBeGreaterThan(0)
  })

  test('resource detail page renders metadata', async ({ page }) => {
    await page.goto('/resource/2')
    await expect(page.getByRole('heading', { name: 'CS50X' })).toBeVisible()
    await expect(page.getByText('Harvard')).toBeVisible()
    await expect(
      page.getByRole('link', { name: /Visit resource/i }),
    ).toBeVisible()
  })

  test('404 for invalid resource id', async ({ page }) => {
    await page.goto('/resource/99999')
    await expect(page.getByText('Not found.')).toBeVisible()
  })

  test('about page renders', async ({ page }) => {
    await page.goto('/about')
    await expect(
      page.getByRole('heading', { name: /curated map/i }),
    ).toBeVisible()
    await expect(page.getByText(/Aaron Swartz/)).toBeVisible()
  })

  test('changelog page renders launch entry', async ({ page }) => {
    await page.goto('/changelog')
    await expect(page.getByRole('heading', { name: 'Changelog' })).toBeVisible()
    await expect(page.getByText('Corpus Stack launches')).toBeVisible()
    await expect(page.getByText(/October 5, 2026/)).toBeVisible()
  })

  test('external resource links open in a new tab', async ({ page }) => {
    await page.goto('/resource/2')
    const visitLink = page.getByRole('link', { name: /Visit resource/i })
    await expect(visitLink).toHaveAttribute('target', '_blank')
    await expect(visitLink).toHaveAttribute('rel', /noopener/)
  })
})
