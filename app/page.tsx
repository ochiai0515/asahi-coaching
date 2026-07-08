export default function Home() {
  return (
    <div className="min-h-screen bg-white text-asahi-800">
      {/* Header / Navigation */}
      <header className="border-b border-asahi-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-lg font-medium tracking-wider text-asahi-800">
              株式会社旭コーチング
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm tracking-wide text-asahi-700">
            <a href="#greeting" className="hover:text-accent transition-colors">
              代表挨拶
            </a>
            <a href="#services" className="hover:text-accent transition-colors">
              事業内容
            </a>
            <a href="#company" className="hover:text-accent transition-colors">
              会社概要
            </a>
            <a href="#contact" className="hover:text-accent transition-colors">
              お問い合わせ
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-asahi-50 border-b border-asahi-200">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-36">
          <p className="text-sm tracking-[0.3em] text-accent mb-6 uppercase">
            Asahi Coaching Co., Ltd.
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-[0.12em] text-asahi-800 leading-relaxed">
            生命力が躍動する
            <br />
            舞台をつくる
          </h1>
          <div className="mt-8 w-12 h-px bg-accent"></div>
        </div>
      </section>

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
                { label: "会社名", value: "株式会社旭コーチング" },
                { label: "代表取締役", value: "菅原 俊彦" },
                { label: "所在地", value: "茨城県古河市" },
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

      {/* Footer */}
      <footer className="border-t border-asahi-200 bg-asahi-50 mt-8">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm tracking-wider text-asahi-700">
            株式会社旭コーチング
          </span>
          <p className="text-xs tracking-wider text-asahi-700">
            &copy; 株式会社旭コーチング
          </p>
        </div>
      </footer>
    </div>
  );
}
