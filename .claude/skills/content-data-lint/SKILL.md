---
name: content-data-lint
version: "4.0.0"
description: 检查并优化 .content 下 yaml 数据:①目录级 _schema.yaml 元数据完整性(保障编辑器所有字段可读 label)与白名单管理 ②数据结构一致性检测 ③section 注册漂移检测 ④运行时未消费/SDK 不支持数据报告。触发词:"检查数据注释"、"数据 lint"、"为什么字段英文"、"数据质量"、"content-data-lint"。
license: MIT
---

# .content 数据元数据(_schema.yaml)检查与优化

## 背景

内容编辑器(portal-cms)的字段中文显示名与**编辑白名单**来自**目录级 `_schema.yaml` 独立元数据文件**(数据文件保持纯业务数据)。历史方案:注释提取(commentBefore 挂载漂移,废弃)→ 数据文件内嵌 `_schema` key(已迁移,loader 兼容遗留)→ 目录级独立文件(现行,推荐)。

## label 解析优先级(SDK 统一链)

```
section 显式配置(defineContentEditor sections)
> _schema.yaml 的 label(权威源,推荐)
> yaml 注释主词(遗留兜底)
> key(英文)
```

## `_schema.yaml` 写法规范(每目录一个,顶层键 = 文件名)

```yaml
# .content/home/_schema.yaml
zh:                               # ← zh.yaml 的 sections
  display_zone:                   # section 名 = 顶层 key
    label: 首页快捷入口配置
    fields:                       # 字段名 → 中文说明(纯路径,SDK 自动展开数组变体)
      title: 入口标题
      icon_light: 亮色主题图标
banner:                           # ← banner.yaml(slug 文件):文件名即键,直接内容
  label: 首页轮播图
  fields:
    bg_pc: PC 端背景图
```

**约束**:
- **fields 即编辑白名单**:运营只能编辑注册过的 section 与字段。**摘除某条目 = 该字段对运营隐藏**(收紧手段);数据新增字段需在此补注册,否则编辑器不可见(漂移检测会报)
- **顶层数组文件**(数据根是 `- ...` 列表)不支持 section 层——保持豁免(全部可编辑),label 走文件首行注释
- en 的 label 不需要写(label 只读 zh 侧)
- 数据文件**不得**再写内嵌 `_schema` 块(loader 有防御性剥离,但迁移应彻底)
- 迁移/补全工具:portal-cms SDK 仓库的 migrate-schema-out(幂等,fields 补全到数据全路径)

## 第一步:运行 lint

```bash
cd openEuler-portal && node <portal-cms>/scripts/content-lint.js(工具脚本由 portal-cms SDK 仓库提供)
```

输出五个维度:

| 维度 | 含义 | 处理方式 |
|---|---|---|
| 1. 缺模块名注释 | 树里页面名英文 | 补首行 `# 中文名 / English` |
| 2. 缺 section 注释 | 树里 section 英文 | 补 `_schema.yaml` label 或结构行注释 |
| 3. 字段缺注释 | 表单里字段英文 | 补 `_schema.yaml` fields(优先)或字段注释 |
| 4. 格式问题(挤行) | 注释多个字段挤一行 | **拆行**(每字段一行) |
| 5. schema 漂移 | 数据顶层 section 未注册(编辑器隐藏) | **报告不改**:补注册或确认收紧意图 |
| (附)数据结构不一致 | 列表项 key 混乱(如城市 A 有 news 城市 B 有 salon) | **报告不改**,由人确认是 bug 还是设计 |

lint 已跳过 `_schema.yaml` 元数据文件本身,schema fields 覆盖的字段不计缺失。

## 第二步:按规范修复

### 硬约束

- **只改 `_schema.yaml`/注释,不改数据结构**
- **每字段一行,禁止挤行**(`# title: 标题 / icon: 图标` → 两行)
- **en.yaml 不需要补**
- 补完 `git diff` 自查:只有 `_schema.yaml` 或 `#` 行变化

### 字段中文名参考

`name`=姓名、`title`=标题、`image/img`=图片、`link/href/url`=链接、`desc/description`=描述、`time/date`=时间、`icon`=图标、`email`=邮箱、`btn`=按钮文案、`value`=值、`company`=单位、`base`=所在地

## 第三步:验证

```bash
# 复跑 lint 确认清单收敛
cd openEuler-portal && nohup env VITE_EDIT_MODE=true ./node_modules/.bin/vitepress dev app --port 9998 > /tmp/ve.log 2>&1 &
# 浏览器 http://localhost:9998/zh/<页面>/?edit=1 检查树/表单中文化与白名单效果
```

注意:SDK 的 content-yaml-plugin 有改动时需 `cd vscode-portal-cms && pnpm build` 重建 dist。

## schema 漂移(维度 5)——只识别不改

检测规则:文件在 `_schema.yaml` 有注册,但数据顶层出现了未注册的 section。未注册 = 编辑器隐藏(数据改动运营不可见)。

处理:补注册(数据确实是新功能)或确认收紧意图(技术字段故意不给运营看)。

## 数据结构不一致——只识别不改

检测规则:同层级列表项的 key 集合比对。如 cities[0] 有 `news+showcase` 但 cities[1] 有 `salon+showcase`,说明数据录入不一致。

处理:列出报告,由业务确认是 bug(该统一)还是设计(某些城市确实不同)。

## 运行时未消费检测(需 dev server)

在编辑器中,树里 section 旁出现红色"未消费"标签 = 页面上没有找到该数据的消费区块。

可能原因:
1. **组件未消费**:数据存在但组件没读它(真正的冗余数据,应删除或消费)
2. **SDK 无法支持**:数据被消费但依赖链查不到,常见形态:
   - 组件在 `onMounted` 里读数据(生命周期回调无 effect 上下文,Vue 不记录依赖)
   - 数据被深拷贝后使用(引用断链,如 `JSON.parse(JSON.stringify(data))`)
   - 数据只用于 SSR(客户端 hydrate 不重新执行 render)

这类数据**编辑能力不受影响**(树+表单可用),但页面无反向编辑入口。

## SDK 不支持的数据形态报告

用 portal-cms SDK 的 schema-audit 工具获取覆盖率报告,0 zone 的 section 按上述原因分类。
