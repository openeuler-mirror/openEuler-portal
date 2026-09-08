# OEVP 专家（Join OEVP）

社区项目群-Join OEVP 页面专家列表。zh/en 双语。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文专家列表（31 人） |
| `en.yaml` | 英文专家列表（31 人） |
| `images/` | 头像图片（zh/en 共用） |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `avator` | 是 | 头像图片 |
| `name` | 是 | 姓名 |
| `company` | 是 | 公司 |
| `labels` | 是 | 专业领域标签数组 |
| `base` | 是 | 所在地 |

## 消费方式

```ts
import oevpList from '#content/community/program/join-oEVP';
const data = computed(() => oevpList[lang.value].sort((a, b) => a.name.localeCompare(b.name)));
```

> 注意：`weijiangang .png` 文件名含尾部空格，yaml 路径已用引号包裹。
