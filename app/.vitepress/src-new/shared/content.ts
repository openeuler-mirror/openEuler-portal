// `.content/**/*.yaml` 中多语言字段用 `_zh` / `_en` 后缀。
// foldI18n 将当前语言的后缀字段提升为无后缀基线字段，移除另一语言的字段。
// 兼容旧格式（基线无后缀 + `_en` 变体）。
//
// 例：{ title_zh: '标题', title_en: 'Title' }
//   zh → { title: '标题' }
//   en → { title: 'Title' }

export type Lang = 'zh' | 'en';

const I18N_SUFFIX = { zh: '_zh', en: '_en' } as const;

export function foldI18n<T>(data: T, lang: Lang): T {
  if (Array.isArray(data)) {
    return data.map((item) => foldI18n(item, lang)) as unknown as T;
  }
  if (!isPlainObject(data)) return data;

  const curSuffix = I18N_SUFFIX[lang];
  const otherSuffix = I18N_SUFFIX[lang === 'zh' ? 'en' : 'zh'];
  const out: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (key.endsWith(otherSuffix)) continue;
    if (key.endsWith(curSuffix)) {
      out[key.slice(0, -3)] = foldI18n(value, lang);
    } else {
      out[key] = foldI18n(value, lang);
    }
  }
  return out as T;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
