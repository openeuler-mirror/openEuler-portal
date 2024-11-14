<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import { getDownloadLink, getVersionInfo } from '@/api/api-mirror';

import { constructDownloadData } from '@/shared/download';
import { getUrlParam } from '@/shared/utils';
import { getVersionList } from '@/shared/download';

import type { VersionInfoT } from '@/shared/@types/type-download';
import type { DetailedLinkItemT } from '@/shared/@types/type-download';

import DownloadContent from './DownloadContent.vue';
import AppContent from '@/components/AppContent.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const { lang } = useData();

const versionData = ref<DetailedLinkItemT[]>();
const versionList = ref<VersionInfoT[]>();
const scenario = ref('');

const mirrorList = ref();
const activeVersion = ref('');
function handleSelectChange() {
  history.pushState(null, '', `?version=${activeVersion.value}`);
  queryGetDownloadLink(activeVersion.value.replaceAll(' ', '-'));
}

function setversionShownName(version: string) {
  history.pushState(
    null,
    '',
    location.origin + location.pathname + `?version=${version}`
  );
}

const queryGetDownloadLink = (version: string) => {
  versionData.value = [];
  getDownloadLink(version).then((res) => {
    mirrorList.value = res.MirrorList.sort((a, b) => {
      return b.NetworkBandwidth - a.NetworkBandwidth;
    });
    versionData.value = constructDownloadData(res?.FileTree, version, i18n);
  });
};
const queryGetVersionInfo = () => {
  getVersionInfo().then((res) => {
    versionList.value = getVersionList(res.RepoVersion, i18n);
  });
};
onMounted(() => {
  activeVersion.value = decodeURIComponent(getUrlParam('version'));
  scenario.value = decodeURIComponent(getUrlParam('scenario'));
  setversionShownName(activeVersion.value);
  queryGetDownloadLink(activeVersion.value.replaceAll(' ', '-'));
  queryGetVersionInfo();
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
              v-for="itemData in versionList"
              :key="itemData.Version"
              :label="itemData.Version"
              :value="itemData.Version"
            />
          </OSelect>
        </ClientOnly>
      </div>
      <DownloadContent
        :version="activeVersion"
        :version-data="versionData"
        :mirror-list="mirrorList"
        :scenario="scenario"
      />
    </AppContent>
  </div>
</template>
<style lang="scss" scoped>
.download-detail {
  :deep(.bread) {
    .bread-icon {
      color: var(--e-color-text4);
    }
  }
  .bread-icon-detail {
    color: var(--e-color-text1);
    font-size: 16px;
  }
  .next-bread {
    color: var(--e-color-text1);
  }
  .select-box {
    display: flex;
    align-items: center;
    margin-top: var(--e-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h4);
    }
    .lable {
      margin-right: var(--e-spacing-h5);
      color: var(--e-color-text1);
      @media (max-width: 1100px) {
        min-width: 40px;
        margin-right: var(--e-spacing-h6);
        font-size: var(--e-font-size-tip);
      }
    }
    .select-version {
      width: 400px;
    }
  }
  .content-wrap {
    margin-top: var(--e-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h4);
    }
  }
  // .download-tabs {
  //   margin: 0 auto;
  //   background-color: var(--e-color-bg2);
  //   :deep(.el-tabs__nav-scroll) {
  //     display: flex;
  //     justify-content: center;
  //   }
  // }
  // .detail {
  //   p {
  //     font-size: var(--e-font-size-text);
  //     line-height: var(--e-line-height-text);
  //     color: var(--e-color-text1);
  //     @media (max-width: 1100px) {
  //       font-size: var(--e-font-size-tip);
  //       line-height: var(--e-line-height-tip);
  //     }
  //     &.detail-last {
  //       margin-top: var(--e-spacing-h2);
  //       @media (max-width: 1100px) {
  //         margin-top: var(--e-spacing-h4);
  //       }
  //     }
  //   }
  // }
  // .download-content {
  //   margin-top: var(--e-spacing-h4);
  //   @media (max-width: 1100px) {
  //     margin-top: var(--e-spacing-h6);
  //   }
}
</style>
