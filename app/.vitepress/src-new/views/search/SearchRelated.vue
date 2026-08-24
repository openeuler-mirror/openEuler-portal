<script lang="ts" setup>
import { type PropType } from 'vue';

import { OIcon } from '@opensig/opendesign';
import { oaReport } from '@opendesign-plus/plugins/analytics';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import IconRelated from '~icons/app-new/icon-related.svg';

const props = defineProps({
  size: {
    type: String,
    default: '',
  },
  suggestList: {
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    },
  },
  keyword: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['search']);

const { t } = useLocale();
const { gtPadV } = useScreen();

const handleClick = (val: string) => {
  const cleanVal = val.replace(/<[^>]+>/g, '');
  oaReport(
    'click',
    {
      module: 'search_result',
      content: props.keyword,
      type: 'related_search',
      target: cleanVal,
    },
    'search_portal'
  );
  emit('search', cleanVal);
};
</script>

<template>
  <div v-if="suggestList?.length" class="search-related" :class="size">
    <div class="title">
      <OIcon v-if="gtPadV"><IconRelated /></OIcon>
      {{ title || t('search.relatedSearch') }}
    </div>
    <div class="related-content">
      <ul class="related-list">
        <li
          v-for="item in suggestList"
          :key="item"
          v-dompurify-html="item"
          class="related-item"
          @click="handleClick(item)"
        ></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-related {
  &.medium {
    padding: 24px;
    background: var(--o-color-fill1);
    margin: 40px 0 0;
    border-radius: var(--o-radius-xs);
    @include respond('<=pad') {
      margin: 24px 0;
      border-radius: 8px;
    }
    @include respond('<=pad_v') {
      padding: 16px;
      margin: 24px 0 0;
    }
    @include respond('phone') {
      background: var(--o-color-fill2);
      margin: 0 0 12px;
    }
    .related-content {
      padding-left: 32px;
      @include respond('<=pad_v') {
        padding: 0;
      }
    }
  }
  &.small {
    .title {
      border-bottom: 1px solid var(--o-color-control4);
      padding: 0 0 12px;
      margin-bottom: 12px;
    }
    .related-content {
      padding: 0;
    }
  }
  .title {
    color: var(--o-color-info1);
    font-weight: 500;
    display: flex;
    margin-bottom: 8px;
    align-items: center;
    @include h4;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
  .related-content {
    position: relative;
    .related-list {
      display: flex;
      flex-direction: column;
      .related-item {
        cursor: pointer;
        color: var(--o-color-info1);
        word-break: break-word;
        @include text1;
        @include hover {
          color: var(--o-color-primary1);
        }
        & + .related-item {
          margin-top: 12px;
        }
        :deep(em) {
          color: inherit;
          font-style: normal;
        }
      }
    }
  }
}
</style>
