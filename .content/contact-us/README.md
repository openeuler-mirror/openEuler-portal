# Contact Us（联系我们）

本目录是「联系我们」页面的数据源，按 `zh.yaml` / `en.yaml` 拆分双语，共用一个 `images/` 子目录，由 `OPlusYamlContentVitePlugin` 自动接入 Vite 资源管线（图片输出带 hash 的真实 URL）。

## 文件说明

| 文件 / 目录 | 用途 |
|------------|------|
| `zh.yaml` | 中文版页面数据 |
| `en.yaml` | 英文版页面数据（与 `zh.yaml` 结构一致，文案对应） |
| `images/` | zh/en 共用的图片资源；共用图不加后缀，差异化图保留 `-zh` / `-en` 后缀，主题变体保留 `light` / `dark` / `primary` 子目录 |
| `README.md` | 本说明文件 |

## 数据板块

| 板块 | 字段 | 类型 | 用途 |
|------|------|------|------|
| `banner` | `title` | 对象 | 顶部 banner 标题 |
| `community_contact` | `title` / `desc` | 对象 | 社区联系板块标题与副标题（答复周期说明） |
| `contact_items` | `title` / `email` / `icon` | 数组 | 4 项联系卡片，含邮箱与 inline SVG 图标 |
| `follow_us` | `title` / `desc` / `cover` / `footer_codes` / `follow_links` | 对象 | 欢迎关注我们板块，含封面、二维码（zh 专属）、社交媒体链接 |
| `handy_materials` | `title` / `list` | 对象 | 资源推荐板块，3 项资源卡片 |

## 设计原则

1. **按文件拆分 locale**：`zh.yaml` 与 `en.yaml` 各自只存对应语言文案，字段用基线名，禁用 `_zh` / `_en` 后缀。
2. **主题变体用 `_light` / `_dark`**：社交媒体图标分亮色 / 暗色 / 主题色三套，分别存放在 `images/light` / `images/dark` / `images/primary` 子目录，字段名为 `icon` / `icon_dark` / `icon_primary`。
3. **图片就近存放**：所有图片放在 `images/`，yaml 中以 `./images/xxx.ext` 书写，保留原文件名。
4. **zh/en 共用图不加后缀**，差异化图保留 `-zh` / `-en` 后缀（如 `follow-zh.jpg` / `follow-en.jpg`）。
5. **SVG inline 图标路径带 `?raw`**：作为 OCard `:icon`（继承 currentColor）消费的 SVG 路径必须带 `?raw` 后缀，由 `createSvgIcon` 转为 Vue 组件；普通 `<img>` / 背景图不带 `?raw`。
6. **不存布局参数**：仅存文案、链接、图片路径等静态配置，布局参数（flex、gap 等）保留在组件内。
7. **i18n-t 占位符翻译保留在 i18n**：含 `{email}` / `{forum}` 占位符与条件渲染的 `communityItem4Desc1` / `communityItem4Desc2` 仍在 `i18n/contact-us/index.ts` 维护，不提取到 yaml。

## 消费方式

组件 `app/.vitepress/src-new/views/contact-us/TheContactUs.vue` 通过 `#content/contact-us` 虚拟模块按 locale 读取数据：

```ts
import contactUsContent from '#content/contact-us';
import { createSvgIcon } from '~@/composables/createSvgIcon';
import { useLocale } from '~@/composables/useLocale';

const { locale, isZh } = useLocale();
const content = computed(() => contactUsContent[locale.value]);
```

模板中按板块访问：

```vue
<!-- 文案 -->
:title="content.banner.title"
:subtitle="content.community_contact.desc"

<!-- 列表 -->
v-for="(item, index) in content.contact_items"

<!-- inline SVG 图标（路径带 ?raw，模板传参处直接包裹 createSvgIcon） -->
:icon="createSvgIcon(item.icon)"

<!-- 普通图片（路径不带 ?raw） -->
:src="content.follow_us.cover"

<!-- 主题变体图标 -->
:src="isDark ? item.icon_dark : item.icon"
```

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | banner 标题文案 |

### community_contact

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `desc` | 是 | 板块副标题（答复周期说明） |

### contact_items[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 联系项标题（如「资金捐赠请联系」） |
| `email` | 是 | 联系邮箱（点击 mailto） |
| `icon` | 是 | 联系项图标，SVG 路径带 `?raw`（如 `./images/icon-contact1.svg?raw`） |

### follow_us

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `desc` | 是 | 板块副标题 |
| `cover` | 是 | 封面图，zh/en 差异化（zh 用 `follow-zh.jpg`，en 用 `follow-en.jpg`） |
| `footer_codes` | 是 | 二维码列表；zh 有 2 项，en 留空数组 `[]` |
| `follow_links` | 是 | 社交媒体列表，zh/en 共用 |

#### follow_us.footer_codes[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `code` | 是 | 二维码图片 |
| `label` | 是 | 二维码说明（如「微信公众号」） |

#### follow_us.follow_links[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | 是 | 亮色主题图标 |
| `icon_dark` | 是 | 暗色主题图标 |
| `icon_primary` | 是 | 主题色图标（hover 态） |
| `href` | 是 | 社交链接 |
| `label` | 是 | 平台名称（X / LinkedIn / YouTube / Bilibili） |

### handy_materials

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `list` | 是 | 资源列表，3 项 |

#### handy_materials.list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 资源标题 |
| `desc` | 是 | 资源描述 |
| `href` | 是 | 资源链接 |
| `icon` | 是 | 资源图标，SVG 路径带 `?raw`（如 `./images/icon-contact5.svg?raw`） |
