import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const SRC_NEW = 'app/.vitepress/src-new';
const SRC_OLD = 'app/.vitepress/src';

function readSrc(rel: string) {
  return fs.readFileSync(path.join(PROJECT_ROOT, rel), 'utf8');
}

const TheNestOS = readSrc(`${SRC_NEW}/views/projects/NestOS/TheNestOS.vue`);
const TheOeep = readSrc(`${SRC_OLD}/views/oeep/TheOeep.vue`);
const OMZone = readSrc(`${SRC_OLD}/views/om/OMZone.vue`);
const AppHeader = readSrc(`${SRC_NEW}/components/AppHeader.vue`);
const BannerLevel2 = readSrc(`${SRC_OLD}/components/BannerLevel2.vue`);

// ==================== D. 可见 h1（顶层标题） ====================

describe('h1 — 各页顶层标题来源', () => {
  it('BannerLevel2 渲染 <h1>（title prop → banner-title），使用 BannerLevel2 的页面无需另加 h1', () => {
    expect(BannerLevel2).toContain('<h1 v-if="title" class="banner-title">');
  });

  it('TheNestOS 不含额外的 visually-hidden h1（BannerLevel2 已提供 h1）', () => {
    expect(TheNestOS).not.toContain('class="visually-hidden"');
  });

  it('TheNestOS 通过 BannerLevel2 :title 传入页面标题', () => {
    expect(TheNestOS).toContain(':title="t(\'nestos.title\')"');
  });

  it('OMZone 不含额外的 visually-hidden h1（BannerLevel2 已提供 h1）', () => {
    expect(OMZone).not.toContain('class="visually-hidden"');
  });

  it('OMZone 通过 BannerLevel2 title 传入页面标题', () => {
    expect(OMZone).toContain('title="运维专区"');
  });

  it('TheOeep 模板含 <h1 class="visually-hidden">oEEP</h1>（无 BannerLevel2）', () => {
    expect(TheOeep).toContain('<h1 class="visually-hidden">oEEP</h1>');
  });
});

// ==================== E. AppHeader — isMounted 守卫移除 ====================

describe('AppHeader — OHeader/OHeaderMobile 直接渲染（无 isMounted 守卫）', () => {
  it('OHeader v-if 不含 isMounted（仅用 !lePadV 控制桌面端显示）', () => {
    expect(AppHeader).toContain('<OHeader\n    v-if="!lePadV"');
  });

  it('OHeaderMobile v-if 不含 isMounted（仅用 lePadV 控制移动端显示）', () => {
    expect(AppHeader).toContain('<OHeaderMobile\n    v-if="lePadV"');
  });

  it('模板中所有 v-if 均不含 isMounted', () => {
    const vifWithIsMounted = AppHeader.match(/v-if="[^"]*isMounted[^"]*"/g);
    expect(vifWithIsMounted, `仍存在含 isMounted 的 v-if：${vifWithIsMounted}`).toBeNull();
  });

  it('模板不含 SSR-only header/nav landmark workaround 标签', () => {
    expect(AppHeader).not.toContain('<header v-if="!isMounted"');
    expect(AppHeader).not.toContain('<nav v-if="!isMounted"');
  });
});
