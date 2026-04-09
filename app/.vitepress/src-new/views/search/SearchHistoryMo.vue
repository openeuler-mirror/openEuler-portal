<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '~@/i18n';

import type { SearchRecommendT } from '@/shared/@types/type-search';

import { getPop, getSearchRecommend } from '@/api/api-search';
import { imageUpload } from '~@/api/api-search';

import { useSearchValue } from '~@/stores/search';
import { useScreen } from '~@/composables/useScreen';
import { getUrlParam } from '~@/utils/common';

import { OFigure, OPopover } from '@opensig/opendesign';

import IconClose from '~icons/app-new/icon-close.svg';
import IconSearch from '~icons/app-new/icon-header-search.svg';
import IconDelete from '~icons/app-new/icon-header-delete.svg';
import IconDeleteAll from '~icons/app-new/icon-delete.svg';
import IconBack from '~icons/app-new/icon-header-back.svg';
import IconImageUpload from '~icons/app-new/icon-image-upload.svg';
import IconImageClose from '~icons/app-new/icon-image-close.svg';
import IconImageZoomin from '~icons/app-new/icon-image-zoomin.svg';
import { useDebounceFn } from '@vueuse/core';
import { oaReport } from '@/shared/analytics';

const { lang } = useData();
const { lePadV } = useScreen();

const emits = defineEmits(['focus-input', 'search-click']);
const isShowDrawer = ref(false);
const searchInput = ref('');
const i18n = useI18n();

const router = useRouter();
const searchStore = useSearchValue();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const reportSearch = (event: string, data: Record<string, any>) => {
  const module = location.pathname.includes('other/search')
    ? 'search_page'
    : 'home_page';
  oaReport(event, { module, ...data }, 'search_portal');
};

// -------- 图片搜索 --------
const localImage = ref('');
const showThumbnail = ref(false);
const fileInputRef = ref<HTMLInputElement>();
const uploadedImageUrl = ref('');
const isUploading = ref(false);
let uploadPromise: Promise<void> | null = null;

const handleImageFile = (file: File) => {
  URL.revokeObjectURL(localImage.value);
  localImage.value = URL.createObjectURL(file);
  showThumbnail.value = true;

  uploadedImageUrl.value = '';
  isUploading.value = true;
  uploadPromise = imageUpload({ image: file })
    .then((res) => {
      if (res.status === 200 && res.obj) {
        uploadedImageUrl.value = res.obj;
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
  uploadedImageUrl.value = '';
  // 清除图片后用当前文字重新搜索
  searchStore.setSearchState(searchInput.value, '', false);
};

const handleUploadClick = () => {
  if (fileInputRef.value) fileInputRef.value.value = '';
  fileInputRef.value?.click();
};

const handleFileSelect = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) handleImageFile(file);
};

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;
  if (!items) return;
  for (let i = 0; i < items.length; i++) {
    if (items[i].type.indexOf('image') !== -1) {
      const file = items[i].getAsFile();
      if (file) { handleImageFile(file); break; }
    }
  }
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  const file = event.dataTransfer?.files?.[0];
  if (file && file.type.indexOf('image') !== -1) handleImageFile(file);
};

// 搜索事件
async function handleSearchEvent(report?: boolean) {
  if (showThumbnail.value) {
    if (report) {
      reportSearch('click', {
        content: searchInput.value || '[image]',
        type: 'image_search',
      });
    }
    if (isUploading.value && uploadPromise) {
      await uploadPromise;
    }
    isShowDrawer.value = false;
    searchStore.setSearchState(searchInput.value, uploadedImageUrl.value, true);
    return;
  }

  if (report) {
    reportSearch('click', { content: searchInput.value, type: 'search' });
  }
  isShowDrawer.value = false;
  handleSearch(searchInput.value);
  searchStore.setSearchState(searchInput.value, '', false);
}

type SearchItemClickType = 'history' | 'popular' | 'suggest';

const onTopSearchItemClick = (
  val: string,
  type: SearchItemClickType = 'history'
) => {
  searchInput.value = val;
  handleSearchEvent();
  reportSearch('click', { type, target: val });
};

const searchValue = computed(() => i18n.value.header.SEARCH);

const popList = ref<string[]>([]);
const showDrawer = () => {
  isShowDrawer.value = true;
  const params = `lang=${lang.value}`;
  if (popList.value?.length) return;
  getPop(params).then((res) => { popList.value = res.obj; });
};

const closeSearchBox = () => {
  searchInput.value = '';
  removeImage();
};

onMounted(() => {
  if (getUrlParam('q')) {
    searchInput.value = getUrlParam('q');
  }
  const urlImageUrl = getUrlParam('imageUrl');
  if (urlImageUrl) {
    localImage.value = urlImageUrl;
    showThumbnail.value = true;
    uploadedImageUrl.value = urlImageUrl;
  }
});

// ----------------- 联想搜索 -------------------------
const recommendData = ref<SearchRecommendT[]>([]);

const reportSearchInput = useDebounceFn(
  (content: string) => reportSearch('input', { content }),
  300
);

const queryGetSearchRecommend = (val: string) => {
  reportSearchInput(val);
  getSearchRecommend({ query: val }).then((res) => {
    recommendData.value = res.obj.word;
  });
};

watch(
  () => searchInput.value,
  (val: string) => {
    if (val) {
      queryGetSearchRecommend(val);
    } else {
      recommendData.value = [];
    }
  }
);

// ----------------------- 历史搜索记录 -----------------------
const searchHistory = ref<string[]>([]);

const loadSearchHistory = () => {
  const history = localStorage.getItem('search-history');
  if (history) {
    searchHistory.value = JSON.parse(history);
  }
};
loadSearchHistory();

const handleSearch = (searchValue: string) => {
  if (searchValue && Array.isArray(searchHistory.value)) {
    searchHistory.value.unshift(searchValue);
    searchHistory.value = Array.from(new Set(searchHistory.value));
    if (searchHistory.value.length > 6) searchHistory.value.pop();
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value));
  }
};

const deleteHistory = (data: string) => {
  if (!data) {
    localStorage.removeItem('search-history');
    searchHistory.value = [];
  }
  const history = localStorage.getItem('search-history');
  if (history) {
    searchHistory.value = JSON.parse(history).filter((s: string) => s !== data);
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value));
  }
};

const closeSearch = () => {
  if (!isShowDrawer.value) {
    router.go(`/${lang.value}/`);
    return;
  }
  isShowDrawer.value = false;
};
</script>
<template>
  <div class="search-wrapper">
    <div :class="{ search: !lePadV, focus: isShowDrawer && !lePadV }">
      <div ref="searchRef" class="header-search">
        <div class="input-focus" :class="{ 'has-image': showThumbnail && isShowDrawer }" @dragover="handleDragOver" @drop="handleDrop">
          <OIcon @click.stop="closeSearch"><IconBack></IconBack></OIcon>
          <div class="search-input-wrapper" :class="{ 'with-image': showThumbnail && isShowDrawer }">
            <OInput
              v-model="searchInput"
              :placeholder="showThumbnail ? searchValue.PLEACHOLDER_EXTEND : searchValue.PLEACHOLDER"
              @keyup.enter="handleSearchEvent(true)"
              @focus="showDrawer"
              @paste="handlePaste"
              class="normal"
            >
              <template #prefix>
                <OIcon class="icon"><IconSearch></IconSearch></OIcon>
                <div v-if="showThumbnail && !isShowDrawer" class="input-thumbnail-wrapper">
                  <OFigure :src="localImage" alt="" class="input-thumbnail" />
                  <div class="thumbnail-zoom-overlay">
                    <OIcon class="thumbnail-zoom-icon"><IconImageZoomin /></OIcon>
                  </div>
                  <OIcon class="thumbnail-remove" @mousedown.prevent @click.stop="removeImage"><IconImageClose /></OIcon>
                </div>
              </template>
              <template #suffix>
                <span class="upload-btn">
                  <OIcon class="upload icon" @mousedown.prevent @click="handleUploadClick">
                    <IconImageUpload />
                  </OIcon>
                </span>
                <OIcon class="close icon" @click="closeSearchBox"><IconClose /></OIcon>
              </template>
            </OInput>
            <div v-if="showThumbnail && isShowDrawer" class="input-image-preview">
              <div class="preview-image-wrapper">
                <OFigure :src="localImage" preview alt="" class="preview-image" />
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
          <span class="search-text" @click="handleSearchEvent(true)">{{
            searchValue.TEXT
          }}</span>
        </div>

        <div v-show="isShowDrawer && !showThumbnail" class="drawer">
          <div
            v-if="recommendData.length && searchInput"
            class="search-recommend"
          >
            <div
              v-for="item in recommendData"
              class="recommend-item"
              @click="onTopSearchItemClick(item.key)"
              :key="item.key"
            >
              {{ item.key }}
            </div>
          </div>
          <div v-else-if="searchHistory.length" class="history-container">
            <div class="history-title">
              <span class="title">{{ searchValue.BROWSEHISTORY }}</span>
              <OIcon class="icon" @click.stop="deleteHistory('')">
                <IconDeleteAll></IconDeleteAll>
              </OIcon>
            </div>
            <div class="history">
              <div
                v-for="item in searchHistory"
                class="history-item"
                :class="{ dark: isDark }"
                @click="onTopSearchItemClick(item)"
                :key="item"
              >
                <span class="history-text">{{ item }}</span>
                <OIcon class="icon-container" @click.stop="deleteHistory(item)"
                  ><IconDelete class="icon"></IconDelete
                ></OIcon>
              </div>
            </div>
            <div class="split-line"></div>
          </div>
          <div class="hots">
            <div class="hots-title">
              <p>{{ searchValue.TOPSEARCH }}</p>
            </div>
            <div class="hots-list">
              <div
                v-for="item in popList"
                :key="item"
                type="text"
                class="hots-list-item"
                @click="onTopSearchItemClick(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.icon {
  cursor: pointer;
  @include h4;
  color: var(--o-color-info1);

  &.close {
    @include x-svg-hover;
  }
}

.search-icon {
  color: var(--o-color-info1);
}

.search-wrapper {
  position: relative;

}

.header-search {
  position: relative;
  display: flex;
  .o-input {
    width: 160px;
    height: 32px;
    transition: width 0.3s;
    transform: translate(0);
    @include respond-to('<=laptop') {
      width: 120px;
    }
    @include respond-to('<=pad_v') {
      display: none;
    }
  }
  @include respond-to('<=pad_v') {
    margin-left: 0;
    z-index: 2;
    position: fixed;
    width: calc(100vw - var(--layout-content-padding) * 2);
    left: var(--layout-content-padding);
    right: var(--layout-content-padding);
    top: 10px;
  }

  .input-focus {
    padding: var(--o-gap-4);
    border-radius: 4px 4px 0 0;
    display: flex;
    &::after {
      content: '';
      position: absolute;
      height: var(--o-gap-4);
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: var(--o-color-fill2);
      z-index: 200;

      @include respond-to('<=pad_v') {
        display: none;
      }
    }

    .search-text {
      white-space: nowrap;
      @include h3;
    }

    @include respond-to('<=pad_v') {
      padding: 0;
      z-index: 200;
      background-color: var(--o-color-fill2);
      width: 100%;
      gap: var(--o-gap-4);
      align-items: center;
    }

    &.has-image {
      @include respond-to('<=pad_v') {
        align-items: flex-start;
        padding-bottom: 8px;
        border-radius: 4px;
      }
    }

    .normal {
      display: flex !important;
    }
    .only-icon {
      display: none !important;
    }
  }

  .drawer {
    position: absolute;
    left: 0px;
    top: 64px;
    height: auto;
    overflow: hidden;
    width: 100%;

    box-shadow: var(--o-shadow-2);
    backdrop-filter: blur(5px);
    padding: var(--o-gap-5);
    padding-top: var(--o-gap-2);
    background: var(--o-color-fill2);
    border-radius: 0 0 4px 4px;

    @include respond-to('<=pad_v') {
      backdrop-filter: blur(0px);
      left: -24px;
      right: 0;
      width: 100vw;
      height: 100vh;
      padding: var(--o-gap-4);
      border-radius: unset;
      top: 32px;
    }

    .hots {
      .hots-title {
        @include tip2;
        color: var(--o-color-info3);

        @include respond-to('<=pad_v') {
          @include text2;
          color: var(--o-color-info1);
          margin-bottom: var(--o-gap-3);
        }
      }
      .hots-list {
        display: flex;
        flex-wrap: wrap;
        @include tip2;
        .hots-list-item {
          margin-top: var(--o-gap-3);
          margin-right: var(--o-gap-4);
          color: var(--o-color-info1);
          cursor: pointer;
          @include hover {
            color: var(--o-color-primary1);
          }
        }

        @include respond-to('<=pad_v') {
          @include text1;
          display: block;
        }
      }
    }

    @include respond-to('<=pad_v') {
      box-shadow: unset;
      padding-left: var(--o-gap-5);
      padding-right: var(--o-gap-5);
    }
  }
  .normal {
    @media (min-width: 841px) and (max-width: 1000px) {
      display: none;
    }
  }
  .only-icon {
    display: none;

    @media (min-width: 841px) and (max-width: 1000px) {
      display: block;
      font-size: var(--o-icon_size-s);
      padding-top: var(--o-gap-1);
    }
  }
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;

  .o-input {
    width: 100% !important;
  }

  &.with-image {
    border: 1px solid var(--o-color-primary1);
    border-radius: var(--o-radius-xs);

    :deep(.o-input.el-input .el-input__wrapper) {
      border: none !important;
      border-radius: var(--o-radius-xs) var(--o-radius-xs) 0 0;
      box-shadow: none !important;
    }

    .input-image-preview {
      margin-top: 8px;
    }
  }
}

.history-container {
  .title {
    @include tip2;
    color: var(--o-color-info3);

    @include respond-to('<=pad_v') {
      @include text2;
      color: var(--o-color-info1);
    }
  }
  .history-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .history {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    .history-item {
      cursor: pointer;
      background-color: var(--o-color-fill3);
      border-radius: var(--o-radius-xs);
      margin-top: var(--o-gap-2);
      height: 24px;
      max-width: 224px;
      display: flex;
      align-items: center;
      padding: 0 var(--o-gap-3);
      position: relative;

      .icon-container {
        display: none;
      }

      @include hover {
        background-color: var(--o-color-control2-light);
        color: var(--o-color-primary1);

        .icon-container {
          display: inline-block;
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: rgb(var(--o-mixedgray-9));
          right: -8px;
          top: -8px;
        }
      }

      .icon {
        height: 16px;
        width: 16px;
      }

      &.dark {
        @include hover {
          background-color: rgb(var(--o-mixedgray-7));
        }
      }

      .history-text {
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        @include tip2;

        @include respond-to('<=pad_v') {
          @include text1;
        }
      }

      @include respond-to('<=pad_v') {
        height: 28px;
      }
    }
  }
  .split-line {
    background: var(--o-color-control4);
    width: 100%;
    height: 1px;
    margin: var(--o-gap-4) 0;

    @include respond-to('<=pad_v') {
      display: none;
    }
  }
  @include respond-to('<=pad_v') {
    margin-bottom: var(--o-gap-5);
  }
}
.search-recommend {
  margin-bottom: var(--o-gap-3);

  .recommend-item {
    @include tip2;
    & + .recommend-item {
      margin-top: var(--o-gap-3);
    }

    cursor: pointer;
    @include hover {
      color: var(--o-color-primary1);
    }

    @include respond-to('<=pad_v') {
      @include text1;
    }
  }
}
.search-icon {
  display: none;
  @include respond-to('<=pad_v') {
    display: block;
  }

  &.icon {
    font-size: var(--o-icon_size-m);
  }
}
.input-focus {
  box-shadow: var(--o-shadow-2);
  .o-input {
    display: flex;
    width: 480px;

    @include respond-to('<=laptop') {
      width: 240px;
    }

    @include respond-to('<=pad_v') {
      width: 100%;
      :deep(.el-input__wrapper) {
        width: 100%;
      }
    }
  }
  @include respond-to('<=pad_v') {
    box-shadow: unset;
  }
}

:deep(.o-input.el-input .el-input__wrapper) {
  border-radius: var(--o-radius-xs);

  &.is-focus {
    border: 1px solid var(--o-color-primary1);
    box-shadow: unset;
  }
}

.file-input {
  display: none;
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
    height: 24px;
    width: 24px;
    border-radius: 4px;
    overflow: hidden;

    :deep(img) {
      height: 24px;
      width: 24px;
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
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--o-duration-m1);

    .thumbnail-zoom-icon {
      color: #fff;
      font-size: 12px;
    }
  }

  .thumbnail-remove {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 14px;
    height: 14px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    z-index: 1;
    transition: opacity var(--o-duration-m1);

    :deep(svg) {
      width: 14px;
      height: 14px;
      fill: rgb(var(--o-mixedgray-9));
    }
  }
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 4px;
  cursor: pointer;
  flex-shrink: 0;

  @include hover {
    background-color: var(--o-color-control2-light);

    .upload.icon {
      color: var(--o-color-primary2);
    }
  }
}

.icon.upload {
  color: var(--o-color-info1);
}

.input-image-preview {
  padding: 0 12px 8px;
  margin-top: 8px;

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
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    display: flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    z-index: 1;
    transition: opacity var(--o-duration-m1);

    :deep(svg) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
<style lang="scss">
.mo-upload-tooltip-popup {
  @include tip2;
  padding: var(--o-gap-3) var(--o-gap-4);
  max-width: 240px;
}
</style>
