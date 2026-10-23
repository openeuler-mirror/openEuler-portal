import { expect, describe, it, beforeAll } from 'vitest';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';

/**
 * @opendesign-plus/components 0.0.1-rc.83 → 0.0.1-rc.92 升级验证
 *
 * 本次 issue 为纯依赖升级 chore(仅改 package.json + pnpm-lock.yaml,不动业务代码)。
 * pre-1.0 的 rc.x 跨 16 个版本可能含破坏性变更,用例锁三道防线:
 *   1. 版本一致性 — manifest / installed / lock 三处均为 rc.92,无 rc.83 漂移(design §4.3)
 *   2. 消费方 API 兼容性 — 项目实际 import 的命名导出在 rc.92 仍存在(design §5 "覆盖 rc.92 破坏性变更")
 *   3. 子路径导出 — `./styles`、`./element-plus` 仍可解析(theme/index.ts、config.ts 依赖)
 */

const PROJECT_ROOT = resolve(__dirname, '..');
const PROJECT_PKG_PATH = join(PROJECT_ROOT, 'package.json');
const LOCK_PATH = join(PROJECT_ROOT, 'pnpm-lock.yaml');
const PKG_NAME = '@opendesign-plus/components';
const EXPECTED_VERSION = '0.0.1-rc.92';
const OLD_VERSION = '0.0.1-rc.83';

// 强制连带升级:@opensig/opendesign(rc.92 ESM 入口命名导入 useImageViewer 等,1.2.4 不导出 → SyntaxError)
const PEER_PKG_NAME = '@opensig/opendesign';
const PEER_EXPECTED_VERSION = '1.2.7-sp1';
const PEER_OLD_VERSION = '1.2.4';

const installedPkgPath = require.resolve(`${PKG_NAME}/package.json`);
const installedPkg = JSON.parse(readFileSync(installedPkgPath, 'utf-8'));
const installedPkgDir = dirname(installedPkgPath);
const installedDistDir = join(installedPkgDir, 'dist');

// 递归收集 dist 下所有 .d.ts 文本(barrel index.d.ts 仅含 export *,类型名落在子模块声明里)
function collectDtsText(rootDir: string): string {
  const chunks: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.d.ts')) chunks.push(readFileSync(full, 'utf-8'));
    }
  };
  walk(rootDir);
  return chunks.join('\n');
}

const allDtsText = collectDtsText(installedDistDir);

const projectPkg = JSON.parse(readFileSync(PROJECT_PKG_PATH, 'utf-8'));
const declaredVersion = projectPkg.dependencies[PKG_NAME];

const lockContent = readFileSync(LOCK_PATH, 'utf-8');

// 项目源码中实际 import 自 @opendesign-plus/components 的命名导出(经 grep app/ 核实)
const CONSUMED_COMPONENT_EXPORTS = [
  'OCookieNotice', // app/.vitepress/src/App.vue
  'OPlusConfigProvider', // app/.vitepress/src/App.vue
  'OMeetingSigCalendar', // src-new/views/sig/sig-detail/SigMeeting.vue
  'OLogoSwiper', // src-new/views/home/HomePartner.vue
  'OLogoSwiperItems', // src-new/views/home/HomePartner.vue
  'OMeetingCalendar', // src-new/views/home/HomeCalendar.vue
  'OEventsCalendar', // src-new/views/event/EventOverview.vue
  'OEventsApply', // src-new/views/event/EventOverview.vue
  'OEventsList', // src-new/views/event/EventLatest.vue
  'OHeader', // src-new/components/AppHeader.vue
  'OHeaderMobile', // src-new/components/AppHeader.vue
  'OHeaderSourceCode', // src-new/components/AppHeader.vue
  'OHeaderSearch', // src-new/components/AppHeader.vue
  'OHeaderLanguageSwitcher', // src-new/components/AppHeader.vue
  'OHeaderTheme', // src-new/components/AppHeader.vue
  'OHeaderUser', // src-new/components/AppHeader.vue
  'OFooter', // src-new/components/AppFooter.vue
];

// 项目源码中实际 import 的类型导出(经 grep app/ 核实)
const CONSUMED_TYPE_EXPORTS = [
  'OLogoSwiperItemT', // src-new/views/home/HomePartner.vue
  'OSearchRecommendItem', // src-new/components/AppHeader.vue
  'OSearchUploadImageFn', // src-new/components/AppHeader.vue
  'FooterT', // src-new/@types/content/footer.d.ts:2
];

describe(`${PKG_NAME} ${EXPECTED_VERSION} 升级 — 版本一致性`, () => {
  it(`package.json#dependencies 声明为 ${EXPECTED_VERSION}`, () => {
    expect(declaredVersion).toBe(EXPECTED_VERSION);
  });

  it(`installed package.json version 为 ${EXPECTED_VERSION}`, () => {
    expect(installedPkg.version).toBe(EXPECTED_VERSION);
  });

  it('pnpm-lock.yaml importer 块 specifier 为 rc.92', () => {
    const specifierLine = lockContent.match(
      new RegExp(`^\\s+'${PKG_NAME.replace(/[/+]/g, '\\$&')}':\\n\\s+specifier:\\s(\\S+)$`, 'm')
    );
    expect(specifierLine, 'importer specifier 行未找到').not.toBeNull();
    expect(specifierLine![1]).toBe(EXPECTED_VERSION);
  });

  it('pnpm-lock.yaml importer 块 version 以 rc.92 开头(含 peer 解析)', () => {
    const versionLine = lockContent.match(
      new RegExp(
        `^\\s+'${PKG_NAME.replace(/[/+]/g, '\\$&')}':\\n\\s+specifier:\\s\\S+\\n\\s+version:\\s(${EXPECTED_VERSION.replace(/\./g, '\\.')})`,
        'm'
      )
    );
    expect(versionLine, 'importer version 行未找到或非 rc.92').not.toBeNull();
  });

  it('pnpm-lock.yaml 存在独立 resolve 段 @opendesign-plus/components@0.0.1-rc.92', () => {
    expect(lockContent).toContain(`'${PKG_NAME}@${EXPECTED_VERSION}':`);
  });

  it('pnpm-lock.yaml 不再残留旧版本 rc.83(防漂移)', () => {
    // 旧版本字符串在 lock 中应彻底消失(installer + resolve 两处)
    expect(lockContent).not.toContain(`${PKG_NAME}@${OLD_VERSION}`);
    expect(lockContent).not.toContain(`specifier: ${OLD_VERSION}`);
  });
});

describe(`${PEER_PKG_NAME} ${PEER_EXPECTED_VERSION} 强制连带升级 — 版本一致性`, () => {
  // rc.92 ESM 入口命名导入 useImageViewer 自 @opensig/opendesign,
  // 1.2.4 不导出该 API → 模块加载 SyntaxError;peerDependencies 声明 1.2.7-sp1(精确)

  const peerDeclaredVersion = projectPkg.dependencies[PEER_PKG_NAME];

  it(`package.json#dependencies 声明为 ${PEER_EXPECTED_VERSION}`, () => {
    expect(peerDeclaredVersion).toBe(PEER_EXPECTED_VERSION);
  });

  it(`installed package.json version 为 ${PEER_EXPECTED_VERSION}`, () => {
    const peerPkgPath = require.resolve(`${PEER_PKG_NAME}/package.json`);
    const peerPkg = JSON.parse(readFileSync(peerPkgPath, 'utf-8'));
    expect(peerPkg.version).toBe(PEER_EXPECTED_VERSION);
  });

  it('pnpm-lock.yaml importer 块 specifier 为 1.2.7-sp1', () => {
    const specifierLine = lockContent.match(
      new RegExp(`^\\s+'${PEER_PKG_NAME.replace(/[/+]/g, '\\$&')}':\\n\\s+specifier:\\s(\\S+)$`, 'm')
    );
    expect(specifierLine, 'importer specifier 行未找到').not.toBeNull();
    expect(specifierLine![1]).toBe(PEER_EXPECTED_VERSION);
  });

  it('pnpm-lock.yaml 不再残留旧版本 1.2.4(防漂移)', () => {
    expect(lockContent).not.toContain(`${PEER_PKG_NAME}@${PEER_OLD_VERSION}`);
    expect(lockContent).not.toContain(`specifier: ${PEER_OLD_VERSION}`);
  });
});

describe(`${PKG_NAME} ${EXPECTED_VERSION} 升级 — 消费方运行时 API 兼容性`, () => {
  // @opensig/opendesign 在模块加载阶段调用 window.matchMedia,jsdom 默认无此 API,需先 stub
  beforeAll(() => {
    const noop = () => ({ matches: false, media: '', addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {}, onchange: null, dispatchEvent: () => false });
    (window as unknown as { matchMedia: unknown }).matchMedia = noop;
  });

  it('所有项目实际消费的组件命名导出在 rc.92 运行时仍定义', async () => {
    const mod = await import(PKG_NAME);
    const missing = CONSUMED_COMPONENT_EXPORTS.filter((name) => mod[name] === undefined || mod[name] === null);
    expect(missing, `rc.92 删除/重命名了导出: ${missing.join(', ')}`).toEqual([]);
  });

  it('导出的组件均为可渲染对象(function/object,非 undefined)', async () => {
    const mod = await import(PKG_NAME);
    for (const name of CONSUMED_COMPONENT_EXPORTS) {
      const v = mod[name];
      const isComponent = typeof v === 'function' || typeof v === 'object';
      expect(isComponent, `${name} 不是 function/object`).toBe(true);
    }
  });
});

describe(`${PKG_NAME} ${EXPECTED_VERSION} 升级 — 消费方类型导出保留`, () => {
  // 类型在运行时被擦除,这里遍历包内全部 .d.ts 静态校验类型名仍被声明
  // (入口 index.d.ts 是 barrel,只含 export * from './components/xxx',类型名落在各子模块 types.d.ts 中)
  const indexDts = readFileSync(join(installedDistDir, 'index.d.ts'), 'utf-8');

  it('index.d.ts 聚合导出各组件子模块', () => {
    expect(indexDts).toContain("export * from './components/");
  });

  it.each(CONSUMED_TYPE_EXPORTS)('类型导出 %s 仍出现在包类型声明中', (typeName) => {
    expect(allDtsText).toContain(typeName);
  });
});

describe(`${PKG_NAME} ${EXPECTED_VERSION} 升级 — 子路径导出(./styles、./element-plus)`, () => {
  it('package.json exports 字段定义了 ./styles 子路径', () => {
    expect(installedPkg.exports).toHaveProperty('./styles');
  });

  it('package.json exports 字段定义了 ./element-plus 子路径', () => {
    expect(installedPkg.exports).toHaveProperty('./element-plus');
  });

  it('./styles 子路径指向的 components.css 文件存在(theme/index.ts 依赖)', () => {
    const stylesTarget = installedPkg.exports['./styles']?.import;
    expect(stylesTarget, 'styles 子路径未声明 import target').toBeDefined();
    expect(existsSync(join(installedPkgDir, stylesTarget))).toBe(true);
  });

  it('./element-plus 子路径 import 目标文件存在', () => {
    const ep = installedPkg.exports['./element-plus'];
    const target = ep?.import;
    expect(target, 'element-plus 子路径未声明 import target').toBeDefined();
    // exports 字段中的路径相对 package.json 所在目录(非 dist)
    expect(existsSync(join(installedPkgDir, target))).toBe(true);
  });
});

describe(`${PEER_PKG_NAME} ${PEER_EXPECTED_VERSION} — 强制连带升级 API 出口校验`, () => {
  // design §4.1: rc.92 ESM 入口 components.es.js 以命名导入方式
  //   import { ..., useImageViewer, ..., isClient, isUndefined, ... } from "@opensig/opendesign"
  // 1.2.4 不导出 useImageViewer → 模块加载阶段 SyntaxError;1.2.7-sp1 必须全部导出。
  // 既有版本一致性断言只校版本号不校 API 实际存在,本组补强:直接校验运行时导出覆盖。

  beforeAll(() => {
    const noop = () => ({ matches: false, media: '', addListener: () => {}, removeListener: () => {}, addEventListener: () => {}, removeEventListener: () => {}, onchange: null, dispatchEvent: () => false });
    (window as unknown as { matchMedia: unknown }).matchMedia = noop;
  });

  // 从 rc.92 ESM 入口(components.es.js)静态提取 import 自 @opensig/opendesign 的全部命名
  function readPeerNamedImports(): string[] {
    const esEntryRel = installedPkg.exports?.['.']?.import as string | undefined;
    if (!esEntryRel) return [];
    const esPath = join(installedPkgDir, esEntryRel);
    if (!existsSync(esPath)) return [];
    const esText = readFileSync(esPath, 'utf-8');
    const matches = [...esText.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']@opensig\/opendesign["']/g)];
    return matches
      .flatMap((m) => m[1].split(','))
      .map((s) => s.trim().split(/\s+as\s+/)[0].trim())
      .filter(Boolean);
  }

  const peerNamedImports = readPeerNamedImports();

  it('成功提取 rc.92 ESM 入口对 @opensig/opendesign 的命名导入列表', () => {
    expect(peerNamedImports.length, '未提取到命名导入,ESM 入口或 import 语句缺失').toBeGreaterThan(0);
  });

  it('rc.92 ESM 入口确实命名导入了 useImageViewer(强制连带升级的直接诱因)', () => {
    expect(peerNamedImports).toContain('useImageViewer');
  });

  it('rc.92 ESM 入口命名导入的 composables/utils(isClient、isUndefined)在列表中', () => {
    expect(peerNamedImports).toContain('isClient');
    expect(peerNamedImports).toContain('isUndefined');
  });

  it('rc.92 ESM 入口全部命名导入在 @opensig/opendesign 运行时均解析(无 SyntaxError 风险)', async () => {
    const mod = await import(PEER_PKG_NAME);
    const missing = peerNamedImports.filter((name) => mod[name] === undefined || mod[name] === null);
    expect(missing, `1.2.7-sp1 缺失 rc.92 ESM 入口所需导出: ${missing.join(', ')}`).toEqual([]);
  });

  it('useImageViewer 在 @opensig/opendesign 运行时为可调用 function(1.2.4 缺失 → 此处拦截)', async () => {
    const mod = await import(PEER_PKG_NAME);
    expect(typeof mod.useImageViewer, 'useImageViewer 不是 function').toBe('function');
  });
});
