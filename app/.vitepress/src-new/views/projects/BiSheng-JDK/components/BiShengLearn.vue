<script lang="ts" setup>
import { computed } from 'vue';
import { ORow, OCol, OLink, OIcon, ODropdown, ODropdownItem, OButton } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import IconOutLink from '~icons/app-new/icon-outlink-new.svg';
import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

const { t, isEn } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();

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
  <AppSection :title="t('bishengJdk.learningTitle')">
    <ORow :gap="gap" wrap="wrap" class="learn-row">
      <OCol
        v-for="(item, i) in learnItems"
        :key="i"
        :flex="lePadV ? '1 1 100%' : '1 1 33.33%'"
      >
        <div class="learn-card">
          <p class="learn-title">{{ t(item.titleKey) }}</p>
          <p v-if="t(item.descKey)" class="learn-desc">{{ t(item.descKey) }}</p>

          <!-- 文档：ODropdown 下拉 -->
          <template v-if="item.hasDocs">
            <ODropdown :trigger="lePadV ? 'click' : 'hover'" option-position="bottom" class="docs-dropdown">
              <OButton color="primary" variant="text" size="large" class="docs-link">
                {{ t('bishengJdk.viewDocs') }}
                <template #suffix>
                  <OIcon class="docs-chevron"><IconChevronDown /></OIcon>
                </template>
              </OButton>
              <template #dropdown>
                <ODropdownItem
                  v-for="doc in jdkDocLinks"
                  :key="doc.href"
                >
                  <OLink OLink :href="doc.href" target="_blank" class="dropdown-link">{{ t(doc.textKey) }}</OLink>
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
.learn-card {
  height: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 32px 16px;
  display: flex;
  flex-direction: column;
}

.learn-title {
  font-weight: 600;
  color: var(--o-color-info1);
  @include h3;
}

.learn-desc {
  margin: 8px 0 16px;
  color: var(--o-color-info3);
  @include text1;
}

.docs-dropdown {
  margin-top: auto;
  width: 132px;
}
.o-dropdown-item {
  background: var(--o-color-fill2);
  cursor: pointer;
  --dropdown-item-radius: var(--o-radius-xs);
  --dropdown-item-justify: flex-start;
  --dropdown-item-padding: 0;

  @include hover {
    color: var(--o-color-primary1);
    background: var(--o-color-control2-light);
  }
}
.dropdown-link {
  padding: 8px 12px;
}

.docs-link {
  padding: 0;
  --btn-bg-color-hover: transparent;
  --btn-bg-color-active: transparent;
  justify-content: flex-start;
  @include text1;
}

.docs-chevron {
  --icon-size: 24px;
}

.learn-link-wrap {
  margin-top: auto;
  display: flex;
  align-items: center;
}

.learn-link {
  padding: 8px 0;
  @include text1;
}
.learn-link + .learn-link {
  margin-left: 16px;
}

.link-icon {
  --icon-size: 24px;
}

@include respond-to('<=laptop') {
  .docs-chevron {
    --icon-size: 16px;
  }
  .docs-link {
    --btn-height: 38px;
  }
  .link-icon {
    --icon-size: 16px;
  }
}

@include respond-to('laptop') {
  .learn-card {
    padding: 24px 24px 16px;
  }
}

@include respond-to('pad_h') {
  .learn-card {
    padding: 16px 16px 8px;
  }
}

@include respond-to('<=pad_v') {
  .learn-card {
    padding: 12px;
  }

  .learn-title {
    @include text2;
  }
  .learn-desc {
    margin: 8px 0;
  }
  .docs-link {
    --btn-height: 32px;
  }
  .learn-link {
    padding: 5px 0;
  }

  .o-link {
    @include text2;
  }
}
</style>
