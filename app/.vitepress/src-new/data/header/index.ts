import IconOutLink from '~icons/app/icon-out-link.svg';
import i18n from '~@/i18n';

export const arList = [
  '/interaction/news-list',
  '/interaction/blog-list',
  '/monthly-bulletins',
  '/download',
  '/download/commercial-release',
  '/community/organization',
  '/community/member',
  '/showcase',
  '/other/brand',
  '/security/security-bulletins',
  '/community/mailing-list',
  '/other/privacy',
  '/personal-data-collection-overview',
  '/data-sharing-with-third-parties',
  '/other/cookies',
];

export const AR_URL = 'https://ar.openeuler.org';

export const getCodeRepository = () => {
  const { t } = i18n.global;
  return {
    label: t('header.SOURCE_CODE'),
    list: [
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
}

export const langData = {
  label: '语言切换',
  list: [
    {
      id: 'zh',
      label: '简体中文',
      simple: '中',
    },
    {
      id: 'en',
      label: 'English',
      simple: 'EN',
    },
    {
      id: 'ar',
      label: 'العربية',
      simple: 'AR',
    },
  ],
};
