<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { OButton, OIcon } from '@opensig/opendesign';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { playCommunity, vitalityConfig } from '~@/data/home/play-community';

import { getStatistic } from '@/api/api-search';

import logo from '~@/assets/category/home/play-community/logo.png';
import click from '~@/assets/category/home/play-community/click.png';
import vitality from '~@/assets/category/home/play-community/vitality.svg';
import IconArrowRight from '~icons/app/icon-chevron-right.svg';

import { type VitalityValueT } from '~@/@type/type-home';

const { locale } = useLocale();
const { isPhone } = useScreen();

const vitalityData = ref<VitalityValueT>();

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
        <img class="click" :src="click" />
      </template>
    </i18n-t>
    <div class="play-intro">
      <p class="play-intro-text">{{ $t('home.playIntro') }}</p>
      <OButton color="primary" variant="solid">
        {{ $t('home.getOpenEuler') }}
      </OButton>
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
              <OButton color="primary" :size="isPhone ? 'medium' : 'large'">
                {{ card.btn.label }}
              </OButton>
            </a>
            <a
              :href="card.textBtn.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton
                variant="text"
                :size="isPhone ? 'medium' : 'large'"
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
        :href="$t('home.detailsLink')"
        class="vitality-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OButton
          variant="text"
          :size="isPhone ? 'medium' : 'large'"
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
  </div>
</template>

<style lang="scss" scoped>
.home-play-community {
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
      top: 0;
      transform: translate(170%, -50%);
      height: 66px;
      @include respond-to('<=laptop') {
        height: 44px;
      }
      @include respond-to('phone') {
        height: 38px;
      }
    }
  }
  .play-intro {
    position: relative;
    display: flex;
    align-items: flex-start;
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
        margin-left: 24px;
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
    @include respond-to('phone') {
      margin-top: 12px;
      grid-template-columns: repeat(1, 1fr);
      gap: 12px;
    }
    .card-item {
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-xs);
      .card-top {
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding: 54px 32px 44px;
        color: var(--o-color-white);
        @include h1;
        //TODO: 字号对齐
        @include respond-to('<=laptop') {
          padding: 32px 24px;
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
      padding: 12px 16px;
    }
    @include respond-to('phone') {
      flex-direction: column;
      margin-top: 12px;
    }
    .vitality-text {
      display: flex;
      @include h1;
      align-items: center;
      img {
        margin-left: 12px;
        width: 56px;
        @include respond-to('<=laptop') {
          margin-left: 8px;
          width: 40px;
        }
      }
      @include respond-to('phone') {
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
      @include respond-to('phone') {
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
        @include respond-to('phone') {
          padding-left: 16px;
          margin-left: 24px;
          &::before {
            left: -2px;
          }
        }
        .value {
          color: var(--o-color-primary2);
          @include display3;
        }
        .label {
          margin-top: 4px;
          @include text1;
          color: var(--o-color-white);
          @include respond-to('phone') {
            margin-top: 2px;
          }
        }
      }
    }
    .vitality-btn {
      margin: 0 32px 0 40px;
      display: flex;
      align-items: center;
      @include respond-to('<=laptop') {
        margin: 0 12px 0 0;
      }
      @include respond-to('phone') {
        margin: 16px 0 0 0;
      }
    }
  }
}
</style>
