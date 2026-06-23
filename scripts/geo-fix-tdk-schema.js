/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2012-2026. All rights reserved. 
 */
import { spawn } from 'node:child_process';
import pLimit from 'p-limit';
import * as process from 'node:process';
import { availableParallelism } from 'node:os';
import { createInterface } from 'node:readline';
import { Readable } from 'node:stream';
/* 
要尝试修复的链接：--urls=url1,url2,...
类型：--type=tdk/jsonld...
*/
function parseArgs(argv) {
  const out = { _: [] };
  for (const a of argv) {
    if (a.startsWith('--')) {
      const [k, v] = a.replace(/^--/, '').split('=');
      out[k] = v ?? true;
    } else {
      out._.push(a);
    }
  }
  return out;
}

async function* toLineIterator(readable, prefix) {
  const rl = createInterface({
    input: readable,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    yield prefix + line;
  }
}

const args = parseArgs(process.argv.slice(2));
const urls = args.urls.split(',').map(url => url.trim());
const { type } = args;
const limit = pLimit(availableParallelism());

const tasks = urls
  .map(url => {
    const shortPath = new URL(url).pathname.replace(/(?:\/index)?\.html/, '');

    const prompts = {
      tdk: `1. 生成: 用 \`meta-tags-optimizer\` skill 来为这个HTML内容生成TDK: ${url}, **确保TDK信息完全由页面内容得来，不要创造任何不存在于页面内容中的信息**，且将生成的TDK保存到 **.geo/tdks${shortPath}/index.json** 文件中，除此之外不要输出其他信息。2. 检查: 生成完成之后，启动一个subagent，单独对生成的内容做检查，subagent的工作是：**确保TDK的信息完全由页面内容得来，不要出现任何不存在于页面内容中的信息**，例如该项目名为openEuler，TDK中不要出现openGauss等其他社区名称，**除非与页面内容相关**，如果有问题，把问题和修改建议输出。3. 复盘检查结果: 根据subagent输出的问题结果来优化刚才生成的内容，注意**只修改 \`.geo/\` 下配置的json文件**，如果涉及到其他地方文件的修改，不要应用，且**严格依据你读到的修改建议来应用，不要有自我发挥**，没问题就不用改`,
      jsonld: `1. 生成: 用 \`schema-markup-generator\` skill 来为这个HTML内容生成JSON-LD: ${url}, **确保JSON-LD信息完全由页面内容得来，不要创造任何不存在于页面内容中的信息**，且将生成的JSON-LD保存到 **.geo/jsonld${shortPath}/index.json** 文件中，除此之外不要输出其他信息。2. 检查: 生成完成之后，启动一个subagent，单独对生成的内容做检查，subagent的工作是：**确保JSON-LD的信息完全由页面内容得来，不要出现任何不存在于页面内容中的信息**，例如该项目名为openEuler，JSON-LD中不要出现openGauss等其他社区名称，**除非与页面内容相关**，如果有问题，把问题和修改建议输出。3. 复盘检查结果: 根据subagent输出的问题结果来优化刚才生成的内容，注意**只修改 \`.geo/\` 下配置的json文件**，如果涉及到其他地方文件的修改，不要应用，且**严格依据你读到的修改建议来应用，不要有自我发挥**，没问题就不用改`,
    };

    return {
      prompt: prompts[type],
      url,
      shortPath,
    };
  })
  .map(({ prompt, shortPath }) => limit(() => new Promise((resolve) => {
    process.stdout.write(`${shortPath} start\n`);

    const cp = spawn('opencode', ['run', '--thinking', `"${prompt}"`], { stdio: ['ignore', 'pipe', 'ignore'], cwd: process.cwd() });

    Readable.from(toLineIterator(cp.stdout, `[Agent ${shortPath}]`)).pipe(process.stdout, { end: false }),

    cp.on('error', (err) => {
      process.stderr.write(`${err}, ${shortPath}\n`);
      resolve();
    });

    cp.on('close', (code) => {
      if (code === 0) {
        process.stdout.write(`${shortPath} done\n`);
      } else {
        process.stderr.write(`${shortPath} Process exited with code ${code}`);
      }
      resolve();
    });
  })));

Promise.all(tasks).then(() => process.stdout.write('done\n'));
