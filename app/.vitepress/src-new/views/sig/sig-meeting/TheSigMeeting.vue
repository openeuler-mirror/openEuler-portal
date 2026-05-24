<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

import BannerLevel3 from '~@/components/BannerLevel3.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import AppSection from '~@/components/AppSection.vue';
import SigMeetingOrgZh from './SigMeetingOrgZh.vue';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { typeOfMeeting } from '~@/data/sig/sig-meeting';

import banner from '~@/assets/category/sig/sig-role-banner.jpg';

import {
  OBreadcrumb,
  OBreadcrumbItem,
  OCard,
  ORow,
  OCol,
} from '@opensig/opendesign';

import { useHeaderTitle } from '~@/stores/common';

import { useCommon } from '@/stores/common';

import cubeTow from '~@/assets/category/home/calendar/cube-2.png';
import cubeTowDark from '~@/assets/category/home/calendar/cube-2_dark.png';
import { inBrowser } from 'vitepress';
import { oaReport } from '@opendesign-plus/plugins/analytics';

const { locale, t } = useLocale();
const { isPhone, lePad, lePadV } = useScreen();
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

let visitTime: number | null = null;

onMounted(() => {
  if (!visitTime) {
    visitTime = Date.now();
  }
  useHeaderTitle().$patch({ headerTitle: t('sig.meetingBannerTitle') });
});

const visibilityChangeHandler = () => {
  if (document.visibilityState === 'visible') {
    if (!visitTime) {
      visitTime = Date.now();
    }
  } else {
    oaReport('pageLeave', {
      duration: Date.now() - visitTime!,
      $url: location.href,
      module: 'sig',
      level1: t('sig.meetingBannerTitle'),
    }, 'sig');
    visitTime = null;
  }
};

if (inBrowser) {
  document.addEventListener('visibilitychange', visibilityChangeHandler);
}

onUnmounted(() => {
  useHeaderTitle().$patch({ headerTitle: '' });
  document.removeEventListener('visibilitychange', visibilityChangeHandler);
});

// ============埋点============
const getClickedLink = (ev: Event) => {
  let target = ev.target as HTMLElement;
  if (!target || target === ev.currentTarget) return;
  while (!(target instanceof HTMLAnchorElement)) {
    target = target.parentElement!;
    if (!target || target === ev.currentTarget) return;
  }
  return target;
};

const reportIntroLinkClick = (ev: Event) => {
  const target = getClickedLink(ev);
  if (!target) return;

  return {
    properties: {
      level1: t('sig.meetingBannerTitle'),
      level2: t('sig.meetingIntroTitle'),
      target: target.textContent.trim()
    },
    service: 'sig',
  };
};
</script>
<template>
  <div class="sig-meeting">
    <BannerLevel3
      :background-image="banner"
      :title="$t('sig.meetingBannerTitle')"
      :subtitle="$t('sig.meetingBannerSubtitle')"
    />
    <ContentWrapper :vertical-padding="verticalPadding">
      <OBreadcrumb class="breadcrumb" >
        <OBreadcrumbItem 
          :href="`/${locale}/sig/sig-list/`" 
          v-analytics="{
            properties: {
              level1: $t('sig.meetingBannerTitle'),
              target: $t('sig.sigCenter'),
              type: 'breadcrumb',
            },
            service: 'sig',
          }"
          >{{ t('sig.sigCenter') }}</OBreadcrumbItem
        >
        <OBreadcrumbItem>{{ t('sig.meetingBannerTitle') }}</OBreadcrumbItem>
      </OBreadcrumb>
    </ContentWrapper>
    <!-- 会议介绍 -->
    <AppSection class="meeting-intro" :title="$t('sig.meetingIntroTitle')">
      <div class="sig-meeting-content">
        <div class="conference-introduction">
          <p v-dompurify-html="t('sig.meetingIntro1')" v-analytics="reportIntroLinkClick"></p>
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
:deep(.banner-level3 .wrap) {
  height: 280px;
  .banner-text {
    max-width: 60%;
    .banner-title {
      color: var(--o-color-black);
      @include display2;
    }
    .banner-subtitle {
      color: var(--o-color-black);
      margin-top: var(--o-gap-2);
      @include text2;
    }
  }

  @media screen and (max-width: 1680px) {
    height: 220px;

    .banner-text {
      .banner-title {
        font-size: 40px;
        line-height: 56px;
      }
      .banner-subtitle {
        font-size: 16px;
        line-height: 24px;
      }
      .banner-operation {
        margin-top: var(--o-gap-4);

        .o-btn {
          --btn-height: 32px;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    height: 180px;

    .banner-text {
      .banner-title {
        @include display2;
      }
      .banner-subtitle {
        @include text2;
      }
    }
  }
}

.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
}
.meeting-intro {
  :deep(.section-wrapper) {
    margin-top: 0;
    @include respond-to('<=pad_v') {
      margin-top: 16px;
    }
  }
}

:deep(.underline-link) {
  --link-color-hover: var(--o-color-primary1);
  --link-underline-x: 100%;

  color: var(--o-color-primary1);
  background: linear-gradient(
      0deg,
      var(--link-color-hover),
      var(--link-color-hover)
    )
    no-repeat var(--link-underline-x) bottom;
  background-size: 0 1px;
  transition: background-size var(--o-easing-standard) var(--o-duration-m2);

  @include hover {
    background-size: var(--link-underline-x) 1px;
    background-position-x: left;
  }
}

.sig-meeting-content {
  color: var(--o-color-info1);
  padding: 24px 32px;
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  .conference-introduction {
    @include text1;

    p:last-child {
      margin-top: 12px;
      @include respond-to('<=pad_v') {
        margin-top: 8px;
      }
    }
  }

  @include respond-to('<=pad_v') {
    background-color: transparent;
    padding: 0;
    .conference-introduction {
      @include text2;

      p:last-child {
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
  background-attachment: fixed;

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
