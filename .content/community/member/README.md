# 成员单位页 / Community Member

成员单位页（`/zh/community/member/`、`/en/community/member/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/community/member` 虚拟模块。

## 文件说明

| 文件 / 目录 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（6 级捐赠人 + tips + contact） |
| `en.yaml` | 英文页面数据（6 级捐赠人 + 空 tips，无 contact） |
| `images/` | 62 张成员单位 logo PNG（亮色/暗色变体 × 31 家） |

> CSS 装饰图标 `stash_light.png` / `stash_dark.png` 属组件 UI 资源，保留在 `@/assets/category/member/`，不在数据范围。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `donor_levels` | array | 捐赠人级别列表（6 级，按页面从上到下视觉顺序） |
| `tips` | array | 排序注释列表（en 为空数组） |
| `contact` | array? | 资金捐赠联系信息（仅 zh，en 不含此字段） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **字段用基线名**：snake_case（`donor_title` / `logo_list` / `no_icon`），由 camelCase 转换而来
- **logo zh/en 共用**：公司 logo 不分语言，`img_light`/`img_dark` 指向同一文件，不加 `_zh`/`_en` 后缀
- **主题变体 `_light`/`_dark`**：亮色/暗色 logo 各存一份
- **`alt` 共用**：公司名（中文）zh/en 共用同一套，不拆分
- **`no_icon` 省略 = 显示**：省略 `no_icon` 字段表示显示右上角装饰图标
- **`tips` en 为空数组**：原 i18n 的 TIP1/TIP2 只有 zh 值，en 为空数组
- **`contact` 仅 zh**：含 mailto 链接的 HTML 字符串，组件用 `v-dompurify-html` 渲染；en 不含此字段，组件用 `v-if` 判断
- **PNG 不带 `?raw`**：`<img>` 消费，非 inline SVG

## 消费方式

```ts
import { computed } from 'vue';
import { useData } from 'vitepress';
import memberContent from '#content/community/member';
import { useCommon } from '@/stores/common';

const { lang } = useData();
const commonStore = useCommon();
const memberData = computed(() => memberContent[lang.value as 'zh' | 'en']);
// 模板：v-for="line in memberData.donor_levels" / memberData.tips / memberData.contact
```

## Schema

### 顶层

| 字段 | 必填 | 说明 |
|------|------|------|
| `donor_levels` | 是 | 捐赠人级别列表 |
| `tips` | 是 | 排序注释列表（en 可为空数组） |
| `contact` | 否 | 资金捐赠联系信息（仅 zh，en 不含） |

### donor_levels[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | anchor ID（如 `Strategic-Donors`） |
| `donor_title` | 是 | 级别标题 |
| `logo_list` | 是 | logo 列表 |

### donor_levels[].logo_list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `img_light` | 是 | 亮色主题 logo（`./images/xxx_light.png`） |
| `img_dark` | 是 | 暗色主题 logo（`./images/xxx_dark.png`） |
| `alt` | 是 | alt 文本（公司名，zh/en 共用） |
| `no_icon` | 否 | 是否隐藏右上角装饰图标（省略 = 显示） |

### tips[] / contact[]

| 字段 | 类型 | 说明 |
|------|------|------|
| `tips[]` | string | 排序注释纯文本 |
| `contact[]` | string | 联系信息（可能含 HTML `<a>` 标签，用 `v-dompurify-html` 渲染） |
