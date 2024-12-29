import EpkgIcon from '~icons/search/epkg.svg';
import ImageIcon from '~icons/search/image.svg';
import RpmIcon from '~icons/search/rpm.svg';
import OepkgIcon from '~icons/search/oepkg.svg';

export const getTagsIcon = (v: string) => {
  if (v === 'RPM' || v === 'rpmpkg') {
    return RpmIcon;
  } else if (v === 'EPKG' || v === 'epkgpkg') {
    return EpkgIcon;
  } else if (v === 'IMAGE' || v === 'apppkg') {
    return ImageIcon;
  } else if (v === 'OEPKG' || v === 'oepkg') {
    return OepkgIcon;
  }
};
