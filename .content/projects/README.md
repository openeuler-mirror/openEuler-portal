# 项目列表（Projects）

openEuler 项目列表页（`/zh/projects/`、`/en/projects/`）的静态配置数据源。按页面路径组织在 `.content/projects/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，图片就近存放在共用 `images/` 子目录。

> **注意**：`~@/data/project/index.ts` 还导出了 `entranceList`、`ubEntranceList`、`ubServiceCoreUrl`（被 yuanrong/ub-service-core 页面使用）和 `intelligence-boom.ts` 的 re-export（被 intelligence-boom 页面使用）。这些不在本页提取范围，保留在 TS 文件中。本页仅提取 `projectData`。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版项目列表数据（11 项） |
| `en.yaml` | 英文版项目列表数据（10 项，en 缺 NestOS） |
| `images/` | 6 张项目图标（a-tune/iSula/secGear/stratoVirt/intelligence/yuanrong） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `project_data` | 数组 | 项目卡片列表 | `TheProjects.vue` |

## 设计原则

- **按文件拆分 locale**：双语数据已拆分到 `zh.yaml` / `en.yaml`，字段用基线名（`atomgit_url`/`gitee_url`）
- **zh/en 项数不同**：zh 11 项，en 10 项（en 缺 NestOS）
- **icon 为空字符串**：部分项目无图标（icon 为 `''`），组件用 `<OFigure>` 消费时显示空
- **tag 可选**：部分项目有 `tag: NEW` 标签
- **图片就近存放**：PNG 图标在 `images/` 下，yaml 中以 `./images/xxx.png` 书写
- **不存布局参数**：分页、卡片样式保留在组件中

## 消费方式

```ts
import projectsContent from '#content/projects';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
const projectData = computed(() => projectsContent[locale.value].project_data);

// 模板
// v-for="(item, i) in projectData"
// {{ item.title }} / {{ item.desc }}
// <OFigure :src="item.icon" />
// :href="`/${locale}${item.url}`"
// v-if="item.atomgit_url"
```

## Schema

### project_data

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 项目名称 |
| `desc` | 是 | 项目描述 |
| `icon` | 是 | 项目图标路径（空字符串 = 无图标，`<OFigure>` 消费） |
| `url` | 是 | 项目详情页链接（相对站点根目录，模板中拼接 `/${locale}` 前缀） |
| `atomgit_url` | 否 | AtomGit 代码仓链接（部分项为空字符串） |
| `gitee_url` | 否 | Gitee 代码仓链接（部分项为空字符串） |
| `tag` | 否 | 标签（如 `NEW`） |
