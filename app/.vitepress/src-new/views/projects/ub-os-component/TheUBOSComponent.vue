<script lang="ts" setup>
import { computed } from 'vue';
import { OFigure, ORow, OCol, OLink, OIcon, ODivider } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import RepoList from './components/RepoList.vue'

import banner from '~@/assets/category/ub-service-core/banner.jpg';
import frameworkImg from '~@/assets/category/ub-os-component/coms-arch.jpg';

import IconOutLink from '~icons/yuanrong/icon-outlink.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

import { COMS_REPO_LIST, relatedLinks } from '~@/data/ub-os-component';

const { locale, t } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const columns = [
  { label: t('ubOsComponent.comName'), key: 'name', width: '190' },
  { label: t('ubOsComponent.module'), key: 'module', width: '156' },
  { label: t('ubOsComponent.function'), key: 'function', width: '176' },
  { label: t('ubOsComponent.functionDesc'), key: 'desc', width: '' },
  { label: t('ubOsComponent.codeRepo'), key: 'repo', width: '382' },
];
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="ub-os-component-banner" :title="t('ubOsComponent.title')" :subtitle="t('ubOsComponent.subtitle')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('ubOsComponent.title') }}</p>
    <p class="mo-subtitle">{{ t('ubOsComponent.subtitle') }}</p>
  </div>
  <AppSection :title="t('ubOsComponent.introTitle')" class="introduction">
    <div class="intro-desc">{{ t('ubOsComponent.introDesc') }}</div>
  </AppSection>
  <AppSection :title="t('ubOsComponent.frameworkTitle')" class="framework">
    <OFigure :src="frameworkImg" class="framework-img" :class="{'framework-img-dark': isDark}"></OFigure>
  </AppSection>
  <AppSection :title="t('ubOsComponent.repoList')">
    <RepoList :data="COMS_REPO_LIST" :columns="columns" mobile-filter-key="name"></RepoList>
  </AppSection>
  <AppSection :title="t('ubOsComponent.entranceTitle')" class="entrance">
    <ORow :gap="lePadV ? '0 12px' : '32px 0'" wrap="wrap">
      <OCol v-for="(item, i) in relatedLinks[locale]" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 50%'">
        <div class="item-info">
          <div class="info-title">
            <OIcon class="title-icon"><component :is="item.icon" /></OIcon>
            <p class="content-title">{{ item.title }}</p>
          </div>
          <div class="info-content">
            <p class="content-desc">{{ item.desc }}</p>
            <ODivider v-if="lePadV" />
            <OLink :color="lePadV ? 'normal' : 'primary'" :href="item.href" target="_blank" :hover-underline="lePadV ? false : true">
              <p>{{ t('ubOsComponent.viewDetail') }}</p>
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
.ub-os-component-banner {
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
  @include respond('<=pad_v') {
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
  @include respond('phone') {
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

.framework-img {
  --figure-radius: var(--o-radius-xs);
}
.framework-img-dark {
  @include img-in-dark;
}

.item-info {
  height: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 32px 24px;
  .o-link {
    margin-top: 24px;
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
.title-icon {
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

@include respond('laptop') {
  .intro-desc {
    padding: 32px 24px;
  }
  .item-info {
    padding: 24px 16px;
  }
}

@include respond('pad_h') {
  .intro-desc {
    padding: 24px;
  }
  .item-info {
    padding: 16px;
  }
  .title-icon {
    --icon-size: 24px;
  }
  .info-content {
    margin-left: 36px;
  }
}

@include respond('<=pad_v') {
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
  .item-info {
    padding: 12px;
    .o-link {
      width: 100%;
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
  .title-icon {
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
