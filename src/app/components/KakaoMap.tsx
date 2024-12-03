import { Box } from '@mui/material'
import { Fragment } from 'react'
import { GuideBox, KakaoMapButton } from '../styles'

export default function KakaoMap() {
  const kakaoMap = () => {
    const latitude = 37.759027
    const longitude = 126.774992
    const kakaoMapUrl = `https://map.kakao.com/link/map/${latitude},${longitude}`
    if (typeof window !== 'undefined') window.open(kakaoMapUrl, '_blank')
  }

  return (
    <Fragment>
      <KakaoMap />
      <Box
        sx={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <KakaoMapButton onClick={() => kakaoMap()}>
          카카오맵에서 보기
        </KakaoMapButton>
        <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
          <Box>
            <GuideBox>주차안내</GuideBox>
            <Box color={'#594739'}> 파주 웨딩홀 내 주차장 이용</Box>
            <Box color={'#7A3D0C'}>
              * 신랑/신부가 무료로 제공하는 발렛서비스를 이용하십시오.
            </Box>
          </Box>
          <hr />
          <Box>
            <GuideBox>지하철</GuideBox>
            <Box color={'#594739'}>
              [경의선] 파주역 2번,3번 출구에서 도보 10분
            </Box>
          </Box>
          <hr />
          <Box>
            <GuideBox>버스</GuideBox>
            <Box color={'#594739'}>
              파주중학교 또는 ⃝파주공원 하차 후 도보 5분 - 간선 000번, 지선
              2011번, 직행 3600번
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
}
