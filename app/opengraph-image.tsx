import { readFileSync } from 'fs'
import { ImageResponse } from 'next/og'
import path from 'path'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  // Noto Sans JP (weight 300) を jsDelivr 経由で取得
  let fontData: ArrayBuffer | undefined
  try {
    fontData = await fetch(
      'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5.0.18/files/noto-sans-jp-japanese-300-normal.woff'
    ).then((r) => r.arrayBuffer())
  } catch {
    // フォント読み込み失敗時はシステムフォントで代替
  }

  // ロゴ（正方形・ネイビー）を base64 で埋め込む
  let logoSrc: string | undefined
  try {
    const logoBuffer = readFileSync(
      path.join(process.cwd(), 'public/brand/asahi-logo-square.png')
    )
    logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`
  } catch {
    // ロゴ読み込み失敗時はスキップ
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: 'linear-gradient(160deg, #06080f 0%, #0d1828 35%, #1e2a3a 55%, #2e1a0a 75%, #0a0808 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: fontData ? 'Noto Sans JP' : 'sans-serif',
        }}
      >
        {/* ホライゾングロー */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 220,
            background:
              'radial-gradient(ellipse 80% 100% at 50% 100%, rgba(255,130,40,0.30) 0%, transparent 70%)',
          }}
        />

        {/* 上部アクセントライン */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            right: 80,
            height: 1,
            background: 'rgba(255,160,60,0.25)',
          }}
        />

        {/* ロゴ */}
        {logoSrc && (
          <img
            src={logoSrc}
            width={120}
            height={120}
            style={{ marginBottom: 32, opacity: 0.92 }}
          />
        )}

        {/* キャッチコピー */}
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.50)',
            fontSize: 26,
            fontWeight: 300,
            letterSpacing: '0.30em',
          }}
        >
          夜明け前が、一番暗い。
        </div>

        {/* セパレーター */}
        <div
          style={{
            marginTop: 52,
            width: 48,
            height: 1,
            background: 'rgba(255,150,50,0.55)',
          }}
        />

        {/* 英語表記 */}
        <div
          style={{
            marginTop: 28,
            color: 'rgba(255, 255, 255, 0.28)',
            fontSize: 18,
            letterSpacing: '0.22em',
          }}
        >
          Asahi Coaching Co., Ltd.
        </div>

        {/* 下部アクセントライン */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            right: 80,
            height: 1,
            background: 'rgba(255,160,60,0.25)',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: fontData
        ? [{ name: 'Noto Sans JP', data: fontData, weight: 300 as const }]
        : [],
    }
  )
}
