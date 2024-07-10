"use client";

import CommonAccordion from "@/components/Accordion";
import BackgroundMusic from "@/components/BackgroundMusic";
import KakaoMap from "@/components/KakaoMap";
import CommonSwiper from "@/components/Swiper";
import { Box, CircularProgress } from "@mui/material";
import JSConfetti from "js-confetti";
import Image from "next/image";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ShareKakao from "@/components/ShareKakao";
import { getCount } from "@/features/invitation/getCount";
import { updateCount } from "@/features/invitation/updateCount";
import InfiniteScroll from "react-infinite-scroll-component";

import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { pageComments } from "@/features/invitation/pageComments";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  AccountBox,
  AccountBoxText,
  CommentContainer,
  CommentContentBox,
  CommentDateBox,
  CommentNameBox,
  CommentWrapper,
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
} from "./components";
import { createComment } from "@/features/invitation/createComment";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createCommentSchema } from "@/features/invitation/schema";
import { number } from "zod";
import PaginationComponent from "@/components/Pagination";
import { useEffect, useState } from "react";

interface CommentFormValues {
  name: string;
  comment: string;
}

const initialValues: CommentFormValues = {
  name: "",
  comment: "",
};

export interface AccountInfoType {
  position: string;
  name: string;
  accountInfo: string;
}

export interface CommentType {
  name: string;
  comment: string;
  date: string;
  nextCursor: string;
}
const GroomAccountInfo: AccountInfoType[] = [
  {
    position: "신랑",
    name: "김호영",
    accountInfo: "카카오뱅크 0000-11-000000",
  },
  {
    position: "아버지",
    name: "김명래",
    accountInfo: "카카오뱅크 0000-11-000000",
  },
  {
    position: "어머니",
    name: "undefined",
    accountInfo: "카카오뱅크 0000-11-000000",
  },
];
const BrideAccountInfo: AccountInfoType[] = [
  {
    position: "신부",
    name: "김도현",
    accountInfo: "카카오뱅크 0000-11-000000",
  },
  {
    position: "아버지",
    name: "김동욱",
    accountInfo: "카카오뱅크 0000-11-000000",
  },
  {
    position: "어머니",
    name: "김명숙",
    accountInfo: "카카오뱅크 0000-11-000000",
  },
];

export default function Page() {
  const queryClient = useQueryClient();
  const jsConfetti = new JSConfetti();

  const [currentPage, setCurrentPage] = useState(1);
  const { data: likeCount } = useQuery({
    queryKey: ["like-count"],
    queryFn: async () => {
      const response = await getCount({ id: "1" });
      return response?.data?.like_count;
    },
  });

  const {
    data: commentPage,
    fetchNextPage,
    fetchPreviousPage,
  } = useInfiniteQuery({
    queryKey: [`comment-page`],
    queryFn: ({ pageParam = null }) => pageComments({ cursor: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.data?.nextCursor || null;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage?.data?.nextCursor || null;
    },
  });

  const comments = commentPage?.pages[currentPage - 1]?.data?.comments || [];

  console.log(currentPage);
  console.log(commentPage);
  const { mutate: likeCountMutation } = useMutation({
    mutationFn: async () => await updateCount({ id: "1" }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["like-count"],
      });

      jsConfetti.addConfetti({
        confettiColors: ["#CAB0FF"],
        confettiNumber: 500,
      });
    },
    onError: () => {
      enqueueSnackbar("좋아요 업데이트 오류", { variant: "error" });
    },
  });

  const handlePageChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);

    // 이미 로드된 페이지인지 확인
    const existingPage = commentPage?.pages[page - 1];
    if (!existingPage) {
      if (page < currentPage) {
        await fetchPreviousPage();
      } else {
        const lastPage = commentPage?.pages[page - 2];
        if (lastPage) {
          await fetchNextPage();
        }
      }
    }
  };

  // const { mutate: commentMutation } = useMutation({
  //   mutationFn: createComment,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["comment"],
  //     });

  //     enqueueSnackbar("댓글이 등록되었습니다.", { variant: "success" });
  //   },
  //   onError: () => {
  //     enqueueSnackbar("좋아요 업데이트 오류", { variant: "error" });
  //   },
  // });

  const copyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      enqueueSnackbar<"success">("모바일 청첩장 URL이 복사되었습니다!", {
        variant: "success",
      });
    } catch (err) {
      console.error("URL 복사 실패:", err);
      enqueueSnackbar<"error">("URL 복사에 실패했습니다.", {
        variant: "error",
      });
    }
  };

  const kakaoMap = () => {
    const latitude = 37.759027;
    const longitude = 126.774992;
    const kakaoMapUrl = `https://map.kakao.com/link/map/${latitude},${longitude}`;
    window.open(kakaoMapUrl, "_blank");
  };

  return (
    <SnackbarProvider
      autoHideDuration={1000}
      anchorOrigin={{
        horizontal: "center",
        vertical: "top",
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
            <strong>도현이</strong>와 <strong>호영이</strong>의 결혼식에 소중한
            분들을 초대합니다.
          </InviteText>
          25.02.15.SAT
          <Image
            src={"/images/image/gay.jpeg"}
            alt=""
            width={328}
            height={328}
          />
          <Image
            src={"/images/image/greeting.jpg"}
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
              정이름 &bull; 김명래 의 아들 <strong>호영</strong>
            </Box>
            <Box>
              김동욱 &bull; 김명숙 의 딸 <strong>도현</strong>
            </Box>
          </ParentText>
          <DivideLine />
          <LocationText>
            2025년 2월 15일 토요일 오후 12시 파주 통돼지 바베큐집
          </LocationText>
          <Image
            src={"/images/icons/champagne-icon.svg"}
            alt=""
            width={50}
            height={50}
            style={{
              marginLeft: "auto",
            }}
          />
          <CommonSwiper />
          <AccountBox>
            <Image
              src={"/images/icons/dove-icon.svg"}
              alt=""
              width={80}
              height={70}
            />
            <AccountBoxText>마음 전하실 곳</AccountBoxText>
          </AccountBox>
          <CommonAccordion
            AccountInfo={GroomAccountInfo}
            backgroundColor={"rgb(240, 243, 246)"}
            gender="신랑측"
            genderImageUrl="/images/icons/groom-icon.svg"
          />
          <CommonAccordion
            AccountInfo={BrideAccountInfo}
            backgroundColor={"rgb(255, 245, 218)"}
            gender="신부측"
            genderImageUrl="/images/icons/bridge-icon.svg"
          />
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
            <Image
              src={"/images/icons/location-icon.svg"}
              alt=""
              width={80}
              height={70}
            />
            <AccountBoxText>오시는 길</AccountBoxText>
          </Box>
          <LocationNameBox>경기도 파주시 통돼지 바베큐집</LocationNameBox>
          <LocationTextBox>(파주시 금촌로 16가길 889)</LocationTextBox>
          <KakaoMap />
          <KakaoMapButton onClick={() => kakaoMap()}>
            카카오맵에서 보기
          </KakaoMapButton>
          <Box display={"flex"} flexDirection={"column"} gap={"20px"}>
            <Box>
              <GuideBox>주차안내</GuideBox>
              <Box color={"#594739"}> 파주 통돼지집 내 주차장 이용</Box>
              <Box color={"#7A3D0C"}>
                * 신랑/신부가 무료로 제공하는 발렛서비스를 이용하십시오.
              </Box>
            </Box>
            <hr />
            <Box>
              <GuideBox>지하철</GuideBox>
              <Box color={"#594739"}>
                [3호선] 풍산역 2번,3번 출구에서 도보 10분
              </Box>
            </Box>
            <hr />
            <Box>
              <GuideBox>버스</GuideBox>
              <Box color={"#594739"}>
                파주중학교 또는 일진공원 하차 후 도보 5분 - 간선 141번, 지선
                2011번, 직행 3600번
              </Box>
            </Box>
          </Box>
          <ShareBox>
            <HeartBox onClick={() => likeCountMutation()}>
              <HeartCountBox>{likeCount}</HeartCountBox>
              <Image
                alt=""
                src={"/images/icons/heart-icon.svg"}
                style={{ cursor: "pointer" }}
                width={100}
                height={100}
              />
            </HeartBox>
            <ShareKakao
              title=""
              imageUrl=""
              link={{
                webUrl: "",
                mobileWebUrl: "",
              }}
              likeCount={likeCount!}
            />
            <ShareButton background="#EEE" onClick={() => copyUrlToClipboard()}>
              청첩장 링크 복사
            </ShareButton>
          </ShareBox>
          <VisitorBox>방명록</VisitorBox>
          <CommentContainer>
            {comments &&
              comments?.map((comment: any) => (
                <div key={comment.id}>
                  <h5>{comment.name}</h5>
                  <p>{comment.comment}</p>
                  <small>{comment.date}</small>
                </div>
              ))}
            {/* {hasNextPage && (
              <Box onClick={() => fetchNextPage()}>
                {isFetchingNextPage ? (
                  <CircularProgress size={30} sx={{ margin: "0 auto" }} />
                ) : (
                  "더 보기"
                )}
              </Box>
            )} */}
            <PaginationComponent
              count={commentPage?.pages[0]?.data?.totalPages!}
              page={currentPage}
              onChange={handlePageChange}
            />
          </CommentContainer>
          <Box width={"100%"}>
            <Formik
              initialValues={initialValues}
              validationSchema={toFormikValidationSchema(createCommentSchema)}
              onSubmit={(value) => {
                // commentMutation(value);
              }}
            >
              {({ isSubmitting, dirty, getFieldProps }) => (
                <Form>
                  <CommentWriteBox>
                    <CommentWriteNameBox>
                      <CommentWriteTextBox
                        placeholder="성함"
                        inputProps={{
                          style: {
                            width: 100,
                            height: 10,
                          },
                        }}
                        {...getFieldProps("name")}
                      />
                    </CommentWriteNameBox>
                    <CommentWriteContentBox>
                      <CommentWriteTextAreaBox
                        minRows={3}
                        placeholder="하고 싶은 말을 전하세요."
                        {...getFieldProps("comment")}
                      />
                    </CommentWriteContentBox>
                  </CommentWriteBox>
                  <button
                    type="submit"
                    disabled={dirty}
                    style={{
                      borderRadius: "4px",
                      width: 100,
                      height: 40,
                      float: "right",
                      border: "1px solid #f1e0ce",
                      color: "#f1e0ce",
                      marginTop: "30px",
                    }}
                  >
                    보내기
                  </button>
                </Form>
              )}
            </Formik>
          </Box>
        </InvitaionWrapper>
      </InvitaionContainer>
    </SnackbarProvider>
  );
}
