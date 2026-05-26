> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OCheckbox 多选框

## Part A：设计理解卡

OCheckbox 是多选框组件，让用户在一组选项中勾选一个或多个。可单独使用，也可配合 OCheckboxGroup 实现多选框组。支持半选状态（用于"全选"场景）。

### 值与选中

**value**（属性）：该多选框代表的值。当勾选时，该值会被加入 modelValue 数组；取消勾选时移除。必填。

**modelValue**（属性）：选中值数组（v-model 双向绑定）。包含哪些 value 就代表哪些多选框被勾选。可以多个 OCheckbox 共享同一个数组，无需 OCheckboxGroup 也能实现多选框组。

**defaultChecked**（属性）：非受控模式下，初始是否选中。默认不选中。

### 状态

**disabled**（属性）：禁用多选框，不可点击且样式变灰。默认关闭。在 OCheckboxGroup 内，组级禁用优先；达到最大/最小选择数量时，超出范围的多选框也会自动禁用。

**indeterminate**（属性）：半选状态，显示一条横线而非勾号。通常用于"全选"控件：部分子项选中时显示半选。半选仅影响外观，不影响实际选中值。默认关闭。

### 自定义外观

**checkbox 插槽**（插槽）：替换多选框的整个视觉区域（勾选框 + 文字标签）。可获取 checked（是否选中）和 disabled（是否禁用）状态。替换后默认的勾选框和标签均不渲染。

**default 插槽**（插槽）：多选框右侧的文字标签。位于 checkbox 插槽内部，若 checkbox 插槽被替换则此插槽也失效。

### 事件

**change**（事件）：勾选状态变化后触发，可获取变化后的选中值数组和原始事件。

---

### OCheckboxGroup 多选框组

OCheckboxGroup 是多选框组容器，为内部所有 OCheckbox 提供统一的值管理和约束。

**modelValue**（属性）：选中值数组（v-model 双向绑定）。

**defaultValue**（属性）：非受控模式下的默认选中值数组。默认空数组。

**disabled**（属性）：禁用整个多选框组。默认关闭。

**direction**（属性）：多选框排列方向。"h" 水平排列、"v" 垂直排列。默认水平。

**min**（属性）：最少必须勾选的数量。达到下限时，已选中项不可取消。

**max**（属性）：最多可勾选的数量。达到上限时，未选中项不可勾选。

**default 插槽**（插槽）：放置 OCheckbox 子项。

**change**（事件）：勾选状态变化后触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），多选框文字和行高缩小。

🧩 **布局结构**：单个 OCheckbox 为 label 元素，内部横向排列——左侧方形勾选框图标区 + 右侧文字标签。OCheckboxGroup 为 div 容器，根据 direction 属性水平（flex-direction: row）或垂直（flex-direction: column）排列内部的 OCheckbox 子项。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: row (单个 checkbox 内部)
regions: [checkbox-input-wrap(勾选框图标), checkbox-label(文字标签)]
# OCheckboxGroup
direction: row | column (由 direction prop 决定)
regions: [OCheckbox, OCheckbox, ...]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：小方形勾选框（带圆角）+ 右侧文字标签；选中时方框填充主题色并显示勾号（✓）；半选时方框内显示一条横线而非勾号
- **Token → Prop 映射**：方框填充主题色 → 选中状态；方框内横线 → indeterminate=true；方框灰色不可点击 → disabled=true；多个勾选框水平排列 → direction="h"；垂直排列 → direction="v"
- **易混淆组件区分**：与 ORadio（单选框）区分——OCheckbox 为方形勾选框可多选，ORadio 为圆形可单选；与 OSwitch（开关）区分——OCheckbox 是方形带勾号，OSwitch 是椭圆滑块
- **⚠️ 必填星号 → 用 OFormItem 包裹**：设计稿中勾选框旁边的标签有红色星号（必填），应将 OCheckbox/OCheckboxGroup 放入 `<OFormItem required>` 实现，**不要**手写星号。详见 form.md。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OCheckbox, OCheckboxGroup } from '@opensig/opendesign';
</script>
```

### OCheckbox Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| value | `string \| number` | — | — | 多选框的值（必填） |
| modelValue | `Array<string \| number>` | — | — | 选中值数组（v-model） |
| defaultChecked | `boolean` | — | `false` | 非受控时默认是否选中 |
| disabled | `boolean` | — | `false` | 是否禁用 |
| indeterminate | `boolean` | — | `false` | 是否半选状态 |
| inputId | `string` | — | 自动生成 | 内部 input 元素的 id |

### OCheckboxGroup Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `Array<string \| number>` | — | — | 选中值数组（v-model） |
| defaultValue | `Array<string \| number>` | — | `[]` | 非受控时默认值 |
| disabled | `boolean` | — | `false` | 禁用整个多选框组 |
| direction | `DirectionT` | `'h'` / `'v'` | `'h'` | 排列方向 |
| min | `number` | — | — | 最少选择数量 |
| max | `number` | — | — | 最多选择数量 |

### Events 表

#### OCheckbox Events

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: Array<string \| number>)` | 勾选状态变化时 |
| change | `(val: Array<string \| number>, ev: Event)` | 勾选状态变化后（nextTick） |

#### OCheckboxGroup Events

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(val: Array<string \| number>)` | 勾选状态变化时 |
| change | `(val: Array<string \| number>, ev: Event)` | 勾选状态变化后 |

### Slots 表

#### OCheckbox Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| checkbox | `{ checked: boolean, disabled: boolean }` | 始终 | 勾选框 + 标签整体 | 默认勾选框 + 标签 |
| default | — | checkbox 插槽未被替换时 | 标签文字 | 无 |

#### OCheckboxGroup Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 多选框列表 | 无 |

### 插槽层级关系

```
checkbox（使用后内部全部失效）
├── 勾选框图标区域
└── default（标签文字）
```

### 暴露属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| checked | `ComputedRef<boolean>` | 当前是否选中 |

### 典型使用场景与调用模板

**场景 1：基础多选框组（无 OCheckboxGroup）**
适用于：多个多选框共享同一 v-model 数组
```vue
<script setup>
import { ref } from 'vue';
const selected = ref(['1']);
</script>
<template>
  <OCheckbox v-model="selected" value="1">选项 1</OCheckbox>
  <OCheckbox v-model="selected" value="2">选项 2</OCheckbox>
  <OCheckbox v-model="selected" value="3">选项 3</OCheckbox>
</template>
```

**场景 2：使用 OCheckboxGroup（带数量限制）**
适用于：需要统一管理 + min/max 约束
```vue
<script setup>
import { ref } from 'vue';
const selected = ref(['1']);
</script>
<template>
  <OCheckboxGroup v-model="selected" :min="1" :max="3" direction="v">
    <OCheckbox value="1">选项 1</OCheckbox>
    <OCheckbox value="2">选项 2</OCheckbox>
    <OCheckbox value="3">选项 3</OCheckbox>
    <OCheckbox value="4">选项 4</OCheckbox>
  </OCheckboxGroup>
</template>
```

**场景 3：全选与半选**
适用于：全选控件 + 子项列表
```vue
<script setup>
import { ref, computed } from 'vue';
const selected = ref([]);
const options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
];
const allState = computed(() => {
  const count = options.filter(o => selected.value.includes(o.value)).length;
  return {
    all: count === options.length,
    indeterminate: count > 0 && count < options.length,
  };
});
const handleChangeAll = () => {
  selected.value = allState.value.all ? [] : options.map(o => o.value);
};
</script>
<template>
  <OCheckbox
    :model-value="allState.all ? ['all'] : []"
    value="all"
    :indeterminate="allState.indeterminate"
    @change="handleChangeAll"
  >全选</OCheckbox>
  <OCheckbox v-for="o in options" v-model="selected" :key="o.value" :value="o.value">
    {{ o.label }}
  </OCheckbox>
</template>
```

**场景 4：自定义勾选框外观**
适用于：需要完全自定义勾选框的视觉样式
```vue
<OCheckbox v-model="selected" value="custom">
  <template #checkbox="{ checked, disabled }">
    <div :class="['custom-check', { active: checked, disabled }]">
      <span v-if="checked">✓</span>
    </div>
    <span>自定义外观</span>
  </template>
</OCheckbox>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础多选 | `v-model` + `value` | 最常见用法 |
| 多选框组 | OCheckboxGroup + `v-model` | 统一管理 |
| 数量限制 | OCheckboxGroup + `min` / `max` | 控制可选范围 |
| 全选控件 | `indeterminate` + `@change` | 配合计算属性 |
| 垂直排列 | OCheckboxGroup + `direction="v"` | 垂直布局 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

**OCheckbox 变量：**

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--checkbox-text-size` | `var(--o-font_size-text1)` | 标签文字大小（>1200px 默认值） |
| `--checkbox-text-height` | `var(--o-line_height-text1)` | 标签文字行高 |
| `--checkbox-label-gap` | `8px` | 勾选框与文字标签的间距 |
| `--checkbox-align` | `center` | 勾选框与标签的垂直对齐方式 |
| `--checkbox-color` | `var(--o-color-info1)` | 标签文字颜色 |
| `--checkbox-color-disabled` | `var(--o-color-info4)` | 禁用状态文字颜色 |
| `--checkbox-radius` | `var(--o-radius_control-xs)` | 勾选框圆角 |
| `--checkbox-input-wrap-size` | `var(--o-control_size-s)` | 勾选框外层容器尺寸 |
| `--checkbox-input-size` | `var(--o-control_size-xs)` | 勾选框实际尺寸 |
| `--checkbox-input-bg-color` | `var(--o-color-control5-light)` | 勾选框未选中背景色 |
| `--checkbox-input-bg-color-disabled` | `var(--o-color-control4-light)` | 勾选框禁用背景色 |
| `--checkbox-input-bg-color-checked` | `var(--o-color-primary1)` | 勾选框选中背景色 |
| `--checkbox-input-bg-color-checked-hover` | `var(--o-color-primary2)` | 勾选框选中悬停背景色 |
| `--checkbox-input-bg-color-checked-active` | `var(--o-color-primary3)` | 勾选框选中按下背景色 |
| `--checkbox-input-bg-color-checked-disabled` | `var(--o-color-primary4)` | 勾选框选中禁用背景色 |
| `--checkbox-input-bd-color` | `var(--o-color-control1)` | 勾选框未选中边框颜色 |
| `--checkbox-input-bd-color-hover` | `var(--o-color-primary2)` | 勾选框未选中悬停边框颜色 |
| `--checkbox-input-bd-color-active` | `var(--o-color-primary3)` | 勾选框未选中按下边框颜色 |
| `--checkbox-input-bd-color-disabled` | `var(--o-color-control4)` | 勾选框禁用边框颜色 |
| `--checkbox-input-bd-color-checked` | `var(--o-color-primary1)` | 勾选框选中边框颜色 |
| `--checkbox-input-bd-color-checked-hover` | `var(--o-color-primary2)` | 勾选框选中悬停边框颜色 |
| `--checkbox-input-bd-color-checked-active` | `var(--o-color-primary3)` | 勾选框选中按下边框颜色 |
| `--checkbox-input-bd-color-checked-disabled` | `var(--o-color-primary4)` | 勾选框选中禁用边框颜色 |
| `--checkbox-input-icon-size` | `calc(var(--checkbox-input-size) / 2)` | 勾号/横线图标大小 |
| `--checkbox-input-icon-color` | `var(--o-color-fill2)` | 勾号/横线图标颜色 |

**OCheckboxGroup 变量：**

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--checkbox-group-gap` | `24px`（水平）/ `16px`（垂直） | 多选框之间的间距 |

**使用示例**：
```vue
<OCheckbox v-model="selected" value="1" style="--checkbox-input-bg-color-checked: var(--o-color-success1); --checkbox-input-bd-color-checked: var(--o-color-success1)">
  自定义颜色
</OCheckbox>
```

### 响应式行为表

| 维度 | ≤1200px | >1200px |
|------|---------|---------|
| 文字大小 | 缩小（tip1） | 标准 |
| 行高 | 缩小（tip1） | 标准 |

### 组件布局结构

```yaml
# OCheckbox 布局结构
root: label.o-checkbox
  direction: row (隐式，由 .o-checkbox-wrap 内部 inline 排列)
  children:
    - .o-checkbox-wrap:
        role: 勾选框整体容器
        children:
          - input[type=checkbox]: 隐藏的原生 checkbox（用于无障碍）
          - slot[checkbox] || 默认内容:
              children:
                - .o-checkbox-input-wrap:
                    role: 勾选框图标容器
                    size: var(--checkbox-input-wrap-size)  # var(--o-control_size-s)
                    children:
                      - .o-checkbox-input:
                          size: var(--checkbox-input-size)  # var(--o-control_size-xs)
                          border-radius: var(--checkbox-radius)  # var(--o-radius_control-xs)
                          bg: var(--checkbox-input-bg-color)  # var(--o-color-control5-light)
                          bg-checked: var(--checkbox-input-bg-color-checked)  # var(--o-color-primary1)
                          border: var(--checkbox-input-bd-color)  # var(--o-color-control1)
                          border-checked: var(--checkbox-input-bd-color-checked)  # var(--o-color-primary1)
                          children:
                            - span.o-checkbox-input-icon-indeterminate (半选横线) | IconChecked (勾号)
                - .o-checkbox-label:
                    role: 文字标签
                    gap-left: var(--checkbox-label-gap)  # 8px
                    children:
                      - slot[default]
                    tokens:
                      font-size: var(--checkbox-text-size)  # var(--o-font_size-text1) → var(--o-font_size-tip1)
                      line-height: var(--checkbox-text-height)  # var(--o-line_height-text1) → var(--o-line_height-tip1)
                      color: var(--checkbox-color)  # var(--o-color-info1)
                      color-disabled: var(--checkbox-color-disabled)  # var(--o-color-info4)

# OCheckboxGroup 布局结构
root: div.o-checkbox-group
  direction: row (.o-checkbox-group-h) | column (.o-checkbox-group-v)
  gap: var(--checkbox-group-gap)  # 24px (水平) | 16px (垂直)
  children:
    - slot[default] → OCheckbox × N

# 响应式断点 Token 值
breakpoints:
  ">1200px":
    --checkbox-text-size: var(--o-font_size-text1)
    --checkbox-text-height: var(--o-line_height-text1)
  "≤1200px":
    --checkbox-text-size: var(--o-font_size-tip1)
    --checkbox-text-height: var(--o-line_height-tip1)
```

### 设计稿识别指南

**视觉特征指纹**
1. 小方形勾选框（带圆角 `--o-radius_control-xs`），未选中时白色/浅色背景 + 灰色边框；选中时填充主题色（`--o-color-primary1`）并显示白色勾号图标
2. 勾选框右侧紧跟文字标签，间距 8px
3. 半选状态（indeterminate）时，方框填充主题色但内部显示一条白色横线而非勾号

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值/范围 | 对应Prop | Prop值 | 备注 |
|-----------|---------|---------|--------|------|
| 方框填充主题色+勾号 | 选中态 | modelValue | 包含该 value | — |
| 方框白色+灰色边框 | 未选中态 | modelValue | 不含该 value | — |
| 方框主题色+横线 | 半选态 | indeterminate | `true` | 通常用于全选控件 |
| 方框灰色+不可点击 | 禁用态 | disabled | `true` | — |
| 多个勾选框水平排列 | 间距 24px | direction | `'h'` | OCheckboxGroup 默认 |
| 多个勾选框垂直排列 | 间距 16px | direction | `'v'` | OCheckboxGroup |
| 文字标签字号 text1 | 标准字号 | — | — | >1200px 默认 |
| 文字标签字号 tip1 | 缩小字号 | — | — | ≤1200px 响应式 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|------------|
| OCheckbox | ORadio（单选框） | OCheckbox 为方形可多选，ORadio 为圆形只能单选 |
| OCheckbox | OSwitch（开关） | OCheckbox 是方形带勾号，OSwitch 是椭圆形滑块切换 |
| OCheckbox | OTag（标签）可选模式 | OCheckbox 有明显的方形勾选框图标，OTag 为文字标签带背景色 |

