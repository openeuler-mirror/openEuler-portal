# 硬件兼容性页 / Hardware Compatibility

硬件兼容性页（`/zh/compatibility/hardware/`、`/en/compatibility/hardware/`）的静态数据源，由 `OPlusYamlContentVitePlugin` 合成为 `#content/compatibility/hardware` 虚拟模块。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据 |
| `en.yaml` | 英文页面数据 |

> 本页数据均为文本/HTML，无图片资源，故无 `images/` 子目录。

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `hardware_info` | array | 硬件兼容性测试流程信息（简介 + 7 步测试流程） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- **字段用基线名**：双语已按文件拆分，无 `_zh` / `_en` 后缀
- **HTML 内联**：`desc` / `info` 文案中的链接以 `<a>` 标签内联，YAML 中用单引号包裹整个字符串
- **无图片资源**：本页纯文本/HTML 数据，不涉及 `images/` 目录与主题变体

## 消费方式

```ts
import { computed } from 'vue';
import compatibilityContent from '#content/compatibility/hardware';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
const hardWareInfo = computed(
  () => compatibilityContent[locale.value].hardware_info
);
```

## Schema

### hardware_info

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| desc | 否 | 描述文案列表（含 HTML `<a>` 链接） |
| list | 否 | 测试流程步骤列表 |
| list[].title | 是 | 步骤标题 |
| list[].desc | 否 | 步骤描述（含 HTML `<a>` 链接） |
| list[].tips | 否 | 提示文案（仅步骤 6 出现） |
| list[].columns | 否 | 表格列名（仅步骤 6 出现） |
| list[].data | 否 | 表格数据（仅步骤 6 出现） |
| list[].data[].content | 是 | 内容名 |
| list[].data[].info | 是 | 内容描述（含 HTML `<a>` 链接） |
