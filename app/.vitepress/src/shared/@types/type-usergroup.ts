import { CasesRecordsT } from '@/shared/@types/type-showcase';
import type { NewsDataT } from '@/shared/@types/type-news';

export interface CityItemT {
  name: string;
  position?: string;
  technology?: string[];
  homePage?: string;
  avatar: string;
  avatarDark?: string;
  contribution?: string;
  email?: string;
}

export interface LatestActivity {
  id: number;
  date: string;
  posterIm?: string;
  title: string;
  synopsis?: string;
  address?: string;
  windowOpen?: string;
  [propName: string]: any;
}

export interface PageDataT {
  title: string;
  organizational: string;
  organizer: Array<CityItemT>;
  ambassador: Array<CityItemT>;
  member: Array<CityItemT>;
  salon?: Array<LatestActivity>;
  news?: Array<NewsDataT>;
  showcase?: Array<CasesRecordsT>;
}
