import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-asahi-200 bg-asahi-50 mt-8">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-sm tracking-wider text-asahi-700">
          株式会社旭コーチング
        </span>
        <div className="flex items-center gap-6">
          <Link
            href="/e-koukoku"
            className="text-xs tracking-wider text-asahi-700 hover:text-accent transition-colors"
          >
            電子公告
          </Link>
          <p className="text-xs tracking-wider text-asahi-700">
            &copy; 株式会社旭コーチング
          </p>
        </div>
      </div>
    </footer>
  );
}
