> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# ODivider 分割线

## Part A：设计理解卡

ODivider 是分割线组件，用于在内容之间添加视觉分隔。支持水平和垂直方向，支持实线、虚线、点线三种样式，水平方向还可以在线上放置文字标签。

### 方向与样式

**direction**（属性）：分割线方向。"h" 水平方向，宽度撑满容器；"v" 垂直方向，高度默认 1em。默认水平。

**variant**（属性）：分割线样式。"solid" 实线、"dashed" 虚线、"dotted" 点线。默认实线。

**darker**（属性）：是否使用深色分割线。默认浅色。

### 标签

**labelPosition**（属性）：标签在分割线上的位置。"left" 靠左、"center" 居中、"right" 靠右。默认居中。仅水平方向有效。

**default 插槽**（插槽）：分割线上的标签文字。仅水平方向生效。传入内容后分割线变为两段，中间显示标签。

📱 **响应式行为**：在平板及以下尺寸（≤1200px），标签文字缩小。在平板竖屏及以下（≤840px），水平分割线视觉上变细（scaleY 0.5），垂直分割线同理（scaleX 0.5）。

🧩 **布局结构**：水平分割线（direction="h"）为 flex 水平布局，宽度撑满容器，上下外边距 12px。无标签时仅渲染一条线；有标签时变为"线段 + 标签 + 线段"三段结构，标签左右间距 12px。垂直分割线（direction="v"）为 inline-block 元素，宽 1px、高 1em，左右外边距 12px，垂直居中对齐。线条粗细 1px，由 border 绘制。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal(默认) | vertical
horizontal-regions: [line(左线段), label(标签文字,可选), line(右线段)]
vertical: inline-block, width=1px, height=1em
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：一条水平或垂直的细线（1px），颜色为浅灰色（control4 色阶），横跨容器宽度 → 匹配 ODivider（水平）；两段文字之间的短竖线 → 匹配 ODivider（垂直）；线条中间有文字标签 → 匹配 ODivider（带 label）
- **Token → Prop 映射**：实线 → variant="solid"（默认）；虚线段 → variant="dashed"；点状线 → variant="dotted"；竖线 → direction="v"；线上文字靠左 → labelPosition="left"；线上文字居中 → labelPosition="center"（默认）；线条颜色较深（control1 色阶） → darker
- **易混淆组件区分**：与 CSS border-bottom 区分——ODivider 有语义化 role="separator"，且支持标签和响应式变细；与 OGrid 间距区分——OGrid 用 gap 控制间距无可见线条，ODivider 是可见的分隔线

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ODivider } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| variant | `DividerVariantT` | `'solid'` / `'dashed'` / `'dotted'` | `'solid'` | 分割线样式 |
| direction | `DirectionT` | `'h'` / `'v'` | `'h'` | 分割线方向 |
| labelPosition | `string` | `'left'` / `'center'` / `'right'` | `'center'` | 标签位置（仅水平） |
| darker | `boolean` | — | `false` | 是否深色 |

### Events 表

本组件无事件。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 仅水平方向（`direction="h"`） | 分割线中间标签区域 | 无（不传则为纯分割线） |

### 典型使用场景与调用模板

**场景 1：基础水平分割线**
适用于：内容段落之间的分隔
```vue
<p>上方内容</p>
<ODivider />
<p>下方内容</p>
```

**场景 2：带标签的分割线**
适用于：分割线上显示文字说明
```vue
<ODivider>或</ODivider>
<ODivider label-position="left">开始</ODivider>
```

**场景 3：虚线分割**
适用于：视觉上较轻的分隔
```vue
<ODivider variant="dashed" />
```

**场景 4：垂直分割线**
适用于：行内元素之间的分隔
```vue
<span>项目 A</span>
<ODivider direction="v" />
<span>项目 B</span>
```

**场景 5：深色分割线**
适用于：需要更强视觉分隔效果
```vue
<ODivider darker />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础分割 | 默认即可 | 水平实线 |
| 带文字分割 | `default` 插槽 + `label-position` | 水平方向有效 |
| 垂直分割 | `direction="v"` | 行内分隔 |
| 虚线/点线 | `variant="dashed"` / `variant="dotted"` | 样式变体 |
| 强调分割 | `darker` | 深色线 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--o-divider-color` | `var(--o-color-info1)` | 标签文字颜色 |
| `--o-divider-text-size` | `var(--o-font_size-text1)` | 标签文字字号 |
| `--o-divider-text-height` | `var(--o-line_height-text1)` | 标签文字行高 |
| `--o-divider-label-gap` | `0 12px` | 标签左右外边距（水平分割线） / 垂直分割线左右外边距 |
| `--o-divider-bd-color` | `var(--o-color-control4)` | 分割线颜色（deeper 时为 `var(--o-color-control1)`） |
| `--o-divider-gap` | `12px` | 水平分割线上下外边距 / 垂直分割线左右外边距 |

**使用示例**：
```vue
<ODivider style="--o-divider-bd-color: var(--o-color-primary1); --o-divider-gap: 24px" />
```

### 响应式行为表

| 维度 | ≤840px | 841–1200px | >1200px |
|------|--------|-----------|---------|
| 标签字号 | tip1 | tip1 | 标准 |
| 水平线粗细 | 0.5px（scaleY） | 标准 | 标准 |
| 垂直线粗细 | 0.5px（scaleX） | 标准 | 标准 |

### 组件布局结构

**桌面端 >1200px**
```yaml
layout:
  horizontal:  # direction="h"
    element: .o-divider.o-divider-h
    display: flex
    align-items: center
    width: 100%
    margin: 12px 0  # --o-divider-gap
    role: separator
    regions:
      - name: line-left
        element: .o-divider-line
        width: 100%  # 无标签时仅此一段
        height: 1px
        border-top: 1px {variant} var(--o-divider-bd-color)
      - name: label  # 仅有 default 插槽时渲染
        element: .o-divider-label
        white-space: nowrap
        margin: 0 12px  # --o-divider-label-gap
        font-size: var(--o-font_size-text1)
        font-weight: 500
        children:
          - { type: slot, name: default }
      - name: line-right  # 仅有 default 插槽时渲染
        element: .o-divider-line
        width: 100%
        height: 1px
    label-position:
      left: { line-left-width: 28px, line-right-width: 100% }
      center: { line-left-width: 100%, line-right-width: 100% }
      right: { line-left-width: 100%, line-right-width: 28px }
  vertical:  # direction="v"
    element: .o-divider.o-divider-v
    display: inline-block
    width: 1px
    height: 1em
    margin: 0 12px  # --o-divider-label-gap
    vertical-align: middle
    border-left: 1px {variant} var(--o-divider-bd-color)
  variants:
    solid: { border-style: solid }
    dashed: { border-style: dashed }
    dotted: { border-style: dotted }
    darker: { border-color: "var(--o-color-control1)" }
```

**≤1200px**
```yaml
# label font-size: tip1
```

**≤840px**
```yaml
# 水平线: transform scaleY(0.5) — 视觉上变为 0.5px
# 垂直线: transform scaleX(0.5) — 视觉上变为 0.5px
```

### 设计稿识别指南

**视觉特征指纹**

1. 一条横跨容器宽度的水平细线（浅灰色，1px） → 匹配 ODivider（direction="h"）
2. 水平线中间有文字标签，线被分为左右两段 → 匹配 ODivider（带 default 插槽）
3. 两个行内元素之间的短竖线（高度约 1em） → 匹配 ODivider（direction="v"）
4. 虚线段分割 → 匹配 ODivider（variant="dashed"）；点状线 → variant="dotted"

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 线条样式 | 实线 | variant | `'solid'` | 默认 |
| 线条样式 | 虚线段 | variant | `'dashed'` | — |
| 线条样式 | 圆点 | variant | `'dotted'` | — |
| 方向 | 水平 | direction | `'h'` | 默认 |
| 方向 | 垂直 | direction | `'v'` | — |
| 线条颜色 | `--o-color-control4`（浅灰） | darker | `false` | 默认 |
| 线条颜色 | `--o-color-control1`（深灰） | darker | `true` | — |
| 标签位置 | 文字靠左 | labelPosition | `'left'` | 左侧线段固定 28px |
| 标签位置 | 文字居中 | labelPosition | `'center'` | 默认 |
| 标签位置 | 文字靠右 | labelPosition | `'right'` | 右侧线段固定 28px |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| ODivider | CSS border | ODivider 有 role="separator" 语义，支持标签文字和响应式变细，border 仅是装饰线 |
| ODivider（垂直） | 竖线字符 `\|` | ODivider 是 DOM 元素有设计 Token 控制颜色和粗细，字符竖线无法自适应 |
| ODivider | OGrid gap | OGrid 的 gap 是不可见间距，ODivider 是可见的分隔线条 |
| ODivider（带标签） | 标题+下划线 | ODivider 标签是线条中间的嵌入文字，标题+下划线是文字下方的装饰线 |
