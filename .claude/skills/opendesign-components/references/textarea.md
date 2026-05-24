> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OTextarea 多行文本输入框

## Part A：设计理解卡

OTextarea 是多行文本输入框组件，基于 InBox + InTextarea 内部组件组合而成。支持尺寸、圆角、颜色、样式变体、字符长度限制与显示、自动高度、清空、格式化校验等功能。与 OForm 表单联动时自动获取校验颜色。

### 值

**modelValue**（属性）：输入内容（v-model 双向绑定）。

**defaultValue**（属性）：非受控模式下的默认值。

### 外观

**size**（属性）：输入框尺寸。"large" 大号、"medium" 中号、"small" 小号。

**round**（属性）：圆角值。"pill" 映射为较大圆角（radius_control-l），也可传 CSS 值。

**color**（属性）：颜色。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。默认 normal。在表单中由校验结果自动覆盖。

**variant**（属性）：样式变体。"solid" 实心、"outline" 线框、"text" 纯文字。默认 outline。

### 输入

**placeholder**（属性）：占位提示文本。

**disabled**（属性）：是否禁用。

**readonly**（属性）：是否只读。

**clearable**（属性）：是否可清空。

### 尺寸控制

**rows**（属性）：文本域行数。默认 4 行。

**cols**（属性）：文本域列数。

**autoSize**（属性）：是否根据内容自动调整高度。

**resize**（属性）：是否允许拖拽调整大小。"both" 双向、"horizontal"/"h" 水平、"vertical"/"v" 垂直、"none" 不可调。默认 vertical。

### 字符限制

**maxLength**（属性）：最大字符长度。

**minLength**（属性）：最小字符长度。

**showLength**（属性）：是否显示字符计数。"always" 始终显示、"auto" 设置了 maxLength/minLength 时显示、"never" 不显示。默认 auto。

**getLength**（属性）：自定义获取字符长度的方法。

**inputOnOutlimit**（属性）：超过最大长度时是否仍允许输入。默认允许。

### 格式化与校验

**format**（属性）：格式化函数，控制显示格式。

**validate**（属性）：校验函数，返回 false 视为无效输入。

**valueOnInvalidChange**（属性）：无效输入在失焦时的纠正方式。true 恢复上次合法值；函数则使用返回值纠正。

### 滚动条

**scrollbar**（属性）：滚动条配置。布尔值或 OScrollbar 配置对象。默认 true。

### 关联

**textareaId**（属性）：textarea 的 id，用于关联 label 标签。

### 插槽区域

**prepend 插槽**（插槽）：输入框前置区域。

**append 插槽**（插槽）：输入框后置区域。

**suffix 插槽**（插槽）：输入框后缀区域。

### 事件

**input**（事件）：输入时触发。

**change**（事件）：值改变时触发（失焦或回车）。

**focus**（事件）：获取焦点时触发。

**blur**（事件）：失去焦点时触发。

**clear**（事件）：清空时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），最小高度缩至 116px、字号缩小至 tip1；在平板竖屏及以下（≤840px），large 水平内边距缩至 12px。

🧩 **布局结构**：文本域由外层容器（InBox）和内层输入区（InTextarea）组合而成。外层容器提供边框、圆角、颜色主题；内层包含多行文本输入区和可选的字符计数显示。支持前置区域（prepend）、后置区域（append）、后缀区域（suffix）三个插槽扩展。文本域最小高度 126px，最小宽度 xl 控件尺寸。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
regions: [prepend(前置区域), textarea(文本输入区+字符计数), append(后置区域)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：多行文本输入框，高度明显大于单行输入框，通常有边框包围，右下角可能有字符计数或拖拽调整手柄 → 匹配 OTextarea
- **Token → Prop 映射**：实心填充背景 → variant="solid"；仅边框 → variant="outline"（默认）；无背景无边框 → variant="text"；右下角显示 "n/m" 字符计数 → showLength + maxLength；右下角有拖拽手柄 → resize="vertical"（默认）；框内有占位灰色文字 → placeholder；框右侧有清除 × → clearable
- **易混淆组件区分**：与 OInput 区分——OInput 是单行输入框高度较小，OTextarea 是多行输入框高度较大且可调整；与纯 HTML textarea 区分——OTextarea 有 InBox 外层包裹提供统一样式和颜色主题
- **⚠️ 错误状态 / 必填星号 → 用 OFormItem 包裹**：设计稿中文本域边框变红（错误态）或标签旁有红色星号（必填），应将 OTextarea 放入 `<OFormItem>` 实现，**不要**直接设 `color="danger"` 或手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OTextarea } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type TextareaResizeT = 'both' | 'horizontal' | 'h' | 'vertical' | 'v' | 'none';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string` | — | — | 绑定值（v-model） |
| defaultValue | `string` | — | — | 默认值 |
| size | `SizeT` | `'large'` / `'medium'` / `'small'` | — | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'` | 样式 |
| placeholder | `string` | — | — | 占位文本 |
| disabled | `boolean` | — | `false` | 禁用 |
| readonly | `boolean` | — | `false` | 只读 |
| clearable | `boolean` | — | `false` | 可清空 |
| rows | `number` | — | `4` | 行数 |
| cols | `number` | — | — | 列数 |
| autoSize | `boolean` | — | `false` | 自动高度 |
| resize | `TextareaResizeT` | `'both'` / `'horizontal'` / `'vertical'` / `'none'` | `'vertical'` | 拖拽调整 |
| maxLength | `number` | — | — | 最大字符长度 |
| minLength | `number` | — | — | 最小字符长度 |
| showLength | `string` | `'always'` / `'auto'` / `'never'` | `'auto'` | 显示字符计数 |
| getLength | `(val: string) => number` | — | — | 自定义长度计算 |
| inputOnOutlimit | `boolean` | — | `true` | 超限仍允许输入 |
| format | `(value: string) => string` | — | — | 格式化函数 |
| validate | `(value: string) => boolean` | — | — | 校验函数 |
| valueOnInvalidChange | `boolean \| ((input: string, lastValid: string) => string)` | — | — | 无效值纠正 |
| scrollbar | `boolean \| Partial<BaseScrollerPropsT>` | — | `true` | 滚动条配置 |
| textareaId | `string` | — | — | textarea id |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: string)` | 值变化时 |
| change | `(value: string)` | 失焦/回车时 |
| input | `(evt: Event)` | 输入时 |
| focus | `(evt: FocusEvent)` | 获取焦点 |
| blur | `(evt: FocusEvent)` | 失去焦点 |
| clear | `(evt?: Event)` | 清空时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| prepend | — | 有插槽时 | 前置区域 | 无 |
| append | — | 有插槽时 | 后置区域 | 无 |
| suffix | — | 有插槽时 | 后缀区域 | 无 |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| focus() | — | 聚焦 |
| blur() | — | 失焦 |
| clear() | — | 清空内容 |
| inputEl | — | 获取原生 textarea 元素 |

### 典型使用场景与调用模板

**场景 1：基础文本域**
适用于：多行文本输入
```vue
<script setup>
import { ref } from 'vue';
const content = ref('');
</script>
<template>
  <OTextarea v-model="content" placeholder="请输入内容" />
</template>
```

**场景 2：带字符计数限制**
适用于：评论、备注等限字场景
```vue
<OTextarea v-model="content" :max-length="200" show-length="always" />
```

**场景 3：自动高度**
适用于：内容量不确定的输入
```vue
<OTextarea v-model="content" auto-size resize="none" />
```

**场景 4：可清空 + 禁止调整大小**
适用于：固定布局的表单
```vue
<OTextarea v-model="content" clearable resize="none" :rows="6" />
```

**场景 5：不同样式**
适用于：适配不同设计场景
```vue
<OTextarea v-model="content" variant="solid" color="normal" />
<OTextarea v-model="content" variant="text" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础输入 | `v-model` + `placeholder` | 最常见 |
| 字符限制 | `:max-length` + `show-length="always"` | 限字显示 |
| 自动高度 | `auto-size` + `resize="none"` | 自适应 |
| 固定高度 | `:rows` + `resize="none"` | 固定 |
| 可清空 | `clearable` | 清空按钮 |
| 表单联动 | 与 OFormItem 配合 | 自动校验颜色 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--textarea-min-height` | `126px` | 文本域最小高度 |
| `--textarea-min-width` | `var(--o-control_size-xl)` | 文本域最小宽度 |
| `--textarea-padding-v` | `8px`（medium） | 垂直内边距（small 为 4px） |
| `--textarea-padding-h` | `16px`（medium） | 水平内边距（small 为 8px） |
| `--textarea-color` | — | 文字颜色（text variant 下由 color prop 控制） |

**使用示例**:
```vue
<OTextarea style="--textarea-min-height: 200px" v-model="content" />
```

### 响应式行为表
| 字号 | — | tip1 | 标准 |
| large 水平内边距 | 12px | — | 16px |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  container: div.o-textarea (InBox 外壳)
  direction: vertical
  border-radius: var(--o-radius_control-s)  # 可通过 round 自定义
  min-height: 126px
  min-width: var(--o-control_size-xl)
  regions:
    - name: prepend
      condition: 有 prepend 插槽时
      children:
        - { type: slot, name: prepend }
    - name: textarea-body
      element: div.o-textarea-textarea (InTextarea)
      flex: 1
      children:
        - textarea  # 原生 textarea 元素
        - length-display  # 字符计数（showLength 控制）
    - name: append
      condition: 有 append 插槽时
      children:
        - { type: slot, name: append }
    - name: suffix
      condition: 有 suffix 插槽时
      children:
        - { type: slot, name: suffix }
  variants:
    small: { padding-v: 4px, padding-h: 8px }
    medium: { padding-v: 8px, padding-h: 16px }
    large: { padding-v: 8px, padding-h: 16px }
  color-schemes:
    outline: { border: control1, bg: transparent }
    solid: { border: none, bg: control2-light }
    text: { border: none, bg: transparent }
```

**≤1440px**
```yaml
# min-height: 116px, font-size: tip1
```

**≤840px**
```yaml
# large: padding-h 12px
```

### 设计稿识别指南

**视觉特征指纹**

1. 多行文本输入框 + 边框包围 + 高度大于单行输入框 → 匹配 OTextarea
2. 右下角 "n/m" 字符计数 → 匹配 OTextarea（showLength + maxLength）
3. 右下角有可拖拽调整大小的手柄 → 匹配 OTextarea（resize 非 none）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 背景色 | 实心填充 | variant | `'solid'` | — |
| 背景色 | 透明，仅边框 | variant | `'outline'` | 默认 |
| 背景色 | 透明，无边框 | variant | `'text'` | — |
| 边框颜色 | 绿色 | color | `'success'` | 或表单校验 |
| 边框颜色 | 橙色 | color | `'warning'` | 或表单校验 |
| 边框颜色 | 红色 | color | `'danger'` | 或表单校验 |
| 右下角计数 | 有 "n/m" 显示 | showLength + maxLength | `'always'` + 数值 | — |
| 灰色占位文字 | 有 | placeholder | 字符串值 | — |
| 拖拽手柄 | 可纵向拖拽 | resize | `'vertical'` | 默认 |
| 拖拽手柄 | 不可拖拽 | resize | `'none'` | — |
| 清除图标 | 有 × | clearable | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OTextarea | OInput | OInput 是单行输入框（高度约 28–40px），OTextarea 是多行（高度 ≥ 116px） |
| OTextarea | 纯 HTML textarea | OTextarea 有 InBox 外壳提供统一边框、颜色、圆角等样式主题 |
| OTextarea | OInput（textarea 模式） | OTextarea 是独立组件，非 OInput 的变体 |

