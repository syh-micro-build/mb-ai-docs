---
layout: home
title: 使用文档
description: 从登录到第一次 AI 调用，连接 Micro Build AI 与你熟悉的工具。
hero:
  name: Micro Build AI
  text: 让 AI 工具，成为日常工作的一部分
  tagline: 登录、创建密钥、连接工具。从第一次成功调用开始。
  actions:
    - theme: brand
      text: 5 分钟开始使用
      link: /getting-started
    - theme: alt
      text: 创建 API Key
      link: /api-key
    - theme: alt
      text: 进入平台
      link: https://ai.mbuild.top/
      target: _self
features:
  - icon: '💻'
    title: Codex
    details: 在终端里阅读代码、解决问题。使用自定义服务商接入 Micro Build AI。
    link: /tools/codex
    linkText: 配置 Codex
  - icon: '✨'
    title: Claude Code
    details: 在终端里使用 Claude 编程助手，按 Anthropic Messages 接口连接平台。
    link: /tools/claude-code
    linkText: 配置 Claude Code
  - icon: '🔀'
    title: CC Switch
    details: 用图形界面分别管理 Codex 与 Claude Code 的服务商配置。
    link: /tools/cc-switch
    linkText: 配置 CC Switch
  - icon: '📝'
    title: Cursor
    details: 在编辑器中配置自定义 API。先确认当前版本与模型的兼容范围。
    link: /tools/cursor
    linkText: 配置 Cursor
  - icon: '🍒'
    title: Cherry Studio
    details: 添加服务商与模型，在桌面客户端开始第一段对话。
    link: /tools/cherry-studio
    linkText: 配置 Cherry Studio
---

## 第一次使用，跟着这条路径走

<GuideFigure name="quick-start" alt="首次接入三步：登录并确认余额，创建密钥并复制地址与模型，配置工具后核对回复和使用记录" caption="先完成一次小请求。回复、使用记录和费用都能对应上，就可以开始自己的任务了。" />

[从快速开始进入 →](/getting-started)

## 接入时，只需要三项信息

| 信息 | 填什么 |
| --- | --- |
| API 地址（Base URL） | Codex、Cursor 通常填 `https://ai.mbuild.top/v1`；[Claude Code](/tools/claude-code) 与 [Cherry Studio](/tools/cherry-studio) 按各自教程填写站点根地址。 |
| API Key | 在 Micro Build AI 创建的个人密钥，完整值只保存在自己的工具或密码管理器中。 |
| 模型（Model） | 从平台模型列表复制模型 ID，以当前可用模型及你的密钥权限为准。 |

遇到报错？先到[常见问题](/faq)按错误信息排查。每个工具教程都有配置验证与安全提示。
