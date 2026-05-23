> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OForm 表单

## Part A：设计理解卡

OForm 是表单组件，用于收集和校验用户输入。包含 OForm（表单容器）和 OFormItem（表单项）。支持水平、垂直、行内三种布局，内置验证规则系统。

### 布局

**layout**（属性）：表单布局方式。"h" 水平布局，标签与控件同行；"v" 垂直布局，标签在控件上方；"inline" 行内布局，多个表单项在同一行。默认水平。

**hasRequired**（属性）：是否有必填项，用于统一缩进对齐（预留必填星号的空间）。默认关闭。

### 标签配置（OForm 全局 / OFormItem 局部）

**labelWidth**（属性）：标签宽度，CSS 值。OForm 上统一设置，OFormItem 可单独覆盖。

**labelAlign**（属性）：标签与控件的垂直对齐方式。"top" 顶部对齐、"center" 居中对齐、"bottom" 底部对齐。

**labelJustify**（属性）：标签的水平对齐方式。"left" 左对齐、"center" 居中、"right" 右对齐。

### 数据模型

**model**（属性）：表单数据对象。传入后，OFormItem 通过 field 属性关联模型中的字段，实现自动校验和重置。

---

### OFormItem 表单项

**field**（属性）：对应 model 中的字段名（支持路径格式如 "a.b"）。使用 rules 校验时必填。

**label**（属性）：表单项标签文字。

**required**（属性）：是否为必填项，显示红色星号。默认关闭。

**rules**（属性）：校验规则数组。支持三种规则类型：必填规则（required + message）、类型规则（type + message）、自定义校验函数（validator 返回 danger/warning/success）。每条规则可设置触发时机（change/input/blur/focus）。

**defaultTrigger**（属性）：默认校验触发事件。手动校验或提交时未指定触发方式时使用。

### OFormItem 插槽

**label 插槽**（插槽）：替换标签文字区域。替换后 label 属性失效。

**symbol 插槽**（插槽）：替换必填星号区域的默认星号。

**default 插槽**（插槽）：放置表单控件（OInput、OSelect 等）。OForm 提供 `--form-item-main-box-width-standard` 等响应式宽度变量，若项目全局样式已统一应用（见「全局调用建议」），则模板中无需再设置控件宽度。OButton 宽度不在变量管理范围内，由调用方自行决定。

**message 插槽**（插槽）：替换校验错误/警告消息区域。可获取 message（消息数组）和 type（danger/warning）。

**extra 插槽**（插槽）：表单项底部的额外提示信息。

### 事件

**submit**（事件）：表单提交时触发（自动校验所有字段），可获取校验结果。

**validate**（事件）：手动调用 validate 方法后触发。

**clear**（事件）：清除校验状态后触发。

**reset**（事件）：重置表单后触发。

📱 **响应式行为**：在笔记本尺寸（≤1440px），表单项间距和标签间距缩小；平板横屏（841–1200px）间距进一步缩小，控件宽度随 `--o-r-grid-*` token 自动收窄；平板竖屏及以下（≤840px），控件宽度自动铺满（100%），标签与控件间距缩至 8px；手机（≤600px），校验消息边距调整。

🧩 **布局结构**：外层 `.o-form` 为 `<form>` 元素，通过 `layout` 属性切换水平（h，标签与控件同行 flex 排列）、垂直（v，标签在上控件在下 block 排列）、行内（inline，表单项横向排列 flex wrap）三种模式。每个 OFormItem 内部由标签区（`.o-form-item-label`，含必填星号 + 标签文字）和主区域（`.o-form-item-main`，含控件 + 校验消息 + 额外提示）组成，通常label为顶对齐。
```yaml
# 简化结构摘要（完整版见 Part B）
tag: form
layout: h(flex-row) | v(block) | inline(flex-wrap)
item: [label(symbol+text), main(control+message+extra)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：纵向排列的表单项列表，每项由左侧标签 + 右侧控件组成（水平模式），或上方标签 + 下方控件（垂直模式）；必填项标签前有红色星号；校验失败时控件下方显示红/黄色提示文字
- **Token → Prop 映射**：标签在左控件在右=layout:h、标签在上控件在下=layout:v、多个表单项同行=layout:inline；标签前有红色星号=required+hasRequired；控件下方红色文字=rules 校验 danger、黄色文字=warning
- **⚠️ 多列表单布局**：设计稿中表单项并排显示时，使用 `OForm layout="h"`（保持单列堆叠，标签左置）。OForm 提供 `--form-item-main-box-width-standard`/`--form-item-main-box-width-wide` 等响应式变量，**推荐在项目全局样式中统一应用**（见「全局调用建议」），模板中无需对每个控件单独设 width（OButton 除外）。
  - 若项目设计稿与默认值不符，全局覆盖变量即可：`.o-form { --form-item-main-box-width-standard: xxx; --form-item-main-box-width-wide: xxx; }`
  - 标签宽度最小值：`label-width="96px"`（PC 多列表单），实际宽度以设计图为准
- **易混淆组件区分**：与普通 div 排列区别——Form 有 `<form>` 语义标签、内置校验系统和 submit 事件；与 OGrid 区别——Form 专用于表单项的标签-控件对齐布局，Grid 是通用多列栅格布局
- **⚠️ 输入类控件的错误状态 / 必填星号 → 统一用 OFormItem 包裹**（适用于所有输入类控件：OInput、OSelect、OTextarea、OInputNumber、OCheckbox、ORadio、OSlider、OSwitch、OCascader、ORate 等）：
  - 设计稿中标签前有红色星号（必填）→ `<OFormItem required>` ，表单整体加 `hasRequired`（预留星号空间保持对齐）
  - 设计稿中控件有红色边框 / 错误状态 → 将控件放入 `<OFormItem :rules="[...]">` ，校验触发后自动驱动控件 color
  - 设计稿中控件下方有红色错误提示文字 → OFormItem rules 校验 message 自动渲染
  - **禁止**：直接给控件设 `color="danger"` 来模拟错误态（失去与表单联动能力）；手写 `<span class="required">*</span>` 来模拟星号

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OForm, OFormItem } from '@opensig/opendesign';
</script>
```

### ⚡ 全局调用建议

OForm 通过 CSS 变量为各控件提供随断点响应的标准宽度，**推荐在项目全局样式中统一应用**，之后所有表单内的控件宽度自动跟随断点变化，模板中无需再写 `style="width:..."` 或 `:style`（OButton 除外，宽度由调用方自行决定）：

```scss
// 在项目全局样式中一次性配置（如 src/styles/form-controls.scss）
.o-form {
  .o-input, .o-select, .o-input-number, .o-cascader, .o-ip-input {
    width: var(--form-item-main-box-width-standard);
  }
  .o-textarea {
    width: var(--form-item-main-box-width-wide);
  }
}
```

OForm 提供的宽度变量及其响应式行为：

| CSS 变量 | 桌面端默认值 | 平板横屏（841–1200px） | ≤840px |
|---------|------------|----------------------|--------|
| `--form-item-main-box-width-standard` | `--o-r-grid-6` | `--o-r-grid-4` | `100%` |
| `--form-item-main-box-width-wide` | `--o-r-grid-14` | `--o-r-grid-8` | `100%` |
| `--form-item-main-box-inline-gap` | `--o3-gap-4` | — | — |
| `--form-item-main-box-width-min` | `(standard - gap) / 2` | — | — |

若项目设计稿与默认值不符，全局覆盖变量即可：
```css
.o-form {
  --form-item-main-box-width-standard: 280px;
  --form-item-main-box-width-wide: 560px;
}
```

### 类型定义

```typescript
type ValidatorResultTypeT = 'danger' | 'warning' | 'success';
type TriggerT = 'change' | 'input' | 'blur' | 'focus' | `e-${string}`;

type ValidatorRuleT = {
  triggers?: TriggerT | TriggerT[];
  validator?: (value: any) => { type: ValidatorResultTypeT; message?: string } | void;
};
type RequiredRuleT = {
  required: boolean;
  message?: string;
  triggers?: TriggerT | TriggerT[];
};
type TypeRuleT = {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  message?: string;
  triggers?: TriggerT | TriggerT[];
};
type RulesT = ValidatorRuleT | RequiredRuleT | TypeRuleT;
```

### OForm Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| model | `object` | — | — | 表单数据对象 |
| hasRequired | `boolean` | — | `false` | 是否有必填项 |
| layout | `string` | `'h'` / `'v'` / `'inline'` | `'h'` | 布局方式 |
| labelAlign | `string` | `'top'` / `'center'` / `'bottom'` | — | 标签垂直对齐 |
| labelJustify | `string` | `'left'` / `'center'` / `'right'` | — | 标签水平对齐 |
| labelWidth | `string` | CSS 值 | — | 标签宽度 |

### OFormItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| field | `string` | — | — | 对应 model 中的字段名 |
| label | `string` | — | — | 标签文字 |
| required | `boolean` | — | `false` | 是否必填 |
| labelAlign | `string` | `'top'` / `'center'` / `'bottom'` | 继承 OForm | 标签垂直对齐 |
| labelJustify | `string` | `'left'` / `'center'` / `'right'` | 继承 OForm | 标签水平对齐 |
| labelWidth | `string` | CSS 值 | 继承 OForm | 标签宽度 |
| rules | `RulesT[]` | — | — | 校验规则数组 |
| defaultTrigger | `TriggerT` | `'change'` / `'input'` / `'blur'` / `'focus'` | — | 默认校验触发事件 |

### OForm Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| submit | `(results: FieldResultT[])` | 表单提交时（自动校验） |
| validate | `(results: FieldResultT[])` | 手动调用 validate 后 |
| clear | `(filed?: string \| string[])` | 清除校验状态后 |
| reset | `(filed?: string \| string[])` | 重置表单后 |

### Slots 表

#### OForm Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 表单项列表 | 无 |

#### OFormItem Slots

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| label | — | 始终 | 标签文字区域 | `{{ label }}` |
| symbol | — | 始终 | 必填星号 | `*` |
| default | — | 始终 | 表单控件区域 | 无 |
| message | `{ message: string[], type: string }` | 校验失败时 | 错误消息区域 | 消息列表 |
| extra | — | 始终（不传则不渲染） | 底部提示区域 | 无 |

### 暴露方法（OForm）

| 方法名 | 参数 | 说明 |
|--------|------|------|
| validate(filed?) | `filed?: string \| string[]` | 校验表单（可指定字段） |
| resetFields(filed?) | `filed?: string \| string[]` | 重置表单（清除校验 + 恢复初始值） |
| clearValidate(filed?) | `filed?: string \| string[]` | 仅清除校验状态 |

### 典型使用场景与调用模板

**场景 1：基础表单（带校验）**
适用于：用户注册、信息填写
```vue
<script setup>
import { ref, reactive } from 'vue';
const formRef = ref();
const formData = reactive({ name: '', email: '' });
const rules = [
  { required: true, message: '请输入', triggers: 'blur' },
];
const onSubmit = (results) => {
  const hasError = results.some(r => r?.type === 'danger');
  if (!hasError) { /* 提交数据 */ }
};
</script>
<template>
  <OForm ref="formRef" :model="formData" has-required @submit="onSubmit">
    <OFormItem field="name" label="姓名" required :rules="rules">
      <OInput v-model="formData.name" />
    </OFormItem>
    <OFormItem field="email" label="邮箱" :rules="rules">
      <OInput v-model="formData.email" />
    </OFormItem>
    <OButton html-type="submit" color="primary">提交</OButton>
  </OForm>
</template>
```

**场景 2：垂直布局表单**
适用于：移动端或窄空间
```vue
<OForm :model="formData" layout="v">
  <OFormItem field="name" label="姓名">
    <OInput v-model="formData.name" />
  </OFormItem>
</OForm>
```

**场景 3：自定义校验规则**
适用于：密码确认等复杂校验
```vue
<OFormItem field="confirmPwd" label="确认密码" :rules="[
  { required: true, message: '请确认密码' },
  { validator: (val) => val !== formData.password
    ? { type: 'danger', message: '两次密码不一致' }
    : undefined,
    triggers: 'blur'
  }
]">
  <OInput v-model="formData.confirmPwd" type="password" />
</OFormItem>
```

**场景 4：自定义标签和消息插槽**
适用于：标签需图标或消息需特殊展示
```vue
<OFormItem field="name">
  <template #symbol><OIconStar /></template>
  <template #label><OIconUser /> 用户名</template>
  <OInput v-model="formData.name" />
  <template #message="{ message, type }">
    <ul><li v-for="msg in message" :key="msg">{{ msg }}</li></ul>
  </template>
  <template #extra>用户名长度 4-20 个字符</template>
</OFormItem>
```

**场景 5：多列栅格表单（PC 4列 / 平板 3列 / 移动单列）**
适用于：信息录入类 PC 表单，字段数 2–7 个的分组

**Step 1：在项目全局样式中应用宽度变量（推荐一次性配置，整个项目复用）**

OForm 提供响应式宽度变量，需在项目全局样式中主动应用到控件上（如果项目中已有此配置则跳过）：

```scss
// src/styles/form-controls.scss
.o-form {
  // 将 OForm 提供的响应式宽度变量应用到各输入控件
  .o-input, .o-select, .o-input-number, .o-cascader, .o-ip-input {
    width: var(--form-item-main-box-width-standard);
  }
  .o-textarea {
    width: var(--form-item-main-box-width-wide);
  }

  // 若需覆盖默认宽度，在此声明（按项目设计稿调整）
  // --form-item-main-box-width-standard: 280px;
  // --form-item-main-box-width-wide: 560px;

  // 同 OFormItem 内多输入框：控件 slot 内用 div.form-inline 包裹
  .form-inline {
    display: flex;
    align-items: center;
    gap: var(--form-item-main-box-inline-gap);

    .o-input, .o-select, .o-input-number {
      width: var(--form-item-main-box-width-min);
      flex: 1 1 var(--form-item-main-box-width-min);
      min-width: 0;
    }

    @media (max-width: 840px) {
      flex-direction: column;
      align-items: stretch;
      .o-input, .o-select, .o-input-number { width: 100%; flex: none; }
    }
  }
}
```

**Step 2：在 main.ts 导入（一次性）**
```ts
import './styles/form-controls.scss'
```

**Step 3：模板写法（全局样式已处理宽度，模板中无需再设置 width）**
```vue
<template>
  <OForm has-required layout="h" label-width="96px" :model="formData">

    <!-- OInput / OSelect 等：全局样式已应用 --form-item-main-box-width-standard，此处无需写 width -->
    <OFormItem label="字段一" required field="f1">
      <OSelect v-model="formData.f1" placeholder="请选择" />
    </OFormItem>
    <OFormItem label="字段二" required field="f2">
      <OInput v-model="formData.f2" placeholder="请输入" />
    </OFormItem>

    <!-- 同行双输入（范围输入）：控件 slot 内用 div.form-inline 包裹 -->
    <OFormItem label="日期范围" field="dateRange">
      <div class="form-inline">
        <OInput v-model="formData.startDate" placeholder="开始日期" />
        <span>至</span>
        <OInput v-model="formData.endDate" placeholder="结束日期" />
      </div>
    </OFormItem>

    <!-- OTextarea：全局样式已应用 --form-item-main-box-width-wide（较宽），label-align="top" 避免标签悬空 -->
    <OFormItem label="描述" label-align="top" field="desc">
      <OTextarea v-model="formData.desc" />
    </OFormItem>
  </OForm>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础表单 | `model` + `has-required` + `layout="h"` | 最常见用法 |
| 垂直布局 | `layout="v"` | 移动端友好 |
| 行内表单 | `layout="inline"` | 搜索栏等 |
| 右对齐标签 | `label-justify="right"` + `label-width="96px"` | 标签对齐（PC 多列标准） |
| 带校验 | `field` + `rules` + `:model` | 自动校验 |
| **多列栅格表单** | `layout="h"` + `label-width="96px"` | 控件宽度由 OForm 自动管理，无需额外设置 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--form-item-display` | `flex` | 表单项的 display 模式 |
| `--form-item-gap` | `24px` | 表单项之间的间距（响应式断点会自动缩小） |
| `--form-label-main-gap` | `32px` | 标签区与控件区之间的间距（水平模式，响应式断点会自动缩小） |
| `--form-label-gap-top` | `4px` | 标签区域的顶部 margin |
| `--form-msg-gap` | `4px 0 0 16px` | 校验消息的 padding |
| `--form-item-main-box-width-standard` | `min(var(--o-r-grid-6), 100%)` | 标准输入框宽度（响应式） |
| `--form-item-main-box-width-wide` | `min(var(--o-r-grid-14), 100%)` | 较宽输入框宽度（响应式） |
| `--form-item-main-box-inline-gap` | `var(--o-r-gap-4)` | 同域多控件输入框间距 |
| `--form-label-width` | `20%`（水平模式） | 标签宽度（由 labelWidth prop 覆盖） |
| `--form-label-max-width` | `240px`（水平模式） | 标签最大宽度 |
| `--form-label-justify` | — | 标签水平对齐（由 labelJustify prop 覆盖） |
| `--form-item-align` | `flex-start`（水平模式） | 标签与控件的垂直对齐（由 labelAlign prop 覆盖） |
| `--form-label-main-gap-v` | `8px`（垂直模式） | 垂直模式下标签与控件的间距 |

**使用示例**：
```vue
<!-- 覆盖控件标准宽度（整个表单统一生效） -->
<OForm style="--form-item-main-box-width-standard: 280px;" :model="formData" />
```

### 响应式行为表

| 维度 | ≤600px | 601–840px | 841–1200px | 1201–1440px | >1440px |
|------|--------|----------|-----------|-------------|---------|
| 表单项间距 | 12px | 12px | 12px | 16px | 标准 |
| 标签-控件间距 | 8px | 8px | 16px | 24px | 标准 |

### 组件布局结构

```yaml
# layout="h" 水平模式（默认）
root: form.o-form.o-form-layout-h
  classes:
    - .o-form-has-required: hasRequired (显示必填星号占位)
  style:
    --form-item-display: flex
    --form-item-gap: 24px
    --form-label-main-gap: 32px
    --form-label-gap-top: 4px
    --form-label-width: 20%
    --form-label-max-width: 240px
    --form-item-align: flex-start
    --form-msg-gap: 4px 0 0 16px
    可覆盖: --form-label-width(labelWidth), --form-label-justify(labelJustify), --form-item-align(labelAlign)
  children:
    - slot-default:  # OFormItem 列表
        children:
          - .o-form-item (每个 OFormItem):
              display: flex (--form-item-display)
              align-items: --form-item-align (flex-start)
              margin-bottom: --form-item-gap (24px)，最后一项为 0
              classes:
                - .o-form-item-required: required
                - .o-form-item-danger: 校验失败 (margin-bottom 变 0，为消息腾空间)
                - .o-form-item-warning: 校验警告
              children:
                - .o-form-item-label:
                    display: inline-flex
                    align-items: center
                    flex: 0 0 --form-label-width (20%)
                    max-width: --form-label-max-width (240px)
                    justify-content: --form-label-justify
                    margin: --form-label-gap-top(4px) 0
                    children:
                      - .o-form-require-symbol:
                          condition: o-form-has-required 时显示(display:block)，required 时可见(opacity:1)
                          color: --o-color-danger1
                          font-size: --o-font_size-tip2
                          margin-right: 4px
                          children: slot-symbol (fallback: "*")
                      - slot-label:
                          fallback: span {{ label }}
                - .o-form-item-main:
                    flex: 1
                    margin-left: --form-label-main-gap (32px)
                    children:
                      - .o-form-item-main-wrap:
                          display: flex
                          align-items: center
                          min-height: 32px
                          children: slot-default (表单控件)
                      - .o-form-item-message:
                          condition: fieldResult?.message
                          padding: --form-msg-gap (4px 0 0 16px)
                          font-size: --o-font_size-tip2
                          color: --o-color-info3
                          min-height: --form-item-gap
                          classes:
                            - .type-danger: color --o-color-danger1
                            - .type-warning: color --o-color-warning1
                          children: slot-message (props: { message, type })
                      - .o-form-item-extra:
                          condition: slots.extra
                          margin-top: 4px
                          font-size: --o-font_size-tip2
                          color: --o-color-info3

# layout="v" 垂直模式
root: form.o-form.o-form-layout-v
  style:
    --form-label-width: 100%
    --form-label-justify: flex-start
    --form-label-main-gap-v: 8px
  .o-form-item:
    display: block (非 flex)
  .o-form-item-label:
    margin-bottom: --form-label-main-gap-v (8px)
    # 无 margin-left 间距，标签和控件上下排列

# layout="inline" 行内模式
root: form.o-form.o-form-layout-inline
  display: flex
  flex-wrap: wrap
  .o-form-item:
    margin: 0 --form-item-gap(24px) --form-item-gap(24px) 0
    # 标签与控件仍为 flex 同行，但多个 item 横向排列

# 响应式断点
breakpoints:
  "<=1440px (laptop)":
    form-item-gap: 16px
    form-label-main-gap: 24px
  "<=1200px (pad_h)":
    form-item-gap: 12px
    form-label-main-gap: 16px
  "<=840px (pad_v)":
    form-item-gap: 12px
    form-label-main-gap: 8px
  "<=600px (phone)":
    form-msg-gap: 4px 0 0 12px
```

### 设计稿识别指南

**视觉特征指纹**

1. 纵向排列的表单项列表，每项由标签（左侧或上方）+ 表单控件（右侧或下方）组成
2. 水平模式：标签和控件在同一行，标签固定宽度（默认 20%，最大 240px），控件区自适应撑满
3. 垂直模式：标签在控件上方，标签宽度 100%，适合移动端窄屏
4. 必填项标签前有红色星号（*），星号使用 monospace 字体、tip2 字号、danger1 颜色
5. 校验失败时控件下方出现提示文字：danger 红色、warning 黄色，tip2 字号
6. 行内模式：多个表单项横向排列，自动换行

**设计 Token → Prop 值映射表**

| 设计特征 | Token / 视觉值 | Prop | Prop 值 |
|---------|---------------|------|--------|
| 标签在左、控件在右 | flex 同行 | `layout` | `"h"`（默认） |
| 标签在上、控件在下 | block 上下 | `layout` | `"v"` |
| 多个表单项同行 | flex-wrap | `layout` | `"inline"` |
| 标签前红色星号 | --o-color-danger1 | `required` + `hasRequired` | `true` |
| 标签固定宽度 | --form-label-width | `labelWidth` | CSS 值如 `"120px"` |
| 标签右对齐 | justify-content: flex-end | `labelJustify` | `"right"` |
| 标签居中对齐 | justify-content: center | `labelJustify` | `"center"` |
| 标签垂直顶部对齐 | align-items: flex-start | `labelAlign` | `"top"` |
| 标签垂直居中 | align-items: center | `labelAlign` | `"center"` |
| 控件下方红色文字 | --o-color-danger1 | `rules` | 校验结果 type=danger |
| 控件下方黄色文字 | --o-color-warning1 | `rules` | 校验结果 type=warning |
| 表单项间距 24px | --form-item-gap | — | 默认值（>1440px） |
| 标签控件间距 32px | --form-label-main-gap | — | 默认值（>1440px） |

**易混淆组件区分表**

| 对比组件 | 相似点 | 区分方法 |
|---------|-------|---------|
| OGrid (ORow+OCol) | 都可实现左右排列布局 | Form 专用于标签-控件对齐的表单场景，有校验系统和 submit 事件；Grid 是通用多列栅格系统，无表单语义 |
| div + flex 手动排列 | 都可排列元素 | Form 是 `<form>` 语义标签，内置校验系统（rules/validate/resetFields），支持全局标签配置继承 |
| OInput / OSelect 等 | 常一起使用 | Form/FormItem 是容器和布局组件，管理标签对齐和校验；Input/Select 是具体的输入控件，放在 FormItem 的默认插槽内 |
