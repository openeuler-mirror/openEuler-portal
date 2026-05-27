# `.content/` 设计方案 — 把整个 `data/` 改成运营可直接提 PR 的形态

> **范围**:`app/.vitepress/src/data/` 下所有「运营会改」的数据,全部迁到项目根目录的 `.content/`。
> **目标**:运营打开文件、改几行、提 PR;不碰 TS、不装插件、不懂 Vite。

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
3. **不写 import。** 图片只写 `./images/<name>.png`,Vite 插件在构建期自动转成带 hash 的资源 URL。
4. **数据只描述「有什么」,不描述「怎么渲染」。** 不在 YAML 里出现 layout / template / className 这类字段。
5. **错了构建期就响。** 文件不存在、必填字段缺失,构建直接 fail,而不是页面渲染成 broken。
6. **不藏在 loader 黑盒后面。** 视图侧用 `#content/<domain>` 一行 import 拿到整个目录;排序/筛选/i18n 折叠都明面上写在 Vue 文件里,不再有「这个 loader 还偷偷干了什么」的黑盒。

---

## 4. 通用约定(所有 domain 共享)

### 4.1 目录布局

```text
/openEuler-portal/
├── .content/                                # ★ 运营可改数据的统一入口
│   ├── organization/                        # 模式 A
│   │   ├── README.md
│   │   ├── advisory.yaml
│   │   ├── committee.yaml
│   │   ├── technical.yaml
│   │   ├── ...                              # 共 11 个 section YAML
│   │   └── images/                          # 该 domain 的图片(扁平或分子目录都可)
│   ├── faq-migration/                       # 模式 C
│   │   └── *.yaml
│   ├── nav-about-us/                        # 模式 B
│   │   └── data.yaml
│   ├── events-salon/                        # 模式 E
│   │   └── *.yaml
│   └── (按需新增 domain)/
├── .cms/                                    # 旧 CMS,暂不动
└── app/
    └── .vitepress/
        ├── plugins/
        │   └── vite-plugin-content-yaml.ts  # ★ 自定义 Vite 插件
        └── src/
            ├── utils/
            │   └── i18n.ts                  # ★ foldI18n 纯函数
            ├── views/                       # 直接 `import data from '#content/<domain>'`
            └── data/                        # 大部分子目录删除;只剩 common/(开发常量)
                └── common/
```

### 4.2 文件命名与顺序

- 文件名就是该 section 的 **slug**(`advisory.yaml`、`technical.yaml`),纯标识用途,**不加数字前缀**
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

视图侧调 `foldI18n(data, lang)`:`lang === 'en'` 用 `_en` 字段覆盖基线、删除 `_en` 兄弟;`lang === 'zh'` 直接删 `_en`。详见 § 6.2。

不允许 `{ zh: {...}, en: {...} }` 双树;不允许 `name: { zh, en }` 嵌套。

### 4.4 图片

- 一个 domain 的所有图片放在 `.content/<domain>/images/` 下,可扁平也可分子目录
- YAML `image:` 字段写**带 `./images/` 前缀的相对路径**(`image: ./images/huxinwei.png`)。前缀触发 [`vite-plugin-content-yaml`](../app/.vitepress/plugins/vite-plugin-content-yaml.ts) 把它当资源走 Vite 管道,最终拿到带 hash 的 URL
- 同人在不同组用不同照片时,要么走子目录天然隔离,要么用文件名后缀(`huxinwei-technical.png` / `huxinwei-ai.png`)区分;复用同一张图就引用同一个路径
- 找不到的文件名 = 构建期报错,不会静默渲染成 broken

字段名不限于 `image:`,`avatar:` / `logo:` / `bg:` 等任意键名都行 —— 插件只看值是不是「`./` 或 `../` 开头 + 图片扩展名」的字符串。

### 4.5 必填 / 可选

- YAML 不带 schema 校验文件(不上 JSON Schema,运营看不懂)
- 必填字段在 view 侧 TypeScript 接口里声明;缺字段 → TypeScript 报错 → 构建期 fail
- 可选字段缺省就缺省,接口里写 `?`

---

## 5. Schema 范式

每种模式给一个**最简骨架**。具体 domain 在骨架上加自己的字段(比如组织加 `email/gitee`、事件加 `date`、卡片加 `image_dark`)。

### 模式 A — 人员/组织名册

```yaml
title: openEuler 技术委员会
title_en: openEuler Technical Committee

members:
  - name: 胡欣蔚
    name_en: Hu Xinwei
    image: ./images/huxinwei-technical.png
    post: 主席            # 角色标签,可选
    post_en: Chairperson
    email: shinwell_hu@openeuler.sh   # 可选
    gitee: shinwell_hu                # 可选
```

**注意**:不写 `id` / `id_zh` 字段。HTML/URL 锚点由 view 侧从 `title_en` 派生(小写 + 非字母数字字符折成连字符,见 [TheOrganization.vue 的 `deriveAnchor`](../app/.vitepress/src/views/organization/TheOrganization.vue))。zh/en 页面共享同一个 anchor,SEO 与跨语言深链都更稳。

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

view 侧用 markdown-it 把 `answer` 渲染成 HTML 字符串,模板里 `v-html` 喂进去。

**适用**:migration-faq。多主题就拆多文件(`general.yaml`、`installation.yaml`、`upgrade.yaml`),由 view 侧一次目录 import 全捞。

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
    image: ./images/portal/advantage-1.png
    image_dark: ./images/portal/advantage-1-dark.png   # 可选,深色主题用图
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

view 侧 `import portal from '#content/migration-portal'` 一次拿到所有 section(`portal.advantage` / `portal.download` / ...),再按 `SECTIONS` 数组排序。

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
    poster: ./images/odd2026.png   # 可选,海报图
```

**按时间分组的页面**(比如 monthly):一年一个 YAML,文件名是年份(`2026.yaml`、`2025.yaml`);view 侧自己按 `date` 分月渲染。

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

## 6. 实现:Vite 插件 + i18n 纯函数 + 虚拟目录模块

把「加载 yaml + 解析 image 路径 + i18n 折叠」三件事拆成三层职责清晰的东西:

1. **构建期(Vite 插件)**:`vite-plugin-content-yaml` 同时做两件事:
   - 把单个 `.yaml` 转成 JS module,顺便把 `./images/...` 这种字符串值改写成 `import` 语句
   - 把 `#content/<domain>` 这种没带 `.yaml` 后缀的 import 解析成「该目录下所有 yaml 按 slug 索引的虚拟模块」
2. **运行时(i18n 纯函数)**:`foldI18n(data, lang)` 把 `_en` 兄弟字段折叠回基线字段。不关心图片,不关心 glob,只做一件事。
3. **消费侧(view 单 import)**:`import data from '#content/<domain>'` 直接拿到 `{ <slug>: {...}, ... }` 形态的对象。排序、筛选、再加工都是普通 TS 代码,可读可改。

### 6.1 Vite 插件 — `vite-plugin-content-yaml`

完整实现:[`app/.vitepress/plugins/vite-plugin-content-yaml.ts`](../app/.vitepress/plugins/vite-plugin-content-yaml.ts)(~80 行)。

插件做两件相关但独立的事。

#### (a) 单文件 yaml → JS module + image 自动解析

触发:被 `load` 的文件是 `*.yaml` / `*.yml`。

1. `js-yaml.load` 解析 YAML 拿到对象
2. 深度遍历值,凡是**字符串值** + **`./` 或 `../` 开头** + **png/jpe?g/webp/svg/gif 后缀**,认为是图片
3. 用 sentinel token 把这些字符串替换成裸 `import` 标识符
4. Vite 看到 `import` 自然接管图片解析:加 hash、走 publicPath、build 期产出资源

最终输出形如:

```js
import __a0 from './images/huxinwei.png';
import __a1 from './images/wangyali.png';
export default { title: '技术委员会', members: [{ image: __a0 }, { image: __a1 }] };
```

#### (b) 目录 import → 虚拟目录模块

触发:`resolveId` 拦截 `#content/<rel>` 形式、不带 `.yaml` 后缀的 import,或已被 Vite alias 插件预先展开的 `contentRoot` 子路径。

1. `stat` 确认是目录,返回 `\0content-dir:<abs>` 形式的虚拟 id(`\0` 前缀是 Vite 约定的虚拟模块标记)
2. `load` 阶段 `readdir` + 为每个 `.yaml` 生成一条 `import`,组装出 `export default { <slug>: __d0, ... }`
3. Vite 看到 import 又会回头走单文件分支再 `load` 一次,所以两条管道天然衔接

view 拿到的就是 `{ advisory: {...}, committee: {...}, ... }` 这种以文件名(去扩展名)为 key 的对象,image 字段已是 URL。

```ts
import organizationRaw from '#content/organization';
// organizationRaw.advisory.title === 'openEuler 委员会顾问专家委员会'
// organizationRaw.advisory.members[0].image === '/assets/huxinwei.<hash>.png'
```

**`contentRoot` 零配置发现**:`configResolved` 时从 `resolve.alias` 里读 `#content` 的 replacement。三个 Vite 配置(app、vitepress、vitest)都已经配过这个别名,插件不需要手动传 root。

**为什么用 `load` 而不是 `transform`**:VitePress 内置插件里有把 `.yaml` 当 raw text asset 处理的兜底逻辑,如果只挂 `transform`,我们生成的 JS 代码会被它当字符串再包一层 `export default "..."`,view 拿到的是源码字符串而不是 module 对象。`load` 是模块加载的入口,先返回 JS 代码就锁定了 module 形态。

**为什么不直接用 `@modyfi/vite-plugin-yaml`?** modyfi 只把 YAML 转 JSON module,不处理图片,也不提供目录虚拟模块。我们自己又得在视图里写一坨 `import.meta.glob('.../images/*.png', { query: '?url' })` + 拿 string 拼 key 去查表,运营仍然得在 YAML 里写「精准的相对路径」加上「另一处的 image manifest」。把图片解析下沉到 yaml 插件,运营只写一条 `image: ./images/x.png`,什么都不用懂。

**字段名故意不约束**:`image:` / `avatar:` / `logo:` / `bg:` 都行,只看「值的形态」。两套判断(路径前缀 + 图片扩展名)足够稳。

**`#content` 类型支持**:每个 domain 在 [`@types/content.d.ts`](../app/.vitepress/src/@types/content.d.ts) 里手写一条 `declare module '#content/<domain>'`,声明对象 shape,view 侧 import 才有类型。

### 6.2 i18n 纯函数 — `foldI18n`

完整实现:[`app/.vitepress/src-new/shared/content.ts`](../app/.vitepress/src-new/shared/content.ts)。

```ts
import { foldI18n, type Lang } from '~@/shared/content';

foldI18n({ name: '张三', name_en: 'Zhang San' }, 'zh');
// → { name: '张三' }

foldI18n({ name: '张三', name_en: 'Zhang San' }, 'en');
// → { name: 'Zhang San' }
```

- **纯函数**:深拷贝输入,不改原对象
- **递归**:对象、数组、嵌套对象都正确处理
- **不识别其它后缀**:`name_fr` 在 `zh`/`en` 模式下都原样保留

### 6.3 view 侧消费

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { foldI18n, type Lang } from '~@/shared/content';
import type { OrgT } from '@/@types/type-organization';

// 虚拟目录模块:image 已被插件转成 URL,key 是文件名去扩展名后的 slug
import organizationRaw from '#content/organization';

// 1. 渲染顺序 = 产品决策,写在视图里
const SECTIONS = ['advisory', 'committee', 'technical', /* ... */] as const;

// 2. anchor 从 title_en 派生,zh/en 共享
function deriveAnchor(titleEn: string): string {
  return titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const { lang } = useData();

// 3. 注入 anchor(读 title_en)→ 按 lang 折叠 i18n
const sections = computed<OrgT[]>(() =>
  SECTIONS.map((slug) => {
    const raw = organizationRaw[slug];
    const enriched = { ...raw, anchor: deriveAnchor(raw.title_en) };
    return foldI18n(enriched, lang.value as Lang) as unknown as OrgT;
  }),
);
</script>
```

view 侧不再有 `import.meta.glob` + path → slug 的样板,所有数据加工都是普通代码:排序/anchor 派生/i18n 折叠全部明面。

如果只需要某个具体的 yaml,直接单文件 import 即可:`import advisory from '#content/organization/advisory.yaml'`。两种 import 拿到的是同一个 module 对象(referential equality),由 Vite module graph 保证。

---

## 7. `data/` 还要不要?

**默认不要。** 简单页面 Vue 直接 `import` 拿数据,中间不再过 `data/<page>.ts` 这一层。

### 7.1 哪些场景可以直接删 `data/<page>.ts`

绝大多数页面属于这类 —— Vue 组件原本只是 `import data from '@/data/...'` 然后 `v-for` 渲染。改完长这样:

```vue
<!-- views/migration/MigrationCase.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { foldI18n, type Lang } from '~@/shared/content';

import raw from '#content/migration-case/data.yaml';

interface Card {
  title: string; title_en: string;
  description: string; description_en: string;
  image: string;
  link: string;
}

const { lang } = useData();
const data = computed(() => foldI18n(raw, lang.value as Lang) as { cards: Card[] });
</script>

<template>
  <div v-for="card in data.cards" :key="card.title">
    <img :src="card.image" />
    <h3>{{ card.title }}</h3>
    <p>{{ card.description }}</p>
  </div>
</template>
```

**整个 `data/migration/migration-case.ts` 删除**。视图比之前还短,且没有「这个 ts 文件还偷偷在干啥」的悬念。

### 7.2 哪些场景保留一个薄壳

只有两类:

**类型 1: section 顺序是产品决策**(organization、oevp 这类)。`SECTIONS` 数组可以直接放在 view 文件顶层,5 行内,无需额外抽文件。

**类型 2: 有非平凡的形状映射**(比如 FAQ 答案要先 markdown-it 渲染成 HTML)。保留一个 ~30 行 transform 函数,可以放在 `views/<page>/transform.ts` 或者直接内联到 view。

`data/common/*`(seo、category、nav-filter、nss)是开发常量,不在迁移范围,保留。

### 7.3 整体效果

```text
迁移前  app/.vitepress/src/data/    ~30 个 TS 文件,几千行 import + 数据混在一起
迁移后  app/.vitepress/src/data/    只剩 common/(4 个文件)
                                    + 0-2 个 transform shim(可选)
```

---

## 8. 与 `.cms/` 的关系

| | `.cms/`(现状) | `.content/`(新) |
| --- | --- | --- |
| 层数 | schema + content + export = 3 层 | 只有 YAML 文件 |
| 编辑方式 | VSCode 插件 | 文本编辑器 |
| 数据格式 | JSON(含 ID / 时间戳 / UID) | YAML(只有人能看得懂的字段) |
| 适合 | 字段多、引用关系复杂的结构化数据 | 列表 + 简单嵌套 |

短期:`.cms/` 已用于 `devday2026`,继续保留不动;新增内容走 `.content/`。
长期(可选):`.content/` 跑顺后把 devday2026 也迁过来,逻辑收敛到一处。
