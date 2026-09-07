---
name: anchor-link-fix
description: 链接语义化整改：排查并整改项目中 <a> 元素的语义性问题
---

按以下三个维度分类分别排查并整改

# 编程式跳转 -> HTML语义化

## 分析范围

扫描 `@click` handler、`window` 跳转、框架导航 API，匹配下表模式：

| 类别 | VitePress | Nuxt 3 | 通用 |
|------|-----------|--------|------|
| 框架导航 API | `useRouter().go/push` | `navigateTo()` / `useRouter().push` | — |
| window 跳转 | — | — | `window.location.href = url`、`window.open(url)`（含 `'_blank'` 与 `'_self'`） |
| 点击触发 | `<el @click="fn">` 或 `<Component @click="fn">`，fn 体内含上述跳转 | 同左 | 同左 |

**修改判定标准**

一个跳转**应改**，当且仅当**同时**满足：

1. **无副作用**：handler 体内不含 `await` / API 调用 / `confirm` / `try-catch` / 登录态检查 / 权限校验等；跳转是其唯一效果。
2. **URL 可静态拼接**：跳转目标 URL 能在模板里用 `v-for` item / 静态数据 / 路由变量拼出（如 `/${lang}/${item.path}` 、 `/${lang}/download/?version=${row.name}` ）。

> **容易误判**：带 query 参数时。只要参数来自 `v-for` item 或静态数据（非运行时 state、非用户输入），就能改。只有参数来自运行时 state / 用户输入时才保留。

**非问题（保留不改）以及注意项**

- 跳转前后有副作用（见二.1）：如"标记已读再跳"、"登录后跳"、"confirm 后跳"。
- 表单提交成功后 `setTimeout` 内重定向。
- 搜索提交（query 来自用户输入）。
- URL 依赖运行时动态数据。
- 已使用 `<a href>` / `<OLink href>` / `<OCard href>` / `<OButton href>`。

## 修复方式

**优先用 `@opensig/opendesign` 组件**

以下组件的具体使用参考 `opendesign-components` skill （若skill存在）

| 场景 | 用法 | 备注 |
|------|------|--------|
| 卡片点击跳转 | `<OCard :href="...">` | 渲染为 `<a>` |
| 按钮样式跳转 | `<OButton :href="...">` | 渲染为 `<a>` |
| 文本/普通链接 | `<OLink :href="...">` | 渲染为 `<a>` |

**裸元素**

`<div/span @click>` + 纯导航 → 直接改 `<a :href>`，补 `text-decoration:none; color:inherit`，并按原布局补 `display`（原 `<div>` 是 block，`<a>` 默认 inline）。

> 使用 Nuxt 的项目优先用 `<NuxtLink to>`

**外链**

跳转到站外的链接（例如`<OLink/OCard/OButton/a href="https://">`）**必须加 `target="_blank" rel="noopener noreferrer"`**。

**需特殊处理情况：**

- tab 的 `@change` 驱动页面切换（以 `@opensig/opendesign/OTab` 组件为例）：

  ```html
  <script setup>
  const onChange = (path) => router.go(path);
  </script>

  <template>
    <OTab @change="onChange">
      <OTabPane v-for="tab in tabItems" :value="tab.path" :label="tab.label"></OTabPane>
    </OTab>
  </template>
  ```

  可修改为：

  ```html
  <script setup>
  const onChange = (path) => router.go(path);
  </script>

  <template>
    <OTab @change="onChange">
      <OTabPane v-for="tab in tabItems" :value="tab.path" :label="tab.label"><template #nav><a :href="tab.path" @click.prevent>{{ tab.label }}</a></template></OTabPane>
    </OTab>
  </template>
  ```

  用 `@click.prevent` 阻止 `<a>` 默认行为，保持原跳转逻辑

# 静态渲染

## 分析范围

项目中存量的 `<a>` 标签（包括最终渲染为 `<a>` 的组件，有 `<OLink href>` / `<OCard href>` / `<OButton href>`）是否被 `v-if` 控制显示隐藏

## 修复方式

修复为 `v-show` 或其他css方式控制隐藏，需保证修复后不改变原视觉体验，不影响到其他元素的渲染、位置等，否则归为非问题，不改

# 属性语义

## 分析范围

项目中存量的 `<a>` 标签（包括最终渲染为 `<a>` 的组件，有 `<OLink href>` / `<OCard href>` / `<OButton href>`）的属性（`href`、`rel`）

## 修复方式

`href` 属性不能为空，且能被解析为正确的网址（非 `<a href="javascript:goTo()">`、`<a href="javascript:window.location.href=''">`）

携带 `target="_blank"` 且 `href` 指向跨源地址的情况需加 `rel="noopener noreferrer"`

> 相关规范：
>
> [Google 的链接最佳实践](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=zh-cn)
>
> [指向跨源目的地的链接不安全](https://developer.chrome.com/docs/lighthouse/best-practices/external-anchors-use-rel-noopener?hl=zh-cn)

# 输出

修复完成后，输出一个 markdown 报告到本地文件，**三桶分类**：

1. **已修复**：文件、原跳转方式、修复方式
2. **合理保留**：文件、行、保留原因（副作用 / 表单提交 / 动态参数来源 等）
3. **待评估**：需组件增强或 UI 重构的场景（如某组件缺 href 能力、tab 切换需重构），注明建议方向

# 自验证

修复完成后，**询问用户**是否需要执行自验证。若确认，加载 `playwright-cli` skill 按以下流程执行：

## 前置条件

- 启动项目 dev server（`npm run dev` 等）
- 识别所有受修改影响的页面 URL
- 若项目无法启动或页面需要登录态，跳过对应页面的验证并告知用户

## 视觉回归检查

1. **修改前**：对每个受影响页面执行 `playwright-cli screenshot --filename=before-<page>.png` + `playwright-cli snapshot --filename=before-<page>.yml` 保存基线
2. **修改后**：`playwright-cli reload` 刷新页面，再次 `screenshot --filename=after-<page>.png` + `snapshot --filename=after-<page>.yml`
3. `diff before-<page>.yml after-<page>.yml`，确认差异仅为预期的语义变更（标签名/属性变化），无布局偏移、内容丢失
4. 若 diff 出现非预期差异，**回滚该处修改**

## 交互功能检查

5. 逐个点击修改后的链接（`playwright-cli click`），验证跳转目标正确
6. 外链（`target="_blank"`）用 `playwright-cli tab-list` 确认在新 tab 打开
7. `@click.prevent` 场景（如 tab 切换）确认原逻辑不受影响
8. `playwright-cli console` 检查无新增报错

## 样式一致性检查

9. 对裸元素改 `<a>` 的情况，用 `playwright-cli eval` 检查计算样式：
   - `display` 是否与原元素布局一致（block / inline-block / flex 等）
   - `color` 是否为 `inherit`
   - `text-decoration` 是否为 `none`
   - `cursor` 是否为 `pointer`
10. 若样式不一致，补充 CSS 修正后重新验证

## 失败处理

- 验证未通过的项**回滚修改**，归入报告的「待评估」分类，注明失败原因
