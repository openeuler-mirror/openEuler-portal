> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OLayer 浮层

## Part A：设计理解卡

OLayer 是基础浮层组件，为 ODialog 等上层组件提供底层能力。通过 Teleport 将内容渲染到指定容器（默认 body），支持遮罩层、关闭按钮、动画控制等功能。一般不直接使用，而是通过 ODialog 等封装组件使用。

### 显示与控制

**visible**（属性）：控制浮层是否显示（v-model 双向绑定）。默认关闭。

**wrapper**（属性）：浮层挂载的容器。"body" 渲染到 body 下（position: fixed）；CSS 选择器或 HTMLElement 渲染到指定元素下；null 渲染到当前位置（position: absolute），此时需确保父元素有 position: relative。默认 body。

**unmountOnHide**（属性）：隐藏时是否销毁 DOM。默认开启。

**beforeShow**（属性）：打开前的拦截回调。返回 false 阻止打开。

**beforeHide**（属性）：关闭前的拦截回调。返回 false 阻止关闭。

### 遮罩与关闭

**mask**（属性）：是否渲染遮罩层。默认显示。

**maskClose**（属性）：点击遮罩层是否关闭浮层。默认允许。

**buttonClose**（属性）：是否显示关闭按钮。默认不显示。

### 动画

**mainTransition**（属性）：内容区域的过渡动画名。默认 "o-zoom-fade2"。

**maskTransition**（属性）：遮罩层的过渡动画名。默认 "o-fade-in"。

**transitionOrign**（属性）：缩放动画的变换原点。"mouse" 从鼠标点击位置展开（桌面端体验更好）；"css" 使用 CSS 变量 --layer-origin 设置（默认 center）。默认 mouse。

### 内容

**mainClass**（属性）：内容容器自定义类名。

**default 插槽**（插槽）：浮层主体内容。

**close 插槽**（插槽）：替换关闭按钮。仅 buttonClose 为 true 时渲染。

### 事件

**change**（事件）：浮层显示/隐藏状态变化时触发。

**click:mask**（事件）：点击遮罩层时触发。

**click:button**（事件）：点击关闭按钮时触发。

🧩 **布局结构**：外层 `.o-layer` 通过 Teleport 挂载到目标容器，采用 fixed/absolute 定位铺满全屏。内部分为遮罩层 `.o-layer-mask`（铺满全屏、半透明背景）、内容主体 `.o-layer-main`（居中显示，使用 flex 布局 align+justify=center）和可选关闭按钮 `.o-layer-close`。遮罩层和内容主体各有独立的过渡动画。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: stacked(层叠定位)
regions: [mask(遮罩层), main(内容主体), close-button(关闭按钮,可选)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：全屏或局部半透明遮罩层 + 居中浮动的内容区域，无预设内容结构（纯容器），可能有右上角关闭按钮图标
- **Token → Prop 映射**：遮罩颜色=--layer-mask(默认 var(--o-color-mask1))；内容定位 fixed=wrapper:"body"、absolute=wrapper:null；有关闭×按钮=buttonClose:true
- **易混淆组件区分**：与 ODialog 区别——Layer 是底层容器无预设 header/body/footer 结构，ODialog 有标题栏+内容区+操作栏的完整对话框布局；与 OLoading 区别——Loading 继承 Layer 但固定显示加载图标+文字内容，Layer 内容完全自定义

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OLayer } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | `false` | 是否显示（v-model） |
| wrapper | `string \| HTMLElement \| null` | — | `'body'` | 挂载容器 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时销毁 DOM |
| mainClass | `string \| object \| array` | — | — | 内容容器类名 |
| mainTransition | `string` | — | `'o-zoom-fade2'` | 内容过渡动画 |
| maskTransition | `string` | — | `'o-fade-in'` | 遮罩过渡动画 |
| transitionOrign | `string` | `'mouse'` / `'css'` | `'mouse'` | 动画变换原点 |
| mask | `boolean` | — | `true` | 显示遮罩 |
| maskClose | `boolean` | — | `true` | 点击遮罩关闭 |
| buttonClose | `boolean` | — | `false` | 显示关闭按钮 |
| beforeShow | `() => Promise<boolean> \| boolean` | — | — | 打开前拦截 |
| beforeHide | `() => Promise<boolean> \| boolean` | — | — | 关闭前拦截 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(value: boolean, evt?: MouseEvent)` | 可见状态变化 |
| change | `(visible: boolean)` | 显示/隐藏后 |
| click:mask | `(evt: MouseEvent)` | 点击遮罩 |
| click:button | `(evt: MouseEvent)` | 点击关闭按钮 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 浮层主体内容 | 无 |
| close | — | buttonClose 为 true | 关闭按钮 | 默认关闭图标 |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| toggle(show?) | `show?: boolean` | 切换浮层显示状态 |

### CSS 变量定制

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `--layer-position` | 浮层定位方式 | `fixed` |
| `--layer-z-index` | 层级（自动管理） | 自动 |
| `--layer-align` | 内容对齐（align-items） | — |
| `--layer-justify` | 内容对齐（justify-content） | — |
| `--layer-origin` | 动画变换原点（transitionOrign="css" 时） | `center` |
| `--layer-mask` | 遮罩层颜色 | — |

### 典型使用场景与调用模板

**场景 1：基础浮层**
适用于：自定义弹出层（推荐优先考虑 ODialog）
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
</script>
<template>
  <OButton @click="visible = true">打开</OButton>
  <OLayer v-model:visible="visible">
    <div class="custom-panel">自定义内容</div>
  </OLayer>
</template>
```

**场景 2：图片预览浮层**
适用于：全屏图片查看
```vue
<OLayer v-model:visible="visible" button-close>
  <img :src="imageSrc" />
</OLayer>
```

**场景 3：局部浮层**
适用于：在特定容器内弹出
```vue
<div style="position: relative;">
  <OLayer v-model:visible="visible" :wrapper="null">
    <div>局部内容</div>
  </OLayer>
</div>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 模态浮层 | `mask` + `mask-close` | 默认行为 |
| 无遮罩 | `:mask="false"` | 无背景遮罩 |
| 带关闭按钮 | `button-close` | 右上角关闭 |
| 局部浮层 | `:wrapper="null"` | 父容器内弹出 |
| 阻止关闭 | `before-hide` | 拦截关闭 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--layer-position` | `absolute`（body 挂载时为 `fixed`） | 浮层定位方式 |
| `--layer-mask` | `var(--o-color-mask1)` | 遮罩层颜色 |
| `--layer-align` | `center` | 内容垂直对齐（align-items） |
| `--layer-justify` | `center` | 内容水平对齐（justify-content） |
| `--layer-origin` | `center` | 缩放动画变换原点（transitionOrign="css" 时生效） |

**使用示例**:
```vue
<OLayer v-model:visible="visible" transition-orign="css" style="--layer-origin: top center" />
```

### 响应式行为表

本组件无响应式差异。上层组件（如 ODialog）通过 CSS 变量实现响应式。

### 组件布局结构

**通用布局（无响应式差异）**
```yaml
layout:
  component: div.o-layer
  positioning: fixed (body) | absolute (wrapper=null)
  z-index: auto-managed  # --layer-z-index，自动递增
  display: flex
  align-items: var(--layer-align)  # 默认 center
  justify-content: var(--layer-justify)  # 默认 center
  inset: 0
  regions:
    - name: mask
      element: div.o-layer-mask
      condition: mask=true
      positioning: absolute, inset: 0
      bg-color: var(--layer-mask)  # 默认 var(--o-color-mask1)
      transition: maskTransition  # 默认 o-fade-in
    - name: main
      element: div.o-layer-main
      children:
        - { type: slot, name: default }  # 浮层主体内容
      transition: mainTransition  # 默认 o-zoom-fade2
      transform-origin: mouse | var(--layer-origin)
    - name: close-button
      element: div.o-layer-close
      condition: buttonClose=true
      children:
        - { type: slot, name: close, fallback: "OIcon(IconClose)" }
  css-variables:
    --layer-position: fixed | absolute
    --layer-z-index: auto
    --layer-align: center
    --layer-justify: center
    --layer-origin: center
    --layer-mask: var(--o-color-mask1)
```

### 设计稿识别指南

**视觉特征指纹**

1. 半透明深色遮罩覆盖整个视口/容器 + 居中浮动内容区域（无预设结构）→ 匹配 OLayer
2. 纯白/无结构的浮动面板 + 可选右上角关闭图标 → 匹配 OLayer
3. 内容从鼠标点击位置缩放展开的动画效果 → transitionOrign="mouse"

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 遮罩 | 有半透明背景遮罩 | mask | `true` | 默认 |
| 遮罩 | 无遮罩层 | mask | `false` | — |
| 关闭按钮 | 有 × 图标 | buttonClose | `true` | — |
| 定位 | 全屏固定定位 | wrapper | `'body'` | 默认 |
| 定位 | 局部绝对定位 | wrapper | `null` | 父容器需 position:relative |
| 动画 | 缩放+渐变 | mainTransition | `'o-zoom-fade2'` | 默认 |
| 动画原点 | 从点击位置展开 | transitionOrign | `'mouse'` | 默认，桌面端 |
| 动画原点 | 从中心展开 | transitionOrign | `'css'` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OLayer | ODialog | ODialog 有预设的标题栏+内容区+操作栏结构，OLayer 是纯容器无预设布局 |
| OLayer | OLoading | OLoading 继承 OLayer 但固定显示加载图标+文字，OLayer 内容完全自定义 |
| OLayer | OPopup/OPopover | Popup/Popover 定位在触发元素附近（跟随定位），OLayer 居中覆盖整个视口 |
