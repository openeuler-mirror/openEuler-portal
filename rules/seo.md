# SEO 规范

## Canonical URL 数据驱动路径

Canonical URL **必须走数据驱动路径**，禁止在 `config.ts transformPageData` 中硬编码页级条件分支。

### 正确做法

在 `.geo/tdks/{locale}/{path}/index.json` 中新增可选 `canonical` 字段（值为相对路径，如 `/zh/community/aigc/`）。`setTdk` 读取该字段后，自动向 `frontmatter.head` 注入 `<link rel="canonical" href="{currentHostname}{canonical}">`。

后续任何页面需要 canonical，只需在对应的 TDK JSON 中加 `canonical` 字段，无需改 `config.ts`。

```json
// ✅ .geo/tdks/zh/community/aigc/index.json
{
  "title": "openEuler社区AI辅助贡献指南",
  "description": "面向openEuler社区贡献者的AI辅助贡献实践指引……",
  "canonical": "/zh/community/aigc/"
}
```

```typescript
// ❌ 禁止在 config.ts transformPageData 中硬编码页级 canonical
if (lookupKey === 'zh/community/aigc') {
  pageData.frontmatter.head.push([
    'link', { rel: 'canonical', href: `${currentHostname}/zh/community/aigc/` }
  ]);
}
```

**为什么 / 踩过的坑**：本站 SEO 元数据（TDK / JSONLD）全部走 `.geo/` JSON → `setTdk` / `setJSONLD` 注入的数据驱动模式。为单个页面在 `config.ts` 中加 `if` 条件分支注入 canonical，违背了这一架构约定，且每新增一个需要 canonical 的页面就要改一次 config.ts，维护成本随页面数线性增长。正确做法是让 `setTdk` 通用读取 TDK JSON 的 `canonical` 字段，保持 config.ts 不含页级 SEO 特例。

---

## 生产域名适配机制（`currentHostname`）

TDK / canonical / JSONLD 中凡涉及完整 URL 的字段，域名部分**必须使用 `currentHostname` 动态拼接**，禁止硬编码特定生产域名。

### 机制说明

- `config.ts` 中 `currentHostname = readEnvVar('VITE_MAIN_DOMAIN_URL') || 'https://www.openeuler.org'`
- 生产部署通过 `.env.production` 设置 `VITE_MAIN_DOMAIN_URL`（如 `https://www.openeuler.openatom.cn`）
- JSONLD `url` 使用 `https://www.openeuler.org` **占位符**（`setJSONLD` 已有 `replaceAll('openeuler.org', currentHostname)` 自动替换为生产域名）
- canonical URL 由 `setTdk` 拼接 `{currentHostname}{canonical}`，域名自动与生产部署对齐

```json
// ✅ JSONLD url 使用 openeuler.org 占位符（构建时自动替换）
{
  "url": "https://www.openeuler.org/zh/community/aigc/"
}

// ❌ 禁止硬编码特定生产域名
{
  "url": "https://www.openeuler.openatom.cn/zh/community/aigc/"
}
```

### 评审注意事项

JSONLD / TDK JSON 中出现的 `openeuler.org` 域名可能是**占位符**（构建时会被 `setJSONLD` 的 `replaceAll` 自动替换为 `currentHostname`），并非硬编码。评审时若见 URL 中包含 `openeuler.org`，应先确认该值是否为占位符再判断，避免误判为域名不一致。

**为什么 / 踩过的坑**：评审曾将 JSONLD url 中的 `openeuler.org` 占位符误判为与生产域名 `openeuler.openatom.cn` 不一致，给出 NEEDS_ADJUSTMENT。实际设计已在边界情况说明 `currentHostname` 域名适配机制，但因规则文档未显式描述该机制，导致评审产生理解偏差。在规则级文档中明确说明占位符机制，可防止同类误判。
