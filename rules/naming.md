# 命名规范

## 路径别名

| 别名 | 实际路径 | 用途 |
|------|---------|------|
| `~@/` | `app/.vitepress/src-new/` | 新版代码（推荐，所有新功能使用此路径） |
| `@/` | `app/.vitepress/src/` | 旧版代码（兼容，禁止在新功能中引入） |
| `opendesign` | `./opendesign` | 本地 OpenDesign 组件库 |
| `#cms` | `./.cms/export/index.client.ts` | CMS 导出数据 |

```typescript
// ✅ 新版路径（推荐）
import { useLocale } from '~@/composables/useLocale';
import { getNewsData } from '~@/api/api-news';
import AppSection from '~@/components/AppSection.vue';

// ❌ 旧版路径（禁止在新功能中新增引用）
import SomeComp from '@/components/OldComp.vue';
```

---

## 文件命名

| 文件类型 | 规范 | 示例 |
|---------|------|------|
| Vue 组件 | PascalCase + `.vue` | `AppSection.vue`, `CveFilter.vue` |
| Composable | `use` + PascalCase + `.ts` | `useLocale.ts`, `useScreen.ts` |
| API 模块 | `api-` + 模块名 + `.ts` | `api-news.ts`, `api-sig.ts` |
| Store | 模块名（小写）+ `.ts` | `common.ts`, `download.ts` |
| 类型文件 | 模块名 + `.ts` | `sig.ts`, `search.ts` |
| SCSS | 短横线小写 | `screen.scss`, `font.scss` |

---

## 组件命名

- 文件名 PascalCase，与组件名一致
- 通用基础组件以 `App` 开头：`AppSection.vue`、`AppLink.vue`
- 页面级大组件以 `The` 开头：`TheHeader.vue`、`TheFooter.vue`
- 业务组件以功能模块命名：`CveFilter.vue`、`BlogCard.vue`

---

## Composable 命名

- 文件名和函数名均以 `use` 开头，PascalCase
- 返回对象而非单值，便于扩展

```typescript
// composables/useLocale.ts
export const useLocale = () => {
  const { t, locale } = useI18n();
  const isZh = computed(() => locale.value === 'zh');
  const isEn = computed(() => locale.value === 'en');
  return { t, locale, isZh, isEn };
};
```

---

## API 函数命名

- 函数名用动词 + 名词：`getNewsData`、`getSigList`、`postComment`
- 文件按业务模块分割：`api-news.ts`、`api-sig.ts`、`api-security.ts`

---

## Store 命名

| 类型 | 规范 | 示例 |
|------|------|------|
| defineStore ID | camelCase | `'cookie'`, `'userInfo'` |
| 使用函数 | `use` + PascalCase + `Store` | `useCookieStore`, `useDownloadStore` |

---

## 类型命名

| 用途 | 后缀 | 示例 |
|------|------|------|
| 请求参数 | `QueryT` / `ParamsT` | `NewsQueryT`, `SigListParamsT` |
| 单条数据 | `T` | `SigItemT`, `NewsItemT` |
| 列表响应 | `ListT` | `SigListT` |
| 详情响应 | `DetailT` | `SigDetailT` |

---

## i18n Key 命名

- 格式：`模块名.camelCase`
- 模块名与 i18n 目录下的子目录对应

```typescript
t('common.confirm')      // ✅
t('footer.qrCode')       // ✅
t('download.versionTip') // ✅
t('Confirm')             // ❌ 缺少模块前缀
```

---

## CSS 类名命名

- 使用 BEM 规范：`block__element--modifier`
- 全部小写短横线：`sig-card`、`sig-card__title`、`sig-card--active`
- 禁止使用 `camelCase` 作为 CSS 类名

```scss
.sig-card {          // block
  &__title { }       // element
  &__desc { }
  &--active { }      // modifier
}
```
