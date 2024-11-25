<script setup lang="ts">
import { ref } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import Honor2022 from './Honor2022.vue';
import Honor2023 from './Honor2023.vue';
import Honor2024 from './Honor2024.vue';

import banner from '@/assets/category/honor/banner.jpg';
import illustration from '@/assets/category/honor/ill.png';
import bgImg from '@/assets/category/honor/bg-right.png';

import IconChecked from '~icons/app/icon-checked.svg';
import IconUnchecked from '~icons/app/icon-unchecked.svg';
import IconRight from '~icons/app/icon-arrow-right.svg';
import honorData from '@/data/honor';

const comMap = new Map([
  ['2022', Honor2022],
  ['2023', Honor2023],
  ['2024', Honor2024],
]);

const activeYear = ref('2024');
const showNumber = ref(-1);
function useClickTab(year: string) {
  activeYear.value = year;
}
function clickBtn(link: string) {
  window.open(link);
}
function clickDetail(index: number) {
  showNumber.value = index;
}
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMUNITY"
    :title="honorData.title"
    :illustration="illustration"
  />
  <ul class="h5-time">
    <li
      v-for="item in honorData.honorList.keys()"
      :key="item"
      :class="activeYear === item ? 'active' : ''"
      @click="useClickTab(item)"
    >
      {{ item }}
    </li>
  </ul>
  <AppContent>
    <div class="honor-time">
      <ul class="o-timeline-list pc-time">
        <li
          v-for="item in honorData.honorList.keys()"
          :key="item"
          class="o-timeline-item"
          :class="activeYear === item ? 'active' : ''"
          @click="useClickTab(item)"
        >
          <p class="o-timeline-day">{{ item }}</p>
          <div class="o-timeline-icon-box">
            <IconChecked
              v-if="activeYear === item"
              class="o-timeline-icon"
            ></IconChecked>
            <IconUnchecked v-else class="o-timeline-icon"></IconUnchecked>
          </div>
        </li>
      </ul>
    </div>
    <div class="content">
      <div class="certificate-box">
        <OCard
          v-for="(item, index) in honorData.honorList.get(activeYear)
            ?.certificateList"
          :key="item.name"
          class="certificate-item"
        >
          <p>{{ item.name }}</p>
          <OButton
            v-if="item.link"
            class="detail-btn"
            type="text"
            animation
            size="nomral"
            @click="clickBtn(item.link)"
          >
            {{ honorData.readNews }}
            <template #suffixIcon>
              <OIcon class="detail-icon">
                <IconRight />
              </OIcon>
            </template>
          </OButton>
          <OButton
            v-if="item?.certificate"
            class="detail-btn"
            type="text"
            animation
            size="nomral"
            @click="clickDetail(index)"
          >
            {{ honorData.viewCertificate }}
            <template #suffixIcon>
              <OIcon class="detail-icon">
                <IconRight />
              </OIcon>
            </template>
          </OButton>
          <img class="bg-right" :src="bgImg" alt="" />
          <div
            v-if="showNumber === index"
            class="certificate"
            @click="clickDetail(-1)"
          >
            <img :class="'img' + index" :src="item.certificate" alt="" />
          </div>
        </OCard>
      </div>
      <component
        :is="comMap.get(activeYear)"
        :honor-data="honorData.honorList.get(activeYear)"
      ></component>
      <p v-show="activeYear === '2022'" class="notice">
        {{ honorData.notice }}
      </p>
      <p v-show="activeYear === '2023'" class="notice">
        {{ honorData.notice2023 }}
      </p>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.honor-time {
  .o-timeline-list {
    max-width: 730px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .o-timeline-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      list-style: none;
      text-align: center;
      cursor: pointer;

      .o-timeline-day {
        font-size: var(--e-font-size-h6);
        color: var(--e-color-text4);
        line-height: var(--e-line-height-h6);
        margin-bottom: var(--e-spacing-h10);
        transition: all 0.2s;
      }
      .o-timeline-icon-box:not(:first-child) {
        position: relative;
        &::after {
          position: absolute;
          width: 200px;
          height: 2px;
          background-color: var(--e-color-neutral11);
          content: '';
          display: block;
          top: 50%;
          left: 0;
          transform: translate(calc(-100% - 2px), -50%);
          z-index: 0;
          @media screen and (max-width: 800px) {
            width: 196px;
          }
        }
      }
      .o-timeline-icon {
        position: relative;
        z-index: 3;
        cursor: pointer;
        width: var(--e-font-size-h5);
        height: var(--e-font-size-h5);
        color: var(--e-color-text4);
        display: inline-block;
        background-color: var(--e-color-bg1);
        transition: all 0.2s;
      }

      &.active .o-timeline-day,
      &.active .o-timeline-icon {
        color: var(--e-color-brand1);
      }
    }
    .o-timeline-item:first-child {
      .o-timeline-icon-box {
        &::after {
          display: none;
        }
      }
    }
  }

  .pc-time {
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.h5-time {
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--e-color-bg2);
    height: 34px;
  }

  li {
    font-size: var(--e-font-size-text);
    line-height: 34px;
    color: var(--e-color-text1);
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: transparent;
    }
  }

  .active {
    color: var(--e-color-brand1);

    &::after {
      background-color: var(--e-color-brand1);
    }
  }
}

.content {
  .certificate-box:not(:empty) {
    margin-top: var(--e-spacing-h3);

    @media (max-width: 768px) {
      margin-top: 0;
    }
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--e-spacing-h4);

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      gap: var(--e-spacing-h5);
    }

    .certificate-item {
      background-image: url(@/assets/category/honor/bg1.png);
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      padding: var(--e-spacing-h2);

      @media (max-width: 768px) {
        padding: var(--e-spacing-h5) var(--e-spacing-h6);
      }

      :deep(.el-card__body) {
        padding: 0;
      }

      p {
        min-height: 52px;
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
        color: var(--e-color-text1);
        font-weight: 500;

        @media (max-width: 768px) {
          max-width: 100%;
          min-height: auto;
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }

      .detail-btn {
        margin-top: 26px;
        padding-left: 0;
        padding-bottom: 0;

        @media (max-width: 768px) {
          margin-top: 24px;
          font-size: var(--e-font-size-text);
          padding-bottom: 0;
          padding-top: 0;
        }

        .detail-icon {
          color: var(--e-color-brand1);
          font-size: 16px;
        }
      }

      .bg-right {
        position: absolute;
        width: 36px;
        right: 0;
        top: 0;

        @media (max-width: 768px) {
          width: 28px;
        }
      }

      .certificate {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 72vh;
          position: relative;

          @media (max-width: 768px) {
            width: 80%;
            height: auto;
          }
        }
      }
    }
  }

  :deep(.award-box) {
    margin-top: var(--e-spacing-h2);
    h2 {
      text-align: center;
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      font-weight: 300;
      color: var(--e-color-text1);

      @media (max-width: 768px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
    }
    .title-2023 {
      margin-top: var(--e-spacing-h2);
      margin-bottom: var(--e-spacing-h3);
    }

    .award-personal {
      margin-top: var(--e-spacing-h3);

      @media (max-width: 768px) {
        margin-top: var(--e-spacing-h6);
      }

      h5 {
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
        color: var(--e-color-text1);
        text-align: center;
        font-weight: 400;

        @media (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }

      .personal-box {
        margin-top: var(--e-spacing-h4);
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: var(--e-spacing-h4);

        @media (max-width: 768px) {
          grid-template-columns: repeat(1, 1fr);
          gap: var(--e-spacing-h5);
        }

        .personal-item {
          width: 100%;
          position: relative;

          :deep(.el-card__body) {
            padding: 0;
          }

          .item-head {
            position: relative;
            background: url(@/assets/category/honor/bg2.png) no-repeat;
            background-size: cover;
            text-align: center;
            padding: var(--e-spacing-h2) 0;

            @media (max-width: 768px) {
              padding: var(--e-spacing-h5) 0;
            }

            .item-img {
              max-width: 122px;
              width: 100%;
              border-radius: 50%;

              @media (max-width: 768px) {
                max-width: 82px;
              }
            }

            .bg-right {
              width: 36px;
              position: absolute;
              top: 0;
              right: 0;

              @media (max-width: 768px) {
                width: 28px;
              }
            }
          }

          .item-body {
            padding: var(--e-spacing-h4);

            @media (max-width: 768px) {
              padding: var(--e-spacing-h5);
            }

            .name {
              font-size: var(--e-font-size-h5);
              line-height: var(--e-line-height-h5);
              color: var(--e-color-text1);
              font-weight: 400;
              text-align: center;
              margin-bottom: var(--e-spacing-h5);

              @media (max-width: 768px) {
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
                margin-bottom: var(--e-spacing-h8);
              }
            }

            .post {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              color: var(--e-color-text4);
              font-weight: normal;
              text-align: center;
              @media (max-width: 768px) {
                font-size: var(--e-font-size-tip);
                line-height: var(--e-line-height-tip);
              }
            }
          }
          .personal-hover {
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            width: 100%;
            height: 100%;
            padding: var(--e-spacing-h4);
            transition: all 0.2s;
            word-wrap: break-word;
            background-color: var(--e-color-brand1);
            z-index: 9;
            @media (max-width: 768px) {
              padding: var(--e-spacing-h5);
            }
            .name {
              font-size: var(--e-font-size-h5);
              line-height: var(--e-line-height-h5);
              color: #fff;
              text-align: center;
              font-weight: 400;
              @media (max-width: 768px) {
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
              }
            }
            .detail {
              margin-top: var(--e-spacing-h5);
              overflow-y: scroll;
              max-height: calc(100% - 48px);
              @media (max-width: 768px) {
                margin-top: var(--e-spacing-h8);
              }
              &::-webkit-scrollbar-track {
                border-radius: 4px;
                background-color: var(--e-color-bg2);
                background-color: var(--e-color-brand1);
              }

              &::-webkit-scrollbar {
                width: 6px;
                background-color: var(--e-color-brand1);
              }

              &::-webkit-scrollbar-thumb {
                border-radius: 4px;
                background: var(--e-color-division1);
              }
              p {
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
                color: #fff;
                @media (max-width: 768px) {
                  font-size: var(--e-font-size-tip);
                  line-height: var(--e-line-height-tip);
                }
              }
            }
          }
          &:hover {
            .personal-hover {
              display: block;
              opacity: 0.7;
            }
            .item-body {
              opacity: 0.5;
            }
          }
        }
      }
    }
    .award-team {
      margin-top: var(--e-spacing-h3);
      h5 {
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
        color: var(--e-color-text1);
        text-align: center;
        font-weight: 400;
        @media (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      .team-card-box {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--e-spacing-h4);
        @media (max-width: 1600px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 768px) {
          grid-template-columns: repeat(1, 1fr);
        }
        .team-box {
          .team-item {
            height: max-content;
            min-height: 324px;
            @media (max-width: 1400px) {
              min-height: 390px;
            }
            @media (max-width: 768px) {
              min-height: 200px;
            }
            .bg-right {
              display: block;
              width: 36px;
              position: absolute;
              top: 0;
              right: 0;

              @media (max-width: 768px) {
                width: 28px;
              }
            }
            background: url(@/assets/category/honor/bg1.png) no-repeat;
          }
        }
      }
      .team-box {
        margin-top: var(--e-spacing-h4);
        @media (max-width: 768px) {
          margin-top: 0;
        }
        .team-item {
          width: 100%;
          background: url(@/assets/category/honor/bg3.png) no-repeat;
          background-size: 100% 100%;
          position: relative;
          min-height: 242px;
          position: relative;
          padding: var(--e-spacing-h2);
          @media (max-width: 768px) {
            background: url(@/assets/category/honor/bg3-mobild.png) no-repeat;
            background-size: cover;
            padding: var(--e-spacing-h5) var(--e-spacing-h6);
            min-height: auto;
          }
          :deep(.el-card__body) {
            padding: 0;
          }
          .name {
            font-size: var(--e-font-size-h7);
            line-height: var(--e-line-height-h7);
            color: var(--e-color-text1);
            font-weight: 500;
            @media (max-width: 768px) {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
            }
          }
          .detail {
            margin-top: 2px;
            @media (max-width: 768px) {
              margin-top: 8px;
            }
            p {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              color: var(--e-color-text4);
              font-weight: 400;
              @media (max-width: 768px) {
                font-size: var(--e-font-size-tip);
                line-height: var(--e-line-height-tip);
              }
            }
            &::after {
              content: '';
              display: block;
              width: 100%;
              height: 40px;
            }
          }
          .address-btn {
            position: absolute;
            bottom: 40px;
            padding-left: 0;
            padding-bottom: 0;
            @media (max-width: 768px) {
              font-size: var(--e-font-size-text);
              bottom: 12px;
            }
            .address-icon {
              color: var(--e-color-brand1);
              font-size: 16px;
            }
          }
          & + .team-item {
            margin-top: var(--e-spacing-h4);
          }
          img {
            display: none;
            @media (max-width: 768px) {
              display: inline-block;
              width: 28px;
              position: absolute;
              top: 0;
              right: 0;
            }
          }
        }
        .team-2023 {
          min-height: 180px;
        }
      }
      .team-box:first-child {
        @media (max-width: 768px) {
          margin-top: var(--e-spacing-h6);
        }
      }
    }
  }
}
:deep(.notice) {
  margin-top: var(--e-spacing-h3);
  font-size: var(--e-font-size-tip);
  line-height: var(--e-line-height-tip);
  color: var(--e-color-text1);
  width: 100%;
  @media (max-width: 768px) {
    margin-top: var(--e-spacing-h5);
  }
}
.dark {
  .content {
    .certificate-box .certificate-item {
      background-image: url(/.vitepress/src/assets/category/honor/bg1-dark-mobile.png) !important;
      background-size: 100% 100%;
      @media (max-width: 768px) {
        background-image: url(/.vitepress/src/assets/category/honor/bg1-dark-mobile.png);
        background-size: cover;
      }
    }
    :deep(.award-box) {
      .award-personal .personal-box .personal-item .item-head {
        background-image: url(/.vitepress/src/assets/category/honor/bg2-dark.png);
        @media (max-width: 768px) {
          background-image: url(/.vitepress/src/assets/category/honor/bg2-dark-mobile.png);
        }
      }
      .award-team .team-box .team-item {
        background-image: url(/.vitepress/src/assets/category/honor/bg3-dark.png);
      }
      img {
        filter: brightness(80%) grayscale(20%) contrast(1.2);
      }
    }
  }
}
</style>
