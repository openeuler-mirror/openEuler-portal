> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OButton 按钮

## Part A：设计理解卡

OButton 是通用按钮组件，用于触发操作或导航。支持多种颜色、形状、尺寸、圆角，可承载图标和文字。

### 按钮整体

**color**（属性）：按钮的颜色主题。"normal" 默认灰色、"primary" 品牌蓝、"success" 成功绿、"warning" 警告橙、"danger" 危险红、"brand" 品牌色（与 primary 不同的品牌专属色）。默认 normal。

**variant**（属性）：按钮的视觉形状。"solid" 实心填充、"outline" 线框描边、"text" 纯文字无背景。默认 outline。注意：当按钮仅含图标（无文字内容）时，默认自动切换为 text 样式。

**size**（属性）：按钮尺寸。"small" 小号、"medium" 中号、"large" 大号。默认 medium。

**round**（属性）：按钮圆角。"pill" 半圆角，也可传入任意 CSS border-radius 值（如 "12px"）。

**disabled**（属性）：禁用状态，按钮不可点击。默认关闭。

**loading**（属性）：加载状态，按钮显示旋转加载图标并不可点击。加载时图标插槽会被替换为加载动画。默认关闭。

**href**（属性）：设置后按钮渲染为 `<a>` 标签，可用于链接跳转。

**icon**（属性）：前缀图标组件。也可以通过 icon 插槽传入自定义图标。

**tag**（属性）：自定义按钮渲染的 HTML 标签。默认 "button"。

### 插槽

**default 插槽**（插槽）：按钮的文字内容。不传时按钮变为纯图标按钮。

**icon 插槽**（插槽）：替换按钮前缀图标区域。替换后 icon 属性失效。加载状态时此插槽被加载动画覆盖。

**suffix 插槽**（插槽）：按钮后缀区域，通常放置右侧图标（如下拉箭头）。

### 事件

**click**（事件）：点击按钮时触发，禁用或加载状态下不会触发。可获取原生鼠标事件对象。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），large 按钮高度缩小至 36px、字号缩小，medium 按钮高度缩至 28px。在平板竖屏及以下（≤840px），large 按钮进一步缩至 32px。

🧩 **布局结构**：按钮内部水平排列，从左到右依次为：前缀图标区（可被 loading 动画替换）、文字内容区（弹性伸缩）、后缀图标区。图标与文字间距 8px（small 为 4px）。按钮高度由 size 决定（small 28px / medium 32px / large 40px），水平内边距 15–23px。纯图标按钮无内边距，宽高相等。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [icon(前缀图标), default(文字内容), suffix(后缀图标)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：单个矩形可点击区域，内含文字/图标或两者组合，有明确边框或填充背景 → 匹配 OButton；纯图标+无文字+圆角方形 → 匹配 OButton（icon-only 模式）
- **Token → Prop 映射**：填充背景色 → variant="solid"；仅边框 → variant="outline"；无背景无边框 → variant="text"；蓝色系 → color="primary"；渐变背景 → color="brand" + variant="solid"；高度 40px → size="large"，32px → size="medium"，28px → size="small"；半圆角 → round="pill"
- **⚠️ 设计稿"文字按钮"命名陷阱**：设计师在 Pixso/Figma 中标注为"文字按钮"的元素，**通常对应 OLink**（行内纯文字链接），而非 OButton variant="text"。两者关键差异：OButton text 变体仍有 padding、min-width 和 hover 背景色矩形区域；OLink 是行内元素，无矩形容器边界，hover 仅有文字颜色或下划线变化。辨别方法：若设计稿中该元素与正文文字等高、无可见点击边界 → 用 OLink；若有明确的矩形可点击区域但去掉了背景/边框 → 用 OButton text。
- **易混淆组件区分**：与 OLink 区分——OLink 是行内文字链接无背景/边框，OButton 有明确的可点击容器边界；与 OTag 区分——OTag 是静态标签展示，OButton 是交互操作触发器

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OButton } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| color | `ButtonColorT` | `'normal'` / `'primary'` / `'success'` / `'warning'` / `'danger'` / `'brand'` | `'normal'` | 颜色主题 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'`（仅图标时为 `'text'`） | 视觉形状 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | `'medium'` | 按钮尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角值 |
| loading | `boolean` | — | `false` | 加载状态 |
| disabled | `boolean` | — | `false` | 禁用状态 |
| href | `string` | — | — | 链接地址，设置后渲染为 `<a>` 标签 |
| icon | `Component` | — | — | 前缀图标组件 |
| tag | `string` | — | `'button'` | 渲染标签类型 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| click | `(evt: MouseEvent)` | 点击按钮时（disabled/loading 状态不触发） |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 按钮文字内容 | 无（变为纯图标按钮） |
| icon | — | 有 icon prop 或 icon slot 时 | 前缀图标区域 | `<component :is="icon" />` |
| suffix | — | 有 suffix slot 时 | 后缀图标区域 | 无 |

### 插槽层级关系

```
OButton
├── icon（前缀图标，loading 时被加载动画覆盖）
├── default（按钮文字）
└── suffix（后缀图标）
```

### 典型使用场景与调用模板

**场景 1：强调按钮 / 主操作按钮**
适用于：页面核心操作（如提交、确认）。实心背景色（primary1），文字为反色。`round="pill"` 按设计图决定，加不加均可。
```vue
<OButton color="primary" variant="solid">确认提交</OButton>
```

**场景 2：普通按钮**
适用于：次要操作（如取消、返回）。无背景色，有边框（primary1）。`round="pill"` 按设计图决定，加不加均可。
```vue
<OButton color="primary">取消</OButton>
```

**场景 3：带图标的按钮**
适用于：需要图标辅助说明
```vue
<OButton variant="outline">
  <template #icon><OIconAdd /></template>
  新建
</OButton>
```

**场景 4：纯图标按钮**
适用于：工具栏操作
```vue
<OButton :icon="OIconEdit" size="small" />
```

**场景 5：带后缀的下拉按钮**
适用于：下拉菜单触发器
```vue
<OButton color="brand" round="pill">
  下拉选项
  <template #suffix>
    <OIconChevronDown />
  </template>
</OButton>
```

**场景 6：加载状态**
适用于：异步操作等待中
```vue
<OButton color="primary" variant="solid" :loading="isLoading" @click="handleSubmit">
  提交
</OButton>
```

**场景 7：链接按钮**
适用于：需要跳转的按钮
```vue
<OButton href="https://openeuler.org" color="primary" variant="solid" round="pill">
  访问官网
</OButton>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 主操作 | `color="primary"` + `variant="solid"` | 实心品牌色 |
| 辅助操作 | `color="primary"` + `variant="outline"` | 线框品牌色 |
| 纯文字操作按钮 | `variant="text"` | 有 padding/hover 背景，与 OLink 不同；设计稿中的"文字按钮"标注请优先考虑 OLink |
| 运营活动 | `round="pill"` + class `c-btn-activity` | 社区主题运营按钮 |
| 图标按钮 | `:icon="OIconXxx"` 或 `#icon` | 不传 default 插槽 |
| 危险操作 | `color="danger"` + `variant="solid"` | 红色警告 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值（medium size） | 说明 |
|--------|----------------------|------|
| `--btn-height` | `var(--o-control_size-m)`（32px） | 按钮高度 |
| `--btn-padding` | `0 15px` | 水平内边距（s: `0 15px`，l: `0 23px`） |
| `--btn-radius` | `var(--o-radius_control-s)` | 圆角（pill 时为 `var(--o-control_size-l)`） |
| `--btn-gap` | `8px` | 图标与文字间距（s: `4px`） |
| `--btn-min-width` | `80px` | 最小宽度（m），l 为 `96px` |
| `--btn-icon-size` | `var(--o-icon_size-xs)` | 图标尺寸 |

**使用示例**：
```vue
<!-- 自定义最小宽度 -->
<OButton style="--btn-min-width: 120px" color="primary" variant="solid">提交</OButton>
```

### 响应式行为表

> 断点标准参见 [CONVENTIONS.md](../../CONVENTIONS.md)。★ 为 opendesign 组件库的关键阈值。

| 维度 | ≤600px | **601–840px** ★ | **841–1200px** ★ | 1201–1680px ★ | >1680px |
|------|--------|----------------|-----------------|--------------|--------|
| large 高度 | 32px | 32px | 36px | 40px | 40px |
| medium 高度 | 28px | 28px | 28px | 32px | 32px |
| small 高度 | 24px | 24px | 24px | 24px | 24px |

### 组件布局结构

**桌面端 >1200px**
```yaml
layout:
  direction: horizontal
  align: center
  justify: center
  border-radius: var(--o-radius_control-s)  # medium/large; xs for small
  regions:
    - name: icon-prefix
      children:
        - { type: slot, name: icon }  # 或 loading 动画替换
      gap: 8px  # --btn-gap, small 为 4px
    - name: content
      flex: 1
      children:
        - { type: slot, name: default }  # 按钮文字
    - name: icon-suffix
      children:
        - { type: slot, name: suffix }
      gap: 8px  # --btn-gap
  variants:
    small: { height: 28px, padding: "0 15px", icon-size: xs, border-radius: xs }
    medium: { height: 32px, padding: "0 15px", icon-size: xs, min-width: 80px }
    large: { height: 40px, padding: "0 23px", icon-size: m, min-width: 96px }
    icon-only: { padding: 0, width: 等于高度, min-width: none }
    pill: { border-radius: "var(--o-control_size-l)" }
```

**≤1200px**
```yaml
# large: height 36px, padding "0 15px", font-size tip1
# medium: height 28px, gap 4px
```

**≤840px**
```yaml
# large: height 32px, icon-size s
# small: padding "0 11px"
```

### 设计稿识别指南

**视觉特征指纹**

1. 矩形可点击区域 + 内含文字/图标 + 有填充背景或描边边框 → 匹配 OButton（solid/outline 变体）
2. 有 padding 的可点击区域、去掉背景/边框但保留矩形容器语义（hover 有背景色块）→ 匹配 OButton（text 变体）；若设计稿中该元素直接标注为"文字按钮"并与行内文字等高，则改用 OLink
3. 圆角方形 + 仅含图标无文字 → 匹配 OButton（icon-only 模式）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 背景色 | 实心填充（如 `--o-color-primary1`） | variant | `'solid'` | — |
| 背景色 | 透明，仅边框 | variant | `'outline'` | — |
| 背景色 | 透明，无边框 | variant | `'text'` | — |
| fill 颜色 | `--o-color-primary1` 蓝色系 | color | `'primary'` | — |
| fill 颜色 | `--o-color-success1` 绿色系 | color | `'success'` | — |
| fill 颜色 | `--o-color-warning1` 橙色系 | color | `'warning'` | — |
| fill 颜色 | `--o-color-danger1` 红色系 | color | `'danger'` | — |
| fill 颜色 | 渐变（`--o-color-main2`） | color | `'brand'` | 仅 solid 有渐变 |
| fill 颜色 | `--o-color-control1` 灰色系 | color | `'normal'` | 默认 |
| height | 40px | size | `'large'` | — |
| height | 32px | size | `'medium'` | — |
| height | 28px | size | `'small'` | — |
| border-radius | 全圆角（≥高度值） | round | `'pill'` | — |
| border-radius | `--o-radius_control-s` | round | — | 默认样式 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OButton | OLink | OLink 是行内文字链接无容器边界，OButton 有明确的矩形可点击区域 |
| OButton | OTag | OTag 是静态标签展示（无 click 交互），OButton 是操作触发器 |
| OButton（text） | OLink | OButton text 变体有 padding 和 hover 背景色变化，OLink 仅文字颜色变化 |
| OButton（icon-only） | OIcon | OIcon 是纯展示图标无交互容器，OButton icon-only 有 hover/active 态 |

