> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OResult 结果页

## Part A：设计理解卡

OResult 是结果页组件，用于操作完成后展示结果状态。支持四种状态图标、标题、描述文字、自定义图片、操作按钮和详细内容等区域。

### 状态

**status**（属性）：结果状态。"info" 信息、"success" 成功、"warning" 警告、"danger" 危险/错误。每种状态对应不同颜色和图标。不传则不显示状态图标。

### 内容

**title**（属性）：结果标题文字。

**description**（属性）：结果描述文字，对标题的补充说明。

### 插槽区域

**image 插槽**（插槽）：图片区域，显示在顶部。适合放异常态插画（如空数据图标）。使用后不影响其他区域。

**icon 插槽**（插槽）：替换状态图标。使用后 status 对应的默认图标失效。

**title 插槽**（插槽）：替换标题区域。使用后 title 属性失效。

**description 插槽**（插槽）：替换描述区域。使用后 description 属性失效。

**extra 插槽**（插槽）：操作按钮区域，位于描述下方。适合放 "返回首页"、"重试" 等按钮。

**default 插槽**（插槽）：详细内容区域，位于底部。适合放详细错误信息或操作指引。

📱 **响应式行为**：在平板竖屏到笔记本尺寸（841–1440px），图标、标题文字、描述文字缩小、间距减少；在平板竖屏及以下（≤840px），图标和标题文字进一步缩小，标题区域由水平布局变为垂直布局（图标在标题上方）。

🧩 **布局结构**：OResult 为垂直布局的结果页容器。从上到下依次排列：图片区（可选）→ 标题行（图标 + 标题文字，水平排列）→ 描述文字 → 操作按钮区 → 详细内容区。在小屏下标题行变为垂直排列（图标在上、标题在下）。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: column
regions: [image(顶部图片), header(图标+标题), description(描述), extra(操作按钮), content(详细内容)]
responsive: ≤840px header 变为 column 布局
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：页面中心区域，垂直排列的状态图标 + 大标题 + 描述文字 + 操作按钮；状态图标为圆形彩色图标（勾号/感叹号/叉号等）
- **Token → Prop 映射**：绿色勾号图标 → status="success"；蓝色信息图标 → status="info"；橙色警告图标 → status="warning"；红色错误图标 → status="danger"；顶部有插画图片 → 使用 #image 插槽；底部有按钮 → 使用 #extra 插槽
- **易混淆组件区分**：与空数据页区分——OResult 有明确的状态图标和操作反馈语义，空数据页通常只有插画 + 简单文字；与 ODialog 区分——OResult 是页面级结果展示，ODialog 是弹窗层

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OResult } from '@opensig/opendesign';
</script>
```

### 类型定义

```typescript
type ResultStatusT = 'info' | 'success' | 'warning' | 'danger';
```

### Props 表

| 参数名 | 类型 | 可选值 | 默认值 | 说明 |
|--------|------|--------|--------|------|
| status | `ResultStatusT` | `'info'` / `'success'` / `'warning'` / `'danger'` | — | 状态 |
| title | `string` | — | — | 标题 |
| description | `string` | — | — | 描述 |

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| image | — | 有 image 插槽时 | 顶部图片区域 | 无 |
| icon | — | 有 status 或 icon 插槽时 | 状态图标 | 对应 status 的默认图标 |
| title | — | 有 title prop 或 title 插槽时 | 标题文字 | `{{ title }}` |
| description | — | 有 description prop 或 description 插槽时 | 描述文字 | `{{ description }}` |
| extra | — | 有 extra 插槽时 | 操作按钮区域 | 无 |
| default | — | 有 default 插槽时 | 底部详细内容 | 无 |

### 典型使用场景与调用模板

**场景 1：成功结果**
适用于：操作成功反馈
```vue
<OResult status="success" title="提交成功" description="您的申请正在审核中">
  <template #extra>
    <OButton variant="outline" color="primary" round="pill">返回首页</OButton>
  </template>
</OResult>
```

**场景 2：异常态（带插画）**
适用于：空数据、网络错误等异常页面
```vue
<OResult title="暂无工单" description="您目前没有待处理的工单">
  <template #image>
    <OIconNoData />
  </template>
  <template #extra>
    <OButton color="primary" variant="solid" round="pill">在线提单</OButton>
  </template>
</OResult>
```

**场景 3：警告/错误结果**
适用于：操作失败反馈
```vue
<OResult status="danger" title="提交失败" description="请检查网络连接后重试" />
```

**场景 4：带详细内容**
适用于：展示错误详情
```vue
<OResult status="warning" title="部分导入失败">
  <template #extra>
    <OButton>重试</OButton>
  </template>
  <p>以下 3 条数据导入失败：</p>
  <ul>
    <li>第 5 行：格式错误</li>
    <li>第 12 行：数据重复</li>
  </ul>
</OResult>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 成功反馈 | `status="success"` + `title` + `#extra` | 带操作按钮 |
| 失败反馈 | `status="danger"` + `title` + `description` | 错误提示 |
| 空数据 | `title` + `#image` + `#extra` | 无 status |
| 自定义图标 | `#icon` + `title` | 替换默认图标 |

### 可覆盖的 CSS 变量

在调用处覆盖以下变量调整组件外观，**无需 `:deep` hack**：

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `--result-image-width` | `240px` | 顶部图片区域宽度 |
| `--result-image-height` | `210px` | 顶部图片区域高度 |
| `--result-image-gap` | `16px` | 图片与下方内容的间距 |
| `--result-icon-size` | `var(--o-icon_size_control-xl)` | 状态图标尺寸 |
| `--result-icon-gap` | `12px` | 图标与标题文字的间距 |
| `--result-icon-color` | 跟随 `status` prop | 状态图标颜色 |
| `--result-title-color` | `var(--o-color-info1)` | 标题文字颜色 |
| `--result-title-text-size` | `var(--o-font_size-h3)` | 标题字号 |
| `--result-title-text-height` | `var(--o-line_height-h3)` | 标题行高 |
| `--result-desc-color` | `var(--o-color-info3)` | 描述文字颜色 |
| `--result-desc-text-size` | `var(--o-font_size-text1)` | 描述字号 |
| `--result-desc-text-height` | `var(--o-line_height-text1)` | 描述行高 |
| `--result-desc-gap` | `12px` | 描述与标题的间距 |
| `--result-extra-gap` | `24px` | 操作按钮区与描述的间距 |

**使用示例**：
```vue
<OResult status="success" title="完成" style="--result-title-color: #7c3aed; --result-extra-gap: 32px" />
```

### 响应式行为表

| 维度 | ≤840px | 841–1440px | >1440px |
|------|--------|-----------|---------|
| 图片尺寸 | 160×140px | 160×140px | 标准 |
| 图标尺寸 | 48px | 控件 l | 标准 |
| 标题文字 | text1 | text2 | 标准 |
| 描述文字 | tip2 | tip1 | 标准 |
| 标题布局 | 垂直（图标在上） | 水平 | 水平 |

### 组件布局结构

**桌面端 >1440px**
```yaml
layout:
  tag: div
  direction: vertical
  align: center
  class: o-result o-result-{status}
  regions:
    - name: result-image
      condition: $slots.image
      description: 顶部图片/插画区域
      size: var(--result-image-width) × var(--result-image-height)  # 240×210px
      gap-bottom: var(--result-image-gap)  # 16px
      children:
        - { type: slot, name: image }
    - name: result-header
      condition: status || $slots.icon || title || $slots.title
      direction: horizontal
      align: center
      children:
        - name: result-icon
          condition: status || $slots.icon
          size: var(--result-icon-size)  # 控件 xl
          color: var(--result-icon-color)  # 跟随 status
          gap-right: var(--result-icon-gap)  # 12px
          children:
            - { type: slot, name: icon, fallback: "状态对应默认图标" }
        - name: result-title
          font-size: var(--result-title-text-size)  # h3
          line-height: var(--result-title-text-height)
          color: var(--result-title-color)
          children:
            - { type: slot, name: title, fallback: "{{ title }}" }
    - name: result-description
      condition: description || $slots.description
      font-size: var(--result-desc-text-size)  # text1
      line-height: var(--result-desc-text-height)
      color: var(--result-desc-color)  # info3
      gap-top: var(--result-desc-gap)  # 12px
      children:
        - { type: slot, name: description, fallback: "{{ description }}" }
    - name: result-extra
      condition: $slots.extra
      gap-top: var(--result-extra-gap)  # 24px
      children:
        - { type: slot, name: extra }  # 操作按钮区
    - name: result-content
      condition: $slots.default
      children:
        - { type: slot, name: default }  # 详细内容区
  status-colors:
    info: "var(--o-color-primary1)"
    success: "var(--o-color-success1)"
    warning: "var(--o-color-warning1)"
    danger: "var(--o-color-danger1)"
```

**841–1440px**
```yaml
# 图片: 160×140px, gap 8px
# 图标: 控件 l
# 标题: text2
# 描述: tip1, gap 8px
```

**≤840px**
```yaml
# 图标: 48px, gap 8px
# 标题: text1
# 描述: tip2, gap 8px
# header 由 horizontal 变为 vertical (flex-direction: column)
# 图标 margin-right: 0, margin-bottom: gap
```

### 设计稿识别指南

**视觉特征指纹**

1. 页面中心垂直排列：彩色状态图标 + 大标题文字 + 描述文字 → 匹配 OResult
2. 绿色圆形勾号图标 + "成功"类标题 → 匹配 OResult（status="success"）
3. 顶部有插画图片 + 标题 + 操作按钮 → 匹配 OResult（带 #image 和 #extra 插槽）
4. 无状态图标、仅有插画 + 标题 + 按钮 → 匹配 OResult（空数据/异常态，不传 status）

**设计 Token → Prop 值映射表**

| 设计稿属性 | 值 / 范围 | 对应 Prop | Prop 值 | 备注 |
|-----------|----------|----------|---------|------|
| 状态图标颜色 | 蓝色（`--o-color-primary1`） | status | `'info'` | — |
| 状态图标颜色 | 绿色（`--o-color-success1`） | status | `'success'` | — |
| 状态图标颜色 | 橙色（`--o-color-warning1`） | status | `'warning'` | — |
| 状态图标颜色 | 红色（`--o-color-danger1`） | status | `'danger'` | — |
| 状态图标 | 无图标 | status | 不传 | 适合空数据页 |
| 顶部区域 | 有插画/图片 | — | 使用 `#image` 插槽 | — |
| 标题下方 | 有操作按钮 | — | 使用 `#extra` 插槽 | — |
| 底部 | 有详细内容 | — | 使用 `default` 插槽 | — |

**易混淆组件区分表**

| 本组件 | 易混淆组件 | 关键区分依据 |
|--------|-----------|-------------|
| OResult | 空数据页 | OResult 有状态语义（成功/失败/警告），空数据页通常只展示插画和简单文案 |
| OResult | ODialog | OResult 是页面级结果展示占据内容区，ODialog 是浮层弹窗 |
| OResult | 自定义错误页 | OResult 有固定的图标+标题+描述+操作布局结构，自定义错误页布局不固定 |

