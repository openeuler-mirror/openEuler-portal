import step1Bg from '~@/assets/category/event/overview/step1-bg.png';
import step2Bg from '~@/assets/category/event/overview/step2-bg.png';
import step3Bg from '~@/assets/category/event/overview/step3-bg.png';
import step3BgMobile from '~@/assets/category/event/overview/step3-bg-mobile.png';
import step4Bg from '~@/assets/category/event/overview/step4-bg.png';

export const applyData = {
  zh: [
    {
      img: step1Bg,
      title: '如何申请',
      desc: '如果您有兴趣在所在城市举办 openEuler Meetup，为了保证活动顺利进行，在举办社区开发者活动前，您需要',
      href: '/zh/interaction/event-list/meetup-form/',
      btn: '申请活动',
    },
    {
      img: step2Bg,
      title: '申办审核',
      desc: '如果您的申请符合上述申办要求，我们会在 5 个工作日内审核并通过电子邮件<a href="mailto:events@openeuler.sh">events@openeuler.sh</a>与您联系，以便提供 openEuler Meetup 赋能支持并与 openEuler 社区冠名联合主办单位；即便申请不合适，我们仍会通过电子邮件通知您，请确保申办表信息无误',
    },
    {
      img: step3Bg,
      imgPhone: step3BgMobile,
      title: '我们可以获得哪些赋能支持？',
      desc: '审核通过后，您将获得：',
      downTitle: '《openEuler社区介绍》',
      href: '/whitepaper/openEuler%20开源社区介绍.pdf',
      list: [
        { title: '品牌物料包', desc: '易拉宝/海报/KV等设计源文件' },
        { title: '社媒矩阵传播', desc: '官网/公众号/B站/社群同步宣传' },
        { title: '直播资源', desc: '可选openEuler官方直播间资源' },
        { title: '社区限定周边', desc: '按实际参与人数配发，上限100份' },
      ],
    },
    {
      img: step4Bg,
      title: '活动举办',
      desc: '联合主办方的组织者需主导活动策划与执行，使用社区统一品牌规范和隐私声明，保证活动的顺利进行',
    },
    {
      title: '活动成果反馈',
      desc: '可以更好地了解活动的情况和效果，不断提升 openEuler Meetup 活动的质量和影响力，联合主办方的组织者在活动结束后 3 个工作日内需向社区邮箱<a href="mailto:events@openeuler.sh">events@openeuler.sh</a>提供活动总结资料',
    },
  ],
  en: [],
};
