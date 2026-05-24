> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OCollapse 折叠面板

## Part A：设计理解卡

OCollapse 是折叠面板组件，用于将内容分组后折叠/展开显示，节省页面空间。包含 OCollapse（容器）和 OCollapseItem（面板项）。

### 展开控制

**modelValue**（属性）：当前展开的面板值数组（v-model 双向绑定）。数组中包含哪些面板的 value，哪些面板就展开。

**defaultValue**（属性）：非受控模式下默认展开的面板值数组。默认空数组（全部收起）。

**accordion**（属性）：手风琴模式。开启后同一时间只能展开一个面板，点击新面板时自动收起已展开的面板。默认关闭。

### 事件

**change**（事件）：展开/收起面板后触发，可获取当前展开的面板值数组。

---

### OCollapseItem 折叠面板项

**value**（属性）：面板的唯一标识（字符串或数字），与 OCollapse 的 modelValue 对应。必填。

**title**（属性）：面板标题文字。

**title 插槽**（插槽）：替换面板标题区域的默认文字渲染。替换后 title 属性失效。可用于在标题中添加图标等自定义内容。

**default 插槽**（插槽）：面板展开后显示的内容区域。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），容器内边距缩小、标题和正文字号缩小、内容区域间距减少。在平板竖屏及以下（≤840px），容器内边距进一步缩小、圆角变小、标题区域内边距减少。

🧩 **布局结构**：OCollapse 为纵向堆叠容器，内部包含多个 OCollapseItem。每个 Item 由标题行（header）和内容区域（body）纵向排列组成；标题行内部使用 flex row-reverse 布局，标题文字在左、展开图标在右（通过 space-between 实现）。各 Item 之间通过底部分割线分隔。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: column
regions: [OCollapseItem, OCollapseItem, ...]
item-direction: column
item-regions: [header(row-reverse: title + icon), body]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：圆角容器内纵向排列多个可折叠面板项；每项由标题行（左文字+右箭头图标）和可展开的内容区域组成；各项之间有细分割线；展开项的标题变为主题色加粗、箭头旋转
- **Token → Prop 映射**：背景色 `--o-color-fill2` 对应容器默认样式；标题色 `--o-color-primary1` 表示展开态；箭头图标 `--o-icon_size_control-m` 对应展开/收起指示器
- **易混淆组件区分**：与 Accordion（手风琴）不是独立组件，而是 OCollapse 的 `accordion` 属性模式；与 Tabs 区分——Tabs 是横向标签切换内容，Collapse 是纵向标题折叠/展开内容

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OCollapse, OCollapseItem } from '@opensig/opendesign';
</script>
```

### OCollapse Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `Array<string \| number>` | — | — | 展开的面板值数组（v-model） |
| defaultValue | `Array<string \| number>` | — | `[]` | 非受控时默认展开的面板 |
| accordion | `boolean` | — | `false` | 手风琴模式 |

### OCollapseItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number` | — | — | 面板唯一标识（必填） |
| title | `string` | — | — | 面板标题 |

### Events 表

#### OCollapse Events

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: Array<string \| number>)` | 展开/收起时 |
| change | `(val: Array<string \| number>, evt?: Event)` | 展开/收起后 |

### Slots 表

#### OCollapse Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 面板项列表 | 无 |

#### OCollapseItem Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| title | — | 始终 | 标题文字区域 | `{{ title }}` |
| default | — | 面板展开时显示 | 内容区域 | 无 |

### 插槽层级关系

```
OCollapse default
└── OCollapseItem
    ├── title（替换标题文字）
    └── default（展开后的内容）
```

### 典型使用场景与调用模板

**场景 1：基础折叠面板**
适用于：FAQ、内容分组展示
```vue
<script setup>
import { ref } from 'vue';
const expanded = ref([1]);
</script>
<template>
  <OCollapse v-model="expanded">
    <OCollapseItem title="标题 1" :value="1">
      <p>面板 1 的内容</p>
    </OCollapseItem>
    <OCollapseItem title="标题 2" :value="2">
      <p>面板 2 的内容</p>
    </OCollapseItem>
    <OCollapseItem title="标题 3" :value="3">
      <p>面板 3 的内容</p>
    </OCollapseItem>
  </OCollapse>
</template>
```

**场景 2：手风琴模式**
适用于：同一时间只看一个面板
```vue
<OCollapse accordion>
  <OCollapseItem title="面板 A" :value="1">
    <p>内容 A</p>
  </OCollapseItem>
  <OCollapseItem title="面板 B" :value="2">
    <p>内容 B</p>
  </OCollapseItem>
</OCollapse>
```

**场景 3：受控模式（强制至少一个面板展开）**
适用于：自定义展开逻辑
```vue
<script setup>
import { ref } from 'vue';
const expanded = ref([1]);
const handleUpdate = (val) => {
  // 确保至少有一个面板展开
  if (val.length > 0) {
    expanded.value = [val[val.length - 1]]; // 只保留最新展开的
  }
};
</script>
<template>
  <OCollapse :model-value="expanded" @update:modelValue="handleUpdate">
    <OCollapseItem title="面板 1" :value="1">内容 1</OCollapseItem>
    <OCollapseItem title="面板 2" :value="2">内容 2</OCollapseItem>
    <OCollapseItem title="面板 3" :value="3">内容 3</OCollapseItem>
  </OCollapse>
</template>
```

**场景 4：自定义标题（含图标）**
适用于：标题需要图标或复杂内容
```vue
<OCollapse accordion>
  <OCollapseItem :value="1">
    <template #title>
      <OIconFile style="font-size: var(--o-icon_size-m); margin-right: var(--o-gap-2);" />
      <span>带图标的标题</span>
    </template>
    <p>面板内容</p>
  </OCollapseItem>
</OCollapse>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础折叠 | `v-model` + `value` + `title` | 最常见用法 |
| 手风琴 | `accordion` | 同时只展开一个 |
| 默认展开 | `:default-value="[1]"` | 非受控模式默认展开 |
| 自定义标题 | `#title` 插槽 | 替换标题文字 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--collapse-radius` | `var(--o-radius_control-l)` | 容器圆角 |
| `--collapse-bg-color` | `var(--o-color-fill2)` | 容器背景色 |
| `--collapse-padding` | `8px 32px` | 容器内边距 |
| `--collapse-division-color` | `var(--o-color-control4)` | 面板项分割线颜色 |
| `--collapse-item-header-padding` | `25px 0px` | 标题区域内边距 |
| `--collapse-item-title-color` | `var(--o-color-info1)` | 标题文字颜色（收起态） |
| `--collapse-item-title-color_expanded` | `var(--o-color-primary1)` | 标题文字颜色（展开态） |
| `--collapse-item-title-text-size` | `var(--o-font_size-h3)` | 标题字号 |
| `--collapse-item-title-text-height` | `var(--o-line_height-h3)` | 标题行高 |
| `--collapse-item-body-text-size` | `var(--o-font_size-text1)` | 内容区文字字号 |
| `--collapse-item-body-text-height` | `var(--o-line_height-text1)` | 内容区文字行高 |
| `--collapse-item-icon-color` | `var(--o-color-info1)` | 展开图标颜色 |
| `--collapse-item-icon-size` | `var(--o-icon_size_control-m)` | 展开图标大小 |
| `--collapse-item-gap` | `var(--o-gap-5)` | 内容区底部间距 |

**使用示例**��
```vue
<OCollapse style="--collapse-bg-color: transparent; --collapse-padding: 0">
  <OCollapseItem title="面板" :value="1">内容</OCollapseItem>
</OCollapse>
```

### 响应式行为表

| 维度 | ≤840px | 841–1200px | >1200px |
|------|--------|-----------|---------|
| 容器内边距 | 0 16px | 8px 24px | 8px 32px |
| 标题区域内边距 | 16px 0 | 19px 0 | 25px 0 |
| 标题字号 | text1 | text2 | h3 |
| 正文字号 | tip1 | tip1 | text1 |
| 内容间距 | gap-3 | gap-4 | gap-5 |
| 圆角 | radius-s | radius-l | radius-l |

### CSS 变量定制

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `--collapse-radius` | 圆角大小 | `var(--o-radius_control-l)` |
| `--collapse-bg-color` | 背景色 | `var(--o-color-fill2)` |
| `--collapse-padding` | 容器内边距 | `8px 32px` |
| `--collapse-division-color` | 分割线颜色 | `var(--o-color-control4)` |
| `--collapse-item-header-padding` | 标题区域内边距 | `25px 0` |
| `--collapse-item-title-color` | 标题文字颜色 | `var(--o-color-info1)` |
| `--collapse-item-title-text-size` | 标题字号 | `var(--o-font_size-h3)` |
| `--collapse-item-body-text-size` | 正文字号 | `var(--o-font_size-text1)` |
| `--collapse-item-icon-color` | 展开图标颜色 | `var(--o-color-info1)` |
| `--collapse-item-icon-size` | 展开图标大小 | `var(--o-icon_size_control-m)` |
| `--collapse-item-gap` | 内容区域底部间距 | `var(--o-gap-5)` |

### 组件布局结构

```yaml
component: OCollapse
root: .o-collapse
  direction: column  # 内部slot纵向排列OCollapseItem
  background-color: var(--collapse-bg-color)  # var(--o-color-fill2)
  padding: var(--collapse-padding)  # 8px 32px
  border-radius: var(--collapse-radius)  # var(--o-radius_control-l)
  children:
    - component: OCollapseItem
      root: .o-collapse-item
        border-bottom: 1px solid var(--collapse-division-color)  # var(--o-color-control4)，最后一项透明
        children:
          - region: header
            class: .o-collapse-item-header
            display: flex
            flex-direction: row-reverse  # 图标在DOM前、标题在后，视觉上标题左+图标右
            justify-content: space-between
            padding: var(--collapse-item-header-padding)  # 25px 0
            cursor: pointer
            children:
              - region: icon
                class: .o-collapse-item-icon
                font-size: var(--collapse-item-icon-size)  # var(--o-icon_size_control-m)
                color: var(--collapse-item-icon-color)  # var(--o-color-info1)
                transform: rotate(90deg)  # 收起态，展开态rotate(-90deg)
                transition: transform var(--o-duration-m2) var(--o-easing-standard)
              - region: title
                class: .o-collapse-item-title
                font-size: var(--collapse-item-title-text-size)  # var(--o-font_size-h3)
                line-height: var(--collapse-item-title-text-height)  # var(--o-line_height-h3)
                color: var(--collapse-item-title-color)  # var(--o-color-info1)
                overflow: hidden; text-overflow: ellipsis; white-space: nowrap
          - region: body
            class: .o-collapse-item-body
            v-show: isExpanded  # 通过Transition动画控制展开/收起
            font-size: var(--collapse-item-body-text-size)  # var(--o-font_size-text1)
            line-height: var(--collapse-item-body-text-height)  # var(--o-line_height-text1)
            margin-bottom: var(--collapse-item-gap)  # var(--o-gap-5)
            transition: height var(--o-duration-m2) var(--o-easing-standard)

  # 展开态样式(.o-collapse-item-expanded)
  expanded-state:
    title:
      font-weight: 600
      color: var(--collapse-item-title-color_expanded)  # var(--o-color-primary1)
    icon:
      transform: rotate(-90deg)
```

### 设计稿识别指南

**视觉特征指纹**

1. 圆角矩形容器（浅灰背景 `--o-color-fill2`），内部包含多个面板项，项之间有水平分割线（`--o-color-control4`）
2. 每个面板项的标题行由左侧文字和右侧 V 形箭头图标组成（flex row-reverse + space-between 实现）
3. 展开态的面板标题变为主题色（`--o-color-primary1`）、字重加粗（600），箭头图标旋转 180 度（从朝下变为朝上）；内容区域通过高度过渡动画展开

**设计 Token → Prop 值映射表**

| 设计稿 Token / 视觉特征 | 对应 Prop / 配置 | 说明 |
|---|---|---|
| 容器背景 `--o-color-fill2` | 默认样式，无需配置 | 组件默认外观 |
| 展开标题色 `--o-color-primary1` | `modelValue` 包含该项 value | 展开态自动变色 |
| 同时只展开一项 | `accordion` | 手风琴模式 |
| 某些项初始展开 | `defaultValue` 或 `v-model` | 控制初始展开项 |
| 自定义标题区域（含图标等） | `#title` 插槽 | 替换纯文字标题 |

**易混淆组件区分表**

| 组件 A | 组件 B | 区分标准 |
|--------|--------|---------|
| OCollapse | OTabs | Collapse 纵向折叠展开，标题在每项顶部；Tabs 横向标签页切换，标签在顶部/底部统一排列 |
| OCollapse (accordion) | OCollapse (默认) | 手风琴模式同时只展开一项；默认模式可同时展开多项 |
| OCollapse | ODetails (HTML原生) | OCollapse 提供统一容器管理多面板状态；原生 details 各自独立、无法联动 |

