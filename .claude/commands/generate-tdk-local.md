---
name: generate-tdk-local
description: 从本地构建产物目录批量生成TDK (Title, Description, Keywords)
argument-hint: "<dist_directory>"
allowed-tools: ["Glob", "Read", "Task", "Write"]
parameters:
  - name: dist_directory
    type: string
    required: true
    description: 构建产物目录路径，如 app/.vitepress/dist 或 dist
---

# Generate TDK from Local HTML Files

从本地构建产物目录中的HTML文件批量生成优化的TDK (Title, Description, Keywords)。

## Usage

```
/generate-tdk-local app/.vitepress/dist
/generate-tdk-local dist/
/generate-tdk-local D:\code\euler\app\.vitepress\dist
```

**Arguments:**
- `dist_directory` (required): 构建产物目录路径

## Workflow

1. **扫描HTML文件** -- 使用Glob查找 `{dist_directory}/**/*.html`，获取所有页面列表
2. **调用Skill** -- Invoke `sitemap-meta-tags-batch-generator` skill with:
   - `source_mode: "local"`
   - `local_directory: <dist_directory>`
   - `output_directory: ".geo/tdks"`
3. **Skill处理** -- Skill执行本地HTML模式流程:
   - 解析HTML提取现有TDK和内容
   - 使用 `meta-tags-optimizer` 生成优化TDK
   - 按语言(zh/en)分组输出
4. **输出结果** -- 输出到 `.geo/tdks/zh.ts` 和 `.geo/tdks/en.ts`

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TDK批量生成报告
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

源目录: <dist_directory>
扫描文件: <count> HTML files
语言分布: zh=<zh_count>, en=<en_count>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
处理结果
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

成功: <success_count> 页面
失败: <fail_count> 页面 (如有)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
输出文件
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

.geo/tdks/zh.ts  -- <zh_count> 中文页面TDK
.geo/tdks/en.ts  -- <en_count> 英文页面TDK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Output File Structure

```ts
// .geo/tdks/zh.ts
const tdks: {
  [path: string]: { title: string; description: string; keywords?: string };
} = {
  'zh/migration': {
    title: 'openEuler迁移方案 | openEuler迁移中心',
    description: 'openEuler助力企业简单、平稳、高效进行操作系统迁移...',
    keywords: 'openEuler迁移,迁移工具,迁移方案'
  },
  'zh/download': {
    title: 'openEuler下载 | openEuler社区',
    description: '下载openEuler操作系统镜像...',
    keywords: 'openEuler下载,镜像下载'
  },
  ...
};
export default tdks;
```

## Tips

- 确保 `<dist_directory>` 是完整的构建产物目录
- 如果HTML缺少现有TDK，会基于页面内容生成
- 生成的TDK遵循SEO最佳实践 (Title 50-60字符，Description 150-160字符)

## Related Skills

- [sitemap-meta-tags-batch-generator](../../.claude/skills/sitemap-meta-tags-batch-generator/) -- 批量TDK生成，支持本地/远程模式
- [meta-tags-optimizer](../../.claude/skills/meta-tags-optimizer/) -- 单页TDK优化