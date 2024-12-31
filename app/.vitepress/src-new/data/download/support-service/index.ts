import forumIcon from '~icons/download/forum.svg';
import faqsIcon from '~icons/download/faqs.svg';
import quickissueIcon from '~icons/download/quickissue.svg';

export default [
  {
    icon: {
      dark: '',
      light: faqsIcon,
    },
    zh: {
      title: 'FAQs',
      label: '查看openEuler常见问题',
      href: '/zh/faq/',
    },
    en: {
      title: 'FAQs',
      label: 'Find the answers to common questions about openEuler',
      href: '/en/faq/',
    },
  },
  {
    icon: {
      dark: '',
      light: forumIcon,
    },
    zh: {
      title: '社区论坛',
      label: '与开发者讨论openEuler',
      href: 'https://forum.openeuler.org/',
    },
  },
  {
    icon: {
      dark: '',
      light: quickissueIcon,
    },
    zh: {
      title: 'Quickissue',
      label: '简易快捷地查询、提交社区Issues',
      href: 'https://quickissue.openeuler.org/zh/issues/',
    },
    en: {
      title: 'Quickissue',
      label: 'Submit and track community issues quickly and easily.',
      href: 'https://quickissue.openeuler.org/en/issues/',
    },
  },
];
