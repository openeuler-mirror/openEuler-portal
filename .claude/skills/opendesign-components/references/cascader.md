> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OCascader 级联选择

## Part A：设计理解卡

OCascader 是级联选择器组件，让用户从一组树形结构的选项中逐层选择。选项以多列面板形式展开，每选择一级后自动展开下一级。包含 OCascader（完整选择器）和 OCascaderPanel（纯面板，可嵌入自定义容器）。

### 值与数据

**modelValue**（属性）：选中值（v-model 双向绑定）。默认模式下为叶子节点的 value 值（字符串或数字）；路径模式下为从根到叶子的路径数组。

**options**（属性）：选项数据，树形结构数组。每项包含 value（值）、label（显示文本）、children（子项数组，可选）。

**pathMode**（属性）：是否使用路径模式。开启后 modelValue 为完整路径数组（如 `['1', '1-1', '1-1-1']`），否则仅为叶子节点的 value 值。默认关闭。

### 触发与展开

**trigger**（属性）：弹出级联菜单的触发方式。默认 "click"。触控设备上 hover 自动降级为 click。

**expandTrigger**（属性）：展开子菜单选项的触发方式。"click" 点击展开、"hover" 悬停展开。默认 click。触控设备上统一为 click。

### 外观

**variant**（属性）：选择器按钮样式。"solid" 实心、"outline" 线框、"text" 纯文字。默认 outline。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

**size**（属性）：选择器尺寸。"small"、"medium"、"large"。默认 large。

**placeholder**（属性）：占位提示文本。

### 选项面板

**optionPosition**（属性）：选项面板弹出位置。支持 top/bottom/left/right 及组合值如 bl（底部左对齐）、tr（顶部右对齐）等。默认 bl。

**optionWrapClass**（属性）：选项面板容器自定义类名。

**unmountOnHide**（属性）：面板隐藏时是否销毁 DOM。默认开启。

**transition**（属性）：过渡动画名称。

### 事件

**change**（事件）：选中值变化时触发，可获取新选中的值（路径模式为数组，否则为叶子值）。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），选项文字和图标缩小、内边距减少。

🧩 **布局结构**：由触发按钮（OSelect 选择器）和弹出面板（OCascaderPanel）两部分组成。触发按钮为行内块元素；弹出面板内部横向排列多列选项列表（ul），每选一级向右展开新列。每列内部纵向排列选项（li），非叶子选项右侧带展开箭头图标。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: column (触发器 + 弹出层)
regions: [OSelect(触发按钮), cascader-panel(弹出面板 → 横向多列)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：下拉触发按钮 + 弹出面板内横向并排多列选项列表，每列由竖线分隔，非叶子选项右侧有 `>` 箭头图标
- **Token → Prop 映射**：按钮边框样式 → variant（outline/solid/text）；按钮圆角为半圆 → round="pill"；按钮高度 → size（small/medium/large）；面板弹出方向 → optionPosition
- **易混淆组件区分**：与 OSelect（普通选择器）区分——OCascader 弹出面板是多列逐级展开，OSelect 只有单列下拉列表；与 OTreeSelect 区分——OCascader 以平铺多列展示层级，TreeSelect 以缩进树形展示
- **⚠️ 错误状态 / 必填星号 → 用 OFormItem 包裹**：设计稿中级联选择器边框变红（错误态）或标签旁有红色星号（必填），应将 OCascader 放入 `<OFormItem>` 实现，**不要**手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OCascader, OCascaderPanel } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type CascaderNodeValueT = string | number;
type CascaderNodePathT = Array<CascaderNodeValueT>;
type CascaderValueT = CascaderNodeValueT | CascaderNodePathT;

type CascaderOptionT = {
  value: CascaderNodeValueT;
  label?: string;
  children?: CascaderOptionT[];
};
```

### OCascader Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `CascaderValueT` | — | `''` | 选中值（v-model） |
| options | `CascaderOptionT[]` | — | — | 选项数据 |
| pathMode | `boolean` | — | `false` | modelValue 是否为路径数组 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'` | 按钮样式 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | `'large'` | 尺寸 |
| placeholder | `string` | — | — | 占位文本 |
| trigger | `PopupTriggerT` | `'click'` / `'hover'` 等 | `'click'` | 弹出触发方式 |
| expandTrigger | `string` | `'click'` / `'hover'` | `'click'` | 子菜单展开触发方式 |
| optionPosition | `PopupPositionT` | `'bl'` / `'br'` / `'tl'` / `'tr'` 等 | `'bl'` | 选项面板位置 |
| optionWrapClass | `string \| object \| array` | — | — | 选项容器类名 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时销毁 DOM |
| transition | `string` | — | — | 过渡动画名 |

### OCascaderPanel Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `CascaderValueT` | — | `''` | 选中值（v-model） |
| options | `CascaderOptionT[]` | — | — | 选项数据 |
| pathMode | `boolean` | — | `false` | 路径模式 |
| expandTrigger | `string` | `'click'` / `'hover'` | `'click'` | 子菜单展开触发 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: CascaderValueT)` | 选中值变化时 |
| change | `(val: CascaderValueT)` | 选中值变化时 |

### Slots 表

本组件无自定义插槽。

### 典型使用场景与调用模板

**场景 1：基础级联选择**
适用于：分类选择（如省市区）
```vue
<script setup>
import { ref } from 'vue';
const selected = ref('');
const options = [
  { label: '选项1', value: '1', children: [
    { label: '子项1-1', value: '1-1', children: [
      { label: '子项1-1-1', value: '1-1-1' },
    ]},
  ]},
  { label: '选项2', value: '2', children: [
    { label: '子项2-1', value: '2-1' },
  ]},
];
</script>
<template>
  <OCascader v-model="selected" :options="options" />
</template>
```

**场景 2：路径模式**
适用于：需要获取完整选择路径
```vue
<OCascader v-model="pathValue" :options="options" path-mode />
<!-- pathValue: ['1', '1-1', '1-1-1'] -->
```

**场景 3：悬停展开子菜单**
适用于：快速浏览选项
```vue
<OCascader v-model="selected" :options="options" expand-trigger="hover" />
```

**场景 4：自定义面板（高级用法）**
适用于：需要在选项面板中加入推荐标签等自定义内容
```vue
<OSelect v-model="selected">
  <div class="custom-wrapper">
    <div>推荐选项：</div>
    <div><OTag @click="selected = '1-1-1'">推荐1</OTag></div>
    <ODivider />
    <OCascaderPanel v-model="selected" :key="selected" :options="options" />
  </div>
</OSelect>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础选择 | `v-model` + `:options` | 最常见用法 |
| 路径模式 | `path-mode` | modelValue 为路径数组 |
| 快速浏览 | `expand-trigger="hover"` | 悬停展开子菜单 |
| 触控友好 | 默认即可 | hover 自动降级为 click |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--cascader-height` | `auto` | 级联选择器整体高度 |
| `--option-list-max-height` | `378px` | 选项列表最大高度 |
| `--cascader-options-bd-color` | `var(--o-color-control1-light)` | 选项列之间的分隔线颜色 |
| `--cascader-options-gap` | `8px` | 选项列表内部间距 |
| `--cascader-option-color` | `var(--o-color-info2)` | 选项文字颜色 |
| `--cascader-option-color-hover` | `var(--o-color-info2)` | 选项悬停文字颜色 |
| `--cascader-option-color-selected` | `var(--o-color-primary1)` | 选项选中文字颜色 |
| `--cascader-option-text-size` | `var(--o-font_size-text1)` | 选项文字大小（>1200px 默认值） |
| `--cascader-option-text-height` | `var(--o-line_height-text1)` | 选项文字行高 |
| `--cascader-option-padding` | `7px 12px` | 选项内边距（>1200px 默认值） |
| `--cascader-option-radius` | `var(--o-radius_control-s)` | 选项圆角 |
| `--cascader-option-bg-color` | `transparent` | 选项默认背景色 |
| `--cascader-option-bg-color-hover` | `var(--o-color-control2-light)` | 选项悬停背景色 |
| `--cascader-option-bg-color-selected` | `var(--o-color-control3-light)` | 选项选中背景色 |
| `--cascader-option-icon-size` | `var(--o-icon_size-m)` | 展开箭头图标大小 |
| `--cascader-option-gap` | `2px` | 选项内子元素间距 |
| `--cascader-option-icon-gap` | `var(--o-gap-2)` | 选项图标与文字间距 |

**使用示例**：
```vue
<OCascader v-model="val" :options="options" style="--option-list-max-height: 240px;" />
```

### 响应式行为表

| 维度 | ≤1200px | >1200px |
|------|---------|---------|
| 选项字号 | 缩小（tip1） | 标准（text1） |
| 选项内边距 | 6px 12px | 7px 12px |
| 选项图标 | 缩小 | 标准 |

### 组件布局结构

```yaml
# OCascader 布局结构
root: OCascader
  children:
    - OSelect (触发按钮):
        role: 下拉触发器，显示选中值或 placeholder
        props-passthrough: round, variant, size, placeholder, trigger, optionPosition
    - .o-cascader (弹出面板，挂载于 OSelect 的下拉区域):
        children:
          - .o-cascader-panel:
              direction: row (横向排列多级列表)
              children:
                - .o-cascader-options (ul) × N级:
                    direction: column
                    border-right: var(--cascader-options-bd-color) # var(--o-color-control1-light)
                    gap: var(--cascader-options-gap) # 8px
                    children:
                      - .o-cascader-option (li) × M项:
                          direction: row
                          padding: var(--cascader-option-padding)  # 7px 12px (>1200px) → 6px 12px (≤1200px)
                          border-radius: var(--cascader-option-radius)  # var(--o-radius_control-s)
                          children:
                            - .o-cascader-option-label (span): 选项文字
                            - .o-cascader-option-arrow (span): IconChevronRight (仅非叶子节点)
                          tokens:
                            text-size: var(--cascader-option-text-size)  # var(--o-font_size-text1) → var(--o-font_size-tip1)
                            text-height: var(--cascader-option-text-height)  # var(--o-line_height-text1) → var(--o-line_height-tip1)
                            icon-size: var(--cascader-option-icon-size)  # var(--o-icon_size-m) → var(--o-icon_size-s)
                            color: var(--cascader-option-color)  # var(--o-color-info2)
                            color-selected: var(--cascader-option-color-selected)  # var(--o-color-primary1)
                            bg-hover: var(--cascader-option-bg-color-hover)  # var(--o-color-control2-light)
                            bg-selected: var(--cascader-option-bg-color-selected)  # var(--o-color-control3-light)

# 响应式断点 Token 值
breakpoints:
  ">1200px":
    --cascader-option-text-size: var(--o-font_size-text1)
    --cascader-option-text-height: var(--o-line_height-text1)
    --cascader-option-padding: 7px 12px
    --cascader-option-icon-size: var(--o-icon_size-m)
  "≤1200px":
    --cascader-option-text-size: var(--o-font_size-tip1)
    --cascader-option-text-height: var(--o-line_height-tip1)
    --cascader-option-padding: 6px 12px
    --cascader-option-icon-size: var(--o-icon_size-s)
```

### 设计稿识别指南

**视觉特征指纹**
1. 触发器为标准下拉选择器按钮（带右侧下拉箭头），点击后弹出面板
2. 弹出面板内横向并排多列选项列表，列之间有竖线分隔（`--o-color-control1-light`），选中一级后右侧展开下一级列
3. 非叶子选项右侧有 `>` 展开箭头图标（IconChevronRight），叶子选项无箭头

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值/范围 | 对应Prop | Prop值 | 备注 |
|-----------|---------|---------|--------|------|
| 按钮线框样式 | 有边框无填充 | variant | `'outline'` | 默认值 |
| 按钮实心填充 | 有背景色 | variant | `'solid'` | — |
| 按钮纯文字 | 无边框无背景 | variant | `'text'` | — |
| 按钮半圆圆角 | 两端为半圆弧 | round | `'pill'` | — |
| 按钮高度较大 | 大尺寸 | size | `'large'` | 默认值 |
| 按钮高度中等 | 中尺寸 | size | `'medium'` | — |
| 按钮高度较小 | 小尺寸 | size | `'small'` | — |
| 面板在按钮下方左对齐 | 默认弹出位置 | optionPosition | `'bl'` | 默认值 |
| 悬停即展开子级 | hover 展开 | expandTrigger | `'hover'` | — |
| 选项字号 text1 | 标准字号 | — | — | >1200px 默认 |
| 选项字号 tip1 | 缩小字号 | — | — | ≤1200px 响应式 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|------------|
| OCascader | OSelect（选择器） | OCascader 弹出面板是横向多列逐级展开，OSelect 只有单列下拉列表 |
| OCascader | OTreeSelect（树选择） | OCascader 以平铺多列展示层级关系，OTreeSelect 以缩进树形结构展示 |
| OCascader | ODropdown（下拉菜单） | OCascader 面板多列带级联选择逻辑，ODropdown 为单列操作菜单 |

