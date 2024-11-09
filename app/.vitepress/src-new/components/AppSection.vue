<script setup lang="ts">
import { isArray, OLink } from '@opensig/opendesign';

import OIcon from 'opendesign/icon/OIcon.vue';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

interface SectionPropsT {
  title?: string | Array<string>;
  subtitle?: string;
  full?: boolean;
  headerJustifyCenter?: boolean;
  footer?: string;
  footerHref?: string;
}

const props = withDefaults(defineProps<SectionPropsT>(), {
  title: undefined,
  subtitle: undefined,
  full: false,
  headerJustifyCenter: true,
  footer: undefined,
  footerHref: undefined,
});
</script>

<template>
  <div class="app-section" :class="{ 'is-full': props.full }">
    <div class="section-wrapper">
      <slot name="main">
        <!-- header -->
        <div
          v-if="$slots.header || props.title || props.subtitle"
          class="section-header"
          :class="{ 'is-left': !props.headerJustifyCenter }"
        >
          <slot name="header">
            <template v-if="isArray(props.title)">
              <h2 v-for="item in props.title" :key="item" class="section-title">
                {{ item }}
              </h2>
            </template>
            <h2 v-else-if="$slots.title || props.title" class="section-title">
              <slot name="title">
                {{ props.title }}
              </slot>
            </h2>
            <p
              v-if="$slots.subtitle || props.subtitle"
              class="section-subtitle"
            >
              <slot name="subtitle">
                {{ props.subtitle }}
              </slot>
            </p>
          </slot>
        </div>

        <!-- body -->
        <div v-if="$slots.default" class="section-body">
          <slot></slot>
        </div>

        <!-- footer -->
        <div v-if="$slots.footer || props.footer" class="section-footer">
          <slot name="footer">
            <OLink :href="props.footerHref" target="_blank">
              {{ props.footer }}
              <template #suffix>
                <OIcon><IconChevronRight /> </OIcon>
              </template>
            </OLink>
          </slot>
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-section {
  .section-wrapper {
    margin: var(--o-gap-section) auto 0;
  }

  &.is-full {
    .section-body {
      max-width: 100%;
      width: 100%;
      padding: 0;
    }
  }

  &:last-child {
    .section-wrapper {
      padding-bottom: var(--o-gap-section);
    }
  }

  .section-header {
    &.is-left {
      .section-title,
      .section-subtitle {
        justify-content: start;
      }
    }
  }

  .section-title {
    max-width: var(--layout-content-max-width);
    padding: 0 var(--layout-content-padding);
    margin: 0 auto;

    display: flex;
    justify-content: center;
    color: var(--o-color-info1);
    text-align: center;
    @include display3;
    font-weight: 500;
  }

  .section-subtitle {
    max-width: var(--layout-content-max-width);
    padding: 0 var(--layout-content-padding);
    margin: 0 auto;

    display: flex;
    justify-content: center;
    margin-top: 12px;
    color: var(--o-color-info1);
    @include text1;

    @include respond-to('pad-laptop') {
      margin-top: 8px;
    }

    @include respond-to('phone') {
      margin-top: 12px;
    }
  }

  .section-body {
    max-width: var(--layout-content-max-width);
    padding: 0 var(--layout-content-padding);
    margin: 0 auto;

    margin-top: var(--o-gap-t2c);
  }

  .section-footer {
    max-width: var(--layout-content-max-width);
    padding: 0 var(--layout-content-padding);
    margin: 0 auto;

    display: flex;
    justify-content: center;
    @include text1;
    margin-top: 32px;

    @include respond-to('<=laptop') {
      margin-top: 16px;
    }

    @include respond-to('phone') {
      margin-top: 12px;
    }
  }
}
</style>
