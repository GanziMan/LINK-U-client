// app/page.tsx
import { Metadata } from 'next'
import InvitationComponent from './components/invitation'
import { getCount } from '@/actions/invitation/getCount'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '링쿠',
    description: '여자친구와 기념을 위해 만든 모바일 청첩장 링쿠입니다.',
  }
}
export default async function Page() {
  const likeCount = await getCount({ id: '1' }).then(
    (res) => res?.data?.like_count
  )

  return <InvitationComponent likeCount={likeCount || 0} />
}
