> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OProgress 进度条

## Part A：设计理解卡

OProgress 是进度条组件，用于展示操作进度或数据占比。支持线形和环形两种形态、两种尺寸、四种颜色，可自定义线宽、轨道宽度、格式化文字、内部文字等。

### 形态

**variant**（属性）：进度条类型。"line" 线形水平进度条、"circle" 环形进度条。默认 line。

### 进度

**percentage**（属性）：进度百分比，范围 0-100。默认 0。

### 外观

**size**（属性）：进度条尺寸。"medium" 中号、"small" 小号。默认 medium。中号线宽默认 8px，小号默认 4px。

**color**（属性）：进度条颜色。"primary" 品牌色、"success" 成功绿色、"warning" 警告橙色、"danger" 危险红色。默认 primary。

**strokeWidth**（属性）：进度条线宽（px）。不传时跟随 size 自动设置。

**trackWidth**（属性）：轨道宽度。线形时支持数字（px）和字符串（CSS 值）；环形时仅支持数字，同时决定环形的直径。

### 文字

**showLabel**（属性）：是否显示进度文字。默认显示。

**labelInside**（属性）：仅环形进度条（variant="circle"）可用，不适用于线形。

**format**（属性）：自定义格式化进度文字的函数，接收 percentage 返回显示字符串。默认显示 "{percentage}%"。

### 插槽区域

**default 插槽**（插槽）：替换进度文字。可获取当前 percentage。使用后 format 属性失效。

**icon 插槽**（插槽）：替换整个文字区域为图标。可获取当前 percentage。使用后 default 插槽和 format 属性失效。适合用状态图标替换百分比文字。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），medium 尺寸的进度文字缩小。

🧩 **布局结构**：线形进度条水平排列，从左到右为：轨道区（含进度条填充）、标签区（百分比文字或图标，在右侧显示）。环形进度条为 SVG 圆环，中心叠加标签文字（始终在内部，无需额外 prop）。轨道圆角等于线宽，标签间距 8px。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: horizontal  # 线形; 环形为层叠居中
regions: [track(轨道+进度条), label(百分比文字/图标)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：水平细长条形 + 左侧有颜色填充的进度指示 + 右侧百分比文字 → 匹配 OProgress（line）；圆环形 + 内部居中百分比文字 → 匹配 OProgress（circle）
- **Token → Prop 映射**：蓝色/品牌色进度条 → color="primary"；绿色 → color="success"；橙色 → color="warning"；红色 → color="danger"；线宽 8px → size="medium"（默认）；线宽 4px → size="small"；圆环形 → variant="circle"
- **易混淆组件区分**：与 OSlider 区分——OSlider 是可拖拽的滑动输入控件有拖拽手柄，OProgress 是只读的进度展示无交互；与 loading 动画区分——OProgress 显示具体百分比数值，loading 是不确定进度的旋转动画

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OProgress } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type ProgressVariantT = 'line' | 'circle';
type ProgressSizeT = 'medium' | 'small';
type ProgressColorT = 'primary' | 'success' | 'warning' | 'danger';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| variant | `ProgressVariantT` | `'line'` / `'circle'` | `'line'` | 类型 |
| percentage | `number` | 0-100 | `0` | 百分比 |
| strokeWidth | `number` | — | medium:8, small:4 | 线宽 |
| size | `ProgressSizeT` | `'medium'` / `'small'` | `'medium'` | 尺寸 |
| color | `ProgressColorT` | `'primary'` / `'success'` / `'warning'` / `'danger'` | `'primary'` | 颜色 |
| trackWidth | `number \| string` | — | line:auto, circle:medium:120/small:60 | 轨道宽度 |
| format | `(percentage: number) => string` | — | `(p) => p + '%'` | 格式化函数 |
| showLabel | `boolean` | — | `true` | 显示文字 |
| labelInside | `boolean` | — | `false` | 文字在内部（仅 circle） |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | `{ percentage: number }` | showLabel 为 true 时 | 进度文字 | `format(percentage)` |
| icon | `{ percentage: number }` | showLabel 为 true 时 | 整个文字区域（含 default） | default 插槽内容 |

### 插槽层级关系

```
icon（使用后 default 失效）
└── default
```

### 典型使用场景与调用模板

**场景 1：基础线形进度条**
适用于：文件上传、任务进度
```vue
<OProgress :percentage="50" />
```

**场景 2：环形进度条**
适用于：统计数据、仪表盘
```vue
<OProgress variant="circle" :percentage="75" color="success" />
```

**场景 3：自定义格式化文字**
适用于：显示自定义文字
```vue
<OProgress :percentage="80" :format="(p) => p >= 100 ? '完成' : `${p}%`" />
```

**场景 4：带状态图标（环形）**
适用于：完成/失败状态展示
```vue
<OProgress :percentage="100" color="danger">
  <template #icon>
    <OIconDanger />
  </template>
</OProgress>
```

**场景 6：小号进度条**
适用于：列表项中的进度展示
```vue
<OProgress size="small" :percentage="30" :track-width="200" />
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础进度 | `:percentage` | 最简用法 |
| 环形 | `variant="circle"` + `:percentage` | 圆形进度 |
| 颜色状态 | `color="success/danger"` | 状态反馈 |
| 内部文字 | `label-inside`（仅 circle） | 环形百分比文字始终在内部 |
| 无文字 | `:show-label="false"` | 纯进度条 |
| 指定轨道宽 | `:track-width="300"` | 固定宽度 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--progress-track-bg-color` | `var(--o-color-control4)` | 轨道背景色 |
| `--progress-color` | `var(--o-color-info1)` | 文字颜色 |
| `--progress-label-gap` | `8px` | 标签与轨道间距 |
| `--progress-inner-label-color` | `var(--o-color-white)` | 内部文字颜色（labelInside 时） |
| `--progress-inner-label-gap` | `8px` | 内部文字间距 |
| `--progress-bar-bg-color` | 跟随 `color` prop | 进度条填充色（primary/success 时为 main2，warning/danger 时为对应色） |
| `--progress-circle-bar-bg-color` | 跟随 `color` prop | 环形进度条填充色 |
| `--progress-icon-color` | 跟随 `color` prop | 图标颜色 |
| `--progress-text-size` | `var(--o-font_size-text1)`（medium） | 文字字号 |
| `--progress-text-height` | `var(--o-line_height-text1)`（medium） | 文字行高 |
| `--progress-icon-size` | `var(--o-icon_size_control-m)`（medium） | 图标尺寸 |

**使用示例**：
```vue
<OProgress :percentage="60" style="--progress-track-bg-color: #eee; --progress-bar-bg-color: #7c3aed" />
```

### 响应式行为表

| 维度 | ≤1440px | >1440px |
|------|---------|---------|
| medium 文字 | tip1 | 标准 |

### 组件布局结构

**线形 variant="line" >1440px**
```yaml
layout:
  direction: horizontal
  align: center
  class: o-progress o-progress-line o-progress-{size} o-progress-{color}
  regions:
    - name: line-wrap
      direction: horizontal
      align: center
      children:
        - name: track
          height: "{strokeWidth}px"  # medium:8px, small:4px
          border-radius: "{strokeWidth}px"
          background: var(--o-color-control4)  # 轨道背景
          width: trackWidth 或 auto
          children:
            - name: bar
              width: "{percentage}%"
              border-radius: "{strokeWidth}px"
              background: var(--progress-bar-bg-color)  # 跟随 color
              children:
                - name: inner-label
                  condition: showLabel && labelInside
                  children:
                    - { type: slot, name: default }  # 默认 "{percentage}%"
        - name: label
          condition: showLabel && !labelInside
          gap: 8px  # --progress-label-gap
          children:
            - { type: slot, name: icon }  # icon 插槽优先
            - { type: slot, name: default }  # 默认 format(percentage)
  variants:
    medium: { text-size: text1, icon-size: m }
    small: { text-size: tip2, icon-size: xs }
    primary: { bar-color: var(--o-color-main2) }
    success: { bar-color: var(--o-color-main2) }
    warning: { bar-color: var(--o-color-warning1) }
    danger: { bar-color: var(--o-color-danger1) }
```

**环形 variant="circle"**
```yaml
layout:
  position: relative
  class: o-progress o-progress-circle o-progress-{size} o-progress-{color}
  regions:
    - name: circle-wrap
      children:
        - name: svg
          width/height: circleDiameter  # medium:120px, small:60px（或 trackWidth）
          children:
            - name: track-circle
              stroke: var(--o-color-control4)
              stroke-width: "{strokeWidth}"
              fill: none
            - name: bar-circle
              stroke: var(--progress-circle-bar-bg-color)  # 跟随 color
              stroke-width: "{strokeWidth}"
              stroke-dasharray: 根据 percentage 计算
              stroke-linecap: round
              transform: 旋转-90度（从顶部开始）
        - name: label
          condition: showLabel
          position: absolute center
          children:
            - { type: slot, name: icon }
            - { type: slot, name: default }  # 默认 format(percentage)
```

**≤1440px (laptop)**
```yaml
# medium: text-size tip1
```

### 设计稿识别指南

**视觉特征指纹**

1. 水平细长条 + 左侧有颜色填充表示进度 + 右侧百分比数字 → 匹配 OProgress（line）
2. 圆环 + 部分弧度有颜色填充 + 中心百分比数字 → 匹配 OProgress（circle）
3. 进度条内部嵌入百分比文字 → 匹配 OProgress（circle，label 默认在圆心）
4. 进度文字区域显示图标（如勾号/叉号）而非数字 → 匹配 OProgress（icon 插槽）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 形态 | 水平条形 | variant | `'line'` | 默认 |
| 形态 | 圆环形 | variant | `'circle'` | — |
| 进度色 | 蓝色/品牌色 | color | `'primary'` | 默认 |
| 进度色 | 绿色 | color | `'success'` | — |
| 进度色 | 橙色 | color | `'warning'` | — |
| 进度色 | 红色 | color | `'danger'` | — |
| 线宽 | 8px | size | `'medium'` | 默认；或 strokeWidth=8 |
| 线宽 | 4px | size | `'small'` | 或 strokeWidth=4 |
| 文字位置 | 右侧 | labelInside | `false` | 默认 |
| 文字位置 | 进度条内部 | labelInside | `true` | 仅 circle 模式 |
| 文字 | 无百分比文字 | showLabel | `false` | — |
| 环形直径 | 120px | trackWidth | — | medium 默认 |
| 环形直径 | 60px | trackWidth | — | small 默认 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OProgress（line） | OSlider | OSlider 有可拖拽手柄是输入控件，OProgress 是只读进度展示无交互手柄 |
| OProgress（circle） | 环形 loading | OProgress 显示具体百分比有明确进度值，loading 是不确定进度的持续旋转动画 |
| OProgress | 自定义 SVG 图表 | OProgress 是标准化组件支持 percentage/color/size 等 prop，自定义图表无统一 API |

