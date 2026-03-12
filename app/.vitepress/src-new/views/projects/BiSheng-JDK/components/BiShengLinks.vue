<script lang="ts" setup>
import { ORow, OCol, OLink, OIcon } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import IconOutLink from '~icons/app-new/icon-outlink.svg';

const { t } = useLocale();

const linkItems = [
  {
    titleKey: 'bishengJdk.linkBishengJdk',
    href: 'https://www.hikunpeng.com/developer/devkit/compiler/jdk',
  },
  {
    titleKey: 'bishengJdk.linkBishengCompiler',
    href: 'https://www.hikunpeng.com/developer/devkit/compiler/bisheng',
  },
  {
    titleKey: 'bishengJdk.linkGcc',
    href: 'https://www.hikunpeng.com/developer/devkit/compiler/gcc',
  },
];
</script>

<template>
  <AppSection :title="t('bishengJdk.linksTitle')">
    <ORow gap="24px" wrap="wrap" class="links-row">
      <OCol
        v-for="(item, i) in linkItems"
        :key="i"
        flex="1 1 240px"
      >
        <div class="link-card">
          <p class="link-title">{{ t(item.titleKey) }}</p>
          <OLink
            :href="item.href"
            target="_blank"
            color="primary"
            hover-underline
            class="link-detail"
          >
            {{ t('bishengJdk.viewDetails') }}
            <template #suffix>
              <OIcon class="link-icon"><IconOutLink /></OIcon>
            </template>
          </OLink>
        </div>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.links-row {
  width: 100%;
}

.link-card {
  height: 100%;
  min-height: 100px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.link-title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include h3;
}

.link-detail {
  margin-top: 16px;
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.link-icon {
  --icon-size: 16px;
}

@include respond-to('laptop') {
  .link-card {
    padding: 20px 24px;
    min-height: 90px;
  }
}

@include respond-to('pad_h') {
  .link-card {
    padding: 16px 20px;
  }
}

@include respond-to('<=pad_v') {
  .link-card {
    padding: 16px;
    min-height: auto;
  }

  .link-title {
    @include text2;
  }

  .link-detail {
    margin-top: 12px;
  }
}
</style>
