---
title: Codex
description: 在 Codex CLI 中配置 Micro Build AI 服务商、API 地址和环境变量。
---

# Codex

适合希望在终端里阅读、修改和检查代码的用户。本页以 **Codex CLI** 为配置入口；需要先有 Micro Build AI 密钥，以及支持 Responses API 的可用模型。

## 准备工作

- 已安装 Codex CLI。未安装时，按 [Codex 官方安装文档](https://developers.openai.com/codex/cli/)安装；npm 安装命令为 `npm install -g @openai/codex`。
- 已在平台[创建 API Key](/api-key)，并确认余额足够。
- 已从平台模型列表复制模型 ID，确认管理员为该密钥开通了 Responses API 接入。

| 配置项 | 填写值 |
| --- | --- |
| 服务商名称 | `Micro Build AI` |
| Base URL | `https://ai.mbuild.top/v1` |
| API Key | 用环境变量 `MICRO_BUILD_AI_API_KEY` 提供 |
| 示例模型 | `gpt-5.6-sol`，替换为平台当前可用且支持 Responses 的模型 ID |

## 快速配置

### 1. 合并用户配置

打开用户级配置文件：

| 环境 | 默认位置 |
| --- | --- |
| Windows | `%USERPROFILE%\.codex\config.toml` |
| macOS / Linux | `~/.codex/config.toml` |
| Windows 中的 WSL | WSL 用户目录内的 `~/.codex/config.toml` |

若设置过 `CODEX_HOME`，以其指定目录中的 `config.toml` 为准。先备份已有文件，再合并下面的项目；已有同名字段或表时修改原位置，避免重复定义。顶层 `model` 与 `model_provider` 必须放在第一个 `[表名]` 之前。

```toml
model = "gpt-5.6-sol"
model_provider = "micro_build_ai"

[model_providers.micro_build_ai]
name = "Micro Build AI"
base_url = "https://ai.mbuild.top/v1"
env_key = "MICRO_BUILD_AI_API_KEY"
wire_api = "responses"
requires_openai_auth = false
supports_websockets = false
```

这里使用 HTTP Responses 接入，关闭 WebSocket 传输。完整密钥不写进配置文件。

::: tip 配置位置
服务商设置应写在用户级配置中。当前 Codex 会忽略项目内 `.codex/config.toml` 的服务商配置；托管设备还可能有组织策略限制。配置字段以 [Codex 官方配置参考](https://developers.openai.com/codex/config-reference/)为准。
:::

### 2. 在当前终端提供密钥

::: code-group

```powershell [Windows PowerShell]
$secureKey = Read-Host 'Micro Build AI API Key' -AsSecureString
$env:MICRO_BUILD_AI_API_KEY = [System.Net.NetworkCredential]::new('', $secureKey).Password
Remove-Variable secureKey
codex
```

```bash [macOS / Linux / WSL]
# 在 bash 中运行；输入时不会显示密钥。
read -r -s -p "Micro Build AI API Key: " MICRO_BUILD_AI_API_KEY
printf '\n'
export MICRO_BUILD_AI_API_KEY
codex
```

:::

macOS 默认使用 zsh 时，可先运行 `bash`，再执行上面的 bash 示例。环境变量只在当前终端及其启动的进程中有效，重新打开终端需要重新提供密钥。Windows 与 WSL 的用户目录和环境变量彼此独立，应在实际运行 Codex 的环境中配置。

## 验证配置

在自己准备的测试目录启动 Codex，按界面提示选择权限，发送一个简单请求，例如「请用一句话介绍你能做什么，不需要修改文件」。

1. 检查当前模型和服务商配置对应 Micro Build AI。
2. 确认收到有效回复。
3. 回到平台使用记录，核对本次模型、密钥和费用。

::: info 配置示意占位
待补充使用 Micro Build AI 服务商的 Codex 终端截图，只展示服务商、模型与测试回复，不展示密钥或业务代码。
:::

## 切换模型

从平台复制另一个支持 Responses 的模型 ID，使用 `codex --model <模型ID>` 启动，或修改用户配置中的 `model`。不要把模型展示名称当作调用 ID，也不要假定所有平台模型都适用于 Codex。

## 常见问题

| 现象 | 检查方式 |
| --- | --- |
| 提示缺少 `MICRO_BUILD_AI_API_KEY` | 在启动 Codex 的同一个终端提供环境变量；WSL 中需单独设置。 |
| TOML 解析失败 | 检查是否重复定义字段或表，以及顶层字段是否写在表之前。 |
| 401、权限或余额错误 | 核对密钥完整值、状态、余额与分组权限，见[FAQ](/faq)。 |
| `/responses` 返回 404 或协议错误 | 确认地址包含一次 `/v1`，且管理员已为所选模型与密钥开通 Responses 接入。 |
| 配置未生效 | 核对用户目录、`CODEX_HOME`、启动参数或组织策略，关闭旧进程后重新启动。 |

## 安全提示

只在自己信任的项目目录中启动 Codex，按任务需要选择权限。不要为排查连接问题关闭所有权限检查，不要把密钥写入项目配置或分享终端环境变量截图。

退出使用后，可在 PowerShell 中执行 `Remove-Item Env:MICRO_BUILD_AI_API_KEY`，或在 bash 中执行 `unset MICRO_BUILD_AI_API_KEY` 清除当前终端的密钥。

官方参考：[安装与使用](https://developers.openai.com/codex/cli/)、[自定义服务商配置](https://developers.openai.com/codex/config-advanced/#custom-model-providers)。
