'use client'

import BackgroundMusic from '@/components/BackgroundMusic'
import { Box } from '@mui/material'
import JSConfetti from 'js-confetti'
import Image from 'next/image'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import { updateCount } from '@/actions/invitation/updateCount'

import {
  useInfiniteQuery,
  useMutation,
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
import FormikForm from '../CommentsCreateForm'
import CommentForm from '../CommentForm'
import LikeBox from '../ShareBox'
import AlbumForm from '../AlbumForm'
import InvitationAccountForm from '../InvitationAccordionForm'
import { InfiniteQueryResult, pageType } from '@/app/schema/mainPageSchea'

export default function InvitationComponent({
  likeCount,
}: {
  likeCount: number
}) {
  const queryClient = useQueryClient()

  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null)
  useEffect(() => {
    setJsConfetti(new JSConfetti())
  }, [])

  const likeCountUp = async () => {
    await updateCount({ id: '1' }).then(() => {
      jsConfetti
        ?.addConfetti({
          confettiColors: ['#CAB0FF'],
          confettiNumber: 500,
        })
        .catch((e) => {
          console.error(e)
        })
    })
  }

  const [currentPage, setCurrentPage] = useState<number>(1)

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
    onSuccess: (newComment) => {
      // queryClient.invalidateQueries({
      //   queryKey: ['comment-page'],
      // })

      queryClient.setQueryData(
        ['comment-page'],
        (oldData: InfiniteQueryResult) => {
          if (!oldData) return null
          return {
            ...oldData,
            pages: oldData.pages.map((page: pageType, index: number) => {
              if (index === 0 && newComment.status === '200') {
                const updatedComments = [newComment.data, ...page.data.comments]
                return {
                  ...page,
                  data: {
                    ...page.data,
                    nextCursor: updatedComments[updatedComments.length - 2].id,
                    comments: updatedComments.slice(0, 3),
                  },
                }
              }
              return page
            }),
          }
        }
      )
      enqueueSnackbar('방명록이 작성되었습니다.', {
        variant: 'success',
        className: 'toastSuccessAlert',
      })
    },
    onError: (error) => {
      console.error(error.message)
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
          <Image
            src={'/images/wedding/wedding-3.jpeg'}
            alt="wedding-3"
            width={328}
            height={328}
            style={{
              width: '100%',
            }}
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
          <LikeBox likeCountMutation={likeCountUp} likeCount={likeCount!} />
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
