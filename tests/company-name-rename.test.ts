import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { globSync } from 'glob';

const PROJECT_ROOT = resolve(__dirname, '..');
const OLD_NAME = '超聚变数字技术有限公司';
const NEW_NAME = '超聚变数字技术股份有限公司';

function readFileContent(filePath: string): string | null {
  const full = resolve(PROJECT_ROOT, filePath);
  if (!existsSync(full)) return null;
  return readFileSync(full, 'utf-8');
}

function readJsonFile(filePath: string): any | null {
  const content = readFileContent(filePath);
  if (!content) return null;
  return JSON.parse(content);
}

const changedMdFiles = [
  'app/zh/showcase/finance/xingye/index.md',
  'app/zh/news/20230915-30w/20230915-30w.md',
  'app/zh/news/openEuler/20240914-uebao/20240914-uebao.md',
  'app/zh/news/20220831.md',
  'app/zh/news/20230325-sz/20230325-sz.md',
  'app/zh/news/20220627.md',
  'app/zh/news/20230428-ODD/20230428-ODD.md',
  'app/zh/news/20220707.md',
  'app/zh/news/openEuler/20231020-vrt/20231020-vrt.md',
  'app/zh/news/openEuler/20231229-610/20231229-610.md',
  'app/zh/news/openEuler/20240914-TC/20240914-TC.md',
  'app/zh/news/openEuler/20231229-lx/20231229-lx.md',
];

describe('公司全称更名 — 旧名零残留', () => {
  it('全站无 "超聚变数字技术有限公司" 残留', () => {
    const scanPatterns = [
      resolve(PROJECT_ROOT, 'app/**/*.md'),
      resolve(PROJECT_ROOT, 'app/**/*.ts'),
      resolve(PROJECT_ROOT, 'data/**/*.json'),
      resolve(PROJECT_ROOT, '.geo/**/*.json'),
    ];
    let foundOldName = false;
    const offendingFiles: string[] = [];
    for (const pattern of scanPatterns) {
      const files = globSync(pattern);
      for (const f of files) {
        const content = readFileSync(f, 'utf-8');
        if (content.includes(OLD_NAME)) {
          foundOldName = true;
          offendingFiles.push(f);
        }
      }
    }
    expect(foundOldName, `旧名残留于: ${offendingFiles.join(', ')}`).toBe(false);
  });

  it('data/compatibility/compat_server_zh.json 无旧名', () => {
    const content = readFileContent('data/compatibility/compat_server_zh.json');
    expect(content).not.toBeNull();
    expect(content!).not.toContain(OLD_NAME);
  });

  it('data/compatibility/OECP_certification_details_list.json 无旧名', () => {
    const content = readFileContent('data/compatibility/OECP_certification_details_list.json');
    expect(content).not.toBeNull();
    expect(content!).not.toContain(OLD_NAME);
  });

  it('.geo/jsonld/zh/showcase/finance/xingye/index.json 无旧名', () => {
    const content = readFileContent('.geo/jsonld/zh/showcase/finance/xingye/index.json');
    expect(content).not.toBeNull();
    expect(content!).not.toContain(OLD_NAME);
  });

  it('honor/2023.ts 无旧名', () => {
    const content = readFileContent('app/.vitepress/src-new/data/honor/2023.ts');
    expect(content).not.toBeNull();
    expect(content!).not.toContain(OLD_NAME);
  });

  it('zhenzhou.ts 无旧名', () => {
    const content = readFileContent('app/.vitepress/src-new/data/user-group/city/zhenzhou.ts');
    expect(content).not.toBeNull();
    expect(content!).not.toContain(OLD_NAME);
  });

  it('data_zh.ts 无旧名', () => {
    const content = readFileContent('app/.vitepress/src-new/views/summit/summit2025/data/data_zh.ts');
    expect(content).not.toBeNull();
    expect(content!).not.toContain(OLD_NAME);
  });

  it('download-commercial-release.ts 无旧名', () => {
    const content = readFileContent('app/.vitepress/src-new/data/download/download-commercial-release.ts');
    expect(content).not.toBeNull();
    expect(content!).not.toContain(OLD_NAME);
  });

  for (const mdFile of changedMdFiles) {
    it(`${mdFile} 无旧名`, () => {
      const content = readFileContent(mdFile);
      expect(content).not.toBeNull();
      expect(content!).not.toContain(OLD_NAME);
    });
  }
});

describe('公司全称更名 — 新名正确出现', () => {
  it('compat_server_zh.json hardwareFactory 含新名（8处）', () => {
    const data = readJsonFile('data/compatibility/compat_server_zh.json');
    expect(data).not.toBeNull();
    const asArray = data as any[];
    const withNewName = asArray.filter(
      (item: any) => item.hardwareFactory === NEW_NAME
    );
    expect(withNewName.length).toBe(8);
  });

  it('compat_server_zh.json 无 hardwareFactory 为旧名', () => {
    const data = readJsonFile('data/compatibility/compat_server_zh.json');
    expect(data).not.toBeNull();
    const asArray = data as any[];
    const withOldName = asArray.filter(
      (item: any) => item.hardwareFactory === OLD_NAME
    );
    expect(withOldName.length).toBe(0);
  });

  it('compat_server_zh.json 新旧名不混存（hardwareFactory 全部一致）', () => {
    const data = readJsonFile('data/compatibility/compat_server_zh.json');
    expect(data).not.toBeNull();
    const asArray = data as any[];
    const xfusionRecords = asArray.filter(
      (item: any) =>
        item.hardwareFactory &&
        (item.hardwareFactory.includes('超聚变数字技术') || item.hardwareFactory === '超聚变')
    );
    const fullNames = xfusionRecords.filter(
      (item: any) => item.hardwareFactory === NEW_NAME
    );
    const shortNames = xfusionRecords.filter(
      (item: any) => item.hardwareFactory === '超聚变'
    );
    const oldNames = xfusionRecords.filter(
      (item: any) => item.hardwareFactory === OLD_NAME
    );
    expect(oldNames.length).toBe(0);
    expect(fullNames.length).toBeGreaterThan(0);
    expect(shortNames.length).toBeGreaterThan(0);
  });

  it('OECP_certification_details_list.json osv_name 含新名（9处）', () => {
    const data = readJsonFile('data/compatibility/OECP_certification_details_list.json');
    expect(data).not.toBeNull();
    const asArray = data as any[];
    const withNewName = asArray.filter(
      (item: any) => item.osv_name === NEW_NAME
    );
    expect(withNewName.length).toBe(9);
  });

  it('OECP_certification_details_list.json 无 osv_name 为旧名', () => {
    const data = readJsonFile('data/compatibility/OECP_certification_details_list.json');
    expect(data).not.toBeNull();
    const asArray = data as any[];
    const withOldName = asArray.filter(
      (item: any) => item.osv_name === OLD_NAME
    );
    expect(withOldName.length).toBe(0);
  });

  it('honor/2023.ts post 字段含新名', () => {
    const content = readFileContent('app/.vitepress/src-new/data/honor/2023.ts');
    expect(content).not.toBeNull();
    expect(content!).toContain(NEW_NAME);
  });

  it('zhenzhou.ts organizational 字段含新名', () => {
    const content = readFileContent('app/.vitepress/src-new/data/user-group/city/zhenzhou.ts');
    expect(content).not.toBeNull();
    expect(content!).toContain(`organizational: '${NEW_NAME}'`);
  });

  it('zhenzhou.ts position 字段含新名', () => {
    const content = readFileContent('app/.vitepress/src-new/data/user-group/city/zhenzhou.ts');
    expect(content).not.toBeNull();
    expect(content!).toContain(`position: '${NEW_NAME}'`);
  });

  it('data_zh.ts post 字段含新名', () => {
    const content = readFileContent('app/.vitepress/src-new/views/summit/summit2025/data/data_zh.ts');
    expect(content).not.toBeNull();
    expect(content!).toContain(`post: '${NEW_NAME}'`);
  });

  it('data_zh.ts title 字段含新名', () => {
    const content = readFileContent('app/.vitepress/src-new/views/summit/summit2025/data/data_zh.ts');
    expect(content).not.toBeNull();
    expect(content!).toContain(NEW_NAME);
  });

  it('download-commercial-release.ts MANUFACTURER 含新名', () => {
    const content = readFileContent('app/.vitepress/src-new/data/download/download-commercial-release.ts');
    expect(content).not.toBeNull();
    expect(content!).toContain(`MANUFACTURER: '${NEW_NAME}'`);
  });
});

describe('xingye JSON-LD 与 md 页面同步', () => {
  const jsonLd = readJsonFile('.geo/jsonld/zh/showcase/finance/xingye/index.json');
  const mdContent = readFileContent('app/zh/showcase/finance/xingye/index.md');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('md 页面存在', () => {
    expect(mdContent).not.toBeNull();
  });

  it('JSON-LD mentions 中 Organization.name 为新名', () => {
    const asArray = jsonLd as any[];
    const article = asArray.find((item: any) => item['@type'] === 'Article');
    expect(article).toBeDefined();
    const xfusionOrg = article!.mentions.find(
      (m: any) => m.name && m.name.includes('超聚变数字技术')
    );
    expect(xfusionOrg).toBeDefined();
    expect(xfusionOrg!.name).toBe(NEW_NAME);
    expect(xfusionOrg!.name).not.toBe(OLD_NAME);
  });

  it('JSON-LD Article description 不含旧名全称', () => {
    const asArray = jsonLd as any[];
    const article = asArray.find((item: any) => item['@type'] === 'Article');
    expect(article).toBeDefined();
    expect(article!.description).not.toContain(OLD_NAME);
  });

  it('JSON-LD CaseStudy provider.name 为新名', () => {
    const asArray = jsonLd as any[];
    const caseStudy = asArray.find((item: any) => item['@type'] === 'CaseStudy');
    expect(caseStudy).toBeDefined();
    expect(caseStudy!.provider.name).toBe(NEW_NAME);
    expect(caseStudy!.provider.name).not.toBe(OLD_NAME);
  });

  it('JSON-LD CaseStudy description 含新名而非旧名', () => {
    const asArray = jsonLd as any[];
    const caseStudy = asArray.find((item: any) => item['@type'] === 'CaseStudy');
    expect(caseStudy).toBeDefined();
    expect(caseStudy!.description).toContain(NEW_NAME);
    expect(caseStudy!.description).not.toContain(OLD_NAME);
  });

  it('md 页面含新名而非旧名', () => {
    expect(mdContent!).toContain(NEW_NAME);
    expect(mdContent!).not.toContain(OLD_NAME);
  });

  it('JSON-LD 与 md 页面公司名一致（均为新名）', () => {
    const jsonStr = JSON.stringify(jsonLd);
    expect(jsonStr).toContain(NEW_NAME);
    expect(jsonStr).not.toContain(OLD_NAME);
    expect(mdContent!).toContain(NEW_NAME);
    expect(mdContent!).not.toContain(OLD_NAME);
  });
});

describe('md 页面新名验证', () => {
  for (const mdFile of changedMdFiles) {
    it(`${mdFile} 含新名而非旧名`, () => {
      const content = readFileContent(mdFile);
      expect(content).not.toBeNull();
      expect(content!).toContain(NEW_NAME);
      expect(content!).not.toContain(OLD_NAME);
    });
  }
});

describe('品牌简称 "超聚变" 不受影响', () => {
  it('compat_server_zh.json 仍有 hardwareFactory 为 "超聚变"（简称）', () => {
    const data = readJsonFile('data/compatibility/compat_server_zh.json');
    expect(data).not.toBeNull();
    const asArray = data as any[];
    const shortNames = asArray.filter(
      (item: any) => item.hardwareFactory === '超聚变'
    );
    expect(shortNames.length).toBeGreaterThan(0);
  });

  it('全站搜索 "超聚变数字技术股份有限公司" 不会误替换 "超聚变" 简称', () => {
    const compatData = readJsonFile('data/compatibility/compat_server_zh.json') as any[];
    const hasShort = compatData.some((item: any) => item.hardwareFactory === '超聚变');
    const hasFull = compatData.some((item: any) => item.hardwareFactory === NEW_NAME);
    expect(hasShort).toBe(true);
    expect(hasFull).toBe(true);
    expect(compatData.some((item: any) => item.hardwareFactory === OLD_NAME)).toBe(false);
  });
});
