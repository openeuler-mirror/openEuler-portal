> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OTab 标签页

## Part A：设计理解卡

OTab 是标签页组件，用于在不同内容区域之间切换。包含 OTab（标签页容器）和 OTabPane（标签面板）。支持三种风格、溢出省略与更多菜单、可添加/可删除页签、懒加载和过渡动画。

### 值

**modelValue**（属性）：当前选中的页签值（v-model 双向绑定）。未设置时默认激活第一个页签。

### 外观

**variant**（属性）：页签风格。"text" 文字型（带底部指示线滑动动画）、"solid" 实心型、"button" 按钮型。默认 text。

**size**（属性）：页签尺寸。"large" 大号、"medium" 中号、"small" 小号。

**round**（属性）：圆角值。仅 button 模式可用。"pill" 半圆或 CSS 值。

**line**（属性）：是否显示底部分隔线。button 模式不可用。默认开启。

**buttonInverse**（属性）：button 模式下是否使用反色风格。默认关闭。

**headerClass**（属性）：标签导航栏自定义类名。

### 溢出处理

**maxShow**（属性）：最大显示页签数量。超出的页签收入"更多"菜单，桌面端为 Popup 弹出，移动端为 Dialog 底部弹出。

**moreLabel**（属性）：超出时"更多"按钮的文案。默认"更多"。

### 渲染控制

**lazy**（属性）：是否在首次激活时才渲染面板内容（全局设置）。默认关闭。

**addable**（属性）：是否在导航栏末尾显示添加按钮。默认关闭。

**addInactive**（属性）：新增页签后是否不自动激活。默认关闭（即默认自动激活新页签）。

### 插槽区域

**prefix 插槽**（插槽）：导航栏左侧前缀区域。

**suffix 插槽**（插槽）：导航栏右侧后缀区域。

**anchor 插槽**（插槽）：替换 text 模式下的底部指示线动画。仅 text 模式有效。

**default 插槽**（插槽）：放置 OTabPane 组件。

### 事件

**change**（事件）：切换页签后触发。可获取新值和旧值。

**delete**（事件）：删除页签时触发。可获取被删除页签的值。

**add**（事件）：点击添加按钮时触发。

---

### OTabPane 标签面板

**value**（属性）：页签唯一标识值。

**label**（属性）：页签显示标题。未传 value 时用作标识。

**disabled**（属性）：是否禁用该页签。默认关闭。

**closable**（属性）：是否可删除该页签。开启后页签上出现关闭图标。默认关闭。

**transition**（属性）：页签切换过渡动画名。默认 "o-fade-in"。

**lazy**（属性）：该面板是否在首次激活时才渲染（单独设置，优先级高于 OTab 的 lazy）。默认关闭。

**unmountOnHide**（属性）：隐藏时是否卸载面板内容。默认关闭。

#### OTabPane 插槽

**nav 插槽**（插槽）：替换页签导航标签。用于自定义图标+文字组合等复杂导航内容。

**default 插槽**（插槽）：面板内容。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），页签文字和图标缩小，间距减小；在平板竖屏及以下（≤840px），文字进一步缩小、间距紧凑、指示线高度减小。button 模式在各断点下内边距随之调整。溢出的页签在移动端使用 Dialog 底部弹出菜单（而非 Popup）。

🧩 **布局结构**：标签页整体为垂直两栏结构，上方为导航栏（head），下方为内容面板区（body）。导航栏水平排列，包含可选前缀区（prefix 插槽）、页签导航列表（navs，内含多个页签项和可选"更多"按钮）、可选添加按钮、可选后缀区（suffix 插槽）。text 模式下导航列表底部有滑动指示线（anchor）；button 模式下页签项有背景填充和边框。内容面板区一次只显示一个 OTabPane 的内容。

```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
regions:
  [
    head(prefix + navs(nav-items + more + anchor) + add + suffix),
    body(OTabPane...),
  ]
```

🔍 **设计稿识别指南**：

- **视觉特征指纹**：多个水平排列的文字标签 + 当前选中项有底部指示线/高亮背景 + 下方有对应内容区域 → 匹配 OTab；标签之间等距排列，选中项文字颜色为品牌色 → text/solid 模式；标签有圆角背景填充 → button 模式
- **Token → Prop 映射**：文字标签+底部蓝色指示线 → variant="text"（默认）；文字标签+浅色背景填充 → variant="solid"；圆角按钮式+选中项有边框背景 → variant="button"；标签后有"+"图标 → addable=true；标签上有"x"关闭图标 → OTabPane closable=true；末尾有"更多"文字 → maxShow 属性限制；字号 h4 → size="large"；字号 text2 → size="medium"；字号 text1 → size="small"
- **导航栏对齐**：默认居中；左对齐通过 CSS 变量 `--tab-nav-justify: flex-start` 实现
- **易混淆组件区分**：与 ONav/导航菜单 区分——导航菜单用于页面路由切换通常在侧边栏/顶部全局导航，OTab 是同页面内容区域切换；与 OSegmented 区分——OSegmented 是分段选择器无下方内容面板，OTab 有关联的内容面板区域；与 OBreadcrumb 区分——OBreadcrumb 是路径导航有分隔箭头，OTab 无层级关系

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OTab, OTabPane } from "@opensig/opendesign";
</script>
```

### 类型定义

```typescript
type TabVariantT = "solid" | "text" | "button";
type SizeT = "large" | "medium" | "small";
```

### OTab Props 表

| 参数名        | 类型                        | 可选值                             | 默认值      | 说明                    |
| ------------- | --------------------------- | ---------------------------------- | ----------- | ----------------------- |
| modelValue    | `string \| number`          | —                                  | `undefined` | 选中页签值（v-model）   |
| variant       | `TabVariantT`               | `'solid'` / `'text'` / `'button'`  | `'text'`    | 页签风格                |
| size          | `SizeT`                     | `'large'` / `'medium'` / `'small'` | —           | 尺寸                    |
| round         | `RoundT`                    | `'pill'` / CSS 值                  | —           | 圆角（仅 button 模式）  |
| lazy          | `boolean`                   | —                                  | `false`     | 首次激活才渲染          |
| addable       | `boolean`                   | —                                  | `false`     | 是否可添加页签          |
| addInactive   | `boolean`                   | —                                  | `false`     | 新增页签不自动激活      |
| maxShow       | `number`                    | —                                  | —           | 最大显示页签数          |
| moreLabel     | `string`                    | —                                  | `'更多'`    | 更多按钮文案            |
| line          | `boolean`                   | —                                  | `true`      | 显示底部线（非 button） |
| buttonInverse | `boolean`                   | —                                  | `false`     | button 反色模式         |
| headerClass   | `string \| object \| array` | —                                  | —           | 导航栏类名              |

### OTabPane Props 表

| 参数名        | 类型               | 可选值 | 默认值        | 说明           |
| ------------- | ------------------ | ------ | ------------- | -------------- |
| value         | `string \| number` | —      | `undefined`   | 页签标识值     |
| label         | `string`           | —      | `undefined`   | 页签标题       |
| transition    | `string`           | —      | `'o-fade-in'` | 切换过渡动画   |
| disabled      | `boolean`          | —      | `false`       | 禁用页签       |
| closable      | `boolean`          | —      | `false`       | 可删除         |
| lazy          | `boolean`          | —      | `false`       | 首次激活才渲染 |
| unmountOnHide | `boolean`          | —      | `false`       | 隐藏时卸载     |

### Events 表

| 事件名            | 参数                                                     | 触发时机     |
| ----------------- | -------------------------------------------------------- | ------------ |
| update:modelValue | `(value: string \| number)`                              | 选中值变化时 |
| change            | `(value: string \| number, oldValue?: string \| number)` | 切换页签后   |
| delete            | `(value: string \| number)`                              | 删除页签时   |
| add               | `(evt: MouseEvent)`                                      | 点击添加按钮 |

### Slots 表

**OTab 插槽：**

| 插槽名  | Slot Props | 触发条件          | 替换范围   | 回退内容   |
| ------- | ---------- | ----------------- | ---------- | ---------- |
| default | —          | 始终              | 面板区域   | 无         |
| prefix  | —          | 有插槽时          | 导航栏左侧 | 无         |
| suffix  | —          | 有插槽时          | 导航栏右侧 | 无         |
| anchor  | —          | variant="text" 时 | 指示线     | 默认滑动线 |

**OTabPane 插槽：**

| 插槽名  | Slot Props | 触发条件   | 替换范围 | 回退内容                |
| ------- | ---------- | ---------- | -------- | ----------------------- |
| default | —          | 面板挂载时 | 面板内容 | 无                      |
| nav     | —          | 始终       | 导航标签 | `label \|\| value` 文字 |

### 典型使用场景与调用模板

**场景 1：基础标签页**
适用于：内容区域切换

```vue
<script setup>
import { ref } from "vue";
const activeTab = ref("tab1");
</script>
<template>
  <OTab v-model="activeTab">
    <OTabPane value="tab1" label="标签一">内容一</OTabPane>
    <OTabPane value="tab2" label="标签二">内容二</OTabPane>
    <OTabPane value="tab3" label="标签三">内容三</OTabPane>
  </OTab>
</template>
```

**场景 2：按钮风格**
适用于：工具栏式切换

```vue
<OTab v-model="activeTab" variant="button" round="pill">
  <OTabPane value="all" label="全部" />
  <OTabPane value="published" label="已发布" />
  <OTabPane value="draft" label="草稿" />
</OTab>
```

**场景 3：自定义导航标签**
适用于：图标+文字的复杂导航

```vue
<OTab v-model="activeTab">
  <OTabPane value="home">
    <template #nav><OIconHome /> 首页</template>
    首页内容
  </OTabPane>
  <OTabPane value="settings">
    <template #nav><OIconSettings /> 设置</template>
    设置内容
  </OTabPane>
</OTab>
```

**场景 4：可增删页签**
适用于：动态标签页管理

```vue
<script setup>
import { ref } from "vue";
const tabs = ref([{ value: "tab1", label: "标签一" }]);
let count = 1;
const onAdd = () => {
  count++;
  tabs.value.push({ value: `tab${count}`, label: `标签${count}` });
};
const onDelete = (val) => {
  tabs.value = tabs.value.filter((t) => t.value !== val);
};
</script>
<template>
  <OTab addable @add="onAdd" @delete="onDelete">
    <OTabPane
      v-for="tab in tabs"
      :key="tab.value"
      :value="tab.value"
      :label="tab.label"
      closable
    >
      {{ tab.label }} 的内容
    </OTabPane>
  </OTab>
</template>
```

**场景 5：溢出更多菜单**
适用于：大量标签页需要折叠

```vue
<OTab v-model="activeTab" :max-show="5" more-label="展开更多">
  <OTabPane v-for="i in 10" :key="i" :value="`tab${i}`" :label="`标签 ${i}`">
    内容 {{ i }}
  </OTabPane>
</OTab>
```

**场景 6：懒加载**
适用于：面板内容较重时延迟渲染

```vue
<OTab v-model="activeTab" lazy>
  <OTabPane value="tab1" label="基础信息">基础信息内容</OTabPane>
  <OTabPane value="tab2" label="详细数据" unmount-on-hide>详细数据（每次切走都卸载）</OTabPane>
</OTab>
```

**场景 7：导航栏左对齐**
适用于：页签导航栏需要左对齐而非默认居中（通过 CSS 变量覆盖，无需 `:deep`）

```vue
<OTab v-model="activeTab" class="my-tab">
  <OTabPane label="标签一">内容一</OTabPane>
  <OTabPane label="标签二">内容二</OTabPane>
</OTab>

<style lang="scss">
.my-tab {
  --tab-nav-justify: flex-start;
}
</style>
```

### 常见 prop 组合速查

| 场景         | 推荐 prop 组合                                         | 说明             |
| ------------ | ------------------------------------------------------ | ---------------- |
| 基础文字标签 | `v-model` + `variant="text"`（默认）                   | 最常见           |
| 按钮风格     | `variant="button"` + `round="pill"`                    | 工具栏           |
| 反色按钮     | `variant="button"` + `button-inverse`                  | 深色背景         |
| 可增删       | `addable` + `@add` + `@delete` + `closable`（TabPane） | 动态管理         |
| 溢出折叠     | `:max-show` + `more-label`                             | 大量标签         |
| 延迟渲染     | `lazy`                                                 | 首次激活才渲染   |
| 自定义导航   | OTabPane `#nav` 插槽                                   | 图标+文字        |
| 导航栏左对齐 | `--tab-nav-justify: flex-start`                        | 默认居中，需覆盖 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名                            | 默认值                                   | 说明                    |
| --------------------------------- | ---------------------------------------- | ----------------------- |
| `--tab-nav-btn-icon-size`         | `var(--o-icon_size_control-xs)`          | 导航按钮图标尺寸        |
| `--tab-nav-btn-size`              | `24px`                                   | 导航按钮尺寸            |
| `--tab-nav-color`                 | `var(--o-color-info2)`                   | 页签文字颜色            |
| `--tab-nav-color-disabled`        | `var(--o-color-info4)`                   | 禁用页签文字颜色        |
| `--tab-nav-radius`                | `2px`                                    | 页签圆角                |
| `--tab-icon-color`                | `var(--o-color-info2)`                   | 页签图标颜色            |
| `--tab-icon-color-hover`          | `var(--o-color-primary1)`                | 页签图标 hover 颜色     |
| `--tab-icon-color-disabled`       | `var(--o-color-info4)`                   | 页签图标禁用颜色        |
| `--tab-nav-divider`               | `1px solid var(--o-color-control1)`      | 导航栏底部分隔线        |
| `--tab-nav-anchor-color`          | `var(--o-color-primary1)`                | text 模式底部指示线颜色 |
| `--tab-nav-anchor-height`         | `2px`                                    | text 模式底部指示线高度 |
| `--tab-nav-close-size`            | `var(--o-icon_size_control-xs)`          | 关闭按钮图标尺寸        |
| `--tab-nav-icon-size`             | `var(--o-icon_size_control-m)`（medium） | 页签图标尺寸            |
| `--tab-nav-icon-gap`              | `8px`                                    | 图标与文字间距          |
| `--tab-nav-ellipsis-padding-x`    | `16px`                                   | 更多按钮水平内边距      |
| `--tab-nav-ellipsis-shadow-width` | `8px`                                    | 更多按钮遮罩宽度        |
| `--tab-nav-text-size`             | `var(--o-font_size-text2)`（medium）     | 页签文字字号            |
| `--tab-nav-text-height`           | `var(--o-line_height-text2)`（medium）   | 页签文字行高            |
| `--tab-nav-gap`                   | `32px`（medium）                         | 页签间距                |
| `--tab-nav-padding`               | `0 0 16px`（medium）                     | 页签内边距              |
| `--tab-nav-justify`               | `center`                                 | 导航栏水平对齐方式      |

**使用示例**:

```vue
<OTab style="--tab-nav-anchor-color: var(--o-color-success1)" v-model="active">
  <OTabPane value="tab1" label="标签一">内容</OTabPane>
</OTab>
```

### 响应式行为表

| 维度         | ≤840px          | 841–1440px | >1440px    |
| ------------ | --------------- | ---------- | ---------- |
| large 文字   | tip1            | text2      | 标准       |
| medium 文字  | tip1            | text1      | 标准       |
| small 文字   | tip1            | tip1       | 标准       |
| large 图标   | 控件 s          | 控件 m     | 标准       |
| large 间距   | 16px            | 32px       | 标准       |
| small 间距   | 12px            | 24px       | 标准       |
| 溢出更多菜单 | Dialog 底部弹出 | Popup 弹出 | Popup 弹出 |

触控 vs 指针差异：

| 场景     | 触控设备         | 指针设备          |
| -------- | ---------------- | ----------------- |
| 溢出菜单 | ODialog 底部弹出 | OPopup hover 触发 |

### 组件布局结构

**桌面端 >1440px（text 模式，medium 尺寸）**

```yaml
layout:
  direction: vertical
  class: o-tab o-tab-text o-tab-medium
  regions:
    - name: head
      class: o-tab-head
      direction: horizontal
      align: center
      border-bottom: "1px solid var(--o-color-control1)" # line=true 时
      children:
        - name: prefix
          type: slot
          class: o-tab-head-prefix
          condition: "有 prefix 插槽时"
        - name: navs
          class: o-tab-navs
          flex: 1
          justify-content: var(--tab-nav-justify, center)
          children:
            - name: navs-container
              class: o-tab-navs-container
              children:
                - name: nav-list
                  class: o-tab-nav-list
                  direction: horizontal
                  justify-content: var(--tab-nav-justify, center)
                  gap: 32px # --tab-nav-gap, large 40px, small 24px
                  children:
                    - name: nav-item
                      class: o-tab-nav
                      padding: "0 0 16px" # --tab-nav-padding
                      font-size: var(--o-font_size-text2) # --tab-nav-text-size
                      color: var(--o-color-info2)
                      color-active: var(--o-color-primary1)
                      description: 重复多个，对应每个 OTabPane
                    - name: more-button
                      class: o-tab-nav o-tab-nav-ellipsis
                      condition: "有溢出页签时"
                      description: "显示 '...' 或 moreLabel+'箭头'"
                - name: anchor
                  class: o-tab-nav-anchor
                  children:
                    - name: anchor-line
                      class: o-tab-nav-anchor-line
                      height: 2px # --tab-nav-anchor-height
                      background: var(--o-color-primary1)
                      transition: "transform 宽度和位置跟随选中项"
            - name: add-button
              class: o-tab-nav-add
              condition: addable=true
              icon: IconAdd
        - name: suffix
          type: slot
          class: o-tab-head-suffix
          condition: "有 suffix 插槽时"
    - name: body
      class: o-tab-body
      children:
        - name: tab-pane
          type: OTabPane
          description: "多个面板，仅当前选中的显示"
          transition: "o-fade-in"
  variants:
    text:
      nav-hover-color: var(--o-color-primary1)
      anchor: 底部滑动指示线
    solid:
      nav-bg: var(--o-color-control1-light)
      nav-bg-active: var(--o-color-control5-light)
      nav-padding: "4px 16px"
      nav-gap: 8px
    button:
      nav-bg: var(--o-color-fill3)
      nav-bg-active: var(--o-color-fill2)
      nav-border-active: "1px solid var(--o-color-control4-light)"
      border-radius: var(--o-radius_control-s)
      nav-gap: 4px
      nav-padding: "6px 16px" # large
      no-anchor: true
      no-line: true
```

**≤1440px**

```yaml
# large: text-size text2, icon-size control-m, gap 32px
# medium: text-size text1
# small: text-size tip1, icon-size control-s, gap 24px
# button.large: text-size text1, icon-size icon-s, padding "4px 16px"
```

**≤840px**

```yaml
# large: text-size tip1, icon-size control-s, gap 16px, anchor-height 1px
# medium: text-size tip1, gap 16px
# small: text-size tip1, gap 12px
# 溢出菜单由 OPopup 切换为 ODialog 底部弹出
```

### 设计稿识别指南

**视觉特征指纹**

1. 多个水平文字标签 + 选中项下方有蓝色指示线 + 下方有内容区域 → 匹配 OTab（variant="text"）
2. 多个水平标签 + 选中项有浅色背景填充 → 匹配 OTab（variant="solid"）
3. 圆角按钮排列 + 选中项有边框和不同背景 → 匹配 OTab（variant="button"）
4. 标签栏末尾有"+"按钮 → addable=true
5. 标签上有"x"关闭图标 → OTabPane closable=true
6. 标签末尾有"更多"+"箭头" → maxShow 溢出处理

**设计 Token → Prop 值映射表**

| 设计稿属性     | 值 / 范围         | 对应 Prop         | Prop 值    | 备注           |
| -------------- | ----------------- | ----------------- | ---------- | -------------- |
| 页签风格       | 文字+底部指示线   | variant           | `'text'`   | 默认           |
| 页签风格       | 浅色背景填充      | variant           | `'solid'`  | —              |
| 页签风格       | 圆角按钮+边框     | variant           | `'button'` | —              |
| 字号           | h4                | size              | `'large'`  | —              |
| 字号           | text2             | size              | `'medium'` | 默认           |
| 字号           | text1             | size              | `'small'`  | —              |
| 圆角（button） | 半圆角            | round             | `'pill'`   | 仅 button 模式 |
| 底部分隔线     | 有线              | line              | `true`     | 默认           |
| 底部分隔线     | 无线              | line              | `false`    | —              |
| button 反色    | 深色背景+浅色按钮 | buttonInverse     | `true`     | —              |
| 末尾"+"按钮    | —                 | addable           | `true`     | —              |
| 页签"x"图标    | —                 | OTabPane closable | `true`     | —              |
| "更多"按钮     | 有数量限制        | maxShow           | 数字       | —              |
| 页签间距       | 40px              | size              | `'large'`  | text 模式      |
| 页签间距       | 32px              | size              | `'medium'` | text 模式      |
| 页签间距       | 24px              | size              | `'small'`  | text 模式      |

**易混淆组件区分表**

| 本组件         | 易混淆组件            | 关键区分依据                                                                 |
| -------------- | --------------------- | ---------------------------------------------------------------------------- |
| OTab           | ONav / 导航菜单       | 导航菜单用于页面路由全局导航（侧边栏/顶部），OTab 是同页面内局部内容区域切换 |
| OTab           | OSegmented 分段选择器 | OSegmented 无关联内容面板，仅切换选中值；OTab 下方有对应的内容面板区域       |
| OTab（button） | ORadioGroup（button） | ORadioGroup 是表单控件用于选值提交，OTab 是页面内容区域切换器                |
| OTab           | OBreadcrumb           | OBreadcrumb 是路径导航有层级箭头分隔，OTab 无层级关系，各标签平级            |
