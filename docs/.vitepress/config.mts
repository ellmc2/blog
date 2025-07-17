import { defineConfig, type DefaultTheme } from "vitepress";
import { favicon } from "./facicon";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-hans",
  title: "个人博客",
  titleTemplate: "学习记录",
  description: "A VitePress Site",
  base: "/",
  head: [
    ["link", { rel: "icon", href: favicon }],
    [
      "meta",
      {
        name: "keywords",
        content: "FE, blog",
      },
    ],
  ],

  lastUpdated: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: {
      src: favicon,
      style: {
        // borderRadius: "50%"
      },
    },
    nav: nav(),

    footer: {
      message: "根据 MIT 许可证发布",
      copyright: "Copyright © 2023-present Ell Xu",
    },

    sidebar: {
      "/fe-foundation/": {
        base: "/fe-foundation/",
        items: sidebarFeFoundation(),
      },
    },

    socialLinks: [{ icon: "github", link: "https://github.com/ellmc2" }],

    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜索文档",
                buttonAriaLabel: "搜索文档",
              },
              modal: {
                noResultsText: "无法找到相关结果",
                resetButtonTitle: "清除查询条件",
                footer: {
                  selectText: "选择",
                  navigateText: "切换",
                  closeText: "退出",
                },
              },
            },
          },
        },
      },
    },

    lastUpdatedText: "更新于",
    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
  },
  markdown: {
    lineNumbers: true,

    // adjust how header anchors are generated,
    // useful for integrating with tools that use different conventions
    anchor: {
      slugify(str) {
        return encodeURIComponent(str);
      },
    },
  },
});

function sidebarFeFoundation(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "JavaScript",
      collapsed: false,
      items: [
        { text: "Eventloop 事件循环", link: "event-loop" },
        { text: "HTTP 缓存", link: "http-cache" },
        { text: "首屏性能优化", link: "first-screen-performance-optimization" },
      ],
    },
    {
      text: "手撕代码",
      collapsed: false,
      items: [
        { text: "Deep Clone", link: "/live-coding/deep-clone" },
        { text: "useDebouncedValue", link: "/live-coding/useDebouncedValue" },
        { text: "flattenObject", link: "/live-coding/flattenObject" },
      ],
    }, 
    {
      text: "场景题",
      collapsed: false,
      items: [
        { text: "请求失败会弹出一个toast，如何保证批量请求失败，只弹出一个toast", link: "/situational-question/show-toast" },
      ],
    },
  ];
}

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "主页", link: "/" },
    {
      text: "前端基础",
      link: "/fe-foundation/event-loop",
      activeMatch: "/fe-foundation/",
    },
  ];
}
