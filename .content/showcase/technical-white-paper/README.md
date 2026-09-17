# 技术白皮书（Technical White Paper）

openEuler 技术白皮书页（`/zh/showcase/technical-white-paper/`、`/en/showcase/technical-white-paper/`）的静态配置数据源。按页面路径组织在 `.content/showcase/technical-white-paper/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线。

> **注意**：本页面无图片资源，所有数据均为 PDF 路径与标题文案。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文版白皮书列表（20 项） |
| `en.yaml` | 英文版白皮书列表（15 项，en 是 zh 子集） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `white_paper` | 数组 | 技术白皮书列表（按版本倒序） | `TechnicalWhitePaper.vue` |

## 设计原则

- **按文件拆分 locale**：双语数据已拆分到 `zh.yaml` / `en.yaml`，字段名用基线名（`path`、`summary`）
- **en 是 zh 子集**：en 15 项，zh 20 项；SP4 en PDF 待提供（原 TS 中为 TODO 注释，yaml 中直接省略）
- **path 含 URL 编码**：LTS 版本的 path 使用 `%20` 编码空格（如 `openEuler%2024.03%20LTS%20SP4`），非 LTS 版本直接用空格
- **不存布局参数**：分页、卡片样式保留在组件中

## 消费方式

```ts
import whitePaperContent from '#content/showcase/technical-white-paper';
import { useData } from 'vitepress';

const { lang } = useData();
const technicalData = computed(
  () => whitePaperContent[lang.value as 'zh' | 'en'].white_paper
);
```

## Schema

### white_paper

| 字段 | 必填 | 说明 |
|------|------|------|
| `path` | 是 | PDF 文件路径（相对站点根目录，部分含 `%20` URL 编码） |
| `summary` | 是 | 白皮书标题文案 |
