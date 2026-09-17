# 迁移实践页 / Migration User Cases

迁移实践页（`/zh/migration/user-cases/`、`/en/migration/user-cases/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/migration/user-cases` 虚拟模块。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（按钮文案 + 3 个案例） |
| `en.yaml` | 英文页面数据（3 个案例） |

> 本页数据为纯文本与站内 public 路径，无 `@/assets/` import 资源，故无 `images/` 子目录。CSS 背景图（`case-card-bg.png`）属组件 UI 装饰，不在数据文件范围。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `button` | string | 案例卡片按钮文案（zh: '阅读案例' / en: 'Learn More'） |
| `cases` | array | 案例列表（3 项，按页面从上到下视觉顺序） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **字段用基线名**：简单单词字段（`path` / `title` / `summary` / `industry` / `img`），无 `_zh` / `_en` 后缀
- **button 自包含**：按钮文案从 `i18n.showcase.button` 迁移到 yaml（`i18n.showcase.button` 仍保留，因为 `ShowCase.vue` 等其他组件仍引用）
- **img 为 public 路径**：`/category/showcase/*.png` 是站内 public 目录绝对路径，非 `~@/assets/` import，yaml 中直接写原路径，不走 Vite 管线、不复制到 `images/`

## 消费方式

```ts
import { computed } from 'vue';
import { useData } from 'vitepress';
import userCasesContent from '#content/migration/user-cases';

const { lang } = useData();
const practicesInfo = computed(
  () => userCasesContent[lang.value as 'zh' | 'en'].cases
);
const userCaseData = computed(
  () => userCasesContent[lang.value as 'zh' | 'en']
);
// 模板：v-for="item in practicesInfo" / {{ userCaseData.button }}
```

## Schema

### 顶层

| 字段 | 必填 | 说明 |
|------|------|------|
| `button` | 是 | 案例卡片按钮文案 |
| `cases` | 是 | 案例列表 |

### cases[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `path` | 是 | 案例链接（站内路径） |
| `title` | 是 | 案例标题 |
| `summary` | 是 | 案例摘要 |
| `industry` | 是 | 行业类型（如 '运营商' / 'Carrier'） |
| `img` | 是 | 案例图片（站内 public 路径，如 `/category/showcase/provider.png`） |
