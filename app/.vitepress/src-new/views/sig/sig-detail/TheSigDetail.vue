<script lang="ts" setup>
import { ref, computed, reactive, onMounted } from 'vue';

import { useData, useRouter } from 'vitepress';

import { SIG_ADDRESS } from '~@/shared/config/sig';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';
import SigDetailInfoCard from './SigDetailInfoCard.vue';
import SigMember from './SigMember.vue';
import SigMeeting from './SigMeeting.vue';
import SigRepo from './SigRepo.vue';
import SigContribut from './SigContribut.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import { getSigMeeting, getSigDetail } from '~@/api/api-sig';

import type { SigCompleteItemT } from '~@/@types/type-sig';

const { isPhone, isPad, isPadVToLaptop, lePadV } = useScreen();
const { locale } = useLocale();
const { lang, params } = useData();
const router = useRouter();

const sigName = computed(() => {
  return params.value?.sig || '';
});

const pageParams = reactive({
  size: 50,
  page: 1,
});

const mail = ref('');
const sigMeetingData: any = ref([]);
const sigDetailInfo = ref<SigCompleteItemT>();
const memberList: any = ref([]);

const queryGetSigMeeting = () => {
  getSigMeeting(sigName.value, pageParams)
    .then((res: any) => {
      sigMeetingData.value = res.data.reverse();
    })
    .catch(() => {
      router.go(`${lang.value}/sig/sig-list/`);
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
      const { maintainer_info } = data || [];
      if (maintainer_info) {
        memberList.value = maintainer_info;
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
    return ['12px', '32px'];
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
    <SigDetailInfoCard
      :description="sigDetailInfo?.description"
      :sig-name="sigDetailInfo?.sig_name"
      :gitee-address="`${SIG_ADDRESS}${sigDetailInfo?.sig_name}`"
      :mail="sigDetailInfo?.mailing_list"
    />
    <div class="sig-detail-content">
      <SigMember :maintainer-list="memberList" />
      <div class="sig-floor">
        <SigMeeting
          class="sig-floor-item"
          v-if="sigMeetingData.length"
          :meeting-data="sigMeetingData"
          :mail="mail"
        />
        <div v-else class="result-empty-box sig-floor-item">
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
        <SigRepo class="sig-floor-item" />
        <SigContribut :sig="sigDetailInfo?.sig_name" class="sig-floor-item" />
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
  .sig-floor {
    .sig-floor-item {
      & + .sig-floor-item {
        margin-top: 32px;
      }
    }
    .result-empty-box {
      padding: 52px;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      .tips-text {
        margin-top: 8px;
        text-align: center;
        color: var(--o-color-info3);
        @include tip1;
      }
    }
  }
}
.sig-detail-info-card {
  margin-top: 32px;
}
</style>
