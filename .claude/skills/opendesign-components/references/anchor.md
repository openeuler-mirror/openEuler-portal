> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OAnchor 锚点

## Part A：设计理解卡

OAnchor 是一个页面内导航组件，让用户快速跳转到页面指定区域，同时随页面滚动自动高亮当前所在区域的锚点项。包含两个组件：OAnchor（容器）和 OAnchorItem（锚点项）。

### OAnchor 容器

**layout**（属性）：控制锚点的排列方向。"v" 垂直排列，适合侧边栏导航；"h" 水平排列，适合页面顶部导航栏。默认垂直排列。水平模式支持吸顶效果和溢出时自动横向滚动遮罩。

**size**（属性）：控制锚点项的大小风格，仅垂直模式有效。"medium" 标准尺寸；"small" 紧凑尺寸；"menu" 菜单混合模式，适合侧边菜单或移动端菜单场景，子项有悬停背景色。默认 medium。

**container**（属性）：指定锚点监听哪个滚动容器。默认监听整个页面窗口滚动。可传入 CSS 选择器字符串（如 "#wrap"）指定特定容器。

**targetOffset**（属性）：点击锚点跳转后，目标元素距离容器顶部的偏移距离（像素）。同时也影响滚动时锚点激活的判定位置。默认 0。

**bounds**（属性）：锚点激活判定的额外边界范围（像素）。配合 targetOffset 使用可实现"点击跳到顶部，但滚动到中间才高亮"的效果。默认 5。

**changeHash**（属性）：点击锚点时是否同步更新浏览器地址栏的 hash 值。关闭后适合需要手动控制 URL 的场景。默认开启。

**default 插槽**（插槽）：放置 OAnchorItem 子项。

**change**（事件）：当前激活的锚点项发生变化时触发，可获得新激活项的链接地址。

### OAnchorItem 锚点项

**title**（属性）：锚点项显示的标题文字。默认空字符串。

**href**（属性）：锚点跳转的目标元素，以 "#" 前缀开头（如 "#section1"）。也支持外部链接。必填。

**observeHref**（属性）：指定滚动监听的目标元素（带 "#" 前缀），不传则默认监听 href 指向的元素。适用于跳转地址和监听区域不同的场景。

**target**（属性）：链接打开方式。"_self" 当前页面跳转，"_blank" 新窗口打开等。默认 "_self"。

**disabled**（属性）：禁用锚点项，点击无响应且样式变灰。默认关闭。

**title 插槽**（插槽）：替换锚点项的默认标题渲染。替换后 title 属性失效。可用于在标题旁添加图标等自定义内容。

**default 插槽**（插槽）：放置子级 OAnchorItem，实现多级嵌套锚点。仅垂直模式下有效，水平模式会忽略子项。

**item-click**（事件）：点击锚点项时触发。

📱 **响应式行为**：在笔记本尺寸及以下（≤1200px），锚点项文字变小、间距缩小；水平模式下项间距从 32px 缩至 24px。在平板竖屏及以下（≤840px），水平模式项间距进一步缩至 16px。

🧩 **布局结构**：垂直模式下，根容器水平排列，左侧是一条竖线（含滑动指示器），右侧是锚点项列表区。每个锚点项内部水平排列：左侧是连接线与圆点装饰，右侧是标题文字。子项通过缩进体现层级。水平模式下，根容器为单行水平排列，项之间有 32px 间距，溢出时左右出现渐隐遮罩可横向滚动。
```yaml
# 简化结构摘要（完整版见 Part B）
# 垂直模式
direction: horizontal
regions: [anchor-line(指示器竖线), anchor-items(锚点项列表)]
# 水平模式
direction: horizontal  # 单行横排
regions: [anchor-items(锚点项列表，可横向滚动)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：左侧有竖线+圆点装饰、右侧为多行文字链接的列表结构 → 匹配 OAnchor（垂直模式）；单行横排的文字标签页、底部无指示器下划线 → 匹配 OAnchor（水平模式）
- **Token → Prop 映射**：文字大小对应 size（medium 用 text1 字号，small 用 tip1 字号，menu 用 tip1 字号带悬停背景）；项间距 32px/24px/16px 对应水平模式在不同断点
- **易混淆组件区分**：与 OTab 区分——OTab 有底部指示器下划线且切换面板内容，OAnchor 无面板、仅做页内锚点跳转；与 OMenu 区分——OMenu 是导航菜单有子菜单弹出，OAnchor 仅做页内定位

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OAnchor, OAnchorItem } from '@opensig/opendesign';
</script>
```

### OAnchor Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| layout | `AnchorDirectionT` | `'h'` / `'v'` | `'v'` | 锚点方向，水平或垂直 |
| size | `AnchorSizeT` | `'medium'` / `'small'` / `'menu'` | `'medium'` | 尺寸风格，仅垂直模式支持 |
| container | `string \| HTMLElement \| Window` | CSS 选择器 / DOM 元素 / Window | `window` | 滚动监听容器 |
| bounds | `number` | — | `5` | 锚点激活判定边界（px） |
| targetOffset | `number` | — | `0` | 目标元素距容器顶部偏移量（px） |
| changeHash | `boolean` | — | `true` | 点击锚点时是否改变浏览器 hash |

### OAnchor Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| change | `(link: string)` | 激活的锚点项变化时 |
| ~~click~~ | `(ev: MouseEvent, link?: string)` | ~~已废弃，计划 1.2.0 移除~~ |

### OAnchor Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 整个锚点项列表区域 | 无 |

### OAnchorItem Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| title | `string` | — | `''` | 锚点标题 |
| href | `string` | — | **必填** | 跳转目标（带 # 前缀，如 `#section1`） |
| observeHref | `string` | — | — | 滚动监听目标（带 # 前缀），不传则监听 href |
| target | `AnchorTargetT` | `'_blank'` / `'_parent'` / `'_self'` / `'_top'` | `'_self'` | 链接打开方式 |
| disabled | `boolean` | — | `false` | 是否禁用 |

### OAnchorItem Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| item-click | `(event: MouseEvent)` | 点击锚点项时 |

### OAnchorItem Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| title | — | 始终 | 标题文本区域 | `{{ title }}` |
| default | — | 仅垂直模式（`layout="v"`） | 子项嵌套区域 | 无 |

### 插槽层级关系

```
OAnchor default
└── OAnchorItem
    ├── title（替换标题文字）
    └── default（嵌套子级，仅垂直模式生效）
        └── OAnchorItem（可继续嵌套）
```

### 典型使用场景与调用模板

**场景 1：基础垂直锚点导航**
适用于：侧边栏文章目录导航
```vue
<OAnchor container="#content" :target-offset="10">
  <OAnchorItem href="#section1" title="第一章" />
  <OAnchorItem href="#section2" title="第二章" />
  <OAnchorItem href="#section3" title="第三章" />
</OAnchor>
```

**场景 2：多级嵌套锚点**
适用于：层级较深的文档目录
```vue
<OAnchor container="#content">
  <OAnchorItem href="#chapter1" title="第一章">
    <OAnchorItem href="#section1-1" title="1.1 概述" />
    <OAnchorItem href="#section1-2" title="1.2 详情">
      <OAnchorItem href="#section1-2-1" title="1.2.1 子节" />
    </OAnchorItem>
  </OAnchorItem>
  <OAnchorItem href="#chapter2" title="第二章" />
</OAnchor>
```

**场景 3：水平锚点（带吸顶）**
适用于：页面顶部导航条，父容器需设置 `overflow-y: auto/scroll`
```vue
<div id="page-container" style="height: 100vh; overflow-y: auto;">
  <OAnchor layout="h" container="#page-container">
    <OAnchorItem href="#block1" title="区块1" />
    <OAnchorItem href="#block2" title="区块2" />
    <OAnchorItem href="#block3" title="区块3" />
  </OAnchor>
  <div id="block1">...</div>
  <div id="block2">...</div>
  <div id="block3">...</div>
</div>
```

**场景 4：自定义标题插槽**
适用于：标题需要图标或复杂内容
```vue
<OAnchor container="#wrap">
  <OAnchorItem href="#section1">
    <template #title>
      <span style="display: flex; align-items: center;">
        第一节 <OIconLink style="margin-left: 4px;" />
      </span>
    </template>
  </OAnchorItem>
</OAnchor>
```

**场景 5：跳转地址与监听地址分离**
适用于：点击跳转到外部链接，但滚动激活关联本页区域
```vue
<OAnchor container="#wrap">
  <OAnchorItem
    href="https://docs.openeuler.org"
    observe-href="#local-section"
    title="外部链接（监听本地区域）"
  />
</OAnchor>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 侧边文档导航 | `container="#content"` + `size="medium"` | 最常见用法 |
| 紧凑侧边导航 | `container="#content"` + `size="small"` | 文字更小、间距更紧凑 |
| 菜单式导航 | `size="menu"` | 子项有悬停背景色，适合左侧菜单 |
| 页面顶部横向导航 | `layout="h"` + `container="#page"` | 支持吸顶和溢出滚动 |
| 精确跳转但宽松激活 | `:target-offset="10"` + `:bounds="100"` | 跳到顶部 10px，但滚到 110px 才激活 |
| 不修改 URL hash | `:change-hash="false"` | 适合 SPA 自行管理路由 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

**通用变量**

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--anchor-item-min-width` | `144px` | 锚点项最小宽度（水平模式下为 `unset`） |
| `--anchor-item-link-padding-h` | `8px` | 锚点项水平内边距（水平模式为 `0`） |
| `--anchor-item-link-padding-v` | `8px` | 锚点项垂直内边距 |
| `--anchor-item-link-text-size` | `var(--o-font_size-text1)` | 锚点项文字字号 |
| `--anchor-line-width` | `1px` | 左侧竖线宽度 |
| `--anchor-indicator-width` | `2px` | 选中指示器宽度 |

**水平模式（layout="h"）特有变量**

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--anchor-item-gap` | `32px` | 锚点项之间的间距 |

**使用示例**：
```vue
<!-- 减小水平模式的锚点间距 -->
<OAnchor layout="h" style="--anchor-item-gap: 16px">
  <OAnchorItem href="#a" title="章节1" />
  <OAnchorItem href="#b" title="章节2" />
</OAnchor>
```

### 响应式行为表

| 维度 | ≤840px | 841–1200px | 1201–1680px | >1680px |
|------|--------|-----------|-------------|---------|
| 垂直模式字号 | 不变 | 缩小（tip1/tip2） | 标准（text1/tip1） | 标准 |
| 水平模式项间距 | 16px | 24px | 32px | 32px |
| 水平模式项内边距 | — | 9px | 12px | 12px |

### CSS 变量定制

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `--anchor-content-max-width` | 水平模式内容区最大宽度 | `unset` |
| `--anchor-z-index` | 水平模式 z-index | `initial` |
| `--anchor-offset-top` | 水平模式吸顶偏移 | `0` |
| `--anchor-item-max-row` | 标题最大行数（超出省略） | `2`（水平模式为 `1`） |

### 组件布局结构

**垂直模式（layout="v"）— 桌面端 >1200px**
```yaml
layout:
  direction: horizontal
  regions:
    - name: anchor-line
      direction: vertical
      children:
        - { type: component, name: anchor-indicator }  # 滑动高亮条，绝对定位
      width: 1px  # --anchor-line-width
    - name: anchor-items
      direction: vertical
      gap: 0
      children:
        - type: group  # 每个 OAnchorItem
          direction: horizontal
          children:
            - type: group  # anchor-item-lines
              direction: vertical
              children:
                - { type: component, name: anchor-item-top-line }
                - { type: component, name: anchor-item-circle }  # 8px 圆点
                - { type: component, name: anchor-item-bottom-line }
            - { type: slot, name: title }  # 标题文字，padding 8px，font-size text1
          children_nested:  # 子级 OAnchorItem（缩进 12px）
            - { type: slot, name: default }
```

**垂直模式 — ≤1200px**
```yaml
# 与桌面端结构一致，字号和间距变化：
# --anchor-item-link-text-size: tip1 (原 text1)
# --anchor-item-sub-link-text-size: tip2 (原 tip1)
# --anchor-item-link-padding-v: 5px (原 8px)
```

**水平模式（layout="h"）— 桌面端 >1200px**
```yaml
layout:
  direction: horizontal
  padding: [0, 0]
  background: var(--o-color-fill2)
  regions:
    - name: anchor-items
      direction: horizontal
      gap: 32px  # --anchor-item-gap
      overflow-x: auto  # 溢出时可横向滚动
      children:
        - type: group  # 每个 OAnchorItem（无圆点装饰）
          children:
            - { type: slot, name: title }  # padding-v 12px，单行，font-size text1
  overlays:
    - name: overflow-mask-left
      trigger: 内容左溢出时显示
      position: left
    - name: overflow-mask-right
      trigger: 内容右溢出时显示
      position: right
```

**水平模式 — ≤1200px**
```yaml
# gap: 24px (原 32px)
# --anchor-item-link-padding-v: 9px (原 12px)
```

**水平模式 — ≤840px**
```yaml
# gap: 16px (原 24px)
```

### 设计稿识别指南

**视觉特征指纹**

1. 左侧有 1px 竖线 + 8px 圆点装饰，右侧为多行可点击文字链接，子项有缩进 → 匹配 OAnchor（垂直模式）
2. 单行水平排列的文字标签，底部无下划线指示器，有背景色填充容器 → 匹配 OAnchor（水平模式）
3. 多级缩进的侧边文字列表，无展开/折叠箭头 → 匹配 OAnchor（嵌套垂直模式）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 文字大小 | text1 (14px) | size | `'medium'` | 垂直模式默认 |
| 文字大小 | tip1 (12px) | size | `'small'` | 紧凑尺寸 |
| 文字大小 | tip1 + 悬停背景 | size | `'menu'` | 菜单混合模式 |
| 排列方向 | 垂直列表 | layout | `'v'` | — |
| 排列方向 | 水平单行 | layout | `'h'` | — |
| 项间距 | 32px | layout | `'h'`（>1200px） | 默认样式 |
| 激活色 | `--o-color-primary1` | — | — | 默认样式，非 prop 控制 |
| 指示器宽度 | 2px | — | — | 默认样式，非 prop 控制 |
| 圆点大小 | 8px | — | — | 默认样式，非 prop 控制 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OAnchor（水平） | OTab | OTab 底部有指示器下划线且切换面板内容；OAnchor 无面板，仅页内锚点跳转 |
| OAnchor（垂直） | OMenu | OMenu 有子菜单弹出/展开箭头，支持多级导航路由；OAnchor 仅做页内定位，通过圆点+竖线装饰 |
| OAnchor（垂直） | OStep | OStep 有步骤编号/图标、有完成/进行中/等待状态；OAnchor 仅高亮当前位置 |

