<script lang="ts" setup>
import { ORow, OCol, OLink, OIcon, ODropdown, ODropdownItem } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import IconOutLink from '~icons/app-new/icon-outlink.svg';
import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

const { t } = useLocale();

const jdkDocLinks = [
  { textKey: 'bishengJdk.jdk8', href: 'https://atomgit.com/openeuler/bishengjdk-8/wikis/Home' },
  { textKey: 'bishengJdk.jdk11', href: 'https://atomgit.com/openeuler/bishengjdk-11/wikis/Home' },
  { textKey: 'bishengJdk.jdk17', href: 'https://atomgit.com/openeuler/bishengjdk-17/wikis/Home' },
  { textKey: 'bishengJdk.jdk21', href: 'https://atomgit.com/openeuler/bishengjdk-21/wikis/Home' },
];

const learnItems = [
  {
    titleKey: 'bishengJdk.docsTitle',
    descKey: 'bishengJdk.docsDesc',
    hasDocs: true,
  },
  {
    titleKey: 'bishengJdk.courseTitle',
    descKey: 'bishengJdk.courseDesc',
    links: [
      {
        textKey: 'bishengJdk.courseLink',
        href: 'https://education.huaweicloud.com/courses/course-v1:HuaweiX+CBUCNXK067+Self-paced/about',
      },
    ],
  },
  {
    titleKey: 'bishengJdk.downloadTitle',
    descKey: 'bishengJdk.downloadDesc',
    links: [
      {
        textKey: 'bishengJdk.downloadLink',
        href: 'https://www.hikunpeng.com/zh/developer/devkit/compiler/jdk',
      },
    ],
  },
];
</script>

<template>
  <AppSection :title="t('bishengJdk.learningTitle')">
    <ORow gap="24px" wrap="wrap" class="learn-row">
      <OCol
        v-for="(item, i) in learnItems"
        :key="i"
        flex="1 1 240px"
      >
        <div class="learn-card">
          <p class="learn-title">{{ t(item.titleKey) }}</p>
          <p v-if="t(item.descKey)" class="learn-desc">{{ t(item.descKey) }}</p>

          <!-- 文档：ODropdown 下拉 -->
          <template v-if="item.hasDocs">
            <ODropdown trigger="hover" class="docs-dropdown">
              <OLink color="primary" hover-underline class="docs-link">
                {{ t('bishengJdk.viewDocs') }}
                <template #suffix>
                  <OIcon class="docs-chevron"><IconChevronDown /></OIcon>
                </template>
              </OLink>
              <template #dropdown>
                <ODropdownItem
                  v-for="doc in jdkDocLinks"
                  :key="doc.href"
                  @click="() => window.open(doc.href, '_blank')"
                >
                  {{ t(doc.textKey) }}
                </ODropdownItem>
              </template>
            </ODropdown>
          </template>

          <!-- 单链接 -->
          <template v-else-if="item.links">
            <div
              v-for="link in item.links"
              :key="link.href"
              class="learn-link-wrap"
            >
              <OLink
                :href="link.href"
                target="_blank"
                color="primary"
                hover-underline
                class="learn-link"
              >
                {{ t(link.textKey) }}
                <template #suffix>
                  <OIcon class="link-icon"><IconOutLink /></OIcon>
                </template>
              </OLink>
            </div>
          </template>
        </div>
      </OCol>
    </ORow>
  </AppSection>
</template>

<style scoped lang="scss">
.learn-row {
  width: 100%;
}

.learn-card {
  height: 100%;
  min-height: 140px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
}

.learn-title {
  font-weight: 500;
  color: var(--o-color-info1);
  @include h3;
}

.learn-desc {
  margin-top: 8px;
  color: var(--o-color-info3);
  @include text1;
  flex: 1;
}

.docs-dropdown {
  margin-top: 16px;
}

.docs-link {
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.docs-chevron {
  --icon-size: 16px;
}

.learn-link-wrap {
  margin-top: 16px;
}

.learn-link {
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
  .learn-card {
    padding: 20px 24px;
    min-height: 120px;
  }
}

@include respond-to('pad_h') {
  .learn-card {
    padding: 16px 20px;
    min-height: 110px;
  }
}

@include respond-to('<=pad_v') {
  .learn-card {
    padding: 16px;
    min-height: auto;
  }

  .learn-title {
    @include text2;
  }

  .docs-dropdown {
    margin-top: 12px;
  }

  .learn-link-wrap {
    margin-top: 12px;
  }
}
</style>
