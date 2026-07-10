# 实习页数据

`/zh/internship/` 页面合作伙伴数据源。当前只有中文版本（`zh.yaml`），图片存放在 `images/` 子目录。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 合作伙伴列表数据 |
| `images/` | 8 家合作伙伴的 light/dark logo（共 16 张） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `partners` | 数组 | 合作伙伴列表（name + logo 主题变体） |

## 设计原则

- 按 locale 拆分数据文件（当前只有 `zh.yaml`，无英文版本）
- 主题变体用 `_light`/`_dark` 后缀
- 图片就近存放到 `images/`，文件名保留原名
- i18n 文案保留在 `internship-zh.ts` 不动
- 不存布局参数，只存内容数据

## 消费方式

```ts
import internshipContent from '#content/internship';

const partners = computed(() =>
  internshipContent.zh.partners.map((p) => ({
    name: p.name,
    logo: isDark.value ? p.logo_dark : p.logo_light,
  }))
);
```

## Schema

### partners[]

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 合作方名称（硬编码英文，不走 i18n） |
| logo_light | 是 | 亮色主题 logo `./images/xxx_light.png` |
| logo_dark | 是 | 暗色主题 logo `./images/xxx_dark.png` |
