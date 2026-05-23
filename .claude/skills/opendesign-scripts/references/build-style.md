> ← [命令索引](../SKILL.md#命令索引) · [README](../../../README.md)

# build:style — SCSS 样式编译

## Part A：功能简介

`build:style` 命令编译组件库的 SCSS 样式文件为 CSS，同时生成多种引入方式的样式产物（SCSS 源码拷贝、CSS 编译文件、JS 引入入口、全量打包文件、主题文件）。此命令**不接受配置文件**，硬编码读取 `./src` 目录作为样式源文件目录。

**构建过程**：
1. 扫描 `./src` 下所有 `.scss` 和 `.css` 文件
2. 将 SCSS/CSS 源文件拷贝到 `es/` 和 `lib/` 目录
3. 编译所有 `index.scss` 文件为 `index.css`
4. 将根 `index.scss` 额外编译到 `dist/index.css` + `dist/index.min.css`
5. 编译各主题的 `index.scss` 到 `dist/theme/` 目录
6. 编译 `theme-*.scss` 皮肤文件为对应 CSS
7. 生成 `css.js` 入口文件（将 `.scss` 引用替换为 `.css` 引用）
8. 生成 `scss.mjs` / `scss.js` 全量 SCSS 引入入口
9. 拷贝 `code-snippets` 文件

---

## Part B：调用与配置参考

### 命令用法

```bash
open-scripts build:style
```

此命令无 CLI 选项，无需配置文件。

### 内部配置

| 字段 | 值 | 说明 |
|------|-----|------|
| `input` | `'./src'` | 样式源文件目录（硬编码） |

### 构建产物

| 产物路径 | 说明 |
|----------|------|
| `es/**/*.scss` | 原始 SCSS 文件拷贝 |
| `lib/**/*.scss` | 原始 SCSS 文件拷贝 |
| `es/**/index.css` | 编译后的 CSS（每个 `index.scss` 对应一个） |
| `lib/**/index.css` | 编译后的 CSS |
| `es/**/css.js` | CSS 引入入口（将 SCSS 引用替换为 CSS 引用） |
| `lib/**/css.js` | CSS 引入入口 |
| `es/**/theme-*.css` | 皮肤文件编译后的 CSS |
| `lib/**/theme-*.css` | 皮肤文件编译后的 CSS |
| `dist/index.css` | 全量样式 |
| `dist/index.min.css` | 全量样式（CleanCSS 压缩） |
| `dist/index.scss` | SCSS 入口（`@import '../es/index.scss'`） |
| `dist/theme/{theme}/index.css` | 各主题全量样式 |
| `dist/theme/{theme}/index.min.css` | 各主题全量样式（压缩） |
| `es/scss.mjs` | ESM SCSS 全量引入入口 |
| `lib/scss.js` | CJS SCSS 全量引入入口 |
| `code-snippets/` | VS Code 代码片段文件（从 `theme/` 目录拷贝） |

### CSS 引入入口转换规则

`css.js` 文件由对应的 `style/index.ts` 或 `_styles/index.ts` 自动转换生成，转换规则：
- `.scss` 后缀替换为 `.css`
- `/style'` 路径替换为 `/style/css'`
- `/_styles'` 路径替换为 `/_styles/css'`
- `theme-*.index` 替换为 `theme-*.index.css`

### package.json 集成

```json
{
  "scripts": {
    "build:style": "open-scripts build:style"
  }
}
```

### 与其他命令的执行顺序

| 前置命令 | 关系说明 |
|---------|---------|
| 无 | 样式编译不依赖其他命令的输出 |

| 后续命令 | 关系说明 |
|---------|---------|
| 无 | 通常是构建流程的最后一步 |

### 目录结构要求

```
src/
├── index.scss                  # 全量样式入口
├── _styles/
│   └── index.ts                # 全局样式 JS 入口
├── {component}/
│   └── style/
│       ├── index.scss          # 组件样式
│       └── index.ts            # 组件样式 JS 入口
└── theme/
    ├── {theme-name}/
    │   └── index.scss          # 主题样式入口
    └── **/*code-snippets       # VS Code 代码片段
```

### 注意事项

- **构建产物目录必须被 git 忽略**：`es/`、`lib/`、`dist/` 目录中的编译产物不应纳入版本控制。请在 `.gitignore` 中添加这三个目录。若未被忽略，应在构建前立即添加忽略规则
- **不清空输出目录**：此命令不会清空 `es/`、`lib/`、`dist/` 目录，通常在 `build:component` 之后执行，产物叠加在组件构建产物之上
- **SCSS 编译器**：使用 `sass-embedded`（Dart Sass 的嵌入式版本），作为 peer 依赖由 pnpm 自动安装，若安装异常再手动安装
- **CSS 压缩**：使用 `clean-css` 进行 CSS 压缩
- **仅编译 `index.scss`**：非 `index.scss` 的 SCSS 文件只做拷贝，不编译为 CSS（`theme-*.scss` 皮肤文件除外）
- **主题文件匹配规则**：匹配 `theme/` 下非 `_` 开头的子目录中的 `index.scss`
