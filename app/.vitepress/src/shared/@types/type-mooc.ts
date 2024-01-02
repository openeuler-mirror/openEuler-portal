export interface TeacherItemT {
  img: string;
  position: string;
  name: string;
}
export interface NodeItemT {
  label: string;
  key: string;
  introduction?: string | never | undefined[];
  desc?: string;
  teacher: TeacherItemT[];
  ppt_link?: string;
  video_link?: string;
}
export interface VideoObjT {
  element: HTMLElement | null;
  isShow: boolean;
  barWidth: number;
}
