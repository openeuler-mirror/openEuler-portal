export interface CertificationT {
    identification: string;
    email: string;
}

export interface CertificateListT {
    certificationId: string;
    certifiedDate: number;
    createDate: number;
    downloadPageUrl: string;
    expiredDate: number;
    iconUrl: string;
    id: string;
    imageUrl: string;
    recertifiedDate?: null;
    signInfo: string;
    title: string[]
}

export interface CertificateInfoT {
    data: string;
    fileName: string
}