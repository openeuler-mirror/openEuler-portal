import { readFileSync, writeFileSync, existsSync } from 'fs';
import { glob } from 'glob';
import { join } from 'path';

const OPENEULER_ORG_URL = 'https://www.openeuler.org';
const OPENEULER_ATOM_URL = 'https://www.openeuler.openatom.cn';

export default function replaceUrlPlugin() {
  let envVar;
  let sourceUrl;

  return {
    name: 'replace-url',
    enforce: 'post',

    configResolved(resolvedConfig) {
      envVar = resolvedConfig.env.VITE_MAIN_DOMAIN_URL;

      if (!envVar) {
        console.error(
          '[replaceUrlPlugin] 未设置 VITE_MAIN_DOMAIN_URL 环境变量'
        );
        return;
      }

      if (envVar === OPENEULER_ATOM_URL) {
        sourceUrl = OPENEULER_ORG_URL;
      } else if (envVar === OPENEULER_ORG_URL) {
        sourceUrl = OPENEULER_ATOM_URL;
      } else {
        console.warn(
          `[replaceUrlPlugin] 未知的 VITE_MAIN_DOMAIN_URL 值: ${envVar}，不执行替换`
        );
        sourceUrl = null;
      }
    },

    transform(code, id) {
      const SUPPORTED_FILE_TYPES = /\.(html|md|vue|js|ts|jsx|tsx)$/;

      if (
        sourceUrl &&
        SUPPORTED_FILE_TYPES.test(id) &&
        !id.includes('node_modules')
      ) {
        const regex = new RegExp(sourceUrl, 'g');
        return code.replace(regex, envVar);
      }

      return code;
    },

    async writeBundle() {
      if (!sourceUrl) {
        return;
      }

      const DIRS_TO_PROCESS = [
        join(process.cwd(), 'app/.vitepress/dist/file/zh/privacy'),
        join(process.cwd(), 'app/.vitepress/dist/file/zh/legal'),
      ];

      await Promise.all(
        DIRS_TO_PROCESS.map(async (dir) => {
          if (!existsSync(dir)) {
            console.error(`[replaceUrlPlugin] 目录不存在: ${dir}`);
            return;
          }

          const files = await glob(`${dir}/**/*.{md,markdown}`, {
            ignore: [],
            nodir: true,
            absolute: true,
          });

          if (files.length === 0) {
            console.warn(`[replaceUrlPlugin] 目录 ${dir} 中无匹配文件`);
            return;
          }

          files.forEach((file) => {
            try {
              const content = readFileSync(file, 'utf8');
              const regex = new RegExp(sourceUrl, 'g');
              const newContent = content.replace(regex, envVar);

              if (newContent !== content) {
                writeFileSync(file, newContent);
                console.log(`[replaceUrlPlugin] 替换文件: ${file}`);
              }
            } catch (err) {
              console.error(
                `[replaceUrlPlugin] 处理文件 ${file} 失败: ${err.message}`
              );
            }
          });
        })
      );
    },
  };
}
