import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { foldI18n } from '../app/.vitepress/src-new/shared/content';

const PROJECT_ROOT = process.cwd();
const CONTENT_DIR = path.join(PROJECT_ROOT, '.content/organization');
const IMAGES_DIR = path.join(CONTENT_DIR, 'images');
const COMMITTEE_FILE = path.join(CONTENT_DIR, 'committee.yaml');

interface MemberLike {
  name?: string;
  name_en?: string;
  image?: string;
  position?: string;
  position_en?: string;
}

interface GroupLike {
  title?: string;
  title_en?: string;
  members: MemberLike[];
}

interface SectionLike {
  title?: string;
  title_en?: string;
  groups?: GroupLike[];
}

const committee = yaml.load(
  fs.readFileSync(COMMITTEE_FILE, 'utf8')
) as SectionLike;

const committeeMemberGroup = committee.groups?.find(
  (g) => g.title === '委员'
);
const yangjiguo = committeeMemberGroup?.members.find(
  (m) => m.name === '杨继国'
);

describe('committee.yaml — 杨继国条目存在性', () => {
  it('「委员」子组存在', () => {
    expect(committeeMemberGroup, 'committee.yaml 中没有找到「委员」子组').toBeDefined();
  });

  it('杨继国条目存在于「委员」子组中', () => {
    expect(yangjiguo, '「委员」子组中没有找到杨继国').toBeDefined();
  });

  it('杨继国条目的 name_en 为 Yang Jiguo', () => {
    expect(yangjiguo!.name_en).toBe('Yang Jiguo');
  });
});

describe('committee.yaml — 杨继国条目字段完整性', () => {
  it('name 字段存在且为中文', () => {
    expect(yangjiguo!.name).toBeTypeOf('string');
    expect(/[一-鿿]/.test(yangjiguo!.name!)).toBe(true);
  });

  it('name_en 字段存在且为纯 ASCII', () => {
    expect(yangjiguo!.name_en).toBeTypeOf('string');
    expect(/^[\x00-\x7F]+$/.test(yangjiguo!.name_en!)).toBe(true);
  });

  it('image 字段存在且以 ./images/ 前缀开头', () => {
    expect(yangjiguo!.image).toBeTypeOf('string');
    expect(yangjiguo!.image).toMatch(/^\.\/images\//);
  });

  it('image 字段指向 yangjiguo.png', () => {
    expect(yangjiguo!.image).toBe('./images/yangjiguo.png');
  });

  it('position 和 position_en 同时存在', () => {
    expect(yangjiguo!.position).toBeDefined();
    expect(yangjiguo!.position_en).toBeDefined();
  });

  it('position 为中文: 海光信息技术股份有限公司', () => {
    expect(yangjiguo!.position).toBe('海光信息技术股份有限公司');
  });

  it('position_en 为英文: Hygon Information Technology Co., Ltd.', () => {
    expect(yangjiguo!.position_en).toBe('Hygon Information Technology Co., Ltd.');
  });
});

describe('committee.yaml — 杨继国头像图片文件存在性', () => {
  it('yangjiguo.png 文件在 images 目录下存在', () => {
    const imagePath = path.join(IMAGES_DIR, 'yangjiguo.png');
    expect(
      fs.existsSync(imagePath),
      `图片文件不存在: ${imagePath}`
    ).toBe(true);
  });

  it('yangjiguo.png 文件大小 > 0 (非空文件)', () => {
    const imagePath = path.join(IMAGES_DIR, 'yangjiguo.png');
    const stats = fs.statSync(imagePath);
    expect(stats.size, 'yangjiguo.png 文件大小为 0,可能损坏').toBeGreaterThan(0);
  });
});

describe('committee.yaml — 杨继国条目 foldI18n 正确性', () => {
  it('zh 模式: name 为中文,position 为中文,_en 字段消失', () => {
    const zh = foldI18n(yangjiguo!, 'zh') as Record<string, unknown>;
    expect(zh.name).toBe('杨继国');
    expect(zh.position).toBe('海光信息技术股份有限公司');
    expect(zh.name_en).toBeUndefined();
    expect(zh.position_en).toBeUndefined();
  });

  it('en 模式: name 覆盖为 Yang Jiguo,position 覆盖为 Hygon...', () => {
    const en = foldI18n(yangjiguo!, 'en') as Record<string, unknown>;
    expect(en.name).toBe('Yang Jiguo');
    expect(en.position).toBe('Hygon Information Technology Co., Ltd.');
    expect(en.name_en).toBeUndefined();
    expect(en.position_en).toBeUndefined();
  });

  it('image 字段在 foldI18n 后不受影响(无 _en 变体)', () => {
    const zh = foldI18n(yangjiguo!, 'zh') as Record<string, unknown>;
    const en = foldI18n(yangjiguo!, 'en') as Record<string, unknown>;
    expect(zh.image).toBe('./images/yangjiguo.png');
    expect(en.image).toBe('./images/yangjiguo.png');
  });
});

describe('committee.yaml — 杨继国条目在整个 committee section 的 foldI18n 正确性', () => {
  it('zh: 委员会整体 foldI18n 后杨继国在委员子组中可见', () => {
    const zh = foldI18n(committee, 'zh') as SectionLike;
    const memberGroup = zh.groups?.find((g) => g.title === '委员');
    const member = memberGroup?.members.find((m) => m.name === '杨继国');
    expect(member, 'zh foldI18n 后「委员」子组中找不到杨继国').toBeDefined();
    expect(member!.name).toBe('杨继国');
  });

  it('en: 委员会整体 foldI18n 后 Yang Jiguo 在 Committee Members 子组中可见', () => {
    const en = foldI18n(committee, 'en') as SectionLike;
    const memberGroup = en.groups?.find((g) => g.title === 'Committee Members');
    const member = memberGroup?.members.find((m) => m.name === 'Yang Jiguo');
    expect(member, 'en foldI18n 后 Committee Members 子组中找不到 Yang Jiguo').toBeDefined();
    expect(member!.name).toBe('Yang Jiguo');
    expect(member!.position).toBe('Hygon Information Technology Co., Ltd.');
  });
});