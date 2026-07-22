<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { OBreadcrumb, OBreadcrumbItem, OTable, OLink, OScroller } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import { AdapterListT } from '~@/@types/type-support';

import { getConfigurationInfo, getdetailAapterList } from '~@/api/api-security';

import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const route = useRoute();
const { t, locale } = useLocale();
const { lePadV } = useScreen();

const configurationInfo: any = ref({});

// Configuration
const tableData = ref();
const columns = [
  { label: t('compatibility.configLabel'), key: 'title', style: 'width: 40%' },
  { label: t('compatibility.infoLabel'), key: 'info', style: 'width: 60%' },
];

// Adapter and Drivers
const adapterTableData = ref<AdapterListT[]>([]);
const columns1 = [
  { label: 'Driver Name', key: 'driverName', style: 'width: 14%' },
  { label: 'Version', key: 'version', style: 'width: 16%' },
  { label: 'Type', key: 'type', style: 'width: 12%' },
  { label: 'Date', key: 'date', style: 'width: 12%' },
  { label: 'Chip Vendor', key: 'chipVendor', style: 'width: 14%' },
  { label: 'Board Model', key: 'boardModel', style: 'width: 16%' },
  { label: 'Chip Model', key: 'chipModel', style: 'width: 16%' },
];

const getDetailData = () => {
  const i = decodeURIComponent(window.location.href).indexOf('=');
  const id = decodeURIComponent(window.location.href).substring(i + 1);

  getConfigurationInfo(id).then((res) => {
    configurationInfo.value = res.result;
    tableData.value = [
      { title: 'OS/OS Version', info: configurationInfo.value.osVersion },
      { title: 'Vendor', info: configurationInfo.value.hardwareFactory },
      { title: 'Test Time', info: configurationInfo.value.date },
      { title: 'Commit ID', info: configurationInfo.value.commitID },
      { title: 'Architecture', info: configurationInfo.value.architecture },
      { title: 'Mainboard Model', info: configurationInfo.value.mainboardModel },
      { title: 'BIOS/UEFI', info: configurationInfo.value.biosUefi },
      { title: 'CPU', info: configurationInfo.value.cpu },
      { title: 'RAM', info: configurationInfo.value.ram },
      { title: 'Ports and Bus Types', info: configurationInfo.value.portsBusTypes },
      { title: 'Video Adapter', info: configurationInfo.value.videoAdapter },
      { title: 'Host Bus Adapter', info: configurationInfo.value.hostBusAdapter },
      { title: 'Hard Disk Drive', info: configurationInfo.value.hardDiskDrive },
    ]
  });

  getdetailAapterList(id).then((res) => {
    adapterTableData.value = res.result;
  });
};

onMounted(() => {
  getDetailData();
});
</script>

<template>
  <ContentWrapper :vertical-padding="['32px', '72px']">
    <OBreadcrumb v-if="!lePadV">
      <OBreadcrumbItem :href="`/${locale}/compatibility`">{{
        t('compatibility.title')
      }}</OBreadcrumbItem>
      <OBreadcrumbItem>{{ configurationInfo.hardwareModel }}</OBreadcrumbItem>
    </OBreadcrumb>
    <div class="banner">
      <p class="title">{{ configurationInfo.hardwareModel }}</p>
      <div class="banner-content">
        <span class="text">{{ t('compatibility.productInfoTitle') }}：</span>
        <OLink
          color="primary"
          variant="text"
          :href="configurationInfo.friendlyLink"
          target="_blank"
          hover-underline
          >{{ configurationInfo.friendlyLink }}</OLink
        >
      </div>
    </div>
    <div class="content">
      <p class="title">Configuration</p>
      <OScroller
        show-type="always"
        size="small"
        disabled-y
      >
        <OTable :columns="columns" :data="tableData" border="row-frame"></OTable>
      </OScroller>
      <div class="tips">
        <span>{{ t('compatibility.tipsText') }}</span>
        <OLink
          color="primary"
          variant="text"
          :href="'https://atomgit.com/src-openeuler/oec-hardware/releases'"
          target="_blank"
          hover-underline
          >{{ t('compatibility.tipsLink') }}</OLink
        >
      </div>
      <p class="title adapter-title">Adapter and Drivers</p>
      <OScroller
        show-type="always"
        size="small"
        disabled-y
      >
        <OTable :columns="columns1" :data="adapterTableData" border="row-frame" class="adapter-table"></OTable>
      </OScroller>
      <div class="tips">
        <span>{{ t('compatibility.tipsText') }}</span>
        <OLink
          color="primary"
          variant="text"
          :href="'https://atomgit.com/src-openeuler/oec-hardware/releases'"
          target="_blank"
          hover-underline
          >{{ t('compatibility.tipsLink') }}</OLink
        >
      </div>
    </div>
  </ContentWrapper>
</template>

<style scoped lang="scss">
.content-wrapper {
  padding-top: 32px;
  padding-bottom: 72px;
}
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
  --breadcrumb-seperator-size: 16px;
}
.banner {
  background-color: var(--o-color-fill2);
  padding: 32px 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 32px;
}
.title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include h2;
}
.banner-content {
  display: flex;
  align-items: flex-start;
  margin-top: 24px;
  color: var(--o-color-info1);
  @include text1;
  .text {
    flex-shrink: 0;
  }
  .o-link {
    word-break: break-all;
  }
}
.content {
  background-color: var(--o-color-fill2);
  padding: 48px 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 32px;
}
.o-scroller {
  margin-top: 16px;
}
:deep(.o-table) {
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
.adapter-table {
  min-width: 850px;
}
.tips {
  margin-top: 16px;
  color: var(--o-color-info2);
  @include text1;
}
.adapter-title {
  margin-top: 48px;
}

@include respond('<=laptop') {
  .content-wrapper {
    padding-bottom: 56px;
  }
  .banner {
    padding: 24px 32px;
  }
  .content {
    padding: 40px 32px;
  }
  .adapter-title {
    margin-top: 40px;
  }
}
@include respond('<=pad') {
  .content-wrapper {
    padding-bottom: 40px;
  }
  .banner {
    padding: 24px;
  }
  .content {
    padding: 32px;
  }
  .adapter-title {
    margin-top: 32px;
  }
}
@include respond('<=pad_v') {
  .content-wrapper {
    padding-top: 24px;
    padding-bottom: 32px;
  }
  .banner {
    padding: 16px;
    margin-top: 0;
  }
  .content {
    padding: 16px;
  }
  .adapter-title {
    margin-top: 24px;
  }
  :deep(.o-table) {
    --table-head-cell-padding: 8px 16px;
    --table-cell-padding: 8px 16px;
    --table-edge-padding: 24px;
  }
}
</style>
