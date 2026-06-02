import { internshipTaskLinks } from './internshipTask';

export const EMAIL_ADDRESS = 'intern@openeuler.sh';

export enum InternshipStep {
  APPLY = 'applyInternship',
  RECEIVE = 'receiveTask',
  SUBMIT = 'submitTask',
  SALARY = 'salaryAndCertificate',
}

export const internshipTaskTemplate = {
  titleKey: 'internship.applyInternshipDesc8',
  file: internshipTaskLinks.applyInternshipTemp,
  filename: '实习申请材料模板.rar',
};

export const internshipTaskEmailTemplate = {
  titleKey: 'internship.internshipTaskEmailTemplate',
  file: internshipTaskLinks.internshipEmailTemp,
  filename: '实习任务认领邮件模板.txt',
};

export const internshipCertTemplate = {
  titleKey: 'internship.internshipCertTemplate',
  file: internshipTaskLinks.internshipCertTemplate,
  filename: '实习证明申请材料和邮件模板.rar',
};