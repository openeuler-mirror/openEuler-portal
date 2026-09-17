# 社区页（Community）

社区侧边导航 TOC 的数据源。`zh.yaml` / `en.yaml` 拆分存储，共用同目录下各子页面的 `images/`。

## 文件说明

| 文件/目录 | 用途 |
|-----------|------|
| `zh.yaml` | 中文侧边导航 TOC |
| `en.yaml` | 英文侧边导航 TOC |
| `contribution/` | 贡献者页面数据（独立子目录，详见各自 README） |
| `honor/` | 荣誉页面数据 |
| `mailing-list/` | 邮件列表页面数据 |
| `member/` | 成员单位页面数据 |
| `program/` | 项目群页面数据 |
| `user-group/` | 用户组页面数据 |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| 顶层（无名） | 数组 | 社区页侧边导航树形结构，每项为一级导航节点 |

## 设计原则

- 按文件拆分 locale：`zh.yaml` 存中文、`en.yaml` 存英文
- 字段用基线名（无 `_zh`/`_en` 后缀）
- 无图片资源
- 顶层直接为数组，不额外套壳

## 消费方式

```ts
import aboutUsContent from '#content/community';

const tocInfo = computed(() =>
  lang.value === 'en' ? aboutUsContent.en : aboutUsContent.zh
);
```

## Schema

| 字段 | 必填 | 说明 |
|------|------|------|
| `label` | 是 | 节点显示文案 |
| `link` | 是 | 节点链接路径段（拼接在 `/{locale}/community/` 之后，空字符串表示纯分组标题） |
| `children` | 否 | 子节点数组，结构与父节点相同（支持多层嵌套） |
