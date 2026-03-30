<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OLink, OIcon } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import IconOutLink from '~icons/app-new/icon-outlink-new.svg';

const { t } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();

const quickLinks = [
  {
    titleKey: 'bishengJdk.sigTitle',
    links: [
      {
        textKey: 'bishengJdk.sig2021',
        href: 'https://atomgit.com/openeuler/bishengjdk-8/wikis/Compiler%20SIG%E4%BE%8B%E4%BC%9A?sort_id=4182234',
      },
      {
        textKey: 'bishengJdk.sig2022',
        href: 'https://etherpad.openeuler.org/p/Compiler-meetings',
      },
    ],
  },
  {
    titleKey: 'bishengJdk.roadmapTitle',
    links: [
      {
        textKey: 'bishengJdk.viewDetails',
        href: 'https://atomgit.com/openeuler/bishengjdk-8/wikis/%E9%A1%B9%E7%9B%AE%E8%B7%AF%E6%A0%87?sort_id=4182245',
      },
    ],
  },
  {
    titleKey: 'bishengJdk.tckTitle',
    links: [
      {
        textKey: 'bishengJdk.viewDetails',
        href: '/other/projects/bishengjdk/tck-affidavit/',
        isInternal: true,
      },
    ],
  },
];

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 0';
  } else if (leLaptop.value) {
    return '24px 0';
  }
  return '32px 0';
})
</script>

<template>
  <AppSection>
    <ORow :gap="gap" wrap="wrap" class="quick-links">
      <OCol
        v-for="(card, i) in quickLinks"
        :key="i"
        :flex="lePadV ? '1 1 100%' : '1 1 33.33%'"
      >
        <div class="ql-card">
          <p class="ql-title">{{ t(card.titleKey) }}</p>
          <div class="ql-actions">
            <OLink
              v-for="(link, j) in card.links"
              :key="j"
              :href="link.href"
              :target="link.isInternal ? '_self' : '_blank'"
              color="primary"
              hover-underline
              class="ql-link"
            >
              {{ t('bishengJdk.viewDetails') }}
              <template #suffix>
                <OIcon class="ql-icon"><IconOutLink /></OIcon>
              </template>
            </OLink>
          </div>
        </div>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.app-section {
  :deep(.section-wrapper) {
    margin-top: 32px;
  }
}

.ql-card {
  height: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ql-title {
  font-weight: 600;
  color: var(--o-color-info1);
  margin-bottom: 16px;
  @include h3;
}

.ql-actions {
  display: flex;
  flex-wrap: wrap;
  margin-top: auto;
}

.ql-link {
  padding: 8px 0;
  @include text1;
}
.ql-link + .ql-link {
  margin-left: 16px;
}

.ql-icon {
  --icon-size: 24px;
}

@include respond-to('<=laptop') {
  .ql-icon {
    --icon-size: 16px;
  }
}

@include respond-to('laptop') {
  .ql-card {
    padding: 24px 24px 16px;
  }
}

@include respond-to('pad_h') {
  .ql-card {
    padding: 16px 16px 8px;
  }
}

@include respond-to('<=pad_v') {
  .ql-card {
    padding: 12px;
  }

  .ql-title {
    margin-bottom: 8px;
    @include text2;
  }
  .ql-link {
    padding: 5px 0;
  }
  .o-link {
    @include text2;
  }
}
</style>
