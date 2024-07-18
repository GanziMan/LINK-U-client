import { test, expect } from '@playwright/test'

test.describe('Wedding Invitation Page', () => {
  // 테스트 전에 페이지를 로드
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // 페이지 타이틀이 올바른지 확인합니다.
  test('should have correct title', async ({ page }) => {
    await expect(page).toHaveTitle('모바일 청첩장')
  })

  // // 페이지 헤더가 올바르게 표시되는지 확인
  // test('should display wedding invitation header', async ({ page }) => {
  //   const header = page.locator('h1')
  //   await expect(header).toContainText('Wedding Invitation')
  // })

  // test('should display the like count and increment on click', async ({
  //   page,
  // }) => {
  //   const likeButton = page.locator('button:has-text("Like")')
  //   const initialLikeCount = await page.locator('text=Like Count').textContent()

  //   // 좋아요 버튼 클릭
  //   await likeButton.click()

  //   // 좋아요 수가 증가했는지 확인
  //   const newLikeCount = await page.locator('text=Like Count').textContent()
  //   expect(parseInt(newLikeCount!)).toBe(parseInt(initialLikeCount!) + 1)
  // })
})
