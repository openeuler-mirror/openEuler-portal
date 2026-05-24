> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OLoading 加载

## Part A：设计理解卡

OLoading 是加载状态组件，基于 OLayer 浮层实现。可覆盖在页面或容器上，显示加载图标和文字提示。支持四种尺寸、自定义图标、遮罩层等功能。

### 尺寸

**size**（属性）：加载图标尺寸。"mini" 超小号、"small" 小号、"medium" 中号、"large" 大号。默认 small。

### 内容

**label**（属性）：加载提示文字。

**icon**（属性）：自定义加载图标组件。不传时使用默认旋转加载图标。

**iconRotating**（属性）：自定义图标是否旋转。默认关闭（默认图标始终旋转）。

### 显示控制

**visible**（属性）：是否显示加载层（v-model 双向绑定）。

### 容器配置（继承自 OLayer）

**wrapper**（属性）：加载层挂载位置。"body" 挂载到 body、CSS 选择器字符串挂载到指定元素、不传则在组件位置渲染。

**mask**（属性）：是否显示遮罩层。

**unmountOnHide**（属性）：隐藏时是否销毁 DOM。

**mainClass**（属性）：主内容区域自定义类名。

**mainTransition**（属性）：主内容过渡动画名。

**maskTransition**（属性）：遮罩层过渡动画名。

### 插槽区域

**default 插槽**（插槽）：替换整个加载内容区域（图标 + 文字）。使用后内部 icon 和 label 插槽全部失效。

**icon 插槽**（插槽）：替换加载图标区域。使用后 icon 属性和 iconRotating 属性失效。

**label 插槽**（插槽）：替换加载文字区域。使用后 label 属性失效。

### 事件

**change**（事件）：加载层显示/隐藏状态变化时触发。

📱 **响应式行为**：在平板竖屏到笔记本尺寸（841–1440px），large 和 medium 尺寸的图标、文字、间距均缩小；在平板竖屏及以下（≤840px），进一步缩小至更小尺寸。

🧩 **布局结构**：基于 OLayer 浮层实现，外层 `.o-loading` 继承 Layer 的遮罩+内容区结构。内容区 `.o-loading-main` 内部垂直排列（large/medium）或水平排列（small/mini）两个区域：加载图标 `.o-loading-icon`（旋转动画）和加载文字 `.o-loading-label`（可选）。整体通过 `--loading-content-direction` 控制排列方向。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: column(large/medium) | row(small/mini)
regions: [OLayer(遮罩+容器) > [icon(加载图标), label(加载文字,可选)]]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：半透明遮罩层上居中显示旋转加载图标（圆形旋转动画），可能下方有加载提示文字；图标和文字颜色为信息色（遮罩模式下为反色白色）
- **Token → Prop 映射**：图标 96px=size:large、4xl=size:medium、xs=size:small、control-xs=size:mini；文字 text1=size:large、tip1=size:medium、tip2=size:small；图标文字垂直排列=large/medium、水平排列=small/mini
- **易混淆组件区分**：与 OLayer 区别——Loading 有固定的加载图标+文字内容结构，Layer 是纯空容器；与 OButton loading 状态区别——Button loading 是按钮内部的小加载图标，Loading 是覆盖整个区域的加载遮罩；与 ODialog 区别——Dialog 有标题/内容/操作栏结构，Loading 仅有图标+文字

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OLoading } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| visible | `boolean` | — | `false` | 是否显示（v-model） |
| size | `SizeT \| 'mini'` | `'mini'` / `'small'` / `'medium'` / `'large'` | `'small'` | 尺寸 |
| label | `string` | — | — | 加载文字 |
| icon | `Component` | — | — | 自定义图标 |
| iconRotating | `boolean` | — | — | 自定义图标是否旋转 |
| wrapper | `string \| HTMLElement \| null` | `'body'` / CSS 选择器 / `null` | `'body'` | 挂载位置 |
| mask | `boolean` | — | `true` | 是否显示遮罩 |
| unmountOnHide | `boolean` | — | `true` | 隐藏时销毁 DOM |
| mainClass | `string \| object \| array` | — | — | 主内容类名 |
| mainTransition | `string` | — | `'o-zoom-fade2'` | 主内容过渡动画 |
| maskTransition | `string` | — | `'o-fade-in'` | 遮罩过渡动画 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:visible | `(val: boolean, evt?: MouseEvent)` | 显示状态变化时 |
| change | `(val: boolean)` | 显示/隐藏时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 整个加载内容（图标+文字） | 图标 + label 文字 |
| icon | — | 未使用 default 插槽时 | 加载图标 | `<IconLoading />` 旋转图标 |
| label | — | 未使用 default 插槽时，且有 label prop 或 label 插槽 | 加载文字 | `{{ label }}` |

### 插槽层级关系

```
default（使用后内部全部失效）
├── icon
└── label
```

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| toggle(show?) | `show?: boolean` | 切换显示状态 |

### 典型使用场景与调用模板

**场景 1：基础加载**
适用于：页面数据加载
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
<template>
  <OLoading v-model:visible="loading" label="加载中..." />
</template>
```

**场景 2：覆盖指定容器**
适用于：局部加载遮罩
```vue
<div id="container" style="position: relative;">
  <OLoading v-model:visible="loading" wrapper="#container" mask label="请稍候" />
  <!-- 容器内容 -->
</div>
```

**场景 3：全屏加载**
适用于：整页加载
```vue
<OLoading v-model:visible="loading" wrapper="body" mask size="large" label="页面加载中" />
```

**场景 4：自定义图标**
适用于：品牌定制加载效果
```vue
<OLoading v-model:visible="loading" :icon="MyCustomIcon" icon-rotating label="处理中" />
```

**场景 5：完全自定义内容**
适用于：复杂加载展示
```vue
<OLoading v-model:visible="loading">
  <div class="custom-loading">
    <MyAnimation />
    <p>正在为您准备数据...</p>
  </div>
</OLoading>
```

### v-loading 指令

除组件写法外，可用 `v-loading` 指令将加载层叠加到现有容器元素上，无需在模板中插入 `<OLoading />`。

#### 导入与注册

```vue
<script setup>
import { vLoading } from '@opensig/opendesign';
// 在 <script setup> 中 import 后，v-loading 自动可用于模板
</script>
```

#### ⚠️ 关键约束：容器必须有 `position: relative`

`v-loading` 指令的加载覆盖层使用 `position: absolute` 定位，相对于**最近的非 static 定位祖先**。
若容器缺少 `position: relative`，覆盖层会逃出容器范围，覆盖错误区域。

```vue
<!-- ✅ 正确：容器有 position: relative -->
<div style="position: relative; min-height: 100px;" v-loading="isLoading">
  <p>卡片内容</p>
</div>

<!-- ❌ 错误：无定位，覆盖层会定位到错误位置 -->
<div v-loading="isLoading">
  <p>卡片内容</p>
</div>
```

#### Binding 值类型

| 类型 | wrapper 默认 | mask 默认 | 说明 |
|------|------------|----------|------|
| `boolean` | `null`（容器内渲染） | `true` | 快捷写法，`true` 显示 / `false` 隐藏 |
| `Partial<LoadingPropsT>` | `null`（容器内渲染） | `true` | 完整配置对象，支持所有 LoadingProps |

当传入响应式对象（`reactive()`）时，指令会自动 `watch` 变化，无需手动触发更新。

#### 修饰符（仅 boolean binding 时有效）

| 修饰符 | 说明 |
|--------|------|
| `.body` | 将 Loading 挂载到 body（全屏模式），忽略容器定位 |
| `.nomask` | 禁用遮罩层（等价于 `mask: false`） |

#### 典型用法

```vue
<!-- 简洁：boolean binding，默认带遮罩 -->
<div style="position: relative;" v-loading="isLoading">
  <p>内容区域</p>
</div>

<!-- 完整配置：object binding，指定 label 和 size -->
<div style="position: relative;" v-loading="{ visible: isLoading, label: '加载中', size: 'large' }">
  <p>内容区域</p>
</div>

<!-- 无遮罩：object binding + mask: false -->
<div style="position: relative;" v-loading="{ visible: isLoading, mask: false, size: 'medium', label: '处理中' }">
  <p>内容区域</p>
</div>

<!-- 响应式对象：自动监听变化 -->
<script setup>
import { reactive } from 'vue';
const loadingState = reactive({ visible: true, label: '同步中', size: 'small' });
</script>
<div style="position: relative;" v-loading="loadingState">
  <p>内容区域</p>
</div>

<!-- 全屏（.body 修饰符） -->
<div v-loading.body="isLoading"></div>

<!-- boolean + 无遮罩（.nomask 修饰符） -->
<div style="position: relative;" v-loading.nomask="isLoading"></div>
```

### useLoading 组合式函数

除组件和指令外，可用 `useLoading` 以**命令式**方式控制加载层，适合在业务逻辑（非模板）中动态创建和控制加载状态。

#### 导入

```vue
<script setup>
import { useLoading } from '@opensig/opendesign';
</script>
```

#### 签名

```typescript
function useLoading(
  opt?: Partial<LoadingPropsT>,
  wrap?: Ref<HTMLElement | undefined> | HTMLElement | string
): { toggle: (show?: boolean) => void }
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| opt | `Partial<LoadingPropsT>` | — | Loading 配置，支持所有 LoadingProps |
| wrap | `Ref<HTMLElement>` / `HTMLElement` / `string` | `'body'` | 挂载目标：Vue ref、DOM 元素、CSS 选择器字符串 |

返回值 `{ toggle(show?: boolean): void }`：
- `toggle(true)` — 显示
- `toggle(false)` — 隐藏
- `toggle()` — 切换

#### ⚠️ 关键约束

- 必须在 `setup()` 或组合式函数中调用（使用了 `watch` / `onMounted`）
- 当 `wrap` 为 CSS 选择器字符串时，查找在 `onMounted` 中执行，确保目标 DOM 已存在
- 当 `wrap` 为 `Ref` 时，会自动 `watch` 其变化，ref 赋值后才挂载

#### 典型用法

```vue
<script setup>
import { ref } from 'vue';
import { useLoading } from '@opensig/opendesign';

// 场景 1：全屏加载（默认挂载到 body）
const globalLoading = useLoading({ label: '加载中', size: 'large' });

async function fetchData() {
  globalLoading.toggle(true);
  await api.loadData();
  globalLoading.toggle(false);
}

// 场景 2：挂载到模板 ref 元素
const containerRef = ref<HTMLElement>();
const localLoading = useLoading({ label: '处理中', mask: true }, containerRef);

// 场景 3：挂载到 CSS 选择器（须在 onMounted 后目标 DOM 存在）
const selectorLoading = useLoading({ size: 'medium' }, '#my-panel');
</script>

<template>
  <div ref="containerRef" style="position: relative; min-height: 100px;">
    <!-- 内容区域 -->
  </div>
  <button @click="fetchData">加载数据</button>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础加载 | `v-model:visible` + `label` | 最常见用法 |
| 全屏遮罩 | `wrapper="body"` + `mask` + `size="large"` | 整页加载 |
| 局部遮罩 | `wrapper="#id"` + `mask` | 区域加载 |
| 自定义图标 | `:icon` + `icon-rotating` | 品牌图标 |
| 无文字 | 仅 `v-model:visible` | 纯图标加载 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--loading-mask` | `var(--o-color-mask1)` | 遮罩层颜色 |
| `--loading-icon-size` | `var(--o-icon_size_control-m)` | 加载图标尺寸（small 为 xs，medium 为 4xl，large 为 96px） |
| `--loading-icon-color` | `var(--o-color-info2)` | 图标颜色（无遮罩时） |
| `--loading-mask-icon-color` | `var(--o-color-info2-inverse)` | 图标颜色（有遮罩时，通常为白色） |
| `--loading-color` | `var(--o-color-info2)` | 文字颜色（无遮罩时） |
| `--loading-mask-color` | `var(--o-color-info2-inverse)` | 文字颜色（有遮罩时） |
| `--loading-z-index` | `calc(var(--o-z-index-base) + 10)` | 层级 |
| `--loading-label-font-size` | `var(--o-font_size-tip2)` | 加载文字字号 |
| `--loading-label-line-height` | `var(--o-line_height-tip2)` | 加载文字行高 |
| `--loading-label-icon-gap` | `8px` | 图标与文字之间的间距（small 为 4px，medium 为 12px，large 为 16px） |
| `--loading-content-direction` | `column` | 图标与文字排列方向（small/mini 为 `row`） |

**使用示例**:
```vue
<OLoading v-model:visible="loading" style="--loading-icon-color: var(--o-color-primary1)" />
```

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| large 图标 | 2xl | 4xl | 标准 |
| large 文字 | tip2 | tip1 | 标准 |
| large 间距 | 8px | 12px | 标准 |
| medium 图标 | 2xl | 2xl | 标准 |
| medium 文字 | tip2 | tip2 | 标准 |
| medium 间距 | 4px | 8px | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  component: OLayer.o-loading
  inherits: OLayer  # 遮罩+内容区结构
  transition-origin: css  # 固定使用 css 模式
  mask-close: false  # 不允许点击遮罩关闭
  regions:
    - name: loading-main
      element: div.o-loading-main  # 通过 mainClass 合并
      display: flex
      direction: var(--loading-content-direction)  # column(large/medium) | row(small/mini)
      align: center
      justify: center
      children:
        - name: icon
          element: div.o-loading-icon
          children:
            - { type: slot, name: icon, fallback: "IconLoading(旋转)" }
          icon-size: var(--loading-icon-size)
          color: var(--loading-icon-color)  # 有遮罩时用 --loading-mask-icon-color
        - name: label
          element: div.o-loading-label
          condition: label prop 或 label 插槽
          children:
            - { type: slot, name: label, fallback: "{{ label }}" }
          font-size: var(--loading-label-font-size)
          gap: var(--loading-label-icon-gap)  # 图标与文字间距
  variants:
    large: { icon: 96px, text: text1, gap: 16px, direction: column }
    medium: { icon: 4xl, text: tip1, gap: 12px, direction: column }
    small: { icon: xs, text: tip2, gap: 4px, direction: row }
    mini: { icon: control-xs, direction: row }
```

**841–1440px (pad_v-laptop)**
```yaml
# large: icon 4xl, text tip1, gap 12px
# medium: icon 2xl, text tip2, gap 8px
```

**≤840px (pad_v)**
```yaml
# large: icon 2xl, text tip2, gap 8px
# medium: icon 2xl, text tip2, gap 4px
```

### 设计稿识别指南

**视觉特征指纹**

1. 半透明遮罩 + 居中旋转圆形加载图标 + 可选下方文字 → 匹配 OLoading（large/medium）
2. 小型旋转加载图标 + 右侧文字（水平排列）→ 匹配 OLoading（small/mini）
3. 覆盖特定区域的遮罩 + 加载动画（非全屏）→ 匹配 OLoading（wrapper 指定容器）
4. 全屏遮罩 + 大号加载图标居中 → 匹配 OLoading（wrapper="body", size="large"）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 图标尺寸 | 96px 超大 | size | `'large'` | — |
| 图标尺寸 | 4xl 大 | size | `'medium'` | — |
| 图标尺寸 | xs 小 | size | `'small'` | 默认 |
| 图标尺寸 | control-xs 超小 | size | `'mini'` | — |
| 排列方向 | 图标上文字下 | size | `'large'` 或 `'medium'` | direction: column |
| 排列方向 | 图标左文字右 | size | `'small'` 或 `'mini'` | direction: row |
| 遮罩 | 有半透明遮罩 | mask | `true` | 默认 |
| 遮罩 | 无遮罩 | mask | `false` | — |
| 文字 | 有加载提示文字 | label | 对应文字内容 | — |
| 定位 | 覆盖全屏 | wrapper | `'body'` | 默认 |
| 定位 | 覆盖指定区域 | wrapper | `'#id'` | — |
| 图标 | 非默认加载图标 | icon | 自定义组件 | — |
| 图标旋转 | 自定义图标有旋转 | iconRotating | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OLoading | OLayer | OLoading 有固定的加载图标+文字结构，OLayer 是纯空容器 |
| OLoading | ODialog | ODialog 有标题栏/内容区/操作栏，OLoading 仅有居中的图标+文字 |
| OLoading | OButton loading | OButton loading 是按钮内的小图标状态，OLoading 是覆盖区域的遮罩加载 |
| OLoading | OSkeleton | OSkeleton 是占位骨架屏（灰色块状），OLoading 是旋转图标+遮罩层 |