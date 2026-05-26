> ← [命令索引](../SKILL.md#命令索引) · [README](../../../README.md)

# build:component — Vue 组件库构建

## Part A：功能简介

`build:component` 命令使用 Vite 构建 Vue 组件库，输出三种模块格式的产物。此命令**不接受配置文件**，构建配置内嵌在脚本中，直接在组件库包的根目录执行即可。

**构建过程**分三步：
1. **ES/CJS 构建**：使用 `vite build` 生成 ESM（`.mjs`）和 CJS（`.js`）格式，保留模块结构（`preserveModules`），支持 tree-shaking，同时通过 `vite-plugin-dts` 生成类型声明文件
2. **UMD 组件包构建**：打包组件库为 `opendesign.js`（全量包）和 `opendesign.min.js`（压缩包）
3. **UMD 图标包构建**：单独打包图标为 `opendesign-icon.js` 和 `opendesign-icon.min.js`

---

## Part B：调用与配置参考

### 命令用法

```bash
open-scripts build:component
```

此命令无 CLI 选项，无需配置文件。

### 构建入口

| 入口 | 路径 | 说明 |
|------|------|------|
| 组件主入口 | `src/index.ts` | 导出所有组件 |
| 图标入口 | `src/icon/index.ts` | 导出所有图标组件 |
| 国际化语言包 | `src/locale/lang/*.ts` | 各语言文件单独打包 |

### 构建产物

| 产物路径 | 格式 | 说明 |
|----------|------|------|
| `es/` | ESM（`.mjs`） | 保留目录结构，`import` 方式引入 |
| `lib/` | CJS（`.js`） | 保留目录结构，`require` 方式引入 |
| `es/`、`lib/` | `.d.ts` | TypeScript 类型声明 |
| `dist/opendesign.js` | UMD | 组件全量包（未压缩） |
| `dist/opendesign.min.js` | UMD（压缩） | 组件全量包（terser 压缩） |
| `dist/opendesign-icon.js` | UMD | 图标全量包（未压缩） |
| `dist/opendesign-icon.min.js` | UMD（压缩） | 图标全量包（terser 压缩） |

### 外部依赖（不打包）

| 依赖 | UMD 全局变量 |
|------|-------------|
| `vue` | `Vue` |
| `@vueuse/*` | `VueUse` |
| `dayjs` | `dayjs` |

### package.json 集成

```json
{
  "scripts": {
    "build:component": "open-scripts build:component"
  }
}
```

### 与其他命令的执行顺序

| 前置命令 | 关系说明 |
|---------|---------|
| `gen:icon` | 必须——需要先生成图标组件，才能和其他组件一起打包 |

| 后续命令 | 关系说明 |
|---------|---------|
| `build:style` | 通常——构建样式文件，与组件产物配合使用 |

### 前提条件

- 项目根目录需有 `src/index.ts` 作为组件主入口
- 项目根目录需有 `src/icon/index.ts` 作为图标入口
- 项目需配置 `tsconfig.app.json`（供 `vite-plugin-dts` 使用）
- 需安装 `@vitejs/plugin-vue`、`vite-plugin-dts`、`@rollup/plugin-terser` 等依赖

### 注意事项

- **构建产物目录必须被 git 忽略**：`es/`、`lib/`、`dist/` 三个目录是自动生成的构建产物，不应纳入版本控制。请在 `.gitignore` 中添加这三个目录。若未被忽略，应在构建前立即添加忽略规则
- **构建前清空目录**：`es/`、`lib/`、`dist/` 三个目录会在构建前被清空
- **UMD 包含 sourcemap**：UMD 产物默认生成 `.js.map` 源映射文件
- **图标独立打包**：图标组件有独立的 UMD 包，可按需加载而不引入全部组件
- **构建目标**：`target: 'modules'`（现代浏览器 ESM 支持）
- **不压缩 ES/CJS**：ES 和 CJS 格式不做代码压缩，保留可读性
