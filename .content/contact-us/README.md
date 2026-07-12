# contact-us

联系我们页面数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据，共用同一个 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 联系我们页面中文数据（含所有板块） |
| `en.yaml` | 联系我们页面英文数据（含所有板块） |
| `images/` | 图片资源（zh/en 共用） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `contact_data` | 数组 | 社区联系卡片（4 项：资金捐赠 / 活动 / 品牌合作 / 其他） |
| `footer_codes` | 数组 | 公众号和小助手二维码（仅中文） |
| `follow_links` | 数组 | 社交媒体关注链接（X / LinkedIn / YouTube / Bilibili） |
| `handy_materials` | 数组 | 资源推荐卡片（文档 / 下载 / 贡献） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：如 `title`、`desc`、`email`、`href`，禁止 `title_zh` / `title_en` 后缀
- **主题变体用 `_light` / `_dark` / `_primary` 后缀**：扁平字段，如 `icon_light` / `icon_dark` / `icon_primary`
- **图片就近存放**：`images/` 下，文件名保留原名
- **zh/en 共用图**：不加后缀，两个 yaml 指向同一文件
- **不存放前端布局参数**（如 flexGap）

## 消费方式

```ts
import contactUsContent from '#content/contact-us';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';

const { isZh } = useLocale();
const contentData = computed(() => (isZh.value ? contactUsContent.zh : contactUsContent.en));

// 直接取板块数据
const handyMaterialsList = computed(() => contentData.value.handy_materials);

// 主题字段在 .map() 中合并为 camelCase（兼容组件模板 item.iconDark 写法）
const followLinks = computed(() =>
  contentData.value.follow_links.map((item) => ({
    ...item,
    iconDark: item.icon_dark,
    iconPrimary: item.icon_primary,
  }))
);
```

## Schema

### contact_data

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 卡片标题 |
| `email` | ✅ | 联系邮箱 |

### footer_codes

| 字段 | 必填 | 说明 |
|------|------|------|
| `code` | ✅ | 二维码图片 |
| `label` | ✅ | 二维码标题 |

### follow_links

| 字段 | 必填 | 说明 |
|------|------|------|
| `icon` | ✅ | 亮色主题图标 |
| `icon_dark` | ✅ | 暗色主题图标 |
| `icon_primary` | ✅ | 主色主题图标 |
| `href` | ✅ | 跳转链接 |
| `label` | ✅ | 显示名称 |

### handy_materials

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 卡片标题 |
| `desc` | ✅ | 卡片描述 |
| `href` | ✅ | 跳转链接 |
