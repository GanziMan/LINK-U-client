import { test, expect } from '@playwright/test'

test('hompage has titlle', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Next.js/)
})

test('homepage has Welcome to Next.js!', async ({ page }) => {
  await page.goto('/')
  const heading = await page.locator('h1')
  await expect(heading).toHaveText('Welcome to Next.js!')
})
