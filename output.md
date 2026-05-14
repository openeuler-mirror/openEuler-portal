# GEO Fix 处理清单

## 2026-05-14

### sitemap_inclusion

✅ https://www.openeuler.openatom.cn/zh/security/vulnerability-reporting/ sitemap_inclusion — 改 app/.vitepress/config.ts (添加 sitemap priority 规则 0.5，页面已存在于 app/zh/security/vulnerability-reporting/index.md)

✅ https://www.openeuler.openatom.cn/en/security/vulnerability-reporting/ sitemap_inclusion — 改 app/.vitepress/config.ts (添加 sitemap priority 规则 0.5，页面已存在于 app/en/security/vulnerability-reporting/index.md)

## 修改详情

**文件**: `app/.vitepress/config.ts`

在 sitemap `transformItems` 配置中添加规则:
```js
// 漏洞报告页面
'^(zh|en)/security/vulnerability-reporting/?$': {
  priority: 0.5
},
```

VitePress 会自动将 `app/zh/security/vulnerability-reporting/index.md` 和 `app/en/security/vulnerability-reporting/index.md` 页面收录到 sitemap，此次修改为这些页面设置了优先级为 0.5。lastmod 信息通过已有的 `last-modified.json` 文件自动注入。