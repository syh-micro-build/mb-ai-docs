---
title: Cherry Studio
description: 添加 Micro Build AI 服务商和模型，在 Cherry Studio 开始第一段对话。
---

# Cherry Studio

适合想用桌面客户端聊天、阅读和整理文字的用户。本页使用自定义 **OpenAI** 服务商接入，先完成普通文本对话。

<div class="guide-summary">

**🍒 接入路线：** 添加服务商 → 填写地址和密钥 → 添加模型 → 开始聊天。

</div>

## 准备工作

- 已从 [Cherry Studio 官网](https://cherry-ai.com/)安装客户端。
- 已[创建 API Key](/api-key)，并确认余额。
- 已从平台当前模型列表复制支持 OpenAI 兼容聊天接口的模型 ID。

| 配置项 | 填写值 |
| --- | --- |
| 服务商名称 | `Micro Build AI` |
| 服务商类型 | `OpenAI` |
| API 地址 | `https://ai.mbuild.top` |
| API Key | 自己创建的完整密钥 |
| 模型 ID | 平台当前可用的聊天模型调用 ID |

::: tip Cherry Studio 的地址填写方式
Cherry Studio 通常会自动追加 `/v1/chat/completions`，所以本页填写站点地址 `https://ai.mbuild.top`。按官方规则，也可用 `https://ai.mbuild.top/v1/` 明确指定版本路径。不要填写 `https://ai.mbuild.top/docs/`，避免重复拼接成 `/v1/v1`。若当前版本的地址规则变化，请以客户端提示和官方说明为准。
:::

## 快速配置

### 1. 添加服务商

打开 **设置 → 模型服务 → 添加服务商**。名称填写 `Micro Build AI`，类型选择 `OpenAI`，保存。

### 2. 填写地址和密钥

选中刚添加的服务商，填写 API 地址和完整密钥，打开服务商的启用开关。

### 3. 添加模型

点击管理或添加模型。若自动获取成功，从列表中添加你有权限的聊天模型；也可手动输入从平台复制的模型 ID。显示名称可自定义，但调用 ID 必须与平台一致。

不要仅获取模型列表而忘记添加模型。只有已添加且服务商已启用的模型，才会出现在聊天选择器中。

### 4. 开始聊天

返回聊天界面，选中 Micro Build AI 服务商下的目标模型，发送一条简短消息。

<GuideFigure name="client-fields" alt="Cherry Studio 配置示意，分别填写平台地址、完整个人密钥和模型 ID，再选择服务商与模型开始聊天" caption="配置示意图，并非 Cherry Studio 界面截图。按本页规则填写根地址 https://ai.mbuild.top，密钥只在自己的客户端中填完整值。" />

## 验证配置

确认收到有效回复后，回到平台使用记录，核对时间、模型、密钥与费用。连接检查可能使用客户端已添加的某个模型；检查失败时，确认测试模型本身有权限且支持聊天协议。

## 切换模型

在服务商设置中添加另一个平台当前可用的聊天模型，再在聊天界面切换。图片、语音、嵌入和知识库等能力需要各自对应的模型与接口权限，普通文本聊天成功不能证明这些能力也已开通。

## 常见问题

| 现象 | 检查方式 |
| --- | --- |
| 模型列表为空 | 确认密钥与地址正确，可手动添加平台提供的模型 ID。 |
| 模型已添加但聊天面板找不到 | 确认服务商已启用，并在模型管理中完成添加。 |
| 404 或接口路径重复 | 使用本页推荐地址，检查有没有重复 `/v1` 或误填完整接口路径。 |
| 检查连接失败 | 核对检查所使用的模型，再发送一次小型聊天请求。 |
| 401、余额不足、429 或超时 | 按[常见问题](/faq)处理。 |

## 安全提示

为 Cherry Studio 使用独立密钥。分享截图、备份、导出配置或日志前，确认其中没有完整密钥和业务内容。

官方参考：[自定义服务商](https://docs.cherry-ai.com/pre-basic/providers/zi-ding-yi-fu-wu-shang)、[服务商设置与地址规则](https://docs.cherry-ai.com/cherry-studio/preview/settings/providers)。
