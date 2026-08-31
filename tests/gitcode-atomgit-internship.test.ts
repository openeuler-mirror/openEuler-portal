import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { internshipTaskLinks } from '../app/.vitepress/src/views/internship/components/internshipTask';

const PROJECT_ROOT = process.cwd();
const THE_INTERNSHIP_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src/views/internship/TheInternship.vue'
);
const MAIL_TEMPLATE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/public/category/internship/实习任务认领邮件模板.txt'
);

describe('internshipTask.ts — viewTask / internshipTestTask host 迁移', () => {
  it('viewTask 指向 atomgit.com', () => {
    expect(internshipTaskLinks.viewTask).toBe(
      'https://atomgit.com/openeuler/opensource-intern/issues'
    );
  });

  it('internshipTestTask 指向 atomgit.com', () => {
    expect(internshipTaskLinks.internshipTestTask).toBe(
      'https://atomgit.com/openeuler/opensource-intern/issues/120'
    );
  });

  it('viewTask / internshipTestTask 路径段保留(openeuler/opensource-intern/issues)', () => {
    expect(internshipTaskLinks.viewTask).toMatch(
      /openeuler\/opensource-intern\/issues$/
    );
  });

  it('internshipTaskLinks 全对象无 gitcode 残留', () => {
    const all = Object.values(internshipTaskLinks);
    all.forEach((v) => {
      expect(v).not.toMatch(/gitcode/i);
    });
  });

  it('其余链接(host 未变)不受影响:aiCodingAssistants / mindspore / chaspark / 内部模板', () => {
    expect(internshipTaskLinks.aiCodingAssistants).toBe(
      'https://www.openeuler.org/zh/community/ai-coding-assistants/'
    );
    expect(internshipTaskLinks.mindsporeLink).toBe(
      'https://www.mindspore.cn/internship/'
    );
    expect(internshipTaskLinks.vllmAscendLink).toBe(
      'https://www.chaspark.com/#/s/vllmascendInternship?multi=zh'
    );
    expect(internshipTaskLinks.internshipEmailTemp).toBe(
      '/category/internship/实习任务认领邮件模板.txt'
    );
    expect(internshipTaskLinks.applyInternshipTemp).toBe(
      '/category/internship/实习申请材料模板.rar'
    );
    expect(internshipTaskLinks.internshipCertTemplate).toBe(
      '/category/internship/实习证明申请材料和邮件模板.rar'
    );
  });
});

describe('TheInternship.vue — 查看任务 <a href> host 迁移', () => {
  it('文件存在', () => {
    expect(fs.existsSync(THE_INTERNSHIP_VUE)).toBe(true);
  });

  it('模板无 gitcode 残留', () => {
    const content = fs.readFileSync(THE_INTERNSHIP_VUE, 'utf8');
    expect(content.toLowerCase()).not.toContain('gitcode');
  });

  it('两处 <a> href 均指向 atomgit.com', () => {
    const content = fs.readFileSync(THE_INTERNSHIP_VUE, 'utf8');
    const matches = content.match(
      /href="https:\/\/atomgit\.com\/openeuler\/opensource-intern\/issues"/g
    );
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

  it('两处 <a> 均新窗口打开(target="_blank")', () => {
    const content = fs.readFileSync(THE_INTERNSHIP_VUE, 'utf8');
    const matches = content.match(
      /<a\s+href="https:\/\/atomgit\.com\/openeuler\/opensource-intern\/issues"\s+target="_blank">/g
    );
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

  it('无残留 gitcode.com host 的 <a href>', () => {
    const content = fs.readFileSync(THE_INTERNSHIP_VUE, 'utf8');
    expect(content).not.toMatch(/href="https:\/\/gitcode\.com/);
  });
});

describe('实习任务认领邮件模板.txt — 展示名 Gitcode ID → AtomGit ID', () => {
  it('模板文件存在', () => {
    expect(fs.existsSync(MAIL_TEMPLATE)).toBe(true);
  });

  it('内容包含 AtomGit ID(新展示名)', () => {
    const content = fs.readFileSync(MAIL_TEMPLATE, 'utf8');
    expect(content).toContain('AtomGit ID');
  });

  it('内容无 Gitcode 残留(展示名已迁)', () => {
    const content = fs.readFileSync(MAIL_TEMPLATE, 'utf8');
    expect(content).not.toMatch(/gitcode/i);
  });

  it('AtomGit ID 出现在邮件正文(第 7 行)句式中', () => {
    const content = fs.readFileSync(MAIL_TEMPLATE, 'utf8');
    expect(content).toMatch(/导师您好，我的AtomGit ID是/);
  });

  it('模板其余结构(邮件地址/标题/附件)不受影响', () => {
    const content = fs.readFileSync(MAIL_TEMPLATE, 'utf8');
    expect(content).toContain('intern@openeuler.sh');
    expect(content).toContain('实习任务认领');
    expect(content).toContain('简历');
  });
});
