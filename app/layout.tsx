import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";

// ─── サイトの正規 URL ───────────────────────────────────────────────────────
// カスタムドメイン取得後はここを更新してください
const SITE_URL = 'https://www.asahi-coaching.jp'

// ─── JSON-LD（Organization 構造化データ） ──────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '株式会社旭コーチング',
  alternateName: 'Asahi Coaching Co., Ltd.',
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description:
    '株式会社旭コーチングは、人・組織・地域が本来持っている力を引き出し、主体性が立ち上がる環境づくりを支援します。人材育成・組織開発・コーチング・教育研修・講演・子ども支援・組織コンサルティング。',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '古河市',
    addressRegion: '茨城県',
    addressCountry: 'JP',
  },
  founder: {
    '@type': 'Person',
    name: '菅原 俊彦',
  },
  employee: [
    {
      '@type': 'Person',
      name: '菅原 俊彦',
      jobTitle: '代表取締役',
    },
  ],
  areaServed: 'JP',
  knowsAbout: [
    '人材育成',
    '組織開発',
    'コーチング',
    '教育・研修',
    '講演',
    '子ども支援',
    '組織コンサルティング',
  ],
}

// ─── Next.js Metadata ──────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // title
  title: {
    default: '株式会社旭コーチング',
    template: '%s | 株式会社旭コーチング',
  },

  // description
  description:
    '株式会社旭コーチングは、人・組織・地域が本来持っている力を引き出し、主体性が立ち上がる環境づくりを支援します。人材育成・組織開発・コーチング・教育研修・講演・子ども支援・組織コンサルティング（茨城県古河市）。',

  // keywords
  keywords: [
    '旭コーチング',
    '株式会社旭コーチング',
    'コーチング',
    '人材育成',
    '組織開発',
    '教育研修',
    '講演',
    '子ども支援',
    '組織コンサルティング',
    '茨城',
    '古河',
    '菅原俊彦',
  ],

  // canonical
  alternates: {
    canonical: '/',
  },

  // OGP
  openGraph: {
    title: '株式会社旭コーチング',
    description:
      '人・組織・地域が本来持っている力を引き出し、主体性が立ち上がる環境づくりを支援します。',
    url: '/',
    siteName: '株式会社旭コーチング',
    type: 'website',
    locale: 'ja_JP',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: '株式会社旭コーチング — 夜明け前が、一番暗い。',
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '株式会社旭コーチング',
    description:
      '人・組織・地域が本来持っている力を引き出し、主体性が立ち上がる環境づくりを支援します。',
    images: ['/opengraph-image'],
  },

  // robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Google Search Console 所有権確認
  verification: {
    google: 'XZPqxrjIrz2Asv4PKAjLEV6WejmxJs1SGumk6SilCHY',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
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
        {/* JSON-LD 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
