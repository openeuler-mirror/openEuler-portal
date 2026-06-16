# home

首页数据源。每条记录是一个完整实体。

## 文件说明

| 文件 | 说明 |
|------|------|
| `banner.yaml` | 首页轮播图实体 |

## 设计原则

- 多语言用 `_zh` / `_en` 后缀，不做顶层 zh/en 分离
- PC/Pad 背景图中英文共用，仅移动端不同时加后缀
- 不存放前端布局参数（如 text_width）

## 新增轮播图

1. 在 `banner.yaml` 列表**顶部**插入新记录（最新排前面）
2. 把背景图放到 `images/<活动名>/` 目录下
3. 提 PR

## Schema

### banner.yaml

顶层 YAML 数组：

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | ✅ | PC 端背景图 |
| `bg_pad` | ✅ | 平板端背景图 |
| `bg_mb` | 可选 | 移动端背景图（中英文共用） |
| `bg_mb_zh` / `bg_mb_en` | 可选 | 移动端背景图（中英文不同时） |
| `bg_theme` | ✅ | `light` / `dark` |
| `text_theme` | 可选 | `dark` 表示白色文字 |
| `title_zh` / `title_en` | ✅ | 标题（字符串或数组） |
| `subtitle_zh` / `subtitle_en` | 可选 | 副标题 |
| `btn_zh` / `btn_en` | 可选 | 按钮文案 |
| `href_zh` / `href_en` | ✅ | 跳转链接 |
| `is_blank` | 可选 | 是否新窗口打开 |
| `attach` | 可选 | 附加装饰图 |

### images/ 命名约定

| 类型 | 命名 | 示例 |
|------|------|------|
| 背景图 | `<活动名>/pc.jpg`、`pad.jpg`、`mb.jpg` | `images/annual-report/pc.jpg` |
| 多语言移动端 | `<活动名>/mb_<lang>.jpg` | `images/annual-report/mb_en.jpg` |
