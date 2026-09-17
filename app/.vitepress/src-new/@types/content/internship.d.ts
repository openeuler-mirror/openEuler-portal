declare module '#content/internship' {
  // partners: 合作伙伴
  interface InternshipPartnerItemT {
    name: string;
    logo_light: string;
    logo_dark: string;
  }

  interface InternshipContentT {
    partners: InternshipPartnerItemT[];
  }

  const data: { zh: InternshipContentT };
  export default data;
}
