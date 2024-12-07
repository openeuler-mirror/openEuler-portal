<script setup lang="ts">
import { computed, onMounted, Ref, ref } from 'vue';
import { useData } from 'vitepress';

import { ElMessage } from 'element-plus';
import { useI18n } from '@/i18n';
import seoConfig from '@/data/common/seo';
import repoData from '@/data/download/repo-size';

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
  const naData = result.filter((item) => {
    return item.continentCode === 'NA';
  });
  naData.unshift({ name: `North America (${naData.length}):`, area: true });
  result = [...asData, ...euData, ...naData];
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
      >
    </p>
    <p class="rsync-tip">
      <span>{{ i18n.download.MIRROR_ALL.CONTENT[2] }}</span>
      <span
        >rsync -av --partial --progress --delete
        rsync://root@repo.openeuler.openatom.cn/openeuler/
        ***(localDirectory)</span
      >
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
            <a
              :href="scope.row.http"
              target="_blank"
              rel="noopener noreferrer"
              >{{ scope.row.name }}</a
            >
          </div>
        </template>
      </el-table-column>
      <OTableColumn
        prop="location"
        :label="i18n.download.MIRROR_ALL.LOCATION"
        min-width="110"
      />
      <el-table-column
        :label="i18n.download.MIRROR_ALL.SPONSOR"
        align="center"
        class-name="center"
        min-width="100"
      >
        <template #default="scope">
          <a
            :href="scope.row.sponsor"
            target="_blank"
            rel="noopener noreferrer"
            class="mirror-list-img"
            ><img :src="scope.row.sponsorLogo"
          /></a>
        </template>
      </el-table-column>
      <el-table-column
        :label="i18n.download.MIRROR_ALL.RSNC"
        class-name="center"
        align="center"
        min-width="90"
      >
        <template #default="scope">
          <span v-if="scope.row.rsnc === '-'">{{ scope.row.rsnc }}</span>
          <IconCpoy
            v-else-if="scope.row.rsnc && scope.row.rsnc != ''"
            class="mirror-list-rsnc"
            @click="handleCopyText(scope.row.rsnc)"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="i18n.download.MIRROR_ALL.FTP"
        class-name="center"
        align="center"
        min-width="80"
      >
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
    <OTable
      class="mirror-pc repo-pc"
      :data="repoData"
      header-cell-class-name="mirror-list-header"
      cell-class-name="mirror-list-row"
      :row-class-name="tableRowClassName"
    >
      <OTableColumn
        prop="release"
        :label="i18n.download.MIRROR_ALL.RELEASE"
        min-width="90"
      />
      <OTableColumn
        prop="size"
        :label="i18n.download.MIRROR_ALL.SIZE"
        min-width="90"
      />
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
            <a :href="item.http" target="_blank" rel="noopener noreferrer">{{
              item.http
            }}</a>
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
    <div class="mirror-mobile repo-mobile">
      <OCard v-for="item in repoData" :key="item.release" class="mirror-card">
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.RELEASE }}
          </div>
          <div class="mirror-card-word">{{ item.release }}</div>
        </div>
        <div class="mirror-card-content">
          <div class="mirror-card-title">
            {{ i18n.download.MIRROR_ALL.SIZE }}
          </div>
          <div class="mirror-card-word">{{ item.size }}</div>
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
:deep(.el-table) {
  .el-table__header .el-table__cell {
    padding: 16px 0;
  }
}

.input-box #use-copy {
  position: absolute;
  opacity: 0;
}
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
.repo-pc {
  margin-top: 40px;
  :deep(.el-table__row:last-child) {
    .cell {
      font-weight: 700;
    }
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
.repo-mobile {
  margin-top: 24px;
}
:deep(.center) {
  .cell {
    display: flex;
    justify-content: center !important;
  }
}
.mirror-card {
  :deep(.el-card__body) {
    padding: var(--e-spacing-h5);
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
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    color: var(--e-color-text4);
    margin-right: var(--e-spacing-h10);
    margin-top: var(--e-spacing-h8);
  }

  &-word {
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

  &-rsnc {
    margin-top: var(--e-spacing-h8);
    width: var(--e-font-size-h8);
    height: var(--e-font-size-h8);
    color: var(--e-color-brand1);
  }
}

.mirror-list {
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
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
        font-weight: 800;
        color: var(--e-color-text1);
      }
    }
  }

  :deep(.mirror-list-header) {
    background: var(--e-color-bg4);
    font-size: var(--e-font-size-h8);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: 54px;
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
  p {
    font-size: var(--e-font-size-h7);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-line-height-h7);
    margin-bottom: 12px;
    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-bottom: var(--e-spacing-h5);
    }
  }
  .rsync-tip {
    margin-bottom: var(--e-spacing-h2);
    span {
      display: block;
      &:last-child {
        margin-top: 8px;
        font-style: italic;
        display: inline-block;
        word-spacing: 4px;
        background-color: var(--e-color-bg4);
      }
    }
  }
  a {
    text-decoration: none;
    color: var(--e-color-brand1);
  }

  .mirror-list-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    img {
      height: 34px;
    }
  }
  .mirror-list-rsnc {
    cursor: pointer;
    color: var(--e-color-brand1);
    display: block;
    width: var(--e-line-height-h8);
    height: var(--e-line-height-h8);
  }
  .mirror-list-ftp {
    cursor: pointer;
    color: var(--e-color-brand1);
    display: block;
    width: var(--e-line-height-h8);
    height: var(--e-line-height-h8);
  }
}
</style>
