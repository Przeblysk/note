import { defineConfig } from 'islandjs'

const getSidebar = () => ({
  '/note': [
    {
      text: '随记随笔',
      items: [{ text: '简介', link: '/note/home' }],
    },
    {
      text: '博文翻译',
      items: [
        { text: '现代网络浏览器概览-1', link: '/translator/1' },
        { text: '现代网络浏览器概览-2', link: '/translator/2' },
      ],
    },
  ],
})

const getNav = () => [
  {
    text: '首页',
    link: '/',
    activeMatch: '^/$|^/',
  },
]

export default defineConfig({
  title: "Przeblysk's Note",
  icon: '/OSLO.png',
  themeConfig: {
    lang: 'zh',
    locales: {
      '/zh/': {
        lang: 'zh',
        label: '简体中文',
        selectText: '语言',
        ariaLabel: '语言',
        lastUpdatedText: '上次更新',
        title: "Przeblysk's Note",
        outlineTitle: '目录',
        prevPageText: '上一页',
        nextPageText: '下一页',
        editLink: {
          pattern: 'https://github.com/Przeblysk/note/tree/master/docs/:path',
          text: '📝 在 GitHub 上编辑此页',
        },
        nav: getNav(),
        sidebar: getSidebar(),
      },
    },
    footer: {
      message: 'Powered by Island.js',
      copyright: `Copyright © ${new Date().getFullYear()}-present Przeblysk`,
    },
  },
})
