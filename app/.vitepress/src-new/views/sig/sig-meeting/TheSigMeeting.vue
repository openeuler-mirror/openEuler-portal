<script lang="ts" setup>
import { ref, computed } from 'vue';
import BannerLevel3 from '~@/components/BannerLevel3.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import { useLocale } from '~@/composables/useLocale';

import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';

const { locale, t } = useLocale();

const verticalPadding = computed(() => {
  return ['32px', '16px'];
});

const breadCrumbs = ref([
  {
    title: 'SIG',
    to: `/${locale.value}/sig/sig-list/`,
  },
  {
    title: t('sig.meetingBannerTitle'),
    to: '',
  },
]);
</script>
<template>
  <div class="sig-meeting">
    <BannerLevel3
      :title="$t('sig.meetingBannerTitle')"
      :subtitle="$t('sig.meetingBannerSubtitle')"
    />
    <ContentWrapper :vertical-padding="verticalPadding">
      <OBreadcrumb>
        <OBreadcrumbItem
          v-for="breadCrumb in breadCrumbs"
          :title="breadCrumb.title"
        >
          <a :href="breadCrumb.to">
            {{ breadCrumb.title }}
          </a>
        </OBreadcrumbItem>
      </OBreadcrumb>
    </ContentWrapper>
  </div>
</template>

<style scoped lang="scss"></style>
