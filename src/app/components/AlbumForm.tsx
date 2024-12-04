import GallerySwiper from '@/components/GallerySwiper'
import { Box } from '@mui/material'

export default function AlbumForm() {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      gap={'5px'}
      alignItems={'center'}
    >
      <GallerySwiper />
    </Box>
  )
}
