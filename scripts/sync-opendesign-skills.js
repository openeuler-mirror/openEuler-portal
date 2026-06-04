#!/usr/bin/env node
/**
 * 同步 OpenDesign Skills 到 .claude/skills/（线上同步）
 *
 * 用途：从上游仓库 atomgit.com/openeuler/opendesign-skills 拉取最新的
 * opendesign-components / opendesign-design / opendesign-scripts / opendesign-tokens
 * 4 个 skill，覆盖到本项目 .claude/skills/ 下。
 *
 * 为何不用 `pnpx skills`：CLI 当前对 atomgit 等非 github 源支持不稳定，且本仓库
 * 已通过 skills-lock.json 单独管理来自 aaron-he-zhu 的 SEO skills，混用会冲突。
 *
 * 触发方式（package.json 已配）：
 *   pnpm install        → postinstall 自动跑
 *   pnpm dev            → predev 自动跑
 *   pnpm skills:sync    → 手动跑
 *
 * 环境变量：
 *   OPENDESIGN_SKILLS_REPO   覆盖仓库（默认 atomgit）
 *   OPENDESIGN_SKILLS_REF    覆盖分支/tag/commit（默认 master）
 *   SKILLS_SYNC_SKIP=1       强制跳过（CI、离线环境用）
 *   CI=true                  自动跳过（GitHub Actions 等自动设置）
 *   SKILLS_SYNC_STRICT=1     失败时退出 1（默认 graceful：失败仅 warn，不阻塞 install/dev）
 *
 * 退出码：
 *   0  成功 / graceful 失败 / 被跳过
 *   1  仅当 SKILLS_SYNC_STRICT=1 且发生错误
 */

import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, rmSync, mkdtempSync } from 'node:fs';
import { join, resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const targetSkillsDir = join(projectRoot, '.claude/skills');

const SKILLS = ['opendesign-components', 'opendesign-design', 'opendesign-scripts', 'opendesign-tokens'];

const REPO = process.env.OPENDESIGN_SKILLS_REPO || 'https://atomgit.com/openeuler/opendesign-skills.git';
const REF = process.env.OPENDESIGN_SKILLS_REF || 'master';
const STRICT = process.env.SKILLS_SYNC_STRICT === '1';
const SKIP = process.env.SKILLS_SYNC_SKIP === '1' || process.env.CI === 'true' || process.env.CI === '1';

// CI / 显式跳过：直接退出，不阻塞流程
if (SKIP) {
  const reason = process.env.SKILLS_SYNC_SKIP === '1' ? 'SKILLS_SYNC_SKIP=1' : 'CI 环境';
  console.log(`[skills:sync] 跳过（${reason}）`);
  process.exit(0);
}

const bail = (msg, err) => {
  console.warn(`[skills:sync] ${msg}`);
  if (err) console.warn(`  原因：${err.message || err}`);
  if (STRICT) {
    console.warn('  SKILLS_SYNC_STRICT=1，退出码 1');
    process.exit(1);
  }
  console.warn('  跳过（graceful，不阻塞 install/dev；如需严格模式设 SKILLS_SYNC_STRICT=1）');
  process.exit(0);
};

const run = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'inherit'], ...opts });

const copyDir = (src, dest) => {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dest, entry);
    if (statSync(s).isDirectory()) copyDir(s, d);
    else copyFileSync(s, d);
  }
};

// 探测 git 可用
try {
  run('git', ['--version']);
} catch (err) {
  bail('未找到 git，无法同步 OpenDesign skills', err);
}

const workTmp = mkdtempSync(join(tmpdir(), 'opendesign-skills-'));

try {
  console.log(`[skills:sync] 仓库：${REPO}`);
  console.log(`[skills:sync] 分支/标签：${REF}`);

  try {
    run('git', ['clone', '--depth', '1', '--branch', REF, '--single-branch', '--quiet', REPO, workTmp]);
  } catch (err) {
    bail(`git clone 失败（可能是网络不可达 / 仓库不存在 / ${REF} 不存在）`, err);
  }

  const sha = run('git', ['-C', workTmp, 'rev-parse', '--short', 'HEAD']).toString().trim();

  const upstreamSkillsDir = join(workTmp, 'skills');
  if (!existsSync(upstreamSkillsDir)) {
    bail(`上游仓库结构异常：缺少 skills/ 目录（${upstreamSkillsDir}）`);
  }

  mkdirSync(targetSkillsDir, { recursive: true });

  let okCount = 0;
  const missing = [];

  for (const name of SKILLS) {
    const src = join(upstreamSkillsDir, name);
    const dest = join(targetSkillsDir, name);

    if (!existsSync(src)) {
      missing.push(name);
      continue;
    }

    if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
    copyDir(src, dest);
    okCount += 1;
  }

  console.log(
    `[skills:sync] ${okCount}/${SKILLS.length} 已同步（上游 ${sha}）${
      missing.length ? `，上游缺失：${missing.join(', ')}` : ''
    }`
  );
} finally {
  rmSync(workTmp, { recursive: true, force: true });
}
