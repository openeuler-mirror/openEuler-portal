# community/organization

「关于我们 → 组织架构」页面（`/zh/community/organization`、`/en/community/organization`）的数据源。按 skill 文档标准模式组织：`zh.yaml` / `en.yaml` 两个文件分别存放中英文数据，共用同一个 `images/` 子目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 中文数据（按委员会/工作组 slug 索引） |
| `en.yaml` | 英文数据（按委员会/工作组 slug 索引） |
| `images/` | 头像图片资源（zh/en 共用，扁平结构） |

## 数据板块

`zh.yaml` / `en.yaml` 顶层对象，按委员会/工作组 slug 索引。**渲染顺序不由 slug 字母序决定**，由 `app/.vitepress/src/views/organization/TheOrganization.vue` 的 `SECTIONS` 数组定义（产品决策，写在视图代码里一眼可见）。

| slug | 类型 | 中文标题 | 英文标题 |
|------|------|---------|---------|
| `advisory` | members | 顾问专家委员会 | Advisory Committee |
| `committee` | groups | 委员会 | openEuler Committee |
| `technical` | members | 技术委员会 | Technical Committee |
| `marketing` | members | 品牌委员会 | Marketing Committee |
| `user` | members | 用户委员会 | User Committee |
| `business` | members | 业务发展工作组 | Service Development Working Group |
| `operations` | members | 社区运营工作组 | Operations Working Group |
| `education` | members | 教育工作组 | Education Working Group |
| `legal` | members | 法务工作组 | Legal Affairs Working Group |
| `ai` | members | AI 联合工作组 | AI Joint Working Group |
| `globalization` | rows | 全球化工作组 | Globalization Working Group |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 两个文件，不使用 `_zh` / `_en` 后缀字段
- **字段用基线名**：如 `name`、`title`、`position`、`post`，禁止后缀
- **图片就近存放**：`images/` 下，文件名保留原名（扁平结构，跨组复用同一张图直接引用同一文件名即可）
- **zh/en 共用头像**：两个 yaml 中 `image` 字段指向同一文件，`vite-plugin-content-yaml` 保证输出 URL 一致
- **同人不同照片用文件名后缀区分**：如 `huxinwei-technical.png`、`huxinwei-ai.png`、`chenyaqiang-technical.png`
- **anchor 显式写在 yaml 里 + 组件兜底规范化**：每个 section 有 `anchor` 字段（zh/en 共用同一英文 anchor 值，仅小写字母/数字/连字符，符合 GFM/URL slug 规范）。组件读取后用 `deriveAnchor()` 兜底规范化（避免运营误写大写/空格/特殊字符造成锚点失效）。测试校验 yaml 里的 anchor 已是规范形式，如果不是测试失败提醒修正。改 `anchor` 字段时外部 deep link 依赖需同步更新

## 消费方式

```ts
import { computed } from 'vue';
import { useLocale } from '~@/composables/useLocale';
import type { OrgT } from '@/@types/type-organization';

import organizationContent from '#content/community/organization';

const SECTIONS = [
  'advisory', 'committee', 'technical', 'marketing',
  'user', 'business', 'operations', 'education',
  'legal', 'ai', 'globalization',
] as const;

// 把任意字符串规范成 GFM/URL slug:小写 + 非字母数字替换为连字符 + 去首尾连字符。
// anchor 显式写在 yaml 里,但运营可能误写大写/空格/特殊字符,这里兜底规范化。
function deriveAnchor(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const { isZh } = useLocale();

// 数据已按 locale 拆分到 zh.yaml/en.yaml,无需 foldI18n。
// anchor 显式写在 yaml 里(zh/en 共用同一英文 anchor 值),经 deriveAnchor 兜底规范化后使用。
const sections = computed<OrgT[]>(() =>
  SECTIONS.map((slug) => {
    const data = isZh.value ? organizationContent.zh[slug] : organizationContent.en[slug];
    return { ...data, anchor: deriveAnchor(data.anchor) } as OrgT;
  }),
);
```

## 我要做什么……

### 改一个委员会里的成员

1. 同时打开 `zh.yaml` 和 `en.yaml`
2. 在对应 slug 下的 `members` / `groups[].members` / `rows[]` 中复制现有的一段（每段是一个成员）
3. `zh.yaml` 改 `name` / `position` / `post`（中文值）；`en.yaml` 改对应字段的英文值
4. 把头像 PNG 放到 `images/` 下，`image` 字段写 `./images/<原文件名>.png`，zh/en 两个 yaml 指向同一文件
5. 提 PR

### 加一个新的委员会/工作组

1. 在 `zh.yaml` 和 `en.yaml` 顶层各加一段 `<slug>:` 块（slug 用 kebab-case，与 URL 路径风格一致）
2. 复制现有任一 section 的 schema 改（三选一形态：`members` / `groups` / `rows`）
3. 找开发同学把 slug 加到 `TheOrganization.vue` 的 `SECTIONS` 数组里（决定渲染位置）
4. 提 PR

> 渲染顺序不由 slug 字母序决定，由 `SECTIONS` 数组决定。这样**顺序在代码里一眼可见**，新增组别不会因为文件名排序而错位。

## Schema

### 顶层结构

每个 yaml 文件顶层是按 slug 索引的对象：

```yaml
advisory:
  title: openEuler 委员会顾问专家委员会
  anchor: advisory-committee-of-the-openeuler-committee
  members: [...]            # 形态三选一(互斥)

committee:
  title: openEuler 委员会
  anchor: openeuler-committee
  groups: [...]             # 子分组形态

globalization:
  title: openEuler 全球化工作组
  anchor: openeuler-globalization-working-group
  rows: [...]               # 分行形态
```

### section 字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 委员会/工作组名称（zh 中文、en 英文） |
| `anchor` | ✅ | 页面 HTML 锚点 ID（zh/en 共用同一英文 anchor 值，仅小写字母/数字/连字符，如 `openeuler-technical-committee`） |
| `members` | 三选一 | 平铺成员列表（最常见） |
| `groups` | 三选一 | 子分组（按职位分组，如主席/常委/委员） |
| `rows` | 三选一 | 分行渲染（数组的数组，每行是一组同级成员，如全球化工作组的主组 + 生态官） |

### 成员字段

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | ✅ | 姓名（zh 中文、en 英文，空格分隔的 ASCII） |
| `image` | ✅ | `images/` 下的文件名或相对路径，必须以 `./images/` 开头触发 `vite-plugin-content-yaml` 资源管线 |
| `position` | 可选 | 单位或职位说明，可以是字符串（`华为技术有限公司`）或字符串数组（顾问那种多行 affiliation） |
| `post` | 可选 | 角色标签（主席/委员/组长/组员）。技术委员会用这个字段，因为它的卡片样式里 post 是和 email/gitee 并列的「身份」 |
| `email` | 可选 | 邮箱，会渲染成 mailto 图标 |
| `gitee` | 可选 | Gitee 账号（当前页面模板里 gitee 链接被 `v-if="false"` 禁用，字段保留备用） |

### 三种 section 形态示例

- `advisory`（`advisory:` 块）— 平铺 `members` + 多行 `position`（数组）
- `committee`（`committee:` 块）— 子分组 `groups:`，每个 group 有自己的 `title` + `members`
- `globalization`（`globalization:` 块）— 分行 `rows:`，外层每个元素是一行，内层是这一行的成员

> **i18n 约定**：zh/en 两个 yaml 结构必须一致（section slug 相同、形态相同、成员数相同、image 指向同一文件）。文案分别对应。
