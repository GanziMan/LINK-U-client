// KakaoMap.tsx
import { Box } from "@mui/material";
import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap = () => {
  const initializeMap = () => {
    const container = document?.getElementById("map");
    if (container && window.kakao && window.kakao.maps) {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(container, options);
    }
  };

  useEffect(() => {
    const kakaoMapScript = document?.createElement("script");
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false`;
    document?.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        var container = document?.getElementById("map");
        var options = {
          center: new window.kakao.maps.LatLng(37.759027, 126.774992),
          level: 3,
        };

        var map = new window.kakao.maps.Map(container, options);
      });
    };

    kakaoMapScript.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return <Box id="map" style={{ width: "100%", height: "400px" }}></Box>;
};

export default KakaoMap;
