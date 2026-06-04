# openEuler Portal — Agent 指南

> 本文件是所有 AI 编码工具（Claude Code、OpenCode、Cursor、Codex 等）的**唯一入口**，遵循 [agents.md](https://agents.md) 业界标准。
> Claude Code 新版本会自动回退读取 AGENTS.md，无需额外 CLAUDE.md。

---

## 1. 项目速览

openEuler 官网，基于 **VitePress** 构建。

- 包管理器：**pnpm**（`pnpm-workspace.yaml`）
- UI：**@opensig/opendesign**（本地软链 `./opendesign`）+ Element Plus
- 状态：Pinia（`~@/stores/`）
- 国际化：vue-i18n（`zh` / `en` 双语必须同步）
- SEO/GEO：`.geo/` 目录按页面路径管理 TDK 与 JSON-LD，详见 [docs/geo-implementation-summary.md](./docs/geo-implementation-summary.md)

### 常用命令

| 命令 | 用途 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 生产构建 |
| `pnpm lint` / `pnpm fix` | ESLint 检查 / 修复 |
| `pnpm lint:style` | StyleLint 修复 |
| `pnpm skills:sync` | 同步 OpenDesign Skills（4 个）到 `.claude/skills/` |
| `pnpm gen:token` | 重新生成设计令牌 CSS 变量 |

---

## 2. 目录结构

```
openEuler-portal/
├── app/
│   ├── zh/ , en/                    # md 页面（双语）
│   └── .vitepress/
│       ├── config.ts                # 入口配置 + transformPageData（SEO 钩子）
│       ├── src-new/                 # 新版源码（所有新功能必须使用此路径）
│       │   ├── api/                 # api-*.ts，axios 调用
│       │   ├── @types/              # 业务类型定义
│       │   ├── components/          # 通用组件
│       │   ├── composables/         # useXxx
│       │   ├── stores/              # Pinia
│       │   ├── views/               # 页面级大组件
│       │   ├── assets/style/        # SCSS + token 主题
│       │   └── tokens/              # @opensig/opendesign-token 配置
│       └── src/                     # 旧版源码（兼容，禁止新增引用）
├── .geo/                            # SEO 配置（按页面路径组织）
│   ├── tdks/{locale}/{path}/index.json
│   ├── jsonld/{locale}/{path}/index.json
│   └── last-modified.json           # 构建时生成
├── .claude/
│   ├── commands/                    # 项目自有 slash 命令
│   ├── skills/                      # opendesign-* + SEO skills（受 skills-lock.json + skills:sync 管理）
│   ├── settings.json                # 团队共享 settings（read-only 白名单）
│   └── settings.local.json          # 本地覆盖（git 忽略）
├── docs/
│   ├── geo-implementation-summary.md   # SEO 实现深度文档
│   └── content-self-service.md
├── rules/                           # 代码规范（工具无关，本文件以相对链接索引，任何 AI 工具按需 Read）
│   ├── naming.md
│   ├── components.md
│   ├── typescript.md
│   ├── api-and-state.md
│   ├── styling.md
│   └── git.md
├── scripts/
│   ├── check-git-shallow.js
│   └── sync-opendesign-skills.js   # OpenDesign skills 增量同步
├── skills-lock.json                 # aaron-he-zhu/seo-geo-claude-skills 锁定
└── AGENTS.md                        # 本文件（所有 AI agent 唯一入口）
```

### 路径别名（必读）

| 别名 | 实际路径 | 用途 |
|------|---------|------|
| `~@/` | `app/.vitepress/src-new/` | 新版（推荐，所有新功能） |
| `@/` | `app/.vitepress/src/` | 旧版（兼容，禁止新引用） |
| `opendesign` | `./opendesign` | 本地 OpenDesign |
| `#cms` | `./.cms/export/index.client.ts` | CMS 导出 |

---

## 3. Skills 与 Commands

### Skills 来源（两类共存，共 9 个）

| 类别 | 内容 | 来源 | 入 git | 同步方式 |
|------|------|------|--------|----------|
| `opendesign-*`（4 个） | components / design / scripts / tokens | `atomgit.com/openeuler/opendesign-skills` | ❌ | `pnpm skills:sync` |
| 项目自有（5 个） | meta-tags-optimizer / schema-markup-generator / sitemap-meta-tags-batch-generator / sitemap-schema-batch-generator / vue-best-practices | 项目维护 | ✅ | 直接维护 |

> opendesign 4 个被 [.gitignore](./.gitignore) 排除（`.claude/skills/*/` + 5 个项目自有的 `!` 例外）。
> 新开发者 `git clone` 后**必须**先 `pnpm install`，postinstall 自动恢复 4 个 opendesign skill。
>
> meta-tags-optimizer / schema-markup-generator 原本来自上游 `aaron-he-zhu/seo-geo-claude-skills`，是 sitemap-* 工作流的依赖；为避免引入 `skills` CLI 依赖和无关的 18 个 SEO 工具，已内联入项目自有维护。其余 SEO 工具（关键词调研 / 竞品 / 外链等）不在本项目使用场景，不再纳入。

**自动同步时机**（package.json 已配 `postinstall` + `predev`）：

| 触发命令 | 行为 |
|---|---|
| `pnpm install` | postinstall 自动同步 |
| `pnpm dev` | predev 自动同步（启动前刷新） |
| `pnpm skills:sync` | 手动同步 |

**容错策略**：sync 脚本默认 **graceful fail**——网络不可达 / git 缺失时只 warn，不阻塞 install/dev。

**环境变量**：

| 变量 | 默认 | 用途 |
|---|---|---|
| `OPENDESIGN_SKILLS_REPO` | atomgit.com/openeuler/opendesign-skills | 切换上游仓库 |
| `OPENDESIGN_SKILLS_REF` | `master` | 锁定 tag / commit / 分支 |
| `SKILLS_SYNC_SKIP=1` | — | 显式跳过（离线/Docker build 时用） |
| `CI=true` | — | CI 环境自动跳过（避免每次构建都 clone） |
| `SKILLS_SYNC_STRICT=1` | — | 失败时 exit 1（CI 主动校验上游可用性时用） |

> 脚本：[scripts/sync-opendesign-skills.js](./scripts/sync-opendesign-skills.js)。不用 `pnpx skills add` 的原因：该 CLI 对 atomgit 等非 github 源支持不稳定。

### 项目 Slash 命令

| Command | 用途 |
|---------|------|
| `/generate-tdk-local app/.vitepress/dist` | 从本地 HTML 批量生成 TDK |
| `/generate-schema-local app/.vitepress/dist` | 从本地 HTML 批量生成 JSON-LD |

### 常用 Skill 触发场景

| 场景 | Skill |
|------|-------|
| 写/改 Vue 组件 | `opendesign-components`、`vue-best-practices` |
| 颜色/间距/圆角想知道哪个 token | `opendesign-tokens` |
| 跑构建/图标生成/编译样式 | `opendesign-scripts` |
| Pixso 设计稿生产 | `opendesign-design` |
| TDK 批量优化 | `sitemap-meta-tags-batch-generator` |
| JSON-LD 批量生成 | `sitemap-schema-batch-generator` |

---

## 4. SEO/GEO 配置

**路径规则**：文件路径与页面 URL 一一对应

```
页面 zh/sig/Kernel  →  .geo/tdks/zh/sig/Kernel/index.json
                    →  .geo/jsonld/zh/sig/Kernel/index.json
```

**配置优先级**：md frontmatter > `.geo/` 配置 > 自动生成

**新增页面流程**：
1. 在 `app/zh/` 或 `app/en/` 创建 `.md`
2. 创建对应 `.geo/tdks/{locale}/{path}/index.json` 和 `.geo/jsonld/{locale}/{path}/index.json`
3. 或在 md frontmatter 内嵌 `seoTitle` / `seoDescription` / `jsonLd`

**关键代码位置**：
- `app/.vitepress/config.ts` 第 24-42 行（`setJSONLD`）
- `app/.vitepress/config.ts` 第 44-88 行（`setTdk`）
- 完整说明：[docs/geo-implementation-summary.md](./docs/geo-implementation-summary.md)

---

## 5. 代码规范（必读）

详细规则放在仓库根 `rules/` 目录（工具无关，任何 AI 工具 —— Claude Code / OpenCode / Cursor / Codex / Trae —— 按需 Read）：

| 规范领域 | 文件 |
|---------|------|
| 命名约定 | [rules/naming.md](rules/naming.md) |
| 组件规范 | [rules/components.md](rules/components.md) |
| TypeScript 规范 | [rules/typescript.md](rules/typescript.md) |
| API 与状态 | [rules/api-and-state.md](rules/api-and-state.md) |
| 样式规范 | [rules/styling.md](rules/styling.md) |
| Git 工作流 | [rules/git.md](rules/git.md) |

### 红线（出现频次最高的"踩坑"）

1. **必须用 OpenDesign 组件**：`OButton`/`OSelect`/`OTable`/`ODialog` 等存在的场景，禁止原生 HTML 替代。覆盖样式用 `:deep()`。
2. **Vue API 必须显式 import**（VitePress 没有 Nuxt 式自动注入）：`import { ref, computed, ... } from 'vue'`。
3. **新功能只用 `~@/` 别名**（`@/` 是旧版兼容路径，禁止新增引用）。
4. **API 调用必须 `try/catch` + `loading`**，axios 实例只能从 `~@/shared/axios` 拿，禁止 `axios.create`。
5. **样式必须用 CSS 变量**（`var(--o-color-info1)`、`var(--o-spacing-h4)`），断点必须用 `respond-to` mixin，禁止硬编码。
6. **SSR 安全**：`window`/`document` 只能在 `onMounted` 或 `import.meta.client` 中访问，浏览器专属组件用 `<ClientOnly>`。
7. **i18n 双语同步**：通过 `useLocale()` 拿 `t`，zh/en 翻译文件必须同步更新。
8. **类型命名约定**：`SigItemT`（单条）/ `SigListT`（列表）/ `SigDetailT`（详情）/ `SigQueryT`（参数）。

---

## 6. Lint / 格式检查

提交前**必须**通过 ESLint 和 StyleLint。Agent 完成代码改动后，主动跑一次 lint，有错先修。

### 命令

| 命令 | 检查范围 | 何时跑 |
|------|---------|--------|
| `pnpm lint` | `app/.vitepress/src/**/*.{js,ts,vue,jsx,tsx}` 的 ESLint | 改动 TS/Vue/JS 文件后 |
| `pnpm fix` | 同上，自动修复 | lint 报错后第一选择 |
| `pnpm lint:style` | `app/.vitepress/**/*.(vue\|scss)` 的 StyleLint，自动修复 | 改动样式后 |
| `pnpm lint:components` | `opendesign/**/*` 的 ESLint | 改动本地 OpenDesign 组件库时 |

### 配置入口

- **ESLint**：[eslint.config.js](./eslint.config.js)（flat config，主配置）+ [.eslintrc.js](./.eslintrc.js)（兼容）
- **StyleLint**：项目根目录（无独立配置文件时使用包默认）
- **Prettier**：[.prettierrc.js](./.prettierrc.js)
- **TypeScript 严格模式**：[tsconfig.json](./tsconfig.json) 已开 `strict: true`，禁止降级

### 已知关键规则（agent 易踩坑）

- `any` → ESLint warn，特殊情况必须注释说明原因，禁止 `@ts-ignore`
- 空 `catch {}` → 必须 `console.error(...)` 或处理
- `console.log` / `debugger` → 提交前必须清理
- StyleLint 禁止 `!important`、禁止超过 3 层嵌套（详见 [rules/styling.md](./rules/styling.md)）

### Pre-commit 钩子现状

**[.husky/pre-commit](./.husky/pre-commit) 中的 `pnpm lint-staged` 当前是注释状态**，提交时不会自动 lint。

`package.json` 的 `lint-staged` 配置已就绪：

```json
"lint-staged": {
  "app/.vitepress/src/**/*.{js,ts,vue,jsx,tsx}": ["pnpm lint"]
}
```

要启用自动校验，把 `.husky/pre-commit` 改为：

```sh
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

> **Agent 注意**：在 hook 启用前，**改完代码后必须主动跑 `pnpm lint && pnpm lint:style`**，并报告结果。不要假设 husky 会兜底。

### CI / 提交流程检查清单

- [ ] `pnpm lint` 无 error（warn 评估后决定是否修）
- [ ] `pnpm lint:style` 无 error
- [ ] `pnpm build` 构建无报错
- [ ] zh / en 双语页面均已验证（涉及 i18n 时）
- [ ] 无 `console.log` / `debugger` 残留
- [ ] commit 信息符合 `type(scope): 描述` 格式

---

## 7. Git 规范摘要

- Commit：`type(scope): 描述`（支持中文），type ∈ `feat|fix|refactor|style|docs|test|chore|perf|revert`
- 禁止 `git push --force`、禁止直推 `master`、禁止提交 `console.log`/`debugger`/构建产物/敏感信息
- 详见 [rules/git.md](./rules/git.md)

---

## 8. Memory 与 Agent 协作约定

- 项目级 memory：本文件 + `rules/*` + `docs/*`
- 用户级 memory：见 `~/.claude/projects/.../memory/MEMORY.md`
- 评审/PR 评论/贡献统计相关查询，**先过滤 `openeuler-ci-bot` 等机器人账号**（已记录在用户 memory）
