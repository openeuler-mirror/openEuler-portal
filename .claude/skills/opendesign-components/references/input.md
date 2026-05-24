> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OInput 输入框

## Part A：设计理解卡

OInput 是单行输入框组件，支持多种外观样式、校验状态、密码框、字数统计等功能。可与 OForm 配合实现自动校验。

### 值

**modelValue**（属性）：输入框的值（v-model 双向绑定）。

**defaultValue**（属性）：非受控模式下的默认值。

### 外观

**variant**（属性）：输入框样式。"solid" 实心、"outline" 线框、"text" 无边框。默认 outline。

**color**（属性）：输入框颜色状态。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。在 OFormItem 内会自动跟随校验状态变色。默认 normal。

**size**（属性）：输入框尺寸。"small"、"medium"、"large"。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 状态

**disabled**（属性）：禁用输入框。默认关闭。

**readonly**（属性）：只读模式。默认关闭。

### 功能

**clearable**（属性）：是否显示清空按钮。默认关闭。

**type**（属性）：输入框类型。"text" 文本、"password" 密码。默认 text。

**placeholder**（属性）：占位文本。

**inputId**（属性）：input 元素的 id，用于 label 关联。

**maxLength**（属性）：最大字符长度。

**minLength**（属性）：最小字符长度。

**showLength**（属性）：字数统计显示模式。"always" 始终显示、"auto" 设置了 minLength/maxLength 时自动显示、"never" 不显示。默认 auto。

**getLength**（属性）：自定义获取字符长度的方法。接受字符串参数，返回长度数值。

**inputOnOutlimit**（属性）：超出最大字符数时是否允许继续输入。为 false 时输入长度超出 maxLength 会被截断。默认允许。

**autoWidth**（属性）：宽度随内容自适应。默认关闭。

**format**（属性）：值格式化函数，控制显示格式。接受字符串参数，返回格式化后的字符串。

**validate**（属性）：值有效性判断函数。接受字符串参数，返回布尔值表示是否有效。

**valueOnInvalidChange**（属性）：输入无效值时在 blur/pressEnter 时的处理方式。true 纠正为上一次合法值；false/undefined 不处理；函数则使用返回值作为纠正值。

**showPasswordEvent**（属性）：密码显示切换的触发方式。"click" 点击切换、"pointerdown" 按住显示松开隐藏。默认 pointerdown。

**passwordPlaceholder**（属性）：密码模式下单个字符的占位符。默认为圆点字符。

### 插槽区域

**prepend 插槽**（插槽）：输入框前置区域（外部，含边框）。适合放固定文字如 "https://"。

**append 插槽**（插槽）：输入框后置区域（外部，含边框）。适合放后缀如 ".com"。

**prefix 插槽**（插槽）：输入框内部前缀图标。

**suffix 插槽**（插槽）：输入框内部后缀图标。

**extra 插槽**（插槽）：输入框后缀区域的额外内容（位于清空按钮、密码图标、字数统计之后）。

### 事件

**input**（事件）：实时输入时触发。

**change**（事件）：值改变且失焦时触发。

**focus**（事件）：聚焦时触发。

**blur**（事件）：失焦时触发。

**clear**（事件）：点击清空按钮时触发。

**pressEnter**（事件）：按下回车键时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），大尺寸输入框高度从标准缩至 36px、文字变小、图标缩小；中尺寸高度缩至 28px。在平板竖屏及以下（≤840px），大尺寸高度恢复标准控件尺寸、图标使用中号。手机（≤600px）内边距进一步缩小。

🧩 **布局结构**：输入框整体水平排列，从左到右依次为：prepend 前置区域（外部，如 "https://"）、主体区域（含 prefix 前缀图标、input 输入区、suffix 后缀区域含清空/密码/字数统计/extra）、append 后置区域（外部，如 ".com"）。主体区域有边框/背景，prepend/append 是独立的外部附加块。输入框高度由 size 决定（small var(--o-control_size-s) / medium var(--o-control_size-m) / large var(--o-control_size-l)）。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [prepend(前置区域), main(prefix + input + suffix), append(后置区域)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：矩形带边框的单行文本输入区域，内部可能有前缀图标、清空按钮、密码眼睛图标、字数统计 → 匹配 OInput；左右有灰色附加块（如 "https://" 或 ".com"）→ 使用 prepend/append 插槽
- **Token → Prop 映射**：灰色边框 → variant="outline"（默认）；灰色填充背景 → variant="solid"；无边框无背景 → variant="text"；红色边框 → `color="danger"`（⚠️ 仅用于无表单联动的孤立展示场景，表单内见下条规则）；高度对应 size（small/medium/large）；半圆角 → round="pill"
- **易混淆组件区分**：与 OInputNumber 区分——OInputNumber 有加减控制按钮，OInput 无步进按钮；与 OTextarea 区分——OTextarea 是多行输入，OInput 是单行；与 OSelect 区分——OSelect 有下拉箭头和下拉面板，OInput 无下拉功能
- **⚠️ 错误状态 / 必填星号 → 用 OFormItem 包裹**：设计稿中输入框边框变红（错误态）或标签旁有红色星号（必填），应将 OInput 放入 `<OFormItem>` 实现（必填 → `required` prop；错误态 → `rules` 校验自动驱动颜色），**不要**直接设 `color="danger"` 或手写星号 HTML。详见 form.md。
- **前置区域模式区分**（⚠️ 关键）：
  - 前置是**静态文字**（如 "https://"、".com"）→ 用 `#prepend` / `#append` 插槽
  - 前置是**可点击下拉选择**（如手机区号 "+86（中国）▼"）→ 用 `OSelect + OInput` flex 并排（见场景5），**不要**用 `#prepend` 放静态文字模拟
- **内部右侧操作按钮区分**（⚠️ 关键）：
  - 验证码"发送验证码"等文字操作链接 → 用 `#suffix` 插槽放 `OLink` 组件
  - `#extra` 插槽位于清空/密码按钮**之后**（末尾），适合补充图标，不适合用于主操作按钮

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OInput } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| modelValue | `string \| number` | — | — | 输入值（v-model） |
| defaultValue | `string \| number` | — | — | 非受控默认值 |
| size | `SizeT` | `'small'` / `'medium'` / `'large'` | — | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色状态 |
| variant | `VariantT` | `'solid'` / `'outline'` / `'text'` | `'outline'` | 样式 |
| disabled | `boolean` | — | `false` | 禁用 |
| readonly | `boolean` | — | `false` | 只读 |
| clearable | `boolean` | — | `false` | 可清空 |
| type | `string` | `'text'` / `'password'` | `'text'` | 输入类型 |
| placeholder | `string` | — | — | 占位文本 |
| inputId | `string` | — | — | input 元素 id，用于 label 关联 |
| maxLength | `number` | — | — | 最大字符数 |
| minLength | `number` | — | — | 最小字符数 |
| showLength | `string` | `'always'` / `'auto'` / `'never'` | `'auto'` | 字数统计显示模式 |
| getLength | `(val: string) => number` | — | — | 自定义获取长度方法 |
| inputOnOutlimit | `boolean` | — | `true` | 超限可继续输入 |
| autoWidth | `boolean` | — | `false` | 宽度自适应 |
| format | `(value: string) => string` | — | — | 值格式化函数 |
| validate | `(value: string) => boolean` | — | — | 值有效性判断 |
| valueOnInvalidChange | `boolean \| (inputValue: string, lastValidInputValue: string) => string` | — | — | 无效值处理方式 |
| showPasswordEvent | `string` | `'click'` / `'pointerdown'` | `'pointerdown'` | 密码显示触发方式 |
| passwordPlaceholder | `string` | — | `'\u2022'` | 密码字符占位符 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: string)` | 值变化时 |
| change | `(value: string)` | 值改变且失焦 |
| input | `(evt: Event, value: string)` | 实时输入 |
| focus | `(evt: FocusEvent)` | 聚焦 |
| blur | `(evt: FocusEvent)` | 失焦 |
| clear | `(evt?: Event)` | 点击清空 |
| pressEnter | `(evt: KeyboardEvent)` | 按下回车 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| prepend | — | 始终 | 前置区域（外部） | 无 |
| append | — | 始终 | 后置区域（外部） | 无 |
| prefix | — | 始终 | 内部前缀 | 无 |
| suffix | — | 始终 | 内部后缀 | 无 |
| extra | — | 始终 | 后缀区域末尾额外内容 | 无 |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| focus() | — | 聚焦输入框 |
| blur() | — | 移除焦点 |
| clear() | — | 清空内容 |
| inputEl() | — | 获取原生 input 元素 |
| togglePassword() | — | 切换密码显示 |

### 典型使用场景与调用模板

**场景 1：基础输入框**
适用于：通用文本输入
```vue
<script setup>
import { ref } from 'vue';
const value = ref('');
</script>
<template>
  <OInput v-model="value" placeholder="请输入" />
</template>
```

**场景 2：带清空和字数统计**
适用于：有长度限制的输入
```vue
<OInput v-model="value" clearable show-length="always" :max-length="100" />
```

**场景 3：带前后缀图标**
适用于：搜索框
```vue
<OInput v-model="search" placeholder="搜索">
  <template #prefix><OIconSearch /></template>
</OInput>
```

**场景 4：带前置/后置内容**
适用于：URL 输入等（前置是**静态文字**）
```vue
<OInput v-model="domain" placeholder="输入域名">
  <template #prepend>https://</template>
  <template #append>.com</template>
</OInput>
```

**场景 5：手机号 + 区号下拉（Group-number 模式）**
适用于：输入框左侧有可点击/可选择的区号前缀（下拉选择）
⚠️ **不要**用 `#prepend` 静态文字；应将 `OSelect` 和 `OInput` 作为兄弟元素并排，用 CSS 去掉拼接处圆角和重叠边框：
```vue
<script setup>
import { ref } from 'vue';
import { OSelect, OOption, OInput } from '@opensig/opendesign';
const selectedVal = ref('+86(中国)');
const inputVal = ref('');
</script>
<template>
  <div class="input-wrap">
    <!-- OSelect 右侧无圆角，OInput 左侧无圆角，两者边框重叠 1px -->
    <OSelect v-model="selectedVal" size="large" class="phone-select" @click.stop>
      <OOption label="+86(中国)" value="+86(中国)" />
      <OOption label="+81(日本)" value="+81(日本)" />
    </OSelect>
    <OInput class="phone-input" v-model="inputVal" size="large" placeholder="请输入手机号" />
  </div>
</template>
<style scoped lang="scss">
.input-wrap {
  display: flex;
  align-items: center;
}
.phone-select {
  --select-icon-gap: 4px;
  --select-padding: 0 7px;
  z-index: 0;
  width: 120px;
  margin-right: -1px;           /* 边框重叠避免双线 */
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  &:hover { z-index: 2; }
}
.phone-input {
  position: relative;
  z-index: 1;
  width: 220px;
  :deep(.o_box-main) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
```

**场景 6：验证码输入框（Group-btn 模式）**
适用于：输入框内右侧有"发送验证码"等文字操作按钮
⚠️ 用 `#suffix` 插槽放 `OLink`（文字链样式），**不要**用 `#extra` 放 `OButton`：
```vue
<script setup>
import { ref } from 'vue';
import { OInput, OLink } from '@opensig/opendesign';
const codeValue = ref('');
const verifingCode = ref(false);
const sendLabel = ref('发送验证码');
const sendCode = async () => { /* 发送逻辑 + 倒计时 */ };
</script>
<template>
  <OInput v-model="codeValue" size="large" placeholder="请输入验证码">
    <template #suffix>
      <OLink
        tag="button"
        :color="verifingCode ? 'normal' : 'primary'"
        :disabled="verifingCode"
        @click="sendCode"
      >{{ sendLabel }}</OLink>
    </template>
  </OInput>
</template>
```

**场景 7：密码框**
适用于：密码输入
```vue
<OInput v-model="password" type="password" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础输入 | `v-model` + `placeholder` | 最常见用法 |
| 可清空 | `clearable` | 显示清空按钮 |
| 字数限制 | `max-length` + `show-length="always"` | 带统计 |
| 密码框 | `type="password"` | 可切换显示 |
| 错误状态 | `color="danger"` | 红色边框 |
| 搜索框 | `#prefix` + `clearable` | 带搜索图标 |
| 手机区号下拉（Group-number） | `OSelect + OInput` flex 并排（见场景5） | ⚠️ 不用 #prepend |
| 验证码按钮（Group-btn） | `#suffix` + `OLink` | ⚠️ 不用 #extra + OButton |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值（medium size） | 说明 |
|--------|----------------------|------|
| `--_box-height` | `var(--o-control_size-m)` | 输入框高度 |
| `--_box-padding` | `0 15px` | 水平内边距（s: `0 7px`，l: `0 15px`） |
| `--input-icon-size` | `var(--o-icon_size-m)` | 前缀/后缀图标尺寸 |

> **注意**：`width` 不由组件变量控制，直接在调用处设置 `style="width: 120px"` 或用 CSS class 设置即可。

### 响应式行为表

| 维度 | ≤600px | 601–840px | 841–1200px | >1200px |
|------|--------|----------|-----------|---------|
| 大尺寸高度 | 标准控件尺寸 | 标准控件尺寸 | 36px | 标准 |
| 大尺寸文字 | tip1 | tip1 | tip1 | 标准 |
| 中尺寸高度 | 28px | 28px | 28px | 标准 |
| 大尺寸内边距 | 0 11px | 0 11px | 标准 | 标准 |

### 组件布局结构

**桌面端 >1200px**
```yaml
layout:
  # 外层容器 .o-input → InBox (.o_box)
  display: inline-flex
  direction: horizontal
  regions:
    - name: prepend
      class: o_box-prepend
      condition: "$slots.prepend 存在"
      border: 1px solid var(--o-color-control1)  # --_box-prepend-append-bd
      background: var(--o-color-control5-light)  # --_box-prepend-append-bg-color
      children:
        - { type: slot, name: prepend }
    - name: main
      class: o_box-main
      flex: 1
      border: 1px solid var(--_box-bd-color)  # outline 模式为 var(--o-color-control1)
      background: var(--o-color-control5-light)  # --_box-bg-color
      border-radius: var(--o-radius_control-s)  # medium
      children:
        # 内层 InInput (.o_input) 是 label 元素
        - name: prefix
          class: o_input-prefix
          condition: "$slots.prefix 存在"
          children:
            - { type: slot, name: prefix }
        - name: input-wrap
          class: o_input-wrap
          flex: 1
          children:
            - { type: element, tag: input }
        - name: suffix
          class: o_input-suffix
          condition: "有 suffix 插槽/clearable/password/showLength"
          children:
            - { type: slot, name: suffix, class: o_input-suffix-icon }
            - { type: icon, name: clear, class: o_input-clear, condition: "clearable && 有值" }
            - { type: icon, name: eye, class: o_input-eye, condition: "type=password" }
            - { type: text, name: length, class: o_input-limit, condition: "isShowLength" }
            - { type: slot, name: extra }
    - name: append
      class: o_box-append
      condition: "$slots.append 存在"
      border: 1px solid var(--o-color-control1)
      background: var(--o-color-control5-light)
      children:
        - { type: slot, name: append }
  variants:
    small:
      height: var(--o-control_size-s)
      padding: "0 7px"
      font-size: var(--o-font_size-tip1)
      border-radius: var(--o-radius_control-xs)
      icon-size: var(--o-icon_size_control-xs)
    medium:
      height: var(--o-control_size-m)
      padding: "0 15px"
      font-size: var(--o-font_size-tip1)
      border-radius: var(--o-radius_control-s)
      icon-size: var(--o-icon_size_control-xs)
    large:
      height: var(--o-control_size-l)
      padding: "0 15px"
      font-size: var(--o-font_size-text1)
      border-radius: var(--o-radius_control-l)
      icon-size: var(--o-icon_size-m)  # --input-icon-size
    pill: { border-radius: "var(--o-control_size-l)" }
```

**≤1200px（笔记本）**
```yaml
# large: height 36px, font-size tip1, line-height tip1, icon-size var(--o-icon_size-s)
# medium: height 28px
```

**≤840px（平板竖屏）**
```yaml
# large: height var(--o-control_size-l)（恢复标准）, icon-size var(--o-icon_size-m)
```

**≤600px（手机）**
```yaml
# small: padding "0 5px"
# medium: padding "0 11px"
# large: padding "0 11px"
```

### 设计稿识别指南

**视觉特征指纹**

1. 矩形带边框的单行文本输入区域，可能含前缀图标或后缀按钮（清空 ×、密码眼睛、字数统计） → 匹配 OInput
2. 输入区域左右有灰色背景的附加文字块（如 "https://"、".com"、下拉选择区域） → 使用 prepend/append 插槽
3. 输入区域右侧有密码眼睛图标、点击可切换文字显示 → type="password"

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 边框 | `--o-color-control1` 灰色边框，透明背景 | variant | `'outline'` | 默认 |
| 背景 | `--o-color-control1-light` 灰色填充 | variant | `'solid'` | — |
| 边框+背景 | 均透明 | variant | `'text'` | — |
| 边框颜色 | `--o-color-danger1` 红色 | color | `'danger'` | 错误状态 |
| 边框颜色 | `--o-color-success1` 绿色 | color | `'success'` | 成功状态 |
| 边框颜色 | `--o-color-warning1` 橙色 | color | `'warning'` | 警告状态 |
| 高度 | var(--o-control_size-l) | size | `'large'` | — |
| 高度 | var(--o-control_size-m) | size | `'medium'` | — |
| 高度 | var(--o-control_size-s) | size | `'small'` | — |
| border-radius | 全圆角 | round | `'pill'` | — |
| 右侧有 × 图标 | 可见 | clearable | `true` | — |
| 右侧有眼睛图标 | 可见 | type | `'password'` | — |
| 右侧有 "3/20" 文字 | 字数统计 | showLength | `'always'` | 配合 maxLength |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OInput | OInputNumber | OInputNumber 有加减控制按钮（上下箭头或 ±），OInput 无步进按钮 |
| OInput | OTextarea | OTextarea 是多行输入且高度可变，OInput 是单行固定高度 |
| OInput | OSelect | OSelect 右侧有下拉箭头且点击展开面板，OInput 无下拉功能 |
| OInput | OIpInput | OIpInput 有 4 段点分输入格式，OInput 是单段连续输入 |

