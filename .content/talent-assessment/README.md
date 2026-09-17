# 人才评估（Talent Assessment）

openEuler 人才评估页（`/zh/talent-assessment/`）的静态配置数据源。按页面路径组织在 `.content/talent-assessment/` 下。en 页面不存在，仅创建 `zh.yaml`。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版人才需求公司数据（5 项） |
| `images/` | 10 张公司 logo（light/dark 变体 × 5 家公司） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `talent_demand` | 数组 | 人才需求公司列表 | `TalentDemand.vue` |

## 设计原则

- **仅 zh**：en 页面不存在，仅创建 `zh.yaml`
- **主题变体用 `_light`/`_dark` 后缀**：logo 亮色/暗色各存一份
- **PNG 不带 `?raw`**：`<img>` 消费
- **posts 是字符串数组**：岗位列表

## 消费方式

```ts
import talentAssessmentContent from '#content/talent-assessment';

const talentDemand = computed(() => talentAssessmentContent.zh.talent_demand);
// 模板：:src="theme === 'light' ? item.logo_light : item.logo_dark"
```

## Schema

### talent_demand

| 字段 | 必填 | 说明 |
|------|------|------|
| `logo_light` | 是 | 亮色主题 logo（PNG，`<img>` 消费） |
| `logo_dark` | 是 | 暗色主题 logo（PNG） |
| `link` | 是 | 招聘链接 |
| `company` | 是 | 公司名称 |
| `intro` | 是 | 公司介绍 |
| `posts` | 是 | 岗位列表（字符串数组） |
