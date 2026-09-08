# 技术教程（Technical Tutorial）

社区项目群-技术教程页面视频列表。zh/en 双语。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文视频列表 |
| `en.yaml` | 英文视频列表 |
| `images/` | 视频封面图（zh/en 共用） |

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 视频标题 |
| `url` | 是 | 视频链接（B站） |
| `img` | 是 | 视频封面图 |

## 消费方式

```ts
import tutorialContent from '#content/community/program/technical-tutorial';
tutorialContent[lang]; // 'zh' | 'en'
```
