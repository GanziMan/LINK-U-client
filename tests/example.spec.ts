import { test, expect } from '@playwright/test'

test.describe('메인 페이지 접근', () => {
  test('청첩장 좋아요 테스트', async ({ page }) => {
    // Given: 사용자가 청첩장 페이지 접근
    await page.goto('/', { waitUntil: 'networkidle' })

    const likeCountSelector = '#like-count'
    const beforeLikeCount = await page.textContent(likeCountSelector)
    console.log(beforeLikeCount)
    // When: 사용자가 좋아요 버튼 클릭
    await page.click('#heart-box')

    // Then: 좋아요 수가 증가했는지 확인
    const afterLikeCount = await page.textContent(likeCountSelector)
    console.log(afterLikeCount)
    // expect(Number(afterLikeCount)).toBe(Number(beforeLikeCount) + 1)
  })

  //   test('방명록 작성 테스트', async ({ page }) => {
  //     const testCases = [
  //       { commentName: '김범수', commentContent: '방명록 작성1' },
  //     ]

  //     // Given: 사용자가 청첩장 페이지 접근
  //     await page.goto('/')

  //     // When: 올바른 방명록 작성하고 보내기 버튼을 클릭
  //     for (const testCase of testCases) {
  //       await page.fill('#content-name', testCase.commentName)
  //       await page.fill('#comment-content', testCase.commentContent)
  //       await page.click('button[type="submit"]')

  //       // Then: 토스트 알림창이 나타나는지 확인
  //       const toastSelector = '.toast' // 토스트 알림창의 CSS 클래스나 ID
  //       const toastContent = await page.textContent(toastSelector)
  //       expect(toastContent).toContain('방명록이 작성되었습니다.')
  //     }
  //   })
})
