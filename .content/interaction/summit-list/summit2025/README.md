# Summit 2025 页面数据

`/zh/interaction/summit-list/summit2025/` 与 `/en/interaction/summit-list/summit2025/` 页面的静态数据源。按语言拆分为 `zh.yaml` / `en.yaml`，共用 `images/` 子目录。图片由 OPlusYamlContentVitePlugin 在构建时重写为带 hash 的真实 URL。

## 文件说明

| 文件 / 目录 | 用途 |
|-------------|------|
| `zh.yaml` | 中文页面数据 |
| `en.yaml` | 英文页面数据 |
| `images/` | 页面引用的图片资源（banner / text 图 / `logo/` / `guest/`） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 对象 | 顶部 banner（PC/移动端背景图、文字图、报名链接） |
| `introduce` | 对象 | 大会介绍（描述、亮点列表、口号） |
| `live` | 对象 | 活动直播（按日期分组的直播间列表） |
| `agent` | 对象 | 活动日程（主论坛/分论坛议程，含嘉宾与职务） |
| `guest` | 对象 | 活动嘉宾（各论坛嘉宾照片与职务） |
| `partner` | 对象 | 共建单位（主办/联合主办/协办/支持方 logo） |
| `previous` | 对象 | 精彩回顾（历届峰会链接） |

## 设计原则

- 按文件拆分 locale：`zh.yaml` 与 `en.yaml` 字段名相同，文案分别维护
- 字段使用基线名（无 `_zh` / `_en` 后缀）
- 主题变体（亮色/暗色）拆为 `light` / `dark` 两个字段
- 图片就近存放到 `images/`，**文件名保留原名**；zh/en 共用同一张图时不加后缀
- 图片路径以 `./images/xxx.ext` 书写（必须带 `./` 前缀）
- 字段名统一使用 snake_case（原 TS 中的 camelCase 已转换，如 `bgMb` → `bg_mb`、`textImg` → `text_img`、`liveId` → `live_id`）
- 不存布局参数，仅存内容数据

## 消费方式

```ts
import summitContent from '#content/interaction/summit-list/summit2025';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';

const { locale } = useLocale();
const summitData = computed(() => summitContent[locale.value]);
```

类型声明见 `app/.vitepress/src-new/@types/content/interaction.d.ts`（`Summit2025*` 前缀）。

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg` | 是 | PC 背景图，含 `light` / `dark` |
| `bg_mb` | 是 | 移动端背景图，含 `light` / `dark` |
| `text_img` | 是 | PC 文字图，含 `light` / `dark` |
| `text_img_mb` | 是 | 移动端文字图，含 `light` / `dark` |
| `sign_up_title` | 是 | 报名按钮文案 |
| `watch_replay` | 是 | 观看回放按钮文案 |
| `replay_link` | 是 | 回放锚点链接 |
| `link` | 是 | 报名链接，含 `pc` / `mo` |

### introduce

| 字段 | 必填 | 说明 |
|------|------|------|
| `desc` | 是 | 大会描述（字符串数组，每项一段） |
| `tips` | 是 | 亮点引导文案 |
| `list` | 是 | 亮点列表（字符串数组） |
| `slogan` | 是 | 口号（字符串数组） |

### live

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `list` | 是 | 按日期分组的直播列表 |
| `list[].time` | 是 | 日期文案 |
| `list[].lives` | 是 | 该日直播间数组 |
| `list[].lives[].live_id` | 是 | 直播间 ID |
| `list[].lives[].live_test_id` | 是 | 测试直播间 ID |
| `list[].lives[].id` | 否 | 额外标识 |
| `list[].lives[].name` | 是 | 直播间名称 |

### agent

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `tips` | 是 | 提示文案 |
| `text` | 是 | 详情按钮文案 |
| `list` | 是 | 按日期分组的日程 |
| `list[].date` | 是 | 日期 |
| `list[].children` | 是 | 论坛数组（主论坛/分论坛） |
| `list[].children[].title` | 是 | 论坛标题 |
| `list[].children[].children` | 是 | 主论坛议程项数组（分论坛为空） |
| `list[].children[].tab` | 是 | 分论坛场次数组（主论坛为空） |
| `list[].children[].children[].time` | 是 | 议程时间段 |
| `list[].children[].children[].content` | 是 | 议程内容数组 |
| `list[].children[].tab[].label` | 是 | 分论坛场次标签 |
| `list[].children[].tab[].time` | 是 | 场次时间段 |
| `list[].children[].tab[].address` | 是 | 场次地点 |
| `list[].children[].tab[].children` | 是 | 场次议程项数组 |
| `content[].title` | 是 | 议程标题 |
| `content[].name` | 否 | 演讲者姓名 |
| `content[].post` | 否 | 演讲者职务 |
| `content[].guest` | 否 | 致辞嘉宾数组（`{ name, post }`） |

### guest

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `list` | 是 | 嘉宾分组数组 |
| `list[].title` | 是 | 分组标题 |
| `list[].children` | 是 | 嘉宾数组 |
| `list[].children[].name` | 是 | 嘉宾姓名 |
| `list[].children[].img` | 是 | 嘉宾照片（`./images/guest/xxx.png`） |
| `list[].children[].title` | 是 | 嘉宾职务（可能含 `\n` 换行） |

### partner

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `list` | 是 | 共建单位分组数组 |
| `list[].title` | 是 | 分组标题 |
| `list[].logos` | 是 | logo 数组 |
| `list[].logos[].light` | 是 | 亮色 logo |
| `list[].logos[].dark` | 是 | 暗色 logo |

### previous

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题（en 可为空字符串） |
| `list` | 是 | 历届峰会链接数组（en 可为空数组） |
| `list[].name` | 是 | 历届名称 |
| `list[].link` | 是 | 历届链接 |
