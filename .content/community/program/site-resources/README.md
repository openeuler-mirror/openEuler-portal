# 站点资源（Site Resources）

社区项目群-站点资源（会议室）列表。zh 专属（en 无对应页面）。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 会议室资源列表 |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `img` | 是 | 图片（当前均为空字符串） |
| `company` | 是 | 单位名称 |
| `type` | 是 | 房间类型 |
| `base` | 是 | 所在城市 |
| `scale` | 是 | 容纳人数 |

## 消费方式

```ts
import siteContent from '#content/community/program/site-resources';
const siteList = siteContent.zh;
```
