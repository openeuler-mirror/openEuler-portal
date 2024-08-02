<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from '@/i18n';

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
  'openEuler 22.03 LTS SP4',
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

const versionShownName = ref(shownNameList[shownIndex]);
function setversionShownName(version: string) {
  versionShownName.value = version;
  history.pushState(
    null,
    '',
    location.origin + location.pathname + `?version=${version}`
  );
}
onMounted(() => {
  watch(
    () => versionShownName.value,
    () => {
      const urlVersion = decodeURIComponent(getUrlParam('version'));
      if (!urlVersion) {
        setversionShownName(shownNameList[0]);
      } else {
        if (shownNameList.includes(urlVersion)) {
          versionShownName.value = urlVersion;
        } else {
          router.go(`/${lang.value}/download/archive/`);
        }
      }
    },
    { immediate: true }
  );
});

onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      const scenario = getUrlParam('scenario');
      if (scenario && screenWidth.value > 1100) {
        window.scrollTo(0, 200);
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
            @click="setversionShownName(item)"
          >
            {{ item }}
          </div>
        </div>
        <DownloadContent :version="versionShownName" />
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.download-community {
  .detail {
    p {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--o-color-text1);
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
  }
  .download-content {
    margin-top: var(--o-spacing-h4);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h6);
    }
    .content-selection {
      display: flex;
      .selection-item {
        flex-grow: 1;
        text-align: center;
        background-color: var(--o-color-bg2);
        border: 1px solid var(--o-color-border2);
        color: var(--o-color-text1);
        font-size: var(--o-font-size-h8);
        line-height: 40px;
        cursor: pointer;
        @media (max-width: 1100px) {
          width: 50%;
          font-size: var(--o-font-size-text);
          line-height: 22px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        &.active {
          background-color: var(--o-color-brand1);
          border: 1px solid var(--o-color-brand1);
          color: var(--o-color-white);
        }
      }
    }
  }
}
</style>
