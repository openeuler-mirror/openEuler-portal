<script setup lang="ts">
import { computed, ref, onMounted, watch, nextTick } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { useI18n } from '~@/i18n';
import { OFigure, OPopover, useMessage } from '@opensig/opendesign';

import type { SearchRecommendT } from '@/shared/@types/type-search';

import { getPop, getSearchRecommend } from '@/api/api-search';
import { imageUpload } from '~@/api/api-search';

import useClickOutside from '@/components/hooks/useClickOutside';
import { useScreen } from '~@/composables/useScreen';

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
const searchRef = ref();
const isClickOutside = useClickOutside(searchRef) || false;
const { lePadV } = useScreen();

const emits = defineEmits(['focus-input', 'search-click']);
const isShowDrawer = ref(false);
const searchInput = ref('');
const i18n = useI18n();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const reportSearch = (event: string, data: Record<string, any>) => {
  const module = location.pathname.includes('other/search')
    ? 'search_page'
    : 'home_page';
  oaReport(
    event,
    {
      module,
      ...data,
    },
    'search_portal'
  );
};

// 搜索事件
async function handleSearchEvent(report?: boolean) {
  if (pastedFile.value) {
    if (report) {
      reportSearch('click', {
        content: searchInput.value.trim(),
        image: uploadedImageUrl.value,
        type: 'image_search',
      });
    }
    if (isUploading.value) {
      await uploadPromise;
    }
    const query = searchInput.value.trim();
    const params = new URLSearchParams();
    if (uploadedImageUrl.value) params.set('imageUrl', uploadedImageUrl.value);
    if (query) params.set('q', query);
    window.open(`/${lang.value}/other/search/?${params.toString()}`, '_self');
    return;
  }

  const input = searchInput.value.trim();
  if (!input) return;

  handleSearch(input);
  if (report) {
    reportSearch('click', {
      content: input,
      type: 'search',
    });
  }
  window.open(
    `/${lang.value}/other/search/?q=${encodeURIComponent(input)}`,
    '_self'
  );
}

type SearchItemClickType = 'history' | 'popular' | 'suggest';

// 点击热搜标签
const onTopSearchItemClick = (
  val: string,
  type: SearchItemClickType = 'history'
) => {
  searchInput.value = val;
  handleSearchEvent();
  reportSearch('click', {
    type,
    target: val,
  });
};

const searchValue = computed(() => i18n.value.header.SEARCH);
// 图片搜索占位符
const currentPlaceholder = computed(() => {
  if (showThumbnail.value) return searchValue.value.PLEACHOLDER_EXTEND;
  if (isShowDrawer.value) return searchValue.value.PLEACHOLDER_IMAGE;
  return searchValue.value.PLEACHOLDER;
});
// 显示/移除搜索框
const isShowBox = ref(false);
const popList = ref<string[]>([]);
const showDrawer = () => {
  //热搜
  commonStore.iconMenuShow = false;
  isShowBox.value = true;
  emits('search-click', isShowBox.value);
  isShowDrawer.value = true;
  const params = `lang=${lang.value}`;

  if (popList.value?.length) {
    return;
  }
  getPop(params).then((res) => {
    popList.value = res.obj;
  });
};
// 关闭搜索框
const closeSearchBox = () => {
  searchInput.value = '';
  removeImage();
  emits('search-click', isShowBox.value);
  if (!lePadV.value) {
    isShowBox.value = false;
    commonStore.iconMenuShow = true;
    isShowDrawer.value = false;
  }
};

onMounted(() => {
  window.addEventListener('click', () => {
    if (isClickOutside.value && !lePadV.value && !isPreviewOpen.value && !justClosedPreview.value) {
      closeSearchBox();
    }
  });
});
// ----------------- 联想搜索 -------------------------
const recommendData = ref<SearchRecommendT[]>([]);

const reportSearchInput = useDebounceFn(
  (content: string) => reportSearch('input', { content }),
  300
);

const queryGetSearchRecommend = (val: string) => {
  reportSearchInput(val);
  getSearchRecommend({
    query: val,
  }).then((res) => {
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
  // 从 localStorage 加载搜索历史
  const history = localStorage.getItem('search-history');
  if (history) {
    searchHistory.value = JSON.parse(history);
  }
};
loadSearchHistory();
const handleSearch = (searchValue: string) => {
  if (searchValue && Array.isArray(searchHistory.value)) {
    // 添加到历史记录并更新 localStorage
    searchHistory.value.unshift(searchValue);
    searchHistory.value = Array.from(new Set(searchHistory.value)); // 去重
    if (searchHistory.value.length > 6) {
      // 最多保持6条搜集记录
      searchHistory.value.pop();
    }
    localStorage.setItem('search-history', JSON.stringify(searchHistory.value));
  }
};

const deleteHistory = (data: string) => {
  reportSearch('click', { type: 'history_delete', target: data });
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
  searchInput.value = '';
  removeImage();
  isShowBox.value = false;
  commonStore.iconMenuShow = true;
  isShowDrawer.value = false;
  emits('search-click', isShowBox.value);
};

const pastedImage = ref<string>('');
const pastedFile = ref<File | null>(null);
const showThumbnail = ref(false);
const uploadedImageUrl = ref<string>('');
const isUploading = ref(false);
let uploadPromise: Promise<void> | null = null;
const isPreviewOpen = ref(false);
const justClosedPreview = ref(false);

const onPreviewChange = (visible: boolean) => {
  isPreviewOpen.value = visible;
  if (!visible) {
    justClosedPreview.value = true;
    setTimeout(() => {
      justClosedPreview.value = false;
    }, 100);
  }
};

const handlePaste = async (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;
  if (!items) return;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.indexOf('image') !== -1) {
      const file = item.getAsFile();
      if (file) {
        handleImageFile(file);
      }
      break;
    }
  }
};

const removeImage = () => {
  URL.revokeObjectURL(pastedImage.value);
  pastedImage.value = '';
  pastedFile.value = null;
  showThumbnail.value = false;
  uploadedImageUrl.value = '';
};

const fileInputRef = ref<HTMLInputElement>();
const uploadBtnRef = ref();
const oInputRef = ref();

const handleUploadClick = () => {
  // 重置 value，确保选同一张图片也能触发 change 事件
  if (fileInputRef.value) {
    fileInputRef.value.value = '';
  }
  fileInputRef.value?.click();
};

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    handleImageFile(file);
    nextTick(() => oInputRef.value?.focus());
  }
};

const handleImageFile = (file: File) => {
  pastedFile.value = file;
  pastedImage.value = URL.createObjectURL(file);
  showThumbnail.value = true;

  uploadedImageUrl.value = '';
  isUploading.value = true;
  uploadPromise = imageUpload({ image: file })
    .then((res) => {
      if (res.status === 200 && res.obj) {
        uploadedImageUrl.value = res.obj;
        reportSearch('upload', {
          image: uploadedImageUrl.value,
          type: 'image_search',
        });
      }
    })
    .catch((err) => {
      if (err?.response?.status === 403) {
        const msg = useMessage();
        msg.show({ content: searchValue.value.UPLOAD_FAILED, status: 'danger' });
      }
    })
    .finally(() => {
      isUploading.value = false;
    });
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();
  
  const file = event.dataTransfer?.files?.[0];
  if (file && file.type.indexOf('image') !== -1) {
    handleImageFile(file);
  }
};
</script>
<template>
  <div class="search-wrapper">
    <div :class="{ search: !lePadV, focus: isShowDrawer && !lePadV }">
      <div ref="searchRef" class="header-search">
        <div :class="{ 'input-focus': isShowDrawer, 'has-image': showThumbnail }" @dragover="handleDragOver" @drop="handleDrop">
          <OIcon v-if="lePadV && isShowDrawer" @click.stop="closeSearch"
            ><IconBack></IconBack
          ></OIcon>
          <div class="search-input-wrapper" :class="{ 'with-image': showThumbnail }">
            <OInput
              ref="oInputRef"
              v-model="searchInput"
              :placeholder="currentPlaceholder"
              @keyup.enter="handleSearchEvent(true)"
              @focus="showDrawer"
              @paste="handlePaste"
              class="normal"
            >
              <template #prefix>
                <OIcon class="icon"><IconSearch></IconSearch></OIcon>
              </template>
              <template
                v-if="isShowDrawer"
                #suffix
              >
                <span ref="uploadBtnRef" class="upload-btn">
                  <OIcon class="upload icon" @mousedown.prevent @click="handleUploadClick"
                    ><IconImageUpload
                  /></OIcon>
                </span>
                <OPopover v-if="!lePadV" trigger="hover" position="bottom" :target="uploadBtnRef" body-class="upload-tooltip-popup">
                  {{ searchValue.UPLOAD_TOOLTIP }}
                </OPopover>
                <OIcon class="close icon" @click="closeSearchBox"
                  ><IconClose
                /></OIcon>
              </template>
            </OInput>
            <div v-if="showThumbnail" class="input-image-preview">
              <div class="preview-image-wrapper">
                <OFigure :src="pastedImage" preview alt="" class="preview-image" @preview="onPreviewChange" />
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
          <OIcon class="only-icon" @click="showDrawer"
            ><IconSearch></IconSearch
          ></OIcon>
          <span
            v-if="lePadV && isShowDrawer"
            class="search-text"
            @click="handleSearchEvent(true)"
            >{{ searchValue.TEXT }}</span
          >
        </div>

        <Transition name="search-drawer">
          <div v-if="isShowDrawer && (!showThumbnail || lePadV)" class="drawer">
            <template v-if="!showThumbnail">
              <div
                v-if="recommendData.length && searchInput"
                class="search-recommend"
              >
                <div
                  v-for="item in recommendData"
                  class="recommend-item"
                  @click="onTopSearchItemClick(item.key, 'suggest')"
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
                      @click="onTopSearchItemClick(item, 'popular')"
                    >
                      {{ item }}
                    </div>
                  </div>
                </div>
            </template>
          </div>
        </Transition>
      </div>
      <OIcon @click="showDrawer" class="icon search-icon"
        ><IconSearch></IconSearch
      ></OIcon>
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

  .search {
    position: absolute;
    right: 0;
    top: -16px;
    background-color: var(--o-color-fill2);
    z-index: 100;

    &.focus {
      top: -32px;
      border-radius: 4px;
    }
  }
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
    width: calc(100vw - 32px);
    left: 16px;
    right: 16px;
    top: 10px;
  }

  .input-focus {
    padding: var(--o-gap-4);
    border-radius: 4px;
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

    &.has-image::after {
      display: none;
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
      left: -16px;
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

  &:hover {
    --e-input-border-color: var(--o-color-primary1);
  }

  &.is-focus {
    border: 1px solid var(--o-color-primary1);
    box-shadow: unset;
  }
}

// 抽屉展开时，始终保持主色边框，避免因短暂失焦导致边框颜色闪变
.input-focus :deep(.o-input.el-input .el-input__wrapper) {
  border: 1px solid var(--o-color-primary1);
  box-shadow: none;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  border-radius: var(--o-radius-xs);
  transition: border-color var(--o-duration-m1);

  &.with-image {
    border-color: var(--o-color-primary1);

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

.input-image-preview {
  padding: 0 12px 8px;

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

.file-input {
  display: none;
}


.search-preview-enter-active {
  transition: opacity var(--o-duration-m1) ease var(--o-duration-m1);
}
.search-preview-leave-active {
  transition: opacity var(--o-duration-m1) ease;
}
.search-preview-enter-from,
.search-preview-leave-to {
  opacity: 0;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  margin-right: 8px;
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
</style>
<style lang="scss">
.upload-tooltip-popup {
  @include tip2;
  padding: var(--o-gap-3) var(--o-gap-4);
  max-width: 240px;
}
</style>
