> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OSlider 滑动条

## Part A：设计理解卡

OSlider 是滑动条组件，用于在一个数值范围内通过拖拽选择数值。支持连续滑动和间隔（分段）滑动两种模式，支持单值选择和范围选择，可选配输入框、气泡提示和自定义标记。

### 值

**modelValue**（属性）：当前选中的数值（v-model 双向绑定）。单值模式传数字，范围模式传二元数组 [最小值, 最大值]。默认 0。

**min**（属性）：滑动条最小值。默认 0。

**max**（属性）：滑动条最大值。默认 100。

**step**（属性）：每次滑动的步长值。默认 1。

### 模式

**range**（属性）：是否启用范围选择模式。开启后出现两个滑块，modelValue 应为数组。默认关闭。

**showStops**（属性）：是否显示间隔刻度点。开启后轨道上按步长显示刻度圆点，滑块按钮变为带实心内圆样式，轨道加粗。默认关闭。

### 方向

**direction**（属性）：滑动条方向。"h" 水平方向、"v" 垂直方向。默认 "h"。注意：垂直方向暂不完全支持。

**height**（属性）：垂直方向时滑动条的高度。仅 direction="v" 时生效。

### 输入框

**showInput**（属性）：是否在滑动条右侧显示数值输入框。仅在非范围模式下可用。默认关闭。

**inputSize**（属性）：输入框尺寸。"large" 大号、"medium" 中号、"small" 小号。

**showInputControls**（属性）：是否显示输入框的增减控制器。默认关闭。

**unit**（属性）：输入框右侧的单位文字。

### 气泡

**showPopover**（属性）：是否在拖拽或悬浮时显示数值气泡。默认开启。

**position**（属性）：气泡定位方向。支持 "top"、"bottom"、"left"、"right" 等 12 个方向。默认 "bottom"。

**wrapClass**（属性）：气泡容器的自定义类名。

### 标记

**marks**（属性）：在轨道下方显示自定义标记文字。传入对象，键为数值位置，值为文字字符串或 { style, label } 对象。点击标记可跳转到对应位置。

### 插槽区域

**unit 插槽**（插槽）：替换输入框右侧的单位文字。使用后 unit 属性失效。

### 事件

**change**（事件）：滑动结束（鼠标松开或输入框失焦）后触发。

**input**（事件）：滑动过程中实时触发。

### 键盘交互

滑块按钮获得焦点后支持键盘操作：左/下箭头减少一步长、右/上箭头增加一步长、PageDown 减少四倍步长、PageUp 增加四倍步长、Home 跳至最小值、End 跳至最大值。

---

### OSliderButton 滑块按钮（内部子组件）

OSliderButton 是滑动条内部的拖拽按钮，由 OSlider 内部使用，不需要用户直接调用。

**modelValue**（属性）：按钮对应的数值。

**position**（属性）：气泡定位方向。默认 "top"。

**direction**（属性）：方向。默认 "h"。

**showSolidCircle**（属性）：是否显示按钮中心的实心小圆。间隔模式自动开启。

**showPopover**（属性）：是否显示气泡。

**wrapClass**（属性）：气泡容器的自定义类名。

---

### OSliderMarker 标记文字（内部子组件）

OSliderMarker 用于渲染轨道上的标记文字，由 OSlider 内部使用，不需要用户直接调用。

**mark**（属性）：标记内容。字符串或 { style, label } 对象。

---

**响应式行为**：在笔记本尺寸及以下（<=1440px），气泡文字缩小。在平板竖屏及以下（<=840px），滑块按钮增大为 24px，刻度点增大为 3px；间隔模式下轨道高度和进度条高度随之增大，提升触控体验。

🧩 **布局结构**：滑动条整体水平排列（默认），由轨道区域和可选输入框区域组成。轨道区域包含底部跑道条（runway）、已选进度条（bar）、一个或两个拖拽按钮（range 模式两个）、可选刻度点和标记文字。输入框区域在轨道右侧，包含数值输入框和单位文字。垂直模式时轨道纵向排列。按钮可显示气泡提示。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal  # 默认，可切换 vertical
regions: [runway-wrap(轨道: runway+bar+buttons+stops+marks), input-wrap(输入框+单位)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：水平/垂直细长轨道条 + 圆形可拖拽滑块按钮 + 已选区域着色进度条 → 匹配 OSlider；轨道上有等距圆点 + 滑块按钮有实心内圆 → showStops 间隔模式；轨道右侧有数值输入框 → showInput 模式
- **Token → Prop 映射**：轨道水平 → direction="h"（默认）；轨道垂直 → direction="v"；两个滑块按钮 → range=true；轨道上有圆形刻度点 → showStops=true；轨道下方有文字标记 → marks 属性；右侧有输入框 → showInput=true；滑块上方/下方有数值气泡 → showPopover=true
- **易混淆组件区分**：与 OProgress 区分——OProgress 是只读进度展示无滑块交互，OSlider 有可拖拽滑块按钮；与 OInputNumber 区分——OInputNumber 是独立数字输入框，OSlider 的输入框只是辅助，核心交互是拖拽滑块
- **⚠️ 必填星号 → 用 OFormItem 包裹**：设计稿中滑块控件标签旁有红色星号（必填），应将 OSlider 放入 `<OFormItem required>` 实现，**不要**手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OSlider } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type Arrayable<T> = T | T[];
type DirectionT = 'h' | 'v';
type SizeT = 'large' | 'medium' | 'small';
type PopupPositionT = 'top' | 'tl' | 'tr' | 'bottom' | 'bl' | 'br' | 'left' | 'lt' | 'lb' | 'right' | 'rt' | 'rb';
```

### OSlider Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `Arrayable<number>` | — | `0` | 双向绑定值（v-model），范围模式传数组 |
| min | `number` | — | `0` | 最小值 |
| max | `number` | — | `100` | 最大值 |
| step | `number` | — | `1` | 步长 |
| disabled | `boolean` | — | `false` | 禁用 |
| range | `boolean` | — | `false` | 范围选择模式 |
| direction | `DirectionT` | `'h'` / `'v'` | `'h'` | 方向 |
| height | `string` | — | — | 垂直方向高度（仅 direction="v"） |
| showInput | `boolean` | — | `false` | 显示输入框（非 range 模式） |
| inputSize | `SizeT` | `'large'` / `'medium'` / `'small'` | — | 输入框尺寸 |
| showInputControls | `boolean` | — | `false` | 显示输入框控制器 |
| showStops | `boolean` | — | `false` | 显示间隔刻度点 |
| showPopover | `boolean` | — | `true` | 显示数值气泡 |
| position | `PopupPositionT` | 12 个方向 | `'bottom'` | 气泡定位方向 |
| wrapClass | `string` | — | — | 气泡容器自定义类名 |
| marks | `Record<number, string \| { style: CSSProperties; label: any }>` | — | — | 标记对象 |
| unit | `string` | — | — | 单位文字 |

### OSlider Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: Arrayable<number>)` | 值变化时 |
| input | `(value: Arrayable<number>)` | 滑动过程中实时触发 |
| change | `(value: Arrayable<number>)` | 滑动结束后触发 |

### OSlider Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| unit | — | showInput 为 true 时 | 输入框右侧单位文字 | `props.unit` 文字 |

### OSlider Expose

| 名称 | 类型 | 说明 |
|------|------|------|
| onSliderClick | `(event: MouseEvent \| TouchEvent) => void` | 手动触发滑动条点击 |

### OSliderButton Props 表（内部子组件）

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `number` | — | `0` | 当前值 |
| position | `PopupPositionT` | 12 个方向 | `'top'` | 气泡定位方向 |
| direction | `DirectionT` | `'h'` / `'v'` | `'h'` | 方向 |
| showSolidCircle | `boolean` | — | `false` | 显示实心内圆 |
| showPopover | `boolean` | — | `false` | 显示气泡 |
| wrapClass | `string` | — | — | 气泡容器自定义类名 |

### OSliderButton Expose

| 名称 | 类型 | 说明 |
|------|------|------|
| onButtonDown | `(event: MouseEvent \| TouchEvent) => void` | 手动触发拖拽 |
| onKeyDown | `(event: KeyboardEvent) => void` | 手动触发键盘事件 |
| setPosition | `(newPosition: number) => Promise<void>` | 按百分比设置位置 |
| hovering | `boolean` | 是否悬浮中 |
| dragging | `boolean` | 是否拖拽中 |

### OSliderMarker Props 表（内部子组件）

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| mark | `string \| { style: CSSProperties; label: any }` | — | — | 标记内容 |

### 插槽层级关系

```
OSlider
├── [轨道区域（自动渲染）]
│   ├── OSliderButton（第一个滑块，始终存在）
│   ├── OSliderButton（第二个滑块，range 模式时存在）
│   ├── 间隔刻度点（showStops 时显示）
│   └── OSliderMarker 标记列表（marks 时显示）
├── [输入框区域（showInput 且非 range 时显示）]
│   ├── OInputNumber
│   └── unit 插槽 / unit 属性文字
```

### 典型使用场景与调用模板

**场景 1：基础连续滑动条**
适用于：简单数值选择
```vue
<script setup>
import { ref } from 'vue';
const value = ref(0);
</script>
<template>
  <OSlider v-model="value" />
</template>
```

**场景 2：带输入框和单位的滑动条**
适用于：精确数值选择，如重量、温度
```vue
<script setup>
import { ref } from 'vue';
const weight = ref(0);
const marks = { 0: '0kg', 100: '100kg' };
</script>
<template>
  <OSlider v-model="weight" :marks="marks" show-input unit="kg" />
</template>
```

**场景 3：间隔（分段）滑动条**
适用于：离散值选择，如等级、档位
```vue
<script setup>
import { ref } from 'vue';
const level = ref(0);
</script>
<template>
  <OSlider v-model="level" show-stops :step="10" show-input unit="M" />
</template>
```

**场景 4：带标记的间隔滑动条**
适用于：离散档位且需显示每档标签
```vue
<script setup>
import { ref } from 'vue';
const val = ref(0);
const marks = { 0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5' };
</script>
<template>
  <OSlider v-model="val" show-stops :max="5" :marks="marks" />
</template>
```

**场景 5：禁用滑动条**
适用于：只读展示
```vue
<OSlider v-model="value" disabled />
<OSlider v-model="value" show-stops :step="10" disabled />
```

**场景 6：隐藏气泡的滑动条**
适用于：不需要悬浮数值提示
```vue
<OSlider v-model="value" :show-popover="false" />
```

**场景 7：范围选择**
适用于：价格区间、时间段
```vue
<script setup>
import { ref } from 'vue';
const rangeVal = ref([20, 60]);
</script>
<template>
  <OSlider v-model="rangeVal" range />
</template>
```

**场景 8：自定义标记样式**
适用于：标记需要特殊视觉效果
```vue
<script setup>
import { ref } from 'vue';
const val = ref(0);
const marks = {
  0: { style: { color: 'red' }, label: '起点' },
  50: '中间',
  100: { style: { color: 'green' }, label: '终点' },
};
</script>
<template>
  <OSlider v-model="val" :marks="marks" />
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础滑动 | `v-model` | 最简用法 |
| 带输入框 | `show-input` + `unit` | 精确数值 |
| 间隔分段 | `show-stops` + `:step` | 离散选择 |
| 带标记 | `:marks` + `show-stops` | 档位标签 |
| 范围选择 | `range` + `v-model="[min, max]"` | 区间选择 |
| 禁用 | `disabled` | 只读 |
| 无气泡 | `:show-popover="false"` | 隐藏提示 |
| 自定义范围 | `:min` + `:max` + `:step` | 限定范围 |
| 自定义单位插槽 | `show-input` + `#unit` | 复杂单位内容 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--slider-height` | `32px` | 滑动条整体高度 |
| `--slider-runway-wrap-padding` | `0 4px` | 轨道容器内边距 |
| `--slider-runway-wrap-bg` | `var(--o-color-control4)` | 轨道容器背景色 |
| `--slider-runway-height` | `4px` | 轨道高度（间隔模式 8px） |
| `--slider-bar-height` | `4px` | 进度条高度（间隔模式 10px） |
| `--slider-bar-bg` | `var(--o-color-control2)` | 进度条颜色 |
| `--slider-btn-width` | `16px` | 滑块按钮宽度（间隔模式 20px，悬停时 24px） |
| `--slider-btn-bg` | `var(--o-color-info1-inverse)` | 滑块按钮背景色 |
| `--slider-btn-border` | `4px solid var(--o-color-control4)` | 滑块按钮边框 |
| `--slider-btn-shadow` | `var(--o-shadow-1)` | 滑块按钮阴影 |
| `--slider-circle-width` | `6px` | 滑块内圆宽度（showStops 时显示） |
| `--slider-circle-bg` | `var(--o-color-main1)` | 滑块内圆颜色 |
| `--slider-stop-width` | `2px` | 刻度点宽度 |
| `--slider-stop-bg` | `var(--o-color-info4)` | 刻度点颜色（已到达时为白色） |
| `--slider-marks-font-size` | `var(--o-font_size-tip1)` | 标记文字字号 |
| `--slider-marks-line-height` | `var(--o-line_height-tip1)` | 标记文字行高 |
| `--slider-marks-gap` | `8px` | 标记文字与轨道间距 |
| `--slider-input-width` | `60px` | 输入框宽度 |
| `--slider-input-unit-gap` | `8px` | 输入框与单位文字间距 |
| `--slider-popover-font-size` | `var(--o-font_size-text1)` | 气泡文字字号 |
| `--slider-popover-line-height` | `var(--o-line_height-text1)` | 气泡文字行高 |
| `--slider-unit-font-size` | `var(--o-font_size-tip2)` | 单位文字字号 |
| `--slider-unit-line-height` | `var(--o-line_height-tip2)` | 单位文字行高 |
| `--sldier-unit-color` | `var(--o-color-info3)` | 单位文字颜色（⚠️ 源码拼写错误，实为 `sldier` 非 `slider`，覆盖时必须使用此错误拼写） |

**使用示例**：
```vue
<OSlider v-model="value" style="--slider-bar-bg: var(--o-color-success1); --slider-btn-width: 20px" />
```

### 响应式行为表
|------|---------|-----------|---------|
| 气泡文字 | 标准 | tip1 | 标准 |
| 滑块按钮宽度 | 24px | 16px | 16px |
| 刻度点宽度 | 3px | 2px | 2px |
| 间隔模式轨道高度 | 12px | 8px | 8px |
| 间隔模式进度条高度 | 16px | 10px | 10px |

### 组件布局结构

**桌面端 >1440px（水平模式 direction="h"）**
```yaml
layout:
  direction: horizontal
  class: o-slider
  height: 32px
  regions:
    - name: runway-wrap
      flex: 1
      padding: "0 4px"
      background: var(--o-color-control4)
      children:
        - name: runway
          class: o-slider-runway
          height: 4px  # 间隔模式 8px
          position: relative
          children:
            - name: bar
              class: o-slider-bar
              height: 4px  # 间隔模式 10px
              background: var(--o-color-control2)  # 间隔模式使用 main2 渐变
              description: 已选进度条，宽度和位置动态计算
            - name: first-button
              type: OSliderButton
              width: 16px  # 间隔模式 20px
              border: "4px solid var(--o-color-control4)"
              shadow: var(--o-shadow-1)
              description: 第一个滑块按钮，始终存在
            - name: second-button
              type: OSliderButton
              condition: range=true
              description: 第二个滑块按钮，范围模式时存在
            - name: stops
              condition: showStops=true
              children: "等距圆点，宽 2px，颜色 info4（已达到的为白色）"
            - name: marks
              condition: marks 属性存在
              children: "OSliderMarker 列表，轨道下方的文字标记"
              font-size: var(--o-font_size-tip1)
              gap: 8px
    - name: input-wrap
      condition: showInput=true && range=false
      gap: 12px
      children:
        - name: input
          type: OInputNumber
          width: 60px
          round: pill
        - name: unit
          type: slot/text
          font-size: var(--o-font_size-tip2)
          color: var(--o-color-info3)
  popover:
    font-size: var(--o-font_size-text1)
    padding: "2px 6px"
    position: bottom  # 默认
```

**垂直模式 direction="v"**
```yaml
# 轨道纵向排列，高度由 height 属性控制
# 滑块按钮沿垂直方向拖拽
# 输入框不可用（showInput 无效）
```

**≤1440px**
```yaml
# 气泡文字: font_size-tip1
```

**≤840px**
```yaml
# 滑块按钮: 24px
# 刻度点: 3px
# 间隔模式轨道高度: 12px, 进度条高度: 16px
```

### 设计稿识别指南

**视觉特征指纹**

1. 水平细长轨道条 + 圆形滑块按钮 + 着色进度条 → 匹配 OSlider（连续模式）
2. 轨道上有等距圆点 + 滑块按钮较大且有内圆 → 匹配 OSlider（showStops 间隔模式）
3. 两个滑块按钮 + 中间区域着色 → 匹配 OSlider（range 范围模式）
4. 轨道右侧有数值输入框+单位 → 匹配 OSlider（showInput 模式）
5. 轨道下方有等距文字标签（如 0kg, 100kg）→ 匹配 OSlider（marks 标记模式）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 轨道方向 | 水平 | direction | `'h'` | 默认 |
| 轨道方向 | 垂直 | direction | `'v'` | — |
| 滑块数量 | 1 个 | range | `false` | 默认 |
| 滑块数量 | 2 个 | range | `true` | — |
| 轨道上有圆点 | 等距刻度圆点 | showStops | `true` | — |
| 轨道下方有文字 | 位置+标签文字 | marks | `Record<number, string>` | — |
| 右侧有输入框 | 数值输入+单位 | showInput | `true` | — |
| 输入框右侧文字 | 如 "kg"、"M" | unit | 字符串 | — |
| 滑块上有气泡 | 显示数值 | showPopover | `true` | 默认 |
| 无气泡 | — | showPopover | `false` | — |
| 灰色不可拖拽 | — | disabled | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OSlider | OProgress | OProgress 是只读进度条无滑块按钮，OSlider 有可拖拽圆形滑块 |
| OSlider | OInputNumber | OInputNumber 是独立数字输入控件，OSlider 以拖拽轨道为核心，输入框为辅助 |
| OSlider（range） | 双 OInputNumber | 范围滑动条有轨道+两个滑块，双输入框无轨道 |

