import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const PROJECT_ROOT = resolve(__dirname, '..');
const HEADER_ZH = 'app/.vitepress/src-new/i18n/header/header-zh.ts';
const HEADER_EN = 'app/.vitepress/src-new/i18n/header/header-en.ts';

function readFileContent(filePath: string): string {
  const full = resolve(PROJECT_ROOT, filePath);
  if (!existsSync(full)) {
    throw new Error(`file not found: ${full}`);
  }
  return readFileSync(full, 'utf-8');
}

describe('中文导航【文档】→"新手入门" href 路径段更新（设计 §3）', () => {
  const content = readFileContent(HEADER_ZH);

  it('header-zh.ts 文件存在且可读', () => {
    expect(content.length).toBeGreaterThan(0);
  });

  it('"新手入门" 条目 label 保持 "新手入门" 未改（设计 §4.3）', () => {
    expect(content).toContain(`label: '新手入门'`);
  });

  it('"新手入门" href 使用新路径段 getting_start（设计 §3 目标）', () => {
    expect(content).toContain(
      '`${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/docs/24.03_LTS_SP4/getting_start/quick_start.html`'
    );
  });

  it('"新手入门" href 不再包含旧路径段 server/quickstart（设计 §1 改动验证）', () => {
    const idx = content.indexOf("label: '新手入门'");
    expect(idx).toBeGreaterThan(-1);
    const slice = content.slice(idx, idx + 400);
    expect(slice).not.toContain('server/quickstart');
  });

  it('"新手入门" href 保留 ${VITE_SERVICE_DOCS_URL} 外链前缀（设计 §4.1 模式继承）', () => {
    expect(content).toContain(
      '`${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/docs/24.03_LTS_SP4/getting_start/quick_start.html`'
    );
  });

  it('"新手入门" href 保留 /zh/ locale 前缀（设计 §4.1 模式继承）', () => {
    expect(content).toContain(
      '/zh/docs/24.03_LTS_SP4/getting_start/quick_start.html'
    );
  });

  it('"新手入门" href 文件名 quick_start.html 保持不变（设计 §3 仅换路径段）', () => {
    expect(content).toContain('getting_start/quick_start.html');
  });

  it('"新手入门" tag 仍为 HOT（设计 §3 不动 tag）', () => {
    const idx = content.indexOf("label: '新手入门'");
    const slice = content.slice(idx, idx + 200);
    expect(slice).toContain('tag: TAG_TYPE.HOT');
  });

  it('"新手入门" description 未被改动（设计 §3 不动 description）', () => {
    const idx = content.indexOf("label: '新手入门'");
    const slice = content.slice(idx, idx + 200);
    expect(slice).toContain("description: '10分钟玩转社区，快速构建与成长'");
  });
});

describe('英文导航【Document】→"Quick Start" href 路径段更新（设计 §3）', () => {
  const content = readFileContent(HEADER_EN);

  it('header-en.ts 文件存在且可读', () => {
    expect(content.length).toBeGreaterThan(0);
  });

  it('"Quick Start" 条目 label 保持 "Quick Start"（设计 §4.3）', () => {
    expect(content).toContain(`label: 'Quick Start'`);
  });

  it('"Quick Start" href 使用新路径段 getting_start（设计 §3 目标）', () => {
    expect(content).toContain(
      '`${import.meta.env.VITE_SERVICE_DOCS_URL}/en/docs/24.03_LTS_SP4/getting_start/quick_start.html`'
    );
  });

  it('"Quick Start" href 不再包含旧路径段 server/quickstart（设计 §1 改动验证）', () => {
    const idx = content.indexOf("label: 'Quick Start'");
    expect(idx).toBeGreaterThan(-1);
    const slice = content.slice(idx, idx + 400);
    expect(slice).not.toContain('server/quickstart');
  });

  it('"Quick Start" href 保留 /en/ locale 前缀（en 路由完整性）', () => {
    expect(content).toContain(
      '/en/docs/24.03_LTS_SP4/getting_start/quick_start.html'
    );
  });
});

describe('zh/en 路径统一为预期（设计 §3 双语同步）', () => {
  const zh = readFileContent(HEADER_ZH);
  const en = readFileContent(HEADER_EN);

  it('zh "新手入门" 与 en "Quick Start" 均用 getting_start（结构已统一）', () => {
    expect(zh).toContain('getting_start/quick_start.html');
    expect(en).toContain('getting_start/quick_start.html');
  });

  it('zh 与 en 的 docs 路径段仅 locale 前缀不同（zh=/zh/docs/.../getting_start/..., en=/en/docs/.../getting_start/...）', () => {
    expect(zh).toContain('/zh/docs/24.03_LTS_SP4/getting_start/quick_start.html');
    expect(en).toContain('/en/docs/24.03_LTS_SP4/getting_start/quick_start.html');
  });
});

describe('zh 兄弟条目未被误改（设计 §3 仅改"新手入门"一行）', () => {
  const content = readFileContent(HEADER_ZH);

  it('"文档中心" href 仍指向 docs 根（未被波及）', () => {
    expect(content).toContain(
      '`${import.meta.env.VITE_SERVICE_DOCS_URL}/zh/`'
    );
  });

  it('"安装指南" href 仍指向 SP3 installation（未被波及）', () => {
    expect(content).toContain(
      '/zh/docs/24.03_LTS_SP3/server/installation_upgrade/installation/installation_preparations.html'
    );
  });

  it('全仓 zh header 不含 SP4 + server/quickstart 的旧组合（旧链已彻底替换）', () => {
    expect(content).not.toContain(
      '24.03_LTS_SP4/server/quickstart/quick_start.html'
    );
  });
});

describe('en 兄弟条目未被误改（设计 §3 仅改 "Quick Start" 一行；tester 补 EN 镜像断言，对齐 zh line 131-135）', () => {
  const content = readFileContent(HEADER_EN);

  it('"Document Center" href 仍指向 docs 根（未被波及）', () => {
    expect(content).toContain(
      '`${import.meta.env.VITE_SERVICE_DOCS_URL}/en/`'
    );
  });

  it('"Installation Guide" href 仍指向 SP3 installation（未被波及）', () => {
    expect(content).toContain(
      '/en/docs/24.03_LTS_SP3/server/installation_upgrade/installation/installation_preparations.html'
    );
  });

  it('"Quick Start" tag 仍为 HOT（设计 §3 不动 tag）', () => {
    const idx = content.indexOf("label: 'Quick Start'");
    expect(idx).toBeGreaterThan(-1);
    const slice = content.slice(idx, idx + 200);
    expect(slice).toContain('tag: TAG_TYPE.HOT');
  });

  it('"Quick Start" description 未被改动（设计 §3 不动 description；EN 值跨行书写，仅校验文本值）', () => {
    const idx = content.indexOf("label: 'Quick Start'");
    expect(idx).toBeGreaterThan(-1);
    const slice = content.slice(idx, idx + 400);
    expect(slice).toContain(
      "'Learn the community essentials in 10 minutes, build and grow quickly.'"
    );
  });

  it('全仓 en header 不含 SP4 + server/quickstart 的旧组合（旧链已彻底替换，对齐 zh line 131-135）', () => {
    expect(content).not.toContain(
      'en/docs/24.03_LTS_SP4/server/quickstart/quick_start.html'
    );
  });

  it('en header 不含旧的 SP3 quickstart 双层路径（旧 Quick Start 链已迁移，设计 §1 改动验证）', () => {
    expect(content).not.toContain(
      'en/docs/24.03_LTS_SP3/server/quickstart/quickstart/quick_start.html'
    );
  });
});
