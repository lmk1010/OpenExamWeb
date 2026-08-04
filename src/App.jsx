const DL = 'https://dl.openexam.cc'
const RELEASE = {
  version: '0.2.2',
  tag: 'v0.2.2',
  github: 'https://github.com/lmk1010/OpenExam',
  releases: 'https://github.com/lmk1010/OpenExam/releases/latest',
  macDmg: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.dmg`,
  macZip: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.zip`,
  winExe: `${DL}/v0.2.2/OpenExam-0.2.2-win-x64.exe`,
}

const CAPABILITIES = [
  {
    title: '本地题库',
    copy: '内置国考省考行测真题，资料图表与解析本地可读，离线也能刷。',
  },
  {
    title: 'AI 出卷与导师',
    copy: '按知识点组卷，讲题追问、举一反三，把练习变成可复盘的学习流。',
  },
  {
    title: '成长闭环',
    copy: '错题本、练习历史、成就与学习日历沉淀在本地，长期属于你。',
  },
]

function detectPlatform() {
  if (typeof navigator === 'undefined') return 'mac'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('windows')) return 'win'
  return 'mac'
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function App() {
  const platform = detectPlatform()
  const primaryHref = platform === 'win' ? RELEASE.winExe : RELEASE.macDmg
  const primaryLabel = platform === 'win' ? '下载 Windows 安装包' : '下载 macOS 客户端'

  return (
    <div className="page">
      <div className="atmosphere" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="nav">
        <a className="brand" href="#top" aria-label="OpenExam">
          <img src="/brand/app-icon.png" alt="" className="brand-mark" />
          <span className="brand-name">OpenExam</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#capabilities">能力</a>
          <a href="#download">下载</a>
          <a href={RELEASE.github} target="_blank" rel="noreferrer">GitHub</a>
        </nav>
        <a className="nav-cta" href={primaryHref}>
          下载客户端
          <Arrow />
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <p className="hero-brand">OpenExam</p>
          <h1 className="hero-title">
            本地优先的
            <br />
            <em>备考工作台</em>
          </h1>
          <p className="hero-copy">
            规划练习、AI 辅导、错题复盘，默认都在你的电脑上完成。
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href={primaryHref}>
              {primaryLabel}
              <Arrow />
            </a>
            <a className="btn btn-ghost" href="#download">
              全部平台
            </a>
          </div>
          <p className="hero-meta">v{RELEASE.version} · macOS / Windows · 本地 SQLite</p>
        </section>

        <section className="stage" aria-label="产品预览">
          <div className="stage-frame">
            <div className="stage-chrome">
              <span />
              <span />
              <span />
              <strong>OpenExam</strong>
            </div>
            <img src="/brand/demo5.png" alt="OpenExam 桌面端界面预览" className="stage-shot" />
          </div>
        </section>

        <section id="capabilities" className="section capabilities">
          <div className="section-head">
            <h2>为认真备考而造</h2>
            <p>不是网页刷题页，是装在本机的完整训练工作台。</p>
          </div>
          <ul className="capability-list">
            {CAPABILITIES.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section gallery" aria-label="更多界面">
          <div className="gallery-track">
            <figure>
              <img src="/brand/demo1.png" alt="学习中心" />
              <figcaption>学习中心</figcaption>
            </figure>
            <figure>
              <img src="/brand/demo2.png" alt="成长与成就" />
              <figcaption>成长与成就</figcaption>
            </figure>
            <figure>
              <img src="/brand/demo3.png" alt="AI 智能导师" />
              <figcaption>AI 智能导师</figcaption>
            </figure>
          </div>
        </section>

        <section id="download" className="section download">
          <div className="section-head">
            <h2>下载 OpenExam</h2>
            <p>当前最新正式版 v{RELEASE.version}，经 dl.openexam.cc 分发。</p>
          </div>
          <div className="download-grid">
            <a className="download-item is-primary" href={RELEASE.macDmg}>
              <span className="download-os">macOS</span>
              <strong>Apple Silicon · DMG</strong>
              <em>推荐安装包</em>
            </a>
            <a className="download-item" href={RELEASE.macZip}>
              <span className="download-os">macOS</span>
              <strong>Apple Silicon · ZIP</strong>
              <em>便携解压</em>
            </a>
            <a className="download-item" href={RELEASE.winExe}>
              <span className="download-os">Windows</span>
              <strong>x64 · EXE</strong>
              <em>安装程序</em>
            </a>
          </div>
          <a className="download-all" href={RELEASE.releases} target="_blank" rel="noreferrer">
            查看全部发布版本
            <Arrow />
          </a>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/brand/logo.png" alt="" />
          <div>
            <strong>OpenExam</strong>
            <p>本地优先 · AI 备考桌面应用</p>
          </div>
        </div>
        <div className="footer-links">
          <a href={RELEASE.github} target="_blank" rel="noreferrer">源码</a>
          <a href={RELEASE.releases} target="_blank" rel="noreferrer">Releases</a>
        </div>
      </footer>
    </div>
  )
}
