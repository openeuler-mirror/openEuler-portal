# 社区内容可自助设计说明

> **目标**: 将全站运营数据从代码耦合态解耦为声明式 YAML 数据源，建立「运营者 → YAML → 构建插件 → 视图渲染」的自助式内容供给链路，使运营人员可在不接触 TypeScript / Vite 生态的前提下完成内容变更并通过 PR 预览、发布。
> **适用范围**: `app/.vitepress/src/data/` 下所有运营高频变更的数据；开发常量（`data/common/*`）不在迁移范围。

---

## 1. 问题域分析

### 1.1 现状痛点

`data/` 下 40+ 个文件共享三类结构性问题：

| 痛点 | 典例 | 本质 |
| --- | --- | --- |
| **代码与数据耦合** | `organization.ts` 134 个 image import + 数据数组混写 | 加/改/删一条记录需同时触碰 import、zh 数组、en 数组三处，运营无法独立操作 |
| **中英文各自维护** | 几乎所有文件 `{ zh: {...}, en: {...} }` 分两棵树 | 改完中文忘改英文是高频 bug，两棵树无结构约束强制同步 |
| **同类数据字段不一致** | 委员会用 `position[]`、技术委员会用 `post`、工作组用 `position[]` 但语义是 role | 同一种数据（人员名册）在不同页面字段命名各不相同，运营需为每种页面学习不同规则 |

`.cms/` 是上一版解耦尝试（Strapi 风格 schema/content/export 三层 + VSCode 插件录入），适合字段多、引用复杂的结构化数据，但对 `data/` 里「列表 + 简单嵌套」的运营高频变更场景过于厚重。

### 1.2 核心用例与架构约束

| 角色 | 操作 | 架构约束 |
|--- | --- | --- |
| 运营 | 修改委员会成员姓名 / 头像 | 仅改 YAML 单条记录，无需涉及 TS 文件 |
| 运营 | 新增 Banner 轮播项 | `banner.yaml` 新增数组项 + 放入图片，构建自动生效 |
| 运营 | 同步中英文内容 | `_en` 后缀与基线字段同条记录相邻，不可能遗漏 |
| 开发 | 新页面接入 `.content/` | 创建 domain 目录 + YAML + 类型声明，视图一行 |
| 系统 | 构建期校验 | 路径不存在 / 必填缺失 → 构建失败，而非运行时 broken |

### 1.3 架构分层与关注点分离

```
┌─────────────────────────────────────────────────────────┐
│                    视图层 (Vue Components)                │
│  import from '#content/<domain>' + foldI18n() + 排序/筛选 │
└─────────────────────┬───────────────────────────────────┘
                      │ 一行虚拟模块 import
┌─────────────────────▼───────────────────────────────────┐
│              i18n 纯函数层 (foldI18n)                     │
│  职责: _en 后缀折叠 → 基线字段，递归、纯函数、无副作用    │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│           构建插件层 (vite-plugin-content-yaml)           │
│  职责 A: *.yaml → JS module + 图片路径 → import 改写      │
│  职责 B: #content/<domain> → 目录级虚拟模块聚合           │
└─────────────────────┬───────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────┐
│              数据源层 (.content/**/*.yaml)                │
│  职责: 声明式内容描述，零代码逻辑，运营直接编辑            │
└─────────────────────────────────────────────────────────┘
```

| 层 | 关注点 | 不关心的 |
| --- | --- | --- |
| 数据源层 | 内容「有什么」（人员、标题、链接、图片路径） | 渲染布局、样式、排序策略 |
| 构建插件层 | 资源路径解析 + 模块聚合 | i18n 折叠、业务排序 |
| i18n 层 | 语言字段折叠 | 图片 URL、渲染方式 |
| 视图层 | 排序、筛选、锚点派生、渲染 | 数据加载、图片 hash |

### 1.4 数据流：构建期 → 运行时

```
构建期 (vite build / vitepress build):

  .content/<domain>/<section>.yaml
      │
      │ vite-plugin-content-yaml (load hook)
      │  1. js-yaml.load → JS object
      │  2. walk: "./images/x.png" → import __a0 from './images/x.png'
      │  3. output: JS module with asset imports
      ▼
  单文件 → ES module (图片字段 = hashed URL)

  .content/<domain>/ (directory)
      │
      │ vite-plugin-content-yaml (resolveId + load)
      │  readdir → [section-a.yaml, section-b.yaml, ...]
      │  → virtual module: { section-a: __d0, section-b: __d1, ... }
      ▼
  #content/<domain> → 以文件名(slug)为 key 的聚合对象

运行时 (browser):

  Vue component
      │ import raw from '#content/<domain>'
      │ const data = SECTIONS.map(slug => foldI18n(raw[slug], lang))
      ▼
  渲染：已折叠的语言字段 + 已解析的图片 URL + 代码定义的排序
```

构建产物中 YAML 编译为 JS module，图片经 Vite asset pipeline 输出至 `/assets/<hash>.png`，与常规 VitePress 构建产物同构分发。无额外部署单元或外部服务依赖。

### 1.5 项目结构映射

```text
openEuler-portal/
├── .content/                                # 运营数据统一入口（与代码仓库同源）
│   ├── organization/                        # Domain: 组织名册
│   │   ├── README.md                        # 运营操作手册
│   │   ├── advisory.yaml                    # Section slug = 文件名
│   │   ├── committee.yaml
│   │   ├── technical.yaml
│   │   └── images/                          # Domain 级图片资源池
│   ├── faq-migration/                       # Domain: 迁移 FAQ
│   ├── nav-about-us/                        # Domain: 导航 TOC
│   ├── events-salon/                        # Domain: 活动
│   └── (按需新增)/
├── app/.vitepress/
│   ├── plugins/
│   │   └── vite-plugin-content-yaml.ts      # 构建插件
│   ├── src-new/
│   │   ├── shared/content.ts                # foldI18n 纯函数
│   │   ├── @types/content.d.ts              # #content 虚拟模块类型声明
│   │   └── views/                           # 视图消费
│   └── src/data/common/                     # 开发常量（不迁移）
```

| 路径别名 | 映射 | 用途 |
| --- | --- | --- |
| `#content` | `.content/` | 运营数据虚拟模块入口 |
| `~@/` | `app/.vitepress/src-new/` | 新版源码（含 foldI18n） |

---

## 2. 通用约定

### 3.1 目录布局与文件命名

- 每个 Domain 为 `.content/` 下的独立目录，包含 YAML 文件 + `images/` 资源子目录 + 可选 `README.md` 操作手册
- 文件名即 Section slug（`advisory.yaml`、`technical.yaml`），**不加数字前缀**；渲染顺序由视图侧 `SECTIONS` 数组定义
- 单文件 Domain 使用 `data.yaml` 或 Domain 同名文件名

**命名约束**: slug 采用 kebab-case，与 URL 路径风格一致；排序变更修改视图代码而非文件名。

### 3.2 国际化约定

本方案提供两种 i18n 策略，根据数据特征选择：

**策略一：内联后缀（默认）**— 适用于 zh/en 条目数量相同、内容一一对应的场景

基线字段为中文默认值，英文变体以 `_en` 后缀同条记录内联：

```yaml
name: 胡欣蔚
name_en: Hu Xinwei
position: 主席
position_en: Chairperson
```

优势：改一条记录的中英文在同一行相邻字段，不可能改完中文忘改英文。

**约束**:
- 禁止 `{ zh: {...}, en: {...} }` 双树结构（改完中文忘改英文的根因）
- 禁止 `name: { zh, en }` 嵌套对象（增加运营心智负担）

**策略二：顶层分离**— 适用于 zh/en 条目数量不同、内容无法一一对应的场景

某些区块（如 Banner）中文有 5 条而英文只有 1 条，或内容完全不同，无法用 `_en` 后缀一一对应。此时使用顶层 `zh:` / `en:` 键分开存放两条独立的数组：

```yaml
zh:
  - id: hbut
    title: 即刻报名
    banner: ./images/banner-hbut.jpg
    ...
en:
  - id: mindspore
    title: MindSpore
    banner: ./images/banner.jpg
    ...
```

视图侧根据当前语言直接取 `data.zh` 或 `data.en`，不走 `foldI18n`。

**选择规则**:
- 优先策略一（内联后缀），绝大多数数据场景适用
- 仅当条目数量不同或内容无法一一对应时才用策略二（顶层分离）
- 同一 Domain 内两种策略可混用：整体走策略一，某个字段走策略二（如 intro 内联 `_en`，video 用 `video_zh` / `video_en` 分离）

### 3.3 图片资源约定

- 图片存放于 `.content/<domain>/images/` 下，可扁平或按区块分子目录
- YAML 中写 `./images/<name>.png` 相对路径（`./` 或 `../` 前缀触发构建插件识别）
- 构建插件自动将相对路径改写为 `import` 语句，Vite 接管 asset pipeline → 输出带 content hash 的 URL
- 路径不存在 → 构建期报错，杜绝运行时 broken 渲染
- 字段名不限（`image:` / `avatar:` / `logo:` / `bg:` / `banner:` / `cover:` / `img:` / `img_dark:` / `icon:`），插件仅按值形态（相对路径 + 图片扩展名）识别

### 3.4 Schema 校验策略

- YAML 层不附带 JSON Schema 文件（运营无法理解）
- 必填字段在视图侧 TypeScript 接口声明；缺字段 → TypeScript 编译报错 → 构建失败
- 可选字段在接口中标记 `?`，缺省即缺省，无默认值填充

---

## 3. Schema 规则

本节定义所有 Domain 共享的规则框架。每个 Domain 根据自身业务需求在框架内自行定义字段名与结构——不预设分类，不限制形态。

### 4.1 字段命名规则

| 规则 | 说明 | 示例 |
| --- | --- | --- |
| **基线字段无后缀** | 中文为默认值，字段名不带语言标识 | `name`、`title`、`desc` |
| **英文变体加 `_en`** | 与基线字段同条记录相邻 | `name_en`、`title_en`、`desc_en` |
| **同类字段统一命名** | 表达相同语义的字段在不同 Domain 中使用相同字段名，避免「一个叫 post、一个叫 position、一个叫 role」的不一致 | 角色字段统一用 `post` |
| **kebab-case / snake_case** | 多词字段名使用连字符或下划线，与 YAML 社区惯例一致 | `name_link`、`end_date` |

### 4.2 字段类型规则

| 类型 | YAML 表示 | 视图侧消费 | 适用场景 |
| --- | --- | --- | --- |
| **字符串** | 普通值或 `|` 多行文本 | 直接渲染 | 标题、描述、姓名 |
| **Markdown** | `|` 块标量，内容为 Markdown 语法 | markdown-it 渲染为 HTML → `v-html` | FAQ 答案、带链接和格式的正文 |
| **图片路径** | `./images/<name>.<ext>` | 构建插件改写为 hashed URL | 头像、封面、Logo |
| **外部链接** | `https://...` 或 `/path` | 直接作为 `<a href>` | 跳转 URL、资源地址 |
| **ISO 日期** | `YYYY-MM-DD` | 视图侧按需排序 / 分组 | 活动时间、发布日期 |
| **布尔值** | `true` / `false` | 条件渲染 | 是否外链、是否高亮 |

### 4.3 顶层结构规则

| 规则 | 说明 |
| --- | --- |
| **单 section Domain** | 一个 YAML 文件包含所有数据，顶层直接是对象或数组 |
| **多 section Domain** | 每个 section 一个 YAML 文件，目录级 import 按 slug 聚合为 `{ sectionA: {...}, sectionB: {...} }`，视图侧 `SECTIONS` 数组控制渲染顺序 |
| **单文件命名** | 单 section Domain 用 `data.yaml` 或 Domain 同名文件名 |
| **不加数字前缀** | 文件名即 slug，不靠文件名排序；排序是产品决策，写在视图代码里 |
| **不写渲染指令** | YAML 只描述「有什么」，不出现 `layout`、`template`、`className` 等渲染字段 |
| **不写系统字段** | 不出现 `id`、`uid`、`created_at` 等 CMS 系统字段；锚点由视图侧从 `title_en` 派生 |

---

## 4. 构建插件实现

### 5.1 `vite-plugin-content-yaml`

**职责边界**: 插件仅关心「数据加载 + 资源路径解析 + 模块聚合」，不涉及 i18n 折叠或业务排序。

#### 5.1.1 单文件 YAML → JS Module + 图片路径改写

**触发**: `load` hook 拦截 `*.yaml` / `*.yml` 文件。

1. `js-yaml.load()` 解析 YAML 为 JS 对象
2. 深度遍历所有值，识别符合「相对路径前缀（`./` / `../`）+ 图片扩展名」模式的字符串
3. 将识别出的字符串替换为 sentinel token，生成对应 `import` 语句
4. Vite 原生接管 import → 输出带 content hash 的资源 URL

输出示例：

```js
import __a0 from './images/avatar.png';
import __a1 from './images/logo.png';
export default { title: '技术委员会', members: [{ image: __a0 }, { image: __a1 }] };
```

**设计决策 — 使用 `load` 而非 `transform`**: VitePress 内置插件将 `.yaml` 当 raw text asset 处理。若仅挂 `transform`，生成的 JS 代码会被其再包一层 `export default "..."`，视图拿到的是源码字符串而非 module 对象。`load` 是模块加载入口，先返回 JS 即锁定 module 形态。

**设计决策 — 不使用 `@modyfi/vite-plugin-yaml`**: modyfi 仅将 YAML 转 JSON module，不支持图片路径改写与目录虚拟模块。使用 modyfi 后视图侧仍需 `import.meta.glob` + 手动查表匹配图片，运营仍需理解「YAML 路径 + glob manifest」双份配置。

#### 5.1.2 目录级虚拟模块聚合

**触发**: `resolveId` 拦截 `#content/<domain>` 形式的 import（无 `.yaml` 后缀）。

1. `stat()` 确认目标为目录 → 返回 `\0content-dir:<abs>` 虚拟 ID（`\0` 前缀为 Vite 虚拟模块约定）
2. `load` 阶段 `readdir()` 遍历目录下所有 `.yaml` 文件，为每个生成 import 语句
3. 组装 `export default { <slug>: __d0, ... }` 聚合模块
4. Vite module graph 天然衔接：每个子 import 回溯触发单文件插件分支

视图侧获取以 slug 为 key 的聚合对象，图片字段已是 hashed URL：

```ts
import organizationRaw from '#content/organization';
// organizationRaw.advisory.members[0].image === '/assets/avatar.<hash>.png'
```

**零配置发现**: `configResolved` 时从 `resolve.alias` 读取 `#content` 的 replacement，无需手动传递 contentRoot 参数。

### 5.2 `foldI18n` 纯函数

**职责边界**: 仅处理 `_en` 后缀字段的语言折叠，不关心图片、排序、glob。

```ts
import { foldI18n, type Lang } from '~@/shared/content';

foldI18n({ name: '张三', name_en: 'Zhang San' }, 'zh');
// → { name: '张三' }

foldI18n({ name: '张三', name_en: 'Zhang San' }, 'en');
// → { name: 'Zhang San' }
```

**特性**:
- 纯函数：深拷贝输入，无副作用
- 递归：对象、数组、嵌套结构全覆盖
- 前缀无关：`name_fr` 等非 zh/en 后缀在两种语言模式下均原样保留

### 5.3 类型声明

每个 Domain 在 `app/.vitepress/src-new/@types/content.d.ts` 声明 `declare module '#content/<domain>'`，保障视图侧 import 的类型安全。

---

## 5. 视图层消费模式

### 6.1 标准消费范式

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { foldI18n, type Lang } from '~@/shared/content';
import type { OrgT } from '~@/@types/type-organization';

import organizationRaw from '#content/organization';

const SECTIONS = ['advisory', 'committee', 'technical'] as const;

function deriveAnchor(titleEn: string): string {
  return titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const { lang } = useData();

const sections = computed<OrgT[]>(() =>
  SECTIONS.map((slug) => {
    const raw = organizationRaw[slug];
    const enriched = { ...raw, anchor: deriveAnchor(raw.title_en) };
    return foldI18n(enriched, lang.value as Lang) as unknown as OrgT;
  }),
);
</script>
```

**设计原则**:
- 排序 = 产品决策，显式写在视图代码中，可 review 可追溯
- 数据加工（排序 / anchor 派生 / i18n 折叠）全部明面化，无 loader 黑盒
- 单文件 import 也受支持：`import advisory from '#content/organization/advisory.yaml'`，与目录级 import 获取同一 module 对象（Vite module graph 保证 referential equality）

### 6.2 data/ 中间层淘汰策略

**默认淘汰**: 绝大多数页面原 `data/<page>.ts` 仅是 import 中转 + v-for 数据源。改用 `.content/` 后视图直接 import YAML 数据，中间层可删除。

**保留薄壳的两种场景**:

| 场景 | 保留方式 | 代码量 |
| --- | --- | --- |
| Section 排序是产品决策 | `SECTIONS` 数组直接写在视图文件顶层 | ≤ 5 行 |
| 非平凡形状映射（FAQ markdown 渲染） | `transform.ts` 函数或视图内联 | ≤ 30 行 |

**迁移后效果**:

```text
迁移前  app/.vitepress/src/data/    ~30 个 TS 文件, import + 数据耦合
迁移后  app/.vitepress/src/data/    仅保留 common/(4 个开发常量文件)
                                    + 0-2 个 transform shim（可选）
```

---

## 6. 与 `.cms/` 的定位差异

| 维度 | `.cms/`（现有 CMS） | `.content/`（本方案） |
| --- | --- | --- |
| 架构层次 | schema + content + export = 三层 | 单层 YAML 文件 |
| 数据格式 | JSON（含 ID / 时间戳 / UID 等系统字段） | YAML（仅含人可理解的业务字段） |
| 编辑方式 | VSCode 专用插件 | 任意文本编辑器 |
| 适用场景 | 字段多、引用关系复杂的结构化数据 | 列表 + 简单嵌套的运营高频变更数据 |
| 构建依赖 | Strapi 风格导出流程 | Vite 原生插件，零额外依赖 |

**演进策略**: `.cms/` 已用于 devday2026 等复杂结构化场景，短期保留不动；新增运营内容优先走 `.content/`；长期可选将 devday2026 迁入 `.content/` 以收敛逻辑。

---

## 7. 新 Domain 接入流程

1. 在 `.content/` 下创建 Domain 目录（如 `.content/sig-list/`）
2. 按 §3 通用约定和 §4 Schema 规则编写 YAML 数据文件
3. 将图片资源放入 `images/` 子目录
4. 在 `@types/content.d.ts` 声明 `declare module '#content/<domain>'`
5. 在 Vite config 中确认 `#content` alias 已指向 `.content/`（通常已就绪）
6. 视图侧 `import data from '#content/<domain>'` + `foldI18n(data, lang)` 消费
7. 可选：编写 Domain `README.md` 运营操作手册
