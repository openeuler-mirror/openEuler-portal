import { expect, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const filePath = resolve(
  __dirname,
  '../app/.vitepress/public/robots.txt'
);
const content = readFileSync(filePath, 'utf8');
const lines = content.split('\n');

describe('robots.txt — Sitemap 行冒号后空格(sitemap 协议惯例)', () => {
  it('文件存在', () => {
    expect(content).toBeTruthy();
  });

  it('存在 Sitemap 指令且值为站点 sitemap URL', () => {
    const sitemapLine = lines.find((line) => line.startsWith('Sitemap:'));
    expect(sitemapLine).toBeDefined();
    expect(sitemapLine).toBe(
      'Sitemap: https://www.openeuler.org/sitemap.xml'
    );
  });

  it('Sitemap 行冒号后有一个空格(修复点:原为 Sitemap:https:// 无空格)', () => {
    const sitemapLine = lines.find((line) => line.startsWith('Sitemap:'));
    expect(sitemapLine).toMatch(/^Sitemap:\s+\S/);
  });

  it('不存在 Sitemap:https:// 这种冒号后无空格的写法(回归保护)', () => {
    expect(content).not.toMatch(/Sitemap:https:\/\//);
  });
});

describe('robots.txt — 其余指令保持原样(回归基线)', () => {
  it('User-agent 行存在', () => {
    expect(content).toMatch(/^User-agent:\s*\*?/m);
  });

  it('Content-Signal 行存在', () => {
    expect(content).toMatch(/^Content-Signal:/m);
  });

  it('Allow: / 行存在', () => {
    expect(content).toMatch(/^Allow:\s*\/\s*$/m);
  });

  it('Disallow: /*// 行存在', () => {
    expect(content).toMatch(/^Disallow:\s*\/\*\/\//m);
  });

  it('LLM-Policy 行存在且指向 llms.txt', () => {
    expect(content).toMatch(/^LLM-Policy:\s*https:\/\/www\.openeuler\.org\/llms\.txt/m);
  });
});
