> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OToast 轻提示

## Part A：设计理解卡

OToast 是轻提示组件，用于操作后的即时反馈信息展示。支持内联使用（直接放在模板中）和命令式调用（通过 useToast 函数动态创建）两种方式。提示信息短暂显示后自动消失，不打断用户操作流程。

### 显示控制

**visible**（属性）：提示是否可见（v-model 双向绑定）。

**defaultVisible**（属性）：非受控模式下提示是否默认可见。默认可见（true）。

**duration**（属性）：提示自动消失的持续时间（毫秒）。内联使用时，未设置或值不为正数时不会自动消失；命令式调用时，默认 2000ms，设置 long 时默认 3500ms。

**long**（属性）：是否为长提示模式。开启后命令式调用的默认持续时间从 2000ms 延长至 3500ms。

**beforeClose**（属性）：关闭前的钩子函数。返回 true 或 false 控制是否允许关闭。支持异步（返回 Promise）。

### 定位

**position**（属性）：提示出现的方向。可选 "top"（顶部）、"center"（居中）、"bottom"（底部）。默认 bottom。

### 内容

**message**（属性）：提示文字内容。

**default 插槽**（插槽）：替换提示内容区域。使用后 message 属性失效。

### 事件

**duration-end**（事件）：自动关闭计时结束时触发。

**close**（事件）：提示关闭时触发，携带鼠标事件参数。

---

### useToast 命令式调用

通过 `useToast()` 创建提示实例，可指定 target 元素使提示出现在该元素附近。

**show** 方法：显示提示，返回关闭该条提示的函数。

**close**：关闭当前 useToast 实例创建的所有提示。

**closeAll**：关闭所有实例创建的全部提示。

命令式调用额外支持：content（提示内容，支持字符串、VNode、组件）、position（提示位置 top/center/bottom）、targetAlign（提示与目标元素的对齐方式 center/left/right）、targetOffset（提示与目标元素的距离）、onDurationEnd 和 onClose 回调。注意：targetAlign 和 targetOffset 仅在指定了 target 元素时生效；当 targetAlign 为 center 时 targetOffset 不生效。

命令式调用默认 duration 为 2000ms，position 为 bottom。同一时刻仅保留一个 toast 列表实例，新的 toast 调用会自动关闭之前的 toast。

**响应式行为**：在平板竖屏及以下（≤840px），提示最大宽度限制为 75%；在手机尺寸，提示最大宽度恢复为 100%。

🧩 **布局结构**：Toast 由单个提示条和提示列表容器组成。单个提示条（OToast）是简单的块级容器，内部放置文字或自定义插槽内容。提示列表容器（OToastList）通过固定定位覆盖在页面上，根据 position 属性在顶部/居中/底部显示，内部以 TransitionGroup 动画管理多条提示的进出。提示条有深色背景、浅色文字、圆角和阴影。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
regions: [toast-list(提示列表容器) > toast-item(单条提示内容)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：页面底部/顶部/居中浮动的深色（近黑色）圆角条状提示，白色文字，有阴影，短暂显示后消失 → 匹配 OToast；与 OMessage 类似但 OToast 定位更灵活且默认出现在底部
- **Token → Prop 映射**：出现在页面顶部 → position="top"；出现在页面居中 → position="center"；出现在页面底部 → position="bottom"（默认）；提示文字内容 → message 属性或 default 插槽；有自动消失行为 → duration 属性；提示时间较长 → long=true
- **易混淆组件区分**：与 OMessage 区分——OMessage 是固定在页面顶部的消息条带有颜色语义（success/warning/danger），OToast 是轻量级的底部/居中/顶部浮动提示无颜色语义；与 ONotification 区分——ONotification 是右上角弹出的通知卡片可交互，OToast 是短暂的轻提示不可操作

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
// 内联使用
import { OToast } from '@opensig/opendesign';
// 命令式调用
import { useToast } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type ToastPositionT = 'top' | 'bottom' | 'center';

type ToastParamsT = Partial<
  ToastPropsT & {
    content: string | VNode | Component;
    position: ToastPositionT;
    targetOffset: number;
    targetAlign: 'center' | 'left' | 'right';
    onDurationEnd: () => void;
    onClose: (ev?: MouseEvent) => void;
  }
>;

// Duration 枚举
enum Duration {
  NORMAL = 2000,  // 默认持续时间
  LONG = 3500,    // long 模式持续时间
}
```

### OToast Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | `undefined` | 是否可见（v-model） |
| defaultVisible | `boolean` | — | `true` | 默认可见 |
| message | `string` | — | — | 提示信息文字 |
| duration | `number` | — | — | 自动消失时间（ms），不传或 ≤0 不自动消失 |
| long | `boolean` | — | — | 长提示模式（命令式调用时默认 3500ms） |
| position | `ToastPositionT` | `'top'` / `'center'` / `'bottom'` | `'bottom'` | 定位方向 |
| beforeClose | `() => Promise<boolean> \| boolean` | — | — | 关闭前钩子 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 显示状态变化时 |
| duration-end | — | 自动关闭计时结束 |
| close | `(ev?: MouseEvent)` | 提示关闭时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 提示内容区域 | `{{ message }}` |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| close(ev) | `ev: MouseEvent` | 手动关闭提示 |

### useToast API

```typescript
const toast = useToast(target?);
// target: string | ComponentPublicInstance | HTMLElement | Ref<...> | null | undefined

toast.show(params);    // 显示提示，返回 close 函数
toast.close();         // 关闭本实例所有提示
toast.closeAll();      // 关闭所有提示
```

- `params` 可以是字符串（直接作为 content）或 `ToastParamsT` 对象
- 命令式调用默认 `duration: 2000`（long 模式 3500），`position: 'bottom'`

### 典型使用场景与调用模板

**场景 1：内联提示（静态展示）**
适用于：页面中固定位置的提示信息
```vue
<OToast message="toast 提示" />
```

**场景 2：内联提示使用插槽（自定义内容）**
适用于：需要在提示中放入链接、图标等复杂内容
```vue
<OToast>
  <span style="margin-right: 6px">toast提示</span>
  <OLink color="normal" style="--o-color-link1: var(--o-color-info1-inverse)">
    文字按钮
    <template #suffix><OIconChevronRight /></template>
  </OLink>
</OToast>
```

**场景 3：命令式全局提示**
适用于：按钮点击后的操作反馈
```vue
<script setup>
import { useToast, OButton } from '@opensig/opendesign';
const { show: showToast } = useToast();
const handleClick = () => {
  showToast('操作成功');
};
</script>
<template>
  <OButton @click="handleClick">操作</OButton>
</template>
```

**场景 4：长提示与自定义 VNode 内容**
适用于：需要较长展示时间和复杂内容的提示
```vue
<script setup>
import { h } from 'vue';
import { useToast, OLink, OIconChevronRight } from '@opensig/opendesign';
const { show: showToast } = useToast();
const handleClick = () => {
  showToast({
    long: true,
    content: () => [
      h('span', { style: { marginRight: '6px' } }, 'toast提示'),
      h(OLink, { color: 'normal' }, {
        default: () => '文字按钮',
        suffix: () => h(OIconChevronRight),
      }),
    ],
  });
};
</script>
```

**场景 5：指定目标元素附近显示**
适用于：在特定容器内展示提示
```vue
<script setup>
import { ref } from 'vue';
import { useToast, OButton } from '@opensig/opendesign';
const wrapRef = ref();
const { show: showToast, close } = useToast(wrapRef);
const handleClick = () => {
  showToast({
    duration: 5000,
    position: 'center',
    targetAlign: 'left',
    targetOffset: 16,
    content: '在自定义目标元素内居中对齐',
  });
};
</script>
<template>
  <div ref="wrapRef" style="width: 400px; height: 300px; padding: 16px;">
    <OButton @click="handleClick">显示提示</OButton>
    <OButton @click="close">关闭提示</OButton>
  </div>
</template>
```

**场景 6：手动关闭提示**
适用于：需要程序控制关闭时机
```vue
<script setup>
import { useToast } from '@opensig/opendesign';
const { show: showToast, close, closeAll } = useToast();
let closeFn: (() => void) | null = null;
const startTask = () => {
  closeFn = showToast({ content: '处理中...', duration: 0 });
};
const finishTask = () => {
  closeFn?.();        // 关闭单条提示
  // 或 close();      // 关闭本实例所有提示
  // 或 closeAll();   // 关闭所有实例的所有提示
};
</script>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 全局弹出提示 | `useToast()` + `.show('文字')` | 命令式最常见用法 |
| 内联提示 | `message` | 页面固定提示 |
| 内联自定义内容 | default 插槽 | 放入链接等复杂内容 |
| 长提示 | `long: true` | 默认 3500ms |
| 自定义时长 | `duration: 5000` | 指定毫秒数 |
| 不自动关闭 | `duration: 0` | 需手动关闭 |
| 定位到目标元素 | `useToast(target)` + `position` + `targetAlign` + `targetOffset` | 目标元素附近 |
| 顶部显示 | `position: 'top'` | 改为顶部定位 |
| 居中显示 | `position: 'center'` | 屏幕或目标元素居中 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--toast-padding` | `9px 16px` | 提示条内边距 |
| `--toast-bg-color` | `rgb(var(--o-grey-11))` | 提示条背景色（深色） |
| `--toast-color` | `var(--o-color-info1-inverse)` | 提示条文字颜色 |
| `--toast-radius` | `4px` | 提示条圆角 |
| `--toast-font-size` | `var(--o-font_size-tip1)` | 提示文字字号 |
| `--toast-line-height` | `var(--o-line_height-tip1)` | 提示文字行高 |
| `--toast-shadow` | `var(--o-shadow-3)` | 提示条阴影 |
| `--toast-gap` | `16px` | 多条提示间距 |
| `--toast-align` | `center` | 提示条对齐方式 |
| `--toast-max-width` | `100%` | 提示条最大宽度 |
| `--toast-list-offset` | `80px` | 提示列表距页面顶部/底部的偏移 |

**使用示例**:
```vue
<OToast style="--toast-list-offset: 120px" message="自定义偏移提示" />
```

### 响应式行为表
|------|-------------------|---------|--------|
| 最大宽度 | 75% | 100% | 100%（默认） |

### 组件布局结构

**桌面端 >840px**
```yaml
layout:
  # OToast 单条提示
  toast:
    element: div.o-toast
    direction: horizontal
    align: center
    padding: 9px 16px
    border-radius: 4px
    background: rgb(var(--o-grey-11))  # 深色背景
    color: var(--o-color-info1-inverse)  # 白色文字
    shadow: var(--o-shadow-3)
    font-size: tip1
    max-width: 100%
    regions:
      - name: content
        children:
          - { type: slot, name: default }  # 或 message 文字

  # OToastList 提示列表容器（命令式调用）
  toast-list:
    element: div.o-toast-list
    position: fixed
    z-index: 1001
    width: 100%
    text-align: center  # --toast-align
    variants:
      top: { top: var(--toast-list-offset, 80px) }
      center: { top: 50%, transform: translateY(-50%) }
      bottom: { bottom: var(--toast-list-offset, 80px) }
    children:
      - TransitionGroup > OToast[]  # 多条提示动画列表
```

**≤840px**
```yaml
# toast: max-width 75%
```

**手机尺寸**
```yaml
# toast: max-width 100%
```

### 设计稿识别指南

**视觉特征指纹**

1. 深色（近黑色）圆角条状浮动提示 + 白色文字 + 页面底部或居中 → 匹配 OToast
2. 短暂显示后自动消失的提示信息 → 匹配 OToast（命令式调用 + duration）
3. 提示条内含文字和链接/按钮等复杂内容 → 匹配 OToast（default 插槽）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 位置 | 页面底部 | position | `'bottom'` | 默认 |
| 位置 | 页面顶部 | position | `'top'` | — |
| 位置 | 页面居中 | position | `'center'` | — |
| 背景色 | 深色近黑（`--o-grey-11`） | — | — | 固定样式 |
| 文字色 | 白色 | — | — | 固定样式 |
| 圆角 | 4px | — | — | 固定样式 |
| 自动消失 | 约 2 秒 | duration | `2000`（默认） | 命令式默认值 |
| 自动消失 | 约 3.5 秒 | long | `true` | 长提示模式 |
| 不自动消失 | 持续显示 | duration | `0` | 需手动关闭 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OToast | OMessage | OMessage 固定在页面顶部、有颜色语义（success/warning/danger 等）、可关闭；OToast 是深色背景轻提示、默认底部显示、自动消失 |
| OToast | ONotification | ONotification 是右上角弹出的通知卡片有标题和操作按钮；OToast 是简短的一行提示无复杂交互 |
| OToast | OPopover | OPopover 是相对于目标元素的气泡弹出层有箭头指向；OToast 是全局浮动提示无箭头 |
