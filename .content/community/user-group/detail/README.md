# 用户组详情页数据

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文数据（详情页 banner、链接、FAQ、城市数据） |
| `images/` | 详情页使用的图片（banner、城市封面、人物头像等） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `detail` | 对象 | 详情页顶部 banner 图片（亮色/暗色 + PC/移动端） |
| `link` | 对象 | 活动申请和案例投稿链接 |
| `question` | 对象 | 如何成为 Organizer / Ambassador 的说明 |
| `guide` | 对象 | 详情页底部加入城市用户组引导 |
| `cities` | 数组 | 所有城市完整数据（organizer / ambassador / news / showcase） |

## 设计原则

- 仅中文（zh），无英文版
- 图片就近存放在本目录 `images/` 下
- yaml 中图片路径以 `./images/` 开头，由 vite-plugin-content-yaml 自动接入 Vite 资源管线
- 主题变体用 `_dark` 后缀区分

## 消费方式

```ts
import content from '#content/community/user-group/detail'

const { detail: detailData } = content.zh
const { link: linkData } = content.zh
const { question: questionData } = content.zh
const { guide: guideData } = content.zh
const { cities: cityData } = content.zh
```

## Schema

### detail

| 字段 | 必填 | 说明 |
|------|------|------|
| `banner` | 是 | PC 端亮色背景图 |
| `banner_dark` | 是 | PC 端暗色背景图 |
| `banner_mb` | 是 | 移动端亮色背景图 |
| `banner_mb_dark` | 是 | 移动端暗色背景图 |

### link

| 字段 | 必填 | 说明 |
|------|------|------|
| `applyEvent` | 是 | 活动申请链接 |
| `provideCase` | 是 | 案例投稿链接 |

### question

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 标题 |
| `desc1` | 是 | 说明文字（前半段） |
| `desc2` | 是 | 说明文字（后半段） |
| `mail` | 是 | 申请接收邮箱 |
| `subtitle1` | 是 | Organizer 副标题 |
| `intro1` | 是 | Organizer 介绍 |
| `subtitle2` | 是 | Ambassador 副标题 |
| `intro2` | 是 | Ambassador 介绍 |
| `tip` | 是 | Ambassador 贡献要求列表 |

### guide

| 字段 | 必填 | 说明 |
|------|------|------|
| `link1` | 是 | 邮箱地址 |
| `link2` | 是 | 邮件列表订阅链接 |
| `wechat` | 是 | 微信群二维码图片 |

### cities[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 城市名 |
| `img` | 是 | 城市封面图 |
| `data` | 是 | 城市详情数据 |

#### data

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 城市用户组标题 |
| `organizational` | 是 | 合作单位（字符串） |
| `organizer` | 否 | 组织者列表 |
| `ambassador` | 否 | 传播大使列表 |
| `salon` | 否 | 沙龙回顾列表 |
| `news` | 否 | 活动新闻列表 |
| `showcase` | 否 | 案例列表 |
