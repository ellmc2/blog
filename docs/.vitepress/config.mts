/*
 * @Author: ellmc2 jellmc2@qq.com
 * @Date: 2023-09-28 20:22:50
 * @LastEditors: ellmc2 jellmc2@qq.com
 * @LastEditTime: 2023-10-01 21:43:47
 * @FilePath: /blog/docs/.vitepress/config.mts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      },
    },
    nav: [
      { text: "主页", link: "/" },
      // { text: "前端基础", link: "/fe-foundation" },
      { text: "前端基础", link: "/event-loop" },
    ],

    sidebar: [
      {
        text: "前端基础",
        items: [
          { text: "Event loop事件循环", link: "/event-loop" },
          // { text: "Runtime API Examples", link: "/api-examples" },
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
                  closeText: "退出",
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
