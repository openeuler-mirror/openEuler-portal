// 从2020年开始生成年份
// 注意：typeMap 和 securityNoticeNos 已提取到 .content/security/safety-bulletin/ yaml 中。
// queryYears 因运行时动态生成（new Date().getFullYear()）保留在此文件中。

const currentYear = new Date().getFullYear();
const queryYears = [] as string[];
const YEAR = 2020;
for (let year = currentYear; year >= YEAR; year--) {
  queryYears.push(year.toString());
}
queryYears.unshift('');

export { queryYears };
