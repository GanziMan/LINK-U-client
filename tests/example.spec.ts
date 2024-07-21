import { test, expect } from '@playwright/test'

test.describe('Wedding Invitation Page', () => {
  // 테스트 전에 페이지를 로드
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // 페이지 타이틀이 올바른지 확인합니다.
  test('page title text', async ({ page }) => {
    await expect(page).toHaveTitle('모바일 청첩장')
  })

  test('background music button test', async ({ page, browserName }) => {
    const backgroundMusicButton = page.locator(
      'button:has-text("배경음악을 눌러주세요.")'
    )

    if (browserName !== 'firefox') {
      await backgroundMusicButton.click()
    } else {
      await page.evaluate(() => {
        const audio = new Audio('/music/wedding-bgm.mp3')
        audio.play()
      })
    }
  })
})
