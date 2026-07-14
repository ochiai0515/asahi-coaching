'use client'

import { useEffect, useRef, useState } from 'react'

// ────────────────────────────────────────────────────────────────────────────
// 自動再生 Hero（映画的夜明け体験版）
//
// 総再生時間：49.5 秒（1回のみ・ループなし）
//
// ■ 画像切り替えの設計思想
//   クロスフェード 3.0s をコピーの「ギャップ」中心に配置することで、
//   「景色が変わった」ではなく「時間が進んだ」と感じさせる。
//   コピーが完全に消えた無言の間に背景が静かに溶け替わり、
//   次のコピーが現れる頃には次の情景に自然に移っている。
//
//   dawn-01 | 0.0 s → 8.9 s  （フェードアウト 5.9〜8.9）
//   dawn-02 | 5.9 s → 15.9s  （in 5.9-8.9 / out 12.9-15.9）
//   dawn-03 | 12.9s → 23.9s  （in 12.9-15.9 / out 20.9-23.9）
//   dawn-04 | 20.9s → 30.9s  （in 20.9-23.9 / out 27.9-30.9）
//   dawn-05 | 27.9s → end    （in 27.9-30.9 / フェードアウトなし）
//
// ■ コピー設計（前後を重ねない・無言の間を入れる）
//   Scene 1  0.0 → 7.0s   hold 4.5s（最長：最も読ませる）
//   Gap      7.0 → 7.8s   0.8s の無言
//   Scene 2  7.8 → 14.0s  hold 3.8s
//   Gap     14.0 → 14.8s
//   Scene 3 14.8 → 22.0s  hold 4.8s（3行コピー・長め）
//   Gap     22.0 → 22.8s
//   Scene 4 22.8 → 29.0s  hold 3.8s
//   Gap     29.0 → 29.8s
//   Scene 5 29.8 → 38.0s  hold 5.8s（5行コピー・最も長い）
//   Gap     38.0 → 38.8s
//   Scene 6 38.8 → 46.2s  hold 4.8s
//   余韻    46.2 → 49.5s  3.3s（dawn-05 のみ・文字なし）
//
// ■ Ken Burns
//   全画像共通ラッパーを 1.000 → 1.020 にゆっくりスケール（タイマー連動）
//   タブ非表示時は停止、復帰時に再開
// ────────────────────────────────────────────────────────────────────────────

const TOTAL = 51.5

// ── 画像タイムライン ─────────────────────────────────────────────────────────
//
// 設計原則：
//   各画像のフェードアウト開始 = 対応するコピーのフェードアウト開始（同タイミング）
//   → コピーが消え始めるのと背景が溶け始めるのを同時にすることで
//     「テロップが変わるのに背景は別タイミング」という違和感をなくす
//
//   コピー outStart → 画像フェードアウト開始（同秒）
//   コピー outEnd+gap → 画像フェードアウト中盤（約半分）
//   次コピー inEnd  → 画像フェードアウト完了（3.0s後）
//
interface ImgLayer {
  src: string
  inStart: number
  inEnd: number
  outStart: number | null
  outEnd: number | null
}

const IMAGES: ImgLayer[] = [
  { src: '/images/dawn-01-night.png',    inStart: 0,    inEnd: 0,    outStart: 7.7,  outEnd: 10.7 },
  { src: '/images/dawn-02-bluehour.png', inStart: 7.7,  inEnd: 10.7, outStart: 14.8, outEnd: 17.8 },
  { src: '/images/dawn-03-glow.png',     inStart: 14.8, inEnd: 17.8, outStart: 22.8, outEnd: 25.8 },
  { src: '/images/dawn-04-sunrise.png',  inStart: 22.8, inEnd: 25.8, outStart: 29.8, outEnd: 32.8 },
  { src: '/images/dawn-05-morning.png',  inStart: 29.8, inEnd: 32.8, outStart: null,  outEnd: null },
]

function imgOp(t: number, img: ImgLayer): number {
  const { inStart, inEnd, outStart, outEnd } = img
  if (t < inStart) return 0
  if (inEnd > inStart && t < inEnd) return (t - inStart) / (inEnd - inStart)
  if (outStart === null) return 1
  if (t < outStart) return 1
  if (outEnd !== null && t < outEnd) return 1 - (t - outStart) / (outEnd - outStart)
  return 0
}

// ── コピータイムライン ───────────────────────────────────────────────────────
interface CopyScene {
  text: string
  inStart: number
  inEnd: number
  outStart: number
  outEnd: number
}

const COPIES: CopyScene[] = [
  {
    text: '夜明け前が、\n一番暗い。',
    inStart: 2.0,  inEnd: 3.2,  outStart: 7.7,  outEnd: 9.0,   // hold 4.5s
  },
  {
    text: '人生には、\n夜がある。',
    inStart: 9.8,  inEnd: 11.0, outStart: 14.8, outEnd: 16.0,  // hold 3.8s
  },
  {
    text: '迷うことも。\n\n苦しむことも。\n\n立ち止まることも。',
    inStart: 16.8, inEnd: 18.0, outStart: 22.8, outEnd: 24.0,  // hold 4.8s
  },
  {
    text: '夜があるからこそ、\n夜明けは希望になる。',
    inStart: 24.8, inEnd: 26.0, outStart: 29.8, outEnd: 31.0,  // hold 3.8s
  },
  {
    text: '出来事は選べない。\n\nでも、\nその出来事をどう引き受けるかは、\n自分で選べる。',
    inStart: 31.8, inEnd: 33.0, outStart: 38.8, outEnd: 40.0,  // hold 5.8s
  },
  {
    text: '人生は、\nその選択の積み重ねで\nできている。',
    inStart: 40.8, inEnd: 42.0, outStart: 46.8, outEnd: 48.2,  // hold 4.8s
  },
]
// 48.2 → 51.5：朝の写真だけの余韻（3.3s）

function copyOp(t: number, copy: CopyScene): number {
  const { inStart, inEnd, outStart, outEnd } = copy
  if (t < inStart) return 0
  if (t < inEnd) return inEnd > inStart ? (t - inStart) / (inEnd - inStart) : 1
  if (t < outStart) return 1
  if (t < outEnd) return 1 - (t - outStart) / (outEnd - outStart)
  return 0
}

// ── コピー共通スタイル ────────────────────────────────────────────────────────
const COPY_STYLE: React.CSSProperties = {
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
}

// ────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [reducedMotion, setReducedMotion] = useState(false)

  // DOM refs（React state を使わず直接更新 → 再レンダー不要）
  const bgWrapperRef = useRef<HTMLDivElement>(null)
  const imgRefs      = useRef<(HTMLDivElement | null)[]>([])
  const copyRefs     = useRef<(HTMLDivElement | null)[]>([])

  // タイマー管理
  const rafRef    = useRef<number | null>(null)
  const baseRef   = useRef(0)
  const resumeRef = useRef<number | null>(null)
  const doneRef   = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    if (mq.matches) return

    const tick = () => {
      if (resumeRef.current === null) return
      const t = Math.min(
        baseRef.current + (performance.now() - resumeRef.current) / 1000,
        TOTAL
      )

      // 写真 opacity
      imgRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(imgOp(t, IMAGES[i]))
      })

      // コピー opacity
      copyRefs.current.forEach((el, i) => {
        if (el) el.style.opacity = String(copyOp(t, COPIES[i]))
      })

      // Ken Burns（タイマー連動 → タブ非表示中は停止）
      if (bgWrapperRef.current) {
        const scale = 1.0 + (t / TOTAL) * 0.02
        bgWrapperRef.current.style.transform = `scale(${scale})`
      }

      if (t < TOTAL) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        doneRef.current = true
      }
    }

    // 200ms 遅延でページロード完了後に開始
    const startTimer = setTimeout(() => {
      resumeRef.current = performance.now()
      tick()
    }, 200)

    const onVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
        if (resumeRef.current !== null) {
          baseRef.current = Math.min(
            baseRef.current + (performance.now() - resumeRef.current) / 1000,
            TOTAL
          )
          resumeRef.current = null
        }
      } else if (!doneRef.current) {
        resumeRef.current = performance.now()
        tick()
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      clearTimeout(startTimer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  // ── prefers-reduced-motion: 静止表示 ─────────────────────────────────────
  if (reducedMotion) {
    return (
      <div style={{ height: '100svh', minHeight: '600px', position: 'relative', overflow: 'hidden' }}>
        <div
          className="hero-photo"
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'url(/images/dawn-01-night.png)',
            backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
            backgroundColor: '#06080f',
          }}
        />
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.20) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute', left: 0, right: 0, top: '44%',
            transform: 'translateY(-50%)',
            display: 'flex', justifyContent: 'center', padding: '0 24px',
          }}
        >
          <p style={COPY_STYLE}>夜明け前が、一番暗い。</p>
        </div>
      </div>
    )
  }

  // ── 通常再生 ──────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100svh', minHeight: '600px', position: 'relative', overflow: 'hidden' }}>

      {/* Ken Burns ラッパー（端切れ防止のため -1% 拡張） */}
      <div
        ref={bgWrapperRef}
        style={{
          position: 'absolute',
          inset: '-1%',
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {/* 夜の地色 */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#06080f' }} />

        {/* 写真レイヤー群（全枚同一 backgroundPosition で構図ずれを最小化） */}
        {IMAGES.map((img, i) => (
          <div
            key={i}
            ref={(el) => { imgRefs.current[i] = el }}
            className="hero-photo"
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${img.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              opacity: i === 0 ? 1 : 0,
              willChange: 'opacity',
            }}
          />
        ))}
      </div>

      {/* 上下ビネット（極薄・写真の縁を落ち着かせる） */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.20) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* コピーレイヤー群（一度に1つのみ表示） */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {COPIES.map((copy, i) => (
          <div
            key={i}
            ref={(el) => { copyRefs.current[i] = el }}
            style={{
              position: 'absolute', left: 0, right: 0,
              top: '44%', transform: 'translateY(-50%)',
              display: 'flex', justifyContent: 'center',
              padding: '0 24px',
              opacity: 0,
              willChange: 'opacity',
            }}
          >
            <p style={COPY_STYLE}>{copy.text}</p>
          </div>
        ))}
      </div>

    </div>
  )
}
