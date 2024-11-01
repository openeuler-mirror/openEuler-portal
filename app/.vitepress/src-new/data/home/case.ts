import finance from '~@/assets/category/home/case/light/finance.svg';
import financeActive from '~@/assets/category/home/case/light/finance-active.svg';
import financeDark from '~@/assets/category/home/case/dark/finance.svg';
import financeActiveDark from '~@/assets/category/home/case/dark/finance-active.svg';
import financeIllustration from '~@/assets/category/home/case/finance.png';

import operator from '~@/assets/category/home/case/light/operator.svg';
import operatorActive from '~@/assets/category/home/case/light/operator-active.svg';
import operatorDark from '~@/assets/category/home/case/dark/operator.svg';
import operatorActiveDark from '~@/assets/category/home/case/dark/operator-active.svg';
import operatorIllustration from '~@/assets/category/home/case/operator.png';

import energy from '~@/assets/category/home/case/light/energy.svg';
import energyActive from '~@/assets/category/home/case/light/energy-active.svg';
import energyDark from '~@/assets/category/home/case/dark/energy.svg';
import energyActiveDark from '~@/assets/category/home/case/dark/energy-active.svg';
import energyIllustration from '~@/assets/category/home/case/energy.png';

import logistics from '~@/assets/category/home/case/light/logistics.svg';
import logisticsActive from '~@/assets/category/home/case/light/logistics-active.svg';
import logisticsDark from '~@/assets/category/home/case/dark/logistics.svg';
import logisticsActiveDark from '~@/assets/category/home/case/dark/logistics-active.svg';
import logisticsIllustration from '~@/assets/category/home/case/logistics.png';

import education from '~@/assets/category/home/case/light/education.svg';
import educationActive from '~@/assets/category/home/case/light/education-active.svg';
import educationDark from '~@/assets/category/home/case/dark/education.svg';
import educationActiveDark from '~@/assets/category/home/case/dark/education-active.svg';
import educationIllustration from '~@/assets/category/home/case/education.png';

import government from '~@/assets/category/home/case/light/government.svg';
import governmentActive from '~@/assets/category/home/case/light/government-active.svg';
import governmentrDark from '~@/assets/category/home/case/dark/government.svg';
import governmentActiveDark from '~@/assets/category/home/case/dark/government-active.svg';
import governmentIllustration from '~@/assets/category/home/case/government.png';

import spaceFlight from '~@/assets/category/home/case/light/space-flight.svg';
import spaceFlightyActive from '~@/assets/category/home/case/light/space-flight-active.svg';
import spaceFlightyDark from '~@/assets/category/home/case/dark/space-flight.svg';
import spaceFlightActiveDark from '~@/assets/category/home/case/dark/space-flight-active.svg';
import spaceFlightIllustration from '~@/assets/category/home/case/space-flight.png';

export const cases = [
  {
    label: '金融',
    icon: {
      light: finance,
      dark: financeDark,
    },
    iconActive: {
      light: financeActive,
      dark: financeActiveDark,
    },
    img: financeIllustration,
  },
  {
    label: '运营商',
    icon: {
      light: operator,
      dark: operatorDark,
    },
    iconActive: {
      light: operatorActive,
      dark: operatorActiveDark,
    },
    img: operatorIllustration,
  },
  {
    label: '能源',
    icon: {
      light: energy,
      dark: energyDark,
    },
    iconActive: {
      light: energyActive,
      dark: energyActiveDark,
    },
    img: energyIllustration,
  },
  {
    label: '物流',
    icon: {
      light: logistics,
      dark: logisticsDark,
    },
    iconActive: {
      light: logisticsActive,
      dark: logisticsActiveDark,
    },
    img: logisticsIllustration,
  },
  {
    label: '高校&科研',
    icon: {
      light: education,
      dark: educationDark,
    },
    iconActive: {
      light: educationActive,
      dark: educationActiveDark,
    },
    img: educationIllustration,
  },
  {
    label: '云计算',
    icon: {
      light: government,
      dark: governmentrDark,
    },
    iconActive: {
      light: governmentActive,
      dark: governmentActiveDark,
    },
    img: governmentIllustration,
  },
  {
    label: '其他',
    icon: {
      light: spaceFlight,
      dark: spaceFlightyDark,
    },
    iconActive: {
      light: spaceFlightyActive,
      dark: spaceFlightActiveDark,
    },
    img: spaceFlightIllustration,
  },
];
