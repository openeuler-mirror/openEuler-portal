# organization

「关于我们 → 组织架构」页面的数据源。每个 YAML 对应页面上的一个委员会/工作组。

## 我要做什么……

### 改一个委员会里的成员

1. 找到对应的 YAML(比如改技术委员会就打开 `technical.yaml`)
2. 复制现有的一段(每段是一个成员),改 `name` / `name_en` / `image` / `position` / `position_en`
3. 把头像 PNG 放到 `images/` 下对应子目录(`images/technical/`),文件名要和 YAML 里 `image:` 字段一致
4. 提 PR

### 加一个新的委员会/工作组

1. 新建 YAML,文件名是 slug(比如 `newgroup.yaml`)
2. 复制现有任一文件的 schema 改
3. 找开发同学把 slug 加到页面的 SECTIONS 列表里(决定渲染位置)
4. 提 PR

> 渲染顺序不由文件名决定,由页面侧的 `SECTIONS` 数组决定。这样**顺序在代码里一眼可见**,新增组别不会因为文件名排序而错位。

## Schema

每个 YAML 必填 4 个顶部字段 + 三种**互斥**的数据形态之一:

```yaml
title:    中文标题
title_en: English title
id:       英文 anchor / 侧边栏 id(如 technical-committee)
id_zh:    中文 anchor / 侧边栏 id

# 选 1:平铺成员列表(最常见)
members: [...]

# 选 2:有子分组(比如主席/常委/委员)
groups: [...]

# 选 3:分行渲染(比如全球化工作组的主组 + 生态官)
rows: [...]
```

成员对象字段:

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` / `name_en` | ✅ | 中英文姓名 |
| `image` | ✅ | 相对 `images/` 的路径,支持子目录(`technical/huxinwei.png`)。跨组复用同一张图就写完整路径 |
| `position` / `position_en` | 二选一 | 单位或职位说明,可以是字符串(`华为技术有限公司`)或字符串数组(顾问那种多行 affiliation) |
| `post` / `post_en` | 二选一 | 角色标签(主席/委员)。技术委员会用这个字段是因为它的卡片样式里 post 是和 email/gitee 并列的「身份」 |
| `email` | 可选 | 邮箱,会渲染成 mailto 图标 |
| `gitee` | 可选 | Gitee 账号,会渲染成 Gitee 图标 |

具体例子看同目录下的 YAML 文件:

- `advisory.yaml` — 平铺 + 多行 affiliation
- `committee.yaml` — 子分组(`groups:`)
- `technical.yaml` — 平铺 + email/gitee/post
- `globalization.yaml` — 分行(`rows:`)
