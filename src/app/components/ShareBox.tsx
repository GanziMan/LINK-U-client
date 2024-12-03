import Image from 'next/image'
import { HeartBox, HeartCountBox, ShareBox, ShareButton } from '../styles'
import ShareKakao from '@/components/ShareKakao'
import { enqueueSnackbar } from 'notistack'

export default function LikeBox({
  likeCountMutation,
  likeCount,
}: {
  likeCountMutation: () => void
  likeCount: number
}) {
  const copyUrlToClipboard = async () => {
    try {
      if (typeof window !== 'undefined')
        await navigator.clipboard.writeText(window.location.href)
      enqueueSnackbar<'success'>('모바일 청첩장 URL이 복사되었습니다!', {
        variant: 'success',
      })
    } catch (err) {
      console.error('URL 복사 실패:', err)
      enqueueSnackbar<'error'>('URL 복사에 실패했습니다.', {
        variant: 'error',
      })
    }
  }
  return (
    <ShareBox>
      <HeartBox onClick={() => likeCountMutation()} id="heart-box">
        <HeartCountBox id="like-count">{likeCount}</HeartCountBox>
        <Image
          alt=""
          src={'/images/icons/heart-icon.svg'}
          style={{ cursor: 'pointer' }}
          width={100}
          height={100}
        />
      </HeartBox>
      <ShareKakao
        title=""
        imageUrl=""
        link={{
          webUrl: '',
          mobileWebUrl: '',
        }}
        likeCount={likeCount!}
      />
      <ShareButton background="#EEE" onClick={() => copyUrlToClipboard()}>
        청첩장 링크 복사
      </ShareButton>
    </ShareBox>
  )
}
