import type { HeadConfig, UserConfig } from 'vitepress';
import tdks from './tdks';

const isBlog = /.+\/(?:news|blog|showcase)\/.+$/;

const config: UserConfig = {
  sitemap: {
    hostname: 'https://www.openeuler.org',
    transformItems: (items) => items.filter(item => !item.url.startsWith('/en/approve')),
  },
  lastUpdated: true,
  base: '/',
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
  async transformPageData(pageData) {
    const filePath = pageData.filePath;
    let lookupKey: string;
    if (filePath.endsWith('index.md')) {
      lookupKey = encodeURI(filePath.slice(0, -9));
    } else {
      lookupKey = encodeURI(filePath.slice(0, -2).concat('html'));
    }
    const locale = filePath.slice(0, 2) as 'zh' | 'en';
    const tdkInfo = tdks[locale]?.[lookupKey];
    if (lookupKey === 'zh') {
      pageData.titleTemplate = 'openEuler社区官网';
    } else if (lookupKey === 'en') {
      pageData.titleTemplate = 'openEuler';
    } else {
      pageData.titleTemplate = `:title | ${tdks.titleSuffix[locale]}`;
    }
    if (!tdkInfo) {
      if (isBlog.test(lookupKey)) {
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
  themeConfig: {
    // locales: {
    //   '/': i18n.zh,
    //   '/zh/': i18n.zh,
    //   '/en/': i18n.en,
    //   '/ru/': i18n.ru,
    // },
    docsUrl: 'https://docs.openeuler.org',
    forumUrl: 'https://forum.openeuler.org',
  },
};
export default config;
