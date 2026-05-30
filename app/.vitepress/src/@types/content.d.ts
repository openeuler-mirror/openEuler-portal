// `#content/<domain>` 虚拟模块由 vite-plugin-content-yaml 合成,每新增 domain 在此声明一条。

declare module '#content/organization' {
  import type { OrgRawT } from '@/@types/type-organization';
  const data: Record<string, OrgRawT>;
  export default data;
}

declare module '#content/activity' {
  import type { CalendarValueT } from '~@/@type/type-home';

  interface ActivityFilterItemT {
    value: string | number;
    label: string;
    label_en: string;
  }

  interface ActivityMeetupItemT {
    id: number;
    title: string;
    date: string;
    activity_type: number;
    synopsis: string;
    address: string;
    city: string;
    isAdditional: boolean;
    posterImg: string;
    posterImgMb: string;
    series: string;
    detail_img: string;
    signup_url?: string;
    signup_url_mb?: string;
    new_url?: string;
  }

  const data: {
    calendar: CalendarValueT[];
    summit: CalendarValueT[];
    filters: {
      series: ActivityFilterItemT[];
      state: ActivityFilterItemT[];
    };
    meetups: {
      zh: ActivityMeetupItemT[];
      en: ActivityMeetupItemT[];
    };
    plan: {
      months: string[];
      year_plan: Record<string, unknown>;
    };
  };
  export default data;
}
