const fs = require('node:fs');
const { resolve } = require('node:path');
const { execSync } = require('node:child_process');

const LOCALES = ['zh', 'en'];
const READ_OPTION = { withFileTypes: true };
const APP_DIR = resolve(process.cwd(), 'app');

const main = async () => {
  let writeStream;
  let blockResolver;

  const iterate = async (localeIndex, ...dirs) => {
    const path = resolve(APP_DIR, ...dirs);
    const dirents = fs.readdirSync(path, READ_OPTION);
    for (const dirent of dirents) {
      if (dirent.isFile() && dirent.name.endsWith('.md')) {
        let pagePath = dirs.join('/');
        const lastModTime = execSync(
          `git log -1 --format=%cs "app/${pagePath}/${dirent.name}"`
        )
          .toString('utf8')
          .trim();
        const fileName = dirent.name.slice(0, -3);
        if (fileName === 'index') {
          pagePath += '/';
        } else {
          pagePath += `/${fileName}.html`;
        }
        const url = `https://www.openeuler.org/${pagePath}`
        let sitemapItem = `  <url>\n    <loc>${url}</loc>\n    <xhtml:link rel="alternate" hreflang="${LOCALES[localeIndex]}" href="${url}"/>\n`;
        // 是否存在其他语言页面
        LOCALES.forEach((locale, index) => {
          if (index === localeIndex) return;
          const file = resolve(APP_DIR, locale, ...dirs.slice(1), dirent.name);
          if (fs.existsSync(file)) {
            const currentPagePath = pagePath.slice(pagePath.indexOf('/') + 1);
            sitemapItem += `    <xhtml:link rel="alternate" hreflang="${locale}" href="https://www.openeuler.org/${locale}/${currentPagePath}"/>\n`
          }
        });
        sitemapItem += `    <lastmod>${lastModTime}</lastmod>\n  </url>\n`;
        const ok = writeStream.write(sitemapItem, 'utf8');
        if (!ok) {
          await new Promise((res) => (blockResolver = res));
        }
      } else if (dirent.isDirectory()) {
        await iterate(localeIndex, ...dirs, dirent.name);
      }
    }
  };

  for (let i = 0; i < LOCALES.length; i++) {
    const locale = LOCALES[i];
    const sitemapXmlPath = resolve(APP_DIR, '.vitepress', 'public', `sitemap-${locale}.xml`);
    writeStream = fs.createWriteStream(sitemapXmlPath);
    writeStream.write(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n  xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    );
    writeStream.on('drain', () => {
      if (blockResolver) {
        blockResolver();
        blockResolver = null;
      }
    });
    await iterate(i, locale);
    writeStream.write('</urlset>');
    writeStream.end();
    await new Promise(res => writeStream.once('finish', res));
  }
}

main();