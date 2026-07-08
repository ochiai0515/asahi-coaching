import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "電子公告｜株式会社旭コーチング",
  description:
    "株式会社旭コーチングの電子公告ページです。会社法第939条の規定に基づき、公告事項を掲載します。",
  robots: {
    index: true,
    follow: true,
  },
};

export default function EKoukoku() {
  return (
    <div className="min-h-screen bg-white text-asahi-800">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-20">
        <h1 className="section-heading">電子公告</h1>

        <div className="max-w-2xl space-y-10">
          <p className="text-sm leading-[2] tracking-wider text-asahi-800">
            当社の公告は、会社法第939条の規定に基づき、このページに掲載します。
          </p>

          <div className="border border-asahi-200 bg-asahi-50 p-8">
            <p className="text-sm tracking-wider text-asahi-700">
              現在、公告すべき事項はありません。
            </p>
          </div>

          <div className="pt-4 border-t border-asahi-200 space-y-2">
            <p className="text-sm tracking-wider text-asahi-700">
              制定日　2026年7月7日
            </p>
            <p className="text-sm tracking-wider text-asahi-800">
              株式会社旭コーチング
            </p>
            <p className="text-sm tracking-wider text-asahi-800">
              代表取締役　菅原俊彦
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
