> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OIpInput IP地址输入框

## Part A：设计理解卡

OIpInput 是专用于输入 IPv4 地址的组件。它由多个分段输入框组成，每个分段之间用圆点分隔符连接，整体包裹在一个外框（InBox）中。用户逐段输入数字，组件自动校验范围（0-255）并在填满三位数字时自动跳转到下一段。

### 值

**modelValue**（属性）：IP 地址字符串（v-model 双向绑定），格式如 "192.168.1.1"。当所有分段均为合法 0-255 数字时，输出完整 IP 字符串；否则输出空字符串。

### 外观

**variant**（属性）：外框样式。"solid" 实心、"outline" 线框、"text" 无边框。默认 outline。外框样式同时应用于整体容器和每个分段输入框。

**color**（属性）：外框颜色状态。"normal" 默认、"success" 成功、"warning" 警告、"danger" 错误。在 OFormItem 内会自动跟随校验状态变色。默认 normal。

**size**（属性）：组件尺寸。"small"、"medium"、"large"。不同尺寸有不同的内边距和高度。

**round**（属性）：圆角值。"pill" 半圆或 CSS 值。

### 状态

**disabled**（属性）：禁用整个 IP 输入框。禁用后不响应键盘事件。默认关闭。

**readonly**（属性）：只读模式。默认关闭。

### 功能

**segmentsLen**（属性）：IP 地址的分段数量。默认 4（标准 IPv4）。可自定义为其他值以适应特殊需求。

### 自动行为

- 每个分段最多输入 3 位数字，只接受数字字符，非数字自动过滤。
- 如果输入的数字超过 255，自动修正为 255。
- 当某段输入满 3 位数字后，焦点自动跳转到下一段。
- 在某段为空时按退格键，焦点自动跳转到上一段。

### 分段间分隔符

每两个分段之间有一个圆形小点分隔符，尺寸 4px，背景色跟随主题信息色。

### 事件

**change**（事件）：IP 值变化时触发，携带校验结果（是否合法）和当前 IP 字符串。

### 表单集成

组件自动与 OForm/OFormItem 配合。在表单项内使用时，颜色会自动跟随表单校验状态（成功/警告/错误）。值变化时自动触发表单的 onChange 回调。

**响应式行为**：在笔记本尺寸及以下（<=1200px），大尺寸高度缩至 36px，中尺寸高度缩至 28px。在平板竖屏及以下（<=840px），大尺寸高度恢复标准控件尺寸。

🧩 **布局结构**：外层 `.o-ip-input` 是一个 InBox 容器（水平排列），内部由多个 OInput 分段输入框和圆点分隔符交替排列组成。每个分段输入框居中对齐、无独立边框（边框由外层 InBox 统一提供），分隔符为 4px 圆点。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [InBox(外框容器) > [OInput(分段输入), separator(圆点分隔符)] × segmentsLen]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：一个矩形输入框内包含多段（通常 4 段）数字，段与段之间有小圆点分隔符，每段数字居中显示，整体看起来像 IP 地址格式 "xxx.xxx.xxx.xxx"
- **Token → Prop 映射**：外框实心填充=variant:solid、外框仅描边=variant:outline、无边框=variant:text；边框蓝色=color:primary 系、红色=color:danger；高度 40px=size:large、32px=size:medium、28px=size:small；全圆角=round:pill
- **易混淆组件区分**：与 OInput 区别——IpInput 内部有多段用圆点分隔的数字区域，OInput 是单一连续输入区域；与多个独立 OInput 区别——IpInput 共享一个外框且分段间有内置圆点分隔符，分段间自动跳转焦点

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OIpInput } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| modelValue | `string` | 否 | — | — | IP 地址值（v-model），格式如 `"192.168.1.1"` |
| disabled | `boolean` | 否 | — | `false` | 是否禁用 |
| segmentsLen | `number` | 否 | — | `4` | IP 分段数量 |
| size | `SizeT` | 否 | `'small'` / `'medium'` / `'large'` | — | 尺寸 |
| round | `RoundT` | 否 | `'pill'` / CSS 值 | — | 圆角 |
| color | `Color2T` | 否 | `'normal'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色状态 |
| readonly | `boolean` | 否 | — | `false` | 是否只读 |
| variant | `VariantT` | 否 | `'solid'` / `'outline'` / `'text'` | `'outline'` | 外框样式 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:modelValue | `(value: string)` | IP 值变化时（v-model 同步） |
| change | `(valid: boolean, ip: string)` | IP 值变化时，valid 表示是否为合法完整 IP |

### Slots 表

无自定义插槽。组件内部使用 InBox 的默认插槽渲染分段输入框和分隔符，不对外暴露插槽。

### Expose 方法表

无。组件未使用 defineExpose 暴露方法。

### 典型使用场景与调用模板

**场景 1：基础 IPv4 地址输入**
适用于：网络配置中输入 IP 地址
```vue
<script setup>
import { ref } from 'vue';
import { OIpInput } from '@opensig/opendesign';

const ip = ref('192.168.1.1');
</script>
<template>
  <OIpInput v-model="ip" />
</template>
```

**场景 2：监听校验结果**
适用于：需要知道 IP 是否合法
```vue
<script setup>
import { ref } from 'vue';
import { OIpInput } from '@opensig/opendesign';

const ip = ref('');
const isValid = ref(false);

function onIpChange(valid: boolean, value: string) {
  isValid.value = valid;
}
</script>
<template>
  <OIpInput v-model="ip" @change="onIpChange" />
  <p v-if="!isValid">请输入合法的 IP 地址</p>
</template>
```

**场景 3：禁用状态**
适用于：展示但不允许编辑的场景
```vue
<OIpInput v-model="ip" disabled />
```

**场景 4：在表单中使用**
适用于：表单校验场景
```vue
<script setup>
import { ref } from 'vue';
import { OIpInput, OForm, OFormItem } from '@opensig/opendesign';

const ip = ref('');
</script>
<template>
  <OForm :model="{ ip }">
    <OFormItem label="IP 地址" prop="ip">
      <OIpInput v-model="ip" />
    </OFormItem>
  </OForm>
</template>
```

**场景 5：不同尺寸和样式**
适用于：视觉适配
```vue
<OIpInput v-model="ip" size="small" variant="solid" round="pill" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础 IP 输入 | `v-model` | 最常见用法，默认 4 段 |
| 禁用展示 | `v-model` + `disabled` | 只读展示 IP |
| 表单校验 | `v-model` + `@change` | 监听 valid 判断合法性 |
| 错误状态 | `color="danger"` | 红色边框提示错误 |
| 小尺寸 | `size="small"` | 紧凑布局 |
| 实心样式 | `variant="solid"` | 实心背景风格 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--ip-separator-size` | `4px` | 分段间圆点分隔符的尺寸 |
| `--ip-separator-gap` | `8px` | 分段间圆点分隔符与分段输入框的间距 |
| `--ip-separator-bg-color` | `var(--o-color-info1)` | 分段间圆点分隔符的背景色 |

**使用示例**：
```vue
<OIpInput v-model="ip" style="--ip-separator-size: 6px; --ip-separator-bg-color: var(--o-color-brand1)" />
```

### 响应式行为表

| 维度 | <=840px | 841-1200px | >1200px |
|------|---------|-----------|---------|
| 大尺寸高度 | 标准控件尺寸 | 36px | 标准 |
| 中尺寸高度 | 28px | 28px | 标准 |

### 组件布局结构

**桌面端 >1200px**
```yaml
layout:
  component: InBox.o-ip-input
  direction: horizontal
  align: center
  border-radius: var(--o-radius_control-s)
  regions:
    - name: ip-segment
      repeat: segmentsLen  # 默认 4
      children:
        - type: component
          name: OInput.o-ip-segment
          text-align: center
          max-length: 3
          border: none  # 独立段无边框，由外层 InBox 统一
          padding: 0
    - name: separator
      repeat: segmentsLen - 1  # 分隔符在段之间
      children:
        - type: element
          tag: div.o-ip-separator
          size: 4px  # --ip-separator-size
          shape: circle
          bg-color: var(--o-color-info1)
          gap: 8px  # --ip-separator-gap
  variants:
    small: { height: var(--o-control_size-s), padding: "0 7px" }
    medium: { height: var(--o-control_size-m), padding: "0 15px" }
    large: { height: var(--o-control_size-l), padding: "0 15px" }
```

**≤1200px (laptop)**
```yaml
# large: height 36px
# medium: height 28px
```

**≤840px (pad_v)**
```yaml
# large: height 恢复 var(--o-control_size-l)
```

### 设计稿识别指南

**视觉特征指纹**

1. 单一矩形输入框内含多段（默认 4 段）数字区域 + 段间有小圆点分隔 → 匹配 OIpInput
2. 每段最多 3 位数字，数字居中显示 → 匹配 OIpInput
3. 外框样式（实心/线框/无框）与 OInput 一致但内部结构明显不同 → 匹配 OIpInput

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 外框 | 实心填充 | variant | `'solid'` | — |
| 外框 | 仅描边 | variant | `'outline'` | 默认 |
| 外框 | 无边框 | variant | `'text'` | — |
| 边框颜色 | 绿色系 | color | `'success'` | — |
| 边框颜色 | 橙色系 | color | `'warning'` | — |
| 边框颜色 | 红色系 | color | `'danger'` | 表单校验错误时 |
| height | var(--o-control_size-l) | size | `'large'` | — |
| height | var(--o-control_size-m) | size | `'medium'` | — |
| height | var(--o-control_size-s) | size | `'small'` | — |
| border-radius | 全圆角 | round | `'pill'` | — |
| 分段数 | 非 4 段 | segmentsLen | 对应数字 | 默认 4 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OIpInput | OInput | OIpInput 内部有圆点分隔的多段数字区域，OInput 是单一连续输入区域 |
| OIpInput | 多个 OInput 并排 | OIpInput 共享一个外框，段间有内置圆点分隔符且自动跳转焦点 |
| OIpInput | OInputNumber | OInputNumber 有增减按钮，OIpInput 无增减按钮且为多段结构 |
