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
