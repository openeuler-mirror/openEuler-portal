> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OBreadcrumb 面包屑

## Part A：设计理解卡

OBreadcrumb 是面包屑导航组件，显示当前页面在站点层级中的位置路径，帮助用户快速回到上级页面。包含两个组件：OBreadcrumb（容器）和 OBreadcrumbItem（面包屑项）。

### OBreadcrumb 容器

**separator**（属性）：全局分隔符字符。设置后所有面包屑项之间都显示该字符。不传时默认显示右箭头图标。

**default 插槽**（插槽）：放置 OBreadcrumbItem 子项。

### OBreadcrumbItem 面包屑项

**href**（属性）：链接跳转地址。设置后该项渲染为 `<a>` 标签，可点击跳转。不设置时渲染为普通文本 `<span>`，有利于 SEO。

**target**（属性）：链接打开方式，与 href 配合使用。"_self" 当前窗口、"_blank" 新窗口等。默认 "_self"。

**to**（属性）：Vue Router 路由跳转对象。设置后该项渲染为 `<router-link>` 组件，实现 SPA 内部导航。当 href 和 to 同时存在时，优先使用 to 进行跳转。

**replace**（属性）：路由跳转时是否替换浏览器历史记录（而非新增），与 to 配合使用。默认关闭。

**separator**（属性）：该项的分隔符字符，会覆盖父级 OBreadcrumb 的 separator 设置。

**default 插槽**（插槽）：面包屑项的显示内容（文字、图标等）。

**separator 插槽**（插槽）：替换分隔符的渲染。替换后 separator 属性和父级 separator 均失效。不传时显示属性值或默认箭头图标。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），文字变小、分隔符图标缩小。

🧩 **布局结构**：外层 `.o-breadcrumb` 为水平 flex 容器，内部排列多个 `.o-breadcrumb-item`。每个 item 内含 label（文字链接/文本）和 separator（分隔符箭头或自定义字符），水平排列。最后一项的分隔符在视觉上隐藏。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: row
regions: [breadcrumb-item*(label + separator)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：水平排列的多段小号文字，之间用">"箭头或"/"字符分隔，最后一项文字颜色较深（当前页面），前面各项可点击
- **Token → Prop 映射**：分隔符为箭头图标=默认、分隔符为文字字符=separator prop；文字颜色 info3=普通项、primary1=当前选中项；hover 态 primary2
- **易混淆组件区分**：与 OTab/ONav 区别——面包屑显示层级路径且项数较少，Tab/Nav 是同级切换；与纯文字链接区别——面包屑有统一的分隔符且呈路径结构

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';
</script>
```

### OBreadcrumb Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| separator | `string \| number` | — | — | 全局分隔符字符，不传时显示默认箭头图标 |

### OBreadcrumbItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| href | `string` | — | — | 链接跳转地址，设置后渲染为 `<a>` 标签 |
| target | `string` | `'_blank'` / `'_parent'` / `'_self'` / `'_top'` | `'_self'` | 链接打开方式 |
| to | `string \| object` | — | — | Vue Router 路由对象，设置后渲染为 `<router-link>` |
| replace | `boolean` | — | `false` | 路由跳转时是否替换历史记录 |
| separator | `string \| number` | — | — | 分隔符字符，覆盖父级设置 |

### Events 表

本组件无自定义事件。

### Slots 表

**OBreadcrumb：**

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 面包屑项列表 | 无 |

**OBreadcrumbItem：**

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 面包屑项的文本内容 | 无 |
| separator | — | 始终 | 分隔符区域 | separator 属性值或默认箭头图标 |

### 插槽层级关系

```
OBreadcrumb default
└── OBreadcrumbItem
    ├── default（面包屑项内容）
    └── separator（分隔符，使用后属性失效）
```

### 渲染标签优先级

| 条件 | 渲染标签 | 说明 |
|------|---------|------|
| `to` 已设置 | `<router-link>` | SPA 内部导航，优先级最高 |
| `href` 已设置 | `<a>` | 普通链接跳转 |
| 均未设置 | `<span>` | 纯文本，有利于 SEO |

### 典型使用场景与调用模板

**场景 1：基础面包屑**
适用于：简单页面层级导航
```vue
<OBreadcrumb>
  <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
  <OBreadcrumbItem href="/products">产品列表</OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

**场景 2：配合 Vue Router**
适用于：SPA 应用内部导航
```vue
<OBreadcrumb>
  <OBreadcrumbItem to="/">首页</OBreadcrumbItem>
  <OBreadcrumbItem :to="{ name: 'products' }">产品列表</OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

**场景 3：自定义分隔符**
适用于：需要不同于默认箭头的分隔样式
```vue
<OBreadcrumb separator="/">
  <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

**场景 4：带图标的面包屑项**
适用于：首页等特殊项需要图标装饰
```vue
<OBreadcrumb>
  <OBreadcrumbItem href="/">
    <OIconHome style="margin-right: 4px; font-size: 16px;" />首页
  </OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 普通链接导航 | `href` + `target="_self"` | 最常见用法 |
| SPA 路由导航 | `to` | 使用 Vue Router |
| 新窗口打开 | `href` + `target="_blank"` | 外部链接 |
| 当前页面（末尾项） | 不设 href/to | 渲染为纯文本 span |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--breadcrumb-color` | `var(--o-color-info3)` | 普通面包屑项文字颜色 |
| `--breadcrumb-color-hover` | `var(--o-color-primary2)` | 鼠标悬停时文字颜色 |
| `--breadcrumb-color-active` | `var(--o-color-primary3)` | 鼠标按下时文字颜色 |
| `--breadcrumb-color-selected` | `var(--o-color-primary1)` | 当前选中项文字颜色 |
| `--breadcrumb-text-size` | `var(--o-font_size-tip1)` | 面包屑文字大小 |
| `--breadcrumb-text-height` | `var(--o-line_height-tip1)` | 面包屑文字行高 |
| `--breadcrumb-gap` | `4px` | 分隔符与文字之间的间距 |
| `--breadcrumb-separator-size` | `var(--o-icon_size_control-m)` | 分隔符图标大小 |
| `--breadcrumb-label-max-width` | `140px` | 面包屑项最大宽度（超出省略） |

**使用示例**：
```vue
<OBreadcrumb style="--breadcrumb-label-max-width: 200px; --breadcrumb-color: var(--o-color-info2)">
  <OBreadcrumbItem href="/">首页</OBreadcrumbItem>
  <OBreadcrumbItem>当前页面</OBreadcrumbItem>
</OBreadcrumb>
```

### 响应式行为表

| 维度 | ≤1200px | >1200px |
|------|---------|---------|
| 文字大小 | 缩小（tip2） | 标准 |
| 分隔符图标大小 | 缩小 | 标准 |

### 组件布局结构

```yaml
# OBreadcrumb 容器
root: .o-breadcrumb
  direction: row (flex, 水平排列)
  children:
    - slot-default:
        desc: 放置多个 OBreadcrumbItem

# OBreadcrumbItem 面包屑项
item: .o-breadcrumb-item
  direction: row (inline)
  children:
    - .o-breadcrumb-item-label:
        tag: router-link (to) | a (href) | span (无链接)
        content: slot-default (面包屑文字/图标)
        style:
          color: --breadcrumb-color (--o-color-info3)
          hover-color: --breadcrumb-color-hover (--o-color-primary2)
          active-color: --breadcrumb-color-active (--o-color-primary3)
          font-size: --breadcrumb-text-size (--o-font_size-tip1)
          max-width: --breadcrumb-label-max-width (140px)
    - .o-breadcrumb-item-separator:
        content: slot-separator | separator-prop | IconChevronRight
        style:
          size: --breadcrumb-separator-size (--o-icon_size_control-m)
          gap: --breadcrumb-gap (4px)

# 响应式
breakpoints:
  "<=1200px":
    breadcrumb-text-size: --o-font_size-tip2
    breadcrumb-text-height: --o-line_height-tip2
    breadcrumb-separator-size: --o-icon_size_control-xs
```

### 设计稿识别指南

**视觉特征指纹**

1. 水平排列的多段小号文字（tip1/tip2），之间由">"右箭头图标或自定义字符分隔
2. 前面各项为可点击链接（info3 灰色，hover 变品牌蓝），最后一项为当前页面（品牌蓝色，不可点击或纯文本）
3. 通常位于页面顶部、标题上方，呈 "首页 > 分类 > 当前页" 路径结构

**设计 Token → Prop 值映射表**

| 设计特征 | Token / 视觉值 | Prop | Prop 值 |
|---------|---------------|------|--------|
| 分隔符为">"箭头图标 | IconChevronRight | — | 默认（不设 separator） |
| 分隔符为"/"等文字 | 自定义字符 | `separator` | `"/"` 等 |
| 项目可点击跳转 | 渲染为 `<a>` | `href` | URL 字符串 |
| 项目 SPA 路由跳转 | 渲染为 `<router-link>` | `to` | 路由对象 |
| 末尾项不可点击 | 渲染为 `<span>` | — | 不设 href/to |
| 文字颜色灰色 | `--o-color-info3` | — | 默认 |
| 当前项蓝色 | `--o-color-primary1` | — | 选中态 |

**易混淆组件区分表**

| 对比组件 | 相似点 | 区分方法 |
|---------|-------|---------|
| OTab 标签页 | 都是水平排列的文字项 | 面包屑有分隔符箭头且表示层级路径；Tab 表示同级切换且有下划线/背景选中态 |
| ONav 导航 | 都用于页面导航 | 面包屑是辅助导航显示当前位置路径；Nav 是主导航条含菜单项 |
| 纯文字链接列表 | 都是水平链接 | 面包屑有统一分隔符、固定路径语义、最后一项为当前页 |

