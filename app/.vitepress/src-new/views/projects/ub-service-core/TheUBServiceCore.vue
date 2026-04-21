<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vitepress';
import { OFigure, ORow, OCol, OLink, OIcon, ODivider, OTag } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';
import DropButton from './DropButton.vue';

import banner from '~@/assets/category/ub-service-core/banner.jpg';

import frameworkBgImg from '~@/assets/category/ub-service-core/framework-bg.png';
import frameworkImg from '~@/assets/category/ub-service-core/framework.jpg';
import frameworkImgEn from '~@/assets/category/ub-service-core/framework-en.jpg';

import IconOutLink from '~icons/yuanrong/icon-outlink.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import type { LocaleT } from '~@/@types/type-locale';

import { ubEntranceList, ubServiceCoreUrl } from '~@/data/project';

const { locale, t } = useLocale();
const { lePadV } = useScreen();
const router = useRouter();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const frameworkList = [
  {
    title: t('ubServiceCore.engine'),
    desc: t('ubServiceCore.engineDesc'),
    tag: t('ubServiceCore.already'),
    class: 'already',
  },
  {
    title: t('ubServiceCore.virt'),
    desc: t('ubServiceCore.virtDesc'),
    tag: t('ubServiceCore.plan'),
    class: 'plan',
  },
  {
    title: t('ubServiceCore.mem'),
    desc: t('ubServiceCore.memDesc'),
    tag: t('ubServiceCore.plan'),
    class: 'plan',
  },
  {
    title: t('ubServiceCore.comm'),
    desc: t('ubServiceCore.commDesc'),
    tag: t('ubServiceCore.already'),
    class: 'already',
  },
  {
    title: t('ubServiceCore.io'),
    desc: t('ubServiceCore.ioDesc'),
    tag: t('ubServiceCore.plan'),
    class: 'plan',
  },
]

const viewWhitepaper = (lang: LocaleT) => {
  router.go(ubServiceCoreUrl[`whitepaper_${lang}`]);
}
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="ub-service-core-banner" :title="t('ubServiceCore.title')" :subtitle="t('ubServiceCore.subtitle')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('ubServiceCore.title') }}</p>
    <p class="mo-subtitle">{{ t('ubServiceCore.subtitle') }}</p>
  </div>
  <AppSection :title="t('ubServiceCore.introTitle')" class="introduction">
    <div class="intro-desc">{{ t('ubServiceCore.introDesc') }}</div>
  </AppSection>
  <AppSection :title="t('ubServiceCore.frameworkTitle')" :subtitle="t('ubServiceCore.frameworkDesc')" class="framework">
    <div class="framework-content" :class="{'framework-content-dark': isDark}">
      <div class="framework-bg-img" :style="{ backgroundImage: `url(${frameworkBgImg})` }"></div>
      <OFigure v-if="lePadV" :src="locale ==='en' ? frameworkImgEn : frameworkImg" class="framework-img"></OFigure>
      <div class="framework-left">
        <div v-for="(item, i) in frameworkList" :key="i" class="item">
          <div class="item-title" :class="{'item-title-dark': isDark}">
            <span class="title-box">{{ item.title }}</span>
            <OTag
              :class="`${item.class}-tag`"
              :style="{ '--tag-radius': '4px' }"
            >
              {{ item.tag }}
            </OTag>
          </div>
          <p class="item-desc">{{ item.desc }}</p>
        </div>
      </div>
      <OFigure v-if="!lePadV" :src="locale ==='en' ? frameworkImgEn : frameworkImg" class="framework-img"></OFigure>
    </div>
  </AppSection>
  <AppSection :title="t('ubServiceCore.entranceTitle')" class="entrance">
    <ORow :gap="lePadV ? '0 12px' : '32px 0'" wrap="wrap">
      <OCol v-for="(item, i) in ubEntranceList[locale]" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 33.33%'">
        <div class="item-info">
          <div class="info-title">
            <OIcon class="item-icon"><component :is="item.icon" /></OIcon>
            <p class="content-title">{{ item.title }}</p>
          </div>
          <div class="info-content">
            <p class="content-desc">{{ item.desc }}</p>
            <ODivider v-if="lePadV" />
            <DropButton v-if="item.title === '白皮书'" class="drop-button" @click="viewWhitepaper">{{ t('ubServiceCore.viewMore') }}</DropButton>
            <OLink v-else :color="lePadV ? 'normal' : 'primary'" :href="item.href" target="_blank" :hover-underline="lePadV ? false : true">
              <p>{{ t('ubServiceCore.viewMore') }}</p>
              <template v-if="item?.isOutlink" #suffix>
                <OIcon class="outlink-icon"><IconOutLink /></OIcon>
              </template>
              <template v-if="lePadV && !item?.isOutlink" #suffix>
                <OIcon class="outlink-icon"><IconChevronRight /></OIcon>
              </template>
            </OLink>
          </div>
        </div>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.ub-service-core-banner {
  background-color: transparent;
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
      .banner-subtitle {
        color: var(--o-color-black);
        margin-top: var(--o-gap-2);
        @include text2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
        .banner-subtitle {
          font-size: 16px;
          line-height: 24px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
        .banner-subtitle {
          @include text2;
        }
      }
    }
  }
}

.mo-banner {
  @include respond-to('<=pad_v') {
    padding: 24px 24px 0;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
    .mo-subtitle {
      color: var(--o-color-info2);
      margin-top: 8px;
      @include tip1;
    }
  }
  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
    .mo-subtitle {
      @include text1;
    }
  }
}

.introduction {
  :deep(.section-wrapper) {
    margin-top: 40px;
  }
  :deep(.section-body) {
    margin-top: 40px;
  }
}
.intro-desc {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 40px 32px;
  color: var(--o-color-info1);
  @include text2;
}

.framework {
  :deep(.section-subtitle) {
    margin-top: 16px;
    color: var(--o-color-info1);
    @include text2;
  }
}
.framework-content {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 40px 32px;
  display: flex;
  align-items: center;
  position: relative;
}
.framework-bg-img {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right bottom;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.framework-left {
  position: relative;
  z-index: 2;
}
.item {
  padding-left: 16px;
}
.item-title {
  color: var(--o-color-info1);
  font-weight: 600;
  position: relative;
  @include h3;
  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 30px;
    border-radius: 8px;
    top: 0px;
    left: -16px;
    background-image: linear-gradient(
      180deg,
      rgba(var(--o-kleinblue-6), 1),
      rgba(192, 209, 244, 1) 100%
    );
  }
}
.item-title-dark {
  &::before {
    background-image: linear-gradient(
      180deg,
      rgba(var(--o-kleinblue-6), 1),
      var(--o-color-fill2) 100%
    );
  }
}
.title-box {
  vertical-align: middle;
}
.o-tag {
  --tag-padding: 1px 8px;
  border: none;
  font-weight: 400;
  margin-left: 12px;
  vertical-align: middle;
  @include tip1;
  :deep(.o-tag-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-right: 4px;
      @include text1;
    }
  }
}
.already-tag {
  --tag-bg-color: var(--o-color-primary1);
  --tag-color: var(--o-color-white);
}
.plan-tag {
  --tag-bg-color: var(--o-color-control4-light);
}
.item-desc {
  color: var(--o-color-info3);
  margin-top: 8px;
  @include text1;
}
.item + .item {
  margin-top: 32px;
}
.framework-img {
  margin-left: 32px;
  width: 52%;
  flex-shrink: 0;
  border-radius: 8px;
  position: relative;
  z-index: 2;
  :deep(.o-figure-img) {
    height: auto;
  }
}
.framework-content-dark {
  .framework-bg-img {
    display: none;
  }
  :deep(.o-figure-img) {
    @include img-in-dark;
  }
}

.item-info {
  height: 184px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  .o-link {
    margin-top: auto;
    --link-gap: 8px;
    .outlink-icon {
      --icon-size: 24px;
    }
  }
}
.info-title {
  display: flex;
  align-items: center;
}
.item-icon {
  --icon-size: 32px;
  margin-right: 12px;
}
.info-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 44px;
  .content-title {
    font-weight: 500;
    color: var(--o-color-info1);
    @include h3;
  }
  .content-desc {
    margin-top: 8px;
    color: var(--o-color-info3);
    @include text1;
  }
  .drop-button {
    margin-top: auto;

    :deep(.o-btn-text) {
      &:hover {
        --btn-bg-color-hover: unset;
        --btn-bg-color-active: unset;
      }
    }
  }
}

@include respond-to('laptop') {
  .intro-desc {
    padding: 32px 24px;
  }
  .framework-content {
    padding: 24px;
  }
  .item-title {
    &::before {
      height: 26px;
    }
  }
  .item + .item {
    margin-top: 24px;
  }
  .framework-img {
    margin-left: 24px;
  }
  .item-info {
    height: 156px;
    padding: 16px 24px;
  }
}

@include respond-to('pad_h') {
  .intro-desc {
    padding: 24px;
  }
  .framework-content {
    padding: 16px;
  }
  .item-title {
    &::before {
      height: 24px;
    }
  }
  .already-tag {
    --tag-padding: 1px 4px;
  }
  .plan-tag {
    --tag-padding: 1px 0;
  }
  .item + .item {
    margin-top: 16px;
  }
  .framework-img {
    margin-left: 16px;
  }
  .item-info {
    height: 148px;
    padding: 16px;
  }
  .item-icon {
    --icon-size: 24px;
  }
  .info-content {
    margin-left: 36px;
  }
}

@include respond-to('<=pad_v') {
  .introduction {
    :deep(.section-wrapper) {
      margin-top: 32px;
    }
    :deep(.section-body) {
      margin-top: 12px;
    }
  }
  .intro-desc {
    padding: 12px;
    border-radius: var(--o-radius-s);
  }
  .framework-content {
    padding: 12px;
    flex-direction: column;
    border-radius: var(--o-radius-s);
  }
  .framework-img {
    width: 100%;
    margin-left: 0;
    margin-bottom: 8px;
  }
  .item {
    padding-left: 0;
    margin-top: 12px;
  }
  .item-title {
    &::before {
      display: none;
    }
  }
  .already-tag {
    --tag-padding: 1px 4px;
  }
  .plan-tag {
    --tag-padding: 1px 0;
  }
  .item-desc {
    @include text2;
  }
  .item + .item {
    margin-top: 12px;
  }
  .item-info {
    height: auto;
    padding: 12px;
    border-radius: var(--o-radius-s);
    .o-link {
      margin-top: 0;
      padding: 0;
      justify-content: space-between;
      --link-color-hover: var(--o-color-info2);
      --link-color-active: var(--o-color-info2);
      @include text2;
      .outlink-icon {
        --icon-size: 16px;
      }
    }
  }
  .item-icon {
    --icon-size: 24px;
    margin-right: 8px;
  }
  .info-content {
    margin-left: 0;
  }
  .o-divider {
    --o-divider-gap: 8px;
  }
}
</style>
