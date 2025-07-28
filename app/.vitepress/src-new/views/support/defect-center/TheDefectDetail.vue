<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  OBreadcrumb,
  OBreadcrumbItem,
  OIcon,
  ODivider,
  OTab,
  OTabPane,
  OLink,
  ORow,
  OCol,
} from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import { getSecurityDetail } from '~@/api/api-security';

import type { PackageInfoT, HotPatchT } from '@/shared/@types/type-support';

import IconDownload from '~icons/app-new/icon-download.svg';

import { securityNoticeNos } from '~@/data/safety-bulletin';

import { changeTimeStamp } from '~@/utils/common';

import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const route = useRoute();
const { t, locale } = useLocale();
const { lePadV } = useScreen();

const activeTab = ref(0);

const detailData: any = ref({});
const cveIdList = ref<string[]>([]);
const bugIdList = ref<string[]>([]);
const baseUrl = import.meta.env.VITE_SERVICE_REPO_URL;

const securityNoticeNo = ref('');

// 更新软件包链接
const getRpmUrl = (data: PackageInfoT[]) => {
  if (!data?.length) {
    return false;
  }
  data.forEach((version) => {
    version.child.forEach((product) => {
      product.child.forEach((rpm) => {
        let path = '';
        // securityNoticeNos 为特殊路径
        if (securityNoticeNos.includes(securityNoticeNo.value)) {
          if (product.productName === 'src') {
            path = `source/Packages/${rpm.packageName}`;
          } else if (product.productName === 'noarch') {
            path = `everything/aarch64/Packages/${rpm.packageName}`;
          } else {
            path = `everything/${product.productName}/Packages/${rpm.packageName}`;
          }
        } else {
          if (product.productName === 'src') {
            path = `update/source/Packages/${rpm.packageName}`;
          } else if (product.productName === 'noarch') {
            path = `update/aarch64/Packages/${rpm.packageName}`;
          } else {
            path = `update/${product.productName}/Packages/${rpm.packageName}`;
          }
        }
        rpm.url = `${baseUrl}/${version.productName}/${path}`;
      });
    });
  });
};

// 更新的热补丁
const getHotPatchRpmUrl = (data: HotPatchT[]) => {
  if (!data?.length) {
    return false;
  }
  data.forEach((version) => {
    version.child.forEach((product) => {
      product.packageName.forEach((rpm) => {
        let path = '';
        if (product.packageType === 'src') {
          path = `hotpatch_update/source/Packages/${rpm}`;
        } else if (product.packageType === 'noarch') {
          path = `hotpatch_update/aarch64/Packages/${rpm}`;
        } else {
          path = `hotpatch_update/${product.packageType}/Packages/${rpm}`;
        }
        product.url = `${baseUrl}/${version.productName}/${path}`;
      });
    });
  });
};

const getSecurityDetailInfo = (val: string) => {
  getSecurityDetail(val).then((res: any) => {
    if (res) {
      detailData.value = res;
      const strList = res.cveId.split(';');
      strList.forEach((item: string) => {
        if (item.startsWith('BUG')) {
          bugIdList.value.push(item);
        } else if (item.startsWith('CVE')) {
          cveIdList.value.push(item);
        }
      });
      getRpmUrl(detailData.value.packageHelperList);
      getHotPatchRpmUrl(detailData.value.packageHotpatchList);
    }
  });
};

onMounted(() => {
  const index = window.location.href.indexOf('=');
  securityNoticeNo.value = window.location.href.substring(index + 1);
  getSecurityDetailInfo(securityNoticeNo.value);
});

const generateIssueUrl = (issue: String) => {
  const origin =
    detailData.value.affectedComponent === 'kernel'
      ? 'openeuler'
      : 'src-openeuler';
  return `https://gitee.com/${origin}/${
    detailData.value.affectedComponent
  }/issues/${issue?.split('-')?.at(-1)}`;
};
</script>

<template>
  <div class="defect-center-detail">
    <ContentWrapper :vertical-padding="['32px', '72px']">
      <OBreadcrumb v-if="!lePadV">
        <OBreadcrumbItem :href="route.path.replace('detail/', '')">{{
          t('defectCenter.defectCenter')
        }}</OBreadcrumbItem>
        <OBreadcrumbItem>{{ securityNoticeNo }}</OBreadcrumbItem>
      </OBreadcrumb>
      <div class="banner">
        <div class="title-box">
          <span class="title">{{ securityNoticeNo }}</span>
        </div>
        <div class="text-box">
          <span class="gray">{{ t('defectCenter.summary') }}:</span>
          <span>{{ detailData.summary }}</span>
        </div>
        <div class="time text-box">
          <span>
            {{ changeTimeStamp(new Date(detailData.announcementTime).getTime())}}
            {{ t('defectCenter.release') }}
          </span>
          <ODivider direction="v" />
          <span>
            {{ changeTimeStamp(new Date(detailData.updateTime).getTime()) }}
            {{ t('defectCenter.update') }}
          </span>
        </div>
      </div>
      <div class="content">
        <OTab v-model="activeTab" :line="false">
          <OTabPane :label="t('defectCenter.overview')" :value="0">
            <div class="info-item">
              <p class="label">{{ t('defectCenter.brief_introduction') }}</p>
              <p class="desc">{{ detailData.introduction }}</p>
            </div>
            <div class="info-item">
              <p class="label">{{ t('defectCenter.severityLevel') }}</p>
              <p class="desc">{{ detailData.type }}</p>
            </div>
            <div class="info-item">
              <p class="label">{{ t('defectCenter.description') }}</p>
              <p class="desc">{{ detailData.description }}</p>
            </div>
            <div class="info-item">
              <p class="label">{{ t('defectCenter.affectedComponent') }}</p>
              <p class="desc">{{ detailData.affectedComponent }}</p>
            </div>
            <div v-if="bugIdList?.length" class="info-item info-cve">
              <p class="label">issue</p>
              <p
                v-for="(item, index) in bugIdList"
                :key="index"
                class="cve-link"
              >
                <OLink
                  color="primary"
                  variant="text"
                  hoverUnderline
                  :href="generateIssueUrl(item)"
                  >{{ item }}</OLink
                >
              </p>
            </div>
            <div v-if="cveIdList?.length" class="info-item info-cve">
              <p class="label">{{ t('defectCenter.cve') }}</p>
              <p
                v-for="(item, index) in cveIdList"
                :key="index"
                class="cve-link"
              >
                <OLink
                  color="primary"
                  variant="text"
                  hoverUnderline
                  :href="`/${locale}/security/cve/detail/?cveId=${item}&packageName=${detailData.affectedComponent}`"
                  >{{ item }}</OLink
                >
              </p>
            </div>
            <div v-if="detailData.referenceList?.length" class="info-item info-cve">
              <p class="label">{{ t('defectCenter.reference') }}</p>
              <p
                v-for="(item, index) in detailData.referenceList"
                :key="index"
                class="cve-link"
              >
                <OLink
                  color="primary"
                  variant="text"
                  hoverUnderline
                  :href="item.url"
                  target="_blank"
                  >{{ item.url }}</OLink
                >
              </p>
            </div>
          </OTabPane>
          <OTabPane
            v-if="detailData?.packageHelperList?.length"
            :label="t('defectCenter.updated_packages')"
            :value="1"
          >
            <ORow gap="0 12px" wrap="wrap">
              <OCol
                flex="0 0 100%"
                v-for="(item, i) in detailData?.packageHelperList"
                :key="i"
              >
                <ODivider v-if="i > 0" class="packge-divider" />
                <div class="packge-item">
                  <p class="packge-item-title">{{ item.productName }}</p>
                  <div
                    v-for="(ch, c) in item.child"
                    :key="c"
                    class="packge-item-type"
                  >
                    <p class="packge-item-type-achitecture">
                      {{ ch.productName }}
                    </p>
                    <div
                      v-for="(single, s) in ch.child"
                      :key="s"
                      class="packge-item-type-link"
                    >
                      <OLink
                        color="primary"
                        variant="text"
                        hoverUnderline
                        :href="single.url"
                      >
                        {{ single.packageName }}<OIcon><IconDownload /></OIcon>
                      </OLink>
                    </div>
                    <ODivider v-if="c !== item.child.length - 1" />
                  </div>
                </div>
              </OCol>
            </ORow>
          </OTabPane>
          <OTabPane
            v-if="detailData?.packageHotpatchList?.length"
            :label="t('defectCenter.updated_hot_patches')"
            :value="2"
          >
            <ORow gap="0 12px" wrap="wrap">
              <OCol
                flex="0 0 100%"
                v-for="(item, i) in detailData?.packageHotpatchList"
                :key="i"
              >
                <ODivider v-if="i > 0" class="packge-divider" />
                <div class="packge-item">
                  <p class="packge-item-title">{{ item.productName }}</p>
                  <div
                    v-for="(ch, c) in item.child"
                    :key="c"
                    class="packge-item-type"
                  >
                    <p class="packge-item-type-achitecture">
                      {{ ch.packageType }}
                    </p>
                    <div
                      v-for="(single, s) in ch.packageName"
                      :key="s"
                      class="packge-item-type-link"
                    >
                      <OLink
                        color="primary"
                        variant="text"
                        hoverUnderline
                        :href="single.url"
                      >
                        {{ single }}<OIcon><IconDownload /></OIcon>
                      </OLink>
                    </div>
                    <ODivider v-if="c !== item.child.length - 1" />
                  </div>
                </div>
              </OCol>
            </ORow>
          </OTabPane>
        </OTab>
      </div>
    </ContentWrapper>
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
  @include text-truncate(1);
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

.content {
  background-color: var(--o-color-fill2);
  padding: 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 24px;
}
.o-tab {
  --tab-nav-justify: left;
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
.info-cve {
  .label {
    margin-bottom: 16px;
  }
}
.o-link {
  padding: 0;
  @include text1;
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-left: 8px;
    }
  }
}

.o-row {
  margin-top: 32px;
}
.o-col {
  margin-bottom: 0;
}
.packge-divider {
  --o-divider-gap: 12px 0 24px;
}
.packge-item-title {
  color: var(--o-color-info1);
  font-weight: 500;
  @include h3;
}
.packge-item-type {
  margin-top: 16px;
}
.packge-item-type-achitecture {
  color: var(--o-color-info2);
  font-weight: 500;
  @include text1;
}
.packge-item-type-link {
  margin-top: 12px;
  margin-left: 16px;
}

@include respond-to('<=pad_v') {
  .banner {
    padding: 24px 12px;
    margin-top: 0;
  }
  .text-box {
    @include text1;
  }
  .content {
    padding: 12px;
    margin-top: 16px;
  }
  .info-item {
    margin-top: 24px;
    .desc {
      margin-top: 12px;
    }
  }

  .o-row {
    margin-top: 24px;
    margin-bottom: 0;
  }
  .packge-item-type {
    margin-top: 12px;
  }
  .packge-item-type-achitecture {
    @include text2;
  }
  .packge-item-type-link {
    margin-left: 8px;
  }
}
</style>
