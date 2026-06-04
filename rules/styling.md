# 样式规范

## 样式文件组织

```plaintext
app/.vitepress/src-new/assets/style/
├── index.scss              # 主入口
├── base.scss               # 基础重置样式
├── global.scss             # 全局样式
├── markdown.scss           # Markdown 内容样式
├── mixin/
│   ├── screen.scss         # 响应式断点 mixin（respond-to）
│   ├── font.scss           # 排版 mixin（display3、h4、text1 等）
│   └── common.scss         # 通用 mixin
└── theme/
    ├── default-light.token.css   # 亮色主题 CSS 变量（由 tokens 包生成）
    ├── dark.token.css            # 暗色主题 CSS 变量
    └── reset.scss                # CSS Reset
```

所有 SCSS mixin 已通过 VitePress 配置全局注入，**组件内无需 `@use` 或 `@import` mixin 文件**。

---

## CSS 变量命名规范

项目使用 `@opensig/opendesign` 生成的 CSS 变量，前缀为 `--o-`：

```css
/* 颜色 */
--o-color-info1        /* 主文本色 */
--o-color-info2        /* 次文本色 */
--o-color-white        /* 白色 */
--o-color-brand1       /* 品牌主色 */

/* 布局 */
--layout-content-max-width    /* 内容区最大宽度 */
--layout-content-padding      /* 内容区内边距 */

/* 间距 */
--o-gap-section        /* 分段间距 */
--o-gap-t2c            /* 标题到内容间距 */
--o-spacing-h1  ~  --o-spacing-h8   /* 水平间距 */
--o-spacing-v1  ~  --o-spacing-v8   /* 垂直间距 */

/* 字体 */
--o-font-size-h1  ~  --o-font-size-text4

/* 行高 */
--o-line-height-h1  ~  --o-line-height-text4

/* 阴影 */
--o-shadow-1   --o-shadow-2

/* 圆角 */
--o-radius-xs  --o-radius-s  --o-radius-m  --o-radius-l  --o-radius-circle
```

---

## 响应式断点规范

使用 `respond-to` mixin（已全局注入，无需 import）：

| 断点名 | 宽度范围 | 说明 |
|--------|---------|------|
| `phone` | 0 ~ 600px | 手机端 |
| `pad_v` | 601 ~ 840px | 竖屏平板 |
| `pad_h` | 841 ~ 1200px | 横屏平板 |
| `<=pad_v` | 0 ~ 840px | 竖屏平板及以下 |
| `<=pad` | 0 ~ 1200px | 平板及以下 |
| `laptop` | 1201 ~ 1440px | 笔记本 |
| `>laptop` | 1441px+ | 大屏 |

```scss
// ✅ 使用 respond-to mixin
.sig-banner {
  padding: 0 48px;

  @include respond-to('<=pad') {
    padding: 0 24px;
  }

  @include respond-to('phone') {
    padding: 0 16px;
  }
}

// ❌ 禁止硬编码断点数值
@media (max-width: 768px) {
  .sig-banner { padding: 0 16px; }
}
```

JS 中通过 `useScreen` composable 获取响应式断点：

```typescript
const { isPhone, lePadV, isPad, gtPad, leLaptop } = useScreen();
```

---

## 排版 Mixin

使用 `font.scss` 中定义的排版规格（已全局注入）：

```scss
@include display3;   // 大标题
@include h3;         // 中标题
@include h4;
@include text1;      // 正文
@include text2;
@include tip1;       // 提示文字
@include tip2;
```

---

## SCSS 编写规范

```vue
<style lang="scss" scoped>
.sig-card {
  padding: var(--o-spacing-h4);
  background-color: var(--o-color-white);
  border-radius: var(--o-radius-m);
  box-shadow: var(--o-shadow-1);

  // ✅ BEM 子元素用 & 嵌套
  &__header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
  }

  &__title {
    color: var(--o-color-info1);
    @include text1;
  }

  // ✅ BEM 修饰符
  &--active {
    border: 1px solid var(--o-color-brand1);
  }

  // ✅ 响应式
  @include respond-to('phone') {
    padding: var(--o-spacing-h6);
  }
}
</style>
```

---

## 主题切换规范

项目通过切换 `html` 元素的 `class`（`light` / `dark`）来切换主题，CSS 变量自动适配：

```typescript
// ✅ 使用项目提供的 composable 切换主题
const { toggleTheme } = useTheme();
```

```scss
// ✅ 优先使用 CSS 变量（亮/暗主题自动切换）
.card {
  background: var(--o-color-white);
  color: var(--o-color-info1);
}

// ❌ 禁止硬编码颜色
.card {
  background: #ffffff;
  color: #000000;
}
```

---

## 深度选择器

```scss
// ✅ 覆盖 OpenDesign / Element Plus 组件样式时使用 :deep()
.cve-filter {
  :deep(.o-select__input) {
    border-radius: var(--o-radius-s);
  }
  :deep(.el-input__inner) {
    height: 40px;
  }
}
```

---

## 禁止事项

- 禁止使用内联样式（`style="..."`），动态宽高等特殊情况除外
- 禁止硬编码颜色值，统一使用 CSS 变量
- 禁止硬编码断点数值，统一使用 `respond-to` mixin
- 禁止使用 `!important`，通过提高选择器优先级解决
- 禁止超过 3 层的 SCSS 嵌套
- 禁止在组件 `<style>` 中手动 `@use` / `@import` 已全局注入的 mixin 文件
- 全局 `<style>`（无 `scoped`）必须添加注释说明原因
