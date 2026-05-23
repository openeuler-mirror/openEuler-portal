# Git 工作流规范

## Commit 消息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范，支持中文描述。

### 格式

```plaintext
<type>(<scope>): <subject>

[body]
```

### Type 类型

| Type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `refactor` | 代码重构（非新功能、非 Bug） |
| `style` | 代码格式调整（不影响逻辑） |
| `docs` | 文档变更 |
| `test` | 测试相关 |
| `chore` | 构建配置、依赖更新等 |
| `perf` | 性能优化 |
| `revert` | 回滚提交 |

### Scope 范围（可选）

使用模块名：`sig`、`home`、`search`、`news`、`blog`、`download`、`security`、`header`、`footer`、`geo` 等

### 示例

```bash
# ✅ 新功能（中文）
feat(sig): 新增 SIG 详情页会议列表

# ✅ Bug 修复
fix(search): 修复搜索结果分页在切换关键词时未重置

# ✅ 样式调整
style(header): 调整移动端导航间距

# ✅ 重构
refactor(geo): 重构 .geo 目录结构

# ✅ 构建配置
chore: 排除 last-modified.json 文件的 git 跟踪

# ✅ PR 合并提交（带 PR 号）
!3093 英文README文档翻译回稿合入
feat(blog): !3096 新增4篇博客，1篇新闻
```

---

## 分支策略

```plaintext
master          # 主分支，与生产环境一致（通过 PR/MR 合并）
feature/xxx     # 功能开发分支（从 master 分出）
fix/xxx         # Bug 修复分支
hotfix/xxx      # 紧急修复（从 master 分出，修复后合回 master）
```

### 分支命名规范

```bash
feature/sig-detail-page        # 新功能
fix/search-pagination-bug      # Bug 修复
refactor/geo-directory         # 重构
hotfix/header-broken-link      # 紧急修复
```

---

## 提交前检查流程

```bash
# 1. 暂存变更文件
git add app/.vitepress/src-new/views/sig/SigDetail.vue

# 2. ESLint 检查
pnpm lint

# 3. StyleLint 检查
pnpm slint

# 4. 确认无报错后提交
git commit -m "feat(sig): 新增 SIG 详情页会议列表"
```

---

## Pull Request / Merge Request 规范

### MR 标题格式

与 Commit 消息规范一致：

```plaintext
feat(sig): add sig detail page
fix(home): 修复首页 banner 移动端显示异常
```

### MR 描述模板

```markdown
## 变更内容

简要描述本次 MR 的改动。

## 变更类型

- [ ] 新功能
- [ ] Bug 修复
- [ ] 代码重构
- [ ] 文档更新
- [ ] 样式调整
- [ ] SEO/GEO 配置

## 测试

- [ ] 本地 `pnpm dev` 验证通过
- [ ] `pnpm build` 构建无报错
- [ ] `pnpm lint` 检查通过
- [ ] zh/en 双语页面均已验证

## 相关 Issue

Closes #xxx
```

---

## 禁止事项

- 禁止直接向 `master` 分支推送（通过 MR 合并）
- 禁止 `git push --force`（紧急情况需团队审批）
- 禁止在 commit 中包含 `console.log` / `debugger`
- 禁止提交构建产物（`app/.vitepress/dist/`、`node_modules/`）
- 禁止提交敏感信息（密钥、token、密码）
- 禁止提交 `.env`、`.env.local` 等环境变量文件
- 禁止提交 `last-modified.json`（已加入 .gitignore）
