import { expect, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const filePath = resolve(
  __dirname,
  '../app/.vitepress/src-new/views/sig/sig-detail/SigContribute.vue'
);
const content = readFileSync(filePath, 'utf-8');

describe('SigContribute.vue — font-family: 500 笔误修正为 font-weight: 500', () => {
  it('.contribute-list 使用 font-weight: 500', () => {
    expect(content).toMatch(/\.contribute-list\s*\{[^}]*font-weight:\s*500/);
  });

  it('不存在 font-family: 500 的无效声明', () => {
    expect(content).not.toMatch(/font-family:\s*500/);
  });

  it('.contribute-list 中 font-weight 出现在 display: flex 之后', () => {
    const match = content.match(
      /\.contribute-list\s*\{[^}]*display:\s*flex[^}]*font-weight:\s*500/
    );
    expect(match).not.toBeNull();
  });

  it('.contribute-list 与 .yellow-box 的 font-weight 声明一致', () => {
    const contributeListMatch = content.match(
      /\.contribute-list\s*\{[^}]*font-weight:\s*(\d+)/
    );
    const yellowBoxMatch = content.match(
      /\.yellow-box\s*\{[^}]*font-weight:\s*(\d+)/
    );
    expect(contributeListMatch).not.toBeNull();
    expect(yellowBoxMatch).not.toBeNull();
    expect(contributeListMatch![1]).toBe(yellowBoxMatch![1]);
  });
});
