> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OCarousel 幻灯片

## Part A：设计理解卡

OCarousel 是幻灯片/轮播组件，用于在有限空间内循环展示多组内容（图片、卡片等）。支持滚动和切换两种动效，可自动播放、手动箭头/指示器切换。包含 OCarousel（容器）和 OCarouselItem（幻灯片项）。

### 播放效果

**effect**（属性）：幻灯片切换效果。"gallery" 滚动效果，相邻幻灯片可部分露出；"toggle" 直接切换，一次只显示一张。默认 gallery。gallery 模式下可以将 OCarouselItem 宽度设为略小于 OCarousel，使两侧幻灯片部分可见。

### 自动播放控制

**autoPlay**（属性）：是否自动播放。默认关闭。

**interval**（属性）：自动播放间隔时间（毫秒）。默认 5000。

**pauseOnHover**（属性）：鼠标悬停时是否暂停自动播放。默认关闭。

### 索引控制

**activeIndex**（属性）：当前激活的幻灯片索引（v-model 双向绑定）。

**clickToSwitch**（属性）：是否允许点击非激活的幻灯片来切换。在 gallery 模式下露出两侧幻灯片时尤其有用。默认关闭。

**manualInit**（属性）：是否手动初始化。开启后需要调用暴露的 init() 方法才会初始化。默认关闭。

### 指示器

**hideIndicator**（属性）：是否隐藏底部指示器。默认显示。

**indicatorClick**（属性）：是否允许点击指示器切换幻灯片。默认关闭。

**indicatorWrapClass**（属性）：指示器容器自定义类名。

**indicator 插槽**（插槽）：自定义每个指示器项的渲染。可获取 active（是否激活）和 index（索引）。

### 箭头导航

**arrow**（属性）：箭头显示方式。"hover" 鼠标悬停时显示、"always" 始终显示、"never" 不显示。默认 hover。

**arrowWrapClass**（属性）：箭头容器自定义类名。

**arrow-prev / arrow-next 插槽**（插槽）：替换左/右箭头整体。

**arrow-prev-icon / arrow-next-icon 插槽**（插槽）：仅替换箭头图标。

### 内容

**default 插槽**（插槽）：放置 OCarouselItem 子项。

### 事件

**change**（事件）：幻灯片切换完成后触发，可获取新旧索引。

**before-change**（事件）：幻灯片切换动画开始前触发。

**pause**（事件）：自动播放暂停时触发。

### 暴露方法

组件暴露 init()、play()、pause()、active(index) 方法供外部调用。

📱 **响应式行为**：在平板到笔记本（840-1200px）指示器宽度缩至 40px、高度 3px；平板竖屏及以下（≤840px）箭头图标缩小、指示器进一步缩至 24px；手机（≤600px）指示器缩至 16px。

🧩 **布局结构**：外层容器纵向排列，内部分三层——幻灯片内容区（gallery 模式下横向排列多个 CarouselItem，toggle 模式下堆叠切换）、底部指示器栏（横向排列多个指示条）、左右箭头导航（绝对定位于内容区两侧）。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: column
regions: [carousel-wrap(内容容器), indicator-wrap(指示器栏), arrow-wrap(箭头导航)]
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：大面积矩形内容区 + 底部居中的短横条指示器（多个等宽小条，当前项高亮）+ 左右两侧箭头图标（悬停显示或常驻）
- **Token → Prop 映射**：指示器宽度 48px → 默认尺寸；若相邻内容部分露出 → effect="gallery"；若内容一次只显示一张完整切换 → effect="toggle"；箭头常驻可见 → arrow="always"
- **易混淆组件区分**：与 OTabs（标签页）区分——OCarousel 底部是短横条指示器而非文字标签，内容区支持滑动/动画切换；与图片列表区分——OCarousel 同时只显示一项（或少量）内容并带有切换控件

### ⚠️ toggle 模式必须显式设置高度

**`effect="toggle"` 模式下，所有 OCarouselItem 均为 `position: absolute; height: 100%`，整条高度链依赖父容器——若 `.o-carousel` 未定义高度，实际高度为 0。**

后果：
- 幻灯片内容 overflow 出来，视觉上可见（.o-carousel 无 overflow:hidden）
- 箭头：`top: 50%` of 0-height → 贴顶显示，看起来"在内容区"
- **指示器：`bottom: 19px` of 0-height → 跑到容器顶部以上 19px，被页面其他元素遮盖，不可见**

```css
/* ✅ 必须给 OCarousel 设置显式高度（toggle 模式） */
.my-carousel {
  height: 360px;   /* 根据设计稿的 banner 高度设定 */
}

/* ✅ 同时让 banner-slide 填满该高度 */
.my-slide {
  height: 100%;
  overflow: hidden;
}
```

> **为什么 gallery 模式没有此问题？** gallery 模式下 OCarouselItem 通过 transform 水平排列，高度由内容自然撑开（非 position:absolute），无需显式设置高度。仅 toggle 模式有此限制。

**页面顶部的大幅 Banner 区域（首屏 Hero 区）极大概率是轮播图，不可直接按静态 HTML 实现。**

在 Step 1 分析设计稿时，凡遇到以下情况之一，**必须**对该区域执行轮播检测清单：
- 页面顶部有全宽或大幅背景图/渐变色块
- 该区域高度明显大于普通内容行（通常 ≥ 300px）
- 该区域视觉上与普通内容区隔离、独立成块

**轮播检测清单**（逐项检查 Pixso DSL，任意一项成立 → 使用 OCarousel）：

| 检测项 | 在 DSL 中的信号 |
|--------|---------------|
| ① 图层命名 | 节点 `name` 含 `carousel`、`slider`、`轮播`、`Swiper`，或子项命名为 `Slide N`、`Item N`、`Banner N` |
| ② 多个平级同结构子项 | 容器直接子节点有 2+ 个同类型同结构的 Frame/Group（每个都有独立背景/图片/文字） |
| ③ 底部指示器层 | 容器内有一层包含 3+ 个等宽小矩形或圆点的横排组，且其中一个颜色与其他不同 |
| ④ 左右箭头层 | 容器内有两个绝对定位的图标节点，分别位于左侧和右侧，内容为 `<`/`>` 或箭头图形 |
| ⑤ Pixso 交互 | 节点上绑定了 Auto-animate 或 Navigate 交互（DSL `interactions` 字段非空） |

> **静默陷阱**：设计稿通常只展示轮播的第一帧，指示器、箭头可能因设计稿状态而不明显。若图层名或子项数量出现②，即使没有看到指示器也应使用 OCarousel。

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OCarousel, OCarouselItem } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| activeIndex | `number` | — | `0` | 激活索引（v-model） |
| effect | `string` | `'gallery'` / `'toggle'` | `'gallery'` | 切换效果 |
| autoPlay | `boolean` | — | `false` | 自动播放 |
| interval | `number` | — | `5000` | 播放间隔（ms） |
| arrow | `string` | `'always'` / `'hover'` / `'never'` | `'hover'` | 箭头显示方式 |
| arrowWrapClass | `string \| object \| array` | — | — | 箭头容器类名 |
| hideIndicator | `boolean` | — | `false` | 隐藏指示器 |
| indicatorClick | `boolean` | — | `false` | 指示器可点击切换 |
| indicatorWrapClass | `string \| object \| array` | — | — | 指示器容器类名 |
| clickToSwitch | `boolean` | — | `false` | 点击卡片切换 |
| manualInit | `boolean` | — | `false` | 手动初始化 |
| activeClass | `string \| object \| array` | — | — | 自定义激活类名 |
| pauseOnHover | `boolean` | — | `false` | 悬停暂停播放 |

### Events 表

| 事件名 | 参数 | 触发时机 |
|--------|------|---------|
| update:activeIndex | `(value: number)` | 激活索引变化时 |
| before-change | `(to: number, from: number)` | 切换动画开始前 |
| change | `(to: number, from: number)` | 切换完成后 |
| pause | `(value: number)` | 自动播放暂停时 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 幻灯片列表 | 无 |
| indicator | `{ active: boolean, index: number }` | 未隐藏指示器时 | 每个指示器项 | 默认指示条 |
| arrow-prev | — | arrow 非 never | 左箭头整体 | 默认左箭头 |
| arrow-next | — | arrow 非 never | 右箭头整体 | 默认右箭头 |
| arrow-prev-icon | — | arrow 非 never | 左箭头图标 | `<IconChevronLeft />` |
| arrow-next-icon | — | arrow 非 never | 右箭头图标 | `<IconChevronRight />` |

### 暴露方法

| 方法名 | 参数 | 说明 |
|--------|------|------|
| init() | — | 手动初始化（manualInit 为 true 时使用） |
| play() | — | 开始自动播放 |
| pause() | — | 暂停自动播放 |
| active(index) | `index: number` | 切换到指定索引 |

### 典型使用场景与调用模板

**场景 1：基础轮播（Gallery 效果）**
适用于：Banner 轮播图
```vue
<OCarousel auto-play :interval="3000" indicator-click>
  <OCarouselItem v-for="i in 5" :key="i">
    <img :src="`/banner-${i}.jpg`" />
  </OCarouselItem>
</OCarousel>
```

**场景 2：切换效果**
适用于：全屏幻灯片
```vue
<OCarousel effect="toggle" auto-play pause-on-hover>
  <OCarouselItem v-for="i in 3" :key="i">
    <div class="slide-content">第 {{ i }} 页</div>
  </OCarouselItem>
</OCarousel>
```

**场景 3：Gallery 露出两侧**
适用于：点击切换卡片轮播
```vue
<OCarousel click-to-switch arrow="always">
  <OCarouselItem v-for="i in 5" :key="i" style="width: 80%;">
    <img :src="`/card-${i}.jpg`" />
  </OCarouselItem>
</OCarousel>
```

**场景 4：自定义指示器**
适用于：使用自定义样式的指示器
```vue
<OCarousel indicator-click>
  <OCarouselItem v-for="i in 4" :key="i">
    <div>内容 {{ i }}</div>
  </OCarouselItem>
  <template #indicator="{ active, index }">
    <div :class="['my-dot', { 'my-dot-active': active }]">{{ index + 1 }}</div>
  </template>
</OCarousel>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 自动轮播 Banner | `auto-play` + `indicator-click` + `pause-on-hover` | 最常见用法 |
| 手动切换 | `arrow="always"` + `indicator-click` | 用户主动控制 |
| 卡片轮播 | `click-to-switch` + Gallery 模式 | OCarouselItem 宽度 < 100% |
| 全屏切换 | `effect="toggle"` | 直接切换 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--carousel-arrow-size` | `var(--o-icon_size_control-l)` | 箭头图标大小 |
| `--carousel-arrow-color` | `var(--o-color-info1)` | 箭头图标颜色 |
| `--carousel-arrow-color-hover` | `var(--o-color-info2)` | 箭头悬停颜色 |
| `--carousel-arrow-color-active` | `var(--o-color-info3)` | 箭头按下颜色 |
| `--carousel-indicator-width` | `48px` | 指示器宽度（>1200px 默认值） |
| `--carousel-indicator-height` | `3px` | 指示器高度 |
| `--carousel-indicator-gap` | `12px` | 指示器之间的间距 |
| `--carousel-indicator-offset` | `19px` | 指示器距底部的偏移量 |
| `--carousel-indicator-bg-color` | `var(--o-color-control1)` | 指示器默认背景色 |
| `--carousel-indicator-bg-color-hover` | `var(--o-color-primary2)` | 指示器悬停背景色 |
| `--carousel-indicator-bg-color-active` | `var(--o-color-primary3)` | 指示器按下背景色 |
| `--carousel-indicator-bg-color-selected` | `var(--o-color-primary1)` | 指示器选中背景色 |

**使用示例**：
```vue
<OCarousel style="--carousel-indicator-width: 32px; --carousel-indicator-bg-color-selected: var(--o-color-danger1)">
  <OCarouselItem v-for="i in 4" :key="i">内容 {{ i }}</OCarouselItem>
</OCarousel>
```

### 响应式行为表

| 维度 | ≤600px | 601–840px | 841–1200px | >1200px |
|------|--------|----------|-----------|---------|
| 指示器宽度 | 16px | 24px | 40px | 56px |
| 指示器高度 | 2px | 2px | 3px | 4px |
| 箭头图标大小 | — | 缩小 | 标准 | 标准 |

### 组件布局结构

```yaml
# OCarousel 布局结构
root: .o-carousel
  direction: column (隐式，内部通过定位实现层叠)
  children:
    - .o-carousel-wrap:
        role: 幻灯片内容容器
        children:
          - .o-carousel-container-gallery | .o-carousel-container-toggle:
              role: 幻灯片列表
              direction: row (gallery 模式，通过 transform 滑动)
              children:
                - slot[default] → OCarouselItem × N
                  # OCarouselItem 根节点 class 因 effect 而异：
                  # effect="gallery"  → .o-carousel-item-gallery
                  # effect="toggle"   → .o-carousel-item-toggle
                  # 注意：没有通用的 .o-carousel-item 类，Playwright 选择器必须带 effect 后缀
    - .o-carousel-indicator-wrap:
        role: 指示器栏
        condition: hideIndicator !== true
        direction: row (居中)
        children:
          - .o-carousel-indicator-item × N:
              children:
                - slot[indicator] || .o-carousel-indicator-bar
        tokens:
          gap: var(--carousel-indicator-gap)  # 12px (>1200px) → 8px (840-1200px) → 4px (≤840px)
          offset-bottom: var(--carousel-indicator-offset)  # 19px → 11px → 7px
    - .o-carousel-arrow-wrap:
        role: 箭头导航
        condition: arrow !== 'never'
        position: absolute, 左右两侧垂直居中
        children:
          - div > slot[arrow-prev] || .o-carousel-arrow-prev > .o-carousel-arrow-icon > slot[arrow-prev-icon] || IconChevronLeft
          - div > slot[arrow-next] || .o-carousel-arrow-next > .o-carousel-arrow-icon > slot[arrow-next-icon] || IconChevronRight
        tokens:
          icon-size: var(--carousel-arrow-size)  # var(--o-icon_size_control-l) (>840px) → var(--o-icon_size_control-xs) (≤840px)
          color: var(--carousel-arrow-color)  # var(--o-color-info1)

# 响应式断点 Token 值
breakpoints:
  ">1200px":
    --carousel-indicator-width: 48px
    --carousel-indicator-height: 3px
    --carousel-indicator-gap: 12px
    --carousel-indicator-offset: 19px
    --carousel-arrow-size: var(--o-icon_size_control-l)
  "840-1200px":
    --carousel-indicator-width: 40px
    --carousel-indicator-height: 3px
    --carousel-indicator-gap: 8px
    --carousel-indicator-offset: 11px
    --carousel-arrow-size: var(--o-icon_size_control-l)
  "600-840px":
    --carousel-indicator-width: 24px
    --carousel-indicator-height: 2px
    --carousel-indicator-gap: 4px
    --carousel-indicator-offset: 7px
    --carousel-arrow-size: var(--o-icon_size_control-xs)
  "≤600px":
    --carousel-indicator-width: 16px
    --carousel-indicator-height: 2px
    --carousel-indicator-gap: 4px
    --carousel-indicator-offset: 7px
    --carousel-arrow-size: var(--o-icon_size_control-xs)
```

### 设计稿识别指南

**视觉特征指纹**
1. 大面积矩形内容区，同一时刻仅展示一个（toggle）或一个主要+两侧部分露出（gallery）的内容面板
2. 底部居中排列的短横条指示器，当前激活项颜色高亮（主题色 `--o-color-primary1`），其余为浅色（`--o-color-control1`）
3. 内容区左右两侧各有一个箭头图标（`<` / `>`），悬停时显示或常驻可见

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值/范围 | 对应Prop | Prop值 | 备注 |
|-----------|---------|---------|--------|------|
| 相邻内容部分露出 | 两侧可见边缘 | effect | `'gallery'` | 默认值 |
| 内容直接切换无滑动 | 同一位置替换 | effect | `'toggle'` | — |
| 箭头始终可见 | 非悬停态也显示 | arrow | `'always'` | — |
| 箭头悬停显示 | 鼠标悬停出现 | arrow | `'hover'` | 默认值 |
| 无箭头 | 不显示箭头 | arrow | `'never'` | — |
| 无底部指示器 | 无指示条 | hideIndicator | `true` | — |
| 指示器可点击 | 指示器有交互态 | indicatorClick | `true` | — |
| 自动轮播 | 内容自动切换 | autoPlay | `true` | 配合 interval |
| 指示器宽 48px 高 3px | 大屏默认尺寸 | — | — | >1200px 默认 |
| 指示器宽 16px | 最小屏尺寸 | — | — | ≤600px 响应式 |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|------------|
| OCarousel | OTabs（标签页） | OCarousel 底部是短横条指示器，OTabs 底部是文字标签栏；OCarousel 内容通过动画滑动切换 |
| OCarousel | 图片列表/网格 | OCarousel 同时只展示一项（或少量）内容，带指示器和箭头导航控件 |
| OCarousel | OCollapse（折叠面板） | OCarousel 内容水平切换，OCollapse 内容垂直展开收起 |

