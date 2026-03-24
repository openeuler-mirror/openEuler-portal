<script setup>
import { computed } from 'vue';
import { OLink, ODivider } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import IconOutlink from '~icons/sig/icon-outlink.svg';

const { lePadV } = useScreen();

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  },
});

const cards = computed(() => {
  const result = [];
  
  for (let i = 0; i < props.data.length; i += 3) {
    if (i + 2 < props.data.length) {
      const cardInfo = {
        title: props.data[i].content,
        description: props.data[i + 1].content,
        linkText: props.data[i + 2].content,
        url: props.data[i + 2].url || props.data[i + 2].link,
      };
      result.push(cardInfo);
    }
  }
  
  return result;
});

const isSelfDomain = (url) => {
  try {
    const hostname = new URL(url).hostname;
    const selfDomains = ['www.openeuler.org', 'www.openeuler.openatom.cn'];
    return selfDomains.includes(hostname);
  } catch (error) {
    return false;
  }
}
</script>

<template>
  <div class="card-list">
    <div v-for="(card, index) in cards" :key="index" class="card-item">
      <p class="card-title">{{ card.title }}</p>
      <p class="card-desc">{{ card.description }}</p>
      <ODivider v-if="lePadV" />
      <OLink :color="lePadV ? 'normal' : 'primary'" :href="card.url" target="_blank" :hover-underline="lePadV ? false : true">
        {{ card.linkText || '查看详情' }}
        <template #suffix v-if="lePadV || !isSelfDomain(card.url)">
          <IconOutlink v-if="!lePadV" />
          <OIcon v-else class="outlink-icon"><IconChevronRight /></OIcon>
        </template>
      </OLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  display: flex;
  gap: 24px;
  width: 100%;
  flex-wrap: wrap;

  .card-item {
    height: 184px;
    background-color: var(--o-color-fill2);
    border-radius: var(--o-radius-xs);
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;

    .o-link {
      margin-top: auto;
      :deep(.o-link-label) {
        display: flex;
        align-items: center;
      }
    }

    .card-title {
      font-weight: 500;
      color: var(--o-color-info1);
      @include h3;
    }

    .card-desc {
      margin-top: 8px;
      color: var(--o-color-info2);
      @include text1;
    }
  }

    /* 当有两个及以上时 */
  .card-item:first-child:nth-last-child(n+2),
  .card-item:first-child:nth-last-child(n+2) ~ .card-item {
    /* 除开 gap 后平分宽度 */
    /* 计算公式: (100% - (n-1)*gap) / n */
    flex: 1 1 calc((100% - 24px) / 2); /* 两个时 */
  }

  /* 当有三个及以上时 */
  .card-item:first-child:nth-last-child(n+3),
  .card-item:first-child:nth-last-child(n+3) ~ .card-item {
    flex: 0 0 calc((100% - 2 * 24px) / 3); /* 三个时 */
  }
}

@include respond-to('<=pad_v') {
  .card-list {
    flex-direction: column;

    & .card-item {
      :deep(.o-link-label) {
        width: 100%;
        justify-content: space-between;
      }
    }
  }
}
</style>