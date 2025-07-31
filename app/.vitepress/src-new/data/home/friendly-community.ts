import linaro from '~@/assets/category/home/friendly-community/light/linaro.png'
import linuxFoundation from '~@/assets/category/home/friendly-community/light/linux foundation.png'
import openchain from '~@/assets/category/home/friendly-community/light/OpenChain.png'
import openhpc from '~@/assets/category/home/friendly-community/light/OpenHPC.png'
import openinfra from '~@/assets/category/home/friendly-community/light/OpenInfra.png'
import riscv from '~@/assets/category/home/friendly-community/light/RISC-V.png'
import opea from '~@/assets/category/home/friendly-community/light/opea.png'

import linaro_dark from '~@/assets/category/home/friendly-community/dark/linaro.png'
import linuxFoundation_dark from '~@/assets/category/home/friendly-community/dark/linux foundation.png'
import openchain_dark from '~@/assets/category/home/friendly-community/dark/OpenChain.png'
import openhpc_dark from '~@/assets/category/home/friendly-community/dark/OpenHPC.png'
import openinfra_dark from '~@/assets/category/home/friendly-community/dark/OpenInfra.png'
import riscv_dark from '~@/assets/category/home/friendly-community/dark/RISC-V.png'
import opea_dark from '~@/assets/category/home/friendly-community/dark/opea.png'

export const friendlyCommunityConfig = [
  {
    logo: {
      light: linaro,
      dark: linaro_dark,
    },
    url: 'https://www.linaro.org/',
  },
  {
    logo: {
      light: linuxFoundation,
      dark: linuxFoundation_dark,
    },
    url: 'https://www.linuxfoundation.org/',
    desc: '* openEuler是Linux Foundation的Associate Member',
    desc_en: '* openEuler is an Associate Member of the Linux Foundation.',
  },
  {
    logo: {
      light: openchain,
      dark: openchain_dark,
    },
    url: 'https://openchainproject.org/',
    desc: '',
  },
  {
    logo: {
      light: openhpc,
      dark: openhpc_dark,
    },
    url: 'https://openhpc.community/',
  },
  {
    logo: {
      light: openinfra,
      dark: openinfra_dark,
    },
    url: 'https://openinfra.org/',
  },
  {
    logo: {
      light: opea,
      dark: opea_dark,
    },
    url: 'https://opea.dev/',
  },
  {
    logo: {
      light: riscv,
      dark: riscv_dark,
    },
    url: 'https://riscv.org/',
  },
]