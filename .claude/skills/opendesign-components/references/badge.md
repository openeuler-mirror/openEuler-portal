> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OBadge 徽标

## Part A：设计理解卡

OBadge 是一个徽标组件，用于在其他元素（如按钮、头像、图标）的右上角显示数字、文字或小红点，起到提醒、计数的作用。也可以独立使用。

### 整体容器

**value**（属性）：徽标显示的内容。支持数字和文本。数字会受 max 属性限制，超出则显示 "max+"；文本则直接原样展示。默认为空。

**max**（属性）：数字最大值上限。当 value 为数字且超过此值时，显示为 "99+" 的形式。默认 99。仅 value 为数字时生效。

**color**（属性）：徽标的主题色。"primary" 品牌蓝、"success" 成功绿、"warning" 警告橙、"danger" 危险红。默认 primary。

**dot**（属性）：是否显示为小红点样式。开启后徽标变成一个无内容的小圆点，不显示 value 中的内容。默认关闭。

**offset**（属性）：徽标位置的偏移量，接收一个数组 `[水平偏移, 垂直偏移]`。数字单位为像素，也支持字符串（如 "50%"）。用于微调徽标在右上角的精确位置。

### 插槽

**default 插槽**（插槽）：放置被装饰的主体内容（如按钮、头像）。不传时，徽标作为独立元素显示（不再定位到右上角，而是行内展示）。

**content 插槽**（插槽）：替换徽标内部的显示内容。替换后 value 和 max 属性失效。可放入图标或自定义标记。

📱 **响应式行为**：在平板竖屏及以下（≤840px），小红点尺寸保持 6px。本组件响应式差异极小。

🧩 **布局结构**：外层 `.o-badge` 为 inline 容器，内含默认插槽（被装饰的主体）和一个 `<sup>` 定位徽标内容。有默认插槽时徽标绝对定位到右上角；无默认插槽时徽标行内显示。dot 模式下徽标为 6px 小圆点，不显示文字。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: inline
regions: [slot-default(主体内容), sup.badge-content(徽标)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：元素右上角有小圆形色块（数字/文字/圆点），背景色为品牌色（蓝/绿/橙/红），文字为白色，字号极小（tip2）
- **Token → Prop 映射**：背景色蓝=primary、绿=success、橙=warning、红=danger；无内容小圆点=dot；显示数字超限带"+"=max
- **易混淆组件区分**：与 OTag 区别——Badge 定位在宿主右上角且尺寸极小（12px 高），Tag 是独立行内元素且更大；与通知红点区别——Badge 可承载数字/文字内容

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OBadge } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number` | — | `''` | 徽标内容 |
| max | `number` | — | `99` | 最大值，超过显示 max+（仅 value 为数字时生效） |
| color | `BadgeColorT` | `'primary'` / `'success'` / `'warning'` / `'danger'` | `'primary'` | 徽标颜色 |
| dot | `boolean` | — | `false` | 是否显示为小红点 |
| offset | `Array<number \| string>` | — | `[]` | 位置偏移 `[x, y]`，数字为 px，字符串如 `'50%'` |

### Events 表

本组件无自定义事件。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 被装饰的主体内容 | 无（独立模式） |
| content | — | 始终 | 徽标内部显示内容 | `{{ value }}` 或 `{{ max }}+` |

### 插槽层级关系

```
default（主体内容，不传则独立显示）
content（徽标内容，使用后 value/max 失效）
```

### 典型使用场景与调用模板

**场景 1：数字徽标**
适用于：显示未读消息数量
```vue
<OBadge :value="9" color="danger">
  <OButton variant="solid">消息</OButton>
</OBadge>
```

**场景 2：超出最大值**
适用于：消息数可能很大
```vue
<OBadge :value="100" :max="99" color="danger">
  <OButton variant="solid">通知</OButton>
</OBadge>
<!-- 显示为 "99+" -->
```

**场景 3：文字徽标**
适用于：显示状态标记如"hot"、"new"
```vue
<OBadge value="hot" color="warning">
  <OButton variant="solid">推荐</OButton>
</OBadge>
```

**场景 4：小红点**
适用于：仅提示有新内容，不显示数量
```vue
<OBadge color="danger" dot>
  <OLink href="/notifications">通知</OLink>
</OBadge>
```

**场景 5：位置偏移**
适用于：微调徽标精确位置
```vue
<OBadge :value="9" :offset="[5, -6]" color="danger">
  <img src="/avatar.svg" style="width: 48px; height: 48px;" />
</OBadge>
```

**场景 6：自定义内容插槽**
适用于：徽标内显示图标而非文字
```vue
<OBadge>
  <img src="/avatar.svg" style="width: 48px; height: 48px;" />
  <template #content>
    <OIconChecked />
  </template>
</OBadge>
```

**场景 7：独立使用（无 default 插槽）**
适用于：行内显示独立的状态标记
```vue
<OBadge :value="9" color="danger" />
<OBadge value="hot" color="warning" />
<OBadge dot color="danger" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 未读计数 | `color="danger"` + `:value="count"` | 最常见用法 |
| 状态标记 | `color="warning"` + `value="new"` | 文字型徽标 |
| 小红点提示 | `color="danger"` + `dot` | 仅提示，不显示数量 |
| 独立使用 | 无 default 插槽 | 行内展示 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--badge-text-size` | `var(--o-font_size-tip2)` | 徽标文字大小 |
| `--badge-text-height` | `var(--o-line_height-tip2)` | 徽标文字行高 |
| `--badge-radius` | `var(--o-control_size-l)` | 徽标圆角（默认全圆角） |
| `--badge-padding` | `2px` | 徽标内边距 |
| `--badge-min-width` | `12px` | 徽标最小宽度 |
| `--badge-dot-size` | `6px` | 小红点尺寸（dot 模式） |
| `--badge-height` | `12px` | 徽标高度 |
| `--badge-color` | `var(--o-color-white)` | 徽标文字颜色（由 color prop 决定） |
| `--badge-bg-color` | `var(--o-color-primary1)` | 徽标背景色（由 color prop 决定） |

**使用示例**：
```vue
<OBadge :value="9" style="--badge-height: 16px; --badge-min-width: 16px;" />
```

### 响应式行为表

本组件无显著响应式差异。

### 组件布局结构

```yaml
# layout: inline（唯一布局模式）
root: .o-badge
  direction: inline
  children:
    - slot-default:
        desc: 被装饰的主体内容（按钮、头像等）
        optional: true  # 不传时为独立模式 .o-badge-only
    - sup.o-badge-content:
        position: absolute (top + right，受 offset 偏移)
        # 独立模式时变为 static 行内展示
        children:
          - slot-content:
              fallback: .o-badge-label {{ content }}

# 变体
dot-mode:  # dot=true
  .o-badge-content:
    size: 6px × 6px (--badge-dot-size)
    content: 无（隐藏 label）

normal-mode:  # dot=false
  .o-badge-content:
    min-width: 12px (--badge-min-width)
    height: 12px (--badge-height)
    padding: 2px (--badge-padding)
    border-radius: --o-control_size-l (全圆角)
    font-size: --o-font_size-tip2
    color: --badge-color (白色)
    background: --badge-bg-color (随 color prop 变化)

# 响应式
breakpoints:
  "<=840px":
    badge-dot-size: 6px  # 保持不变
```

### 设计稿识别指南

**视觉特征指纹**

1. 元素右上角叠加一个小型圆形色块（高度仅 12px），内含白色数字/文字或为 6px 纯色圆点
2. 圆形色块背景为品牌主题色（蓝/绿/橙/红），与宿主元素形成强对比
3. 独立使用时为行内小圆角标签，无宿主元素

**设计 Token → Prop 值映射表**

| 设计特征 | Token / 视觉值 | Prop | Prop 值 |
|---------|---------------|------|--------|
| 背景色为品牌蓝 | `--o-color-primary1` | `color` | `"primary"` |
| 背景色为成功绿 | `--o-color-success1` | `color` | `"success"` |
| 背景色为警告橙 | `--o-color-warning1` | `color` | `"warning"` |
| 背景色为危险红 | `--o-color-danger1` | `color` | `"danger"` |
| 无内容小圆点 6px | `--badge-dot-size: 6px` | `dot` | `true` |
| 显示数字带"+" | 如 "99+" | `max` | 对应上限数字 |
| 位置微调 | 偏离默认右上角 | `offset` | `[x, y]` |

**易混淆组件区分表**

| 对比组件 | 相似点 | 区分方法 |
|---------|-------|---------|
| OTag | 都是小型彩色标签 | Badge 定位在宿主右上角，高度仅 12px；Tag 是独立行内元素，高度更大，有边框变体 |
| OStatus（状态点） | 都可显示为小圆点 | Badge 叠加在其他元素上方且可含数字；Status 是独立状态指示器 |
| 自定义通知红点 | 视觉相似 | Badge 组件化且支持 value/max/color，非纯 CSS 红点 |

