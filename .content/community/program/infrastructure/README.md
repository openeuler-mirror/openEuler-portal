# 基础设施（Infrastructure）

社区项目群-基础设施页面 logo 数据。zh 专属（en 无对应页面）。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 基础设施合作伙伴 logo 列表 |
| `images/` | logo 图片（亮色/暗色主题变体） |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `img_light` | 是 | 亮色主题 logo |
| `img_dark` | 是 | 暗色主题 logo |

## 消费方式

```ts
import infraContent from '#content/community/program/infrastructure';
const contributionData = infraContent.zh;
```
