<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import {
  OBreadcrumb,
  OBreadcrumbItem,
  OTag,
  OIcon,
  ODivider,
  OTable,
  OButton,
  OLink,
  ODialog,
  OPopover,
  OScroller,
} from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import IconSecurityLevel from '~icons/security/icon-security-level.svg';
import IconFile from '~icons/app-new/icon-file.svg';

import { getCveDetail, getAffectedProduct } from '~@/api/api-security';
import type {
  CveDetailCvssT,
  AffectProductT,
} from '@/shared/@types/type-support';

import { typeMap } from '~@/data/safety-bulletin';
import { statusMap, glossaryList } from '~@/data/cve';

import { changeTimeStamp } from '~@/utils/common';

import { useI18n } from '@/i18n';
import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

interface CvssItem {
  cate?: string;
  NVD?: string;
  openEuler?: string;
}

const i18n = useI18n();
const route = useRoute();
const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const cveId = ref('');
const packageName = ref('');

const cveDetailData = ref<CveDetailCvssT>();
const affectedProductList = ref<AffectProductT[]>([]);
const cvssList = ref<CvssItem[]>([]);

const columns = [
  { label: '', key: 'cate' },
  { label: 'NVD', key: 'NVD' },
  { label: 'openEuler', key: 'openEuler' },
];

const getCveDetailInfo = (cveId: string, packageName: string) => {
  getCveDetail(cveId, packageName).then((res: any) => {
    cveDetailData.value = res.result;
    cvssList.value = [
      {
        cate: i18n.value.cve.CVSS_SCORE,
        NVD: cveDetailData.value?.cvsssCoreNVD,
        openEuler: cveDetailData.value?.cvsssCoreOE,
      },
      {
        cate: 'Attack Vector',
        NVD: cveDetailData.value?.attackVectorNVD,
        openEuler: cveDetailData.value?.attackVectorOE,
      },
      {
        cate: 'Attack Complexity',
        NVD: cveDetailData.value?.attackComplexityNVD,
        openEuler: cveDetailData.value?.attackComplexityOE,
      },
      {
        cate: 'Privileges Required',
        NVD: cveDetailData.value?.privilegesRequiredNVD,
        openEuler: cveDetailData.value?.privilegesRequiredOE,
      },
      {
        cate: 'User Interaction',
        NVD: cveDetailData.value?.userInteractionNVD,
        openEuler: cveDetailData.value?.userInteractionOE,
      },
      {
        cate: 'Scope',
        NVD: cveDetailData.value?.scopeNVD,
        openEuler: cveDetailData.value?.scopeOE,
      },
      {
        cate: 'Confidentiality',
        NVD: cveDetailData.value?.confidentialityNVD,
        openEuler: cveDetailData.value?.confidentialityOE,
      },
      {
        cate: 'Integrity',
        NVD: cveDetailData.value?.integrityNVD,
        openEuler: cveDetailData.value?.integrityOE,
      },
      {
        cate: 'Availability',
        NVD: cveDetailData.value?.availabilityNVD,
        openEuler: cveDetailData.value?.availabilityOE,
      },
    ];
  });
};

// 严重级别列表显示
const levelShow = (cvsssCoreOE: string) => {
  const val = parseFloat(cvsssCoreOE);
  if (val >= 9.0) {
    return {
      label: typeMap.get('Critical')?.label[locale.value],
      calss: 'critical',
    };
  } else if (val >= 7.0) {
    return {
      label: typeMap.get('High')?.label[locale.value],
      calss: 'high',
    };
  } else if (val >= 4.0) {
    return {
      label: typeMap.get('Medium')?.label[locale.value],
      calss: 'medium',
    };
  } else if (val > 0) {
    return {
      label: typeMap.get('Low')?.label[locale.value],
      calss: 'low',
    };
  }
  return {
    label: locale.value === 'zh' ? '无' : 'N/A',
    calss: 'norating',
  };
};

const columnsProduct = [
  { label: i18n.value.cve.PRODUCT, key: 'productName' },
  { label: i18n.value.cve.PACKAGE, key: 'packageName' },
  { label: i18n.value.cve.STATUS, key: 'status' },
  { label: i18n.value.cve.ANALYSIS, key: 'reason' },
  { label: i18n.value.cve.SECURITY_ADVISORIES, key: 'securityNoticeNo' },
  { label: i18n.value.cve.RELEASE_DATE, key: 'releaseTime' },
  { label: i18n.value.cve.UPDATE_TIME, key: 'updateTime' },
];

const getAffectedProductInfo = (cveId: string, packageName: string) => {
  getAffectedProduct(cveId, packageName).then((res: any) => {
    affectedProductList.value = res.result;
  });
};

const glossaryVisible = ref(false);
const columnsGlossary = [
  { label: t('cve.bugStatus'), key: 'status' },
  { label: t('cve.bugDesc'), key: 'description' },
];

const reasonPop = (val: string) => {
  const item = glossaryList.find((e) => {
    return (
      e.status.replace(/[-_\s]/g, ' ').toLowerCase() ===
      val.replace(/[-_\s]/g, ' ').toLowerCase()
    );
  });
  return item?.description[locale.value];
};

onMounted(() => {
  const i1 = window.location.href.indexOf('=');
  const i2 = window.location.href.lastIndexOf('&');
  const i3 = window.location.href.lastIndexOf('=');
  cveId.value = window.location.href.substring(i1 + 1, i2);
  packageName.value = window.location.href.substring(i3 + 1);
  getCveDetailInfo(cveId.value, packageName.value);
  getAffectedProductInfo(cveId.value, packageName.value);
});
</script>

<template>
  <div class="cve-detail">
    <ContentWrapper :vertical-padding="['32px', '72px']">
      <OBreadcrumb>
        <OBreadcrumbItem :href="route.path.replace('detail/', '')">{{
          i18n.cve.CVE
        }}</OBreadcrumbItem>
        <OBreadcrumbItem>{{ cveDetailData?.cveId }}</OBreadcrumbItem>
      </OBreadcrumb>
      <div class="banner">
        <div v-if="cveDetailData?.cveId" class="title-box">
          <span class="title">{{ cveDetailData?.cveId }}</span>
          <OTag
            class="type-tag"
            :class="[levelShow(cveDetailData.cvsssCoreOE).calss]"
            :style="{ '--tag-radius': '4px' }"
          >
            <OIcon> <IconSecurityLevel /></OIcon>
            {{ levelShow(cveDetailData.cvsssCoreOE).label }}
          </OTag>
        </div>
        <div class="text-box">
          <span class="gray">{{ t('cve.cvssScore') }}:</span>
          <span>{{ cveDetailData?.cvsssCoreOE }}</span>
        </div>
        <div class="time text-box">
          <span>
            {{ changeTimeStamp(new Date(cveDetailData?.createTime).getTime()) }}
            {{ t('safetyBulletin.release') }}
          </span>
          <ODivider direction="v" />
          <span>
            {{ changeTimeStamp(new Date(cveDetailData?.updateTime).getTime()) }}
            {{ t('safetyBulletin.update') }}
          </span>
        </div>
      </div>
      <div class="content">
        <div class="info-item info-overview">
          <p class="label">{{ t('cve.synopsis') }}</p>
          <p class="desc">{{ cveDetailData?.summary }}</p>
        </div>
        <div class="info-item">
          <p class="label">{{ i18n.cve.METRICS_V3 }}</p>
          <OScroller
            class="norm-scroller"
            show-type="always"
            size="small"
            disabled-y
          >
            <OTable
              :columns="columns"
              :data="cvssList"
              border="row-frame"
              class="cvss-table"
            ></OTable>
          </OScroller>
        </div>
        <div class="info-item">
          <div class="label-box">
            <p class="label">{{ i18n.cve.AFFECTED_PRODUCTS }}</p>
            <OButton
              variant="outline"
              color="normal"
              size="medium"
              class="glossary-btn"
              @click="glossaryVisible = true"
            >
              <template #icon>
                <OIcon><IconFile /></OIcon>
              </template>
              <span>{{ t('cve.glossary') }}</span>
            </OButton>
          </div>
          <OScroller
            class="product-scroller"
            show-type="always"
            size="small"
            disabled-y
          >
            <OTable
              :columns="columnsProduct"
              :data="affectedProductList"
              border="row-frame"
              class="product-table"
            >
              <template #td_securityNoticeNo="{ row }">
                <OLink
                  color="primary"
                  variant="text"
                  :href="`/${locale}/security/security-bulletins/detail/?id=${row.securityNoticeNo}`"
                  >{{ row.securityNoticeNo }}</OLink
                >
              </template>
              <template #td_status="{ row }">
                <OPopover
                  v-if="!lePadV"
                  position="top"
                  wrap-class="status-popover"
                >
                  <template #target>
                    <OTag class="status-tag" :style="{ '--tag-radius': '4px' }">
                      {{ row.status }}
                    </OTag>
                  </template>
                  <div>
                    <p class="tag-title">{{ row.status }}</p>
                    <p class="tag-desc">
                      {{ statusMap.get(row.status)?.tag[locale] }}
                    </p>
                  </div>
                </OPopover>
                <p v-else>{{ row.status }}</p>
              </template>
              <template #td_reason="{ row }">
                <OPopover
                  v-if="!lePadV && reasonPop(row.reason)"
                  position="top"
                  wrap-class="status-popover"
                >
                  <template #target>
                    <span>{{ row.reason }}</span>
                  </template>
                  <div>
                    <p class="tag-title">{{ row.reason }}</p>
                    <p class="tag-desc">{{ reasonPop(row.reason) }}</p>
                  </div>
                </OPopover>
                <p v-if="lePadV">{{ row.reason }}</p>
              </template>
              <template #td_releaseTime="{ row }">
                {{ changeTimeStamp(new Date(row?.releaseTime).getTime()) }}
              </template>
              <template #td_updateTime="{ row }">
                {{ changeTimeStamp(new Date(row?.updateTime).getTime()) }}
              </template>
            </OTable>
          </OScroller>
        </div>
      </div>
    </ContentWrapper>
    <ODialog
      v-model:visible="glossaryVisible"
      :phone-half-full="lePadV"
      class="glossary-body"
      :class="isDark ? 'glossary-body-dark' : ''"
      :size="lePadV ? 'medium' : 'large'"
    >
      <template #header>
        <span class="del-title">{{ t('cve.glossary') }}</span>
      </template>
      <div class="dlg-body">
        <OTable
          :columns="columnsGlossary"
          :data="glossaryList"
          border="all"
          class="glossary-table"
        >
          <template #td_description="{ row }">
            <p v-dompurify-html="row.description[locale]"></p>
            <ul v-if="locale === 'zh' && row.listZh">
              <li v-for="(item, i) in row.listZh">{{ item }}</li>
            </ul>
            <ul v-if="locale === 'en' && row.listEn">
              <li v-for="(item, i) in row.listEn">{{ item }}</li>
            </ul>
          </template>
        </OTable>
      </div>
    </ODialog>
  </div>
</template>

<style lang="scss" scoped>
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
  --breadcrumb-seperator-size: 16px;
}

.banner {
  background-color: var(--o-color-fill2);
  padding: 24px 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 24px;
}

.title-box {
  display: flex;
  align-items: center;
}
.title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include h2;
}
.type-tag {
  margin-left: 16px;
  --tag-bg-color: transparent;
  --tag-padding: 2px 4px;
  :deep(.o-tag-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-right: 4px;
      @include text1;
    }
  }
}
.high {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-warning1);
    }
  }
}
.medium {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-warning2);
    }
  }
}
.critical {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-danger1);
    }
  }
}
.norating {
  :deep(.o-tag-label) {
    .o-icon {
      color: var(--o-color-info4);
    }
  }
}
.text-box {
  color: var(--o-color-info1);
  margin-top: 16px;
  @include tip1;
}
.gray {
  color: var(--o-color-info3);
  margin-right: 8px;
}
.time {
  margin-top: 8px;
}

.status-tag {
  --tag-bg-color: var(--o-color-control2-light);
  --tag-bd-color: var(--o-color-control3-light);
  cursor: pointer;
}

.content {
  background-color: var(--o-color-fill2);
  padding: 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 24px;
}

.info-item {
  margin-top: 40px;
  .label {
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
  }
  .desc {
    color: var(--o-color-info2);
    margin-top: 16px;
    white-space: pre-wrap;
    text-align: justify;
    @include text1;
  }
}
.label-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.glossary-btn {
  --btn-bd-color: var(--o-color-control4);
  --btn-bg-color-hover: var(--o-color-control2-light);
  --btn-bd-color-hover: var(--o-color-control4);
  --btn-color-hover: var(--o-color-info1);
  --btn-bg-color-active: var(--o-color-control2-light);
  --btn-bd-color-active: var(--o-color-control4);
  --btn-color-active: var(--o-color-info1);
}
.o-btn {
  --btn-radius: var(--o-radius-xs);
}

.info-overview {
  margin-top: 0;
}

:deep(.o-table) {
  margin-top: 24px;
  --table-head-cell-padding: 9px 16px;
  --table-head-cell-height: auto;
  --table-cell-padding: 9px 16px;
  --table-edge-padding: 24px;
  --table-cell-height: auto;
  th,
  td {
    color: var(--o-color-info1);
    @include tip1;
  }
}
.cvss-table {
  width: 65%;
}
.product-table {
  margin-top: 7px;
}
.glossary-table {
  --table-head-cell-padding: 9px 24px;
  --table-head-cell-height: auto;
  --table-cell-padding: 9px 24px;
  --table-edge-padding: 24px;
  --table-cell-height: auto;
  :deep(th) {
    color: var(--o-color-info1);
    @include tip1;
  }
  :deep(tr) {
    td {
      vertical-align: top;
      @include tip1;
      &:nth-of-type(1) {
        color: var(--o-color-info2);
        padding-left: 32px;
      }
    }
    &:nth-of-type(1),
    &:nth-of-type(2),
    &:nth-of-type(8) {
      td {
        color: var(--o-color-info1);
        padding-left: 24px;
        &:nth-of-type(1) {
          font-weight: 500;
        }
      }
    }
  }
  :deep(th) {
    &:nth-of-type(1) {
      width: 30%;
    }
    &:nth-of-type(2) {
      width: 70%;
    }
  }
}
ul {
  list-style-type: disc;
  padding-left: 16px;
}

@include respond-to('<=pad_v') {
  .banner {
    padding: 24px 12px;
  }
  .text-box {
    @include text1;
  }
  .info-item {
    margin-top: 24px;
    .desc {
      margin-top: 12px;
    }
  }
  .content {
    padding: 12px;
    margin-top: 16px;
  }
  :deep(.o-table) {
    margin-top: 12px;
    --table-head-cell-padding: 8px 16px;
    --table-cell-padding: 8px 16px;
    --table-edge-padding: 24px;
  }
  .cvss-table {
    min-width: 400px;
  }
  :deep(.o-scrollbar) {
    --scrollbar-x-bottom: -12px;
  }
  :deep(.o-scrollbar-rail) {
    margin: 0;
  }
  .product-table {
    min-width: 745px;
  }
  .glossary-btn {
    --btn-padding: 0 4px;
    @include tip1;
  }
  .glossary-table {
    --table-head-cell-padding: 7px 12px;
    --table-cell-padding: 7px 12px;
    --table-edge-padding: 12px;
    :deep(tr) {
      td {
        &:nth-of-type(1) {
          padding-left: 12px;
        }
      }
      &:nth-of-type(1),
      &:nth-of-type(2),
      &:nth-of-type(8) {
        td {
          padding-left: 12px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.status-popover {
  width: 326px;
  .o-popup-body {
    border-radius: var(--o-radius-xs);
    padding: 16px;
  }
  .tag-title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include text1;
  }
  .tag-desc {
    color: var(--o-color-info2);
    margin-top: 4px;
    @include tip1;
  }
}
.glossary-body {
  --dlg-radius: var(--o-radius-xs);
  --dlg-width: 1170px;
}
.glossary-body-dark {
  --dlg-bg-color: #3f3f43;
}
</style>
