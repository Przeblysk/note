import { defineConfig } from 'islandjs'

function getSidebar() {
  return {
    '/note': [
      {
        text: '随记随笔',
        items: [
          { text: '简介', link: '/note/home' },
          { text: 'git', link: '/note/git' },
        ],
      },
      {
        text: '小程序',
        items: [
          { text: '在 Taro 中使用 Lottie', link: '/mini-program/taro-lottie' },
          {
            text: '微信小程序 fixed 定位在 scrollview 中失效',
            link: '/mini-program/wx-miniprogram-scroll-view-fixed',
          },
        ],
      },
      {
        text: '博文翻译',
        items: [
          { text: '现代网络浏览器概览-1', link: '/translator/1' },
          { text: '现代网络浏览器概览-2', link: '/translator/2' },
          { text: '现代网络浏览器概览-3', link: '/translator/3' },
          { text: '现代网络浏览器概览-4', link: '/translator/4' },
        ],
      },
    ],
  }
}

function getNav() {
  return [
    {
      text: '首页',
      link: '/',
      activeMatch: '^/$|^/',
    },
  ]
}

export default defineConfig({
  title: "Przeblysk's Note",
  icon: '/OSLO.png',
  themeConfig: {
    locales: {
      '/': {
        lang: 'zh-CN',
        label: '简体中文',
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
