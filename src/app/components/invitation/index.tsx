'use client'

import BackgroundMusic from '@/components/BackgroundMusic'
import { Box, styled } from '@mui/material'
import JSConfetti from 'js-confetti'
import Image from 'next/image'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { getCount } from '@/actions/invitation/getCount'
import { updateCount } from '@/actions/invitation/updateCount'

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { pageComments } from '@/actions/invitation/pageComments'
import {
  DivideLine,
  InvitaionContainer,
  InvitaionWrapper,
  InviteText,
  LocationNameBox,
  LocationText,
  LocationTextBox,
  ParentText,
  WeddingImageText,
  WeddingImageWrapper,
} from '../../styles'
import { createComment } from '@/actions/invitation/createComment'
import { useEffect, useState } from 'react'
import KakaoMap from '@/components/KakaoMap'
import FormikForm from '../FormikForm'
import CommentForm from '../CommentForm'
import LikeBox from '../ShareBox'
import AlbumForm from '../AlbumForm'
import InvitationAccountForm from '../InvitationAccordionForm'

export default function InvitationComponent() {
  const queryClient = useQueryClient()

  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null)
  useEffect(() => {
    setJsConfetti(new JSConfetti())
  }, [])

  const [currentPage, setCurrentPage] = useState<number>(1)

  const { data: likeCount } = useQuery({
    queryKey: ['like-count'],
    queryFn: async () => {
      const response = await getCount({ id: '1' })
      return response?.data?.like_count
    },
  })

  const {
    data: commentPage,
    fetchNextPage,
    fetchPreviousPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [`comment-page`],
    queryFn: ({ pageParam = null }) => pageComments({ cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextCursor || null
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage?.data?.nextCursor || null
    },
  })

  const comments = commentPage?.pages[currentPage - 1]?.data?.comments || []

  const { mutate: likeCountMutation } = useMutation({
    mutationFn: async () => await updateCount({ id: '1' }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['like-count'],
      })

      jsConfetti?.addConfetti({
        confettiColors: ['#CAB0FF'],
        confettiNumber: 500,
      })
    },
    onError: () => {
      enqueueSnackbar('좋아요 업데이트 오류', { variant: 'error' })
    },
  })

  const handlePageChange = async (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page)

    // 이미 로드된 페이지인지 확인
    const existingPage = commentPage?.pages[page - 1]
    if (!existingPage) {
      if (page < currentPage) {
        if (Math.abs(page - currentPage) > 1) {
          for (let i = 0; i < Math.abs(page - currentPage); i++) {
            await fetchPreviousPage()
          }
        } else {
          await fetchPreviousPage()
        }
      } else {
        if (Math.abs(page - currentPage) > 1) {
          for (let i = 0; i < Math.abs(page - currentPage); i++) {
            await fetchNextPage()
          }
        } else {
          await fetchNextPage()
        }
        const lastPage = commentPage?.pages[page - 2]
        if (lastPage) {
          await fetchNextPage()
        }
      }
    }
  }

  const { mutate: commentMutation } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comment-page'],
      })

      enqueueSnackbar('댓글이 등록되었습니다.', { variant: 'success' })
    },
    onError: () => {
      enqueueSnackbar('좋아요 업데이트 오류', { variant: 'error' })
    },
  })

  return (
    <SnackbarProvider
      autoHideDuration={1000}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
    >
      <InvitaionContainer>
        <InvitaionWrapper>
          <BackgroundMusic />
          <WeddingImageWrapper>
            <Image
              src="/images/icons/wedding-icon.svg"
              alt=""
              width={81}
              height={81}
            />
            <WeddingImageText>Wedding Invitation</WeddingImageText>
          </WeddingImageWrapper>
          <InviteText>
            <strong>김범수</strong> • <strong>김범수</strong>의 결혼식에 소중한
            분들을 초대합니다.
          </InviteText>
          2025년 02월 15일(토)
          <BoxImage
            src={'/images/wedding/wedding-3.jpeg'}
            alt=""
            width={328}
            height={328}
          />
          <Image
            src={'/images/image/greeting.jpg'}
            alt=""
            width={128}
            height={128}
          />
          <LocationText>
            저희 두 사람, 하나가 되어 평생을 함께 걸어 가고자 합니다. 자리에
            오셔서 새로운 시작을 축복해 주세요.
          </LocationText>
          <DivideLine />
          <ParentText>
            <Box>
              김범수 &bull; 김범수 의 아들 <strong>김범수</strong>
            </Box>
            <Box>
              김범수 &bull; 김범수 의 딸 <strong>김범수</strong>
            </Box>
          </ParentText>
          <DivideLine />
          <LocationText>
            2025년 2월 15일 토요일 오후 12시 <br /> 파주 웨딩홀
          </LocationText>
          <AlbumForm />
          <InvitationAccountForm />
          <LocationNameBox> 경기도 파주시 파주웨딩홀</LocationNameBox>
          <LocationTextBox>(파주시 22로 11111가길 파주웨딩홀)</LocationTextBox>
          <KakaoMap />
          <LikeBox
            likeCountMutation={likeCountMutation}
            likeCount={likeCount!}
          />
          <CommentForm
            isFetching={isFetching}
            comments={comments}
            commentPage={commentPage}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          <FormikForm commentRegist={commentMutation} />
        </InvitaionWrapper>
      </InvitaionContainer>
    </SnackbarProvider>
  )
}

const BoxImage = styled(Image)(() => {
  return {
    width: '100%',
  }
})
