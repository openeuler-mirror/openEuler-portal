# Intelligence BooM

Intelligence BooM 页面数据。zh/en 双语。

## 文件说明

| 文件 | slug | 用途 |
|------|------|------|
| `members.yaml` | `members` | 成员 logo 列表（25 对 light/dark，非语言相关） |
| `zh.yaml` | `zh` | 中文愿景 + 版本信息 |
| `en.yaml` | `en` | 英文愿景 + 版本信息 |
| `images/` | — | 50 张 logo + 2 张版本图片 |

## 数据板块

| 板块 | 文件 | 类型 | 用途 |
|------|------|------|------|
| `members` | `members.yaml` | 数组 | 成员 logo 对列表 |
| `vision` | `zh/en.yaml` | 数组 | 愿景列表（3 项/语言） |
| `version_info` | `zh/en.yaml` | 对象 | 版本信息（首版本 + 第二版本，含特性树） |

## 未提取数据

| 数据 | 原因 |
|------|------|
| `ARCHITECTURE_DATA` | 复杂树形结构，`name_zh`/`name_en` 与 `name` 共存于同一对象，无法简单按 locale 拆分。保留在 `src-new/data/project/intelligence-boom.ts` 中 |

## 消费方式

```ts
import boomContent from '#content/projects/intelligence-boom';
boomContent.members;              // logo 列表
boomContent[locale].vision;       // 愿景列表
boomContent[locale].version_info; // 版本信息
```
