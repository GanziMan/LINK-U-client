import CommonAccordion from '@/components/Accordion'
import { Fragment } from 'react'
import { BrideAccountInfo, GroomAccountInfo } from '../schema/mainPageSchea'
import { AccountBox, AccountBoxText } from '../styles'
import Image from 'next/image'

const ACCORDION_DATA = [
  {
    AccountInfo: GroomAccountInfo,
    backgroundColor: 'rgb(240, 243, 246)',
    gender: '신랑측',
    genderImageUrl: '/images/icons/groom-icon.svg',
  },
  {
    AccountInfo: BrideAccountInfo,
    backgroundColor: 'rgb(255, 245, 218)',
    gender: '신부측',
    genderImageUrl: '/images/icons/bridge-icon.svg',
  },
]
export default function InvitationAccountForm() {
  return (
    <Fragment>
      <AccountBox>
        <Image
          src={'/images/icons/dove-icon.svg'}
          alt=""
          width={80}
          height={70}
        />
        <AccountBoxText>마음 전하실 곳</AccountBoxText>
      </AccountBox>
      {ACCORDION_DATA.map((data, index) => {
        return (
          <CommonAccordion
            key={index}
            AccountInfo={data.AccountInfo}
            backgroundColor={data.backgroundColor}
            gender={data.gender}
            genderImageUrl={data.genderImageUrl}
          />
        )
      })}
    </Fragment>
  )
}
