---
name: generate-schema-local
description: 从本地构建产物目录批量生成JSON-LD Schema
argument-hint: "<dist_directory>"
allowed-tools: ["Glob", "Read", "Task", "Write"]
parameters:
  - name: dist_directory
    type: string
    required: true
    description: 构建产物目录路径，如 app/.vitepress/dist 或 dist
---

# Generate Schema from Local HTML Files

从本地构建产物目录中的HTML文件批量生成JSON-LD Schema结构化数据。

## Usage

```
/generate-schema-local app/.vitepress/dist
/generate-schema-local dist/
/generate-schema-local D:\code\euler\app\.vitepress\dist
```

**Arguments:**
- `dist_directory` (required): 构建产物目录路径

## Workflow

1. **扫描HTML文件** -- 使用Glob查找 `{dist_directory}/**/*.html`，获取所有页面列表
2. **调用Skill** -- Invoke `sitemap-schema-batch-generator` skill with:
   - `source_mode: "local"`
   - `local_directory: <dist_directory>`
   - `output_directory: ".geo/jsonld"`
3. **Skill处理** -- Skill执行本地HTML模式流程:
   - 分析页面类型确定Schema类型
   - 解析HTML提取Schema所需数据
   - 使用 `schema-markup-generator` 生成JSON-LD
   - SIG页面输出到 `sigs/`，其他输出到 `general.ts`
4. **输出结果** -- 输出到 `.geo/jsonld/general.ts` 和 `.geo/jsonld/sigs/*.jsonld.json`

## Page Type Detection

| 页面类型 | 路径特征 | Schema类型 |
|---------|---------|-----------|
| SIG详情页 | `/sig/{sig-name}/` | Organization + CollectionPage + FAQPage |
| 贡献指南 | `/contribution/detail` | HowTo + WebPage |
| FAQ/行为准则 | `/conduct`, `/faq` | FAQPage |
| 列表页面 | `/sig-list/`, `/approve` | ItemList + WebPage |
| 普通页面 | 其他 | WebPage + BreadcrumbList |

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Schema批量生成报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

源目录: <dist_directory>
扫描文件: <count> HTML files
页面类型分布:
  - SIG详情页: <sig_count>
  - 通用页面: <general_count>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
处理结果
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

成功: <success_count> 页面
失败: <fail_count> 页面 (如有)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
输出文件
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

.geo/jsonld/general.ts      -- <general_count> 通用页面Schema
.geo/jsonld/sigs/*.jsonld.json -- <sig_count> SIG页面Schema

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Output File Structure

**通用页面** (`\u200b.geo/jsonld/general.ts`):
```ts
const jsonLdData = {
  "/zh/approve": `[
    {"@context": "https://schema.org", "@type": "WebPage", ...},
    {"@context": "https://schema.org", "@type": "ItemList", ...}
  ]`,
  "/zh/community/conduct": `{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [...]
  }`,
  ...
};
export default jsonLdData;
```

**SIG页面** (`\u200b.geo/jsonld/sigs/Kernel.jsonld.json`):
```json
[
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "openEuler Kernel SIG",
    "numberOfEmployees": {"@type": "QuantitativeValue", "value": 118},
    "member": [...]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [...]
  }
]
```

## Tips

- Schema内容必须严格基于页面可见内容，不能虚构
- SIG页面会自动提取成员列表、仓库数量等信息
- FAQPage会从页面的问答结构提取内容
- HowTo会从步骤列表提取操作步骤

## Related Skills

- [sitemap-schema-batch-generator](../../.claude/skills/sitemap-schema-batch-generator/) -- 批量Schema生成，支持本地/远程模式
- [schema-markup-generator](../../.claude/skills/schema-markup-generator/) -- 单页Schema生成