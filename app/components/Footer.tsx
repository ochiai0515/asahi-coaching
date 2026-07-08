import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-asahi-200 bg-asahi-50 mt-8">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col items-center gap-6">
        <nav className="flex items-center gap-8 text-sm tracking-wider text-asahi-700">
          <a href="/#company" className="hover:text-accent transition-colors">
            会社概要
          </a>
          <span className="text-asahi-200">|</span>
          <a href="/#contact" className="hover:text-accent transition-colors">
            お問い合わせ
          </a>
          <span className="text-asahi-200">|</span>
          <Link href="/e-koukoku" className="hover:text-accent transition-colors">
            電子公告
          </Link>
        </nav>
        <p className="text-xs tracking-wider text-asahi-700">
          &copy; 2026 株式会社旭コーチング
        </p>
      </div>
    </footer>
  );
}
