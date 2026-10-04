---
title: Cursor
description: 在 Cursor 中尝试自定义 OpenAI 兼容接口，确认模型与客户端的兼容范围。
---

# Cursor

适合希望在代码编辑器中使用聊天模型的用户。Cursor 的自带密钥接入有模型与功能限制；先确认当前版本允许自定义 Base URL，并且你选择的模型属于兼容范围。

::: warning 先确认兼容性
Cursor 官方当前说明：自定义 API Key 支持聊天模型，OpenAI 接入限标准非推理聊天模型；Tab 补全仍使用 Cursor 内置模型。不要默认将 Codex 示例模型直接用于 Cursor，也不要把 API Key 接入理解为所有 Cursor 功能都会使用 Micro Build AI。
:::

## 准备工作

- 已安装 Cursor，并可以打开 Cursor Settings。
- 已[创建 API Key](/api-key)并确认余额。
- 已从平台复制一个适用于 OpenAI 兼容聊天接口、且被当前 Cursor 版本支持的模型 ID。

| 配置项 | 填写值 |
| --- | --- |
| OpenAI API Key | Micro Build AI 的完整密钥 |
| Override OpenAI Base URL | `https://ai.mbuild.top/v1` |
| Model ID | 平台当前可用且符合 Cursor 兼容范围的模型 ID |

## 快速配置

1. 打开 **Cursor Settings → Models**，找到 OpenAI 的 API Key 设置；某些版本会将其放在 API Keys 小节。
2. 填入自己的 Micro Build AI 密钥。
3. 如果当前版本提供 **Override OpenAI Base URL**，启用它并填入 `https://ai.mbuild.top/v1`，再保存或启用对应密钥。
4. 在模型管理或 Add Model 入口添加兼容的模型 ID，并启用该模型。
5. 打开聊天面板，从模型选择器中选择刚添加的模型。

如果没有自定义地址入口，或当前版本拒绝所选模型，请先按 Cursor 官方说明确认版本支持情况，也可以使用[Cherry Studio](/tools/cherry-studio)验证平台接入。

<GuideFigure name="client-fields" alt="客户端配置示意，分别核对平台地址、个人密钥和当前支持的模型 ID；Cursor 使用带 /v1 的地址" caption="📝 配置示意图，并非 Cursor 界面截图。Cursor 地址填写 https://ai.mbuild.top/v1；按钮和支持范围以当前版本为准。" />

## 验证配置

先发送一条简单聊天消息，确认有回复，再查看 Micro Build AI 的使用记录，核对时间、模型和密钥。

仅看到 Cursor 的验证按钮通过，还不足以确认实际聊天走了 Micro Build AI。若平台没有相应记录，检查聊天面板是否选择了目标模型、自定义地址与密钥是否处于启用状态。

## 切换模型

从平台复制另一个兼容聊天模型的调用 ID，在 Cursor 添加并切换。模型在平台可用，并不一定代表 Cursor 支持该模型或协议。自动选择、内置模型和自定义模型可能使用不同的接入路径。

## 常见问题

| 现象 | 检查方式 |
| --- | --- |
| 密钥验证或聊天失败 | 检查 Base URL 覆盖、密钥启用状态，以及模型与当前版本的兼容范围。 |
| 提示模型不存在 | 检查完整模型 ID、密钥权限和平台当前可用模型列表。 |
| 报 401、429 或超时 | 先按[FAQ](/faq)排查；必要时用快速开始中的模型列表检查鉴权。 |
| 自定义聊天可用，但 Tab 不走平台 | Tab 使用 Cursor 内置模型，按官方功能说明确认支持范围。 |

## 安全提示

为 Cursor 创建独立密钥，截图时只保留掩码。Cursor 官方说明，请求会经过其服务器完成提示构建，密钥会随请求通过加密连接传输；因此请仅接入你信任的客户端。

官方参考：[Cursor 自带 API Key 说明](https://cursor.com/help/models-and-usage/api-keys)。
