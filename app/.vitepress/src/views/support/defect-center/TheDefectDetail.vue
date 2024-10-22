<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import { securityNoticeNos } from '@/data/security';
import { getSecurityDetail } from '@/api/api-security';
import type { PackageInfoT, HotPatchT } from '@/shared/@types/type-support';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const detailData: any = ref({});
const cveIdList = ref<string[]>([]);
const bugIdList = ref<string[]>([]);
const baseUrl = 'https://repo.openeuler.org';

const securityNoticeNo = ref('');

function getSecurityDetailInfo(data: string) {
  getSecurityDetail(data).then((res: any) => {
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
}

function goBackPage() {
  const i = router.route.path.lastIndexOf('d');
  router.go(`${router.route.path.substring(0, i)}`);
}

function getRpmUrl(data: PackageInfoT[]) {
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
}
function getHotPatchRpmUrl(data: HotPatchT[]) {
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
}
onMounted(() => {
  const index1 = window.location.href.indexOf('=');
  securityNoticeNo.value = window.location.href.substring(index1 + 1);
  getSecurityDetailInfo(securityNoticeNo.value);
});
</script>
<template>
  <div class="wrapper">
    <div class="breadcrumb">
      <p class="last-page" @click="goBackPage">
        {{ i18n.safetyBulletin.DEFECT_CENTER }}
      </p>
      <span class="separtor">
        <OIcon><IconChevronRight /></OIcon>
      </span>
      <p class="current-page">
        {{ i18n.safetyBulletin.DEFECT_CENTER_DETAIL }}
      </p>
    </div>

    <div class="bulletin-head">
      <p class="bulletin-name">{{ detailData.securityNoticeNo }}</p>
      <div class="bulletin-intro">
        <div>
          <span>{{ i18n.safetyBulletin.SYNOPSIS }}:</span>
          <p>{{ detailData.summary }}</p>
        </div>
        <div>
          <span>{{ i18n.safetyBulletin.RELEASE_DATE }}:</span>
          <p>{{ detailData.announcementTime }}</p>
        </div>
        <div>
          <span>{{ i18n.safetyBulletin.UPDATE_TIME }}:</span>
          <p>
            {{ detailData.updateTime?.split(' ')[0] }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="wrapper2">
    <div class="tabs-container">
      <OTabs class="o-tabs">
        <div class="wrapper1">
          <OTabPane :label="i18n.safetyBulletin.OVERVIEW">
            <div class="tab-content">
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.BRIEF_INTRODUCTION }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.introduction }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.SEVERITY }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.type }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.DESCRIPTION }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.description }}
                </p>
              </div>
              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.AFFECTED_COMPONENTS }}
                </h5>
                <p class="tab-content-item-text">
                  {{ detailData.affectedComponent }}
                </p>
              </div>
              <div v-if="bugIdList.length" class="tab-content-item">
                <h5 class="tab-content-item-title">issue</h5>
                <div class="flex">
                  <a
                    v-for="(item, index) in bugIdList"
                    :key="index"
                    :href="`https://gitee.com/src-openeuler/${
                      detailData.affectedComponent
                    }/issues/${item?.split('-')?.at(-1)}`"
                    class="tab-content-item-text tab-content-item-link"
                  >
                    {{ item }}
                  </a>
                </div>
              </div>

              <div v-if="cveIdList.length" class="tab-content-item">
                <h5 class="tab-content-item-title">CVE</h5>
                <a
                  v-for="(item, index) in cveIdList"
                  :key="index"
                  :href="`/${lang}/security/cve/detail/?cveId=${item}&packageName=${detailData.affectedComponent}`"
                  class="tab-content-item-text tab-content-item-link"
                >
                  {{ item }}
                </a>
              </div>

              <div class="tab-content-item">
                <h5 class="tab-content-item-title">
                  {{ i18n.safetyBulletin.REFERENCE_DOCUMENTS }}
                </h5>
                <div
                  v-for="item in detailData.referenceList"
                  :key="item"
                  class="tab-content-item-text"
                >
                  <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ item.url }}</a
                  >
                </div>
              </div>
            </div>
          </OTabPane>

          <OTabPane
            v-if="detailData?.packageHelperList?.length"
            :label="i18n.safetyBulletin.UPDATED_PACKAGES"
          >
            <div class="tab-content">
              <div
                v-for="item in detailData.packageHelperList"
                :key="item"
                class="packge-item"
              >
                <h1 class="packge-item-title">{{ item.productName }}</h1>
                <div
                  v-for="it in item.child"
                  :key="it"
                  class="packge-item-class"
                >
                  <p class="packge-item-class-achitecture">
                    {{ it.productName }}
                  </p>
                  <a
                    v-for="single in it.child"
                    :href="single.url"
                    :key="single"
                    class="packge-item-class-rpm"
                  >
                    {{ single.packageName }}
                  </a>
                </div>
              </div>
            </div>
          </OTabPane>
          <OTabPane
            v-if="detailData?.packageHotpatchList?.length"
            :label="i18n.safetyBulletin.UPDATED_HOT_PATCHES"
          >
            <div class="tab-content">
              <div
                v-for="item in detailData.packageHotpatchList"
                :key="item"
                class="packge-item"
              >
                <h1 class="packge-item-title">{{ item.productName }}</h1>
                <div
                  v-for="it in item.child"
                  :key="it"
                  class="packge-item-class"
                >
                  <p class="packge-item-class-achitecture">
                    {{ it.packageType }}
                  </p>
                  <a
                    v-for="single in it.packageName"
                    :href="it.url"
                    :key="single"
                    class="packge-item-class-rpm"
                  >
                    {{ single }}
                  </a>
                </div>
              </div>
            </div>
          </OTabPane>
        </div>
      </OTabs>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-tabs) {
  .el-tabs__header {
    margin-bottom: 0;
    background-color: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l1);
    z-index: 20;
    @media screen and (max-width: 768px) {
      box-shadow: none;
    }
  }
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    height: 48px;
    @media screen and (max-width: 768px) {
      height: 38px;
      background-color: var(--e-color-bg2);
    }
  }
}
.wrapper {
  max-width: 1504px;
  margin: var(--e-spacing-h2) auto 0;
  background-color: var(--e-color-bg1);
  padding: 0 44px;
  @media screen and (max-width: 768px) {
    margin: 16px 0 0;
    padding: 0;
  }
}
.wrapper1 {
  max-width: 1504px;
  margin: 0 auto var(--e-spacing-h1);
  background-color: var(--e-color-bg1);
  @media screen and (max-width: 768px) {
    margin: 16px 0 40px;
  }
}
.wrapper2 {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 44px;
  background-color: var(--e-color-bg1);
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
}
.breadcrumb {
  color: var(--e-color-text1);
  background: var(--e-color-bg1);
  display: flex;
  margin-bottom: 0;
  @media screen and (max-width: 768px) {
    margin-bottom: var(--e-spacing-h5);
    margin-top: 0;
    padding: 0 var(--e-spacing-h5);
  }
  .last-page {
    font-size: var(--e-font-size-tip);
    font-weight: normal;
    color: var(--e-color-text4);
    line-height: var(--e-line-height-tip);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--e-spacing-h10);
    .o-icon {
      color: var(--e-color-text1);
    }
  }
  .current-page {
    font-size: var(--e-font-size-tip);
    font-weight: 600;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-tip);
  }
}
.bulletin-head {
  padding: var(--e-spacing-h2) var(--e-spacing-h2) var(--e-spacing-h2) 0;
  background: var(--e-color-bg1);
  @media screen and (max-width: 768px) {
    padding: var(--e-spacing-h5);
    margin: 0 var(--e-spacing-h5) var(--e-spacing-h5);
    background: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l1);
  }
  .bulletin-name {
    font-size: var(--e-font-size-h3);
    font-weight: normal;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h3);
    @media screen and (max-width: 768px) {
      line-height: var(--e-line-height-h8);
      font-size: var(--e-font-size-h8);
      font-weight: 300;
      color: var(--e-color-text1);
      margin-bottom: var(--e-spacing-h8);
    }
  }
  .bulletin-intro {
    font-size: var(--e-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-text);
    margin-top: var(--e-spacing-h4);
    & div {
      display: flex;
    }
    span {
      display: inline-block;
      margin-right: var(--e-spacing-h8);
    }
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: var(--e-font-size-tip);
      font-weight: 400;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-tip);
    }
  }
}

.tabs-container {
  .o-tabs {
    .tab-content {
      padding: var(--e-spacing-h2);
      background-color: var(--e-color-bg2);
      & > *:first-child {
        margin-top: 0 !important;
      }
      @media screen and (max-width: 768px) {
        margin: var(--e-spacing-h5) var(--e-spacing-h5) 0;
        padding: var(--e-spacing-h5);
        &-item:last-child {
          margin-bottom: 0;
        }
      }
      &-item {
        margin-bottom: var(--e-spacing-h2);
        @media screen and (max-width: 768px) {
          margin-bottom: var(--e-spacing-h4);
        }
        &:last-child {
          margin-bottom: 0;
        }
        &-title {
          font-size: var(--e-font-size-h5);
          font-weight: 500;
          color: var(--e-color-text1);
          line-height: var(--e-line-height-h5);
          margin-bottom: var(--e-spacing-h5);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
            font-weight: 500;
            line-height: var(--e-line-height-text);
          }
        }
        &-text {
          white-space: pre-wrap;
          text-align: justify;
          font-size: var(--e-font-size-text);
          font-weight: 400;
          color: var(--e-color-text1);
          line-height: var(--e-line-height-text);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-tip);
            font-weight: 400;
            line-height: var(--e-line-height-tip);
          }
          a {
            color: var(--e-color-link1);
          }
        }
        &-link {
          color: var(--e-color-link1);
          font-size: var(--e-font-size-text);
          font-weight: 400;
          line-height: var(--e-line-height-text);
          cursor: pointer;
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-tip);
            font-weight: 400;
            line-height: var(--e-line-height-tip);
          }
        }
        .flex {
          display: flex;
          flex-direction: column;
          + .flex {
            margin-top: 8px;
          }
        }
      }
      .packge-item {
        &:not(:last-child) {
          margin-bottom: 40px;
        }
        &-title {
          margin-bottom: 4px;
          font-size: var(--e-font-size-h5);
          font-weight: 400;
          line-height: var(--e-line-height-h8);
          color: var(--e-color-text1);
        }
        &-class {
          &:last-child {
            margin-bottom: 0;
          }
          &-achitecture {
            color: var(--e-color-text1);
            font-size: var(--e-font-size-h8);
            line-height: var(--e-line-height-h3);
            border-bottom: 1px solid var(--e-color-border1);
          }
          &-rpm {
            display: block;
            line-height: var(--e-line-height-h4);
            font-size: var(--e-font-size-text);
            border-bottom: 1px solid var(--e-color-border1);
            &:last-child {
              border: none;
            }
          }
        }
      }
      .hot-patches-item {
        margin-top: 40px;
        & > .packge-item-title {
          font-size: var(--e-font-size-h4);
          margin-bottom: var(--e-spacing-h3);
        }
      }
    }
  }
}
</style>
