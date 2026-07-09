import type { HeadConfig, PageData } from 'vitepress';

/** 匹配 news 文章页 filePath（zh/en 下的 news 文章） */
export const isNews = /^(zh|en)\/news\//;

const newsLang = { zh: 'zh-CN', en: 'en-US' };
const newsPublisher = {
  zh: { '@type': 'Organization', name: 'openEuler社区', url: 'https://www.openeuler.org/zh/', logo: { '@type': 'ImageObject', url: 'https://www.openeuler.org/favicon.ico' } },
  en: { '@type': 'Organization', name: 'openEuler Community', url: 'https://www.openeuler.org/en/', logo: { '@type': 'ImageObject', url: 'https://www.openeuler.org/favicon.ico' } },
};

/**
 * 为 news 文章页基于 frontmatter 生成 TDK 与 JSON-LD（无需 .geo 静态文件）。
 * 直接写入 pageData：title / description / keywords meta 与 application/ld+json 脚本。
 *
 * @param pageData  VitePress transformPageData 传入的页面对象
 * @param filePath  pageData.filePath（相对 app/，如 zh/news/.../x.md）
 * @param lookupKey 与 config.ts 一致的路径键（encodeURI 后，去 index.md / .md）
 * @param hostname  生产域名（currentHostname），用于拼接 URL
 */
export const setNewsGeo = (
  pageData: PageData,
  filePath: string,
  lookupKey: string,
  hostname: string,
) => {
  const locale = filePath.startsWith('en') ? 'en' : 'zh';
  pageData.titleTemplate = `:title | ${locale === 'zh' ? 'openEuler社区官网' : 'openEuler'}`;

  const fm = pageData.frontmatter;
  const head = (pageData.frontmatter.head ??= []);

  const title = String(fm?.title ?? '').trim();
  const description = String(fm?.summary ?? fm?.description ?? '').trim();
  const rawTags = Array.isArray(fm?.tags) ? fm.tags : (fm?.tags ? [fm.tags] : []);
  const keywords = [...new Set(rawTags.map((s) => String(s).trim()).filter(Boolean))].join(', ');

  if (title) pageData.title = title;
  if (description) pageData.description = description;
  if (keywords) {
    const idx = head.findIndex((item: HeadConfig) => item[1]?.name === 'keywords');
    const kw: HeadConfig = ['meta', { name: 'keywords', content: keywords }];
    if (idx !== -1) head.splice(idx, 1, kw);
    else head.push(kw);
  }

  const isIndex = filePath.endsWith('index.md');
  const url = isIndex ? `${hostname}/${lookupKey}` : `${hostname}/${lookupKey}.html`;
  const datePublished = fm?.date ? String(fm.date).trim() : '';
  const rawAuthors = Array.isArray(fm?.author) ? fm.author : (fm?.author ? [fm.author] : []);
  const authors = rawAuthors
    .map((a) => String(a).trim())
    .filter(Boolean)
    .map((name) => ({ '@type': 'Person', name }));

  const article: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    ...(description ? { description } : {}),
    url,
    ...(datePublished ? { datePublished } : {}),
    inLanguage: newsLang[locale] ?? 'zh-CN',
    ...(authors.length ? { author: authors } : {}),
    publisher: newsPublisher[locale] ?? newsPublisher.zh,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };
  if (fm?.banner) {
    const b = String(fm.banner).trim();
    article.image = b.startsWith('http') ? b : `${hostname}/${b.replace(/^\/+/, '')}`;
  }
  const breadcrumb: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'en' ? 'openEuler' : 'openEuler社区', item: `${hostname}/${locale}/` },
      { '@type': 'ListItem', position: 2, name: locale === 'en' ? 'News' : '新闻', item: `${hostname}/${locale}/interaction/news-list/` },
      ...(title ? [{ '@type': 'ListItem', position: 3, name: title, item: url }] : []),
    ],
  };
  head.push(['script', { type: 'application/ld+json' }, JSON.stringify([article, breadcrumb])]);
};
