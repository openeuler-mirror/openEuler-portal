import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const PROJECT_ROOT = process.cwd();

interface FriendlyCommunityItemT {
  name: string;
  logo_light: string;
  logo_dark: string;
  url: string;
  desc?: string;
}

interface PublisherItemT {
  name: string;
  logo_light: string;
  logo_dark: string;
  href: string;
  validity?: { start?: string; end?: string };
}

function loadHomeYaml(locale: 'zh' | 'en') {
  return yaml.load(
    fs.readFileSync(path.join(PROJECT_ROOT, `.content/home/${locale}.yaml`), 'utf8')
  ) as {
    friendly_community: FriendlyCommunityItemT[];
    publisher: PublisherItemT[];
  };
}

const zh = loadHomeYaml('zh');
const en = loadHomeYaml('en');

const HOME_DTS = fs.readFileSync(
  path.join(PROJECT_ROOT, 'app/.vitepress/src-new/@types/content/home.d.ts'),
  'utf8'
);
const FRIENDLY_VUE = fs.readFileSync(
  path.join(PROJECT_ROOT, 'app/.vitepress/src-new/views/home/HomeFriendlyCommunity.vue'),
  'utf8'
);
const PARTNER_VUE = fs.readFileSync(
  path.join(PROJECT_ROOT, 'app/.vitepress/src-new/views/home/HomePartner.vue'),
  'utf8'
);

// ==================== 友好社区（friendly_community） ====================

describe('友好社区 logo alt — 数据完整性（i18n 单语漏改边界）', () => {
  it('zh/en friendly_community 均为非空数组', () => {
    expect(Array.isArray(zh.friendly_community)).toBe(true);
    expect(Array.isArray(en.friendly_community)).toBe(true);
    expect(zh.friendly_community.length).toBeGreaterThan(0);
    expect(en.friendly_community.length).toBeGreaterThan(0);
  });

  it('两 locale 条目数一致（9 条）', () => {
    expect(zh.friendly_community.length).toBe(9);
    expect(en.friendly_community.length).toBe(zh.friendly_community.length);
  });

  it('zh/en 每条 name 非空字符串', () => {
    for (const [locale, list] of [
      ['zh', zh.friendly_community],
      ['en', en.friendly_community],
    ] as const) {
      list.forEach((item, i) => {
        expect(typeof item.name).toBe('string');
        expect(
          item.name.trim().length,
          `${locale}.friendly_community[${i}].name 为空`
        ).toBeGreaterThan(0);
      });
    }
  });
});

describe('友好社区 logo alt — zh/en 全量同名同步', () => {
  // 按 url 配对（url 在两 locale 间一致且唯一），逐条断言 name 相同，
  // 任一 locale 漏改 name 即失败。
  it('按 url 配对，9 条社区 name 在 zh/en 间逐一相等', () => {
    const zhByName = new Map(zh.friendly_community.map((i) => [i.url, i.name]));
    en.friendly_community.forEach((item) => {
      const zhName = zhByName.get(item.url);
      expect(zhName, `zh 侧未找到 url=${item.url} 的条目`).toBeDefined();
      expect(item.name, `en name 与 zh 不一致 (url=${item.url})`).toBe(zhName);
    });
  });

  it('zh 与 en 的 url 集合完全一致（无单语增删条目）', () => {
    const zhUrls = zh.friendly_community.map((i) => i.url).sort();
    const enUrls = en.friendly_community.map((i) => i.url).sort();
    expect(enUrls).toEqual(zhUrls);
  });
});

describe('友好社区 logo alt — 9 条社区名为预期专有名词集合', () => {
  // 国际社区名不需翻译，zh/en 采用相同英文名。锁定当前正确取值，
  // 防止 name 被误改空或拼写漂移。
  const EXPECTED_NAMES = [
    'Linaro',
    'Linux Foundation',
    'OpenChain',
    'OpenHPC',
    'OpenInfra',
    'OPEA',
    'RISC-V',
    'LF AI & Data',
    'Zephyr',
  ];

  it('zh name 集合为预期 9 项', () => {
    expect(zh.friendly_community.map((i) => i.name).sort()).toEqual(
      [...EXPECTED_NAMES].sort()
    );
  });

  it('en name 集合为预期 9 项', () => {
    expect(en.friendly_community.map((i) => i.name).sort()).toEqual(
      [...EXPECTED_NAMES].sort()
    );
  });
});

describe('友好社区 — 类型声明与组件绑定', () => {
  it('home.d.ts 的 HomeFriendlyCommunityItemT 接口声明 name: string', () => {
    const iface = HOME_DTS.match(
      /interface HomeFriendlyCommunityItemT \{[\s\S]*?\}/
    )?.[0];
    expect(iface).toBeDefined();
    expect(iface!).toMatch(/^\s*name:\s*string;/m);
  });

  it('HomeFriendlyCommunity.vue 的 OFigure 标签同时绑定 :src 与 :alt', () => {
    // 抽取 <OFigure .../> 自闭合标签原文，确认 :src 与 :alt 落在同一元素上，
    // 而非 :alt 被绑到其它元素（如 OLink / div）导致 alt 不进 <img>。
    const ofigureTag = FRIENDLY_VUE.match(/<OFigure[\s\S]*?\/>/)?.[0] ?? '';
    expect(ofigureTag, '未找到 <OFigure/> 标签').toBeTruthy();
    expect(ofigureTag).toContain(':src');
    expect(ofigureTag).toContain(':alt="community.name"');
  });

  it('模板不含空 alt（alt="" 回归）', () => {
    expect(FRIENDLY_VUE).not.toContain('alt=""');
  });
});

// ==================== 发行厂商（publisher） ====================

describe('发行厂商 logo alt — 数据完整性（i18n 单语漏改边界）', () => {
  it('zh/en publisher 均为非空数组且条目数一致', () => {
    expect(Array.isArray(zh.publisher)).toBe(true);
    expect(Array.isArray(en.publisher)).toBe(true);
    expect(zh.publisher.length).toBeGreaterThan(0);
    expect(en.publisher.length).toBe(zh.publisher.length);
  });

  it('zh/en 每条 name 非空字符串', () => {
    for (const [locale, list] of [
      ['zh', zh.publisher],
      ['en', en.publisher],
    ] as const) {
      list.forEach((item, i) => {
        expect(typeof item.name).toBe('string');
        expect(
          item.name.trim().length,
          `${locale}.publisher[${i}].name 为空`
        ).toBeGreaterThan(0);
      });
    }
  });
});

describe('发行厂商 logo alt — zh/en 全量同名同步', () => {
  // 按 logo_light 配对（logo 文件名在两 locale 间一致且唯一），逐条断言 name 相同。
  it('按 logo_light 配对，29 条厂商 name 在 zh/en 间逐一相等', () => {
    const zhByLogo = new Map(zh.publisher.map((i) => [i.logo_light, i.name]));
    en.publisher.forEach((item) => {
      const zhName = zhByLogo.get(item.logo_light);
      expect(zhName, `zh 侧未找到 logo=${item.logo_light} 的条目`).toBeDefined();
      expect(item.name, `en name 与 zh 不一致 (logo=${item.logo_light})`).toBe(zhName);
    });
  });

  it('zh 与 en 的 logo_light 集合完全一致（无单语增删条目）', () => {
    const zhLogos = zh.publisher.map((i) => i.logo_light).sort();
    const enLogos = en.publisher.map((i) => i.logo_light).sort();
    expect(enLogos).toEqual(zhLogos);
  });
});

describe('发行厂商 logo alt — 29 条厂商名为预期集合', () => {
  // 依据 .content/download/commercial-release 官方厂商名及各厂商官网核实，
  // 锁定当前取值，防止 name 被误改空或拼写漂移。
  const EXPECTED_NAMES = [
    '宝德',
    '泊川软件',
    '超聚变',
    '鼎桥通信',
    '烽火星空',
    '恒生电子',
    '汇智',
    '东土科技',
    '深开鸿',
    '浪潮云',
    '瑞盾',
    '凝思软件',
    '普华软件',
    '麒麟软件',
    '麒麟信安',
    '润和软件',
    '格蒂电力',
    'SUSE',
    '拓林思',
    '同源',
    '统信软件',
    '新华三',
    '中科院软件所',
    '软通动力',
    '中软国际',
    '中科创达',
    '中科方德',
    '中科红旗',
    '中科海微',
  ];

  it('zh publisher name 集合为预期 29 项', () => {
    expect(zh.publisher.map((i) => i.name).sort()).toEqual(
      [...EXPECTED_NAMES].sort()
    );
  });

  it('en publisher name 集合为预期 29 项', () => {
    expect(en.publisher.map((i) => i.name).sort()).toEqual(
      [...EXPECTED_NAMES].sort()
    );
  });
});

describe('发行厂商 — 类型声明与组件绑定', () => {
  it('home.d.ts 的 HomePublisherItemT 接口声明 name: string', () => {
    const iface = HOME_DTS.match(
      /interface HomePublisherItemT \{[\s\S]*?\}/
    )?.[0];
    expect(iface).toBeDefined();
    expect(iface!).toMatch(/^\s*name:\s*string;/m);
  });

  it('HomePartner.vue 的 mapFunc 返回对象绑定 alt: p.name（与 logo/href 同源）', () => {
    // mapFunc 是 OLogoSwiperItems 数据的唯一样式化出口，alt 必须在此进入
    // OLogoSwiperItemT，否则厂商名无法到达 <img alt>。
    const mapFuncSrc = PARTNER_VUE.match(/const mapFunc = \([\s\S]*?\}\);/)?.[0] ?? '';
    expect(mapFuncSrc, '未找到 mapFunc 定义').toBeTruthy();
    expect(mapFuncSrc).toContain('alt: p.name');
    expect(mapFuncSrc).toContain('href: p.href');
    expect(mapFuncSrc).toContain('logo:');
  });
});
