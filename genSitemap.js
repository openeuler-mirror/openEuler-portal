const fs = require('node:fs');
const { resolve } = require('node:path');
const { execSync } = require('node:child_process');

const LOCALES = ['zh', 'en'];
const READ_OPTION = { withFileTypes: true };
const INDEX = 'index';
const MD = 'md';

/**
 * 生成sitemap和robots.txt
 * @param {string} locale 语言类型
 */
const genSitemapAndRobotsTxt = (locale) => {
  const cwd = process.cwd();
  const currentLocaleRootDir = resolve(cwd, 'app', locale);
  const otherLocaleDirInfos = LOCALES.filter((loc) => loc !== locale).map(
    (loc) => ({ locale: loc, rootDir: resolve(cwd, 'app', loc) })
  );
  const sitemapXmlPath = resolve(cwd, 'app', '.vitepress', 'public', `sitemap-${locale}.xml`);
  const robotsTxtPath = resolve(cwd, 'app', '.vitepress', 'public', 'robots.txt');

  // 不存在就创建
  if (!fs.existsSync(sitemapXmlPath)) {
    fs.closeSync(fs.openSync(sitemapXmlPath, 'w'));
  }
  let needCreateRobotsTxt = false;
  if (!fs.existsSync(robotsTxtPath)) {
    fs.closeSync(fs.openSync(robotsTxtPath, 'w'));
    needCreateRobotsTxt = true;
  }

  const writeStream = fs.createWriteStream(sitemapXmlPath);
  writeStream.write(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
  );
  let blockResolver;
  writeStream.on('drain', () => {
    if (blockResolver) {
      blockResolver();
      blockResolver = null;
    }
  });
  let count = 0;

  const readDirRecursive = async (...path) => {
    const dir = resolve(currentLocaleRootDir, ...path);
    const dirents = fs.readdirSync(dir, READ_OPTION);
    for (const dirent of dirents) {
      const fileName = dirent.name;
      if (dirent.isFile() && fileName.endsWith(MD)) {
        try {
          let pagePath;
          const withoutExtName = encodeURIComponent(fileName.slice(0, -3));
          if (withoutExtName === INDEX) {
            pagePath = path.map(encodeURIComponent).join('/') + '/';
          } else {
            pagePath = path.map(encodeURIComponent).concat(withoutExtName + '.html').join('/');
          }
          const filePath = path.concat(fileName).join('/');
          const lastModTime = execSync(
            `git log -1 --format=%cs "app/${locale}/${filePath}"`
          )
            .toString('utf8')
            .trim();
          // 生成sitemap
          const url = `https://www.openeuler.org/${locale}/${pagePath}`;
          let sitemapItem = `  <url>\n    <loc>${url}</loc>\n    <xhtml:link rel="alternate" hreflang="${locale}" href="${url}"/>\n`;
          // 标记其他语言的页面
          const otherLocalXhtmlLinks = otherLocaleDirInfos
            .filter((localeDirInfo) => {
              const filePath = resolve(
                localeDirInfo.rootDir,
                ...path,
                fileName
              );
              return fs.existsSync(filePath);
            })
            .map((localeDirInfo) => localeDirInfo.locale)
            .map(
              (otherLocale) =>
                `    <xhtml:link rel="alternate" hreflang="${otherLocale}" href="https://www.openeuler.org/${otherLocale}/${pagePath}"/>`
            )
            .join('\n');
          if (otherLocalXhtmlLinks) {
            sitemapItem += otherLocalXhtmlLinks + '\n';
          }
          sitemapItem += `    <lastmod>${lastModTime}</lastmod>\n  </url>\n`;
          const ok = writeStream.write(sitemapItem, 'utf8');
          if (!ok) {
            // 等待stream缓冲区写完
            await new Promise((res) => (blockResolver = res));
          }
          console.log('processed: ', ++count);
        } catch (error) {
          console.warn(`write failed`);
          return;
        }
        continue;
      }
      if (dirent.isDirectory()) {
        await readDirRecursive(...path, fileName);
      }
    }
  };

  readDirRecursive().then(() => {
    writeStream.end('</urlset>');
    if (needCreateRobotsTxt) {
      fs.writeFile(
        robotsTxtPath,
        'User-agent: *\nAllow: /\n\nSitemap: https://www.openeuler.org/sitemap-zh.xml\nSitemap: https://www.openeuler.org/sitemap-en.xml',
        'utf8',
        (err) => {
          if (err) {
            console.log('write robots.txt failed');
            console.warn(err);
          }
        }
      );
    }
  });
};

genSitemapAndRobotsTxt(process.argv[2] || 'zh');
