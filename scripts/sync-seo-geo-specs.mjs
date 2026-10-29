#!/usr/bin/env node
/**
 * 同步 SEO/GEO 规范与技能到本项目（从 daily-check-workflow 仓库线上拉取）
 *
 * 用途：从 https://github.com/opensourceways/daily-check-workflow.git 的
 * specifications 分支拉取最新的各维度（01-xx ~ 10-xx）规范文档与落地包：
 *   1. {NN-name}/specification.md、{NN-name}/implementation.md
 *      → 复制到本项目 rules/seo-geo/{NN-name}/ 下（目录不存在则新建）
 *   2. {NN-name}/skills/（或 {NN-name}/skill/）下的各 skill（含 SKILL.md 的目录）
 *      → 复制到本项目的 skills 目标目录：优先探测已存在的
 *        .claude/skills、.opencode/skills、.agents/skills（按此顺序取第一个），
 *        都不存在则新建 .agents/skills 并复制进去
 *
 * 使用方式（在其他前端项目中）：
 *   将本脚本放到该项目的 scripts/ 下（项目根 = 脚本目录的上一级），然后：
 *     node scripts/sync-seo-geo-specs.mjs
 *   可接入 package.json：postinstall / predev / 手动 script（如 "specs:sync"）。
 *
 * 环境变量：
 *   SEO_GEO_SPECS_REPO   覆盖仓库地址（默认 opensourceways/daily-check-workflow）
 *   SEO_GEO_SPECS_REF    覆盖分支/tag/commit（默认 specifications）
 *   SEO_GEO_SYNC_SKIP=1  强制跳过（CI、离线环境用）
 *   CI=true              自动跳过（GitHub Actions 等自动设置）
 *   SEO_GEO_SYNC_STRICT=1 失败时退出码 1（默认 graceful：失败仅 warn，不阻塞 install/dev）
 *
 * 退出码：
 *   0  成功 / graceful 失败 / 被跳过
 *   1  仅当 SEO_GEO_SYNC_STRICT=1 且发生错误
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, copyFileSync, rmSync, mkdtempSync } from 'node:fs';
import { join, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const REPO = process.env.SEO_GEO_SPECS_REPO || 'https://github.com/opensourceways/daily-check-workflow.git';
const REF = process.env.SEO_GEO_SPECS_REF || 'specifications';
const STRICT = process.env.SEO_GEO_SYNC_STRICT === '1';
const SKIP = process.env.SEO_GEO_SYNC_SKIP === '1' || process.env.CI === 'true' || process.env.CI === '1';

const SPEC_FILES = ['specification.md', 'implementation.md'];
const DIM_PATTERN = /^\d{2}-.+/;
const SKILLS_CONTAINER_NAMES = ['skills', 'skill'];
const SKILLS_TARGET_CANDIDATES = ['.claude/skills', '.opencode/skills', '.agents/skills'];
// skill 名安全白名单：SKILL.md frontmatter 的 name 属于上游不可信输入，
// 拒绝 '.'/'..'、路径分隔符及其他文件系统非法字符（防 dest 上跳后被 rmSync 递归删除）
const SKILL_NAME_UNSAFE = /^\.?\.?$|[/\\:*?"<>|]/;

const tag = '[seo-geo:sync]';

/** 日志中安全引用外来字符串（转义控制字符） */
const dirQuote = (s) => JSON.stringify(String(s));

// CI / 显式跳过：直接退出，不阻塞流程
if (SKIP) {
  const reason = process.env.SEO_GEO_SYNC_SKIP === '1' ? 'SEO_GEO_SYNC_SKIP=1' : 'CI 环境';
  console.log(`${tag} 跳过（${reason}）`);
  process.exit(0);
}

const bail = (msg, err) => {
  console.warn(`${tag} ${msg}`);
  if (err) console.warn(`  原因：${err.message || err}`);
  if (STRICT) {
    console.warn('  SEO_GEO_SYNC_STRICT=1，退出码 1');
    process.exit(1);
  }
  console.warn('  跳过（graceful，不阻塞 install/dev；如需严格模式设 SEO_GEO_SYNC_STRICT=1）');
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

/** 从 SKILL.md frontmatter 解析 name，取不到则返回 undefined */
const readSkillName = (skillDir) => {
  try {
    const content = readFileSync(join(skillDir, 'SKILL.md'), 'utf-8');
    const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const name = fm && fm[1].match(/^name:\s*(.+?)\s*$/m);
    return name ? name[1].replace(/^["']|["']$/g, '') : undefined;
  } catch {
    return undefined;
  }
};

/** 递归查找 dir 下所有含 SKILL.md 的 skill 目录（限深度，避免全仓库扫描） */
const findSkillDirs = (dir, depth = 3, acc = []) => {
  if (depth < 0 || !existsSync(dir)) return acc;
  if (existsSync(join(dir, 'SKILL.md'))) {
    acc.push(dir);
    return acc;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) findSkillDirs(join(dir, entry.name), depth - 1, acc);
  }
  return acc;
};

/** 探测/创建 skills 目标目录：已存在的候选优先，否则新建 .agents/skills */
const resolveSkillsTarget = () => {
  for (const rel of SKILLS_TARGET_CANDIDATES) {
    const abs = join(projectRoot, rel);
    if (existsSync(abs) && statSync(abs).isDirectory()) return { abs, rel };
  }
  const rel = '.agents/skills';
  const abs = join(projectRoot, rel);
  mkdirSync(abs, { recursive: true });
  console.log(`${tag} 未找到已有 skills 目录，新建 ${rel}/`);
  return { abs, rel };
};

// 探测 git 可用
try {
  run('git', ['--version']);
} catch (err) {
  bail('未找到 git，无法同步 SEO/GEO 规范', err);
}

const workTmp = mkdtempSync(join(tmpdir(), 'seo-geo-specs-'));

const cleanup = () => {
  try {
    rmSync(workTmp, { recursive: true, force: true });
  } catch (err) {
    console.warn(`${tag} 临时目录清理失败：${err.message || err}（不影响同步结果，${workTmp} 请手动删除）`);
  }
};

// bail 内 process.exit 会跳过外层 finally，退出前先清理
const bailAfterCleanup = (msg, err) => {
  cleanup();
  bail(msg, err);
};

try {
  console.log(`${tag} 仓库：${REPO}`);
  console.log(`${tag} 分支/标签：${REF}`);

  try {
    run('git', ['clone', '--depth', '1', '--branch', REF, '--single-branch', '--quiet', REPO, workTmp]);
  } catch (err) {
    bailAfterCleanup(`git clone 失败（可能是网络不可达 / 仓库不存在 / ${REF} 不存在）`, err);
  }

  const sha = run('git', ['-C', workTmp, 'rev-parse', '--short', 'HEAD']).toString().trim();

  const dims = readdirSync(workTmp, { withFileTypes: true })
    .filter((e) => e.isDirectory() && DIM_PATTERN.test(e.name))
    .map((e) => e.name)
    .sort();

  if (dims.length === 0) {
    bailAfterCleanup(`上游仓库结构异常：未找到任何 {NN-name}/ 维度目录（${REF} 分支）`);
  }

  // 1. 规范文档 → rules/seo-geo/
  const rulesRoot = join(projectRoot, 'rules', 'seo-geo');
  mkdirSync(rulesRoot, { recursive: true });

  let fileCount = 0;
  for (const dim of dims) {
    const destDir = join(rulesRoot, dim);
    mkdirSync(destDir, { recursive: true });
    for (const file of SPEC_FILES) {
      const src = join(workTmp, dim, file);
      if (existsSync(src)) {
        copyFileSync(src, join(destDir, file));
        fileCount += 1;
      }
    }
  }
  console.log(`${tag} 规范文档：${dims.length} 个维度 / ${fileCount} 个文件 → rules/seo-geo/`);

  // 2. skills → 目标 skills 目录（仅在存在待同步 skill 时探测/创建）
  const pendingSkills = [];
  for (const dim of dims) {
    for (const container of SKILLS_CONTAINER_NAMES) {
      const containerDir = join(workTmp, dim, container);
      if (existsSync(containerDir) && statSync(containerDir).isDirectory()) {
        for (const skillDir of findSkillDirs(containerDir)) {
          const fallbackName = skillDir === containerDir ? dim : skillDir.split(/[/\\]/).pop();
          let name = readSkillName(skillDir);
          if (name && SKILL_NAME_UNSAFE.test(name)) {
            console.warn(`${tag} SKILL.md frontmatter name 不安全，已忽略并按目录名处理：${dirQuote(name)}`);
            name = undefined;
          }
          pendingSkills.push({ dir: skillDir, name: name || fallbackName });
        }
      }
    }
  }

  if (pendingSkills.length === 0) {
    console.log(`${tag} skills：上游各维度均无 skills/ 目录，跳过`);
  } else {
    const target = resolveSkillsTarget();
    const targetRoot = resolve(target.abs);
    let okCount = 0;
    for (const { dir, name } of pendingSkills) {
      // 二次防御：dest 必须严格落在目标 skills 目录内，否则跳过（不删除、不复制）
      const dest = resolve(targetRoot, name);
      if (dest === targetRoot || !dest.startsWith(targetRoot + sep)) {
        console.warn(`${tag} 跳过越出目标目录的 skill：${dirQuote(name)}`);
        continue;
      }
      if (existsSync(dest)) rmSync(dest, { recursive: true, force: true });
      copyDir(dir, dest);
      okCount += 1;
      console.log(`${tag} skill：${name} → ${target.rel}/${name}`);
    }
    console.log(`${tag} skills：${okCount}/${pendingSkills.length} 已同步`);
  }

  console.log(`${tag} 完成（上游 ${sha}）`);
} catch (err) {
  // 兜底：rev-parse / readdir / mkdir / copy / rm 等任意中途异常都收敛为
  // 文档承诺的退出码语义（graceful → 0；STRICT → 1），不阻塞 pnpm install
  bailAfterCleanup('同步失败（执行中途异常）', err);
} finally {
  cleanup();
}
