# 搜索（Search）

搜索页模块分类和子模块映射数据。zh/en 双语。`maintainer.yaml` 为非语言相关。

## 文件说明

| 文件 | slug | 用途 |
|------|------|------|
| `zh.yaml` | `zh` | 中文模块映射 + 子模块映射 |
| `en.yaml` | `en` | 英文模块映射 + 子模块映射 |
| `maintainer.yaml` | `maintainer` | 维护者默认信息（非语言相关） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `module_map` | 数组 | 模块分类映射（从 Map 转为数组，消费时重建 Map） |
| `sub_module_map` | 数组 | 子模块映射（同上） |
| `maintainer` | 对象 | 维护者默认信息（name/email/gitee_id） |

## 消费方式

```ts
import searchContent from '#content/search';
const moduleMap = new Map(searchContent.zh.module_map.map(...));  // 重建 Map，读 zh/en 双 locale 构建完整 {zh,en}
const subModuleMap = new Map(searchContent.zh.sub_module_map.map(...));
const maintainerDefaults = searchContent.maintainer;
```
