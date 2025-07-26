<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ORow, OCol, OFigure, OTable, OLink, OButton, OPagination } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import { subscriptionProcess } from '~@/data/mailing';

import banner from '~@/assets/category/mailing/mailing-banner.jpg';

import { useLocale } from '~@/composables/useLocale';

import { getAllMailing } from '~@/api/api-mailing';

import type { MailingDataT } from '~@/@types/type-mailing';

const { locale, t } = useLocale();

const columns = [
  { label: t('mailing.name'), key: 'display_name', style: 'width: 12%' },
  { label: t('mailing.describe'), key: 'description', style: 'width: 50%' },
  { label: t('mailing.mailingAddress'), key: 'fqdn_listname', style: 'width: 22%' },
  { label: t('mailing.mailFile'), key: 'mail_file', style: 'width: 8%' },
  { label: t('mailing.subscriptionEmail'), key: 'subscribe_mail', style: 'width: 8%' },
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
getMailList();

const onPageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
  if (pageSize !== pageConf.pageSize) {
    pageConf.currentPage = 1;
  } else {
    pageConf.currentPage = page;
  }
  pageConf.pageSize = pageSize;
  pageData();
};
</script>

<template>
  <BannerLevel2 class="mail-banner" :title="t('mailing.title')" :background-image="banner" />
  <AppSection :title="t('mailing.subscriptionProcessTitle')" class="subscription-process">
    <div class="mail-process">
      <ORow gap="80px 0" wrap="nowrap">
        <OCol v-for="(item, i) in subscriptionProcess" :key="i" flex="0 0 25%">
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
    <OTable :columns="columns" :data="tableData" class="mailing-list">
      <template #td_display_name="{ row }">{{ row.display_name }}</template>
      <template #td_description="{ row }">{{ row.description }}</template>
      <template #td_fqdn_listname="{ row }">
        <OLink color="primary" size="small" variant="text" :href="`mailto:${row.fqdn_listname}`" target="_blank" hover-underline>{{ row.fqdn_listname }}</OLink>
      </template>
      <template #td_mail_file="{ row }">
        <OLink color="primary" size="small" variant="text" :href="`https://mailweb.openeuler.org/hyperkitty/list/${row.display_name.toLowerCase()}@openeuler.org/`" target="_blank" hover-underline>查看归档</OLink>
      </template>
      <template #td_subscribe_mail="{ row }">
        <OButton color="primary" variant="outline" :href="`https://mailweb.openeuler.org/postorius/lists/${row.fqdn_listname}/`" target="_blank">{{ t('mailing.subscriptionEmail') }}</OButton>
      </template>
    </OTable>
    <OPagination
      v-if="total > 0"
      :key="total"
      :total="total"
      :page="pageConf.currentPage"
      :page-size="pageConf.pageSize"
      :page-sizes="pageConf.pageSizes"
      :layout="['total', 'jumper', 'pager', 'pagesize']"
      :show-more="false"
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
    width: 120px;
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
}
.o-table + .o-pagination {
  margin-top: 24px;
}
</style>
