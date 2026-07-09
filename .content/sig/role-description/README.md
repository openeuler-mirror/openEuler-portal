# sig/role-description

SIG 角色说明页（`/zh/sig/role-description/`、`/en/sig/role-description/`）数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据，共用同一个 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 中文角色说明数据 |
| `en.yaml` | 英文角色说明数据 |
| `images/` | 图片资源（zh/en 共用；26 个文件，PNG 角色卡片背景 + SVG 图标） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引（按页面从上到下视觉顺序）：

| 板块 | 类型 | 说明 |
|------|------|------|
| `community_member` | 对象 | 社区成员板块（页面最上方）：3 个角色卡片 + 2 个引导卡片 |
| `contributor` | 对象 | 贡献者板块：加入要求 + 责任与权益 |
| `committer` | 对象 | 审核者板块：加入要求 + 责任与权益 |
| `maintainer` | 对象 | 维护者板块：加入要求 + 责任与权益 |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名（snake_case）**：如 `view_detail`、`card_point_bg`、`bg_light` / `bg_dark`、`bg_mb_light` / `bg_mb_dark`，禁止 `viewDetail` / `cardPointBg` / `bgDark` 等驼峰
- **主题变体用 `_light` / `_dark` 后缀**：角色卡片背景图区分亮色/暗色主题（contributor/committer/maintainer 的 cards）；community_member.types 仅单一背景（无主题变体），保留 `bg` / `bg_mb`
- **图片就近存放**：`images/` 下，文件名保留原名；zh/en 共用图不加后缀
- **SVG 图标用 `?raw` 后缀**：`icon: ./images/xxx.svg?raw`，vite-plugin-content-yaml 透传 `?raw` 由 Vite 返回 SVG 字符串，组件用 InlineSvg 渲染（支持 currentColor / 暗黑切换）
- **可选字段省略**：`requirement`（贡献者卡片无）、`notice`（仅 contributor 第二张卡有）、`desc` 为空时写空字符串 `''`

## 消费方式

```ts
import roleDescriptionData from '#content/sig/role-description';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';

const { locale } = useLocale();
const localeData = computed(() => roleDescriptionData[locale.value]);
const communityMember = computed(() => localeData.value.community_member);
const sections = computed(() => [
  localeData.value.contributor,
  localeData.value.committer,
  localeData.value.maintainer,
]);
```

## Schema

### community_member

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 板块标题 |
| `subtitle` | ✅ | 板块副标题 |
| `view_detail` | ✅ | 角色卡片「查看详情」按钮文案 |
| `types` | ✅ | 角色卡片数组（3 项：贡献者/审核者/维护者） |
| `cards` | ✅ | 引导卡片数组（2 项：新贡献者/既有社区成员） |

#### community_member.types[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg` | ✅ | 卡片背景图（PC 端，单一背景无主题变体） |
| `bg_mb` | ✅ | 卡片背景图（移动端，与 `bg` 同文件） |
| `name` | ✅ | 角色名称 |
| `responsibilitiy` | ✅ | 职责描述（保留原拼写） |
| `requirement` | ❌ | 要求描述（贡献者卡片缺失） |
| `href` | ✅ | 锚点跳转目标（`contributor` / `committer` / `maintainer`） |

#### community_member.cards[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | ✅ | SVG 图标路径（带 `?raw` 后缀） |
| `name` | ✅ | 引导卡片标题 |
| `desc` | ✅ | 引导卡片描述（含 HTML `<a>` 链接） |

### contributor / committer / maintainer

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 锚点 id（`contributor` / `committer` / `maintainer`） |
| `title` | ✅ | 板块标题 |
| `subtitle` | ✅ | 板块副标题（数组，可多段） |
| `card_point_bg` | ✅ | 要点图标背景图（`./images/xxx-point.png`） |
| `cards` | ✅ | 角色卡片数组（2 项：加入要求 + 责任与权益） |

#### cards[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_light` | ✅ | 卡片背景图（PC 端，亮色主题） |
| `bg_dark` | ✅ | 卡片背景图（PC 端，暗色主题） |
| `bg_mb_light` | ✅ | 卡片背景图（移动端，亮色主题） |
| `bg_mb_dark` | ✅ | 卡片背景图（移动端，暗色主题） |
| `title` | ✅ | 卡片标题 |
| `desc` | ✅ | 卡片描述（当前为空字符串 `''`） |
| `notice` | ❌ | 注意事项（仅 contributor 责任与权益卡片有） |
| `points` | ✅ | 要点列表（字符串数组，可含 HTML `<a>` 链接） |
