      
const fs = require('fs');
const data = fs.readFileSync('./TheCommercialRelease.vue').toString();

const output = data.replace(/i18n\.(\w+\.)+\w+/g, (match) => {
  const key = match.replace('i18n.', '').replace(/\./g, '.');
  return `t('${key}')`;
});

fs.writeFile(`./download.vue`, output, (err) => {
  if (err) {
    console.log('失败: ', err);
  }
});
