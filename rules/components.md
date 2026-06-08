# 组件规范

## SFC 文件结构顺序

Vue 单文件组件必须按以下顺序排列：

```vue
<script setup lang="ts">
// 1. Vue 核心 API（显式导入，VitePress 无自动注入）
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// 2. 第三方库
import { useVModel } from '@vueuse/core';

// 3. OpenDesign 组件和工具
import { OLink, OIcon, OButton } from '@opensig/opendesign';

// 4. 内部 composables / stores / utils / api
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCookieStore } from '~@/stores/cookie';
import { getNewsData } from '~@/api/api-news';

// 5. 内部组件（非自动导入，需显式引入）
import AppSection from '~@/components/AppSection.vue';

// 6. 类型导入
import type { NewsItemT } from '~@/@types/news';

// 7. Props 定义
interface CardPropsT {
  title: string;
  subtitle?: string;
  href?: string;
}
const props = withDefaults(defineProps<CardPropsT>(), {
  subtitle: undefined,
  href: undefined,
});

// 8. Emits 定义
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
  (e: 'close'): void;
}>();

// 9. Composables
const { t, isZh } = useLocale();
const { lePadV, isPhone } = useScreen();

// 10. 响应式状态
const loading = ref(false);
const list = ref<NewsItemT[]>([]);

// 11. Computed 属性
const filteredList = computed(() =>
  list.value.filter((item) => item.lang === (isZh.value ? 'zh' : 'en'))
);

// 12. Methods
const fetchData = async () => {
  loading.value = true;
  try {
    const res = await getNewsData({ page: 1 });
    list.value = res.list ?? [];
  } catch (error) {
    console.error('获取数据失败:', error);
  } finally {
    loading.value = false;
  }
};

// 13. 生命周期
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="news-list">
    <!-- 内容 -->
  </div>
</template>

<style lang="scss" scoped>
.news-list {
  // 样式
}
</style>
```

---

## Props 规范

```typescript
// ✅ TypeScript 泛型语法（推荐）
interface CardPropsT {
  title: string;
  count?: number;
  items: NewsItemT[];
}
const props = defineProps<CardPropsT>();

// ✅ 需要默认值时用 withDefaults
const props = withDefaults(defineProps<{
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}>(), {
  size: 'md',
  disabled: false,
});

// ❌ 禁止字符串形式
const props = defineProps(['title', 'count']);
```

---

## Emits 规范

```typescript
// ✅ TypeScript 泛型语法
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'nav-click', item: NavItemT): void;
  (e: 'close'): void;
}>();
```

---

## 组件复用层级

| 层级 | 目录 | 说明 |
|------|------|------|
| 通用组件 | `~@/components/` | 无业务逻辑，高度复用 |
| 子组件 | `~@/components/[模块]/` | 业务模块内部组件 |
| 页面视图 | `~@/views/[模块]/` | 业务模块页面级大组件 |
| 布局组件 | `~@/components/layout/` | 页面布局框架 |

---

## OpenDesign 组件优先

**能用 OpenDesign 组件的场景，必须用，禁止自行实现原生替代。**

```vue
<!-- ✅ 使用 OpenDesign -->
<OButton type="primary" @click="handleSubmit">提交</OButton>
<OSelect v-model="selected"><OOption value="a">选项A</OOption></OSelect>
<OTable :data="list" />
<ODialog v-model:visible="isOpen" />

<!-- ❌ 禁止原生替代 -->
<button class="btn-primary" @click="handleSubmit">提交</button>
<select v-model="selected"><option value="a">选项A</option></select>
```

常用 OpenDesign 组件：`OButton`、`OIcon`、`OLink`、`OTable`、`OSelect`+`OOption`、`ORadioGroup`+`ORadio`、`ODialog`、`OPopover`、`ODivider`、`OToggle`、`OPagination`

覆盖样式使用 `:deep()`，不要重写组件。

---

## 埋点指令

使用 `v-analytics` 指令进行数据埋点，不要自行调用埋点 API：

```vue
<!-- 冒泡模式 -->
<OButton v-analytics.bubble="{ target: 'download-button' }">
  下载
</OButton>

<!-- 捕获冒泡 -->
<div v-analytics.catchBubble="{ target: 'section-name' }">
  ...
</div>
```

---

## SSR/SSG 注意事项

VitePress 在构建时会进行 SSR，直接访问浏览器 API 会报错：

```vue
<!-- ✅ 使用 ClientOnly 包裹纯客户端组件 -->
<ClientOnly>
  <BrowserOnlyComponent />
</ClientOnly>

<!-- ✅ 在 onMounted 中访问 window/document -->
onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

// ✅ 使用 import.meta.client 判断
if (import.meta.client) {
  document.title = 'xxx';
}

// ❌ 禁止在 setup 顶层直接访问浏览器 API
const width = window.innerWidth; // SSR 报错
```

---

## 模板规范

```vue
<template>
  <!-- ✅ 单根元素 -->
  <div class="page-wrapper">

    <!-- ✅ v-if 优先于 v-show（频繁切换用 v-show） -->
    <AppLoader v-if="loading" />
    <NewsList v-else :items="list" />

    <!-- ✅ v-for 必须提供有语义的 :key，禁止用 index -->
    <NewsCard
      v-for="item in list"
      :key="item.id"
      :item="item"
      v-analytics.bubble="{ target: item.title }"
    />

    <!-- ✅ 多属性时每行一个 -->
    <OButton
      type="primary"
      :disabled="loading"
      @click="handleSubmit"
    >
      {{ t('common.confirm') }}
    </OButton>
  </div>
</template>
```

---

## 国际化

- 模板中使用 `{{ t('module.key') }}` 或 `$t('module.key')`
- Script 中通过 `useLocale()` 获取 `t`
- zh/en 两份翻译文件必须同步更新

```typescript
const { t, isZh, locale } = useLocale();

// 在 template 中
// {{ t('download.versionTip') }}
```

---

## Locale 配置不得硬编码

涉及 locale 列表/前缀/路径替换的逻辑，必须引用集中定义的配置常量（如 `SUPPORTED_LOCALES`），禁止在组件或 config 中直接硬编码 `'zh'`、`'en'` 等字符串。踩坑：`config.ts`、`AppHeader`、`HeaderLanguage` 中多处硬编码 `zh/en` 前缀，新增 locale 时需改多处且易遗漏。

---

## 避免冗余 Vue watch

当多个 reactive 源（如 `route.path` + `frontmatter.xxx`）触发同一份计算逻辑时，应合并为单一 `watch([source1, source2], ...)` 而非分别写多个 watcher。合并后通过新旧值对比区分触发来源，消除逻辑重复。踩坑：`AppHeader` 对 `router.route.path` 和 `frontmatter.availableLocales` 分别写了两个 watch，导致同一份过滤逻辑重复执行。

---

## 禁止事项

- 禁止在 `<template>` 中写复杂业务逻辑，抽取为 computed 或 method
- 禁止组件超过 400 行（考虑拆分）
- 禁止同一元素同时使用 `v-if` 和 `v-for`
- 禁止直接修改 props（通过 emit 通知父组件）
- 禁止 `<style>` 不加 `scoped`（全局样式需注释说明原因）
- 禁止在 setup 顶层直接访问 `window` / `document`
- 禁止用原生 HTML 元素替代 OpenDesign 组件
