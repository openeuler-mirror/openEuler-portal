> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OMenu 菜单

## Part A：设计理解卡

OMenu 是导航菜单组件，用于侧边栏或页面内的层级导航。包含 OMenu（菜单容器）、OSubMenu（可展开的子菜单）和 OMenuItem（菜单项）。支持手风琴模式、多级嵌套、图标、选中状态高亮等功能。

### 尺寸

**size**（属性）：菜单整体尺寸。"medium" 中号、"small" 小号。默认 medium。

### 选中值

**modelValue**（属性）：当前选中的菜单项值（v-model 双向绑定）。

**defaultValue**（属性）：非受控模式下的默认选中值。

**selectStrictly**（属性）：父子节点是否关联。开启后点击子菜单项时，其父级子菜单也会标记为关联选中状态（高亮显示路径）。默认关闭。

### 展开控制

**expanded**（属性）：当前展开的子菜单值数组（v-model:expanded 双向绑定）。

**defaultExpanded**（属性）：非受控模式下默认展开的子菜单值数组。

**accordion**（属性）：是否开启手风琴模式。开启后同级只能展开一个子菜单，展开新的会自动收起其他同级。默认关闭。

### 箭头

**arrowPosition**（属性）：子菜单折叠箭头的位置。"left" 在标题左侧、"right" 在标题右侧。默认 right。

---

### OSubMenu 子菜单

**value**（属性）：子菜单唯一标识值。必填。用于展开控制和关联选中判断。

**selectable**（属性）：点击子菜单标题是否同时选中该子菜单（除展开/收起外还触发选中）。默认关闭。

**icon**（属性）：标题前缀图标组件。

**icon 插槽**（插槽）：替换标题前缀图标区域。使用后 icon 属性失效。

**title 插槽**（插槽）：子菜单标题文字区域。

**default 插槽**（插槽）：子菜单内部的菜单项或嵌套子菜单。

---

### OMenuItem 菜单项

**value**（属性）：菜单项唯一标识值。必填。点击时该值会被设置为 OMenu 的选中值。

**icon**（属性）：菜单项前缀图标组件。

**disabled**（属性）：是否禁用菜单项。禁用后点击无效、样式变灰。默认关闭。

**icon 插槽**（插槽）：替换菜单项前缀图标区域。使用后 icon 属性失效。

**default 插槽**（插槽）：菜单项文字内容。

### 事件

**change**（事件）：选中菜单项变化时触发，可获取新选中的值。

**expanded-change**（事件）：展开的子菜单变化时触发，可获取当前展开的子菜单值数组。

**click**（事件，OMenuItem）：点击菜单项时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），medium 尺寸的一级菜单项上下间距和文字缩小、图标缩小；在平板竖屏及以下（≤840px），small 尺寸的文字进一步缩小，一级项保持较大字号。

🧩 **布局结构**：外层 `<ul>.o-menu` 为垂直列表容器，内含 OSubMenu（可展开子菜单）和 OMenuItem（叶子菜单项）。OSubMenu 内部分为标题行 `.o-sub-menu-title`（水平排列：可选箭头(left)+可选图标+标题文字+可选箭头(right)）和子菜单列表 `.o-sub-menu-children`（展开/折叠动画）。OMenuItem 水平排列：可选图标+文字内容。缩进通过 CSS 变量 `--menu-level` 控制层级深度。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
regions: [ul.o-menu > [OSubMenu(标题行+子列表) | OMenuItem(图标+文字)] × N]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：垂直排列的文字列表，有层级缩进，子菜单标题行右侧（或左侧）有展开/折叠箭头图标，选中项有蓝色高亮背景+蓝色文字，整体宽度约 240px，常出现在侧边栏区域
- **Token → Prop 映射**：一级项文字 text1+间距 11px=size:medium、一级项文字 tip1+间距 4px=size:small；箭头在右侧=arrowPosition:right(默认)、箭头在左侧=arrowPosition:left；同级只展开一个=accordion:true；选中项蓝色=modelValue 匹配
- **易混淆组件区分**：与 OCollapse 区别——Menu 有选中高亮状态和导航语义(ul/li)，Collapse 是内容展开收起无选中态；与 OTab 区别——Tab 是水平排列的选项卡切换，Menu 是垂直排列的层级导航；与 ODropdown 区别——Dropdown 是弹出式菜单（浮层定位），Menu 是页面内嵌的固定侧边栏导航

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OMenu, OSubMenu, OMenuItem } from '@opensig/opendesign';
</script>
```

### OMenu Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| size | `MenuSizeT` | `'medium'` / `'small'` | `'medium'` | 尺寸 |
| accordion | `boolean` | — | `false` | 手风琴模式 |
| modelValue | `string` | — | — | 选中值（v-model） |
| defaultValue | `string` | — | `''` | 默认选中值 |
| expanded | `string[]` | — | — | 展开节点（v-model:expanded） |
| defaultExpanded | `string[]` | — | `[]` | 默认展开节点 |
| selectStrictly | `boolean` | — | `false` | 父子节点关联 |
| arrowPosition | `string` | `'left'` / `'right'` | `'right'` | 箭头位置 |

### OSubMenu Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string` | — | — | 子菜单标识（必填） |
| selectable | `boolean` | — | `false` | 是否可选中 |
| icon | `Component` | — | — | 前缀图标 |

### OMenuItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string` | — | — | 菜单项标识（必填） |
| icon | `Component` | — | — | 前缀图标 |
| disabled | `boolean` | — | `false` | 禁用 |

### OMenu Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: string)` | 选中值变化时 |
| change | `(val: string)` | 选中值变化时 |
| update:expanded | `(val: string[])` | 展开状态变化时 |
| expanded-change | `(val: string[])` | 展开状态变化时 |

### OMenuItem Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| click | `(ev: Event)` | 点击菜单项（非禁用时） |

### Slots 表

#### OMenu Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 菜单内容区域 | 无 |

#### OSubMenu Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| icon | — | 有 icon prop 或 icon 插槽时 | 标题前缀图标 | `<component :is="props.icon" />` |
| title | — | 始终 | 标题文字区域 | 无 |
| default | — | 始终 | 子菜单内容 | 无 |

#### OMenuItem Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| icon | — | 有 icon prop 或 icon 插槽时 | 前缀图标 | `<component :is="props.icon" />` |
| default | — | 始终 | 菜单项文字 | 无 |

### 特殊行为

- 菜单项文字超出容器宽度时，自动截断并在 hover 时通过 Popover 显示完整文字
- 子菜单嵌套深度通过 CSS 变量 `--menu-level` 控制缩进
- 手风琴模式仅影响同级子菜单，不同层级的子菜单互不影响

### 典型使用场景与调用模板

**场景 1：基础菜单**
适用于：侧边栏导航
```vue
<script setup>
import { ref } from 'vue';
const selected = ref('item1');
</script>
<template>
  <OMenu v-model="selected">
    <OSubMenu value="sub1">
      <template #title>分组一</template>
      <OMenuItem value="item1">菜单项 1</OMenuItem>
      <OMenuItem value="item2">菜单项 2</OMenuItem>
    </OSubMenu>
    <OSubMenu value="sub2">
      <template #title>分组二</template>
      <OMenuItem value="item3">菜单项 3</OMenuItem>
    </OSubMenu>
  </OMenu>
</template>
```

**场景 2：手风琴模式**
适用于：空间有限的侧边栏
```vue
<OMenu v-model="selected" accordion>
  <OSubMenu value="sub1">
    <template #title>分组一</template>
    <OMenuItem value="item1">菜单项 1</OMenuItem>
  </OSubMenu>
  <OSubMenu value="sub2">
    <template #title>分组二</template>
    <OMenuItem value="item2">菜单项 2</OMenuItem>
  </OSubMenu>
</OMenu>
```

**场景 3：带图标的菜单**
适用于：功能丰富的管理后台
```vue
<OMenu v-model="selected">
  <OSubMenu value="sub1">
    <template #icon><OIconEdit /></template>
    <template #title>编辑管理</template>
    <OMenuItem value="item1" :icon="OIconCalendar">日程管理</OMenuItem>
  </OSubMenu>
  <OMenuItem value="item2">
    <template #icon><OIconEye /></template>
    查看详情
  </OMenuItem>
</OMenu>
```

**场景 4：左侧箭头 + 小尺寸**
适用于：紧凑型侧栏
```vue
<OMenu v-model="selected" size="small" arrow-position="left">
  <OSubMenu value="sub1">
    <template #title>子菜单</template>
    <OMenuItem value="item1">菜单项</OMenuItem>
  </OSubMenu>
</OMenu>
```

**场景 5：多级嵌套**
适用于：复杂层级导航
```vue
<OMenu v-model="selected" :default-expanded="['sub1', 'sub1-1']">
  <OSubMenu value="sub1">
    <template #title>一级菜单</template>
    <OSubMenu value="sub1-1">
      <template #title>二级菜单</template>
      <OMenuItem value="item1">三级菜单项</OMenuItem>
    </OSubMenu>
  </OSubMenu>
</OMenu>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础导航 | `v-model` + OSubMenu/OMenuItem | 最常见用法 |
| 手风琴 | `accordion` | 同级只展开一个 |
| 受控展开 | `v-model:expanded` | 精确控制展开项 |
| 左箭头 | `arrow-position="left"` | 箭头在标题左侧 |
| 紧凑菜单 | `size="small"` | 小号文字和间距 |
| 禁用项 | OMenuItem `disabled` | 禁止点击 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--menu-width` | `240px` | 菜单整体宽度 |
| `--menu-bg-color` | `transparent` | 菜单背景色 |
| `--menu-indicator-width` | `1px` | 指示线宽度 |
| `--menu-indicator-bg-color` | `var(--o-color-control4)` | 指示线颜色 |
| `--menu-color` | `var(--o-color-info2)` | 菜单项默认文字颜色 |
| `--menu-color-disabled` | `var(--o-color-info4)` | 禁用项文字颜色 |
| `--menu-color-selected` | `var(--o-color-primary1)` | 选中项文字颜色 |
| `--menu-bg-color-hover` | `var(--o-color-control2-light)` | 悬停时背景色 |
| `--menu-bg-color-selected` | `var(--o-color-control3-light)` | 选中时背景色（**仅支持纯色**，见下方注意） |

> ⚠️ **`--menu-bg-color-selected` 只接受纯色值**：组件内部将该变量用于 `background-color` 属性，而 `background-color` 不支持渐变函数（`linear-gradient` 等）。如需**渐变选中背景**，必须使用 `:deep()` 直接覆盖 `background` 属性：
>
> ```scss
> /* ❌ 无效：background-color 不接受渐变 */
> .my-menu { --menu-bg-color-selected: linear-gradient(...); }
>
> /* ✅ 正确：用 :deep() 仅覆盖叶节点 OMenuItem 的 background */
> /* ⚠️ 不要对 .o-sub-menu-selected/.o-sub-menu-associated-selected 加渐变 */
> /* 渐变高亮只应作用于叶节点菜单项，父级 OSubMenu 标题不高亮 */
> .my-menu {
>   :deep(.o-menu-item-selected) {
>     background: linear-gradient(to right, rgba(46,83,250,0.15), rgba(123,37,244,0.15));
>   }
> }
> ```
| `--menu-icon-color` | `currentColor` | 图标颜色 |
| `--menu-icon-color-selected` | `currentColor` | 选中图标颜色 |
| `--menu-item-padding-v` | `8px`（medium） | 菜单项垂直内边距 |
| `--menu-padding-h` | `8px`（medium） | 菜单项水平内边距 |
| `--menu-radius` | `var(--o-radius_control-xs)` | 菜单项圆角 |
| `--menu-text-size` | `var(--o-font_size-tip1)` | 菜单项文字大小 |
| `--menu-text-height` | `var(--o-line_height-tip1)` | 菜单项文字行高 |
| `--menu-icon-size` | `var(--o-icon_size_control-m)` | 图标尺寸（small 为 `control-xs`） |
| `--menu-icon-gap` | `8px`（medium） | 图标与文字间距（small 为 `4px`） |
| `--menu-arrow-size` | `var(--o-icon_size_control-m)` | 折叠箭头尺寸 |
| `--menu-popover-width` | `240px` | 弹出式子菜单宽度 |

**使用示例**:
```vue
<OMenu v-model="selected" style="--menu-width: 280px; --menu-color-selected: var(--o-color-success1)">
  ...
</OMenu>
```

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| medium 一级项间距 | 标准 | 8px | 标准 |
| medium 一级项文字 | 标准 | tip1 | 标准 |
| medium 图标 | 标准 | 控件 s | 标准 |
| small 文字 | tip2（一级 tip1） | 标准 | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  component: ul.o-menu
  direction: vertical
  width: 240px  # --menu-width
  bg-color: transparent  # --menu-bg-color
  regions:
    - name: OSubMenu
      element: li.o-sub-menu
      indent: calc(--menu-padding-h + --menu-base-indent * --menu-level)
      children:
        - name: title
          element: div.o-sub-menu-title
          direction: horizontal
          align: center
          children:
            - name: arrow-left
              element: div.o-sub-menu-arrow
              condition: arrowPosition="left"
              children: [IconChevronDownBold]
              size: var(--menu-arrow-size)
            - name: icon
              element: div.o-sub-menu-title-icon
              condition: icon prop 或 icon 插槽
              children:
                - { type: slot, name: icon }
              size: var(--menu-icon-size)
              gap: var(--menu-icon-gap)  # 8px(medium) / 4px(small)
            - name: content
              element: div.o-sub-menu-title-content
              flex: 1
              children:
                - { type: slot, name: title }
            - name: arrow-right
              element: div.o-sub-menu-arrow
              condition: arrowPosition="right"(默认)
              children: [IconChevronDownBold]
        - name: children
          element: ul.o-sub-menu-children
          class-toggle: expanded
          children:
            - { type: slot, name: default }  # OMenuItem / 嵌套 OSubMenu
    - name: OMenuItem
      element: li.o-menu-item
      direction: horizontal
      align: center
      indent: calc(--menu-padding-h + --menu-base-indent * --menu-level)
      padding-v: var(--menu-item-padding-v)
      border-radius: var(--menu-radius)
      children:
        - name: icon
          element: div.o-menu-item-icon
          condition: icon prop 或 icon 插槽
          size: var(--menu-icon-size)
        - name: content
          element: div.o-menu-item-content
          flex: 1
          overflow: hidden(ellipsis + popover on hover)
      states:
        selected: { color: var(--menu-color-selected), bg: var(--menu-bg-color-selected) }
        hover: { bg: var(--menu-bg-color-hover) }
        disabled: { color: var(--menu-color-disabled) }
  variants:
    medium:
      level-0: { padding-v: 11px, text: text1 }
      level-n: { padding-v: 8px, text: tip1 }
      icon: control-m
      padding-h: 8px
    small:
      padding-v: 4px
      text: tip1
      icon: control-xs
      padding-h: 4px
```

**≤1440px (laptop)**
```yaml
# medium: padding-v 4px, icon control-s, arrow control-s
# medium level-0: padding-v 8px, text tip1
```

**≤840px (pad_v)**
```yaml
# small: text tip2
# small level-0: text tip1（保持较大）
```

### 设计稿识别指南

**视觉特征指纹**

1. 垂直列表 + 层级缩进 + 子菜单标题行有展开/折叠箭头 + 选中项有蓝色高亮 → 匹配 OMenu
2. 侧边栏固定宽度（约 240px）的导航列表 + 可展开折叠的分组 → 匹配 OMenu
3. 菜单项前有图标 + 文字超出时截断省略 → 匹配 OMenu（带 icon 的 OMenuItem/OSubMenu）
4. 同级只展开一个子菜单组 → 匹配 OMenu（accordion=true）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 一级项文字 | text1 大字号 | size (OMenu) | `'medium'` | 默认 |
| 一级项文字 | tip1 小字号 | size (OMenu) | `'small'` | — |
| 一级项间距 | 11px | size (OMenu) | `'medium'` | — |
| 一级项间距 | 4px | size (OMenu) | `'small'` | — |
| 箭头位置 | 标题右侧 | arrowPosition | `'right'` | 默认 |
| 箭头位置 | 标题左侧 | arrowPosition | `'left'` | — |
| 展开模式 | 同级只展开一个 | accordion | `true` | — |
| 选中色 | 蓝色文字+浅蓝背景 | modelValue | 对应 value | — |
| 菜单项禁用 | 灰色文字 | disabled (OMenuItem) | `true` | — |
| 父子关联 | 父级也高亮 | selectStrictly | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OMenu | OCollapse | OMenu 有选中高亮状态和导航语义(ul/li)，OCollapse 是纯内容展开收起无选中态 |
| OMenu | OTab | OTab 是水平排列的选项卡切换面板，OMenu 是垂直排列的层级导航列表 |
| OMenu | ODropdown | ODropdown 是弹出式浮层菜单，OMenu 是页面内嵌的固定侧边栏导航 |
| OMenu | OTree | OTree 有复选框和节点连线，OMenu 无复选框仅有选中高亮 |

**DSL 识别规则（避免遗漏）**

- **图标判断**：M size 变体（属性3=ic_Enabled/ic_Actived）中的图标是 ODesign 内置图标（如 OIconFilter）。**不要**用项目自定义图标替代，应从 `@opensig/opendesign` 导入
- **S size 无图标**：S size 所有变体均无图标，不要添加 icon 插槽
- **多 OMenu 识别**：DSL 同一列中出现**多个独立的 assembled Group**（各自有完整菜单结构，且 top 坐标相差 > 100px），应渲染为多个独立 `<OMenu>` 实例，而不是一个带 Group 标签的 OMenu
- **渐变选中背景**：DSL 的 `fill` 中若有 `GRADIENT_LINEAR`（非纯色），选中态背景需用 `:deep()` 覆盖 `background`（见上方"可覆盖的 CSS 变量"一节）

**Playwright 测试注意事项**

- 点击嵌套子菜单项（三层以上）时，`.o-sub-menu-children-wrap` 可能拦截点击事件，需加 `{ force: true }`：
  ```typescript
  await item.click({ force: true })
  ```
- 嵌套菜单中 `.o-sub-menu-children` 可能有多个匹配元素（strict mode 违规），等待可见时需用 `.first()`：
  ```typescript
  // ❌ 报 strict mode violation
  await expect(menu.locator('.o-sub-menu-children')).toBeVisible()
  // ✅ 正确
  await expect(menu.locator('.o-sub-menu-children').first()).toBeVisible()
  ```
