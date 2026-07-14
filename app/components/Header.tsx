'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Hero は 100svh のため、ビューポート高さを超えたら白背景へ切り替え
    const handle = () => setScrolled(window.scrollY >= window.innerHeight * 0.9);
    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-asahi-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-medium tracking-wider transition-colors hover:text-accent"
          style={{ color: scrolled ? undefined : 'rgba(200,210,230,0.9)' }}
        >
          株式会社旭コーチング
        </Link>
        <nav
          className="hidden md:flex items-center gap-8 text-sm tracking-wide"
          style={{ color: scrolled ? undefined : 'rgba(200,210,230,0.85)' }}
        >
          <a
            href="/#greeting"
            className={`hover:text-accent transition-colors ${scrolled ? 'text-asahi-700' : ''}`}
          >
            代表挨拶
          </a>
          <a
            href="/#services"
            className={`hover:text-accent transition-colors ${scrolled ? 'text-asahi-700' : ''}`}
          >
            事業内容
          </a>
          <a
            href="/#company"
            className={`hover:text-accent transition-colors ${scrolled ? 'text-asahi-700' : ''}`}
          >
            会社概要
          </a>
          <a
            href="/#contact"
            className={`hover:text-accent transition-colors ${scrolled ? 'text-asahi-700' : ''}`}
          >
            お問い合わせ
          </a>
        </nav>
      </div>
    </header>
  );
}
