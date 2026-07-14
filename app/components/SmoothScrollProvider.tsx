'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ────────────────────────────────────────────────────────────────────────────
// Lenis + GSAP ScrollTrigger の初期化
//
// ・lerp: 0.065 — 重厚感のある慣性スクロール
// ・Lenis の scroll イベントで ScrollTrigger を同期
// ・GSAP ticker で Lenis.raf を駆動（rAF を統合）
// ────────────────────────────────────────────────────────────────────────────

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({ lerp: 0.065 })

    lenis.on('scroll', ScrollTrigger.update)

    function onFrame(time: number) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onFrame)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(onFrame)
    }
  }, [])

  return <>{children}</>
}
