/**
 * @file  学习模块国际化配置入口
 * */
import mooc from '@/assets/category/mooc/mooc1.png';
export default {
  MOOC: 'MOOCs',
  MOOC_COURSE: [
    {
      ID: '4',
      IMG: mooc,
      TITLE: 'Tutorials',
      DESC: 'openEuler Mini Courses',

      CHILDREN: [
        {
          NAME: 'Learn More',
          PATH: 'https://www.youtube.com/playlist?list=PLtDfk9jvMAziPyVaA-DOkXx0GgIUjXc0_',
        },
      ],
    },
  ],
};
