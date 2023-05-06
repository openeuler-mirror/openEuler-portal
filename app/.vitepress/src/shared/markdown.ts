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

export function handleMarkdown() {
  mkit.use(markdownItAnchor, {
    level: 1,
    slugify,
  });
  return mkit;
}
