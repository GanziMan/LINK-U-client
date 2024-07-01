"use client";
import CommonAccordion from "@/components/Accordion";
import BackgroundMusic from "@/components/BackgroundMusic";
import KakaoMap from "@/components/KakaoMap";
import CommonSwiper from "@/components/Swiper";
import { Box, styled } from "@mui/material";
import JSConfetti from "js-confetti";
import Image from "next/image";
import { useState } from "react";
import {
  MotionValue,
  motion,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ShareKakao from "@/components/ShareKakao";

export interface AccountInfoType {
  position: string;
  name: string;
  accountInfo: string;
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
  const { scrollY } = useViewportScroll(); // 현재 위치 가져오기
  const opacity: MotionValue<number> = useTransform(scrollY, [0, 300], [0, 1]);
  const y: MotionValue<number> = useTransform(scrollY, [0, 300], [-50, 0]);

  const handleClick = () => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: ["#CAB0FF"],
      confettiNumber: 500,
    });
  };

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
          <MotionBox
            // style={{ opacity: opacity as unknown as number, y }}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
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
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <InviteText>
              <strong>도현이</strong>와 <strong>호영이</strong>의 결혼식에
              소중한 분들을 초대합니다.
            </InviteText>{" "}
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            25.02.15.SAT
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Image
              src={"/images/image/gay.jpeg"}
              alt=""
              width={328}
              height={328}
            />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Image
              src={"/images/image/greeting.jpg"}
              alt=""
              width={128}
              height={128}
            />
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <LocationText>
              저희 두 사람, 하나가 되어 평생을 함께 걸어 가고자 합니다. 자리에
              오셔서 새로운 시작을 축복해 주세요.
            </LocationText>
          </MotionBox>

          <DivideLine />
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <ParentText>
              <Box>
                정이름 &bull; 김명래 의 아들 <strong>호영</strong>
              </Box>
              <Box>
                김동욱 &bull; 김명숙 의 딸 <strong>도현</strong>
              </Box>
            </ParentText>
          </MotionBox>
          <DivideLine />
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <LocationText>
              2025년 2월 15일 토요일 오후 12시 파주 통돼지 바베큐집
            </LocationText>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <Image
              src={"/images/icons/champagne-icon.svg"}
              alt=""
              width={50}
              height={50}
              style={{
                marginLeft: "auto",
              }}
            />
          </MotionBox>
          <CommonSwiper />
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            <AccountBox>
              <Image
                src={"/images/icons/dove-icon.svg"}
                alt=""
                width={80}
                height={70}
              />
              <AccountBoxText>마음 전하실 곳</AccountBoxText>
            </AccountBox>
          </MotionBox>
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
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
            >
              <Image
                src={"/images/icons/location-icon.svg"}
                alt=""
                width={80}
                height={70}
              />
              <AccountBoxText>오시는 길</AccountBoxText>
            </Box>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            textAlign={"center"}
          >
            <Box
              sx={{
                fontSize: "18px",
                lineHeight: "26px",
                fontWeight: 700,
                color: "rgb(49, 46, 42)",
              }}
            >
              경기도 파주시 통돼지 바베큐집
            </Box>
            <Box
              sx={{
                fontSize: "14px",
                lineHeight: "26px",
              }}
            >
              (파주시 금촌로 16가길 889)
            </Box>
          </MotionBox>
          <KakaoMap />
          <KakaoMapButton>카카오맵에서 보기</KakaoMapButton>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.4 }}
            marginRight={"auto"}
          >
            <GuideBox>주차안내</GuideBox>
            <Box color={"#594739"}> 파주 통돼지집 내 주차장 이용</Box>
            <Box color={"#7A3D0C"}>
              * 신랑/신부가 무료로 제공하는 발렛서비스를 이용하십시오.
            </Box>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.6 }}
            marginRight={"auto"}
          >
            <GuideBox>지하철</GuideBox>
            <Box color={"#594739"}>
              [3호선] 풍산역 2번,3번 출구에서 도보 10분
            </Box>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.8 }}
            marginRight={"auto"}
          >
            <GuideBox>버스</GuideBox>
            <Box color={"#594739"}>
              파주중학교 또는 일진공원 하차 후 도보 5분 - 간선 141번, 지선
              2011번, 직행 3600번
            </Box>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 3 }}
          >
            <ShareBox>
              <Image
                alt=""
                src={"/images/icons/heart-icon.svg"}
                onClick={() => handleClick()}
                style={{ cursor: "pointer" }}
                width={100}
                height={100}
              />
              <ShareKakao
                title=""
                imageUrl=""
                link={{
                  webUrl: "",
                  mobileWebUrl: "",
                }}
              />
              <ShareButton
                background="#EEE"
                onClick={() => copyUrlToClipboard()}
              >
                청첩장 링크 복사
              </ShareButton>
            </ShareBox>
          </MotionBox>
        </InvitaionWrapper>
      </InvitaionContainer>
    </SnackbarProvider>
  );
}

const InvitaionContainer = styled(Box)(() => {
  return {
    width: "100%",
    color: "#594739",
    background: "#f1e0ce",
    display: "flex",
    justifyContent: "center",
  };
});

const InvitaionWrapper = styled(Box)(() => {
  return {
    padding: "50px 20px 50px 20px",
    width: 390,
    gap: "30px",
    background: "white",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };
});

const WeddingImageWrapper = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };
});

const WeddingImageText = styled(Box)(() => {
  return {
    fontSize: "14px",
    fontFamily: "judson",
  };
});

const InviteText = styled(Box)(() => {
  return {
    color: "#594739",
    width: 203,
    wordBreak: "keep-all",
    whiteSpace: "pre-line",
    fontSize: "16px",
    lineHeight: "30px",
    textAlign: "center",
  };
});
const InviteDay = styled(Box)(() => {
  return {
    color: "#594739",
    width: 203,
    height: 120,
    whiteSpace: "pre-line",
    fontSize: "15px",
    lineHeight: "30px",
    textAlign: "center",
  };
});

const DivideLine = styled(Box)(() => {
  return {
    width: 95,
    borderBottom: "1px solid black",
  };
});
const ParentText = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };
});

const LocationText = styled(Box)(() => {
  return {
    fontSize: "14px",
    lineHeight: "30px",
    width: 225,
    fontWeight: 600,
    textAlign: "center",
    whiteSpace: "pre-line",
    wordBreak: "keep-all",
  };
});

const AccountBox = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
});

const AccountBoxText = styled(Box)(() => {
  return {
    fontSize: "14px",
    color: "#775F4C",
  };
});

const KakaoMapButton = styled(Box)(() => {
  return {
    background: "rgb(243, 235, 220)",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    lineHeight: "26px",
    height: 38,
    width: "100%",
  };
});

const GuideBox = styled(Box)(() => {
  return {
    color: "#D67E2C",
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: 700,
  };
});

const ShareBox = styled(Box)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  };
});

const ShareButton = styled(Box)(({ background }: { background: string }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(70, 65, 61)",
    background: background,
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "26px",
    width: 230,
    height: 46,
    borderRadius: "100px",
    fontWeight: 600,
  };
});

// motion으로 감싸는 컴포넌트를 생성합니다.
const MotionBox = motion(Box);
