import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { globSync } from 'glob';

const PROJECT_ROOT = process.cwd();
const geoDir = resolve(PROJECT_ROOT, '.geo');

function readJsonLdJson(locale: string, pagePath: string) {
  const filePath = join(geoDir, 'jsonld', locale, pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

describe('zh 首页 JSON-LD description 文案修正 — "等多样性计算架构"', () => {
  const jsonLd = readJsonLdJson('zh', '');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('JSON-LD 为 array 格式', () => {
    expect(Array.isArray(jsonLd)).toBe(true);
  });

  it('SoftwareApplication description 包含"等多样性计算架构"', () => {
    const asArray = jsonLd as any[];
    const swApp = asArray.find((item: any) => item['@type'] === 'SoftwareApplication');
    expect(swApp).toBeDefined();
    expect(swApp!.description).toContain('等多样性计算架构');
  });

  it('SoftwareApplication description 不含"六种处理器架构"', () => {
    const asArray = jsonLd as any[];
    const swApp = asArray.find((item: any) => item['@type'] === 'SoftwareApplication');
    expect(swApp).toBeDefined();
    expect(swApp!.description).not.toContain('六种处理器架构');
  });

  it('SoftwareApplication description 仍包含所有架构名称', () => {
    const asArray = jsonLd as any[];
    const swApp = asArray.find((item: any) => item['@type'] === 'SoftwareApplication');
    expect(swApp).toBeDefined();
    expect(swApp!.description).toContain('ARM');
    expect(swApp!.description).toContain('x86');
    expect(swApp!.description).toContain('RISC-V');
    expect(swApp!.description).toContain('LoongArch');
    expect(swApp!.description).toContain('PowerPC');
    expect(swApp!.description).toContain('SW-64');
  });

  it('JSON-LD 整体结构不变 — 仍含 Organization 和 SoftwareApplication', () => {
    const asArray = jsonLd as any[];
    expect(asArray.find((item: any) => item['@type'] === 'Organization')).toBeDefined();
    expect(asArray.find((item: any) => item['@type'] === 'SoftwareApplication')).toBeDefined();
  });
});

describe('en 首页 JSON-LD description 不受影响', () => {
  const jsonLd = readJsonLdJson('en', '');

  it('JSON-LD 配置文件存在', () => {
    expect(jsonLd).not.toBeNull();
  });

  it('SoftwareApplication description 不含"六种"等数量描述', () => {
    const asArray = jsonLd as any[];
    const swApp = asArray.find((item: any) => item['@type'] === 'SoftwareApplication');
    expect(swApp).toBeDefined();
    expect(swApp!.description).not.toContain('six');
    expect(swApp!.description).not.toMatch(/\bsix\s+architectures\b/i);
  });

  it('SoftwareApplication description 包含所有架构名称', () => {
    const asArray = jsonLd as any[];
    const swApp = asArray.find((item: any) => item['@type'] === 'SoftwareApplication');
    expect(swApp).toBeDefined();
    expect(swApp!.description).toContain('Arm');
    expect(swApp!.description).toContain('x86');
    expect(swApp!.description).toContain('RISC-V');
    expect(swApp!.description).toContain('LoongArch');
    expect(swApp!.description).toContain('PowerPC');
    expect(swApp!.description).toContain('SW-64');
  });
});

describe('.geo/jsonld 全局无"六种处理器架构"残留', () => {
  it('整个 .geo/jsonld 目录中不含"六种处理器架构"', () => {
    const pattern = resolve(geoDir, 'jsonld/**/*.json');
    const files = globSync(pattern);
    let hasResidual = false;
    let residualFile = '';
    for (const f of files) {
      const content = readFileSync(f, 'utf-8');
      if (content.includes('六种处理器架构')) {
        hasResidual = true;
        residualFile = f;
        break;
      }
    }
    expect(hasResidual, `.geo/jsonld 中不应有"六种处理器架构"残留，发现于: ${residualFile}`).toBe(false);
  });
});
