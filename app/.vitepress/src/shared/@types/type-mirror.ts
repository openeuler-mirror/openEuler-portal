export interface MirrorLsitT {
    ASOnly: boolean;
    AdminEmail: string;
    AdminName: string;
    Asnum: number;
    Bytes?: number;
    Comment: string;
    ComputedScore: number;
    ContinentCode: string;
    ContinentOnly: boolean;
    Country: string;
    CountryCodes: string;
    CountryOnly: boolean;
    CustomData: string;
    Distance: number;
    Downloads?: number;
    Enabled: boolean;
    ExcludedCountryCodes: string;
    FtpURL: string;
    HttpURL: string;
    ID: number;
    LastModTime: string;
    LastSuccessfulSync: string;
    LastSuccessfulSyncPrecision: number;
    LastSuccessfulSyncProtocol: number;
    LastSync: string;
    Latitude: number;
    Longitude: string;
    NameSpend: string;
    Name: string;
    NetworkBandwidth: number;
    PercentB?: number;
    PercentD?: number;
    RsyncURL: string;
    Score: number;
    SponsorLogoURL: string;
    SponsorName: string;
    SponsorURL: string;
    StateSince: string;
    SyncOffset?: object;
    TZOffset?: number;
}

export interface ClientInfoT {
    ASName: string;
    ASNum: number;
    City: string;
    ContinentCode: string;
    Country: string;
    CountryCode: string;
    Latitude: number;
    Longitude: number;
}
export interface FileInfoT {
    ModTime: string;
    Path: string
}
export interface selectMirrorListT {
    MirrorList: MirrorLsitT[];
    ExcludedList: MirrorLsitT[];
    ClientInfo: ClientInfoT;
    FileInfo: FileInfoT;
    IP: string;
    LocalJSPath: string;
}