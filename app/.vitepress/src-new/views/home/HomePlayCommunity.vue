<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { OButton, OIcon } from '@opensig/opendesign';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { playCommunity, vitalityConfig } from '~@/data/home/play-community';

import { getStatistic } from '@/api/api-search';

import logo from '~@/assets/category/home/play-community/logo.png';
import floorBg from '~@/assets/category/home/play-community/floor-bg.png';
import cube from '~@/assets/category/home/play-community/floor-element.png';
import click from '~@/assets/category/home/play-community/click.png';
import vitality from '~@/assets/category/home/play-community/vitality.svg';
import IconArrowRight from '~icons/app/icon-chevron-right.svg';

import { type VitalityValueT } from '~@/@type/type-home';

const { locale } = useLocale();
const { lePadV } = useScreen();

const vitalityData = ref<VitalityValueT>();

// const btnSize = computed (() => {
//   if (isPhone.value) {
//     return ['32px', '0'];
//   } else if (lePadV.value) {
//     return ['32px', '0'];
//   } else {
//     return ['0', '0'];
//   }
// })

onMounted(() => {
  getStatistic().then((res) => {
    vitalityData.value = res.data;
  });
});
</script>

<template>
  <div class="home-play-community" data-aos="fade-up">
    <i18n-t class="play-community-title" keypath="home.playCommunity" tag="h3">
      <template #openEuler>
        <img class="logo" :src="logo" />
      </template>
      <template #click>
        <div class="click">
          <img :src="click" />
          <div class="click-bg"></div>
        </div>
      </template>
    </i18n-t>
    <div class="play-intro">
      <p class="play-intro-text">{{ $t('home.playIntro') }}</p>
      <a :href="`/${locale}/download/get-os/`" target="_blank">
        <OButton
          color="primary"
          :size="lePadV ? 'medium' : 'large'"
          variant="solid"
        >
          {{ $t('home.getOpenEuler') }}
        </OButton>
      </a>
    </div>
    <div class="play-cards">
      <div class="card-item" v-for="card in playCommunity[locale]">
        <div class="card-top" :style="{ backgroundImage: `url(${card.bg})` }">
          {{ card.title }}
        </div>
        <div class="card-bottom">
          <p class="card-intro">
            {{ card.intro }}
          </p>
          <div class="btn-box">
            <a :href="card.btn.link" target="_blank" rel="noopener noreferrer">
              <OButton color="primary" :size="lePadV ? 'medium' : 'large'">
                {{ card.btn.label }}
              </OButton>
            </a>
            <a
              v-if="card.textBtn"
              :href="card.textBtn.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton
                variant="text"
                color="primary"
                :size="lePadV ? 'medium' : 'large'"
                :style="{
                  '--btn-padding': 0,
                  '--btn-bg-color-hover': 'transparent',
                  '--btn-bg-color-active': 'transparent',
                }"
              >
                {{ card.textBtn.label }}
                <template #suffix>
                  <OIcon>
                    <IconArrowRight></IconArrowRight>
                  </OIcon>
                </template>
              </OButton>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="vitality">
      <div class="vitality-text">
        <div class="text">
          {{ $t('home.communityVitality') }}
        </div>
        <img :src="vitality" />
      </div>
      <div class="vitality-data">
        <div
          v-for="item in vitalityConfig"
          :key="item.vitalityKey"
          class="data-item"
        >
          <div v-if="vitalityData" class="value">
            {{ vitalityData[item.vitalityKey] }}
          </div>
          <div class="label">
            {{ item.vitalityLabel[locale] }}
          </div>
        </div>
      </div>
      <a
        :href="`https://datastat.openeuler.org/${locale}/overview`"
        class="vitality-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OButton
          variant="text"
          color="primary"
          :size="lePadV ? 'medium' : 'large'"
          :style="{
            '--btn-padding': 0,
            '--btn-color': 'var(--o-color-white)',
            '--btn-color-hover': 'var(--o-color-white)',
            '--btn-bg-color-hover': 'transparent',
            '--btn-bg-color-active': 'transparent',
          }"
        >
          {{ $t('home.viewDetails') }}
          <template #suffix>
            <OIcon>
              <IconArrowRight></IconArrowRight>
            </OIcon>
          </template>
        </OButton>
      </a>
    </div>
    <img class="cube" :src="cube" />
    <img class="floor-bg" :src="floorBg" />
  </div>
</template>

<style lang="scss" scoped>
.home-play-community {
  position: relative;
  z-index: 1;
  .play-community-title {
    position: relative;
    display: flex;
    align-items: center;
    text-align: left;
    width: fit-content;
    .logo {
      padding: 0 16px;
      height: 100%;
      max-height: 48px;
      @include respond-to('<=laptop') {
        height: 32px;
      }
      @include respond-to('phone') {
        height: 24px;
        padding: 0 8px;
      }
    }
    .click {
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateX(calc(100% + 16px));
      img {
        height: 66px;
      }
      .click-bg {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 138px;
        height: 90px;
        background: rgba(255, 238, 201, 0.55);
        filter: blur(50px);
      }
      @include respond-to('<=laptop') {
        img {
          height: 44px;
        }
      }
      @include respond-to('phone') {
        transform: translateX(calc(100% + 12px));
        img {
          height: 38px;
        }
      }
    }
  }
  .play-intro {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-top: 8px;
    color: var(--o-color-info2);
    @include text1;
    border-bottom: 4px solid transparent;
    padding-bottom: 24px;
    border-image: linear-gradient(90deg, #95b2fb 0%, #002fa7 100%) 1;
    @include respond-to('phone') {
      flex-direction: column;
      padding-bottom: 0;
      border: none;
    }
    @include respond-to('<=laptop') {
      .o-btn {
        flex-shrink: 0;
        margin-left: 24px;
      }
    }
    @include respond-to('<=pad_v') {
      .play-intro-text {
        max-width: 480px;
      }
    }

    @include respond-to('phone') {
      .o-btn {
        margin-left: 0;
        margin-top: 12px;
      }
      .play-intro-text {
        margin-top: 12px;
      }
    }
  }

  .play-cards {
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
    @include respond-to('<=laptop') {
      gap: 24px;
    }
    @include respond-to('<=pad_v') {
      gap: 16px;
    }
    @include respond-to('phone') {
      margin-top: 12px;
      grid-template-columns: repeat(1, 1fr);
      gap: 12px;
    }
    .card-item {
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      .card-top {
        font-weight: 500;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 54px 32px 44px;
        color: var(--o-color-white);
        @include h1;
        @include respond-to('<=laptop') {
          padding: 32px 24px;
        }
        @include respond-to('<=pad_v') {
          padding: 24px 16px;
        }
        @include respond-to('phone') {
          padding: 16px 18px;
        }
      }
      .card-bottom {
        padding: 32px;
        @include respond-to('<=laptop') {
          padding: 24px;
        }
        @include respond-to('<=pad_v') {
          padding: 16px;
        }
        @include respond-to('phone') {
          padding: 12px 16px;
        }
        .card-intro {
          @include text1;
          color: var(--o-color-info2);
        }
        .btn-box {
          margin-top: 32px;
          a {
            & + a {
              margin-left: 16px;
            }
          }
          @include respond-to('<=laptop') {
            margin-top: 24px;
          }
          @include respond-to('<=pad_v') {
            margin-top: 16px;
          }
          @include respond-to('phone') {
            margin-top: 12px;
            a {
              & + a {
                margin-left: 12px;
              }
            }
          }
        }
      }
    }
  }
  .vitality {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    padding: 22px 32px;
    width: 100%;
    color: var(--o-color-white);
    background-size: 100% 100%;
    background-image: url(~@/assets/category/home/play-community/vitality-bg_light.png);
    @include respond-to('<=laptop') {
      margin-top: 24px;
    }
    @include respond-to('pad_h') {
      margin-top: 24px;
      padding: 12px 16px;
    }
    @include respond-to('pad_h') {
      margin-top: 24px;
      padding: 12px 16px;
    }
    @include respond-to('<=pad_v') {
      padding: 12px 16px;
      flex-direction: column;
      margin-top: 12px;
    }
    .vitality-text {
      display: flex;
      @include h1;
      align-items: center;
      font-weight: 500;
      img {
        margin-left: 12px;
        width: 56px;
        @include respond-to('<=laptop') {
          margin-left: 8px;
        }
        @include respond-to('pad_h') {
          margin-left: 8px;
          width: 24px;
        }
      }
      @include respond-to('<=pad_v') {
        justify-content: space-between;
        width: 100%;
        img {
          width: 32px;
        }
      }
    }
    .vitality-data {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-around;
      margin-left: 52px;
      @include respond-to('<=laptop') {
        margin-left: 16px;
      }
      @include respond-to('<=pad_v') {
        justify-content: flex-start;
        margin-left: 0;
        margin-top: 12px;
        flex-wrap: wrap;
      }
      .data-item {
        display: block;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          left: -8px;
          width: 2px;
          height: 100%;
          background-image: linear-gradient(
            180deg,
            #4374f2 3%,
            rgba(67, 116, 242, 0.27) 100%
          );
        }
        @include respond-to('<=pad_v') {
          padding-left: 16px;
          margin-left: 24px;
          &:nth-child(1) {
            margin-left: 0;
            padding-left: 0;
            &::before {
              display: none;
            }
          }
          &::before {
            left: -2px;
          }
        }
        @media (min-width: 470px) and (max-width: 520px) {
          &:nth-child(4) {
            margin-right: 46px;
          }
          &:nth-child(5) {
            margin-top: 12px;
          }
          &:nth-child(1),
          &:nth-child(5) {
            margin-left: 0;
            padding-left: 0;
            &::before {
              display: none;
            }
          }
        }
        @media (min-width: 431px) and (max-width: 469px) {
          &:nth-child(4) {
            margin-right: 0;
          }
          &:nth-child(5) {
            margin-top: 12px;
          }
          &:nth-child(1),
          &:nth-child(5) {
            margin-left: 0;
            padding-left: 0;
            &::before {
              display: none;
            }
          }
        }
        @media screen and (max-width: 430px) {
          &:nth-child(4),
          &:nth-child(5) {
            margin-top: 12px;
          }
          &:nth-child(3) {
            margin-right: 50px;
          }
          &:nth-child(4) {
            margin-left: 0;
            padding-left: 0;
            &::before {
              display: none;
            }
          }
        }
        .value {
          color: var(--o-color-primary2);
          @include display3;
        }
        .label {
          margin-top: 4px;
          @include text1;
          color: rgba(255, 255, 255, 0.8);
          @include respond-to('<=pad') {
            margin-top: 2px;
          }
        }
      }
    }
    .vitality-btn {
      margin-left: 32px;
      display: flex;
      align-items: center;
      @include respond-to('<=laptop') {
        margin: 0 0 0 0;
      }
      @include respond-to('<=pad_v') {
        margin: 16px 0 0 0;
      }
    }
  }
  .cube {
    position: absolute;
    top: -47px;
    left: -35px;
    width: 145px;
    z-index: -1;
    @include respond-to('laptop') {
      width: 145px;
      top: -74px;
      left: -30px;
    }
  }
  .floor-bg {
    position: absolute;
    top: -140px;
    left: -185px;
    width: 900px;
    z-index: -1;
    @include respond-to('<=laptop') {
      width: 60%;
      top: -72px;
      left: 0;
    }
  }
}
[data-o-theme='dark'] {
  .click-bg {
    opacity: 0.2;
  }
}
</style>
