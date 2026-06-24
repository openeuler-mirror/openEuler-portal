# openEuler VitePress 项目 SEO 实现流程总结

## 一、Sitemap 生成

### 1. 配置位置
`app/.vitepress/config.ts`

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
│   │       └── index.json        # zh/approve/approve-info 页面
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

### 4. SIG 页面 JSON-LD 生成工具 (generate-sig-jsonld)

**Agent 使用指南**: 为 `{zh,en}/sig/*` 页面生成 JSON-LD 时，**优先调用 `generate-sig-jsonld` tool 来生成**，而非 `geo-fix-tdk-schema.js`。

#### 4.1 数据来源

脚本自动从 API 获取 SIG 结构化数据：

| API 端点 | 数据内容 |
|---------|---------|
| `/api-magic/stat/sig/info` | SIG 基本信息（名称、描述、maintainer、committer） |
| `/api-magic/sig/new/repo/committers` | SIG 仓库列表及仓库成员 |

**优势**: 无需手动输入，数据来自官方 API，保证准确性。

#### 4.2 生成的 JSON-LD 结构

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "openEuler SIG - Kernel",
  "description": "Kernel SIG 致力于...",
  "url": "https://www.openeuler.org/zh/sig/Kernel",
  "member": [
    {
      "@type": "Person",
      "name": "username",
      "role": "Maintainer",
      "email": "user@example.com",
      "affiliation": "华为",
      "url": "https://..."
    }
  ],
  "hasPart": [
    {
      "@type": "SoftwareSourceCode",
      "name": "openeuler/kernel",
      "codeRepository": "https://atomgit.com/openeuler/kernel",
      "maintainers": [...],
      "committers": [...]
    }
  ]
}
```

#### 4.3 与 geo-fix-tdk-schema.js 的区别

| 特性 | generate-sig-jsonld | geo-fix-tdk-schema.js |
|------|------------------------|----------------------|
| 适用页面 | 仅 SIG 页面（`{zh,en}/sig/*`） | 所有页面 |
| 数据来源 | API 自动获取 | URL 抓取页面内容 |
| 生成类型 | JSON-LD | TDK 或 JSON-LD |
| 使用场景 | SIG 页面专用，数据准确 | 通用批量生成 |

**推荐流程**:
1. SIG 页面 → 调用 `generate-sig-jsonld`（数据来自 API，更准确）
2. 其他页面 → 使用 `geo-fix-tdk-schema.js`

---

## 四、 TDK / JSON-LD 生成工具 (@scripts/geo-fix-tdk-schema.js)

**Agent 使用指南**: 当需要为任意 URL 批量生成 TDK 或 JSON-LD 时，直接调用此脚本。

### 1 脚本用法

```bash
# 生成 TDK
node scripts/geo-fix-tdk-schema.js --urls=https://example.com/zh/page1,https://example.com/en/page2 --type=tdk

# 生成 JSON-LD
node scripts/geo-fix-tdk-schema.js --urls=https://example.com/zh/sig/Kernel,https://example.com/en/download --type=jsonld
```

**参数说明**:
- `--urls`: 逗号分隔的 URL 列表（必须为完整 URL）
- `--type`: 生成类型，`tdk` 或 `jsonld`

### 2 工作流程

```
1. 解析命令行参数
   └── 提取 URL 列表和生成类型

2. 并行处理（基于 CPU 核心数）
   └── 每个 URL 启动独立的 opencode 进程
   └── TDK: 使用 meta-tags-optimizer skill
   └── JSON-LD: 使用 schema-markup-generator skill

3. 自动路径映射
   └── URL: https://example.com/zh/sig/Kernel
   └── 输出: .geo/tdks/zh/sig/Kernel/index.json (TDK)
   └── 输出: .geo/jsonld/zh/sig/Kernel/index.json (JSON-LD)

4. 质量校验（内置二级 subAgent）
   └── 检查生成内容是否完全基于页面实际内容
   └── 确保无虚构信息（如错误的社区名称）
   └── 输出修改建议并自动修正
```

### 3 输出路径规则

| 类型 | 输出路径 |
|------|---------|
| TDK | `.geo/tdks/{locale}/{path}/index.json` |
| JSON-LD | `.geo/jsonld/{locale}/{path}/index.json` |

**示例**:
```
URL: https://openeuler.org/zh/sig/Kernel
→ TDK:     .geo/tdks/zh/sig/Kernel/index.json
→ JSON-LD: .geo/jsonld/zh/sig/Kernel/index.json

URL: https://openeuler.org/en/download
→ TDK:     .geo/tdks/en/download/index.json
→ JSON-LD: .geo/jsonld/en/download/index.json
```

#### 4.4 生成质量保证

脚本内置**三级校验机制**：

1. **生成阶段**: skill 根据页面内容生成 TDK/JSON-LD
2. **检查阶段**: 启动独立 subAgent 校验内容忠实性
3. **修正阶段**: 根据检查结果自动修正问题

**校验规则**:
- TDK/JSON-LD 信息必须完全来自页面实际内容
- 禁止虚构不存在的信息（如错误的社区名称）
- 仅修改 `.geo/` 目录下的 JSON 文件

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

## 六、关键依赖与工具

### 1. NPM 依赖包

| 功能 | 依赖包 |
|-----|--------|
| sitemap 转换 | `@opendesign-plus/geo-scripts/vitepress-sitemap-transformer` |
| lastmod 生成 | `@opendesign-plus/plugins/vite/generate-lastmod-changefreq` |
| llms-full 生成 | `@opendesign-plus/geo-scripts/generate-llms-full` |

### 2. Skills 工具

| 功能 | Skill 名称 |
|-----|-----------|
| 单页 meta 优化 | `meta-tags-optimizer` |
| 单页 schema 生成 | `schema-markup-generator` |
