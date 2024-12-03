import { Box } from '@mui/material'
import Image from 'next/image'
import { AccountBoxText } from '../styles'

export default function DirectionForm() {
  return (
    <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Image
        src={'/images/icons/location-icon.svg'}
        alt=""
        width={80}
        height={70}
      />
      <AccountBoxText>오시는 길</AccountBoxText>
    </Box>
  )
}
