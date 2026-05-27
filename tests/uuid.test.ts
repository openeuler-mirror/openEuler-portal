// @vitest-environment node
import { expect, describe, it } from 'vitest';
import { v4 as uuidV4 } from 'uuid';
import { uniqueId } from '../app/.vitepress/src/shared/utils';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('uuid 升级至 v14 后 uniqueId 功能验证', () => {
  it('uniqueId 返回符合 UUID v4 格式的字符串', () => {
    const id = uniqueId();
    expect(UUID_V4_REGEX.test(id)).toBe(true);
  });

  it('uniqueId 每次调用返回不同值（随机性）', () => {
    const ids = Array.from({ length: 100 }, () => uniqueId());
    const uniqueSet = new Set(ids);
    expect(uniqueSet.size).toBe(100);
  });

  it('uniqueId 返回值为 string 类型', () => {
    const id = uniqueId();
    expect(typeof id).toBe('string');
  });

  it('uniqueId 与直接调用 uuidV4 结果格式一致', () => {
    const fromUniqueId = uniqueId();
    const fromUuidV4 = uuidV4();
    expect(UUID_V4_REGEX.test(fromUniqueId)).toBe(true);
    expect(UUID_V4_REGEX.test(fromUuidV4)).toBe(true);
  });
});

describe('uuid v14 ESM 兼容性验证', () => {
  it('uuid v4 通过 ESM import 正常可用', () => {
    expect(uuidV4).toBeDefined();
    expect(typeof uuidV4).toBe('function');
  });

  it('uuid v4 调用返回 string 类型', () => {
    const id = uuidV4();
    expect(typeof id).toBe('string');
  });

  it('uuid v4 返回值符合 RFC 4122 UUID v4 格式', () => {
    const id = uuidV4();
    expect(UUID_V4_REGEX.test(id)).toBe(true);
    expect(id.charAt(14)).toBe('4');
    expect(['8', '9', 'a', 'b']).toContain(id.charAt(19));
  });
});

describe('uuid v14 版本声明及 CVE 修复验证', () => {
  it('package.json 中 uuid 版本声明 ≥ 14.0.0', () => {
    const pkgPath = resolve(__dirname, '../package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    const uuidVersion = pkg.dependencies.uuid;
    expect(uuidVersion).toMatch(/^[\^~]?14\./);
  });

  it('已安装的 uuid 包实际版本 ≥ 14.0.0', () => {
    const installedPath = resolve(__dirname, '../node_modules/uuid/package.json');
    const installedPkg = JSON.parse(readFileSync(installedPath, 'utf-8'));
    const majorVersion = parseInt(installedPkg.version.split('.')[0], 10);
    expect(majorVersion).toBeGreaterThanOrEqual(14);
  });
});

describe('uniqueId 包装函数正确性验证', () => {
  it('uniqueId 函数已从 shared/utils.ts 导出', () => {
    expect(uniqueId).toBeDefined();
    expect(typeof uniqueId).toBe('function');
  });

  it('uniqueId 调用不抛异常', () => {
    expect(() => uniqueId()).not.toThrow();
  });
});