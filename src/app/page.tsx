// app/page.tsx
import { Metadata } from 'next'
import InvitationComponent from './components/invitation'

export const metadata: Metadata = {
  title: {
    template: '%s - 모바일 청첩장',
    default: 'Mobile Invitation',
  },
  applicationName: 'Next.js',
  creator: 'dev Bum',
  publisher: 'dev Bum',
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  description: '여자친구와 기념을 위해 만든 모바일 청첩장 사이트입니다.',
  keywords: ['청첩장', '모바일 청첩장', '연인 청첩장'],
  openGraph: {
    title: '모바일 청첩장',
    description: '여자친구와 기념을 위해 만든 모바일 청첩장 사이트입니다.',
    url: 'https://invitation-bumsukims-projects.vercel.app',
    type: 'website',
  },
}

export default function Page() {
  return <InvitationComponent />
}
