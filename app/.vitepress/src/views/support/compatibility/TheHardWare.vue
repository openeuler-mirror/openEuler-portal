<script lang="ts" setup>
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import AppContent from '@/components/AppContent.vue';

const i18n = useI18n();
const router = useRouter();

const { lang } = useData();

function goBackPage() {
  const i = router.route.path.lastIndexOf('h');
  router.go(`${router.route.path.substring(0, i)}`);
}
</script>
<template>
  <AppContent>
    <div class="banner">
      <div class="breadcrumb" @click="goBackPage">
        {{ i18n.compatibility.COMPATIBILITY }} \
      </div>
      <div class="banner-title">
        {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE }}
      </div>
    </div>
    <div v-if="lang === 'en'" class="hardware-content">
      <div class="hardware-content-top">
        <div class="title">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.DISCRIPTION_TITLE }}
        </div>
        <div class="content">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.DISCRIPTION_CONTENT }}
        </div>
      </div>
      <div class="hardware-content-middle">
        <div class="title">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.PROCESS_TITLE }}
        </div>
        <div class="content">
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0]
                    .DESCRIPTION_1
                }}
                <a
                  :href="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].A_TEXT
                  "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[0]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1]
                    .DESCRIPTION_1
                }}
                <a
                  :href="
                    'mailto:' +
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1]
                    .DESCRIPTION_2
                }}
                <p>
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1]
                      .DESCRIPTION_3
                  }}
                  <a
                    :href="
                      i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT2
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{
                      i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[1].A_TEXT2
                    }}
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2]
                    .DESCRIPTION_1
                }}
                <a
                  :href="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].A_HREF
                  "
                  :download="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2]
                      .DOWNLOAD_NAME
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[2].A_TEXT
                  }}
                </a>
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3]
                    .DESCRIPTION_1
                }}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].A_TEXT
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[3]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4]
                    .DESCRIPTION_1
                }}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  :href="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_HREF
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_TEXT_2
                  }}
                </a>
                <!-- {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4]
                    .DESCRIPTION_2
                }} -->
                <!-- <a
                  :href="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_HREF_2
                  "
                  :download="
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4]
                      .DOWNLOAD_NAME
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[4].A_TEXT_2
                  }}
                </a> -->
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5]
                    .DESCRIPTION_1
                }}
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5]
                    .DESCRIPTION_3
                }}
                <a
                  :href="
                    'mailto:' +
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].A_TEXT
                  "
                >
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[5]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
          <div
            v-if="i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6]"
            class="content-item"
          >
            <div class="left">
              {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].ID }}
            </div>
            <div class="right">
              <div class="item-title">
                {{ i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].TITLE }}
              </div>
              <div class="item-content">
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6]
                    .DESCRIPTION_1
                }}
                <a @click="goBackPage">
                  {{
                    i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6].A_TEXT
                  }}
                </a>
                {{
                  i18n.compatibility.HARDWARE_OEC_DETAIL.ITEM_ARR[6]
                    .DESCRIPTION_2
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scope>
.wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: var(--o-spacing-h2) var(--o-spacing-h2) 0;
  @media screen and (max-width: 768px) {
    padding: 0 var(--o-spacing-h5);
  }
}

html[lang='zh'] {
  .banner {
    .banner-title {
      margin-bottom: 0;
    }
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
      font-size: var(--o-font-size-h7);
      font-size: var(--o-font-size-h7);
    }
  }
  .banner-title {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    margin-bottom: var(--o-spacing-h1);
    color: var(--o-color-text1);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      margin-bottom: var(--o-spacing-h2);
    }
  }
}
.hardware-content {
  max-width: 1504px;
  margin: 0 auto;
  color: var(--o-color-text5);
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h7);
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
  }
  a {
    text-decoration: none;
    color: var(--o-color-link1);
    cursor: pointer;
  }
  .hardware-content-top {
    .title {
      font-size: var(--o-font-size-h5);
      color: var(--o-color-text1);
      margin-bottom: var(--o-spacing-h4);
      line-height: var(--o-line-height-h5);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
    }
    .content {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h7);
      color: var(--o-color-text4);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
  }
  .hardware-content-middle {
    margin-top: var(--o-spacing-h2);
    .title {
      font-size: var(--o-font-size-h5);
      color: var(--o-color-text1);
      margin-bottom: var(--o-spacing-h4);
      line-height: var(--o-line-height-h4);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
      }
    }
    .content-item {
      display: flex;
      padding: var(--o-spacing-h3);
      align-items: center;
      justify-content: left;
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h4) 0;
      }
      &:last-child {
        padding-bottom: 0;
        @media screen and (max-width: 768px) {
          padding-bottom: var(--o-spacing-h3);
        }
      }
      .left {
        font-size: var(--o-line-height-h3);
        color: var(--o-color-link1);
        padding-right: var(--o-spacing-h3);
        @media screen and (max-width: 768px) {
          font-size: var(--o-line-height-h4);
          padding-right: var(--o-spacing-h5);
        }
      }
      .right {
        padding-left: var(--o-spacing-h3);
        border-left: 1px solid var(--o-color-border1);
        @media screen and (max-width: 768px) {
          padding-left: var(--o-spacing-h5);
        }
        .item-title {
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          margin-bottom: var(--o-spacing-h6);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-h7);
          }
        }
        .item-content {
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
          word-break: break-all;
          color: var(--o-color-text4);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-tip);
          }
        }
      }
    }
  }
}
</style>
