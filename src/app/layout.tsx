import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "모바일 청첩장",
  description: "소중한 사람들을 초대합니다.",
};

declare global {
  interface Window {
    Kakao: any;
  }
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env
            .NEXT_PUBLIC_KAKAO_API_KEY!}&autoload=false`}
        />
        <Script
          type="text/javascript"
          strategy="afterInteractive"
          src={`https://developers.kakao.com/sdk/js/kakao.min.js`}
        />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
