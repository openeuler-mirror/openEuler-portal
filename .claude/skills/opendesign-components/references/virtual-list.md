> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OVirtualList 虚拟滚动列表

## Part A：设计理解卡

OVirtualList 是虚拟滚动列表组件，用于高性能渲染大量数据（万级别）。通过只渲染可视区域内的列表项，避免 DOM 数量过多导致的性能问题。支持固定高度和不定高度两种模式，内置滚动条。

### 数据

**list**（属性）：列表数据数组。每项需包含唯一 id。动态追加数据时 id 用于保持滚动位置。必填。

### 项高度

**itemSize**（属性）：每项的固定高度（像素）。所有项等高时传入此值，性能最优。不传则为不定高模式。

**defaultItemSize**（属性）：不定高模式下每项的预估默认高度。用于初始渲染计算。默认 80。

### 滚动

**defaultStartIndex**（属性）：初始滚动到第几项。默认 0（最顶部）。

**buffer**（属性）：前后预留的额外渲染项数。增大可减少快速滚动时的白屏。默认 1。

### 滚动条

**scrollbar**（属性）：滚动条配置。true 使用默认配置（always 显示、medium 尺寸），传对象可自定义。默认 true。

### 插槽区域

**default 插槽**（插槽）：列表项渲染内容。接收 item（当前项数据）和 index（索引）两个插槽参数。

### 事件

**renderChange**（事件）：可视区域渲染范围变化时触发。可获取 start（渲染起始）、end（渲染结束）、visible（可视起始）、count（可视数量）。

### 注意事项

虚拟滚动的子项不能使用 margin，会导致总高度计算不准确。应使用 padding 替代。

📱 **响应式行为**：本组件无响应式差异。

🧩 **布局结构**：虚拟列表由三层嵌套结构组成。最外层是固定高度的容器（o-virtual-list），中间是带有滚动条的滚动容器（o-virtual-list-wrapper），内部是按总列表高度撑开的虚拟占位体（o-virtual-body），其中仅渲染可视区域的列表项（o-virtual-render-list），通过 translateY 偏移定位到正确的滚动位置。每个列表项由 default 插槽渲染。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
regions: [wrapper(滚动容器) > body(虚拟高度占位) > render-list(可视区域列表项)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：固定高度的滚动列表区域，内含大量重复结构的列表项，右侧有滚动条 → 可能匹配 OVirtualList（当数据量较大时推荐使用）；从视觉上无法区分普通列表与虚拟列表，需根据数据量判断
- **Token → Prop 映射**：所有列表项等高 → itemSize 指定固定高度；列表项高度不等 → 不传 itemSize，使用 defaultItemSize 预估；右侧有滚动条 → scrollbar=true（默认）；无滚动条 → scrollbar=false
- **易混淆组件区分**：与普通 v-for 列表区分——数据量大（百条以上）时应使用 OVirtualList 优化性能，少量数据用普通列表即可；与 OScrollbar 区分——OVirtualList 内置了滚动条且包含虚拟滚动逻辑，OScrollbar 仅提供自定义滚动条样式

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OVirtualList } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
interface RenderIndexInfo {
  start: number;   // 渲染起始索引（含 buffer）
  end: number;     // 渲染结束索引（含 buffer）
  visible: number; // 可视区域起始索引
  count: number;   // 可视区域项数
}
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| list | `Array<unknown>` | — | `[]` | 列表数据（必填，需含 id） |
| itemSize | `number` | — | — | 固定项高度 |
| defaultItemSize | `number` | — | `80` | 不定高默认高度 |
| defaultStartIndex | `number` | — | `0` | 初始滚动位置 |
| buffer | `number` | — | `1` | 前后预留项数 |
| scrollbar | `boolean \| Partial<BaseScrollerPropsT>` | — | `true` | 滚动条配置 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| renderChange | `(renderIndex: RenderIndexInfo)` | 渲染范围变化时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | `{ item: any, index: number }` | 始终 | 每个列表项 | 无 |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| scrollToView(index, align?, behavior?) | `index: number, align?: 'start' \| 'end' \| 'center' \| 'nearest' \| number, behavior?: ScrollBehavior` | 滚动到指定项。align 默认 'start'，behavior 默认 'instant'。不定高场景下仅支持 'instant' |

### 典型使用场景与调用模板

**场景 1：固定高度列表**
适用于：所有项等高的大数据列表
```vue
<script setup>
import { ref } from 'vue';
const list = ref(Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `项目 ${i}` })));
</script>
<template>
  <OVirtualList :list="list" :item-size="48" style="height: 400px;">
    <template #default="{ item, index }">
      <div style="height: 48px; padding: 12px;">{{ item.name }}</div>
    </template>
  </OVirtualList>
</template>
```

**场景 2：不定高度列表**
适用于：每项高度不同的列表
```vue
<OVirtualList :list="list" :default-item-size="80" :buffer="3" style="height: 500px;">
  <template #default="{ item }">
    <div style="padding: 16px;">{{ item.content }}</div>
  </template>
</OVirtualList>
```

**场景 3：滚动到指定位置**
适用于：跳转到某一项
```vue
<script setup>
import { ref } from 'vue';
const virtualListRef = ref();
const jumpTo = (index) => {
  virtualListRef.value?.scrollToView(index, 'center');
};
</script>
<template>
  <OButton @click="jumpTo(500)">跳到第 500 项</OButton>
  <OVirtualList ref="virtualListRef" :list="list" :item-size="48" style="height: 400px;">
    <template #default="{ item }">
      <div style="height: 48px;">{{ item.name }}</div>
    </template>
  </OVirtualList>
</template>
```

**场景 4：自定义滚动条**
适用于：自定义滚动条外观
```vue
<OVirtualList :list="list" :item-size="48" :scrollbar="{ showType: 'hover', size: 'small' }" style="height: 400px;">
  <template #default="{ item }">
    <div style="height: 48px;">{{ item.name }}</div>
  </template>
</OVirtualList>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 固定高度 | `:list` + `:item-size` | 性能最优 |
| 不定高度 | `:list` + `:default-item-size` | 动态测量 |
| 大量数据 | `:buffer="3"` | 减少白屏 |
| 初始位置 | `:default-start-index` | 从中间开始 |
| 隐藏滚动条 | `:scrollbar="false"` | 无滚动条 |

### 可覆盖的 CSS 变量

OVirtualList 本身无可覆盖的 CSS 变量（`var.scss` 为空）。组件内部使用 `--content-height`、`--offsetY` 等变量由 JavaScript 动态计算并注入，不应手动覆盖。

列表项的样式应直接在 `default` 插槽的内容元素上设置，容器高度通过外部 `style` 传入：

```vue
<OVirtualList :list="list" :item-size="48" style="height: 400px;">
  <template #default="{ item }">
    <div style="height: 48px; padding: 12px;">{{ item.name }}</div>
  </template>
</OVirtualList>
```

### 响应式行为表

本组件无响应式差异。

### 组件布局结构

**通用布局（无响应式差异）**
```yaml
layout:
  element: div.o-virtual-list
  direction: vertical
  regions:
    - name: wrapper
      element: div.o-virtual-list-wrapper
      overflow: auto  # 带滚动条（v-scrollbar 指令）
      height: 继承父容器  # 需要外部设置固定高度
      children:
        - name: body
          element: div.o-virtual-body
          height: var(--content-height)  # 所有列表项总高度（虚拟撑高）
          children:
            - name: render-list
              element: div.o-virtual-render-list
              transform: translateY(var(--offsetY))  # 偏移到可视区域位置
              children:
                - name: render-item  # 仅渲染可视区域 + buffer 的项
                  element: div.o-virtual-render-item
                  repeat: startIndex..endIndex
                  height: itemSize (固定高度模式) 或 auto (不定高模式)
                  children:
                    - { type: slot, name: default, props: "{ item, index }" }
  scrollbar:
    directive: v-scrollbar
    default: { showType: "always", size: "medium" }
    configurable: true  # 通过 scrollbar prop 自定义
  modes:
    fixed-height:
      description: 传入 itemSize，所有项等高，性能最优
      item-height: itemSize  # 固定像素值
    variable-height:
      description: 不传 itemSize，使用 defaultItemSize 预估
      item-height: auto  # 渲染后动态测量（ResizeObserver）
      default-estimate: 80px  # defaultItemSize 默认值
```

### 设计稿识别指南

**视觉特征指纹**

1. 固定高度的滚动区域 + 内含大量重复结构的列表项 + 右侧滚动条 → 候选 OVirtualList（数据量大时）
2. 从设计稿视觉上无法区分普通列表与虚拟列表，应根据预期数据量（百条以上）决定使用
3. 列表项高度一致 → 推荐使用 itemSize 固定高度模式

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 列表项高度 | 所有项等高 N px | itemSize | `N` | 性能最优 |
| 列表项高度 | 不等高 | defaultItemSize | 预估值（默认 80） | 动态测量 |
| 滚动条 | 有 | scrollbar | `true` | 默认 |
| 滚动条 | 无 | scrollbar | `false` | — |
| 滚动条外观 | 小号/悬浮时显示 | scrollbar | `{ size: 'small', showType: 'hover' }` | — |
| 初始位置 | 从第 N 项开始 | defaultStartIndex | `N` | — |
| 容器高度 | 固定高度（如 400px） | — | CSS style | 必须外部设置 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OVirtualList | 普通 v-for 列表 | 数据量大（百条以上）时用 OVirtualList 优化性能，少量数据用普通列表 |
| OVirtualList | OScrollbar | OVirtualList 包含虚拟滚动逻辑 + 内置滚动条，OScrollbar 仅提供自定义滚动条样式 |
| OVirtualList | OTable（虚拟滚动） | OTable 是表格组件有列定义和表头，OVirtualList 是通用列表无表格结构 |
