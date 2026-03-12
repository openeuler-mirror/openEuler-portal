<script lang="ts" setup>
import { ORow, OCol, OLink, OIcon } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import IconOutLink from '~icons/app-new/icon-outlink.svg';

const { t } = useLocale();

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
</script>

<template>
  <AppSection>
    <ORow gap="24px" wrap="wrap" class="quick-links">
      <OCol
        v-for="(card, i) in quickLinks"
        :key="i"
        flex="1 1 240px"
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
.quick-links {
  width: 100%;
}

.ql-card {
  height: 100%;
  min-height: 120px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ql-title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include h3;
}

.ql-actions {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;
}

.ql-link {
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.ql-icon {
  --icon-size: 16px;
}

@include respond-to('laptop') {
  .ql-card {
    padding: 20px 24px;
    min-height: 110px;
  }
}

@include respond-to('pad_h') {
  .ql-card {
    padding: 16px 20px;
    min-height: 100px;
  }
}

@include respond-to('<=pad_v') {
  .ql-card {
    padding: 16px;
    min-height: auto;
  }

  .ql-title {
    @include text2;
  }

  .ql-actions {
    margin-top: 12px;
  }
}
</style>
