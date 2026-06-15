import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const ZH_MD = path.join(PROJECT_ROOT, 'app/zh/community/conduct/index.md');
const EN_MD = path.join(PROJECT_ROOT, 'app/en/community/conduct/index.md');

function extractListItemNumbers(content: string, sectionStart: string, sectionEnd: string): string[] {
  const startIdx = content.indexOf(sectionStart);
  const endIdx = content.indexOf(sectionEnd);
  if (startIdx === -1 || endIdx === -1) return [];
  const section = content.slice(startIdx, endIdx);
  const matches = section.match(/- \(\d+\)/g);
  return matches ? matches.map(m => m.replace('- ', '')) : [];
}

function extractEnListItemNumbers(content: string, sectionStart: string, sectionEnd: string): string[] {
  const startIdx = content.indexOf(sectionStart);
  const endIdx = content.indexOf(sectionEnd);
  if (startIdx === -1 || endIdx === -1) return [];
  const section = content.slice(startIdx, endIdx);
  const matches = section.match(/\(\d+\)/g);
  return matches ? matches : [];
}

describe('zh conduct 页 — 积极行为列表', () => {
  const content = fs.readFileSync(ZH_MD, 'utf8');

  it('MD 文件存在', () => {
    expect(fs.existsSync(ZH_MD), `zh conduct MD 文件应存在: ${ZH_MD}`).toBe(true);
  });

  it('积极行为列表包含 6 条，编号 (1)-(6) 连续', () => {
    const nums = extractListItemNumbers(content, '有助于创造积极社区环境的行为', '本项目群和社区的参与者不应采取的行为');
    expect(nums).toEqual(['(1)', '(2)', '(3)', '(4)', '(5)', '(6)']);
  });

  it('新增第 (6) 条包含安全关键词（供应链/基础设施/安全）', () => {
    const startIdx = content.indexOf('有助于创造积极社区环境的行为');
    const endIdx = content.indexOf('本项目群和社区的参与者不应采取的行为');
    const section = content.slice(startIdx, endIdx);
    const item6Line = section.split('\n').find(line => line.includes('- (6)'));
    expect(item6Line, '应存在 (6) 条目').toBeDefined();
    const text = item6Line!.replace('- (6)', '').trim();
    expect(text).toContain('安全');
    expect(text).toContain('供应链');
    expect(text).toContain('基础设施');
  });

  it('既有条目 (1)-(5) 内容未被改动', () => {
    expect(content).toContain('- (1)措辞友好且包容');
    expect(content).toContain('- (2)尊重不同的观点和经验');
    expect(content).toContain('- (3)耐心接受有益批评');
    expect(content).toContain('- (4)关注对社区最有利的事情');
    expect(content).toContain('- (5)与社区其他成员友善相处');
  });
});

describe('zh conduct 页 — 不应行为列表', () => {
  const content = fs.readFileSync(ZH_MD, 'utf8');

  it('不应行为列表包含 6 条，编号 (1)-(6) 连续', () => {
    const nums = extractListItemNumbers(content, '本项目群和社区的参与者不应采取的行为', '社区项目维护者');
    expect(nums).toEqual(['(1)', '(2)', '(3)', '(4)', '(5)', '(6)']);
  });

  it('新增第 (5) 条为安全违规条目（恶意后门/污染依赖/损毁资产）', () => {
    const startIdx = content.indexOf('本项目群和社区的参与者不应采取的行为');
    const endIdx = content.indexOf('社区项目维护者');
    const section = content.slice(startIdx, endIdx);
    const item5Line = section.split('\n').find(line => line.includes('- (5)'));
    expect(item5Line, '应存在新 (5) 安全违规条目').toBeDefined();
    const text = item5Line!.replace('- (5)', '').trim();
    expect(text).toContain('恶意后门');
    expect(text).toContain('污染项目依赖');
    expect(text).toContain('损毁项目资产');
    expect(text).toContain('安全');
  });

  it('原兜底条款已重编号为 (6)，内容不变', () => {
    const startIdx = content.indexOf('本项目群和社区的参与者不应采取的行为');
    const endIdx = content.indexOf('社区项目维护者');
    const section = content.slice(startIdx, endIdx);
    const item6Line = section.split('\n').find(line => line.includes('- (6)'));
    expect(item6Line, '兜底条款应重编号为 (6)').toBeDefined();
    expect(item6Line!).toContain('其他有理由认定为违反社区行为准则的不当行为');
  });

  it('既有条目 (1)-(4) 内容未被改动', () => {
    expect(content).toContain('- (1)发布与色情、暴力等有关的言论或图像');
    expect(content).toContain('- (2)捣乱/煽动/造谣行为、侮辱/贬损的评论、人身及政治攻击');
    expect(content).toContain('- (3)公开或私下骚扰本项目群和社区的其他参与者');
    expect(content).toContain('- (4)未经明确授权发布他人的个人信息等资料');
  });
});

describe('zh conduct 页 — JSON-LD 禁止行为 answer 同步更新（数据源从 frontmatter 迁移至 .geo/jsonld）', () => {
  const jsonldPath = path.join(PROJECT_ROOT, '.geo/jsonld/zh/community/conduct/index.json');
  const jsonld = JSON.parse(fs.readFileSync(jsonldPath, 'utf-8'));

  it('JSON-LD "禁止哪些行为" answer 包含安全违规关键词', () => {
    const prohibitQuestion = jsonld.mainEntity.find((q: any) => q.name.includes('禁止'));
    expect(prohibitQuestion).toBeDefined();
    const answer = prohibitQuestion!.acceptedAnswer.text;
    expect(answer).toContain('恶意后门');
    expect(answer).toContain('污染项目依赖');
    expect(answer).toContain('损毁项目资产');
    expect(answer).toContain('安全');
  });

  it('JSON-LD "禁止哪些行为" answer 同时包含既有内容和新内容', () => {
    const prohibitQuestion = jsonld.mainEntity.find((q: any) => q.name.includes('禁止'));
    const answer = prohibitQuestion!.acceptedAnswer.text;
    expect(answer).toContain('未经授权发布他人个人信息');
    expect(answer).toContain('植入恶意后门');
  });

  it('JSON-LD 包含 schema.org 结构标记（@context、@type、mainEntity）', () => {
    expect(jsonld['@context']).toBe('https://schema.org');
    expect(jsonld['@type']).toBe('FAQPage');
    expect(jsonld.mainEntity).toBeDefined();
  });

  it('JSON-LD 包含 5 个 Question 条目', () => {
    const questionCount = jsonld.mainEntity.filter((q: any) => q['@type'] === 'Question').length;
    expect(questionCount, '应包含 5 个 Question 条目').toBe(5);
  });
});

describe('en conduct 页 — positive behavior list', () => {
  const content = fs.readFileSync(EN_MD, 'utf8');

  it('MD 文件存在', () => {
    expect(fs.existsSync(EN_MD), `en conduct MD 文件应存在: ${EN_MD}`).toBe(true);
  });

  it('positive behavior list has 6 items numbered (1)-(6)', () => {
    const nums = extractEnListItemNumbers(content, 'Behaviors that contribute to a positive environment', 'Unacceptable behaviors');
    expect(nums).toEqual(['(1)', '(2)', '(3)', '(4)', '(5)', '(6)']);
  });

  it('new item (6) contains security keywords (supply chain / infrastructure / security)', () => {
    const startIdx = content.indexOf('Behaviors that contribute to a positive environment');
    const endIdx = content.indexOf('Unacceptable behaviors');
    const section = content.slice(startIdx, endIdx);
    expect(section).toContain('(6)');
    expect(section).toContain('security');
    expect(section).toContain('supply chain');
    expect(section).toContain('infrastructure');
  });

  it('existing items (1)-(5) unchanged', () => {
    expect(content).toContain('(1) Friendly and inclusive wording');
    expect(content).toContain('(2) Respecting different viewpoints and experiences');
    expect(content).toContain('(3) Gracefully accepting constructive feedback');
    expect(content).toContain('(4) Focusing on what is best for the community');
    expect(content).toContain('(5) Demonstrating kindness toward other people');
  });
});

describe('en conduct 页 — unacceptable behavior list', () => {
  const content = fs.readFileSync(EN_MD, 'utf8');

  it('unacceptable behavior list has 6 items numbered (1)-(6)', () => {
    const nums = extractEnListItemNumbers(content, 'Unacceptable behaviors', 'Community project maintainers');
    expect(nums).toEqual(['(1)', '(2)', '(3)', '(4)', '(5)', '(6)']);
  });

  it('new item (5) is security violation (malicious backdoors / polluting dependencies / destroying assets)', () => {
    const startIdx = content.indexOf('Unacceptable behaviors');
    const endIdx = content.indexOf('Community project maintainers');
    const section = content.slice(startIdx, endIdx);
    expect(section).toContain('(5)');
    expect(section).toContain('malicious backdoors');
    expect(section).toContain('polluting project dependencies');
    expect(section).toContain('destroying project assets');
    expect(section).toContain('community security');
  });

  it('catch-all clause renumbered to (6), content unchanged', () => {
    const startIdx = content.indexOf('Unacceptable behaviors');
    const endIdx = content.indexOf('Community project maintainers');
    const section = content.slice(startIdx, endIdx);
    expect(section).toContain('(6) Other conduct that can reasonably be considered as a violation of this Code of Conduct');
  });

  it('existing items (1)-(4) unchanged', () => {
    expect(content).toContain('(1) Use of sexualized and violent language or imagery');
    expect(content).toContain('(2) Disruption, incitement, rumor-making');
    expect(content).toContain('(3) Public or private harassment');
    expect(content).toContain('(4) Publishing others\' information');
  });
});

describe('en conduct 页 — HTML structure preserved', () => {
  const content = fs.readFileSync(EN_MD, 'utf8');

  it('div.conduct-en wrapper still present', () => {
    expect(content).toContain('<div class=\'conduct-en\'>');
    expect(content).toContain('</div>');
  });

  it('style block still present', () => {
    expect(content).toContain('<style>');
    expect(content).toContain('.conduct-en h5');
  });

  it('new items follow same HTML format as adjacent items (each on its own line)', () => {
    const lines = content.split('\n');
    const item6Positive = lines.find(l => l.trim().startsWith('(6)') && l.includes('security') && !l.includes('malicious'));
    expect(item6Positive, '(6) positive item should exist on its own line').toBeDefined();
    expect(item6Positive!.trim().startsWith('(6)')).toBe(true);

    const item5Unacceptable = lines.find(l => l.trim().startsWith('(5)') && l.includes('malicious'));
    expect(item5Unacceptable, '(5) unacceptable item should exist on its own line').toBeDefined();
    expect(item5Unacceptable!.trim().startsWith('(5)')).toBe(true);
  });
});