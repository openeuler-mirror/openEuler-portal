<script lang="ts" setup>
import { ORow, OCol } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import KylinosLogo from '@/assets/nestos/partner/kylinos.png';
import SkysolidissLogo from '@/assets/nestos/partner/skysolidiss.jpg';

const { t } = useLocale();

const partners = [
  {
    name: 'KylinOS',
    logo: KylinosLogo,
    href: 'https://www.kylinos.cn/',
  },
  {
    name: 'Skysolidiss',
    logo: SkysolidissLogo,
    href: 'https://www.skysolidiss.com.cn/',
  },
];
</script>

<template>
  <AppSection :title="t('nestos.partnersTitle')">
    <ORow gap="24px" wrap="wrap" class="partners-row">
      <OCol
        v-for="(partner, i) in partners"
        :key="i"
        flex="0 0 auto"
      >
        <a
          :href="partner.href"
          target="_blank"
          class="partner-card"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="partner-logo"
          />
        </a>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.partners-row {
  width: 100%;
}

.partner-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 80px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 16px 24px;
  text-decoration: none;
  transition: box-shadow 0.2s, transform 0.2s;
  border: 1px solid var(--o-color-control4);

  &:hover {
    box-shadow: var(--o-shadow-1);
    transform: translateY(-2px);
  }
}

.partner-logo {
  max-width: 100%;
  max-height: 48px;
  object-fit: contain;
  filter: grayscale(0.2);
  transition: filter 0.2s;

  .partner-card:hover & {
    filter: grayscale(0);
  }
}

@include respond-to('<=pad_v') {
  .partner-card {
    width: 140px;
    height: 64px;
    padding: 12px 16px;
  }
}
</style>
