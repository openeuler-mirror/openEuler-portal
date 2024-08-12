<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from '@/i18n';

import { selectMirror } from '@/api/api-mirror';

import _ from 'lodash-es';
import { getUrlParam } from '@/shared/utils';

import type { DownloadData } from '@/shared/@types/type-download';

import BannerLevel3 from '@/components/BannerLevel3.vue';
// import MapContainer from './MapContainer.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/banner/banner-download.png';

const i18n = useI18n();

const downloadData: DownloadData[] = _.cloneDeep(
  i18n.value.download.COMMUNITY_LIST
);

interface MapMsg {
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  http: string;
}

interface MirrorMsg {
  icon: string;
  name: string;
  url: string;
  country: string;
  continent: string;
  distance: string;
  lng: string;
  lat: string;
}

const mapData: Ref<MapMsg[]> = ref([]);

const tableData: Ref<MirrorMsg[]> = ref([]);

const area: Ref<string> = ref('');

const ipAndAsn: Ref<string[]> = ref([]);

const versionPath: Ref<string[]> = ref([]);

const officeSource: Ref<string> = ref('');

const compare = (temp: any[]) => {
  temp.sort(function (a, b) {
    return a.Distance > b.Distance ? 1 : -1;
  });
  return temp;
};

const initTable = (responeData: any) => {
  if (!responeData) {
    return;
  }
  area.value = responeData.ClientInfo.Country;
  ipAndAsn.value.push(responeData.IP);
  if (responeData.ClientInfo.ASName) {
    const asn =
      responeData.ClientInfo.ASName +
      ' (ASN' +
      responeData.ClientInfo.ASNum +
      ')';
    ipAndAsn.value.push(asn);
  } else if (responeData.ClientInfo.ASNum) {
    const asn = 'ASN' + responeData.ClientInfo.ASNum;
    ipAndAsn.value.push(asn);
  } else {
    return;
  }
  let data = [];
  data = compare(responeData.MirrorList);
  versionPath.value = responeData.FileInfo.Path.slice(1);
  data.forEach((item) => {
    const itemObj = {
      icon: '',
      name: '',
      url: '',
      country: '',
      continent: '',
      distance: '',
      lng: '',
      lat: '',
    };
    itemObj.icon = item.SponsorLogoURL;
    itemObj.name = item.Name;
    itemObj.url = item.HttpURL + versionPath.value;
    itemObj.country = item.Country ? item.Country : '-';
    itemObj.continent = item.ContinentCode;
    itemObj.distance = item.Distance;
    itemObj.lng = item.Longitude;
    itemObj.lat = item.Latitude;
    tableData.value.push(itemObj);
  });
};

const initMap = (data: any[]) => {
  if (!data) {
    return;
  }
  const result: MapMsg[] = [];
  data.forEach((item) => {
    const itemObj: MapMsg = {
      name: '',
      latitude: 0,
      longitude: 0,
      location: '',
      http: '',
    };

    itemObj.name = item.Name;
    itemObj.longitude = item.Longitude;
    itemObj.latitude = item.Latitude;
    itemObj.location = item.Country;
    itemObj.http = item.HttpURL;

    result.push(itemObj);
  });

  return result;
};

const getOfficeSource = (data: DownloadData[], version: string) => {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.GET_ISO_URL && item.GET_ISO_URL.includes(`${version}/`)) {
      return item.GET_ISO_URL;
    }
  }
  return `https://repo.openeuler.org`;
};

onMounted(async () => {
  try {
    const responeData = await selectMirror(getUrlParam('version'));
    initTable(responeData);
    mapData.value = initMap(responeData?.MirrorList) || [];
    officeSource.value = getOfficeSource(downloadData, getUrlParam('version'));
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <BannerLevel3
    :background-image="banner"
    background-text="DOWNLOAD"
    :title="i18n.download.MIRROR_SELECT.TITLE"
  />
  <AppContent class="mirror-select">
    <div v-if="tableData.length" class="mirror-table">
      <p>
        {{ i18n.download.MIRROR_SELECT.CONTENT[0]
        }}<span class="ip">{{ ipAndAsn.length ? ipAndAsn[0] : '' }}</span
        >{{ i18n.download.MIRROR_SELECT.CONTENT[1] }}
        <span class="asn">{{ ipAndAsn.length ? ipAndAsn[1] : '' }}</span
        >{{ i18n.download.MIRROR_SELECT.CONTENT[2]
        }}<span class="area">{{ area }}</span
        >{{ i18n.download.MIRROR_SELECT.CONTENT[3] }}
      </p>
      <OTable
        class="mirror-pc"
        :data="tableData"
        header-cell-class-name="mirror-select-header"
        cell-class-name="mirror-select-row"
      >
        <el-table-column
          type="index"
          :label="i18n.download.MIRROR_SELECT.RANK"
          width="110"
        />
        <el-table-column
          :label="i18n.download.MIRROR_SELECT.NAME"
          min-width="300"
        >
          <template #default="scope">
            <div class="mirror-select-name">
              <img :src="scope.row.icon" class="mirror-select-img" /><span>{{
                scope.row.name
              }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="i18n.download.MIRROR_SELECT.URL"
          min-width="400"
        >
          <template #default="scope">
            <a
              :href="scope.row.url"
              target="_blank"
              rel="noopener noreferrer"
              class="mirror-select-link"
              >{{ scope.row.url }}</a
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="i18n.download.MIRROR_SELECT.COUNTRY"
          prop="country"
          min-width="80"
        />
        <el-table-column
          :label="i18n.download.MIRROR_SELECT.CONTINENT"
          prop="continent"
          min-width="100"
        />
        <el-table-column
          :label="i18n.download.MIRROR_SELECT.DISTANCE"
          prop="distance"
          min-width="160"
        />
      </OTable>
    </div>

    <div class="mirror-mobile">
      <OCard
        v-for="(item, index) in tableData"
        :key="item.name"
        class="mirror-card"
      >
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.RANK }}
          </div>
          <div class="mirror-card-word">{{ index + 1 }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.NAME }}
          </div>
          <img :src="item.icon" alt="" />
          <div class="mirror-card-word">{{ item.name }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.URL }}
          </div>
          <div class="mirror-card-word">
            <a :href="item.url" target="_blank" rel="noopener noreferrer">{{
              item.url
            }}</a>
          </div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.COUNTRY }}
          </div>
          <div class="mirror-card-word">{{ item.country }}</div>
        </div>

        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.CONTINENT }}
          </div>
          <div class="mirror-card-word">{{ item.continent }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_SELECT.DISTANCE }}
          </div>
          <div class="mirror-card-word">{{ item.distance }}</div>
        </div>
      </OCard>
    </div>
    <div class="mirror-official">
      <p v-if="tableData.length" class="tip-title">
        You can also download desired ISO files from our official mirror source
        at:
      </p>
      <p v-else class="tip-title">
        You can download desired ISO files from our official mirror source at:
      </p>
      <div class="official-source">
        <a target="_blank" rel="noopener noreferrer" :href="officeSource">{{
          officeSource
        }}</a>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.mirror-map {
  margin-top: var(--e-spacing-h2);
  width: 100%;
  height: 996px;
  box-shadow: var(--e-shadow-l1);
  @media (max-width: 768px) {
    height: 50vh;
  }
}
.mirror-pc {
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
}
.mirror-mobile {
  > :nth-child(odd) {
    background-color: var(--e-color-bg4);
  }

  display: none;
  @media (max-width: 768px) {
    display: block;
  }
}
.mirror-table {
  margin-bottom: var(--e-spacing-h2);
}
.mirror-card {
  :deep(.el-card__body) {
    padding: var(--e-spacing-h5);
    :first-child .mirror-card-title,
    :first-child .mirror-card-word {
      margin-top: 0px;
    }
  }

  .mirror-card-content {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    img {
      margin-top: var(--e-spacing-h8);
      width: var(--e-line-height-tip);
      margin-right: var(--e-spacing-h10);
    }
  }

  .mirror-card-title {
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    color: var(--e-color-text4);
    margin-right: var(--e-spacing-h10);
    margin-top: var(--e-spacing-h8);
  }

  .mirror-card-word {
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    color: var(--e-color-neutral8);
    margin-top: var(--e-spacing-h8);
    a {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-top: var(--e-spacing-h8);
      color: var(--e-color-brand1);
    }
  }
}
.mirror-select {
  :deep(.el-table__row) {
    &:last-child {
      .mirror-list-row {
        &::after {
          content: '';
          height: 0px;
        }

        &:first-child {
          &::after {
            content: '';
            height: 0px;
          }
        }
        &:last-child {
          &::after {
            content: '';
            height: 0px;
          }
        }
      }
    }
  }

  :deep(.mirror-select-header) {
    background-color: var(--e-color-bg4);
    font-size: var(--e-font-size-h8);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: 54px;
    padding: 0 !important;
    .cell {
      padding: 0 var(--e-spacing-h6) 0 0;
    }

    &:first-child {
      .cell {
        padding-left: var(--e-spacing-h2);
      }
    }

    &:last-child {
      .cell {
        padding-right: var(--e-spacing-h2);
      }
    }
  }

  :deep(.el-table__cell) {
    padding: 0 0;
  }

  :deep(.mirror-select-row) {
    font-size: var(--e-font-size-h8);
    font-weight: 400;
    color: var(--e-color-text1);
    height: 54px;
    border: none;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: relative;
      background-color: var(--e-color-division1);
      margin: 0 auto;
      display: flex;
    }

    .cell {
      height: 54px;
      padding-left: 0px;
      padding-right: var(--e-spacing-h6);
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
    }

    &:first-child {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: relative;
        background-color: var(--e-color-division1);
        margin: 0 auto;
        display: flex;
        left: var(--e-spacing-h2);
      }

      .cell {
        padding-left: var(--e-spacing-h2);
      }
    }
    &:last-child {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: relative;
        background-color: var(--e-color-division1);
        margin: 0 auto;
        display: flex;
        right: var(--e-spacing-h2);
      }
      .cell {
        padding-right: var(--e-spacing-h2);
      }
    }
  }
  @media (max-width: 1100px) {
    padding: var(--e-spacing-h8) var(--e-spacing-h5);
  }
  p {
    font-size: var(--e-font-size-h7);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h7);
    margin-bottom: var(--e-spacing-h2);
    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-bottom: var(--e-spacing-h5);
    }
  }
  a {
    text-decoration: none;
    color: var(--e-color-brand1);
  }

  .mirror-select-name {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    img {
      margin-right: var(--e-spacing-h10);
      width: 24px;
    }
  }
  .mirror-select-rsnc {
    cursor: pointer;
    color: var(--e-color-brand1);
    display: block;
    width: 24px;
    height: 24px;
  }
  .mirror-select-ftp {
    cursor: pointer;
    color: var(--e-color-brand1);
    display: block;
    width: 24px;
    height: 24px;
  }

  .mirror-select-link {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.official-source {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: var(--e-color-bg2);
  padding: 14px 40px;
  box-shadow: var(--e-shadow-l1);
  @media screen and (max-width: 768px) {
    margin-bottom: var(--e-spacing-h4);
    padding: 16px;
    font-size: 12px;
  }
}
</style>
