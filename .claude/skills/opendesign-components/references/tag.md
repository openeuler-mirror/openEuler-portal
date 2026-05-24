> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OTag 标签

## Part A：设计理解卡

OTag 是标签组件，用于标记和分类信息。支持六种颜色、两种样式、三种尺寸、可关闭、关闭前拦截、自定义图标。

### 外观

**color**（属性）：标签颜色。"normal" 默认、"info" 信息、"primary" 主色、"success" 成功、"warning" 警告、"danger" 危险。默认 normal。

**variant**（属性）：标签样式。"solid" 实心填充、"outline" 线框描边。默认 solid。

**size**（属性）：标签尺寸。"large" 大号（高度 24px，≤1680px 断点下收缩为 20px）、"medium" 中号（高度 20px，≤840px 收缩为 16px）、"small" 小号（高度 16px，文字通过 scale(0.833) 视觉缩小至约 10px）。默认 large。

**round**（属性）：圆角值。"pill" 胶囊全圆（组件 JS 注入内联样式 `--tag-radius: 100vh`，不受 CSS 变量覆盖影响）；也可传任意 CSS 长度值。

### 可见性

**visible**（属性）：是否可见（v-model 双向绑定）。用于受控模式。

**defaultVisible**（属性）：非受控模式下是否默认可见。默认可见。

### 关闭

**closable**（属性）：是否显示关闭按钮。默认关闭。

**beforeClose**（属性）：关闭前的钩子函数。返回 true 或 Promise\<true\> 允许关闭，返回 false 或 Promise\<false\> 阻止关闭。

### 插槽区域

**icon 插槽**（插槽）：标签左侧图标区域。

**default 插槽**（插槽）：标签文字内容。

### 事件

**close**（事件）：关闭按钮点击后触发（beforeClose 允许后）。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），large 标签高度缩至 20px、内边距减小；在平板竖屏及以下（≤840px），medium 标签高度缩至 xs、内容缩放 0.83。

🧩 **布局结构**：标签内部水平排列，从左到右依次为：图标区（可选）、文字标签区、关闭按钮区（closable 时显示）。图标与文字间距 2–4px（随尺寸变化）。标签高度由 size 决定（large 28px / medium 20px / small 16px），水平内边距 5–11px。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [icon(前缀图标), label(文字内容), close(关闭按钮)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：小尺寸圆角矩形色块，内含短文本，可能带图标和关闭 × 号 → 匹配 OTag；实心填充或线框描边的小标记 → 匹配 OTag
- **Token → Prop 映射**：实心填充背景 → variant="solid"；仅边框透明背景 → variant="outline"；蓝色系 → color="primary"；绿色系 → color="success"；橙色系 → color="warning"；红色系 → color="danger"；灰色系 → color="normal"；高度 24px（>1680px断点，≤1680px为20px） → size="large"，20px → size="medium"，16px → size="small"；胶囊全圆角 → round="pill"；带 × 关闭图标 → closable
- **易混淆组件区分**：与 OButton 区分——OTag 是静态标签展示用于分类标记，OButton 是交互操作触发器；与 OBadge 区分——OBadge 是附着在其他元素上的角标，OTag 是独立的标签元素；与 OToggle 区分——OToggle 有选中/未选中状态切换交互，OTag 无选中态

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OTag } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type TagColorT = 'normal' | 'info' | 'primary' | 'success' | 'warning' | 'danger';
type TagVariantT = 'solid' | 'outline';
type SizeT = 'large' | 'medium' | 'small';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| color | `TagColorT` | `'normal'` / `'info'` / `'primary'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| variant | `TagVariantT` | `'solid'` / `'outline'` | `'solid'` | 样式 |
| size | `SizeT` | `'large'` / `'medium'` / `'small'` | `'large'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角。`pill` 时组件 JS 注入 `--tag-radius: 100vh` 内联样式（完全圆形） |
| closable | `boolean` | — | `false` | 可关闭 |
| visible | `boolean` | — | `undefined` | 是否可见（v-model） |
| defaultVisible | `boolean` | — | `true` | 默认可见 |
| beforeClose | `() => Promise<boolean> \| boolean` | — | — | 关闭前拦截 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 可见状态变化时 |
| close | `(ev: MouseEvent)` | 关闭后 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| icon | — | 有 icon 插槽时 | 左侧图标 | 无 |
| default | — | 始终 | 标签文字 | 无 |

### 典型使用场景与调用模板

**场景 1：基础标签**
适用于：分类标记
```vue
<OTag>默认标签</OTag>
<OTag color="primary">主色标签</OTag>
<OTag color="success">成功标签</OTag>
<OTag color="danger">危险标签</OTag>
```

**场景 2：线框样式**
适用于：轻量标记
```vue
<OTag variant="outline" color="primary">线框标签</OTag>
```

**场景 3：带图标**
适用于：图标+文字组合标记
```vue
<OTag color="info">
  <template #icon><OIconInfo /></template>
  信息标签
</OTag>
```

**场景 4：可关闭标签**
适用于：标签可移除场景
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
<template>
  <OTag v-model:visible="visible" closable color="primary">可关闭标签</OTag>
</template>
```

**场景 5：关闭前确认**
适用于：需要确认才能移除的标签
```vue
<OTag closable :before-close="() => confirm('确定删除？')">需确认</OTag>
```

**场景 6：不同尺寸**
适用于：适配不同场景
```vue
<OTag size="large">大号</OTag>
<OTag size="medium">中号</OTag>
<OTag size="small">小号</OTag>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础标记 | `color` | 分类标签 |
| 轻量标记 | `variant="outline"` + `color` | 线框 |
| 可移除 | `closable` + `v-model:visible` | 动态标签 |
| 带确认 | `closable` + `:before-close` | 安全删除 |
| 小号圆角 | `size="small"` + `round="pill"` | 紧凑胶囊 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--tag-radius` | `var(--o-radius_control-xs)`（4px） | 标签圆角。**⚠️ pill 模式下组件通过内联样式注入 `--tag-radius: 100vh`（完全圆形），覆盖此变量无效** |
| `--tag-color` | `var(--o-color-info1)`（normal） | 标签文字颜色（随 color 变化） |
| `--tag-bg-color` | `var(--o-color-control2-light)`（normal） | 标签背景色（随 color/variant 变化）。**⚠️ 仅支持纯色**，渐变色无效（见下方「渐变背景」说明） |
| `--tag-bd-color` | `var(--o-color-control2-light)`（normal） | 标签边框颜色（随 color/variant 变化） |
| `--tag-icon-close-color` | `var(--o-color-info2)`（normal） | 关闭按钮图标颜色 |
| `--tag-icon-close-color-hover` | `var(--o-color-info1)`（normal） | 关闭按钮 hover 颜色 |
| `--tag-padding` | `0 11px`（large） | 标签水平内边距（随 size 变化） |
| `--tag-text-size` | `var(--o-font_size-tip2)` | 标签文字字号 |
| `--tag-text-height` | `var(--o-line_height-tip2)` | 标签文字行高 |
| `--tag-height` | `var(--o-control_size-s)`（large，约 28px） | 标签高度（随 size 变化） |
| `--tag-icon-size` | `var(--o-icon_size_control-xs)` | 前缀图标尺寸 |
| `--tag-icon-gap` | `4px`（large/medium）/ `2px`（small） | 图标与文字间距 |

**使用示例（纯色）**:
```vue
<OTag style="--tag-bg-color: var(--o-color-primary4); --tag-color: var(--o-color-primary1)">自定义标签</OTag>
```

**渐变背景**

OTag 内部使用 `background-color: var(--tag-bg-color)` 渲染背景，CSS 变量只支持纯色值。若需要**渐变背景**，必须通过自定义 class 直接覆盖 `background` 属性（利用 Vue scoped 样式带来的 `[data-v-xxx]` 属性选择器优先级高于组件库单类选择器的特性）：

```vue
<!-- template -->
<OTag round="pill" class="tag-gradient">标签</OTag>

<!-- scoped style -->
<style lang="scss" scoped>
.tag-gradient {
  /* background 简写会同时重置 background-color（覆盖组件内 --tag-bg-color）和设置 background-image */
  background: linear-gradient(to right, rgba(46, 83, 250, 0.15), rgba(123, 37, 244, 0.15));
  --tag-bd-color: transparent;
  --tag-color: var(--o-color-info1); /* 浅色底 → 深色字；深色底 → 浅色字 */
}
</style>
```

> **原理**：`.tag-gradient[data-v-xxx]`（specificity 0,2,0）高于组件库的 `.o-tag`（0,1,0），因此 scoped 的 `background` 规则优先生效，同时因为 `background` 简写会隐式将 `background-color` 重置为 transparent，所以不需要额外清除 `--tag-bg-color`。

**渐变色设计值参考**（运营标签 DSL 16:4646）：

| 模式 | 渐变起点 | 渐变终点 | 方向 |
|------|---------|---------|------|
| light | `rgba(46, 83, 250, 0.15)` | `rgba(123, 37, 244, 0.15)` | → 水平 |
| dark  | `rgba(84, 120, 251, 0.25)` | `rgba(152, 74, 246, 0.25)` | → 水平 |

### 响应式行为表
| large 内边距 | — | 0 7px | 0 11px |
| medium 高度 | xs(16px) | — | 20px |
| medium 缩放 | 0.833 | — | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  tag: span.o-tag
  direction: horizontal
  align: center
  border-radius: var(--o-radius_control-xs)
  regions:
    - name: icon
      element: span.o-tag-icon
      condition: 有 icon 插槽时
      children:
        - { type: slot, name: icon }
      gap: 2–4px  # --tag-icon-gap, 随 size 变化
    - name: label
      element: span.o-tag-label
      children:
        - { type: slot, name: default }  # 标签文字
    - name: close
      element: span.o-tag-close
      condition: closable=true
      children:
        - IconClose  # 关闭图标
  variants:
    large: { height: "24px(>1680px) / 20px(≤1680px)", padding: "0 11px / 0 7px", font-size: tip2, icon-size: xs, icon-gap: 4px }
    medium: { height: 20px, padding: "0 7px", font-size: tip2, icon-size: xs, icon-gap: 4px }
    small: { height: 16px, padding: "0 5px", font-size: tip2, icon-size: xs, icon-gap: 2px }
    pill: { border-radius: "100vh (组件JS内联注入，非CSS变量，不可被外部覆盖)" }
  color-schemes:
    normal-solid: { color: info1, bg: control2-light, border: control2-light }
    normal-outline: { color: info1, bg: transparent, border: control1 }
    primary-solid: { color: white, bg: primary1, border: primary1 }
    primary-outline: { color: primary1, bg: transparent, border: primary1 }
    # success/warning/danger 同理，solid 白字彩色底，outline 彩色字透明底
```

**≤1440px**
```yaml
# large: height 20px, padding "0 7px"
```

**≤840px**
```yaml
# medium: height xs(16px), 内容缩放 scale(0.833)
```

### 设计稿识别指南

**视觉特征指纹**

1. 小尺寸圆角矩形色块 + 内含短文本（1–4 个字） → 匹配 OTag
2. 标签内有 × 关闭图标 → 匹配 OTag（closable 模式）
3. 半圆角胶囊形小色块 + 文字 → 匹配 OTag（round="pill"）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 背景色 | 实心填充 | variant | `'solid'` | 默认 |
| 背景色 | 透明，仅边框 | variant | `'outline'` | — |
| fill 颜色 | `--o-color-primary1` 蓝色系 | color | `'primary'` | — |
| fill 颜色 | `--o-color-success1` 绿色系 | color | `'success'` | — |
| fill 颜色 | `--o-color-warning1` 橙色系 | color | `'warning'` | — |
| fill 颜色 | `--o-color-danger1` 红色系 | color | `'danger'` | — |
| fill 颜色 | `--o-color-info1` 灰色系 | color | `'normal'` | 默认 |
| fill 颜色 | `--o-color-info1`（info 蓝色） | color | `'info'` | — |
| height | 28px | size | `'large'` | 默认 |
| height | 20px | size | `'medium'` | — |
| height | 16px | size | `'small'` | — |
| border-radius | 全圆角（≥高度值） | round | `'pill'` | — |
| 关闭图标 | 有 × 按钮 | closable | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OTag | OButton | OTag 是静态标签展示用于分类，OButton 是可点击的操作触发器 |
| OTag | OBadge | OBadge 附着在其他元素右上角作为角标，OTag 是独立的标签元素 |
| OTag | OToggle | OToggle 有选中/未选中交互状态切换，OTag 无选中状态（仅展示或可关闭） |
| OTag（closable） | OTag（非 closable） | 有 × 图标表示可移除，需设置 closable |

