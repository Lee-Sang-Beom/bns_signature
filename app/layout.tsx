import AutoAlert from "@/component/common/AutoAlert/AutoAlert";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import RecoilRootProvider from "@/provider/RecoilProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "시그니처",
  description: "BNS_Signature",
};

const pretendard = localFont({
  src: [
    {
      path: "../fonts/Pretendard/Pretendard-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Pretendard/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "fallback",
});

const scdream = localFont({
  src: [
    {
      path: "../fonts/SCDream/SCDream1.woff",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream2.woff",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream3.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream4.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream5.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream6.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream7.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream8.woff",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/SCDream/SCDream9.woff",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-scdream",
  display: "fallback",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} ${scdream.variable}`}>
        <ReactQueryProvider>
          <RecoilRootProvider>
            {children}
            <AutoAlert />
          </RecoilRootProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
