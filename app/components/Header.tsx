import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-asahi-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-medium tracking-wider text-asahi-800 hover:text-accent transition-colors"
        >
          株式会社旭コーチング
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-asahi-700">
          <a href="/#greeting" className="hover:text-accent transition-colors">
            代表挨拶
          </a>
          <a href="/#services" className="hover:text-accent transition-colors">
            事業内容
          </a>
          <a href="/#company" className="hover:text-accent transition-colors">
            会社概要
          </a>
          <a href="/#contact" className="hover:text-accent transition-colors">
            お問い合わせ
          </a>
        </nav>
      </div>
    </header>
  );
}
