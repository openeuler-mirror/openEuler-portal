import hcia from '@/assets/category/certification/hcia.png';
import hcie from '@/assets/category/certification/hcie.png';
import hcip from '@/assets/category/certification/hcip.png';
export default {
  title: 'openEuler-HCIX 证书',
  detail:
    'openEuler-HCIA /openEuler-HCIP/openEuler-HCIE 认证是 openEuler 社区承认的不同等级的能力认证，如果您有兴趣获取相应证书，可点击下列项目进行报名培训与认证考试，通过考试后，您即可同步获得对应等级的证书。',
  download: '证书下载',
  cardList: [
    {
      ill: hcia,
      name: 'openEuler-HCIA',
      professional: '认证工程师',
      more: '了解更多',
      link: 'https://e.huawei.com/cn/talent/#/cert/product-details?certifiedProductId=383&amp%3BauthenticationLevel=CTYPE_CARE_HCIA&amp%3BtechnicalField=PSC&amp%3Bversion=1.0',
    },
    {
      ill: hcip,
      name: 'openEuler-HCIP',
      professional: '认证高级工程师',
      more: '敬请期待',
      link: '',
    },
    {
      ill: hcie,
      name: 'openEuler-HCIE',
      professional: '认证专家',
      more: '敬请期待',
      link: '',
    },
  ],
  verificationQuery: '证书查询',
  certificateDownload: '证书下载',
  certificateDownload2: '下载选中证书',
  email: '邮箱',
  placeholderEmail: '输入您绑定的邮箱',
  tipEmail: '请输入认证考试所用的邮箱以获取验证码，查询您的证书。',
  emailErrorTip: '邮箱格式错误，请重新输入！',
  verificationCode: '验证码',
  placeholderCode: '输入您获取的验证码',
  buttonCode: '发送验证码',
  sure: '确认',
  agreeDeclaration:'您理解并同意，您填写并提交的内容，即视为您已充分阅读并同意openEuler的 ',
  policy:'隐私政策',
  agreeTip:'必填项'
};
