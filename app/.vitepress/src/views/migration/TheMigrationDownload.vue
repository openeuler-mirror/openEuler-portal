<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import seoConfig from '@/data/common/seo';
import { useRouter } from 'vitepress';

import downloadInfoData from '@/data/migration/migration-download';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconDownload from '~icons/app/icon-download.svg';

const { lang } = useData();
const router = useRouter();

interface LinkItem {
  name: string;
  link: string;
}

const downloadInfo = computed(() => {
  return downloadInfoData[lang.value as 'zh' | 'en'];
});

function handleClick(item: LinkItem) {
  if (item.link) {
    if (item.link.includes('http')) {
      window.open(item.link);
    } else {
      router.go(item.link);
    }
  }
}
</script>

<template>
  <SeoBox :seo-data="seoConfig[lang]?.migrationDownload" />
  <div class="migration-download">
    <div class="migration-download-content">
      <div>
        <h2 :id="downloadInfo.name" style="margin-top: 0">
          {{ downloadInfo.name }}
        </h2>

        <p class="download-desc">{{ downloadInfo.description }}</p>

        <OCard
          v-for="item in downloadInfo.versionList"
          :key="item.version"
          shadow="hover"
        >
          <div class="card-box">
            <div class="card-box-left">
              <img
                src="@/assets/illustrations/migration/download-card-left.png"
                alt=""
              />
              <div class="card-info">
                <span class="name">{{ downloadInfo.name }}</span>
                <span class="version">{{ item.version }}</span>
              </div>
            </div>

            <div class="card-box-right">
              <div class="card-btn">
                <OButton
                  v-for="buttons in item.sourceLinks"
                  :key="buttons"
                  animation
                  size="mini"
                  class="home-banner-btn"
                  :class="buttons.softLinks?.length ? 'hover' : ''"
                  @click="buttons.link && handleClick(buttons)"
                >
                  {{ buttons.name }}
                  <ul v-if="buttons.softLinks?.length">
                    <li
                      v-for="buttonItem in buttons.softLinks"
                      :key="buttonItem.link"
                      @click="handleClick(buttonItem)"
                    >
                      {{ buttonItem.name }}
                    </li>
                  </ul>
                  <template #suffixIcon
                    ><OIcon>
                      <component
                        :is="
                          buttons.softLinks?.length
                            ? IconDownload
                            : IconArrowRight
                        "
                      >
                      </component> </OIcon
                  ></template>
                </OButton>
              </div>
              <img
                src="@/assets/illustrations/migration/download-card-right.png"
                alt=""
              />
            </div>
          </div>
        </OCard>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  margin-top: var(--o-spacing-h3);
  overflow: visible;
  .el-card__body {
    padding: 0;
  }
}
.migration-download {
  color: var(--o-color-text1);

  .migration-download-desc {
    color: var(--o-color-text1);
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    font-weight: 300;
    margin-top: 0;
    margin-bottom: var(--o-spacing-h1);
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-bottom: var(--o-spacing-h4);
    }
  }

  h1 {
    font-weight: 300;
    text-align: center;
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    @media screen and (max-width: 768px) {
      margin: 0 0 var(--o-spacing-h4);
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }

  .migration-download-content {
    .download-desc {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text4);
      line-height: var(--o-line-height-text);
    }

    .card-box {
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 1410px) {
        flex-direction: column;
      }
      &-left {
        display: flex;
        align-items: center;
        padding: 23px 0 15px 25px;
        @media screen and (max-width: 440px) {
          padding: 23px 0 15px 20px;
        }
        img {
          width: 109px;
          height: 74px;
          margin-right: var(--o-spacing-h4);
        }

        .card-info {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h5);
          @media screen and (max-width: 1410px) {
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
          }
          .name {
            margin-right: var(--o-spacing-h6);
          }
        }
      }

      &-right {
        display: flex;
        position: relative;
        img {
          width: 123px;
          height: 95px;
          position: absolute;
          right: 2px;
          bottom: 0;
        }
        .card-btn {
          align-self: center;
          margin-right: 120px;
          @media screen and (max-width: 1410px) {
            padding: 15px 0 23px 20px;
            margin-right: 0;
          }

          .o-button {
            position: relative;
            margin-right: var(--o-spacing-h4);
            ul {
              display: none;
              position: absolute;
              top: 15px;
              left: 60%;
              z-index: 1;
              width: 160px;
              padding: var(--o-spacing-h5) 0;
              background-color: var(--o-color-bg2);
              border: 1px solid var(--o-color-brand1);
              @media screen and (max-width: 768px) {
                top: -120px;
              }
              li {
                cursor: pointer;
                display: block;
                margin: 0;
                padding: var(--o-spacing-h8) 0;
                list-style: none;
                text-align: center;
                line-height: var(--o-line-height-h6);
                color: var(--o-color-text1);
              }
              li:hover {
                color: var(--o-color-brand1);
              }
            }
            @media screen and (max-width: 768px) {
              margin-right: 4px;
              margin-bottom: 4px;
            }
            &:last-child {
              margin-right: var(--o-spacing-h3);
              @media screen and (max-width: 440px) {
                margin-right: 5px;
              }
            }
          }
          .hover {
            &:hover {
              :deep(.suffix-icon) {
                transform: none;
              }

              ul {
                display: block;
              }
            }
          }
        }
      }
    }
  }
}
</style>
