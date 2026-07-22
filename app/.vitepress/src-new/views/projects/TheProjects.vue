<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OCard, OFigure, OButton, OLink, OIcon, ODivider, OTag } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';

import { projectData } from '~@/data/project';

import banner from '~@/assets/category/projects/banner.jpg';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import IconOutLink from '~icons/app-new/icon-outlink.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale, t } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

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
  <BannerLevel2 v-if="!lePadV" class="project-banner" :title="t('project.title')" :subtitle="t('project.subtitle')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('project.title') }}</p>
    <p class="mo-subtitle">{{ t('project.subtitle') }}</p>
  </div>
  <AppSection :title="t('project.listTitle')" class="project-list">
    <ORow :gap="gap" wrap="wrap">
      <OCol v-for="(item, i) in projectData[locale]" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 50%'">
        <OCard :detail-row="2" :detail-max-row="2">
          <template #header>
            <div class="title">
              <div class="item-title">
                <span>{{ item.title }}</span>
                <OTag v-if="item?.tag" color="danger" variant="solid" class="new-tag">{{ item?.tag }}</OTag>
              </div>
              <OFigure :src="item.icon"></OFigure>
            </div>
          </template>
          <template #detail>
            <span :title="item.desc" class="desc">{{ item.desc }}</span>
          </template>
          <template v-if="!lePadV" #footer>
            <OButton color="primary" variant="outline" size="large" class="view-btn" :href="`/${locale}${item.url}`" target="_blank">{{ t('project.viewMore') }}</OButton>
            <OLink v-if="item.atomgitUrl" color="normal" variant="text" :href="item.atomgitUrl" target="_blank">
              <span class="gitee">{{ t('project.gitee') }}</span>
              <OIcon class="right-icon"><IconChevronRight /></OIcon>
            </OLink>
          </template>
          <template v-else #footer>
            <ODivider />
            <OLink color="normal" variant="text" :href="`/${locale}${item.url}`" target="_blank">
              {{ t('project.viewMore') }}
              <OIcon class="right-icon"><IconChevronRight /></OIcon>
            </OLink>
            <ODivider v-if="item.atomgitUrl" />
            <OLink v-if="item.atomgitUrl" color="normal" variant="text" :href="item.atomgitUrl" target="_blank">
              <span class="gitee">{{ t('project.gitee') }}</span>
              <OIcon class="outlink-icon"><IconOutLink /></OIcon>
            </OLink>
          </template>
        </OCard>
      </OCol>
    </ORow>
  </AppSection>
  <div v-if="!lePad" class="partake" :class="{'partake-dark': isDark}">
    <p class="partake-title">{{ t('project.participate') }}</p>
    <p class="partake-titdescle">{{ t('project.participateDesc') }}</p>
    <div class="btn">
      <OButton color="primary" variant="solid" size="large" :href="`/${locale}/community/contribution/`" target="_blank">{{ t('project.strategy') }}</OButton>
      <OButton color="primary" variant="outline" size="large" class="view-btn" :href="`/${locale}/sig/sig-list/`" target="_blank">{{ t('project.viewSig') }}</OButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-banner {
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

.project-list {
  :deep(.section-wrapper) {
    margin-top: 40px;
  }
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  .item-title {
    display: flex;
    align-items: center;
    font-weight: 500;
  }
  .o-tag {
    --tag-radius: var(--o-radius-xs);
    --tag-padding: 3px 12px;
    margin-left: 16px;
  }
  .o-figure {
    width: 48px;
  }
}

.desc {
  color: var(--o-color-info3);
}

:deep(.o-card-footer) {
  display: flex;
  align-items: center;
}
.o-link {
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
  }
  .o-icon {
    --icon-size: 24px;
  }
  .gitee {
    margin-right: 4px;
  }
}
.o-btn + .o-link {
  margin-left: 24px;
}
.view-btn.o-btn-outline {
  --btn-color-hover: var(--o-color-primary2);
  --btn-color-active: var(--o-color-primary3);
  --btn-bg-color-hover: transparent;
  --btn-bd-color-hover: var(--o-color-primary2);
  --btn-bg-color-active: transparent;
  --btn-bd-color-active: var(--o-color-primary3);
}

.partake {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  margin-top: 72px;
  padding: 32px 0;
  text-align: center;
  background-image: url('~@/assets/category/projects/participate-project.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.partake-title {
  font-weight: 600;
  color: var(--o-color-info1);
  @include display3;
}
.partake-titdescle {
  margin-top: 16px;
  color: var(--o-color-info1);
  @include text2;
}
.btn {
  margin-top: 24px;
  .o-btn {
    min-width: 137px;
  }
  .o-btn + .o-btn {
    margin-left: 24px;
  }
}

.partake-dark {
  background-image: url('~@/assets/category/projects/participate-project-dark.jpg');
}

@include respond('pad_h') {
  .title {
    .o-tag {
      --tag-height: 24px;
      :deep(.o-tag-label) {
        transform: none;
      }
    }
  }
  .o-btn {
    --btn-padding: 0 15px;
    --btn-height: 36px;
    @include text1;
  }
}

@include respond('<=pad_v') {
  .project-list {
    :deep(.section-wrapper) {
      margin-top: 32px;
    }
  }
  .o-card {
    --card-main-padding: 16px;
    --card-footer-gap: 16px;
  }
  .title {
    height: 32px;
    .o-tag {
      --tag-padding: 3px 6px;
      margin-left: 8px;
    }
    .o-figure {
      width: 32px;
    }
  }
  :deep(.o-card-detail) {
    height: auto;
    max-height: none;
    display: block;
  }
  :deep(.o-card-footer) {
    align-items: flex-start;
    flex-direction: column;
    @include text1;
  }
  .o-divider {
    --o-divider-gap: 0;
  }
  .o-link {
    width: 100%;
    padding: 9px 0;
    :deep(.o-link-label) {
      width: 100%;
      justify-content: space-between;
    }
    .gitee {
      margin-right: 4px;
    }

    &:last-child {
      padding: 9px 0 0;
    }
  }

  .partake {
    margin-top: 32px;
    padding: 32px 0;
    background-image: url('~@/assets/category/projects/participate-project-mb.jpg');
  }
  .partake-dark {
    background-image: url('~@/assets/category/projects/participate-project-mb-dark.png');
  }
}
@include respond('phone') {
  .o-card {
    --card-main-padding: 12px;
  }
  .title {
    height: 32px;
    .item-title {
      @include h3;
    }
    .o-tag {
      margin-left: 8px;
    }
  }
  :deep(.o-card-content) {
    @include text2;
  }
  :deep(.o-card-footer) {
    @include text2;
  }
}
</style>
