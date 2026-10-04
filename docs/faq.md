---
title: 常见问题
description: 排查 API Key 无效、余额与权限、模型不存在、限流、超时和充值到账问题。
---

# 常见问题

先记下客户端显示的错误信息，再按下面的顺序检查。状态码只是线索，具体原因以返回的错误信息为准。

## 先检查接入三要素

1. **地址**：Codex、Cursor 通常是 `https://ai.mbuild.top/v1`；[Claude Code](/tools/claude-code)、[Cherry Studio](/tools/cherry-studio)、[Gemini CLI](/tools/gemini)与 [Antigravity CLI](/tools/antigravity)按各自教程填写根地址或指定前缀。
2. **密钥**：从平台复制完整值，确认未停用、删除或过期；API Key 输入框不加 `Bearer `。
3. **模型**：复制模型调用 ID，确认当前可用、密钥有权限，并匹配客户端所需协议。

## 401：API Key 无效 {#unauthorized}

- 核对是否复制了完整密钥，而不是掩码。
- 检查粘贴时有没有空格、换行或多余引号。
- 检查密钥状态、有效期，以及客户端实际使用的服务商。
- Codex 用户检查启动终端中是否提供了 `MICRO_BUILD_AI_API_KEY`。
- Gemini CLI 与 Antigravity CLI 用户检查启动终端中的 `GEMINI_API_KEY`，并确认已经选择对应的 API key 模式。
- 仍然失败时，在平台创建新密钥，仅在当前测试工具中替换并验证。

不要在请求帮助时发送完整密钥。管理步骤见[API Key 教程](/api-key)。

## 余额不足、额度耗尽或无权限 {#balance}

先查看账户余额，再检查该密钥的额度、有效期、分组和访问限制。账户余额、密钥额度和模型权限是不同的检查项。

充值后仍失败时，确认余额已到账，核对是否达到密钥自己的限制；模型没有权限时，联系管理员确认可用范围。403、402 或其他状态码的具体含义应结合错误正文判断。

## 模型不存在或不支持 {#model}

- 以平台当前模型列表为准，复制完整调用 ID，注意大小写与前后空格。
- 确认密钥所在分组允许该模型。
- 确认协议兼容：Codex 需要 Responses；Claude Code 需要 Anthropic Messages 和可用 Claude 模型；Cursor 和本版 Cherry Studio 教程使用兼容聊天接口。
- Gemini CLI 和 Antigravity CLI 的本页接入方式需要 Gemini 原生接口与 Gemini 模型；支持某个模型的 OpenAI 兼容入口，不代表原生接口也已开通。
- 本站 `gpt-5.6-sol` 是示例 ID，不代表所有用户和工具都可调用它。

## 404：找不到接口 {#not-found}

检查是否把 `/docs/`、网页地址或完整请求路径填进 Base URL。Codex、Cursor 通常填写 `https://ai.mbuild.top/v1`；其他工具按各自教程填写。

Cherry Studio 应按[地址填写说明](/tools/cherry-studio)操作；Codex 的 `/responses` 不可用时，联系管理员确认该模型与分组是否支持这一协议。

Claude Code 填写根地址 `https://ai.mbuild.top`；出现 `/v1/v1/messages` 时，先去掉多余的 `/v1`，再确认 Messages 接入权限。

Gemini 原生客户端通常填写根地址 `https://ai.mbuild.top`；管理员指定 Antigravity 专用通道时才使用 `/antigravity` 前缀。客户端会添加 `/v1beta`，不要在根地址中重复填写版本号。

## CC Switch 已切换，但工具仍用旧配置 {#cc-switch}

确认在对应应用下点击了 Micro Build AI 卡片的「启用」。Codex 需要退出旧会话并重新启动；终端环境变量、启动参数和组织配置也可能影响实际使用的服务商。

如果曾手动配置 Claude Code，核对是否仍保留旧的 `ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN` 或 `ANTHROPIC_API_KEY`。清除旧值后再启动并核对使用记录，详见 [CC Switch 教程](/tools/cc-switch)。

## Gemini CLI 仍走 Google 登录或没有平台记录 {#gemini-auth}

核对 `GEMINI_API_KEY` 与 `GOOGLE_GEMINI_BASE_URL` 是否设置在启动 CLI 的同一个终端，再通过 `/auth` 选择 **Use Gemini API key**。此前的 Google 登录、Vertex 配置或其他本地设置可能使客户端继续使用原认证方式。

平台密钥需要 Gemini 原生权限。收到回复后仍要检查使用记录，不能只凭欢迎界面判断接入成功；详见 [Gemini CLI 教程](/tools/gemini)。

## Antigravity CLI、桌面 IDE 和平台通道有什么区别 {#antigravity}

- **Antigravity CLI（`agy`）**：本教程使用 `modelProvider: "gemini"`、`GEMINI_API_KEY` 和自定义根地址接入平台。配置文件是 `.gemini/antigravity-cli/settings.json`，与 Gemini CLI 不同。
- **Antigravity 桌面 IDE**：按 Google 账号使用官方内置 Agent。CLI 的 API key 配置不能直接套用到这个 Agent，官方账号额度与 Micro Build AI 余额也不互通。
- **平台的 Antigravity 专用通道**：是管理员分配的请求入口。是否填写 `/antigravity` 由通道配置决定，与自己使用哪款编辑器是不同的事情。

详细步骤、地址选择和恢复 Google 登录的方法见 [Antigravity 教程](/tools/antigravity)。

## 429：限流或并发限制 {#rate-limit}

暂停批量操作，降低同时运行的任务数量，等待后再试。如果响应包含 `Retry-After`，按其指示等待。避免连续快速重试。

持续失败时，提供发生时间、模型和 Request ID，由管理员确认用户、密钥或服务端的限制。

## 请求超时、网络失败或 5xx {#timeout}

先检查能否打开平台，再用[快速开始中的模型列表检查](/getting-started#可选-先检查密钥和模型列表)确认鉴权。使用短消息重试，暂时关闭批量任务。

流式请求可能仍在服务端执行；重试前先看使用记录，避免同一个任务被重复提交。持续出现 5xx 时，记录时间和 Request ID 后联系管理员。

## 已付款，但余额没有更新 {#payment}

1. 回到平台刷新余额和订单状态，稍等片刻后再次查看。
2. 核对订单所属账号、金额与支付结果。
3. 仍未到账时，保留订单号、支付时间、金额和付款成功凭证，联系平台管理员。

**不要为同一笔已付款订单反复支付。** 分享支付凭证前，遮盖不相关的个人信息。

## 客户端有回复，但平台没有使用记录 {#usage}

核对客户端是否选中了 Micro Build AI 服务商和目标模型。部分工具仍会对某些功能使用内置服务。记录可能有延迟，可以稍后刷新，并检查时间范围或密钥筛选条件。

若是 Cursor，先确认使用的是自定义聊天模型；Tab 等功能不属于本教程的接入范围。

## 找不到教程里的按钮或入口 {#interface}

界面可能随客户端或平台版本更新，管理员也可能关闭部分入口。按功能名称查找；本站登录图为真实公开页面截图，配置图标注了「示意图」，用于说明填写顺序。找不到充值、注册或模型权限时，联系平台管理员。

## 需要管理员协助时，提供什么 {#support}

| 提供的信息 | 示例或说明 |
| --- | --- |
| 发生时间与时区 | 例如北京时间 14:30，方便核对记录。 |
| 工具与版本 | 所用工具的版本；Antigravity 请注明 CLI 或桌面 IDE。 |
| 模型 ID | 客户端实际填写的模型调用 ID。 |
| 错误信息 | HTTP 状态码与已脱敏的错误正文。 |
| Request ID | 如果响应或记录中有此字段，提供完整 ID。 |
| 密钥用途 | 只提供密钥名称或掩码，不提供完整值。 |
| 支付问题 | 订单号、金额、支付时间和已脱敏的凭证。 |

怀疑密钥泄露时，先停用或删除旧密钥，检查使用记录，再创建并配置新密钥。
