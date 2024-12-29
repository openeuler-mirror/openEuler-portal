<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAllMirror } from '@/api/api-mirror';

import seoConfig from '@/data/common/seo';

import { useLocale } from '~@/composables/useLocale';

import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-download.png';

import MirrorList from './MirrorList.vue';
import MirrorSize from './MirrorSize.vue';
const { locale, t } = useLocale();

// 定义接口
interface MirrorMsg {
  name: string;
  location: string;
  sponsor: string;
  sponsorLogo: string;
  http: string;
  rsnc: string;
  ftp: string;
  continentCode: string;
  netband: string;
  area?: boolean;
}

// 响应式变量
const mirrors = ref<MirrorMsg[]>([]);

// 初始化表格数据
const initTableData = (data: any[]): MirrorMsg[] => {
  const transformedData = data.map((item) => ({
    name: item.Name || '',
    location: item.Country || '-',
    sponsor: item.SponsorURL || '-',
    sponsorLogo: item.SponsorLogoURL || '-',
    http: item.HttpURL || '-',
    rsnc: item.RsyncURL || '-',
    ftp: item.FtpURL || '-',
    continentCode: item.ContinentCode || '-',
    netband: item.NetworkBandwidth || '-',
  }));

  const groupDataByContinent = (continentCode: string, label: string) => {
    const group = transformedData.filter(
      (item) => item.continentCode === continentCode
    );
    return [{ name: `${label} (${group.length}):`, area: true }, ...group];
  };

  return [
    ...groupDataByContinent('AS', 'Asia'),
    ...groupDataByContinent('EU', 'Europe'),
    ...groupDataByContinent('NA', 'North America'),
  ];
};

// 获取镜像数据
onMounted(async () => {
  try {
    const response = await getAllMirror();
    mirrors.value = initTableData(response);
  } catch (error) {
    console.error('Error fetching mirror data:', error);
  }
});
</script>

<template>
  <SeoBox :seo-data="seoConfig[locale]?.mirrorList" />
  <BannerLevel2
    :background-image="banner"
    :title="t('download.MIRROR_ALL_TITLE')"
  />
  <MirrorList />
  <MirrorSize />
</template>
<style lang="scss" scoped>
.banner-level2 {
  @include respond-to('phone') {
    display: none;
  }
}
</style>
