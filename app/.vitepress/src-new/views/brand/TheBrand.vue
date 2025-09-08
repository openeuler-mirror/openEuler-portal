<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ORow, OCol, OLink, OIcon, OFigure, ODivider, OButton, OCard } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel3.vue';
import AppSection from '~@/components/AppSection.vue';

import banner from '~@/assets/category/brand/banner.jpg';
import logo from '~@/assets/category/brand/logo.png';
import logoDark from '~@/assets/category/brand/logo-dark.png';
import stratoVirtLogo from '~@/assets/category/brand/StratoVirt-logo.png';
import stratoVirtLogoDark from '~@/assets/category/brand/StratoVirt-logo-dark.png';

import IconBrandPlay from '~icons/brand/icon-brand-play.svg';

import { LOGO_DOWNLOAD, guide, INNOVATION_LOGO_DOWNLOAD, PPT_LIST, PPT_LIST_EN } from '~@/data/brand';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale, t } = useLocale();
const { lePadV, lePad, leLaptop, isPhone } = useScreen();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

// -------------------- 音频播放 --------------------
const audioRef1 = ref(null);
const audioRef2 = ref(null);
function handleMaleClick() {
  audioRef1.value?.play();
}
function handleFamaleClick() {
  audioRef2.value?.play();
}

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 16px';
  } else if (leLaptop.value) {
    return '24px 24px';
  }
  return '32px 32px';
})
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="brand-banner" :title="t('brand.title')" :background-image="banner" />
  <AppSection :title="t('brand.useTitle')" class="use-title">
    <ORow :gap="gap" wrap="wrap">
      <OCol flex="0 0 100%">
        <div class="item-col desc-col">
          <div class="text">{{ t('brand.useDesc') }}</div>
          <div class="text">
            <span>{{ t('brand.desc1') }}</span>
            <OLink color="primary" variant="text" :href="guide" target="_blank" hover-underline>{{ t('brand.guide') }}</OLink>
            <span v-if="locale === 'en'"> and </span>
            <OLink color="primary" variant="text" :href="`/${locale}/other/brand/specification/`" target="_blank" hover-underline>{{ t('brand.specification') }}</OLink>
            <span>{{ t('brand.desc2') }}</span>
          </div>
          <div class="text">
            <span>{{ t('brand.desc3') }}</span>
            <OLink color="primary" variant="text" href="mailto:trademarks@openeuler.sh" target="_blank" hover-underline>trademarks@openeuler.sh</OLink>
          </div>
        </div>
      </OCol>
      <OCol :flex="lePadV ? '0 0 100%' : '0 0 50%'">
        <div class="item-col brand-col">
          <div class="item-text">
            <span class="title">{{ t('brand.brandTitle') }}</span>
            <span class="tip">{{ t('brand.brandTitleTip') }}</span>
          </div>
          <div class="item-text">
            <span class="label">{{ t('brand.titleEn') }}</span>
            <span class="brand-name">{{ t('brand.brandName') }}</span>
            <div class="gender-box">
              <p class="gender-box-item">{{ t('brand.man') }}</p>
              <audio ref="audioRef1" src="/mp3/openEuler-man.m4a"></audio>
              <OIcon @click="handleMaleClick">
                <IconBrandPlay />
              </OIcon>
            </div>
            <div class="gender-box">
              <p class="gender-box-item">{{ t('brand.woman') }}</p>
              <audio ref="audioRef2" src="/mp3/openEuler-woman.m4a"></audio>
              <OIcon @click="handleFamaleClick">
                <IconBrandPlay />
              </OIcon>
            </div>
          </div>
          <div v-if="locale === 'zh'" class="item-text">
            <span class="label">{{ t('brand.titleZh') }}</span>
            <span>{{ t('brand.brandNameZh') }}</span>
          </div>
          <div class="item-text">
            <span class="label">{{ t('brand.logo') }}</span>
            <img :src="isDark ? logoDark : logo" />
          </div>
        </div>
      </OCol>
      <OCol :flex="lePadV ? '0 0 100%' : '0 0 50%'">
        <div class="item-col brand-innovation-col">
          <p class="title">{{ t('brand.brandInnovationTitle') }}</p>
          <div class="innovation-box">
            <div v-if="!isPhone" class="item-text">
              <p>{{ t('brand.innovationName') }}</p>
              <div class="item-bottom">
                <p>{{ t('brand.logo') }}</p>
              </div>
            </div>
            <div class="aTune-img item-img">
              <p>{{ t('brand.aTune') }}</p>
              <div class="item-bottom">
                <OFigure src="/img/other/brand/A-Tune-logo-png.png" />
              </div>
            </div>
            <ODivider direction="v" />
            <div class="stratoVirt-img item-img">
              <p>{{ t('brand.stratoVirt') }}</p>
              <div class="item-bottom">
                <OFigure :src="isDark ? stratoVirtLogoDark : stratoVirtLogo" />
              </div>
            </div>
            <ODivider direction="v" />
            <div class="secGear-img item-img">
              <p>{{ t('brand.secGear') }}</p>
              <div class="item-bottom">
                <OFigure src="/img/other/brand/secGear-logo-png.png" />
              </div>
            </div>
          </div>
        </div>
      </OCol>
    </ORow>
  </AppSection>
  <AppSection :title="t('brand.logoDownloadTitle')" class="download">
    <div class="logo-download">
      <p class="subtitle">{{ t('brand.logoDownload') }}</p>
      <ORow :gap="gap" wrap="wrap">
        <OCol v-for="(item, i) in LOGO_DOWNLOAD" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 33.33%'">
          <div class="card">
            <div class="top" :class="{'top-dark': isDark}">
              <OFigure :src="item.img" />
            </div>
            <p class="title">{{ item.title }}</p>
            <div class="bottom">
              <OButton v-for="btn in item.list" :key="btn.title" color="primary" variant="outline" size="medium" tag="a" :href="btn.url" download>{{ btn.title }}</OButton>
            </div>
          </div>
        </OCol>
      </ORow>
    </div>
    <div class="innovation-download logo-download">
      <p class="subtitle">{{ t('brand.innovationLogoDownload') }}</p>
      <ORow :gap="gap" wrap="wrap">
        <OCol v-for="(item, i) in INNOVATION_LOGO_DOWNLOAD" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 33.33%'">
          <div class="card">
            <div class="top" :class="{'top-dark': isDark}">
              <OFigure :src="item.img" />
            </div>
            <p class="title">{{ item.title }}</p>
            <div class="bottom">
              <OButton v-for="btn in item.list" :key="btn.title" color="primary" variant="outline" size="medium" tag="a" :href="btn.url" download>{{ btn.title }}</OButton>
            </div>
          </div>
        </OCol>
      </ORow>
    </div>
  </AppSection>
  <AppSection :title="t('brand.pptDownload')" class="ppt-download">
    <ORow :gap="gap" wrap="wrap">
      <OCol v-for="(item, i) in locale === 'zh' ? PPT_LIST : PPT_LIST_EN" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 33.33%'">
        <OCard hoverable :title="item.title" :cover="item.img" :href="item.url" download></OCard>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style lang="scss" scoped>
.brand-banner {
  :deep(.wrap) {
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    height: 280px;

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.item-col {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px;
  height: 100%;
  @include text1;
}
.desc-col {
  .text + .text {
    margin-top: 12px;
  }
}
.brand-col {
  .title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
  }
  .tip {
    color: var(--o-color-info4);
    @include tip1;
  }
  .item-text {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    @include text1;

    img {
      width: 32px;
    }
  }
  .item-text + .item-text {
    margin-top: 24px;
  }
  .label {
    font-weight: 500;
    min-width: 64px;
    margin-right: 24px;
  }
  .gender-box {
    display: flex;
    align-items: center;
    .o-icon {
      margin-left: 8px;
      --icon-size: 24px;
      cursor: pointer;
    }
  }
  .gender-box + .gender-box {
    margin-left: 12px;
  }
  .brand-name {
    margin-right: 32px;
  }
}
.brand-innovation-col {
  .title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
  }
  .innovation-box {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    margin-top: 24px;
    padding: 20px 0;
    @include text1;
  }
  .item-text {
    font-weight: 500;
    min-width: 96px;
    margin-right: 62px;
  }
  .item-bottom {
    height: 40px;
    margin-top: 24px;
    display: flex;
    align-items: center;
  }
  .aTune-img {
    .o-figure {
      width: 74px;
    }
  }
  .stratoVirt-img {
    .o-figure {
      width: 32px;
    }
  }
  .secGear-img {
    .o-figure {
      width: 34px;
    }
  }
  .item-img {
    .item-bottom {
      justify-content: center;
    }
  }
  .o-divider {
    height: 48px;
    --o-divider-label-gap: 0 50px;
  }
}

.subtitle {
  color: var(--o-color-info2);
  text-align: center;
  @include h2;
}

.logo-download {
  .o-row {
    margin-top: 16px;
  }
  .card {
    background-color: var(--o-color-fill2);
    border-radius: var(--o-radius-xs);
    padding: 24px;
    height: 100%;
  }
  .top {
    background-color: rgba(237, 237, 240, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
  }
  .top-dark {
    background-color: rgba(193, 196, 201, 1);
  }
  .o-figure {
    width: 160px;
  }
  .o-col {
    &:nth-of-type(2n) {
      .o-figure {
        width: 90px;
      }
    }
    &:nth-of-type(5),
    &:nth-of-type(6) {
      .top {
        background-color: rgba(36, 36, 39, 1);
      }
      .top-dark {
        background-color: rgba(86, 87, 96, 1);
      }
    }
  }
  .title {
    color: var(--o-color-info2);
    margin-top: 22px;
    @include h3;
  }
  .bottom {
    margin-top: 22px;
    display: flex;
    justify-content: space-between;
  }
}
.innovation-download {
  margin-top: 40px;
  .o-col {
    &:nth-of-type(2) {
      .o-figure {
        width: 64px;
      }
    }
    &:nth-of-type(3) {
      .o-figure {
        width: 66px;
      }
    }
  }
  .bottom {
    justify-content: flex-start;
  }
  .o-btn + .o-btn {
    margin-left: 40px;
  }
}
.ppt-download {
  .o-card {
    cursor: pointer;
    --card-content-gap: 0;
  }
}

@include respond-to('laptop') {
  .item-col {
    padding: 24px;
  }
  .brand-innovation-col {
    .item-text {
      margin-right: 48px;
    }
    .aTune-img {
      .o-figure {
        width: 60px;
      }
    }
    .stratoVirt-img {
      .o-figure {
        width: 26px;
      }
    }
    .secGear-img {
      .o-figure {
        width: 28px;
      }
    }
    .o-divider {
      --o-divider-label-gap: 0 32px;
    }
  }
  .innovation-download {
    .o-btn + .o-btn {
      margin-left: 24px;
    }
  }
}
@include respond-to('pad_h') {
  .item-col {
    padding: 16px;
  }
  .logo-download {
    .card {
      padding: 16px;
    }
  }
  .o-btn {
    width: 68px;
    --btn-min-width: 68px;
  }
  .brand-innovation-col {
    .item-text {
      margin-right: 16px;
    }
    .aTune-img {
      .o-figure {
        width: 50px;
      }
    }
    .stratoVirt-img {
      .o-figure {
        width: 22px;
      }
    }
    .secGear-img {
      .o-figure {
        width: 24px;
      }
    }
    .o-divider {
      --o-divider-label-gap: 0 16px;
    }
  }
  .innovation-download {
    .o-btn + .o-btn {
      margin-left: 4px;
    }
  }
}
@include respond-to('<=pad_v') {
  .item-col {
    padding: 12px;
  }
  .logo-download {
    .card {
      padding: 12px;
    }
    .bottom {
      justify-content: flex-start;
      .o-btn + .o-btn {
        margin-left: 12px;
      }
    }
  }
  .brand-innovation-col {
    .innovation-box {
      padding: 0;
      justify-content: space-around;
    }
    .o-divider {
      --o-divider-label-gap: 0 16px;
    }
  }
  .innovation-download {
    .o-btn + .o-btn {
      margin-left: 12px;
    }
  }
}
@include respond-to('phone') {
  .brand-col {
    .item-text {
      &:nth-of-type(1) {
        align-items: flex-start;
        flex-direction: column;
      }
    }
    .label {
      margin-right: 12px;
    }
    .brand-name {
      margin-right: 24px;
    }
  }
}
</style>
