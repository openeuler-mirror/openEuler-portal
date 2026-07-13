# 用户组主页数据

`/community/user-group/` 主页（非详情页）数据源。详情页数据见同目录 [`detail/`](./detail/README.md)。

## 文件说明

| 文件/目录 | 说明 |
|-----------|------|
| `zh.yaml` | 中文数据（主页 banner、引导、角色介绍、申请说明、城市列表） |
| `images/common/` | 主页公共图片（banner、角色背景与 logo、微信群二维码） |
| `images/city/` | 各城市封面图（用于主页城市入口卡片） |
| `detail/` | 详情页数据，见 [detail/README.md](./detail/README.md) |

## 数据板块

`zh.yaml` 顶层对象，按板块名索引：

| 板块 | 类型 | 说明 |
|------|------|------|
| `banner` | 对象 | 主页顶部 banner（背景图、标题、描述、订阅按钮） |
| `guide` | 对象 | 「加入用户组」引导（说明文案、邮箱、邮件列表、微信群） |
| `intro` | 对象 | 成员角色、权益与义务介绍（Member / Ambassador / Organizer / Co-organizer） |
| `question` | 对象 | 如何成为 Organizer / Ambassador 的申请说明与贡献要求 |
| `cityList` | 数组 | 主页城市入口列表（仅城市名 + 封面图，详情见 `detail/`） |

## 设计原则

- **仅中文（zh）**，无英文版
- **按文件拆分 locale**：仅 `zh.yaml`（不使用 `_zh` / `_en` 后缀字段）
- **图片就近存放**：yaml 中图片路径以 `./images/` 开头，由 `vite-plugin-content-yaml` 自动接入 Vite 资源管线（输出带 hash 的真实 URL）
- **主页与详情页分离**：本目录 `zh.yaml` 只含主页所需数据；城市完整数据（organizer / ambassador / news / showcase）放在 `detail/zh.yaml`
- **不存放前端布局参数**（如 pageSize、grid 列数）

## 消费方式

```ts
import content from '#content/community/user-group';

const { banner: bannerData } = content.zh;
const { guide: guideData } = content.zh;
const { intro: introData } = content.zh;
const { question: questionData } = content.zh;
const cityData = content.zh.cityList;
```

类型见 `app/.vitepress/src-new/@types/content/user-group.d.ts`（`UserGroupMainT`）。

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | ✅ | PC 端背景图（`./images/common/user-group-banner.jpg`） |
| `title` | ✅ | banner 标题 |
| `desc` | ✅ | banner 描述 |
| `btn` | ✅ | 订阅按钮文案 |
| `href` | ✅ | 订阅链接 |

### guide

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 标题 |
| `subtitle1` / `subtitle2` | ✅ | 子标题 |
| `desc1` / `desc2` / `desc3` | ✅ | 说明文案 |
| `tip1` / `tip2` | ✅ | 微信加群提示 |
| `link1` | ✅ | 邮箱地址 |
| `link2` | ✅ | 邮件列表订阅链接 |
| `mail` | ✅ | 邮件订阅按钮文案 |
| `wechat` | ✅ | 微信群二维码图（`./images/common/wechat.png`） |

### intro

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 标题 |
| `desc` | ✅ | 角色晋升说明 |
| `introList` | ✅ | 角色卡片列表（见下） |

#### introList[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 角色名 + 描述数组（`{ name, desc }`） |
| `background` | ✅ | 卡片背景图 |
| `logo` | ✅ | 角色 logo |
| `rights` | ✅ | 权益列表（字符串或带跳转链接的对象 `{ text, operation, url }`） |
| `obligation` | ✅ | 义务列表（同上） |

### question

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 标题 |
| `desc1` / `desc2` | ✅ | 申请说明文案（前后段） |
| `mail` | ✅ | 申请接收邮箱 |
| `subtitle1` / `intro1` | ✅ | Organizer 副标题与介绍 |
| `subtitle2` / `intro2` | ✅ | Ambassador 副标题与介绍 |
| `tip` | ✅ | Ambassador 贡献要求列表 |

### cityList[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | ✅ | 城市名 |
| `img` | ✅ | 城市封面图（`./images/city/<city>.jpg`） |
