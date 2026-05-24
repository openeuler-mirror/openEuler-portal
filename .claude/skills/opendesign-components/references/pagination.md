> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OPagination 分页

## Part A：设计理解卡

OPagination 是分页组件，用于数据量较大时分页展示。可灵活组合四种控件：总数标签、每页条数选择器、页码按钮、页码跳转输入框。支持简洁模式和更多页码弹出浮层。

### 布局

**layout**（属性）：显示哪些控件，通过数组组合。可选 "total"（总数标签）、"pagesize"（每页条数选择器）、"pager"（页码按钮）、"jumper"（跳转输入框）。默认包含 pagesize、pager、jumper。

**simple**（属性）：是否使用简洁布局。开启后只显示页码区域（上/下页 + 当前页/总页数输入框），layout 和 showPageCount 属性失效。默认关闭。

### 数据

**total**（属性）：数据总条数。默认 0。

**page**（属性）：当前页码（v-model:page 双向绑定）。默认 1。

**pageSize**（属性）：每页数据条数（v-model:pageSize 双向绑定）。默认为 pageSizes 数组的第一项。

**pageSizes**（属性）：每页条数的可选项数组。默认 [6, 12, 24, 48]。

### 外观

**variant**（属性）：按钮样式。"outline" 线框、"solid" 实心。默认 outline。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 页码控制

**showPageCount**（属性）：最多显示多少个页码按钮。超出部分显示省略号。默认 9。

**showMore**（属性）：省略号按钮上悬停时是否弹出隐藏的页码列表（页码超过 50 项时使用虚拟列表）。默认开启。

### 插槽区域

**total 插槽**（插槽）：替换总数标签区域。可获取 total（总条数）和 pageCount（总页数），用于自定义展示格式。需 layout 包含 "total"。

### 事件

**change**（事件）：页码或每页条数变化时触发。可获取变化前后的 page 和 pageSize。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），页码按钮尺寸从标准缩至 28px，按钮间距缩小。

🧩 **布局结构**：分页组件水平排列，由最多四个可配置区域从左到右依次组成：总数标签区（显示"共 X 条"）、每页条数选择器（OSelect 下拉选择）、页码按钮区（上一页 + 页码按钮列表 + 下一页）、页码跳转区（"前往"+ 输入框）。简洁模式下仅显示页码区（上/下页 + 当前页/总页数输入框）。页码按钮间距 24px，按钮与选择器间距 12px。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [total(总数标签), pagesize(每页条数选择器), pager(页码按钮区), jumper(跳转输入框)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：页面底部水平排列的一组页码按钮（数字 1/2/3...）+ 前后翻页箭头，可能伴有下拉选择器和跳转输入框 → 匹配 OPagination
- **Token → Prop 映射**：按钮有边框线 → variant="outline"；按钮实心填充 → variant="solid"；半圆角按钮 → round="pill"；显示"共 X 条" → layout 包含 'total'；有"前往"输入框 → layout 包含 'jumper'；仅上下页+页码数字 → simple 模式
- **易混淆组件区分**：与手动按钮组区分——OPagination 是完整的分页逻辑组件含页码计算、页码跳转等内置功能；与 OTabs 区分——OTabs 是内容切换标签页，OPagination 是数据分页导航

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OPagination } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type PaginationVariantT = 'solid' | 'outline';
type PaginationLayoutT = Array<'total' | 'pagesize' | 'pager' | 'jumper'>;
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| layout | `PaginationLayoutT` | `'total'` / `'pagesize'` / `'pager'` / `'jumper'` 组合 | `['pagesize', 'pager', 'jumper']` | 布局控件 |
| variant | `PaginationVariantT` | `'solid'` / `'outline'` | `'outline'` | 按钮样式 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| pageSizes | `number[]` | — | `[6, 12, 24, 48]` | 每页条数选项 |
| pageSize | `number` | — | `6`（pageSizes[0]） | 每页条数（v-model） |
| total | `number` | — | `0` | 数据总数 |
| page | `number` | — | `1` | 当前页码（v-model） |
| showPageCount | `number` | — | `9` | 最多显示页码数 |
| showMore | `boolean` | — | `true` | 省略号弹出页码 |
| showTotal | `boolean` | — | — | 是否显示总数据量（已废弃，请在 layout 中配置 'total'） |
| simple | `boolean` | — | `false` | 简洁模式 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:page | `(val: number)` | 页码变化时 |
| update:pageSize | `(val: number)` | 每页条数变化时 |
| change | `(newValue: { page, pageSize }, oldValue: { page, pageSize })` | 页码或每页条数变化时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| total | `{ total: number, pageCount: number }` | layout 包含 'total' | 总数标签区域 | `共 {total} 条` |

### 暴露属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| pageCount | `ComputedRef<number>` | 总页数 |

### 典型使用场景与调用模板

**场景 1：基础分页**
适用于：最常见的列表分页
```vue
<script setup>
import { ref } from 'vue';
const page = ref(1);
const pageSize = ref(12);
</script>
<template>
  <OPagination v-model:page="page" v-model:page-size="pageSize" :total="100" />
</template>
```

**场景 2：完整布局（含总数）**
适用于：需显示总数据量
```vue
<OPagination
  v-model:page="page"
  v-model:page-size="pageSize"
  :total="200"
  :layout="['total', 'pagesize', 'pager', 'jumper']"
/>
```

**场景 3：自定义总数标签**
适用于：定制化展示
```vue
<OPagination :total="100" :page-size="10" :layout="['total', 'pager']">
  <template #total="{ total, pageCount }">
    共 <b>{{ total }}</b> 条，<b>{{ pageCount }}</b> 页
  </template>
</OPagination>
```

**场景 4：简洁模式**
适用于：空间有限的场景
```vue
<OPagination :total="100" simple />
```

**场景 5：自定义每页条数选项**
适用于：特定业务需求
```vue
<OPagination :total="500" :page-sizes="[10, 20, 50, 100]" />
```

**场景 6：圆角按钮**
适用于：风格定制
```vue
<OPagination :total="100" round="pill" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础分页 | `v-model:page` + `:total` | 最常见 |
| 带总数 | `:layout="['total', 'pagesize', 'pager', 'jumper']"` | 完整控件 |
| 简洁模式 | `simple` | 极简分页 |
| 实心按钮 | `variant="solid"` | 填充风格 |
| 自定义条数 | `:page-sizes="[10, 20, 50]"` | 自定义选项 |
| 监听变化 | `@change` | 获取前后值对比 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--pagination-item-size` | `var(--o-control_size-m)` | 页码按钮尺寸（高度和宽度） |
| `--pagination-arrow-size` | `var(--o-control_size-s)` | 上/下一页箭头按钮尺寸 |
| `--pagination-item-gap` | `24px` | 各区块（总数、pagesize、pager、jumper）之间的间距 |
| `--pagination-item-sm-gap` | `8px` | pagesize 与 jumper 内部控件的间距 |
| `--pagination-item-size-gap` | `12px` | 页码数字按钮之间的间距 |
| `--pagination-radius` | `var(--o-radius_control-s)` | 页码按钮圆角（pill 时为 `var(--pagination-item-size)`） |

**使用示例**：
```vue
<!-- 紧凑分页：减小区块间距 -->
<OPagination style="--pagination-item-gap: 12px" v-model:page="page" :total="100" />
```

### 响应式行为表

| 维度 | ≤1440px | >1440px |
|------|---------|---------|
| 页码按钮尺寸 | 28px | 标准 |
| 按钮间距 | 16px | 标准 |
| 按钮与选择器间距 | 8px | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  direction: horizontal
  align: center
  regions:
    - name: total
      condition: layout 包含 'total'
      children:
        - { type: slot, name: total }  # 默认 "共 {total} 条"
    - name: pagesize
      condition: layout 包含 'pagesize'
      children:
        - { type: component, name: OSelect }  # 每页条数选择器
      gap: 12px  # --pagination-item-size-gap
    - name: pager
      direction: horizontal
      align: center
      gap: 24px  # --pagination-item-gap
      children:
        - name: prev
          children:
            - { type: icon, name: IconChevronLeft }
          disabled: page === 1
        - name: pages
          direction: horizontal
          children:
            - type: page-buttons  # 页码按钮列表，含省略号弹出
        - name: next
          children:
            - { type: icon, name: IconChevronRight }
          disabled: page === totalPage
    - name: jumper
      condition: layout 包含 'jumper'
      children:
        - { type: text, content: "前往" }
        - { type: component, name: OInputNumber }
  variants:
    outline: { border: var(--o-color-control1) }
    solid: { background: transparent → hover 变色 }
    simple:
      pager 仅含: prev + "当前页/总页数" 输入框 + next
      layout/showPageCount 失效
    pill: { border-radius: "var(--pagination-item-size)" }
  item-size: var(--o-control_size-m)
  arrow-size: var(--o-control_size-s)
```

**≤1440px (laptop)**
```yaml
# item-size: 28px
# item-gap: 16px
# item-size-gap: 8px
```

### 设计稿识别指南

**视觉特征指纹**

1. 一排水平页码数字按钮 + 左右翻页箭头 + 当前页高亮 → 匹配 OPagination
2. "共 X 条" 标签 + 每页条数下拉 + 页码按钮 + "前往"输入框的组合 → 匹配 OPagination（完整布局）
3. 仅上下页箭头 + "当前页/总页数" → 匹配 OPagination（simple 模式）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 按钮样式 | 有边框线框 | variant | `'outline'` | 默认 |
| 按钮样式 | 实心填充背景 | variant | `'solid'` | — |
| 按钮圆角 | 全圆角 | round | `'pill'` | — |
| 显示区域 | 有"共 X 条" | layout | 包含 `'total'` | — |
| 显示区域 | 有每页条数下拉 | layout | 包含 `'pagesize'` | — |
| 显示区域 | 有"前往"输入框 | layout | 包含 `'jumper'` | — |
| 整体样式 | 仅上下页+页码数 | simple | `true` | — |
| 当前页高亮 | 蓝色实心背景 | — | — | 当前页自动高亮，DOM class 为 `active`（`.o-pagination-item.active`） |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OPagination | OTabs | OTabs 是内容面板切换标签，OPagination 是数据分页导航，含页码计算逻辑 |
| OPagination | 手动 OButton 组 | OPagination 内置分页逻辑（页码计算、跳转、每页条数），无需手动实现 |
| OPagination（simple） | 输入框+箭头 | simple 模式是完整分页组件的极简形态，仍含分页逻辑 |

