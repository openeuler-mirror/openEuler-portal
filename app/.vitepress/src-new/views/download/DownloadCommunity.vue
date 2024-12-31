<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

import { OTab, OTabPane } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';

import communityVersionData from '~@/data/download/download';

import { useLocale } from '~@/composables/useLocale';

import { getDownloadLink } from '@/api/api-mirror';

import { constructDownloadData } from '@/shared/download';

import DownloadVersionCard from './DownloadVersionCard.vue';
import DownloadArchive from './DownloadArchive.vue';
import { getUrlParam } from '~@/utils/common';

const { locale, t } = useLocale();

const activeTab = ref('latest');
const shownNameList: string[] = [
  'openEuler-24.03-LTS-SP1',
  'openEuler-24.09',
  'openEuler-22.03-LTS-SP4',
];

// 获取版版本数据

const scenario = ref('');

const latestVersions = ref([]);

const localeCommunityVersionData = computed(() => {
  return communityVersionData[locale.value].COMMUNITY_LIST;
});

// 根据版本号查询 下载信息
const queryGetDownloadLink = (version: string, scenario?: string) => {
  getDownloadLink(version).then((res) => {
    const mirrorList = res.MirrorList.sort((a, b) => {
      return b.NetworkBandwidth - a.NetworkBandwidth;
    });
    const versionData = constructDownloadData(res?.FileTree, version, t);

    latestVersions.value.map((item) => {
      if (
        item.latestCommunityVersionData.NAME === version.replaceAll('-', ' ')
      ) {
        item.latestCommunityVersionData.scenario = scenario || '';
        item.mirrorList = mirrorList;
        item.versionData = versionData;
      }
    });
  });
};

// 调用 fetchVersionData 执行任务
const getVersionLocale = (version: string) => {
  const latestCommunityVersionData = localeCommunityVersionData.value.find(
    (item) => item.NAME === version.replaceAll('-', ' ')
  );
  if (!latestCommunityVersionData) {
    return; // 如果没有找到对应数据，返回 null
  }
  latestCommunityVersionData.lts =
    latestCommunityVersionData.NAME.includes('LTS');
  latestVersions.value.push({
    latestCommunityVersionData,
  });
};

shownNameList.forEach((version: string) => {
  getVersionLocale(version);
});

const handleTabChange = (val: string | number | undefined) => {
  if (val === 'archive') {
    history.replaceState(null, '', window.location.pathname + '?archive=true');
  } else {
    history.replaceState(null, '', window.location.pathname);
  }
};

onMounted(() => {
  let hash = window.location.hash;
  hash = hash ? hash.substring(1) : '';

  if (decodeURIComponent(getUrlParam('archive'))) {
    activeTab.value = 'archive';
  }
  shownNameList.forEach((version: string) => {
    scenario.value = '';
    if (decodeURIComponent(hash) === version.replaceAll('-', ' ')) {
      scenario.value = decodeURIComponent(getUrlParam('scenario'));
    }
    queryGetDownloadLink(version, scenario.value);
  });
});
</script>
<template>
  <AppSection class="download-community" :title="$t('download.community')">
    <p class="intro">{{ $t('download.communityIntro') }}</p>
    <OTab
      v-model="activeTab"
      @change="handleTabChange"
      variant="text"
      :line="false"
    >
      <!-- 最新版本 -->

      <OTabPane value="latest" :label="$t('download.latest')">
        <template v-for="(latestVersion, index) in latestVersions" :key="index">
          <DownloadVersionCard
            v-if="latestVersion.versionData?.length"
            :scenario="latestVersion.latestCommunityVersionData.scenario"
            :id="latestVersion.latestCommunityVersionData.NAME"
            :version-data="latestVersion.versionData"
            :mirror-list="latestVersion.mirrorList"
            :content-data="latestVersion.latestCommunityVersionData"
          />
        </template>
      </OTabPane>
      <!-- 历史版本 -->
      <OTabPane value="archive" :label="$t('download.archive')">
        <DownloadArchive
      /></OTabPane>
    </OTab>
  </AppSection>
</template>

<style lang="scss" scoped>
.intro {
  @include text1;
  color: var(--o-color-info2);
  text-align: center;
}
.download-community {
  :deep(.section-wrapper) {
    margin-top: 40px;
    @include respond-to('<=laptop') {
      margin-top: 32px;
    }
    @include respond-to('phone') {
      margin-top: 16px;
    }
  }
  :deep(.section-body) {
    margin-top: 16px;
  }
}
.o-tab {
  margin-top: 32px;
  @include respond-to('<=laptop') {
    margin-top: 16px;
  }
}
</style>
