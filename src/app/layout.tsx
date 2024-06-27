import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const KAKAO_API_KEY = "5199d1d25fdf685b1f8614de4564477e";

export const metadata: Metadata = {
  title: "호영이와 도현이의 결혼",
  description: "호영이와 도현이의 결혼",
};

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
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&autoload=false`}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
