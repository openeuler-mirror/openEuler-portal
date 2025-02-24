import type MarkdownIt from 'markdown-it';

const MermaidChart = (code: string): string => {
  // 只输出包含 mermaid 代码的容器，
  return `<div id="mermaid">${code}</div>`;
};

const MermaidPlugIn = (md: MarkdownIt) => {
  const defaultRenderer = md.renderer.rules.fence?.bind(md.renderer.rules);
  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info.trim() === 'mermaid') {
      return MermaidChart(code);
    }
    if (!defaultRenderer) return '';
    return defaultRenderer(tokens, idx, opts, env, self);
  };
};

export default MermaidPlugIn;
