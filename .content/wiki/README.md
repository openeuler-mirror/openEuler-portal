# Wiki 数据

Wiki 侧边导航数据由 `OPlusYamlContentVitePlugin` 合成为 `#content/wiki`，按语言分别维护 `zh.yaml` 与 `en.yaml`。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文 Wiki 导航树 |
| `en.yaml` | English Wiki navigation tree |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `toc` | 数组 | Wiki 侧边导航树 |

## 设计原则

- 中文和英文分文件维护，字段结构保持一致。
- 字段使用 snake_case。
- `link` 只保存相对于 `/{locale}/wiki/` 的页面路径，不保存布局参数。
- Wiki 正文 Markdown 和页面图片继续由 `app/zh/wiki`、`app/en/wiki` 管理。

## 消费方式

```ts
import wikiContent from '#content/wiki';

const tocInfo = computed(() => wikiContent[lang.value].toc);
```

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `toc` | 是 | 顶层导航节点数组 |
| `toc[].label` | 是 | 节点显示名称 |
| `toc[].link` | 否 | 页面路径，分组节点可省略 |
| `toc[].children` | 否 | 子导航节点数组 |
