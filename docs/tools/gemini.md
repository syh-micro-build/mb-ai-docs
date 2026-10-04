---
title: Gemini CLI
description: 使用 Gemini CLI 连接 Micro Build AI 的 Gemini 原生接口，配置密钥、根地址与模型，并验证首次调用。
---

# Gemini CLI

用 Gemini 在终端里阅读代码、整理思路和完成任务。本页介绍 **Gemini CLI** 接入 Micro Build AI；Gemini 网页和手机应用使用 Google 账号，不按本页配置平台密钥。

<div class="guide-summary">

**💎 本页目标：** 连接 Gemini 原生接口，收到回复并核对平台使用记录。

**需要准备：** Gemini CLI、个人 API Key，以及支持 Gemini 原生接口的模型与分组。

</div>

## 1. 准备地址、密钥和模型

先在平台[创建 API Key](/api-key)，向管理员确认该密钥支持 **Gemini 原生 API**，再复制可用的 Gemini 模型调用 ID。只有 OpenAI 兼容接口权限时，不能直接套用本页配置。

| 配置项 | 填写方式 |
| --- | --- |
| `GOOGLE_GEMINI_BASE_URL` | `https://ai.mbuild.top`，或管理员指定的 Gemini 接入根地址 |
| `GEMINI_API_KEY` | 自己的 Micro Build AI 完整密钥 |
| `GOOGLE_GENAI_API_VERSION` | `v1beta`，对应本页的 Gemini 原生路由 |
| 模型 | 平台已开通、CLI 支持的 Gemini 模型调用 ID |

CLI 会在根地址后拼接 `/v1beta/models/...`；根地址不要添加 `/v1`、`/v1beta` 或 `/docs/`。认证由客户端处理，不要在密钥前添加 `Bearer `。

::: tip 管理员指定了 Antigravity 专用通道？
使用 `https://ai.mbuild.top/antigravity` 作为根地址时，请求对应 `/antigravity/v1beta/...`。此入口需要管理员确认，不能仅凭模型名称自行切换。具体选择见 [Antigravity 教程](/tools/antigravity#endpoint)。
:::

<GuideFigure name="gemini" alt="Gemini CLI 接入三步：准备平台 Gemini 密钥与模型，设置根地址和 API Key，选择 API key 认证后检查回复与使用记录" caption="💎 接入示意图。Gemini 使用原生协议，完整地址与模型权限以平台为准。" />

## 2. 安装并检查版本

先安装 Node.js 22 或更高的受支持版本，再按 [Gemini CLI 官方安装说明](https://geminicli.com/docs/get-started/installation/)安装：

```bash
npm install -g @google/gemini-cli
gemini --version
```

看到版本号后继续。在 Windows 和 WSL 中，分别使用实际运行 CLI 的环境。

## 3. 为当前终端配置

在将要启动 Gemini CLI 的终端执行对应示例。密钥通过隐藏输入提供，模型按提示输入。已有 Google 或 Vertex 配置时先记下原值；示例只清除当前终端中可能冲突的两项变量。

::: code-group

```powershell [Windows PowerShell]
Remove-Item Env:GOOGLE_API_KEY, Env:GOOGLE_GENAI_USE_VERTEXAI -ErrorAction SilentlyContinue
$env:GOOGLE_GEMINI_BASE_URL = 'https://ai.mbuild.top'
$env:GOOGLE_GENAI_API_VERSION = 'v1beta'
$secureKey = Read-Host 'Micro Build AI API Key' -AsSecureString
$env:GEMINI_API_KEY = [System.Net.NetworkCredential]::new('', $secureKey).Password
Remove-Variable secureKey
$geminiModel = Read-Host '平台提供的 Gemini 模型 ID'
gemini --model $geminiModel
```

```bash [macOS / Linux / WSL（bash）]
# macOS 默认使用 zsh 时，先运行 bash。
unset GOOGLE_API_KEY GOOGLE_GENAI_USE_VERTEXAI
export GOOGLE_GEMINI_BASE_URL='https://ai.mbuild.top'
export GOOGLE_GENAI_API_VERSION='v1beta'
read -r -s -p 'Micro Build AI API Key: ' GEMINI_API_KEY
printf '\n'
export GEMINI_API_KEY
read -r -p '平台提供的 Gemini 模型 ID: ' gemini_model
gemini --model "$gemini_model"
```

:::

管理员指定专用通道时，先将示例中的根地址改为 `https://ai.mbuild.top/antigravity`。不要同时配置两个根地址。

首次出现认证选项时，选择 **Use Gemini API key**。曾经使用 Google 登录的用户，可通过 `/auth` 切换认证方式；Google 登录与 Vertex AI 不会使用本页的平台密钥配置。配置项的含义见[官方认证说明](https://geminicli.com/docs/get-started/authentication/)与[配置参考](https://geminicli.com/docs/reference/configuration/)。

## 4. 验证第一条请求

在一个自己的测试目录启动工具，按提示确认目录权限，然后发送：

> 请用一句话介绍你能做什么，暂时不要修改文件或运行命令。

收到回复后，在 Micro Build AI 使用记录中核对时间、模型、密钥和费用。版本号、登录界面或模型列表正常，只能证明部分步骤已完成。

::: tip ✅ 模型选择
首次验证建议用完整模型 ID 启动，方便核对。自动路由、备用模型和辅助功能可能调用其他模型；若出现权限错误，按记录确认实际请求的 ID，再向管理员核对开通范围。[官方模型选择说明](https://geminicli.com/docs/cli/model/)介绍了 `--model` 与 `/model` 的行为。
:::

## 常见问题

| 现象 | 下一步 |
| --- | --- |
| 仍然要求 Google 登录 | 在 `/auth` 中选择 API key 认证，核对启动终端的变量。 |
| 401 或密钥无效 | 确认使用平台完整密钥，未过期、停用，没有 `Bearer ` 或多余空格。 |
| 404，路径出现 `/v1/v1beta` 或重复版本号 | 根地址只保留站点根或管理员指定前缀，确认 Gemini 原生接口已开通。 |
| 主模型能用，随后报另一个模型无权限 | 查看实际请求记录，核对备用或辅助模型权限。 |
| 有回复但平台没有记录 | 检查 API key 认证、根地址与密钥，确认没有切回 Google 登录。 |

更多排查见 [FAQ](/faq#gemini-auth)。

## 结束测试与保管密钥

退出 CLI 后，可以关闭终端，或清除本页设置的会话变量：

::: code-group

```powershell [Windows PowerShell]
Remove-Item Env:GEMINI_API_KEY, Env:GOOGLE_GEMINI_BASE_URL, Env:GOOGLE_GENAI_API_VERSION -ErrorAction SilentlyContinue
Remove-Variable geminiModel -ErrorAction SilentlyContinue
```

```bash [macOS / Linux / WSL（bash）]
unset GEMINI_API_KEY GOOGLE_GEMINI_BASE_URL GOOGLE_GENAI_API_VERSION gemini_model
```

:::

清除前先退出 CLI；已经运行的进程不会同步清除其继承的变量。本页配置只影响当前终端，重新打开时需要再次输入。不要把真实密钥写入项目中的 `.env`、`.gemini/settings.json`、截图或公开日志；曾有其他配置时，按自己的记录恢复。
