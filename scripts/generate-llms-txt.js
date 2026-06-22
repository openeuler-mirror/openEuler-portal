import { createWriteStream, existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { readFileSync } from 'node:fs';

const distDir = join(import.meta.dirname, '../app/.vitepress/dist');
const geoManifestDir = join(import.meta.dirname, '../.geo');
const skip = [/(zh|en)\/(blog|search)/];

function readEnvVar(key) {
  const envFile = resolve(import.meta.dirname, '../.env.production');
  if (!existsSync(envFile)) return undefined;
  const match = readFileSync(envFile, 'utf-8').match(
    new RegExp(`^${key}\\s*=\\s*(.+)$`, 'm')
  );
  return match ? match[1].trim() : undefined;
}

const domain = readEnvVar() || 'https://www.openeuler.org';

async function* itrHtml(dir) {
  const files = await readdir(dir, { withFileTypes: true, encoding: 'utf-8' });
  out: for (const file of files) {
    const filePath = join(dir, file.name);
    for (const sk of skip) {
      if (sk.test(filePath.replace(/\\/g, '/'))) {
        continue out;
      }
    }
    if (file.isDirectory()) {
      yield* itrHtml(filePath);
    } else if (file.isFile() && file.name.endsWith('.html')) {
      const pagePath = filePath.slice(distDir.length + 1).replace(/\\/g, '/').replace(/(\/index)?\.html$/, '');
      let title = '';
      let description = '';
      let readGeoManifestFailed = true;
      try {
        const tdkConfigPath = join(geoManifestDir, 'tdks', pagePath, 'index.json');
        if (existsSync(tdkConfigPath)) {
          const tdk = JSON.parse(await readFile(tdkConfigPath));
          if (tdk) {
            title = tdk.title;
            description = tdk.description;
          }
          readGeoManifestFailed = false;
        }
      } catch {
        readGeoManifestFailed = true;
      }
      if (readGeoManifestFailed) {
        const html = await readFile(filePath, 'utf-8');
        title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
        description = html.match(/<meta\s*name="description"\s*content="(.+)"/)?.[1] || '';
      }
      yield `- [${title}](${domain}/${pagePath}): ${description}\n`;
    }
  }
}

const writeStream = createWriteStream(join(distDir, 'llms.txt'));
writeStream.write(`# openEuler | 开源社区 | openEuler社区官网

> openEuler是一个开源、免费的 Linux 发行版平台，通过开放的形式与全球的开发者共同构建一个开放、多元和架构包容的软件生态体系。openEuler是一个创新的平台，鼓励任何人在这里提出新想法、开拓新思路、实践新方案。想要了解更多信息，欢迎访问openEuler官网。

## Table of Contents

`);

await pipeline(
  Readable.from(itrHtml(join(distDir, 'zh'))),
  writeStream,
  { end: false }
);

writeStream.write(`
## English contents

`);

await pipeline(
  Readable.from(itrHtml(join(distDir, 'en'))),
  writeStream
);
