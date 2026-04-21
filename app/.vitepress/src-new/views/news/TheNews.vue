<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';
import { OInput, ORow, OCol, OCard, OFigure, OPagination, OIcon, OTag, OScroller } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import banner from '~@/assets/category/banner/news-banner.jpg';

import IconTime from '~icons/app-new/icon-time.svg';
import IconUser from '~icons/app-new/icon-user.svg';
import IconSearch from '~icons/app-new/icon-header-search.svg';

import { getTagsData, getNewsData } from '~@/api/api-news';
import type { NewsDataT } from '~@/@types/type-news';

import { onClickOutside } from '@vueuse/core';
import { useDebounceSearch } from '~@/composables/useDebounceSearch';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale, t } = useLocale();
const { lePadV, lePad, leLaptop } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const newsParams = ref({
  category: 'news',
  lang: locale.value,
  page: 1,
  pageSize: 12,
});
const timeValue = ref('');
const authorValue = ref('');
const tagValue = ref('');

const newsData = ref<NewsDataT[]>([]);

// -------------------- 筛选 --------------------
const selectData = ref<any>([
  {
    type: 'archives',
    state: true,
    value: '',
    options: [],
    displayOptions: [],
  },
  {
    type: 'author',
    state: true,
    value: '',
    options: [],
    displayOptions: [],
  },
  {
    type: 'tags',
    state: true,
    value: '',
    options: [],
    displayOptions: [],
  },
]);

// -------------------- 分页 --------------------
const total = ref(0);
const COUNT_PER_PAGE = [12, 24, 36, 48];

// 排序
const sortInitial = (array) => {
  const sortArr = array.slice().sort((a, b) => {
    const isEnA = /^[a-z]/i.test(a.key);
    const isEnB = /^[a-z]/i.test(b.key);
    if (isEnA || isEnB) {
      return a.key?.toString().localeCompare(b.key, 'en', { sensitivity: 'base' });
    }
    return a.key?.toString().localeCompare(b.key, 'zh-CN', { sensitivity: 'base' });
  });
  return sortArr.sort((a, b) => {
    if (a.key?.toString().toLowerCase() === 'openeuler' && b.key?.toString().toLowerCase() !== 'openeuler') return -1;
    if (b.key?.toString().toLowerCase() === 'openeuler' && a.key?.toString().toLowerCase() !== 'openeuler') return 1;
    return 0;
  });
};

// -------------------- 筛选数据 --------------------
const initTag = () => {
  selectData.value.forEach((item: any) => {
    if (item.state) {
      const params = {
        lang: locale.value,
        category: 'news',
        want: item.type,
        condition: {
          archives: timeValue.value === '' ? undefined : timeValue.value,
          author: authorValue.value === '' ? undefined : authorValue.value,
          tags: tagValue.value === '' ? undefined : tagValue.value,
        },
      }
      getTagsData(params).then(res => {
        item.options = item.type !== 'archives' ? sortInitial(res.obj.totalNum) : res.obj.totalNum;
        item.displayOptions = item.type !== 'archives' ? sortInitial(res.obj.totalNum) : res.obj.totalNum;
      });
    }
  })
};

// -------------------- 筛选时间 防抖  --------------------
const showTimePanel = ref(false);
const onInputTime = useDebounceSearch((value: string) => {
  if (!value) {
    showTimePanel.value = false;
    timeValue.value = value;
    selectData.value.forEach(item => {
      item.state = true;
    });
    selectData.value[0].state = false;
  }
  selectData.value[0].value = value;
  selectData.value[0].displayOptions = selectData.value[0].options.filter((item: any) => item.key.toLowerCase().includes(value?.toLowerCase()));
}, 300);
const clickTimeItem = (val: string) => {
  selectData.value[0].value = val;
  timeValue.value = val;
  selectData.value.forEach(item => {
    item.state = item.value === '';
  });
  showTimePanel.value = false;
};
const timeFocus = () => {
  showTimePanel.value = true;
  selectData.value[0].displayOptions = selectData.value[0].options;
};
const panelTimeRef = ref()
onClickOutside(panelTimeRef, () => {
  showTimePanel.value = false;
});
// -------------------- 筛选作者 防抖  --------------------
const showAuthorPanel = ref(false);
const onInputAuthor = useDebounceSearch((value: string) => {
  if (!value) {
    showAuthorPanel.value = false;
    authorValue.value = value;
    selectData.value.forEach(item => {
      item.state = true;
    });
    selectData.value[1].state = false;
  }
  selectData.value[1].value = value;
  selectData.value[1].displayOptions = selectData.value[1].options.filter((item: any) => item.key.toLowerCase().includes(value?.toLowerCase()));
}, 300);
const clickAuthorItem = (val: string) => {
  selectData.value[1].value = val;
  authorValue.value = val;
  selectData.value.forEach(item => {
    item.state = item.value === '';
  });
  showAuthorPanel.value = false;
};
const authorFocus = () => {
  showAuthorPanel.value = true;
  selectData.value[1].displayOptions = selectData.value[1].options;
};
const panelAuthorRef = ref()
onClickOutside(panelAuthorRef, () => {
  showAuthorPanel.value = false;
});
// -------------------- 筛选标签 防抖  --------------------
const showTagPanel = ref(false);
const onInputTag = useDebounceSearch((value: string) => {
  if (!value) {
    showTagPanel.value = false;
    tagValue.value = value;
    selectData.value.forEach(item => {
      item.state = true;
    });
    selectData.value[2].state = false;
  }
  selectData.value[2].value = value;
  selectData.value[2].displayOptions = selectData.value[2].options.filter((item: any) => item.key.toLowerCase().includes(value?.toLowerCase()));
}, 300);
const clickTagItem = (val: string) => {
  selectData.value[2].value = val;
  tagValue.value = val;
  selectData.value.forEach(item => {
    item.state = item.value === '';
  });
  showTagPanel.value = false;
};
const tagFocus = () => {
  showTagPanel.value = true;
  selectData.value[2].displayOptions = selectData.value[2].options;
};
const panelTagRef = ref()
onClickOutside(panelTagRef, () => {
  showTagPanel.value = false;
});

// -------------------- 新闻列表 --------------------
const getNews = () => {
  const params = {
    archives: timeValue.value === '' ? undefined : timeValue.value,
    author: authorValue.value === '' ? undefined : authorValue.value,
    tags: tagValue.value === '' ? undefined : tagValue.value,
    ...newsParams.value,
  }
  getNewsData(params).then(res => {
    newsData.value = res.obj.records || [];
    total.value = res.obj.count;
  })
};

const onPageChange = ({ page, pageSize }: { page: number; pageSize: number }) => {
  if (pageSize !== newsParams.value.pageSize) {
    newsParams.value.page = 1;
  } else {
    newsParams.value.page = page;
  }
  newsParams.value.pageSize = pageSize;
  getNews();
};

watch(
  () => [
    timeValue.value,
    authorValue.value,
    tagValue.value,
  ],
  () => {
    newsParams.value.page = 1;
    newsParams.value.pageSize = 12;
    getNews();
    initTag();
  }
);

onMounted(() => {
  getNews();
  initTag();
})

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 16px';
  } else if (leLaptop.value) {
    return '24px 24px';
  }
  return '32px 32px';
})
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="news-banner" :title="t('news.title')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('news.title') }}</p>
  </div>
  <AppSection class="news-section">
    <div class="filter-box">
      <div class="item-filter">
        <span class="label">{{ t('news.time') }}</span>
        <div ref="panelTimeRef" class="filter-select">
          <OInput
            v-model="selectData[0].value"
            @focus.capture="timeFocus"
            @input="(e) => onInputTime(e.target?.value)"
            size="large"
            clearable
            :placeholder="t('news.all')"
            @clear="onInputTime('')"
          >
            <template #prefix>
              <OIcon><IconSearch /></OIcon>
            </template>
          </OInput>
          <div v-if="showTimePanel" class="search-data">
            <OScroller v-if="selectData[0].displayOptions.length" showType="always" size="small">
              <template v-for="it in selectData[0].displayOptions" :key="it.key">
                <div @click="clickTimeItem(it.key)" class="panel-item" :class="{'panel-item-active': it.key === timeValue}">
                  {{ it.key }}
                </div>
              </template>
            </OScroller>
            <p class="no-item-result" v-else>{{ t('news.noResult') }}</p>
          </div>
        </div>
      </div>
      <div class="item-filter">
        <span class="label">{{ t('news.author') }}</span>
        <div ref="panelAuthorRef" class="filter-select">
          <OInput
            v-model="selectData[1].value"
            @focus.capture="authorFocus"
            @input="(e) => onInputAuthor(e.target?.value)"
            size="large"
            clearable
            :placeholder="t('news.all')"
            @clear="onInputAuthor('')"
          >
            <template #prefix>
              <OIcon><IconSearch /></OIcon>
            </template>
          </OInput>
          <div v-if="showAuthorPanel" class="search-data">
            <OScroller v-if="selectData[1].displayOptions.length" showType="always" size="small">
              <template v-for="it in selectData[1].displayOptions" :key="it.key">
                <div @click="clickAuthorItem(it.key)" class="panel-item" :class="{'panel-item-active': it.key === authorValue}">
                  {{ it.key }}
                </div>
              </template>
            </OScroller>
            <p class="no-item-result" v-else>{{ t('news.noResult') }}</p>
          </div>
        </div>
      </div>
      <div class="item-filter">
        <span class="label">{{ t('news.tag') }}</span>
        <div ref="panelTagRef" class="filter-select">
          <OInput
            v-model="selectData[2].value"
            @focus.capture="tagFocus"
            @input="(e) => onInputTag(e.target?.value)"
            size="large"
            clearable
            :placeholder="t('news.all')"
            @clear="onInputTag('')"
          >
            <template #prefix>
              <OIcon><IconSearch /></OIcon>
            </template>
          </OInput>
          <div v-if="showTagPanel" class="search-data">
            <OScroller v-if="selectData[2].displayOptions.length" showType="always" size="small">
              <template v-for="it in selectData[2].displayOptions" :key="it.key">
                <div @click="clickTagItem(it.key)" class="panel-item" :class="{'panel-item-active': it.key === tagValue}">
                  {{ it.key }}
                </div>
              </template>
            </OScroller>
            <p class="no-item-result" v-else>{{ t('news.noResult') }}</p>
          </div>
        </div>
      </div>
    </div>
    <ORow v-if="newsData?.length" :gap="gap" wrap="wrap" class="news-list">
      <OCol v-for="(item, i) in newsData" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 33.33%'">
        <OCard hoverable :href="`/${item.path}.html`" target="_blank">
          <template #cover>
            <OFigure :src="`/${item.banner}`"></OFigure>
          </template>
          <div class="content">
            <p class="title">{{ item.title }}</p>
            <div v-if="item.tags?.length" class="tags" :class="{'tags-dark': isDark}">
              <OTag v-for="tag in item.tags" :key="tag">{{ tag }}</OTag>
            </div>
            <p class="summary">{{ item.summary }}</p>
            <div class="footer">
              <div class="itme-footer">
                <OIcon><IconTime /></OIcon>
                <span class="date">{{ item.date }}</span>
              </div>
              <div class="itme-footer">
                <OIcon><IconUser /></OIcon>
                <span class="date author" v-for="(val, v) in item.author" :key="val">{{ val }}{{ v !== item.author.length - 1 ? ',' : '' }}</span>
              </div>
            </div>
          </div>
        </OCard>
      </OCol>
    </ORow>
    <ResultEmpty
      v-else
      :style="{
        'margin-top': '40px',
        '--result-image-width': '140px',
        '--result-image-height': '170px',
      }"
    />
    <OPagination
      v-if="total > 0"
      :key="total"
      :total="total"
      :page="newsParams.page"
      :page-size="newsParams.pageSize"
      :page-sizes="COUNT_PER_PAGE"
      :layout="['total', 'jumper', 'pager', 'pagesize']"
      :show-more="false"
      :simple="lePadV"
      @change="onPageChange"
    />
  </AppSection>
</template>

<style scoped lang="scss">
.news-banner {
  background-color: transparent;
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.mo-banner {
  @include respond-to('<=pad_v') {
    padding: 24px 24px 20px;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
  }
  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
  }
}

.news-section {
  :deep(.section-wrapper) {
    @include respond-to('phone') {
      margin-top: 16px;
    }
  }
}

.filter-box {
  display: flex;
  align-items: center;
  background-color: var(--o-color-fill2);
  padding: 24px 32px;
  border-radius: var(--o-radius-xs);
}
.item-filter {
  display: flex;
  align-items: center;
  @include text2;
}
.label {
  margin-right: 32px;
  color: var(--o-color-info1);
  @include text1;
}
.o-input {
  width: 220px;
}
.item-filter + .item-filter {
  margin-left: 56px;
}
.filter-select {
  position: relative;
}
.search-data {
  position: absolute;
  top: 44px;
  left: 0;
  width: 220px;
  background-color: var(--o-color-fill2);
  padding: 8px;
  border-radius: var(--o-radius-xs);
  box-shadow: var(--o-shadow-2);
  z-index: 9;
}
.o-scroller {
  max-height: 280px;
}
.panel-item {
  padding: 8px 12px;
  border-radius: var(--o-radius-xs);
  cursor: pointer;

  @include hover {
    background-color: var(--o-color-control2-light);
  }
}
.panel-item + .panel-item {
  margin-top: 2px;
}
.panel-item-active {
  background-color: var(--o-color-control3-light);
  @include hover {
    background-color: var(--o-color-control3-light);
  }
}
.no-item-result {
  padding: 8px 12px;
  color: var(--o-color-info3);
  @include tip1;
}

.news-list {
  margin-top: 40px;
}
.o-figure {
  width: 100%;
  height: 188px;
  max-height: 188px;
}
.title {
  color: var(--o-color-info1);
  font-weight: 500;
  height: 60px;
  @include h3;
  @include text-truncate(2);
}
.tags {
  margin-top: 8px;
  height: 25px;
  overflow: hidden;
}
.o-tag {
  border: none;
  --tag-bg-color: rgba(237, 239, 242, 1);
}
.o-tag + .o-tag {
  margin-left: 8px;
}
.tags-dark {
  .o-tag {
    --tag-bg-color: var(--o-color-control1-light);
  }
}
.summary {
  margin-top: 12px;
  color: var(--o-color-info2);
  height: 48px;
  @include text1;
  @include text-truncate(2);
}
.footer {
  margin-top: 24px;
  display: flex;
  align-items: center;
  color: var(--o-color-info3);
  .itme-footer {
    display: flex;
    align-items: center;
    &:first-child {
      flex-shrink: 0;
    }
  }
  .itme-footer + .itme-footer {
    margin-left: 16px;
  }
  .o-icon {
    --icon-size: 16px;
  }
  .date {
    margin-left: 8px;
    @include tip2;
  }
  .author {
    @include text-truncate(1);
  }
}

.news-list + .o-pagination {
  margin-top: 24px;
  :deep(.o-pagination-wrap) {
    justify-content: flex-end;
  }
}

@include respond-to('<=laptop') {
  .filter-box {
    padding: 16px 24px;
  }
  .label {
    margin-right: 24px;
  }
  .item-filter + .item-filter {
    margin-left: 48px;
  }
  .news-list {
    margin-top: 32px;
  }
  .title {
    height: 52px;
  }
  .summary {
    height: 44px;
  }
}

@include respond-to('<=pad') {
  .label {
    margin-right: 16px;
  }
  .o-input {
    width: 180px;
  }
  .item-filter + .item-filter {
    margin-left: 32px;
  }
  .search-data {
    width: 180px;
  }
  .title {
    height: 48px;
  }
  .footer {
    margin-top: 12px;
    .date {
      margin-left: 4px;
    }
  }
}

@include respond-to('<=pad_v') {
  .filter-box {
    background-color: transparent;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
  }
  .item-filter {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  .label {
    margin: 0 0 8px;
  }
  .filter-select {
    width: 100%;
  }
  .o-input {
    width: 100%;
    :deep(.o_box) {
      width: 100%;
      .o_input {
        width: 100%;
      }
    }
  }
  .item-filter + .item-filter {
    margin-left: 0;
    margin-top: 16px;
  }
  .search-data {
    width: 100%;
  }
  .news-list {
    margin-top: 24px;
  }
  .title {
    height: auto;
  }
  .tags {
    height: 18px;
  }
  .summary {
    margin-top: 8px;
    height: auto;
  }
  .footer {
    margin-top: 8px;
  }
}
</style>
<style lang="scss">
@include respond-to('phone') {
  .news-select {
    --option-list-max-height-default: 200px;
  }
}
</style>
