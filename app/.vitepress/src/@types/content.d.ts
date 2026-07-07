// `#content/<domain>` 虚拟模块由 vite-plugin-content-yaml 合成,每新增 domain 在 `src-new/@types/content/<第一层>.d.ts` 声明。
// home 声明已移至 `src-new/@types/content/home.d.ts`。

declare module '#content/organization' {
  import type { OrgRawT } from '@/@types/type-organization';
  const data: Record<string, OrgRawT>;
  export default data;
}

declare module '#content/activity' {
  interface EventItemT {
    id: number;
    title_zh: string;
    title_en: string;
    start_date: string;
    end_date: string;
    address_zh?: string;
    address_en?: string;
    city_zh?: string;
    city_en?: string;
    synopsis_zh?: string;
    synopsis_en?: string;
    status: 'ended' | 'ongoing';
    format: 'offline' | 'online' | 'hybrid';
    series: string;
    group_name?: string;
    poster_image?: string;
    poster_image_mb?: string;
    agenda_image?: string;
    signup_url?: string;
    signup_url_mb?: string;
    review_url?: string;
  }

  interface SummitItemT {
    id: string;
    title_zh: string;
    title_en: string;
    start_date?: string;
    end_date?: string;
    address_zh?: string;
    address_en?: string;
    format?: 'offline' | 'online' | 'hybrid';
  }

  interface PlanEventT {
    name_zh: string;
    name_en: string;
    location_zh?: string;
    location_en?: string;
    month?: number;
    start_month?: number;
    duration?: number;
    link?: string;
    deadline?: string;
  }

  interface PlanCategoryT {
    id: string;
    title_zh: string;
    title_en: string;
    icon: string;
    desc_zh?: string;
    desc_en?: string;
    email?: string;
    events: PlanEventT[];
  }

  interface GlobalEventVideoT {
    platform: string;
    url: string;
  }

  interface GlobalEventItemT {
    title_en: string;
    date: string;
    location_en: string;
    cover: string;
    videos: GlobalEventVideoT[];
  }

  const data: {
    events: EventItemT[];
    summit: SummitItemT[];
    plan: PlanCategoryT[];
    global_events: GlobalEventItemT[];
  };
  export default data;
}
