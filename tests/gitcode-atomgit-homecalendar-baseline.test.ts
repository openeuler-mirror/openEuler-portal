import { expect, describe, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const HOME_CALENDAR_VUE = path.join(
  PROJECT_ROOT,
  'app/.vitepress/src-new/views/home/HomeCalendar.vue'
);

function replicateIdentitiesVisible(identities: { identity: string }[] | undefined) {
  return identities?.some(
    (item) => item.identity === 'gitee' || item.identity === 'gitcode'
  );
}

describe('HomeCalendar.vue — identity 枚举 gitcode 字面量基线(sanctioned 残留)', () => {
  it('文件存在', () => {
    expect(fs.existsSync(HOME_CALENDAR_VUE)).toBe(true);
  });

  it('toCreateMeeting 仍以 gitcode 字面量做 identity 比较(后端契约基线,显式不动)', () => {
    const content = fs.readFileSync(HOME_CALENDAR_VUE, 'utf8');
    expect(content).toContain(
      "identitiesStore.identities?.some(item => item.identity === 'gitee' || item.identity === 'gitcode')"
    );
  });

  it('比较分支位于 toCreateMeeting 函数内', () => {
    const content = fs.readFileSync(HOME_CALENDAR_VUE, 'utf8');
    const fnIdx = content.indexOf('const toCreateMeeting');
    const compareIdx = content.indexOf("item.identity === 'gitcode'");
    expect(fnIdx, '应存在 toCreateMeeting 函数').toBeGreaterThan(-1);
    expect(compareIdx, '应存在 gitcode 比较').toBeGreaterThan(fnIdx);
  });
});

describe('HomeCalendar identity 比较分支 — 逻辑回归(冻结后端契约语义)', () => {
  it('identity=gitcode → 视为已绑定(visible=true)', () => {
    expect(replicateIdentitiesVisible([{ identity: 'gitcode' }])).toBe(true);
  });

  it('identity=gitee → 视为已绑定(visible=true)', () => {
    expect(replicateIdentitiesVisible([{ identity: 'gitee' }])).toBe(true);
  });

  it('identity=atomgit → 当前未被识别(visible=false,待后端另 issue 协调)', () => {
    expect(replicateIdentitiesVisible([{ identity: 'atomgit' }])).toBe(false);
  });

  it('identity 列表为空 → visible=false', () => {
    expect(replicateIdentitiesVisible([])).toBe(false);
  });

  it('identities 为 undefined → 返回 falsy(optional chain 短路为 undefined,后端契约基线)', () => {
    expect(replicateIdentitiesVisible(undefined)).toBeFalsy();
  });

  it('gitcode 与 gitee 同时存在 → visible=true(任一命中即识别)', () => {
    expect(
      replicateIdentitiesVisible([
        { identity: 'gitee' },
        { identity: 'gitcode' },
      ])
    ).toBe(true);
  });

  it('多身份中仅 gitcode 命中 → visible=true', () => {
    expect(
      replicateIdentitiesVisible([
        { identity: 'wechat' },
        { identity: 'gitcode' },
        { identity: 'atomgit' },
      ])
    ).toBe(true);
  });
});
