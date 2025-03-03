<script lang="ts" setup>
import { welcomeJoin } from '~@/data/sig';
import { useLocale } from '~@/composables/useLocale';

import { OIcon } from '@opensig/opendesign';

import { useScreen } from '~@/composables/useScreen';

import AppSection from '~@/components/AppSection.vue';

const { locale } = useLocale();
const { lePadV } = useScreen();
</script>
<template>
  <AppSection :title="$t('sig.welcomeJoin')" class="sig-welcome">
    <div class="sig-welcome-card">
      <template v-for="(card, index) in welcomeJoin" :key="card.title[locale]">
        <div class="card-item">
          <OIcon class="icon">
            <component :is="card.icon"></component>
          </OIcon>
          <div class="sig-info">
            <div class="title">
              {{ card.title[locale] }}
            </div>
            <div :v-clamp-text="lePadV ? 3 : false" class="subtitle">
              {{ card.subtitle[locale] }}
            </div>
          </div>
        </div>
      </template>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.sig-welcome {
  .sig-welcome-card {
    --title-gap: 8px;
    --title-icon-size: var(--o-icon_size-2xl);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 80px;
    background-color: var(--o-color-fill2);
    padding: 24px 48px;
    @include respond-to('<=pad_v') {
      display: flex;
      flex-direction: column;
      padding: 12px;
      gap: 24px;
    }

    .card-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &:not(:first-child) {
        .sig-info {
          &::after {
            position: absolute;
            content: '';
            left: -40px;
            bottom: 0;
            width: 1px;
            height: 100%;
            background-color: var(--o-color-control4);
            @include respond-to('<=pad_v') {
              width: 100%;
              height: 1px;
              left: 0;
              top: -12px;
            }
          }
        }
      }
      @include respond-to('<=pad_v') {
        display: flex;
        flex-direction: row;
      }

      .o-icon {
        margin-bottom: var(--title-gap);
        font-size: var(--title-icon-size);
        @include respond-to('<=pad_v') {
          height: min-content;
        }
      }

      .title {
        font-weight: 500;
        @include h4;
        @include respond-to('<=pad_v') {
          margin-top: 0;
        }
      }

      .subtitle {
        margin-top: 16px;
        color: var(--o-color-info2);
        @include tip1;
        @include respond-to('<=pad_v') {
          margin-top: 8px;
        }
      }

      .sig-info {
        position: relative;
        flex: 1;
        @include respond-to('<=pad_v') {
          position: initial;
          margin-left: 12px;
        }
      }
    }
  }

  .o-divider {
    --o-divider-label-gap: 0 40px;
    @include respond-to('<=pad_v') {
      margin-top: var(--o-divider-gap);
      height: auto;
    }
  }
}
</style>
