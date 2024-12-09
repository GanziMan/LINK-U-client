// app/page.tsx
import { Metadata } from 'next'
import InvitationComponent from './components/invitation'
import { getCount } from '@/actions/invitation/getCount'

export const metadata: Metadata = {
  title: {
    template: '%s - 모바일 커플 청첩장',
    default: 'LINK-U',
  },

  verification: {
    google: 'Zl29et0mZnPrc2Zjwn8RJ3vjPez_FzrfQmrle9GuAbM',
    other: {
      'naver-site-verification': '5576aaadf8cd2fc333025e72c60e487ccc16869f',
    },
  },
  applicationName: 'LINK-U',
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
  description: '여자친구와 기념을 위해 만든 모바일 청첩장 사이트입니다.',
  keywords: ['청첩장', '모바일 청첩장', '연인 청첩장', '커플 청첩장'],
  openGraph: {
    title: '모바일 커플 청첩장',
    description: '여자친구와 기념을 위해 만든 모바일 청첩장 사이트입니다.',
    url: 'https://link-u.shop',
    type: 'website',
  },
}
export default async function Page() {
  const likeCount = await getCount({ id: '1' }).then(
    (res) => res?.data?.like_count
  )

  return <InvitationComponent likeCount={likeCount || 0} />
}
