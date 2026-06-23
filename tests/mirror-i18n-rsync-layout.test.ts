import { expect, describe, it } from 'vitest';
import downloadZh from '../app/.vitepress/src-new/i18n/download/download-zh';
import downloadEn from '../app/.vitepress/src-new/i18n/download/download-en';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const mirrorListVuePath = resolve(
  __dirname,
  '../app/.vitepress/src-new/views/mirror/MirrorList.vue'
);
const mirrorListSource = readFileSync(mirrorListVuePath, 'utf-8');

describe('download.MIRROR_ALL_CONTENT_0 {email} 插值占位符（设计 §3）', () => {
  it('zh MIRROR_ALL_CONTENT_0 包含 {email} 占位符', () => {
    expect(downloadZh.MIRROR_ALL_CONTENT_0).toContain('{email}');
  });

  it('en MIRROR_ALL_CONTENT_0 包含 {email} 占位符', () => {
    expect(downloadEn.MIRROR_ALL_CONTENT_0).toContain('{email}');
  });

  it('zh MIRROR_ALL_CONTENT_0 中 {email} 出现 1 次（无重复占位符）', () => {
    const occurrences = downloadZh.MIRROR_ALL_CONTENT_0.split('{email}').length - 1;
    expect(occurrences).toBe(1);
  });

  it('en MIRROR_ALL_CONTENT_0 中 {email} 出现 1 次（无重复占位符）', () => {
    const occurrences = downloadEn.MIRROR_ALL_CONTENT_0.split('{email}').length - 1;
    expect(occurrences).toBe(1);
  });
});

describe('download.MIRROR_ALL_CONTENT_1 句号一致性（设计 §3）', () => {
  it('zh MIRROR_ALL_CONTENT_1 以中文句号结尾', () => {
    expect(downloadZh.MIRROR_ALL_CONTENT_1).toMatch(/。$/);
  });

  it('en MIRROR_ALL_CONTENT_1 以英文句号结尾', () => {
    expect(downloadEn.MIRROR_ALL_CONTENT_1).toMatch(/\.$/);
  });

  it('zh MIRROR_ALL_CONTENT_1 非空且非原始 key 名', () => {
    expect(typeof downloadZh.MIRROR_ALL_CONTENT_1).toBe('string');
    expect(downloadZh.MIRROR_ALL_CONTENT_1.length).toBeGreaterThan(0);
    expect(downloadZh.MIRROR_ALL_CONTENT_1).not.toBe('download.MIRROR_ALL_CONTENT_1');
  });

  it('en MIRROR_ALL_CONTENT_1 非空且非原始 key 名', () => {
    expect(typeof downloadEn.MIRROR_ALL_CONTENT_1).toBe('string');
    expect(downloadEn.MIRROR_ALL_CONTENT_1.length).toBeGreaterThan(0);
    expect(downloadEn.MIRROR_ALL_CONTENT_1).not.toBe('download.MIRROR_ALL_CONTENT_1');
  });
});

describe('download.MIRROR_ALL_CONTENT_0 内容语义校验（设计 §4）', () => {
  it('zh MIRROR_ALL_CONTENT_0 包含"疑问"或"问题"关键词', () => {
    const hasKeyword =
      downloadZh.MIRROR_ALL_CONTENT_0.includes('疑问') ||
      downloadZh.MIRROR_ALL_CONTENT_0.includes('问题');
    expect(hasKeyword).toBe(true);
  });

  it('en MIRROR_ALL_CONTENT_0 包含 "feel free to" 关键词', () => {
    expect(downloadEn.MIRROR_ALL_CONTENT_0).toContain('feel free to');
  });

  it('en MIRROR_ALL_CONTENT_0 文案在 {email} 前后完整无截断', () => {
    const beforeEmail = downloadEn.MIRROR_ALL_CONTENT_0.split('{email}')[0];
    expect(beforeEmail.trim().length).toBeGreaterThan(0);
    expect(beforeEmail).toContain('feel free to');
  });
});

describe('download vue-i18n 插值行为验证（设计 §4 边界）', () => {
  it('t("download.MIRROR_ALL_CONTENT_0", { email: "contact us." }) 应替换 {email}', () => {
    const template = downloadEn.MIRROR_ALL_CONTENT_0;
    const result = template.replace('{email}', 'contact us.');
    expect(result).toContain('contact us.');
    expect(result).not.toContain('{email}');
  });

  it('email 为 undefined 时显示原始 {email} 占位符（vue-i18n 默认行为）', () => {
    const template = downloadEn.MIRROR_ALL_CONTENT_0;
    expect(template).toContain('{email}');
  });

  it('zh MIRROR_ALL_CONTENT_0 插值替换后文案完整', () => {
    const template = downloadZh.MIRROR_ALL_CONTENT_0;
    const result = template.replace('{email}', '联系我们。');
    expect(result).toContain('联系我们');
    expect(result).not.toContain('{email}');
  });
});

describe('download i18n 双语关键词条同步（AGENTS.md §5 红线#7）', () => {
  const mirrorKeys = [
    'MIRROR_ALL_CONTENT_0',
    'MIRROR_ALL_CONTENT_1',
    'MIRROR_ALL_CONTENT_2',
    'MIRROR_ALL_TITLE',
    'MIRROR_ALL_NAME',
    'MIRROR_ALL_LOCATION',
    'MIRROR_ALL_SPONSOR',
    'MIRROR_ALL_HTTPS',
    'MIRROR_ALL_RSNC',
    'MIRROR_ALL_FTP',
    'MIRROR_ALL_Mbs',
    'MIRROR_ALL_TIME',
    'MIRROR_ALL_RELEASE',
    'MIRROR_ALL_SIZE',
  ];

  for (const key of mirrorKeys) {
    it(`zh 和 en 均包含 ${key} 词条`, () => {
      expect(downloadZh).toHaveProperty(key);
      expect(downloadEn).toHaveProperty(key);
    });

    it(`${key} 在 zh 和 en 中均为 string 类型`, () => {
      expect(typeof (downloadZh as any)[key]).toBe('string');
      expect(typeof (downloadEn as any)[key]).toBe('string');
    });
  }
});

describe('MirrorList.vue .rsync-tip 布局样式（设计 §3 CSS 改动）', () => {
  const styleSection = mirrorListSource.match(
    /<style[^>]*>([\s\S]*?)<\/style>/
  )?.[1] || '';

  it('.rsync-tip 存在且设置 flex-direction: column', () => {
    const rsyncTipMatch = styleSection.match(
      /\.rsync-tip\s*\{[^}]*flex-direction:\s*column[^}]*\}/
    );
    expect(rsyncTipMatch).not.toBeNull();
  });

  it('.rsync-tip flex-direction: column 不被 respond 断点覆盖', () => {
    const rsyncTipBlock = styleSection.match(
      /\.rsync-tip\s*\{([\s\S]*?)\}/
    );
    expect(rsyncTipBlock).not.toBeNull();
    const blockContent = rsyncTipBlock![1];
    const respondToBlocks = blockContent.match(
      /@include\s+respond\([^)]*\)\s*\{([^}]*)\}/g
    );
    if (respondToBlocks) {
      for (const block of respondToBlocks) {
        expect(block).not.toContain('flex-direction');
      }
    }
    expect(blockContent).toContain('flex-direction: column');
  });

  it('.rsync-tip 始终上下排列，无响应式切换 flex-direction', () => {
    const responsiveColumnInTip = styleSection.match(
      /@include\s+respond[^}]*\.rsync-tip[^}]*flex-direction/
    );
    expect(responsiveColumnInTip).toBeNull();
  });

  it('.rsync-tip 使用 display: flex', () => {
    const rsyncTipBlock = styleSection.match(
      /\.rsync-tip\s*\{([\s\S]*?)\}/
    );
    expect(rsyncTipBlock).not.toBeNull();
    expect(rsyncTipBlock![1]).toContain('display: flex');
  });

  it('.rsync-tip 使用 CSS 变量而非硬编码颜色（rules/styling.md 禁止事项）', () => {
    const rsyncTipBlock = styleSection.match(
      /\.rsync-tip\s*\{([\s\S]*?)\}/
    );
    expect(rsyncTipBlock).not.toBeNull();
    const blockContent = rsyncTipBlock![1];
    const hasHardcodedColor = /#[0-9a-fA-F]{3,8}|rgb\(|rgba\(/.test(blockContent);
    expect(hasHardcodedColor).toBe(false);
  });
});
