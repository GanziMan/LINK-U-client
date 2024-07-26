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

  // 페이지 배경음악 재생 테스트
  test('background music button test', async ({ page, browserName }) => {
    const backgroundMusicButton = page.locator(
      'button:has-text("배경음악을 눌러주세요.")'
    )

    if (browserName === 'webkit') {
      await backgroundMusicButton.click()
    } else if (browserName === 'firefox') {
      await page.evaluate(() => {
        const audio = new Audio('/music/wedding-bgm.mp3')
        audio.play()
      })
    } else if (browserName === 'chromium') {
      await page.evaluate(() => {
        const audio = new Audio('/music/wedding-bgm.mp3')
        audio.play()
      })
    }
  })

  // 페이지 좋아요 수 테스트
  test('like count button test', async ({ page }) => {
    const beforeLikeCount = await page.locator('#like-count').innerText()

    await page.click('#heart-box')

    const afterLikeCount = await page.locator('#like-count').innerText()

    expect(Number(afterLikeCount) === Number(beforeLikeCount + 1))
  })
})
