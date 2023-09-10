import { defineConfig } from "vitepress";
import { favicon } from "./facicon";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-hans",
  title: "个人博客",
  titleTemplate: "学习记录",
  description: "A VitePress Site",
  base: "/blog/",
  head: [["link", { rel: "icon", href: favicon }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: favicon,
      style: {
        // borderRadius: "50%"
      }
    },
    nav: [
      { text: "主页", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
    ],

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
                },
              },
            },
          },
        },
      },
    },

    lastUpdated: {
      text: "Updated at",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
  },
  markdown: {
    // theme: "material-theme-palenight",
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
