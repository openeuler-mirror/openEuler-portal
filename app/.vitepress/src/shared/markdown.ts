import Markdown from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';

const mkit = new Markdown({ html: true, linkify: false });

// 去除可能导致锚点失效的 特殊符号
const slugify = (s: string) =>
  decodeURIComponent(
    String(s)
      .trim()
      .toLowerCase()
      .replace(
        /[`~!@#$%^&*()+=<>?:"{}|,/;'\\[\]·！#￥（——）：；“”‘、，|《。》？【】[\]]/g,
        ''
      )
      .replace(' ', '-')
  );
export function convertGiteePath(markdown: string) {
  const regex = /(\]\()(oEEP-[^\)]+)/g;
  const replacement = `$1/zh/oEEP/?name=$2`;
  markdown = markdown?.replace(regex, replacement);

  const mdRegex = /\(\.\/([^.]+\.md)\)/g;
  const mdReplacement = '/zh/oEEP/?name=$1';
  return markdown?.replace(mdRegex, `(${mdReplacement})`);
}

// 将 YFM转为 代码块
export function convertYFMtoCodeBlock(markdown: string) {
  const regex = /^---\s*([\s\S]*?)\s*---/; // 匹配 YFM 的正则表达式
  const match = markdown.match(regex); // 查找第一个匹配项
  if (match) {
    const yfm = match[0]; // 获取匹配到的 YFM
    const codeBlock = '```\n' + yfm.slice(4, -4).trim() + '\n```'; // 构造代码块
    return markdown.replace(yfm, codeBlock); // 替换 YFM 为代码块
  } else {
    return markdown;
  }
}
export function handleMarkdown() {
  mkit.use(markdownItAnchor, {
    level: 1,
    slugify,
  });
  return mkit;
}
