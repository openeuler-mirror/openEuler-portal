<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from '@/i18n';

import { getDownloadLink } from '@/api/api-mirror';

import type { DetailedLinkItemT } from '@/shared/@types/type-download';

import { constructDownloadData } from '@/shared/download';

import { getUrlParam } from '@/shared/utils';
import { useRouter, useData } from 'vitepress';

import DownloadContent from './DownloadContent.vue';

import AppContent from '@/components/AppContent.vue';

import useWindowResize from '@/components/hooks/useWindowResize';

const { lang } = useData();
const i18n = useI18n();
const downloadList = i18n.value.download.COMMUNITY_LIST;
const screenWidth = useWindowResize();
const router = useRouter();
const shownNameList: string[] = [
  'openEuler 24.03 LTS',
  'openEuler 24.09',
];
let shownIndex = 0;
function setShownNameList() {
  let ltsIndex = 0;
  let standerIndex = 0;
  for (let i = 0; i < downloadList.length; i++) {
    if (!shownNameList[0] && downloadList[i].LTS) {
      ltsIndex = i;
      shownNameList[0] = downloadList[i].NAME;
    } else if (!shownNameList[1] && !downloadList[i].LTS) {
      standerIndex = i;
      shownNameList[1] = downloadList[i].NAME;
    } else if (shownNameList[0] && shownNameList[1]) {
      if (standerIndex < ltsIndex) {
        shownIndex = 1;
      }
      break;
    }
  }
}
// setShownNameList();
// 获取版版本数据

const versionShownName = ref('');
const scenario = ref('');

const versionTabClick = (version: string) => {
  scenario.value = '';
  setversionShownName(version);
};

function setversionShownName(version: string) {
  versionShownName.value = version;
  history.pushState(
    null,
    '',
    location.origin + location.pathname + `?version=${version}`
  );
  queryGetDownloadLink(versionShownName.value);
}

const versionData = ref<DetailedLinkItemT[]>();
const mirrorList = ref();

// 根据版本号查询 下载信息
const queryGetDownloadLink = (version: string) => {
  versionData.value = [];
  getDownloadLink(version.replaceAll(' ', '-')).then((res) => {
    mirrorList.value = res.MirrorList.sort((a, b) => {
      return b.NetworkBandwidth - a.NetworkBandwidth;
    });
    versionData.value = constructDownloadData(
      res?.FileTree,
      versionShownName.value.replaceAll(' ', '-'),
      i18n
    );
  });
};

onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      scenario.value = getUrlParam('scenario');
      if (scenario.value && screenWidth.value > 1100) {
        window.scrollTo(0, 200);
      }
    },
    { immediate: true }
  );
  watch(
    () => versionShownName.value,
    () => {
      const urlVersion = decodeURIComponent(getUrlParam('version'));
      if (!urlVersion) {
        setversionShownName(shownNameList[0]);
      } else {
        if (shownNameList.includes(urlVersion)) {
          setversionShownName(urlVersion);
        } else {
          router.go(`/${lang.value}/download/archive/`);
        }
      }
    },
    { immediate: true }
  );
});
</script>

<template>
  <AppContent :pc-top="40" :mobile-top="24">
    <div class="download-community">
      <div id="detail-id" class="detail">
        <p>{{ i18n.download.DETAIL1 }}</p>
        <p>
          {{ i18n.download.DETAIL2
          }}<a :href="i18n.download.ARCHIVE_LINK">{{
            i18n.download.CLICK_VIEW
          }}</a>
        </p>
      </div>
      <div class="download-content">
        <div class="content-selection">
          <div
            v-for="item in shownNameList"
            :key="item"
            class="selection-item"
            :class="{ active: versionShownName === item }"
            @click="versionTabClick(item)"
          >
            {{ item }}
          </div>
        </div>
        <DownloadContent
          :version="versionShownName"
          :scenario="scenario"
          :version-data="versionData"
          :mirror-list="mirrorList"
        />
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.download-community {
  .detail {
    p {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-text1);
      @media (max-width: 1100px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
    }
  }
  .download-content {
    margin-top: var(--e-spacing-h4);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h6);
    }
    .content-selection {
      display: flex;
      .selection-item {
        flex-grow: 1;
        text-align: center;
        background-color: var(--e-color-bg2);
        border: 1px solid var(--e-color-border2);
        color: var(--e-color-text1);
        font-size: var(--e-font-size-h8);
        line-height: 40px;
        cursor: pointer;
        @media (max-width: 1100px) {
          width: 50%;
          font-size: var(--e-font-size-text);
          line-height: 22px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &.active {
          background-color: var(--e-color-brand1);
          border: 1px solid var(--e-color-brand1);
          color: var(--e-color-white);
        }
      }
    }
  }
}
</style>
