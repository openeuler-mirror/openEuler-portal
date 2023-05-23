import Mermaid from 'mermaid';
import Murmur from 'murmurhash-js';
import type MarkdownIt from 'markdown-it';

const htmlEntities = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
const MermaidChart = (code: string) => {
  try {
    const needsUniqueId = 'render' + Murmur(code, 42).toString();
    Mermaid.mermaidAPI.render(needsUniqueId, code, (sc: string) => {
      code = sc;
    });
    return `<div class="mermaid">${code}</div>`;
  } catch (err: any) {
    return `<pre>${htmlEntities(err.name)}: ${htmlEntities(err.message)}</pre>`;
  }
};

const MermaidPlugIn = (md: MarkdownIt) => {
  Object.assign(MermaidPlugIn.default);
  const { token: _token = 'mermaid', ...dictionary } =
    MermaidPlugIn.default.dictionary;
  Mermaid.initialize(MermaidPlugIn.default);
  const defaultRenderer = md?.renderer?.rules?.fence?.bind(md.renderer.rules);

  function replacer(_: string, p1: string, p2: string, p3: string) {
    p1 = dictionary[p1 as keyof typeof dictionary] ?? p1;
    p2 = dictionary[p2 as keyof typeof dictionary] ?? p2;
    return p2 === '' ? `${p1}\n` : `${p1} ${p2}${p3}`;
  }

  md.renderer.rules.fence = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    const code = token.content.trim();
    if (token.info.trim() === _token) {
      return MermaidChart(code.replace(/(.*?)[ \n](.*?)([ \n])/, replacer));
    }
    if (!defaultRenderer) return '';
    return defaultRenderer(tokens, idx, opts, env, self);
  };
};

MermaidPlugIn.default = {
  startOnLoad: false,
  securityLevel: 'true',
  theme: 'default',
  flowchart: {
    htmlLabels: false,
    useMaxWidth: true,
  },
  dictionary: {
    token: 'mermaid',
  },
};

export default MermaidPlugIn;
