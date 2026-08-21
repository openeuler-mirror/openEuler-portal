declare module '#content/monthly-bulletins' {
  // bulletins[]: 月刊项
  interface MonthlyBulletinItemT {
    banner: string;
    archives: string;
    author: string[];
    date: string;
    lang: string;
    title: string;
    summary: string;
    tags: string[];
    path: string;
  }

  interface MonthlyBulletinContentT {
    bulletins: MonthlyBulletinItemT[];
  }

  const data: { zh: MonthlyBulletinContentT; en: MonthlyBulletinContentT };
  export default data;
}
