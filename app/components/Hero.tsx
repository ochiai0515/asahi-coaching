'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ────────────────────────────────────────────────────────────────────────────
// スクロール駆動 Hero（写真主役・夜明け体験版）
//
// 外側ラッパー 500vh のスクロール空間を持ち、内側が sticky で
// ビューポートに貼り付いたまま、スクロール進捗 0→1 に応じて：
//
//   ・5枚の夜明け写真がクロスフェード（Canvas禁止 / 写真のみ）
//   ・背景位置が 5% ゆっくり縦シフト（パララックス）
//   ・夜明けが進むにつれ薄い暖色グローがホライゾンに滲む（光）
//   ・6つのコピーが静かに現れ消える（余白の中に浮かぶ程度）
//   ・スクロールインジケーターが冒頭だけ表示
//
// ライブラリ：GSAP ScrollTrigger（SmoothScrollProvider で Lenis 連携済み）
// ────────────────────────────────────────────────────────────────────────────

// 写真（夜→青時間帯→グロー→日の出→朝）
const IMAGES = [
  '/images/dawn-01-night.png',
  '/images/dawn-02-bluehour.png',
  '/images/dawn-03-glow.png',
  '/images/dawn-04-sunrise.png',
  '/images/dawn-05-morning.png',
]

// 各写真のスクロール進捗区間
// inStart==inEnd のときは最初から全表示
interface ImgRange {
  inStart: number
  inEnd: number
  outStart: number | null
  outEnd: number | null
}
const IMG_RANGES: ImgRange[] = [
  { inStart: 0,    inEnd: 0,    outStart: 0.18, outEnd: 0.24 },
  { inStart: 0.18, inEnd: 0.24, outStart: 0.36, outEnd: 0.42 },
  { inStart: 0.36, inEnd: 0.42, outStart: 0.54, outEnd: 0.60 },
  { inStart: 0.54, inEnd: 0.60, outStart: 0.72, outEnd: 0.78 },
  { inStart: 0.72, inEnd: 0.78, outStart: null,  outEnd: null  },
]

// コピーのスクロール進捗区間
interface CopyRange {
  text: string
  inStart: number
  inEnd: number
  outStart: number
  outEnd: number
}
const COPIES: CopyRange[] = [
  {
    text: '夜明け前が、\n一番暗い。',
    inStart: 0.00, inEnd: 0.04, outStart: 0.12, outEnd: 0.17,
  },
  {
    text: '人生には、\n夜がある。',
    inStart: 0.18, inEnd: 0.22, outStart: 0.30, outEnd: 0.35,
  },
  {
    text: '迷うことも。\n\n苦しむことも。\n\n立ち止まることも。',
    inStart: 0.36, inEnd: 0.40, outStart: 0.48, outEnd: 0.53,
  },
  {
    text: '夜があるからこそ、\n夜明けは希望になる。',
    inStart: 0.54, inEnd: 0.58, outStart: 0.65, outEnd: 0.70,
  },
  {
    text: '出来事は選べない。\n\nでも、\nその出来事をどう引き受けるかは、\n自分で選べる。',
    inStart: 0.72, inEnd: 0.76, outStart: 0.82, outEnd: 0.87,
  },
  {
    text: '人生は、\nその選択の積み重ねで\nできている。',
    inStart: 0.88, inEnd: 0.92, outStart: 0.97, outEnd: 1.00,
  },
]

// 進捗 p から各レイヤーの opacity を計算
function calcOp(p: number, r: ImgRange | CopyRange): number {
  const { inStart, inEnd } = r
  const os = (r as ImgRange).outStart
  const oe = (r as ImgRange).outEnd
  if (p < inStart) return 0
  if (inEnd > inStart && p < inEnd) return (p - inStart) / (inEnd - inStart)
  if (os === null || os === undefined) return 1
  if (p < os) return 1
  if (oe !== null && oe !== undefined && p < oe) return 1 - (p - os) / (oe - os)
  return 0
}

export default function Hero() {
  const wrapperRef   = useRef<HTMLDivElement>(null)
  const imgRefs      = useRef<(HTMLDivElement | null)[]>([])
  const copyRefs     = useRef<(HTMLDivElement | null)[]>([])
  const lightRef     = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const wrapper = wrapperRef.current
    if (!wrapper) return

    // モバイル判定（パララックスの基準位置）
    const mq = window.matchMedia('(max-width: 767px)')

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const p = self.progress

        // ── 写真の opacity ──────────────────────────────────────────────────
        imgRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.opacity = String(calcOp(p, IMG_RANGES[i]))
        })

        // ── パララックス（背景位置を 5% 縦にシフト） ────────────────────────
        const baseY = mq.matches ? 45 : 22
        const parallaxY = baseY + p * 5
        imgRefs.current.forEach((el) => {
          if (el) el.style.backgroundPosition = `center ${parallaxY}%`
        })

        // ── 暖色グロー（日の出以降に滲む） ─────────────────────────────────
        // 進捗 0.5 あたりから徐々に現れ、0.85 でピーク後フェードアウト
        if (lightRef.current) {
          const raw = p < 0.85
            ? Math.max(0, (p - 0.50) / 0.35)
            : 1 - (p - 0.85) / 0.15
          lightRef.current.style.opacity = String(Math.min(1, raw) * 0.22)
        }

        // ── コピーの opacity ────────────────────────────────────────────────
        copyRefs.current.forEach((el, i) => {
          if (!el) return
          el.style.opacity = String(calcOp(p, COPIES[i]))
        })

        // ── スクロールインジケーターを序盤だけ表示 ──────────────────────────
        if (indicatorRef.current) {
          indicatorRef.current.style.opacity = String(Math.max(0, 1 - p * 18))
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    // 500vh のスクロール空間
    <div ref={wrapperRef} style={{ height: '500vh', position: 'relative' }}>

      {/* sticky 内部 — ビューポートに固定 */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          minHeight: '600px',
          overflow: 'hidden',
        }}
      >
        {/* 夜の地色 */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#06080f' }} />

        {/* 写真レイヤー群 */}
        {IMAGES.map((src, i) => (
          <div
            key={i}
            ref={(el) => { imgRefs.current[i] = el }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 22%',
              backgroundRepeat: 'no-repeat',
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity',
            }}
          />
        ))}

        {/* 暖色グロー（ホライゾン付近） */}
        <div
          ref={lightRef}
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 100% 40% at 50% 100%, rgba(255,160,60,0.9) 0%, rgba(255,100,20,0.4) 40%, transparent 70%)',
            opacity: 0,
            pointerEvents: 'none',
            willChange: 'opacity',
          }}
        />

        {/* 上下ビネット（極薄） */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.20) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* コピーレイヤー群 */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {COPIES.map((copy, i) => (
            <div
              key={i}
              ref={(el) => { copyRefs.current[i] = el }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '44%',
                transform: 'translateY(-50%)',
                display: 'flex',
                justifyContent: 'center',
                padding: '0 24px',
                opacity: i === 0 ? 1 : 0,
                willChange: 'opacity',
              }}
            >
              <p
                style={{
                  fontFamily:
                    '"Noto Serif JP", "YuMincho", "Yu Mincho", "游明朝", "ヒラギノ明朝 ProN", serif',
                  color: 'rgba(255, 255, 255, 0.90)',
                  fontSize: 'clamp(1.05rem, 2.6vw, 1.7rem)',
                  fontWeight: 300,
                  letterSpacing: '0.28em',
                  lineHeight: 2.4,
                  textShadow: '0 1px 14px rgba(0, 0, 0, 0.22)',
                  textAlign: 'center',
                  whiteSpace: 'pre-line',
                }}
              >
                {copy.text}
              </p>
            </div>
          ))}
        </div>

        {/* スクロールインジケーター */}
        <div
          ref={indicatorRef}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontFamily: '"Noto Sans JP", sans-serif',
              fontSize: '0.62rem',
              letterSpacing: '0.35em',
              color: 'rgba(255,255,255,0.35)',
              fontWeight: 300,
            }}
          >
            SCROLL
          </span>
          <div className="scroll-indicator-line" />
        </div>

      </div>
    </div>
  )
}
