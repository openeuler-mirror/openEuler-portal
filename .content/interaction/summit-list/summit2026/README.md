# Summit 2026 页面数据

`/zh/interaction/summit-list/summit2026/` 与 `/en/interaction/summit-list/summit2026/` 页面的静态数据源。按语言拆分为 `zh.yaml` / `en.yaml`，共用 `images/` 子目录。图片由 OPlusYamlContentVitePlugin 在构建时重写为带 hash 的真实 URL。

## 文件说明

| 文件 / 目录 | 用途 |
|-------------|------|
| `zh.yaml` | 中文页面数据 |
| `en.yaml` | 英文页面数据 |
| `images/` | 页面引用的图片资源（banner / 文字图 / 浮窗 / 嘉宾头像 `guests/` / `logo/`） |
| `_schema.yaml` | 内容编辑器元数据：字段中文名 + 编辑白名单（zh/en 双份） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 对象 | 顶部 banner（PC/平板/移动端背景图、文字图、按钮链接） |
| `apply_bar` | 对象 | 页面底部浮窗（fixed 吸底，与 cookie 提示物理堆叠；按钮链接复用 banner） |
| `introduce` | 对象 | 大会简介（描述、亮点列表、口号） |
| `agent` | 对象 | 活动日程（主论坛/分论坛/技术沙龙议程，含嘉宾与职务；分论坛支持闭门态与占位卡片） |
| `guest` | 对象 | 活动嘉宾（头像 + 单位 + 职称，按主论坛/分论坛/技术沙龙分组） |
| `partner` | 对象 | 共建单位（主办/联合主办/协办/支持方 logo；`visible: false` 可隐藏整个板块） |
| `previous` | 对象 | 精彩回顾（历届峰会链接） |

## 设计原则

- 按文件拆分 locale：`zh.yaml` 与 `en.yaml` 字段名相同，文案分别维护
- 字段使用基线名（无 `_zh` / `_en` 后缀）
- 主题变体（亮色/暗色）拆为 `light` / `dark` 两个字段
- 图片就近存放到 `images/`，**文件名保留原名**；zh/en 共用同一张图时不加后缀
- 图片路径以 `./images/xxx.ext` 书写（必须带 `./` 前缀）
- 字段名统一使用 snake_case（`TheSummit.vue` 消费时递归转 camelCase）
- 不存布局参数，仅存内容数据

## 消费方式

```ts
import summitContent from '#content/interaction/summit-list/summit2026';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';

const { locale } = useLocale();
// YAML 字段名为 snake_case，子组件期望 camelCase，递归转换
const summitData = computed(() => snakeToCamel(summitContent[locale.value]));
```

组件入口见 `app/.vitepress/src-new/views/summit/summit2026/TheSummit.vue`。

## Schema

字段中文名与编辑白名单见 [_schema.yaml](./_schema.yaml)（目录级元数据，内容编辑器消费）。
白名单严格匹配：**未注册的字段在编辑器中不可编辑**；新增字段时需同步在 `_schema.yaml` 的 zh/en 两侧补注册。
覆盖率审计（vscode-portal-cms 仓库）：

```bash
node scripts/audit-schema.mjs <本目录>
```

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | 是 | PC 背景图，含 `light` / `dark` |
| `bg_pad` | 是 | 平板背景图，含 `light` / `dark` |
| `bg_mb` | 是 | 移动端背景图，含 `light` / `dark` |
| `text_img` | 是 | PC/平板文字图（透明底 PNG），含 `light` / `dark` |
| `text_img_mb` | 是 | 移动端文字图，含 `light` / `dark` |
| `text_img_alt` | 是 | 文字图替代文本（无障碍） |
| `button_text` | 是 | 按钮文案（大会期「立即报名」，会后「观看回放」） |
| `button_link` | 是 | 按钮链接（PC/平板；大会期为外部报名页，会后为本页回放锚点 `#live`） |
| `button_link_mb` | 是 | 按钮链接（移动端，≤840px 使用；回放锚点与 PC 同一目标） |

### apply_bar

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | 是 | >840px 浮窗背景图，含 `light` / `dark` |
| `bg_mb` | 是 | ≤840px 浮窗背景图，含 `light` / `dark` |
| `title` | 是 | 浮窗标题 |
| `date_place` | 是 | 时间地点（一行文案） |
| `button_text` | 是 | 按钮文案（链接复用 `banner.button_link` / `button_link_mb`） |

### introduce

| 字段 | 必填 | 说明 |
|------|------|------|
| `desc` | 是 | 大会描述（字符串数组，每项一段，支持 `<strong>` 内联标记） |
| `tips` | 是 | 亮点引导文案 |
| `list` | 是 | 亮点列表（字符串数组） |
| `slogan` | 是 | 口号（字符串数组） |

### agent

议程按**页面的导航层级**组织：天 → 论坛 →（分论坛的）场次 → 议程条目。每条议程是扁平对象（时间/标题/嘉宾都在条目上，无再下层包装）。同一时间段内连续多条在页面上自动合并展示（时间只显示一次）。

```
agent.days[]                      # 按天
  .forums[]                       # 当天论坛（kind 决定渲染形态）
    .agenda[]                     # 主论坛议程（kind: main）
    .sessions[]                    # 分论坛场次（kind: sub）
      .agenda[]                   # 场次议程
    .cards[]                      # 技术沙龙卡片（kind: salon）
      .agenda[]                   # 沙龙议程（手风琴展开）
    .pending_cards[]              # 占位卡片
```

**天 / 论坛：**

| 字段 | 必填 | 说明 |
|------|------|------|
| `days[].date` | 是 | 日期（几号，页面月分固定 11 月） |
| `days[].forums[].title` | 是 | 论坛名称（主论坛 / 分论坛 / 技术沙龙） |
| `days[].forums[].kind` | 是 | `main` 主论坛 / `sub` 分论坛 / `salon` 技术沙龙（决定渲染形态） |
| `days[].forums[].visible` | 否 | `false` 隐藏整个论坛（默认显示） |
| `days[].forums[].pending_tips` | 否 | 占位卡片提示语（分论坛议程未公开时） |
| `days[].forums[].pending_cards` | 否 | 占位卡片 `{label, address, time}`；**存在时替代场次议程展示**，议程公开后删除该字段即恢复场次形式 |

**议程条目**（`agenda[]`，主论坛 / 场次 / 沙龙三处同构；统一行内形态，不引入 `titles`/`guest` 多态形态）：

| 字段 | 必填 | 说明 |
|------|------|------|
| `agenda[].time` | 是 | 议程时间（同时间段的连续条目在页面上合并展示） |
| `agenda[].title` | 是 | 议程标题 |
| `agenda[].name` | 否 | 演讲者姓名；无演讲者的条目（如仪式发布）保留**空字符串占位**而非省略键 |
| `agenda[].post` | 否 | 演讲者职务；同上，空字符串占位保持条目形状一致 |

> **多嘉宾 / 多标题条目**（如联合主题演讲、多项致谢）：拆为**连续同 `time` 的多行**（每行一个嘉宾/标题，标题可重复），页面渲染时自动合并——同 `time` 行共用一个时间组，组内**同 `title` 行还原为一条议题 + 多位嘉宾**、同演讲者的多行还原为**多标题 + 一位嘉宾**。不使用 `guest[]` / `titles[]` 数组形态，保持行形状一致（编辑器「新增」按首行形状克隆）。

**分论坛场次**（`sessions[]`）：

| 字段 | 必填 | 说明 |
|------|------|------|
| `sessions[].label` | 是 | 场次名称（页面上的场次页签） |
| `sessions[].title` | 是* | 场次主题（议程面板头部标题；无主题可省略） |
| `sessions[].time` | 是 | 场次时间范围 |
| `sessions[].address` | 是 | 场次地点 |
| `sessions[].closed` | 否 | `true` 为闭门态：不渲染议程，面板展示 `closed_title` / `closed_tips` 与特殊背景 `closed_bg`（深浅两套） |
| `sessions[].agenda` | 是 | 场次议程（结构同上；闭门态为 `[]`） |

> `sessions` 为空数组的分论坛，保留一个**空模板场次**（label/time/address 全空 + 一行空议程）作为编辑器新增场次的形状来源——编辑器的「新增」按钮克隆数组首项的形状生成新条目，空数组会克隆出错误形状。已有真实场次的分论坛直接以首场为形状来源，无需模板。

**技术沙龙卡片**（`cards[]`，手风琴展开）：

| 字段 | 必填 | 说明 |
|------|------|------|
| `cards[].label` | 是 | 卡片名称 |
| `cards[].address` | 是 | 地点 |
| `cards[].time` | 是 | 时间 |
| `cards[].agenda` | 是 | 沙龙议程（结构同上） |

### guest

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `list` | 是 | 嘉宾分组数组 |
| `list[].title` | 是 | 分组标题（主论坛嘉宾 / 技术沙龙嘉宾） |
| `list[].children` | 是 | 嘉宾数组 |
| `list[].children[].name` | 是 | 嘉宾姓名 |
| `list[].children[].img` | 否 | 嘉宾头像（`./images/guests/xxx.png`；缺省渲染占位圆形） |
| `list[].children[].org` | 否 | 嘉宾单位 |
| `list[].children[].post` | 否 | 嘉宾职务 |

### partner

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `visible` | 否 | `false` 隐藏整个共建单位板块（默认显示） |
| `list` | 是 | 共建单位分组数组 |
| `list[].title` | 是 | 分组标题（主办方/联合主办方/协办方/支持方） |
| `list[].logos` | 是 | logo 数组 |
| `list[].logos[].light` | 是 | 亮色 logo |
| `list[].logos[].dark` | 是 | 暗色 logo |

### previous

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `list` | 是 | 历届活动链接数组 |
| `list[].name` | 是 | 历届名称 |
| `list[].link` | 是 | 历届链接 |
