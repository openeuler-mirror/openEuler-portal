export interface CasesQueryT {
    page: number;
    pageSize: number;
    lang: string;
    category?: string;
    keyword?: string
}
export interface CasesRecordsT {
    articleName: string;
    banner: string;
    category: string;
    company: string;
    img: string;
    industry: string;
    lang: string;
    path: string;
    summary: string;
    textContent: string;
    title: string;
    type: string;
}
export interface CasesResponseT {
    count: number;
    page: number;
    pageSize: number;
    records: CasesRecordsT[]
}