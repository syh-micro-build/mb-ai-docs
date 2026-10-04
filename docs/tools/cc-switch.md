---
title: CC Switch
description: 在 CC Switch 中分别为 Codex 与 Claude Code 添加 Micro Build AI 服务商，填写地址、密钥和模型并启用验证。
---

# CC Switch

CC Switch 用图形界面管理编程工具的服务商配置。适合希望少改配置文件，或需要在多个服务商之间切换的用户。实际请求仍由 Codex、Claude Code 等工具发起。

<div class="guide-summary">

**🎯 本页目标：** 添加并启用 Micro Build AI，然后回到对应工具测试。

**操作顺序：** 选择应用 → 添加服务商 → 填写三项信息 → 保存并启用。

</div>

## 1. 准备工具和密钥

从 [CC Switch 官方仓库](https://github.com/farion1231/cc-switch)或其 [Releases](https://github.com/farion1231/cc-switch/releases) 下载适用于自己系统的安装包。另需按对应教程安装 [Codex](/tools/codex) 或 [Claude Code](/tools/claude-code)，在平台[创建个人 API Key](/api-key)并复制可用模型 ID。

首次使用前，备份工具已有的用户配置。CC Switch 会将服务商配置写入本地文件；配置、导出文件和数据库备份可能包含完整密钥，应保存在自己信任的位置。

## 2. 先选择要配置的应用

在 CC Switch 主界面选择 **Codex** 或 **Claude / Claude Code**，再点击右上角 **+** 添加供应商。选择「应用专属供应商」与「自定义」配置，名称填写 `Micro Build AI`。

界面名称随版本可能变化，按功能含义查找即可。Codex 和 Claude Code 的地址与协议不同，需要分别配置：

| 应用 | 地址 | 需要的模型与协议 |
| --- | --- | --- |
| Codex | `https://ai.mbuild.top/v1` | 支持 Responses 的模型 |
| Claude Code | `https://ai.mbuild.top` | 获准使用的 Claude 模型 / Anthropic Messages |

<GuideFigure name="cc-switch" alt="CC Switch 按应用配置：Codex 填 /v1 地址和 Responses 模型，Claude Code 填根地址和 Messages 模型，保存后启用" caption="配置示意图，并非 CC Switch 实际界面截图。以当前版本表单为准，完整地址使用 https。" />

## 3. 配置 Codex {#codex}

在 **Codex** 应用下添加自定义供应商：

1. 服务商名称填写 `Micro Build AI`。
2. API Key 填入自己的完整密钥。
3. 请求地址填写 `https://ai.mbuild.top/v1`。
4. 模型填写平台当前支持 Responses 的完整调用 ID。
5. 如果版本提供「上游格式」，选择原生 **Responses**，然后保存。

首次接入使用平台原生 Responses 路径。只有 Chat Completions 权限时，先向管理员确认适用接口；本教程不需要配置协议转换。

::: details 自定义配置编辑器如何填写
有些版本将 Codex 配置拆成 **auth.json** 和 **config.toml** 两个编辑区域。auth.json 区域提供密钥：

```json
{
  "OPENAI_API_KEY": "YOUR_MICRO_BUILD_AI_KEY"
}
```

`YOUR_MICRO_BUILD_AI_KEY` 必须替换为自己的密钥。在 config.toml 区域合并下面的服务商与模型设置，将示例模型替换为自己的可用模型 ID：

```toml
model_provider = "micro_build_ai"
model = "gpt-5.6-sol"

[model_providers.micro_build_ai]
name = "Micro Build AI"
base_url = "https://ai.mbuild.top/v1"
wire_api = "responses"
requires_openai_auth = false
supports_websockets = false
```

不要重复定义已有同名字段或表；模型等顶层字段放在第一个 `[表名]` 前。CC Switch 管理密钥写入方式，与 [Codex 手动环境变量教程](/tools/codex)的配置方法不同。当前官方说明中，第三方密钥可能写入本地 `config.toml`，所以不能把它当作可公开分享的文件。字段和写入规则详见 [CC Switch 添加供应商说明](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md)。
:::

## 4. 配置 Claude Code {#claude}

在 **Claude / Claude Code** 应用下另建一个自定义供应商，名称填写 `Micro Build AI`。请求地址填写 `https://ai.mbuild.top`，密钥填写自己的平台密钥，主模型填写平台开通的 Claude 模型 ID。

若当前版本显示 JSON 配置编辑器，合并如下内容；完整密钥与模型 ID 均需替换：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://ai.mbuild.top",
    "ANTHROPIC_AUTH_TOKEN": "YOUR_MICRO_BUILD_AI_KEY",
    "ANTHROPIC_MODEL": "YOUR_AVAILABLE_CLAUDE_MODEL_ID"
  }
}
```

本例采用 Bearer 认证。已有 `ANTHROPIC_API_KEY` 时，移除其中的旧值，避免与 `ANTHROPIC_AUTH_TOKEN` 并存；管理员明确要求 `x-api-key` 时，改用 `ANTHROPIC_API_KEY` 并只保留这一种凭证。如果还显示 Sonnet、Opus、Haiku 等角色映射，按平台实际提供的 Claude 模型能力填写，不要把不可用的默认模型保留下来。

模型与 Messages 权限需提前开通，细节见 [Claude Code 教程](/tools/claude-code)。

## 5. 保存、启用并验证

保存后，回到对应应用的供应商列表，在 Micro Build AI 卡片上点击 **启用**，确认卡片显示当前启用状态。添加到列表只是保存配置，还需要启用它。

Codex 切换后退出旧会话并重新启动。Claude Code 支持配置重载；首次验证时也可以退出旧会话再启动，以便核对当前模型。若终端里还留有旧服务商的环境变量，先清除相关旧值再启动。

在对应工具中发送一条小请求，例如「请用一句话介绍你能做什么，不修改文件」，收到回复后，回到平台核对使用记录。

::: tip ✅ 启用不等于调用成功
卡片状态表示配置已切换。只有工具收到有效回复，且平台使用记录对应本次时间、密钥和模型，才完成了接入。
:::

## 常见问题

| 现象 | 下一步 |
| --- | --- |
| 切换 Codex 后 Claude 配置没变 | 每个应用分别维护供应商；在目标应用下单独添加并启用。 |
| 保存了但工具还用旧服务商 | 确认已点击启用，检查启动参数、环境变量，并重新启动旧会话。 |
| 获取模型失败 | 核对地址与密钥；也可手动填写平台提供的完整模型 ID。 |
| Claude Code 出现 404 | 检查根地址没有重复 `/v1`，确认平台开通 Messages。 |
| Codex 出现协议错误 | 检查 `/v1` 地址、Responses 格式与模型权限。 |
| 401、余额不足或限流 | 见 [常见问题](/faq)。 |

::: info 💡 关于跨应用配置
CC Switch 也提供统一供应商和本地路由等功能。初次接入建议先按本页分别完成两个应用；跨应用同步配置不会自动为密钥开通更多模型与接口权限。
:::

官方参考：[添加供应商](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.1-add.md)、[切换与生效方式](https://github.com/farion1231/cc-switch/blob/main/docs/user-manual/zh/2-providers/2.2-switch.md)。
