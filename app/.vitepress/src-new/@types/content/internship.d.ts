declare module '#content/internship' {
  interface InternshipPartnerT {
    name: string;
    logo_light: string;
    logo_dark: string;
  }
  const data: {
    zh: { partners: InternshipPartnerT[] };
    en?: { partners: InternshipPartnerT[] };
  };
  export default data;
}
