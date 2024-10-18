/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://invitation-bumsukims-projects.vercel.app', // 여기에 실제 사이트 URL을 넣으세요.
  generateRobotsTxt: true, // robots.txt 파일을 생성합니다.
  changefreq: 'weekly',
  priority: 0.7,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  //   exclude: ['/secret-page'], // 사이트맵에서 제외할 페이지 경로를 지정합니다.
  // 추가 옵션들을 여기에 설정할 수 있습니다.
}
