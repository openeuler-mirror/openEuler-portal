import step1 from '~@/assets/category/mailing/step1.png';
import step2 from '~@/assets/category/mailing/step2.png';
import step3 from '~@/assets/category/mailing/step3.png';
import step4 from '~@/assets/category/mailing/step4.png';

export const subscriptionProcess = [
  {
    img: step1,
    title: {
      zh: '选择订阅的SIG组',
      en: 'Select Your SIG',
    },
    detail: {
      zh: '在邮件列表页面选择要订阅的邮件列表',
      en: 'Select the mailing list to be subscribed to on the Mailing Lists page.',
    },
  },
  {
    img: step2,
    title: {
      zh: '填写信息',
      en: 'Enter Details',
    },
    detail: {
      zh: '填入邮件地址和名字，名字可选，点击订阅',
      en: 'Enter the e-mail address and name (optional), and click Subscribe.',
    },
  },
  {
    img: step3,
    title: {
      zh: '确认订阅邮件',
      en: 'Review & Confirm',
    },
    detail: {
      zh: '您的邮箱将收到一封来自邮件列表的电子邮件，要求您确认订阅了邮件列表，点击确认链接确认订阅',
      en: 'Your mailbox will receive an e-mail from the mailing list, asking you to confirm that you have subscribed to the mailing list. Click the confirmation link to confirm the subscription.',
    },
  },
  {
    img: step4,
    title: {
      zh: '成功订阅',
      en: 'You\'re Subscribed!',
    },
    detail: {
      zh: '您的邮箱收到来自一封来自邮件列表的欢迎邮件，即成功订阅该邮件列表。如需退订，请参考 <a href="/zh/blog/liuqi/2021-10-14-unsubscribe-mailing-list.html" target="_blank" rel="noopener noreferrer" class="underline-link">此操作</a>',
      en: 'Your mailbox receives a welcome e-mail from the mailing list, indicating that you have subscribed to the mailing list successfully.',
    },
  },
];