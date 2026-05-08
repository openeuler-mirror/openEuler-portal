<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OLink, OIcon } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import IconOutLink from '~icons/app-new/icon-outlink-new.svg';

const { t } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();

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

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 0';
  } else if (leLaptop.value) {
    return '24px 0';
  }
  return '32px 0';
});
</script>

<template>
  <AppSection :title="t('bishengJdk.linksTitle')">
    <ORow :gap="gap" wrap="wrap" class="links-row">
      <OCol
        v-for="(item, i) in linkItems"
        :key="i"
        :flex="lePadV ? '1 1 100%' : '1 1 33.33%'"
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
.link-card {
  height: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px 16px;
  display: flex;
  flex-direction: column;
}

.link-title {
  font-weight: 600;
  color: var(--o-color-info1);
  margin-bottom: 16px;
  @include h3;
}

.link-detail {
  margin-top: auto;
  padding: 8px 0;
  @include text1;
}

.link-icon {
  --icon-size: 24px;
}

@include respond-to('<=laptop') {
  .link-icon {
    --icon-size: 16px;
  }
}

@include respond-to('laptop') {
  .link-card {
    padding: 24px 24px 16px;
  }
}

@include respond-to('pad_h') {
  .link-card {
    padding: 16px 16px 8px;
  }
}

@include respond-to('<=pad_v') {
  .link-card {
    padding: 12px;
  }

  .link-title {
    margin-bottom: 8px;
    @include text2;
  }
  .link-detail {
    padding: 5px 0;
  }

  .o-link {
    @include text2;
  }
}
</style>
