# 页脚（Footer）

全站页脚数据。zh/en 双语。`linksData2` 和 `quickNav` 因依赖 `import.meta.env` 未提取，仍保留在 `src-new/data/footer/index.ts`。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文友情链接（12 条）+ 备案信息 |
| `en.yaml` | 英文友情链接（7 条）+ 备案信息 |
| `images/` | 备案图标（police.png，zh/en 共用） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `friendship_links` | 数组 | 友情社区链接 |
| `filing` | 对象 | 备案信息（链接 + 图标） |

## 未提取数据

| 数据 | 原因 |
|------|------|
| `linksData` | 孤儿数据（无消费者），已删除 |
| `linksData2` | URL 依赖 `import.meta.env.VITE_MAIN_DOMAIN_URL` |
| `quickNav` | URL 依赖多个 `import.meta.env.*` 变量 |

## 消费方式

```ts
import footerContent from '#content/footer';
const friendshipLinks = footerContent[locale.value].friendship_links;
const filing = footerContent[locale.value].filing;
```
