> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# ORadio 单选框

## Part A：设计理解卡

ORadio 是单选框组件，让用户从多个选项中选择一个。包含 ORadio（单选框）和 ORadioGroup（单选框组）。支持受控/非受控模式、禁用状态、自定义渲染。

### 值

**modelValue**（属性）：选中的值（v-model 双向绑定）。当与 value 相等时该单选框被选中。

**value**（属性）：该单选框代表的值。必填。点击时此值被设为 modelValue。

**defaultChecked**（属性）：非受控模式下是否默认选中。默认关闭。

### 状态

**disabled**（属性）：是否禁用。禁用后点击无效、样式变灰。默认关闭。在 ORadioGroup 内时，Group 的 disabled 会覆盖单个 Radio 的设置。

### 自定义渲染

**radio 插槽**（插槽）：完全替换单选框的渲染（包括圆点和文字）。可获取 checked（是否选中）和 disabled（是否禁用），用于自定义外观。

**default 插槽**（插槽）：单选框的文字标签。

---

### ORadioGroup 单选框组

**modelValue**（属性）：选中的值（v-model 双向绑定）。

**defaultValue**（属性）：非受控模式下的默认值。

**disabled**（属性）：整组禁用。默认关闭。

**direction**（属性）：排列方向。"h" 水平排列、"v" 垂直排列。默认水平。

### 事件

**change**（事件）：选中值变化时触发。可获取新选中的值和原始事件。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），单选框文字缩小。

🧩 **布局结构**：单个 ORadio 为 label 元素，内部横向排列——左侧圆形选中指示器区 + 右侧文字标签。ORadioGroup 为 div 容器，根据 direction 属性水平（flex-direction: row）或垂直（flex-direction: column）排列内部的 ORadio 子项。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: row (单个 radio 内部)
regions: [radio-input-wrap(圆形指示器), radio-label(文字标签)]
# ORadioGroup
direction: row | column (由 direction prop 决定)
regions: [ORadio, ORadio, ...]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：小圆形指示器 + 右侧文字标签；选中时圆形填充主题色并显示内部白色圆点；多个选项互斥只能选一个
- **Token → Prop 映射**：圆形指示器填充主题色 → 选中状态；灰色不可点击 → disabled=true；多个单选框水平排列 → direction="h"；垂直排列 → direction="v"
- **易混淆组件区分**：与 OCheckbox（多选框）区分——ORadio 为圆形可单选互斥，OCheckbox 为方形可多选；与 OSelect（选择器）区分——ORadio 所有选项同时可见，OSelect 选项收纳在下拉面板中
- **⚠️ 必填星号 → 用 OFormItem 包裹**：设计稿中单选框旁边的标签有红色星号（必填），应将 ORadio/ORadioGroup 放入 `<OFormItem required>` 实现，**不要**手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ORadio, ORadioGroup } from '@opensig/opendesign';
</script>
```

### ORadio Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number \| boolean` | — | — | 单选框值（必填） |
| modelValue | `string \| number \| boolean` | — | — | 绑定值（v-model） |
| defaultChecked | `boolean` | — | `false` | 默认选中 |
| disabled | `boolean` | — | `false` | 禁用 |
| inputId | `string` | — | 自动生成 | input 元素 id |

### ORadioGroup Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string \| number \| boolean` | — | — | 绑定值（v-model） |
| defaultValue | `string \| number \| boolean` | — | `''` | 默认值 |
| disabled | `boolean` | — | `false` | 整组禁用 |
| direction | `DirectionT` | `'h'` / `'v'` | `'h'` | 排列方向 |

### ORadio Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: string \| number \| boolean)` | 选中时 |
| change | `(val: string \| number \| boolean, ev: Event)` | 选中变化时 |

### ORadioGroup Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: string \| number \| boolean)` | 选中值变化 |
| change | `(val: string \| number \| boolean, ev: Event)` | 选中值变化 |

### Slots 表

#### ORadio Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| radio | `{ checked: boolean, disabled: boolean }` | 始终 | 整个单选框（圆点+文字） | 默认圆点 + label |
| default | — | 未使用 radio 插槽时 | 文字标签 | 无 |

#### ORadioGroup Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 单选框列表 | 无 |

### 暴露属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| checked | `ComputedRef<boolean>` | 当前是否选中 |

### 典型使用场景与调用模板

**场景 1：独立单选框**
适用于：两个选项的简单选择
```vue
<script setup>
import { ref } from 'vue';
const value = ref(1);
</script>
<template>
  <ORadio v-model="value" :value="1">选项1</ORadio>
  <ORadio v-model="value" :value="2">选项2</ORadio>
</template>
```

**场景 2：单选框组**
适用于：多选项单选
```vue
<script setup>
import { ref } from 'vue';
const value = ref('a');
</script>
<template>
  <ORadioGroup v-model="value">
    <ORadio value="a">选项 A</ORadio>
    <ORadio value="b">选项 B</ORadio>
    <ORadio value="c">选项 C</ORadio>
  </ORadioGroup>
</template>
```

**场景 3：垂直排列**
适用于：表单中的垂直选项列表
```vue
<ORadioGroup v-model="value" direction="v">
  <ORadio value="a">选项 A</ORadio>
  <ORadio value="b">选项 B</ORadio>
</ORadioGroup>
```

**场景 4：禁用状态**
适用于：不可操作的选项
```vue
<ORadio v-model="value" :value="1" disabled>已禁用</ORadio>
```

**场景 5：自定义渲染**
适用于：卡片式选择、图标式选择等
```vue
<ORadio v-model="value" :value="1">
  <template #radio="{ checked }">
    <div :class="['custom-radio', { active: checked }]">
      自定义选项 {{ checked ? '✓' : '' }}
    </div>
  </template>
</ORadio>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础单选 | ORadioGroup + `v-model` | 最常见用法 |
| 垂直排列 | `direction="v"` | 纵向列表 |
| 整组禁用 | ORadioGroup `disabled` | 一键禁用 |
| 自定义外观 | `#radio` 插槽 | 完全自定义 |
| 表单校验 | ORadioGroup 放在 OFormItem 内 | 自动校验 |

### 可覆盖的 CSS 变量

在调用处通过覆盖以下变量调整组件外观，**无需 `:deep` hack**：

**ORadioGroup 变量**

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--radio-group-gap` | 水平 `24px` / 垂直 `16px` | Radio 子项之间的间距 |

**ORadio 变量**

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--radio-label-gap` | `8px` | 圆形指示器与文字标签的间距 |
| `--radio-text-size` | `var(--o-font_size-text1)` | 文字字号 |
| `--radio-input-wrap-size` | `var(--o-control_size-s)` | 圆形指示器容器尺寸 |

**使用示例**：
```vue
<!-- 将 Radio 组间距覆盖为设计稿对应的 token（不要用硬编码 px） -->
<ORadioGroup v-model="value" style="--radio-group-gap: var(--o-gap-2)">
  <ORadio value="a">选项 A</ORadio>
  <ORadio value="b">选项 B</ORadio>
</ORadioGroup>
```

> ⚠️ **注意**：
> - 覆盖值必须使用 token 变量（如 `var(--r-o-gap-2)`），不要直接写 `8px`。token 变量在不同断点下会自动缩放，硬编码 px 不会。
> - 若同时在父元素上设置 `gap`（flex/grid），会与 `--radio-group-gap`（margin 实现）叠加，导致间距偏大。只需覆盖 `--radio-group-gap`，不要额外设置 `gap`。

### 响应式行为表

| 维度 | ≤1440px | >1440px |
|------|---------|---------|
| 文字 | tip1 | 标准 |

### 组件布局结构

**ORadio 单个单选框**
```yaml
layout:
  tag: label
  direction: horizontal
  align: center
  regions:
    - name: radio-wrap
      direction: horizontal
      align: center
      children:
        - name: radio-input-wrap
          description: 圆形选中指示器容器
          size: var(--radio-input-wrap-size)  # 控件 s
          children:
            - name: radio-input
              description: 圆形指示器
              size: var(--radio-input-size)  # 控件 xs
              border: 1px solid var(--radio-input-bd-color)
              border-radius: 50%
              bg-color: var(--radio-input-bg-color)
              checked:
                bg-color: var(--radio-input-bg-color-checked)
                inner-dot: var(--radio-input-icon-size) 白色圆点
        - name: radio-label
          description: 文字标签
          gap: var(--radio-label-gap)  # 8px
          font-size: var(--radio-text-size)  # text1
          line-height: var(--radio-text-height)
          children:
            - { type: slot, name: default }
  states:
    checked: radio-input 填充主题色 + 白色内圆点
    disabled: 整体灰色，不可点击
  custom-slot: { name: radio, replaces: 整个 radio-input-wrap + radio-label }
```

**ORadioGroup 单选框组**
```yaml
layout:
  tag: div
  direction: horizontal | vertical  # 由 direction prop 决定
  class: o-radio-group-h | o-radio-group-v
  children:
    - { type: slot, name: default }  # ORadio 子项
```

**≤1440px**
```yaml
# 文字缩小
# --radio-text-size: tip1
# --radio-text-height: tip1
```

### 设计稿识别指南

**视觉特征指纹**

1. 小圆形空心指示器 + 右侧文字标签 → 匹配 ORadio（未选中）
2. 圆形填充主题色 + 中心白色圆点 + 右侧文字标签 → 匹配 ORadio（选中）
3. 多个单选框水平/垂直排列、互斥选择 → 匹配 ORadioGroup

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 指示器状态 | 填充主题色 + 白色圆点 | modelValue | 等于该项 value | 选中态 |
| 指示器状态 | 空心灰色边框 | modelValue | 不等于该项 value | 未选中态 |
| 整体颜色 | 灰色不可交互 | disabled | `true` | — |
| 排列方向 | 水平排列 | direction | `'h'` | 默认值 |
| 排列方向 | 垂直排列 | direction | `'v'` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| ORadio | OCheckbox | ORadio 圆形指示器、互斥单选；OCheckbox 方形带勾号、可多选 |
| ORadioGroup | OSelect | ORadioGroup 所有选项同时可见平铺展示；OSelect 选项隐藏在下拉面板中 |
| ORadio（自定义插槽） | OToggle | OToggle 是独立分段切换器；ORadio #radio 插槽自定义后也可呈现卡片式但语义仍为单选 |

