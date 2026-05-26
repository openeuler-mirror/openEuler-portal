# `.content/` 设计方案 — 把整个 `data/` 改成运营可直接提 PR 的形态

> **范围**:`app/.vitepress/src/data/` 下所有「运营会改」的数据,全部迁到项目根目录的 `.content/`。
> **目标**:运营打开文件、改几行、提 PR;不碰 TS、不装插件、不懂 Vite。
> **副作用**:`data/<page>.ts` 大部分可删,Vue 直接 `loadFiles(...)` 取数据;`data/common/*` 这些开发常量保留不动。
>
> **本 PR 仅做基础设施 + 一个 organization demo**(`.content/organization/` 含 4 个 YAML + 28 张图)。**不改任何现有 `data/` 文件、不改任何 Vue 组件**。每个 domain 真正切流到 YAML 走单独 PR,见 [§ 10](#10-分阶段迁移)。

---

## 1. 问题陈述

`data/` 下的 40+ 个文件,共同问题有三个:

| 痛点 | 例子 | 影响 |
| --- | --- | --- |
| **顶部一大堆 image import** | `organization.ts` 134 个 import、`user-group/index.ts` 48 个、`oevp.ts` 31 个 | 加 / 改 / 删一个人要碰 3 处(import + zh 数组 + en 数组),还要懂 ES module |
| **中英文是两棵独立树** | 几乎所有文件都 `{ zh: {...}, en: {...} }`,内容靠人脑同步 | 改完中文忘了改英文是常见 bug |
| **同类数据散在 N 个文件,schema 还各不相同** | 委员会用 `position[]`、技术委员会用 `post`、工作组也用 `position[]` 但语义是 role;Pattern 一样、字段乱起 | 运营改组织成员、改 FAQ、改活动是完全三套心智 |

`.cms/` 是上一版的尝试 —— Strapi 风格的 schema/content/export 三层 + VSCode 插件录入。这一套对结构化复杂的数据是合适的,但对 `data/` 里这种「列表 + 简单嵌套」的小操作太重了。

---

## 2. `data/` 现状清点

按数据形态归并,整个 `data/` 落到 6 种模式:

| 模式 | 含义 | 涉及文件(节选) |
| --- | --- | --- |
| **A. 人员/组织名册** | 头像 + 中英文姓名 + 单位 / 职位 / 邮箱 / Gitee | `about-us/organization`、`about-us/member-data`、`user-group/index`、`user-group/city/*`、`euler-sky/oevp`、`experts/index` |
| **B. 双语 TOC / 导航** | 平的 `{ label, link }` 列表 | `about-us/about-us-toc`、`faq/faq-toc`、`wiki/wiki-toc`、`migration/migration-toc` |
| **C. FAQ / Q&A** | 问题 + 富文本答复(含内联链接) | `migration/migration-faq` |
| **D. 卡片 / 多 section 页面** | 标题 + 描述 + 浅色/深色背景图 + 跳转链接 | `migration/migration-portal`、`migration/migration-advantage`、`migration/migration-case`、`migration/migration-download`、`migration/migration-practices`、`euler-sky/tultorial`、`euler-sky/infra`、`euler-sky/site` |
| **E. 事件 / 时间序列** | 按时间组织的活动列表 | `salon/plan`、`salon/event`、`monthly/index`、`user-group/user-activey`、`user-group/city/*` |
| **F. 索引 / 资源列表** | 名称 + 介绍 + 一组链接 | `intership/intership-task`、`osv/index`、`showcase/*` |

**继续留 TS、不迁**(都是开发用的常量,不是运营内容):

- `common/category.ts`、`common/nav-filter.ts`、`common/nss.ts` — 业务常量
- `common/seo.ts` — SEO 关键词,深度嵌套,改频次极低且强耦合代码
- `meeting/index.ts`、`mooc/index.ts`、`security/index.ts` — 小配置 / 空 stub

---

## 3. 设计原则

1. **运营看一眼就懂。** 一份 YAML 不超过两屏长。一段 YAML 对应一条记录(一个人、一条 FAQ、一张卡片),所见即所得。
2. **改一处必同步双语。** 中英文写在同一条记录的相邻字段(`name` / `name_en`),不可能改完中文忘改英文。
3. **不写 import。** 图片只写文件名,由 loader 在构建期解析路径。
4. **数据只描述「有什么」,不描述「怎么渲染」。** 不在 YAML 里出现 layout / template / className 这类字段。
5. **错了构建期就响。** 文件不存在、必填字段缺失,构建直接 fail,而不是页面渲染成 broken。
6. **页面侧改动最小化。** Vue 组件传给子组件的 props 形状尽量不变;顶层只把 `import X from '@/data/...'` 换成几行 `loadFiles(...)`。

---

## 4. 通用约定(所有 domain 共享)

### 4.1 目录布局

```text
/openEuler-portal/
├── .content/                         # ★ 运营可改数据的统一入口
│   ├── organization/                 # 模式 A
│   │   ├── README.md
│   │   ├── *.yaml
│   │   └── images/                   # 该 domain 的图片(含 png/svg/pdf 等)
│   ├── faq-migration/                # 模式 C
│   │   └── *.yaml
│   ├── nav-about-us/                 # 模式 B
│   │   └── data.yaml
│   ├── events-salon/                 # 模式 E
│   │   └── *.yaml
│   └── (按需新增 domain)/
├── .cms/                             # 旧 CMS,暂不动
└── app/
    └── .vitepress/
        └── src/
            ├── utils/
            │   └── content.ts        # ★ 项目统一 loader
            ├── views/                # Vue 直接 loadFiles(...) 取数据
            └── data/                 # 大部分子目录删除;只剩 common/(开发常量)
                └── common/           #   seo / category / nav-filter / nss
```

### 4.2 文件命名与顺序

- 文件名就是该 section 的 **slug**(`advisory.yaml`、`installation.yaml`),纯标识用途,**不加数字前缀**
- 渲染顺序写在调用方的代码里(`SECTIONS = [...]` 数组),一眼可见、可 review;改顺序是改数组,不是改一堆文件名
- 单文件 domain 就叫 `data.yaml` / `index.yaml` 或 domain 同名

### 4.3 i18n

中英文同条记录内联,后缀 `_en`:

```yaml
name: 胡欣蔚
name_en: Hu Xinwei
position: 主席
position_en: Chairperson
```

不允许 `{ zh: {...}, en: {...} }` 双树;不允许 `name: { zh, en }` 嵌套。

### 4.4 图片

- 一个 domain 的所有图片放在 `.content/<domain>/images/`,可按子目录分类
- YAML 里只写相对 `images/` 的路径:`image: technical/huxinwei.png`
- 图片走 Vite 资源管道(自动哈希、code-split),由 loader 调 `resolveAsset` 解析
- 找不到的文件名 = 构建期报错,不会静默渲染成 broken

### 4.5 必填 / 可选

- YAML 不带 schema 校验文件(不上 JSON Schema,运营看不懂)
- 必填字段在每个 domain 的 transform 里类型断言;缺字段 → TypeScript 报错 → 构建期 fail
- 可选字段缺省就缺省,transform 用 `?` 处理

---

## 5. Schema 范式

每种模式给一个**最简骨架**。具体 domain 在骨架上加自己的字段(比如组织加 `email/gitee`、事件加 `date`、卡片加 `image_dark`)。

### 模式 A — 人员/组织名册

```yaml
title: openEuler 技术委员会
title_en: openEuler Technical Committee
id: technical-committee
id_zh: 技术委员会

members:
  - name: 胡欣蔚
    name_en: Hu Xinwei
    image: technical/huxinwei.png
    post: 主席            # 角色标签,可选
    post_en: Chairperson
    email: shinwell_hu@openeuler.sh   # 可选
    gitee: shinwell_hu                # 可选
```

**变体**:有子分组(委员会按职位分块)→ 顶层用 `groups:` 代替 `members:`;要分多行展示(全球化工作组的「主组 + 生态官」)→ 顶层用 `rows:`(行数组的数组)。三者互斥。

**适用**:organization、member-data、user-group、oevp、experts。member-data 里 `image` 是公司 logo,字段语义不变。

### 模式 B — 双语 TOC / 导航

```yaml
items:
  - label: 迁移专区
    label_en: Migration
    link: /migration
  - label: 背景
    label_en: Background
    link: /migration/background
```

**适用**:about-us-toc、faq-toc、wiki-toc、migration-toc。基本都是单文件 domain,叫 `data.yaml` 即可。

### 模式 C — FAQ / Q&A

答案用 **Markdown**,而不是 `[{text, isLink, link}, ...]` 这种切片数组(运营写不了)。

```yaml
faqs:
  - question: 如何获取原地升级的教程?
    question_en: How to get an in-place upgrade tutorial?
    answer: |
      我们提供了视频和文档:
      - 视频:[x2openEuler 工具使用](https://www.bilibili.com/video/BV1TR4y1o7cX)
      - 文档:[迁移指南](https://docs.openeuler.org/zh/docs/24.03_LTS/...)

      如果遇到问题,可在欧拉小智里输入「提问」反馈。
    answer_en: |
      We provide both video and docs:
      - Video: [x2openEuler tutorial](https://...)
      - Docs:  [Migration guide](https://...)
```

transform 用 markdown-it 把 `answer` 渲染成 HTML 字符串,Vue 端 `v-html` 喂进去。

**适用**:migration-faq。多主题就拆多文件(`general.yaml`、`installation.yaml`、`upgrade.yaml`),由 `loadDomain` 一把全捞。

### 模式 D — 卡片 / 多 section 页面

```yaml
# 单 section
intro: 我们的优势
intro_en: Our advantages
cards:
  - title: 简单
    title_en: Simple
    description: 一键迁移
    description_en: One-click migration
    image: portal/advantage-1.png
    image_dark: portal/advantage-1-dark.png   # 可选,深色主题用图
    link: /migration/advantage
```

**多 section 页面**(比如 `migration-portal` 一个页面里有「优势 / 下载 / 路径 / 帮助」四块)→ 每个 section 一个 YAML:

```text
.content/migration-portal/
  advantage.yaml
  download.yaml
  path.yaml
  help.yaml
  images/
```

页面侧 `loadFile('migration-portal', 'advantage')` 等分别取用。

**适用**:`migration-*` 系列、`euler-sky/*` 的几个。

### 模式 E — 事件 / 时间序列

```yaml
events:
  - name: openEuler Developer Day 2026
    name_en: openEuler Developer Day 2026
    date: 2026-04-15           # ISO 日期,排序友好
    end_date: 2026-04-17       # 可选,跨天活动
    location: 北京
    location_en: Beijing
    link: https://...
    poster: odd2026.png        # 可选,海报图
```

**按时间分组的页面**(比如 monthly):一年一个 YAML,文件名是年份(`2026.yaml`、`2025.yaml`);页面侧自己按 `date` 分月渲染。

**适用**:salon/plan、salon/event、monthly、user-activey、user-group/city/*(城市子活动)。

### 模式 F — 索引 / 资源列表

```yaml
intro: SIG 简介
intro_en: SIG intro
items:
  - name: Kernel
    introduce: openEuler 社区维护的 Linux 内核
    introduce_en: Linux kernel maintained by openEuler
    name_link: https://www.openeuler.org/zh/sig/Kernel
    task: https://gitee.com/.../issues?...
    gitee: https://atomgit.com/openeuler/community/tree/master/sig/Kernel
```

**适用**:intership-task、showcase/*、osv。字段名按 domain 业务语义起,模式只规定「平的对象列表 + 可选 intro」。

---

## 6. Loader API(项目统一)

`app/.vitepress/src/utils/content.ts` 提供四个函数,按场景挑:

```ts
import { loadFile, loadFiles, loadDomain, resolveAsset } from '@/utils/content';

// 1. 单文件 / 按 slug 取
const nav = loadFile<NavYaml>('nav-about-us', 'data');

// 2. 多文件按指定顺序取(顺序敏感)
const docs = loadFiles<OrgYaml>('organization', [
  'advisory', 'committee', 'technical', /* ... */ 'globalization',
]);

// 3. 多文件全捞(顺序无所谓,字母序)
const allFaqs = loadDomain<FaqYaml>('faq-migration');

// 4. 按约定路径取图,找不到立即抛错
const url = resolveAsset('organization', 'technical/huxinwei.png');
```

**实现要点**:

- 用 `import.meta.glob('../../../../.content/**/*.{yaml,yml}', { eager: true })` 在构建期内联所有 YAML 到一张表;三个 load* 函数都是同一张表的不同查询方式,无运行时 IO
- 用 `@modyfi/vite-plugin-yaml` 让 Vite 把 YAML 当 ESM 模块处理
- 用 `import.meta.glob` 加 `{ query: '?url' }` 让图片走 Vite 资源管道
- VitePress 的 Vite root 是 `app/`,`.content/` 在 root 外,`@content` alias 在 `import.meta.glob` 里实测不工作。用相对路径(loader 文件位置往上 4 层)是被 Vite 文档明确支持的写法,封在 loader 里运营不感知

---

## 7. `data/` 还要不要?

**默认不要。** 简单页面 Vue 直接 `loadFiles(...)`,中间不再过 `data/<page>.ts` 这一层。

### 7.1 哪些场景可以直接删 `data/<page>.ts`

绝大多数页面属于这类 —— Vue 组件原本只是 `import data from '@/data/...'` 然后 `v-for` 渲染。改完长这样:

```vue
<!-- views/migration/MigrationCase.vue -->
<script setup lang="ts">
import { useData } from 'vitepress';
import { loadFile } from '@/utils/content';

interface Card {
  title: string; title_en: string;
  description: string; description_en: string;
  image: string;
  link: string;
}

const { lang } = useData();
const data = loadFile<{ cards: Card[] }>('migration-case', 'data');

const pick = <T,>(item: any, key: string): T =>
  lang.value === 'en' ? item[`${key}_en`] : item[key];
</script>

<template>
  <div v-for="card in data.cards" :key="card.title">
    <img :src="card.image" />
    <h3>{{ pick(card, 'title') }}</h3>
    <p>{{ pick(card, 'description') }}</p>
  </div>
</template>
```

**整个 `data/migration/migration-case.ts` 删除**。Vue 比之前还短。

### 7.2 哪些场景保留一个薄壳

只有两类:

**类型 1: section 顺序是产品决策**(organization、oevp 这类)。把 `SECTIONS` 数组单独抽到 `data/<page>.config.ts`,5 行内:

```ts
// data/about-us/organization.config.ts
export const SECTIONS = [
  'advisory', 'committee', 'technical',
  'marketing', 'user',
  'business', 'operations', 'education', 'legal', 'ai',
  'globalization',
];
```

**类型 2: 有非平凡的形状映射**(比如 FAQ 答案要先 markdown-it 渲染成 HTML,或 organization 要把 YAML 形状摊平成 `memberList[].list[]` 给老 Vue):保留一个 ~30 行 transform 函数,同样放在 `data/<page>.ts`。

`data/common/*`(seo、category、nav-filter、nss)是开发常量,不在迁移范围,保留。

### 7.3 整体效果

```text
迁移前  app/.vitepress/src/data/    ~30 个 TS 文件,几千行 import + 数据混在一起
迁移后  app/.vitepress/src/data/    只剩 common/(4 个文件)
                                    + 2-3 个 *.config.ts 放 SECTIONS
                                    + 0-2 个 transform shim
```

---

## 8. `data/` 整改总表

> 这是**全量**清单。每行回答「这个文件迁到哪、归哪个模式、用哪个 loader 调用」。

| 当前文件 | 行数 | 模式 | 目标 .content/ 位置 | 调用方式 | 备注 |
| --- | --- | --- | --- | --- | --- |
| `about-us/organization.ts` | 1397 | A | `organization/*.yaml` | `loadFiles('organization', SECTIONS)` | 11 个委员会拆 11 个 YAML;有 groups / rows 变体 |
| `about-us/member-data.ts` | 288 | A | `members/*.yaml` | `loadDomain('members')` | 按类别拆(铂金 / 黄金 / ...),图片是 logo |
| `about-us/about-us-toc.ts` | 60 | B | `nav-about-us/data.yaml` | `loadFile('nav-about-us', 'data')` | 单文件 |
| `user-group/index.ts` | 364 | A + B | `user-groups/index.yaml` + `user-groups/leaders.yaml` | 同上 | 拆「区域列表 + 各区域 leader」 |
| `user-group/city/*.ts` | 67-196 | A + E | `user-groups/cities/<city>.yaml` | `loadDomain('user-groups/cities')` | 每个城市一个文件,内容含 leaders + activities |
| `user-group/user-activey.ts` | 49 | E | `user-groups/activities.yaml` | `loadFile(...)` | 单文件 |
| `euler-sky/oevp.ts` | 490 | A | `oevp/*.yaml` | `loadFiles('oevp', SECTIONS)` | 顾问按类别分组 |
| `euler-sky/tultorial.ts` | 62 | D | `eulersky-page/tutorial.yaml` | `loadFile(...)` | 单 section |
| `euler-sky/infra.ts` | 22 | D | `eulersky-page/infra.yaml` | `loadFile(...)` | 单 section |
| `euler-sky/site.ts` | 79 | F | `eulersky-page/sites.yaml` | `loadFile(...)` | 单 section |
| `experts/index.ts` | 27 | A | `experts/data.yaml` | `loadFile('experts', 'data')` | 文件很小,单文件 |
| `faq/faq-toc.ts` | 54 | B | `nav-faq/data.yaml` | `loadFile(...)` | 单文件 |
| `intership/intership-task.ts` | 210 | F | `internship-tasks/data.yaml` | `loadFile(...)` | 单文件;顺手把目录拼写改对(intership→internship) |
| `migration/migration-toc.ts` | 97 | B | `nav-migration/data.yaml` | `loadFile(...)` | 单文件 |
| `migration/migration-portal.ts` | 625 | D | `migration-portal/*.yaml` | `loadFiles('migration-portal', SECTIONS)` | 拆 section:advantage / download / path / help |
| `migration/migration-advantage.ts` | 57 | D | `migration-advantage/data.yaml` | `loadFile(...)` | 单文件 |
| `migration/migration-case.ts` | 150 | D | `migration-case/data.yaml` | `loadFile(...)` | 单文件 |
| `migration/migration-download.ts` | 360 | D | `migration-download/*.yaml` | `loadFiles(...)` | 拆 section |
| `migration/migration-practices.ts` | 51 | D | `migration-practices/data.yaml` | `loadFile(...)` | 单文件 |
| `migration/migration-faq.ts` | 350 | C | `faq-migration/*.yaml` | `loadDomain('faq-migration')` | 按主题拆 |
| `monthly/index.ts` | 72 | F | `monthly/<year>.yaml` | `loadDomain('monthly')` | 按年份拆 |
| `osv/index.ts` | 140 | F | `osv/data.yaml` | `loadFile(...)` | 单文件 |
| `salon/event.ts` | 123 | E | `salon-events/<year>.yaml` | `loadDomain('salon-events')` | 按年份拆 |
| `salon/plan.ts` | 412 | E | `salon-plan/<year>.yaml` | `loadDomain('salon-plan')` | 按年份拆 |
| `showcase/showcase.ts` | 21 | F | `showcase/data.yaml` | `loadFile(...)` | 单文件 |
| `showcase/market-report.ts` | small | F | `showcase/market-report.yaml` | `loadFile(...)` | 单文件 |
| `showcase/technical-while-paper.ts` | 146 | F | `showcase/whitepapers.yaml` | `loadFile(...)` | 顺手改对拼写 |
| `wiki/wiki-toc.ts` | 98 | B | `nav-wiki/data.yaml` | `loadFile(...)` | 单文件 |

**留 TS、不迁**:

| 文件 | 行数 | 原因 |
| --- | --- | --- |
| `common/category.ts` | small | 业务常量,改频次接近 0 |
| `common/nav-filter.ts` | 268 | 过滤逻辑,不是内容 |
| `common/nss.ts` | small | i18n 命名空间配置 |
| `common/seo.ts` | 239 | SEO keyword 与页面结构强耦合,运营也不改 |
| `meeting/index.ts` | 69 | 小配置 |
| `mooc/index.ts` | small | 空 stub |
| `security/index.ts` | small | 配置 |

---

## 9. 与 `.cms/` 的关系

| | `.cms/`(现状) | `.content/`(新) |
| --- | --- | --- |
| 层数 | schema + content + export = 3 层 | 只有 YAML 文件 |
| 编辑方式 | VSCode 插件 | 文本编辑器 |
| 数据格式 | JSON(含 ID / 时间戳 / UID) | YAML(只有人能看得懂的字段) |
| 适合 | 字段多、引用关系复杂的结构化数据 | 列表 + 简单嵌套 |

短期:`.cms/` 已用于 `devday2026`,继续保留不动;新增内容走 `.content/`。
长期(可选):`.content/` 跑顺后把 devday2026 也迁过来,逻辑收敛到一处。

---

## 10. 分阶段迁移

**本 PR 范围 = 阶段 1 + 阶段 2 的 demo 部分**:把基础设施立起来,放一个能跑的 demo,但**不动现有任何页面的数据来源**。`data/about-us/organization.ts` 和组件本身这次 PR 完全不碰。

后续每个 domain 单独提 PR 切流。

| 阶段 | 范围 | 备注 |
| --- | --- | --- |
| **1. 基础设施(本 PR)** | `@modyfi/vite-plugin-yaml`、`utils/content.ts`、`env.d.ts` 加 `*.yaml` 声明、`config.ts` 接入插件 | 不改任何现有数据 |
| **2. demo(本 PR)** | `.content/organization/` 下 4 个 YAML + 28 张图 + README;**仅供查看,不接到页面**。原 `organization.ts` 和页面保持不动 | 让运营、reviewer 看到「最终形态长这样」 |
| **3. 切流 organization(下一个 PR)** | 删 `data/about-us/organization.ts` 里的所有 import + 数据;改 Vue 直接 `loadFiles(...)`;补齐剩余 7 个 YAML 文件 + 122 张照片(从 `src/assets/category/organization/` git mv 过来) | 第一个真实切流,作为模板 |
| **4. 模式 A 剩余** | member-data、user-group、oevp、experts | 1 PR / domain |
| **5. 模式 B + C** | 各 TOC + migration-faq | 1 PR / 类 |
| **6. 模式 D** | `migration-*` 系列、`euler-sky/*` | 1 PR / 页面 |
| **7. 模式 E + F** | salon、monthly、user-activey、intership-task、osv、showcase | 1 PR / domain |

每个 PR 独立可回滚 —— 单 domain 切流失败,只回退该 PR,基础设施和其他 domain 不受影响。

---

## 11. 给运营的「我要改东西」操作手册(目标态)

**改成员/卡片/FAQ/活动……**(99% 的操作,纯 YAML):

```text
1. 打开 .content/<domain>/<file>.yaml
2. 复制现有的一段,改字段
3. 如果涉及图片,把 PNG 丢到 .content/<domain>/images/ 下对应位置
4. git commit + push,提 PR
```

**加 / 删整个 section / 委员会 / 子页面**(需要 dev 帮忙改 1 行 TS):

```text
1. 加:新建 .content/<domain>/<slug>.yaml
   删:删除对应 YAML
2. 找 dev 在页面的 SECTIONS 数组里加 / 删一个 slug 字符串
3. 提 PR
```

99% 的操作 100% 是运营行为,加/删 section 需要 dev 配合 1 行 —— 因为「section 顺序」是产品决策,理应在代码里可见、可 review,而不是埋在文件名前缀里。
