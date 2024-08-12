<script setup lang="ts">
import { onMounted, Ref, ref, computed } from 'vue';

import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import { getAllMailing } from '@/api/api-mailing';
import type { MailingMsgT } from '@/shared/@types/type-mail';

import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/illustrations/mailing.png';
import p1 from '@/assets/category/mailing/p1.png';
import p2 from '@/assets/category/mailing/p2.png';
import p3 from '@/assets/category/mailing/p3.png';
import p4 from '@/assets/category/mailing/p4.png';
import IconSubscribe from '~icons/app/icon-subscribe.svg';

const LEFT_IMG = [p1, p2];
const RIGHT_IMG = [p3, p4];

const i18n = useI18n();
const screenWidth = useWindowResize();

const tableData: Ref<MailingMsgT[]> = ref([]);

onMounted(async () => {
  try {
    tableData.value = await getAllMailing();
  } catch (e: any) {
    throw new Error(e);
  }
});

const isMobile = computed(() => {
  if (screenWidth.value <= 768) {
    return true;
  }
  return false;
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMUNITY"
    :title="i18n.mailing.MAILING_LIST.TITLE"
    :illustration="illustration"
  />
  <AppContent>
    <div class="mail">
      <div class="mail-process-box">
        <div v-if="!isMobile" class="dash-line-box">
          <div class="big-bg"></div>
          <div class="small-bg"></div>
          <div class="big-bg"></div>
        </div>
        <div class="process-box">
          <div
            v-for="(item, index) in i18n.mailing.MAILING_LIST.GUIDE_CONTENT"
            :key="item.LEFT.LEFT_CIRCLE"
            class="mail-card"
          >
            <div class="mail-card-left">
              <div class="mail-card-illustration">
                <img :src="LEFT_IMG[index]" />
              </div>
              <div class="mail-card-text">
                <div class="mail-card-text-circle">
                  <span>{{ item.LEFT.INDEX }}</span>
                </div>
                <div class="mail-card-text">
                  <span v-if="item.LEFT.LEFT_CIRCLE" class="left-title">
                    {{ item.LEFT.LEFT_CIRCLE }}
                  </span>
                  <span class="right-docs" :title="item.LEFT.LEFT_INFO">{{
                    item.LEFT.LEFT_INFO
                  }}</span>
                  <span v-if="item.LEFT.DO_THIS">{{ item.LEFT.DO_THIS }}</span>
                </div>
              </div>
            </div>
            <div
              class="mail-card-right"
              :class="index === 0 ? 'mail-card-right-one' : ''"
            >
              <div class="mail-card-illustration">
                <img :src="RIGHT_IMG[index]" />
              </div>
              <div class="mail-card-text">
                <div class="mail-card-text-circle">
                  <span>{{ item.RIGHT.INDEX }}</span>
                </div>
                <div class="mail-card-text">
                  <span v-if="item.RIGHT.RIGHT_CIRCLE" class="left-title">
                    {{ item.RIGHT.RIGHT_CIRCLE }}
                  </span>
                  <span class="right-docs" :title="item.RIGHT.RIGHT_INFO"
                    >{{ item.RIGHT.RIGHT_INFO }}
                    <a
                      v-if="item.RIGHT.DO_THIS"
                      :href="
                        i18n.mailing.MAILING_LIST.GUIDE_CONTENT[1].RIGHT.LINK
                      "
                    >
                      {{ item.RIGHT.DO_THIS }}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mail-table">
        <OTable :data="tableData">
          <el-table-column
            :width="isMobile ? '' : '180'"
            :label="i18n.mailing.MAILING_LIST.TABLE.NAME_H5"
          >
            <template #default="scope">
              {{ scope.row.display_name }}
            </template>
          </el-table-column>
          <el-table-column
            :width="isMobile ? '120' : '350'"
            :label="
              isMobile
                ? i18n.mailing.MAILING_LIST.TABLE.EMAIL_ADDRESS_MO
                : i18n.mailing.MAILING_LIST.TABLE.EMAIL_ADDRESS
            "
            prop="fqdn_listname"
          >
            <template #default="scope">
              <div class="mail-address">
                <a
                  class="ellipsis"
                  :href="`mailto:${scope.row.fqdn_listname}`"
                  >{{ scope.row.fqdn_listname }}</a
                >
                <a
                  class="subscribe-mail"
                  :href="`https://mailweb.openeuler.org/postorius/lists/${scope.row.fqdn_listname}/`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ i18n.mailing.MAILING_LIST.SUBSCRIBE.BUTTON }}
                </a>
                <a
                  class="subscribe-mail-mo"
                  :href="`https://mailweb.openeuler.org/postorius/lists/${scope.row.fqdn_listname}/`"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <OIcon class="icon">
                    <IconSubscribe />
                  </OIcon>
                </a>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :width="isMobile ? '' : '130'"
            :label="i18n.mailing.MAILING_LIST.TABLE.ARCHIVE_H5"
          >
            <template #default="scope">
              <a
                :href="
                  'https://mailweb.openeuler.org/hyperkitty/list/' +
                  scope.row.display_name.toLowerCase() +
                  '@openeuler.org/'
                "
                target="_blank"
                rel="noopener noreferrer"
              >
                archive
              </a>
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.mailing.MAILING_LIST.TABLE.DESCRIPTION"
            prop="description"
          >
            <template #default="scope">
              <div class="mail-description ellipsis">
                {{ scope.row.description }}
              </div>
            </template>
          </el-table-column>
        </OTable>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.mail {
  margin-top: 22px;
  .mail-process-box {
    position: relative;
  }
  .dash-line-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    width: calc(100% - 300px);
    max-width: 730px;
    left: 25%;
    top: 50px;
    z-index: 3;
    .big-bg {
      margin: auto;
      width: 100%;
      height: 196px;
      border-width: 2px;
      border-style: dashed;
      border-color: var(--e-color-brand1);
      border-bottom: none;
      border-left: none;
    }
    .small-bg {
      margin: auto;
      width: 100%;
      min-height: 102px;
      border-width: 2px;
      border-style: dashed;
      border-color: var(--e-color-brand1);
      border-bottom: none;
      border-right: none;
    }
  }
  .process-box {
    background-color: rgba(255, 255, 255, 0);
    @media (max-width: 768px) {
      margin-top: -22px;
    }
  }
  .mail-card {
    min-height: 204px;
    display: flex;
    align-items: flex-start;
    margin-top: -22px;
    justify-content: space-between;
    background-color: rgba(255, 255, 255, 0);
    @media (max-width: 768px) {
      min-height: 0px;
      display: block;
      margin-top: var(--e-spacing-h5);
    }
    .mail-card-left {
      display: flex;
      min-height: 204px;
      margin-right: 24px;
      z-index: 4;
      @media (max-width: 768px) {
        margin-right: 0px;
        margin-bottom: var(--e-spacing-h5);
        justify-content: center;
        height: fit-content;
        min-height: 0;
      }
    }
    .mail-card-right {
      display: flex;
      margin-top: 100px;
      margin-right: 0px;
      min-height: 204px;
      z-index: 4;
      @media (max-width: 768px) {
        justify-content: center;
        margin-right: 0px;
        margin-top: var(--e-spacing-h5);
        height: fit-content;
        min-height: 0;
      }
    }
    .mail-card-right-one {
      margin-top: 102px;
      z-index: 4;
      @media (max-width: 768px) {
        margin-top: 0px;
      }
    }
    .mail-card-illustration {
      width: 216px;
      background-color: var(--e-color-brand2);
      @media (max-width: 1280px) {
        width: 180px;
      }
      @media (max-width: 1080px) {
        width: 150px;
      }
      img {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 90px;
        object-fit: contain;
        @media (max-width: 1080px) {
          height: 80px;
        }
        @media (max-width: 768px) {
          width: 60px;
        }
      }
    }
    .mail-card-text {
      display: flex;
      align-items: center;
      width: 100%;
      max-width: 456px;
      background-color: var(--e-color-bg2);
      .mail-card-text {
        display: flex;
        height: 78px;
        align-items: center;
        .left-title {
          margin-left: 0;
          font-size: var(--e-font-size-h6);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
          }
        }
        .right-docs {
          margin-left: 0;
          display: -webkit-box;
          text-overflow: ellipsis;
          overflow: hidden;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
      span {
        color: var(--e-color-text1);
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-h8);
        float: left;
        margin: 0 var(--e-spacing-h4) 0 59px;
        bottom: var(--e-spacing-h4);
        @media (max-width: 768px) {
          margin: 0 var(--e-spacing-h6) var(--e-spacing-h10) 30px;
          bottom: var(--e-spacing-h5);

          line-height: var(--e-line-height-tip);
          font-size: var(--e-font-size-tip);
        }
      }
      p {
        color: var(--e-color-brand1);
        cursor: pointer;
        display: inline;
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-h8);
        bottom: var(--e-spacing-h4);
        @media (max-width: 768px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-text);
        }
      }
      .mail-card-text-circle {
        height: 78px;
        width: 78px;
        border: 4px solid var(--e-color-white);
        border-radius: 50%;
        background-color: var(--e-color-kleinblue5);
        position: relative;
        transform: translate(-50%);
        @media (max-width: 768px) {
          flex-shrink: 0;
          height: 38px;
          width: 38px;
          border: 2px solid var(--e-color-white);
          justify-content: center;
        }
        span {
          white-space: nowrap;
          font-size: var(--e-font-size-h5);
          color: var(--e-color-white);
          line-height: var(--e-line-height-h5);
          position: relative;
          top: 50%;
          right: 36%;
          transform: translate(-50%, -50%);
          font-weight: 500;
          @media (max-width: 768px) {
            font-size: var(--e-font-size-text);
            margin: auto;
            left: 50%;
            line-height: var(--e-line-height-text);
          }
        }
      }
    }
  }
}
.mail-table {
  margin-top: var(--e-spacing-h1);
  @media (max-width: 768px) {
    margin-top: var(--e-spacing-h2);
  }
  .mail-address {
    display: flex;
    align-items: center;
    .subscribe-mail {
      cursor: pointer;
      flex-shrink: 0;
      color: var(--e-color-brand1);
      padding: 2px 11px;
      margin-left: 8px;
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      border: 1px solid var(--e-color-brand1);
      &:hover {
        border: 1px solid var(--e-color-brand2);
      }

      @media screen and (max-width: 768px) {
        & {
          display: none;
        }
      }
    }
    .subscribe-mail-mo {
      display: none;
      @media screen and(max-width:768px) {
        display: flex;
      }
    }
  }
}
.ellipsis {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
