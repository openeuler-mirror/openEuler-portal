import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { readEnvVar } from './utils.mjs';
import { createReadStream, readFileSync, writeFileSync } from "node:fs";
import { pipeline } from "node:stream/promises";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const domain = readEnvVar('VITE_MAIN_DOMAIN_URL');
  if (!domain) {
    return;
  }

  let hostname;
  try {
    hostname = new URL(domain).hostname;
  } catch (error) {
    console.log(`parse VITE_MAIN_DOMAIN_URL(${domain}) failed`)
    return;
  }
  if (hostname === 'www.openeuler.org') {
    return;
  }

  const originalFile = join(__dirname, '../jsonld', 'general.ts');

  const oldContent = readFileSync(originalFile, 'utf-8');
  const regex = /www\.openeuler\.org/g;
  writeFileSync(originalFile, oldContent.replace(regex, hostname));
}

main();
