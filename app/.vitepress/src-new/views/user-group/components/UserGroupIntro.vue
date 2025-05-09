<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import { introData } from '~@/data/user-group';
import IconHook from '~icons/user-group/hook.svg';

const { isPhone } = useScreen();

const { t } = useI18n();
</script>

<template>
  <AppSection
    :title="introData.title"
    :subtitle="introData.desc"
    class="intro-section"
  >
    <div class="intro-list">
      <div
        v-for="intro in introData.introList"
        :key="intro.background"
        class="intro-card"
        :style="{
          backgroundImage: `url(${intro.background})`,
        }"
      >
        <img :src="intro.logo" class="logo" />
        <div class="role-content">
          <div v-for="title in intro.title" :key="title.name" class="role">
            <p class="role-name">{{ title.name }}</p>
            <p class="role-desc">{{ title.desc }}</p>
          </div>
        </div>
        <div class="right">
          <p class="section">{{ t('usergroup.rights') }}</p>
          <div
            v-for="(right, index) in intro.rights"
            :key="index"
            class="section-item"
          >
            <OIcon class="icon"><IconHook /></OIcon>
            <p v-if="typeof right === 'string'" class="desc">{{ right }}</p>
            <div v-else>
              <span style="margin-right: 4px" class="desc">{{
                right.text
              }}</span>
              <a :href="right.url" class="hover-underline">{{
                right.operation
              }}</a>
            </div>
          </div>
        </div>

        <div class="obligation">
          <p class="section">{{ t('usergroup.obligation') }}</p>
          <div
            v-for="(obligation, index) in intro.obligation"
            :key="index"
            class="section-item"
          >
            <div class="dot"></div>
            <p v-if="typeof obligation === 'string'" class="desc">
              {{ obligation }}
            </p>
            <div v-else class="obligation-desc">
              <span>{{ obligation.text }}</span>
              <a :href="obligation.url" class="hover-underline text-button">{{
                obligation.operation
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.intro-list {
  display: flex;
  gap: var(--o-gap-6);
  width: 100%;

  .intro-card {
    flex: 1;
    border-radius: var(--o-radius-xs);
    background-color: var(--o-color-fill2);
    padding: var(--o-gap-8) var(--o-gap-6) var(--o-gap-6) var(--o-gap-7);
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: top;

    .logo {
      height: var(--o-icon_size-2xl);
      width: var(--o-icon_size-2xl);
      margin-bottom: var(--o-gap-5);
    }

    .role-content {
      min-height: 280px;
    }

    .role {
      margin-bottom: var(--o-gap-6);
      &:last-child {
        margin-bottom: var(--o-gap-7);
      }
      .role-name {
        @include h1;
        color: var(--o-color-info1);
        margin-bottom: var(--o-gap-3);
        font-weight: 500;
      }

      .role-desc {
        @include text1;
        color: var(--o-color-info2);
      }
    }

    .right {
      min-height: 200px;
    }
  }

  .section {
    @include text2;
    color: var(--o-color-info3);
    padding-bottom: var(--o-gap-3);
    border-bottom: 1px solid var(--o-color-control4);
    margin-bottom: var(--o-gap-4);
  }

  .section-item {
    @include text1;
    display: flex;
    gap: var(--o-gap-2);
    align-items: flex-start;

    &:not(:last-child) {
      margin-bottom: var(--o-gap-3);
    }

    .icon {
      font-size: var(--o-icon_size-m);
      color: var(--o-color-primary1);
    }

    .dot {
      width: 24px;
      height: 24px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--o-color-info1);
      }
    }

    .obligation-desc {
      font-size: inherit;
      display: flex;
      justify-content: space-between;
      width: 100%;
      color: var(--o-color-info2);
      gap: var(--o-gap-2);

      .text-button {
        min-width: 56px;
      }
    }

    .desc {
      font-size: inherit;
      color: var(--o-color-info2);
    }
  }
}

@include respond-to('<=pad_v') {
  .intro-section {
    :deep(.section-subtitle) {
      text-align: unset;
    }
  }
  .intro-list {
    flex-direction: column;
    gap: var(--o-gap-3);

    .intro-card {
      padding: var(--o-gap-4) var(--o-gap-3);

      @media (min-width: 600px) {
        padding: var(--o-gap-6);
      }

      .logo {
        margin-bottom: 6px;
      }

      .role-content {
        min-height: unset;
      }

      .role {
        &:last-child {
          margin-bottom: var(--o-gap-5);
        }
        .role-name {
          margin-bottom: var(--o-gap-2);
        }
      }

      .right {
        min-height: unset;
        padding-bottom: var(--o-gap-2);
        border-bottom: 1px solid var(--o-color-control4);
        margin-bottom: var(--o-gap-3);
      }
      .section {
        padding-bottom: unset;
        border-bottom: unset;
      }
      .section-item {
        @include text2;
      }
    }
  }
}

@include respond-to('pad_h') {
  .intro-list {
    flex-direction: column;

    .intro-card {
      display: flex;
      gap: var(--o-gap-3);

      .role-content,
      .right,
      .obligation {
        flex: 1;
      }

      .role-content {
        min-height: unset;
      }
    }
  }
}
</style>
