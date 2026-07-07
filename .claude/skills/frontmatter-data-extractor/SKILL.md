---
name: frontmatter-data-extractor
version: "2.0.0"
description: '将 Vue 组件中硬编码的数据（data 文件、静态配置）提取为 YAML 数据文件，按页面路径在 `.content/` 下建立同名目录，拆分中英文为 `zh.yaml` 与 `en.yaml`，图片就近存放到该目录的 `images/` 子目录（文件名保留原名），由 vite-plugin-content-yaml 自动接入 Vite 资源管线（输出带 hash 的真实 URL）。适用于 banner、快捷入口、介绍文案等静态配置型数据。触发词："提取数据到 yaml"、"把数据转到 .content"、"数据外置"、"yaml 数据化"、"配置从代码搬到 yaml"、"extract data to yaml"、"把页面数据提取到 yaml 里"。'
license: MIT
metadata:
  author: openEuler-portal
  version: "2.0.0"
  tags:
    - yaml
    - data-extraction
    - vitepress
    - content-configuration
    - i18n
  triggers:
    - "提取数据到 yaml"
    - "把数据转到 .content"
    - "数据外置"
    - "yaml 数据化"
    - "配置从代码搬到 yaml"
    - "extract data to yaml"
    - "把页面数据提取到 yaml 里"
---

# Frontmatter Data Extractor

将 Vue 组件中硬编码的数据提取为 YAML 数据文件，按页面路径在 `.content/` 下建立同名目录，拆分中英文为 `zh.yaml` 与 `en.yaml`，图片就近存放到该目录的 `images/` 子目录。组件通过 `#content/<page-path>` 别名按 slug（文件名）索引读取对应语言数据。

## 资源管线原理（必读）

`.content/**/*.yaml` 由 [vite-plugin-content-yaml](../../../app/.vitepress/plugins/vite-plugin-content-yaml.ts) 接入 Vite 资源管线。插件 `load` 钩子遍历 yaml 中所有字符串值，**只要满足「以 `./` 或 `../` 或 `~@/` 开头 + 图片扩展名结尾（png/jpg/jpeg/webp/svg/gif）」**，就会被重写为 `import` 语句，Vite 处理后输出带 hash 的真实 URL（如 `/assets/banner-a1b2c3d4.png`）。

**关键区别**：md frontmatter 里的图片路径字符串不会被 Vite 处理（绕过资源管线）；而 yaml 数据文件里的图片路径字符串会被插件重写为 import，从而走资源管线。这是本 skill 把数据迁到 yaml 的核心原因。

## 适用场景

- 数据是**静态配置**（文案、链接、图片路径），不依赖 API
- 数据位于 `~@/data/` 目录或组件内 `const` / `import` 的 TS/JSON 文件
- 需要双语（zh/en）拆分存储，便于内容编辑者各自维护

## 不适用场景

- 数据来自 API 动态获取
- UI 状态数据（`selected`、`currentPage`、`isLoading` 等）

## 提取步骤

请**严格按步骤执行**下面的步骤，当现有数据不符合时按执行步骤进行转换！

### 1. 从页面路径定位数据目录

用户可能给出页面 URL（如 `https://www.openeuler.openatom.cn/zh/sig/sig-list/`、`https://www.openeuler.org/zh/sig/sig-list/`）或站点路径（如 `/zh/`、`/zh/sig/sig-list/`），需要解析为 `.content/` 下的目录。

**映射规则**：

1. 取 URL 的 path 部分，去掉域名
2. 去掉语言前缀（`zh/` 或 `en/`）和首尾斜杠
3. 得到资源路径段；**特例**：空路径（首页 `/zh/`、`/en/`）映射为 `home`

| 用户输入 | 资源路径段 | 数据目录 |
|---------|----------|---------|
| `https://www.openeuler.openatom.cn/zh/` | `home` | `.content/home/zh.yaml` |
| `https://www.openeuler.openatom.cn/zh/sig/sig-list/` | `sig/sig-list` | `.content/sig/sig-list/zh.yaml` |
| `https://www.openeuler.openatom.cn/en/download/` | `download` | `.content/download/en.yaml` |
| `/zh/` | `home` | `.content/home/zh.yaml` |
| `/zh/sig/sig-list/` | `sig/sig-list` | `.content/sig/sig-list/zh.yaml` |

zh/en 共用同一个数据目录（语言前缀已去掉），目录下拆 `zh.yaml` / `en.yaml` 两个文件 + 共用一个 `images/` 子目录。若目录不存在则创建。

> ⚠️ **强制验证 en 页面是否存在**：并非每一个 zh 页面都有对应 en 页面！在创建 `en.yaml` 前，**必须先用 `Test-Path app/en/<对应路径>/index.md`（或 glob `app/en/.../index.md`）验证 en md 文件确实存在**。只有 en md 存在时才创建 `en.yaml`；**en md 不存在时禁止创建 `en.yaml`，禁止从 zh 复制/翻译占位值编造 en 数据**。此时数据目录只有 `zh.yaml`，类型声明与组件消费也只声明/读取 `zh`（不索引 `locale.value`）。

### 2. 定位数据源

读取目标 md 文件的 `<script setup>` 部分，找到引用的 Vue 组件：

```bash
grep "import.*from" <md文件>
```

逐个读取这些组件，查找其中的硬编码数据（`import from '~@/data/...'`、组件内 `const` 定义、静态数组等），确定需要提取的数据源。

若用户已明确指出组件（如 `HomeDisplayZone.vue`），可直接进入下一步。

读取数据文件，逐字段标注处理方式：

| 字段类型 | 处理方式 |
|---------|---------|
| 双语字段 `{ zh, en }` 或 `title_zh/title_en` | 按文件拆分：`zh.yaml` 只保留 zh 值，`en.yaml` 只保留 en 值；**字段名去掉 `[locale]` 取值语法和 `_zh`/`_en` 后缀**，直接用基线名（如 `title`） |
| 主题字段 `{ dark, light }` | 拆为 `xxx_light` / `xxx_dark` 两个独立字段 |
| 单值字段 | 直接写入 |
| 图片/资源路径 | 见步骤 3 |

### 3. 处理资源路径

**核心原则**：图片就近存放到数据目录的 `images/` 子目录，**文件名保留源数据中的原名**（不重命名）。yaml 中以 `./images/<原文件名>` 书写，由 vite-plugin-content-yaml 自动重写为 import → Vite 输出带 hash 的真实 URL。

| 数据目录 | 图片目录 | yaml 中写法 |
|---------|---------|-----------|
| `.content/home/` | `.content/home/images/` | `./images/xxx.png` |
| `.content/sig/sig-list/` | `.content/sig/sig-list/images/` | `./images/xxx.png` |
| `.content/download/` | `.content/download/images/` | `./images/xxx.png` |

**文件命名规则**（zh/en 共用同一个 `images/` 目录）：

- **zh/en 共用同一张图**：不加后缀，仅存一份，两个 yaml 指向同一文件。如 `images/banner-pc.jpg`，`zh.yaml` 和 `en.yaml` 都写 `./images/banner-pc.jpg`。
- **zh/en 不共用（双语差异化）**：加 `_zh` / `_en` 后缀分别存放于同一目录。如 `images/banner-mb_zh.jpg`、`images/banner-mb_en.jpg`，`zh.yaml` 写 `./images/banner-mb_zh.jpg`，`en.yaml` 写 `./images/banner-mb_en.jpg`。
- **主题变体（亮色/暗色）**：通过 `_light` / `_dark` 后缀区分，放在同一 `images/` 目录，如 `images/white-paper_light.svg`、`images/white-paper_dark.svg`，不再额外建子目录。

| 原路径形式 | 处理方式 |
|-----------|---------|
| `import xxx from '~@/assets/...'` | 复制资源文件到 `.content/<path>/images/`，**保留原文件名**；yaml 中写 `./images/<原文件名>` |
| 组件内 `import xxx from './xxx.png'` | 同上 |
| 绝对 URL（`http(s)://...`） | 直接写 URL，不走 Vite 管线（CDN 资源） |

支持的资源扩展名：`png`、`jpg`、`jpeg`、`webp`、`svg`、`gif`

> 注意：yaml 中图片路径必须以 `./` 或 `../` 或 `~@/` 开头才会被插件识别。直接写 `images/xxx.png`（无 `./` 前缀）不会被重写为 import，会保留为原字符串 → 不走资源管线 → 无 hash。**务必带 `./` 前缀**。

### 3.SVG 图标与 `?raw` 消费方式（必读）

SVG 资源在 yaml 中有两种写法，决定 Vite 返回值类型，进而决定组件如何消费：

| yaml 写法 | Vite 返回值 | 适用场景 | 支持主题色（currentColor/暗黑） |
|----------|-----------|---------|---|
| `./images/xxx.svg?raw` | SVG 文件内容**字符串** | inline SVG 图标（OIcon 内 / 卡片图标 / 流程图标） | ✅ 支持 |
| `./images/xxx.svg`（无 `?raw`） | 带 hash 的资源 **URL 字符串** | `<img>` / CSS 背景图 | ❌ 不支持 |

`vite-plugin-content-yaml` 会把相对路径 + 图片扩展名的字符串值改写为 `import`；路径带 `?raw` 时透传给 Vite，Vite 返回文件内容字符串（不打包成资源），由组件渲染为 inline SVG；不带 `?raw` 时 Vite 返回带 hash 的 URL。

> 因此：**需要作为 inline SVG 图标（继承 currentColor、暗黑切换）的 SVG，yaml 路径必须带 `?raw`**；作为普通位图使用的 SVG/位图，路径不带 `?raw`。

#### 组件消费 SVG 字符串的三种方式

1. **`InlineSvg` 组件**（推荐用于直接渲染）：`<InlineSvg :raw="item.icon" />`，把 SVG 字符串渲染为 inline SVG，支持 currentColor / 暗黑切换。适合 OIcon 包裹或需继承主题色的场景：

  ```vue
  <OIcon class="icon"><InlineSvg :raw="isDark ? card.icon_dark : card.icon" /></OIcon>
  ```

2. **`createIcon` 函数**（推荐用于「期望 Vue 组件的 prop」）：`createIcon(raw)` 把 SVG 字符串转成 Vue 组件，传给期望组件的 prop（如 `OCard` 的 `:icon`、`OIcon` 的 `:is`）。

  - **关键约束：在模板传参处直接包裹，不要在 computed 里 `map` 数据再次转换 icon 字段**。在 computed 里 map 会产生额外的派生类型声明、且每次 locale 切换重复创建组件，徒增类型复杂度与开销。正确做法是数据 computed 保持原始结构，模板里就地包裹：
    
    ```vue
    <!-- ✅ 正确：模板传参处直接包裹，数据 computed 保持原始结构 -->
    <OCard :title="item.title" :detail="item.intro" :icon="createIcon(item.icon)" />
    ```

    ```ts
    // ✅ 正确：computed 直接返回原始数据，不做字段转换
    const typeOfMeeting = computed(
      () => meetingGuideContent[locale.value].meeting_type
    );
    // ❌ 错误：在 computed 里 map 转换 icon，产生派生类型 + 重复创建
    // const list = computed(() => data.value.map((item) => ({ ...item, icon: createIcon(item.icon) })));
    ```
    
  - `createIcon` 来自 `~@/components/createIcon`，内部用 `h('span', { class: 'inline-svg', innerHTML: raw })` 渲染。

3. **`<img :src="item.icon" />`**：仅当 yaml 路径**不带 `?raw`**时使用，作为普通图片。

#### 原 unplugin-icons 来源（`~icons/xxx.svg`）的处理

unplugin-icons 的 `import iconX from '~icons/sig/xxx.svg'` 返回的是 **Vue 组件**，不是文件路径，无法直接写入 yaml。处理方式：

1. 找到对应 SVG 源文件（通常在 `app/.vitepress/src-new/assets/...` 下，按 `~icons` 别名解析）
2. 复制到数据目录的 `images/`，**保留原文件名**
3. yaml 中写 `./images/xxx.svg?raw`
4. 组件改用 `InlineSvg` / `createIcon` 消费（见上）

#### 主题变体图标

亮/暗双主题图标拆为 `icon_light` / `icon_dark` 两个字段，各指向 `./images/xxx_light.svg?raw` / `./images/xxx_dark.svg?raw`，组件按 `theme` 取值后再消费：

```vue
<OIcon><InlineSvg :raw="isDark ? card.icon_dark : card.icon_light" /></OIcon>
```

### 4. 编写 YAML 数据文件

在 `.content/<path>/` 下创建 `zh.yaml` 和 `en.yaml`，yaml 文件顶层直接是业务数据（对象或数组均可），格式要求：

1. **字段注释**：在文件顶部用 `#` 写整体说明，每个数据板块上方用 `#` 注释字段含义
2. **双语同步**：`zh.yaml` 和 `en.yaml` 结构必须一致，字段名相同，文案分别对应
3. **字段命名**：因已按文件拆分 locale，**禁止**使用 `_zh` / `_en` 后缀，字段直接用基线名（如 `title`、`description`）；主题变体保留 `_light` / `_dark` 后缀
4. **缩进对齐**：YAML 数组项缩进 2 空格
5. **板块间距**：不同数据板块之间空一行分隔
6. **板块顺序**：多个数据板块按页面从上到下的视觉顺序排列，与页面布局一致

示例（zh — `.content/home/zh.yaml`）：

```yaml
# 首页数据 / Home page data
#
# banner: 首页顶部 banner 配置（页面最顶部）
#   title: banner 标题（数组分行显示）
#   btn: 按钮文案
#   href: 按钮链接
#   bg_pc/bg_pad/bg_mb: PC/平板/移动端背景图（相对当前 yaml 文件）
banner:
  - title:
      - OpenAtom openEuler
      - 2025 社区年报
    btn: 查看详情
    href: /zh/annual-report/openEuler-annual-report-2025/
    bg_pc: ./images/banner-annual-report-pc.jpg
    bg_pad: ./images/banner-annual-report-pad.jpg
    bg_mb: ./images/banner-annual-report-mb_zh.jpg

# display_zone: 首页快捷入口配置
#   title: 入口标题
#   icon_light/icon_dark: 亮色/暗色主题图标
#   description: 入口描述
#   link: 入口链接
display_zone:
  - title: 技术白皮书
    icon_light: ./images/white-paper_light.svg
    icon_dark: ./images/white-paper_dark.svg
    description: 了解openEuler各版本的技术详情
    link: /zh/showcase/technical-white-paper/
```

示例（en — `.content/home/en.yaml`）：

```yaml
# Home page data
#
# banner: Home top banner configuration
#   title: Banner title (array = multi-line)
#   btn: Button text
#   href: Button link
#   bg_pc/bg_pad/bg_mb: PC/Tablet/Mobile background images (relative to this yaml)
banner:
  - title:
      - OpenAtom openEuler
      - 2025 Community Annual Report
    btn: View Details
    href: /en/annual-report/openEuler-annual-report-2025/
    bg_pc: ./images/banner-annual-report-pc.jpg
    bg_pad: ./images/banner-annual-report-pad.jpg
    bg_mb: ./images/banner-annual-report-mb_en.jpg

# display_zone: Home quick links configuration
#   title: Entry title
#   icon_light/icon_dark: Light/dark theme icons
#   description: Entry description
#   link: Entry link
display_zone:
  - title: Technical White Papers
    icon_light: ./images/white-paper_light.svg
    icon_dark: ./images/white-paper_dark.svg
    description: Learn the tech details of each openEuler version.
    link: /en/showcase/technical-white-paper/
```

> 注意：`zh.yaml` 和 `en.yaml` 中 `bg_pc` / `bg_pad` / `icon_light` / `icon_dark` 指向同一文件（共用图），`bg_mb` 用 `_zh` / `_en` 后缀区分（不共用图）。

### 5. 声明虚拟模块类型

`#content/<page-path>` 是 vite-plugin-content-yaml 合成的虚拟模块，每新增一个 domain 必须在 [app/.vitepress/src-new/@types/content/](../../../app/.vitepress/src-new/@types/content/) 下按页面路径**第一层**建立 `.d.ts` 文件并声明，否则 TS 报 `Cannot find module`。文件名取第一层路径段（如 `sig.d.ts`、`download.d.ts`，首页为 `home.d.ts`）。

`.d.ts` 命名示例：

| 页面路径 | 第一层 | `.d.ts` 文件 |
|---------|-------|-------------|
| `/zh/`（首页） | `home` | `home.d.ts` |
| `/zh/sig/sig-list/` | `sig` | `sig.d.ts` |
| `/zh/sig/sig-detail/` | `sig` | `sig.d.ts` |
| `/zh/download/` | `download` | `download.d.ts` |
| `/zh/migration/` | `migration` | `migration.d.ts` |

> 多个页面共用同一第一层时（如 `sig/sig-list` 与 `sig/sig-detail`），其 `declare module` 都写在同一个 `sig.d.ts` 里。

虚拟模块的默认导出是该目录下所有 yaml 按 slug（文件名去掉 `.yaml`）索引的对象。本规则下 slug 即 `zh` / `en`。

```ts
// app/.vitepress/src-new/@types/content/sig.d.ts
declare module '#content/sig/sig-list' {
  interface SigBannerItemT {
    title: string[];
    btn: string;
    href: string;
    bg_pc: string;
    bg_pad: string;
    bg_mb: string;
  }
  interface SigDisplayZoneItemT {
    title: string;
    icon_light: string;
    icon_dark: string;
    description: string;
    link: string;
  }
  const data: {
    zh: { banner: SigBannerItemT[]; display_zone: SigDisplayZoneItemT[] };
    en: { banner: SigBannerItemT[]; display_zone: SigDisplayZoneItemT[] };
  };
  export default data;
}
```

> 同一第一层下的多个子路径（如 `#content/sig/sig-list`、`#content/sig/sig-detail`）集中声明在对应的 `<第一层>.d.ts` 中，便于管理。`declare module` 是全局声明，文件名/目录只影响组织，不影响功能。
> 命名约定遵循 [rules/naming.md](../../../rules/naming.md)：单条数据用 `SigBannerItemT`、列表用 `SigBannerListT` 等。

### 6. 更新组件消费方式

提取完成后，组件改为从 `#content/<page-path>` 按 locale 读取数据：

1. `import xxxContent from '#content/<page-path>'`
2. 用 `useLocale()` 拿当前 locale
3. `xxxContent[locale]` 取对应语言数据
4. 双语字段不再需要 `[locale]` 取值（已按文件拆分）
5. 主题字段仍需按 `theme` 取值（`icon_dark` / `icon_light`）

```ts
import { computed } from 'vue';
import displayZoneContent from '#content/home';
import { useLocale } from '~@/composables/useLocale';

const { isZh } = useLocale();
const displayZone = computed(() =>
  isZh.value ? displayZoneContent.zh : displayZoneContent.en
);
```

### 7. 清理旧数据文件

确认组件已改为从 `#content` 读取后：

- 删除原数据文件（如 `~@/data/home/display-zone.ts`）
- 删除该文件中的资源 `import`（SVG/PNG 图片的 import 语句，图片已复制到 `.content/<path>/images/`）
- 检查是否有其他组件引用该数据文件，如有则保留或同步修改

### 8. 编写/更新 README.md

在 `.content/<path>/` 数据目录下新增或更新 `README.md`，作为该页面数据源的文档。首次提取时新建，后续增删板块或字段时同步更新。

参考 [`.content/home/README.md`](../../../.content/home/README.md) 的结构，包含以下章节：

| 章节 | 内容 |
|------|------|
| 标题 + 简介 | `# <页面名>` + 一句话说明数据源组织方式（`zh.yaml` / `en.yaml` 拆分 + 共用 `images/`） |
| 文件说明 | 表格列出 `zh.yaml` / `en.yaml` / `images/` 及用途 |
| 数据板块 | 表格列出 yaml 顶层对象的所有板块名、类型（数组/对象）、用途 |
| 设计原则 | 列表说明：按文件拆分 locale、字段用基线名、主题变体用 `_light`/`_dark`、图片就近存放、zh/en 共用图不加后缀/不共用加 `_zh`/`_en` 后缀、不存布局参数 |
| 消费方式 | 给出代码示例 |
| Schema | 每个板块一节，表格列出字段名、是否必填、说明 |

**要求**：

1. README 的 Schema 必须与 yaml 实际字段一致，增删字段后同步更新
2. 新增板块时，在"数据板块"和"Schema"两处同步补充
3. 双语字段已按文件拆分，Schema 中字段名用基线名（无 `_zh`/`_en` 后缀）

## 检查清单

- [ ] 数据文件已读取，所有字段已理解
- [ ] 数据目录已根据页面路径确定：`.content/<page-path-no-locale>/`（首页为 `.content/home/`）
- [ ] **已用 `Test-Path app/en/<对应路径>/index.md` 验证 en 页面是否存在**：存在才创建 `en.yaml`；不存在则只建 `zh.yaml`，类型声明与组件消费只取 `zh`，禁止编造 en 数据
- [ ] 图片已复制到 `.content/<path>/images/`，**文件名保留原名**；共用图不加后缀、不共用图加 `_zh`/`_en` 后缀、主题变体加 `_light`/`_dark` 后缀
- [ ] yaml 中图片路径以 `./images/xxx.ext` 形式书写（**必须带 `./` 前缀**），可被 vite-plugin-content-yaml 识别
- [ ] 需作为 inline SVG 图标的 SVG 路径带 `?raw` 后缀（`./images/xxx.svg?raw`）；普通位图/`<img>` 用法不带 `?raw`
- [ ] SVG 图标消费方式正确：`InlineSvg`（直接渲染）或 `createIcon`（作为组件 prop，在模板传参处包裹，**不在 computed 里 map 转换**）
- [ ] 文件顶部及每个数据板块上方有 `#` 注释说明
- [ ] 不同数据板块之间空一行分隔
- [ ] 多个数据板块按页面从上到下的视觉顺序排列
- [ ] `app/.vitepress/src-new/@types/content/<第一层>.d.ts` 已新增 `declare module '#content/<page-path>'` 类型声明（首页为 `home.d.ts`）
- [ ] 组件已改为 `import xxxContent from '#content/<page-path>'` + 按 locale 取值
- [ ] 原数据文件已删除（确认无其他引用后删除）
- [ ] `.content/<path>/README.md` 已新增/更新，Schema 与 yaml 实际字段一致
- [ ] `pnpm lint` 无 error
