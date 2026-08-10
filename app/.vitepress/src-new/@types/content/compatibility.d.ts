declare module '#content/compatibility/hardware' {
  interface HardwareDataContentT {
    content: string;
    info: string;
  }

  interface HardwareListItemT {
    title: string;
    desc?: string;
    tips?: string;
    columns?: string[];
    data?: HardwareDataContentT[];
  }

  interface HardwareDataItemT {
    title: string;
    desc?: string[];
    list?: HardwareListItemT[];
  }

  interface HardwareInfoT {
    hardware_info: HardwareDataItemT[];
  }

  const data: {
    zh: HardwareInfoT;
    en: HardwareInfoT;
  };
  export default data;
}
