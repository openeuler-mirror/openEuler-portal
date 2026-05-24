> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OInputNumber 数字输入框

## Part A：设计理解卡

OInputNumber 是数字输入框组件，在普通输入框基础上增加了加减控制按钮，支持步进操作、最大最小值限制、自定义格式化显示。可与 OForm 配合实现自动校验。

### 值

**modelValue**（属性）：数字输入框的值（v-model 双向绑定）。类型为 number。

**defaultValue**（属性）：非受控模式下的默认值。类型为 number。

**clearValue**（属性）：当输入内容被清空（空字符串）时自动回退的数值。例如设为 0，则清空输入框后值自动变为 0。

### 外观

**variant**（属性）：输入框样式。"solid" 实心、"outline" 线框、"text" 无边框。默认 outline。

**color**（属性）：输入框颜色状态。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。在 OFormItem 内会自动跟随校验状态变色。默认 normal。

**size**（属性）：输入框尺寸。"small"、"medium"、"large"。默认 medium。不同尺寸对应不同的默认宽度：small 为 90px，medium 为 120px，large 为 160px。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值（如 "16px"）。

**autoWidth**（属性）：宽度随输入内容自适应。开启后不再使用固定的尺寸宽度。默认关闭。

### 状态

**disabled**（属性）：禁用输入框及加减按钮。禁用时加减按钮不可点击。默认关闭。

**readonly**（属性）：只读模式。默认关闭。

### 控制按钮

**controls**（属性）：控制按钮的位置。
- "both"（默认）：减号按钮在左侧，加号按钮在右侧，按钮均上下排列（上箭头/下箭头图标）。
- "left"：加减按钮都在左侧，加号在上、减号在下。
- "right"：加减按钮都在右侧，加号在上、减号在下。
- "none"：不显示任何控制按钮。

**step**（属性）：每次点击加减按钮时的步长。默认 1。

**min**（属性）：允许的最小值。到达最小值时减号按钮自动变为禁用态。

**max**（属性）：允许的最大值。到达最大值时加号按钮自动变为禁用态。

### 功能

**clearable**（属性）：是否显示清空按钮。默认关闭。

**placeholder**（属性）：占位文本。

**format**（属性）：格式化函数，控制显示格式。例如在数字前加货币符号 "$"。

**validate**（属性）：自定义值有效性判断函数。接收 number，返回 boolean。用于在 min/max 之外增加额外的校验逻辑。

**inputId**（属性）：原生 input 的 id 属性，用于 label 关联。

### 插槽区域

**plus 插槽**（插槽）：自定义加号按钮内容。替换默认的上箭头/加号图标。

**minus 插槽**（插槽）：自定义减号按钮内容。替换默认的下箭头/减号图标。

**prefix 插槽**（插槽）：输入框内部前缀。适合放货币符号如 "$"。

**suffix 插槽**（插槽）：输入框内部后缀。适合放单位如 "元"。

### 事件

**input**（事件）：实时输入时触发。

**change**（事件）：值改变后触发（含按钮点击和手动输入后失焦）。

**focus**（事件）：聚焦时触发。

**blur**（事件）：失焦时触发。

**clear**（事件）：点击清空按钮时触发。

**pressEnter**（事件）：按下回车键时触发。

**plus**（事件）：点击加号按钮时触发，携带操作后的新值。

**minus**（事件）：点击减号按钮时触发，携带操作后的新值。

### 响应式行为

无独立的响应式断点逻辑。OInputNumber 的尺寸响应式行为继承自底层 OInput 组件。

🧩 **布局结构**：数字输入框基于 OInput 封装，整体水平排列。根据 controls 属性，加减按钮分布在输入框的 prepend（左侧）和/或 append（右侧）区域。controls="both"（默认）时左侧为减号按钮区域、右侧为加号按钮区域，按钮区域内上下各半排列（上箭头/下箭头）。controls="left"/"right" 时两个按钮集中在一侧上下排列。按钮区域最小宽度等于输入框高度。不同 size 有固定默认宽度（small 90px / medium 120px / large 160px），autoWidth 模式下宽度随内容变化。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [prepend(减号按钮区), input(数字输入区), append(加号按钮区)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：输入框两侧或一侧有上下箭头（或 ± 图标）的控制按钮 → 匹配 OInputNumber；纯文本输入框无加减按钮 → 不匹配，应使用 OInput
- **Token → Prop 映射**：加减按钮分列两侧 → controls="both"（默认）；按钮集中在右侧 → controls="right"；按钮集中在左侧 → controls="left"；无按钮 → controls="none"；按钮颜色 `--o-color-info3` → 默认态
- **易混淆组件区分**：与 OInput 区分——OInputNumber 有加减控制按钮且仅接受数字输入，OInput 是通用文本输入；与 OSlider 区分——OSlider 是拖拽式数值选择有滑轨，OInputNumber 是输入框式
- **⚠️ 错误状态 / 必填星号 → 用 OFormItem 包裹**：设计稿中数字输入框边框变红（错误态）或标签旁有红色星号（必填），应将 OInputNumber 放入 `<OFormItem>` 实现，**不要**直接设 `color="danger"` 或手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OInputNumber } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| modelValue | `number` | 否 | — | — | 数值（v-model） |
| defaultValue | `number` | 否 | — | — | 非受控默认值 |
| step | `number` | 否 | — | `1` | 按钮步长 |
| min | `number` | 否 | — | — | 最小值 |
| max | `number` | 否 | — | — | 最大值 |
| controls | `InputNumberControlT` | 否 | `'both'` / `'right'` / `'left'` / `'none'` | `'both'` | 控制按钮位置 |
| clearable | `boolean` | 否 | — | `false` | 可清空 |
| size | `SizeT` | 否 | `'small'` / `'medium'` / `'large'` | `'medium'` | 尺寸 |
| round | `RoundT` | 否 | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | 否 | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色状态 |
| variant | `VariantT` | 否 | `'solid'` / `'outline'` / `'text'` | `'outline'` | 样式 |
| placeholder | `string` | 否 | — | — | 占位文本 |
| disabled | `boolean` | 否 | — | `false` | 禁用 |
| readonly | `boolean` | 否 | — | `false` | 只读 |
| autoWidth | `boolean` | 否 | — | `false` | 宽度自适应 |
| format | `(value: string) => string` | 否 | — | — | 格式化显示函数 |
| validate | `(value: number) => boolean` | 否 | — | — | 自定义值有效性判断 |
| inputId | `string` | 否 | — | — | input 元素 id |
| clearValue | `number` | 否 | — | — | 清空时的回退值 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: number)` | 值变化时（含按钮操作和手动输入） |
| change | `(value: number)` | 值改变后（去重，仅值真正变化时触发） |
| input | `(evt: Event)` | 实时输入 |
| focus | `(evt: FocusEvent)` | 聚焦 |
| blur | `(evt: FocusEvent)` | 失焦 |
| clear | `(evt?: Event)` | 点击清空 |
| pressEnter | `(evt: KeyboardEvent)` | 按下回车 |
| plus | `(value: number, evt: MouseEvent)` | 点击加号按钮，value 为操作后的值 |
| minus | `(value: number, evt: MouseEvent)` | 点击减号按钮，value 为操作后的值 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| plus | — | controls 不为 `'none'` | 加号按钮图标 | 上箭头（both/right/left 模式）或加号图标 |
| minus | — | controls 不为 `'none'` | 减号按钮图标 | 下箭头（both/right/left 模式）或减号图标 |
| prefix | — | 始终 | 输入框内部前缀 | 无 |
| suffix | — | 始终 | 输入框内部后缀 | 无 |

### 插槽层级关系

```
OInputNumber
├── prepend 区域（内部使用，由 controls 属性控制）
│   └── NumberControl（controls='both' 时为减号; controls='left' 时为加号+减号）
│       ├── #plus → 加号按钮内容
│       └── #minus → 减号按钮内容
├── prefix 区域
│   └── #prefix → 前缀内容
├── 输入区域（原生 input）
├── suffix 区域
│   └── #suffix → 后缀内容
└── append 区域（内部使用，由 controls 属性控制）
    └── NumberControl（controls='both' 时为加号; controls='right' 时为加号+减号）
        ├── #plus → 加号按钮内容
        └── #minus → 减号按钮内容
```

注意：
- controls='both'（默认）：减号在 prepend 区域（左侧），加号在 append 区域（右侧），分别上下排列。
- controls='left'：加号和减号都在 prepend 区域（左侧），上下排列。
- controls='right'：加号和减号都在 append 区域（右侧），上下排列。
- controls='none'：无控制按钮。
- prefix/suffix 插槽不受 controls 影响，始终可用。

### 典型使用场景与调用模板

**场景 1：基础数字输入**
适用于：通用数值输入
```vue
<script setup>
import { ref } from 'vue';
import { OInputNumber } from '@opensig/opendesign';
const count = ref(0);
</script>
<template>
  <OInputNumber v-model="count" />
</template>
```

**场景 2：设定范围和步长**
适用于：限定取值范围的数值输入，如数量选择
```vue
<OInputNumber v-model="count" :min="1" :max="99" :step="1" />
```

**场景 3：带前缀/后缀的数字输入**
适用于：价格、带单位的数值
```vue
<OInputNumber v-model="price" style="width: 150px">
  <template #prefix>$</template>
</OInputNumber>

<OInputNumber v-model="weight" style="width: 150px">
  <template #suffix>kg</template>
</OInputNumber>
```

**场景 4：自定义控制按钮文字**
适用于：自定义加减按钮的显示内容
```vue
<OInputNumber v-model="value" style="width: 150px">
  <template #minus>Minus</template>
  <template #plus>Plus</template>
</OInputNumber>
```

**场景 5：控制按钮在右侧**
适用于：紧凑布局，按钮上下排列在右侧
```vue
<OInputNumber v-model="value" controls="right" :min="0" :max="10" />
```

**场景 6：无控制按钮**
适用于：仅键盘输入数字，不需要点击操作
```vue
<OInputNumber v-model="value" controls="none" />
```

**场景 7：带格式化的数字输入**
适用于：显示格式与实际值不同，如货币格式
```vue
<script setup>
import { ref } from 'vue';
import { OInputNumber } from '@opensig/opendesign';
const amount = ref(0);
const format = (val) => (Number.isNaN(Number(val)) ? '' : `$${val}`);
</script>
<template>
  <OInputNumber v-model="amount" :format="format" style="width: 200px" />
</template>
```

**场景 8：清空时回退默认值**
适用于：不允许值为空的场景
```vue
<OInputNumber v-model="value" :clear-value="0" />
```

**场景 9：监听加减按钮事件**
适用于：需要在加减操作时执行额外逻辑
```vue
<OInputNumber
  v-model="value"
  :min="-2"
  :max="5"
  @plus="(v) => console.log('加到', v)"
  @minus="(v) => console.log('减到', v)"
  @change="(v) => console.log('值变为', v)"
/>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础数字输入 | `v-model` | 最常见用法 |
| 限定范围 | `v-model` + `:min` + `:max` | 达到边界时按钮自动禁用 |
| 自定义步长 | `v-model` + `:step="5"` | 每次加减 5 |
| 带单位 | `v-model` + `#prefix` 或 `#suffix` | 显示货币/单位 |
| 紧凑按钮 | `controls="right"` | 按钮收到右侧上下排列 |
| 纯输入 | `controls="none"` | 无加减按钮 |
| 错误状态 | `color="danger"` | 红色边框 |
| 禁用 | `disabled` | 输入框和按钮均禁用 |
| 格式化显示 | `:format` | 自定义显示格式 |
| 不允许空值 | `:clear-value="0"` | 清空时回退为指定数值 |
| 宽度自适应 | `auto-width` | 输入框宽度跟随内容 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--input-number-btn-color` | `var(--o-color-info3)` | 加减按钮默认图标颜色 |
| `--input-number-btn-color-hover` | `var(--o-color-info1)` | 加减按钮悬停图标颜色 |
| `--input-number-btn-color-active` | `var(--o-color-info1)` | 加减按钮激活图标颜色 |
| `--input-number-btn-color-disabled` | `var(--o-color-info4)` | 加减按钮禁用图标颜色 |
| `--input-number-btn-bg-color` | `transparent` | 加减按钮默认背景色 |
| `--input-number-btn-bg-color-hover` | `var(--o-color-control1-light)` | 加减按钮悬停背景色 |
| `--input-number-btn-bg-color-active` | `var(--o-color-control2-light)` | 加减按钮激活背景色 |
| `--input-number-btn-bg-color-disabled` | `var(--o-color-control4-light)` | 加减按钮禁用背景色 |
| `--input-number-btn-pill-fix` | `2px` | pill 圆角模式下按钮区域的内边距修正值 |

**使用示例**：
```vue
<OInputNumber v-model="count" style="--input-number-btn-color: var(--o-color-brand1)" />
```

### 响应式行为表

无独立的响应式断点逻辑。OInputNumber 的尺寸及响应式行为继承自底层 OInput 组件。不同 size 对应不同默认宽度（small: 90px, medium: 120px, large: 160px），该宽度在 autoWidth 模式下不生效。

### 组件布局结构

**桌面端 >1200px**
```yaml
layout:
  # OInputNumber 封装 OInput，外层 .o-input-number 包裹 InBox (.o_box)
  direction: horizontal
  align: center
  regions:
    - name: prepend (NumberControl 左侧)
      class: o-input-number-btn-wrap
      condition: "controls='both' 或 controls='left'"
      display: flex
      flex-wrap: wrap
      min-width: var(--_box-height)  # 等于输入框高度
      font-size: 16px
      color: var(--input-number-btn-color)  # var(--o-color-info3)
      children:
        - name: plus-btn (controls='both' 时为上箭头)
          class: o-input-number-btn
          height: "50%"  # controls='both' 时上下各半
          # controls='left' 时为 controls='both' 内的加减按钮
          background: var(--input-number-btn-bg-color)  # transparent
          hover: { color: var(--o-color-info1), bg: var(--o-color-control1-light) }
          active: { color: var(--o-color-info1), bg: var(--o-color-control2-light) }
          disabled: { color: var(--o-color-info4), bg: var(--o-color-control4-light) }
          children:
            - { type: slot, name: plus, fallback: IconChevronUp }
        - name: minus-btn
          class: o-input-number-btn
          height: "50%"
          children:
            - { type: slot, name: minus, fallback: IconChevronDown }
    - name: main (输入区域)
      class: o_box-main
      flex: 1
      children:
        - name: prefix
          condition: "$slots.prefix 存在"
          children: [{ type: slot, name: prefix }]
        - name: input
          children: [{ type: element, tag: input, only-numeric-input: true }]
        - name: suffix
          condition: "$slots.suffix 存在"
          children: [{ type: slot, name: suffix }]
    - name: append (NumberControl 右侧)
      class: o-input-number-btn-wrap
      condition: "controls='both' 或 controls='right'"
      min-width: var(--_box-height)
      children:
        - name: plus-btn
          class: o-input-number-btn
          height: "50%"  # controls='right'/'both' 上下排列
          children:
            - { type: slot, name: plus, fallback: "IconChevronUp(both) 或 IconAdd(单侧)" }
        - name: minus-btn
          class: o-input-number-btn
          height: "50%"
          children:
            - { type: slot, name: minus, fallback: "IconChevronDown(both) 或 IconMinus(单侧)" }
  variants:
    small: { width: 90px, height: "继承 OInput small" }
    medium: { width: 120px, height: "继承 OInput medium" }
    large: { width: 160px, height: "继承 OInput large" }
    controls-both:
      # prepend 内为 minus 按钮（单个，height 100%），append 内为 plus 按钮（单个，height 100%）
      prepend-type: minus  # 左侧仅减号
      append-type: plus    # 右侧仅加号
    controls-left:
      # prepend 内为加减两个按钮上下排列，无 append
      prepend-type: both
    controls-right:
      # 无 prepend，append 内为加减两个按钮上下排列
      append-type: both
    controls-none:
      # 无 prepend 和 append
    pill:
      # 按钮区域增加 padding-left/right 2px 修正（--input-number-btn-pill-fix）
```

**响应式断点**
```yaml
# 继承 OInput 的响应式行为，无独立断点
# 按钮区域 min-width 跟随 --_box-height 自动适配
```

### 设计稿识别指南

**视觉特征指纹**

1. 输入框 + 两侧有上下箭头按钮（左侧下箭头、右侧上箭头） → 匹配 OInputNumber controls="both"
2. 输入框 + 一侧有上下箭头按钮 → 匹配 OInputNumber controls="right" 或 "left"
3. 输入框 + 一侧有加号减号图标按钮（非箭头） → 匹配 OInputNumber controls="right"/"left"（单侧模式使用 ±图标）
4. 纯数字输入框无任何按钮 → 匹配 OInputNumber controls="none"

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 加减按钮位置 | 分列两侧 | controls | `'both'` | 默认 |
| 加减按钮位置 | 集中在右侧 | controls | `'right'` | — |
| 加减按钮位置 | 集中在左侧 | controls | `'left'` | — |
| 无加减按钮 | 不可见 | controls | `'none'` | — |
| 按钮颜色 | `--o-color-info3` | — | — | 默认态 |
| 按钮 hover 色 | `--o-color-info1` | — | — | 悬停态 |
| 按钮背景 hover | `--o-color-control1-light` | — | — | 悬停态 |
| 按钮灰色不可点击 | `--o-color-info4` + `--o-color-control4-light` | — | — | 达到 min/max 时 |
| 整体宽度 | 90px | size | `'small'` | autoWidth=false |
| 整体宽度 | 120px | size | `'medium'` | autoWidth=false |
| 整体宽度 | 160px | size | `'large'` | autoWidth=false |
| 边框/背景/圆角 | 同 OInput | variant/color/round | 同 OInput | 继承 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OInputNumber | OInput | OInputNumber 有加减控制按钮且仅接受数字，OInput 接受任意文本 |
| OInputNumber | OSlider | OSlider 有滑轨和拖拽手柄，OInputNumber 是输入框 + 按钮形式 |
| OInputNumber（controls="none"） | OInput | 外观近似，但 OInputNumber 仅接受数字输入（only-numeric-input），且值类型为 number |
