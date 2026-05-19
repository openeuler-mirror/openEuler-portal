# Agent 项目指南

## 项目概述

openEuler VitePress 官网项目，使用 `.geo/` 目录管理 SEO/GEO 配置。

## 重要文档

- **SEO 实现详解**: [geo-implementation-summary.md](./geo-implementation-summary.md)

## 目录结构

```
D:\code\euler\
├── app/                    # 主要代码目录
│   ├── zh/                 # 中文页面 md 文件
│   ├── en/                 # 英文页面 md 文件
│   └── .vitepress/
│       └── config.ts       # VitePress 配置，SEO 钩子
├── .geo/                   # SEO 配置目录
│   ├── tdks/               # TDK 配置
│   │   ├── zh/{path}/index.json
│   │   └── en/{path}/index.json
│   ├── jsonld/             # JSON-LD 配置
│   │   ├── zh/{path}/index.json
│   │   └── en/{path}/index.json
│   └── last-modified.json  # 构建时生成
├── .claude/                # Claude skills 目录
│   └── skills/             # SEO 相关 skills
├── .opencode/              # opencode 配置目录
│   └── commands/           # 自定义命令
└── CLAUDE.md               # Claude Code 项目指南
```

## SEO 配置路径规则

**文件路径与页面 URL 一一对应**:

| 页面 URL | TDK 配置文件 | JSON-LD 配置文件 |
|----------|-------------|-----------------|
| `zh/migration` | `.geo/tdks/zh/migration/index.json` | `.geo/jsonld/zh/migration/index.json` |
| `en/approve` | `.geo/tdks/en/approve/index.json` | `.geo/jsonld/en/approve/index.json` |
| `zh/sig/Kernel` | `.geo/tdks/zh/sig/Kernel/index.json` | `.geo/jsonld/zh/sig/Kernel/index.json` |

## 配置格式

### TDK 配置 (`\u200b.geo/tdks/zh/migration/index.json`)
```json
{
  "title": "openEuler迁移方案 | openEuler迁移中心",
  "description": "openEuler助力企业简单、平稳、高效...",
  "keywords": "openEuler迁移,迁移工具,CentOS迁移"
}
```

### JSON-LD 配置 (`\u200b.geo/jsonld/zh/sig/Kernel/index.json`)
```json
[
  { "@type": "Organization", "name": "openEuler Kernel SIG", ... },
  { "@type": "CollectionPage", "numberOfItems": 21, ... },
  { "@type": "FAQPage", "mainEntity": [...] }
]
```

## 新增页面流程

1. **创建 md 文件**: 在 `app/zh/` 或 `app/en/` 创建页面
2. **创建 SEO 配置**: 在 `.geo/` 目录创建对应配置文件
   - `.geo/tdks/{locale}/{path}/index.json`
   - `.geo/jsonld/{locale}/{path}/index.json`
3. **或使用 frontmatter**: 在 md 文件中内嵌配置
   ```yaml
   ---
   seoTitle: "页面标题"
   seoDescription: "页面描述"
   jsonLd: { ... }
   ---
   ```

## 批量生成 SEO 配置

**使用 Commands**:
```
/generate-tdk-local app/.vitepress/dist
/generate-schema-local app/.vitepress/dist
```

**使用 Skills**:
- `sitemap-meta-tags-batch-generator` - TDK 批量生成
- `sitemap-schema-batch-generator` - JSON-LD 批量生成

## 关键代码位置

- SEO 钩子: `app/.vitepress/config.ts` 第 184-194 行
- TDK 设置: `setTdk` 函数 (config.ts 第 44-88 行)
- JSON-LD 设置: `setJSONLD` 函数 (config.ts 第 24-42 行)

## 配置优先级

1. md 文件 frontmatter 内嵌配置（最高）
2. `.geo/` 目录配置文件
3. 自动生成（以上都不存在时）

## Skills 目录

```
.claude/skills/
├── sitemap-meta-tags-batch-generator/   # TDK 批量生成
├── sitemap-schema-batch-generator/      # JSON-LD 批量生成
├── meta-tags-optimizer/                 # 单页 TDK 优化
├── schema-markup-generator/             # 单页 JSON-LD 生成
└── ... (其他 SEO skills)
```

## 常见问题

**Q: 如何查找某页面的 SEO 配置？**
A: 根据页面路径直接定位文件，如 `zh/migration` → `.geo/tdks/zh/migration/index.json`

**Q: SIG 页面配置在哪？**
A: SIG 页面与其他页面统一管理，如 `zh/sig/Kernel` → `.geo/jsonld/zh/sig/Kernel/index.json`

**Q: 如何批量生成缺失的配置？**
A: 使用 `/generate-tdk-local` 和 `/generate-schema-local` 命令