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

export function Icon({ name, size = 21 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }
  switch (name) {
    case 'bank':
      return (
        <svg {...common}>
          <path d="M12 6.5C10.4 5 8.2 4.4 5 4.6v12.2c3.2-.2 5.4.4 7 1.9 1.6-1.5 3.8-2.1 7-1.9V4.6c-3.2-.2-5.4.4-7 1.9Z" />
          <path d="M12 6.5V19" />
        </svg>
      )
    case 'paper':
      return (
        <svg {...common}>
          <path d="M7 3.5h7l4 4v13H7z" />
          <path d="M14 3.5v4h4" />
          <path d="M10 12h6M10 15.5h4" />
        </svg>
      )
    case 'wrong':
      return (
        <svg {...common}>
          <path d="M6 4h9l3 3v13l-6-3-6 3z" />
          <path d="M10.5 9.5 14 13M14 9.5 10.5 13" />
        </svg>
      )
    case 'chart':
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <path d="M7 19V11M12 19V6M17 19v-5" />
        </svg>
      )
    case 'ai':
      return (
        <svg {...common}>
          <path d="m12 4 1.7 4.3L18 10l-4.3 1.7L12 16l-1.7-4.3L6 10l4.3-1.7z" />
          <path d="M18.5 16.5 19 18l1.5.5L19 19l-.5 1.5L18 19l-1.5-.5L18 18z" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...common}>
          <rect x="5" y="10" width="14" height="10" rx="2.5" />
          <path d="M8.5 10V7.5a3.5 3.5 0 1 1 7 0V10" />
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
        <svg {...common}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
        </svg>
      )
    case 'moon':
      return (
        <svg {...common}>
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
    <header className="nav">
      <a
        className="brand"
        href="/"
        onClick={(e) => {
          e.preventDefault()
          go('/')
        }}
      >
        <img src="/brand/logo.svg" alt="" width="26" height="26" />
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
    </header>
  )
}

export function Footer({ go }) {
  return (
    <footer className="foot">
      <div className="foot-brand">
        <img src="/brand/logo.svg" alt="" width="22" height="22" />
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
