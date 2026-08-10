declare module '#content/meeting' {
  // participate: 参与方式
  interface MeetingButtonItemT {
    text: string;
    url: string;
  }
  interface MeetingParticipateItemT {
    icon: string;
    title: string;
    desc: string;
    btn?: MeetingButtonItemT[];
    text?: string;
    we_chat?: boolean;
  }

  interface MeetingContentT {
    participate: MeetingParticipateItemT[];
  }

  const data: { zh: MeetingContentT };
  export default data;
}
