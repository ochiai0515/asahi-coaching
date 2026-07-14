import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "株式会社旭コーチング",
  description:
    "株式会社旭コーチングは、人・組織・地域が本来持っている力を引き出し、主体性が立ち上がる環境づくりを支援します。人材育成・組織開発・コーチング・教育研修・講演・子ども支援・組織コンサルティング。",
  keywords: [
    "旭コーチング",
    "コーチング",
    "人材育成",
    "組織開発",
    "教育研修",
    "茨城",
    "古河",
  ],
  openGraph: {
    title: "株式会社旭コーチング",
    description:
      "人・組織・地域が本来持っている力を引き出し、主体性が立ち上がる環境づくりを支援します。",
    type: "website",
    locale: "ja_JP",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'XZPqxrjIrz2Asv4PKAjLEV6WejmxJs1SGumk6SilCHY',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
