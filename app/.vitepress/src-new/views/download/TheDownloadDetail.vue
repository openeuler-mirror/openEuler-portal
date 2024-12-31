<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import { useRouter } from 'vitepress';

import { getDownloadLink, getVersionInfo } from '@/api/api-mirror';

import communityVersionData from '~@/data/download/download';

import { constructDownloadData } from '@/shared/download';
import { getUrlParam } from '~@/utils/common';
import { getVersionList } from '@/shared/download';

import type { VersionInfoT } from '@/shared/@types/type-download';
import type { DetailedLinkItemT } from '@/shared/@types/type-download';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';

import DownloadVersionCard from './DownloadVersionCard.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import DownloadDetailFilter from './DownloadDetailFilter.vue';

const { locale, t } = useLocale();
const { lePadV, isPadVToLaptop } = useScreen();
const router = useRouter();

const versionData = ref<DetailedLinkItemT[]>();
const versionList = ref<VersionInfoT[]>();
const versionInfo = ref();
const scenario = ref('');

const mirrorList = ref();
const activeVersion = ref('');

function handleSelectChange() {
  scenario.value = '';
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

// 本地存储版本信息
const localeCommunityVersionData = computed(() => {
  return communityVersionData[locale.value].COMMUNITY_LIST;
});

// ------------------- 根据版本查询下载信息------------------
const queryGetDownloadLink = (version: string) => {
  const localeCommunityVersion = localeCommunityVersionData.value.find(
    (item) => item.NAME === version.replaceAll('-', ' ')
  );
  // 为查询到版本重定向到 归档页面
  if (!localeCommunityVersion) {
    router.go(`/${locale.value}/download/?archive=true`);
    return;
  }
  versionInfo.value = localeCommunityVersion;
  versionData.value = [];
  getDownloadLink(version).then((res) => {
    mirrorList.value = res.MirrorList.sort((a, b) => {
      return b.NetworkBandwidth - a.NetworkBandwidth;
    });
    versionData.value = constructDownloadData(res?.FileTree, version, t);
  });
};
const queryGetVersionInfo = () => {
  getVersionInfo().then((res) => {
    versionList.value = getVersionList(
      res.RepoVersion,
      localeCommunityVersionData.value
    );
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

const breadCrumbs = ref([
  {
    title: t('download.OUTSIDE_TITLE'),
    to: `/${locale.value}/download/`,
  },
  {
    title: t('download.HISTORY'),
    to: `/${locale.value}/download/?archive=true`,
  },
  {
    title: activeVersion,
    to: '',
  },
]);
const verticalPadding = computed(() => {
  if (isPadVToLaptop.value) {
    return ['16px', '40px'];
  } else if (lePadV.value) {
    return ['12px', '32px'];
  } else {
    return ['32px', '72px'];
  }
});
</script>
<template>
  <div class="download-detail">
    <ContentWrapper :vertical-padding="verticalPadding">
      <OBreadcrumb>
        <OBreadcrumbItem
          v-for="breadCrumb in breadCrumbs"
          :title="breadCrumb.title"
        >
          <a :href="breadCrumb.to">
            {{ breadCrumb.title }}
          </a>
        </OBreadcrumbItem>
      </OBreadcrumb>

      <div class="download-detail-content">
        <DownloadDetailFilter
          v-model="activeVersion"
          @update:model-value="handleSelectChange"
          :version-list="versionList"
        />
        <DownloadVersionCard
          class="download-version-card"
          :version-data="versionData"
          :mirror-list="mirrorList"
          :scenario="scenario"
          :content-data="versionInfo"
        />
      </div>
    </ContentWrapper>
  </div>
</template>
<style lang="scss" scoped>
.download-detail {
  .content-wrapper {
    @include respond-to('<=pad_v') {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .download-detail-content {
    display: flex;
    gap: 32px;
    margin-top: 24px;
    @include respond-to('<=laptop') {
      margin-top: 16px;
      gap: 16px;
      flex-direction: column;
    }
    @include respond-to('<=pad_v') {
      margin-top: 0;
    }
  }
  .download-version-card {
    flex: 1;
    margin-top: 0;
    min-height: 592px;
  }
  .o-breadcrumb {
    @include respond-to('<=pad_v') {
      display: none;
    }
  }
}
</style>
