<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue';

import { useData, useRouter } from 'vitepress';

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

import { getSigMeeting, getSigDetail } from '~@/api/api-sig';

import type { SigCompleteItemT } from '~@/@types/type-sig';

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

const pageParams = reactive({
  size: 50,
  page: 1,
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
  getSigMeeting(sigName.value, pageParams)
    .then((res: any) => {
      sigMeetingData.value = res.data.reverse();
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
    if (res?.data?.length) {
      const data = res.data[0];
      sigDetailInfo.value = data;
      mail.value = data.mailing_list;
      const { maintainer_info, committer_info } = data || [];
      if (maintainer_info) {
        maintainerInfo.value = maintainer_info;
        committerInfo.value = committer_info;
      }
    }
  });
};

const breadCrumbs = ref([
  {
    title: 'SIG',
    to: `/${locale.value}/sig/sig-list/`,
  },
  {
    title: sigName.value,
    to: '',
  },
]);

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
  queryGetSigDetail();
  queryGetSigMeeting();
});
</script>
<template>
  <ContentWrapper :vertical-padding="verticalPadding">
    <OBreadcrumb class="breadcrumb">
      <OBreadcrumbItem
        v-for="breadCrumb in breadCrumbs"
        :title="breadCrumb.title"
      >
        <a :href="breadCrumb.to">
          {{ breadCrumb.title }}
        </a>
      </OBreadcrumbItem>
    </OBreadcrumb>
    <SigDetailInfoCard
      v-if="sigDetailInfo?.description"
      :description="sigDetailInfo?.description"
      :sig-name="sigDetailInfo?.sig_name"
      :gitee-address="`${SIG_ADDRESS}${sigDetailInfo?.sig_name}`"
      :mail="sigDetailInfo?.mailing_list"
    />
    <div class="sig-detail-content">
      <!-- SIG成员 -->
      <SigMember
        class="sig-member-pc"
        :maintainer-list="maintainerInfo"
        :committer-list="committerInfo"
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
        <SigRepo class="sig-floor-item" />
        <!-- SIG贡献展示 -->
        <SigContribute :sig="sigDetailInfo?.sig_name" class="sig-floor-item" />
      </div>
    </div>
  </ContentWrapper>
</template>

<style scoped lang="scss">
.sig-detail-content {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 348px 1fr;
  gap: 32px;
  width: 100%;
  @include respond-to('<=laptop') {
    display: block;
  }

  .sig-member-title {
    margin-top: 32px;
    font-weight: 500;
    display: none;
    @include h4;
    @include respond-to('<=laptop') {
      display: block;
    }
  }

  .sig-member-pc {
    @include respond-to('<=laptop') {
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
      .o-link {
        margin-left: auto;
      }
    }
    .tip {
      color: var(--o-color-info3);
      margin-top: 8px;
      @include tip2;
    }
    .email-link {
      margin-top: 16px;
    }

    .meeting-card {
      position: relative;
      margin-top: 24px;
      @include respond-to('<=laptop') {
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
      @include respond-to('<=laptop') {
        margin-top: 12px;
        display: block;
      }
    }
  }
}

.sig-detail-info-card {
  margin-top: 32px;
  @include respond-to('<=pad_v') {
    margin-top: 0;
  }
}

.breadcrumb {
  @include respond-to('<=pad_v') {
    display: none;
  }
}

@include respond-to('<=pad_v') {
  .sig-detail-content {
    .sig-floor {
      .detail-title {
        margin-bottom: 12px;
      }
      .title-top {
        margin-bottom: 8px;
        .o-icon {
          --icon-size: 16px;
        }
        .o-link {
          @include text2;
        }
      }
    }
  }
}
</style>
