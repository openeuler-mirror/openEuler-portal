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
`.geo/tdks/` 目录结构（按页面路径组织）:
```
.geo/tdks/
├── zh/                           # 中文页面 TDK
│   ├── index.json                # zh 首页
│   ├── approve/
│   │   └── index.json            # zh/approve 页面
│   ├── migration/
│   │   └── index.json            # zh/migration 页面
│   │   ├── download/
│   │   │   └── index.json        # zh/migration/download 页面
│   ├── sig/
│   │   ├── Kernel/
│   │   │   └── index.json        # zh/sig/Kernel 页面
│   └── ... (按实际路径组织)
└── en/                           # 英文页面 TDK
    ├── index.json                # en 首页
    ├── approve/
    │   └── index.json            # en/approve 页面
    └── ... (按实际路径组织)
```

**路径对应规则**: 文件目录路径与真实页面路径一致
- 页面路径 `zh/migration` → 文件 `.geo/tdks/zh/migration/index.json`
- 页面路径 `en/approve` → 文件 `.geo/tdks/en/approve/index.json`

### 2. TDK 数据结构
```json
// .geo/tdks/zh/migration/index.json
{
  "title": "openEuler迁移方案 | openEuler迁移中心",
  "description": "openEuler助力企业简单、平稳、高效进行操作系统迁移...",
  "keywords": "openEuler迁移,迁移工具,CentOS迁移"
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

#### 3.2 文件路径映射
根据 lookupKey 直接映射到文件路径:
```
lookupKey: "zh/migration"
→ TDK文件: .geo/tdks/zh/migration/index.json

lookupKey: "en/approve"
→ TDK文件: .geo/tdks/en/approve/index.json
```

#### 3.3 titleTemplate 设置
- 首页 (`zh`/`en`): 使用固定模板
- 其他页面: `:title | ${tdks.titleSuffix[locale]}`

#### 3.4 TDK 应用逻辑
```
1. 获取 locale (从 filePath 截取前2字符)
2. 根据 lookupKey 定位文件: .geo/tdks/{locale}/{path}/index.json
3. 读取文件内容，获取 { title, description, keywords }
4. 若文件不存在且是 blog/news/showcase 页面:
   - 使用 frontmatter.summary 作为 description
5. 若有配置:
   - 设置 pageData.description
   - 设置 pageData.title
   - 添加/替换 keywords meta 标签
```

#### 3.5 keywords meta 标签处理
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
    
5. 输出到 .geo/tdks/{locale}/{path}/index.json
```

#### 4.2 输出结构
```json
// .geo/tdks/zh/migration/index.json
{
  "title": "openEuler迁移方案 | openEuler迁移中心",
  "description": "openEuler助力企业简单、平稳、高效进行操作系统迁移...",
  "keywords": "openEuler迁移,迁移工具,CentOS迁移"
}
```

**目录结构**: 文件路径与页面路径对应
```
.geo/tdks/zh/migration/download/index.json  → zh/migration/download
.geo/tdks/en/approve/index.json              → en/approve
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
`.geo/jsonld/` 目录结构（按页面路径组织）:
```
.geo/jsonld/
├── zh/                           # 中文页面 JSON-LD
│   ├── index.json                # zh 首页
│   ├── approve/
│   │   ├── index.json            # zh/approve 页面
│   │   └── approve-info/
│   │   │   └── index.json        # zh/approve/approve-info 页面
│   ├── community/
│   │   ├── conduct/
│   │   │   └── index.json        # zh/community/conduct 页面
│   ├── sig/                      # SIG 详情页（已分散到各自路径）
│   │   ├── Kernel/
│   │   │   └── index.json        # zh/sig/Kernel 页面
│   │   ├── ai/
│   │   │   └── index.json        # zh/sig/ai 页面
│   │   └── ... (约100个SIG)
│   └── ... (按实际路径组织)
└── en/                           # 英文页面 JSON-LD
    ├── index.json                # en 首页
    ├── approve/
    │   └── index.json            # en/approve 页面
    ├── community/
    │   ├── conduct/
    │   │   └── index.json        # en/community/conduct 页面
    └── ... (按实际路径组织)
```

**路径对应规则**: 文件目录路径与真实页面路径一致
- 页面路径 `zh/sig/Kernel` → 文件 `.geo/jsonld/zh/sig/Kernel/index.json`
- 页面路径 `en/approve` → 文件 `.geo/jsonld/en/approve/index.json`

**SIG数据已分散**: 之前集中的 `.geo/jsonld/sigs/` 目录现在改为按路径组织

### 2. 设置流程 (`setJSONLD` 函数，config.ts 第 24-42 行)

#### 2.1 文件路径映射
根据 lookupKey 直接映射到文件路径:
```
lookupKey: "zh/sig/Kernel"
→ JSON-LD文件: .geo/jsonld/zh/sig/Kernel/index.json

lookupKey: "en/community/conduct"
→ JSON-LD文件: .geo/jsonld/en/community/conduct/index.json
```

#### 2.2 统一处理逻辑
```
1. 根据 lookupKey 定位文件: .geo/jsonld/{locale}/{path}/index.json
2. 读取文件内容（JSON数组）
3. 添加到 head:
   ['script', { type: 'application/ld+json' }, JSON.stringify(content)]
```

**注意**: SIG 页面不再特殊处理，所有页面统一按路径映射

### 3. JSON-LD Schema 类型示例

#### 3.1 SIG 页面 (zh/sig/Kernel/index.json)
包含多个 schema 类型:
```json
[
  { "@type": "Organization", "name": "openEuler Kernel SIG", ... },
  { "@type": "CollectionPage", "numberOfItems": 21, ... },
  { "@type": "FAQPage", "mainEntity": [...] }
]
```

#### 3.2 通用页面 (en/approve/index.json)
包含多种 schema 类型:
```json
[
  { "@type": "WebPage", "name": "...", "breadcrumb": {...} },
  { "@type": "Dataset", "name": "...", "variableMeasured": [...] }
]
```

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
   └── 所有页面统一输出到 .geo/jsonld/{locale}/{path}/index.json
    
5. 输出到 .geo/jsonld/{locale}/{path}/index.json
```

#### 4.2 输出结构
```json
// .geo/jsonld/zh/approve/index.json
[
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "openEuler OSV技术测评列表",
    "breadcrumb": { "@type": "BreadcrumbList", ... }
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "OSV技术测评列表"
  }
]
```

#### 4.3 SIG 页面输出
```
.geo/jsonld/zh/sig/Kernel/index.json    → zh/sig/Kernel 页面
.geo/jsonld/zh/sig/ai/index.json        → zh/sig/ai 页面
.geo/jsonld/en/sig/Compatibility/index.json → en/sig/Compatibility 页面
```

每个 SIG 页面包含:
```json
[
  { "@type": "Organization", "name": "openEuler Kernel SIG", ... },
  { "@type": "CollectionPage", "numberOfItems": 21, ... },
  { "@type": "FAQPage", "mainEntity": [...] }
]
```

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
│   ├── tdks/                  # TDK 配置（按页面路径组织）
│   │   ├── zh/
│   │   │   ├── index.json     # zh 首页
│   │   │   ├── migration/
│   │   │   │   └── index.json # zh/migration
│   │   │   └── sig/
│   │   │       └── Kernel/
│   │   │           └── index.json # zh/sig/Kernel
│   │   │   └── ... (按实际路径组织)
│   │   └── en/
│   │   │   ├── index.json     # en 首页
│   │   │   └── ... (按实际路径组织)
│   ├── jsonld/                 # JSON-LD 配置（按页面路径组织）
│   │   ├── zh/
│   │   │   ├── index.json     # zh 首页
│   │   │   ├── approve/
│   │   │   │   └── index.json # zh/approve
│   │   │   └── sig/           # SIG 页面（已分散到各自路径）
│   │   │       └── Kernel/
│   │   │           └── index.json # zh/sig/Kernel
│   │   │       └── ai/
│   │   │           └── index.json # zh/sig/ai
│   │   │       └── ... (约100个SIG)
│   │   └── en/
│   │   │   ├── index.json     # en 首页
│   │   │   └── ... (按实际路径组织)
│   └── last-modified.json     # 构建时生成
└── .env.production            # 环境变量 (域名配置)
```

**关键变化**:
- TDK 和 JSON-LD 现在按页面路径组织，每个页面独立文件
- 文件目录路径与真实页面路径一一对应
- SIG 数据已从集中目录 `.geo/jsonld/sigs/` 分散到 `.geo/jsonld/zh/sig/{sig-name}/`

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
输出: .geo/tdks/{locale}/{path}/index.json
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
输出: .geo/jsonld/{locale}/{path}/index.json
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

---

## 八、文件结构设计说明

### 1. 按路径组织的设计理念

新的 `.geo/` 目录结构采用**页面路径映射**设计，而非之前的集中文件设计。

**之前的设计**（集中式）:
```
.geo/tdks/zh.ts          # 所有中文页面TDK集中在一个文件
.geo/jsonld/general.ts   # 所有通用页面JSON-LD集中在一个文件
.geo/jsonld/sigs/*.jsonld.json  # 所有SIG集中在一个目录
```

**现在的设计**（分布式）:
```
.geo/tdks/zh/{path}/index.json    # 每个页面独立文件
.geo/jsonld/zh/{path}/index.json  # 每个页面独立文件
```

### 2. 设计优势

| 维度 | 集中式设计 | 分布式设计（当前） |
|-----|-----------|------------------|
| **可维护性** | 单文件庞大，难以维护 | 每个页面独立，易于维护 |
| **增量更新** | 需修改整个文件 | 只修改单个文件 |
| **路径对应** | 需要查找键映射 | 文件路径即页面路径 |
| **SIG管理** | 需单独目录 | 与其他页面统一管理 |
| **Git历史** | 单文件修改频繁 | 修改分散，历史清晰 |

### 3. 文件路径映射规则

```
页面路径 → 文件路径

zh/migration → .geo/tdks/zh/migration/index.json
en/approve/approve-info → .geo/jsonld/en/approve/approve-info/index.json
zh/sig/Kernel → .geo/jsonld/zh/sig/Kernel/index.json
```

**统一规则**: 所有页面使用 `{locale}/{page-path}/index.json` 格式

### 4. SIG 页面变化说明

**之前**: SIG 页面单独存储在 `.geo/jsonld/sigs/{sig-name}.jsonld.json`

**现在**: SIG 页面与其他页面统一存储在 `.geo/jsonld/zh/sig/{sig-name}/index.json`

**好处**:
- SIG 页面查找方式与其他页面一致
- 无需特殊处理逻辑
- 文件结构与页面URL结构完全对应

### 5. 文件格式

**TDK文件** (`\u200b.geo/tdks/zh/migration/index.json`):
```json
{
  "title": "...",
  "description": "...",
  "keywords": "..."
}
```

**JSON-LD文件** (`\u200b.geo/jsonld/zh/sig/Kernel/index.json`):
```json
[
  { "@type": "Organization", ... },
  { "@type": "CollectionPage", ... },
  { "@type": "FAQPage", ... }
]
```

### 6. 读取逻辑变化

**之前**（集中式读取）:
```typescript
// 从大对象中查找
const tdk = tdks[locale][pagePath];
const jsonLd = generalJsonLd[pagePath];
```

**现在**（文件路径读取）:
```typescript
// 直接读取对应路径文件
const tdkPath = `.geo/tdks/${locale}/${pagePath}/index.json`;
const jsonLdPath = `.geo/jsonld/${locale}/${pagePath}/index.json`;
```