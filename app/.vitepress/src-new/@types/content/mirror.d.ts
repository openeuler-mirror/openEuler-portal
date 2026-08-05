declare module '#content/mirror/list' {
  // area_arr: 地区筛选选项
  interface MirrorAreaItemT {
    value: string;
    label: string;
  }

  // repo_size: 镜像仓大小
  interface MirrorRepoSizeItemT {
    release: string;
    size: string;
  }

  interface MirrorListContentT {
    area_arr: MirrorAreaItemT[];
    rsync_code: string;
    repo_size: MirrorRepoSizeItemT[];
  }

  const data: { zh: MirrorListContentT; en: MirrorListContentT };
  export default data;
}
