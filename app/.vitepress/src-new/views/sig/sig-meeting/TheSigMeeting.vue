<script lang="ts" setup>
import { ref, computed } from 'vue';
import BannerLevel3 from '~@/components/BannerLevel3.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import AppSection from '~@/components/AppSection.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { typeOfMeeting } from '~@/data/sig/sig-meeting';

import {
  OBreadcrumb,
  OBreadcrumbItem,
  OCard,
  ORow,
  OCol,
} from '@opensig/opendesign';

const { locale, t } = useLocale();
const { isPhone, lePad, lePadV } = useScreen();

const flexGap = computed(() =>
  isPhone.value ? '12px 12px' : lePad.value ? '16px 16px' : '32px 32px'
);

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
    <!-- 会议介绍 -->
    <AppSection class="community-member" :title="$t('sig.meetiingIntroTitle')">
      <div class="sig-meeting-content">
        <div class="conference-introduction">
          <p>
            {{ $t('sig.meetiingIntro1') }}
          </p>
          <p>
            {{ $t('sig.meetiingIntro2') }}
          </p>
        </div>
      </div>
    </AppSection>
    <!-- 会议类型 -->
    <AppSection class="community-member" :title="$t('sig.meetingTypeTitle')">
      <ORow :gap="flexGap" flex-wrap="wrap">
        <OCol
          v-for="item in typeOfMeeting"
          :key="item.title[locale]"
          flex="0 1 50%"
          :laptop="{ flex: '0 50%' }"
          :pad="{ flex: '0 1 50%' }"
          :pad-v="{ flex: '0 1 100%' }"
          :phone="{ flex: '0 1 100%' }"
        >
          <OCard
            :title="item.title[locale]"
            :detail="item.intro[locale]"
            :detail-row="2"
            layout="h"
            rel="noopener noreferrer"
            hoverable
            :icon="item.icon"
          >
          </OCard>
        </OCol>
      </ORow>
    </AppSection>
    <!-- 组织会议 -->
    <AppSection class="community-member" :title="$t('sig.sigMeeingOrg')">
      <ORow :gap="flexGap" flex-wrap="wrap">
        <OCol
          v-for="item in typeOfMeeting"
          :key="item.title[locale]"
          flex="0 1 50%"
          :laptop="{ flex: '0 50%' }"
          :pad="{ flex: '0 1 50%' }"
          :pad-v="{ flex: '0 1 100%' }"
          :phone="{ flex: '0 1 100%' }"
        >
          <OCard
            :title="item.title[locale]"
            :detail="item.intro[locale]"
            :detail-row="2"
            layout="h"
            rel="noopener noreferrer"
            hoverable
            :icon="item.icon"
          >
          </OCard>
        </OCol>
      </ORow>
    </AppSection>
  </div>
</template>

<style scoped lang="scss">
.sig-meeting-content {
  color: var(--o-color-info1);
  .conference-introduction {
    text-align: center;
    @include text1;
  }
}
</style>
