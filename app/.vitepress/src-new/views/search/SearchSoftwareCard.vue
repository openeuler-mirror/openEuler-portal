<script lang="ts" setup>
import { type PropType, ref, onMounted } from 'vue';

import { useData } from 'vitepress';

import { storeToRefs } from 'pinia';

import { OCard, OTag, OIcon } from '@opensig/opendesign';
import type { AppItemT, PkgIdsT, PkgTypeT } from '~@/@types/type-search';

import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

import { getTagsIcon } from '~@/shared/search';
import { maintainerDefaults } from '~@/data/search';

import defaultImg from '~@/assets/category/search/default-logo.png';
import IconUser from '~icons/app-new/icon-user.svg';

defineProps({
  data: {
    type: Object as PropType<AppItemT>,
    default: () => {},
  },
});
const { locale, t } = useLocale();
const { theme } = storeToRefs(useCommon());
const { site } = useData();

// Maintainer数据
function getMaintainersStr(params: PkgIdsT) {
  const line = ' ; ';
  const defaultName = maintainerDefaults.name;
  if (params && Object.entries(params).length > 0) {
    const maintainers = Object.entries(params).map(([key, value]) =>
      value ? value : defaultName
    );
    // 去重
    const uniqueVal = [...new Set(maintainers)];
    return uniqueVal.join(line).replace(/ ; +$/, '');
  } else {
    return defaultName;
  }
}

// 名称转换
const pkgNameConversion = (v: string) => {
  return v === 'IMAGE' ? 'app' : v.toLocaleLowerCase();
};

// 跳转id
function getQueryStr(params: PkgIdsT) {
  if (Object.entries(params).length > 0) {
    const ids = Object.entries(params)
      .filter(([key, value]) => value)
      .map(
        ([key, value]) =>
          `${pkgNameConversion(key)}PkgId=${encodeURIComponent(value)}`
      );

    return ids.join('&').replace(/^&/, '');
  }
}
const jumpTo = (id: PkgIdsT, type?: PkgTypeT) => {
  return `${site.value.themeConfig.softwareUrl}/${locale.value}/field/detail?${
    type ? `type=${type}&` : ''
  }${getQueryStr(id)}`;
};

const repeatTags = (v: string) => {
  return v.toLocaleLowerCase() === 'image' ? t('software.apppkg') : v;
};
</script>

<template>
  <OCard
    :style="{
      height: 'auto',
      '--card-main-padding': '24px',
    }"
    hoverable
    class="o-card-pkg"
  >
    <template #main>
      <div class="pkg-info">
        <a
          :href="jumpTo(data.pkgIds)"
          target="_blank"
          rel="noopener noreferrer"
          class="name-info"
        >
          <span v-dompurify-html="data.name" class="name"></span
          ><span v-if="data.arch" class="arch">/{{ data.arch }}</span>
        </a>
        <div class="pkg-icon">
          <img
            :src="data.iconUrl || defaultImg"
            class="icon"
            :class="{ 'default-img': !data.iconUrl }"
          />
        </div>
      </div>
      <p v-if="data.os" class="pkg-os">{{ data.os }}</p>
      <div class="pkg-box">
        <div v-if="data.tags && data.tags.length > 0" class="tags-box">
          <a
            :href="jumpTo(data.pkgIds, tag)"
            v-for="tag in data.tags"
            :key="tag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <OTag
              style="--o-icon_size_control-xs: 0"
              variant="outline"
              :class="`${tag.toLocaleLowerCase()}-icon`"
            >
              <template #icon>
                <OIcon><component :is="getTagsIcon(tag)" /></OIcon>
              </template>
              {{ repeatTags(tag) }}
            </OTag>
          </a>
        </div>
        <p
          v-dompurify-html="data.description"
          class="desc"
          :class="{ dark: theme === 'dark' }"
        ></p>
        <p class="maintainers">
          <OIcon><IconUser /></OIcon>{{ getMaintainersStr(data.maintainers) }}
        </p>
      </div>
    </template>
  </OCard>
</template>

<style lang="scss" scoped>
.home {
  .o-card-main {
    .arch,
    .pkg-os {
      display: none;
    }
    .pkg-icon {
      align-items: center;
    }
    .pkg-info {
      height: auto;
      align-items: center;
    }
    .name-info {
      height: inherit;
    }
  }
}

:deep(.o-card-main) {
  justify-content: space-between;
  @include respond-to('<=pad_v') {
    padding: 12px 16px;
  }
  &:hover {
    .name-info {
      color: var(--o-color-primary1);
    }
  }
  .pkg-os {
    @include tip1;
    color: var(--o-color-info2);
    margin-top: 6px;
  }
  .pkg-info {
    display: flex;
    height: 60px;
    align-items: flex-start;
    @include respond-to('<=pad_v') {
      height: 32px;
    }
  }
  .pkg-icon {
    height: 32px;
    width: 64px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .name-info {
    @include h3;
    color: var(--o-color-info1);
    flex: 1;
    word-break: break-word;
    font-weight: 500;
    transition: all 0.3s ease;
    display: -webkit-box;
    height: 60px;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: relative;
    word-break: break-all;
    @include respond-to('<=pad_v') {
      height: 32px;
    }
    .name span {
      color: var(--o-color-primary1);
    }
  }
  .pkg-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tags-box {
      margin-top: 24px;
      @include respond-to('<=pad_v') {
        margin-top: 8px;
      }
    }
    .maintainers {
      @include tip1;
      color: var(--o-color-info3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: flex;
      align-items: center;
      margin-top: 16px;
      @include respond-to('<=pad_v') {
        margin-top: 8px;
      }
      .o-icon {
        margin-right: 8px;
        color: var(--o-color-info3);
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}

.tags-box {
  display: flex;
  margin: 12px 0 0;
  :deep(.o-tag-icon) {
    width: 16px;
    height: 16px;
  }
  > a + a {
    margin-left: 8px;
  }
  .o-tag {
    cursor: pointer;
    --tag-padding: 2px 4px;
    --tag-bd-color: var(--o-color-control1-light);
    &.image-icon .o-icon {
      color: #007af0;
    }
    &.epkg-icon .o-icon {
      color: #e00070;
    }
    &.rpm-icon .o-icon {
      color: #00a7b3;
    }
    &:hover {
      --tag-bg-color: var(--o-color-control2-light);
    }
    .o-tag-icon {
      height: 16px;
    }
    svg {
      width: 16px;
      height: 16px;
      color: currentColor;
    }
  }
  .o-tag + .o-tag {
    margin-left: 8px;
  }
}

.o-icon {
  svg {
    fill: currentColor;
  }
}

.o-tab-nav-active {
  font-weight: 500;
}

.o-card-pkg {
  .desc {
    margin-top: 8px;
    color: var(--o-color-info2);
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    position: relative;
    word-break: break-all;
    height: 48px;
    @include respond-to('<=pad_v') {
      height: 36px;
    }
    --linear-gradient: var(--o-mixedgray-1);
    &.dark {
      --linear-gradient: var(--o-mixedgray-4);
    }
    @include text1;
    &::after {
      background-image: linear-gradient(
        90deg,
        rgba(var(--linear-gradient), 0),
        rgba(var(--linear-gradient), 0.8) 59%,
        var(--o-color-control-light) 100%
      );
      bottom: 0;
      content: '';
      height: 24px;
      pointer-events: none;
      position: absolute;
      right: 0;
      width: 4em;
    }
    span {
      color: var(--o-color-primary1);
    }
  }
}
</style>
