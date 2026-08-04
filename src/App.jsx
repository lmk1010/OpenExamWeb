import { useState } from 'react'
import { DOWNLOADS, FAQ, FEATURES, PRIMARY, RELEASE } from './data.js'
import {
  Arrow,
  Footer,
  Icon,
  Nav,
  usePlatform,
  useReveal,
  useRoute,
  useTheme,
} from './ui.jsx'

function Home({ go, platform, theme }) {
  // 深色站配深色截图、浅色站配浅色截图。桌面端截图目前只有浅色一版，
  // 深色版补齐前先沿用它，不然图和页面差着一个色调，看着像贴错了。
  const light = theme === 'light'
  const shot = (name) => `/shots/${name}-${light ? 'light' : 'dark'}.jpg`
  const desk = light ? '/brand/desk-light.png' : '/brand/desk-dark.png'
  const primary = PRIMARY[platform]
  const [open, setOpen] = useState(0)

  return (
    <>
      <section className="hero">
        <a className="eyebrow" href={RELEASE.githubApp} target="_blank" rel="noreferrer">
          <span className="dot" />
          手机端 v{RELEASE.appVersion} 已发布
          <Arrow />
        </a>
        <h1>
          把整个题库
          <br />
          装进自己的设备
        </h1>
        <p className="lead">
          15936 道真题、137 套历年卷，连图一起打包。做题、模考、错题复盘、成绩统计全程离线，
          数据只留在你自己手上。
        </p>
        <div className="cta">
          <a className="btn btn-lg" href={primary.href}>
            {primary.label}
          </a>
          <a
            className="btn btn-lg btn-ghost"
            href="/download"
            onClick={(e) => {
              e.preventDefault()
              go('/download')
            }}
          >
            全部版本
          </a>
        </div>
        <p className="meta">
          桌面端 v{RELEASE.version} · 手机端 v{RELEASE.appVersion} · 免费开源
        </p>
      </section>

      <section className="showcase" id="shots">
        <div className="frame">
          <img src={desk} alt="OpenExam 桌面端学习中心" />
        </div>
        <img className="phone" src={shot('home')} alt="OpenExam 手机端练习首页" loading="lazy" />
      </section>

      <section className="stats" data-reveal>
        {[
          ['15,936', '道真题'],
          ['137', '套历年卷'],
          ['4,230', '张题目配图'],
          ['0', '次联网请求'],
        ].map(([n, l]) => (
          <div key={l} className="stat">
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </section>

      <section className="features" id="features" data-reveal>
        <h2>刷题该有的样子</h2>
        <p className="sub">不做社区，不做排行榜。把做题、复盘、看进步这三件事做扎实。</p>
        <div className="grid">
          {FEATURES.map((f) => (
            <article key={f.title} className="card">
              <span className="card-icon">
                <Icon name={f.icon} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split" data-reveal>
        <div className="split-text">
          <span className="tag">桌面端</span>
          <h2>做完一套，报告立刻摆在眼前</h2>
          <p>
            正确率趋势、分类正确率、逐题分布、和历史平均的对比，一屏看完。
            错的题一键重做，看不懂的直接问 AI。
          </p>
        </div>
        <div className="split-shot">
          <img src="/brand/report-dark.png" alt="OpenExam 桌面端成绩报告" loading="lazy" />
        </div>
      </section>

      <section className="split reverse" data-reveal>
        <div className="split-text">
          <span className="tag">成就</span>
          <h2>练到哪一步，自己看得见</h2>
          <p>
            题量、坚持、精度、考场、攻坚五类成就，铜银金铂四个等级。
            全部按本机数据算，达成时当场弹出来。
          </p>
        </div>
        <div className="split-shot">
          <img src="/brand/badge-desk-dark.png" alt="OpenExam 成就解锁" loading="lazy" />
        </div>
      </section>

      <section className="gallery" data-reveal>
        <figure>
          <img src={shot('wrong-book')} alt="错题本" loading="lazy" />
          <figcaption>错题本 · 先看分布再逐题过</figcaption>
        </figure>
        <figure>
          <img src={shot('stats')} alt="学习统计" loading="lazy" />
          <figcaption>统计 · 题量、正确率与走势</figcaption>
        </figure>
        <figure>
          <img src={shot('badge')} alt="成就徽章" loading="lazy" />
          <figcaption>成就 · 按本机数据计算</figcaption>
        </figure>
      </section>

      <section className="faq" data-reveal>
        <h2>常见问题</h2>
        <div className="faq-list">
          {FAQ.map((item, i) => (
            <div key={item.q} className={`faq-item${open === i ? ' open' : ''}`}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{item.q}</span>
                <i />
              </button>
              <div className="faq-body">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="closing" data-reveal>
        <h2>装上就能开始刷</h2>
        <p>不用注册，不用联网，题库已经在安装包里了。</p>
        <a
          className="btn btn-lg"
          href="/download"
          onClick={(e) => {
            e.preventDefault()
            go('/download')
          }}
        >
          去下载
        </a>
      </section>
    </>
  )
}

function Download({ platform }) {
  const order = [platform === 'win' ? 'win' : platform === 'android' ? 'android' : 'mac']
  const cards = [...DOWNLOADS].sort(
    (a, b) => order.indexOf(b.key) - order.indexOf(a.key),
  )

  return (
    <section className="dl-page">
      <header className="dl-head">
        <h1>下载 OpenExam</h1>
        <p>
          桌面端 v{RELEASE.version} · 手机端 v{RELEASE.appVersion}。题库随安装包分发，
          装完即用，不需要注册或联网。
        </p>
      </header>

      <div className="dl-cards">
        {cards.map((d) => (
          <article key={d.key} className={`dl-card${d.key === order[0] ? ' current' : ''}`}>
            <div className="dl-card-head">
              <span className="dl-os">
                <Icon name={d.key === 'mac' ? 'apple' : d.key === 'win' ? 'windows' : 'android'} size={19} />
              </span>
              <div>
                <h2>{d.platform}</h2>
                <p>{d.note}</p>
              </div>
              {d.key === order[0] ? <span className="dl-badge">你的设备</span> : null}
            </div>
            <ul className="dl-files">
              {d.files.map((f) => (
                <li key={f.href}>
                  <a className={f.primary ? 'btn btn-block' : 'file-link'} href={f.href}>
                    {f.label}
                    <em>{f.size}</em>
                  </a>
                </li>
              ))}
            </ul>
            <p className="dl-ver">版本 {d.version}</p>
          </article>
        ))}
      </div>

      <div className="dl-notes">
        <div>
          <h3>安装遇到提示怎么办</h3>
          <p>
            macOS 首次打开若提示「无法验证开发者」，在「系统设置 → 隐私与安全性」里点一次「仍要打开」。
            Windows 的 SmartScreen 提示选「更多信息 → 仍要运行」。安装包没有做数字签名，因为签名证书是按年付费的。
          </p>
        </div>
        <div>
          <h3>Android 装哪个包</h3>
          <p>
            2018 年之后的机器基本都是 arm64，选第一个就行；实在不确定就下通用包，它把所有架构都带上了，
            代价是大 15 MB。安装时系统会提示「来自未知来源」，允许一次即可。
          </p>
        </div>
        <div>
          <h3>更新怎么走</h3>
          <p>
            两端都不会自动更新，也不会后台联网检查版本。新版发布后回到这一页下载覆盖安装即可，
            本机的答题记录和错题不会丢。
          </p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [path, go] = useRoute()
  useReveal()
  const platform = usePlatform()
  const [theme, toggleTheme] = useTheme()

  return (
    <div className="page">
      <div className="glow" aria-hidden="true" />
      <Nav go={go} path={path} theme={theme} onToggleTheme={toggleTheme} platform={platform} />
      <main>
        {path === '/download' ? (
          <Download platform={platform} />
        ) : (
          <Home go={go} platform={platform} theme={theme} />
        )}
      </main>
      <Footer go={go} />
    </div>
  )
}
