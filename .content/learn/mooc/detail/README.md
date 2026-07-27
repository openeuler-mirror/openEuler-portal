# MOOC 详情页数据

`/zh/learn/mooc/detail/` 页面的数据源，按 locale 拆分到 `zh.yaml`（当前只有中文版本），图片存放在 `images/` 子目录。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文数据（ui 文案 + course_list 课程列表） |
| `images/` | 教师照片（yanglei.png、zhongyunan.png），yaml 中以 `./images/xxx.png` 引用 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `ui` | 对象 | 页面 UI 文案（面包屑、目录标题、按钮、上下页等） |
| `course_list` | 数组 | 课程列表，每项含 id/course_h1/welcome/nav_data 导航树 |

## 设计原则

- 按 locale 拆分数据文件（zh.yaml / en.yaml），字段用基线名（无 `_zh`/`_en` 后缀）
- 主题变体用 `_light`/`_dark` 后缀（本页无主题变体图片）
- 图片就近存放到 `images/`，文件名保留原名；共用图不加后缀
- 不存布局参数，只存内容数据
- 视频/PPT 链接为绝对 URL（华为云 OBS），不走 Vite 资源管线

## 消费方式

```ts
import moocDetailContent from '#content/learn/mooc/detail';
import { useData } from 'vitepress';

const { lang } = useData();
const data = computed(
  () => moocDetailContent[lang.value as 'zh' | 'en'] || moocDetailContent.zh
);
// data.value.ui.mooc        → '课程中心'
// data.value.course_list[0] → 课程对象
```

## Schema

### ui

| 字段 | 必填 | 说明 |
|------|------|------|
| mooc | 是 | 面包屑第一项「课程中心」 |
| mooc_course_title | 是 | 面包屑第二项课程标题 |
| mooc_catalog | 是 | 目录标题 |
| course_download | 是 | 课件下载按钮文案 |
| teacher_team | 是 | 讲师团队标题 |
| prev_text | 是 | 上一篇按钮文案 |
| next_text | 是 | 下一篇按钮文案 |

### course_list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| id | 是 | 课程 ID |
| course_h1 | 是 | 课程 H1 标题 |
| welcome | 是 | 欢迎语 |
| nav_data | 是 | 导航树（章节列表），见下 |

### nav_data[]（树状递归）

节点有三种形态：

| 字段 | 必填 | 说明 |
|------|------|------|
| label | 是 | 节点标题 |
| key | 叶子必填 | 节点唯一标识 |
| children | 章节节点 | 子节点数组（递归 nav_data） |
| introduction | 导读节点 | 导读文字数组 |
| teacher | 导读节点 | 教师列表（见下） |
| desc | 视频课节点 | 课程描述 |
| video_link | 视频课节点 | 视频 URL（华为云 OBS） |
| ppt_link | 导读/视频课节点 | PPT URL（华为云 OBS） |

### teacher[]

| 字段 | 必填 | 说明 |
|------|------|------|
| img | 是 | 教师照片 `./images/xxx.png` |
| position | 是 | 职位 |
| name | 是 | 姓名 |
