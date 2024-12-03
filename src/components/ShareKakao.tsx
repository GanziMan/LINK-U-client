import { LinkType } from '@/app/schema/mainPageSchea'
import { Box, styled } from '@mui/material'
import { useEffect } from 'react'

declare global {
  interface Window {
    Kakao: any
  }
}
export default function ShareKakao({
  title,
  imageUrl,
  link,
  likeCount,
}: {
  title: string
  imageUrl: string
  link: LinkType
  likeCount: number
}) {
  const handleShare = () => {
    window.Kakao?.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '모바일 청첩장',
        description: '호영이와 도현이의 결혼식을 초대합니다.',
        imageUrl:
          'https://ilotteshopping.com/myweddingstyle/image/main/img3.png',
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      social: {
        likeCount: likeCount,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: 'https://developers.kakao.com',
            webUrl: 'https://developers.kakao.com',
          },
        },
      ],
    })
  }
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Kakao) {
      const script = document?.createElement('script')
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js'
      script.onload = () => {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY!)
      }
      document?.body.appendChild(script)
    } else if (
      typeof window !== 'undefined' &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY!)
    }
  }, [])

  return (
    <ShareButton background="#FFE39B" onClick={handleShare}>
      카카오톡 공유하기
    </ShareButton>
  )
}

const ShareButton = styled(Box)(({ background }: { background: string }) => {
  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(70, 65, 61)',
    background: background,
    fontSize: '16px',
    lineHeight: '26px',
    width: 230,
    height: 46,
    cursor: 'pointer',
    borderRadius: '100px',
    fontWeight: 600,
  }
})
