# CVE 安全漏洞页数据 / CVE page data

CVE 列表页和详情页的静态配置数据。zh/en 双语。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文 CVE 状态/原因/术语表 |
| `en.yaml` | 英文 CVE 状态/原因/术语表 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `status_map` | 数组 | 状态映射（从 Map 转为数组，消费时重建 Map） |
| `reason` | 数组 | 修复原因筛选选项 |
| `glossary` | 数组 | 术语表 |

## 设计原则

- 原 `statusMap` 是运行时 `Map`，yaml 中转为数组（含 `key` 字段），消费时重建 `Map`
- `{zh, en}` 双语字段按文件拆分；消费时用 `{zh: val, en: val}` 包装以兼容现有模板 `[locale]` 访问
- `listZh`/`listEn` 合并为 `list`，消费时分别赋给 `listZh`/`listEn`

## 消费方式

```ts
import cveContent from '#content/security/cve';
const cveData = computed(() => cveContent[locale.value]);
const statusMap = computed(() => {
  const map = new Map();
  cveData.value.status_map.forEach((item) => {
    map.set(item.key, { value: item.value, label: { zh: item.label, en: item.label }, tag: { zh: item.tag, en: item.tag } });
  });
  return map;
});
```
