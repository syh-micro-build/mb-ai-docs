# 内容来源与适配记录

核对日期：2026-10-04。本文记录参考关系，便于后续更新与审查；这里的来源链接不属于面向用户的导航。

## 主要内容参考

参考仓库：[QuantumNous/new-api-docs-v1](https://github.com/QuantumNous/new-api-docs-v1)，核对提交 `e7b2cf9d586e3c735a53dbfb55e67e6d10605b57`。

[该提交的 LICENSE](https://github.com/QuantumNous/new-api-docs-v1/blob/e7b2cf9d586e3c735a53dbfb55e67e6d10605b57/LICENSE) 将 `content/docs/` 的正文、示例等按 CC0 1.0 提供，源码采用 MIT；商标和 Logo 除外。本项目只参考用户内容的组织与步骤表达，未迁移源码与图片。

| 参考内容 | 本站处理 |
| --- | --- |
| [API 密钥](https://github.com/QuantumNous/new-api-docs-v1/blob/e7b2cf9d586e3c735a53dbfb55e67e6d10605b57/content/docs/zh/guide/feature-guide/user/token.mdx) | 采用创建、复制、管理与安全的顺序；不迁移 Auto 分组、跨分组重试、聊天预设等专属选项。 |
| [Codex CLI](https://github.com/QuantumNous/new-api-docs-v1/blob/e7b2cf9d586e3c735a53dbfb55e67e6d10605b57/content/docs/zh/apps/codex-cli.mdx) | 缩短安装说明，按官方当前配置重写；不使用远程安装脚本，不复制品牌与截图。 |
| [Cherry Studio](https://github.com/QuantumNous/new-api-docs-v1/blob/e7b2cf9d586e3c735a53dbfb55e67e6d10605b57/content/docs/zh/apps/cherry-studio.mdx) | 采用密钥、服务商、模型、聊天验证的路径；不迁移控制台一键导入设置与图像功能。 |

注册、余额、订单到账和使用记录按已确认的 Micro Build AI 新手路径编写，具体字段与可用功能以当前平台为准。本站不包含第三方平台的品牌图片，也不迁移其管理员、渠道、订阅或部署文档。

## 客户端与框架官方参考

- [Codex CLI](https://developers.openai.com/codex/cli/)、[高级配置](https://developers.openai.com/codex/config-advanced/)、[配置参考](https://developers.openai.com/codex/config-reference/)：用户级服务商、`env_key`、Responses 协议与配置位置。
- [Cursor API Key](https://cursor.com/help/models-and-usage/api-keys)：聊天模型接入范围、Tab 限制与请求经过服务器的说明；自定义 Base URL 入口需在当前安装版本中确认。
- [Cherry Studio 自定义服务商](https://docs.cherry-ai.com/pre-basic/providers/zi-ding-yi-fu-wu-shang)、[服务商设置](https://docs.cherry-ai.com/cherry-studio/preview/settings/providers)：添加服务商、启用、添加模型和地址补全规则。
- [VitePress 部署说明](https://vitepress.dev/guide/deploy)、[站点配置](https://vitepress.dev/reference/site-config)：静态构建与子路径部署。
- [Sub2API 网关路由](https://github.com/Wei-Shaw/sub2api/blob/main/backend/internal/server/routes/gateway.go)：区分聊天与 Responses 等接口；上游存在路由不代表当前部署或每个用户已获准使用。

官方资料会更新。上线验收需要核对平台实际模型、界面和客户端版本，文档中的占位截图须用本站脱敏截图替换。
