<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import lodash from 'lodash-es';

import { getUrlParam } from '@/shared/utils';
import { DownloadCommunityDataT } from '@/shared/@types/type-download';

import DownloadContent from './DownloadContent.vue';
import AppContent from '@/components/AppContent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const { lang } = useData();
const downloadList: DownloadCommunityDataT[] = lodash.cloneDeep(
  i18n.value.download.COMMUNITY_LIST
);
downloadList.pop();
const activeVersion = ref(downloadList[0].NAME);
function handleSelectChange() {
  history.pushState(null, '', `?version=${activeVersion.value}`);
}
onMounted(() => {
  activeVersion.value = decodeURIComponent(getUrlParam('version'));
});
// 获取版版本数据
</script>
<template>
  <div class="download-detail">
    <AppContent :pc-top="40" :mobile-top="24">
      <BreadCrumbs
        :bread1="i18n.download.OUTSIDE_TITLE"
        :bread2="i18n.download.HISTORY"
        :link1="'/' + lang + '/download/'"
        :link2="'/' + lang + '/download/archive/'"
        class="bread"
      >
        <OIcon class="bread-icon-detail">
          <IconChevronRight />
        </OIcon>
        <span class="next-bread">{{ activeVersion }}</span>
      </BreadCrumbs>
      <div class="select-box">
        <span class="lable">{{ i18n.download.VERSION }}</span>
        <ClientOnly>
          <OSelect
            v-model="activeVersion"
            class="select-version"
            @change="handleSelectChange"
          >
            <OOption
              v-for="itemData in downloadList"
              :key="itemData.NAME"
              :label="itemData.NAME"
              :value="itemData.NAME"
            />
          </OSelect>
        </ClientOnly>
      </div>
      <DownloadContent :version="activeVersion" />
    </AppContent>
  </div>
</template>
<style lang="scss" scoped>
.download-detail {
  :deep(.bread) {
    .bread-icon {
      color: var(--o-color-text4);
    }
  }
  .bread-icon-detail {
    color: var(--o-color-text1);
    font-size: 16px;
  }
  .next-bread {
    color: var(--o-color-text1);
  }
  .select-box {
    display: flex;
    align-items: center;
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h4);
    }
    .lable {
      margin-right: var(--o-spacing-h5);
      color: var(--o-color-text1);
      @media (max-width: 1100px) {
        min-width: 40px;
        margin-right: var(--o-spacing-h6);
        font-size: var(--o-font-size-tip);
      }
    }
    .select-version {
      width: 400px;
    }
  }
  .content-wrap {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h4);
    }
  }
  // .download-tabs {
  //   margin: 0 auto;
  //   background-color: var(--o-color-bg2);
  //   :deep(.el-tabs__nav-scroll) {
  //     display: flex;
  //     justify-content: center;
  //   }
  // }
  // .detail {
  //   p {
  //     font-size: var(--o-font-size-text);
  //     line-height: var(--o-line-height-text);
  //     color: var(--o-color-text1);
  //     @media (max-width: 1100px) {
  //       font-size: var(--o-font-size-tip);
  //       line-height: var(--o-line-height-tip);
  //     }
  //     &.detail-last {
  //       margin-top: var(--o-spacing-h2);
  //       @media (max-width: 1100px) {
  //         margin-top: var(--o-spacing-h4);
  //       }
  //     }
  //   }
  // }
  // .download-content {
  //   margin-top: var(--o-spacing-h4);
  //   @media (max-width: 1100px) {
  //     margin-top: var(--o-spacing-h6);
  //   }
}
</style>
