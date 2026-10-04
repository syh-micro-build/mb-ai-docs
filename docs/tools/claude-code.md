---
title: Claude Code
description: 使用 Micro Build AI 的 Anthropic Messages 接口配置 Claude Code CLI，设置地址、密钥和模型并验证调用。
---

# Claude Code

在终端里与 Claude 一起阅读代码、完成修改和检查结果。本页介绍 **Claude Code CLI** 接入 Micro Build AI 的方式。

<div class="guide-summary">

**🎯 本页目标：** 连接平台，完成一条简单请求并核对使用记录。

**需要准备：** 已安装的 Claude Code、个人 API Key，以及获准使用的 Claude 模型。

</div>

## 1. 先确认模型与接口

在平台确认自己的密钥分组支持 **Anthropic Messages**，并复制当前可用的 Claude 模型 ID。Claude Code 使用 `/v1/messages` 接口；Codex 的 Responses 配置不能直接套用到这里。

| 配置项 | 填写值 |
| --- | --- |
| 平台根地址 | `https://ai.mbuild.top` |
| API Key | 自己[创建的完整密钥](/api-key) |
| 模型 ID | 平台为你开通的 Claude 模型调用 ID |
| 接口格式 | Anthropic Messages |

根地址不带 `/docs/`、`/v1` 或 `/messages`，Claude Code 会拼接请求路径。是否可用取决于平台当前模型、分组和余额；只有 OpenAI 兼容聊天权限时，请先向管理员确认 Messages 接入。

<GuideFigure name="claude-code" alt="Claude Code 设置平台根地址与密钥，通过 Micro Build AI 的 /v1/messages 接口发起请求，最后检查回复和使用记录" caption="接入示意图。模型 ID 和实际可用权限以平台为准。" />

## 2. 安装与确认版本

未安装时，按 [Claude Code 官方安装说明](https://code.claude.com/docs/en/setup#install-claude-code)选择自己的系统完成安装；安装后打开新的终端，运行：

```bash
claude --version
```

看到版本号即可继续。Windows 和 WSL 是不同的运行环境，在实际使用 Claude Code 的那一侧配置。

## 3. 选择一种配置方式

### 图形界面：通过 CC Switch

如果不熟悉环境变量，先看 [CC Switch 教程](/tools/cc-switch#claude)。在 Claude Code 应用下添加 Micro Build AI 服务商，填写根地址、密钥和 Claude 模型，保存并启用，再回到本页验证。

### 终端：为当前会话配置

如果希望先测试一次连接，在将要启动 Claude Code 的终端中执行下面的示例。密钥通过隐藏输入提供，模型 ID 按提示输入，避免将占位值误当作真实配置。

已有其他 Anthropic 配置时，先记下原设置；本示例使用 Bearer 认证，所以在当前终端移除旧的 `ANTHROPIC_API_KEY`，避免两种认证同时存在。

::: code-group

```powershell [Windows PowerShell]
Remove-Item Env:ANTHROPIC_API_KEY -ErrorAction SilentlyContinue
$env:ANTHROPIC_BASE_URL = 'https://ai.mbuild.top'
$secureKey = Read-Host 'Micro Build AI API Key' -AsSecureString
$env:ANTHROPIC_AUTH_TOKEN = [System.Net.NetworkCredential]::new('', $secureKey).Password
Remove-Variable secureKey
$env:ANTHROPIC_MODEL = Read-Host '平台提供的 Claude 模型 ID'
claude
```

```bash [macOS / Linux / WSL（bash）]
# macOS 默认使用 zsh 时，先运行 bash。
unset ANTHROPIC_API_KEY
export ANTHROPIC_BASE_URL='https://ai.mbuild.top'
read -r -s -p 'Micro Build AI API Key: ' ANTHROPIC_AUTH_TOKEN
printf '\n'
export ANTHROPIC_AUTH_TOKEN
read -r -p '平台提供的 Claude 模型 ID: ' ANTHROPIC_MODEL
export ANTHROPIC_MODEL
claude
```

:::

这些变量仅用于当前终端及其启动的进程。关闭终端后，重新打开时需要再次配置。不要同时依赖终端里的旧变量和 CC Switch 的新配置；环境变量可能使切换结果看起来没有生效。

::: tip 💡 更换认证方式
本教程使用 `ANTHROPIC_AUTH_TOKEN` 发送 Bearer 凭证。如果管理员明确要求 `x-api-key`，使用 `ANTHROPIC_API_KEY` 提供同一个平台密钥，并移除 `ANTHROPIC_AUTH_TOKEN`。只保留管理员要求的一种认证方式。详见 [Claude Code 官方网关接入说明](https://code.claude.com/docs/en/llm-gateway-connect)。
:::

## 4. 验证第一次请求

在自己准备的测试目录启动 Claude Code，按界面提示确认目录和权限，发送：

> 请用一句话介绍你能做什么，暂时不要修改文件或运行命令。

收到回复后，回到 Micro Build AI 使用记录，核对本次请求的时间、模型、密钥和费用。运行 `claude --version` 或打开欢迎界面成功，只能证明客户端能启动。

::: tip ✅ 完成检查
收到有效回复、平台记录可见、模型与密钥一致，就完成了接入。先用小请求确认连接，再开始实际任务。
:::

## 切换模型与常见问题

需要更换模型时，复制平台为你开通的另一个 Claude 模型 ID，更新 CC Switch 的模型字段，或通过 `claude --model <模型ID>` 启动。不要照搬其他工具中的 GPT 示例；模型名、权限与接口都需要匹配。[模型选择规则](https://code.claude.com/docs/en/model-config)见官方说明。

| 现象 | 下一步 |
| --- | --- |
| 提示找不到 `claude` | 重新打开终端，按官方安装说明检查安装目录和 PATH。 |
| 401 或凭证冲突 | 核对完整密钥，并检查是否同时保留了两种 Anthropic 认证变量。 |
| 404 或出现 `/v1/v1/messages` | 将根地址改为 `https://ai.mbuild.top`，确认平台支持 Messages。 |
| 模型不可用或没有权限 | 复制平台提供的 Claude 模型调用 ID，核对密钥分组、余额与模型权限。 |
| CC Switch 切换后仍用旧服务商 | 检查终端环境变量、用户配置和启动参数，退出旧会话后重新启动。 |

更多错误排查见 [FAQ](/faq)。

## 保管密钥

不要把密钥写进项目仓库中的 `.claude/settings.json`，也不要分享环境变量、终端历史或配置备份中的完整值。使用 CC Switch 时，本地配置和备份也需要保管好。

使用结束后，可关闭当前终端；如需在同一终端继续其他工作，先清除本次设置的 `ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_BASE_URL` 和 `ANTHROPIC_MODEL`，再恢复自己的原配置。

官方参考：[安装说明](https://code.claude.com/docs/en/setup)、[网关接入](https://code.claude.com/docs/en/llm-gateway-connect)、[接口兼容说明](https://code.claude.com/docs/en/llm-gateway-protocol)。
