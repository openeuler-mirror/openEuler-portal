declare module '#content/community/user-group/detail' {
  interface UserGroupMemberT {
    name: string;
    position?: string;
    technology?: string[];
    home_page?: string;
    forum?: string;
    email?: string;
    avatar: string;
    avatar_dark?: string;
    contribution?: string;
  }

  interface UserGroupPageT {
    title: string;
    organizational: string;
    organizer: UserGroupMemberT[];
    ambassador: UserGroupMemberT[];
    member: UserGroupMemberT[];
    salon?: Record<string, unknown>[];
    news?: Record<string, unknown>[];
    showcase?: Record<string, unknown>[];
  }

  interface UserGroupCityT {
    name: string;
    img: string;
    img_dark: string;
    data: UserGroupPageT;
  }

  interface UserGroupActivityT {
    [key: string]: unknown;
  }

  interface UserGroupContentT {
    cities: UserGroupCityT[];
    members: Record<string, unknown>[];
    user_activity: UserGroupActivityT[];
  }

  const data: { zh: UserGroupContentT };
  export default data;
}