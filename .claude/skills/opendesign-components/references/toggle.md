> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OToggle 选择块

## Part A：设计理解卡

OToggle 是选择块组件（按钮式切换），用于表示选中/未选中状态。可独立使用，也可作为 OCheckbox 或 ORadio 的自定义渲染载体。支持圆角、前缀图标、禁用。

### 值

**checked**（属性）：是否选中（v-model:checked 双向绑定）。受控模式下由外部控制选中状态。

**defaultChecked**（属性）：非受控模式下是否默认选中。默认不选中。

### 外观

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

**icon**（属性）：前缀图标组件。也可通过 icon 插槽自定义。

### 状态

**disabled**（属性）：是否禁用。禁用后点击无效。默认关闭。

### 特殊行为

当 OToggle 作为 OCheckbox 或 ORadio 的子组件时，其点击事件会被屏蔽（不触发自身 change），由父级 checkbox/radio 控制选中状态。

### 插槽区域

**icon 插槽**（插槽）：前缀图标区域。使用后 icon 属性失效。

**default 插槽**（插槽）：按钮内容文字。

### 事件

**change**（事件）：独立使用时，选中状态变化后触发。可获取新的选中值和原始事件。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），按钮高度缩至 28px，文字和图标缩小；在平板竖屏及以下（≤840px），内边距进一步减小。

🧩 **布局结构**：选择块内部水平排列，从左到右依次为：前缀图标区（可选）、文字内容区。有 checked/unchecked 两种视觉状态，选中时显示品牌色边框，未选中时为灰色填充背景。按钮高度 36px（桌面端），水平内边距 15px，图标与文字间距 4px。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [prefix(前缀图标), default(文字内容)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：矩形按钮式选项块，有选中（品牌色边框）和未选中（灰色填充）两种状态；类似按钮但用于状态切换而非触发操作 → 匹配 OToggle
- **Token → Prop 映射**：选中态蓝色边框 + 蓝色文字 → checked 状态（`--o-color-primary1`）；未选中灰色填充背景 → 未选中状态；按钮前有图标 → icon 属性或 icon 插槽；半圆角胶囊形 → round="pill"；灰色不可点击 → disabled
- **易混淆组件区分**：与 OButton 区分——OButton 触发操作无选中态，OToggle 切换选中/未选中状态；与 OSwitch 区分——OSwitch 是滑动开关用于布尔开关，OToggle 是按钮式选择块通常用于多选/单选场景；与 OCheckbox/ORadio 区分——OToggle 可作为 OCheckbox/ORadio 的自定义渲染子组件，此时由父级控制选中

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OToggle } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| checked | `boolean` | — | `undefined` | 是否选中（v-model:checked） |
| defaultChecked | `boolean` | — | `false` | 默认选中 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| icon | `Component` | — | — | 前缀图标组件 |
| disabled | `boolean` | — | `false` | 禁用 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:checked | `(val: boolean)` | 选中状态变化时 |
| change | `(val: boolean, ev: MouseEvent)` | 选中状态变化后 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| icon | — | 有 icon prop 或 icon 插槽时 | 前缀图标 | `<component :is="icon" />` |
| default | — | 始终 | 按钮文字 | 无 |

### 典型使用场景与调用模板

**场景 1：独立使用**
适用于：单个选项切换
```vue
<script setup>
import { ref } from 'vue';
const selected = ref(false);
</script>
<template>
  <OToggle v-model:checked="selected">选项 A</OToggle>
</template>
```

**场景 2：带图标**
适用于：图标+文字的选择按钮
```vue
<OToggle v-model:checked="selected" :icon="OIconStar">收藏</OToggle>
```

**场景 3：作为 Checkbox 自定义渲染**
适用于：多选的按钮式选择
```vue
<OCheckboxGroup v-model="selectedFruits">
  <OCheckbox value="apple"><OToggle>苹果</OToggle></OCheckbox>
  <OCheckbox value="banana"><OToggle>香蕉</OToggle></OCheckbox>
  <OCheckbox value="orange"><OToggle>橘子</OToggle></OCheckbox>
</OCheckboxGroup>
```

**场景 4：作为 Radio 自定义渲染（单选按钮组）**
适用于：单选的按钮式选择，设计稿中无 radio 圆圈指示器，只有 Toggle 样式按钮
> ⚠️ 必须使用 ORadio 的 `#radio` 插槽（完全替换整个选中指示器+文字区域）。
> 若放在 default slot 中，ORadio 的圆形指示器仍会渲染，需额外 CSS 隐藏。
```vue
<ORadioGroup v-model="selected">
  <ORadio value="monthly">
    <template #radio="{ checked }">
      <OToggle :checked="checked">月付</OToggle>
    </template>
  </ORadio>
  <ORadio value="yearly">
    <template #radio="{ checked }">
      <OToggle :checked="checked">年付</OToggle>
    </template>
  </ORadio>
</ORadioGroup>
```

**场景 5：圆角胶囊**
适用于：紧凑标签式选择
```vue
<OToggle v-model:checked="selected" round="pill">标签</OToggle>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础切换 | `v-model:checked` | 独立使用 |
| 带图标 | `:icon` 或 `#icon` 插槽 | 图标+文字 |
| 胶囊 | `round="pill"` | 圆角按钮 |
| 多选组 | 作为 OCheckbox 子组件 | 自身 change 屏蔽 |
| 单选组 | 作为 ORadio `#radio` 插槽 | 自身 change 屏蔽，radio 圆圈被替换 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--toggle-size` | `var(--o-control_size-m)`（桌面 36px） | 按钮高度 |
| `--toggle-padding` | `0 15px` | 水平内边距 |
| `--toggle-radius` | `var(--o-radius_control-s)` | 圆角（pill 时为 `var(--o-control_size-l)`） |
| `--toggle-gap` | `4px` | 图标与文字间距 |
| `--toggle-text-size` | `var(--o-font_size-text1)` | 文字字号 |
| `--toggle-icon-size` | `var(--o-icon_size_control-m)` | 图标尺寸 |

**使用示例**：
```vue
<!-- 将 Toggle 内边距从默认 0 15px 改为 0 8px -->
<OToggle style="--toggle-padding: 0 8px">标签</OToggle>
```

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| 按钮高度 | 28px | 28px | 36px |
| 文字 | tip1 | tip1 | text1 |
| 图标 | 控件 xs | 控件 xs | 控件 m |
| 内边距 | 0 11px | 0 15px | 0 15px |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  element: div.o-toggle
  direction: horizontal
  align: center
  height: 36px  # --toggle-size, var(--o-control_size-m)
  padding: 0 15px  # --toggle-padding
  border-radius: var(--o-radius_control-s)  # --toggle-radius
  gap: 4px  # --toggle-gap
  regions:
    - name: prefix
      element: span.o-toggle-prefix
      condition: 有 icon prop 或 icon 插槽时
      children:
        - { type: slot, name: icon }  # 或 component :is="icon"
      icon-size: var(--o-icon_size_control-m)  # --toggle-icon-size
    - name: content
      children:
        - { type: slot, name: default }  # 按钮文字
      font-size: text1
  states:
    unchecked:
      color: var(--o-color-info1)
      bg: var(--o-color-fill1)
      border: var(--o-color-fill1)
    checked:
      color: var(--o-color-primary1)
      bg: transparent
      border: var(--o-color-primary1)
    disabled:
      color: var(--o-color-info4)
      bg: transparent
      border: transparent
  variants:
    pill: { border-radius: "var(--o-control_size-l)" }
```

**≤1440px**
```yaml
# height: 28px, font-size: tip1, icon-size: xs
```

**≤840px**
```yaml
# padding: 0 11px
```

### 设计稿识别指南

**视觉特征指纹**

1. 矩形按钮式选项块 + 有选中（蓝色边框+蓝色文字）和未选中（灰色填充背景）两种状态 → 匹配 OToggle
2. 一组按钮式选项排列，可多选或单选 → 匹配 OToggle（配合 OCheckboxGroup 或 ORadioGroup）
3. 胶囊形选择标签 + 有选中态切换 → 匹配 OToggle（round="pill"）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 选中态边框 | `--o-color-primary1` 蓝色 | checked | `true` | v-model:checked |
| 选中态文字 | `--o-color-primary1` 蓝色 | checked | `true` | — |
| 未选中态背景 | `--o-color-fill1` 灰色 | checked | `false` | — |
| 前缀图标 | 有 | icon | 组件引用 | 或 #icon 插槽 |
| border-radius | 全圆角 | round | `'pill'` | — |
| 灰色不可点击 | 有 | disabled | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OToggle | OButton | OButton 触发操作无选中/未选中状态切换，OToggle 用于状态选择 |
| OToggle | OSwitch | OSwitch 是滑动开关形态（椭圆轨道+圆形滑块），OToggle 是矩形按钮形态 |
| OToggle | OTag | OTag 是静态标签无选中状态交互，OToggle 可切换选中状态 |
| OToggle | OCheckbox | OCheckbox 是勾选框形态（方框+勾号），OToggle 是按钮块形态；OToggle 可作为 OCheckbox 的子组件渲染 |
