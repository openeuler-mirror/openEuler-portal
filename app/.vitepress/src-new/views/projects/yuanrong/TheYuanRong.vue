<script lang="ts" setup>
import { OFigure, ORow, OCol, OLink } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import { entranceList } from '~@/data/project';

import banner from '~@/assets/category/yuanrong/banner.jpg';

import IconMultilingual from '~icons/yuanrong/icon-multilingual.svg';
import IconFunction from '~icons/yuanrong/icon-function.svg';
import IconData from '~icons/yuanrong/icon-data.svg';
import IconOutLink from '~icons/yuanrong/icon-outlink.svg';

import frameworkImgZh from '~@/assets/category/yuanrong/framework.png';
import frameworkImgEn from '~@/assets/category/yuanrong/framework-en.png';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { locale, t } = useLocale();
const { lePadV } = useScreen();

const frameworkList = [
  {
    icon: IconMultilingual,
    title: t('yuanrong.multilingual'),
    desc: t('yuanrong.multilingualDesc'),
  },
  {
    icon: IconFunction,
    title: t('yuanrong.functionSystem'),
    desc: t('yuanrong.functionSystemDesc'),
  },
  {
    icon: IconData,
    title: t('yuanrong.dataSystem'),
    desc: t('yuanrong.dataSystemDesc'),
  }
]
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="yuanrong-banner" :title="t('yuanrong.title')" :subtitle="t('yuanrong.subtitle')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('yuanrong.title') }}</p>
    <p class="mo-subtitle">{{ t('yuanrong.subtitle') }}</p>
  </div>
  <AppSection :title="t('yuanrong.introTitle')" class="introduction">
    <div class="intro-desc">{{ t('yuanrong.introDesc') }}</div>
  </AppSection>
  <AppSection :title="t('yuanrong.frameworkTitle')" :subtitle="t('yuanrong.frameworkDesc')" class="framework">
    <div class="framework-content">
      <OFigure v-if="lePadV" :src="locale ==='en' ? frameworkImgEn : frameworkImgZh" class="framework-img"></OFigure>
      <div class="framework-left">
        <div v-for="(item, i) in frameworkList" :key="i" class="item">
          <OIcon><component :is="item.icon"></component></OIcon>
          <div class="item-content">
            <p class="item-title">{{ item.title }}</p>
            <p class="item-desc">{{ item.desc }}</p>
          </div>
        </div>
        <p class="function-desc">*{{ t('yuanrong.functionDesc') }}</p>
      </div>
      <OFigure v-if="!lePadV" :src="locale ==='en' ? frameworkImgEn : frameworkImgZh" class="framework-img"></OFigure>
    </div>
  </AppSection>
  <AppSection :title="t('yuanrong.entranceTitle')" class="entrance">
    <ORow :gap="lePadV ? '0 12px' : '32px 0'" wrap="wrap">
      <OCol v-for="(item, i) in entranceList[locale]" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 50%'">
        <div class="item-info">
          <div class="info-title">
            <OIcon class="gitee-icon"><component :is="item.icon" /></OIcon>
            <p class="content-title">{{ item.title }}</p>
          </div>
          <div class="info-content">
            <p class="content-desc">{{ item.desc }}</p>
            <OLink color="primary" :href="item.href" target="_blank" hover-underline>
              <p>{{ t('yuanrong.viewMore') }}</p>
              <OIcon v-if="item?.isOutlink" class="outlink-icon"><IconOutLink /></OIcon>
            </OLink>
          </div>
        </div>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.yuanrong-banner {
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
  padding: 32px;
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
  padding: 32px;
  display: flex;
  align-items: center;
  color: var(--o-color-info3);
}
.item {
  display: flex;
  align-items: flex-start;
  .o-icon {
    flex-shrink: 0;
    --icon-size: 24px;
    margin-top: 3px;
  }
}
.item + .item {
  margin-top: 24px;
}
.item-content {
  margin-left: 12px;
}
.item-title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include h3;
}
.item-desc {
  margin-top: 12px;
  @include text1;
}
.function-desc {
  margin-top: 24px;
  @include tip1;
}
.framework-img {
  margin-left: 48px;
  width: 710px;
  flex-shrink: 0;
  :deep(.o-figure-img) {
    height: auto;
  }
}

.item-info {
  height: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 32px 24px;
  .o-link {
    margin-top: 24px;
    :deep(.o-link-label) {
      display: flex;
      align-items: center;
    }
    .outlink-icon {
      --icon-size: 24px;
      margin-left: 8px;
    }
  }
}
.info-title {
  display: flex;
  align-items: center;
}
.gitee-icon {
  --icon-size: 32px;
  margin-right: 12px;
}
.info-content {
  margin-left: 44px;
}
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

@include respond-to('laptop') {
  .framework-content {
    padding: 24px;
  }
  .item {
    .o-icon {
      margin-top: 1px;
    }
  }
  .framework-img {
    margin-left: 32px;
    width: 588px;
  }
  .item-info {
    padding: 24px 16px;
  }
}

@include respond-to('pad_h') {
  .framework-content {
    padding: 16px;
  }
  .item {
    .o-icon {
      margin-top: 0;
    }
  }
  .framework-img {
    margin-left: 16px;
    width: 468px;
  }
  .item-info {
    padding: 16px;
  }
  .gitee-icon {
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
    padding: 16px;
  }
  .framework-content {
    padding: 16px;
  }
  .framework-content {
    flex-direction: column;
  }
  .framework-img {
    width: 100%;
    margin-left: 0;
    margin-bottom: 8px;
  }
  .item-info {
    padding: 16px;
    .o-link {
      margin-top: 12px;
      .outlink-icon {
        --icon-size: 16px;
      }
    }
  }
  .gitee-icon {
    --icon-size: 24px;
  }
  .info-content {
    margin-left: 36px;
  }
}
</style>
