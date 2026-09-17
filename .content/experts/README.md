# 社区顾问专家（Experts）

社区顾问专家页面数据。zh 专属（en 无对应页面）。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 专家列表（4 人） |
| `images/` | 头像图片 |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `avator` | 是 | 头像图片 |
| `name` | 是 | 姓名 |
| `detail` | 是 | 职务描述数组 |

## 消费方式

```ts
import expertsContent from '#content/experts';
const experts = expertsContent.zh;
```
