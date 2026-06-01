import applyImg from '~@/assets/category/event/overview/apply.png';
import applyImgDark from '~@/assets/category/event/overview/apply-dark.png';
import applicationReviewImg from '~@/assets/category/event/overview/application-review.png';
import applicationReviewImgDark from '~@/assets/category/event/overview/application-review-dark.png';
import holdImg from '~@/assets/category/event/overview/hold.png';
import holdImgDark from '~@/assets/category/event/overview/hold-dark.png';
import material1Img from '~@/assets/category/event/overview/material1.jpg';
import material2Img from '~@/assets/category/event/overview/material2.jpg';

export const applyData = {
  zh: [
    {
      img: applyImg,
      imgDark: applyImgDark,
      title: '如何申请',
      desc: '如果您有兴趣在所在城市举办 openEuler Meetup，为了保证活动顺利进行，在举办社区开发者活动前，您需要',
      href: '/zh/interaction/event-list/meetup-form/',
      btn: '申请活动',
    },
    {
      img: applicationReviewImg,
      imgDark: applicationReviewImgDark,
      title: '申办审核',
      emailtext1: '如果您的申请符合上述申办要求，我们会在 5 个工作日内审核并通过电子邮件',
      emailtext2: '与您联系，以便提供 openEuler Meetup 赋能支持并与 openEuler 社区冠名联合主办单位；即便申请不合适，我们仍会通过电子邮件通知您，请确保申办表信息无误',
      email: 'events@openeuler.sh',
    },
    {
      material1: material1Img,
      material2: material2Img,
      title: '我们可以获得哪些赋能支持？',
      desc: '审核通过后，您将获得：',
      list: [
        { title: '《openEuler社区介绍》', href: '/whitepaper/openEuler%20开源社区介绍.pdf' },
        { title: '品牌物料包', text: '易拉宝/海报/KV等设计源文件' },
        { title: '社媒矩阵传播', text: '官网/公众号/B站/社群同步宣传' },
        { title: '直播资源', text: '可选openEuler官方直播间资源' },
        { title: '社区限定周边', text: '按实际参与人数配发，上限100份' },
      ],
    },
    {
      img: holdImg,
      imgDark: holdImgDark,
      title: '活动举办',
      desc: '联合主办方的组织者需主导活动策划与执行，使用社区统一品牌规范和隐私声明，保证活动的顺利进行',
    },
    {
      title: '活动成果反馈',
      emailtext1: '可以更好地了解活动的情况和效果，不断提升 openEuler Meetup 活动的质量和影响力，联合主办方的组织者在活动结束后 3 个工作日内需向社区邮箱',
      emailtext2: '提供活动总结资料',
      email: 'events@openeuler.sh',
    },
  ],
  en: [],
};
