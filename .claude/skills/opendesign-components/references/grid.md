> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OGrid 栅格布局

## Part A：设计理解卡

OGrid 是基于 Flex 布局的栅格系统，用于页面内容的多列排版和响应式布局。包含 ORow（行容器）和 OCol（列容器）。核心特点是支持按断点设置不同的间距和列宽。

### ORow 行容器

**gap / gapX / gapY**（属性）：子元素间距。gap 同时设置横向和纵向（空格分隔），gapX 单独设置横向间距，gapY 单独设置纵向间距。gapX/gapY 优先于 gap。

**justify**（属性）：主轴对齐方式。同 CSS justify-content，如 "center"、"space-between" 等。

**align**（属性）：交叉轴对齐方式。同 CSS align-items，如 "center"、"flex-start" 等。

**wrap**（属性）：是否换行。同 CSS flex-wrap。默认 "wrap"（自动换行）。

**direction**（属性）：排列方向。同 CSS flex-direction，如 "row"、"column" 等。

**inline**（属性）：是否使用 inline-flex 显示。默认 flex。

**pcS / laptop / pad / padV / phone**（属性）：各断点下的间距覆盖值。对象格式 `{ gap?, gapX?, gapY? }`。

### OCol 列容器

**flex**（属性）：列的弹性布局值。同 CSS flex。默认 "1 0 auto"（自动撑满）。常用值如 "0 0 50%" 表示占一半宽度、"1" 表示自适应。

**align**（属性）：自身在交叉轴的对齐方式。同 CSS align-self。

**pcS / laptop / pad / padV / phone**（属性）：各断点下的 flex 覆盖值。对象格式 `{ flex: string }`。

📱 **响应式行为**：本组件本身就是响应式布局工具。通过 pcS（≤1680px）、laptop（≤1440px）、pad（≤1200px）、padV（≤840px）、phone（≤600px）属性，可以在不同断点设置不同的间距和列宽。

🧩 **布局结构**：ORow（`.o-row`）为 flex 容器，通过负 margin 抵消子元素的 padding 实现间距（非 CSS gap）。OCol（`.o-col`）通过 CSS 变量 `--col-flex` 控制弹性布局。间距通过 `--row-gap-x`/`--row-gap-y` 传递给子元素的 padding-left/right 和 margin-bottom。各断点通过媒体查询切换对应的 CSS 变量。
```yaml
# 简化结构摘要（完整版见 Part B）
ORow: display flex, gap via negative-margin + child-padding
OCol: flex: --col-flex, 断点覆盖 --col-{bp}-flex
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：多列等分或不等分排列的内容区域，列间有均匀间距，不同屏幕宽度下列数和间距变化
- **Token → Prop 映射**：等分三列=flex:"0 0 33.33%"、等分两列=flex:"0 0 50%"、自适应=flex:"1"；列间距=gap/gapX、行间距=gapY；小屏变单列=phone:{flex:"0 0 100%"}
- **易混淆组件区分**：与 OForm(layout=h) 区别——Grid 是通用多列栅格系统无语义，Form 专用于表单标签-控件对齐；与 CSS Grid 区别——OGrid 基于 Flex 实现，通过 prop 控制断点响应式，无需手写媒体查询

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { ORow, OCol } from '@opensig/opendesign';
</script>
```

### ORow Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| inline | `boolean` | — | `false` | 是否 inline-flex |
| align | `string` | `'center'` / `'flex-start'` / `'flex-end'` / `'stretch'` / `'baseline'` / `'inherit'` / `'initial'` | — | 交叉轴对齐 |
| justify | `string` | `'center'` / `'flex-start'` / `'flex-end'` / `'space-between'` / `'space-around'` / `'space-evenly'` / `'inherit'` / `'initial'` | — | 主轴对齐 |
| wrap | `string` | `'nowrap'` / `'wrap'` / `'wrap-reverse'` / `'initial'` / `'inherit'` | `'wrap'` | 换行方式 |
| direction | `string` | `'row'` / `'row-reverse'` / `'column'` / `'column-reverse'` | — | 排列方向 |
| gap | `string` | CSS 值 | — | 间距（横纵） |
| gapX | `string` | CSS 值 | — | 横向间距 |
| gapY | `string` | CSS 值 | — | 纵向间距 |
| pcS | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤1680px 间距 |
| laptop | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤1440px 间距 |
| pad | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤1200px 间距 |
| padV | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤840px 间距 |
| phone | `RowMediaT` | `{ gap?, gapX?, gapY? }` | — | ≤600px 间距 |

### OCol Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| flex | `string` | CSS flex 值 | `'1 0 auto'` | 弹性布局值 |
| align | `string` | `'center'` / `'flex-start'` / `'flex-end'` / `'stretch'` / `'baseline'` / `'inherit'` / `'initial'` | — | 自身交叉轴对齐 |
| pcS | `ColMediaT` | `{ flex: string }` | — | ≤1680px flex |
| laptop | `ColMediaT` | `{ flex: string }` | — | ≤1440px flex |
| pad | `ColMediaT` | `{ flex: string }` | — | ≤1200px flex |
| padV | `ColMediaT` | `{ flex: string }` | — | ≤840px flex |
| phone | `ColMediaT` | `{ flex: string }` | — | ≤600px flex |

### Events 表

本组件无事件。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| ORow default | — | 始终 | 列列表 | 无 |
| OCol default | — | 始终 | 列内容 | 无 |

### 典型使用场景与调用模板

**场景 1：基础两列布局**
适用于：左右分栏
```vue
<ORow gap="24px">
  <OCol flex="0 0 50%">左侧内容</OCol>
  <OCol flex="0 0 50%">右侧内容</OCol>
</ORow>
```

**场景 2：响应式三列变一列**
适用于：桌面三列、移动端一列
```vue
<ORow gap="24px" :pad-v="{ gap: '16px' }">
  <OCol flex="0 0 33.33%" :pad-v="{ flex: '0 0 100%' }">
    卡片 1
  </OCol>
  <OCol flex="0 0 33.33%" :pad-v="{ flex: '0 0 100%' }">
    卡片 2
  </OCol>
  <OCol flex="0 0 33.33%" :pad-v="{ flex: '0 0 100%' }">
    卡片 3
  </OCol>
</ORow>
```

**场景 3：居中对齐**
适用于：垂直居中的行
```vue
<ORow align="center" justify="center" gap="16px">
  <OCol flex="0 0 auto">项目 A</OCol>
  <OCol flex="0 0 auto">项目 B</OCol>
</ORow>
```

**场景 4：自适应列 + 固定列**
适用于：侧边栏 + 主内容
```vue
<ORow gap="24px">
  <OCol flex="0 0 240px">侧边栏</OCol>
  <OCol flex="1">主内容（自适应）</OCol>
</ORow>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 等分多列 | `flex="0 0 {百分比}"` | 如 33.33% 三列 |
| 响应式列宽 | `flex` + `:pad-v` + `:phone` | 断点下覆盖 |
| 间距响应式 | `gap` + `:pad` + `:phone` | 断点下缩小间距 |
| 自适应宽度 | `flex="1"` | 占满剩余空间 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--flex-gap-x` | `0px` | ORow 的横向间距基础值（`.o-flex` 根级变量） |
| `--flex-gap-y` | `0px` | ORow 的纵向间距基础值（`.o-flex` 根级变量） |

> 通常通过 `gap`/`gapX`/`gapY` prop 直接设置间距，CSS 变量仅在需要直接控制底层布局时使用。

### 响应式行为表

通过属性直接控制，无内置媒体查询样式。断点对应关系：

| 属性 | 断点 | 说明 |
|------|------|------|
| pcS | ≤1680px | 大屏 |
| laptop | ≤1440px | 笔记本 |
| pad | ≤1200px | 平板横屏 |
| padV | ≤840px | 平板竖屏 |
| phone | ≤600px | 手机 |

### 组件布局结构

```yaml
# ORow 行容器
root: div.o-row
  display: flex
  flex-wrap: props.wrap ("wrap" 默认)
  flex-direction: props.direction
  justify-content: props.justify
  align-items: props.align
  style:
    # 间距通过负 margin + 子元素 padding 实现（非 CSS gap）
    --row-gap-x: gap 横向值 (props.gapX 优先)
    --row-gap-y: gap 纵向值 (props.gapY 优先)
    --col-gap-x: calc(--row-gap-x / 2)  # 每侧一半
    --col-gap-y: --row-gap-y
    --row-shift-x: calc(-1 * --col-gap-x)
    --row-shift-y: calc(-1 * --col-gap-y)
    margin-left: --row-shift-x  # 负 margin 抵消首尾列的 padding
    margin-right: --row-shift-x
    margin-bottom: --row-shift-y  # 负 margin 抵消最后一行的 margin-bottom
  child-style: # 所有直接子元素
    padding-left: --col-gap-x
    padding-right: --col-gap-x
    margin-bottom: --col-gap-y
    flex: 1 0 auto (默认撑满)
  classes:  # 按断点属性动态添加
    - .o-row-pc-s: !!props.pcS
    - .o-row-laptop: !!props.laptop
    - .o-row-pad: !!props.pad
    - .o-row-pad-v: !!props.padV
    - .o-row-phone: !!props.phone
  children:
    - slot-default (OCol 列表)

# OCol 列容器
root: div.o-col
  flex: --col-flex (props.flex, 默认 "1 0 auto")
  align-self: props.align
  style:
    --col-flex: props.flex
    --col-pc-s-flex: props.pcS?.flex
    --col-laptop-flex: props.laptop?.flex
    --col-pad-flex: props.pad?.flex
    --col-pad-v-flex: props.padV?.flex
    --col-phone-flex: props.phone?.flex
  classes:
    - .o-col-pc-s: !!props.pcS
    - .o-col-laptop: !!props.laptop
    - .o-col-pad: !!props.pad
    - .o-col-pad-v: !!props.padV
    - .o-col-phone: !!props.phone
  children:
    - slot-default

# 默认 CSS 变量
.o-flex:
  --flex-gap-x: 0px
  --flex-gap-y: 0px

# 媒体查询断点（按断点 class 条件生效）
media-queries:
  "@media (max-width: 1680px)":
    .o-row-pc-s:
      --col-gap-x: calc(--row-pc-s-gap-x / 2)
      --col-gap-y: --row-pc-s-gap-y
    .o-col-pc-s:
      flex: --col-pc-s-flex
  "@media (max-width: 1440px)":
    .o-row-laptop:
      --col-gap-x: calc(--row-laptop-gap-x / 2)
      --col-gap-y: --row-laptop-gap-y
    .o-col-laptop:
      flex: --col-laptop-flex
  "@media (max-width: 1200px)":
    .o-row-pad:
      --col-gap-x: calc(--row-pad-gap-x / 2)
      --col-gap-y: --row-pad-gap-y
    .o-col-pad:
      flex: --col-pad-flex
  "@media (max-width: 840px)":
    .o-row-pad-v:
      --col-gap-x: calc(--row-pad-v-gap-x / 2)
      --col-gap-y: --row-pad-v-gap-y
    .o-col-pad-v:
      flex: --col-pad-v-flex
  "@media (max-width: 600px)":
    .o-row-phone:
      --col-gap-x: calc(--row-phone-gap-x / 2)
      --col-gap-y: --row-phone-gap-y
    .o-col-phone:
      flex: --col-phone-flex

# 间距实现原理
# gap prop 解析："24px" → gapX=24px, gapY=24px
#                "24px 16px" → gapX=24px, gapY=16px
# gapX/gapY prop 优先于 gap 中解析的值
# 每个断点 prop (pcS/laptop/pad/padV/phone) 同理
```

### 设计稿识别指南

**视觉特征指纹**

1. 多列等分或不等分排列的内容区域，列之间有均匀的横向间距，行之间有均匀的纵向间距
2. 间距通过子元素的 padding 实现（非 CSS gap），ORow 使用负 margin 抵消首尾列多余的 padding
3. 不同屏幕宽度下列数和间距可变化（如桌面三列→平板两列→手机单列）
4. ORow 默认 flex-wrap: wrap，子元素超出宽度时自动换行
5. OCol 默认 flex: 1 0 auto，即自动撑满可用空间

**设计 Token → Prop 值映射表**

| 设计特征 | Token / 视觉值 | Prop (ORow) | Prop 值 |
|---------|---------------|-------------|--------|
| 列间距 24px | --row-gap-x | `gap` 或 `gapX` | `"24px"` |
| 行间距 16px | --row-gap-y | `gap` 或 `gapY` | `"16px"` |
| 横纵间距相同 | --row-gap-x/y | `gap` | `"24px"` |
| 横纵间距不同 | 分别设置 | `gap` | `"24px 16px"` (横 纵) |
| 居中对齐 | align-items: center | `align` | `"center"` |
| 两端对齐 | justify-content: space-between | `justify` | `"space-between"` |
| 不换行 | flex-wrap: nowrap | `wrap` | `"nowrap"` |
| 纵向排列 | flex-direction: column | `direction` | `"column"` |
| 小屏间距缩小 | 断点覆盖 | `phone` / `padV` 等 | `{ gap: "16px" }` |

| 设计特征 | Token / 视觉值 | Prop (OCol) | Prop 值 |
|---------|---------------|-------------|--------|
| 等分三列 | flex: 0 0 33.33% | `flex` | `"0 0 33.33%"` |
| 等分两列 | flex: 0 0 50% | `flex` | `"0 0 50%"` |
| 固定宽度列 | flex: 0 0 240px | `flex` | `"0 0 240px"` |
| 自适应撑满 | flex: 1 | `flex` | `"1"` |
| 小屏变单列 | 断点覆盖 | `phone` | `{ flex: "0 0 100%" }` |
| 平板变两列 | 断点覆盖 | `padV` | `{ flex: "0 0 50%" }` |

**易混淆组件区分表**

| 对比组件 | 相似点 | 区分方法 |
|---------|-------|---------|
| OForm (layout=h) | 都可实现左右排列 | Grid 是通用多列栅格系统，无表单语义；Form 专用于标签-控件对齐，有校验系统和 submit 事件 |
| CSS Grid / Flexbox | 都实现多列布局 | OGrid 封装了断点响应式 prop（pcS/laptop/pad/padV/phone），无需手写媒体查询；纯 CSS 需自行处理 |
| ORow + 普通 div | 都可包含子元素 | OCol 提供断点级 flex 覆盖，普通 div 无内置响应式切换能力 |
