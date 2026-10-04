import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Micro Build AI',
  titleTemplate: ':title · Micro Build AI 使用文档',
  description: 'Micro Build AI 使用文档：快速开始、API Key、Codex、Claude Code、Gemini CLI、Antigravity、CC Switch、Cursor、Cherry Studio 与常见问题。',
  base: '/docs/',
  cleanUrls: true,
  ignoreDeadLinks: false,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/docs/logo.png' }],
    ['meta', { name: 'theme-color', content: '#0f766e' }],
    ['meta', { name: 'referrer', content: 'strict-origin-when-cross-origin' }]
  ],
  markdown: {
    config(md) {
      const renderLink = md.renderer.rules.link_open
      md.renderer.rules.link_open = (tokens, index, options, env, renderer) => {
        const href = tokens[index].attrGet('href') ?? ''
        // Platform and docs share a production origin; keep this journey in one tab.
        if (/^https:\/\/ai\.mbuild\.top(?:\/|$)/.test(href)) {
          tokens[index].attrSet('target', '_self')
        }
        return renderLink
          ? renderLink(tokens, index, options, env, renderer)
          : renderer.renderToken(tokens, index, options)
      }
    }
  },
  themeConfig: {
    logo: { src: '/logo.png', alt: 'Micro Build AI' },
    siteTitle: 'Micro Build AI',
    nav: [
      { text: '快速开始', link: '/getting-started' },
      { text: 'API Key', link: '/api-key' },
      {
        text: '工具接入',
        activeMatch: '^/tools/',
        items: [
          { text: 'Codex', link: '/tools/codex' },
          { text: 'Claude Code', link: '/tools/claude-code' },
          { text: 'Gemini CLI', link: '/tools/gemini' },
          { text: 'Antigravity', link: '/tools/antigravity' },
          { text: 'CC Switch', link: '/tools/cc-switch' },
          { text: 'Cursor', link: '/tools/cursor' },
          { text: 'Cherry Studio', link: '/tools/cherry-studio' }
        ]
      },
      { text: '常见问题', link: '/faq' },
      { text: '进入平台', link: 'https://ai.mbuild.top/', target: '_self', noIcon: true }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '5 分钟快速开始', link: '/getting-started' },
          { text: '创建与管理 API Key', link: '/api-key' }
        ]
      },
      {
        text: 'AI 编程工具',
        items: [
          { text: 'Codex', link: '/tools/codex' },
          { text: 'Claude Code', link: '/tools/claude-code' },
          { text: 'Gemini CLI', link: '/tools/gemini' },
          { text: 'Antigravity', link: '/tools/antigravity' },
          { text: 'Cursor', link: '/tools/cursor' }
        ]
      },
      {
        text: 'AI 客户端',
        items: [{ text: 'Cherry Studio', link: '/tools/cherry-studio' }]
      },
      {
        text: '配置管理',
        items: [{ text: 'CC Switch', link: '/tools/cc-switch' }]
      },
      {
        text: '遇到问题',
        items: [{ text: '常见问题', link: '/faq' }]
      }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清空搜索',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    outline: { label: '本页目录', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    sidebarMenuLabel: '文档目录',
    returnToTopLabel: '回到顶部',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换至浅色模式',
    darkModeSwitchTitle: '切换至深色模式',
    externalLinkIcon: true,
    editLink: {
      pattern: 'https://github.com/syh-micro-build/mb-ai-docs/edit/main/docs/:path',
      text: '在 GitHub 上改进此页'
    },
    footer: { message: 'Micro Build AI 使用文档 · 从第一次调用开始' }
  }
})
