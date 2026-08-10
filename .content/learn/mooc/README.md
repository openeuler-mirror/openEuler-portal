# 课程中心（MOOC）

openEuler 课程中心页（`/zh/learn/mooc/`、`/en/learn/mooc/`）的静态配置数据源。按页面路径组织在 `.content/learn/mooc/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`。

> **注意**：`MOOC_COURSE` 课程列表数据已从 i18n 文件提取到 yaml。UI 文案（`MOOC`/`BTN_LEARN`/`BTN_APPLY` 等）仍保留在 `i18n/learn/` 中。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版课程列表（5 项） |
| `en.yaml` | 英文版课程列表（1 项，en 仅 Tutorials） |
| `images/` | 1 张课程封面图（mooc1.png，zh/en 共用） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `mooc_course` | 数组 | 课程卡片列表 | `MoocContent.vue` |

## 设计原则

- **按文件拆分 locale**：课程数据已拆分到 `zh.yaml` / `en.yaml`
- **zh/en 项数不同**：zh 5 项，en 1 项（en 仅 Tutorials）
- **img 是 PNG**：`<img>` 消费，不带 `?raw`
- **UI 文案保留在 i18n**：`MOOC`/`BTN_LEARN`/`BTN_APPLY` 等是 vue-i18n 翻译 key
- **字段用基线名**：`id`/`img`/`title`/`desc`/`children`/`name`/`path`/`apply_link`

## 消费方式

```ts
import moocContent from '#content/learn/mooc';
import { useData } from 'vitepress';

const { lang } = useData();
const moocCourse = computed(() => moocContent[lang.value as 'zh' | 'en'].mooc_course);
```

## Schema

### mooc_course

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 课程 ID |
| `img` | 是 | 课程封面图（PNG，`<img>` 消费） |
| `title` | 是 | 课程标题 |
| `desc` | 是 | 课程描述 |
| `apply_link` | 否 | 报名链接 |
| `children` | 是 | 子链接列表 |
| `children[].name` | 是 | 链接文案 |
| `children[].path` | 是 | 链接地址 |
