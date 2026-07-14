import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// 日の出をモチーフにしたシンプルなファビコン
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#06080f',
          borderRadius: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ホライゾングロー */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(255,130,30,0.50) 0%, transparent 80%)',
          }}
        />
        {/* 水平線 */}
        <div
          style={{
            position: 'absolute',
            bottom: 11,
            left: 3,
            right: 3,
            height: 1,
            background: 'rgba(255,155,50,0.40)',
          }}
        />
        {/* 太陽（半円） */}
        <div
          style={{
            position: 'absolute',
            bottom: 11,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 12,
            height: 6,
            borderRadius: '6px 6px 0 0',
            background: 'linear-gradient(to bottom, #ffc040 0%, #ff7010 100%)',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
