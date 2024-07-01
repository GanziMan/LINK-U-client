import { Box, styled } from "@mui/material";
import { useEffect } from "react";

interface LinkType {
  mobileWebUrl: string;
  webUrl: string;
}

declare global {
  interface Window {
    Kakao: any;
  }
}
export default function ShareKakao({
  title,
  imageUrl,
  link,
}: {
  title: string;
  imageUrl: string;
  link: LinkType;
}) {
  const handleShare = () => {
    window.Kakao.Share.sendDefault({
      objectType: "text",
      text: "도현이와 호영군의 결혼을 진심으로 축하드립니다. 축복해주세요!",
      link: {
        mobileWebUrl: "https://developers.kakao.com",
        webUrl: "https://developers.kakao.com",
      },
    });
  };
  useEffect(() => {
    if (typeof window !== "undefined" && !window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.onload = () => {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY!);
      };
      document.body.appendChild(script);
    } else if (
      typeof window !== "undefined" &&
      window.Kakao &&
      !window.Kakao.isInitialized()
    ) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY!);
    }
  }, []);

  return (
    <ShareButton background="#FFE39B" onClick={handleShare}>
      카카오톡 공유하기
    </ShareButton>
  );
}

const ShareButton = styled(Box)(({ background }: { background: string }) => {
  return {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgb(70, 65, 61)",
    background: background,
    fontSize: "16px",
    lineHeight: "26px",
    width: 230,
    height: 46,
    cursor: "pointer",
    borderRadius: "100px",
    fontWeight: 600,
  };
});
