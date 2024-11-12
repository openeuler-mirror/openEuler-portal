// 页面数据类型
export type PageInfoT = {
  type: string;
  page: {
    name: string;
    type: string;
    url: string;
    lang: string;
    sections: SECTIONS[];
    others?: string;
  };
  sections: SectionsInfoT[];
};

export type PageBaseInfoT = {
  name: string;
  url: string;
  lang: string;
};

export type SECTIONS =
  | 'BANNER'
  | 'INTRODUCTION'
  | 'AGENDA'
  | 'GUEST'
  | 'PARTNER'
  | 'REVIEW';

export type SectionsInfoT = {
  type: SECTIONS;
  name: string;
  title?: string;
  titleStripe?: string;
  [propName: string]: any;
};

export type RuleMessagT = {
  type: string;
  message: string;
};

export type ResponseT = {
  statusCode: number;
  message: string;
  data?: object[];
};
