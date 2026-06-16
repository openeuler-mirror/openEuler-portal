export interface FilterOptionT {
  value: string;
  label_zh: string;
  label_en: string;
}

export const EVENT_SERIES: FilterOptionT[] = [
  { value: '', label_zh: '全部', label_en: 'All' },
  { value: 'summit', label_zh: '国际开源会议', label_en: 'Open Source Summits' },
  { value: 'ecology', label_zh: '生态技术会议', label_en: 'Ecosystem Tech Conferences' },
  { value: 'meetup', label_zh: 'Call for X 开发者活动', label_en: 'Call for X Developer Events' },
  { value: 'college', label_zh: '赛事 & 高校', label_en: 'Competitions & Universities' },
  { value: 'release', label_zh: '版本发布计划', label_en: 'Release Plan' },
  { value: 'other', label_zh: '其他', label_en: 'Other' },
];

export const EVENT_STATUS: FilterOptionT[] = [
  { value: '', label_zh: '全部', label_en: 'All' },
  { value: 'ongoing', label_zh: '进行中', label_en: 'Ongoing' },
  { value: 'ended', label_zh: '已结束', label_en: 'Completed' },
];
