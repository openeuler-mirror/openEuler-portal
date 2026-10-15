<script setup lang="ts">
import { OIcon, OLink } from '@opensig/opendesign';

import IconReview from '~icons/app-new/icon-review.svg';

defineProps({
  previousData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
</script>

<template>
  <div class="previous">
    <div class="section-title">
      <p>{{ previousData.title }}</p>
      <OIcon><IconReview /></OIcon>
    </div>
    <div class="link-box">
      <a
        v-for="item in previousData.list"
        :key="item.link"
        class="previous-link"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ item.name }}
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.previous {
  padding-bottom: var(--o-gap-10);
  text-align: left;

  @include respond('<=pad_v') {
    padding-bottom: var(--o-gap-7);
  }

  .section-title {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    font-weight: 500;
    @include h1;

    .o-icon {
      --icon-size: 32px;
      margin-left: 16px;
    }

    @include respond('<=pad_v') {
      .o-icon {
        --icon-size: 16px;
        margin-left: 12px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-gap-6);

    @include respond('<=pad_v') {
      margin-top: var(--o-gap-5);
    }

    .previous-link {
      display: block;
      // 热区仅覆盖文案宽度，避免整行误点
      width: fit-content;
      --link-color: var(--o-color-link1);
      --link-color-hover: var(--o-color-primary3);
      @include h4;

      @include respond('<=pad_v') {
        @include tip1;
      }

      & + .previous-link {
        margin-top: var(--o-gap-5);

        @include respond('<=pad_v') {
          margin-top: var(--o-gap-4);
        }
      }
    }
  }
}
</style>
