> ← [命令索引](../SKILL.md#命令索引) · [README](../../../README.md)

# gen:token — 设计令牌生成

## Part A：功能简介

`gen:token` 命令从 JSON 格式的设计令牌定义文件，生成多主题的 CSS 变量文件和 VS Code 代码片段文件。用于将设计师在 Pixso/Figma 等工具中导出的令牌数据转换为前端可直接使用的 CSS 自定义属性（Custom Properties）。

**适用场景**：仅用于 `@opensig/opendesign-token` 令牌包的构建流程。该命令的产物最终发布为 `@opensig/opendesign-token` npm 包。

**业务项目不需要运行此命令**。OpenDesign 的设计令牌已经预构建在 `@opensig/opendesign-token` 包中，业务项目直接安装并引入对应主题的 CSS 文件即可：

```bash
pnpm add @opensig/opendesign-token
```

```typescript
// main.ts — 以 openEuler 社区为例
import '@opensig/opendesign-token/themes/e.light.token.css'
import '@opensig/opendesign-token/themes/e.dark.token.css'
```

**工作流程**：
1. 读取配置文件（默认 `./token.config.ts`）
2. 加载配置中指定的令牌 JSON 文件（支持多个文件合并）
3. 扁平化令牌数据，为每个令牌添加配置的前缀
4. 按 `themeMap` 中的主题映射关系，生成各主题对应的 CSS 文件
5. 可选生成 VS Code 代码片段文件（`.code-snippets`）

**生成的 CSS 文件**使用 `[data-o-theme="xxx"]` 选择器区分主题，或使用 `:root` 作为默认主题。每个 CSS 变量都带有 JSDoc 风格的注释，包含名称、类型、分组和描述信息。

---

## Part B：调用与配置参考

### 命令用法

```bash
open-scripts gen:token [options]
```

| 选项 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `-c, --config <configFile>` | 配置文件路径 | 否 | `./token.config.ts` |

### 配置文件格式（`TokenConfigT`）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `prefix` | `string` | 是 | — | CSS 变量前缀（如 `'--o-'`），生成的变量名为 `{prefix}{key}` |
| `output` | `string` | 否 | `'./'` | CSS 文件输出目录 |
| `tokenFile` | `string[]` | 是 | — | 令牌 JSON 文件路径数组（支持多文件合并，相对于配置文件目录） |
| `themeMap` | `ThemeMapItem[]` | 是 | — | 主题映射配置数组（定义各主题的 CSS 选择器和值来源） |
| `codeSnippetsFile` | `string` | 否 | — | VS Code 代码片段输出路径（不设则不生成） |
| `defaultTheme` | `string` | 否 | — | 默认主题标识 |
| `defaultThemeName` | `string` | 否 | — | 默认主题名称 |

**`ThemeMapItem` 子配置**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `valueKey` | `string` | 是 | 从令牌值对象中取值的键名（如 `'light'`、`'dark'`） |
| `name` | `string \| string[]` | 是 | 主题名称，用于生成文件名和 CSS 选择器。数组时生成多选择器。值为 `'default'` 时使用 `:root` 选择器 |
| `root` | `boolean` | 否 | `true` 时所有选择器都使用 `:root`（不管 name 值） |

### 令牌 JSON 文件格式（`TokenT`）

```typescript
interface TokenT {
  [groupKey: string]: {
    name: string;       // 分组名称
    type: string;       // 令牌类型（如 "color"、"spacing"）
    value: Array<{
      key: string;      // 令牌键名（与 prefix 拼接成 CSS 变量名）
      name: string;     // 令牌显示名称
      description: string; // 令牌描述
      value: {
        [themeKey: string]: string;  // 各主题对应的值（如 { light: '#fff', dark: '#000' }）
      };
    }>;
  };
}
```

### 输出产物

**CSS 文件**（每个 themeMap 项生成一个文件）：

文件名格式：`{name1}-{name2}.token.css`（多个 name 用 `-` 连接）

```css
/* theme: o.light|default */
[data-o-theme="o.light"],
:root {
  /**
   * @name 品牌色
   * @type color
   * @group brand
   * @description 主品牌色
   */
  --o-brand-color: #0064FF;
}
```

**VS Code 代码片段文件**（可选）：

```json
{
  "--o-brand-color": {
    "prefix": ["var(--o-brand-color)"],
    "body": "var(--o-brand-color)",
    "description": "主品牌色[light: #0064FF, dark: #3385FF]",
    "scope": "css,scss,less"
  }
}
```

### 配置示例

**示例 1：OpenDesign 令牌生成（来源：`packages/portal/__test_scripts/tokens/token.config.ts`）**

```typescript
export default {
  prefix: '--o-',
  output: './dist',
  themeMap: [
    {
      valueKey: 'light',
      name: ['o.light', 'default'],
    },
    {
      valueKey: 'dark',
      name: 'o.dark',
    },
    {
      valueKey: 'light',
      name: 'o',
      root: true,
    },
  ],
  tokenFile: ['./opendesign-token.json'],
  codeSnippetsFile: './dist/opendesign.token.code-snippets',
};
```

此配置生成三个 CSS 文件：
- `o.light-default.token.css` — 浅色主题，选择器为 `[data-o-theme="o.light"], :root`
- `o.dark.token.css` — 深色主题，选择器为 `[data-o-theme="o.dark"]`
- `o.token.css` — 默认主题（root），选择器为 `:root`

**示例 2：多社区主题**

```typescript
export default {
  prefix: '--o-',
  output: './themes',
  themeMap: [
    { valueKey: 'light', name: 'e.light' },    // openEuler 浅色
    { valueKey: 'dark', name: 'e.dark' },       // openEuler 深色
    { valueKey: 'light', name: 'a.light' },     // Ascend 浅色
    { valueKey: 'dark', name: 'a.dark' },        // Ascend 深色
  ],
  tokenFile: [
    './openeuler-token.json',
    './ascend-token.json',
  ],
};
```

### package.json 集成

```json
{
  "scripts": {
    "gen:token": "open-scripts gen:token --config ./tokens/token.config.ts"
  }
}
```

### 与其他命令的执行顺序

| 前置命令 | 关系说明 |
|---------|---------|
| 无 | 令牌生成完全独立于组件构建流程 |

| 后续命令 | 关系说明 |
|---------|---------|
| 无 | 生成的 CSS 文件直接在应用中引入即可 |

### 注意事项

- **output 目录必须被 git 忽略**：`output` 目录是自动生成的产物，不应纳入版本控制。请在 `.gitignore` 中添加对应规则（如 `dist`）。若 output 目录未被忽略，应立即添加忽略规则
- **首次使用自动创建**：若配置文件（`token.config.ts`）或令牌 JSON 文件缺失，应按最佳实践自动创建配置文件和空的令牌 JSON 文件，并在 `package.json` 的 `scripts` 中添加 `gen:token` 命令，同时确保 `.gitignore` 覆盖 output 目录
- **重复令牌检测**：多个令牌文件中存在相同 key 时会输出警告 `重复定义的token: {tokenKey}`，后者覆盖前者
- **路径解析**：`tokenFile`、`output`、`codeSnippetsFile` 路径相对于配置文件所在目录解析
- **配置文件格式**：推荐使用 ESM 风格的 `.ts` 文件（`export default { ... }`）。也兼容 `.cts`、`.js`、`.cjs` 格式
- **`name: 'default'`**：当 themeMap 的 name 包含字符串 `'default'` 时，该主题会使用 `:root` 选择器而非 `[data-o-theme="default"]`
- **`root: true`**：设置后忽略 name 值，所有选择器均为 `:root`，适用于定义不区分主题的基础变量
