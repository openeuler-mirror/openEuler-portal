> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# ODropdown 下拉菜单

## Part A：设计理解卡

ODropdown 是下拉菜单组件，点击或悬停触发元素后弹出一组操作选项列表。通常与按钮配合使用，构成"下拉按钮"。包含 ODropdown（容器）和 ODropdownItem（选项项）。

### 触发与显示

**visible**（属性）：下拉菜单是否可见（v-model 双向绑定）。

**defaultVisible**（属性）：非受控模式下是否默认可见。默认关闭。

**trigger**（属性）：触发下拉菜单的方式。"click" 点击触发、"click-outclick" 点击触发+外部点击关闭、"hover" 悬停触发、"hover-outclick" 悬停触发+外部点击关闭、"focus" 聚焦触发、"contextmenu" 右键触发、"none" 不触发（需手动控制）。默认 click。

### 外观

**size**（属性）：下拉列表的尺寸。"small"、"medium"、"large"。不同尺寸影响选项文字大小和内边距。默认 large。

**round**（属性）：圆角值。

### 下拉面板

**optionPosition**（属性）：下拉面板弹出位置。支持 top/bottom/left/right 及组合值如 bl（底部左对齐）、tr（顶部右对齐）等。默认 bl。

**optionWidthMode**（属性）：下拉面板宽度规则。"auto" 自适应内容宽度、"min-width" 最小宽度与触发元素一致、"width" 宽度与触发元素一致。默认 min-width。

**optionWrapClass**（属性）：下拉面板容器自定义类名。

**optionsWrapper**（属性）：下拉面板挂载容器。默认 body。

**unmountOnHide**（属性）：面板隐藏时是否销毁 DOM。默认开启。

**transition**（属性）：过渡动画名称。

### 内容

**default 插槽**（插槽）：触发元素（通常放一个按钮）。

**dropdown 插槽**（插槽）：下拉选项列表区域，放置 ODropdownItem 子项。

### 事件

**visible-change**（事件）：下拉菜单显示/隐藏时触发，可获取当前可见状态。

---

### ODropdownItem 下拉选项

**label**（属性）：选项显示文本。

**value**（属性）：选项值。

**disabled**（属性）：禁用选项，不可点击且样式变灰。默认关闭。

**default 插槽**（插槽）：替换选项的默认文字渲染。不传时显示 label 或 value。

点击非禁用选项后，下拉菜单自动关闭。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），大尺寸触发按钮的内边距缩小；大尺寸选项文字和内边距缩小。在平板竖屏及以下（≤840px），小尺寸触发按钮内边距进一步缩小。

🧩 **布局结构**：ODropdown 由触发区域和弹出面板两部分组成。触发区域（.o-dropdown）为普通 div，内部放置触发元素（通常是按钮）。弹出面板通过 OPopup 定位，内含无序列表（.o-dropdown-list），列表项（.o-dropdown-item）纵向排列，项间间距 2px。面板有白色背景、阴影和圆角，内边距 4px。选项项为 flex 布局，内边距 7px 12px（large）或 4px 12px（small/medium）。
```yaml
# 简化结构摘要（完整版见 Part B）
trigger: .o-dropdown > slot:default(触发元素)
popup: OPopup > ul.o-dropdown-list > ODropdownItem × N
item-direction: vertical
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：一个按钮（通常带下拉箭头图标）+ 点击后弹出白色圆角浮层 + 浮层内纵向排列多个文字选项 → 匹配 ODropdown；浮层有阴影且紧贴按钮下方 → 确认为 ODropdown 而非 OSelect
- **Token → Prop 映射**：选项文字 text1 大小 → size="large"（默认）；选项文字 tip1 大小 → size="small" 或 "medium"；面板在按钮正下方左对齐 → optionPosition="bl"（默认）；面板在按钮下方右对齐 → optionPosition="br"；悬停触发 → trigger="hover"；点击触发 → trigger="click"
- **易混淆组件区分**：与 OSelect 区分——OSelect 有输入框和选中状态回显，ODropdown 只是操作菜单无回显；与 OPopover 区分——OPopover 展示富文本提示信息，ODropdown 展示可点击的操作列表；与右键菜单区分——右键菜单用 trigger="contextmenu"，本质上仍是 ODropdown

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ODropdown, ODropdownItem } from '@opensig/opendesign';
</script>
```

### ODropdown Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | — | 是否可见（v-model） |
| defaultVisible | `boolean` | — | `false` | 非受控时默认可见 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | `'large'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| trigger | `PopupTriggerT` | `'click'` / `'click-outclick'` / `'hover'` / `'hover-outclick'` / `'focus'` / `'contextmenu'` / `'none'` | `'click'` | 触发方式 |
| optionPosition | `PopupPositionT` | `'bl'` / `'br'` / `'tl'` / `'tr'` / `'top'` / `'bottom'` 等 | `'bl'` | 弹出位置 |
| optionWidthMode | `string` | `'auto'` / `'min-width'` / `'width'` | `'min-width'` | 面板宽度规则 |
| optionWrapClass | `string \| object \| array` | — | — | 面板容器类名 |
| optionsWrapper | `string \| HTMLElement \| null` | — | `'body'` | 面板挂载容器 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时销毁 DOM |
| transition | `string` | — | — | 过渡动画名 |

### ODropdownItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| label | `string` | — | `''` | 选项显示文本 |
| value | `string \| number` | — | `''` | 选项值 |
| disabled | `boolean` | — | `false` | 是否禁用 |

### Events 表

#### ODropdown Events

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 可见状态变化时 |
| visible-change | `(val: boolean)` | 可见状态变化时 |

### Slots 表

#### ODropdown Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 触发元素 | 无 |
| dropdown | — | 菜单可见时 | 下拉选项列表 | 无 |

#### ODropdownItem Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 选项内容 | `{{ label \|\| value }}` |

### 插槽层级关系

```
ODropdown
├── default（触发元素，如按钮）
└── dropdown（下拉选项列表）
    └── ODropdownItem × N
        └── default（选项自定义内容）
```

### 典型使用场景与调用模板

**场景 1：强调下拉按钮 / 主操作**
适用于：核心操作的下拉菜单。触发按钮为实心背景色（primary1）。`round="pill"` 按设计图决定，加不加均可。
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
<template>
  <ODropdown v-model:visible="visible" trigger="click-outclick">
    <OButton color="primary" variant="solid">
      操作
      <template #suffix>
        <OIconChevronDown :class="{ active: visible }" />
      </template>
    </OButton>
    <template #dropdown>
      <ODropdownItem label="编辑" value="edit" />
      <ODropdownItem label="复制" value="copy" />
      <ODropdownItem label="删除" value="delete" />
    </template>
  </ODropdown>
</template>
```

**场景 2：普通下拉按钮**
适用于：次要操作的下拉菜单。触发按钮为无背景色、有边框（primary1）。`round="pill"` 按设计图决定，加不加均可。
```vue
<ODropdown trigger="click-outclick">
  <OButton color="primary">
    操作
    <template #suffix><OIconChevronDown /></template>
  </OButton>
  <template #dropdown>
    <ODropdownItem label="选项一" value="opt1" />
    <ODropdownItem label="选项二" value="opt2" />
  </template>
</ODropdown>
```

**场景 3：禁用下拉**
适用于：按钮禁用时阻止下拉
```vue
<ODropdown trigger="none">
  <OButton disabled>禁用按钮</OButton>
  <template #dropdown>
    <ODropdownItem label="选项" value="opt" />
  </template>
</ODropdown>
```

**场景 4：文本下拉按钮**
适用于：轻量级下拉操作
```vue
<ODropdown trigger="click-outclick" class="o-dropdown-link-wrap">
  <OButton variant="text" color="primary">
    文本下拉
    <template #suffix><OIconChevronDown /></template>
  </OButton>
  <template #dropdown>
    <ODropdownItem label="选项一" value="opt1" />
    <ODropdownItem label="选项二" value="opt2" />
  </template>
</ODropdown>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础下拉 | `trigger="click-outclick"` | 点击打开、外部点击关闭 |
| 悬停下拉 | `trigger="hover"` | 鼠标悬停时显示 |
| 禁用下拉 | `trigger="none"` + 按钮 disabled | 阻止触发 |
| 自定义宽度 | `option-width-mode="width"` | 面板宽度与触发元素一致 |
| 运营主题按钮 | `color="brand"` + `variant="solid"` | 品牌色实心样式 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--dropdown-list-bg-color` | `var(--o-color-control5-light)` | 下拉列表背景色 |
| `--dropdown-list-shadow` | `var(--o-shadow-2)` | 下拉列表阴影 |
| `--dropdown-list-bd` | `none` | 下拉列表边框 |
| `--dropdown-list-radius` | `var(--o-radius_control-m)` | 下拉列表圆角 |
| `--dropdown-list-padding` | `4px` | 下拉列表内边距 |
| `--dropdown-item-color` | `var(--o-color-info2)` | 选项文字颜色（默认） |
| `--dropdown-item-color-hover` | `var(--o-color-primary2)` | 选项文字颜色（悬停） |
| `--dropdown-item-color-disabled` | `var(--o-color-info4)` | 选项文字颜色（禁用） |
| `--dropdown-item-bg-color` | `transparent` | 选项背景色（默认） |
| `--dropdown-item-bg-color-hover` | `var(--o-color-control2-light)` | 选项背景色（悬停） |
| `--dropdown-item-bg-color-disabled` | `transparent` | 选项背景色（禁用） |
| `--dropdown-item-text-size` | `var(--o-font_size-text1)` | 选项文字字号（large 尺寸） |
| `--dropdown-item-text-height` | `var(--o-line_height-text1)` | 选项文字行高（large 尺寸） |
| `--dropdown-item-justify` | `left` | 选项文字对齐方式 |
| `--dropdown-item-padding` | `7px 12px` | 选项内边距（large 尺寸） |
| `--dropdown-item-gap` | `2px` | 选项之间的间距 |
| `--dropdown-item-radius` | `var(--o-radius_control-s)` | 选项圆角 |

**使用示例**：
```vue
<ODropdown style="--dropdown-list-radius: var(--o-radius_control-l); --dropdown-item-justify: center">
  <OButton>操作</OButton>
  <template #dropdown>
    <ODropdownItem label="选项一" value="opt1" />
  </template>
</ODropdown>
```

### 响应式行为表

| 维度 | ≤840px | 841–1200px | >1200px |
|------|--------|-----------|---------|
| 大尺寸按钮内边距 | 缩小 | 缩小 | 标准 |
| 大尺寸选项文字 | tip1 | tip1 | text1 |
| 大尺寸选项内边距 | 6px 12px | 6px 12px | 7px 12px |
| 小/中尺寸选项内边距 | 标准 | 2px 12px | 4px 12px |

### 组件布局结构

**桌面端 >1200px**
```yaml
layout:
  trigger:
    element: .o-dropdown
    children:
      - { type: slot, name: default }  # 触发元素（通常为 OButton）
  popup:
    element: OPopup  # 通过 Teleport 挂载到 body
    position: bl  # --optionPosition, 底部左对齐
    offset: 4px
    children:
      - name: list
        element: ul.o-dropdown-list
        background: var(--o-color-control5-light)
        box-shadow: var(--o-shadow-2)
        border-radius: var(--o-radius_control-m)
        padding: 4px  # --dropdown-list-padding
        children:
          - name: item × N
            element: li.o-dropdown-item
            display: flex
            align-items: center
            justify-content: left
            border-radius: var(--o-radius_control-s)
            cursor: pointer
            gap-between: 2px  # --dropdown-item-gap (margin-top)
            children:
              - { type: slot, name: default }  # 或 label/value 文字
  variants:
    large:
      btn-padding: "0 15px 0 23px"
      item-font-size: var(--o-font_size-text1)
      item-padding: "7px 12px"
    medium:
      btn-padding: "0 11px 0 15px"
      item-font-size: var(--o-font_size-tip1)
      item-padding: "4px 12px"
    small:
      btn-padding: "0 11px 0 15px"
      item-font-size: var(--o-font_size-tip1)
      item-padding: "4px 12px"
```

**≤1200px**
```yaml
# large 按钮: padding "0 11px 0 15px"
# large 选项: font-size tip1, padding "6px 12px"
# small/medium 选项: padding "2px 12px"
```

**≤840px**
```yaml
# small 按钮: padding "0 7px 0 11px"
```

### 设计稿识别指南

**视觉特征指纹**

1. 按钮（通常带 chevron-down 箭头图标）+ 下方弹出白色阴影浮层 + 浮层内纵向排列可点击文字项 → 匹配 ODropdown
2. 浮层内每一项 hover 时有浅色背景高亮 → 确认为 ODropdown 选项交互
3. 某个选项文字颜色变灰且不可点击 → 匹配 ODropdownItem（disabled）
4. 浮层紧贴触发按钮且有 4px 间距 → ODropdown 的 OPopup offset

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 选项文字大小 | text1（14px） | size | `'large'` | 默认 |
| 选项文字大小 | tip1（12px） | size | `'small'` / `'medium'` | — |
| 面板位置 | 按钮正下方左对齐 | optionPosition | `'bl'` | 默认 |
| 面板位置 | 按钮正下方右对齐 | optionPosition | `'br'` | — |
| 面板位置 | 按钮正上方 | optionPosition | `'tl'` / `'tr'` | — |
| 面板宽度 | 与按钮等宽 | optionWidthMode | `'width'` | — |
| 面板宽度 | 不小于按钮宽度 | optionWidthMode | `'min-width'` | 默认 |
| 面板宽度 | 随内容自适应 | optionWidthMode | `'auto'` | — |
| 触发方式 | 点击触发 | trigger | `'click'` | 默认 |
| 触发方式 | 悬停触发 | trigger | `'hover'` | — |
| 选项灰色不可点击 | 文字 `--o-color-info4` | item.disabled | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| ODropdown | OSelect | OSelect 有输入框外观且选中值会回显到输入框中，ODropdown 仅弹出操作列表无回显 |
| ODropdown | OPopover | OPopover 展示富文本提示信息（文字、图片等），ODropdown 展示可逐项点击的操作列表 |
| ODropdown | OMenu | OMenu 是导航菜单有层级嵌套和选中高亮，ODropdown 是扁平的操作列表 |
| ODropdown | OPopup | OPopup 是底层弹出定位容器，ODropdown 是基于 OPopup 的上层组件自带列表样式和选项交互 |
