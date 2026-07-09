"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// ─── Utilities ────────────────────────────────────────────────────────────────

function clamp(v: number, lo = 0, hi = 1) {
  return Math.max(lo, Math.min(hi, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * clamp(t);
}
function smoothstep(e0: number, e1: number, x: number) {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

type RGB = [number, number, number];

function lerpRGB(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function rgb([r, g, b]: RGB, a?: number) {
  const s = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
  return a !== undefined ? `rgba(${s},${a.toFixed(3)})` : `rgb(${s})`;
}

type KF = { p: number; c: RGB };

function getColor(kfs: KF[], progress: number): RGB {
  if (progress <= kfs[0].p) return kfs[0].c;
  const last = kfs[kfs.length - 1];
  if (progress >= last.p) return last.c;
  for (let i = 0; i < kfs.length - 1; i++) {
    const a = kfs[i], b = kfs[i + 1];
    if (progress >= a.p && progress <= b.p) {
      return lerpRGB(a.c, b.c, (progress - a.p) / (b.p - a.p));
    }
  }
  return last.c;
}

// ─── Sky Keyframes ────────────────────────────────────────────────────────────

const ZENITH: KF[] = [
  { p: 0.00, c: [0,   0,   0  ] },
  { p: 0.28, c: [1,   1,   10 ] },
  { p: 0.50, c: [3,   4,   24 ] },
  { p: 0.68, c: [8,   16,  58 ] },
  { p: 0.85, c: [16,  46,  115] },
  { p: 1.00, c: [34,  86,  182] },
];
const SKY_MID: KF[] = [
  { p: 0.00, c: [0,   0,   3  ] },
  { p: 0.30, c: [4,   4,   19 ] },
  { p: 0.48, c: [15,  10,  46 ] },
  { p: 0.62, c: [46,  24,  86 ] },
  { p: 0.75, c: [90,  56,  116] },
  { p: 0.87, c: [146, 106, 166] },
  { p: 1.00, c: [106, 146, 216] },
];
const HORIZON: KF[] = [
  { p: 0.00, c: [0,   0,   5  ] },
  { p: 0.34, c: [7,   5,   30 ] },
  { p: 0.48, c: [52,  15,  66 ] },
  { p: 0.58, c: [144, 42,  42 ] },
  { p: 0.68, c: [220, 80,  24 ] },
  { p: 0.82, c: [250, 172, 68 ] },
  { p: 1.00, c: [255, 214, 144] },
];

// ─── Stars ────────────────────────────────────────────────────────────────────

type Star = { x: number; y: number; r: number; o: number; sp: number; ph: number };

function makeStars(n: number): Star[] {
  let s = 99991;
  const rand = () => { s = ((s * 1664525 + 1013904223) | 0) >>> 0; return s / 0xffffffff; };
  return Array.from({ length: n }, () => ({
    x: rand(), y: rand() * 0.78, r: rand() * 1.1 + 0.25,
    o: rand() * 0.45 + 0.45, sp: rand() * 0.6 + 0.3, ph: rand() * Math.PI * 2,
  }));
}
const STARS = makeStars(240);

// ─── Copy ────────────────────────────────────────────────────────────────────

const COPIES = [
  { text: "夜明け前が、\n一番暗い。",                               s: 0.00, p: 0.055, e: 0.13 },
  { text: "人生には、\n夜がある。",                                  s: 0.12, p: 0.180, e: 0.27 },
  { text: "夜があるからこそ、\n夜明けは希望になる。",                   s: 0.26, p: 0.325, e: 0.42 },
  { text: "出来事は\n選べない。",                                    s: 0.41, p: 0.465, e: 0.56 },
  { text: "でも、\nその出来事を\nどう引き受けるかは、\n自分で選べる。",    s: 0.55, p: 0.615, e: 0.72 },
  { text: "人生は、\nその選択の積み重ねで\nできている。",                s: 0.71, p: 0.775, e: 0.87 },
  { text: "あなたは、\nこの出来事を、\nどう引き受けますか。",             s: 0.87, p: 0.930, e: 1.00 },
];

// ─── Canvas Draw ─────────────────────────────────────────────────────────────

function drawSky(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  progress: number,
  time: number
) {
  const horizonY = H * 0.68;

  // Sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);
  skyGrad.addColorStop(0,    rgb(getColor(ZENITH, progress)));
  skyGrad.addColorStop(0.52, rgb(getColor(SKY_MID, progress)));
  skyGrad.addColorStop(1,    rgb(getColor(HORIZON, progress)));
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, W, horizonY);

  // Stars
  const starFade = 1 - smoothstep(0.22, 0.66, progress);
  if (starFade > 0.004) {
    for (const star of STARS) {
      const twinkle = 0.72 + 0.28 * Math.sin(time * 0.00055 * star.sp + star.ph);
      const alpha = star.o * starFade * twinkle;
      ctx.beginPath();
      ctx.arc(star.x * W, star.y * horizonY, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  // Horizon atmospheric glow
  if (progress > 0.34) {
    const glowT = smoothstep(0.34, 0.66, progress);
    const warmT = smoothstep(0.66, 1.00, progress);
    const gR = Math.round(lerp(200, 255, warmT));
    const gG = Math.round(lerp(52, 186, warmT));
    const gB = Math.round(lerp(16, 80, warmT));
    const ellH = H * (0.19 + warmT * 0.12);
    const ellW = W * (0.50 + warmT * 0.50);

    ctx.save();
    ctx.translate(W / 2, horizonY);
    ctx.scale(ellW / ellH, 1);
    const glowGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, ellH);
    glowGrad.addColorStop(0,    `rgba(${gR},${gG},${gB},${(0.28 * glowT).toFixed(3)})`);
    glowGrad.addColorStop(0.45, `rgba(${gR},${gG},${gB},${(0.10 * glowT).toFixed(3)})`);
    glowGrad.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.arc(0, 0, ellH, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();
    ctx.restore();
  }

  // Ground (dark silhouette)
  const gv = Math.round(lerp(0, 11, smoothstep(0.66, 1.0, progress)));
  const groundGrad = ctx.createLinearGradient(0, horizonY, 0, H);
  groundGrad.addColorStop(0, `rgb(${gv},${Math.round(gv * 0.9)},${Math.round(gv * 0.65)})`);
  groundGrad.addColorStop(1, "rgb(0,0,0)");
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, horizonY, W, H - horizonY);

  // Sun
  if (progress > 0.60) {
    const sunT = smoothstep(0.60, 1.0, progress);
    const sunR = Math.min(W, H) * 0.044;
    const sunX = W / 2;
    const sunY = horizonY - sunT * H * 0.42;

    // Corona
    const coronaR = sunR * (5.5 + sunT * 5.5);
    const cR = 255, cG = Math.round(lerp(152, 220, sunT)), cB = Math.round(lerp(36, 130, sunT));
    const coronaGrad = ctx.createRadialGradient(sunX, sunY, sunR * 0.25, sunX, sunY, coronaR);
    coronaGrad.addColorStop(0,    `rgba(${cR},${cG},${cB},${(0.25 * sunT).toFixed(3)})`);
    coronaGrad.addColorStop(0.38, `rgba(${cR},${cG},${cB},${(0.09 * sunT).toFixed(3)})`);
    coronaGrad.addColorStop(1,    "rgba(0,0,0,0)");
    ctx.beginPath();
    ctx.arc(sunX, sunY, coronaR, 0, Math.PI * 2);
    ctx.fillStyle = coronaGrad;
    ctx.fill();

    // Sun disk (clipped above horizon)
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, W, horizonY + 1);
    ctx.clip();
    const diskGrad = ctx.createRadialGradient(sunX, sunY - sunR * 0.18, 0, sunX, sunY, sunR);
    diskGrad.addColorStop(0,    `rgba(255,255,248,${sunT.toFixed(3)})`);
    diskGrad.addColorStop(0.62, `rgba(255,226,106,${sunT.toFixed(3)})`);
    diskGrad.addColorStop(1,    `rgba(255,180,40,${sunT.toFixed(3)})`);
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fillStyle = diskGrad;
    ctx.fill();
    ctx.restore();
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DawnSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const copyRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef(0);
  const rafRef      = useRef(0);
  const startRef    = useRef(Date.now());
  const sizeRef     = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const section = sectionRef.current!;
    const canvas  = canvasRef.current!;

    // ── Canvas resize ──
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      sizeRef.current = { w, h };
      ScrollTrigger.refresh();
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Render loop ──
    const tick = () => {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const { w, h } = sizeRef.current;
        drawSky(ctx, w, h, progressRef.current, Date.now() - startRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // ── Copy update helper ──
    const updateCopies = (prog: number) => {
      COPIES.forEach((copy, i) => {
        const el = copyRefs.current[i];
        if (!el) return;
        let opacity = 0;
        if (prog >= copy.s && prog <= copy.e) {
          opacity = prog <= copy.p
            ? smoothstep(copy.s, copy.p, prog)
            : 1 - smoothstep(copy.p, copy.e, prog);
        }
        el.style.opacity = clamp(opacity).toFixed(3);

        // Warm text color gently at sunrise
        const warm = smoothstep(0.70, 0.96, prog);
        el.style.color = `rgb(255,${Math.round(lerp(255, 237, warm))},${Math.round(lerp(255, 206, warm))})`;
      });
    };

    // ── Lenis ──
    const lenis = new Lenis({ lerp: 0.08 });
    lenis.on("scroll", ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // ── GSAP ScrollTrigger: pin ──
    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${window.innerHeight * 7}`,
      pin: true,
      scrub: 1.4,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        updateCopies(self.progress);
      },
    });

    return () => {
      cancelAnimationFrame(rafRef.current);
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
      st.kill();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        background: "#000",
      }}
      aria-label="夜明け体験セクション"
    >
      {/* Sky canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />

      {/* Copy overlays */}
      {COPIES.map((copy, i) => (
        <div
          key={i}
          ref={(el) => { copyRefs.current[i] = el; }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: i === 0 ? 1 : 0,
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontFamily:
                '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", "游明朝", serif',
              fontWeight: 300,
              fontSize: "clamp(1.05rem, 2.6vw, 1.6rem)",
              lineHeight: 2.5,
              letterSpacing: "0.18em",
              textAlign: "center",
              whiteSpace: "pre-line",
              color: "inherit",
              textShadow:
                "0 2px 50px rgba(0,0,0,0.6), 0 0 130px rgba(0,0,0,0.25)",
            }}
          >
            {copy.text}
          </p>
        </div>
      ))}

      {/* Scroll hint */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.35,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            color: "#fff",
            fontFamily:
              '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "2.5rem",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0))",
          }}
        />
      </div>
    </section>
  );
}
