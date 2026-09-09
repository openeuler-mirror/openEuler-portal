import IconOutLink from '~icons/app/icon-out-link.svg';
import i18n from '~@/i18n';

export const getCodeRepository = () => {
  const { t } = i18n.global;
  return {
    label: t('header.SOURCE_CODE'),
    children: [
      {
        label: t('header.CODE_REPOSITORY'),
        href: 'https://atomgit.com/openeuler',
        icon: IconOutLink,
      },
      {
        label: t('header.SOFTWARE_REPOSITORY'),
        href: 'https://atomgit.com/src-openeuler',
        icon: IconOutLink,
      },
      {
        label: t('header.GITHUB_MIRROR'),
        href: 'https://github.com/openeuler-mirror',
        icon: IconOutLink,
      },
      {
        label: t('header.LFS_FILE_MANAGEMENT'),
        href: import.meta.env.VITE_SERVICE_ARTLFS_WEBSITE_URL,
      }
    ],
  };
};

