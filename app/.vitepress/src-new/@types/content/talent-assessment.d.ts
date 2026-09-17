declare module '#content/talent-assessment' {
  // talent_demand: 人才需求公司
  interface TalentDemandItemT {
    logo_light: string;
    logo_dark: string;
    link: string;
    company: string;
    intro: string;
    posts: string[];
  }

  interface TalentAssessmentContentT {
    talent_demand: TalentDemandItemT[];
  }

  const data: { zh: TalentAssessmentContentT };
  export default data;
}
