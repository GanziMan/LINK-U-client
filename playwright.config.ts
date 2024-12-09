import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },

  use: {
    baseURL: 'http://localhost:3000',
    headless: true, // headless 모드로 실행
    screenshot: 'only-on-failure', // 실패 시 스크린샷 저장
    video: 'retain-on-failure', // 실패 시 비디오 저장
    trace: 'on-first-retry', // 첫 번째 실패 시 trace 저장
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
})
