> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OSelect 选择器

## Part A：设计理解卡

OSelect 是下拉选择器组件，从预设选项列表中选择一个或多个值。包含 OSelect（选择器）、OOption（选项）和 OOptionGroup（选项分组）。支持单选、多选、标签折叠、清空、加载态、自定义选项宽度模式等功能。

### 值

**modelValue**（属性）：选中值（v-model 双向绑定）。单选时为 string 或 number；多选时为数组。

**defaultValue**（属性）：非受控模式下的默认值。

### 外观

**variant**（属性）：选择器样式。"solid" 实心、"outline" 线框、"text" 纯文字。默认 outline。

**color**（属性）：选择器颜色。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。默认 normal。

**size**（属性）：选择器尺寸。"small"、"medium"、"large"。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

**placeholder**（属性）：占位提示文本。

### 功能

**multiple**（属性）：是否支持多选。开启后选中值为数组，选项以标签形式展示。

**maxTagCount**（属性）：多选模式下标签最大显示数量。超出的折叠显示。

**clearable**（属性）：是否可清空选择。

**loading**（属性）：加载中状态。

### 状态

**disabled**（属性）：是否禁用选择器。

### 选项面板

**trigger**（属性）：选项面板触发方式。默认 click。

**optionPosition**（属性）：选项面板弹出位置。默认 bl（底部左对齐）。

**optionWidthMode**（属性）：选项面板宽度模式。"auto" 自动、"min-width" 最小宽度与选择器一致、"width" 宽度与选择器一致。默认 min-width。

**optionWrapClass**（属性）：选项面板自定义类名。

**optionsWrapper**（属性）：选项面板挂载容器。默认 body。

**unmountOnHide**（属性）：面板隐藏时是否销毁 DOM。默认开启。

**transition**（属性）：选项面板的过渡动画名称。

### 多选标签折叠

**foldLabel**（属性）：多选超过最大标签数时的自定义文字函数。

**showFoldTags**（属性）：是否在悬停时显示折叠的标签。"hover" 悬停显示、"click" 点击显示、true/false。默认 hover。

### 回调

**beforeSelect**（属性）：选择前回调。返回 false 阻止选择。

**beforeOptionsShow**（属性）：选项面板显示前回调。

**beforeOptionsHide**（属性）：选项面板隐藏前回调。

### 移动端

**optionTitle**（属性）：移动端选项面板的标题。

**noResponsive**（属性）：是否禁用响应式（移动端 Dialog 模式）。

### 插槽区域

**default 插槽**（插槽）：放置 OOption 组件。无选项时显示空数据提示。

**arrow 插槽**（插槽）：替换下拉箭头图标。可获取 active（面板是否展开）。

**suffix 插槽**（插槽）：选择框后缀区域，位于箭头右侧。可获取 active（面板是否展开）。

**tag-fold 插槽**（插槽）：多选模式下折叠标签的显示内容。默认显示 "+N..." 文本。

**empty 插槽**（插槽）：无选项时的空数据提示内容。

**action 插槽**（插槽）：选项面板底部的操作区域。

---

### OOption 选项

**label**（属性）：选项显示文本。

**value**（属性）：选项值。

**disabled**（属性）：是否禁用该选项。

**indeterminate**（属性）：多选模式下是否为半选状态（复选框样式）。

### OOptionGroup 选项分组

将选项分组显示，带有分组标题。

**name**（属性）：分组名称。必填。

**name 插槽**（插槽）：替换分组标题。默认显示 name 属性的文本。

**default 插槽**（插槽）：放置分组内的 OOption 组件。

### 事件

**change**（事件）：选中值变化时触发。

**clear**（事件）：点击清空时触发。

**options-visible-change**（事件）：选项面板显隐变化时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），large 尺寸高度缩至 36px、文字和图标缩小，medium 高度缩至 28px；在平板竖屏及以下（≤840px），large 恢复标准高度；移动端下选项面板从 Popup 变为 Dialog 底部弹出。

🧩 **布局结构**：OSelect 由触发器（选择框）和选项面板两部分组成。选择框为水平布局——左侧输入显示区（单选为 input 只读，多选为标签列表 OScroller）+ 右侧后缀区（加载/清除/箭头图标 + suffix 插槽）。选项面板在桌面端为 OPopup 下拉弹出，移动端为 ODialog 底部弹出，面板内使用 OOptionList + OScroller 包裹选项列表。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: row
regions: [input/tags(显示区), suffix(图标+后缀)]
popup: OPopup(桌面) | ODialog(移动端)
children: [OOption × N, OOptionGroup(可选)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：矩形输入框 + 右侧下拉箭头图标，点击展开选项面板列表；多选时输入框内有标签（tag）列表
- **Token → Prop 映射**：边框线框 → variant="outline"；实心填充背景 → variant="solid"；无边框纯文字 → variant="text"；高度 40px → size="large"；高度 32px → size="medium"；输入框内多个标签 → multiple=true；标签超出显示 "+N..." → maxTagCount；右侧有清除按钮 → clearable=true
- **易混淆组件区分**：与 OInput 区分——OSelect 右侧有下拉箭头且不可手动输入文字，OInput 可自由输入；与 ORadioGroup 区分——OSelect 选项收纳在下拉面板中，ORadioGroup 所有选项同时平铺可见；与 OCascader 区分——OCascader 为多级联动选择，OSelect 为单层列表选择
- **⚠️ 错误状态 / 必填星号 → 用 OFormItem 包裹**：设计稿中选择框边框变红（错误态）或标签旁有红色星号（必填），应将 OSelect 放入 `<OFormItem>` 实现，**不要**直接设 `color="danger"` 或手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OSelect, OOption, OOptionGroup } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type OptionWidthModeT = 'auto' | 'min-width' | 'width';
type SelectValueT = string | number | string[] | number[] | (string | number)[];
```

### OSelect Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `SelectValueT` | — | — | 选中值（v-model） |
| defaultValue | `SelectValueT` | — | — | 默认值 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | — | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'` | 样式 |
| placeholder | `string` | — | — | 占位文本 |
| multiple | `boolean` | — | `false` | 多选 |
| maxTagCount | `number` | — | — | 最大标签数 |
| clearable | `boolean` | — | `false` | 可清空 |
| disabled | `boolean` | — | `false` | 禁用 |
| loading | `boolean` | — | `false` | 加载中 |
| trigger | `PopupTriggerT` | — | `'click'` | 触发方式 |
| optionPosition | `PopupPositionT` | — | `'bl'` | 面板位置 |
| optionWidthMode | `OptionWidthModeT` | `'auto'` / `'min-width'` / `'width'` | `'min-width'` | 面板宽度模式 |
| optionWrapClass | `string \| object \| array` | — | — | 面板类名 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时卸载 |
| optionsWrapper | `string \| HTMLElement` | — | `'body'` | 面板挂载容器 |
| foldLabel | `(tags: SelectOptionT[]) => string` | — | — | 折叠标签文字 |
| showFoldTags | `boolean \| 'hover' \| 'click'` | — | `'hover'` | 折叠标签显示 |
| optionTitle | `string` | — | — | 移动端面板标题 |
| noResponsive | `boolean` | — | `false` | 禁用响应式 |
| beforeSelect | `Function` | — | — | 选择前回调 |
| beforeOptionsShow | `Function` | — | — | 显示前回调 |
| beforeOptionsHide | `Function` | — | — | 隐藏前回调 |
| transition | `string` | — | — | 过渡动画名称 |

### OOption Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| label | `string` | — | `''` | 显示文本 |
| value | `string \| number` | — | `''` | 选项值 |
| disabled | `boolean` | — | `false` | 禁用 |
| indeterminate | `boolean` | — | `false` | 半选（多选模式） |

### OOptionGroup Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| name | `string` | — | — | 分组名称（必填） |

### OOptionGroup Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| name | — | 始终 | 分组标题 | 显示 name 属性文本 |
| default | — | 始终 | 分组内选项列表 | 无 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: SelectValueT)` | 选中值变化时 |
| change | `(value: SelectValueT)` | 选中值变化时 |
| options-visible-change | `(value: boolean)` | 面板显隐变化 |
| clear | `(evt: Event)` | 点击清空 |

### OSelect Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 选项内容区域 | 空数据提示 |
| arrow | `{ active: boolean }` | 始终 | 下拉箭头图标 | `<IconChevronDown />` |
| suffix | `{ active: boolean }` | 始终 | 选择框后缀区域（箭头右侧） | 无 |
| tag-fold | — | 多选且有折叠标签时 | 折叠标签的显示内容 | `+N...` 文本 |
| empty | — | 无选项时 | 空数据提示 | 国际化空文本 |
| action | — | 始终 | 选项面板底部操作区域 | 无 |

### 典型使用场景与调用模板

**场景 1：基础单选**
适用于：从选项列表选择一项
```vue
<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
<template>
  <OSelect v-model="value" placeholder="请选择">
    <OOption label="选项一" value="1" />
    <OOption label="选项二" value="2" />
    <OOption label="选项三" value="3" />
  </OSelect>
</template>
```

**场景 2：多选**
适用于：选择多个标签
```vue
<OSelect v-model="values" multiple clearable :max-tag-count="3">
  <OOption label="标签一" value="1" />
  <OOption label="标签二" value="2" />
  <OOption label="标签三" value="3" />
  <OOption label="标签四" value="4" />
</OSelect>
```

**场景 3：可清空 + 禁用选项**
适用于：部分选项不可选
```vue
<OSelect v-model="value" clearable>
  <OOption label="可选" value="1" />
  <OOption label="禁用" value="2" disabled />
</OSelect>
```

**场景 4：文字变体**
适用于：紧凑的行内选择
```vue
<OSelect v-model="value" variant="text">
  <OOption label="中文" value="zh" />
  <OOption label="English" value="en" />
</OSelect>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础单选 | `v-model` + `placeholder` | 最常见 |
| 多选 | `multiple` + `clearable` | 标签模式 |
| 限制标签数 | `multiple` + `:max-tag-count` | 折叠多余 |
| 纯文字 | `variant="text"` | 无边框 |
| 禁用响应式 | `no-responsive` | 移动端也用 Popup |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值（medium size） | 说明 |
|--------|----------------------|------|
| `--select-height` | `var(--o-control_size-m)` | 选择框高度 |
| `--select-padding` | `0 15px` | 水平内边距（s: `0 8px`） |
| `--select-radius` | `var(--o-radius_control-s)` | 圆角 |
| `--select-text-size` | `var(--o-font_size-tip1)` | 文字字号 |
| `--select-icon-size` | `var(--o-icon_size_control-xs)` | 箭头图标尺寸 |
| `--select-icon-gap` | `var(--o-gap-2)` | 图标与文字间距 |
| `--select-multiple-max-height` | `64px` | 多选时输入框最大高度 |
| `--select-tag-padding` | `2px 8px` | 多选标签内边距 |
| `--select-tag-radius` | `24px` | 多选标签圆角 |

> **注意**：`width` 不由组件变量控制，直接在调用处设置 CSS `width` 即可。

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| large 高度 | 标准控件尺寸 | 36px | 标准 |
| large 文字 | 标准 | tip1 | 标准 |
| large 图标 | 控件 m | 控件 s | 标准 |
| medium 高度 | 28px | 28px | 标准 |
| 选项面板 | Dialog 底部弹出 | Popup 下拉 | Popup 下拉 |

### 组件布局结构

**OSelect 选择器（触发器部分）**
```yaml
layout:
  tag: div
  direction: horizontal
  align: center
  class: o-select o-select-{color} o-select-{variant} o-select-{size}
  border: 1px solid var(--select-bd-color)
  border-radius: var(--select-radius)
  height: var(--select-height)
  bg-color: var(--select-bg-color)
  regions:
    - name: select-input (单选模式)
      condition: !multiple || (multiple && valueList.length === 0)
      flex: 1
      children:
        - tag: input[readonly]
          placeholder: var(--select-placeholder)
          font-size: var(--select-text-size)
    - name: select-tags (多选模式)
      condition: multiple && valueList.length > 0
      flex: 1
      component: OScroller
      class: o-select-tags-scroller
      children:
        - name: select-tags-wrap
          direction: horizontal
          wrap: wrap
          max-height: var(--select-multiple-max-height)
          children:
            - name: select-tag (× N)
              bg-color: var(--select-tag-bg-color)
              border-radius: var(--select-tag-radius)  # 24px
              padding: var(--select-tag-padding)
              children:
                - text: optionLabels[value]
                - name: tag-remove
                  icon: IconClose
            - name: fold-tag (超出 maxTagCount)
              condition: showFoldTags && valueListFold.length > 0
              component: OPopover
              children:
                - { type: slot, name: tag-fold, fallback: "+N..." }
    - name: select-suffix
      direction: horizontal
      align: center
      gap: var(--select-icon-gap)
      children:
        - name: select-loading
          condition: loading
          icon: IconLoading (rotating)
        - name: select-clear
          condition: clearable && !disabled && hasValue
          icon: IconClose
          click: clearClick
        - name: select-arrow
          icon-size: var(--select-icon-size)
          children:
            - { type: slot, name: arrow, fallback: IconChevronDown }
        - name: suffix-slot
          children:
            - { type: slot, name: suffix }
  variants:
    large: { height: "控件 l (40px)", padding: "0 15px", icon-size: "控件 m", radius: "控件 l" }
    medium: { height: "控件 m (32px)", padding: "0 15px", icon-size: "控件 xs", radius: "控件 s" }
    small: { height: "控件 s (28px)", padding: "0 8px", icon-size: "控件 xs", radius: "控件 xs" }
```

**选项面板（桌面端 OPopup）**
```yaml
layout:
  component: OPopup
  position: var(--optionPosition)  # 默认 bl
  width-mode: var(--optionWidthMode)  # 默认 min-width
  children:
    - name: SelectOption
      component: OOptionList + OScroller
      class: o-select-options o-select-options-{size}
      children:
        - name: option-list
          children:
            - { type: slot, name: default }  # OOption / OOptionGroup 子项
        - name: select-actions
          condition: $slots.action
          children:
            - { type: slot, name: action }
```

**选项面板（移动端 ODialog）**
```yaml
layout:
  component: ODialog
  size: small
  position: bottom
  children:
    - header: optionTitle
    - body: SelectOption (同桌面端)
    - actions (多选模式): [取消按钮, 确认按钮]
```

**OOption 选项**
```yaml
layout:
  tag: div
  class: o-option
  children:
    - name: option-item
      direction: horizontal
      align: center
      states:
        active: 选中高亮
        disabled: 灰色不可点击
      children (单选):
        - { type: slot, name: default, fallback: "{{ label }}" }
      children (多选):
        - component: OCheckbox
        - { type: slot, name: default, fallback: "{{ label }}" }
```

**OOptionGroup 选项分组**
```yaml
layout:
  tag: div
  class: o-option-group
  children:
    - name: option-group-name
      children:
        - { type: slot, name: name, fallback: "{{ name }}" }
    - name: option-group-items
      children:
        - { type: slot, name: default }  # OOption 子项
```

**≤1440px**
```yaml
# large: height 36px, text-size tip1, icon-size 控件 s
# medium: height 28px
```

**≤840px**
```yaml
# large: height 恢复标准控件尺寸, icon-size 控件 m
# 选项面板: ODialog 底部弹出替代 OPopup
# 多选模式: checkbox 布局反转 (row-reverse)，选项间有底部分割线
```

### 设计稿识别指南

**视觉特征指纹**

1. 矩形输入框 + 右侧下拉箭头 + 点击展开选项列表 → 匹配 OSelect
2. 输入框内有多个圆角标签（tag）+ 右侧箭头 → 匹配 OSelect（multiple 多选模式）
3. 标签后有 "+N..." 折叠提示 → 匹配 OSelect（maxTagCount 限制）
4. 无边框纯文字 + 下拉箭头 → 匹配 OSelect（variant="text"）
5. 选项列表中有分组标题 → 使用 OOptionGroup

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 边框 | 有边框线 | variant | `'outline'` | 默认值 |
| 背景 | 实心填充 | variant | `'solid'` | — |
| 边框/背景 | 无边框无背景 | variant | `'text'` | — |
| 高度 | 40px | size | `'large'` | — |
| 高度 | 32px | size | `'medium'` | — |
| 高度 | 28px | size | `'small'` | — |
| 圆角 | 全圆角 | round | `'pill'` | — |
| 选择模式 | 输入框内有标签 | multiple | `true` | — |
| 标签 | 显示 "+N..." | maxTagCount | 对应数值 | — |
| 右侧 | 有清除按钮 | clearable | `true` | — |
| 面板宽度 | 与选择框等宽 | optionWidthMode | `'width'` | — |
| 面板宽度 | 最小宽度等于选择框 | optionWidthMode | `'min-width'` | 默认值 |
| 面板宽度 | 自适应内容 | optionWidthMode | `'auto'` | — |
| 边框颜色 | 绿色系 | color | `'success'` | — |
| 边框颜色 | 橙色系 | color | `'warning'` | — |
| 边框颜色 | 红色系 | color | `'danger'` | 常用于表单校验错误 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OSelect | OInput | OSelect 右侧有下拉箭头、不可手动输入文字；OInput 可自由输入且无下拉面板 |
| OSelect | ORadioGroup | OSelect 选项收纳在下拉面板中节省空间；ORadioGroup 所有选项同时平铺可见 |
| OSelect | OCascader | OCascader 为多级联动面板（分列滚动）；OSelect 为单层扁平列表 |
| OSelect（multiple） | OCheckboxGroup | OSelect 多选以标签形式收纳在输入框内；OCheckboxGroup 勾选框平铺展示 |
| OSelect（text） | ODropdown | OSelect text 变体有选中值回显；ODropdown 是菜单触发器不回显选中值 |

