<script lang="ts" setup>
import { ref, computed, watch, nextTick, type PropType } from 'vue';
import { OInput, OIcon, OFigure, OPopover, vOutClick, OTab, OTabPane, useMessage } from '@opensig/opendesign';
import { useI18n } from 'vue-i18n';

import { useVModels } from '@vueuse/core';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import SearchRecommend from './SearchRecommend.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconClose from '~icons/app-new/icon-close.svg';
import IconUpload from '~icons/app-new/icon-image-upload.svg';
import IconImageClose from '~icons/app-new/icon-image-close.svg';
import IconImageZoomin from '~icons/app-new/icon-image-zoomin.svg';
import { oaReport } from '@/shared/analytics';
import { imageUpload } from '~@/api/api-search';

const props = defineProps({
  // 建议搜索词
  suggestList: {
    type: Array as PropType<string[]>,
    default: () => {
      return [];
    },
  },
  // tab数据
  tabData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  // input 框输入数据
  modelValue: {
    type: String,
    default: '',
  },
  currentTab: {
    type: String,
    default: '',
  },
  searchImage: {
    type: String,
    default: '',
  },
  isImageSearch: {
    type: Boolean,
    default: false,
  },
});

const tabDataLabelMap = computed<Map<string, any> | undefined>(() => {
  const tabData = props.tabData;
  if (tabData) {
    return Object.values(tabData).reduce(
      (map, val) => map.set(val.value, val.label),
      new Map()
    );
  }
});

const emits = defineEmits(['search', 'update:modelValue', 'update:currentTab', 'update:searchImage', 'update:isImageSearch']);

const { modelValue } = useVModels(props, emits);
const isFocus = ref(false);
const inputRef = ref();
const searchRecommendRef = ref();

const currentTab = computed({
  get: () => props.currentTab,
  set: (value: string) => {
    if (value !== props.currentTab) {
      //TODO: OTab 组件在此处会执行两次 set
      emits('update:currentTab', value);
    }
  },
});

const onTabChange = (val: any) => {
  reportSearch({
    type: 'tab',
    target: tabDataLabelMap.value?.get(val)?.[locale.value],
  });
};

const { lePadV } = useScreen();
const { locale } = useLocale();
const { t } = useI18n();

const changeModelValue = async () => {
  isFocus.value = false;
  if (isUploading.value && uploadPromise) {
    await uploadPromise;
  }
  emits('search', modelValue.value);
};

const handleSearchHistory = (val: string) => {
  if (val === modelValue.value) return;
  modelValue.value = val;
  isFocus.value = false;
  emits('search', val);
};
const handleClickSuggest = (val: string) => {
  val = val.replace(/<[^>]+>/g, '');
  modelValue.value = val;
  reportSearch({
    type: 'looking_for',
    target: val,
  });
  emits('search', val);
};

const reportSearch = (data: Record<string, any>) => {
  oaReport(
    'click',
    {
      module: 'search_result',
      content: modelValue.value,
      ...data,
    },
    'search_portal'
  );
};

const handleInput = () => {
  if (!isFocus.value) isFocus.value = true;
};

const verticalPadding = computed(() =>
  lePadV.value ? ['0', '0'] : ['72px', '0']
);

// -------- 图片搜索 --------
const localImage = ref('');
const showThumbnail = ref(false);
const fileInputRef = ref<HTMLInputElement>();
const uploadBtnRef = ref();
const isPreviewOpen = ref(false);
const justClosedPreview = ref(false);
const focusedFigureRef = ref<InstanceType<typeof OFigure>>();
const isUploading = ref(false);
let uploadPromise: Promise<void> | null = null;

const handleZoomClick = () => {
  isFocus.value = true;
  nextTick(() => {
    const img = (focusedFigureRef.value?.$el as HTMLElement)?.querySelector('img');
    img?.click();
  });
};

const onPreviewChange = (visible: boolean) => {
  isPreviewOpen.value = visible;
  if (!visible) {
    justClosedPreview.value = true;
    setTimeout(() => {
      justClosedPreview.value = false;
    }, 100);
  }
};

const handleOutClick = () => {
  if (!isPreviewOpen.value && !justClosedPreview.value) {
    isFocus.value = false;
  }
};

watch(
  () => props.searchImage,
  (val) => {
    if (val && !localImage.value) {
      localImage.value = val;
      showThumbnail.value = true;
    }
  },
  { immediate: true }
);

const handleImageFile = (file: File) => {
  localImage.value = URL.createObjectURL(file);
  showThumbnail.value = true;

  isUploading.value = true;
  uploadPromise = imageUpload({ image: file })
    .then((res) => {
      if (res.status === 200 && res.obj) {
        emits('update:searchImage', res.obj);
        emits('update:isImageSearch', true);
        oaReport(
          'upload',
          {
            module: 'search_result',
            content: modelValue.value,
            type: 'image-search',
            target: res.obj,
          },
          'search_portal'
        );
      }
    })
    .catch((err) => {
      if (err?.response?.status === 403) {
        const msg = useMessage();
        msg.show({ content: t('search.imageUploadFailed'), status: 'danger' });
      }
    })
    .finally(() => {
      isUploading.value = false;
    });
};

const removeImage = () => {
  URL.revokeObjectURL(localImage.value);
  localImage.value = '';
  showThumbnail.value = false;
  emits('update:searchImage', '');
  emits('update:isImageSearch', false);
};

const handleClearAll = () => {
  modelValue.value = '';
  removeImage();
};

const handleUploadClick = () => {
  fileInputRef.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    handleImageFile(file);
    target.value = '';
    nextTick(() => inputRef.value?.focus());
  }
};

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;
  if (!items) return;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      const file = items[i].getAsFile();
      if (file) handleImageFile(file);
      break;
    }
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  const file = event.dataTransfer?.files?.[0];
  if (file && file.type.indexOf('image') !== -1) {
    handleImageFile(file);
  }
};

defineExpose({ searchRecommendRef });</script>
<template>
  <div class="search-banner">
    <ContentWrapper :vertical-padding="verticalPadding">
      <div v-out-click="handleOutClick" class="search-box" @dragover.prevent="handleDragOver" @drop.prevent="handleDrop">
        <div class="search-input-wrapper" :class="{ 'with-image': showThumbnail && isFocus }">
          <OInput
            :placeholder="showThumbnail ? $t('search.imagePlaceholder') : $t('search.searchPlaceholder')"
            v-model.trim="modelValue"
            ref="inputRef"
            size="large"
            @input="handleInput"
            @focus="() => (isFocus = true)"
            @keyup.enter="changeModelValue"
            @paste="handlePaste"
          >
            <template #prefix>
              <OIcon class="icon"><IconSearch /></OIcon>
              <div v-if="showThumbnail && !isFocus" class="input-thumbnail-wrapper">
                <OFigure :src="localImage" alt="" class="input-thumbnail" />
                <div class="thumbnail-zoom-overlay" @mousedown.prevent @click.stop="handleZoomClick">
                  <OIcon class="thumbnail-zoom-icon"><IconImageZoomin /></OIcon>
                </div>
                <OIcon class="thumbnail-remove" @mousedown.prevent @click.stop="removeImage"><IconImageClose /></OIcon>
              </div>
            </template>
            <template #suffix>
              <span ref="uploadBtnRef" class="upload-btn">
                <OIcon class="icon upload-icon" @mousedown.prevent @click.stop="handleUploadClick">
                  <IconUpload />
                </OIcon>
              </span>
              <OPopover trigger="hover" position="bl" :target="uploadBtnRef" body-class="search-upload-tooltip-popup">
                {{ $t('search.imageUploadTooltip') }}
              </OPopover>
              <OIcon v-if="modelValue || showThumbnail" class="icon clear-icon" @mousedown.prevent @click.stop="handleClearAll">
                <IconClose />
              </OIcon>
            </template>
          </OInput>
          <div v-if="showThumbnail && isFocus" class="input-image-preview">
            <div class="preview-image-wrapper">
              <OFigure ref="focusedFigureRef" :src="localImage" preview alt="" class="preview-image" @preview="onPreviewChange" />
              <div class="preview-zoom-overlay">
                <OIcon class="preview-zoom-icon"><IconImageZoomin /></OIcon>
              </div>
              <OIcon class="preview-remove" @click.stop="removeImage"><IconImageClose /></OIcon>
            </div>
          </div>
        </div>
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          class="file-input"
          @change="handleFileSelect"
        />
        <ClientOnly>
          <SearchRecommend
            class="search-recommend"
            v-show="isFocus && !showThumbnail"
            ref="searchRecommendRef"
            @search-click="handleSearchHistory"
            :value="modelValue"
          />
        </ClientOnly>
      </div>
      <div v-show="suggestList?.length" class="suggest-list-box">
        <span class="suggest-label">{{ $t('search.suggest') }}</span>
        <ul class="suggest-list">
          <li
            v-for="suggest in suggestList"
            :key="suggest"
            v-dompurify-html="suggest"
            class="suggest"
            @click="handleClickSuggest(suggest)"
          ></li>
        </ul>
      </div>
      <OTab
        v-model="currentTab"
        :style="{
          '--tab-nav-anchor-color': lePadV
            ? 'var(--o-color-primary1)'
            : 'var(--o-color-white)',
        }"
        :line="false"
        @change="onTabChange"
      >
        <template v-for="item in tabData" :key="item.value">
          <OTabPane :value="item.value">
            <template #nav>
              {{ item.label[locale] }} ({{ item.total }})
            </template>
          </OTabPane>
        </template>
      </OTab>
    </ContentWrapper>
  </div>
</template>

<style scoped lang="scss">
.search-banner {
  background-image: url('~@/assets/category/search/search-banner.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @include respond-to('<=pad_v') {
    background: none;
  }
  .search-box {
    position: relative;
    width: calc(100% - 361px);
    @include respond-to('<=pad_v') {
      display: none;
    }
    .search-input-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;

      .o-input {
        width: 100%;
      }
      :deep(.o_box) {
        width: 100%;
        height: 48px;
        .o_input {
          width: 100%;
        }
      }

      &.with-image {
        border: 1px solid var(--o-color-primary1);
        border-radius: var(--o-radius-xs);

        :deep(.o_box-main) {
          border: none !important;
          box-shadow: none !important;
          border-radius: var(--o-radius-xs) var(--o-radius-xs) 0 0;
        }
      }
    }
    .search-recommend {
      position: absolute;
      top: 52px;
      width: 100%;
      z-index: 10;
    }
  }
  .suggest-list-box {
    display: flex;
    margin: 8px 0 0;
    color: var(--o-color-white);
    @include h4;
    align-items: center;
    flex-wrap: wrap;
    @include respond-to('<=pad_v') {
      display: none;
    }
    .suggest-label {
      @include tip1;
      color: rgba($color: var(--o-white), $alpha: 0.8);
    }
    .suggest-list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      @include tip1;
      .suggest {
        margin-right: 8px;
        cursor: pointer;
        :deep(em) {
          color: var(--o-color-white);
          font-style: normal;
        }
      }
    }
  }
  .o-tab {
    margin-top: 36px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @include h4;
    border-bottom: 1px solid var(--o-color-control4);
    @include respond-to('<=pad_v') {
      margin-top: 0;
      border-bottom: inherit;
    }
    :deep(.o-tab-head) {
      @include respond-to('<=pad_v') {
        width: 100%;
      }
    }

    :deep(.o-tab-nav) {
      color: rgba($color: var(--o-white), $alpha: 0.8);
      @include respond-to('<=pad_v') {
        color: var(--tab-icon-color);
      }
      &.o-tab-nav-active {
        color: var(--o-color-white);
        @include respond-to('<=pad_v') {
          color: var(--tab-nav-color-active);
        }
      }
    }
  }
}

.file-input {
  display: none;
}

.icon {
  cursor: pointer;
  color: var(--o-color-info2);
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 8px;
  cursor: pointer;
  flex-shrink: 0;

  @include hover {
    background-color: var(--o-color-control2-light);

    .upload-icon {
      color: var(--o-color-primary2);
    }
  }
}

.upload-icon {
  font-size: 24px;
}

.clear-icon {
  font-size: 24px;
  @include x-svg-hover;
}

:deep(.o_input-clear) {
  @include x-svg-hover;
}

.input-thumbnail-wrapper {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  position: relative;
  overflow: visible;
  flex-shrink: 0;

  @include hover {
    .thumbnail-remove {
      opacity: 1;
    }
    .thumbnail-zoom-overlay {
      opacity: 1;
    }
  }

  .input-thumbnail {
    height: 40px;
    width: 40px;
    border-radius: 4px;
    overflow: hidden;

    :deep(img) {
      height: 40px;
      width: 40px;
      object-fit: cover;
      object-position: center;
      border-radius: 4px;
    }
  }

  .thumbnail-zoom-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    pointer-events: auto;
    cursor: pointer;
    opacity: 0;
    transition: opacity var(--o-duration-m1);

    .thumbnail-zoom-icon {
      color: #fff;
      font-size: 16px;
    }
  }

  .thumbnail-remove {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 16px;
    height: 16px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    z-index: 1;
    transition: opacity var(--o-duration-m1);

    :deep(svg) {
      width: 16px;
      height: 16px;
      fill: rgb(var(--o-mixedgray-9));
    }
  }
}

.input-image-preview {
  padding: 0 12px 8px;
  background-color: var(--o-color-fill2);
  border-radius: 0 0 4px 4px;

  .preview-image-wrapper {
    position: relative;
    display: inline-flex;
    overflow: visible;

    @include hover {
      .preview-remove {
        opacity: 1;
      }
      .preview-zoom-overlay {
        opacity: 1;
      }
    }
  }

  .preview-zoom-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--o-duration-m1);

    .preview-zoom-icon {
      color: #fff;
      font-size: 24px;
    }
  }

  .preview-image {
    height: 72px;
    width: 72px;
    border-radius: 4px;
    overflow: hidden;

    :deep(img) {
      height: 72px;
      width: 72px;
      object-fit: cover;
      object-position: center;
      border-radius: 4px;
    }
  }

  .preview-remove {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 16px;
    height: 16px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    z-index: 1;
    transition: opacity var(--o-duration-m1);

    :deep(svg) {
      width: 16px;
      height: 16px;
      fill: rgb(var(--o-mixedgray-9));
    }
  }
}
</style>
<style lang="scss">
.search-upload-tooltip-popup {
  @include tip2;
  padding: var(--o-gap-3) var(--o-gap-4);
  max-width: 240px;
}
</style>
