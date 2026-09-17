# 版本生命周期（Lifecycle）

openEuler 版本生命周期页（`/zh/other/lifecycle/`、`/en/other/lifecycle/`）的静态配置数据源。按页面路径组织在 `.content/other/lifecycle/` 下，zh/en 拆分为 `zh.yaml` 与 `en.yaml`，图片就近存放在共用 `images/` 子目录，由 OPlusYamlContentVitePlugin 接入 Vite 资源管线输出带 hash 的真实 URL。

## 文件说明

| 文件 / 目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文版生命周期数据（banner + 2 段 markdown + 2 张配图） |
| `en.yaml` | 英文版生命周期数据（结构与 zh 一致） |
| `images/` | 共用图片资源（banner 共用 + zh/en 各 2 张配图） |

## 数据板块

板块按页面从上到下的视觉顺序排列：

| 板块名 | 类型 | 用途 |
|--------|------|------|
| `banner` | 字符串 | 页面顶部 banner 背景图（zh/en 共用） |
| `overall` | 字符串 | 版本生命周期总览 markdown 内容（`|` 块标量） |
| `img1` | 字符串 | 总览后的配图（zh/en 差异化，文件名含 `-zh`/`-en` 后缀） |
| `lts` | 字符串 | LTS 版本生命周期 markdown 内容（`|` 块标量） |
| `img2` | 字符串 | LTS 后的配图（zh/en 差异化） |

## 设计原则

- **按文件拆分 locale**：双语数据已拆分到 `zh.yaml` / `en.yaml`，字段用基线名
- **markdown 用 `|` 块标量**：保留换行，由组件用 markdown-it 渲染为 HTML
- **图片就近存放**：所有图片在 `images/` 下，yaml 中以 `./images/xxx.ext` 书写
- **zh/en 共用图不加后缀**（banner）；差异化图保留 `-zh`/`-en` 后缀（img1/img2）
- **不存布局参数**：样式保留在组件 SCSS 中

## 消费方式

```ts
import lifecycleContent from '#content/other/lifecycle';
import Markdown from 'markdown-it';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
const md = new Markdown({ html: true, linkify: true });

// 模板中直接按 locale 取数据
// <div v-dompurify-html="md.render(lifecycleContent[locale].overall)" />
// <OFigure :src="lifecycleContent[locale].img1" />
// <BannerLevel2 :background-image="lifecycleContent[locale].banner" />
```

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `banner` | 是 | banner 背景图路径（zh/en 共用，`./images/banner.jpg`） |
| `overall` | 是 | 总览 markdown 内容（`|` 块标量，多行文本） |
| `img1` | 是 | 总览后配图路径（差异化，`./images/img-zh1.jpg` / `./images/img-en1.jpg`） |
| `lts` | 是 | LTS markdown 内容（`|` 块标量，多行文本） |
| `img2` | 是 | LTS 后配图路径（差异化，`./images/img-zh2.jpg` / `./images/img-en2.jpg`） |
