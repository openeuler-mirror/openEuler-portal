<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const { lang } = useData();

const i18n = useI18n();

const active = ref(0);

const activeMobile = ref(0);

const handleChangeActive = (index: number) => {
  active.value = index;
  activeMobile.value = index;
};

const handleChangeActiveMobile = (activeNames: any) => {
  if (activeNames !== '') {
    active.value = activeNames;
  }
};

const jumpTo = (path: string) => {
  window.open(path, '_blank');
};
</script>

<template>
  <div class="home-intro">
    <h3>{{ i18n.home.IMG_CAROUSE.TITLE }}</h3>
    <OContainer data-aos="fade-up" class="intro-container" :level-index="1">
      <div class="intro-pc">
        <OCard class="intro-card-pc" shadow="never">
          <div class="intro-content-pc">
            <div class="intro-list-pc">
              <div
                v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST"
                :key="item.TITLE"
                :class="[
                  'intro-title-pc',
                  active === index ? 'active' : '',
                  lang !== 'zh' ? 'intro-title-pc-en' : '',
                ]"
                @click="handleChangeActive(index)"
              >
                {{ item.TITLE }}
              </div>
            </div>
            <div class="intro-img-pc">
              <img
                :src="i18n.home.IMG_CAROUSE.LIST[active]?.IMG_URL"
                alt="openEuler"
              />
            </div>
          </div>
          <div class="intro-button-pc">
            <OButton
              animation
              type="text"
              class="intro-button-item-pc"
              @click="jumpTo(i18n.home.IMG_CAROUSE.TRY_URL)"
            >
              <template #suffixIcon>
                <IconArrowRight class="intro-button-icon-pc"></IconArrowRight>
              </template>
              {{ i18n.home.IMG_CAROUSE.BUTTON }}
            </OButton>
          </div>
        </OCard>
      </div>

      <OCollapse
        v-model="activeMobile"
        class="intro-mobile"
        accordion
        @change="handleChangeActiveMobile"
      >
        <OCollapseItem
          v-for="(item, index) in i18n.home.IMG_CAROUSE.LIST"
          :key="item.TITLE"
          :name="index"
          class="intro-card-mobile"
        >
          <template #title>
            <div class="intro-content-mobile">
              <div class="intro-title-mobile">
                {{ item.TITLE }}
              </div>
            </div>
          </template>
          <div class="intro-img-mobile">
            <img
              :src="i18n.home.IMG_CAROUSE.LIST[index]?.IMG_URL"
              alt="openEuler"
            />
          </div>
        </OCollapseItem>
      </OCollapse>
    </OContainer>
  </div>
</template>

<style lang="scss" scoped>
.home-intro {
  :deep(.el-collapse) {
    border: none;
    background-color: var(--o-color-bg1);
  }
  .intro-container {
    @media screen and (max-width: 1100px) {
      box-shadow: none;
    }
  }
  :deep(.el-collapse-item__content) {
    padding: 0;
  }

  h3 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: var(--o-spacing-h1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
    }
  }

  .intro-mobile {
    margin-top: var(--o-spacing-h5);
    display: none;
    flex-flow: column;
    @media screen and (max-width: 1100px) {
      display: flex;
    }

    .intro-card-mobile {
      &:last-child :deep(.el-collapse-item__header)::after {
        display: none;
      }
      :deep(.el-collapse-item__content) {
        padding: 0px !important;
      }

      :deep(.el-collapse-item__header) {
        position: relative;
        height: 100%;
        padding: var(--o-spacing-h4);
        border: none !important;
        &.is-active {
          &::after {
            opacity: 0;
          }
        }
        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 1px;
          width: calc((100% - 48px));
          transition: all 0.3s;
          background-color: var(--o-color-border2);
        }
        @media (max-width: 768px) {
          padding: var(--o-spacing-h8);
          &::after {
            width: calc((100% - 16px));
          }
        }
      }

      :deep(.el-collapse-item__wrap) {
        margin: var(--o-spacing-h5) 0;
      }
    }

    .intro-content-mobile {
      display: flex;
      flex-flow: row;
    }

    .intro-img-mobile {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .intro-title-mobile {
      cursor: pointer;
      font-size: var(--o-font-size-h5);
      font-weight: 500;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h5);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }

    .intro-icon-mobile {
      font-size: var(--o-font-size-h8);
      color: var(--o-color-text4);
    }
  }
  .intro-pc {
    margin-top: var(--o-spacing-h2);
    display: block;
    @media screen and (max-width: 1100px) {
      display: none;
    }

    .intro-card-pc {
      :deep(.el-card__body) {
        padding: var(--o-spacing-h1) var(--o-spacing-h1) var(--o-spacing-h2);
      }
    }

    .intro-content-pc {
      display: flex;
      flex-flow: row;
      padding-bottom: var(--o-spacing-h2);
      border-bottom: 1px solid var(--o-color-division1);
    }

    .intro-list-pc {
      display: flex;
      flex-flow: column;
      margin-right: var(--o-spacing-h1);
      height: 300px;
      align-items: center;

      :nth-child(3) {
        border-bottom: 0px !important;
        padding-bottom: 0px !important;
      }
    }

    .intro-img-pc {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .intro-title-pc {
      cursor: pointer;
      font-size: var(--o-font-size-h5);
      font-weight: 400;
      text-align: center;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h4);
      border-bottom: 1px solid var(--o-color-division1);
      padding: var(--o-spacing-h4) 0;
      @media screen and (min-width: 1100px) {
        &:hover {
          color: var(--o-color-brand1);
        }
      }
    }
    .active {
      color: var(--o-color-brand1);
    }
    .intro-title-pc-en {
      width: 266px;
    }
    .intro-title-pc:first-child {
      padding-top: 0;
    }
    .intro-button-pc {
      display: flex;
      padding-top: var(--o-spacing-h2);
      justify-content: center;
      align-items: center;
      @media screen and (max-width: 1080px) {
        padding: 20px 0;
        font-size: var(--o-font-size-tip);
      }

      :deep(.o-button) {
        padding: 0;
      }

      .intro-button-icon-pc {
        color: var(--o-color-brand1);
        width: var(--o-font-size-h8);
        height: var(--o-font-size-h8);
      }
    }
  }
}
:deep(.o-collapse) {
  .el-icon-arrow-right {
    font-weight: 700;
    transform: rotate(90deg);
    &::before {
      color: #000;
    }
  }
  .el-icon-arrow-right.is-active {
    transform: rotate(270deg);
  }
  .el-collapse-item__header {
    position: relative;
    border-left: none;
    border-bottom: 1px solid var(--o-color-division1);
  }
}
</style>
