# 开源实习（Internship）

openEuler 开源实习页（`/zh/internship/`）的静态配置数据源。按页面路径组织在 `.content/internship/` 下。en 页面不存在，仅创建 `zh.yaml`。

> **注意**：页面其他子组件（TheActivityIntro/TheInternshipFaq/TheInternshipReward 等）的"硬编码"数据是 i18n key 引用（运行时求值），不适合提取到 yaml。只有 TheInternshipPartners 的 `partners`（公司 name + logo 图片）是纯静态配置，已提取。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版合作伙伴数据（8 项） |
| `images/` | 16 张公司 logo（light/dark 变体 × 8 家） |

## 数据板块

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `partners` | 数组 | 合作伙伴 logo 列表 | `TheInternshipPartners.vue` |

## 设计原则

- **仅 zh**：en 页面不存在
- **主题变体用 `_light`/`_dark` 后缀**：logo 亮色/暗色各存一份
- **PNG 不带 `?raw`**：`<img>` 消费
- **不在 computed 里 map 转换**：partners computed 直接返回原始数据，模板中按 `isDark` 取值

## 消费方式

```ts
import internshipContent from '#content/internship';

const partners = computed(() => internshipContent.zh.partners);
// 模板：<img :src="isDark ? partner.logo_dark : partner.logo_light" />
```

## Schema

### partners

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 合作伙伴名称 |
| `logo_light` | 是 | 亮色主题 logo（PNG，`<img>` 消费） |
| `logo_dark` | 是 | 暗色主题 logo（PNG） |
