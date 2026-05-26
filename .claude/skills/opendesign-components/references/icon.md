> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OIcon 图标

## Part A：设计理解卡

OIcon 是通用图标容器组件，用于展示 SVG 图标。它既可以作为纯展示图标，也可以作为可交互的图标按钮。支持加载状态，在加载时自动显示旋转加载动画。

### 图标整体

**icon**（属性）：要展示的图标组件。传入一个 Vue 组件（如 OIconAdd、OIconEdit 等），组件会将其渲染为 SVG 图标。图标库中的图标分为三类：线条类（stroke）、填充类（fill）、彩色类（color）。

**button**（属性）：是否作为图标按钮使用。开启后图标具有可交互样式：默认显示信息色，悬停、激活时颜色加深，同时自动获得 pointer 光标和键盘焦点能力（tabindex 设为 0）。默认关闭。

**disabled**（属性）：禁用状态，仅在图标按钮模式下生效。禁用后光标变为禁止样式，颜色变为禁用色，悬停和激活状态不再变化。默认关闭。

**loading**（属性）：加载状态。开启后图标区域显示旋转加载动画图标，替换原有图标内容。默认关闭。

### 图标尺寸

图标大小继承当前上下文的字号（font-size），默认为 1em。可以通过外层容器的 font-size 或 CSS 变量 `--icon-size` 来控制图标大小。

### 插槽

**default 插槽**（插槽）：自定义图标内容。当提供 default 插槽时，icon 属性和 loading 状态的内置图标均不渲染，完全由插槽内容替代。未提供插槽时，加载状态显示旋转动画，否则显示 icon 属性指定的图标组件。

### 颜色与交互

图标按钮模式下具有完整的交互状态链：默认色 → 悬停色 → 激活/聚焦色 → 禁用色。这些颜色通过 CSS 变量控制，可在不同主题（openEuler、Ascend、Kunpeng）下自动适配。

🧩 **布局结构**：图标组件是一个 inline-flex 容器，内部居中放置单个 SVG 图标（或 loading 旋转动画、或自定义插槽内容）。没有多区域布局，尺寸由 font-size 继承控制（默认 1em）。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: none  # 单一居中容器，无方向性布局
regions: [default(图标内容)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：单个 SVG 图标元素，无背景、无边框、无文字 → 匹配 OIcon；图标带有悬停变色效果且可点击 → 匹配 OIcon button 模式
- **Token → Prop 映射**：图标颜色为 `--o-color-info1` 且有交互态 → button=true；图标带旋转动画 → loading=true；图标大小由外层 font-size 决定 → 通过 style 或 --icon-size 控制
- **易混淆组件区分**：与 OButton（icon-only）区分——OButton 有明确的矩形容器边界、padding 和 hover 背景变化，OIcon 仅图标本身变色无容器背景；与内联 SVG 区分——OIcon 提供统一的 loading、button 交互能力

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OIcon } from '@opensig/opendesign';
// 图标组件按需导入
import { OIconAdd, OIconEdit, OIconDelete, OIconRefresh } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| icon | `Component` | 否 | 任意图标组件 | — | 要展示的图标组件 |
| button | `boolean` | 否 | — | `false` | 是否作为图标按钮（可交互） |
| disabled | `boolean` | 否 | — | `false` | 禁用状态（配合 button 使用） |
| loading | `boolean` | 否 | — | `false` | 加载状态，显示旋转加载动画 |

### Events 表

无自定义事件。图标按钮模式下可使用原生 `@click` 等事件。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 整个图标内容区域 | loading 时显示 `<IconLoading />`（旋转），否则显示 `<component :is="icon" />` |

### 插槽层级关系

```
OIcon (.o-icon)
└── default 插槽
    ├── [loading=true 且无插槽时] IconLoading（旋转加载动画）
    └── [loading=false 且无插槽时] component :is="icon"
```

### 典型使用场景与调用模板

**场景 1：基础图标展示**
适用于：在文字旁或独立区域展示一个图标
```vue
<OIcon :icon="OIconAdd" />
```

**场景 2：图标按钮**
适用于：工具栏、操作区域中的可点击图标
```vue
<OIcon :icon="OIconDelete" button @click="handleDelete" />
```

**场景 3：禁用状态的图标按钮**
适用于：暂不可用的操作图标
```vue
<OIcon :icon="OIconEdit" button disabled />
```

**场景 4：加载状态**
适用于：异步操作进行中，用旋转图标提示用户
```vue
<OIcon :icon="OIconRefresh" :loading="isLoading" />
```

**场景 5：通过插槽自定义图标内容**
适用于：需要使用自定义 SVG 或第三方图标
```vue
<OIcon button>
  <svg viewBox="0 0 24 24">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
</OIcon>
```

**场景 6：控制图标大小**
适用于：需要不同尺寸的图标
```vue
<OIcon :icon="OIconAdd" style="font-size: 32px" />
```

**场景 7：图标列表展示**
适用于：图标选择器或图标集合展示
```vue
<div style="font-size: 24px; display: flex; gap: 12px;">
  <OIcon :icon="OIconAdd" />
  <OIcon :icon="OIconEdit" />
  <OIcon :icon="OIconDelete" />
  <OIcon :icon="OIconRefresh" />
</div>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 纯展示图标 | `:icon="OIconXxx"` | 不可交互，仅展示 |
| 可点击图标按钮 | `:icon="OIconXxx"` + `button` | 有悬停/激活样式 |
| 禁用图标按钮 | `button` + `disabled` | 禁止交互，颜色置灰 |
| 加载中图标 | `:loading="true"` | 显示旋转动画 |
| 自定义大小图标 | `:icon="OIconXxx"` + `style="font-size: Xpx"` | 通过 font-size 控制大小 |

### 内置图标清单

组件库提供以下图标组件，均可从 `@opensig/opendesign` 导入：

| 类别 | 图标 |
|------|------|
| 方向箭头 | `OIconArrowUp` / `Down` / `Left` / `Right`、`OIconDoubleArrowUp` / `Down` / `Left` / `Right`、`OIconChevronUp` / `Down` / `Left` / `Right`、`OIconChevronDownBold`、`OIconChevronRightSmall`、`OIconCaretUp` / `Down` / `Left` / `Right` |
| 操作 | `OIconAdd`、`OIconEdit`、`OIconDelete`、`OIconClose`、`OIconRefresh`、`OIconSearch`、`OIconFilter`、`OIconSort`、`OIconZoomIn`、`OIconZoomOut`、`OIconOneToOne` |
| 状态 | `OIconSuccess`、`OIconWarning`、`OIconDanger`、`OIconInfo`、`OIconInfoTip`、`OIconExclamationMark`、`OIconCheckMark`、`OIconChecked`、`OIconDone`、`OIconLoading`、`OIconLoadingSmall` |
| 媒体与文件 | `OIconEye`、`OIconEyeOff`、`OIconFile`、`OIconImageError`、`OIconVideoPlay`、`OIconLink` |
| 其他 | `OIconStar`、`OIconSkill`、`OIconTime`、`OIconCalendar`、`OIconEllipsis`、`OIconMinus`、`OIconSun`、`OIconMoon`、`OIconNoData`、`OIconAscend`、`OIconKunpeng` |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--icon-size` | `1em` | 图标容器尺寸（默认继承外层 font-size） |
| `--icon-btn-color` | `var(--o-color-info1)` | 图标按钮默认颜色 |
| `--icon-btn-color-hover` | `var(--o-color-info2)` | 图标按钮悬停颜色 |
| `--icon-btn-color-active` | `var(--o-color-info3)` | 图标按钮激活/聚焦颜色 |
| `--icon-btn-color-disabled` | `var(--o-color-info4)` | 图标按钮禁用颜色 |

**使用示例**：
```vue
<OIcon :icon="OIconAdd" button style="--icon-size: 24px; --icon-btn-color: var(--o-color-brand1)" />
```

### 响应式行为表

无。OIcon 组件不包含响应式断点逻辑，图标大小由外层 font-size 决定。

### 组件布局结构

**所有尺寸（无断点差异）**
```yaml
layout:
  display: inline-flex
  align: center
  justify: center
  font-size: var(--icon-size)  # 默认 1em，继承外层 font-size
  regions:
    - name: default
      children:
        - { type: slot, name: default }  # 优先插槽
        - { type: component, name: IconLoading, condition: "loading=true 且无插槽" }  # 旋转动画
        - { type: component, name: "icon prop", condition: "loading=false 且无插槽" }  # icon 属性指定的图标
  variants:
    button-mode:
      color: var(--icon-btn-color)  # var(--o-color-info1)
      cursor: pointer
      hover: { color: var(--icon-btn-color-hover) }  # var(--o-color-info2)
      active: { color: var(--icon-btn-color-active) }  # var(--o-color-info3)
    disabled:
      cursor: not-allowed
      color: var(--icon-btn-color-disabled)  # var(--o-color-info4)
```

### 设计稿识别指南

**视觉特征指纹**

1. 单个 SVG 图标元素，无矩形容器背景、无边框 → 匹配 OIcon
2. 图标有悬停变色效果（信息色系 info1→info2→info3）且光标变为 pointer → 匹配 OIcon button 模式
3. 图标区域显示旋转动画 → 匹配 OIcon loading 状态

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 图标颜色 | `--o-color-info1` 且有交互态 | button | `true` | 图标按钮模式 |
| 图标颜色 | 继承父级，无交互态 | button | `false`（默认） | 纯展示模式 |
| 图标尺寸 | 由外层 font-size 决定 | — | — | 通过 style 或 --icon-size 控制 |
| 旋转动画 | 可见旋转 | loading | `true` | 替换原图标 |
| 灰色/不可点击 | `--o-color-info4` | disabled | `true` | 配合 button 使用 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OIcon | OButton（icon-only） | OButton 有矩形容器、padding、hover 背景变化；OIcon 无容器背景，仅图标本身变色 |
| OIcon（button） | OButton（icon-only） | OIcon button 无 padding 无背景，OButton 有固定宽高和背景色 |
| OIcon | 内联 SVG | OIcon 提供 loading、button 交互能力，内联 SVG 无这些封装 |
