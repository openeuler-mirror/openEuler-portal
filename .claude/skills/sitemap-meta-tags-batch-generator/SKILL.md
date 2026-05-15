---
name: sitemap-meta-tags-batch-generator
description: 'Batch generate optimized title and meta description tags for all pages in a sitemap. Uses parallel subAgents with meta-tags-optimizer skill. 站点批量TDK生成/title批量优化'
version: "1.0.0"
license: Apache-2.0
compatibility: "Claude Code, skills.sh"
when_to_use: "Use when generating title and description tags for entire website based on sitemap.xml, batch meta tag generation, or processing multiple pages at once."
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
    default: ".geo/tdks"
metadata:
  author: aaron-he-zhu
  version: "1.0.0"
  geo-relevance: "medium"
  tags:
    - seo
    - meta-tags
    - title-tag
    - meta-description
    - batch-processing
    - sitemap
    - ctr-optimization
    - parallel-processing
    - 批量生成
    - TDK优化
  triggers:
    - "generate meta tags for entire site"
    - "batch title optimization"
    - "sitemap meta tags"
    - "title and description for all pages"
    - "批量生成TDK"
    - "为整站生成标题描述"
    - "从本地HTML生成TDK"
---

# Sitemap Meta Tags Batch Generator

Batch generate optimized title and meta description tags. Supports two source modes: **sitemap URL** (fetch from remote) or **local directory** (scan local HTML files).

## Parameters

| 参数 | 类型 | 必需 | 说明 |
|-----|------|-----|------|
| `source_mode` | string | 否 | `sitemap` 或 `local`，默认 `sitemap` |
| `sitemap_url` | string | 条件 | Sitemap URL (sitemap模式必需) |
| `local_directory` | string | 条件 | 本地HTML目录 (local模式必需) |
| `output_directory` | string | 否 | 输出目录，默认 `.geo/tdks` |

## What This Skill Does

根据 `source_mode` 参数选择处理模式:
- **sitemap模式**: 从sitemap.xml获取URL，fetch每个页面
- **local模式**: 直接扫描本地HTML文件，无需网络请求

## Quick Start

**从sitemap URL生成**:
```
Generate meta tags for all pages in sitemap: https://example.com
Batch create title and description from sitemap.xml for: https://example.com
```

**从本地HTML文件生成**:
```
Generate meta tags from local HTML files in: app/.vitepress/dist
Batch create TDK from local directory: dist/
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

**Each subAgent MUST use the `meta-tags-optimizer` skill** to generate meta tags.

The subAgent prompt instructs:
- Load `meta-tags-optimizer` skill first
- Fetch the page content (use browser mode if SPA detected)
- Use the skill's workflow to generate optimized title and description
- **CRITICAL: Meta tags must be based on ACTUAL page content** — no invented information
- Save the meta tags to a local JSON file (only title and description)
- Return only: `{"url": "<page_url>", "file": "<saved_file_path>"}`

### Step 4: Merge Results

After all subAgents complete:
1. Read all generated meta tag files
2. Create a merged TypeScript file with structure:

```ts
export const metaTags: Record<string, { title: string; description: string }> = {
  "/path/to/page1": {
    title: "Optimized Title Tag | Brand",
    description: "Compelling meta description with keyword and CTA..."
  },
  "/path/to/page2": {
    title: "...",
    description: "..."
  },
  ...
};
```

The output is a TypeScript module with a `metaTags` object where:
- Keys are page paths (pathname from URL)
- Values are objects containing `title` and `description` strings

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
→ 返回: ["zh/migration/index.html", "en/download/index.html", ...]
```

#### Step 2: Parse HTML Content

对每个HTML文件:
1. 读取文件内容
2. 提取现有TDK:
   - `<title>` 标签内容
   - `<meta name="description">` 内容
   - `<meta name="keywords">` 内容 (如有)
3. 提取内容参考:
   - `<h1>` 标签内容
   - `<main>` 或 `<article>` 区域的关键文本
   - 页面结构信息

#### Step 3: Generate Path Key

从HTML文件路径转换为TDK查找键:

```
zh/migration/index.html → zh/migration
en/download/index.html → en/download
zh/blog/2024/article.html → zh/blog/2024/article.html
```

转换规则:
- `index.html` → 移除文件名
- 其他 `.html` → 保留文件名

#### Step 4: Batch Generate TDK

使用 `meta-tags-optimizer` skill 为每个页面生成优化的TDK:
- 基于现有内容进行优化
- 如果缺少TDK，根据页面内容生成
- 按语言分组处理

#### Step 5: Output Files

输出到 `.geo/tdks/`:
- `.geo/tdks/temp/` - 临时文件目录
- `.geo/tdks/zh.ts` - 中文页面TDK
- `.geo/tdks/en.ts` - 英文页面TDK

## SubAgent Prompt Template

See `references/subagent-prompt-template.md` for the complete prompt that each subAgent receives.

Key constraints for subAgents:
- **MUST load and use `meta-tags-optimizer` skill**
- **Meta tags MUST be based on visible page content** — strict content fidelity
- Title: 50-60 characters, keyword front-loaded
- Description: 150-160 characters, includes CTA
- Output ONLY the title and description (JSON format)
- Save directly to local file
- No explanatory text in output
- Return minimal status: `{url, file}`
- If page content cannot be extracted, note in return object

## Helper Scripts

### generate-prompts.js

Generates subAgent prompt files from sitemap URLs.

```bash
node scripts/generate-prompts.js <sitemap_url> [output_dir]
```

Output:
- Creates `{output_dir}/prompts/url-{index}.txt` for each URL
- Creates `{output_dir}/url-list.json` with all URLs

### merge-meta-tags.js

Merges all generated meta tag files into final TypeScript output.

```bash
node scripts/merge-meta-tags.js <meta_tags_dir> <output_file.ts>
```

Output: TypeScript file with `metaTags` object exported.

## Output Files

所有输出文件存放在 `output_directory` 参数指定的目录下 (默认 `.geo/tdks/`):

- `{output_directory}/temp/url-{index}.json` - Individual meta tag files (generated by subAgents)
- `{output_directory}/zh.ts` - 中文页面 TDK (最终输出)
- `{output_directory}/en.ts` - 英文页面 TDK (最终输出)
- `{output_directory}/index.ts` - TDK 入口文件 (聚合 zh/en)

## Implementation Guide

When user invokes this skill (from command or direct call):

### 从 Command 调用

Command `/generate-tdk-local <dist_directory>` 会传递以下参数:
```
source_mode: "local"
local_directory: <dist_directory>
output_directory: ".geo/tdks"
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
  output_directory: ".geo/tdks"
```

执行流程:
1. Fetch `sitemap_url`
2. Parse URLs
3. 执行 Mode 1 Workflow
4. 输出到 `output_directory`

## Example

**User**: "Generate meta tags for all pages in sitemap: https://openeuler.org"

**Process**:
1. Fetch `https://openeuler.org/sitemap.xml`
2. Parse: 100+ URLs found
3. Launch 5 parallel subAgents (batch 1), then next batches
4. Each subAgent generates title/description and saves to `.geo/tdks/temp/url-0.json`, etc.
5. Merge into `.geo/tdks/zh.ts` and `.geo/tdks/en.ts`

**Output** (`\u200b.geo/tdks/zh.ts`):
```ts
const tdks: {
  [path: string]: { title: string; description: string; keywords?: string };
} = {
  'zh/migration': {
    title: 'openEuler迁移方案 | openEuler迁移中心',
    description: 'openEuler助力企业简单、平稳、高效进行操作系统迁移...'
  },
  'zh/download': {
    title: 'openEuler下载 | openEuler社区',
    description: '下载openEuler操作系统镜像...'
  },
  ...
};
export default tdks;
```

**Summary**:
```
Processed: 100 pages
Success: 95
Failed: 5 (url-12.json - page not accessible)
Output: .geo/tdks/zh.ts, .geo/tdks/en.ts
```

## Tips for Success

1. **Batch size**: Limit concurrent subAgents to 5 to avoid overwhelming the system
2. **SPA pages**: If page returns empty content, retry with browser mode crawl
3. **Content-based**: Title/description must reflect actual page content
4. **Character limits**: Title 50-60 chars, Description 150-160 chars
5. **CTR optimization**: Use meta-tags-optimizer skill's formulas for better CTR

## Reference Materials

- [subagent-prompt-template.md](./references/subagent-prompt-template.md) - Template for subAgent prompts
- [meta-tags-formulas.md](./references/meta-tags-formulas.md) - Title and description formula reference

## Related Skills

- [meta-tags-optimizer](../../../.agents/skills/meta-tags-optimizer/) - Single page meta tag optimization
- [sitemap-schema-batch-generator](../sitemap-schema-batch-generator/) - Batch schema generation