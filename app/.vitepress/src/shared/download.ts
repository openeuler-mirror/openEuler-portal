import type {
  DetailedLinkItemT,
  VersionInfoT,
} from '@/shared/@types/type-download';

// 构造所需显示的文件信息
export const constructDownloadData = (
  versionDatas: DetailedLinkItemT[],
  version: string,
  i18n: any
) => {
  return versionDatas.map((versionData) => {
    versionData.Tree = versionData.Tree?.map((tree) => {
      //--------------- 标准镜像 ---------------
      //iso Offline Standard
      if (tree.Name === `${version}-${versionData.Arch}-dvd.iso`) {
        tree.Tips = i18n.value.download.OFFLINE_STANDARD.replace(
          '{arch}',
          versionData.Arch
        );
        tree.Order = 1;
        tree.Name = 'Offline Standard ISO';
        return tree;
      }
      //iso everything
      if (tree.Name === `${version}-everything-${versionData.Arch}-dvd.iso`) {
        tree.Tips = i18n.value.download.OFFLINE_EVERYTHING.replace(
          '{arch}',
          versionData.Arch
        );
        tree.Order = 2;
        tree.Name = 'Offline Everything ISO';
        return tree;
      }
      //iso netinst
      if (tree.Name === `${version}-netinst-${versionData.Arch}-dvd.iso`) {
        tree.Name = 'Network Install ISO';
        tree.Order = 3;
        return tree;
      }

      //edge Offline Standard
      if (tree.Name === `${version}-edge-${versionData.Arch}-dvd.iso`) {
        tree.Tips = i18n.value.download.EDGE_OFFLINE_STANDARD.replace(
          '{arch}',
          versionData.Arch
        );
        tree.Name = 'Offline Standard ISO';
        return tree;
      }
      // --------------------- arm ----------------------
      // arm glibc
      if (tree.Name.includes('openeuler-glibc')) {
        tree.Tips = i18n.value.download.GLIBC.replace(
          '{arch}',
          versionData.Arch
        );
        tree.Name = 'openEuler glibc';
        return tree;
      }
      // arm qemu
      if (tree.Name.includes('openeuler-image-qemu')) {
        tree.Tips = i18n.value.download.QEMU.replace(
          '{arch}',
          versionData.Arch
        );
        tree.Name = 'openEuler Image qemu';
        return tree;
      }
      if (tree.Name === 'zImage') {
        tree.Tips = i18n.value.download.zImage.replace(
          '{arch}',
          versionData.Arch
        );
        tree.Name = 'zImage';
        return tree;
      }
      // virtual_machine_img
      if (tree.Name.includes('qcow2.xz')) {
        tree.Tips = i18n.value.download.VIRTUAL_MACHINE.replace(
          '{arch}',
          versionData.Arch
        );
        tree.Name = 'qcow2.xz';
        return tree;
      }
      return tree;
    });
    versionData.Tree = versionData.Tree?.filter((tree) => {
      //debug 文件不展示
      return !tree.Name.includes('debug');
    });
    // 根据 Order 排序
    versionData.Tree = versionData.Tree?.sort((a, b) => {
      if (a.Order && b.Order) {
        return a.Order - b.Order;
      } else if (a.Order) {
        return -1;
      } else if (b.Order) {
        return 1;
      } else {
        return 0;
      }
    });
    return versionData;
  });
};

export const getVersionList = (list: VersionInfoT[], i18n: any) => {
  return list
    .map((version: VersionInfoT) => {
      version.Version = version.Version.replaceAll('-', ' ');
      i18n.value.download.COMMUNITY_LIST.find(
        (item: { PLANNED_EOL: string; PUBLISH_DATE: string; NAME: string }) => {
          if (item.NAME === version.Version) {
            version.plannedEol = item.PLANNED_EOL;
            version.publishDate = item.PUBLISH_DATE;
          }
        }
      );
      return version;
    })
    .sort((a: VersionInfoT, b: VersionInfoT) => {
      // 按照发布时间排序
      return (
        Number(b.publishDate?.replace('/', '')) -
        Number(a.publishDate?.replace('/', ''))
      );
    });
};
