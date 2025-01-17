<script lang="ts" setup>
import { welcomeJoin } from '~@/data/sig';
import { useLocale } from '~@/composables/useLocale';

import { OIcon, ODivider } from '@opensig/opendesign';

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
            <div v-clamp-text="3" class="subtitle">
              {{ card.subtitle[locale] }}
            </div>
          </div>
        </div>
        <ODivider
          v-if="index !== welcomeJoin.length - 1"
          :direction="lePadV ? 'h' : 'v'"
        />
      </template>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.sig-welcome {
  .sig-welcome-card {
    display: flex;
    background-color: var(--o-color-fill2);
    padding: 24px 48px;
    --title-gap: 8px;
    --title-icon-size: var(--o-icon_size-2xl);
    @include respond-to('<=pad_v') {
      flex-direction: column;
      padding: 12px;
    }
    .card-item {
      @include respond-to('<=pad_v') {
        display: flex;
      }
      .o-icon {
        @include respond-to('<=pad_v') {
          height: min-content;
        }
        font-size: var(--title-icon-size);
      }
      .title {
        margin-top: var(--title-gap);
        @include h4;
        font-weight: 500;
        @include respond-to('<=pad_v') {
          margin-top: 0;
        }
      }
      .subtitle {
        margin-top: 16px;
        @include tip1;
        color: var(--o-color-info2);
        @include text-truncate(3);
        @include respond-to('<=pad_v') {
          margin-top: 8px;
        }
      }
      .sig-info {
        @include respond-to('<=pad_v') {
          margin-left: 12px;
        }
      }
    }
  }
  .o-divider {
    --o-divider-label-gap: 0 40px;
    height: auto;
  }
}
</style>
