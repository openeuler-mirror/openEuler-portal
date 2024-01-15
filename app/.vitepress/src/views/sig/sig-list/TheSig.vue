<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import AppContext from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import SigList from './SigList.vue';
import SigLandscape from './SigLandscape.vue';

import banner from '@/assets/banner/banner-sig.png';
import illustration from '@/assets/illustrations/sig-list.png';

import IconRight from '~icons/app/icon-arrow-right.svg';

const { lang } = useData();
const router = useRouter();
const i18n = useI18n();

const handlerSigClick = (path: string) => {
  router.go(`/${lang.value + path}`);
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :illustration="illustration"
    :title="i18n.sig.SIG_CENTER"
    :subtitle="i18n.sig.SIG_DESCRIPTION.MEANING"
    background-text="SIG"
  />
  <AppContext :mobile-top="16">
    <div class="sig-ul">
      <ul>
        <li>{{ i18n.sig.SIG_DESCRIPTION.LI1 }}</li>
        <li>{{ i18n.sig.SIG_DESCRIPTION.LI2 }}</li>
        <li>{{ i18n.sig.SIG_DESCRIPTION.LI3 }}</li>
      </ul>
    </div>
    <div class="sig-list">
      <p>SIG List</p>
      <OTabs>
        <OTabPane label="SIG List">
          <SigList />
        </OTabPane>
        <OTabPane label="SIG Landscape">
          <SigLandscape />
        </OTabPane>
      </OTabs>
    </div>
    <div class="sig-center-list">
      <OCard
        v-for="item in i18n.sig.SIG_CENTER_LIST"
        :key="item.PATH"
        shadow="hover"
        @click="handlerSigClick(item.PATH)"
      >
        <OButton class="post-btn" type="text" animation size="nomral">
          {{ item.NAME }}
          <template #suffixIcon>
            <OIcon class="right-icon"><IconRight /></OIcon>
          </template>
        </OButton>
      </OCard>
    </div>
  </AppContext>
</template>
<style lang="scss" scoped>
.sig-center-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
  margin-top: var(--o-spacing-h1);
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
  }
  :deep(.el-card__body) {
    background: url(@/assets/category/sig/illustration.png) no-repeat right
      center/60%;
  }
}
.o-icon {
  font-size: var(--o-font-size-h7);
  color: var(--o-color-brand1);
}
.sig-ul {
  font-size: var(--o-font-size-text);
  font-weight: 400;
  line-height: var(--o-line-height-h8);
  color: var(--o-color-text1);
  @media (max-width: 1100px) {
    padding-left: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
  }
  li {
    list-style: disc;
    + li {
      margin-top: var(--o-spacing-h8);
    }
  }
}
.sig-list {
  margin: var(--o-spacing-h1) auto 0;

  p {
    display: none;
  }
  @media (max-width: 1100px) {
    margin: var(--o-spacing-h2) auto 0;
  }

  @media (max-width: 768px) {
    padding: 0 0;
    :deep(.el-tabs__header) {
      display: none;
    }
    p {
      display: block;
      color: var(--o-color-text1);
      text-align: center;
    }
  }
}
</style>
