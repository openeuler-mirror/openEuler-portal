# 安全公告（Safety Bulletin）

安全公告/CVE/缺陷中心页面共享的严重等级映射和公告编号数据。zh/en 双语。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文等级映射 + 公告编号 |
| `en.yaml` | 英文等级映射 + 公告编号 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `type_map` | 数组 | 严重等级映射（从 Map 转为数组，消费时重建 Map） |
| `security_notice_nos` | 数组 | 特殊安全公告编号列表 |

## 未提取数据

| 数据 | 原因 |
|------|------|
| `queryYears` | 运行时动态生成（`new Date().getFullYear()` 往回推到 2020），保留在 `src-new/data/safety-bulletin/index.ts` |

## 消费方式

```ts
import safetyContent from '#content/security/safety-bulletin';
const typeMap = new Map(
  safetyContent.zh.type_map.map((item) => {
    const en = safetyContent.en.type_map.find((e) => e.key === item.key);
    return [item.key, { value: item.value, label: { zh: item.label, en: en?.label ?? item.label }, score: item.score }];
  })
);
const securityNoticeNos = safetyContent.zh.security_notice_nos;
```
