<script lang="ts" setup>
import { ref, computed } from 'vue';

import BannerLevel3 from '~@/components/BannerLevel3.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import AppSection from '~@/components/AppSection.vue';
import SigMeetingOrgZh from './SigMeetingOrgZh.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { typeOfMeeting } from '~@/data/sig/sig-meeting';

import banner from '~@/assets/category/sig/banner-role-description.png';

import {
  OBreadcrumb,
  OBreadcrumbItem,
  OCard,
  ORow,
  OCol,
} from '@opensig/opendesign';

const { locale, t } = useLocale();
const { isPhone, lePad, lePadV } = useScreen();

import { useCommon } from '@/stores/common';

import cubeTow from '~@/assets/category/home/calendar/cube-2.png';
import cubeTowDark from '~@/assets/category/home/calendar/cube-2_dark.png';

const commonStore = useCommon();

const flexGap = computed(() =>
  isPhone.value ? '12px 12px' : lePad.value ? '16px 16px' : '32px 32px'
);

const verticalPadding = computed(() => {
  if (lePadV.value) {
    return ['16px', '0'];
  } else {
    return ['32px', '16px'];
  }
});

const breadCrumbs = ref([
  {
    title: t('sig.sigCenter'),
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
      :background-image="banner"
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
    <AppSection class="meeting-intro" :title="$t('sig.meetingIntroTitle')">
      <div class="sig-meeting-content">
        <div class="conference-introduction">
          <p>
            {{ $t('sig.meetingIntro1') }}
          </p>
          <p>
            {{ $t('sig.meetingIntro2') }}
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
    <AppSection class="sig-meeing-org" :title="$t('sig.sigMeeingOrg')">
      <SigMeetingOrgZh class="sig-meeting-org-zh" />
      <img
        class="cube-2"
        :src="commonStore.theme === 'light' ? cubeTow : cubeTowDark"
        alt=""
      />
    </AppSection>
  </div>
</template>

<style scoped lang="scss">
.meeting-intro {
  :deep(.section-wrapper) {
    margin-top: 0;
    @include respond-to('<=pad_v') {
      margin-top: 16px;
    }
  }
}

.sig-meeting-content {
  color: var(--o-color-info1);

  .conference-introduction {
    text-align: center;
    @include text1;

    p:last-child {
      margin-top: 12px;
      @include respond-to('<=pad_v') {
        margin-top: 8px;
      }
    }
  }
}

.sig-meeting {
  overflow: hidden;
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #e8edff 100%
  );
  background-position: 0 bottom;
  background-size: 100% 40%;
  background-repeat: no-repeat;

  .content-wrapper {
    @include respond-to('<=pad_v') {
      display: none;
    }
  }

  :deep(.banner-level3) {
    @include respond-to('<=pad_v') {
      display: none;
    }
  }
}

.sig-meeing-org {
  position: relative;
  z-index: 1;

  :deep(.section-body) {
    position: relative;
    width: 100%;
    z-index: 1;
  }

  .sig-meeting-org-zh {
    position: relative;
    z-index: 1;
  }

  .cube-2 {
    position: absolute;
    z-index: -1;
    width: 380px;
    bottom: -181px;
    right: -220px;
    @include respond-to('laptop') {
      width: 400px;
      bottom: -200px;
      right: -240px;
    }
    @include respond-to('pad_h') {
      right: -140px;
      bottom: -150px;
    }
    @include respond-to('<=pad_v') {
      width: 71px;
      bottom: -40px;
      right: -8px;
    }
  }
}

[data-o-theme='dark'] {
  .sig-meeting {
    background-image: linear-gradient(180deg, #1a1a1c 0%, #141b2e 100%);
  }
}
</style>
