> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OScrollbar 滚动条

## Part A：设计理解卡

OScrollbar 是自定义滚动条组件，用于替换浏览器原生滚动条。需要关联一个滚动容器（通过 target 属性），在该容器上显示美化的滚动条。支持水平和垂直方向、两种尺寸、四种显示模式。

### 关联目标

**target**（属性）：滚动条关联的滚动容器。可传入 HTMLElement、组件实例或 "body" 字符串。滚动条会根据该容器的滚动状态同步更新。

### 尺寸

**size**（属性）：滚动条粗细。"medium" 中号（6px，悬停 10px）、"small" 小号（3px，悬停 6px）。默认 medium。

### 显示模式

**showType**（属性）：滚动条何时可见。"auto" 滚动时和悬停时显示、"always" 一直显示、"hover" 仅悬停容器时显示、"never" 不显示。默认 auto。

**duration**（属性）：滚动停止后滚动条持续显示的时间（毫秒）。默认 600ms。

### 方向控制

**disabledX**（属性）：隐藏水平滚动条。

**disabledY**（属性）：隐藏垂直滚动条。

### 高级

**autoUpdateOnScrollSize**（属性）：showType 为 always 时，是否根据滚动内容高度变化自动刷新滚动条。

**barClass**（属性）：滚动条自定义类名。

### 插槽区域

**thumb 插槽**（插槽）：替换滚动条滑块。

**track 插槽**（插槽）：替换滚动条轨道。

📱 **响应式行为**：本组件无响应式差异。触控设备上 hover 模式自动降级（isPhonePad 时不监听 hover 事件）。

🧩 **布局结构**：OScrollbar 是绝对定位的滚动条覆盖层，包含垂直和水平两根轨道（ScrollbarRail），每根轨道内有可拖拽的滑块（thumb）。OScroller 是一体化组件，外层容器包含滚动内容区 + OScrollbar。滚动条不占据布局空间，叠加在滚动容器上方。
```yaml
# 简化结构摘要（完整版见 Part B）
# OScrollbar
position: absolute (覆盖在滚动容器上)
regions: [scrollbar-rail-y(垂直轨道+滑块), scrollbar-rail-x(水平轨道+滑块)]
# OScroller
direction: column
regions: [scroller-container(滚动内容区), OScrollbar(滚动条)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：半透明的细长滑块条覆盖在内容区边缘，垂直滚动条在右侧、水平滚动条在底部；滑块圆角细条，悬停时变粗
- **Token → Prop 映射**：滑块始终可见 → showType="always"；滑块仅滚动时出现 → showType="auto"；滑块 6px 宽 → size="medium"；滑块 3px 宽 → size="small"；仅有垂直滚动条 → disabledX=true
- **易混淆组件区分**：与浏览器原生滚动条区分——OScrollbar 为自定义圆角细条样式可控显隐，原生滚动条为系统默认粗条样式；与 OSlider 区分——OScrollbar 跟随内容滚动联动，OSlider 是独立的值选择控件

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OScrollbar, OScroller } from '@opensig/opendesign';
</script>
```

> OScrollbar：挂载到已有滚动容器上的滚动条。
> OScroller：自带滚动容器的组合组件（容器 + 滚动条）。

### OScrollbar Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| target | `HTMLElement \| ComponentPublicInstance \| string` | — | `null` | 关联的滚动容器 |
| size | `ScrollerSizeT` | `'medium'` / `'small'` | `'medium'` | 尺寸 |
| showType | `string` | `'auto'` / `'always'` / `'hover'` / `'never'` | `'auto'` | 显示模式 |
| duration | `number` | — | `600` | 滚动停止后持续显示时间（ms） |
| disabledX | `boolean` | — | `false` | 隐藏横向滚动条 |
| disabledY | `boolean` | — | `false` | 隐藏纵向滚动条 |
| autoUpdateOnScrollSize | `boolean` | — | `false` | 自动刷新（always 模式） |
| barClass | `string \| object \| array` | — | — | 自定义类名 |

### OScroller Props 表

OScroller 继承 OScrollbar 的所有 props（除 target），额外支持：

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| wrapClass | `string \| object \| array` | — | — | 滚动容器类名 |

### OScroller Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| scroll | `(event: Event)` | 滚动容器滚动时 |

### OScrollbar Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| thumb | — | 始终 | 滚动条滑块 | 默认滑块 |
| track | — | 始终 | 滚动条轨道 | 默认轨道 |

### OScroller Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 滚动容器内容 | 无 |
| thumb | — | 始终 | 滚动条滑块 | 默认滑块 |
| track | — | 始终 | 滚动条轨道 | 默认轨道 |

### OScrollbar 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| update() | — | 手动刷新滚动条状态 |

### OScroller 暴露方法

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| scrollTo(options?) | `ScrollToOptions` | — | 滚动到指定位置 |
| getContainerEl() | — | `HTMLElement \| null` | 获取滚动容器 DOM 元素 |

### 典型使用场景与调用模板

**场景 1：为已有容器添加滚动条**
适用于：已有滚动容器需要美化滚动条
```vue
<script setup>
import { ref } from 'vue';
const container = ref();
</script>
<template>
  <div ref="container" style="height: 300px; overflow: auto; position: relative;">
    <div style="height: 1000px;">长内容</div>
    <OScrollbar :target="container" :disabled-x="true" show-type="always" />
  </div>
</template>
```

**场景 2：使用 OScroller 一体化组件**
适用于：新建滚动区域
```vue
<OScroller style="height: 300px;" show-type="always">
  <div style="height: 1000px;">长内容</div>
</OScroller>
```

**场景 3：小号悬停显示**
适用于：空间紧凑的区域
```vue
<OScrollbar :target="container" size="small" show-type="hover" />
```

**场景 4：关联 body 滚动**
适用于：全局页面滚动条
```vue
<OScrollbar target="body" show-type="always" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 始终可见 | `show-type="always"` | 一直显示 |
| 滚动时显示 | `show-type="auto"`（默认） | 滚动后自动隐藏 |
| 悬停显示 | `show-type="hover"` + `size="small"` | 紧凑悬停 |
| 仅纵向 | `:disabled-x="true"` | 隐藏横向 |
| body 滚动条 | `target="body"` | 全页滚动 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--scrollbar-bg-color` | `transparent` | 滚动条整体背景色 |
| `--scrollbar-track-bg-color` | `var(--o-color-control4)` | 轨道背景色 |
| `--scrollbar-track-width` | `6px`（medium） | 轨道宽度 |
| `--scrollbar-thumb-bg-color` | `var(--o-color-control1)` | 滑块默认颜色 |
| `--scrollbar-thumb-bg-color-hover` | `var(--o-color-info3)` | 滑块悬停颜色 |
| `--scrollbar-thumb-bg-color-active` | `var(--o-color-info2)` | 滑块拖拽中颜色 |
| `--scrollbar-thumb-width` | `6px`（medium） | 滑块默认宽度 |
| `--scrollbar-thumb-width-hover` | `10px`（medium） | 滑块悬停时宽度 |
| `--scrollbar-thumb-radius` | `10px`（medium） | 滑块圆角 |
| `--scrollbar-width` | `16px`（medium） | 滚动条轨道区域总宽度 |
| `--scrollbar-thumb-min-size` | `10px` | 滑块最小尺寸 |
| `--scrollbar-height` | `90%` | 垂直滑块默认高度比例 |
| `--scrollbar-delay` | `16ms` | 滚动条响应延迟 |

**使用示例**：
```vue
<OScroller style="height: 300px; --scrollbar-thumb-bg-color: var(--o-color-primary1);">
  <div style="height: 1000px;">长内容</div>
</OScroller>
```

### CSS 变量

| 变量名 | 说明 |
|--------|------|
| `--scrollbar-thumb-bg-color` | 滑块颜色 |
| `--scrollbar-thumb-bg-color-hover` | 滑块悬停颜色 |
| `--scrollbar-thumb-bg-color-active` | 滑块拖拽颜色 |
| `--scrollbar-track-bg-color` | 轨道颜色 |
| `--scrollbar-thumb-width` | 滑块宽度（medium: 6px, small: 3px） |
| `--scrollbar-thumb-width-hover` | 滑块悬停宽度（medium: 10px, small: 6px） |

### 响应式行为表

本组件无响应式差异。

### 组件布局结构

**OScrollbar 滚动条**
```yaml
layout:
  tag: div
  position: absolute  # 覆盖在关联的滚动容器上
  class: o-scrollbar o-scrollbar-{size}
  regions:
    - name: scrollbar-rail-y
      condition: hasY && !disabledX
      position: absolute
      placement: right side of container
      top: var(--scrollbar-y-top)  # 0
      bottom: var(--scrollbar-y-bottom)  # 0
      right: var(--scrollbar-y-right)  # 0
      width: var(--scrollbar-width)  # 16px
      children:
        - name: scrollbar-track
          bg-color: var(--scrollbar-track-bg-color)  # control4
          width: var(--scrollbar-track-width)  # medium: 6px, small: 3px
          children:
            - { type: slot, name: track }
        - name: scrollbar-thumb
          bg-color: var(--scrollbar-thumb-bg-color)  # control1
          width: var(--scrollbar-thumb-width)  # medium: 6px, small: 3px
          width-hover: var(--scrollbar-thumb-width-hover)  # medium: 10px, small: 6px
          border-radius: var(--scrollbar-thumb-radius)  # medium: 10px, small: 6px
          min-size: var(--scrollbar-thumb-min-size)  # 10px
          children:
            - { type: slot, name: thumb }
    - name: scrollbar-rail-x
      condition: hasX && !disabledY
      position: absolute
      placement: bottom of container
      left: var(--scrollbar-x-left)  # 0
      right: var(--scrollbar-x-right)  # 0
      bottom: var(--scrollbar-x-bottom)  # 0
      height: var(--scrollbar-width)  # 16px
      children:
        - name: scrollbar-track (horizontal)
        - name: scrollbar-thumb (horizontal)
  show-modes:
    always: 滚动条始终可见
    auto: 滚动时和悬停滚动条时显示，停止后 duration ms 隐藏
    hover: 鼠标悬停滚动容器时显示
    never: 不渲染滚动条
```

**OScroller 一体化滚动组件**
```yaml
layout:
  tag: div
  class: o-scroller o-scrollbar-wrapper
  regions:
    - name: scroller-container
      description: 滚动内容容器
      overflow: auto
      class: o-scroller-container
      children:
        - { type: slot, name: default }  # 滚动内容
    - name: scrollbar
      type: component
      component: OScrollbar
      target: scroller-container
      description: 自动关联内部滚动容器的滚动条
```

### 设计稿识别指南

**视觉特征指纹**

1. 内容区右侧/底部有半透明圆角细条滑块 → 匹配 OScrollbar/OScroller
2. 滑块细（约 3px）且仅悬停时出现 → 匹配 size="small" + showType="hover"
3. 滑块粗（约 6px）且始终可见 → 匹配 size="medium" + showType="always"
4. 内容区同时有右侧和底部两根滚动条 → 匹配 OScrollbar（双向滚动）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 滑块宽度 | 6px（悬停 10px） | size | `'medium'` | 默认值 |
| 滑块宽度 | 3px（悬停 6px） | size | `'small'` | — |
| 可见性 | 始终可见 | showType | `'always'` | — |
| 可见性 | 滚动时出现，停后隐藏 | showType | `'auto'` | 默认值 |
| 可见性 | 仅悬停容器时出现 | showType | `'hover'` | — |
| 可见性 | 不显示 | showType | `'never'` | — |
| 方向 | 仅垂直滚动条 | disabledX | `true` | — |
| 方向 | 仅水平滚动条 | disabledY | `true` | — |
| 滑块颜色 | `--o-color-control1` 灰色 | — | — | 默认值 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OScrollbar | 浏览器原生滚动条 | OScrollbar 为自定义圆角细条，支持显隐控制；原生为系统默认粗条不可定制 |
| OScrollbar | OSlider | OScrollbar 跟随容器滚动位置联动，OSlider 是独立的值选择控件有刻度 |
| OScroller | 带 overflow:auto 的 div | OScroller 自带美化滚动条组件，普通 div 使用原生滚动条 |

