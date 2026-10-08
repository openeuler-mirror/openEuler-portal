import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import bishengZh from '../app/.vitepress/src-new/i18n/bisheng-jdk/bisheng-jdk-zh';
import bishengEn from '../app/.vitepress/src-new/i18n/bisheng-jdk/bisheng-jdk-en';

const PROJECT_ROOT = process.cwd();
const LEARN_VUE = resolve(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/projects/BiSheng-JDK/components/BiShengLearn.vue'
);
const THE_VUE = resolve(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/projects/BiSheng-JDK/TheBiShengJDK.vue'
);
const LINKS_VUE = resolve(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/projects/BiSheng-JDK/components/BiShengLinks.vue'
);
const QUICKLINKS_VUE = resolve(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/projects/BiSheng-JDK/components/BiShengQuickLinks.vue'
);

const NEW_DOWNLOAD_URL = 'https://www.hikunpeng.com/developer/devkit/downloadNew';
const OLD_DOWNLOAD_URL = 'https://www.hikunpeng.com/zh/developer/devkit/compiler/jdk';

const ORPHAN_KEYS = [
  'linksTitle',
  'linkBishengJdk',
  'linkBishengCompiler',
  'linkGcc',
];

function readFile(filePath: string): string {
  return readFileSync(filePath, 'utf-8');
}

describe('BiShengLearn.vue — 下载卡 URL 更新（设计 §3）', () => {
  const content = readFile(LEARN_VUE);

  it('下载卡 href 指向新 URL downloadNew', () => {
    expect(content).toContain(NEW_DOWNLOAD_URL);
  });

  it('下载卡 href 不再含旧的 /zh/developer/devkit/compiler/jdk', () => {
    expect(content).not.toContain(OLD_DOWNLOAD_URL);
  });

  it('新 URL 出现在 downloadTitle 卡片对应的 links 数组中', () => {
    // downloadTitle 下载卡是 learnItems 第 3 项;其 links[0].href 应为新 URL
    const fragment = content.match(
      /downloadTitle[\s\S]*?links:\s*\[[\s\S]*?href:\s*('[^']*'|"[^"]*")/
    );
    expect(fragment, '应能定位到 downloadTitle 卡片的 links.href').not.toBeNull();
    const href = fragment![1].slice(1, -1);
    expect(href).toBe(NEW_DOWNLOAD_URL);
  });

  it('新 URL 无 locale 前缀（双语通用）', () => {
    // 新 URL 不应包含 /zh/ 或 /en/ locale 段
    expect(NEW_DOWNLOAD_URL).not.toMatch(/\/(zh|en)\//);
  });
});

describe('TheBiShengJDK.vue — 友情链接楼层移除（设计 §3）', () => {
  const content = readFile(THE_VUE);

  it('不再 import BiShengLinks 子组件', () => {
    expect(content).not.toMatch(/import\s+BiShengLinks\b/);
  });

  it('模板中不再渲染 <BiShengLinks /> 标签', () => {
    expect(content).not.toMatch(/<BiShengLinks\b/);
  });

  it('BiShengLearn 仍被正常 import 与渲染（误删回归）', () => {
    expect(content).toMatch(/import\s+BiShengLearn\b/);
    expect(content).toMatch(/<BiShengLearn\b/);
  });
});

describe('BiShengLinks.vue — 整文件已删除（设计 §3）', () => {
  it('BiShengLinks.vue 文件已不存在', () => {
    expect(existsSync(LINKS_VUE)).toBe(false);
  });
});

describe('BiShengQuickLinks.vue — viewDetails 共用 key 未误删（设计 §4 边界）', () => {
  const content = readFile(QUICKLINKS_VUE);

  it('QuickLinks 仍引用 bishengJdk.viewDetails 文案 key', () => {
    expect(content).toContain('bishengJdk.viewDetails');
  });
});

describe('i18n bisheng-jdk — 孤儿 key 清理（设计 §3 + AGENTS.md 红线 #7）', () => {
  it.each(ORPHAN_KEYS)('zh 文件不含已删除的孤儿 key [%s]', (key) => {
    expect(bishengZh).not.toHaveProperty(key);
  });

  it.each(ORPHAN_KEYS)('en 文件不含已删除的孤儿 key [%s]', (key) => {
    expect(bishengEn).not.toHaveProperty(key);
  });
});

describe('i18n bisheng-jdk — viewDetails key 保留（设计 §4 边界）', () => {
  it('zh 文件保留 viewDetails key', () => {
    expect(bishengZh).toHaveProperty('viewDetails');
    expect(typeof bishengZh.viewDetails).toBe('string');
    expect((bishengZh.viewDetails as string).length).toBeGreaterThan(0);
  });

  it('en 文件保留 viewDetails key', () => {
    expect(bishengEn).toHaveProperty('viewDetails');
    expect(typeof bishengEn.viewDetails).toBe('string');
    expect((bishengEn.viewDetails as string).length).toBeGreaterThan(0);
  });

  it('zh viewDetails 文案为"查看详情"', () => {
    expect(bishengZh.viewDetails).toBe('查看详情');
  });

  it('en viewDetails 文案为"View Details"', () => {
    expect(bishengEn.viewDetails).toBe('View Details');
  });
});

describe('i18n bisheng-jdk — zh/en 双语 key 集合同步（AGENTS.md 红线 #7）', () => {
  const zhKeys = Object.keys(bishengZh).sort();
  const enKeys = Object.keys(bishengEn).sort();

  it('zh 与 en 的 key 集合完全一致', () => {
    expect(zhKeys).toEqual(enKeys);
  });

  it('downloadLink key 双语均保留（下载卡文案）', () => {
    expect(zhKeys).toContain('downloadLink');
    expect(enKeys).toContain('downloadLink');
  });
});
