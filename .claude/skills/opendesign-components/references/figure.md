> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OFigure 图片

## Part A：设计理解卡

OFigure 是图片展示组件，支持宽高比控制、加载状态、悬停放大、点击预览、视频海报等丰富功能。可以作为图片容器使用，也可以渲染为链接。

### 图片源与渲染

**src**（属性）：图片资源地址。必填。

**background**（属性）：是否以 CSS 背景图形式渲染（而非 img 标签）。默认使用 img 标签。背景图模式下可能导致宽高坍塌，需显式设置尺寸。

**alt**（属性）：图片描述文字，同 img 的 alt 属性。

**fit**（属性）：图片填充方式。img 模式下对应 object-fit（cover/contain/fill/none/scale-down）；背景图模式下对应 background-size（cover/contain/auto/自定义值）。

### 宽高比

**ratio**（属性）：图片宽高比（宽/高）。设置后通过 padding-top 百分比实现固定宽高比，需确保容器有明确宽度。

### 交互

**hoverable**（属性）：鼠标悬停时图片放大效果。设置 href、preview 或 videoPoster 时自动启用，无需单独设置。默认关闭。

**preview**（属性）：点击图片后全屏预览。与 href 互斥，不可同时使用。默认关闭。

**lazyPreview**（属性）：启用预览功能但不自动响应点击，需通过组件实例的 preview() 方法手动控制预览。默认关闭。

**previewClose**（属性）：预览关闭方式。"none" 禁用关闭、"button" 点击按钮关闭、"mask" 点击遮罩关闭、"body" 点击预览图关闭。支持数组组合。电脑端默认 mask+button，平板/手机端默认 mask+button+body。

**href**（属性）：点击跳转链接。设置后组件渲染为 a 标签。与 preview 互斥。

### 视频海报

**videoPoster**（属性）：视频海报模式。开启后自动添加居中播放图标和悬停放大效果。默认关闭。

**play-icon 插槽**（插槽）：替换默认播放图标。仅视频海报模式有效。

### 加载

**lazy**（属性）：图片懒加载。img 模式下使用原生 loading="lazy"；背景图模式下使用 IntersectionObserver。可传对象配置 IntersectionObserverInit 参数。默认关闭。

**colorful**（属性）：加载完成前显示随机彩色背景。默认关闭。

### 覆盖内容

**default 插槽**（插槽）：图片上方的覆盖内容层。

**content 插槽**（插槽）：图片底部的描述区域。

**title 插槽**（插槽）：图片底部标题（在 content 插槽内部）。传入 content 插槽后 title 插槽失效。

**error 插槽**（插槽）：加载失败时的替代内容。默认显示错误图标。

### 预览区域

**preview 插槽**（插槽）：自定义预览内容（如视频播放器）。可获取当前图片地址。

**preview-extra 插槽**（插槽）：预览区域底部的附加内容（如控制按钮）。

### 事件

**load**（事件）：图片加载成功时触发。

**error**（事件）：图片加载失败时触发。

**preview**（事件）：预览显示/隐藏时触发，可获取当前可见状态。

📱 **响应式行为**：
- 播放图标随屏幕缩小：笔记本 56px → 平板 48px → 手机 40px
- 标题文字缩小：平板 text1 → 手机 tip1
- 底部描述区域内边距缩小
- 预览图片在平板及以下最大宽度为 100vw
- 预览遮罩在平板及以下变为纯黑色
- 预览关闭按钮在平板及以下移到左侧

🧩 **布局结构**：外层 `.o-figure` 为 inline-flex 容器，支持圆角裁剪和溢出隐藏。有 ratio 时内部通过 `.o-figure-wrap` 的 padding-top 百分比撑开固定宽高比空间，img 绝对定位填充；无 ratio 时 img 直接流式布局。覆盖层 `.o-figure-main` 绝对定位覆盖全区域，内含默认插槽、视频海报遮罩和底部描述内容区。预览通过 OLayer 弹层实现。
```yaml
# 简化结构摘要（完整版见 Part B）
display: inline-flex
regions: [wrap(ratio占位+img/error), main(default+mask+content), preview-layer]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：单张图片展示容器，可带固定宽高比裁剪、底部渐变描述文字、居中播放按钮（视频海报）、悬停放大效果、点击全屏预览
- **Token → Prop 映射**：图片有固定比例=ratio、底部有渐变文字=content/title 插槽、居中圆形播放按钮=videoPoster、悬停放大=hoverable、全屏遮罩预览=preview；播放按钮尺寸 64px→56px→48px→40px 随断点缩小
- **易混淆组件区分**：与 OCard(cover) 区别——Figure 是纯图片展示容器无标题/正文语义分区，Card 有封面+标题+正文的完整卡片结构；与 img 标签区别——Figure 提供宽高比控制、懒加载、预览、悬停放大等增强功能

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OFigure } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| src | `string` | — | — | 图片地址（必填） |
| ratio | `number` | — | — | 宽高比（宽/高） |
| fit | `string` | `'cover'` / `'contain'` / `'fill'` / `'none'` / `'scale-down'` | — | 填充方式 |
| alt | `string` | — | — | 图片描述 |
| background | `boolean` | — | `false` | 以背景图渲染 |
| hoverable | `boolean` | — | `false` | 悬停放大效果 |
| href | `string` | — | — | 点击跳转链接 |
| colorful | `boolean` | — | `false` | 加载前彩色背景 |
| preview | `boolean` | — | `false` | 点击预览 |
| lazyPreview | `boolean` | — | `false` | 手动控制预览 |
| videoPoster | `boolean` | — | `false` | 视频海报模式 |
| previewClose | `string \| string[]` | `'none'` / `'button'` / `'mask'` / `'body'` | PC: `['mask','button']`；移动: `['mask','button','body']` | 预览关闭方式 |
| lazy | `boolean \| IntersectionObserverInit` | — | `false` | 懒加载 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| load | — | 图片加载成功 |
| error | — | 图片加载失败 |
| preview | `(visible: boolean)` | 预览显示/隐藏 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 有 default/content/title 插槽或 videoPoster 时 | 图片上方覆盖层 | 无 |
| content | — | 有 content 或 title 插槽时 | 底部描述区域 | title 插槽内容 |
| title | — | content 插槽未使用时 | 底部标题 | 无 |
| error | — | 图片加载失败时 | 错误替代内容 | 错误图标 |
| play-icon | — | videoPoster 为 true 时 | 播放图标 | 默认播放图标 |
| preview | `{ image: string }` | preview 或 lazyPreview 为 true 时 | 预览内容 | 预览图片 |
| preview-extra | — | preview 或 lazyPreview 为 true 时 | 预览底部附加区域 | 无 |

### 插槽层级关系

```
OFigure
├── error（加载失败时替代图片）
├── default（覆盖层）
├── play-icon（视频海报播放图标）
├── content（使用后 title 失效）
│   └── title（底部标题）
└── preview（预览内容）
    └── preview-extra（预览底部附加）
```

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| preview(visible?) | `visible?: boolean` | 手动控制预览（需启用 lazyPreview） |

### 典型使用场景与调用模板

**场景 1：基础图片展示（固定宽高比）**
适用于：列表中的图片卡片
```vue
<OFigure src="/photo.jpg" :ratio="16/9" fit="cover" style="width: 100%;" />
```

**场景 2：可点击预览**
适用于：图片详情查看
```vue
<OFigure src="/photo.jpg" preview :ratio="4/3" style="width: 300px;" />
```

**场景 3：视频海报（带自定义预览）**
适用于：视频封面 + 点击播放
```vue
<OFigure src="/poster.jpg" video-poster preview>
  <template #preview>
    <video src="/video.mp4" autoplay muted controls style="width: 100%;" />
  </template>
</OFigure>
```

**场景 4：懒加载背景图**
适用于：长列表中的图片
```vue
<OFigure src="/photo.jpg" :lazy="true" background :ratio="16/9" style="width: 100%;" />
```

**场景 5：手动控制预览**
适用于：通过外部按钮触发预览
```vue
<script setup>
import { useTemplateRef } from 'vue';
const figure = useTemplateRef('figure');
</script>
<template>
  <OButton @click="figure?.preview(true)">预览</OButton>
  <OFigure ref="figure" src="/photo.jpg" lazy-preview preview-close="none">
    <template #preview-extra>
      <OButton @click="figure?.preview(false)">关闭</OButton>
    </template>
  </OFigure>
</template>
```

**场景 6：加载失败自定义**
适用于：自定义错误显示
```vue
<OFigure src="/not-exist.jpg" :ratio="16/9" style="width: 300px;">
  <template #error>加载失败</template>
</OFigure>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 固定宽高比 | `src` + `ratio` + `fit="cover"` | 最常见用法 |
| 图片预览 | `preview` | 点击全屏查看 |
| 视频封面 | `video-poster` + `preview` | 播放图标 + 预览 |
| 懒加载 | `lazy` + `background` | 长列表性能优化 |
| 彩色占位 | `colorful` | 加载前随机彩色 |
| 链接图片 | `href` + `hoverable` | 点击跳转 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--figure-padding-top` | `0px` | ratio 模式下 wrap 的 padding-top（由 ratio 计算自动覆盖，一般不手动设） |
| `--figure-fit` | `cover` | 图片填充方式（等同 object-fit / background-size） |
| `--figure-position` | `center` | 图片定位（等同 object-position / background-position） |
| `--figure-radius` | `0` | 图片容器圆角 |
| `--figure-error-bk` | `var(--o-color-control4)` | 加载失败时的背景色 |
| `--figure-error-color` | `var(--o-color-control4)` | 加载失败时错误图标的颜色 |
| `--figure-error-size` | `var(--o-icon_size_control-l)` | 加载失败时错误图标的大小 |
| `--figure-play-icon-size` | `64px` | 视频海报播放图标的尺寸（响应式下自动缩小） |

**使用示例**：
```vue
<OFigure src="/photo.jpg" :ratio="16/9" style="--figure-radius: 8px; --figure-fit: contain" />
```

### 响应式行为表

| 维度 | ≤600px (手机) | 601–1200px (平板) | >1200px (笔记本+) |
|------|--------------|------------------|--------------------|
| 播放图标大小 | 40px | 48px | 56px |
| 标题字号 | tip1 | text1 | 标准 |
| 描述区域内边距 | 4px 8px | 12px 16px | 标准 |
| 预览图最大宽度 | 100vw | 100vw | 无限制 |
| 预览遮罩 | 纯黑 | 纯黑 | 半透明 |
| 预览关闭按钮 | 左侧 | 左侧 | 右侧 |

### 互斥约束

- `preview` 和 `href` 不可同时使用（均接管点击事件）
- `hoverable` 在 `href`/`preview`/`videoPoster` 存在时自动启用

### 组件布局结构

```yaml
# 基础模式（无 ratio）
root: .o-figure
  display: inline-flex
  align-items: center
  overflow: hidden
  tag: div | a (有 href 时)
  style:
    border-radius: --figure-radius (0)
    transition: background-color --o-duration-m2
  classes:
    - .o-figure-hoverable: hoverable/href/preview/videoPoster
    - .o-figure-previewable: preview (cursor: pointer)
    - .o-figure-video-poster: videoPoster
    - .o-figure-bg: background 模式
    - .is-loading.is-colorful: 加载中彩色背景 (--figure-prest-color)
    - .is-error: 加载失败 (background-color: --figure-error-bk = --o-color-control4)
  children:
    # 无 ratio 时直接渲染 img
    - img.o-figure-img:
        condition: imgSrc && !background && !ratio
        width: 100%
        height: 100%
        object-fit: --figure-fit (cover)
        object-position: --figure-position (center)
        max-width: 100%
        transition: opacity --o-duration-m2, transform --o-easing-standard 600ms
    # 有 ratio 时通过 wrap 撑开高度
    - .o-figure-wrap:
        condition: ratio 或 isError
        position: relative
        width: 100%
        padding-top: (1/ratio)*100% (--figure-padding-top)
        children:
          - .o-figure-error-wrap:
              condition: isError
              position: absolute, inset: 0
              display: flex, align/justify: center
              font-size: --figure-error-size (--o-icon_size_control-l)
              color: --figure-error-color (--o-color-control4)
              children:
                - slot-error:
                    fallback: IconImageError
          - img.o-figure-img-ratio:
              condition: !background && imgSrc && !isError
              position: absolute, left/top: 0, width/height: 100%
              object-fit: --figure-fit (cover)
    # 覆盖层（视频海报/插槽内容/描述区）
    - .o-figure-main:
        condition: videoPoster || slots.content || slots.title || slots.default
        position: absolute, inset: 0
        transition: background-color --o-easing-standard-in --o-duration-m1
        children:
          - slot-default  # 自由覆盖内容
          - .o-figure-mask:
              condition: videoPoster
              background: rgba(black, 0.2)
              display: flex, align/justify: center
              position: absolute, inset: 0
              children:
                - slot-play-icon:
                    fallback:
                      - .o-figure-play-icon:
                          width/height: --figure-play-icon-size (64px)
                          font-size: calc(size/64*24)
                          border-radius: 50%
                          color: --o-color-white
                          background: rgba(white, 0.2)
                          border: 1px solid rgba(white, 0.6)
                          backdrop-filter: blur(1px)
          - .o-figure-content:
              condition: slots.content || slots.title
              position: absolute, bottom: 0, left: 0, width: 100%
              padding: 16px 24px
              color: --o-color-white
              background: linear-gradient(180deg, rgba(black,0) 0%, rgba(black,0.6) 100%)
              font-size: --o-font_size-tip1
              children:
                - slot-content:
                    fallback:
                      - .o-figure-title:
                          font-size: --o-font_size-h3
                          children: slot-title
    # 预览弹层
    - OLayer.o-figure-preview-layer:
        condition: preview || lazyPreview
        v-model:visible: previewVisible
        mask-close: previewCloseTypes.includes('mask')
        button-close: previewCloseTypes.includes('button')
        children:
          - .o-figure-preview-wrapper:
              position: relative
              children:
                - slot-preview:
                    props: { image: imgSrc }
                    fallback:
                      - .o-figure-preview-img > img:
                          max-width: 100vw, max-height: 100vh
                      - slot-preview-extra

# background 模式
root: .o-figure.o-figure-bg
  background-size: --figure-fit (cover)
  background-position: --figure-position (center)
  background-repeat: no-repeat
  # 无 ratio 时 .o-figure-main 变为 position: relative（由内容撑高）

# hoverable 交互
.o-figure-hoverable:
  cursor: pointer
  hover: img transform: scale(1.05)
  active: img transform: scale(1.02), .o-figure-main background: rgba(black, 0.1)

# 响应式断点
breakpoints:
  "<=1440px (laptop)":
    figure-play-icon-size: 56px
  "<=1200px (pad)":
    figure-play-icon-size: 48px
    .o-figure-title: font-size --o-font_size-text1
    .o-figure-content: padding 12px 16px
    .o-figure-preview-img img: max-width 100vw
    .o-figure-preview-layer: --layer-mask --o-color-black
    .o-figure-preview-close: left 16px, right auto
  "<=600px (phone)":
    figure-play-icon-size: 40px
    .o-figure-title: font-size --o-font_size-tip1
    .o-figure-content: padding 4px 8px
```

### 设计稿识别指南

**视觉特征指纹**

1. 单张图片展示容器，无标题/正文等语义分区，图片本身是主体内容
2. 可带固定宽高比（通过 padding-top 百分比实现），图片裁剪填充（object-fit: cover）
3. 视频海报模式：图片上叠加半透明黑色遮罩 + 居中圆形播放按钮（白色描边+模糊背景）
4. 底部描述区：沿底部的渐变黑色遮罩条上显示白色文字（标题 h3 + 正文 tip1）
5. 悬停态图片放大 scale(1.05)，按下态缩回 scale(1.02) 并叠加浅黑遮罩
6. 预览态：全屏遮罩层内居中展示原始大图，可带关闭按钮

**设计 Token → Prop 值映射表**

| 设计特征 | Token / 视觉值 | Prop | Prop 值 |
|---------|---------------|------|--------|
| 图片有固定比例 | padding-top 百分比 | `ratio` | 宽/高数值（如 16/9=1.78） |
| 图片裁剪方式 cover | object-fit: cover | `fit` | `"cover"` |
| 图片完整显示 | object-fit: contain | `fit` | `"contain"` |
| CSS 背景图渲染 | background-image | `background` | `true` |
| 悬停放大效果 | transform: scale(1.05) | `hoverable` | `true` |
| 点击全屏预览 | OLayer 遮罩弹层 | `preview` | `true` |
| 居中播放按钮 | 圆形按钮 64px | `videoPoster` | `true` |
| 底部渐变文字条 | linear-gradient 遮罩 | — | content/title 插槽 |
| 加载前彩色背景 | 随机色 background-color | `colorful` | `true` |
| 整图可点击跳转 | `<a>` 标签 | `href` | 链接 URL |
| 播放按钮 56px | laptop 断点 | — | 自动响应式 |
| 播放按钮 48px | pad 断点 | — | 自动响应式 |
| 播放按钮 40px | phone 断点 | — | 自动响应式 |

**易混淆组件区分表**

| 对比组件 | 相似点 | 区分方法 |
|---------|-------|---------|
| OCard (cover) | 都可展示图片 | Figure 是纯图片容器，无标题/正文/底部等语义分区和插槽；Card 有封面+标题+正文+底部的完整卡片结构 |
| img 标签 | 都渲染图片 | Figure 提供宽高比控制、懒加载、彩色占位、悬停放大、全屏预览、视频海报等增强功能 |
| OCarousel | 都展示图片内容 | Figure 是单张图片容器；Carousel 是多张图片的轮播切换组件 |

