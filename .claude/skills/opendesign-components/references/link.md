> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OLink 链接

## Part A：设计理解卡

OLink 是链接组件，用于页面间导航或触发操作。支持五种颜色主题、四种尺寸、前后缀图标、加载状态，以及全局配置回调。

### 外观

**color**（属性）：链接颜色主题。"normal" 默认色、"primary" 品牌色、"success" 成功绿色、"warning" 警告橙色、"danger" 危险红色。默认 normal。

**size**（属性）：链接尺寸。"large" 大号、"medium" 中号、"small" 小号、"auto" 自动继承父级字号。默认 auto。

**hoverBg**（属性）：悬停时是否显示背景色块。默认关闭。

**hoverUnderline**（属性）：悬停时是否显示下划线。默认开启。

### 导航

**href**（属性）：链接指向的 URL 地址。

**target**（属性）：链接打开方式。"_blank" 新窗口、"_parent" 父框架、"_self" 当前页面、"_top" 顶层框架。

**tag**（属性）：渲染的 HTML 标签。默认为 "a" 标签。可改为 "span"、"div" 等。

### 状态

**disabled**（属性）：禁用链接。禁用后点击无效、样式变灰。默认关闭。

**loading**（属性）：加载中状态。开启后前缀图标替换为旋转加载图标，点击无效。默认关闭。

### 图标区域

**icon**（属性）：前缀图标组件。loading 开启时图标被替换为加载图标。

**icon 插槽**（插槽）：替换前缀图标区域。使用后 icon 属性失效。loading 开启时此插槽也会被替换为加载图标。

**suffix**（属性）：是否显示后缀箭头图标。默认关闭。

**suffix 插槽**（插槽）：替换后缀区域。使用后 suffix 属性的默认箭头失效，渲染自定义内容。

### 全局配置

**global**（属性）：是否启用全局配置回调。开启后点击链接会触发 OConfigProvider 中配置的 link.click 回调。默认开启。

### 事件

**click**（事件）：点击链接时触发。禁用或加载状态下不触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），大号链接的文字和图标缩小。

🧩 **布局结构**：根元素为 `<a>`（或自定义 tag）行内元素，内部水平排列三个区域：前缀图标 `.o-link-prefix`（可选，loading 时强制为旋转加载图标）、文字主体 `.o-link-main`（默认插槽，hoverUnderline 时额外包一层 `.o-link-label`）、后缀图标 `.o-link-suffix`（可选，默认箭头图标）。三区域间距由 `--link-gap` 控制。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal(inline)
regions: [prefix(前缀图标,可选), main(文字内容), suffix(后缀图标,可选)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：行内文字元素、有颜色（蓝/绿/橙/红/默认色）、hover 时有下划线或背景色块变化、可能有前缀图标和/或后缀箭头图标
- **⚠️ 设计师术语"文字按钮"= OLink**：设计师在 Pixso/Figma 中将蓝色可点击文字标注为"文字按钮"时，代码中应使用 OLink，而不是 OButton variant="text"。OLink 是行内元素，无矩形按钮容器和 padding；OButton text 变体虽然视觉上也"没有背景"，但仍有 padding、min-width 和 hover 背景色矩形区域，两者行为不同。
- **Token → Prop 映射**：文字颜色蓝=color:primary、绿=color:success、橙=color:warning、红=color:danger、链接色=color:normal(默认)；字号 text1=size:large、tip1=size:medium/small；hover 有背景色块=hoverBg:true；hover 无下划线=hoverUnderline:false；右侧有箭头=suffix:true
- **易混淆组件区分**：与 OButton(text) 区别——Link 是行内文字无矩形容器边界，Button text 有 padding 和 hover 背景色区域；与原生 `<a>` 区别——OLink 有标准化的颜色主题、loading 状态、图标区域和全局回调机制

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OLink } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| href | `string` | — | — | 链接 URL |
| target | `string` | `'_blank'` / `'_parent'` / `'_self'` / `'_top'` | — | 打开方式 |
| loading | `boolean` | — | `false` | 加载中 |
| color | `ColorT` | `'normal'` / `'primary'` / `'success'` / `'warning'` / `'danger'` | `'normal'` | 颜色 |
| size | `LinkSizeT` | `'large'` / `'medium'` / `'small'` / `'auto'` | `'auto'` | 尺寸 |
| disabled | `boolean` | — | `false` | 禁用 |
| icon | `Component` | — | — | 前缀图标组件 |
| suffix | `boolean` | — | `false` | 显示后缀箭头 |
| hoverBg | `boolean` | — | `false` | 悬停背景 |
| hoverUnderline | `boolean` | — | `true` | 悬停下划线 |
| tag | `string` | — | `'a'` | HTML 标签 |
| global | `boolean` | — | `true` | 全局配置生效 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| click | `(val: MouseEvent)` | 点击链接（非禁用/加载时） |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 链接文字区域 | 无 |
| icon | — | 有 icon prop 或 icon 插槽或 loading 时渲染 | 前缀图标 | `<component :is="props.icon" />` |
| suffix | — | 有 suffix prop 或 suffix 插槽时渲染 | 后缀区域 | `<IconLinkArrow />` 箭头图标 |

### 插槽层级关系

```
default（链接文字）
icon（前缀图标，loading 时强制替换为 IconLoading）
suffix（后缀图标）
```

三个插槽互不嵌套，各自独立。

### 典型使用场景与调用模板

**场景 1：基础链接**
适用于：页面跳转
```vue
<OLink href="https://example.com" target="_blank" color="primary">查看更多</OLink>
```

**场景 2：带前缀图标**
适用于：强调链接功能
```vue
<OLink color="warning" size="medium">
  <template #icon><OIconEye /></template>
  了解更多
</OLink>
```

**场景 3：带后缀箭头**
适用于：导航类链接
```vue
<OLink color="primary" suffix>查看详情</OLink>
```

**场景 4：自定义前后缀**
适用于：丰富的链接样式
```vue
<OLink color="warning" size="medium">
  <template #icon><OIconEye /></template>
  <template #suffix><OIconChevronRight /></template>
  了解更多
</OLink>
```

**场景 5：加载状态**
适用于：点击后异步操作
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(false);
const handleClick = () => {
  loading.value = true;
  setTimeout(() => { loading.value = false; }, 3000);
};
</script>
<template>
  <OLink color="primary" :loading="loading" @click="handleClick">点击加载</OLink>
</template>
```

**场景 6：全局配置回调**
适用于：统一拦截链接行为（如埋点）
```vue
<OConfigProvider :link="{ click: (e, params, attrs) => { console.log(params.href); } }">
  <OLink href="/page" color="primary">带全局回调的链接</OLink>
</OConfigProvider>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 普通跳转 | `href` + `target` + `color` | 最常见用法 |
| 带图标 | `#icon` 插槽 + `size` | 图标 + 文字 |
| 导航箭头 | `suffix` | 显示右箭头 |
| 悬停效果 | `hover-bg` + `:hover-underline="false"` | 背景高亮代替下划线 |
| 异步操作 | `:loading` + `@click` | 点击后显示加载 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--link-gap` | `4px` | 前缀图标、文字、后缀图标之间的间距 |
| `--link-icon-size` | `1.14em` | 图标尺寸（medium/small 为 `var(--o-icon_size_control-xs)`，large 为 `var(--o-icon_size_control-s)`） |
| `--link-icon-align` | `-0.05em` | 图标垂直对齐偏移（medium/small 为 `-0.08em`，large 为 `-0.1em`） |
| `--link-color` | `var(--o-color-link1)`（normal） | 链接文字颜色（随 color prop 变化） |
| `--link-color-hover` | `var(--o-color-link2)`（normal） | 悬停时文字颜色 |
| `--link-color-active` | `var(--o-color-link3)`（normal） | 激活时文字颜色 |
| `--link-color-disabled` | `var(--o-color-info4)`（normal） | 禁用时文字颜色 |
| `--link-bg-color-hover` | `var(--o-color-control1-light)`（normal） | 悬停时背景色（hoverBg=true 时生效） |
| `--link-bg-color-active` | `var(--o-color-control2-light)`（normal） | 激活时背景色 |
| `--link-text-size` | — | 文字大小（medium/small 为 `var(--o-font_size-tip1)`） |
| `--link-text-height` | — | 文字行高（medium/small 为 `var(--o-line_height-tip1)`） |

**使用示例**:
```vue
<OLink color="primary" style="--link-gap: 8px; --link-icon-size: 1.5em">查看详情</OLink>
```

### 响应式行为表

| 维度 | ≤1440px | >1440px |
|------|---------|---------|
| large 字号 | 缩小（tip1） | 标准 |
| large 图标 | 缩小（xs） | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  component: a.o-link  # 或自定义 tag
  direction: horizontal(inline)
  align: center
  gap: 4px  # --link-gap
  regions:
    - name: prefix
      element: span.o-link-prefix
      condition: icon prop 或 icon 插槽 或 loading=true
      children:
        - { type: icon, name: IconLoading(旋转), condition: "loading=true" }
        - { type: slot, name: icon, condition: "loading=false" }
      icon-size: 1.14em  # --link-icon-size
    - name: main
      element: span.o-link-main
      children:
        - element: span.o-link-label  # 仅 hoverUnderline=true 时
          children:
            - { type: slot, name: default }
    - name: suffix
      element: span.o-link-suffix
      condition: suffix prop=true 或 suffix 插槽
      children:
        - { type: slot, name: suffix, fallback: "IconLinkArrow" }
  variants:
    large: { font-size: text1, line-height: text1, icon-size: control-s }
    medium: { font-size: tip1, line-height: tip1, icon-size: control-xs }
    small: { font-size: tip1, line-height: tip1, icon-size: control-xs }
    auto: { font-size: inherit }
  color-themes:
    normal: { color: var(--o-color-link1), hover: link2, active: link3, disabled: info4 }
    primary: { color: var(--o-color-primary1), hover: primary2, active: primary3 }
    success: { color: var(--o-color-success1) }
    warning: { color: var(--o-color-warning1) }
    danger: { color: var(--o-color-danger1) }
```

**≤1440px (laptop)**
```yaml
# large: font-size tip1, line-height tip1, icon-size xs
```

### 设计稿识别指南

**视觉特征指纹**

1. 行内文字 + 有颜色（非黑色正文色）+ hover 态有下划线 → 匹配 OLink（默认 hoverUnderline）
2. 行内文字 + hover 态有背景色块（无下划线）→ 匹配 OLink（hoverBg=true, hoverUnderline=false）
3. 行内文字 + 右侧小箭头图标 → 匹配 OLink（suffix=true）
4. 行内文字 + 左侧有旋转加载图标 → 匹配 OLink（loading=true）
5. **设计稿标注为"文字按钮"** → 优先匹配 OLink（`color="primary"`），而非 OButton text 变体

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 文字颜色 | `--o-color-link1` 链接蓝 | color | `'normal'` | 默认 |
| 文字颜色 | `--o-color-primary1` 品牌蓝 | color | `'primary'` | — |
| 文字颜色 | `--o-color-success1` 绿色 | color | `'success'` | — |
| 文字颜色 | `--o-color-warning1` 橙色 | color | `'warning'` | — |
| 文字颜色 | `--o-color-danger1` 红色 | color | `'danger'` | — |
| font-size | text1 | size | `'large'` | — |
| font-size | tip1 | size | `'medium'` 或 `'small'` | 视觉一致 |
| font-size | 继承父级 | size | `'auto'` | 默认 |
| hover 效果 | 下划线 | hoverUnderline | `true` | 默认 |
| hover 效果 | 背景色块 | hoverBg | `true` | 常与 hoverUnderline=false 搭配 |
| 后缀 | 右箭头图标 | suffix | `true` | — |
| 前缀图标 | 旋转加载圈 | loading | `true` | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OLink | OButton(text) | OLink 是行内文字无容器边界，OButton text 有 padding 和 hover 背景色矩形区域 |
| OLink | OBreadcrumb 链接 | OBreadcrumb 是多级路径导航用 "/" 分隔，OLink 是独立单个链接 |
| OLink | 原生 `<a>` | OLink 有标准化颜色主题、loading 状态、图标插槽、全局回调 |
