> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# ODialog 对话框

## Part A：设计理解卡

ODialog 是模态对话框组件，在页面上方弹出一个浮层，用于提示、确认、表单填写等需要用户关注的交互场景。基于 OLayer 浮层组件构建，支持多种预设尺寸和丰富的响应式适配。

### 显示与控制

**visible**（属性）：控制对话框是否显示（v-model 双向绑定）。默认关闭。

**wrapper**（属性）：对话框挂载的容器节点。默认挂载到 body。传 null 则挂载到父容器（局部对话框）。

**unmountOnHide**（属性）：隐藏时是否销毁对话框 DOM。默认开启。

**beforeShow**（属性）：对话框打开前的拦截回调。返回 false 可阻止打开。

**beforeHide**（属性）：对话框关闭前的拦截回调。返回 false 可阻止关闭，适合"确定要关闭吗？"场景。

### 尺寸

**size**（属性）：对话框尺寸。"auto" 根据内容自适应；"small" 小尺寸；"medium" 中尺寸；"large" 大尺寸；"exlarge" 超大尺寸。各尺寸在不同屏幕下有对应的宽度和高度范围。默认 auto。

**noResponsive**（属性）：是否禁用响应式自适应。开启后对话框在所有屏幕上保持一致尺寸。默认关闭。

**phoneHalfFull**（属性）：手机尺寸下是否以半屏形式从底部弹出。宽度铺满、高度占一半。默认关闭。

### 遮罩与关闭

**mask**（属性）：是否显示背景遮罩层。默认显示。

**maskClose**（属性）：点击遮罩层是否关闭对话框。默认允许。

**hideClose**（属性）：是否隐藏右上角关闭按钮。默认显示。

### 头部区域

**header 插槽**（插槽）：对话框顶部标题区域。不传则不渲染头部。

### 内容区域

**default 插槽**（插槽）：对话框主体内容，自带滚动条支持。

**scrollbar**（属性）：是否启用内容区域滚动条。传 true 启用默认配置，传对象可自定义滚动条参数，传 false 禁用。默认启用。

### 底部操作区域

**actions**（属性）：底部操作按钮数组。每个按钮可配置颜色、样式、尺寸、加载态、禁用态和点击回调。在手机/平板尺寸下，未指定样式的按钮自动变为文字样式。

**actions 插槽**（插槽）：替换底部按钮区域，可获取 isPhonePad（是否为手机平板）来做差异化渲染。

**footer 插槽**（插槽）：替换整个底部区域（包含按钮区域）。优先级高于 actions 插槽和 actions 属性。

### 动画

**mainTransition**（属性）：内容区域的过渡动画名。默认 "o-zoom-fade2"。

**maskTransition**（属性）：遮罩层的过渡动画名。默认 "o-fade-in"。

### 事件

**change**（事件）：对话框显示/隐藏状态变化时触发，可获取当前可见状态。

📱 **响应式行为**：
- **手机尺寸**（≤600px）：对话框从底部滑入、宽度铺满、关闭按钮隐藏、按钮宽度均分；phoneHalfFull 模式下顶部保留圆角
- **平板尺寸**（≤1200px）：对话框固定定位、按钮间用竖线分隔、间距和字号缩小
- **大尺寸（exlarge/large）**在平板竖屏及以下全屏铺满、无圆角
- 触控设备上动画改为从中心/底部展开（而非跟随鼠标位置）

🧩 **布局结构**：对话框主面板（.o-dlg-main）纵向 flex 布局，从上到下依次为：header 标题区（居中文字，flex-shrink: 0）、body 内容区（flex: 1，内含滚动条）、footer 底部操作区（flex-shrink: 0）。关闭按钮绝对定位于右上角。整体内边距 32px（笔记本 24px、平板 16px），区域间距 24px（笔记本 16px、平板 12px）。宽度由 size 决定（auto 自适应 / small 25% / medium 40% / large 60% / exlarge 65%）。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
container: OLayer(遮罩浮层) > .o-dlg-main(flex-column)
regions: [header(标题区), body(内容区+滚动条), footer(底部操作区)]
overlay: close-btn(右上角绝对定位关闭按钮)
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：页面上方覆盖半透明遮罩 + 居中白色圆角矩形面板 + 面板内有标题/内容/底部按钮三段式结构 → 匹配 ODialog；面板右上角有关闭图标 → 确认为 ODialog；手机端从底部滑入的面板 → 匹配 ODialog（phoneHalfFull 模式）
- **Token → Prop 映射**：面板宽度占页面 65%+ → size="exlarge"；宽度 ~60% → size="large"；宽度 ~40% → size="medium"；宽度 ~25% → size="small"；宽度随内容变化 → size="auto"；无关闭按钮 → hide-close；底部有确认/取消按钮 → actions 数组；底部按钮蓝色实心 → action.color="primary" + action.variant="solid"
- **易混淆组件区分**：与 OPopover 区分——ODialog 有全屏遮罩且居中显示，OPopover 无遮罩且跟随触发元素定位；与 OLayer 区分——ODialog 是 OLayer 的上层封装，自带 header/body/footer 结构，OLayer 是纯浮层容器无内部结构

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ODialog } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type DialogSizeT = 'exlarge' | 'large' | 'medium' | 'small' | 'auto';

interface DialogActionT {
  id: string | number;
  color?: ColorT;        // 'normal' | 'primary' | 'success' | 'warning' | 'danger'
  variant?: VariantT;    // 'solid' | 'outline' | 'text'
  size?: SizeT;
  label?: string;
  round?: RoundT;
  icon?: Component;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | `false` | 是否显示（v-model） |
| size | `DialogSizeT` | `'exlarge'` / `'large'` / `'medium'` / `'small'` / `'auto'` | `'auto'` | 对话框尺寸 |
| hideClose | `boolean` | — | `false` | 隐藏关闭按钮 |
| actions | `DialogActionT[]` | — | — | 底部操作按钮 |
| noResponsive | `boolean` | — | `false` | 禁用响应式 |
| phoneHalfFull | `boolean` | — | `false` | 手机半屏显示 |
| scrollbar | `boolean \| Partial<BaseScrollerPropsT>` | — | `true` | 内容滚动条 |
| wrapper | `string \| HTMLElement \| null` | — | `'body'` | 挂载容器 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时销毁 DOM |
| mask | `boolean` | — | `true` | 显示遮罩 |
| maskClose | `boolean` | — | `true` | 点击遮罩关闭 |
| mainClass | `string \| object \| array` | — | — | 内容容器类名 |
| mainTransition | `string` | — | `'o-zoom-fade2'` | 内容过渡动画 |
| maskTransition | `string` | — | `'o-fade-in'` | 遮罩过渡动画 |
| beforeShow | `() => Promise<boolean> \| boolean` | — | — | 打开前拦截 |
| beforeHide | `() => Promise<boolean> \| boolean` | — | — | 关闭前拦截 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(value: boolean, evt?: MouseEvent)` | 可见状态变化时 |
| change | `(visible: boolean)` | 显示/隐藏后 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| header | — | 始终（不传则不渲染头部） | 标题区域 | 无 |
| default | — | 始终 | 对话框主体内容 | 无 |
| actions | `{ isPhonePad: boolean }` | 有 actions 属性或插槽时 | 按钮区域 | actions 属性渲染的按钮 |
| footer | — | 有 footer 插槽或 actions 时 | 整个底部区域 | actions 区域 |

### 插槽层级关系

```
header（标题区域，不传则不渲染）
default（主体内容，带滚动条）
footer（使用后 actions 全部失效）
└── actions（按钮区域）
```

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| toggle(show?) | `show?: boolean` | 切换对话框显示状态 |

### 典型使用场景与调用模板

**场景 1：基础确认对话框**
适用于：简单确认/取消操作
```vue
<script setup>
import { ref } from 'vue';
const visible = ref(false);
const actions = [
  { id: 'confirm', label: '确认', color: 'primary', variant: 'solid', onClick: () => { visible.value = false; } },
  { id: 'cancel', label: '取消', onClick: () => { visible.value = false; } },
];
</script>
<template>
  <OButton @click="visible = true">打开对话框</OButton>
  <ODialog v-model:visible="visible" :actions="actions">
    <template #header>确认操作</template>
    <p>确定要执行此操作吗？</p>
  </ODialog>
</template>
```

**场景 2：表单对话框（超大尺寸）**
适用于：在对话框内填写表单
```vue
<ODialog v-model:visible="visible" size="exlarge" hide-close>
  <template #header>
    <span>编辑信息</span>
    <OButton variant="text" @click="visible = false">关闭</OButton>
  </template>
  <OForm>
    <OFormItem label="名称"><OInput v-model="name" /></OFormItem>
  </OForm>
  <template #footer>
    <OButton color="primary" @click="save">保存</OButton>
  </template>
</ODialog>
```

**场景 3：自定义操作按钮（响应式适配）**
适用于：根据设备类型差异化渲染按钮
```vue
<ODialog v-model:visible="visible">
  <template #header>评价</template>
  <ORate v-model="rating" />
  <template #actions="{ isPhonePad }">
    <OButton color="primary" :variant="isPhonePad ? 'text' : 'solid'" @click="submit">提交</OButton>
    <ODivider v-if="isPhonePad" direction="v" />
    <OButton :variant="isPhonePad ? 'text' : 'outline'" @click="visible = false">取消</OButton>
  </template>
</ODialog>
```

**场景 4：手机半屏对话框**
适用于：移动端底部弹出
```vue
<ODialog v-model:visible="visible" size="medium" phone-half-full>
  <template #header>选择选项</template>
  <div>选项内容...</div>
</ODialog>
```

**场景 5：局部对话框**
适用于：对话框挂载在某个容器内而非 body
```vue
<div id="local-container" style="position: relative;">
  <ODialog v-model:visible="visible" :wrapper="null">
    <p>我在父容器内</p>
  </ODialog>
</div>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 简单确认 | `v-model:visible` + `actions` | 最常见用法 |
| 表单对话框 | `size="exlarge"` + `hide-close` | 大尺寸 + 自定义关闭 |
| 移动端底部弹出 | `phone-half-full` + `size="medium"` | 手机半屏 |
| 固定尺寸 | `no-responsive` | 禁用自适应 |
| 阻止意外关闭 | `:mask-close="false"` + `before-hide` | 需要确认才能关闭 |
| 局部对话框 | `:wrapper="null"` | 挂载到父容器 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--dlg-close-size` | `var(--o-icon_size_control-m)` | 关闭按钮图标大小 |
| `--dlg-close-color` | `var(--o-color-info2)` | 关闭按钮默认颜色 |
| `--dlg-close-color-hover` | `var(--o-color-primary2)` | 关闭按钮悬停颜色 |
| `--dlg-close-color-active` | `var(--o-color-primary3)` | 关闭按钮激活颜色 |
| `--dlg-color` | `var(--o-color-info1)` | 内容文字颜色 |
| `--dlg-header-color` | `var(--o-color-info1)` | 标题文字颜色 |
| `--dlg-bg-color` | `var(--o-color-control5-light)` | 对话框背景色 |
| `--dlg-radius` | `var(--o-radius_control-l)` | 对话框圆角 |
| `--dlg-shadow` | `var(--o-shadow-1)` | 对话框阴影 |
| `--dlg-max-height` | `100%` | 对话框最大高度（auto 模式为 80%） |
| `--dlg-min-width` | `272px` | 对话框最小宽度 |
| `--dlg-margin` | `0px` | 对话框外边距 |
| `--dlg-edge-gap` | `32px` | 对话框内边距（四周） |
| `--dlg-inner-gap` | `24px` | header/body/footer 区域间距 |
| `--dlg-actions-justify` | `center` | 底部按钮对齐方式（可设为 `flex-end` 等） |
| `--dlg-btn-gap` | `16px` | 底部按钮之间的间距 |

**使用示例**：
```vue
<ODialog v-model:visible="visible" style="--dlg-actions-justify: flex-end; --dlg-btn-gap: 8px">
  <template #header>标题</template>
  <p>内容</p>
</ODialog>
```

### 响应式行为表

| 维度 | ≤600px (手机) | 601–840px (平板竖) | 841–1200px (平板横) | >1200px (笔记本+) |
|------|---------------|-------------------|--------------------|--------------------|
| 对话框位置 | 底部弹出 | 居中 | 居中固定 | 居中 |
| 关闭按钮 | 隐藏 | 显示 | 显示 | 显示 |
| 按钮样式 | 均分宽度 | 竖线分隔 | 竖线分隔 | 标准 |
| 边距 | 16px | 16px | 16px | 24px |
| 标题字号 | text2 | text2 | text2 | h4 |
| exlarge 宽度 | 100% | 100%全屏 | 80% | 75% |
| large 宽度 | 100% | 100%全屏 | 65% | 60% |
| medium 宽度 | 100vw | 75% | 65% | 40% |
| small 宽度 | 100vw | 75% | 32% | 25% |

触控 vs 指针差异：

| 场景 | 触控设备 | 指针设备 |
|------|---------|---------|
| 动画起点 | 从中心/底部展开（CSS origin） | 从鼠标点击位置展开 |
| 按钮样式 | 未指定 variant 时自动改为 text | 保持原样 |

### 组件布局结构

**桌面端 >1200px**
```yaml
layout:
  direction: vertical
  container: OLayer > .o-dlg-main
  background: var(--o-color-control5-light)
  border-radius: var(--o-radius_control-l)
  box-shadow: var(--o-shadow-1)
  padding: 32px  # --dlg-edge-gap
  regions:
    - name: header
      element: .o-dlg-header
      text-align: center
      font-size: var(--o-font_size-h2)
      font-weight: 500
      flex-shrink: 0
      margin-bottom: 24px  # --dlg-inner-gap
    - name: body
      element: .o-dlg-body
      flex: 1
      min-height: 0
      children:
        - name: body-content
          element: .o-dlg-body-content
          directive: v-scrollbar  # 默认启用滚动条
          children:
            - { type: slot, name: default }
    - name: footer
      element: .o-dlg-footer
      flex-shrink: 0
      margin-top: 24px  # --dlg-inner-gap
      children:
        - name: actions
          element: .o-dlg-actions
          display: flex
          justify-content: center  # --actions-justify
          children:
            - { type: slot, name: footer }  # 优先级最高
            - { type: slot, name: actions }  # 或 OButton × N
          btn-gap: 16px  # --dlg-btn-gap
  overlay:
    - name: close-btn
      element: .o-dlg-btn-close
      position: absolute
      top: 8px
      right: 8px
      icon: IconClose
  variants:
    auto: { max-height: "80%" }
    exlarge: { width: "65%", max-height: 780px, min-height: 520px }
    large: { width: "60%", max-height: 780px, min-height: 424px }
    medium: { width: "40%", max-height: 480px, min-height: 328px }
    small: { width: "25%", max-height: 272px, min-height: 224px }
```

**笔记本 ≤1200px**
```yaml
# padding: 24px, inner-gap: 16px, btn-gap: 12px
# header font-size: h4
# exlarge: width 75%, large: width 60%, medium: width 40%, small: width 25%
```

**平板 ≤840px**
```yaml
# padding: 16px, inner-gap: 12px, btn-gap: 8px
# header font-size: text2
# exlarge/large: width 100%, radius 0 (全屏)
# medium: width 75%, small: width 75%
# 固定定位, 按钮间竖线分隔
```

**手机 ≤600px**
```yaml
# 底部对齐 (flex-end), 关闭按钮隐藏
# 按钮 flex:1 均分宽度
# phoneHalfFull: width 100%, 顶部保留圆角
# medium/small: width 100vw, margin 24px
```

### 设计稿识别指南

**视觉特征指纹**

1. 页面上方覆盖半透明遮罩层 + 居中白色圆角面板 + 面板内三段式结构（标题/内容/按钮） → 匹配 ODialog
2. 面板右上角有 × 关闭图标 → 确认为 ODialog（非 hideClose）
3. 手机端底部滑入的白色面板 + 上方遮罩 → 匹配 ODialog（手机响应式或 phoneHalfFull）
4. 无遮罩的悬浮面板 → 不是 ODialog，考虑 OPopover 或 OPopup

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 面板宽度 | ≥65% 页面宽 | size | `'exlarge'` | — |
| 面板宽度 | ~60% 页面宽 | size | `'large'` | — |
| 面板宽度 | ~40% 页面宽 | size | `'medium'` | — |
| 面板宽度 | ~25% 页面宽 | size | `'small'` | — |
| 面板宽度 | 随内容变化 | size | `'auto'` | 默认 |
| 无关闭按钮 | 右上角无 × | hideClose | `true` | — |
| 无遮罩层 | 无半透明背景 | mask | `false` | — |
| 底部按钮 | 确认/取消按钮组 | actions | `DialogActionT[]` | — |
| 按钮蓝色实心 | `--o-color-primary1` | action.color | `'primary'` | action.variant=`'solid'` |
| 手机底部半屏 | 底部弹出宽度铺满 | phoneHalfFull | `true` | 配合 size 使用 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| ODialog | OPopover | ODialog 有全屏遮罩且居中显示，OPopover 无遮罩且跟随触发元素定位 |
| ODialog | OLayer | ODialog 是 OLayer 的上层封装，自带 header/body/footer 三段式结构；OLayer 是纯浮层容器无内部结构 |
| ODialog | OMessage/OToast | OMessage/OToast 是轻量提示自动消失，ODialog 是模态交互需用户主动关闭 |
| ODialog（手机端） | 底部抽屉 | ODialog 手机端从底部滑入但仍是居中模态逻辑，有遮罩和关闭机制 |

