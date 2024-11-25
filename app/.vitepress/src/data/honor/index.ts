import year2021 from './2021';
import year2022 from './2022';
import year2023 from './2023';
import year2024 from './2024';

const honorList = new Map<string, any>([
  ['2021', year2021],
  ['2022', year2022],
  ['2023', year2023],
  ['2024', year2024],
]);

export default {
  title: '社区荣誉',
  readNews: '查看新闻',
  viewCertificate: '查看证书',
  honorList: honorList,
};
