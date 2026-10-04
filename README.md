# Micro Build AI 使用文档

面向 Micro Build AI 平台用户的独立 VitePress 文档站。v0.1 引导用户从登录、余额确认和创建 API Key，走到第一次成功调用与使用记录核对。

- 平台：<https://ai.mbuild.top/>
- 目标文档地址：<https://ai.mbuild.top/docs/>
- 仓库：<https://github.com/syh-micro-build/mb-ai-docs>
- 部署路径固定为 `base: '/docs/'`；文档与 Sub2API 独立构建、独立发布。

## 本地开发

使用 Node.js 22 与 npm 10。依赖版本记录在 `package-lock.json` 中；`.nvmrc` 可供版本管理器使用。

```bash
npm ci
npm run docs:dev
```

打开终端显示的 `/docs/` 地址，通常是 <http://localhost:5173/docs/>。

## 构建与校验

```bash
npm run check
npm run docs:preview
```

`check` 依次检查 TypeScript 配置、构建 VitePress，再验证生成 HTML 的语言、品牌标题、MVP 页面、内部链接、锚点与资源路径。VitePress 构建保留死链接检查，不通过忽略错误绕过。

默认构建产物为 `docs/.vitepress/dist/`，预览地址通常是 <http://localhost:4173/docs/>。开发与预览命令以终端输出的端口为准。

稳定版 VitePress 1.6.4 的默认依赖仍落在旧版 Vite 范围。本项目将 Vite 固定覆盖为 6.4.3（Vue 插件支持 Vite 6），以修复已公布的开发服务器安全问题，见 [Vite 官方修复公告](https://github.com/vitejs/vite/security/advisories/GHSA-fx2h-pf6j-xcff)。后续升级 VitePress 时应复核是否仍需此覆盖，并验证构建、预览与本地搜索。

## v0.1 内容与结构

```text
docs/
├── index.md                 # 首页与工具入口
├── getting-started.md       # 登录、余额、密钥与首次调用
├── api-key.md               # 创建、复制、管理与安全
├── tools/
│   ├── codex.md             # Responses / 自定义服务商
│   ├── cursor.md            # BYOK 与版本、模型兼容范围
│   └── cherry-studio.md     # OpenAI 服务商、模型与地址规则
├── faq.md                   # 鉴权、模型、限流、到账等问题
├── public/logo.svg          # 本站自制临时品牌标识
└── .vitepress/
    ├── config.ts            # 导航、侧栏、本地搜索、/docs/ base
    └── theme/               # 品牌样式与移动端布局
deploy/nginx-docs.conf       # 同域 /docs/ 静态挂载示例
scripts/check-site.mjs       # 产物校验
.github/workflows/docs.yml   # PR、main 与手动构建校验
```

没有单独生成尚未编写的功能页。充值、计费与消费记录的 MVP 内容合并在快速开始与 FAQ 中；后续可按用户需求扩展。

## 发布到 `/docs/`

构建结果是静态文件，运行时无需 Node.js 服务。由现有 Nginx 在同域 `/docs/` 下提供文档，其他请求继续沿用既有 Sub2API 配置。

1. 在可信构建环境执行 `npm ci` 和 `npm run check`。
2. 将 `docs/.vitepress/dist/` **内部的文件**复制到一个独立发布目录的 `docs/` 子目录，例如：

   ```text
   /opt/mbuild-ai-docs/releases/<版本>/docs/
   ├── index.html
   ├── getting-started.html
   ├── api-key.html
   ├── faq.html
   ├── tools/
   ├── assets/
   └── logo.svg
   ```

3. 将 `/opt/mbuild-ai-docs/current` 指向该发布目录。
4. 按实际路径调整 [Nginx 示例](deploy/nginx-docs.conf)，把其中的 location 添加到已有 HTTPS server 块，检查配置后再重新加载。
5. 验证 `/docs/`、`/docs/tools/codex` 的直接访问与刷新、搜索、导航及主题切换；不存在的路径应返回 404。不要将文档路径回退到 Sub2API 首页。
6. 在 Sub2API 当前版本提供的官方「文档链接」设置中填写 `https://ai.mbuild.top/docs/`，发布前确认该入口可用。

本项目使用 `cleanUrls: true`，所以 Nginx 要能把 `/docs/tools/codex` 映射到相应 `.html` 文件；示例中的 `try_files` 负责此映射。注意静态文件目录包含 `docs/` 这一层，与 `root` 和 `/docs/` 路径对应。

GitHub Actions 只校验并保存构建产物，不连接服务器、不修改 Sub2API、不自动上线，也不把本站部署到 GitHub Pages 的仓库子路径。

## GitHub Actions

工作流在针对 `main` 的 PR、`main` 更新和手动触发时运行，以最小 `contents: read` 权限执行：

1. Node.js 22 环境下 `npm ci`。
2. `npm run check`。
3. 保存 `docs/.vitepress/dist/` 为 `micro-build-ai-docs` 构建产物，供发布审核与下载。

所有内容变更从功能分支提交 PR。建议在仓库设置中把 `Validate docs` 设为合并前必需检查；本次实现不修改仓库保护规则。

## 内容维护与截图

- 平台域名更新时，同步替换配置、所有教程与本 README 中的地址；`/docs/` 部署路径变化时还需修改 `base`、favicon 地址、产物校验和 Nginx 示例。
- `gpt-5.6-sol` 仅为已确认方案中的示例 ID。模型权限、兼容协议和价格以平台当前展示为准，不给所有用户或客户端承诺此模型可用。
- API Key 永远使用占位、环境变量或掩码，不提交任何真实密钥。
- 用户页面不放运维命令或管理员教程；部署说明只在仓库 README 与 `deploy/` 内维护。
- 截图目前使用文字占位。实际补图前，在 Micro Build AI 的真实页面核对步骤；遮盖密钥、账号、付款个人信息与业务内容，将图片放在 `docs/public/images/` 并补充替代文本。
- `logo.svg` 为本站自制临时字母标识，后续可替换为正式 Micro Build AI 品牌素材。

## 内容来源

信息架构与新手教程写法参考 [QuantumNous/new-api-docs-v1](https://github.com/QuantumNous/new-api-docs-v1) 的用户指南与工具接入内容，详见 [CONTENT-SOURCES.md](CONTENT-SOURCES.md)。其 `content/docs/` 在核对时采用 CC0 1.0；本项目按 Micro Build AI 的 Sub2API 用户场景重新编写，不导入其 Next.js / Fumadocs 源码、管理员教程、商标、Logo、截图或专用配置脚本。

客户端操作另按官方资料核对。由于没有访问当前生产控制台或使用真实密钥调用，实际模型权限、支付入口、界面差异及客户端端到端连接仍需在上线验收时确认。
