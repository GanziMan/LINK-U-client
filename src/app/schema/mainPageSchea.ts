import { ReactNode } from 'react'

export interface RootLayoutProps {
  children: ReactNode
}

export interface CommentFormType {
  name: string
  comment: string
}

export interface AccountInfoType {
  position: string
  name: string
  accountInfo: string
}

export interface CommentType {
  name: string
  comment: string
  date: string
  nextCursor: string
}
export interface ClientProviderProps {
  children: ReactNode
}
export interface SlideDataType {
  imageUrl: string
}

export interface LinkType {
  mobileWebUrl: string
  webUrl: string
}

export interface commentDataType {
  name: string
  comment: string
  date: string
}

type Comment = {
  name: string
  comment: string
  date: string
}

type PageDataType = {
  comments: Comment[]
  nextCursor: number
  totalPages: number
}

export type InfiniteQueryResult = {
  pages: pageType[]
  pageParams: (string | number | null)[] // 페이지 매개변수 (필요에 따라 구체적으로 지정 가능)
}

export type pageType = {
  data: PageDataType
  status: '200' | '400'
}

export const GroomAccountInfo: AccountInfoType[] = [
  {
    position: '신랑',
    name: 'O O O',
    accountInfo: '카카오뱅크 0000-11-000000',
  },
  {
    position: '아버지',
    name: 'O O O',
    accountInfo: '카카오뱅크 0000-11-000000',
  },
  {
    position: '어머니',
    name: 'O O O',
    accountInfo: '카카오뱅크 0000-11-000000',
  },
]
export const BrideAccountInfo: AccountInfoType[] = [
  {
    position: '신부',
    name: 'O O O',
    accountInfo: '카카오뱅크 0000-11-000000',
  },
  {
    position: '아버지',
    name: 'O O O',
    accountInfo: '카카오뱅크 0000-11-000000',
  },
  {
    position: '어머니',
    name: 'O O O',
    accountInfo: '카카오뱅크 0000-11-000000',
  },
]
