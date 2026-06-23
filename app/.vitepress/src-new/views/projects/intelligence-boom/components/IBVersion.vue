<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { OButton } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
import { useData } from 'vitepress';
import { useScreen } from '~@/composables/useScreen';
import TechArchitecture from './TechArchitecture.vue';

import { VERSION_INFO } from '~@/data/project/intelligence-boom';
import { LocaleT } from '~@/@types/type-locale';
import IconOutLink from '~icons/app-new/icon-outlink-new.svg';

enum VersionType {
  FIRST = 'first',
  SECOND = 'second'
}

const props = defineProps({
  version: {
    type: String as PropType<VersionType>,
    default: VersionType.SECOND,
    validator: (value: any) => {
      return Object.values(VersionType).includes(value)
    }
  }
});

const commonStore = useCommon();
const { lang } = useData();
const { t } = useLocale();
const { lePadV } = useScreen();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const versionInfo = computed(() => {
  const locale = lang.value as LocaleT;
  const version = props.version as keyof typeof VERSION_INFO[LocaleT];

  return VERSION_INFO[locale]?.[version];
});
</script>
<template>
  <AppSection
    :title="versionInfo.name"
    :subtitle="versionInfo.desc"
    class="version-section"
  >
    <div class="version-body feature-content">
      <div class="version-picture">
        <img :src="versionInfo.picture" />
          <OButton
            class="version-btn"
            animation
            variant="solid"
            color="primary"
            :size="lePadV ? 'small' : 'large'"
            :href="versionInfo.url"
            target="_blank"
          >{{ t('intelligenceBoom.tryItNow') }}
          <template #suffix><IconOutLink /></template>
          </OButton>
      </div>
      <div class="version-desc">
        <div class="version-desc-item" v-for="feature in versionInfo.feature" :key="feature.title">
          <p class="feature-title">{{ feature.title }}</p>
          <div class="feature-list">
            <div class="feature-item" v-for="item in feature.desc" :key="item">
              <div class="dot"></div>
              <div>
                <span class="feature-item-name">{{ item.name }}</span>
                <span>{{ item.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="version-body framework-content">
      <TechArchitecture :version="version" />
    </div>

    <template v-if="lePadV" #footer>
      <p>
        {{ t('intelligenceBoom.frameworkDesc') }}
      </p>
    </template>
  </AppSection>
</template>

<style scoped lang="scss">
.version-section {
  :deep(.section-subtitle),
  :deep(.section-footer) {
    font-size: 14px;
    line-height: 22px;
  }
}
.version-body {
  padding: 32px;
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);

  @include respond('<=pad_v') {
    padding: 4px;
  }

  & + .version-body {
    margin-top: var(--o-gap-4);
  }
}

.feature-content {
  display: flex;
  flex-direction: row;
  gap: var(--o-gap-10);
  justify-content: center;
  align-items: center;

  .version-picture {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: 30px;

    & img {
      height: 218px;
      width: 218px;
      margin-bottom: var(--o-gap-5);
    }
  }

  .version-desc {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: var(--o-gap-6);

    .version-desc-item {
      flex: 0 0 calc(50% - var(--o-gap-6));

      .feature-title {
        font-weight: 600;
        @include h3;
      }

      .feature-list {
        margin-top: var(--o-gap-3);
        display: flex;
        flex-direction: column;
        gap: var(--o-gap-1);

        .feature-item {
          position: relative;
          color: var(--o-color-info3);
          display: flex;
          flex-direction: row;
          @include text1;

          @include respond('phone') {
            font-size: 14px;
            line-height: 22px;
          }

          .dot{
            width: 24px;
            height: 24px;
            position: relative;
            display: inline-block;
            flex: 0 0 24px;

            &::before {
              content: "•";
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, -50%);
            }

            @include respond('phone') {
              width: 16px;
              flex: 0 0 16px;
            }
          }

          .feature-item-name {
            font-weight: 600;
          }
        }
      }
    }
  }

  @include respond('<=pad_v') {
    flex-direction: column;
    padding: 16px;
    gap: 12px;

    .version-picture {
      margin-left: 0;

      :deep(img) {
        margin-bottom: 12px;
        height: 130px;
        width: 130px;
      }
    }

    .version-desc {
      flex-direction: column;
      gap: 12px;

      .version-desc-item {
        flex: 1;
      }
    }
  }
}
</style>

