# 高校 / Universities

高校页面（`/zh/universities/`）的静态配置数据源。按页面路径组织在 `.content/universities/` 下。**仅 zh 版本**（en 页面不存在），图片就近存放在 `images/` 子目录，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线输出带 hash 的真实 URL。

## 文件说明

| 文件 / 目录 | 用途 |
|------------|------|
| `zh.yaml` | 中文版高校页面数据（5 个板块） |
| `images/` | 图片资源（14 张，含高校 Logo、活动背景图等） |

## 数据板块

板块按页面从上到下的视觉顺序排列：

| 板块名 | 类型 | 用途 | 消费组件 |
|--------|------|------|---------|
| `title` | 字符串 | 页面标题（用于 BannerLevel2） | `TheUniversity.vue` |
| `technical_group` | 对象 | 高校技术小组板块（标题 + 描述 + 小组列表） | `TheUniversity.vue` |
| `activity_game` | 对象 | 活动与大赛板块（标题 + 活动列表） | `TheUniversity.vue` |
| `university_contribution` | 对象 | 高校贡献板块（贡献卡片列表 + 其他高校列表 + "更多"文案） | `TheUniversity.vue` |
| `university_mooc` | 字符串 | 课程与培训板块标题（MoocContent 组件独立维护内容） | `TheUniversity.vue` |

## 设计原则

- **仅 zh 版本**：en 页面不存在，只维护 `zh.yaml`，类型声明与组件消费只取 `zh`
- **图片就近存放**：所有图片在 `images/` 下，yaml 中以 `./images/xxx.ext` 书写（必须带 `./` 前缀）
- **字段命名 snake_case**：YAML 字段统一使用 snake_case（如 `technical_group`、`group_list`、`bg_img_pc`）
- **响应式背景图拆字段**：原 `bgImg: screenWidth.value <= 768 ? mb : pc` 运行时三元表达式拆为 `bg_img_pc` + `bg_img_mb` 两个字段，由组件 `getBgImg(item)` 按屏宽切换；非条件图片只写 `bg_img_pc`
- **文本分隔符 `/n` 保留原义**：`content_list[].description` 中的 `/n` 是文本分隔符（非换行），组件用 `description.split('/n')` 横向排布
- **不存布局参数**：间距、断点等样式参数保留在组件 SCSS 中

## 消费方式

```ts
import { computed } from 'vue';
import universitiesContent from '#content/universities';
import useWindowResize from '@/components/hooks/useWindowResize';

const universityData = computed(() => universitiesContent.zh);
const screenWidth = useWindowResize();

// 响应式背景图：有 mb 切换、无 mb 用 pc
const getBgImg = (item: any) =>
  item.bg_img_mb
    ? screenWidth.value <= 768
      ? item.bg_img_mb
      : item.bg_img_pc
    : item.bg_img_pc;
```

```vue
<OCard
  v-for="item in universityData.activity_game.activity_list"
  :style="{ backgroundImage: `url(${getBgImg(item)})` }"
/>
```

## Schema

### title

页面标题（字符串），用于 BannerLevel2 的 `title` prop。

### technical_group

高校技术小组板块。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `description.text` | 是 | 描述正文 |
| `description.link_text` | 是 | 申请加入按钮文案 |
| `group_list[]` | 是 | 技术小组列表 |
| `group_list[].logo` | 是 | 高校 Logo（`./images/xxx.png`） |
| `group_list[].name` | 是 | 小组名称 |
| `group_list[].description` | 是 | 小组简介 |
| `group_list[].content_list[]` | 是 | 内容卡片列表 |
| `group_list[].content_list[].title` | 是 | 卡片标题 |
| `group_list[].content_list[].description` | 是 | 卡片描述（含 `/n` 文本分隔符） |

### activity_game

活动与大赛板块。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `activity_list[]` | 是 | 活动列表 |
| `activity_list[].title` | 是 | 活动标题 |
| `activity_list[].bg_img_pc` | 是 | PC 端背景图（`./images/xxx.png`） |
| `activity_list[].bg_img_mb` | 否 | 移动端背景图；存在时由组件按屏宽切换，不存在时用 `bg_img_pc` |
| `activity_list[].bg_inset` | 否 | 右下角内嵌图（图片路径，空字符串视为无） |
| `activity_list[].id` | 否 | 卡片样式标识（如 `ccf`） |
| `activity_list[].detail` | 是 | 活动详情正文 |
| `activity_list[].link_text` | 是 | 链接文案 |
| `activity_list[].link_href` | 是 | 链接 URL |

### university_contribution

高校贡献板块。

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 板块标题 |
| `university_content_list[]` | 是 | 高校贡献卡片列表 |
| `university_content_list[].logo` | 是 | 高校 Logo（`./images/xxx.png`） |
| `university_content_list[].name` | 是 | 高校名称 |
| `university_content_list[].detail` | 是 | 贡献详情正文 |
| `university_content_list[].contribution_name` | 是 | 贡献类型标签（如 `SIG贡献`） |
| `university_content_list[].contribution_tag_list[]` | 是 | 贡献 SIG 标签数组 |
| `university_content_list[].contribution_detail` | 是 | 贡献详情链接文案（空字符串视为不展示） |
| `university_content_list[].contribution_detail_link` | 是 | 贡献详情链接 URL（空字符串视为不展示） |
| `university_content_list[].official_website` | 是 | 前往官网链接文案 |
| `university_content_list[].official_website_link` | 是 | 官网链接 URL |
| `university_list[]` | 是 | 其他参与高校列表 |
| `university_list[].logo` | 是 | 高校 Logo |
| `university_list[].name` | 是 | 高校名称 |
| `more` | 是 | "更多高校贡献…" 文案 |

### university_mooc

课程与培训板块标题（字符串）。MoocContent 组件独立维护课程列表内容。
