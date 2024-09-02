'use client'

import CommonAccordion from '@/components/Accordion'
import BackgroundMusic from '@/components/BackgroundMusic'
import KakaoMap from '@/components/KakaoMap'
import CommonSwiper from '@/components/Swiper'
import { Box, CircularProgress, styled } from '@mui/material'
import JSConfetti from 'js-confetti'
import Image from 'next/image'
import { SnackbarProvider, enqueueSnackbar } from 'notistack'
import ShareKakao from '@/components/ShareKakao'
import { getCount } from '@/features/invitation/getCount'
import { updateCount } from '@/features/invitation/updateCount'
import LinesEllipsis from 'react-lines-ellipsis'

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { pageComments } from '@/features/invitation/pageComments'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import {
  AccountBox,
  AccountBoxText,
  CommentContainer,
  CommentWriteBox,
  CommentWriteContentBox,
  CommentWriteNameBox,
  CommentWriteTextAreaBox,
  CommentWriteTextBox,
  DivideLine,
  GuideBox,
  HeartBox,
  HeartCountBox,
  InvitaionContainer,
  InvitaionWrapper,
  InviteText,
  KakaoMapButton,
  LocationNameBox,
  LocationText,
  LocationTextBox,
  ParentText,
  ShareBox,
  ShareButton,
  VisitorBox,
  WeddingImageText,
  WeddingImageWrapper,
} from '../../styles'
import { createComment } from '@/features/invitation/createComment'
import { Formik, Form } from 'formik'
import { createCommentSchema } from '@/features/invitation/schema'

import PaginationComponent from '@/components/Pagination'
import { useEffect, useState } from 'react'
import {
  BrideAccountInfo,
  CommentFormType,
  GroomAccountInfo,
} from '../../schema/mainPageSchea'

const initialValues: CommentFormType = {
  name: '',
  comment: '',
}

export default function InvitationComponent() {
  const queryClient = useQueryClient()

  const [jsConfetti, setJsConfetti] = useState<JSConfetti | null>(null)
  useEffect(() => {
    setJsConfetti(new JSConfetti())
  }, [])

  const [currentPage, setCurrentPage] = useState(1)
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
    event: React.ChangeEvent<unknown>,
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

  const copyUrlToClipboard = async () => {
    try {
      if (typeof window !== 'undefined')
        await navigator.clipboard.writeText(window.location.href)
      enqueueSnackbar<'success'>('모바일 청첩장 URL이 복사되었습니다!', {
        variant: 'success',
      })
    } catch (err) {
      console.error('URL 복사 실패:', err)
      enqueueSnackbar<'error'>('URL 복사에 실패했습니다.', {
        variant: 'error',
      })
    }
  }

  const kakaoMap = () => {
    const latitude = 37.759027
    const longitude = 126.774992
    const kakaoMapUrl = `https://map.kakao.com/link/map/${latitude},${longitude}`
    if (typeof window !== 'undefined') window.open(kakaoMapUrl, '_blank')
  }

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
          <Box
            sx={{
              color: '#e5ac53',
              fontFamily: 'WONBatang',
              fontSize: '19px',
              lineHeight: '22px',
            }}
          >
            Album
          </Box>
          <CommonSwiper />
          <AccountBox>
            <Image
              src={'/images/icons/dove-icon.svg'}
              alt=""
              width={80}
              height={70}
            />
            <AccountBoxText>마음 전하실 곳</AccountBoxText>
          </AccountBox>
          <CommonAccordion
            AccountInfo={GroomAccountInfo}
            backgroundColor={'rgb(240, 243, 246)'}
            gender="신랑측"
            genderImageUrl="/images/icons/groom-icon.svg"
          />
          <CommonAccordion
            AccountInfo={BrideAccountInfo}
            backgroundColor={'rgb(255, 245, 218)'}
            gender="신부측"
            genderImageUrl="/images/icons/bridge-icon.svg"
          />
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
            <Image
              src={'/images/icons/location-icon.svg'}
              alt=""
              width={80}
              height={70}
            />
            <AccountBoxText>오시는 길</AccountBoxText>
          </Box>
          <LocationNameBox> 경기도 파주시 파주웨딩홀</LocationNameBox>
          <LocationTextBox>(파주시 22로 11111가길 파주웨딩홀)</LocationTextBox>
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
                  ⃝ ⃝중학교 또는 ⃝ ⃝공원 하차 후 도보 5분 - 간선 ⃝ ⃝ ⃝번, 지선
                  2011번, 직행 3600번
                </Box>
              </Box>
            </Box>
          </Box>
          <ShareBox>
            <HeartBox onClick={() => likeCountMutation()} id="heart-box">
              <HeartCountBox id="like-count">{likeCount}</HeartCountBox>
              <Image
                alt=""
                src={'/images/icons/heart-icon.svg'}
                style={{ cursor: 'pointer' }}
                width={100}
                height={100}
              />
            </HeartBox>
            <ShareKakao
              title=""
              imageUrl=""
              link={{
                webUrl: '',
                mobileWebUrl: '',
              }}
              likeCount={likeCount!}
            />
            <ShareButton background="#EEE" onClick={() => copyUrlToClipboard()}>
              청첩장 링크 복사
            </ShareButton>
          </ShareBox>
          <VisitorBox>방명록</VisitorBox>
          <CommentContainer>
            {isFetching && (
              <CircularProgress
                sx={{
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  top: '50%',
                  left: '50%',
                  color: '#f1e0ce',
                }}
                size={30}
              />
            )}
            {comments &&
              comments?.map((comment: any, index: number) => (
                <div key={index}>
                  <h5>{comment.name}</h5>

                  <LinesEllipsis
                    text={comment.comment}
                    maxLine="1"
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                    component="p"
                  />
                  <small>{comment.date}</small>
                  <hr />
                </div>
              ))}

            <PaginationComponent
              count={commentPage?.pages[0]?.data?.totalPages!}
              page={currentPage}
              onChange={handlePageChange}
            />
          </CommentContainer>
          <Box width={'100%'} padding={'20px'}>
            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(createCommentSchema)}
              onSubmit={(value, { resetForm }) => {
                commentMutation(value)
                resetForm()
              }}
            >
              {({ getFieldProps, values }) => {
                return (
                  <Form>
                    <CommentWriteBox>
                      <CommentWriteNameBox>
                        <CommentWriteTextBox
                          placeholder="성함"
                          id="name"
                          inputProps={{
                            style: {
                              width: 100,
                              height: 10,
                            },
                          }}
                          {...getFieldProps('name')}
                        />
                      </CommentWriteNameBox>
                      <CommentWriteContentBox>
                        <CommentWriteTextAreaBox
                          maxLength={98}
                          id="comment"
                          minRows={3}
                          maxRows={3}
                          placeholder="하고 싶은 말을 전하세요."
                          {...getFieldProps('comment')}
                        />
                      </CommentWriteContentBox>
                    </CommentWriteBox>
                    <button
                      type="submit"
                      // disabled={dirty}
                      style={{
                        borderRadius: '4px',
                        width: 100,
                        height: 40,
                        float: 'right',
                        background: '#f1e0ce',
                        color: 'white',
                        marginTop: '30px',
                      }}
                    >
                      보내기
                    </button>
                  </Form>
                )
              }}
            </Formik>
          </Box>
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
