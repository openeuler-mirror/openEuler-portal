<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OLink } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import { deployList } from '~@/data/intelligence';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const { t, locale, isZh } = useLocale();
const { gtLaptop, isLaptop, lePadV } = useScreen();

const gap = computed(() => {
  if (gtLaptop.value) {
    return '32px 0';
  } else if (isLaptop.value) {
    return '24px 0';
  }
  return '16px 0';
});
</script>
<template>
  <AppSection v-if="isZh" :title="t('intelligence.deploy')">
    <ORow :gap="gap" wrap="wrap" class="deploy-list">
      <OCol
        :flex="lePadV ? '0 0 100%' : '0 0 25%'"
        v-for="item in deployList"
        :key="item.id"
      >
        <div
          class="deploy-item"
          :style="{
            backgroundImage: `url(${isDark ? item.imgDark : item.img})`,
          }"
        >
          <p class="item-title">{{ item.title[locale] }}</p>
          <ul>
            <li v-for="val in item.list" :key="val.text">
              <OLink
                color="primary"
                variant="text"
                hoverUnderline
                :href="val.href"
                target="_blank"
              >
                {{ val.text }}
              </OLink>
            </li>
          </ul>
        </div>
      </OCol>
    </ORow>
    <div class="contact">
      <p>{{ t('intelligence.contactText') }}</p>
      <OLink
        color="primary"
        variant="text"
        hoverUnderline
        href="mailto:intelligence@openeuler.org"
      >
        intelligence@openeuler.org
      </OLink>
    </div>
  </AppSection>
  <AppSection v-else class="app-section-en">
    <div class="contact">
      <p>{{ t('intelligence.contactText') }}</p>
      <OLink
        color="primary"
        variant="text"
        hoverUnderline
        href="mailto:intelligence@openeuler.org"
      >
        intelligence@openeuler.org
      </OLink>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.app-section {
  --o-gap-section: 72px;

  @include respond-to('<=laptop') {
    --o-gap-section: 56px;
  }
  @include respond-to('pad_h') {
    --o-gap-section: 40px;
  }
  @include respond-to('<=pad_v') {
    --o-gap-section: 32px;
  }
}

.app-section-en {
  :deep(.section-wrapper) {
    margin-top: 0;

    @include respond-to('<=laptop') {
      margin-top: 0;
    }
    @include respond-to('pad_h') {
      margin-top: 0;
    }
    @include respond-to('<=pad_v') {
      margin-top: 0;
    }
  }
}

.info-title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include text2;
}
.info-desc {
  color: var(--o-color-info3);
  margin-top: 8px;
  @include text1;
}

.deploy-item {
  height: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-color: var(--o-color-fill2);
  padding: 32px;
  border-radius: var(--o-radius-xs);
  .item-title {
    font-size: 28px;
    line-height: 40px;
    font-weight: 500;
  }
  ul {
    list-style-type: disc;
    padding-left: 24px;
    margin-top: 24px;
  }
  li {
    padding: 8px 0;
    @include text1;
  }
  .o-link {
    display: block;
  }
}
.contact {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  text-align: center;
  @include text2;
}

@include respond-to('laptop') {
  .deploy-item {
    padding: 24px;
    .item-title {
      @include h2;
    }
    ul {
      padding-left: 16px;
      margin-top: 16px;
    }
    li {
      padding: 4px 0;
    }
  }
}
@include respond-to('pad_h') {
  .item-desc {
    margin-top: 8px;
  }

  .deploy-item {
    padding: 16px;
    .item-title {
      @include h3;
    }
    ul {
      padding-left: 12px;
      margin-top: 16px;
    }
    li {
      padding: 4px 0;
    }
  }
}

@include respond-to('<=pad_v') {
  .deploy-item {
    height: auto;
    padding: 16px;
    .item-title {
      @include h2;
    }
    ul {
      padding-left: 24px;
      margin-top: 8px;
    }
    li {
      padding: 4px 0;
      @include text2;
    }
  }
  .o-col + .o-col {
    margin-top: 12px;
  }

  .contact {
    flex-direction: column;
  }
}
</style>
