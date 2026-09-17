# UB OS Component 数据

UB OS Component 页面（`/zh/projects/ub-os-component/`、`/en/projects/ub-os-component/`）的静态数据，由 `OPlusYamlContentVitePlugin` 合成为 `#content/projects/ub-os-component`，组件按 locale 读取。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文代码仓列表和相关链接 |
| `en.yaml` | English repositories and related links |
| `images/` | 相关入口 SVG 图标（zh/en 共用） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `repo_list` | 数组 | UB OS Component 组件 / 模块 / 功能三级结构的代码仓列表 |
| `related_links` | 数组 | UnifiedBus 官网和 SIG 入口卡片 |

## 设计原则

- 中英文按文件拆分，字段结构保持一致，字段名用基线名（snake_case）。
- 入口 SVG 路径带 `?raw`，由 `createSvgIcon` 在模板传参处包裹为 inline 图标消费。
- 图片就近存放于 `images/`，文件名保留原名，zh/en 共用同一份。
- 架构图、banner 属于页面视觉资源，继续由组件直接引用，不入 yaml。

## 消费方式

```ts
import ubOsComponentContent from '#content/projects/ub-os-component';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
const content = computed(() => ubOsComponentContent[locale.value]);
const repoList = computed(() => content.value.repo_list);
const relatedLinkList = computed(() => content.value.related_links);
```

```vue
<!-- SVG 图标在模板传参处包裹，不在 computed 里 map 转换 -->
<OIcon class="title-icon"><component :is="createSvgIcon(item.icon)" /></OIcon>
```

## Schema

### repo_list（UbOsRepoItemT[]）

三级结构：分类（name）→ 模块（module）→ 功能条目（function），由 `RepoList.vue` 拍平渲染表格。

| 字段 | 是否必填 | 说明 |
|------|---------|------|
| `name` | 分类必填 | 分类名，可含 `<br>` 换行（经 `v-dompurify-html` 渲染，移动端筛选时去除） |
| `row_key` | 分类/模块必填 | 合并单元格的取值键（`name` / `module`），驱动 `RepoList` 跨行合并 |
| `children` | 有下级时必填 | 下级条目数组 |
| `module` | 模块层必填 | 模块名 |
| `function` | 功能层必填 | 功能名 |
| `desc` | 功能层必填 | 功能描述 |
| `repo` | 功能层必填 | 代码仓名（字符串或数组），显示名 |
| `repo_link` | 功能层必填 | 仓库链接路径（字符串或数组，与 `repo` 一一对应），拼接 `https://atomgit.com/` 前缀 |

### related_links（UbOsRelatedLinkT[]）

| 字段 | 是否必填 | 说明 |
|------|---------|------|
| `icon` | 必填 | 入口图标，`./images/xxx.svg?raw`（inline SVG 消费） |
| `title` | 必填 | 入口标题 |
| `desc` | 必填 | 入口描述 |
| `href` | 必填 | 链接地址 |
| `is_outlink` | 可选 | 是否外部链接（控制外链图标展示） |
