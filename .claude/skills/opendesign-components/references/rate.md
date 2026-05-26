> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# ORate 评分

## Part A：设计理解卡

ORate 是评分组件，用于展示或收集用户评分。默认以星星图标展示，支持半星选择、可清空、只读、自定义图标、文字提示等功能。

### 值

**modelValue**（属性）：选中的评分值（v-model 双向绑定）。如 3 表示选了 3 颗星。

**defaultValue**（属性）：非受控模式下的默认评分值。默认 0。

**count**（属性）：评分总数（星星个数）。默认 5。

### 外观

**size**（属性）：图标尺寸。"large" 大号、"medium" 中号。

**color**（属性）：选中颜色。"normal" 默认黄色、"primary" 品牌色、"success" 绿色、"warning" 橙色、"danger" 红色。默认 normal。

### 交互

**readonly**（属性）：是否只读。开启后不可点击修改。默认关闭。

**allowHalf**（属性）：是否支持半星选择。默认关闭。

**clearable**（属性）：是否可清空（再次点击当前值取消选择）。默认关闭。

### 文字提示

**labels**（属性）：提示文字数组，长度必须等于 count。传入后悬停每颗星时显示对应的文字提示气泡。

### 自定义图标

**icon 插槽**（插槽）：替换默认的星星图标。可获取 index（当前图标索引）和 status（"full"/"half"/""）。自定义 SVG 需要包含三个子元素：外框线、左半边、全部填充。

📱 **响应式行为**：本组件无响应式差异。

🧩 **布局结构**：ORate 为水平排列的评分图标行。根容器是 div，内部水平排列 count 个评分图标项（ORateItem），图标间有固定间距。每个图标项支持整星或半星交互。带 labels 时每个图标外包一层 OPopover 气泡提示。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: row
regions: [rate-item(星星图标) × count]
variants: { large: icon-size l + gap 12px, medium: icon-size xs + gap 8px }
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：一排等间距的星星图标（默认 5 个），选中的星星为黄色/彩色填充，未选中的为灰色描边；可能有半星填充状态
- **Token → Prop 映射**：黄色填充 → color="normal"；品牌色填充 → color="primary"；图标大号 → size="large"；图标小号 → size="medium"；有半星填充 → allowHalf=true；悬停时有文字气泡 → 传入 labels 数组
- **易混淆组件区分**：与 OSlider（滑块）区分——ORate 是离散的图标点选，OSlider 是连续的轨道拖拽；与图标列表区分——ORate 图标有填充/未填充二态且一组关联
- **⚠️ 必填星号 → 用 OFormItem 包裹**：设计稿中评分控件标签旁有红色星号（必填），应将 ORate 放入 `<OFormItem required>` 实现，**不要**手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ORate } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type RateSizeT = 'large' | 'medium';
type RateItemStatusT = 'full' | 'half' | 'empty';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| count | `number` | — | `5` | 评分总数 |
| modelValue | `number` | — | — | 选中值（v-model） |
| defaultValue | `number` | — | `0` | 默认值 |
| size | `RateSizeT` | `'large'` / `'medium'` | — | 尺寸 |
| color | `ColorT` | `'normal'` / `'primary'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| readonly | `boolean` | — | `false` | 只读 |
| allowHalf | `boolean` | — | `false` | 半星 |
| clearable | `boolean` | — | `false` | 可清空 |
| labels | `string[]` | — | — | 提示文字（长度=count） |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: number)` | 评分变化时 |
| change | `(val: number)` | 评分变化时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| icon | `{ index: number, status: RateItemStatusT }` | 始终 | 每个评分图标 | `<IconStar />` |

### 典型使用场景与调用模板

**场景 1：基础评分**
适用于：用户评分
```vue
<script setup>
import { ref } from 'vue';
const score = ref(3);
</script>
<template>
  <ORate v-model="score" size="large" />
</template>
```

**场景 2：半星评分**
适用于：精细评分
```vue
<ORate v-model="score" allow-half size="large" />
```

**场景 3：可清空评分**
适用于：允许取消评分
```vue
<ORate v-model="score" clearable size="large" />
```

**场景 4：只读展示**
适用于：评分结果展示
```vue
<ORate :default-value="4" readonly size="medium" color="primary" />
```

**场景 5：带文字提示**
适用于：评价等级说明
```vue
<ORate
  v-model="score"
  size="large"
  color="primary"
  :labels="['非常不满意', '不满意', '一般', '满意', '非常满意']"
/>
```

**场景 6：自定义图标**
适用于：非星星图标的评分
```vue
<ORate size="large" color="success" allow-half>
  <template #icon>
    <svg viewBox="0 0 24 24" style="width: 1em; height: 1em;">
      <circle cx="12" cy="12" r="10.5" stroke="currentColor" stroke-width="1" fill="none" />
      <path d="M 12,2 A 10,10,0,0,0,12,22 Z" fill="currentColor" />
      <path d="M 12,2 A 10,10,0,0,1,12,22 Z" fill="currentColor" />
    </svg>
  </template>
</ORate>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 可操作评分 | `v-model` + `size="large"` + `color="primary"` | 交互评分 |
| 只读展示 | `readonly` + `size="medium"` + `:default-value` | 结果展示 |
| 精细评分 | `allow-half` | 支持 0.5 精度 |
| 带提示 | `:labels="[...]"` | 悬停文字 |
| 可取消 | `clearable` | 再次点击清空 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--rate-color` | `var(--o-color-control1)` | 未选中图标颜色 |
| `--rate-color-selected` | 跟随 `color` prop（normal 时为 `rgb(var(--o-yellow-6))`） | 选中图标颜色 |
| `--rate-size` | `var(--o-icon_size_control-xs)`（medium） | 图标尺寸 |
| `--rate-gap` | `8px`（medium） | 图标间距 |
| `--rate-popover-color` | `var(--o-color-info1)` | 气泡文字颜色 |
| `--rate-popover-text-size` | `var(--o-font_size-tip1)` | 气泡文字字号 |
| `--rate-popover-text-height` | `var(--o-line_height-tip2)` | 气泡文字行高 |
| `--rate-popover-radius` | `var(--o-radius_control-s)` | 气泡圆角 |
| `--rate-popover-padding` | `2px 8px` | 气泡内边距 |

**使用示例**：
```vue
<ORate v-model="score" style="--rate-color-selected: #7c3aed; --rate-gap: 16px" />
```

### 响应式行为表

本组件无响应式差异。

### 组件布局结构

**ORate 评分**
```yaml
layout:
  tag: div
  direction: horizontal
  align: center
  gap: var(--rate-gap)  # large: 12px, medium: 8px
  class: o-rate o-rate-{color} o-rate-{size}
  regions:
    - name: rate-items
      repeat: count  # 默认 5
      children:
        - name: rate-item (ORateItem)
          description: 单个评分图标
          size: var(--rate-size)  # large: 控件 l, medium: 控件 xs
          color: var(--rate-color) 或 var(--rate-color-selected)
          states:
            full: 整个图标填充选中色
            half: 左半填充选中色，右半灰色
            empty: 整个图标灰色描边
          children:
            - { type: slot, name: icon }  # 默认 IconStar
  with-labels:
    description: 传入 labels 后每个 rate-item 外包 OPopover
    children:
      - name: popover-wrapper
        children:
          - { type: component, name: OPopover }
          - target: rate-item
          - content: labels[index] 文字
  variants:
    large: { icon-size: "控件 l", gap: 12px }
    medium: { icon-size: "控件 xs", gap: 8px }
  color-variants:
    normal: { selected-color: "rgb(var(--o-yellow-6))" }
    primary: { selected-color: "var(--o-color-main1)" }
    success: { selected-color: "var(--o-color-success1)" }
    warning: { selected-color: "var(--o-color-warning1)" }
    danger: { selected-color: "var(--o-color-danger1)" }
```

### 设计稿识别指南

**视觉特征指纹**

1. 一排等间距星星图标，部分填充彩色、部分灰色 → 匹配 ORate
2. 星星图标左半彩色右半灰色 → 匹配 ORate（allowHalf 半星模式）
3. 星星图标上方有文字气泡提示 → 匹配 ORate（带 labels）
4. 非星星的自定义图标一排排列有填充/空状态 → 匹配 ORate（自定义 icon 插槽）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 选中颜色 | 黄色（`--o-yellow-6`） | color | `'normal'` | 默认值 |
| 选中颜色 | 品牌蓝（`--o-color-main1`） | color | `'primary'` | — |
| 选中颜色 | 绿色（`--o-color-success1`） | color | `'success'` | — |
| 选中颜色 | 橙色（`--o-color-warning1`） | color | `'warning'` | — |
| 选中颜色 | 红色（`--o-color-danger1`） | color | `'danger'` | — |
| 图标尺寸 | 大（控件 l） | size | `'large'` | — |
| 图标尺寸 | 小（控件 xs） | size | `'medium'` | — |
| 图标间距 | 12px | size | `'large'` | — |
| 图标间距 | 8px | size | `'medium'` | — |
| 半星填充 | 左半彩色右半灰色 | allowHalf | `true` | — |
| 星星数量 | 非 5 个 | count | 对应数值 | 默认 5 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| ORate | OSlider | ORate 是离散图标点选（星星），OSlider 是连续轨道拖拽 |
| ORate | 图标列表 | ORate 图标有填充/未填充关联状态且可交互，纯图标列表无此联动 |
| ORate（readonly） | 静态图标展示 | ORate readonly 仍是组件渲染有语义结构，纯展示通常为静态 SVG/img |

