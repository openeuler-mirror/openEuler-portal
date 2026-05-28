# organization

「关于我们 → 组织架构」页面的数据源。每个 YAML 对应页面上的一个委员会/工作组。

## 我要做什么……

### 改一个委员会里的成员

1. 找到对应的 YAML(比如改技术委员会就打开 `technical.yaml`)
2. 复制现有的一段(每段是一个成员),改 `name` / `name_en` / `image` / `position` / `position_en`
3. 把头像 PNG 放到 `images/` 下,文件名(或相对路径)和 YAML 里 `image:` 字段一致。当前是扁平结构,同名时给后来的那张加个区分后缀(比如 `huxinwei-ai.png`);也支持子目录写法(`image: technical/huxinwei.png`),按需选择
4. 提 PR

### 加一个新的委员会/工作组

1. 新建 YAML,文件名是 slug(比如 `newgroup.yaml`)
2. 复制现有任一文件的 schema 改
3. 找开发同学把 slug 加到页面的 SECTIONS 列表里(决定渲染位置)
4. 提 PR

> 渲染顺序不由文件名决定,由页面侧的 `SECTIONS` 数组决定。这样**顺序在代码里一眼可见**,新增组别不会因为文件名排序而错位。

## Schema

每个 YAML 必填 2 个顶部字段 + 三种**互斥**的数据形态之一:

```yaml
title:    中文标题
title_en: English title

# 选 1:平铺成员列表(最常见)
members: [...]

# 选 2:有子分组(比如主席/常委/委员)
groups: [...]

# 选 3:分行渲染(比如全球化工作组的主组 + 生态官)
rows: [...]
```

> **i18n 约定**:基线字段是中文(默认值),加 `_en` 后缀就是英文版本。所有字段都遵循同一套规则,运营改 YAML 时心智一致。
>
> **anchor 自动派生**:页面上的 HTML/URL anchor(`<h2 id="...">`)从 `title_en` 自动派生 —— 小写并把非字母数字字符替换为连字符(GFM/URL slug 规范)。例如 `openEuler Technical Committee` → `openeuler-technical-committee`。zh/en 页面用同一个英文 anchor。改 `title_en` anchor 会跟着变,如果外部有 deep link 依赖,需同步更新。

成员对象字段:

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `name` / `name_en` | ✅ | 中英文姓名 |
| `image` | ✅ | `images/` 下的文件名或相对路径,两种写法都支持:扁平(`huxinwei-technical.png`)或子目录(`technical/huxinwei.png`)。当前组织数据用的是扁平结构,同人不同照片靠文件名后缀(`-<标识>`)区分;跨组复用同一张图直接引用同一个文件名/路径即可 |
| `position` / `position_en` | 二选一 | 单位或职位说明,可以是字符串(`华为技术有限公司`)或字符串数组(顾问那种多行 affiliation) |
| `post` / `post_en` | 二选一 | 角色标签(主席/委员)。技术委员会用这个字段是因为它的卡片样式里 post 是和 email/gitee 并列的「身份」 |
| `email` | 可选 | 邮箱,会渲染成 mailto 图标 |
| `gitee` | 可选 | Gitee 账号,会渲染成 Gitee 图标 |

具体例子看同目录下的 YAML 文件:

- `advisory.yaml` — 平铺 + 多行 affiliation
- `committee.yaml` — 子分组(`groups:`)
- `technical.yaml` — 平铺 + email/gitee/post
- `globalization.yaml` — 分行(`rows:`)
