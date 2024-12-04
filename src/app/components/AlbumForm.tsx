import CommonSwiper from '@/components/Swiper'
import { Box } from '@mui/material'
import { Fragment } from 'react'

export default function AlbumForm() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'5px'}
      alignItems={'center'}
    >
      <CommonSwiper />
    </Box>
  )
}
