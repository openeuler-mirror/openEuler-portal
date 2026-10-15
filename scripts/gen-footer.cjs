// 构建时脚本（shared-data-json）：从 .content/footer/{zh,en}.yaml
// 生成 app/.vitepress/public/footer/{zh,en}.json，供姊妹项目（文档中心等）跨项目拉取。
// 标记规范：
//   __ENV:VAR__      环境变量哨兵，从 app/.env.production（+ 本地 app/.env 覆盖）取值，可嵌在字符串中
//   ./images/x.png   图片路径，改写为 {官网域名}/footer/images/x.png 完整 URL（图片拷贝到 public/footer/images/）
// copyright 中的 {year} 为运行时年份占位符，保留原样由消费方替换。
// 标记解析不了时保留原样并打警告，绝不生成残缺 JSON。
const fs = require('fs');
const path = require('path');

const DATA_TYPE = 'footer';
const repoRoot = path.resolve(__dirname, '..');
const contentDir = path.join(repoRoot, '.content');
const publicDir = path.join(repoRoot, 'app/.vitepress/public');

// yaml 库解析：优先根 node_modules（pnpm 公共 hoist），fallback 到 .pnpm store
function resolveYaml() {
  try {
    // eslint-disable-next-line import/no-unresolved
    return require('yaml');
  } catch (e) {
    const storeDir = path.join(repoRoot, 'node_modules/.pnpm');
    const dir = fs.readdirSync(storeDir).find((d) => /^yaml@\d/.test(d));
    if (dir) return require(path.join(storeDir, dir, 'node_modules/yaml'));
    throw e;
  }
}
const yaml = resolveYaml();

// ---- 读 .env：.env 为本地基础（gitignore，可缺省），.env.production 为部署基线（进版本控制，后读覆盖）----
function loadEnv() {
  const env = {};
  const tryRead = (file) => {
    if (!fs.existsSync(file)) return;
    for (const line of fs.readFileSync(file, 'utf-8').split(/\r?\n/)) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
      if (m && !m[1].startsWith('#')) {
        env[m[1]] = m[2].replace(/^['"]|['"]$/g, '').trim();
      }
    }
  };
  tryRead(path.join(repoRoot, 'app/.env'));
  tryRead(path.join(repoRoot, 'app/.env.production'));
  return env;
}
const env = loadEnv();
// 官网站点基址（.env.production 的 VITE_MAIN_DOMAIN_URL），用于把图片路径烙成完整 URL 供姊妹项目直接使用；
// 为空时退化为站内绝对路径 /footer/images/xxx（与旧行为一致）
const PORTAL_BASE = (env.VITE_MAIN_DOMAIN_URL || '').replace(/\/+$/, '');

// ---- 递归解析标记 ----
function resolveMarkers(obj, locale) {
  if (Array.isArray(obj)) return obj.map((v) => resolveMarkers(v, locale));
  if (obj && typeof obj === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = resolveMarkers(v, locale);
    }
    return out;
  }
  if (typeof obj === 'string') {
    // __ENV:VAR__ 可嵌在字符串中（如 __ENV:VAR__/zh），解析不了保留原样 + 警告
    let s = obj.replace(/__ENV:([\w]+)__/g, (orig, k) => {
      if (env[k] == null) {
        console.warn(
          `⚠️  unresolved ${orig} in ${DATA_TYPE}/${locale}.yaml — kept as-is`
        );
        return orig;
      }
      return env[k];
    });
    // 残留旧写法 __XXX__（无冒号前缀）→ 警告保留（如 __VITE_XXX__，应迁移为 __ENV:VITE_XXX__）
    const legacy = s.match(/__[A-Z][A-Z0-9_]*__/g);
    if (legacy) {
      console.warn(
        `⚠️  legacy marker ${legacy.join(',')} in ${DATA_TYPE}/${locale}.yaml — kept as-is`
      );
    }
    // 图片 ./images/xxx → {官网域名}/footer/images/xxx（拷贝到 public/footer/images/）
    return s.replace(/\.\/images\//g, `${PORTAL_BASE}/${DATA_TYPE}/images/`);
  }
  return obj;
}

// ---- 拷贝图片到 public/footer/images/ ----
const imgSrc = path.join(contentDir, DATA_TYPE, 'images');
const imgDest = path.join(publicDir, DATA_TYPE, 'images');
if (fs.existsSync(imgSrc)) {
  fs.mkdirSync(imgDest, { recursive: true });
  for (const f of fs.readdirSync(imgSrc)) {
    fs.copyFileSync(path.join(imgSrc, f), path.join(imgDest, f));
  }
  console.log(
    `🖼  copied ${fs.readdirSync(imgDest).length} images to app/.vitepress/public/${DATA_TYPE}/images/`
  );
}

// ---- 遍历 locale 写出 JSON ----
for (const locale of ['zh', 'en']) {
  const data = yaml.parse(
    fs.readFileSync(path.join(contentDir, DATA_TYPE, `${locale}.yaml`), 'utf-8')
  );
  const resolved = resolveMarkers(data, locale);
  const outFile = path.join(publicDir, DATA_TYPE, `${locale}.json`);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(resolved, null, 2));
  console.log(`✅ ${path.relative(repoRoot, outFile)}`);
}
console.log('ℹ️  copyright 中 {year} 为运行时年份占位符，由消费方替换');
