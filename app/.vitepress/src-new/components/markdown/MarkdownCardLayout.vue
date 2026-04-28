<script setup>
import { computed } from 'vue';
import { OLink, ODivider, ORow, OCol, OIcon } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import IconOutlink from '~icons/app-new/icon-outlink-new.svg';
import IconDownload from '~icons/app-new/icon-download.svg';

const { lePadV, lePad, leLaptop } = useScreen();

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
        description: props.data[i + 1].content.replace(/&nbsp;/g, '').trim(),
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

const isMail = (url) => {
  return url.includes('mailto:');
};

const leng = computed(() => {
  return cards.value?.length > 2 ? 3 : cards.value?.length;
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
});
</script>

<template>
  <div class="card-list">
    <ORow :gap="gap" wrap="wrap">
      <OCol v-for="(card, index) in cards" :key="index" :flex="lePadV ? '0 0 100%' : `0 0 ${100 / leng}%`">
        <div class="card-item">
          <p class="card-title">{{ card.title }}</p>
          <p v-if="card.description" class="card-desc">{{ card.description }}</p>
          <ODivider v-if="lePadV" />
          <OLink v-if="card.linkText.includes('/download')" :color="lePadV ? 'normal' : 'primary'" :href="card.url" target="_blank" :hover-underline="lePadV ? false : true" download class="download">
            <OIcon v-if="!lePadV && !isSelfDomain(card.url) && !isMail(card.url)"><IconDownload /></OIcon>
            {{ card.linkText.replace('/download', '') || '查看详情' }}
            <OIcon v-if="lePadV && !isSelfDomain(card.url) && !isMail(card.url)"><IconDownload /></OIcon>
          </OLink>
          <OLink v-else :color="lePadV ? 'normal' : 'primary'" :href="card.url" target="_blank" :hover-underline="lePadV ? false : true">
            {{ card.linkText || '查看详情' }}
            <template #suffix v-if="(lePadV || !isSelfDomain(card.url)) && !isMail(card.url)">
              <OIcon v-if="!lePadV"><IconOutlink /></OIcon>
              <OIcon v-else><IconChevronRight /></OIcon>
            </template>
          </OLink>
        </div>
      </OCol>
    </ORow>
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  .card-item {
    background-color: var(--o-color-fill2);
    border-radius: var(--o-radius-xs);
    padding: 24px 32px;
    height: 100%;
    min-height: 126px;
    display: flex;
    flex-direction: column;

    .o-link {
      margin-top: auto;
      @include text1;
      :deep(.o-link-label) {
        display: flex;
        align-items: center;
      }
    }
    .download {
      .o-icon {
        margin-right: 8px;
      }
    }
    
    .o-icon {
      --icon-size: 24px;
    }

    .card-title {
      font-weight: 500;
      color: var(--o-color-info1);
      @include h3;
    }
    
    .card-desc {
      margin: 8px 0 24px;
      color: var(--o-color-info2);
      @include text1;
      @include text-truncate(2);
    }
  }
}

@include respond-to('<=laptop') {
  .card-list .card-item {
    padding: 24px;
    min-height: 112px;
    .o-icon {
      --icon-size: 16px;
    }
    .card-desc {
      margin: 8px 0 16px;
    }
  }
}

@include respond-to('<=pad') {
  .card-list .card-item {
    padding: 16px;
    min-height: 94px;
  }
}

@include respond-to('<=pad_v') {
  .card-list .card-item {
    padding: 12px;
    min-height: auto;
    .o-link {
      :deep(.o-link-label) {
        width: 100%;
        justify-content: space-between;
      }
    }
    .download {
      .o-icon {
        margin-right: 0;
      }
    }
    .card-desc {
      margin: 8px 0 0;
    }
  }
}
</style>