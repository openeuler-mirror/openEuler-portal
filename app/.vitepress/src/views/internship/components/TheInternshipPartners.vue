<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { computed } from 'vue';
import iscasDark from '@/assets/category/internship/logo/iscas_dark.png';
import iscasLight from '@/assets/category/internship/logo/iscas_light.png';
import qilinDark from '@/assets/category/internship/logo/qilin_dark.png';
import qilinLight from '@/assets/category/internship/logo/qilin_light.png';
import xinanDark from '@/assets/category/internship/logo/xinan_dark.png';
import xinanLight from '@/assets/category/internship/logo/xinan_light.png';
import tongxinDark from '@/assets/category/internship/logo/tongxin_dark.png';
import tongxinLight from '@/assets/category/internship/logo/tongxin_light.png';
import atomgitDark from '@/assets/category/internship/logo/atomgit_dark.png';
import atomgitLight from '@/assets/category/internship/logo/atomgit_light.png';
import mindspore_dark from '@/assets/category/internship/logo/mindspore_dark.png';
import mindspore_light from '@/assets/category/internship/logo/mindspore_light.png';
import openeulerDark from '@/assets/category/internship/logo/openeuler_dark.png';
import openeulerLight from '@/assets/category/internship/logo/openeuler_light.png';
import opengaussDark from '@/assets/category/internship/logo/opengauss_dark.png';
import opengaussLight from '@/assets/category/internship/logo/opengauss_light.png';

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');

const partners = computed(() => [
  { name: 'ISCAS', logo: isDark.value ? iscasDark : iscasLight },
  { name: 'Klinsoft', logo: isDark.value ? qilinDark : qilinLight },
  { name: 'Kylinsec', logo: isDark.value ? tongxinDark : tongxinLight },
  { name: 'Zhanjiang Software', logo: isDark.value ? xinanDark : xinanLight },
  { name: 'AtomGit', logo: isDark.value ? atomgitDark : atomgitLight },
  { name: 'MindSpore', logo: isDark.value ? mindspore_dark : mindspore_light },
  { name: 'OpenEuler', logo: isDark.value ? openeulerDark : openeulerLight },
  { name: 'openGauss', logo: isDark.value ? opengaussDark : opengaussLight },
]);
</script>

<template>
  <div class="partners-grid">
    <div
      v-for="(partner, index) in partners"
      :key="index"
      class="partner-item"
    >
      <img :src="partner.logo" :alt="partner.name" class="partner-logo" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.partner-item {
  display: flex;
  align-items: center;
  justify-content: center;

  .partner-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
}

@media screen and (max-width: 840px) {
  .partners-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>