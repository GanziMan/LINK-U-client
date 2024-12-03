import CommonSwiper from '@/components/Swiper'
import { Box } from '@mui/material'
import { Fragment } from 'react'

export default function AlbumForm() {
  return (
    <Fragment>
      <Box
        color={'#e5ac53'}
        fontFamily={'WONBatang'}
        fontSize={'19px'}
        lineHeight={'22px'}
      >
        Album
      </Box>
      <CommonSwiper />
    </Fragment>
  )
}
