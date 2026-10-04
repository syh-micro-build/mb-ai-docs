---
title: Antigravity
description: 通过 Antigravity CLI 的 Gemini API key 模式连接 Micro Build AI，并了解桌面 IDE 与 CLI 的接入区别。
---

# Antigravity

Antigravity 提供终端 CLI 和桌面 IDE。**本页的平台密钥接入步骤适用于 Antigravity CLI（`agy`）的 Gemini API key 模式**；桌面 IDE 的入门步骤见[本页后半部分](#ide)。

<div class="guide-summary">

**🚀 本页目标：** 配置 `agy`，通过 Gemini 原生接口完成一次请求。

**需要准备：** Antigravity CLI、个人 API Key，以及平台开通的 Gemini 模型与接口权限。

</div>

## 1. 选择平台接入地址 {#endpoint}

在平台[创建独立 API Key](/api-key)，确认它支持 Gemini 原生接口。Antigravity CLI 使用 Gemini API key 模式时，通过 Gemini 协议请求模型；平台上的 Claude 或 GPT 权限不能直接套用到这个模式。

| 平台为你提供的通道 | `GOOGLE_GEMINI_BASE_URL` | 客户端拼接后的路径 |
| --- | --- | --- |
| 普通 Gemini 原生通道 | `https://ai.mbuild.top` | `/v1beta/models/...` |
| 管理员明确指定的 Antigravity 专用通道 | `https://ai.mbuild.top/antigravity` | `/antigravity/v1beta/models/...` |

不知道使用哪个时，先向管理员确认；不要仅凭客户端名称选择 `/antigravity`。通道是否可用取决于平台当前部署与密钥权限。根地址不添加 `/docs/`、`/v1`、`/v1beta` 或完整模型请求路径。

<GuideFigure name="antigravity" alt="Antigravity CLI 配置三步：在独立 settings.json 中启用 gemini 提供商，在当前终端设置平台根地址和密钥，启动 agy 选择 Gemini 模型并验证" caption="🚀 CLI 接入示意图，不是桌面 IDE 截图。仅选择管理员确认可用的 Gemini 通道。" />

## 2. 安装 Antigravity CLI

按 [Google 官方 CLI 安装说明](https://www.antigravity.google/docs/cli/install/)选择系统并安装，完成后打开新的终端。桌面 IDE 安装和 CLI 安装是不同步骤；确认终端能够运行 `agy`，再继续配置。

本页不要求登录 Google 账号；下一步会启用 CLI 官方支持的 API key 模式。

## 3. 启用 Gemini API key 模式

打开或创建**用户目录**中的 `.gemini/antigravity-cli/settings.json`。Windows 对应 `%USERPROFILE%\.gemini\antigravity-cli\settings.json`；macOS / Linux 对应 `~/.gemini/antigravity-cli/settings.json`。

如果已有设置，先备份，在同一个 JSON 对象中添加或更新这一项，保留其他字段：

```json
{
  "modelProvider": "gemini"
}
```

::: tip 💡 两个客户端的配置文件不同
Antigravity CLI 使用 `.gemini/antigravity-cli/settings.json`。不要写进 Gemini CLI 的 `.gemini/settings.json`；不要用上面的最小示例覆盖已有整份配置。
:::

## 4. 在启动终端提供密钥

以下默认使用普通 Gemini 通道。如果管理员指定专用通道，将根地址改为 `https://ai.mbuild.top/antigravity`，然后再执行。

::: code-group

```powershell [Windows PowerShell]
$env:GOOGLE_GEMINI_BASE_URL = 'https://ai.mbuild.top'
$secureKey = Read-Host 'Micro Build AI API Key' -AsSecureString
$env:GEMINI_API_KEY = [System.Net.NetworkCredential]::new('', $secureKey).Password
Remove-Variable secureKey
agy
```

```bash [macOS / Linux / WSL（bash）]
# macOS 默认使用 zsh 时，先运行 bash。
export GOOGLE_GEMINI_BASE_URL='https://ai.mbuild.top'
read -r -s -p 'Micro Build AI API Key: ' GEMINI_API_KEY
printf '\n'
export GEMINI_API_KEY
agy
```

:::

这里的 `GEMINI_API_KEY` 填自己的 **Micro Build AI 密钥**。密钥不加 `Bearer `，也不放在 URL 参数中。仅设置环境变量还不够，需要上一步的 `modelProvider: "gemini"`；CLI 不从 `.env` 文件或 `GOOGLE_API_KEY` 读取此模式的凭证。字段与行为见[官方安装与认证说明](https://www.antigravity.google/docs/cli/install/#using-a-gemini-api-key)。

## 5. 选择模型并验证

1. 启动后确认页头显示 **Gemini API key**，而不是账号邮箱。
2. 输入 `/model`，选择平台为该密钥开通、CLI 同时支持的 Gemini 模型；没有可用交集时，向管理员确认，或使用能明确指定模型 ID 的 [Gemini CLI](/tools/gemini)。
3. 发送「请用一句话介绍你能做什么，暂时不要修改文件或运行命令」。
4. 收到回复后，在平台核对请求的时间、模型、密钥和费用。

`/model` 的使用见 [CLI 官方参考](https://www.antigravity.google/docs/cli/reference/)。进入主界面只表示配置可读取；有效回复和平台记录才是接入成功的依据。

## 如果你使用桌面 IDE {#ide}

从 [Antigravity 官方下载页](https://www.antigravity.google/download)选择并安装 **Antigravity IDE**，按[官方 IDE 入门说明](https://codelabs.developers.google.com/getting-started-agy-ide)完成 Google 账号登录、打开自己的测试项目，在 Agent 界面选择可用模型，先发送一个简短任务并查看结果。

本节使用的是 Google 账号与其官方额度。根据[官方计划说明](https://www.antigravity.google/docs/plans/#other)，桌面 IDE 没有本页所用的平台密钥与自定义根地址接入入口；CLI 支持 API key 模式不代表桌面 IDE 的内置 Agent 同样支持。

如果希望在这个编辑器的项目中使用 Micro Build AI，可以在集成终端中按本页启动 `agy`，或使用 [Gemini CLI](/tools/gemini)、[Claude Code](/tools/claude-code)、[Codex](/tools/codex)；这些调用独立使用平台密钥与额度，桌面 IDE 内置 Agent 的额度不会与平台余额互通。

## 常见问题与恢复

| 现象 | 下一步 |
| --- | --- |
| 启动提示没有 `GEMINI_API_KEY` | 在启动 `agy` 的同一个终端输入密钥，检查 `modelProvider`。 |
| 仍然显示账号邮箱 | 确认配置路径是 `antigravity-cli/settings.json`，值为小写 `gemini`，退出后重新启动。 |
| 401、404 或模型不可用 | 核对完整密钥、根地址、Gemini 原生权限与所选模型。不要改成 OpenAI 的 `/v1`。 |
| 设置 `.env` 后不生效 | 此模式需要启动终端中的环境变量；按本页方式重新输入。 |
| `/logout` 没有清除平台密钥 | API key 模式的凭证来自环境变量，退出 CLI 后清除变量。 |

结束测试后，退出 CLI，在 PowerShell 中执行 `Remove-Item Env:GEMINI_API_KEY, Env:GOOGLE_GEMINI_BASE_URL -ErrorAction SilentlyContinue`；bash 中执行 `unset GEMINI_API_KEY GOOGLE_GEMINI_BASE_URL`。关闭终端也会结束本页的会话变量。

希望恢复 Google 账号登录时，在备份基础上移除 `modelProvider` 这一项，清除本页的会话变量，再重新启动 `agy`。仍保留 `modelProvider: "gemini"` 却清除密钥时，CLI 会在启动时报告缺少凭证。

不要把密钥写入项目文件、截图或聊天消息。更多排查见 [FAQ](/faq#antigravity)。
