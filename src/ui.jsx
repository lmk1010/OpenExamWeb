import { useEffect, useState } from 'react'
import { PRIMARY, RELEASE } from './data.js'

/* 极小的路由：站点只有两页，装 react-router 不值当。nginx 已经把所有
   路径回退到 index.html，这里只认 pathname 并接管站内链接。 */
export function useRoute() {
  const [path, setPath] = useState(
    typeof window === 'undefined' ? '/' : window.location.pathname,
  )
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  const go = (to) => {
    if (to === window.location.pathname) return
    window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo({ top: 0 })
  }
  return [path, go]
}

export function usePlatform() {
  const [platform, setPlatform] = useState('mac')
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) setPlatform('android')
    else if (/windows/.test(ua)) setPlatform('win')
    else setPlatform('mac')
  }, [])
  return platform
}

/* 主题：默认跟随系统，手动选过就记住。写在 <html data-theme> 上，
   CSS 变量按属性切换，不用重新渲染任何组件。 */
export function useTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('oe-theme')
    const system = window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
    const initial = saved || system
    setTheme(initial)
    document.documentElement.dataset.theme = initial

    if (saved) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = (e) => {
      const next = e.matches ? 'light' : 'dark'
      setTheme(next)
      document.documentElement.dataset.theme = next
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem('oe-theme', next)
  }

  return [theme, toggle]
}

/* 品牌书本。直接内联在组件里：走独立的 /brand/logo.svg 时，路径不带 hash，
   Cloudflare 会一直发旧文件，改了半天线上还是老的。内联进 bundle 就没这问题。 */
export function Logo({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="oe-g" x1="16" y1="14" x2="84" y2="82" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F0862C" />
          <stop offset="0.34" stopColor="#EC4A79" />
          <stop offset="0.68" stopColor="#9B5DE5" />
          <stop offset="1" stopColor="#5B6BE8" />
        </linearGradient>
        <linearGradient id="oe-p" x1="22" y1="18" x2="78" y2="78" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFF4E7" />
          <stop offset="0.55" stopColor="#FFFEFC" />
          <stop offset="1" stopColor="#FFF8FC" />
        </linearGradient>
      </defs>
      <g stroke="url(#oe-g)" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 23.5 L21.5 26.4 C19.8 27.2 19 28.4 19 30 L19 70.4 C19 72.5 20.7 74.2 22.9 74.2 L43.5 74.2" />
        <path d="M72 23.5 L78.5 26.4 C80.2 27.2 81 28.4 81 30 L81 70.4 C81 72.5 79.3 74.2 77.1 74.2 L56.5 74.2" />
        <path d="M50 30.5 C44.2 21.4 37 17.2 28 17.2 L28 66.2 C37 66.2 44.6 69.6 50 76.4 Z" fill="url(#oe-p)" />
        <path d="M50 30.5 C55.8 21.4 63 17.2 72 17.2 L72 66.2 C63 66.2 55.4 69.6 50 76.4 Z" fill="url(#oe-p)" />
        <path d="M58 38.6 L67.6 35.9" strokeWidth="4" />
        <path d="M58 46.6 L67.6 43.9" strokeWidth="4" />
        <path d="M58 54.6 L67.6 51.9" strokeWidth="4" />
      </g>
    </svg>
  )
}

/* 进入视口再淡入。IntersectionObserver 一次性触发，滚回去不会重放 —— 
   来回滚动时元素不停淡入淡出是最廉价的那种"动效"。 */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('in')
          io.unobserve(e.target)
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}

/* 顶栏滚动后加一层底色，否则内容从它下面穿过去会糊成一片 */
export function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return scrolled
}

export function Icon({ name, size = 22 }) {
  /* 双层画法：低透明度的实心块打底，再压一层描边细节。单线条图标放大到
     卡片里就是一根铁丝，撑不起来。 */
  const box = { width: size, height: size, viewBox: '0 0 28 28', fill: 'none' }
  const solid = { fill: 'currentColor', opacity: 0.16 }
  const line = {
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }

  switch (name) {
    case 'bank': // 一摞题册，最上面一本翻开
      return (
        <svg {...box}>
          <rect x="4" y="9" width="20" height="15" rx="3.2" {...solid} />
          <path d="M4.8 21.5h18.4" {...line} opacity="0.5" />
          <path
            d="M14 8.6c-1.9-1.8-4.3-2.6-7.2-2.5v11.6c2.9-.1 5.3.7 7.2 2.5 1.9-1.8 4.3-2.6 7.2-2.5V6.1c-2.9-.1-5.3.7-7.2 2.5Z"
            {...line}
          />
          <path d="M14 8.6v11.6" {...line} />
        </svg>
      )
    case 'paper': // 试卷 + 模块分区
      return (
        <svg {...box}>
          <path d="M7 4h9l5 5v15H7z" {...solid} />
          <path d="M7.5 4.5h8.2l4.8 4.8v14.2H7.5z" {...line} />
          <path d="M15.7 4.5v4.8h4.8" {...line} />
          <rect x="10.4" y="12.6" width="7" height="2.4" rx="1.2" {...line} />
          <path d="M10.4 18.6h4.2" {...line} />
        </svg>
      )
    case 'wrong': // 错题本：书签 + 叉
      return (
        <svg {...box}>
          <path d="M7 4.5h11.5a2 2 0 0 1 2 2V24l-6.8-3.4L7 24z" {...solid} />
          <path d="M7.6 5.2h10.6a1.8 1.8 0 0 1 1.8 1.8v16.2l-6.2-3.1-6.2 3.1z" {...line} />
          <path d="M11.7 10.4 16 14.6M16 10.4l-4.3 4.2" {...line} />
        </svg>
      )
    case 'chart': // 走势：柱 + 上扬折线
      return (
        <svg {...box}>
          <rect x="5" y="14" width="4" height="8" rx="1.6" {...solid} />
          <rect x="12" y="10" width="4" height="12" rx="1.6" {...solid} />
          <rect x="19" y="6" width="4" height="16" rx="1.6" {...solid} />
          <path d="M4.5 23.5h19" {...line} />
          <path d="M7 15.5v6M14 11.5v10M21 7.5v14" {...line} />
          <path d="M6.4 12.2 12.4 8l3.6 2.6 5.6-5.4" {...line} opacity="0.65" />
        </svg>
      )
    case 'ai': // 讲题：对话框里一颗火花
      return (
        <svg {...box}>
          <path d="M5 8.4A3.4 3.4 0 0 1 8.4 5h11.2A3.4 3.4 0 0 1 23 8.4v6.8a3.4 3.4 0 0 1-3.4 3.4h-6l-4.9 3.6v-3.6h-.3A3.4 3.4 0 0 1 5 15.2z" {...solid} />
          <path d="M5.7 8.6a3 3 0 0 1 3-3h10.6a3 3 0 0 1 3 3v6.4a3 3 0 0 1-3 3h-5.6l-4.4 3.2V18H8.7a3 3 0 0 1-3-3z" {...line} />
          <path d="m14 8.6 1.1 2.7 2.7 1.1-2.7 1.1L14 16.2l-1.1-2.7-2.7-1.1 2.7-1.1z" {...line} />
        </svg>
      )
    case 'lock': // 隐私：盾牌里一把锁
      return (
        <svg {...box}>
          <path d="M14 4 23 7v7.4c0 4.6-3.5 8.3-9 9.6-5.5-1.3-9-5-9-9.6V7z" {...solid} />
          <path d="M14 4.8 22.2 7.6v6.8c0 4.2-3.2 7.6-8.2 8.8-5-1.2-8.2-4.6-8.2-8.8V7.6z" {...line} />
          <rect x="10.8" y="13" width="6.4" height="5.2" rx="1.6" {...line} />
          <path d="M12.2 13v-1.5a1.8 1.8 0 0 1 3.6 0V13" {...line} />
        </svg>
      )
    case 'spark': // 顶部小标签用：一颗四角星
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <path
            d="m12 3.4 2 5.2 5.2 2-5.2 2-2 5.2-2-5.2-5.2-2 5.2-2z"
            fill="currentColor"
          />
          <path d="m19 15.4.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" fill="currentColor" opacity="0.6" />
        </svg>
      )
    case 'apple':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.2 1.3-2.5 1.3-2.5s-2.5-1-2.5-3.6ZM14.2 5.3c.6-.8 1-1.9.9-3-.9 0-2.1.6-2.8 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2.1-.5 2.8-1.3Z" />
        </svg>
      )
    case 'windows':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5.6 10.3 4.6v7.1H3zM11.3 4.5 21 3.2v8.5h-9.7zM3 12.6h7.3v7.1L3 18.7zM11.3 12.6H21v8.5l-9.7-1.3z" />
        </svg>
      )
    case 'android':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 10.5h12V18a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18zM4.2 10.5a1.2 1.2 0 0 0-1.2 1.2v4.1a1.2 1.2 0 0 0 2.4 0v-4.1a1.2 1.2 0 0 0-1.2-1.2m15.6 0a1.2 1.2 0 0 0-1.2 1.2v4.1a1.2 1.2 0 0 0 2.4 0v-4.1a1.2 1.2 0 0 0-1.2-1.2M9 19.5h1.8v2.1a1.05 1.05 0 0 1-2.1 0V19.5zm4.2 0H15v2.1a1.05 1.05 0 0 1-2.1 0zM15.6 4.9l1.1-1.7a.35.35 0 0 0-.6-.4l-1.2 1.8A7 7 0 0 0 12 4c-1 0-2 .2-2.9.6L7.9 2.8a.35.35 0 0 0-.6.4l1.1 1.7A6.2 6.2 0 0 0 6 9.5h12a6.2 6.2 0 0 0-2.4-4.6M9.6 7.6a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4m4.8 0a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4" />
        </svg>
      )
    case 'sun':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </svg>
      )
    case 'moon':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5" />
        </svg>
      )
    default:
      return null
  }
}

export function Arrow({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

export function Nav({ go, path, theme, onToggleTheme, platform }) {
  const primary = PRIMARY[platform]
  const scrolled = useScrolled()
  const [menu, setMenu] = useState(false)
  const link = (to, label) => (
    <a
      href={to}
      className={path === to ? 'active' : undefined}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey) return
        e.preventDefault()
        go(to)
      }}
    >
      {label}
    </a>
  )

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${menu ? ' open' : ''}`}>
      <a
        className="brand"
        href="/"
        onClick={(e) => {
          e.preventDefault()
          go('/')
        }}
      >
        <Logo size={30} />
        <span>OpenExam</span>
      </a>
      <nav className="nav-links">
        {path === '/' ? <a href="#features">功能</a> : null}
        {path === '/' ? <a href="#shots">界面</a> : null}
        {link('/download', '下载')}
        <a href={RELEASE.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </nav>
      <button
        className="icon-btn burger"
        type="button"
        onClick={() => setMenu((v) => !v)}
        aria-label="菜单"
      >
        <span />
        <span />
      </button>
      <button
        className="icon-btn"
        type="button"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? '切换到浅色' : '切换到深色'}
        title={theme === 'dark' ? '浅色模式' : '深色模式'}
      >
        <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={17} />
      </button>
      <a className="btn btn-sm" href={primary.href}>
        {primary.label}
      </a>
      {menu ? (
        <div className="nav-sheet" onClick={() => setMenu(false)}>
          {path === '/' ? <a href="#features">功能</a> : null}
          {path === '/' ? <a href="#shots">界面</a> : null}
          <a
            href="/download"
            onClick={(e) => {
              e.preventDefault()
              go('/download')
            }}
          >
            下载
          </a>
          <a href={RELEASE.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      ) : null}
    </header>
  )
}

export function Footer({ go }) {
  return (
    <footer className="foot">
      <div className="foot-brand">
        <Logo size={24} />
        <span>OpenExam</span>
      </div>
      <div className="foot-links">
        <a
          href="/download"
          onClick={(e) => {
            e.preventDefault()
            go('/download')
          }}
        >
          下载
        </a>
        <a href={RELEASE.github} target="_blank" rel="noreferrer">
          桌面端源码
        </a>
        <a href={RELEASE.githubApp} target="_blank" rel="noreferrer">
          手机端源码
        </a>
      </div>
      <p className="foot-note">MIT 开源 · 题目来自公开真题，仅供个人备考使用</p>
    </footer>
  )
}
