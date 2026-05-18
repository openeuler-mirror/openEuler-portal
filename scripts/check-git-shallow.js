/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2012. All rights reserved. 
 */
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appDir = join(dirname(fileURLToPath(import.meta.url)), '../');

const res = execSync('git rev-parse --is-shallow-repository', { encoding: 'utf-8' })?.trim();
if (res === 'true') {
  execSync('git fetch --unshallow', { cwd: appDir, stdio: 'inherit' });
}
