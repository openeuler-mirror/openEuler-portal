# 行业白皮书（Industry White Paper）

行业白皮书下载页面数据。zh/en 双语。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文白皮书列表（2 条） |
| `en.yaml` | 英文白皮书列表（1 条） |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `banner` | 是 | 卡片背景图路径（公开资源 URL，非 import） |
| `path` | 是 | PDF 下载链接 |
| `summary` | 是 | 白皮书摘要 |

## 消费方式

```ts
import whitePaperData from '#content/showcase/industry-white-paper';
const technicalData = whitePaperData[lang.value]; // 'zh' | 'en'
```
