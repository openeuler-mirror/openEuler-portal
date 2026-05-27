// `.content/**/*.yaml` 中以 `_en` 结尾的字段是基线字段的英文变体。
// foldI18n 在 'en' 模式下用 `_en` 覆盖基线,两种模式下都移除 `_en` 兄弟。

export type Lang = 'zh' | 'en';

export function foldI18n<T>(data: T, lang: Lang): T {
  if (Array.isArray(data)) {
    return data.map((item) => foldI18n(item, lang)) as unknown as T;
  }
  if (!isPlainObject(data)) return data;

  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (key.endsWith('_en')) continue;
    out[key] = foldI18n(value, lang);
  }
  if (lang === 'en') {
    for (const [key, value] of Object.entries(data)) {
      if (!key.endsWith('_en')) continue;
      out[key.slice(0, -3)] = foldI18n(value, lang);
    }
  }
  return out as T;
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
