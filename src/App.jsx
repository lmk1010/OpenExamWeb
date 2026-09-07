import { useState } from 'react'
import {
  BANK_GROUPS,
  BANK_STEPS,
  DOWNLOADS,
  FAQ,
  FEATURES,
  PRIMARY,
  RELEASE,
} from './data.js'
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
  const light = theme === 'light'
  const shot = (name) => `/shots/${name}-${light ? 'light' : 'dark'}.jpg`
  const desk = light ? '/brand/desk-light.png' : '/brand/desk-dark.png'
  const primary = PRIMARY[platform]
  const [open, setOpen] = useState(0)

  return (
    <>
      <section className="hero">
        <a
          className="eyebrow"
          href={RELEASE.githubApp}
          target="_blank"
          rel="noreferrer"
          data-reveal
        >
          <span className="eyebrow-mark">
            <Icon name="spark" size={12} />
          </span>
          Android 平板 / 手机 v{RELEASE.appVersion}
          <Arrow size={13} />
        </a>
        <h1 data-reveal data-delay="1">
          把整个题库
          <br />
          装进自己的设备
        </h1>
        <p className="lead" data-reveal data-delay="2">
          题库装在本机，做题、模考、复盘全程离线。
        </p>
        <div className="cta" data-reveal data-delay="3">
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
        <p className="meta" data-reveal data-delay="4">
          Android v{RELEASE.appVersion} · 桌面端 v{RELEASE.version} · 免费开源
        </p>
      </section>

      <section className="showcase" id="shots" data-reveal data-delay="2">
        <div className="device-stage">
          <figure className="device ipad">
            <div className="ipad-body">
              <div className="ipad-glass">
                <span className="ipad-cam" aria-hidden="true" />
                <img
                  src="/brand/tablet-classic-screen.jpg"
                  alt="OpenExam iPad 横屏 · 经典蓝色界面"
                />
              </div>
            </div>
          </figure>
          <figure className="device iphone">
            <div className="iphone-body">
              <div className="iphone-glass">
                <span className="iphone-island" aria-hidden="true" />
                <img
                  src="/brand/phone-classic-screen.jpg"
                  alt="OpenExam iPhone · 经典蓝色界面"
                  loading="lazy"
                />
                <span className="iphone-bar" aria-hidden="true" />
              </div>
            </div>
          </figure>
        </div>
        <p className="showcase-caption">iPad 横屏分栏 · iPhone 单手刷题</p>
      </section>

      <section className="stats" data-reveal>
        {[
          ['15,936', '道真题'],
          ['137', '套历年卷'],
          ['4,230', '张题目配图'],
          ['0', '次联网请求'],
        ].map(([n, l], i) => (
          <div key={l} className="stat" style={{ '--i': i }}>
            <strong>{n}</strong>
            <span>{l}</span>
          </div>
        ))}
      </section>

      <section className="features" id="features" data-reveal>
        <header className="section-head">
          <h2>刷题该有的样子</h2>
          <p className="sub">做题、复盘、看进步，三件事做扎实。</p>
        </header>
        <ul className="feature-list">
          {FEATURES.map((f) => (
            <li key={f.title} className="feature-item">
              <span className="feature-ico">
                <Icon name={f.icon} size={20} />
              </span>
              <div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="desktop-band" data-reveal>
        <div className="desktop-copy">
          <p className="kicker">桌面端 · macOS / Windows</p>
          <h2>大屏也有完整客户端</h2>
          <p>
            学习中心、题库、模考、成绩报告都在电脑上。手机平板刷题，回到桌面复盘，
            两端各干各的事。
          </p>
          <a className="text-link" href={PRIMARY.mac.href}>
            下载 macOS 版 <Arrow size={14} />
          </a>
        </div>
        <div className="desktop-shot">
          <div className="desk-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <img src={desk} alt="OpenExam 桌面端学习中心" loading="lazy" />
        </div>
      </section>

      <section className="split" data-reveal>
        <div className="split-text">
          <p className="kicker">复盘</p>
          <h2>做完一套，报告立刻摆在眼前</h2>
          <p>趋势、分类、逐题分布、和历史平均的对比，一屏看完。</p>
        </div>
        <div className="split-media">
          <img src="/brand/report-dark.png" alt="OpenExam 桌面端成绩报告" loading="lazy" />
        </div>
      </section>

      <section className="split reverse" data-reveal>
        <div className="split-text">
          <p className="kicker">成就</p>
          <h2>练到哪一步，自己看得见</h2>
          <p>五类成就、四个等级，全按本机数据算，达成当场弹出。</p>
        </div>
        <div className="split-media">
          <img src="/brand/badge-desk-dark.png" alt="OpenExam 成就解锁" loading="lazy" />
        </div>
      </section>

      <section className="gallery" data-reveal>
        <figure>
          <img src={shot('wrong-book')} alt="错题本" loading="lazy" />
          <figcaption>错题本</figcaption>
        </figure>
        <figure>
          <img src={shot('stats')} alt="学习统计" loading="lazy" />
          <figcaption>学习统计</figcaption>
        </figure>
        <figure>
          <img src={shot('badge')} alt="成就徽章" loading="lazy" />
          <figcaption>成就徽章</figcaption>
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
        <p>桌面端题库随包装好；手机端到题库页下一份，导入就能用。</p>
        <div className="cta">
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
          <a
            className="btn btn-lg btn-ghost"
            href="/banks"
            onClick={(e) => {
              e.preventDefault()
              go('/banks')
            }}
          >
            看题库
          </a>
        </div>
      </section>
    </>
  )
}

/* 题库页。App 里不带题目，这一页是它的另一半 —— 没有这一页，
   装完 App 是一屏空的。所以它跟下载页同等重要，不是附录。 */
function Banks({ go }) {
  const ready = BANK_GROUPS.filter((g) => !g.soon)
  const soon = BANK_GROUPS.filter((g) => g.soon)

  return (
    <section className="bk-page">
      <header className="bk-head" data-reveal>
        <p className="dl-kicker">题库与 App 分开</p>
        <h1>下载题库</h1>
        <p>
          装哪套题库，就练哪门考试。下面的包一次装好题目、卷子、材料和配图，
          导入之后全程离线。
        </p>
      </header>

      {ready.map((group, gi) => (
        <div className="bk-group" key={group.key} data-reveal data-delay={gi + 1}>
          <div className="bk-group-head">
            <h2>{group.exam}</h2>
            <p>{group.note}</p>
          </div>
          <ul className="bk-cards">
            {group.packs.map((p) => (
              <li className="bk-card" key={p.slug}>
                <span className="bk-card-icon">
                  <Icon name="bank" size={20} />
                </span>
                <h3>{p.name}</h3>
                <p className="bk-blurb">{p.blurb}</p>
                <dl className="bk-stats">
                  <div>
                    <dt>题目</dt>
                    <dd>{p.questions.toLocaleString('en-US')}</dd>
                  </div>
                  <div>
                    <dt>试卷</dt>
                    <dd>{p.papers}</dd>
                  </div>
                  <div>
                    <dt>年份</dt>
                    <dd>{p.years}</dd>
                  </div>
                </dl>
                <a className="btn btn-block bk-get" href={p.href}>
                  <span>下载题库</span>
                  <em>{p.size}</em>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bk-steps" data-reveal>
        <h2>下载完怎么用</h2>
        <ol>
          {BANK_STEPS.map((s) => (
            <li key={s.n}>
              <span className="bk-step-n">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {soon.map((group) => (
        <div className="bk-group bk-soon" key={group.key} data-reveal>
          <div className="bk-group-head">
            <h2>{group.exam}</h2>
            <p>{group.note}</p>
          </div>
          <ul className="bk-soon-list">
            {group.packs.map((p) => (
              <li key={p.slug}>
                <h3>{p.name}</h3>
                <p>{p.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="bk-own" data-reveal>
        <div>
          <h2>也可以做自己的题库</h2>
          <p>
            App 里能把 Word、Excel、PDF 里的题导进来，也能拍照把纸质卷子录成题目；
            攒好的题库能导出成同样格式的 zip，发给别人直接导入。
          </p>
        </div>
        <a
          className="btn btn-ghost"
          href="/download"
          onClick={(e) => {
            e.preventDefault()
            go('/download')
          }}
        >
          先去下载 App
        </a>
      </div>
    </section>
  )
}

function Download({ platform }) {
  const preferred =
    platform === 'win' ? 'win' : platform === 'android' ? 'android' : 'mac'
  const primary = DOWNLOADS.find((d) => d.key === preferred) ?? DOWNLOADS[0]
  const others = DOWNLOADS.filter((d) => d.key !== preferred)
  const main = primary.files.find((f) => f.primary) ?? primary.files[0]
  const iconOf = (key) =>
    key === 'mac' ? 'apple' : key === 'win' ? 'windows' : 'android'

  return (
    <section className="dl-page">
      <header className="dl-head" data-reveal>
        <p className="dl-kicker">离线安装 · 无需注册</p>
        <h1>下载 OpenExam</h1>
        <p>
          桌面端 v{RELEASE.version} · 手机端 v{RELEASE.appVersion}
          <span className="dl-dot" aria-hidden="true" />
          桌面端内置题库，手机端单独下
        </p>
      </header>

      <div className="dl-feature" data-reveal data-delay="1">
        <div className="dl-feature-meta">
          <span className="dl-pill">
            <Icon name={iconOf(primary.key)} size={15} />
            你的设备
          </span>
          <h2>{primary.platform}</h2>
          <p>{primary.note}</p>
        </div>
        <div className="dl-feature-action">
          <a className="btn btn-lg dl-cta" href={main.href}>
            <span>{main.label}</span>
            <em>{main.size}</em>
          </a>
          {primary.files.length > 1 ? (
            <ul className="dl-more">
              {primary.files
                .filter((f) => f.href !== main.href)
                .map((f) => (
                  <li key={f.href}>
                    <a href={f.href}>
                      {f.label}
                      <em>{f.size}</em>
                    </a>
                  </li>
                ))}
            </ul>
          ) : null}
          <p className="dl-ver">v{primary.version}</p>
        </div>
      </div>

      <ul className="dl-rows" data-reveal data-delay="2">
        {others.map((d) => {
          const file = d.files.find((f) => f.primary) ?? d.files[0]
          return (
            <li key={d.key} className="dl-row">
              <div className="dl-row-left">
                <span className="dl-row-icon">
                  <Icon name={iconOf(d.key)} size={18} />
                </span>
                <div>
                  <h3>{d.platform}</h3>
                  <p>{d.note}</p>
                </div>
              </div>
              <div className="dl-row-right">
                <a className="dl-row-btn" href={file.href}>
                  {file.label}
                  <em>{file.size}</em>
                </a>
                {d.files.length > 1 ? (
                  <div className="dl-row-links">
                    {d.files
                      .filter((f) => f.href !== file.href)
                      .map((f) => (
                        <a key={f.href} href={f.href}>
                          {f.label}
                        </a>
                      ))}
                  </div>
                ) : null}
              </div>
            </li>
          )
        })}
      </ul>

      <div className="dl-notes" data-reveal data-delay="3">
        <div>
          <h3>安装遇到提示</h3>
          <p>
            macOS 首次打开若提示「无法验证开发者」，在「系统设置 → 隐私与安全性」里点一次「仍要打开」。
            Windows SmartScreen 选「更多信息 → 仍要运行」。
          </p>
        </div>
        <div>
          <h3>Android 装哪个包</h3>
          <p>
            近些年机器基本都是 arm64，选第一个即可；不确定就下通用包（大约多 18 MB）。
            安装时允许一次「未知来源」。这一版不带题目，装完到「题库」页下一份导入。
          </p>
        </div>
        <div>
          <h3>怎么更新</h3>
          <p>
            不会自动更新，也不会后台联网检查。新版回来这一页覆盖安装，本机答题记录不会丢。
          </p>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [path, go] = useRoute()
  useReveal(path)
  const platform = usePlatform()
  const [theme, toggleTheme] = useTheme()

  return (
    <div className="page">
      <div className="glow" aria-hidden="true" />
      <Nav go={go} path={path} theme={theme} onToggleTheme={toggleTheme} platform={platform} />
      <main>
        {path === '/download' ? (
          <Download platform={platform} />
        ) : path === '/banks' ? (
          <Banks go={go} />
        ) : (
          <Home go={go} platform={platform} theme={theme} />
        )}
      </main>
      <Footer go={go} />
    </div>
  )
}
