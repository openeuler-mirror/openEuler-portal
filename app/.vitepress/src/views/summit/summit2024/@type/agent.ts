import { SECTIONS } from './page';

// agenda 数据类型
export type AgendaInfoT = {
  type: SECTIONS;
  name: string;
  title: string;
  titleStripe: string;
  agenda: DateDataT[];
  datas: StoreDataT[];
};

export type LocalObjectT = {
  id?: string;
};

export type SmallClassT = {
  title: string;
  isActive: boolean;
  desc?: string;
  id?: string;
};

export type BigClassT = {
  title: string;
  isActive: boolean;
  smallClass?: SmallClassT[];
  activeBigSmallId?: string; // 展示页面使用
  id?: string;
};

export type SpanDataT = {
  span: string;
  isActive: boolean;
  bigClass?: BigClassT[];
  smallClass?: SmallClassT[];
  id?: string;
};

export type DateDataT = {
  date: string;
  title: string;
  isActive: boolean;
  spans: SpanDataT[];
};

export type AgendaFormT = {
  title: string;
  titleStripe: string;
  agenda: DateDataT[];
  spans?: SpanDataT[]; // 为了form表单校验
};

export type TableDataT = {
  id: string;
  time: string;
  timeVisible: boolean;
  event: string;
  eventVisible: boolean;
  guestData: GuestDataT[];
};

export type GuestDataT = {
  id: string;
  name: string;
  title: string;
  visible: boolean;
};

// 本地存储的数据类型
export type StoreDataT = {
  id: string;
  data: TableDataT[];
};
