> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OSwitch 开关

## Part A：设计理解卡

OSwitch 是开关组件，用于两种状态之间的切换。支持自定义选中/未选中值、加载状态、切换前拦截、自定义滑块图标和状态文字。

### 值

**modelValue**（属性）：开关的值（v-model 双向绑定）。等于 checkedValue 时为开启状态，等于 uncheckedValue 时为关闭状态。

**defaultChecked**（属性）：非受控模式下是否默认开启。默认关闭。

**checkedValue**（属性）：开启状态对应的值。默认 true。

**uncheckedValue**（属性）：关闭状态对应的值。默认 false。

### 外观

**size**（属性）：开关尺寸。"medium" 中号、"small" 小号。默认 medium。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 状态

**disabled**（属性）：是否禁用。禁用后点击无效。默认关闭。

**loading**（属性）：是否加载中。加载时滑块显示旋转图标，同时自动禁用点击。默认关闭。

### 拦截

**beforeChange**（属性）：状态改变前的钩子函数。返回 true 或 Promise\<true\> 允许切换，返回 false 或 Promise\<false\> 阻止切换。适合异步确认场景。

### 插槽区域

**active 插槽**（插槽）：开启状态时滑块内的图标。loading 时被加载图标替换。

**inactive 插槽**（插槽）：关闭状态时滑块内的图标。loading 时被加载图标替换。

**on 插槽**（插槽）：开启状态时开关右侧的文字/图标标签。

**off 插槽**（插槽）：关闭状态时开关右侧的文字/图标标签。

### 事件

**change**（事件）：状态切换后触发。可获取新的值和原始事件。

📱 **响应式行为**：本组件无响应式差异。

🧩 **布局结构**：开关为水平排列容器，内部包含滑块轨道（wrap）和可选文字标签。轨道内有一个圆形滑块（handler），滑块内可显示图标（active/inactive 插槽）或加载动画。开启时滑块滑向右侧，轨道背景变为品牌色；关闭时滑块在左侧，轨道背景为灰色。文字标签（on/off 插槽）显示在轨道右侧。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [wrap(handler(icon) + label(on/off文字))]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：圆角矩形轨道 + 内嵌圆形滑块 + 两种状态切换（左/右位置） → 匹配 OSwitch；轨道右侧有 ON/OFF 文字 → 有 on/off 插槽；滑块内有太阳/月亮等图标 → 有 active/inactive 插槽
- **Token → Prop 映射**：轨道高度 32px（control_size-s）→ size="medium"（默认）；轨道高度 24px（control_size-xs）→ size="small"；全圆角 → round="pill"；蓝色轨道背景 → 开启状态（checked）；灰色轨道背景 → 关闭状态（unchecked）；滑块内有旋转图标 → loading=true
- **易混淆组件区分**：与 OCheckbox 区分——OCheckbox 是方形勾选框+文字标签，OSwitch 是圆角滑动轨道+圆形滑块；与 ORadio 区分——ORadio 是圆形单选按钮组，OSwitch 是单个开关切换器
- **⚠️ 必填星号 → 用 OFormItem 包裹**：设计稿中开关控件标签旁有红色星号（必填），应将 OSwitch 放入 `<OFormItem required>` 实现，**不要**手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OSwitch } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type SwitchSizeT = 'medium' | 'small';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string \| number \| boolean` | — | `undefined` | 绑定值（v-model） |
| defaultChecked | `boolean` | — | `false` | 默认开启 |
| checkedValue | `string \| number \| boolean` | — | `true` | 开启状态值 |
| uncheckedValue | `string \| number \| boolean` | — | `false` | 关闭状态值 |
| size | `SwitchSizeT` | `'medium'` / `'small'` | `'medium'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| disabled | `boolean` | — | `false` | 禁用 |
| loading | `boolean` | — | `false` | 加载中 |
| beforeChange | `(val: boolean) => Promise<boolean> \| boolean` | — | — | 切换前拦截 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: string \| number \| boolean)` | 状态变化时 |
| change | `(val: string \| number \| boolean, ev: Event)` | 状态切换后 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| active | — | 开启状态且未 loading 时 | 滑块图标 | 无 |
| inactive | — | 关闭状态且未 loading 时 | 滑块图标 | 无 |
| on | — | 开启状态时 | 开关文字标签 | 无 |
| off | — | 关闭状态时 | 开关文字标签 | 无 |

### 典型使用场景与调用模板

**场景 1：基础开关**
适用于：功能启用/禁用
```vue
<script setup>
import { ref } from 'vue';
const enabled = ref(false);
</script>
<template>
  <OSwitch v-model="enabled" />
</template>
```

**场景 2：自定义值**
适用于：非布尔值切换
```vue
<OSwitch v-model="fruit" checked-value="apple" unchecked-value="banana" />
```

**场景 3：带状态文字**
适用于：明确标识当前状态
```vue
<OSwitch v-model="enabled">
  <template #on>ON</template>
  <template #off>OFF</template>
</OSwitch>
```

**场景 4：带图标的主题切换**
适用于：深色/浅色模式切换
```vue
<OSwitch v-model="isDark" default-checked>
  <template #active><OIconSun /></template>
  <template #inactive><OIconMoon /></template>
  <template #on><OIconMoon /></template>
  <template #off><OIconSun /></template>
</OSwitch>
```

**场景 5：异步切换确认**
适用于：需要后端验证的切换
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(false);
const beforeChange = (val) => {
  return new Promise((resolve) => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      resolve(true);
    }, 1000);
  });
};
</script>
<template>
  <OSwitch :before-change="beforeChange" :loading="loading" />
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础开关 | `v-model` | 最常见 |
| 自定义值 | `checked-value` + `unchecked-value` | 非布尔值 |
| 带文字 | `#on` + `#off` 插槽 | 状态标签 |
| 异步切换 | `:before-change` + `:loading` | 后端验证 |
| 圆角 | `round="pill"` | 半圆按钮 |
| 小号 | `size="small"` | 紧凑场景 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--switch-radius` | `var(--o-control_size-s)` | 开关轨道圆角半径（pill 模式下为 control_size-l） |
| `--switch-color` | `var(--o-color-info4)` | 开关文字/图标颜色（选中后为 info1-inverse） |
| `--switch-bg-color` | `var(--o-color-control1-light)` | 未选中状态背景色 |
| `--switch-bg-color-hover` | `var(--o-color-control2-light)` | 未选中 hover 背景色 |
| `--switch-bg-color-active` | `var(--o-color-control3-light)` | 未选中 active 背景色 |
| `--switch-bg-color-disabled` | `var(--o-color-control4-light)` | 未选中禁用背景色 |
| `--switch-bg-color-checked` | `var(--o-color-primary1)` | 选中状态背景色 |
| `--switch-bg-color-checked-hover` | `var(--o-color-primary2)` | 选中 hover 背景色 |
| `--switch-bg-color-checked-active` | `var(--o-color-primary3)` | 选中 active 背景色 |
| `--switch-bg-color-checked-disabled` | `var(--o-color-primary4)` | 选中禁用背景色 |
| `--switch-handler-bg-color` | `var(--o-color-white)` | 滑块背景色 |
| `--switch-icon-loading-color` | `var(--o-color-primary1)` | 加载图标颜色 |
| `--switch-min-width` | `40px`（medium）/ `28px`（small） | 开关最小宽度 |
| `--switch-size` | `var(--o-control_size-s)`（medium） | 开关轨道高度 |
| `--switch-text-size` | `var(--o-font_size-text1)`（medium） | 文字标签字号 |
| `--switch-text-height` | `var(--o-line_height-text1)`（medium） | 文字标签行高 |
| `--switch-handler-size` | `var(--o-control_size-xs)`（medium） | 滑块尺寸 |
| `--switch-handler-offset` | `4px` | 滑块与轨道边缘距离 |
| `--switch-label-padding` | `6px`（medium）/ `4px`（small） | 文字标签与轨道的间距 |

**使用示例**:
```vue
<OSwitch style="--switch-bg-color-checked: var(--o-color-success1)" v-model="enabled" />
```

### CSS 变量

| 变量名 | 说明 |
|--------|------|
| `--switch-color` | 开关颜色 |
| `--switch-text-size` | 文字大小 |
| `--switch-text-height` | 文字行高 |

### 响应式行为表

本组件无响应式差异。

### 组件布局结构

**桌面端（无响应式变化）**
```yaml
layout:
  direction: horizontal
  class: o-switch o-switch-{size}
  min-width: 40px  # medium; small 为 28px
  height: var(--o-control_size-s)  # medium 32px; small 24px
  border-radius: var(--o-control_size-s)  # pill 模式为 control_size-l
  cursor: pointer
  regions:
    - name: wrap
      class: o-switch-wrap
      direction: horizontal
      align: center
      children:
        - name: handler
          class: o-switch-handler
          width: var(--o-control_size-xs)  # medium; small 为 control_size-2xs - 4px
          height: 同 width
          border-radius: 50%
          background: var(--o-color-white)
          offset: 4px  # --switch-handler-offset
          transition: 左右滑动
          children:
            - name: loading-icon
              condition: loading=true
              class: o-switch-icon-loading o-rotating
              type: IconLoading
            - name: icon-wrap
              condition: "(active/inactive 插槽存在) && loading=false"
              class: o-switch-icon-wrap
              children:
                - { type: slot, name: active, condition: "checked" }
                - { type: slot, name: inactive, condition: "!checked" }
        - name: label
          class: o-switch-label
          condition: "on/off 插槽存在"
          padding-left: 6px  # medium; small 为 4px
          children:
            - { type: slot, name: "on", condition: "checked" }
            - { type: slot, name: "off", condition: "!checked" }
  states:
    unchecked:
      background: var(--o-color-control1-light)
      handler-position: left
    checked:
      background: var(--o-color-primary1)
      handler-position: right
    disabled:
      cursor: not-allowed
      handler-bg: "rgba(white, 0.6)"
    loading:
      cursor: not-allowed
      handler-icon: rotating spinner
  custom-icon-mode:
    description: "当有 active/inactive 插槽时，滑块背景变为 primary1，checked 时轨道背景不变"
    handler-bg: var(--o-color-primary1)
    handler-color: var(--o-color-info1-inverse)
```

### 设计稿识别指南

**视觉特征指纹**

1. 圆角矩形轨道（宽约 40px，高约 32px）+ 内嵌白色圆形滑块 → 匹配 OSwitch
2. 滑块在左侧 + 灰色轨道 → 关闭状态
3. 滑块在右侧 + 蓝色/品牌色轨道 → 开启状态
4. 滑块内有旋转图标 → loading=true
5. 轨道右侧有文字（ON/OFF 等） → 使用 on/off 插槽

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 轨道高度 | 32px（control_size-s） | size | `'medium'` | 默认 |
| 轨道高度 | 24px（control_size-xs） | size | `'small'` | — |
| 轨道宽度 | ≥40px | size | `'medium'` | 默认 |
| 轨道宽度 | ≥28px | size | `'small'` | — |
| 圆角 | 全圆角（半圆） | round | `'pill'` | — |
| 轨道背景色 | `--o-color-primary1` 蓝色 | — | — | checked 状态 |
| 轨道背景色 | `--o-color-control1-light` 灰色 | — | — | unchecked 状态 |
| 滑块内图标 | 旋转加载 | loading | `true` | — |
| 整体灰色半透明 | — | disabled | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OSwitch | OCheckbox | OCheckbox 是方形勾选框+右侧文字标签，OSwitch 是圆角矩形轨道+滑动圆形滑块 |
| OSwitch | ORadio | ORadio 是圆形单选按钮组（多选一），OSwitch 是单个二态切换器 |
| OSwitch | OButton（toggle） | OButton 是矩形按钮点击交互，OSwitch 有滑动轨道和圆形滑块的特征视觉 |

