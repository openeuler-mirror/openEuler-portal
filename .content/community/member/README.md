# community/member

成员单位数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据，共用同一个 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 成员单位中文数据 |
| `en.yaml` | 成员单位英文数据 |
| `images/` | logo 图片资源（zh/en 共用） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `donor_levels` | 数组 | 捐赠人级别列表（按级别从高到低） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：如 `donor_title`、`logo_list`、`no_icon`，禁止驼峰或后缀
- **主题变体用 `_light` / `_dark` 后缀**：扁平字段，如 `img_light` / `img_dark`
- **图片就近存放**：`images/` 下，文件名保留原名
- **zh/en 共用图**：不加后缀，两个 yaml 指向同一文件
- **公司名（alt）不翻译**：zh/en 都用中文公司名

## 消费方式

```ts
import memberContent from '#content/community/member';
import { computed } from 'vue';
import { useData } from 'vitepress';

const { lang } = useData();
const memberData = computed(() => (lang === 'zh' ? memberContent.zh : memberContent.en));
```

## Schema

### donor_levels

顶层 YAML 数组，每项为一个捐赠人级别：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 锚点 ID（中英文共用，用于页面锚点导航） |
| `donor_title` | ✅ | 级别标题 |
| `logo_list` | ✅ | logo 数组 |

#### logo_list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `img_light` / `img_dark` | ✅ | 亮/暗主题 logo |
| `alt` | ✅ | 图片 alt 文本（公司名，中英文共用） |
| `no_icon` | 可选 | 是否隐藏角标（`true` = 隐藏，不写 = 显示）。角标表示"捐赠协议正在流程中" |
