import DawnSection from "./components/DawnSection";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      {/* ── 夜明け体験 ─────────────────────────────────────── */}
      <DawnSection />

      {/* ── 旭コーチングの役割（移行セクション） ────────────── */}
      <section
        className="bg-white"
        style={{ borderTop: "1px solid #e8e6df" }}
      >
        <div className="max-w-2xl mx-auto px-6 py-28 md:py-40">
          <p className="text-xs tracking-[0.35em] text-[#8b6914] mb-10 uppercase">
            Our Role
          </p>
          <h2
            className="text-2xl md:text-3xl font-light tracking-[0.1em] text-[#2e2e24] leading-relaxed mb-12"
            style={{ fontFamily: '"Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", serif' }}
          >
            旭コーチングの役割
          </h2>
          <p className="text-sm md:text-base leading-[2.4] tracking-wider text-[#4a4a3e] font-light mb-6">
            私たちは、対話と伴走、そして環境を整えることで、
            <br className="hidden sm:block" />
            その人自身が、主人公として歩き出すための舞台を整えます。
          </p>
          <p className="text-sm md:text-base leading-[2.4] tracking-wider text-[#4a4a3e] font-light mb-14">
            答えは、あなたの中にある。
            <br className="hidden sm:block" />
            その答えが動き出す瞬間まで、私たちは、そばにいます。
          </p>
          <a
            href="#greeting"
            className="inline-block text-sm tracking-[0.2em] text-[#8b6914] border border-[#8b6914] px-8 py-3 hover:bg-[#8b6914] hover:text-white transition-colors duration-300"
          >
            私たちについて
          </a>
        </div>
      </section>

      {/* ── コーポレートサイト ───────────────────────────────── */}
      <div className="min-h-screen bg-white text-asahi-800">
        <Header />

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-6 py-20 space-y-24">
          {/* 代表挨拶 */}
          <section id="greeting" className="scroll-mt-20">
            <h2 className="section-heading">代表挨拶</h2>
            <div className="max-w-2xl">
              <p className="text-base md:text-lg leading-[2.2] tracking-wider text-asahi-800 font-light">
                株式会社旭コーチングは、
                <br />
                人・組織・地域が本来持っている力を引き出し、
                <br />
                主体性が立ち上がる環境づくりを支援します。
              </p>
              <div className="mt-10 pt-8 border-t border-asahi-200">
                <p className="text-sm tracking-wider text-asahi-700">
                  代表取締役
                </p>
                <p className="mt-1 text-xl tracking-widest text-asahi-800">
                  菅原 俊彦
                </p>
              </div>
            </div>
          </section>

          {/* 事業内容 */}
          <section id="services" className="scroll-mt-20">
            <h2 className="section-heading">事業内容</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  title: "人材育成・組織開発",
                  desc: "個人と組織の成長を一体的に支援します。",
                },
                {
                  title: "コーチング",
                  desc: "対話を通じて本来の力を引き出します。",
                },
                {
                  title: "教育・研修",
                  desc: "現場に根ざした実践的な学びを提供します。",
                },
                {
                  title: "講演",
                  desc: "経験と知見をもとに示唆に富む講演を行います。",
                },
                {
                  title: "子ども支援",
                  desc: "子どもの主体性と可能性を育む環境をつくります。",
                },
                {
                  title: "組織コンサルティング",
                  desc: "組織課題を丁寧に紐解き、変革を伴走します。",
                },
              ].map((service) => (
                <div
                  key={service.title}
                  className="border border-asahi-200 bg-asahi-50 p-6"
                >
                  <h3 className="text-base font-medium tracking-wider text-asahi-800 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-asahi-700 font-light">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 会社概要 */}
          <section id="company" className="scroll-mt-20">
            <h2 className="section-heading">会社概要</h2>
            <div className="max-w-2xl">
              <dl className="divide-y divide-asahi-200">
                {[
                  { label: "会社名",     value: "株式会社旭コーチング" },
                  { label: "代表取締役", value: "菅原 俊彦" },
                  { label: "所在地",     value: "茨城県古河市" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="py-5 sm:grid sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="text-sm font-medium tracking-wider text-asahi-700 mb-1 sm:mb-0">
                      {item.label}
                    </dt>
                    <dd className="text-sm tracking-wider text-asahi-800 sm:col-span-2">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          {/* お問い合わせ */}
          <section id="contact" className="scroll-mt-20">
            <h2 className="section-heading">お問い合わせ</h2>
            <div className="max-w-2xl">
              <div className="border border-asahi-200 bg-asahi-50 p-8">
                <p className="text-sm tracking-wider text-asahi-700 leading-relaxed">
                  お問い合わせ窓口は現在準備中です。
                  <br />
                  今しばらくお待ちいただきますようお願い申し上げます。
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
