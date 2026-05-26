> ← [命令索引](../SKILL.md#命令索引) · [README](../../../README.md)

# gen:icon — SVG 图标生成 Vue 组件

## Part A：功能简介

`gen:icon` 命令将设计师提供的 SVG 图标文件，按类型（fill/stroke/color）分类处理，通过 SVGO 优化后自动生成可直接 import 使用的 Vue 单文件组件（`.vue`）。

**适用场景**：组件库开发和业务项目均可使用。组件库用于生成内置图标组件；业务项目用于管理设计稿中的自定义图标。

**SVG 资源从设计稿到代码的工作流**：
1. **优先通过 MCP 获取**：如果设计工具（Pixso/Figma 等）提供了 MCP（Model Context Protocol）能力，应优先调用其 MCP 接口批量导出 SVG 资源
2. **手动导出 SVG**：若无 MCP 能力，则将设计稿中可转化为图标的切图逐个导出为 `.svg` 格式
3. **按类型分类**：根据图标内容判断类型，将 SVG 放入对应子目录（见下方「SVG 导出规范与分类规则」）
4. **可选清理**：如果导出的 SVG 质量较差，先运行 `clean:svg` 清理
5. **统一生成**：所有 SVG 切图导出完毕后，运行 `gen:icon` 一次性生成全部图标的 Vue 组件
6. 在代码中导入使用（见下方「图标组件的导入方式」）

> **注意**：应在所有 SVG 切图都导出完毕后再统一运行 `gen:icon`，因为该命令每次执行会清空输出目录并重新生成全部组件。

**SVG 导出规范**：
- 图标应导出为**留有适当白边的正方形**画布，优先使用 **24×24px** 尺寸
- 若图标有特殊尺寸需求，仍按标准尺寸导出 SVG，在调用处通过 CSS `font-size` 或 `width`/`height` 调整显示大小
- 导出时移除不必要的图层、蒙版和裁切路径
- **需要动态样式的路径**：若某个 `<path>` 需要在交互时单独变色或改变样式，应在设计工具中为该路径设置有意义的 **ID**（如 `highlight`、`badge`）。`gen:icon` 的 SVGO 流程中 `addClassesbyId` 插件会自动将 `id` 转为 `class`，调用方即可通过 CSS 类选择器控制该路径的样式

```vue
<!-- 示例：通过类名控制 SVG 内部路径的颜色 -->
<OIcon :icon="OIconNotification" class="my-icon" />

<style scoped>
/* 设计师在 SVG 中为小红点路径设置了 id="badge"，生成后变为 class="badge" */
.my-icon :deep(.badge) {
  fill: red;
}
</style>
```

**分类规则**——根据图标的视觉内容判断放入哪个子目录：

| 目录 | 判断依据 | 生成后颜色控制方式 | 典型场景 |
|------|---------|------------------|---------|
| `fill/` | 图标以**实心填充**为主，颜色由 `fill` 属性控制 | 通过 CSS `color` 统一变色 | 实心箭头、实心勾选、实心收藏星 |
| `stroke/` | 图标以**线条描边**为主，颜色由 `stroke` 属性控制 | 通过 CSS `color` 统一变色 | 线框关闭、线框搜索、线框设置 |
| `color/` | 图标包含**多种固定颜色**，不应被 CSS 统一变色 | 保留 SVG 原始颜色 | 品牌 Logo、彩色插图、多色状态图标 |

> **判断技巧**：用文本编辑器打开 SVG，如果 `<path>` 等元素主要使用 `fill` 属性着色 → `fill/`；主要使用 `stroke` 属性着色 → `stroke/`；同时使用多种不同颜色值 → `color/`。

**SVG 文件命名规范**：

文件名直接决定生成的 Vue 组件名（如 `arrow-right.svg` → `OIconArrowRight`），应遵循统一的命名规则。

命名格式：`{语义名}[-{形态变体}].svg`

- **语义名**：描述图标含义，使用 kebab-case（小写 + 连字符），由「对象」或「动作」构成
- **形态变体**（可选）：同一语义的不同视觉形态后缀

语义名选取规则：

| 优先级 | 构成方式 | 示例 |
|--------|---------|------|
| 1 | 单个动作或对象（含义明确时） | `search.svg`、`home.svg`、`close.svg` |
| 2 | 动作 + 对象 | `file-download.svg`、`user-add.svg`、`link-copy.svg` |
| 3 | 对象 + 限定词 | `arrow-right.svg`、`chevron-down.svg`、`caret-up.svg` |

常见形态变体后缀：

| 后缀 | 含义 | 示例 |
|------|------|------|
| `-circle` | 带圆形背景 | `check-circle.svg`、`info-circle.svg` |
| `-square` | 带方形背景 | `plus-square.svg` |
| `-line` | 线性描边版本 | `heart-line.svg` |
| `-solid` | 实心填充版本 | `heart-solid.svg` |

常用语义词参考：

| 类别 | 推荐词汇 |
|------|---------|
| 导航 | `arrow-{up/down/left/right}`、`chevron-{方向}`、`caret-{方向}`、`expand`、`collapse`、`menu`、`more` |
| 操作 | `add`、`delete`、`edit`、`search`、`download`、`upload`、`save`、`copy`、`share`、`refresh`、`close`、`filter`、`sort` |
| 对象 | `file`、`folder`、`user`、`home`、`calendar`、`mail`、`image`、`link`、`bell`、`lock`、`key`、`settings` |
| 状态 | `check`、`warning`、`error`、`info`、`loading`、`success`、`question` |
| 媒体 | `play`、`pause`、`stop`、`mute`、`volume` |

命名原则：
- 以图标的**视觉含义/用途**命名，不以业务功能命名（`close.svg` 而非 `dialog-dismiss.svg`）
- 同一组相关图标保持前缀一致（`arrow-up`、`arrow-down`、`arrow-left`、`arrow-right`）
- 避免冗余前缀——文件已在 `fill/`、`stroke/`、`color/` 子目录中，无需在文件名中重复类型信息

**工作流程**：
1. 读取配置文件（默认 `./icon.config.ts`）
2. 扫描 `input` 目录下 `fill/`、`stroke/`、`color/` 三个子目录中的所有 `.svg` 文件
3. 使用 SVGO 按类型优化每个 SVG（fill 类移除 fill 属性、stroke 类移除 stroke 属性、color 类保留原色）
4. 为每个 SVG 生成一个 Vue 组件（含 `<script>` + `<template>`）和一个 `index.ts` 导出文件
5. 在输出目录生成总入口 `index.ts` 和图标清单 `icons.json`

**图标三种类型**：
- **fill**：填充型图标，移除 SVG 中的 `fill` 属性，运行时通过 CSS `color` 统一控制颜色
- **stroke**：描边型图标，移除 SVG 中的 `stroke` 属性，运行时通过 CSS `color` 统一控制颜色
- **color**：多色图标，保留 SVG 中的原始颜色属性，不做颜色处理

**SSR 支持**：默认生成的组件仅在客户端渲染（`renderOnServer: false`），通过 `onMounted` 判断后才渲染 SVG 内部内容。设置 `renderOnServer: true` 后直接渲染完整 SVG。

**组件命名规则**：SVG 文件名经过处理后生成组件名：
- 去除类型前缀（`fill/`、`stroke/`、`color/`）和 `.svg` 后缀
- 空格、目录嵌套、多连字符替换为单连字符
- 添加 `{prefix}icon-` 前缀，转为 PascalCase 作为组件名
- 示例：`fill/arrow-right.svg` + `prefix: 'o-'` → `OIconArrowRight`
- 文件名不符合 JS 变量命名规范时（如含 `.` 或特殊字符）会被跳过并报错

---

## Part B：调用与配置参考

### 命令用法

```bash
open-scripts gen:icon [options]
```

| 选项 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `-c, --config <configFile>` | 配置文件路径 | 否 | `./icon.config.ts` |

### 配置文件格式（`IconsConfig`）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `input` | `string` | 否 | `'./svgs'` | SVG 源文件目录，需包含 `fill/`、`stroke/`、`color/` 子目录 |
| `output` | `string` | 否 | `'./components/'` | Vue 组件输出目录（执行时会先清空） |
| `prefix` | `string` | 否 | `''` | 组件名前缀，如 `'o-'`（生成 `OIconXxx`）或 `'doc-'`（生成 `DocIconXxx`） |
| `componentClass` | `string` | 否 | `'svg-icon'` | SVG 根元素的 CSS 类名，用于全局样式控制 |
| `renderOnServer` | `boolean` | 否 | `false` | 是否在 SSR 时渲染 SVG 内容。`false` 时仅客户端渲染（避免 hydration 不匹配） |
| `template` | `Function` | 否 | 内置模板函数 | 自定义组件模板生成函数（高级用法，一般不需要覆盖） |
| `svgo` | `SVGOConfigT` | 否 | 内置 SVGO 配置 | 自定义 SVGO 优化配置 |

**`SVGOConfigT` 子配置**

| 字段 | 类型 | 说明 |
|------|------|------|
| `fill` | `svgo.Config` | fill 类型图标的 SVGO 优化配置 |
| `stroke` | `svgo.Config` | stroke 类型图标的 SVGO 优化配置 |
| `color` | `svgo.Config` | color 类型图标的 SVGO 优化配置 |

内置的 SVGO 处理包括：
- 将 SVG 中的 `id` 转为 class（`addClassesbyId` 插件）
- 使用 `preset-default` 但保留 `viewBox`
- `prefixIds` 防止 ID 冲突，并将 ID 替换为 Vue 动态绑定（`:id`）
- 移除 `<style>`、`<script>` 元素
- 移除固定 `width`/`height`（使用 viewBox 自适应）
- 移除 `xmlns` 属性
- 添加 `:class="classNames"` 绑定
- **fill 类型**额外移除 `fill` 属性
- **stroke 类型**额外移除 `stroke` 属性
- **color 类型**保留所有颜色属性

### 输出产物

```
{output}/
├── OIconArrowRight/
│   ├── OIconArrowRight.vue    # Vue 单文件组件
│   └── index.ts               # export { default as OIconArrowRight } from './OIconArrowRight.vue'
├── OIconClose/
│   ├── OIconClose.vue
│   └── index.ts
├── index.ts                   # 统一导出所有图标
└── icons.json                 # 图标清单（类型、名称、路径信息）
```

### 配置示例

**示例 1：组件库图标生成（来源：`packages/opendesign/icons/icon.config.ts`）**

```typescript
export default {
  input: './svgs',
  output: '../src/icon-components/',
  componentClass: 'o-svg-icon',
  prefix: 'o-',
};
```

**示例 2：文档站图标生成（来源：`packages/docs/icons/icon.config.ts`）**

```typescript
export default {
  input: './svgs',
  output: '../src/icon-components/',
  componentClass: 'o-svg-icon',
  prefix: 'doc-',
};
```

**示例 3：测试/演示用图标（来源：`packages/portal/__test_scripts/icons/icon.config.ts`）**

```typescript
export default {
  input: './svgs',
  output: './dist',
  componentClass: 'o-svg-icon',
  prefix: 'o-',
  renderOnServer: false,
};
```

### package.json 集成

```json
{
  "scripts": {
    "gen:icon": "open-scripts gen:icon --config ./icons/icon.config.ts"
  }
}
```

### 与其他命令的执行顺序

| 前置命令 | 关系说明 |
|---------|---------|
| `clean:svg` | 可选前置——先用 `clean:svg` 清理原始 SVG，再用 `gen:icon` 生成组件 |

| 后续命令 | 关系说明 |
|---------|---------|
| `build:component` | 必须——生成的图标组件需要和其他组件一起打包 |

### SVG 目录结构要求

```
{input}/
├── fill/           ← 填充型图标
│   ├── arrow-right.svg
│   └── subfolder/
│       └── nested-icon.svg    ← 支持嵌套目录
├── stroke/         ← 描边型图标
│   └── close.svg
└── color/          ← 多色图标
    └── logo.svg
```

### 图标组件的导入方式

生成的图标组件支持多种导入方式，根据项目结构选择合适的方式：

```vue
<script setup>
// 方式 1：从组件库包导入（使用组件库内置图标）
import { OIconArrowRight, OIconClose } from '@opensig/opendesign';

// 方式 2：通过路径别名导入（业务项目自定义图标，需在 vite.config / tsconfig 中配置别名）
import { OIconCustom } from '@/icon-components';

// 方式 3：相对路径导入
import { OIconCustom } from '../icon-components';

// 方式 4：从 monorepo 的其他子包导入（通过包名引用）
import { DocIconLogo } from '@my-org/docs-icons';
</script>
```

**最佳实践**：
- **组件库内置图标**直接从 `@opensig/opendesign` 导入，无需自己运行 `gen:icon`
- **业务项目自定义图标**建议配置路径别名（如 `@/icon-components`），避免深层相对路径
- **monorepo 中跨包共享图标**建议将图标生成到独立子包并发布，其他包通过包名导入

### 注意事项

- **output 目录必须被 git 忽略**：`output` 目录是自动生成的产物，不应纳入版本控制。请在 `.gitignore` 中添加对应规则（如 `icon-components`）。若 output 目录未被忽略，应在使用 `gen:icon` 前立即添加忽略规则
- **首次使用自动创建**：若配置文件（`icon.config.ts`）或输入目录（`svgs/fill/`、`svgs/stroke/`、`svgs/color/`）缺失，应按最佳实践自动创建配置文件和含三个子目录的 input 目录，并在 `package.json` 的 `scripts` 中添加 `gen:icon` 命令，同时确保 `.gitignore` 覆盖 output 目录
- **执行前清空输出目录**：`gen:icon` 每次执行会先清空 `output` 目录，请确保该目录仅用于图标组件输出
- **文件名规范**：SVG 文件名会被转换为 JS 变量名（PascalCase），不符合 JS 变量命名规范的文件名（如包含 `.` 或以数字开头）会被跳过并输出红色错误提示
- **重复名称处理**：不同子目录中同名的 SVG 文件，第二个起会自动追加递增序号（如 `OIconArrow`、`OIconArrow2`）
- **配置文件格式**：推荐使用 ESM 风格的 `.ts` 文件（`export default { ... }`）。也兼容 `.cts`、`.js`、`.cjs` 格式，通过 `jiti` 动态加载
- **路径解析**：`input` 和 `output` 路径相对于配置文件所在目录解析（非 `cwd`）
