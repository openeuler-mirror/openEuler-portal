export const securityNoticeNos = [
  'openEuler-SA-2023-1487',
  'openEuler-SA-2023-1489',
  'openEuler-SA-2023-1504',
  'openEuler-SA-2023-1505',
];

// 从2020年开始生成年份
const currentYear = new Date().getFullYear();
const queryYears = [];
for (let year = currentYear; year >= 2020; year--) {
  queryYears.push(year.toString());
}
queryYears.unshift('');

export { queryYears };
