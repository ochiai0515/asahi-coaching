import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-asahi-800">
      <Header />

      <Hero />

      {/* 静かな一文
          Hero最後の dawn-05（朝の写真）からゆっくり生成り色へつなぐ橋渡しセクション。
          上端は写真が透けて見え、下へいくほど生成り色が安定する。
          急に白背景へ切り替えない。この一文を読んでから本文へ。 */}
      <section
        className="relative flex items-center justify-center"
        style={{
          height: '100svh',
          minHeight: '500px',
          backgroundColor: '#f4ede3',  /* 生成り色ベース */
        }}
      >
        {/* dawn-05 の余韻レイヤー（上部で透けて見える） */}
        <div
          className="absolute inset-0 hero-photo"
          style={{
            backgroundImage: 'url(/images/dawn-05-morning.png)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.22,
          }}
        />
        {/* グラデーションオーバーレイ：上は透明（写真が透ける）→ 下は完全な生成り色
            文字が置かれる中央付近（50〜60%）ではほぼ不透明になり読みやすい */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'linear-gradient(to bottom,',
              'rgba(244, 237, 227, 0.10) 0%,',
              'rgba(244, 237, 227, 0.45) 25%,',
              'rgba(244, 237, 227, 0.80) 48%,',
              'rgba(244, 237, 227, 0.96) 65%,',
              'rgba(244, 237, 227, 1.00) 80%)',
            ].join(' '),
            pointerEvents: 'none',
          }}
        />
        <p
          className="relative"
          style={{
            fontFamily:
              '"Noto Serif JP", "YuMincho", "Yu Mincho", "游明朝", "ヒラギノ明朝 ProN", serif',
            color: '#1e1814',
            fontSize: 'clamp(1rem, 2.2vw, 1.3rem)',
            fontWeight: 300,
            letterSpacing: '0.30em',
            lineHeight: 1.8,
          }}
        >
          夜は、人生の一部である。
        </p>
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

      <Footer />
    </div>
  );
}
