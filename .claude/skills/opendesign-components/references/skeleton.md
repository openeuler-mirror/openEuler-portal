> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OSkeleton 骨架屏

## Part A：设计理解卡

OSkeleton 是骨架屏组件，在内容加载完成前展示占位图形，提升用户等待体验。包含 OSkeleton（容器）、OSkeletonText（文本占位）、OSkeletonAvatar（头像占位）、OSkeletonFigure（图片占位）。

### 显示控制

**loading**（属性）：是否显示骨架屏。true 时显示骨架占位，false 时显示真实内容（default 插槽）。默认 true。

### 动画

**animation**（属性）：是否显示加载动画（闪烁效果）。默认关闭。

### 文本行数

**rows**（属性）：默认骨架屏的文本行数（使用内置 OSkeletonText）。默认 3 行。

### 插槽区域

**template 插槽**（插槽）：自定义骨架屏布局。使用后 rows 属性失效，可自由组合 OSkeletonText、OSkeletonAvatar、OSkeletonFigure。

**default 插槽**（插槽）：加载完成后显示的真实内容。仅在 loading 为 false 时渲染。

---

### OSkeletonText 文本占位

**rows**（属性）：文本行数。默认 3。

### OSkeletonAvatar 头像占位

**size**（属性）：头像尺寸。"large"、"medium"、"small"、"mini"。默认 medium。

**round**（属性）：圆角值。默认 "pill"（圆形）。

### OSkeletonFigure 图片占位

纯图片占位区域，无特殊属性。

📱 **响应式行为**：在笔记本尺寸及以下（≤1440px），头像尺寸（large/medium/small）缩小；在平板横屏及以下（≤1200px），medium 头像进一步缩小。

🧩 **布局结构**：骨架屏为垂直堆叠容器，loading=true 时显示 template 插槽区域（内部自由组合 OSkeletonText、OSkeletonAvatar、OSkeletonFigure），loading=false 时显示 default 插槽的真实内容。OSkeletonText 为多行水平条形占位，最后一行宽度 50%；OSkeletonAvatar 为圆形/方形占位块；OSkeletonFigure 为矩形图片占位块。动画模式下显示水平渐变闪烁效果。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: vertical
regions: [template(骨架占位: figure+avatar+text), default(真实内容)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：灰色/浅色矩形条（多行、最后一行较短）+ 圆形或方形色块 + 矩形图片占位区域 + 可能有闪烁渐变动画 → 匹配 OSkeleton；页面中大面积灰色占位图形排列 → 匹配 OSkeleton
- **Token → Prop 映射**：灰色静态占位 → animation=false（默认）；带渐变闪烁 → animation=true；圆形头像色块 → OSkeletonAvatar round="pill"；方形头像色块 → OSkeletonAvatar round="8px"；大圆 80px → size="large"，中圆 64px → size="medium"，小圆 40px → size="small"
- **易混淆组件区分**：与 OLoading 区分——OLoading 是旋转指示器/转圈动画，OSkeleton 是内容形状占位；与空状态区分——空状态有图标+文字提示，骨架屏是灰色条/块模拟内容形状

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OSkeleton, OSkeletonText, OSkeletonAvatar, OSkeletonFigure } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type SkeletonAvatarSizeT = 'large' | 'medium' | 'small' | 'mini';
```

### OSkeleton Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| loading | `boolean` | — | `true` | 是否显示骨架屏 |
| animation | `boolean` | — | `false` | 闪烁动画 |
| rows | `number` | — | `3` | 文本行数 |

### OSkeletonText Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| rows | `number` | — | `3` | 文本行数 |

### OSkeletonAvatar Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| size | `SkeletonAvatarSizeT` | `'large'` / `'medium'` / `'small'` / `'mini'` | `'medium'` | 尺寸 |
| round | `RoundT` | `'pill'` / CSS 值 | `'pill'` | 圆角 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| template | — | loading 为 true 时 | 骨架屏布局 | `<OSkeletonText :rows />` |
| default | — | loading 为 false 时 | 真实内容 | 无 |

### 插槽层级关系

```
OSkeleton
├── template（loading=true 时显示）
│   ├── OSkeletonText
│   ├── OSkeletonAvatar
│   └── OSkeletonFigure
└── default（loading=false 时显示）
```

### 典型使用场景与调用模板

**场景 1：基础文本骨架**
适用于：文章加载占位
```vue
<OSkeleton :loading="loading" :rows="4">
  <p>加载完成的文本内容</p>
</OSkeleton>
```

**场景 2：带头像的骨架**
适用于：用户信息卡片
```vue
<OSkeleton :loading="loading" animation>
  <template #template>
    <OSkeletonAvatar size="large" />
    <OSkeletonText :rows="3" />
  </template>
  <div>用户信息内容</div>
</OSkeleton>
```

**场景 3：带图片占位的骨架**
适用于：图文内容加载
```vue
<OSkeleton :loading="loading" animation>
  <template #template>
    <OSkeletonFigure />
    <OSkeletonAvatar size="large" />
    <OSkeletonText :rows="3" />
  </template>
  <div>图文内容</div>
</OSkeleton>
```

**场景 4：受控切换**
适用于：手动控制加载状态
```vue
<script setup>
import { ref } from 'vue';
const loading = ref(true);
</script>
<template>
  <OSwitch v-model="loading" />
  <OSkeleton :loading="loading" animation>
    <template #template>
      <OSkeletonFigure />
      <OSkeletonText :rows="2" />
    </template>
    <p>真实内容</p>
  </OSkeleton>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 基础占位 | `:loading` + `:rows` | 纯文本骨架 |
| 带动画 | `animation` | 闪烁效果 |
| 自定义布局 | `#template` 插槽 | 自由组合子组件 |
| 圆角头像 | OSkeletonAvatar `round="pill"` | 默认圆形 |
| 方形头像 | OSkeletonAvatar `round="8px"` | 方角 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--skeleton-bg-color` | `var(--o-color-control4-light)` | 骨架块背景色（静态）；animation=true 时为渐变色 |
| `--skeleton-item-gap` | `24px` | 骨架项目之间的间距 |
| `--skeleton-width` | 组件类型决定（文本 100%，图片 320px，头像按 size） | 骨架块宽度 |
| `--skeleton-height` | 组件类型决定（文本为 `var(--o-font_size-text1)`，图片 180px） | 骨架块高度 |
| `--skeleton-radius` | `var(--o-radius_control-xs)` | 骨架块圆角 |
| `--skeleton-last-line-width` | `50%` | 文本占位最后一行的宽度（OSkeletonText） |
| `--skeleton-line-gap` | `calc(var(--o-line_height-text1) - var(--o-font_size-text1))` | 文本行间距（OSkeletonText） |

**使用示例**：
```vue
<OSkeleton :loading="true" style="--skeleton-bg-color: #e0e0e0; --skeleton-item-gap: 16px" />
```

### 响应式行为表
|------|---------|-------------|---------|
| large 头像 | 64px | 64px | 标准 |
| medium 头像 | 40px | 48px | 标准 |
| small 头像 | 32px | 32px | 标准 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  direction: vertical
  class: o-skeleton
  condition: loading=true 时显示骨架，否则显示 default 插槽
  regions:
    - name: template
      type: slot
      description: 骨架占位区域，自由组合子组件
      default: OSkeletonText(:rows)
      children:
        - name: OSkeletonFigure
          width: 320px
          height: 180px
          border-radius: var(--o-radius_control-xs)
        - name: OSkeletonAvatar
          shape: circle(pill) | square
          variants:
            large: { width: 80px, height: 80px }
            medium: { width: 64px, height: 64px }
            small: { width: 40px, height: 40px }
            mini: { width: 24px, height: 24px }
        - name: OSkeletonText
          rows: 3  # 默认
          line-height: var(--o-font_size-text1)
          last-line-width: 50%
          line-gap: "calc(line_height-text1 - font_size-text1)"
    - name: default
      type: slot
      condition: loading=false
      description: 真实内容
  animation:
    type: gradient-shimmer
    direction: "90deg"
    colors: [control2-light, control1-light, control2-light]
    condition: animation=true
```

**≤1440px**
```yaml
# large 头像: 64px; medium 头像: 48px; small 头像: 32px
```

**≤1200px**
```yaml
# medium 头像: 40px
```

### 设计稿识别指南

**视觉特征指纹**

1. 多行灰色水平条形（最后一行较短约 50%）→ 匹配 OSkeletonText
2. 圆形或方形灰色色块 + 附近有灰色文本行 → 匹配 OSkeleton（头像+文本组合）
3. 大面积矩形灰色色块（约 320x180）→ 匹配 OSkeletonFigure
4. 上述元素组合排列 + 可能有渐变闪烁动画 → 匹配 OSkeleton 整体

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 背景色 | 静态灰色 `--o-color-control4-light` | animation | `false` | 默认 |
| 背景色 | 渐变闪烁动画 | animation | `true` | — |
| 圆形色块 80px | — | OSkeletonAvatar size | `'large'` | — |
| 圆形色块 64px | — | OSkeletonAvatar size | `'medium'` | 默认 |
| 圆形色块 40px | — | OSkeletonAvatar size | `'small'` | — |
| 圆形色块 24px | — | OSkeletonAvatar size | `'mini'` | — |
| 色块全圆角 | 圆形 | OSkeletonAvatar round | `'pill'` | 默认 |
| 色块方角 | 小圆角 | OSkeletonAvatar round | CSS 值如 `'8px'` | — |
| 文本行数 | 可数条数 | rows | 数字 | 默认 3 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OSkeleton | OLoading | OLoading 是旋转/转圈动画指示器，OSkeleton 是模拟内容形状的灰色占位块 |
| OSkeleton | 空状态（Empty） | 空状态有明确的图标+文字提示"暂无数据"，骨架屏是灰色条/块模拟内容轮廓 |
| OSkeletonAvatar | OAvatar | OAvatar 显示真实图片/文字，OSkeletonAvatar 是纯灰色圆形/方形占位 |

