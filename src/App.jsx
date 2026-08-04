const DL = 'https://dl.openexam.cc'
const RELEASE = {
  version: '0.2.2',
  github: 'https://github.com/lmk1010/OpenExam',
  macDmg: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.dmg`,
  macZip: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.zip`,
  winExe: `${DL}/v0.2.2/OpenExam-0.2.2-win-x64.exe`,
}

function detectPlatform() {
  if (typeof navigator === 'undefined') return 'mac'
  return navigator.userAgent.toLowerCase().includes('windows') ? 'win' : 'mac'
}

export default function App() {
  const platform = detectPlatform()
  const primaryHref = platform === 'win' ? RELEASE.winExe : RELEASE.macDmg
  const primaryLabel = platform === 'win' ? '下载 Windows' : '下载 macOS'

  return (
    <div className="page">
      <header className="top">
        <a className="logo" href="/">
          <img src="/brand/app-icon.png" alt="" width="28" height="28" />
          <span>OpenExam</span>
        </a>
        <div className="top-right">
          <a href={RELEASE.github} target="_blank" rel="noreferrer">GitHub</a>
          <a className="top-dl" href={primaryHref}>{primaryLabel}</a>
        </div>
      </header>

      <main className="hero">
        <p className="eyebrow">本地优先 · 桌面端</p>
        <h1>OpenExam</h1>
        <p className="lead">本地备考工作台。题库、练习、AI 辅导，数据留在你的电脑上。</p>

        <div className="actions">
          <a className="primary" href={primaryHref}>{primaryLabel}</a>
          <div className="alts">
            <a href={RELEASE.macDmg}>macOS DMG</a>
            <span>·</span>
            <a href={RELEASE.macZip}>ZIP</a>
            <span>·</span>
            <a href={RELEASE.winExe}>Windows</a>
          </div>
        </div>
        <p className="meta">v{RELEASE.version}</p>
      </main>

      <section className="shot" aria-label="产品界面">
        <img src="/brand/demo1.png" alt="OpenExam 学习中心" />
      </section>

      <footer className="foot">
        <span>OpenExam</span>
        <a href={RELEASE.github} target="_blank" rel="noreferrer">源码</a>
      </footer>
    </div>
  )
}
