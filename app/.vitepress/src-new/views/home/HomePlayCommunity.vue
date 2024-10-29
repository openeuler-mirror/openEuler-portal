<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { OButton, OIcon } from '@opensig/opendesign';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { playCommunity, vitalityData } from '~@/data/home/play-community';

import logo from '~@/assets/category/home/play-community/logo.png';
import click from '~@/assets/category/home/play-community/click.png';
import vitality from '~@/assets/category/home/play-community/vitality.svg';
import IconArrowRight from '~icons/app/icon-chevron-right.svg';

const { locale } = useLocale();
const { isPhone } = useScreen();
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
      <div calss="vitality-data">
        <div class="data-item">
          
        </div>
      </div>
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
      height: 48px;
    }
    .click {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(170%, -50%);
      height: 66px;
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
  }
  .play-cards {
    margin-top: 32px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
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
      }
      .card-bottom {
        padding: 32px;
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
        }
      }
    }
  }
}
</style>
