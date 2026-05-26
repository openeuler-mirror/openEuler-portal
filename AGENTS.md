# Agent 项目指南

## 项目概述

openEuler VitePress 官网项目，使用 `.geo/` 目录管理 SEO/GEO 配置。

## 重要文档

- **SEO 实现详解**: [geo-implementation-summary.md](./geo-implementation-summary.md)

## 目录结构

```
D:\code\euler\
├── app/                    # 主要代码目录
│   ├── zh/                 # 中文页面 md 文件
│   ├── en/                 # 英文页面 md 文件
│   └── .vitepress/
│       └── config.ts       # VitePress 配置，SEO 钩子
├── .geo/                   # SEO 配置目录
│   ├── tdks/               # TDK 配置
│   │   ├── zh/{path}/index.json
│   │   └── en/{path}/index.json
│   ├── jsonld/             # JSON-LD 配置
│   │   ├── zh/{path}/index.json
│   │   └── en/{path}/index.json
│   └── last-modified.json  # 构建时生成
├── .claude/                # Claude skills 目录
│   └── skills/             # SEO 相关 skills
├── .opencode/              # opencode 配置目录
│   └── commands/           # 自定义命令
└── CLAUDE.md               # Claude Code 项目指南
```

## SEO 配置路径规则

**文件路径与页面 URL 一一对应**:

| 页面 URL | TDK 配置文件 | JSON-LD 配置文件 |
|----------|-------------|-----------------|
| `zh/migration` | `.geo/tdks/zh/migration/index.json` | `.geo/jsonld/zh/migration/index.json` |
| `en/approve` | `.geo/tdks/en/approve/index.json` | `.geo/jsonld/en/approve/index.json` |
| `zh/sig/Kernel` | `.geo/tdks/zh/sig/Kernel/index.json` | `.geo/jsonld/zh/sig/Kernel/index.json` |

## 配置格式

### TDK 配置 (`\u200b.geo/tdks/zh/migration/index.json`)
```json
{
  "title": "openEuler迁移方案 | openEuler迁移中心",
  "description": "openEuler助力企业简单、平稳、高效...",
  "keywords": "openEuler迁移,迁移工具,CentOS迁移"
}
```

### JSON-LD 配置 (`\u200b.geo/jsonld/zh/sig/Kernel/index.json`)
```json
[
  { "@type": "Organization", "name": "openEuler Kernel SIG", ... },
  { "@type": "CollectionPage", "numberOfItems": 21, ... },
  { "@type": "FAQPage", "mainEntity": [...] }
]
```

## 新增页面流程

1. **创建 md 文件**: 在 `app/zh/` 或 `app/en/` 创建页面
2. **创建 SEO 配置**: 在 `.geo/` 目录创建对应配置文件
   - `.geo/tdks/{locale}/{path}/index.json`
   - `.geo/jsonld/{locale}/{path}/index.json`
3. **或使用 frontmatter**: 在 md 文件中内嵌配置
   ```yaml
   ---
   seoTitle: "页面标题"
   seoDescription: "页面描述"
   jsonLd: { ... }
   ---
   ```

## 批量生成 SEO 配置

**使用 Commands**:
```
/generate-tdk-local app/.vitepress/dist
/generate-schema-local app/.vitepress/dist
```

**使用 Skills**:
- `sitemap-meta-tags-batch-generator` - TDK 批量生成
- `sitemap-schema-batch-generator` - JSON-LD 批量生成

## 关键代码位置

- SEO 钩子: `app/.vitepress/config.ts` 第 184-194 行
- TDK 设置: `setTdk` 函数 (config.ts 第 44-88 行)
- JSON-LD 设置: `setJSONLD` 函数 (config.ts 第 24-42 行)

## 配置优先级

1. md 文件 frontmatter 内嵌配置（最高）
2. `.geo/` 目录配置文件
3. 自动生成（以上都不存在时）

## Skills 目录

```
.claude/skills/
├── sitemap-meta-tags-batch-generator/   # TDK 批量生成
├── sitemap-schema-batch-generator/      # JSON-LD 批量生成
├── meta-tags-optimizer/                 # 单页 TDK 优化
├── schema-markup-generator/             # 单页 JSON-LD 生成
└── ... (其他 SEO skills)
```

## 常见问题

**Q: 如何查找某页面的 SEO 配置？**
A: 根据页面路径直接定位文件，如 `zh/migration` → `.geo/tdks/zh/migration/index.json`

**Q: SIG 页面配置在哪？**
A: SIG 页面与其他页面统一管理，如 `zh/sig/Kernel` → `.geo/jsonld/zh/sig/Kernel/index.json`

**Q: 如何批量生成缺失的配置？**
A: 使用 `/generate-tdk-local` 和 `/generate-schema-local` 命令

---

## 代码规范

> 完整规范见 `rules/` 目录，以下为必须遵守的核心约束。

### 路径别名

| 别名 | 路径 | 用途 |
|------|------|------|
| `~@/` | `app/.vitepress/src-new/` | 新版代码（所有新功能必须使用） |
| `@/` | `app/.vitepress/src/` | 旧版代码（禁止在新功能中新增引用） |
| `opendesign` | `./opendesign` | 本地 OpenDesign 组件库 |

### UI 组件：必须优先使用 OpenDesign

**凡是 OpenDesign 有对应组件的场景，必须使用，禁止用原生 HTML 元素替代。**

```vue
<!-- ✅ 正确 -->
<OButton type="primary">提交</OButton>
<OSelect v-model="val"><OOption value="a">A</OOption></OSelect>
<OTable :data="list" />

<!-- ❌ 禁止 -->
<button class="btn">提交</button>
<select v-model="val"><option value="a">A</option></select>
<table>...</table>
```

常用组件：`OButton` `OIcon` `OLink` `OTable` `OSelect`+`OOption` `ODialog` `OPopover` `ODivider` `OToggle` `OPagination`
覆盖样式使用 `:deep()`，不要重写组件。

### Vue 组件规范

- 必须使用 `<script setup lang="ts">`
- Vue API 必须**显式 import**（VitePress 无 Nuxt 式自动注入）：
  ```typescript
  import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
  ```
- Props 用 TypeScript 泛型语法，类型名以 `PropsT` 结尾：
  ```typescript
  interface CardPropsT { title: string; subtitle?: string; }
  const props = withDefaults(defineProps<CardPropsT>(), { subtitle: undefined });
  ```
- i18n：通过 `useLocale()` 获取 `t`，zh/en 两份翻译必须同步
- 埋点：使用 `v-analytics.bubble="{ target: '...' }"` 指令
- SSR 安全：`window`/`document` 只能在 `onMounted` 或 `import.meta.client` 中访问，浏览器专属组件用 `<ClientOnly>` 包裹

### API 调用

- 始终从 `~@/shared/axios` 导入 `request`，禁止自建 axios 实例
- 所有异步调用必须有 `try/catch` + `loading` 状态：
  ```typescript
  const loading = ref(false);
  const fetchData = async () => {
    loading.value = true;
    try {
      const res = await getSomeData(params);
      list.value = res.list ?? [];
    } catch (error) {
      console.error('描述:', error);
    } finally {
      loading.value = false;
    }
  };
  ```
- API 文件命名：`api-[模块名].ts`，放在 `~@/api/`

### 状态管理

- 全局状态用 Pinia（`~@/stores/`），禁止使用 Nuxt 的 `useState`/`useFetch`
- 解构响应式数据必须用 `storeToRefs(store)`，直接解构会丢失响应性

### 样式规范

- 禁止硬编码颜色，统一使用 CSS 变量（`var(--o-color-info1)`、`var(--o-color-brand1)` 等）
- 禁止硬编码断点，使用 `@include respond-to('phone')` 等 mixin（已全局注入，无需 import）
- 断点参考：`phone`(≤600px)、`<=pad_v`(≤840px)、`<=pad`(≤1200px)、`laptop`(1201~1440px)
- 响应式 JS 状态：`const { isPhone, lePadV, gtPad } = useScreen()`
- 禁止 `!important`，禁止超过 3 层 SCSS 嵌套，禁止内联样式（特殊动态值除外）

### TypeScript 规范

- 类型文件放在 `~@/@types/[模块名].ts`
- 类型命名：`SigItemT`（单条）、`SigListT`（列表）、`SigDetailT`（详情）、`SigQueryT`（请求参数）
- 禁止 `@ts-ignore`，禁止空 `catch {}`，禁止用类型断言绕过类型检查

### Git 规范

- Commit 格式：`type(scope): 描述`（支持中文）
  ```
  feat(sig): 新增 SIG 详情页会议列表
  fix(search): 修复分页在切换关键词时未重置
  refactor(geo): 重构 .geo 目录结构
  ```
- 禁止直接推送 `master`，通过 MR 合并
- 禁止提交 `console.log`/`debugger`、构建产物、敏感信息

### 完整规范文档

| 规范文件 | 内容 |
|---------|------|
| [rules/01-naming.md](./rules/01-naming.md) | 命名规范（路径别名、文件、组件、i18n key） |
| [rules/02-components.md](./rules/02-components.md) | Vue 组件规范（结构顺序、Props、OpenDesign、SSR） |
| [rules/03-typescript.md](./rules/03-typescript.md) | TypeScript 规范（类型组织、命名约定） |
| [rules/04-api-and-state.md](./rules/04-api-and-state.md) | API 与状态管理规范 |
| [rules/05-styling.md](./rules/05-styling.md) | 样式规范（CSS 变量、响应式、SCSS） |
| [rules/06-git.md](./rules/06-git.md) | Git 工作流规范 |