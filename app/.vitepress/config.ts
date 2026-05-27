import type { HeadConfig, PageData, UserConfig } from 'vitepress';

import { viteLlmsTxt } from './plugins/generateLLMsTxtNew';
import LLMsTxtSections from './LLMsTxtSections';
import viteLastModifiedPlugin from '@opendesign-plus/plugins/vite/generate-lastmod-changefreq';
import sitemapItemTransformer from '@opendesign-plus/geo-scripts/vitepress-sitemap-transformer';
import generateLLMsFull from '@opendesign-plus/geo-scripts/generate-llms-full';
import contentYamlPlugin from './plugins/vite-plugin-content-yaml';

import path, { join } from 'node:path';
import { existsSync, readFileSync} from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const isBlog = /.+\/(?:news|blog|showcase)\/.+$/;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const geoDir = path.resolve(__dirname, '../../.geo')
const currentHostname = readEnvVar('VITE_MAIN_DOMAIN_URL') || 'https://www.openeuler.org';

/**
 * 设置JSON-LD
 */
const setJSONLD = async (pageData: PageData, pagePath: string) => {
  const jsonFile = join(geoDir, 'jsonld', pagePath, 'index.json');
  if (!existsSync(jsonFile)) {
    return;
  }
  let content = readFileSync(jsonFile, 'utf-8');
  if (content) {
    (pageData.frontmatter.head ??= []).push([
      'script',
      { type: 'application/ld+json' },
      currentHostname !== 'https://www.openeuler.org' ? content.replaceAll('https://www.openeuler.org', currentHostname) : content
    ]);
  }
}

const setTdk = (pageData: PageData, pagePath: string) => {
  pageData.titleTemplate = `:title | ${pagePath.startsWith('zh') ? 'openEuler社区官网' : 'openEuler'}`;
  const jsonFile = join(geoDir, 'tdks', pagePath, 'index.json');
  const tdkInfo = existsSync(jsonFile) ? JSON.parse(readFileSync(jsonFile, 'utf-8')) : null;
  if (!tdkInfo) {
    if (isBlog.test(pagePath)) {
      const frontmatter = pageData.frontmatter;
      const description = frontmatter?.summary || frontmatter?.Summary;
      if (!pageData.description && description) {
        pageData.description = description;
      }
    }
    return;
  }
  const { title, description, keywords } = tdkInfo;
  if (description) {
    pageData.description = description;
  }
  if (title) {
    pageData.title = title;
  }
  if (keywords) {
    pageData.frontmatter.head ??= [];
    const keywordsIndex = pageData.frontmatter.head.findIndex(
      (item: HeadConfig) => item[1]?.name === 'keywords'
    );
    if (keywordsIndex !== -1) {
      pageData.frontmatter.head.splice(keywordsIndex, 1, [
        'meta',
        { name: 'keywords', content: keywords },
      ]);
      return;
    }
    pageData.frontmatter.head.push([
      'meta',
      { name: 'keywords', content: keywords },
    ]);
  }
}

function readEnvVar(key: string): string | undefined {
  // eslint-disable-next-line
  const envFile = resolve(process.cwd(), '.env.production');
  if (!existsSync(envFile)) return undefined;
  const match = readFileSync(envFile, 'utf-8').match(
    new RegExp(`^${key}\\s*=\\s*(.+)$`, 'm')
  );
  return match ? match[1].trim() : undefined;
}

// eslint-disable-next-line
const excludes = process.argv
  .filter(arg => arg.startsWith('--exclude='))
  .flatMap(arg => {
    const val = arg.split('=')[1];
    if (val.includes(',')) {
      return val.split(',').map(v => v.trim());
    }
    return val;
  });

const config: UserConfig = {
  sitemap: {
    hostname: currentHostname,
    transformItems: sitemapItemTransformer(
      items => {
        try {
          const lastmodeTimeStamp = JSON.parse(readFileSync(path.resolve(geoDir, 'last-modified.json'), 'utf-8')) as Record<string, number>;
          for (const item of items) {
            const key = item.url.endsWith('.html') ? item.url.replace('.html', '.md') : (item.url.endsWith('/') ? `${item.url}index.md` : `${item.url}/index.md`);
            const generatedItem = lastmodeTimeStamp[key];
            if (generatedItem) {
              Object.assign(item, generatedItem);
            }
          }
        } catch {}
        return items;
      },
      {
        // 首页
        '^(zh/|en/)?$': { priority: 1.0 },
        // 核心功能页：下载、镜像
        '^(zh|en)/(download|mirror)/?$': { priority: 0.8 },
        'zh/sig/sig-list/': { priority: 0.8 },
        'en/sig/sig-list/': { priority: 0.8 },
        // 核心功能页：迁移子页面
        '^(zh|en)/migration/(download|background|guidance|advantage|user-cases|transplantation-cases)/?$': {
          priority: 0.8
        },
        // 列表页（高频更新）
        '^(zh|en)/interaction/(blog-list|news-list|event-list)/?$': {
          priority: 0.8
        },
        // 重要栏目首页
        '^(zh|en)/(community|sig|security|learn|compatibility|internship|migration|other/projects)/?': {
          priority: 0.8
        },
        // 单篇文章：blog / news / showcase
        '^(zh|en)/(news|showcase)/.+': {
          priority: 0.6
        },
        '^(zh|en)/(blog)/.+': {
          priority: 0.5
        },
      }
    ),
  },
  lastUpdated: true,
  base: '/',
  srcExclude: excludes,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
    [
      'script',
      {
        src: '/check-dark-mode-v2.js',
      },
    ],
    [
      'meta',
      {
        name: 'baidu-site-verification',
        content: 'code-EWzbQRssNU',
      },
    ],
  ],
  appearance: false, // enable dynamic scripts for dark mode
  titleTemplate: false, //  vitepress supports pageTitileTemplate since 1.0.0
  transformPageData(pageData) {
    const filePath = pageData.filePath;
    let lookupKey: string;
    if (filePath.endsWith('index.md')) {
      lookupKey = encodeURI(filePath.slice(0, -9));
    } else {
      lookupKey = encodeURI(filePath.slice(0, -3));
    }
    setJSONLD(pageData, lookupKey);
    setTdk(pageData, lookupKey);
  },
  locales: {
    root: {
      lang: 'zh',
      title: 'openEuler',
      description:
        'openEuler 是一个开源、免费的 Linux 发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler 也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。',
    },
    zh: {
      lang: 'zh',
      title: 'openEuler',
      description:
        'openEuler 是一个开源、免费的 Linux 发行版平台，将通过开放的社区形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。同时，openEuler 也是一个创新的平台，鼓励任何人在该平台上提出新想法、开拓新思路、实践新方案。',
    },
    en: {
      lang: 'en',
      title: 'openEuler',
      description:
        'openEuler is an open source, free Linux distribution platform. The platform provides an open community for global developers to build an open, diversified, and architecture-inclusive software ecosystem. openEuler is also an innovative platform that encourages everyone to propose new ideas, explore new approaches, and practice new solutions.',
    },
    // ...sitemapZh,
  },
  markdown: {
    config(md) {
      md.set({
        html: true,
        linkify: false,
      });
    },
  },
  cleanUrls: true,
  vite: {
    resolve: {
      alias: {
        '#cms': resolve(__dirname, '../../.cms/export/index.client.ts'),
        '#content': resolve(__dirname, '../../.content'),
      },
    },
    plugins: [
      contentYamlPlugin(),
      viteLastModifiedPlugin({
        rootDir: join(__dirname, '../'),
        pageEntryPattern: ['zh/**/*.md', 'en/**/*.md'],
        ignoreDeps: ['**/shared/**', '**/utils/**', '**/composables/**', '**/i18n/**', '**/assets/**'],
        outputFile: join(geoDir, 'last-modified.json')
      }),
      viteLlmsTxt({
        title: 'openEuler | 开源社区',
        description: 'openEuler是一个开源、免费的 Linux 发行版平台，通过开放的形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。',
        sections: LLMsTxtSections
      })
    ],
    ssr: {
      noExternal: ['@opendesign-plus/components', 'element-plus']
    }
  },
  async buildEnd() {
    await generateLLMsFull({
      prefix: `# openEuler | 开源社区

> openEuler是一个开源、免费的 Linux 发行版平台，通过开放的形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。
 `,
      site: currentHostname,
      exclude: [/(zh|en)\/blog\//, /(zh|en)\/news\//],
      removeClass: ['feedback', 'feedback-md'],
      htmlDir: join(__dirname, 'dist'),
      output: join(__dirname, 'dist/llms-full.txt')
    });
  },
};
export default config;
