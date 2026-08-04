const DL = 'https://dl.openexam.cc'

export const RELEASE = {
  version: '0.2.2',
  appVersion: '1.0.1',
  github: 'https://github.com/lmk1010/OpenExam',
  githubApp: 'https://github.com/lmk1010/OpenExamApp',
  macDmg: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.dmg`,
  macZip: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.zip`,
  winExe: `${DL}/v0.2.2/OpenExam-0.2.2-win-x64.exe`,
  apkArm64: `${DL}/openexam/android/1.0.1/OpenExam-1.0.1-arm64-v8a.apk`,
  apkArm32: `${DL}/openexam/android/1.0.1/OpenExam-1.0.1-armeabi-v7a.apk`,
  apkUniversal: `${DL}/openexam/android/1.0.1/OpenExam-1.0.1-universal.apk`,
}

export const PRIMARY = {
  mac: { href: RELEASE.macDmg, label: '下载 macOS 版' },
  win: { href: RELEASE.winExe, label: '下载 Windows 版' },
  android: { href: RELEASE.apkArm64, label: '下载 Android 版' },
}

export const FEATURES = [
  {
    icon: 'bank',
    title: '题库在本机',
    body: '15936 道真题、137 套卷连图打包，装完即用。',
  },
  {
    icon: 'paper',
    title: '按卷刷，也按模块刷',
    body: '整卷限时，或只练资料分析、只做空着的题。',
  },
  {
    icon: 'wrong',
    title: '错题按错因归类',
    body: '粗心、不会、审题、没时间，还能按错因开专项计划。',
  },
  {
    icon: 'chart',
    title: '进步看得见',
    body: '本周对上周的模块对比，退步了直接点名。',
  },
  {
    icon: 'ai',
    title: 'AI 讲题与出卷',
    body: '接自己的模型，讲不懂的题拆开讲，按弱项出卷。',
  },
  {
    icon: 'lock',
    title: '数据是你自己的',
    body: '全存本机，一键导出带走。没有账号，没有埋点。',
  },
]

export const FAQ = [
  {
    q: '真的完全离线吗？',
    a: '做题、错题、统计全程不联网。只有桌面端 AI 需要你自己填模型接口，不填就没有任何网络请求。',
  },
  {
    q: '手机端和桌面端数据互通吗？',
    a: '两端都能导出 JSON 手动导入对方。没有云同步 —— 数据不上传是这个项目的前提。',
  },
  {
    q: '题库能自己换吗？',
    a: '桌面端可以导入自己的题目文件生成题库。手机端的格式和构建脚本在仓库里，后面支持多题库共存。',
  },
  {
    q: '收费吗？',
    a: '不收费，代码 MIT 开源。题目来自公开真题，仅供个人备考使用。',
  },
]

export const DOWNLOADS = [
  {
    key: 'mac',
    platform: 'macOS',
    note: 'macOS 12 Monterey 及以上 · Apple Silicon',
    version: RELEASE.version,
    files: [
      { label: 'DMG 安装包', href: RELEASE.macDmg, size: '约 120 MB', primary: true },
      { label: 'ZIP 压缩包', href: RELEASE.macZip, size: '约 118 MB' },
    ],
  },
  {
    key: 'win',
    platform: 'Windows',
    note: 'Windows 10 及以上 · 64 位',
    version: RELEASE.version,
    files: [{ label: 'EXE 安装程序', href: RELEASE.winExe, size: '约 95 MB', primary: true }],
  },
  {
    key: 'android',
    platform: 'Android',
    note: 'Android 8.0 及以上 · 题库随包安装',
    version: RELEASE.appVersion,
    files: [
      { label: 'arm64 安装包', href: RELEASE.apkArm64, size: '37.7 MB', primary: true },
      { label: 'arm32 安装包', href: RELEASE.apkArm32, size: '37.3 MB' },
      { label: '通用包（含全部架构）', href: RELEASE.apkUniversal, size: '52.0 MB' },
    ],
  },
]
