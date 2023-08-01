import hcia from '@/assets/category/certification/hcia.png';
import hcie from '@/assets/category/certification/hcie.png';
import hcip from '@/assets/category/certification/hcip.png';
export default {
  title: 'openEuler-HCIX Certification',
  detail:
    'openEuler-HCIA, openEuler-HCIP and openEuler-HCIE are the capability certifications at different levels recognized by the openEuler community. If you are interested in obtaining any of these certificates, click the following items to sign up for the trainings and tests.',
  download: 'Download Certificates',
  cardList: [
    {
      ill: hcia,
      name: 'openEuler-HCIA',
      professional: 'Certified Engineer',
      more: 'View more',
      link: 'https://e.huawei.com/en/talent/#/cert/product-details?certifiedProductId=383&amp%3BauthenticationLevel=CTYPE_CARE_HCIA&amp%3BtechnicalField=PSC&amp%3Bversion=1.0',
    },
    {
      ill: hcip,
      name: 'openEuler-HCIP',
      professional: 'Certified Senior Enginee',
      more: 'Coming soon',
      link: '',
    },
    {
      ill: hcie,
      name: 'openEuler-HCIE',
      professional: 'Certified Expert',
      more: 'Coming soon',
      link: '',
    },
  ],
  verificationQuery: 'Query Certificates',
  certificateDownload: 'Download Certificates',
  certificateDownload2: 'Download Selected Certificates',
  email: 'Email',
  placeholderEmail: 'Your email address',
  tipEmail:
    'Enter the email address used for the certification exam to obtain the verification code and query your certificate.',
  emailErrorTip: 'Please enter a valid email address！',
  verificationCode: 'Code',
  placeholderCode: 'Enter the verification code.',
  buttonCode: 'Send a verification code',
  sure: 'Confirm',
  agreeDeclaration:
    'By filling and submitting the content, I fully understand and agree to the terms of the openEuler ',
  policy: 'Privacy Policy',
  agreeTip: 'Mandatory',
};
