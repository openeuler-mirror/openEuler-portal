import finance_light from '~@/assets/category/showcase/light/finance.png';
import carrier_light from '~@/assets/category/showcase/light/carrier.png';
import energy_light from '~@/assets/category/showcase/light/energy.png';
import logistics_light from '~@/assets/category/showcase/light/logistics.png';
import education_light from '~@/assets/category/showcase/light/education.png';
import cloudComputing_light from '~@/assets/category/showcase/light/cloud-computing.png';
import other_light from '~@/assets/category/showcase/light/other.png';

import finance_dark from '~@/assets/category/showcase/dark/finance.png';
import carrier_dark from '~@/assets/category/showcase/dark/carrier.png';
import energy_dark from '~@/assets/category/showcase/dark/energy.png';
import logistics_dark from '~@/assets/category/showcase/dark/logistics.png';
import education_dark from '~@/assets/category/showcase/dark/education.png';
import cloudComputing_dark from '~@/assets/category/showcase/dark/cloud-computing.png';
import other_dark from '~@/assets/category/showcase/dark/other.png';

import finance from '~icons/case/finance.svg';
import operator from '~icons/case/operator.svg';
import energy from '~icons/case/energy.svg';
import logistics from '~icons/case/logistics.svg';
import education from '~icons/case/education.svg';
import cloudComputing from '~icons/case/cloud-computing.svg';
import other from '~icons/case/other.svg';

export const typesMapZh = new Map([
  [
    '金融',
    {
      icon: finance,
      img: {
        light: finance_light,
        dark: finance_dark,
      },
    },
  ],
  [
    '运营商',
    {
      icon: operator,
      img: {
        light: carrier_light,
        dark: carrier_dark,
      },
    },
  ],
  [
    '能源',
    {
      icon: energy,
      img: {
        light: energy_light,
        dark: energy_dark,
      },
    },
  ],
  [
    '物流',
    {
      icon: logistics,
      img: {
        light: logistics_light,
        dark: logistics_dark,
      },
    },
  ],
  [
    '高校&科研',
    {
      icon: education,
      img: {
        light: education_light,
        dark: education_dark,
      },
    },
  ],
  [
    '云计算',
    {
      icon: cloudComputing,
      img: {
        light: cloudComputing_light,
        dark: cloudComputing_dark,
      },
    },
  ],
  [
    '其他',
    {
      icon: other,
      img: {
        light: other_light,
        dark: other_dark,
      },
    },
  ]
]);
export const typesMapEn = new Map([
  [
    'Finance',
    {
      icon: finance,
      img: {
        light: finance_light,
        dark: finance_dark,
      },
    },
  ],
  [
    'Carrier',
    {
      icon: operator,
      img: {
        light: carrier_light,
        dark: carrier_dark,
      },
    },
  ],
  [
    'Energy',
    {
      icon: energy,
      img: {
        light: energy_light,
        dark: energy_dark,
      },
    },
  ],
  [
    'Logistics',
    {
      icon: logistics,
      img: {
        light: logistics_light,
        dark: logistics_dark,
      },
    },
  ],
  [
    'Others',
    {
      icon: other,
      img: {
        light: other_light,
        dark: other_dark,
      },
    },
  ]
]);
