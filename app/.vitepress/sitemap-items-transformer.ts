import { Awaitable } from "vitepress";

/**
 * steps：函数，或者一个对象
 * 
 * ```js
 * {
 *   'zh/': {
 *     priority: 1
 *   },
 *   '^zh/blog/.*': { // 以^开头的键将被解析为正则表达式来匹配url
 *     priority: 0.5
 *   }
 * }
 * ```
 */
export default function sitemapItemTransformer(...steps: (Record<string, any> | ((sitemapItems: any[]) => Awaitable<any[]>))[]) {
  return async (items: any[]) => {
    if (!Array.isArray(steps)) return items;
    let res = items;
    for (const step of steps) {
      if (typeof step === 'function') {
        res = await step(res);
      } else if (typeof step === 'object') {
        const regexRules = Object.entries(step)
          .filter(([key]) => key.startsWith('^'))
          .map(entry => [new RegExp(entry[0]), entry[1]]);
        res = res.map(item => {
          for (const rule of regexRules) {
            if (rule[0].test(item.url)) {
              return {
                ...item,
                ...rule[1],
                ...step[item.url]
              };
            }
          }
          return {
            ...item,
            ...step[item.url]
          };
        });
      }
    }
    return res;
  };
}
