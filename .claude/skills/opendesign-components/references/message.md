> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OMessage 消息提示

## Part A：设计理解卡

OMessage 是消息提示组件，用于操作反馈信息的展示。支持内联使用（直接放在模板中）和命令式调用（通过 useMessage 函数动态创建）两种方式。提供五种状态、彩色背景模式、自动关闭、手动关闭等功能。

### 状态

**status**（属性）：消息状态类型。"info" 信息提示、"success" 成功、"warning" 警告、"danger" 危险/错误、"loading" 加载中。不同状态对应不同颜色和图标。默认 info。

**colorful**（属性）：是否使用彩色背景。开启后消息背景色跟随状态颜色变化，并在左侧显示彩色侧边条。默认关闭。

### 显示控制

**visible**（属性）：消息是否可见（v-model 双向绑定）。

**defaultVisible**（属性）：非受控模式下消息是否默认可见。默认可见。

**duration**（属性）：消息自动关闭的持续时间（毫秒）。未设置或小于等于 0 时不自动关闭。鼠标悬停在消息上时暂停计时。

**closable**（属性）：是否显示关闭按钮，允许手动关闭。默认关闭。

**beforeClose**（属性）：关闭前的钩子函数。返回 true 允许关闭，返回 false 阻止关闭。支持异步。

### 内容

**title**（属性）：消息标题文字。

**title 插槽**（插槽）：替换标题区域。使用后 title 属性失效。

**default 插槽**（插槽）：消息正文内容。

**icon 插槽**（插槽）：替换状态图标区域。

### 事件

**duration-end**（事件）：自动关闭计时结束时触发。

**close**（事件）：消息关闭时触发。

---

### useMessage 命令式调用

通过 `useMessage()` 创建消息实例，可指定 target 元素使消息出现在该元素附近。

**show / info / success / warning / danger / loading** 方法：显示对应状态的消息。返回关闭函数。

**close**：关闭当前 useMessage 实例创建的所有消息。

**closeAll**：关闭所有实例创建的全部消息。

命令式调用额外支持：position（消息在目标元素的 top 或 bottom）、targetAlign（消息对齐方式 center/left/right）、content（消息内容）、onDurationEnd 和 onClose 回调。默认 duration 为 3000ms。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），消息内边距、文字大小、图标尺寸缩小；在平板横屏及以下（≤1200px），消息间距进一步缩小；在平板竖屏及以下（≤840px），带标题的消息标题文字缩小、图标缩至最小、彩色模式侧边条变窄。

🧩 **布局结构**：消息条水平排列，从左到右依次为：彩色侧边条（仅 colorful 模式，宽 4px）、状态图标区、主内容区（标题 + 正文纵向排列）、关闭按钮区（仅 closable 时显示）。消息整体有圆角和阴影（colorful 模式无阴影），内边距 8px 16px，图标与内容间距 8px，关闭按钮间距 16px。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal
regions: [sidebar(彩色侧边条,仅colorful), icon(状态图标), main(标题+正文), close(关闭按钮,仅closable)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：页面顶部或指定区域出现的水平通知条，左侧带状态图标（信息/成功/警告/错误/加载），右侧可能有关闭按钮；有阴影或彩色背景变体 → 匹配 OMessage
- **Token → Prop 映射**：蓝色信息图标 → status="info"；绿色勾号 → status="success"；橙色感叹号 → status="warning"；红色叉号 → status="danger"；旋转加载图标 → status="loading"；左侧彩色边条+彩色背景 → colorful；右侧 X 按钮 → closable
- **易混淆组件区分**：与 OAlert 区分——OMessage 是临时通知可自动消失，通常浮于内容上方；OAlert 是静态内嵌提示不自动消失。与 ONotification 区分——OMessage 是简短单行消息居中显示，ONotification 是更丰富的通知卡片

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OMessage, useMessage } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type MessageStatusT = 'info' | 'success' | 'warning' | 'danger' | 'loading';
type MessagePositionT = 'top' | 'bottom';

type MessageParamsT = Partial<MessagePropsT & {
  content: string | VNode | Component;
  position: MessagePositionT;
  targetAlign?: 'center' | 'left' | 'right';
  icon: VNode | Component;
  onDurationEnd: () => void;
  onClose: (ev?: MouseEvent) => void;
}>;
```

### OMessage Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | `undefined` | 是否可见（v-model） |
| defaultVisible | `boolean` | — | `true` | 默认可见 |
| status | `MessageStatusT` | `'info'` / `'success'` / `'warning'` / `'danger'` / `'loading'` | `'info'` | 状态 |
| colorful | `boolean` | — | `false` | 彩色背景 |
| duration | `number` | — | — | 自动关闭时间（ms） |
| closable | `boolean` | — | `false` | 可手动关闭 |
| beforeClose | `() => Promise<boolean> \| boolean` | — | — | 关闭前钩子 |
| title | `string` | — | — | 标题 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean)` | 显示状态变化时 |
| duration-end | — | 自动关闭计时结束 |
| close | `(ev?: MouseEvent)` | 消息关闭时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 消息正文 | 无 |
| icon | — | 始终 | 状态图标 | 对应 status 的默认图标 |
| title | — | 有 title prop 或 title 插槽时 | 标题文字 | `{{ title }}` |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| close(ev?) | `ev?: MouseEvent` | 关闭消息 |

### useMessage API

```typescript
const message = useMessage(target?);
// target: string | ComponentPublicInstance | HTMLElement | Ref<...>

message.show(params);    // 显示消息，返回 close 函数
message.info(params);    // info 状态
message.success(params); // success 状态
message.warning(params); // warning 状态
message.danger(params);  // danger 状态
message.loading(params); // loading 状态
message.close();         // 关闭本实例所有消息
message.closeAll();      // 关闭所有消息
```

- `params` 可以是字符串（直接作为 content）或 `MessageParamsT` 对象
- 命令式调用默认 `duration: 3000`，`position: 'top'`

### 典型使用场景与调用模板

**场景 1：内联消息（页面级提示）**
适用于：页面固定位置的信息提示
```vue
<OMessage status="success" colorful>操作成功</OMessage>
<OMessage status="warning" closable :duration="5000">这是一条可关闭的警告</OMessage>
```

**场景 2：带标题和正文**
适用于：需详细说明的提示
```vue
<OMessage status="info" colorful title="提示标题">
  这是消息的详细内容说明。
</OMessage>
```

**场景 3：命令式全局消息**
适用于：操作反馈弹出提示
```vue
<script setup>
import { useMessage, OButton } from '@opensig/opendesign';
const message = useMessage();
const showSuccess = () => {
  message.success('保存成功');
};
</script>
<template>
  <OButton @click="showSuccess">保存</OButton>
</template>
```

**场景 4：指定目标元素附近显示**
适用于：表单提交反馈等局部提示
```vue
<script setup>
import { useTemplateRef } from 'vue';
import { useMessage } from '@opensig/opendesign';
const container = useTemplateRef('form-area');
const message = useMessage(container);
const onSubmit = () => {
  message.success({ content: '提交成功', position: 'bottom', targetAlign: 'right' });
};
</script>
<template>
  <div ref="form-area">
    <OButton @click="onSubmit">提交</OButton>
  </div>
</template>
```

**场景 5：手动关闭消息**
适用于：需要程序控制关闭时机
```vue
<script setup>
import { useMessage } from '@opensig/opendesign';
const message = useMessage();
let closeLoading: (() => void) | null = null;
const startLoading = () => {
  closeLoading = message.loading({ content: '处理中...', duration: 0 });
};
const stopLoading = () => {
  closeLoading?.();
};
</script>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 全局弹出消息 | `useMessage()` + `.success()` | 命令式最常见 |
| 内联提示 | `status` + `colorful` | 页面固定提示 |
| 可关闭 | `closable` + `duration: 0` | 手动关闭 |
| 带标题 | `title` + default 插槽 | 标题+详情 |
| 自动关闭 | `:duration="3000"` | 3 秒后关闭 |
| 定位消息 | `useMessage(target)` + `position` + `targetAlign` | 目标元素附近 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--message-color` | `var(--o-color-info2)` | 消息文字颜色 |
| `--message-text-size` | `var(--o-font_size-text1)` | 正文字号 |
| `--message-text-height` | `var(--o-line_height-text1)` | 正文行高 |
| `--message-bg-color` | `var(--o-color-fill2)` | 消息背景色 |
| `--message-shadow` | `var(--o-shadow-2)` | 消息阴影（colorful 模式为 none） |
| `--message-align` | `start` | 内容对齐方式 |
| `--message-radius` | `var(--o-radius_control-s)` | 圆角 |
| `--message-padding` | `8px 16px` | 内边距 |
| `--message-icon-size` | `var(--o-icon_size_control-m)` | 状态图标尺寸 |
| `--message-icon-gap` | `8px` | 图标与内容的间距 |
| `--message-icon-gap-suffix` | `16px` | 内容与关闭按钮的间距 |
| `--message-icon-close-color` | `var(--o-color-info2)` | 关闭按钮图标颜色 |
| `--message-icon-close-color-hover` | `var(--o-color-info1)` | 关闭按钮悬停颜色 |
| `--message-icon-close-color-active` | `var(--o-color-info1)` | 关闭按钮激活颜色 |
| `--message-word-break` | `break-word` | 文字断行方式 |
| `--message-text-align` | `center` | 文字水平对齐（有标题+正文时为 left） |
| `--message-gap` | `16px` | 多条消息之间的间距 |
| `--message-sidebar-width` | `4px`（colorful 模式） | 彩色侧边条宽度 |
| `--message-list-offset` | `32px` | 消息列表距屏幕边缘的偏移 |

**使用示例**:
```vue
<OMessage status="success" style="--message-radius: 8px; --message-padding: 12px 20px">操作成功</OMessage>
```

### 响应式行为表

| 维度 | ≤840px | 841–1200px | 1201–1440px | >1440px |
|------|--------|-----------|-------------|---------|
| 内边距 | 4px 12px | — | 7px 12px | 标准 |
| 文字 | — | — | tip1 | 标准 |
| 图标 | 控件 xs | — | 控件 s | 标准 |
| 间距 | — | 8px | 12px | 标准 |
| 彩色侧边条 | 3px | — | — | 标准 |
| 带标题时标题字号 | tip2 | — | — | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  direction: horizontal
  align: center
  border-radius: var(--o-radius_control-s)
  background: var(--o-color-fill2)
  shadow: var(--o-shadow-2)  # colorful 模式无阴影
  padding: 8px 16px
  gap: 8px  # --message-icon-gap
  regions:
    - name: sidebar
      condition: colorful === true
      width: 4px  # --message-sidebar-width
      height: 100%
      background: 跟随 status 颜色
    - name: icon
      children:
        - { type: slot, name: icon }  # 默认根据 status 显示对应图标
      icon-size: var(--o-icon_size_control-m)
    - name: main
      flex: 1
      direction: vertical
      children:
        - name: title
          condition: 有 title prop 或 title 插槽
          children:
            - { type: slot, name: title }
        - name: content
          children:
            - { type: slot, name: default }
    - name: close
      condition: closable === true
      gap: 16px  # --message-icon-gap-suffix
      children:
        - { type: icon, name: IconClose }
  variants:
    colorful:
      shadow: none
      background: 跟随 status（info→蓝, success→绿, warning→橙, danger→红, loading→品牌色浅）
    both(有标题+有正文):
      text-size: tip1
      padding: 5px 12px 8px
      title-gap: 5px
    only-title(colorful+仅标题):
      title-size: tip1
      padding: 4px 12px
    only-content(colorful+仅正文):
      text-size: tip1
      padding: 4px 12px
```

**≤1440px (laptop)**
```yaml
# padding: 7px 12px, gap: 12px
# text-size: tip1, icon-size: s
# both: text-size tip2
# only-content: text-size tip2, padding 6px 12px
```

**≤1200px (pad)**
```yaml
# gap: 8px
```

**≤840px (pad_v)**
```yaml
# both: title-size tip2, icon-size xs, padding 4px 12px, title-gap 4px
# colorful: sidebar-width 3px
# only-title: title-size tip2, icon-size xs, padding 4px 12px
# only-content: icon-size xs, padding 4px 12px
```

### 设计稿识别指南

**视觉特征指纹**

1. 页面顶部/指定区域浮现的水平条形通知 + 左侧状态图标 + 可选关闭按钮 → 匹配 OMessage
2. 带圆角、阴影的横条 + 五种状态图标之一（信息/成功/警告/错误/加载） → 匹配 OMessage
3. 左侧彩色竖边条 + 彩色背景 + 状态图标 → 匹配 OMessage（colorful 模式）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 状态图标 | 蓝色圆形 i 图标 | status | `'info'` | 默认值 |
| 状态图标 | 绿色勾号 | status | `'success'` | — |
| 状态图标 | 橙色感叹号 | status | `'warning'` | — |
| 状态图标 | 红色叉号/感叹号 | status | `'danger'` | — |
| 状态图标 | 旋转加载圈 | status | `'loading'` | 图标带旋转动画 |
| 背景色 | 彩色（蓝/绿/橙/红）+ 左侧彩色边条 | colorful | `true` | — |
| 背景色 | 白色/浅色 + 阴影 | colorful | `false` | 默认 |
| 右侧 | X 关闭按钮 | closable | `true` | — |
| 标题行 | 有标题文字 | title | 标题文字 | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OMessage | OAlert | OMessage 是临时浮层通知可自动消失，OAlert 是静态内嵌提示区域不会自动消失 |
| OMessage | ONotification | OMessage 是简短消息条居中/顶部显示，ONotification 是带标题+详情的通知卡片通常右上角弹出 |
| OMessage（内联） | OAlert | 内联 OMessage 固定在页面中时外观类似 OAlert，但 OMessage 支持 duration 自动关闭和命令式调用 |

