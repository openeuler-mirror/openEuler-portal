<script lang="ts" setup>
import { computed } from 'vue';

import { storeToRefs } from 'pinia';

import { useCommon } from '@/stores/common';

import { OButton, OIcon } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';
import getOs from '~@/data/download/get-os';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import IconOutLink from '~icons/app-new/icon-outlink.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

const { locale } = useLocale();
const { lePadV } = useScreen();

const { theme } = storeToRefs(useCommon());

const localeGetOsData = computed(() => {
  return getOs[locale.value];
});
</script>
<template>
  <AppSection :title="$t('download.getOStitle')">
    <div class="download-get-os">
      <div
        v-for="container in localeGetOsData"
        class="get-os-item"
        :id="container.id"
        :key="container.title"
      >
        <div
          class="get-os-intro"
          :style="{
            backgroundImage: `url(${
              lePadV ? container.bgMo[theme] : container.bg[theme]
            })`,
          }"
        >
          <div class="title">{{ container.title }}</div>
          <div class="intro">{{ container.intro }}</div>
          <a
            v-if="container.introLink"
            :href="container.introLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OButton variant="solid" color="primary">
              {{ $t('download.guide') }}
            </OButton>
          </a>
        </div>
        <div class="grid-container">
          <div
            v-for="link in container.links"
            class="link-container"
            :key="link.href"
          >
            <div class="text-info">
              <a
                class="link"
                :href="link.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ link.label }}
                <OIcon v-if="link?.outlink"><IconOutLink /></OIcon>
              </a>
              <div class="introduce">
                {{ link.introduce }}
              </div>
            </div>
            <OIcon class="icon-right"> <IconChevronRight /></OIcon>
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.download-get-os {
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  overflow: hidden;
  @include respond-to('<=pad_v') {
    background-color: inherit;
    border-radius: none;
  }
  .get-os-item {
    display: flex;
    @include respond-to('<=pad_v') {
      flex-direction: column;
      border-radius: var(--o-radius-xs);
      overflow: hidden;
      background-color: var(--o-color-fill2);
    }
    & + div {
      @include respond-to('<=pad_v') {
        margin-top: 12px;
      }
      .grid-container {
        border-top: 1px solid transparent;
        @include respond-to('<=pad_v') {
          border-top: none;
        }
      }
      .get-os-intro {
        border-top: 1px solid var(--o-color-control4);
        @include respond-to('<=pad_v') {
          border-top: none;
        }
      }
    }
    .get-os-intro {
      padding: 32px;
      max-width: 372px;
      width: 100%;
      color: var(--o-color-info1);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: auto 100%;
      @media (max-width: 1640px) {
        padding: 16px;
      }
      @include respond-to('<=pad_v') {
        background-size: 100% auto;
        max-width: 100%;
        padding: 16px 12px;
      }
      .title {
        font-weight: 500;
        @include h1;
      }
      .intro {
        margin-top: 8px;
        @include text1;
      }
      .o-btn {
        margin-top: 24px;
        @include respond-to('<=laptop') {
          margin-top: 12px;
        }
        @include respond-to('<=pad_v') {
          margin-top: 8px;
        }
      }
    }
    .grid-container {
      flex: 1;
      display: grid;
      grid-template-columns: repeat(6, minmax(100px, 1fr));
      grid-auto-rows: minmax(160px, 223px);
      gap: 1px;
      border-left: 1px solid transparent;
      background-color: var(--o-color-control4);
      @include respond-to('<=pad_v') {
        grid-template-columns: 1fr;
        padding: 0;
        gap: 0;
        border: none;
        grid-auto-rows: auto;
      }
      > .link-container {
        grid-column: span 2;
        padding: 32px;
        background-color: var(--o-color-fill2);
        @media (max-width: 1640px) {
          padding: 16px;
        }
        @include respond-to('<=pad_v') {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--o-color-control4);
          padding: 12px;
        }
        .link {
          display: flex;
          align-items: center;
          color: var(--o-color-info1);
          font-weight: 500;
          @include h3;
          .o-icon {
            margin-left: 8px;
            font-size: var(--o-icon_size-m);
          }
          @include hover {
            color: var(--o-color-primary1);
          }
        }
        .icon-right {
          display: none;
          @include respond-to('<=pad_v') {
            display: block;
            font-size: var(--o-icon_size-l);
            margin-left: 12px;
          }
        }
        .introduce {
          margin-top: 12px;
          color: var(--o-color-info3);
          @include tip1;
          @include respond-to('<=laptop') {
            margin-top: 8px;
          }
          @include respond-to('<=pad_v') {
            margin-top: 4px;
            @include text-truncate(2);
          }
        }
      }
      > :nth-child(4),
      > :nth-child(5) {
        grid-column: span 3;
      }
      > :only-child {
        grid-column: 1 / -1;
      }
    }
  }
  #container {
    .grid-container {
      & > {
        .link-container {
          grid-column: span 3;
        }
      }
    }
  }
}
</style>
