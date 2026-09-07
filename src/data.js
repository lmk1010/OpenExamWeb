const DL = 'https://dl.openexam.cc'
/** 同一个 key 覆盖上传后，用它把 CDN 边缘缓存顶掉。 */
const APK_V = '20260907'

export const RELEASE = {
  version: '0.2.2',
  appVersion: '1.1.0',
  github: 'https://github.com/lmk1010/OpenExam',
  githubApp: 'https://github.com/lmk1010/OpenExamApp',
  macDmg: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.dmg`,
  macZip: `${DL}/v0.2.2/OpenExam-0.2.2-mac-arm64.zip`,
  winExe: `${DL}/v0.2.2/OpenExam-0.2.2-win-x64.exe`,
  apkArm64: `${DL}/openexam/android/1.1.0/OpenExam-1.1.0-arm64-v8a.apk?v=${APK_V}`,
  apkArm32: `${DL}/openexam/android/1.1.0/OpenExam-1.1.0-armeabi-v7a.apk?v=${APK_V}`,
  apkUniversal: `${DL}/openexam/android/1.1.0/OpenExam-1.1.0-universal.apk?v=${APK_V}`,
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
    body: '真题连图装进设备，桌面端随包带，手机端单独下一份。',
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
    a: '能。手机端从 1.1.0 起不预装题目，题库在「题库」页单独下，装哪套就练哪门。自己的 Word、Excel、PDF 也能导进来，还能拍照把纸质卷录成题；攒好的题库能导出成同样格式的 zip 发给别人。',
  },
  {
    q: '收费吗？',
    a: '不收费，代码 MIT 开源。题目来自公开真题，仅供个人备考使用。',
  },
]

/* ------------------------------------------------------------------ 题库

   App 里不带题目 —— 题库和 App 是分开的，装哪套题库就是练哪门考试。
   这几个包是 openexam-app/tool/pack_bank.py 从种子库切出来的，
   格式跟 App 的「导出题库」完全一样，所以下下来直接导入就能用。

   数字不要手填：跑 pack_bank.py 会写一份 dist/banks/manifest.json，
   卷数题数体积都在里面，照抄。 */

const BANK_V = 'v1'
const bankUrl = (slug) => `${DL}/banks/${BANK_V}/${slug}.zip`

export const BANK_GROUPS = [
  {
    key: 'gongkao',
    exam: '公务员',
    note: '行政职业能力测验 · 五个模块齐全，含材料与图形题的配图',
    packs: [
      {
        slug: 'gongkao-national',
        name: '国考行测真题',
        blurb: '国家公务员考试行测，省级与地市级两套卷都在。',
        papers: 15,
        questions: 1974,
        years: '2022–2026',
        size: '6.9 MB',
        href: bankUrl('gongkao-national'),
      },
      {
        slug: 'gongkao-province',
        name: '省考行测真题',
        blurb: '各省省考与多省联考，覆盖三十余个省份。',
        papers: 143,
        questions: 16412,
        years: '2023–2026',
        size: '36.8 MB',
        href: bankUrl('gongkao-province'),
      },
    ],
  },
  {
    key: 'soon',
    exam: '在做',
    note: '下面这几门的题在整理中，格式和上面一样，做好了直接出现在这一页',
    soon: true,
    packs: [
      { slug: 'yishi', name: '执业医师', blurb: '临床执业医师笔试' },
      { slug: 'jiakao', name: '驾照考试', blurb: '科目一、科目四' },
      { slug: 'jisuanji', name: '计算机等级考试', blurb: '二级、三级' },
    ],
  },
]

export const BANK_STEPS = [
  {
    n: '1',
    title: '下载题库包',
    body: '一个 zip 文件，不用解压。手机上直接下到「下载」里就行。',
  },
  {
    n: '2',
    title: '在 App 里选它',
    body: '打开 App →「我的」→「导入题目」→ 选择文件，挑刚下的 zip。',
  },
  {
    n: '3',
    title: '开始刷',
    body: '题、卷、材料、配图一次装好。全程不联网，也不需要账号。',
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
    note: 'Android 8.0 及以上 · 题库到「题库」页单独下',
    version: RELEASE.appVersion,
    files: [
      { label: 'arm64 安装包', href: RELEASE.apkArm64, size: '11.7 MB', primary: true },
      { label: 'arm32 安装包', href: RELEASE.apkArm32, size: '11.5 MB' },
      { label: '通用包（含全部架构）', href: RELEASE.apkUniversal, size: '29.8 MB' },
    ],
  },
]
