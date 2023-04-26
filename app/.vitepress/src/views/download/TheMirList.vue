<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useData } from 'vitepress';

import { ElMessage } from 'element-plus';
import { useI18n } from '@/i18n';
import seoConfig from '@/data/common/seo';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import IconCpoy from '~icons/app/icon-copy.svg';
import banner from '@/assets/banner/banner-download.png';
import illustration from '@/assets/illustrations/mirror.png';

import { getAllMirror } from '@/api/api-mirror';

interface MapMsg {
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  http: string;
}
const i18n = useI18n();

interface MirrorMsg {
  name: string;
  location?: string;
  sponsor?: string;
  sponsorLogo?: string;
  http?: string;
  rsnc?: string;
  ftp?: string;
  continentCode?: string;
  netband?: string;
  area?: boolean;
}

const { lang } = useData();
const tableData: Ref<MirrorMsg[]> = ref([]);

const mapData: Ref<MapMsg[]> = ref([]);
const inputRef: Ref<HTMLElement | null> = ref(null);
const initTable = (data: any[]) => {
  let result: MirrorMsg[] = [];
  data.forEach((item) => {
    const itemObj = {
      name: '',
      location: '',
      sponsor: '',
      sponsorLogo: '',
      http: '',
      rsnc: '',
      ftp: '',
      continentCode: '',
      netband: '',
    };
    itemObj.continentCode = item.ContinentCode;
    itemObj.name = item.Name;
    itemObj.location = item.Country ? item.Country : '-';
    itemObj.sponsor = item.SponsorURL ? item.SponsorURL : '-';
    itemObj.sponsorLogo = item.SponsorLogoURL ? item.SponsorLogoURL : '-';
    itemObj.http = item.HttpURL ? item.HttpURL : '-';
    itemObj.rsnc = item.RsyncURL ? item.RsyncURL : '-';
    itemObj.ftp = item.FtpURL ? item.FtpURL : '-';
    itemObj.netband = item.NetworkBandwidth ? item.NetworkBandwidth : '-';
    result.push(itemObj);
  });
  result.sort((a, b) => {
    return (a.name + '').localeCompare(b.name + '');
  });

  const asData = result.filter((item) => {
    return item.continentCode === 'AS';
  });
  asData.unshift({ name: `Asia (${asData.length}):`, area: true });
  const euData = result.filter((item) => {
    return item.continentCode === 'EU';
  });
  euData.unshift({ name: `Europe (${euData.length}):`, area: true });
  result = [...asData, ...euData];
  return result;
};

const initMap = (data: any[]) => {
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

const tableRowClassName = ({ row }: any) => {
  if (row.area) {
    return 'mirror-list-area';
  }
  return '';
};

async function handleCopyText(value: string | undefined) {
  if (!value) return;
  if (inputRef.value) {
    (inputRef.value as HTMLInputElement).value = value;
    (inputRef.value as HTMLInputElement).select();
    document.execCommand('copy');
  }
  ElMessage({
    message: i18n.value.download.COPY_SUCCESS,
    type: 'success',
  });
}

const listData = computed(() => {
  return tableData.value.filter((item) => typeof item.area === 'undefined');
});
onMounted(async () => {
  try {
    const responeData = await getAllMirror();
    tableData.value = initTable(responeData);
    mapData.value = initMap(responeData);
  } catch (e: any) {
    throw new Error(e);
  }
});
</script>

<template>
  <SeoBox :seo-data="seoConfig[lang]?.mirrorList" />
  <BannerLevel2
    :background-image="banner"
    :title="i18n.download.MIRROR_ALL.TITLE"
    :illustration="illustration"
  />
  <AppContent class="mirror-list">
    <p>
      {{ i18n.download.MIRROR_ALL.CONTENT[0] }}
      <a href="mailto:mirrors@openeuler.sh">
        {{ i18n.download.MIRROR_ALL.CONTENT[1] }}</a
      >.
    </p>
    <OTable
      class="mirror-pc"
      :data="tableData"
      header-cell-class-name="mirror-list-header"
      cell-class-name="mirror-list-row"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="name"
        :label="i18n.download.MIRROR_ALL.NAME"
        width="450"
        class-name="mirror-name"
      >
        <template #default="scope">
          <div>
            <a :href="scope.row.http" target="_blank">{{ scope.row.name }}</a>
          </div>
        </template>
      </el-table-column>
      <OTableColumn
        prop="location"
        :label="i18n.download.MIRROR_ALL.LOCATION"
        min-width="100"
      />
      <el-table-column :label="i18n.download.MIRROR_ALL.SPONSOR" min-width="90">
        <template #default="scope">
          <a :href="scope.row.sponsor" target="_blank" class="mirror-list-img"
            ><img :src="scope.row.sponsorLogo" 
          /></a>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.download.MIRROR_ALL.RSNC" min-width="90">
        <template #default="scope">
          <span v-if="scope.row.rsnc === '-'">{{ scope.row.rsnc }}</span>
          <IconCpoy
            v-else-if="scope.row.rsnc && scope.row.rsnc != ''"
            class="mirror-list-rsnc"
            @click="handleCopyText(scope.row.rsnc)"
          />
        </template>
      </el-table-column>
      <el-table-column :label="i18n.download.MIRROR_ALL.FTP" min-width="80">
        <template #default="scope">
          <span v-if="scope.row.ftp === '-'">{{ scope.row.ftp }}</span>
          <IconCpoy
            v-else-if="scope.row.rsnc && scope.row.rsnc != ''"
            class="mirror-list-ftp"
            @click="handleCopyText(scope.row.ftp)"
          />
        </template>
      </el-table-column>
      <OTableColumn
        :label="i18n.download.MIRROR_ALL.Mbs"
        prop="netband"
        width="260"
      >
      </OTableColumn>
    </OTable>

    <div class="mirror-mobile">
      <OCard v-for="item in listData" :key="item.name" class="mirror-card">
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.NAME }}
          </div>
          <div class="mirror-card-word">{{ item.name }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.LOCATION }}
          </div>
          <div class="mirror-card-word">{{ item.location }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.HTTPS }}
          </div>
          <div class="mirror-card-word">{{ item.sponsor }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.SPONSOR }}
          </div>
          <div class="mirror-card-word">
            <a :href="item.http" target="_blank">{{ item.http }}</a>
          </div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.RSNC }}
          </div>
          <div v-if="item.rsnc === '-'" class="mirror-card-word">
            {{ item.rsnc }}
          </div>
          <IconCpoy
            v-else-if="item.rsnc && item.rsnc != ''"
            class="mirror-card-rsnc"
            @click="handleCopyText(item.rsnc)"
          />
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.FTP }}
          </div>
          <div v-if="item.ftp === '-'" class="mirror-card-word">
            {{ item.ftp }}
          </div>
          <IconCpoy
            v-else-if="item.ftp && item.ftp != ''"
            class="mirror-card-rsnc"
            @click="handleCopyText(item.ftp)"
          />
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.Mbs }}
          </div>
          <div class="mirror-card-word">{{ item.netband }}</div>
        </div>
      </OCard>
    </div>
  </AppContent>
  <div class="input-box">
    <!-- 用于复制RSNC的值 -->
    <input id="use-copy" ref="inputRef" type="text" />
  </div>
</template>
<style lang="scss" scoped>
.input-box #use-copy {
  position: absolute;
  opacity: 0;
}
.mirror-map {
  margin-top: var(--o-spacing-h2);
  width: 100%;
  height: 996px;
  box-shadow: var(--o-shadow-l1);
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
    background-color: var(--o-color-bg4);
  }

  display: none;
  @media (max-width: 768px) {
    display: block;
  }
}
.mirror-card {
  :deep(.el-card__body) {
    padding: var(--o-spacing-h5);
    :first-child .mirror-card-title,
    :first-child .mirror-card-word {
      margin-top: 0px;
    }
  }

  &-content {
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  &-title {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text4);
    margin-right: var(--o-spacing-h10);
    margin-top: var(--o-spacing-h8);
  }

  &-word {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-neutral8);
    margin-top: var(--o-spacing-h8);
    a {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h8);
      color: var(--o-color-brand1);
    }
  }

  &-rsnc {
    margin-top: var(--o-spacing-h8);
    width: var(--o-font-size-h8);
    height: var(--o-font-size-h8);
    color: var(--o-color-brand1);
  }
}

.mirror-list {
  :deep(.o-table) {
    .el-table__cell {
      padding: 0 0;
    }
  }
  :deep(.mirror-list-area) {
    .mirror-list-row {
      height: 72px;
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

      a {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        font-weight: 800;
        color: var(--o-color-text1);
      }
    }
  }

  :deep(.mirror-list-header) {
    background: var(--o-color-bg4);
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: 54px;
    padding: 0 !important;
    .cell {
      padding: 0 var(--o-spacing-h6) 0 0;
    }

    &:first-child {
      .cell {
        padding-left: var(--o-spacing-h2);
      }
    }

    &:last-child {
      .cell {
        padding-right: var(--o-spacing-h2);
      }
    }
  }

  :deep(.el-table__cell) {
    padding: 0 0;
  }

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

  :deep(.mirror-list-row) {
    font-size: var(--o-font-size-h8);
    font-weight: 400;
    color: var(--o-color-text1);
    height: 54px;
    border: none;

    &::after {
      content: '';
      width: 100%;
      height: 1px;
      position: relative;
      background-color: var(--o-color-division1);
      margin: 0 auto;
      display: flex;
    }

    .cell {
      height: 54px;
      padding-left: 0px;
      padding-right: var(--o-spacing-h6);
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
        background-color: var(--o-color-division1);
        margin: 0 auto;
        display: flex;
        left: var(--o-spacing-h2);
      }

      .cell {
        padding-left: var(--o-spacing-h2);
      }
    }
    &:last-child {
      &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: relative;
        background-color: var(--o-color-division1);
        margin: 0 auto;
        display: flex;
        right: var(--o-spacing-h2);
      }
      .cell {
        padding-right: var(--o-spacing-h2);
      }
    }
  }
  p {
    font-size: var(--o-font-size-h7);
    font-weight: 400;
    color: var(--o-color-text1);
    margin-bottom: var(--o-spacing-h2);
    line-height: var(--o-line-height-h7);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-bottom: var(--o-spacing-h5);
    }
  }
  a {
    text-decoration: none;
    color: var(--o-color-brand1);
  }

  .mirror-list-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      max-height: 34px;
      max-width: calc(100% - 32px);
    }
  }
  .mirror-list-rsnc {
    cursor: pointer;
    color: var(--o-color-brand1);
    display: block;
    width: var(--o-line-height-h8);
    height: var(--o-line-height-h8);
  }
  .mirror-list-ftp {
    cursor: pointer;
    color: var(--o-color-brand1);
    display: block;
    width: var(--o-line-height-h8);
    height: var(--o-line-height-h8);
  }
}
</style>
