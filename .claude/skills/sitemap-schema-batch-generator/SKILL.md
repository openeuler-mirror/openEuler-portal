---
name: sitemap-schema-batch-generator
description: 'Batch generate JSON-LD schema markup for all pages in a sitemap. Uses parallel subAgents to process pages efficiently. 站点批量Schema生成/sitemap批量处理'
version: "1.0.0"
license: Apache-2.0
compatibility: "Claude Code, skills.sh"
when_to_use: "Use when generating JSON-LD for entire website based on sitemap.xml, batch schema generation, or processing multiple pages at once."
argument-hint: "<website URL> or <local_directory>"
allowed-tools: WebFetch, Task, Bash, Write, Read, Glob
parameters:
  - name: source_mode
    type: string
    required: false
    description: "数据来源模式: 'sitemap' (从sitemap.xml) 或 'local' (从本地HTML文件)"
    default: "sitemap"
  - name: sitemap_url
    type: string
    required: false
    description: "Sitemap URL，如 https://example.com/sitemap.xml (sitemap模式必需)"
  - name: local_directory
    type: string
    required: false
    description: "本地HTML文件目录路径 (local模式必需)"
  - name: output_directory
    type: string
    required: false
    description: "输出目录路径"
    default: ".geo/jsonld"
metadata:
  author: aaron-he-zhu
  version: "1.0.0"
  geo-relevance: "high"
  tags:
    - seo
    - structured-data
    - json-ld
    - batch-processing
    - sitemap
    - schema-org
    - parallel-processing
    - 批量生成
  triggers:
    - "generate schema for entire site"
    - "batch schema generation"
    - "sitemap schema"
    - "JSON-LD for all pages"
    - "批量生成结构化数据"
    - "为整站生成Schema"
    - "从本地HTML生成Schema"
---

# Sitemap Schema Batch Generator

Batch generate JSON-LD schema markup. Supports two source modes: **sitemap URL** (fetch from remote) or **local directory** (scan local HTML files).

## Parameters

| 参数 | 类型 | 必需 | 说明 |
|-----|------|-----|------|
| `source_mode` | string | 否 | `sitemap` 或 `local`，默认 `sitemap` |
| `sitemap_url` | string | 条件 | Sitemap URL (sitemap模式必需) |
| `local_directory` | string | 条件 | 本地HTML目录 (local模式必需) |
| `output_directory` | string | 否 | 输出目录，默认 `.geo/jsonld` |

## What This Skill Does

根据 `source_mode` 参数选择处理模式:
- **sitemap模式**: 从sitemap.xml获取URL，fetch每个页面
- **local模式**: 直接扫描本地HTML文件，无需网络请求

## Quick Start

**从sitemap URL生成**:
```
Generate schema for all pages in sitemap: https://example.com
Batch create JSON-LD from sitemap.xml for: https://example.com
```

**从本地HTML文件生成**:
```
Generate schema from local HTML files in: app/.vitepress/dist
Batch create JSON-LD from local directory: dist/
```

## Workflow

### Determine Source Mode

根据输入参数自动确定处理模式:

```
IF source_mode === "local" OR local_directory provided:
  → 使用 Mode 2: Local HTML Files Workflow
  
ELSE IF sitemap_url provided OR argument looks like URL:
  → 使用 Mode 1: Sitemap URL Workflow
  
ELSE:
  → 报错: 需要提供 sitemap_url 或 local_directory
```

---

### Mode 1: Sitemap URL Workflow

参数: `sitemap_url`, `output_directory`

#### Step 1: Fetch Sitemap

Use WebFetch to retrieve `sitemap.xml` from the website root:

```
URL format: {website_url}/sitemap.xml
```

Parse the XML to extract all `<loc>` URLs.

#### Step 2: Generate SubAgent Prompts

Use the helper script to generate prompts for each URL:

```bash
node scripts/generate-prompts.js <sitemap_url> <output_dir>
```

This creates individual prompt files for each page URL.

### Step 3: Dispatch Parallel SubAgents

For each URL, launch a `general` subAgent with the prompt template from `references/subagent-prompt-template.md`.

**Each subAgent MUST use the `schema-markup-generator` skill** to generate JSON-LD.

The subAgent prompt instructs:
- Load `schema-markup-generator` skill first
- Fetch the page content (use browser mode if SPA detected)
- Use the skill's workflow to analyze and generate appropriate JSON-LD
- **CRITICAL: Schema must contain ONLY data that exists on the page** — no invented information
- Save the JSON-LD to a local file (only the JSON-LD content, no extra text)
- Return only: `{"url": "<page_url>", "file": "<saved_file_path>"}`

### Step 4: Merge Results

After all subAgents complete:
1. Read all generated JSON-LD files
2. Create a merged TypeScript file with structure:

```ts
export const schemas: Record<string, string> = {
  "/path/to/page1": `{...json-ld content as string...}`,
  "/path/to/page2": `{...json-ld content as string...}`,
  ...
};
```

The output is a TypeScript module with a `schemas` object where:
- Keys are page paths (pathname from URL)
- Values are JSON-LD content as strings

---

### Mode 2: Local HTML Files Workflow

参数: `local_directory`, `output_directory`

当 `source_mode === "local"` 或提供了 `local_directory` 参数时，使用此模式。

#### Step 1: Scan HTML Files

使用Glob查找 `local_directory` 目录中的所有HTML文件:

```
Glob pattern: "**/*.html"
Path: <local_directory> (参数值)
```

示例:
```
local_directory: "app/.vitepress/dist"
→ glob "**/*.html" in "app/.vitepress/dist"
→ 返回: ["zh/sig/Kernel/index.html", "zh/approve/index.html", ...]
```

#### Step 2: Analyze Page Type

根据页面路径和内容判断适合的Schema类型:

| 页面类型 | 路径特征 | Schema类型 |
|---------|---------|-----------|
| SIG详情页 | `/sig/{sig-name}/` | Organization + CollectionPage + FAQPage |
| 贡献指南 | `/contribution/detail` | HowTo + WebPage |
| FAQ/行为准则 | `/conduct`, `/faq` | FAQPage |
| 列表页面 | `/sig-list/`, `/approve` | ItemList + WebPage |
| 普通页面 | 其他 | WebPage + BreadcrumbList |

#### Step 3: Extract Content for Schema

从HTML提取Schema所需数据:
- 页面标题 (`<title>`)
- 页面描述 (`<meta name="description">`)
- 面包屑导航结构
- FAQ问答内容 (如有)
- 步骤列表 (如有HowTo)
- 列表项数据 (如有ItemList)
- 组织/成员信息 (如有SIG页)

#### Step 4: Generate Path Key

从HTML文件路径转换为Schema查找键:

```
zh/sig/Kernel/index.html → zh/sig/Kernel
en/community/conduct/index.html → en/community/conduct
zh/approve/index.html → zh/approve
```

#### Step 5: Batch Generate Schema

使用 `schema-markup-generator` skill 为每个页面生成JSON-LD:
- 根据页面类型选择合适的Schema
- 严格基于页面可见内容，不虚构数据
- SIG详情页单独处理，输出到 `sigs/` 目录

#### Step 6: Output Files

输出到 `.geo/jsonld/`:
- `.geo/jsonld/temp/` - 临时文件目录
- `.geo/jsonld/general.ts` - 通用页面JSON-LD
- `.geo/jsonld/sigs/{sig-name}.jsonld.json` - SIG详情页JSON-LD

## SubAgent Prompt Template

See `references/subagent-prompt-template.md` for the complete prompt that each subAgent receives.

Key constraints for subAgents:
- **MUST load and use `schema-markup-generator` skill**
- **Schema MUST contain ONLY data visible on the page** — strict content fidelity
- Output ONLY the JSON-LD content
- Save directly to local file
- No explanatory text in output
- Return minimal status: `{url, file}`
- If page content cannot be extracted (SPA), note in return object

## Helper Scripts

### generate-prompts.js

Generates subAgent prompt files from sitemap URLs.

```bash
node scripts/generate-prompts.js <sitemap_url> [output_dir]
```

Output:
- Creates `{output_dir}/prompts/url-{index}.txt` for each URL
- Creates `{output_dir}/url-list.json` with all URLs

### merge-schemas.js

Merges all generated schema files into final TypeScript output.

```bash
node scripts/merge-schemas.js <schemas_dir> <output_file.ts>
```

Output: TypeScript file with `schemas` object exported.

## Output Files

所有输出文件存放在 `output_directory` 参数指定的目录下 (默认 `.geo/jsonld/`):

- `{output_directory}/temp/url-{index}.json` - Individual schema files (generated by subAgents)
- `{output_directory}/general.ts` - 通用页面 JSON-LD (最终输出)
- `{output_directory}/sigs/{sig-name}.jsonld.json` - SIG 详情页专用 JSON-LD

## Implementation Guide

When user invokes this skill (from command or direct call):

### 从 Command 调用

Command `/generate-schema-local <dist_directory>` 会传递以下参数:
```
source_mode: "local"
local_directory: <dist_directory>
output_directory: ".geo/jsonld"
```

Skill执行流程:
1. 检测 `source_mode === "local"`
2. 使用 `local_directory` 参数执行 Mode 2 Workflow
3. 输出到 `output_directory`

### 直接调用 (Sitemap模式)

```
Invoke skill with:
  source_mode: "sitemap"
  sitemap_url: "https://example.com/sitemap.xml"
  output_directory: ".geo/jsonld"
```

执行流程:
1. Fetch `sitemap_url`
2. Parse URLs
3. 执行 Mode 1 Workflow
4. 输出到 `output_directory`

## Example

**User**: "Generate schema for all pages in sitemap: https://openeuler.org"

**Process**:
1. Fetch `https://openeuler.org/sitemap.xml`
2. Parse: 100+ URLs found
3. Launch 5 parallel subAgents (batch 1), then next batches
4. Each subAgent generates JSON-LD and saves to `.geo/jsonld/temp/url-0.json`, etc.
5. Merge into `.geo/jsonld/general.ts` and `.geo/jsonld/sigs/*.jsonld.json`

**Output** (`\u200b.geo/jsonld/general.ts`):
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

**Output** (`\u200b.geo/jsonld/sigs/Kernel.jsonld.json`):
```json
[
  {"@context": "https://schema.org", "@type": "Organization", "name": "openEuler Kernel SIG", ...},
  {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [...]}
]
```

**Summary**:
```
Processed: 100 pages
Success: 95
Failed: 5 (url-12.json - page not accessible)
Output: .geo/jsonld/general.ts, .geo/jsonld/sigs/*.jsonld.json (约100个)
```

## Tips for Success

1. **Batch size**: Limit concurrent subAgents to 5 to avoid overwhelming the system
2. **SPA pages**: If page returns empty content, subAgent should use browser mode crawl (via local crawl.js script)
3. **Strict content fidelity**: JSON-LD must contain ONLY data that exists on the page — no invented names, dates, or properties
4. **Use schema-markup-generator skill**: SubAgents must invoke this skill for proper schema type selection and validation

## Reference Materials

- [subagent-prompt-template.md](./references/subagent-prompt-template.md) - Template for subAgent prompts
- [schema-type-guide.md](./references/schema-type-guide.md) - Quick reference for schema type selection

## Related Skills

- [schema-markup-generator](../../../.agents/skills/schema-markup-generator/) - Single page schema generation
- [technical-seo-checker](../../../.agents/skills/technical-seo-checker/) - Validate schema implementation