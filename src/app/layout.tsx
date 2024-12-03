import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import ClientProvider from './providers/queryClientProvider'
import { RootLayoutProps } from './schema/mainPageSchea'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s - 모바일 커플 청첩장',
    default: 'Mobile Invitation',
  },
  description: '여자친구와 기념을 위해 만든 모바일 청첩장 사이트입니다.',
  verification: {
    google: 'Zl29et0mZnPrc2Zjwn8RJ3vjPez_FzrfQmrle9GuAbM',
    other: {
      'naver-site-verification': '5576aaadf8cd2fc333025e72c60e487ccc16869f',
    },
  },
  applicationName: 'Next.js',
  creator: 'dev Bum',
  publisher: 'dev Bum',
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  keywords: ['청첩장', '모바일 청첩장', '연인 청첩장', '커플 청첩장'],
  openGraph: {
    title: '모바일 커플 청첩장',
    description: '여자친구와 기념을 위해 만든 모바일 청첩장 사이트입니다.',
    url: 'https://invitation-bumsukims-projects.vercel.app',
    type: 'website',
  },
}

declare global {
  interface Window {
    Kakao: any
  }
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* favicon */}
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* sdk */}
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
            .NEXT_PUBLIC_KAKAO_API_KEY!}&autoload=false`}
        />

        <Script
          type="text/javascript"
          strategy="afterInteractive"
          src={`https://developers.kakao.com/sdk/js/kakao.min.js`}
        />
      </head>
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
