import type {
  DetailedLinkItemT,
  VersionInfoT,
} from '@/shared/@types/type-download';

// 构造所需显示的文件信息
export const constructDownloadData = (
  versionDatas: DetailedLinkItemT[],
  version: string,
  t: any
) => {
  return versionDatas.map((versionData) => {
    versionData.Tree = versionData.Tree?.filter((tree) => {
      //debug 文件不展示
      return !tree.Name.includes('debug');
    });
    versionData.Tree = versionData.Tree?.map((tree, index) => {
      tree.index = index;
      //--------------- 标准镜像 ---------------
      //iso Offline Standard
      if (tree.Name === `${version}-${versionData.Arch}-dvd.iso`) {
        tree.Tips = t('download.OFFLINE_STANDARD', {
          arch: versionData.Arch,
        });
        tree.Order = 1;
        tree.Name = 'Offline Standard ISO';
        return tree;
      }
      //iso everything
      if (tree.Name === `${version}-everything-${versionData.Arch}-dvd.iso`) {
        tree.Tips = t('download.OFFLINE_EVERYTHING', {
          arch: versionData.Arch,
        });
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
        tree.Tips = t('download.EDGE_OFFLINE_STANDARD', {
          arch: versionData.Arch,
        });
        tree.Name = 'Offline Standard ISO';
        return tree;
      }
      // --------------------- arm ----------------------
      // arm glibc
      if (tree.Name.includes('openeuler-glibc')) {
        tree.Tips = t('download.GLIBC', {
          arch: versionData.Arch,
        });
        tree.Name = 'openEuler glibc';
        return tree;
      }
      // arm qemu
      if (tree.Name.includes('openeuler-image-qemu')) {
        tree.Tips = t('download.QEMU', {
          arch: versionData.Arch,
        });
        tree.Name = 'openEuler Image qemu';
        return tree;
      }
      if (tree.Name === 'zImage') {
        tree.Tips = t('download.zImage', {
          arch: versionData.Arch,
        });
        tree.Name = 'zImage';
        return tree;
      }
      // virtual_machine_img
      if (tree.Name.includes('qcow2.xz')) {
        tree.Tips = t('download.VIRTUAL_MACHINE', {
          arch: versionData.Arch,
        });
        tree.Name = 'qcow2.xz';
        return tree;
      }
      return tree;
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

// 将版本架构场景信息与发布时间等信息结合
export const getVersionList = (list: VersionInfoT[], localeInfos: any) => {
  return list
    .filter((version) => {
      version.Version = version.Version.replaceAll('-', ' ');
      const matchItem = localeInfos?.find(
        (item: { NAME: string }) => item.NAME === version.Version
      );
      if (matchItem) {
        version.plannedEol = matchItem.PLANNED_EOL;
        version.publishDate = matchItem.PUBLISH_DATE;
        return true;
      }
      return false;
    })
    .sort((a: VersionInfoT, b: VersionInfoT) => {
      // 按照发布时间排序
      return (
        Number(b.publishDate?.replace('/', '')) -
        Number(a.publishDate?.replace('/', ''))
      );
    });
};

export const getOSType = (name: string, version: string, arch: string) => {
  if (name === `${version}-everything-${arch}-dvd.iso`) {
    return 'Offline Everything ISO';
  }
  //iso netinst
  if (name === `${version}-netinst-${arch}-dvd.iso`) {
    return 'Network Install ISO';
  }
  //edge Offline Standard
  if (name === `${version}-edge-${arch}-dvd.iso`) {
    return 'Offline Standard ISO';
  }
  //Offline Standard
  if (name === `${version}-${arch}-dvd.iso`) {
    return 'Offline Standard ISO';
  }
  return '';
};
