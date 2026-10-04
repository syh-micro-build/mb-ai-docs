---
title: 5 分钟快速开始
description: 完成登录、余额确认、创建 API Key 和第一次模型调用。
---

# 5 分钟快速开始

Micro Build AI 为你的 AI 工具提供统一的模型接入入口。你在平台管理余额、密钥和使用记录，在 Codex、Cursor 或 Cherry Studio 中实际使用模型。

已经安装工具的用户，可以按下面的步骤完成首次配置。安装、充值到账或网络排查可能需要额外时间。

## 1. 注册或登录

打开 [Micro Build AI 平台](https://ai.mbuild.top/)，按页面提示注册并登录。如果注册入口没有开放，联系平台管理员获取账号。平台登录密码用于登录网页；接入工具需要单独创建 API Key。

::: info 界面说明占位
待补充 Micro Build AI 登录页的脱敏截图。当前按页面上的「注册」「登录」入口操作即可。
:::

## 2. 确认余额

在平台首页或个人面板查看当前余额。余额不足时，从平台的充值入口选择金额和支付方式，核对订单后支付。

- 金额、支付方式与价格以平台当前展示为准。
- 支付后回到平台，确认余额已更新，再开始调用。
- 已付款但余额未更新时，保留订单号和支付凭证，按[充值到账排查](/faq#payment)处理。

本教程按余额计费的使用流程编写。请求产生的费用可在平台使用记录中核对。

## 3. 创建个人 API Key

打开平台的「API Key」或「API 密钥」页面，创建一个便于识别用途的密钥，例如 `my-cherry-studio`。如果页面要求选择分组，选择管理员提供的可用分组。

按界面提示复制完整密钥，保存到自己的密码管理器中。详细管理步骤见[创建与管理 API Key](/api-key)。

## 4. 准备接入三要素

| 配置项 | 本站填写方式 |
| --- | --- |
| Base URL | `https://ai.mbuild.top/v1`，不同工具的自动补全规则见各自教程。 |
| API Key | 你刚创建的完整密钥。示例 `YOUR_MICRO_BUILD_AI_KEY` 只是占位，不能直接使用。 |
| Model | 从平台当前模型列表或模型广场复制完整模型 ID，确认该密钥可用。 |

文档中的 `gpt-5.6-sol` 是接入示例。实际可用模型、协议和价格会变化，始终以平台当前显示及密钥权限为准。模型的展示名称可能与调用 ID 不同，请复制调用 ID。

::: tip 地址不要混用
`https://ai.mbuild.top/` 是平台网页；`https://ai.mbuild.top/docs/` 是使用文档；API 工具通常填写 `https://ai.mbuild.top/v1`。不要把文档地址或完整请求路径填进 Base URL。
:::

## 5. 选择一个工具完成配置

| 你想做什么 | 下一步 |
| --- | --- |
| 在终端里使用 AI 编程助手 | [配置 Codex](/tools/codex)，需要支持 Responses API 的模型。 |
| 在代码编辑器里使用聊天模型 | [配置 Cursor](/tools/cursor)，先确认版本和模型兼容范围。 |
| 先体验一段普通对话 | [配置 Cherry Studio](/tools/cherry-studio)。 |

配置完成后，发送一条简短消息，例如「请用一句话介绍你能做什么」。先用小请求确认连接，再处理长文档或复杂任务。

## 6. 确认首次调用成功

满足下面三项，就完成了首次使用：

1. 客户端收到模型的有效回复。
2. 平台使用记录中出现对应时间、模型和密钥的请求。记录可能稍有延迟，可刷新查看。
3. 在使用记录中核对用量和费用，再查看余额变化。

::: info 界面说明占位
待补充 Micro Build AI 使用记录截图，只保留时间、模型、用量与费用等字段；隐藏账号信息、完整密钥和业务内容。
:::

有回复但没有记录时，先确认客户端选中了 Micro Build AI 服务商，且没有使用工具内置服务。请求失败时，保留错误信息，查看[常见问题](/faq)。

## 可选：先检查密钥和模型列表

如果客户端无法连接，可以先查询模型列表。下面是只读检查，不会发送聊天内容；它只能验证地址和鉴权，不能证明模型推理已成功。

::: code-group

```bash [macOS / Linux（bash）]
# macOS 默认使用 zsh 时，先运行 bash，再执行本示例。
# 在当前终端输入密钥，输入过程不显示在屏幕上。
read -r -s -p "Micro Build AI API Key: " MICRO_BUILD_AI_API_KEY
printf '\n'
export MICRO_BUILD_AI_API_KEY

curl --fail-with-body "https://ai.mbuild.top/v1/models" \
  -H "Authorization: Bearer $MICRO_BUILD_AI_API_KEY"

# 完成检查后清除当前终端中的密钥。
unset MICRO_BUILD_AI_API_KEY
```

```powershell [Windows PowerShell]
$secureKey = Read-Host 'Micro Build AI API Key' -AsSecureString
$env:MICRO_BUILD_AI_API_KEY = [System.Net.NetworkCredential]::new('', $secureKey).Password

Invoke-RestMethod -Uri 'https://ai.mbuild.top/v1/models' -Headers @{
  Authorization = "Bearer $env:MICRO_BUILD_AI_API_KEY"
}

# 完成检查后清除当前终端中的密钥。
Remove-Item Env:MICRO_BUILD_AI_API_KEY
Remove-Variable secureKey
```

:::

不要发送包含完整 Authorization 请求头的日志或截图。需要管理员协助时，提供时间、模型、状态码与 Request ID 即可。
