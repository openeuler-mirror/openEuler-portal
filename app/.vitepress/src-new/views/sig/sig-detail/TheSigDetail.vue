<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';

import { inBrowser, useData, useRouter } from 'vitepress';

import { SIG_ADDRESS } from '~@/shared/config/sig';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

import IconNotice from '~icons/sig/icon-notice.svg';
import IconWork from '~icons/sig/icon-working.svg';

import {
  OBreadcrumb,
  OBreadcrumbItem,
  vLoading,
  OLink,
  OIcon,
  OButton,
} from '@opensig/opendesign';
import SigDetailInfoCard from './SigDetailInfoCard.vue';
import SigMember from './SigMember.vue';
import SigMeeting from './SigMeeting.vue';
import SigRepo from './SigRepo.vue';
import SigContribute from './SigContribute.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import { getSigDetail } from '~@/api/api-sig';
import { getSigmeetings } from '~@/api/api-meeting';

import type { SigCompleteItemT } from '~@/@types/type-sig';

import { useHeaderTitle } from '~@/stores/common';
import { oaReport } from '@opendesign-plus/plugins/analytics';

const { leLaptop, isPadVToLaptop, lePadV } = useScreen();
const { locale, t } = useLocale();
const { lang, params } = useData();
const router = useRouter();

const sigName = computed(() => {
  return params.value?.sig || '';
});

const meetingSummaryLink = computed(() => {
  return `https://etherpad.openeuler.org/p/${sigName.value}-meetings`;
});


const mail = ref('');
const sigMeetingData: any = ref([]);
const sigDetailInfo = ref<SigCompleteItemT>();
const maintainerInfo: any = ref([]);
const committerInfo: any = ref([]);
const isLoading = ref(true);

// 获取sig会议数据
const queryGetSigMeeting = () => {
  isLoading.value = true;
  getSigmeetings(sigName.value).then((res: any) => {
    sigMeetingData.value = res || [];
  })
  .catch(() => {
    router.go(`${lang.value}/sig/sig-list/`);
  })
  .finally(() => {
    isLoading.value = false;
  });
};

const queryGetSigDetail = () => {
  const param = {
    community: 'openeuler',
    sig: sigName.value,
  };
  getSigDetail(param).then((res: any) => {
    if (res?.data) {
      const data = res.data;
      sigDetailInfo.value = data;
      mail.value = data.mailing_list;
      const { maintainer_info, committer_info } = data || [];
      if (maintainer_info) {
        maintainerInfo.value = maintainer_info || [];
        committerInfo.value = committer_info || [];
      }
    }
  });
};

const verticalPadding = computed(() => {
  if (isPadVToLaptop.value) {
    return ['16px', '40px'];
  } else if (lePadV.value) {
    return ['32px', '32px'];
  } else {
    return ['32px', '72px'];
  }
});
onMounted(() => {
  useHeaderTitle().$patch({ headerTitle: sigName.value });
  queryGetSigDetail();
  queryGetSigMeeting();
  nextTick(() => {
    setTimeout(() => {
      const height = window.location.hash ? (document.querySelector(window.location.hash) as HTMLElement).offsetTop : 0;
      window.scrollTo({
        top: height,
        behavior: 'smooth',
      })
    }, 300);
  })
});
onUnmounted(() => {
  useHeaderTitle().$patch({ headerTitle: '' });
});

let visitTime: number | null = null;

onMounted(() => {
  if (!visitTime) {
    visitTime = Date.now();
  }
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
      module: 'sig-detail',
      level1: sigName.value,
    }, 'sig');
    visitTime = null;
  }
};

if (inBrowser) {
  document.addEventListener('visibilitychange', visibilityChangeHandler);
}

onUnmounted(() => {
  document.removeEventListener('visibilitychange', visibilityChangeHandler);
});
</script>
<template>
  <ContentWrapper :vertical-padding="verticalPadding">
    <OBreadcrumb class="breadcrumb">
      <OBreadcrumbItem 
        :href="`/${locale}/sig/sig-list/`" 
        v-analytics="{
          properties: {
            module: 'sig-detail',
            level1: sigName,
            target: t('sig.sigCenter'),
            type: 'breadcrumb',
          },
          service: 'sig',
        }">{{ t('sig.sigCenter') }}</OBreadcrumbItem
      >
      <OBreadcrumbItem>{{ sigName }}</OBreadcrumbItem>
    </OBreadcrumb>
    <SigDetailInfoCard
      :description="sigDetailInfo?.description"
      :sig-name="sigDetailInfo?.name"
      :gitee-address="`${SIG_ADDRESS}${sigDetailInfo?.name}`"
      :mail="sigDetailInfo?.mailing_list"
    />
    <div class="sig-detail-content">
      <!-- SIG成员 -->
      <SigMember
        class="sig-member-pc"
        :maintainer-list="maintainerInfo"
        :committer-list="committerInfo"
        v-analytics.catchBubble="{
          properties: {
            module: 'sig-detail',
            level1: sigName,
          },
          service: 'sig',
        }"
      />
      <div class="sig-floor">
        <div v-if="locale !== 'en'" class="meeting-floot sig-floor-item">
          <div class="meeting-detail">
            <p class="detail-title">{{ t('sig.sigMettingActive') }}</p>
            <div class="meeting-detail-card">
              <div class="sig-info-item">
                <div class="title-top">
                  <OIcon>
                    <IconWork />
                  </OIcon>
                  <p class="text">{{ t('sig.workMeeting') }}</p>
                  <OLink
                    :href="meetingSummaryLink"
                    target="_blank"
                    color="primary"
                    v-analytics="{
                      properties: {
                        module: 'sig-detail',
                        level1: sigName,
                        level2: t('sig.sigMettingActive'),
                        level3: t('sig.workMeeting'),
                        target: t('sig.meetingSummary'),
                      },
                      service: 'sig',
                    }"
                  >
                    {{ t('sig.meetingSummary') }}
                  </OLink>
                </div>
                <!-- <p class="quote">
                  {{
                    isZh ? getRepoInfo.workMeeting : getRepoInfo.workMeetingEn
                  }}
                </p> -->
                <p class="tip">
                  {{ t('sig.sigMeetingIntro') }}
                </p>
              </div>
              <div class="email-link">
                <div class="title-top">
                  <OIcon>
                    <IconNotice />
                  </OIcon>
                  <p class="text">{{ t('sig.mailList') }}</p>
                </div>
                <OLink
                  color="primary"
                  :href="`mailto:${sigDetailInfo?.mailing_list}`"
                  target="_blank"
                  class="icon-link"
                  v-analytics="{
                    properties: {
                      module: 'sig-detail',
                      level1: sigName,
                      level2: t('sig.sigMettingActive'),
                      level3: t('sig.mailList'),
                      target: sigDetailInfo?.mailing_list,
                    },
                    service: 'sig',
                  }"
                >
                  {{ sigDetailInfo?.mailing_list }}
                </OLink>
                <OButton
                  v-if="
                    sigDetailInfo?.mailing_list?.split('@').length &&
                    sigDetailInfo?.mailing_list?.split('@')[1] ===
                      'openeuler.org'
                  "
                  color="primary"
                  :href="`https://mailweb.openeuler.org/postorius/lists/${sigDetailInfo?.mailing_list}/`"
                  target="_blank"
                  size="medium"
                  v-analytics="{
                    properties: {
                      module: 'sig-detail',
                      level1: sigName,
                      level2: t('sig.sigMettingActive'),
                      level3: t('sig.mailList'),
                      target: t('sig.subscribe'),
                    },
                    service: 'sig',
                  }"
                >
                  {{ $t('sig.subscribe') }}
                </OButton>
              </div>
            </div>
          </div>
          <div v-loading="isLoading" class="meeting-card">
            <SigMeeting
              class="sig-floor-item"
              v-if="sigMeetingData.length"
              :meeting-data="sigMeetingData"
              :mail="mail"
              :sig-name="sigName"
              v-analytics.catchBubble="{
                properties: {
                  module: 'sig-detail',
                  level1: sigName,
                  level2: t('sig.sigMettingActive'),
                },
                service: 'sig',
              }"
            />
            <div v-else-if="!isLoading" class="result-empty-box sig-floor-item">
              <ResultEmpty
                :description="$t('sig.noMeeting')"
                :style="{
                  '--result-image-width': '140px',
                  '--result-image-height': '170px',
                }"
              />
              <p class="tips-text">
                {{ $t('sig.sigMeetingTip') }}
              </p>
            </div>
          </div>
        </div>
        <!-- SIG成员移动端 -->
        <SigMember
          v-if="leLaptop"
          class="sig-member-mo sig-floor-item"
          :maintainer-list="maintainerInfo"
          :committer-list="committerInfo"
        />
        <!-- SIG仓库 -->
        <SigRepo
          class="sig-floor-item"
          v-analytics.catchBubble="{
            properties: {
              module: 'sig-detail',
              level1: sigName,
            },
            service: 'sig',
          }"
        />
        <!-- SIG贡献展示 -->
        <SigContribute
          :sig="sigDetailInfo?.name"
          class="sig-floor-item"
          v-analytics.catchBubble="{
            properties: {
              module: 'sig-detail',
              level1: sigName,
            },
            service: 'sig',
          }"
        />
      </div>
    </div>
  </ContentWrapper>
</template>

<style scoped lang="scss">
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
}
.sig-detail-content {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 348px 1fr;
  gap: 32px;
  width: 100%;
  @include respond('<=laptop') {
    display: block;
  }

  .sig-member-title {
    margin-top: 32px;
    font-weight: 500;
    display: none;
    @include h4;
    @include respond('<=laptop') {
      display: block;
    }
  }

  .sig-member-pc {
    @include respond('<=laptop') {
      display: none;
    }
  }

  .sig-floor {
    width: 100%;

    .detail-title {
      font-weight: 500;
      color: var(--o-color-info1);
      margin-bottom: 24px;
      @include h4;
    }
    .meeting-detail-card {
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
      padding: 16px 24px;
      .o-btn {
        margin-left: 8px;
      }
    }
    .title-top {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      .o-icon {
        --icon-size: 24px;
      }
      .text {
        font-weight: 500;
        color: var(--o-color-info1);
        margin-left: 12px;
        @include text2;
      }
      :deep(.o-link) {
        margin-left: auto;
      }
    }
    .tip {
      color: var(--o-color-info2);
      margin-top: 8px;
      @include text1;
    }
    .email-link {
      margin-top: 16px;
    }

    .meeting-card {
      position: relative;
      margin-top: 24px;
      @include respond('<=laptop') {
        margin-top: 12px;
      }
    }

    .sig-floor-item {
      & + .sig-floor-item {
        margin-top: 32px;
      }
    }

    .result-empty-box {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 52px 0;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);

      .tips-text {
        margin-top: 8px;
        text-align: center;
        color: var(--o-color-info3);
        @include tip1;
      }
    }

    .sig-member-mo {
      display: none;
      @include respond('<=laptop') {
        margin-top: 12px;
        display: block;
      }
    }
  }
}

.sig-detail-info-card {
  margin-top: 32px;
  @include respond('<=pad_v') {
    margin-top: 0;
  }
}

.breadcrumb {
  @include respond('<=pad_v') {
    display: none;
  }
}

@include respond('<=pad_v') {
  .content-wrapper {
    --content-wrapper-vertical-paddingTop: 16px !important;
  }
  .sig-detail-content {
    .sig-floor {
      .detail-title {
        margin-bottom: 12px;
        @include h3;
      }
      .title-top {
        margin-bottom: 8px;
        .o-link {
          @include text2;
        }
        .text {
          margin-left: 8px;
        }
      }
      .tip {
        @include text1;
      }
    }
  }
}
</style>
