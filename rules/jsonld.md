# JSON-LD / 结构化数据规范

## 数据来源：`.geo/jsonld/` 是唯一来源

`.geo/jsonld/` 目录是页面 JSON-LD 结构化数据的唯一来源。`setJSONLD` 构建钩子（`app/.vitepress/config.ts` 第 24-42 行）在构建期读取该目录并注入 `<script type="application/ld+json">`。

- 新页面的 JSON-LD 应在 `.geo/jsonld/{locale}/{path}/index.json` 创建对应文件，**不应**在 md frontmatter 中内嵌 `<script type="application/ld+json">` 块
- frontmatter 中可保留 OG meta（`og:title` / `og:description` 等），但 JSON-LD 数据必须收敛到 `.geo/jsonld/`
- 文件路径与页面 URL 一一对应：页面 `zh/sig/Kernel` → `.geo/jsonld/zh/sig/Kernel/index.json`

> **踩过的坑**：frontmatter 内嵌 JSON-LD script 块与 `.geo/jsonld/` 双来源导致页面输出重复/冲突的 `<script type="application/ld+json">`，搜索引擎抓取到矛盾的结构化数据。

---

## 域名替换：不要手动硬编码

`setJSONLD` 构建期钩子基于 `VITE_MAIN_DOMAIN_URL` 环境变量，自动将 `.geo/jsonld/` 文件中的 `openeuler.openatom.cn` 替换为目标域名。

- `.geo/jsonld/` 文件中的域名应写为 `openeuler.openatom.cn`（或不含域名的相对路径），由构建钩子统一替换
- **禁止**手动在 `.geo/jsonld/` 文件中硬编码 `www.openeuler.org` 等目标域名替换
- 手动硬编码会与构建期 `replaceAll` 叠加，产生双重替换或路径错乱

> **踩过的坑**：developer 手动将 `.geo/jsonld/` 中 `openeuler.openatom.cn` 批量替换为 `www.openeuler.org`，构建期钩子再次替换 `openeuler.openatom.cn` → 导致已手动替换的 URL 中残留子串被二次匹配，产出 `img/for-cdn/img/for-cdn/logo.png` 等路径错乱。

---

## 批量 sed 替换：从窄到宽排序 + 残留检查

对 `.geo/jsonld/` 文件执行批量 `sed` 路径替换时，必须遵守以下约束：

1. **替换 pattern 必须从最具体到最宽泛排序**：先替换长路径（如 `/assets/logo.svg`、`/assets/logo.png`、`/img/logo.png`），最后才用 catch-all 短 pattern（如 `/logo.png`）
2. **catch-all pattern 须避免二次匹配**：窄规则已将 `/assets/logo.svg` 替换为 `/img/for-cdn/logo.png` 后，catch-all `/logo.png` 会再次匹配结果中的 `/logo.png` 子串，产出 `img/for-cdn/img/for-cdn/logo.png`——这类 double-replacement 必须通过排序避免
3. **操作完成后必须 `grep` 检查残留**：确认不存在 double-replacement 残留（如 `img/for-cdn/img/for-cdn`），残留为 0 方可提交

> **踩过的坑**：requirement agent 设计了从窄到宽的 5 条 sed 替换规则，但 catch-all `/logo.png` 规则二次匹配了已被窄规则替换的结果，导致 14 个文件出现 `img/for-cdn/img/for-cdn/logo.png` 的 double-replacement bug，需额外一轮评审修复。根因是 catch-all pattern 未排除已替换结果的子串匹配。

---

## 禁止事项

- 禁止在 md frontmatter 中内嵌 `<script type="application/ld+json">` 块（JSON-LD 由 `.geo/jsonld/` 单一来源提供）
- 禁止手动在 `.geo/jsonld/` 文件中硬编码 `www.openeuler.org` 等目标域名（由 `setJSONLD` 构建钩子统一替换）
- 禁止批量 sed 替换时 catch-all pattern 放在窄 pattern 前面（会导致 double-replacement）
- 禁止批量替换完成后不 `grep` 检查残留（double-replacement 可能肉眼不明显）