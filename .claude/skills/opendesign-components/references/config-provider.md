> ← [组件索引](../SKILL.md#组件索引) · [README](../../../README.md)

# OConfigProvider 配置提供者

## Part A：设计理解卡

OConfigProvider 是全局配置组件，用于向其所有后代组件注入统一的配置信息。它本身不渲染任何可见内容，仅作为配置的传递容器。

### 整体结构

该组件没有自身的视觉表现，它是一个纯逻辑的容器组件，将配置通过 Vue 的 provide/inject 机制向下传递给所有子组件。所有被 OConfigProvider 包裹的子组件都可以读取到它提供的配置。

### 国际化语言配置

**locale**（属性）：设置语言词条，覆盖子组件中使用 useI18n 获取的翻译文本。词条对象中必须包含 locale 字段标识语言标识符（如 "zh-CN"、"en-US"、"ja-JP"），其余字段为具体的翻译键值对（如 "pagination.goto"、"select.cancel" 等）。当配置了 locale 后，其后代组件通过 useI18n 获取的翻译结果将优先使用此处的词条，未被 OConfigProvider 包裹的组件则使用全局默认语言包。

### 链接组件全局配置

**link**（属性）：为所有后代 OLink 组件统一注册点击回调。配置对象包含一个 click 方法，当任意后代 OLink 被点击时（前提是该 OLink 的 global 属性为 true，默认即为 true），除触发自身 click 事件外，还会额外调用此全局 click 回调，并传入原生事件对象、Link 的 props 和额外的 attrs。典型用途包括全局链接点击埋点、路由拦截等。

### 插槽

**default 插槽**（插槽）：放置需要接收全局配置的所有子组件。

### 响应式行为

无。该组件不涉及任何视觉渲染与尺寸变化。

🧩 **布局结构**：本组件为配置提供者，无视觉渲染。模板仅包含一个 `<slot></slot>`，不产生任何 DOM 元素。通过 Vue 的 provide/inject 机制向下传递 locale 和 link 配置。
```yaml
# 简化结构摘要（完整版见 Part B）
direction: none  # 无视觉渲染，纯逻辑组件
regions: [slot:default]  # 透传子组件，无包裹元素
```

🔍 **设计稿识别指南**：
- **视觉特征指纹**：本组件无视觉表现，不可从设计稿中直接识别。当设计稿标注了多语言切换或全局链接行为时，应在代码中使用此组件包裹应用
- **Token → Prop 映射**：无视觉 Token。设计稿中的语言标注（如"中文/English"切换器）暗示需要配置 `locale`；全局链接行为需求暗示需要配置 `link`
- **易混淆组件区分**：与 OLayout 等布局容器区分——ConfigProvider 不渲染任何 DOM 元素，仅注入配置

---

## Part B：代码调用参考

### 导入方式

```vue
<script setup>
import { OConfigProvider } from '@opensig/opendesign';
</script>
```

### Props 表

| 参数名 | 类型 | 必填 | 可选值 | 默认值 | 说明 |
|--------|------|------|--------|--------|------|
| locale | `i18nLanguagesT` | 否 | `{ locale: string; [k: string]: string }` | `undefined` | 语言词条配置，优先级高于全局 useLocale 设置的语言 |
| link | `LinkConfigT` | 否 | `{ click: (e: MouseEvent, params: LinkPropsT, attrs: Record<string, any>) => void }` | `undefined` | OLink 组件全局点击回调配置 |

### Events 表

无。

### Slots 表

| 插槽名 | Slot Props | 触发条件 | 替换范围 | 回退内容 |
|--------|-----------|---------|---------|---------|
| default | — | 始终 | 全部子组件内容 | 无 |

### Expose 方法表

无。该组件未使用 defineExpose。

### 插槽层级关系

```
OConfigProvider（无可见渲染，纯配置注入）
└── default（所有子组件内容）
```

### 典型使用场景与调用模板

**场景 1：国际化语言切换**
适用于：需要为局部区域或整个应用设置特定语言词条

```vue
<script setup>
import { ref } from 'vue';
import { OConfigProvider } from '@opensig/opendesign';

const locale = ref({
  locale: 'en-US',
  'pagination.goto': 'go to',
  'pagination.page': 'Page',
  'pagination.countPerPage': ' / Page',
  'pagination.total': 'Total: {0}',
  'select.cancel': 'Cancel',
});
</script>

<template>
  <OConfigProvider :locale="locale">
    <!-- 内部组件将使用上述英文词条 -->
    <YourPageContent />
  </OConfigProvider>
</template>
```

**场景 2：动态语言切换**
适用于：用户可选择切换语言

```vue
<script setup>
import { ref } from 'vue';
import { OConfigProvider, OButton } from '@opensig/opendesign';
import { useLocale } from '@opensig/opendesign';

const languages = {
  'zh-CN': { locale: 'zh-CN', 'pagination.goto': '跳转' },
  'en-US': { locale: 'en-US', 'pagination.goto': 'go to' },
  'ja-JP': { locale: 'ja-JP', 'pagination.goto': '移動' },
};

const currentLocale = ref(languages['zh-CN']);

const switchLang = (lang: string) => {
  currentLocale.value = languages[lang];
  useLocale(lang);
};
</script>

<template>
  <OButton @click="switchLang('zh-CN')">中文</OButton>
  <OButton @click="switchLang('en-US')">English</OButton>
  <OButton @click="switchLang('ja-JP')">日本語</OButton>

  <OConfigProvider :locale="currentLocale">
    <YourPageContent />
  </OConfigProvider>
</template>
```

**场景 3：全局 Link 点击拦截**
适用于：统一处理所有链接的点击行为（埋点、路由拦截等）

```vue
<script setup>
import { OConfigProvider, OLink } from '@opensig/opendesign';
import type { LinkConfigT } from '@opensig/opendesign';

const linkConfig: LinkConfigT = {
  click: (e, params, attrs) => {
    // 全局链接点击埋点
    console.log('Link clicked:', params.href, attrs);
    // 也可在此处进行路由拦截或其他全局处理
  },
};
</script>

<template>
  <OConfigProvider :link="linkConfig">
    <OLink href="/page1">页面一</OLink>
    <OLink href="/page2">页面二</OLink>
  </OConfigProvider>
</template>
```

**场景 4：同时配置语言和 Link 行为**
适用于：应用顶层统一配置

```vue
<script setup>
import { ref } from 'vue';
import { OConfigProvider } from '@opensig/opendesign';
import type { LinkConfigT } from '@opensig/opendesign';

const locale = ref({
  locale: 'en-US',
  'pagination.goto': 'go to',
  'pagination.page': 'Page',
});

const linkConfig: LinkConfigT = {
  click: (e, params, attrs) => {
    console.log('Global link click:', params, attrs);
  },
};
</script>

<template>
  <OConfigProvider :locale="locale" :link="linkConfig">
    <RouterView />
  </OConfigProvider>
</template>
```

### 常见 prop 组合速查

| 场景 | 推荐 prop 组合 | 说明 |
|------|---------------|------|
| 纯国际化 | `:locale="localeObj"` | 仅配置语言词条 |
| 纯链接拦截 | `:link="linkConfig"` | 仅配置全局链接行为 |
| 完整配置 | `:locale="localeObj"` + `:link="linkConfig"` | 同时配置语言和链接行为 |

### 响应式行为表

无。OConfigProvider 是纯逻辑组件，不涉及尺寸与布局变化。

### 补充说明

#### locale 词条优先级

OConfigProvider 提供的 locale 词条优先级高于通过 `useLocale()` 全局设置的语言包。具体来说：
- 被 OConfigProvider 包裹的组件：优先使用 OConfigProvider 的 locale 词条
- 未被 OConfigProvider 包裹的组件：使用全局 `useLocale()` 设置的语言包

#### 词条变量替换

locale 词条中支持 `{0}`、`{1}`、`{2}` 等占位符用于变量替换。例如 `'pagination.total': 'Total: {0}'`，在组件内部调用 `t('pagination.total', 100)` 时会替换为 `'Total: 100'`。

#### 内置词条键名

组件库内置支持以下词条键名：
- `common.empty` - 空状态文案
- `common.loading` - 加载中文案
- `pagination.goto` - 分页跳转
- `pagination.page` - 分页页码
- `pagination.countPerPage` - 每页条数
- `pagination.total` - 总数（支持 `{0}` 占位符）
- `upload.buttonLabel` - 上传按钮文案
- `upload.drag` - 拖拽上传文案
- `upload.dragHover` - 拖拽悬停文案
- `upload.retry` - 重试
- `upload.delete` - 删除
- `upload.preview` - 预览
- `upload.edit` - 编辑
- `select.cancel` - 取消
- `select.confirm` - 确认
- `input.limit` - 输入限制

#### link.click 回调触发条件

link.click 全局回调仅在 OLink 组件的 `global` 属性为 `true`（默认值即为 true）时触发。若某个 OLink 设置了 `:global="false"`，则该链接的点击不会触发全局回调。

### 组件布局结构

```yaml
component: OConfigProvider
root: 无DOM元素  # 模板仅为 <slot></slot>，不生成包裹元素
  direction: none
  visual-rendering: false
  mechanism: provide/inject
  provided-keys:
    - key: configProviderInjectKey
      value:
        locale: Ref<i18nLanguagesT | undefined>  # 语言词条配置
        link: Ref<LinkConfigT | undefined>        # Link组件全局点击回调
  children:
    - slot: default  # 所有子组件内容，直接渲染无包裹
```

### 设计稿识别指南

**视觉特征指纹**

1. 本组件无视觉表现，在设计稿中不可见。它是代码层面的配置容器
2. 当设计稿展示了多语言界面（如中英文切换后的不同文案）时，暗示需要在应用顶层使用 OConfigProvider 配置 locale
3. 当设计稿标注了"全局链接跳转行为"或"链接埋点"需求时，暗示需要配置 link 属性

**设计 Token → Prop 值映射表**

| 设计稿 Token / 视觉特征 | 对应 Prop / 配置 | 说明 |
|---|---|---|
| 界面语言为英文/日文等非默认语言 | `locale` | 传入对应语言词条对象 |
| 组件内文案（分页、上传等）需自定义 | `locale` 中对应键 | 如 `pagination.goto`、`select.cancel` 等 |
| 所有链接需统一埋点/拦截 | `link.click` | 全局链接点击回调 |

**易混淆组件区分表**

| 组件 A | 组件 B | 区分标准 |
|--------|--------|---------|
| OConfigProvider | OLayout / OContainer | ConfigProvider 不产生 DOM，纯逻辑注入；布局组件会产生实际 DOM 容器 |
| OConfigProvider (locale) | useLocale() | ConfigProvider 是局部范围注入，可嵌套覆盖；useLocale 是全局设置 |
| OConfigProvider (link) | OLink @click | ConfigProvider 的 link.click 是全局统一回调；OLink 的 @click 是单个链接的事件 |
