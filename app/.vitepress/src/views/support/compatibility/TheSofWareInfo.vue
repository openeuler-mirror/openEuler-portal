<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import { AdapterListT } from '@/shared/@types/type-support';
import { getConfigurationInfo, getdetailAapterList } from '@/api/api-security';

import AppContent from '@/components/AppContent.vue';

const { lang } = useData();
const i18n = useI18n();
const router = useRouter();

const configurationInfo: any = ref({});
const detailAapterList = ref<AdapterListT[]>([]);

function goBackPage() {
  const i = router.route.path.lastIndexOf('s');
  router.go(`${router.route.path.substring(0, i)}`);
}

onMounted(() => {
  const i = decodeURIComponent(window.location.href).indexOf('=');
  const id = decodeURIComponent(window.location.href).substring(i + 1);
  getConfigurationInfo(id).then((res: any) => {
    configurationInfo.value = res.result;
  });

  getdetailAapterList(id).then((res: any) => {
    detailAapterList.value = res.result;
  });
});
</script>
<template>
  <AppContent :mobile-top="16">
    <div class="wrapper">
      <div class="banner">
        <div class="breadcrumb" @click="goBackPage">
          {{ i18n.compatibility.COMPATIBILITY }} \
        </div>
        <div class="banner-title">
          {{ configurationInfo.hardwareModel }}
        </div>
      </div>
      <div class="main-top">
        <p class="title">{{ i18n.compatibility.HARDWARE_DETAIL.TITLE_1 }}</p>
        <a
          :href="configurationInfo.friendlyLink"
          class="link"
          target="_blank"
          rel="noopener noreferrer"
          >{{ configurationInfo.friendlyLink }}</a
        >
      </div>
      <div class="main-middle">
        <p class="title">{{ i18n.compatibility.HARDWARE_DETAIL.TITLE_2 }}</p>
        <div class="content">
          <div class="content-box">
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.OS
              }}</span>
              <span class="content-item">{{
                configurationInfo.osVersion
              }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.VENDOR
              }}</span>
              <span class="content-item">{{
                configurationInfo.hardwareFactory
              }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.TEST_TIME
              }}</span>
              <span class="content-item">{{ configurationInfo.date }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.COMMIT_ID
              }}</span>
              <span class="content-item">{{ configurationInfo.commitID }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.ARCHITECTURE
              }}</span>
              <span class="content-item">{{
                configurationInfo.architecture
              }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.MOTHER_BOARD_REVISION
              }}</span>
              <span class="content-item">{{
                configurationInfo.mainboardModel
              }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.BIOS_UEFI
              }}</span>
              <span class="content-item">{{ configurationInfo.biosUefi }}</span>
            </p>
          </div>
          <div class="content-box">
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.CPU
              }}</span>
              <span class="content-item">{{ configurationInfo.cpu }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.RAM
              }}</span>
              <span class="content-item">{{ configurationInfo.ram }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.PORTS_AND_BUS_TYPES
              }}</span>
              <span class="content-item">{{
                configurationInfo.portsBusTypes
              }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.VIDEO_ADAPTER
              }}</span>
              <span class="content-item">{{
                configurationInfo.videoAdapter
              }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.HOST_BUS_ADAPTER
              }}</span>
              <span class="content-item">{{
                configurationInfo.hostBusAdapter
              }}</span>
            </p>
            <p>
              <span class="label">{{
                i18n.compatibility.HARDWARE_DETAIL.LABELS.HARD_DISK_DRIVE
              }}</span>
              <span class="content-item">{{
                configurationInfo.hardDiskDrive
              }}</span>
            </p>
          </div>
        </div>
        <div class="download">
          {{ i18n.compatibility.HARDWARE_DETAIL.TIP_LABEL }}
          <a
            :href="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_HREF"
            :download="
              i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].DOWNLOAD_NAME
            "
            :class="lang === 'en' ? 'download-link-en' : ''"
          >
            {{ i18n.compatibility.HARDWARE_DETAIL.TIP_LINK }}
          </a>
        </div>
      </div>
      <div class="main-bottom">
        <p class="title">{{ i18n.compatibility.HARDWARE_DETAIL.TITLE_3 }}</p>
        <div class="table-pc">
          <OTable :data="detailAapterList" style="width: 100%">
            <OTableColumn
              prop="driverName"
              :label="
                i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_NAME
              "
            ></OTableColumn>
            <OTableColumn
              prop="version"
              :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.VERSION"
            ></OTableColumn>
            <OTableColumn
              prop="type"
              :label="i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.TYPE"
            ></OTableColumn>
            <OTableColumn
              prop="date"
              :label="
                i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_DATE
              "
            ></OTableColumn>
            <OTableColumn
              prop="chipVendor"
              :label="
                i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN
                  .DRIVE_CHIP_VENDOR
              "
            ></OTableColumn>
            <OTableColumn
              prop="boardModel"
              :label="
                i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN
                  .DRIVE_BOARD_MODEL
              "
            ></OTableColumn>
            <OTableColumn
              prop="chipModel"
              :label="
                i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.DRIVE_CHIP_MODEL
              "
            ></OTableColumn
          ></OTable>
        </div>

        <div class="table-mobile">
          <ul class="mobile-list">
            <li v-for="item in detailAapterList" :key="item.id" class="item">
              <ul>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN
                        .DRIVE_NAME
                    }}:</span
                  >{{ item.driverName }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.VERSION
                    }}:</span
                  >{{ item.version }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN.TYPE
                    }}:</span
                  >{{ item.type }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN
                        .DRIVE_DATE
                    }}:</span
                  >{{ item.date }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN
                        .DRIVE_CHIP_VENDOR
                    }}:</span
                  >{{ item.chipVendor }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN
                        .DRIVE_BOARD_MODEL
                    }}:</span
                  >{{ item.boardModel }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_DETAIL.TABLE_CULUMN
                        .DRIVE_CHIP_MODEL
                    }}:</span
                  >{{ item.chipModel }}
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="download">
          {{ i18n.compatibility.HARDWARE_DETAIL.TIP_LABEL }}
          <a
            :href="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_HREF"
            :download="
              i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].DOWNLOAD_NAME
            "
            :class="lang === 'en' ? 'download-link-en' : ''"
          >
            {{ i18n.compatibility.HARDWARE_DETAIL.TIP_LINK }}
          </a>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.wrapper {
  // max-width: 1504px;
  // margin: 0 auto;
  padding: var(--o-spacing-h2);
  // margin-top: var(--o-spacing-h2);
  background-color: var(--o-color-bg2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
  }
}
.banner {
  margin: 0 auto;
  .breadcrumb {
    margin-bottom: var(--o-spacing-h5);
    font-size: var(--o-font-size-h6);
    color: var(--o-color-link1);
    line-height: var(--o-line-height-h5);
    cursor: pointer;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      font-size: var(--o-font-size-h8);
      margin-bottom: var(--o-spacing-h6);
    }
  }
  .banner-title {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    margin-bottom: var(--o-spacing-h1);
    color: var(--o-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      margin-bottom: var(--o-spacing-h4);
    }
  }
}
.title {
  font-size: var(--o-font-size-h5);
  color: var(--o-color-text1);
  margin-bottom: var(--o-spacing-h5);
  line-height: var(--o-line-height-h5);
  @media screen and (max-width: 768px) {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    margin-bottom: var(--o-spacing-h6);
  }
}
.link {
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
  color: var(--o-color-link1);
  word-break: break-all;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }
}
.download {
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
  color: var(--o-color-text1);
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }
  a {
    color: var(--o-color-link1);
  }
  .download-link-en {
    font-style: italic;
  }
}
.main-middle {
  margin: var(--o-spacing-h4) 0;
  .content {
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
    .content-box {
      width: 46%;
      &:first-child {
        padding-bottom: 0;
      }
      &:last-child {
        padding-top: 0;
      }
      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 16px 0;
      }
      p {
        display: flex;
        align-items: flex-start;
        justify-content: left;
        padding-bottom: var(--o-spacing-h4);
        font-size: var(--o-font-size-text);
        color: var(--o-color-text1);
        @media screen and (max-width: 768px) {
          width: 100%;
          padding-bottom: var(--o-spacing-h6);
          justify-content: space-between;
          span {
            flex: 1;
          }
        }
        .label {
          flex: 3;
          color: var(--o-color-text4);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
        .content-item {
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
          flex: 5;
        }
      }
    }
  }
}
.main-bottom {
  .table-pc {
    margin-bottom: var(--o-spacing-h4);
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .table-mobile {
    display: none;
    margin-bottom: var(--o-spacing-h5);
    box-shadow: var(--o-shadow-l1);
    @media screen and (max-width: 768px) {
      display: block;
    }

    .item {
      padding: var(--o-spacing-h5);
      font-size: var(--o-font-size-tip);
      font-weight: 400;
      color: var(--o-color-neutral8);
      line-height: var(--o-line-height-tip);
      background-color: var(--o-color-bg2);
      &:nth-child(odd) {
        background: var(--o-color-bg4);
      }
      & li {
        margin-bottom: var(--o-spacing-h8);
      }
      li:last-child {
        margin-bottom: 0;
      }
      li:nth-child(2) {
        display: flex;
        span {
          min-width: 30px;
        }
      }
      span {
        color: var(--o-color-text1);
        margin-right: var(--o-spacing-h8);
      }
    }
  }
}
</style>
