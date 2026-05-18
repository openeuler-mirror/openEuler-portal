# openEuler VitePress 项目 SEO 实现流程总结

## 一、Sitemap 生成

### 1. 配置位置
`app/.vitepress/config.ts` 第 105-149 行

### 2. 流程概述

#### 2.1 基础配置
```typescript
sitemap: {
  hostname: sitemapHostname,  // 从环境变量读取或默认值
  transformItems: sitemapItemTransformer(...)
}
```

#### 2.2 hostname 获取
- 通过 `readEnvVar('VITE_MAIN_DOMAIN_URL')` 从 `.env.production` 读取
- 默认值: `https://www.openeuler.org`

#### 2.3 sitemapItemTransformer 处理流程
来源: `@opendesign-plus/geo-scripts/vitepress-sitemap-transformer`

**功能一: 添加 lastmod 时间戳**
- 从 `.geo/last-modified.json` 读取文件最后修改时间
- URL 转换逻辑:
  - `.html` 结尾 → 替换为 `.md`
  - `/` 结尾 → 添加 `index.md`
  - 其他 → 添加 `/index.md`

**功能二: 设置页面优先级 (priority)**
规则匹配 (正则):
| 页面类型 | 正则规则 | priority |
|---------|---------|----------|
| 首页 | `^(zh/|en/)?$` | 1.0 |
| 核心功能页(下载/镜像) | `^(zh|en)/(download|mirror)/?$` | 0.8 |
| SIG列表页 | `zh/sig/sig-list/` | 0.8 |
| 迁移子页面 | `^(zh|en)/migration/(download|background|...)` | 0.8 |
| 列表页(博客/新闻/活动) | `^(zh|en)/interaction/(blog-list|...)` | 0.8 |
| 重要栏目首页 | `^(zh|en)/(community|sig|security|...)` | 0.8 |
| 单篇文章(news/showcase) | `^(zh|en)/(news|showcase)/.+` | 0.6 |
| 博客文章 | `^(zh|en)/(blog)/.+` | 0.5 |

#### 2.4 last-modified.json 生成
插件: `@opendesign-plus/plugins/vite/generate-lastmod-changefreq`
配置:
- rootDir: `app/`
- pageEntryPattern: `['zh/**/*.md', 'en/**/*.md']`
- outputFile: `.geo/last-modified.json`

---

## 二、TDK 设置 (Title, Description, Keywords)

### 1. 数据来源
`.geo/tdks/` 目录结构:
```
.geo/tdks/
├── index.ts    # 入口文件，聚合 zh/en + titleSuffix
├── zh.ts       # 中文页面 TDK
├── en.ts       # 英文页面 TDK
```

### 2. TDK 数据结构
```typescript
{
  [path: string]: {
    title: string;
    description: string;
    keywords?: string;
  }
}
```

### 3. 设置流程 (`setTdk` 函数，config.ts 第 44-88 行)

#### 3.1 lookupKey 计算
```typescript
// index.md → 去掉后9字符 (index.md)
// 其他.md → 去掉后2字符加 html
if (filePath.endsWith('index.md')) {
  lookupKey = filePath.slice(0, -9);
} else {
  lookupKey = filePath.slice(0, -2).concat('html');
}
```

#### 3.2 titleTemplate 设置
- 首页 (`zh`/`en`): 使用固定模板
- 其他页面: `:title | ${tdks.titleSuffix[locale]}`

#### 3.3 TDK 应用逻辑
```
1. 获取 locale (从 filePath 截取前2字符)
2. 从 tdks[locale][pagePath] 获取配置
3. 若无配置且是 blog/news/showcase 页面:
   - 使用 frontmatter.summary 作为 description
4. 若有配置:
   - 设置 pageData.description
   - 设置 pageData.title
   - 添加/替换 keywords meta 标签
```

#### 3.4 keywords meta 标签处理
- 查找现有 keywords 标签索引
- 存在 → 替换
- 不存在 → 新增到 `frontmatter.head`

### 4. TDK 批量生成工具 (sitemap-meta-tags-batch-generator skill)

TDK 数据的批量生成使用了 `sitemap-meta-tags-batch-generator` skill。

#### 4.1 工作流程

支持两种数据来源模式:

**模式一: Sitemap URL**
```
1. 获取 sitemap.xml
   └── WebFetch 从网站根目录获取 sitemap.xml
   └── 解析提取所有 <loc> URL

2. 并行派发 subAgents
   └── 每个 URL 启动一个 general subAgent
   └── 每个 subAgent 必须使用 meta-tags-optimizer skill
   └── 基于实际页面内容生成 title/description
   └── 保存到单个 JSON 文件

3. 合并结果
   └── 读取所有生成的 meta tag 文件
   └── 合并为 TypeScript 模块输出
```

**模式二: 本地HTML文件**
```
1. 扫描 HTML 文件
   └── glob 查找 <dist_directory>/**/*.html
   
2. 解析 HTML 内容
   └── 提取 <title>、<meta description>、<meta keywords>
   └── 提取 <h1>、<main> 等内容作为参考
   
3. 生成路径键
   └── zh/migration/index.html → zh/migration
   
4. 批量生成 TDK
   └── 使用 meta-tags-optimizer skill 优化
   └── 按语言 (zh/en) 分组
   
5. 输出到 .geo/tdks/
```

#### 4.2 输出结构
```typescript
// 最终输出文件格式
export const metaTags: Record<string, { title: string; description: string }> = {
  "/zh/migration": {
    title: "openEuler迁移方案 | openEuler迁移中心",
    description: "openEuler助力企业简单、平稳、高效进行操作系统迁移..."
  },
  // ...
};
```

#### 4.3 生成规则
- **Title**: 50-60字符，关键词前置
- **Description**: 150-160字符，包含CTA
- **内容忠实性**: 必须基于页面可见内容，不能虚构信息

#### 4.4 Skill 位置
`.claude\skills\sitemap-meta-tags-batch-generator\`

---

## 三、JSON-LD Schema 设置

### 1. 数据来源
`.geo/jsonld/` 目录结构:
```
.geo/jsonld/
├── general.ts           # 通用页面的 JSON-LD 配置
└── sigs/                # SIG 详情页专用 JSON-LD
    ├── Kernel.jsonld.json
    ├── sig-Arm.jsonld.json
    └── ... (约100个SIG)
```

### 2. 设置流程 (`setJSONLD` 函数，config.ts 第 24-42 行)

#### 2.1 SIG 详情页处理
- 检测条件: `frontmatter.sigPageType === 'detail'` && `params?.sig`
- 读取文件: `.geo/jsonld/sigs/${params.sig}.jsonld.json`
- 添加到 head:
```typescript
['script', { type: 'application/ld+json' }, content]
```

#### 2.2 通用页面处理
- 从 `generalJsonLd[pagePath]` 获取配置
- 存在则添加到 head

### 3. JSON-LD Schema 类型示例

#### 3.1 SIG 页面 (Kernel.jsonld.json)
包含多个 schema 类型:
- `Organization`: SIG 组织信息、成员、仓库数量
- `CollectionPage`: 代码仓库列表信息
- `FAQPage`: 常见问题问答

#### 3.2 通用页面 (general.ts)
包含多种 schema 类型:
- `WebPage`: 页面基本信息、面包屑导航
- `BreadcrumbList`: 导航层级
- `HowTo`: 操作步骤指南
- `FAQPage`: 问答页面
- `ItemList`: 列表页面
- `Organization`: 组织结构
- `Dataset`: 数据集页面

### 4. JSON-LD 批量生成工具 (sitemap-schema-batch-generator skill)

JSON-LD Schema 数据的批量生成使用了 `sitemap-schema-batch-generator` skill。

#### 4.1 工作流程

支持两种数据来源模式:

**模式一: Sitemap URL**
```
1. 获取 sitemap.xml
   └── WebFetch 从网站根目录获取 sitemap.xml
   └── 解析提取所有 <loc> URL

2. 并行派发 subAgents
   └── 每个 URL 启动一个 general subAgent
   └── 每个 subAgent 必须使用 schema-markup-generator skill
   └── 分析页面内容，选择合适的 schema 类型
   └── 生成 JSON-LD 并保存到单个 JSON 文件

3. 合并结果
   └── 读取所有生成的 schema 文件
   └── 合并为 TypeScript 模块输出
```

**模式二: 本地HTML文件**
```
1. 扫描 HTML 文件
   └── glob 查找 <dist_directory>/**/*.html
   
2. 分析页面类型
   └── /sig/{name}/ → Organization + FAQPage
   └── /contribution/detail → HowTo
   └── /conduct → FAQPage
   └── /sig-list → ItemList
   
3. 提取内容
   └── 标题、描述、面包屑、FAQ问答、步骤列表等
   
4. 批量生成 Schema
   └── SIG页面 → .geo/jsonld/sigs/{sig-name}.jsonld.json
   └── 其他页面 → .geo/jsonld/general.ts
   
5. 输出到 .geo/jsonld/
```

#### 4.2 输出结构
```typescript
// 最终输出文件格式 (general.ts)
const jsonLdData = {
  "/zh/approve": `[{"@context": "https://schema.org", "@type": "WebPage", ...}]`,
  "/zh/community/conduct": `{...}`,
  // ...
};
```

#### 4.3 SIG 页面专项生成
```
.geo/jsonld/sigs/
├── Kernel.jsonld.json     # SIG 详情页专用 schema
├── sig-Arm.jsonld.json
└── ... (约100个SIG文件)
```

每个 SIG 页面包含:
- `Organization`: SIG 组织信息、成员列表、仓库数量
- `CollectionPage`: 代码仓库列表信息
- `FAQPage`: 常见问题问答

#### 4.4 生成规则
- **内容忠实性**: Schema 必须仅包含页面可见数据，不能虚构
- **类型选择**: 根据页面内容自动选择合适的 schema 类型
- **验证**: 使用 schema-markup-generator skill 进行验证

#### 4.5 Skill 位置
`.claude\skills\sitemap-schema-batch-generator\`

---

## 五、触发时机

所有 SEO 设置在 `transformPageData` 钩子中统一执行 (config.ts 第 184-194 行):

```typescript
async transformPageData(pageData) {
  // 计算 lookupKey
  // 调用 setJSONLD(pageData, lookupKey)
  // 调用 setTdk(pageData, lookupKey)
}
```

---

## 六、文件目录结构总览

```
/
├── app/
│   └── .vitepress/
│       └── config.ts          # 主配置，sitemap/transformPageData
├── .geo/
│   ├── tdks/
│   │   ├── index.ts           # TDK 入口
│   │   ├── zh.ts              # 中文 TDK
│   │   └── en.ts              # 英文 TDK
│   ├── jsonld/
│   │   ├── general.ts         # 通用 JSON-LD
│   │   └── sigs/              # SIG JSON-LD (约100个)
│   └── last-modified.json     # 构建时生成
└── .env.production            # 环境变量 (域名配置)
```

---

## 七、关键依赖与工具

### 1. NPM 依赖包

| 功能 | 依赖包 |
|-----|--------|
| sitemap 转换 | `@opendesign-plus/geo-scripts/vitepress-sitemap-transformer` |
| lastmod 生成 | `@opendesign-plus/plugins/vite/generate-lastmod-changefreq` |
| llms-full 生成 | `@opendesign-plus/geo-scripts/generate-llms-full` |

### 2. Skills 工具

| 功能 | Skill 名称 | 位置 |
|-----|-----------|------|
| TDK 批量生成 | `sitemap-meta-tags-batch-generator` | `.claude/skills/sitemap-meta-tags-batch-generator/` |
| JSON-LD 批量生成 | `sitemap-schema-batch-generator` | `.claude/skills/sitemap-schema-batch-generator/` |
| 单页 meta 优化 | `meta-tags-optimizer` | (被批量 skill 调用) |
| 单页 schema 生成 | `schema-markup-generator` | (被批量 skill 调用) |

### 3. Skills 使用方式

**从 Sitemap URL 生成**:
```bash
# TDK 批量生成
Generate meta tags for all pages in sitemap: https://www.openeuler.org

# JSON-LD 批量生成
Generate schema for all pages in sitemap: https://www.openeuler.org
```

**从本地HTML文件生成**:
```bash
# TDK 批量生成
/generate-tdk-local app/.vitepress/dist

# JSON-LD 批量生成  
/generate-schema-local app/.vitepress/dist
```

### 4. Commands 位置

| Command | 文件位置 | 用途 |
|---------|---------|------|
| `/generate-tdk-local` | `.opencode/commands/generate-tdk-local.md` | 从本地HTML生成TDK |
| `/generate-schema-local` | `.opencode/commands/generate-schema-local.md` | 从本地HTML生成Schema |

### 5. Command → Skill 参数传递

**TDK批量生成参数传递**:
```
Command: /generate-tdk-local <dist_directory>
  ↓
传递参数给 sitemap-meta-tags-batch-generator skill:
  - source_mode: "local"
  - local_directory: <dist_directory>
  - output_directory: ".geo/tdks"
  ↓
Skill执行 Mode 2 Workflow
  ↓
输出: .geo/tdks/zh.ts, .geo/tdks/en.ts
```

**Schema批量生成参数传递**:
```
Command: /generate-schema-local <dist_directory>
  ↓
传递参数给 sitemap-schema-batch-generator skill:
  - source_mode: "local"
  - local_directory: <dist_directory>
  - output_directory: ".geo/jsonld"
  ↓
Skill执行 Mode 2 Workflow
  ↓
输出: .geo/jsonld/general.ts, .geo/jsonld/sigs/*.jsonld.json
```

### 6. Skill 参数定义

**sitemap-meta-tags-batch-generator**:
| 参数 | 类型 | 必需 | 说明 |
|-----|------|-----|------|
| `source_mode` | string | 否 | `sitemap` 或 `local`，默认 `sitemap` |
| `sitemap_url` | string | 条件 | Sitemap URL (sitemap模式必需) |
| `local_directory` | string | 条件 | 本地HTML目录 (local模式必需) |
| `output_directory` | string | 否 | 输出目录，默认 `.geo/tdks` |

**sitemap-schema-batch-generator**:
| 参数 | 类型 | 必需 | 说明 |
|-----|------|-----|------|
| `source_mode` | string | 否 | `sitemap` 或 `local`，默认 `sitemap` |
| `sitemap_url` | string | 条件 | Sitemap URL (sitemap模式必需) |
| `local_directory` | string | 条件 | 本地HTML目录 (local模式必需) |
| `output_directory` | string | 否 | 输出目录，默认 `.geo/jsonld` |