interface PersonT {
  id: string;
  name: string;
  post: string;
}

interface ContentItemT {
  id: string;
  time: string;
  desc: string;
  person: PersonT[];
  detail: string;
}

export interface SectionT {
  id: string;
  lable: string;
  name: string;
  content: ContentItemT[];
}

export interface ScheduleItemT {
  content_type: string;
  name: string;
  description: string;
  title: string;
  content: {
    content: SectionT[];
  };
}
// -----------------------------
// guest 数据类型

export type GuestInfoT = {
  type: string;
  name: string;
  title: string;
  titleStripe: string;
  guestClass: GuestClassT[];
  datas: StoreDataT[];
};

export type TableDataT = {
  id: string;
  name: string;
  nameVisible?: boolean;
  img: string;
  imgVisible?: boolean;
  title: string;
  titleVisible?: boolean;
};

export type GuestFormT = {
  title: string;
  titleStripe: string;
  guestClass: GuestClassT[];
};

export type GuestClassT = {
  title: string;
  isActive: boolean;
  id: string;
};

// 本地存储的数据类型
export type StoreDataT = {
  id: string;
  data: TableDataT[];
};
