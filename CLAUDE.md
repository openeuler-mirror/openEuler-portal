# openEuler 项目开发指南

## 项目概述

openEuler VitePress 官网项目，使用 `.geo/` 目录管理 SEO/GEO 配置。

## SEO/GEO 实现详解

完整 SEO 实现流程请阅读: **[geo-implementation-summary.md](./geo-implementation-summary.md)**

### 核心要点

**配置文件结构**（按页面路径组织）:
```
.geo/tdks/{locale}/{path}/index.json     # TDK 配置
.geo/jsonld/{locale}/{path}/index.json   # JSON-LD 配置
```

**路径映射规则**: 文件路径与页面 URL 一一对应
```
页面 zh/sig/Kernel → .geo/jsonld/zh/sig/Kernel/index.json
页面 en/approve → .geo/tdks/en/approve/index.json
```

**触发时机**: `transformPageData` 钩子中统一执行 (config.ts)

## 常用 Commands

| Command | 用途 |
|---------|------|
| `/generate-tdk-local app/.vitepress/dist` | 从本地 HTML 批量生成 TDK |
| `/generate-schema-local app/.vitepress/dist` | 从本地 HTML 批量生成 JSON-LD |

## Skills 工具

| Skill | 用途 |
|-------|------|
| `sitemap-meta-tags-batch-generator` | TDK 批量生成 |
| `sitemap-schema-batch-generator` | JSON-LD 批量生成 |
| `meta-tags-optimizer` | 单页 TDK 优化 |
| `schema-markup-generator` | 单页 JSON-LD 生成 |

## 开发规范

### 新增页面时

1. 在 `app/zh/` 或 `app/en/` 创建 `.md` 文件
2. 确保创建对应的 `.geo/` 配置:
   - `.geo/tdks/{locale}/{path}/index.json`
   - `.geo/jsonld/{locale}/{path}/index.json`
3. 或使用 frontmatter 内嵌配置 (seoTitle, seoDescription, jsonLd)

### 配置优先级

```
1. md 文件 frontmatter 内嵌配置（最高）
2. .geo/ 目录配置文件
3. 自动生成（以上都不存在时）
```

## 关键文件位置

- 主配置: `app/.vitepress/config.ts`
- TDK 设置函数: `setTdk` (config.ts 第 44-88 行)
- JSON-LD 设置函数: `setJSONLD` (config.ts 第 24-42 行)
- Skills 目录: `.claude/skills/`

## 相关文档

- [geo-implementation-summary.md](./geo-implementation-summary.md) - SEO 完整实现文档