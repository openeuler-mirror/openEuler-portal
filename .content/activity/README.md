# activity

「互动 → 活动列表/总览」相关页面的数据源，以及「首页日历」和「SIG 详情页会议」的活动高亮数据。

## 文件说明

| 文件 | 对应页面 | 说明 |
|------|---------|------|
| `calendar.yaml` | 首页日历、SIG 详情会议日历 | 活动日期元数据，用于日历高亮 |
| `meetups.yaml` | 活动列表页、活动详情页 | Meetup 卡片详情（含图片、摘要等） |
| `filters.yaml` | 活动列表页 | 活动系列和状态的筛选选项 |
| `plan.yaml` | 活动总览页 | 年度计划时间轴 + 申请 Meetup 流程 |

## 我要做什么……

### 新增一个 Meetup 活动

1. 在 `calendar.yaml` 末尾添加一条日历记录（name / dates / start_date / end_date / address / url）
2. 在 `meetups.yaml` 的 `zh:` 列表顶部（最新活动排前面）添加详情记录
3. 把议程图片放到 `images/` 目录下（命名规则见下方）
4. 城市海报已存放在项目 `assets/` 中，`posterImg` / `posterImgMb` 填写 `~@/assets/...` 路径即可（参考已有条目）
4. 提 PR

### 修改活动的回顾链接（活动结束后）

1. 找到 `meetups.yaml` 中对应活动的条目
2. 将 `activity_type` 改为 `1`（已结束），删除 `signup_url` / `signup_url_mb`
3. 添加 `new_url: <回顾文章链接>`
4. 提 PR

### 更新年度计划

1. 打开 `plan.yaml`，找到 `year_plan.zh` 下对应类别（opensource / ecology / developer / release）
2. 找到对应月份，在 `actives:` 下添加新活动条目（activeName + location）
3. 英文版在 `year_plan.en` 同步更新
4. 提 PR

## Schema

### calendar.yaml

顶层 YAML 数组，每项必填字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | ✅ | 活动名称 |
| `dates` | ✅ | 日期数组（`YYYY-MM-DD`），用于日历高亮 |
| `start_date` | ✅ | 开始时间（`YYYY-MM-DD HH:mm`） |
| `end_date` | ✅ | 结束时间 |
| `activity_type` | ✅ | 活动形式，如 `线下` |
| `type` | ✅ | 固定值 `activity` |
| `url` | 可选 | 详情页链接 |
| `address` | 可选 | 详细地址 |
| `group_name` | 可选 | 关联 SIG 组名（用于 SIG 详情页过滤），如 `sig-Arm` |

### meetups.yaml

`zh` / `en` 顶层对象，值为 Meetup 数组。每项字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 数字 ID，对应 calendar.yaml 中 url 里的 `?id=` |
| `title` | ✅ | 活动标题 |
| `date` | ✅ | 展示用时间字符串，如 `2025-12-26 14:00-16:30` |
| `activity_type` | ✅ | `1`=已结束，`2`=进行中 |
| `synopsis` | ✅ | 活动简介 |
| `address` | ✅ | 详细地址 |
| `city` | ✅ | 所在城市（用于搜索过滤） |
| `isAdditional` | ✅ | 固定 `true`（静态数据标记） |
| `posterImg` | ✅ | 城市海报 PC 端，`~@/assets/category/user-group/city/<城市拼音>.jpg` |
| `posterImgMb` | ✅ | 城市海报移动端，`~@/assets/category/event/city/<城市拼音>-mb.jpg` |
| `series` | ✅ | 活动系列 ID，对应 filters.yaml series.value |
| `detail_img` | ✅ | 详情页议程图，`./images/detail-xxxxxx.jpg` |
| `signup_url` | 可选 | 报名链接（活动进行中时填写） |
| `signup_url_mb` | 可选 | 报名链接移动端 |
| `new_url` | 可选 | 活动回顾链接（活动结束后填写） |

### images/ 目录命名约定（仅活动议程图）

| 类型 | 命名规范 | 示例 |
|------|---------|------|
| 活动议程图 | `detail-<YYMMDD>.jpg` | `detail-251226.jpg` |
| 特殊活动议程图 | `detail-<城市拼音>.jpg` | `detail-beijing.jpg` |
