> ← [命令索引](../SKILL.md#命令索引) · [README](../../../README.md)

# clean:svg — SVG 清理优化

## Part A：功能简介

`clean:svg` 命令使用 SVGO 批量清理和优化 SVG 文件。它扫描输入目录下所有 `.svg` 文件（包括子目录），应用 SVGO 优化规则后将精简的 SVG 输出到指定目录。

**典型使用场景**：设计师从 Figma/Sketch 等工具导出的 SVG 通常包含冗余信息（如编辑器元数据、内联样式、脚本元素等），使用此命令可在 `gen:icon` 之前进行预处理。

**与 `gen:icon` 的区别**：
- `clean:svg`：输入 SVG → 输出优化后的 SVG（仍然是 SVG 文件）
- `gen:icon`：输入 SVG → 输出 Vue 组件（`.vue` 文件）

---

## Part B：调用与配置参考

### 命令用法

```bash
open-scripts clean:svg [options]
```

| 选项 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `-c, --config <configFile>` | 配置文件路径 | 否 | `./clear-svg.config.ts` |

### 配置文件格式（`IconsConfig`）

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `input` | `string` | 否 | `'./src/icons/svgs'` | SVG 源文件目录（递归扫描所有 `.svg`） |
| `output` | `string` | 否 | `'./src/icons/output/'` | 清理后的 SVG 输出目录（执行前会先清空） |
| `svgo` | `svgo.Config` | 否 | 内置默认配置 | SVGO 优化配置 |

**内置 SVGO 默认插件**：

| 插件 | 说明 |
|------|------|
| `preset-default`（保留 viewBox） | 标准优化预设，但不移除 `viewBox` 属性 |
| `removeStyleElement` | 移除 `<style>` 元素 |
| `removeScriptElement` | 移除 `<script>` 元素 |
| `removeDimensions` | 移除固定 `width`/`height`（使用 viewBox） |
| `sortAttrs` | 属性排序 |
| `removeUselessStrokeAndFill` | 移除无效的 stroke 和 fill 声明 |
| `removeAttrs`（`class`） | 移除 `class` 属性 |

### 配置示例

**示例 1：组件库 SVG 清理（来源：`packages/opendesign/icons/cleansvg.config.ts`）**

```typescript
export default {
  input: './svgs',
  output: './_svgs',
};
```

**示例 2：自定义 SVGO 配置**

```typescript
export default {
  input: './raw-svgs',
  output: './clean-svgs',
  svgo: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      'removeStyleElement',
      'removeScriptElement',
      'removeDimensions',
    ],
  },
};
```

### package.json 集成

```json
{
  "scripts": {
    "clean:svg": "open-scripts clean:svg --config ./icons/cleansvg.config.ts"
  }
}
```

### 与其他命令的执行顺序

| 前置命令 | 关系说明 |
|---------|---------|
| 无 | 可独立执行 |

| 后续命令 | 关系说明 |
|---------|---------|
| `gen:icon` | 建议——清理后的 SVG 作为 `gen:icon` 的输入源 |

### 注意事项

- **output 目录必须被 git 忽略**：`output` 目录是自动生成的产物，不应纳入版本控制。请在 `.gitignore` 中添加对应规则（如 `_svgs`）。若 output 目录未被忽略，应立即添加忽略规则
- **首次使用自动创建**：若配置文件（`cleansvg.config.ts`）或输入目录缺失，应按最佳实践自动创建配置文件和 input 目录，并在 `package.json` 的 `scripts` 中添加 `clean:svg` 命令，同时确保 `.gitignore` 覆盖 output 目录
- **执行前清空输出目录**：每次执行会先清空 `output` 目录
- **保持目录结构**：输出的 SVG 文件名保留原始文件名，但移除了文件名中的空格
- **配置文件格式**：推荐使用 ESM 风格的 `.ts` 文件（`export default { ... }`）。也兼容 `.cts`、`.js`、`.cjs` 格式
- **路径解析**：`input` 和 `output` 路径相对于配置文件所在目录解析
- **默认配置文件名**：当不指定 `--config` 时，默认查找 `./clear-svg.config.ts`（注意是 `clear` 不是 `clean`）
