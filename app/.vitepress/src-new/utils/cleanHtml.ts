/**
 * Word 导出 HTML 的清洗工具
 *
 * 本模块原样搬迁自 HtmlViewer.vue 的运行时清洗逻辑，
 * 改为构建时由 vite-plugin-public-raw 调用，运行时零成本。
 * 修改清洗逻辑时务必同步对照历史效果，避免行为漂移。
 */

/**
 * TOC 锚点数据结构
 * h2 为一级，h3 为二级（children）
 */
export interface TocItem {
  id: string;
  text: string;
  children?: TocItem[];
}

/**
 * XSS 消毒：删除 Word HTML 中的危险元素和属性
 * - script/iframe/object/embed 标签直接删除
 * - on* 事件属性（onclick/onerror 等）删除
 * - javascript: 协议的 href/src 删除
 * 注意：内容来源是项目 public 目录（可信），此处为防御性兜底
 */
function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object\b[^>]*>[\s\S]*?<\/object>/gi, '')
    .replace(/<embed\b[^>]*\/?>/gi, '')
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(['"])javascript:[^'"]*\2/gi, '');
}

/**
 * 删除 Word 导出的噪音标签
 * - HTML 注释（含 IE downlevel-hidden 条件注释 <!--[if gte mso 9]>）
 * - IE downlevel-revealed 条件注释标记 <![if !supportLists]> / <![endif]>
 *   （Word 自动编号列表用，标准注释正则 /<!--...--> 无法匹配，必须单独处理）
 * - <xml> VML 数据块
 * - <o:>/<v:>/<w:>/<m:> 命名空间标签
 * 这些对浏览器渲染无意义，删后降低信噪比
 */
function stripNoise(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<!\[if[^\]]*\]>/gi, '')
    .replace(/<!\[endif\]>/gi, '')
    .replace(/<xml\b[^>]*>[\s\S]*?<\/xml>/gi, '')
    .replace(/<\/?[ovwm]:[^>]*\/?>/gi, '');
}

/**
 * 需要从内联 style 属性中清理的 Word 噪音 CSS 属性
 * - font-size：由 viewer :deep(p) 用 text1 mixin 统一控制，否则 Word 的 10.5pt/9pt 覆盖 viewer
 * - line-height：Word 段落行高（150%/173%/12pt/240% 等）五花八门，覆盖 viewer 统一行高，导致段内行间距不一致，必须清理后由 viewer 统一控制
 * - mso-*：Word 私有属性，浏览器忽略，约占 body 体积 37%
 * - margin-left/margin-right：Word 列表编号的悬挂缩进（如 margin-left:28pt），导致标题/表格偏移
 * - text-indent：同上，Word 的负 text-indent 导致内容超出左侧
 * - background/background-color：Word 给段落设的白底，在深色主题下突兀
 * - layout-grid-mode/text-justify/panose-1：Word 私有排版属性，浏览器忽略
 * - font-weight：Word 给序号 span 设 font-weight:normal 阻止加粗，
 *   清理后由 <b> 标签（Word 用 <b> 表示加粗）和 viewer CSS 统一控制
 * 注意：font-family 不在本正则中，由 stripInlineStyles 单独处理——正文字体（等线/宋体等）删除，
 * 但 Wingdings/Webdings 等符号字体必须保留（Word 用 Wingdings 的 "l" 字符渲染项目符号圆点，误删会退化为字母 "l"）
 */
const INLINE_NOISE_RE =
  /\s*(?:font-size|font-weight|line-height|mso-[\w-]+|layout-grid-mode|text-justify|panose-1|margin(?:-top|-bottom|-left|-right)?|background(?:-color)?|text-indent|color)\s*:\s*[^;]+;?\s*/gi;

/**
 * 符号字体白名单：清理 font-family 时豁免这些字体（渲染项目符号/圆点等图形字符）
 */
const SYMBOL_FONT_RE = /wingdings|webdings|symbol/i;

/**
 * 清理所有内联 style 属性中的 Word 噪音声明
 * 用 [\s\S]*? 非贪婪匹配（而非 [^'"]*），因为 Word 的 style 值中
 * 常含单引号（如 font-family:'Times New Roman'），[^'"]* 会在单引号处提前终止
 * 清理后 style 为空则整个 style 属性也移除
 */
function stripInlineStyles(html: string): string {
  return html.replace(
    /\bstyle\s*=\s*(['"])([\s\S]*?)\1/gi,
    (_m, quote: string, style: string) => {
      const cleaned = style
        .replace(INLINE_NOISE_RE, ' ')
        .replace(/\s*font-family\s*:\s*([^;]+);?\s*/gi, (fm, val: string) =>
          SYMBOL_FONT_RE.test(val) ? fm : ' '
        )
        .trim();
      return cleaned ? `style=${quote}${cleaned}${quote}` : '';
    }
  );
}

/**
 * 给"序号 + 紧跟加粗文本"模式中的序号补加粗
 *
 * Word 自动编号列表导出时，序号（如 "1."）放在独立 <span> 中通常不加粗，
 * 而紧跟其后的正文文本被 <b> 包裹加粗，导致序号与文本视觉不一致（序号细、文本粗）。
 *
 * 检测模式：<span>...<span>序号</span>...</span><b>非空文本</b>
 *   - 序号格式：阿拉伯数字 + 句点/右括号（如 1. / 2. / 10. / 1) / 2)），兼容中英文标点
 *   - 序号外层 span 嵌套层级不限（Word 常见 2 层，也可能 1 层或 3 层）
 *   - 仅当紧跟的 <b> 内含非空文本时才处理，避免误伤 <b></b> 空壳
 *
 * 处理方式：给序号 span 外层补一层 <b> 包裹，使序号与文本同为粗体。
 * 必须在 stripNoise（删 IE 条件注释）、stripInlineStyles（清 font-weight:normal）、
 * stripWingdingsNbsp（删 <span>&nbsp;</span> 空壳）之后执行，
 * 此时序号 span 与 <b> 紧邻暴露，且内部无噪音嵌套，正则可稳定匹配。
 *
 * 示例：
 *   in:  <span><span>1.</span></span><b><span>Device Mgmt：...</span></b>
 *   out: <b><span><span>1.</span></span></b><b><span>Device Mgmt：...</span></b>
 */
function boldOrdinals(html: string): string {
  return html.replace(
    /((?:<span\b[^>]*>)+\s*\d+[.）)]\s*(?:<\/span>)+)(\s*)(<b\b[^>]*>[\s\S]*?<\/b>)/gi,
    (m, spanBlock: string, ws: string, bBlock: string) => {
      const text = bBlock.replace(/<[^>]*>/g, '').trim();
      if (!text) return m;
      return `<b>${spanBlock}</b>${ws}${bBlock}`;
    }
  );
}

/**
 * 解包标题内部的 Word 嵌套标签
 * Word 导出的 h1-h6 内部嵌套了 <b><span><font> 控制加粗/字体/字号
 * 删除这些标签只保留纯文本，因为：
 * - 加粗由 viewer :deep(h1-h6) { font-weight: bold } 控制
 * - 字体由 viewer :deep(h1-h6) { font-family: ... } 控制
 * 同时删除 h1-h6 标签本身的 style/class 等属性（如内联 margin-left:28pt）
 */
function unwrapHeadings(html: string): string {
  return html.replace(
    /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
    (_m, level: string, inner: string) =>
      `<h${level}>` +
      inner.replace(/<\/?(?:b|span|font)\b[^>]*>/gi, '') +
      `</h${level}>`
  );
}

/**
 * 删除全文 <font> 标签（保留内容）
 * Word 用 <font face="等线"> 控制字体，face 是 HTML 属性不被 inline style 清理覆盖
 * 不同字体的内联度量（ascent/descent）不同，导致 <font> 内文本与标签外纯文本行高不一致
 * 删掉 font 标签后，文字字体统一由 .viewer-body 的 font-family 控制
 */
function unwrapFontTags(html: string): string {
  return html.replace(/<\/?font\b[^>]*>/gi, '');
}

/**
 * 删除 Wingdings 字体 span 内多余的 &nbsp; 圆点
 * Word 用 Wingdings 字体的 "l" 字符渲染项目符号圆点
 * 但 &nbsp; 在 Wingdings 字体下也会渲染成圆点，导致出现两个圆点
 * - 第一步：删除 <span>&nbsp;</span> 空壳（主要来源，约 210 个）
 * - 第二步：while 循环处理 Wingdings span 内残留的 &nbsp;（嵌套 span 需多次迭代）
 */
function stripWingdingsNbsp(html: string): string {
  let result = html.replace(/<span\b[^>]*>&nbsp;<\/span>/gi, '');
  let prev = '';
  while (prev !== result) {
    prev = result;
    result = result.replace(
      /(<span\b[^>]*style\s*=\s*['"][^'"]*Wingdings[^'"]*['"][^>]*>)([\s\S]*?)(<\/span>)/gi,
      (_m, open: string, inner: string, close: string) =>
        open + inner.replace(/&nbsp;/gi, '') + close
    );
  }
  return result;
}

/**
 * 给所有有 href 的 <a> 标签添加 target="_blank" rel="noopener noreferrer"
 * - 无 href 的锚点 <a name="..."> 不处理
 * - 已有 target 的不重复添加
 * rel="noopener noreferrer" 防反向 tabnabbing
 */
function addTargetBlank(html: string): string {
  return html.replace(
    /<a\b([^>]*?)(\/?)>/gi,
    (_m, attrs: string, slash: string) => {
      if (!/\bhref\s*=/i.test(attrs)) return `<a${attrs}${slash}>`;
      if (/\btarget\s*=/i.test(attrs)) return `<a${attrs}${slash}>`;
      return `<a${attrs} target="_blank" rel="noopener noreferrer"${slash}>`;
    }
  );
}

/**
 * 生成 URL 安全的 slug（保留中文），处理重复追加 -1/-2
 */
function makeSlug(text: string, used: Set<string>): string {
  let slug = text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) slug = 'section';
  let unique = slug;
  let i = 1;
  while (used.has(unique)) unique = `${slug}-${i++}`;
  used.add(unique);
  return unique;
}

/**
 * 给每个 <table> 包裹一层 <div class="table-wrap">
 * 让宽表格在移动端可水平滚动（配合 .viewer-body :deep(.table-wrap) { overflow-x: auto }）
 * HTML 规范中 table 不会嵌套，非贪婪匹配到最近的 </table> 即可
 */
function wrapTables(html: string): string {
  return html.replace(
    /<table\b[^>]*>[\s\S]*?<\/table>/gi,
    (m) => `<div class="table-wrap">${m}</div>`
  );
}

/**
 * 给 h2/h3 添加 id 属性（供锚点跳转），并构建二级 TOC 树
 * 1. 正则匹配 h2/h3，生成 slug id
 * 2. 按文档顺序遍历，h2 为顶级，h3 归入最近的 h2 的 children
 */
function addTocIds(html: string): { html: string; toc: TocItem[] } {
  const used = new Set<string>();
  const withIds = html.replace(
    /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
    (m, level: string, inner: string) => {
      const text = inner.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, '').trim();
      if (!text) return m;
      const slug = makeSlug(text, used);
      return `<h${level} id="${slug}">${inner}</h${level}>`;
    }
  );

  const toc: TocItem[] = [];
  let currentH2: TocItem | null = null;
  const re = /<h([23])\b[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h\1>/gi;
  let m;
  while ((m = re.exec(withIds)) !== null) {
    const level = parseInt(m[1]);
    const id = m[2];
    const text = m[3].replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, '').trim();
    if (level === 2) {
      currentH2 = { id, text, children: [] };
      toc.push(currentH2);
    } else if (currentH2) {
      currentH2.children!.push({ id, text });
    } else {
      toc.push({ id, text });
    }
  }
  return { html: withIds, toc };
}

/**
 * Word HTML 完整处理链（按执行顺序）：
 * 1. stripNoise         — 删注释、VML、XML、IE 条件注释噪音标签
 * 2. stripInlineStyles  — 清理内联 style 中的 font-size、font-weight、font-family、line-height、mso-、margin、text-indent 等
 * 3. sanitizeHtml       — XSS 消毒（删 script、on 事件、javascript 协议）
 * 4. unwrapHeadings     — 标题解包（删 h1-h6 内的 b、span、font + 标签属性）
 * 5. unwrapFontTags     — 删全文 <font> 标签（消除 face 属性导致的字体/行高差异）
 * 6. addTargetBlank     — 链接新页签（target=_blank rel=noopener noreferrer）
 * 7. stripWingdingsNbsp — 删 Wingdings 多余圆点 + <span>&nbsp;</span> 空壳
 * 8. boldOrdinals       — 给"序号 span 紧跟 <b> 加粗文本"的序号补 <b> 包裹
 * 9. wrapTables         — 给 table 包裹 .table-wrap 滚动容器（移动端宽表横滚）
 * 10. addTocIds         — 给 h2、h3 加 id，构建 TOC 树
 *
 * 同时处理 style 标签：清理 font-size、font-family、line-height（由 viewer 统一控制），
 * 将 body 选择器替换为 .viewer-body（样式作用域隔离）
 */
export function parseHtml(text: string): { body: string; styleTag: string; toc: TocItem[] } {
  const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const cleaned = wrapTables(
    boldOrdinals(
      stripWingdingsNbsp(
        addTargetBlank(
          unwrapFontTags(
            unwrapHeadings(
              sanitizeHtml(
                stripInlineStyles(stripNoise(bodyMatch ? bodyMatch[1] : text))
              )
            )
          )
        )
      )
    )
  );
  const { html, toc } = addTocIds(cleaned);
  const styleParts: string[] = [];
  for (const m of text.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    const css = m[1]
      .replace(/\s*(?:font-size|line-height|margin(?:-top|-bottom|-left|-right)?)\s*:\s*[^;]+;?\s*/gi, ' ')
      .replace(/\s*font-family\s*:\s*([^;]+);?\s*/gi, (fm, val: string) =>
        SYMBOL_FONT_RE.test(val) ? fm : ' '
      )
      .replace(/\bbody\b/g, '.viewer-body');
    styleParts.push(css);
  }
  // .MsoHeading7/.MsoHeading8 是 Word 的标题 7/8 样式（h1-h6 之后的标题级别），
  // .MsoHeading8 的 class 定义缺 font-weight:bold，且部分段落无 <b> 包裹导致不加粗，这里统一补加粗
  const styleTag = `<style>${styleParts.join('\n')}\n.MsoHeading7,.MsoHeading8{font-weight:bold}</style>`;
  return { body: html, styleTag, toc };
}

/**
 * 重写相对资源路径为绝对路径
 * 跳过已是绝对路径、协议 URL、data URL、锚点等
 * baseUrl 应以 / 开头、以 / 结尾（如 /whitepaper/html/）
 */
export function rewriteAssets(html: string, baseUrl: string): string {
  if (!baseUrl.endsWith('/')) baseUrl += '/';
  return html.replace(
    /(src|href)\s*=\s*(["'])(?!\/|https?:|\/\/|data:|#|mailto:|tel:|javascript:)([^"']+)\2/gi,
    (_m, attr: string, quote: string, p: string) => `${attr}=${quote}${baseUrl}${p}${quote}`
  );
}

/**
 * 构建时统一入口：先重写资源路径，再走完整清洗链
 * 返回 { content, toc }，content = styleTag + body，可直接交给组件 v-html
 */
export function processHtml(
  text: string,
  baseUrl: string
): { content: string; toc: TocItem[] } {
  const { body, styleTag, toc } = parseHtml(rewriteAssets(text, baseUrl));
  return { content: styleTag + body, toc };
}
