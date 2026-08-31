/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2012. All rights reserved. 
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const robotsPath = join(__dirname, '../app/.vitepress/public/robots.txt');

function readEnvVar(key) {
  const envFile = join(__dirname, '../app/.env.production');
  if (!existsSync(envFile)) {
    return undefined;
  }
  const match = readFileSync(envFile, 'utf-8').match(
    new RegExp(`^${key}\\s*=\\s*(.+)$`, 'm')
  );
  return match ? match[1].trim() : undefined;
}

if (!existsSync(robotsPath)) {
  // eslint-disable-next-line
  process.exit();
}

const currentHostname = readEnvVar('VITE_MAIN_DOMAIN_URL');
if (!currentHostname || currentHostname === 'https://www.openeuler.org') {
  // eslint-disable-next-line
  process.exit();
}

const content = readFileSync(robotsPath, 'utf-8');
writeFileSync(robotsPath, content.replaceAll('https://www.openeuler.org', currentHostname));
