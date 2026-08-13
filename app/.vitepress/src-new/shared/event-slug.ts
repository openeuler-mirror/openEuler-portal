// 活动详情路由 slug 派生
//
// 路由形如 /${locale}/interaction/event-list/${slug}，slug 由活动名（title_en）派生：
//   - openEuler Embedded Meetup Shanghai → openEuler-embedded-meetup-shanghai
//   - openEuler Cloud Native Middleware Meetup - Xi'an → openEuler-cloud-native-middleware-meetup-xian
//   - openEuler Meetup X openGauss Meetup Xi'an → openEuler-meetup-x-opengauss-meetup-xian
//
// slugify 规则：小写 + 移除撇号/&,/括号 + 空格转连字符 + 仅保留 [a-z0-9-] + 合并多余连字符
//   末步将 openeuler 还原为品牌大小写 openEuler（故先清洗非 [a-z0-9-] 再注入大写 E，避免被剥离）
//
// 同一函数在构建时（[event].paths.ts）与运行时（EventDetail.vue）共享，
// 确保 paths() 生成的 slug 与详情页查找逻辑一致。

export interface EventSlugInput {
  title_en?: string;
  title_zh?: string;
}

export function slugifyEvent(ev: EventSlugInput): string {
  const title = ev.title_en || ev.title_zh || '';
  return slugifyTitle(title);
}

export function slugifyTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[&,]/g, '')
    .replace(/[()]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/openeuler/g, 'openEuler');
}
