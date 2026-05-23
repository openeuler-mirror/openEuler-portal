> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OStep 步骤条

## Part A：设计理解卡

OStep 是步骤条组件，用于展示流程进度或引导用户按步骤操作。由父容器 OStep 与子项 OStepItem 组合使用，支持水平和垂直两种方向布局，每个步骤项拥有独立的状态和图标。

### 方向

**direction**（属性，设置在 OStep 上）：步骤条的排列方向。"h" 水平排列，步骤项从左到右依次展示；"v" 垂直排列，步骤项从上到下依次展示。默认水平方向。

### 步骤项状态

每个步骤项通过 **status** 属性表达当前所处阶段：

- "finished"（已完成）：默认状态，显示绿色背景圆形标识
- "processing"（进行中）：显示品牌色背景，标题加粗突出
- "waiting"（等待中）：显示浅色背景，文字变为辅助色
- "failed"（失败）：显示危险色背景

相邻步骤之间有连接线，连接线颜色跟随前一步骤的状态变化。

### 步骤标识

**stepIndex**（属性，必填）：标识当前是第几步，从 0 开始计数，需在各步骤间保持连续。默认在圆形标识中显示步骤序号（stepIndex + 1）。

### 图标

**icon**（属性）：控制圆形标识中的内容。传 true 时根据状态自动选择图标（已完成显示对勾、失败显示感叹号）；传一个组件时使用该组件作为图标；不传或传 false 时显示步骤序号数字。

**icon 插槽**（插槽，OStepItem）：完全自定义圆形标识区域的内容。使用后 icon 属性失效，圆形背景色取消。

### 标题与描述

**title**（属性 / title 插槽）：步骤的标题文字，显示在圆形标识下方（水平）或右侧（垂直）。

**description**（属性 / default 插槽）：步骤的描述文字，显示在标题下方。

### 插槽区域

**default 插槽**（OStep）：放置 OStepItem 子组件。

**icon 插槽**（OStepItem）：替换步骤的圆形标识内容，需手动添加 class="o-step-item-icon" 以匹配图标尺寸。

**title 插槽**（OStepItem）：替换标题区域。

**default 插槽**（OStepItem）：替换描述区域。

**响应式行为**：在笔记本尺寸及以下（<=1440px），步骤标识圆形缩小，序号字号和标题字号减小；在竖屏平板尺寸及以下（<=768px），序号字号和标题字号进一步缩小。

🧩 **布局结构**：步骤条整体为水平（默认）或垂直排列的容器，内部放置多个 OStepItem。每个 OStepItem 由头部区域（圆形标识+连接线）和主体区域（标题+描述）组成。水平模式下，头部在上、主体在下，居中对齐；垂直模式下，头部在左、主体在右，左对齐。相邻步骤之间由连接线连接，连接线位置通过 ResizeObserver 动态计算。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal  # 默认，可切换 vertical
regions: [OStepItem(head(symbol+line) + main(title+desc)), ...]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：多个圆形标识（含数字或图标）+ 水平/垂直连接线 + 每个圆下方/右侧有标题文字 → 匹配 OStep；圆形颜色不同（绿/蓝/灰/红）表示不同状态 → OStepItem 不同 status
- **Token → Prop 映射**：
  - 绿色圆形+**对勾图标（✓）** → status="finished" + icon=true
  - 绿色圆形+**数字** → status="finished"（**不传 icon，默认显示序号**）
  - ⚠️ **finished 状态圆圈内是数字还是对勾，必须看设计图！** 两种情况都是绿色圆形，不能默认用 icon=true
  - 蓝色圆形+加粗标题 → status="processing"；灰色/浅色圆形 → status="waiting"；红色圆形+感叹号图标 → status="failed" + icon=true；圆内显示数字 → 不传 icon（默认）；水平排列 → direction="h"；垂直排列 → direction="v"
- **易混淆组件区分**：与 OTimeline 区分——OTimeline 是时间线事件记录，OStep 是流程步骤导航，OStep 有明确的状态色（finished/processing/waiting/failed）且每步有圆形数字标识；与 OBreadcrumb 区分——OBreadcrumb 是导航路径面包屑，没有圆形标识和连接线

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OStep, OStepItem } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type DirectionT = 'h' | 'v';
type StepItemStatusT = 'finished' | 'processing' | 'waiting' | 'failed';
```

### OStep Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| direction | `DirectionT` | 否 | `'h'` / `'v'` | `'h'` | 步骤条方向，h 水平、v 垂直 |

### OStepItem Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| stepIndex | `number` | 是 | — | — | 步骤序号，从 0 开始，需连续 |
| status | `StepItemStatusT` | 否 | `'finished'` / `'processing'` / `'waiting'` / `'failed'` | `'finished'` | 步骤状态 |
| title | `string` | 否 | — | — | 步骤标题 |
| description | `string` | 否 | — | — | 步骤描述 |
| icon | `boolean \| Component` | 否 | — | — | 步骤图标；true 为状态默认图标，传组件则渲染该组件，false/不传则显示序号 |

### Events 表

无自定义事件。OStep 和 OStepItem 均未定义 emits。

### Slots 表

**OStep Slots**

| 插槽名 | Slot Props | 说明 |
|--------|-----------|------|
| default | — | 放置 OStepItem 子组件 |

**OStepItem Slots**

| 插槽名 | Slot Props | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|
| icon | — | 圆形标识内容 | icon 属性逻辑或步骤序号 |
| title | — | 标题区域 | `props.title` |
| default | — | 描述区域 | `props.description` |

### 插槽层级关系

```
OStep
└── default ─── OStepItem (多个)
                 ├── icon ─── 替换圆形标识内容
                 ├── title ── 替换标题
                 └── default ─ 替换描述
```

### 典型使用场景与调用模板

**场景 1：基础水平步骤条**
适用于：流程引导、注册步骤
```vue
<OStep direction="h">
  <OStepItem :step-index="0" title="步骤一" description="描述信息" status="finished" :icon="true" />
  <OStepItem :step-index="1" title="步骤二" description="描述信息" status="processing" />
  <OStepItem :step-index="2" title="步骤三" description="描述信息" status="waiting" />
</OStep>
```

**场景 2：垂直步骤条**
适用于：侧边栏流程导航
```vue
<OStep direction="v">
  <OStepItem :step-index="0" title="步骤一" description="描述信息" status="finished" :icon="true" style="height: 80px" />
  <OStepItem :step-index="1" title="步骤二" description="描述信息" status="processing" style="height: 80px" />
  <OStepItem :step-index="2" title="步骤三" description="描述信息" status="waiting" style="height: 80px" />
</OStep>
```

**场景 3：带失败状态**
适用于：流程异常提示
```vue
<OStep direction="h">
  <OStepItem :step-index="0" title="提交" status="finished" :icon="true" />
  <OStepItem :step-index="1" title="审核" status="failed" :icon="true" />
  <OStepItem :step-index="2" title="完成" status="waiting" />
</OStep>
```

**场景 4：自定义图标**
适用于：品牌化步骤条、特殊图标需求
```vue
<script setup>
import { OStep, OStepItem, OIconFile } from '@opensig/opendesign';
</script>

<OStep direction="h">
  <OStepItem :step-index="0" title="上传文件" status="finished">
    <template #icon>
      <OIconFile class="o-step-item-icon" />
    </template>
  </OStepItem>
  <OStepItem :step-index="1" title="处理中" status="processing">
    <template #icon>
      <OIconFile class="o-step-item-icon" />
    </template>
  </OStepItem>
</OStep>
```

**场景 5：数据驱动 v-for 渲染**
适用于：动态步骤列表
```vue
<script setup>
import { OStep, OStepItem } from '@opensig/opendesign';

const steps = [
  { title: '步骤一', description: '描述', status: 'finished', icon: true },
  { title: '步骤二', description: '描述', status: 'processing', icon: false },
  { title: '步骤三', description: '描述', status: 'waiting', icon: false },
];
</script>

<OStep direction="h">
  <OStepItem
    v-for="(item, idx) in steps"
    :key="idx"
    :step-index="idx"
    :title="item.title"
    :description="item.description"
    :status="item.status"
    :icon="item.icon"
  />
</OStep>
```

**场景 6：可点击步骤条（自定义样式）**
适用于：允许用户点击跳转步骤
```vue
<script setup>
import { ref } from 'vue';
import { OStep, OStepItem, OIconFile } from '@opensig/opendesign';

const activeIndex = ref(0);
</script>

<OStep direction="h">
  <OStepItem
    v-for="(item, idx) in steps"
    :key="idx"
    :step-index="idx"
    :title="item.title"
    :class="{ active: activeIndex === idx }"
    class="clickable-step"
    @click="activeIndex = idx"
  >
    <template #icon>
      <OIconFile class="o-step-item-icon" />
    </template>
  </OStepItem>
</OStep>

<style scoped>
.clickable-step {
  --step-item-head-color: var(--o-color-info3);
  cursor: pointer;
}
.active {
  --step-item-head-color: var(--o-color-primary1);
  --step-item-title-color: var(--o-color-primary1);
  --step-item-title-font-weight: 600;
}
</style>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础水平步骤 | `direction="h"` + `:step-index` + `status` + `title` | 最简用法 |
| 垂直步骤 | `direction="v"` + `style="height: 80px"` | 垂直时需给 item 设高度 |
| 显示状态图标 | `:icon="true"` | 已完成显示对勾，失败显示感叹号 |
| 传入自定义图标组件 | `:icon="MyIcon"` | 直接传递组件对象 |
| 自定义图标插槽 | `#icon` + `class="o-step-item-icon"` | 圆形背景取消，需自行加 class |
| 带描述 | `title` + `description` | 标题 + 描述文字 |
| 纯标题 | `title`（不传 description） | 仅显示标题 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--step-item-head-size` | `var(--o-font_size-h4)` | 标识区序号字号 |
| `--step-item-head-height` | `var(--o-line_height-h4)` | 标识区序号行高 |
| `--step-item-title-size` | `var(--o-font_size-text1)` | 标题字号 |
| `--step-item-title-height` | `var(--o-line_height-text1)` | 标题行高 |
| `--step-item-title-font-weight` | `normal` | 标题字重（processing 状态下为 600） |
| `--step-item-desc-size` | `var(--o-font_size-tip2)` | 描述字号 |
| `--step-item-desc-height` | `var(--o-line_height-tip2)` | 描述行高 |
| `--step-item-head-width` | `var(--o-icon_size_control-l)` | 标识圆形宽高尺寸 |
| `--step-item-icon-size` | `var(--o-icon_size-m)` | 状态图标尺寸 |
| `--step-item-gap` | `8px` | 步骤间距 |
| `--step-item-main-gap` | `8px` | 主体区域内容间距（垂直模式下为 0） |
| `--step-item-desc-gap` | `4px` | 描述与标题的间距 |
| `--step-item-line-gap` | `8px` | 连接线与标识的间距 |
| `--step-item-line-height` | `1px` | 连接线粗细 |
| `--step-item-align` | `center` | 水平模式对齐方式（垂直模式下为 left） |
| `--step-item-head-bg` | `var(--o-color-success1)` | 标识圆形背景色（跟随状态变化） |
| `--step-item-head-color` | `var(--o-color-white)` | 标识区文字/图标颜色 |
| `--step-item-title-color` | `var(--o-color-info2)` | 标题颜色（跟随状态变化） |
| `--step-item-desc-color` | `var(--o-color-info3)` | 描述文字颜色 |
| `--step-item-line-bg` | `var(--o-color-control4)` | 连接线颜色（跟随状态变化） |
| `--step-item-main-padding` | `0 12px` | 主体区域内边距（垂直模式下为 0） |

**使用示例**:
```vue
<OStep style="--step-item-title-font-weight: 600">
  <OStepItem :step-index="0" title="自定义步骤" status="finished" />
</OStep>
```

### 响应式行为表

| 维度 | <=768px (pad_v) | <=1440px (laptop) | >1440px |
|------|-----------------|-------------------|---------|
| 标识圆形大小 | control-m | control-m | control-l |
| 标识字号 | tip1 | text1 | h4 |
| 标题字号 | tip2 | tip1 | text1 |
| 图标尺寸 | — | icon_size-s | icon_size-m |

### 组件布局结构

**桌面端 >1440px（水平模式 direction="h"）**
```yaml
layout:
  direction: horizontal
  class: o-step o-step-h
  children:
    - name: OStepItem  # 重复多个
      class: o-step-item o-step-item-h o-step-item-{status}
      direction: vertical
      align: center
      regions:
        - name: head
          class: o-step-item-head
          children:
            - name: line
              class: o-step-item-line
              type: ODivider
              direction: horizontal
              height: 1px
              description: 连接线，位置动态计算，颜色跟随前一步骤状态
            - name: symbol
              class: o-step-item-symbol
              width: var(--o-icon_size_control-l)
              height: var(--o-icon_size_control-l)
              border-radius: 50%
              background: var(--step-item-head-bg)  # 跟随 status
              color: var(--o-color-white)
              font-size: var(--o-font_size-h4)
              children:
                - { type: slot, name: icon }  # 或 stepIndex+1 数字，或状态图标
        - name: main
          class: o-step-item-main
          padding: "0 12px"
          gap: 8px
          align: center
          children:
            - name: title
              class: o-step-item-title
              font-size: var(--o-font_size-text1)
              color: var(--step-item-title-color)  # 跟随 status
              font-weight: normal  # processing 为 600
            - name: description
              class: o-step-item-desc
              font-size: var(--o-font_size-tip2)
              color: var(--o-color-info3)
              gap: 4px
  status-colors:
    finished: { head-bg: success1, line-bg: control4, title-color: info2 }
    processing: { head-bg: primary1, line-bg: primary1, title-color: primary1, title-weight: 600 }
    waiting: { head-bg: primary4, line-bg: control4, title-color: info3 }
    failed: { head-bg: danger1, line-bg: control4, title-color: info2 }
```

**垂直模式 direction="v"**
```yaml
# 每个 OStepItem 水平排列: head(左) + main(右)
# align: left
# main-padding: 0, main-gap: 0
# 连接线为垂直方向
# 需给每个 OStepItem 设置 style="height: Xpx" 控制间距
```

**≤1440px**
```yaml
# 标识圆形: icon_size_control-m
# 标识字号: text1 (从 h4 缩小)
# 标题字号: tip1 (从 text1 缩小)
# 图标尺寸: icon_size-s (从 m 缩小)
```

**≤768px**
```yaml
# 标识字号: tip1 (进一步缩小)
# 标题字号: tip2 (进一步缩小)
```

### 设计稿识别指南

**视觉特征指纹**

1. 多个圆形标识水平排列 + 圆内有数字 + 圆之间有连接线 + 圆下方有标题文字 → 匹配 OStep（水平模式）
2. 多个圆形标识垂直排列 + 圆右侧有标题 + 圆之间有垂直连接线 → 匹配 OStep（垂直模式）
3. 圆形内有对勾图标（绿色背景）→ OStepItem status="finished" + icon=true
4. 圆形蓝色背景 + 标题加粗 → OStepItem status="processing"
5. 圆形红色背景 + 感叹号图标 → OStepItem status="failed" + icon=true

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 排列方向 | 水平（从左到右） | direction | `'h'` | 默认 |
| 排列方向 | 垂直（从上到下） | direction | `'v'` | — |
| 圆形背景色 | `--o-color-success1` 绿色 | status | `'finished'` | 默认状态 |
| 圆形背景色 | `--o-color-primary1` 蓝色 | status | `'processing'` | 标题加粗 |
| 圆形背景色 | `--o-color-primary4` 浅灰蓝 | status | `'waiting'` | — |
| 圆形背景色 | `--o-color-danger1` 红色 | status | `'failed'` | — |
| 圆内内容 | 数字 | icon | `false` / 不传 | 显示 stepIndex+1 |
| 圆内内容 | 对勾/感叹号图标 | icon | `true` | 根据状态自动选择 |
| 圆内内容 | 自定义图标 | icon | `Component` | 传入组件 |
| 圆形尺寸 | icon_size_control-l（约 40px） | — | — | 桌面端默认 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OStep | OTimeline | OTimeline 是时间线事件列表（无状态色圆形标识），OStep 有明确的步骤序号和状态色圆形 |
| OStep | OBreadcrumb | OBreadcrumb 是路径导航面包屑（文字+分隔符），OStep 有圆形标识和连接线 |
| OStep | ONav / 导航菜单 | 导航菜单是页面路由切换，OStep 是流程进度展示，有 finished/processing/waiting 状态 |

