import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Scrollbar } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Box, styled } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import { SlideDataType } from '@/app/schema/mainPageSchea'

export default function GallerySwiper() {
  SwiperCore.use([Navigation, Scrollbar])

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const SlideData: SlideDataType[] = [
    {
      imageUrl: '/images/wedding/wedding-1.jpeg',
    },
    {
      imageUrl: '/images/wedding/wedding-2.jpeg',
    },
    {
      imageUrl: '/images/wedding/wedding-3.jpeg',
    },
  ]

  const handleSlideChange = (swiper: SwiperCore) => {
    setCurrentIndex(swiper.realIndex)
  }
  return (
    <SwiperWrapper>
      <Box color={'black'} fontWeight={'bold'}>
        갤러리
      </Box>
      <SwiperST
        loop
        slidesPerView={1}
        navigation
        onSlideChange={handleSlideChange}
      >
        {SlideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '340px',
                height: '500px', // 원하는 높이로 설정
              }}
            >
              <Image
                src={slide.imageUrl}
                alt=""
                layout="fill"
                objectFit="cover" // 전체 이미지를 보기 위해서는 "contain"으로 변경 가능
              />
            </Box>
          </SwiperSlide>
        ))}
      </SwiperST>

      <Box
        sx={{
          color: '#775F4C',
        }}
      >
        {currentIndex + 1 + '/' + SlideData.length}
      </Box>
    </SwiperWrapper>
  )
}

const SwiperWrapper = styled(Box)(() => {
  return {
    width: 360,
    height: 620,
    display: 'flex',
    color: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    background: '#f6fbff',
    alignItems: 'center',
    gap: '10px',
    position: 'relative',
  }
})

const SwiperST = styled(Swiper)(() => {
  return {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    '& .swiper-wrapper': {
      boxSizing: 'border-box',
    },
    '& .swiper-slide': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .swiper-button-prev, & .swiper-button-next': {
      // position: "absolute", // 기본 위치를 상대적으로 변경
      // bottom: 0,
      // color: "black",
      // width: "50px", // 화살표 크기 조정
      // height: "50px", // 화살표 크기 조정
      // "&:after": {
      //   fontSize: "20px", // 화살표 아이콘 크기 조정
      // },
      display: 'none',
    },
  }
})
