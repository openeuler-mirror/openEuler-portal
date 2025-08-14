<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { ORow, OCol, OFigure, OTable, OLink, OButton, OPagination } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import { subscriptionProcess } from '~@/data/mailing';

import banner from '~@/assets/category/mailing/mailing-banner.jpg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { getAllMailing } from '~@/api/api-mailing';

import type { MailingDataT } from '~@/@types/type-mailing';

const { locale, t } = useLocale();
const { lePadV, isPhone } = useScreen();

const columns = [
  { label: t('mailing.name'), key: 'display_name', style: { width: lePadV.value ? '60px' : '180px' } },
  { label: t('mailing.describe'), key: 'description', style: { 'max-width': '640px', 'min-width': '160px' } },
  { label: t('mailing.mailingAddress'), key: 'fqdn_listname', style: { width: lePadV.value ? '80px' : '320px' } },
  { label: t('mailing.mailFile'), key: 'mail_file', style: { width: '104px' } },
  { label: t('mailing.subscriptionEmail'), key: 'subscribe_mail', style: { width: '104px' } },
];
const tableData = ref<MailingDataT[]>([]);
const mailingData = ref<MailingDataT[]>([]);

// -------------------- 分页 --------------------
const total = ref(0);
const pageConf = reactive({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 30, 40],
});
const pageData = () => {
  tableData.value = mailingData.value?.slice((pageConf.currentPage - 1) * pageConf.pageSize, pageConf.currentPage * pageConf.pageSize);
};

const getMailList = () => {
  getAllMailing().then((res) => {
    mailingData.value = res || [];
    total.value = mailingData.value.length;
    pageData();
  });
};

onMounted(() => {
  getMailList();
})

const onPageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
  if (pageSize !== pageConf.pageSize) {
    pageConf.currentPage = 1;
  } else {
    pageConf.currentPage = page;
  }
  pageConf.pageSize = pageSize;
  pageData();
};

const colFlex = computed(() => {
  if (isPhone.value) {
    return '0 0 100%';
  } else if (lePadV.value) {
    return '0 0 50%';
  }
  return '0 0 25%';
})
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="mail-banner" :title="t('mailing.title')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ $t('mailing.title') }}</p>
  </div>
  <AppSection :title="t('mailing.subscriptionProcessTitle')" class="subscription-process">
    <div class="mail-process">
      <ORow gap="80px 0" :wrap="lePadV ? 'wrap' : 'nowrap'">
        <OCol v-for="(item, i) in subscriptionProcess" :key="i" :flex="colFlex">
          <div class="step-item">
            <p class="num">
              {{ (i + 1).toString().padStart(2, '0') }}
            </p>
            <p class="title">{{ item.title[locale] }}</p>
            <p v-dompurify-html="item.detail[locale]" class="desc"></p>
            <OFigure :src="item.img" />
          </div>
        </OCol>
      </ORow>
    </div>
  </AppSection>
  <AppSection :title="t('mailing.title')" class="mailing-list-section">
    <OTable v-if="!isPhone" :columns="columns" :data="tableData" class="mailing-list">
      <template #td_display_name="{ row }">{{ row.display_name }}</template>
      <template #td_description="{ row }">
        <div class="description-td">{{ row.description || '-' }}</div>
      </template>
      <template #td_fqdn_listname="{ row }">
        <OLink color="primary" size="small" variant="text" :href="`mailto:${row.fqdn_listname}`" target="_blank" hover-underline>{{ row.fqdn_listname }}</OLink>
      </template>
      <template #td_mail_file="{ row }">
        <OLink color="primary" size="small" variant="text" :href="`https://mailweb.openeuler.org/hyperkitty/list/${row.display_name.toLowerCase()}@openeuler.org/`" target="_blank" hover-underline class="view-archive">{{ t('mailing.viewArchive') }}</OLink>
      </template>
      <template #td_subscribe_mail="{ row }">
        <OButton color="primary" variant="outline" :href="`https://mailweb.openeuler.org/postorius/lists/${row.fqdn_listname}/`" target="_blank">{{ t('mailing.subscriptionEmail') }}</OButton>
      </template>
    </OTable>
    <div class="mail-list" v-else>
      <div class="mail-item" v-for="(row, idx) in tableData" :key="idx">
        <div class="item-title">{{ row.display_name }}</div>
        <div class="item-desc">{{ row.description }}</div>
        <OLink color="primary" size="small" variant="text" :href="`mailto:${row.fqdn_listname}`" target="_blank" hover-underline class="item-mail">{{ row.fqdn_listname }}</OLink>
        <div class="item-btns">
          <OLink color="primary" size="small" variant="text" :href="`https://mailweb.openeuler.org/hyperkitty/list/${row.display_name.toLowerCase()}@openeuler.org/`" target="_blank" hover-underline class="view-archive">{{ t('mailing.viewArchive') }}</OLink>
          <OButton color="primary" variant="outline" :href="`https://mailweb.openeuler.org/postorius/lists/${row.fqdn_listname}/`" target="_blank">{{ t('mailing.subscriptionEmail') }}</OButton>
        </div>
      </div>
    </div>
    <OPagination
      v-if="total > 0"
      :key="total"
      :total="total"
      :page="pageConf.currentPage"
      :page-size="pageConf.pageSize"
      :page-sizes="pageConf.pageSizes"
      :layout="['total', 'jumper', 'pager', 'pagesize']"
      :show-more="false"
      :simple="lePadV"
      @change="onPageChange"
    />
  </AppSection>
</template>

<style scoped lang="scss">
.mail-banner {
  :deep(.wrap) {
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    height: 280px;

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.mo-banner {
  @include respond-to('<=pad_v') {
    padding: 24px 24px 20px;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
  }
  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
  }
}

.mail-process {
  width: 100%;
  background-color: var(--o-color-fill2);
  padding: 32px 64px;
  border-radius: var(--o-radius-xs);
  .step-item {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .num {
    font-weight: 600;
    background-image: linear-gradient(0deg, rgba(var(--o-kleinblue-6), 0) 0, rgba(var(--o-kleinblue-6), 1) 100%);
    -webkit-background-clip: text;
    color: transparent;
    opacity: 0.4;
    @include display2;
  }
  .title {
    color: var(--o-color-primary1);
    font-weight: 500;
    margin-top: -22px;
    @include text2;
  }
  .desc {
    color: var(--o-color-info2);
    margin-top: 8px;
    @include tip1;
  }
  .o-figure {
    margin-top: auto;
    width: 160px;
  }
  :deep(.underline-link) {
    --link-color-hover: var(--o-color-primary1);
    --link-underline-x: 100%;

    color: var(--o-color-primary1);
    background: linear-gradient(0deg, var(--link-color-hover), var(--link-color-hover)) no-repeat var(--link-underline-x) bottom;
    background-size: 0 1px;
    transition: background-size var(--o-easing-standard) var(--o-duration-m2);

    @include hover {
      background-size: var(--link-underline-x) 1px;
      background-position-x: left;
    }
  }

  @include respond-to('laptop') {
    padding: 32px 52px;
    .o-figure {
      width: 128px;
    }
  }

  @include respond-to('pad_h') {
    padding: 32px;
    .o-figure {
      width: 102px;
    }
  }

  @include respond-to('<=pad_v') {
    padding: 24px;
    .title {
      @include h4;
    }
    .desc {
      @include text1;
    }
    .o-figure {
      width: 82px;
    }
  }
  @include respond-to('phone') {
    padding: 16px;
    .num {
      @include display1;
    }
    .title {
      margin-top: -16px;
      @include h3;
    }
    .desc {
      @include text2;
    }
    .o-figure {
      width: 128px;
      margin: 0 auto;
    }
  }
}

.mailing-list-section {
  :deep(.section-body) {
    margin-top: 16px;
  }
}

:deep(.o-table) {
  --table-head-cell-padding: 9px 16px;
  --table-head-cell-height: auto;
  --table-cell-padding: 9px 16px;
  --table-edge-padding: 40px;
  --table-cell-height: auto;
  th,
  td {
    color: var(--o-color-info1);
    @include tip1;
  }
  .description-td {
    @include text-truncate(2);
  }
  .view-archive {
    word-break: keep-all;
    white-space: nowrap;
  }

  @include respond-to('laptop') {
    --table-edge-padding: 32px;
  }

  @include respond-to('pad_h') {
    --table-edge-padding: 24px;
    --table-cell-padding: 8px;
    --table-head-cell-padding: 8px;
  }

  @include respond-to('<=pad_v') {
    --table-edge-padding: 16px;
    --table-cell-padding: 8px;
    --table-head-cell-padding: 8px;
  }
}
.o-table + .o-pagination {
  margin-top: 24px;
}

.mail-list {
  .mail-item + .mail-item {
    margin-top: 16px;
  }
  .mail-item {
    padding: 16px;
    border-radius: var(--o-radius-s);
    background-color: vaR(--o-color-fill2);

    .item-title {
      font-weight: 500;
      @include h4;
    }
    .item-desc {
      color: var(--o-color-info2);
      margin-top:8px;
      @include tip1;
    }
    .item-mail {
      margin-top: 12px;
      @include text-truncate(1);
      @include text1;
    }
    .item-btns {
      margin-top:12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  @include respond-to('phone') {
    .mail-item {
      .item-title {
        @include h3;
      }
      .item-desc {
        @include text2;
      }
      .item-mail {
        @include text2;
      }
    }
  }
}
.mail-list + .o-pagination {
  margin-top: 16px;
  :deep(.o-pagination-wrap) {
    justify-content: center;
  }
}
</style>
