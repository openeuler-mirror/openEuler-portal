# OSV 测评详情（Approve Info）

OSV 测评详情页数据。zh 专属（en 页面存在但数据只有 zh）。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | OSV 测评模板（服务器 + 嵌入式） |

## Schema

### template / flushbonading

两个板块结构相同，均为数组。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `lists` | 是 | 检测项数组 |

#### lists[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 检测项名称 |
| `desc` | 是 | 检测项描述 |
| `result` | 是 | 检测结果 |

## 消费方式

```ts
import templatData from '#content/approve/approve-info';
templatData.zh.template      // 服务器 OSV 模板
templatData.zh.flushbonading // 嵌入式 OSV 模板
```
