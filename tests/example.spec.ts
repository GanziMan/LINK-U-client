import { test, expect } from '@playwright/test'

test.describe('Wedding Invitation Page', () => {
  // 테스트 전에 페이지를 로드
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  // 페이지 타이틀이 올바른지 확인합니다.
  test('page title text', async ({ page }) => {
    await expect(page).toHaveTitle('Mobile Invitation')
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

  // 방명록 댓글 작성 테스트
  test('comment form test', async ({ page }) => {
    await page.fill('#name', '테스트 사용자')
    await page.fill('#comment', '이것은 테스트 댓글입니다.')
    await page.click('button[type="submit"]', { timeout: 3000 })
  })

  test('comment form reset test', async ({ page }) => {
    // reset 테스트
    const nameInputValue = await page.inputValue('#name')
    const commentInputValue = await page.inputValue('#comment')

    console.log('name:' + nameInputValue)
    console.log('comment:' + commentInputValue)
    expect(nameInputValue).toBe('')
    expect(commentInputValue).toBe('')
  })
})
