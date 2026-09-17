# 智能化部署场景（Intelligence Deploy）

智能化页面部署场景数据。zh 专属（组件 `v-if="isZh"` 仅中文渲染）。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 部署场景列表（4 项） |
| `images/` | 7 张背景图（亮色/暗色主题变体） |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 场景标识 |
| `title` | 是 | 场景标题 |
| `img` | 是 | 亮色主题背景图 |
| `img_dark` | 是 | 暗色主题背景图 |
| `list` | 是 | 文档链接列表 |

### list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `text` | 是 | 链接文案 |
| `href` | 是 | 链接地址 |

## 消费方式

```ts
import deployContent from '#content/projects/intelligence';
const deployList = deployContent.zh;
```
