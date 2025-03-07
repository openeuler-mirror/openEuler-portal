<script setup lang="ts">
import { ref, computed, onMounted, watch, reactive } from 'vue';
import { useData } from 'vitepress';

import { isNull, isUndefined } from '@opensig/opendesign';

import { oaReport } from '@/shared/analytics';
import { getUserCaseData } from '@/api/api-showcase';
import { useI18n } from '@/i18n';

import type { ShowcaseDataT } from '@/shared/@types/type-search';

import { useCookieStore } from '@/stores/common';
import { uniqueId } from '@/shared/utils';

import useWindowScroll from '@/components/hooks/useWindowScroll';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import NotFound from '@/NotFound.vue';

import IconRight from '~icons/app/icon-arrow-right.svg';
import IconDownload from '~icons/app/icon-download.svg';
import banner from '@/assets/banner/banner-community.png';
import search from '@/assets/illustrations/search.png';

const i18n = useI18n();
const { lang } = useData();
const cookieStore = useCookieStore();

const userCaseData = computed(() => i18n.value.showcase);

const loading = ref(true);

const activeIndex = ref(0);
const selectTypeTag = (i: number, type: string) => {
  activeIndex.value = i;
  parmes.industry = type;
};

// 接收所有案例
const caseData = ref<ShowcaseDataT[]>([]);

const searchVal = ref('');
// 获取全部案例的参数
const parmes = reactive({
  page: 1,
  pageSize: 12,
  keyword: '',
  lang: lang.value,
  category: 'showcase',
  industry: userCaseData.value.tags[0],
});

const handleSearchChange = (val: string) => {
  if (cookieStore.isAllAgreed && val) {
    reportSearch(val);
  }
  parmes.keyword = val;
};

watch(
  () => ({
    pageSize: parmes.pageSize,
    search: parmes.keyword,
    lang: parmes.lang,
    category: parmes.category,
    industry: parmes.industry,
  }),
  () => {
    // 非 page 属性改变时重置 page 为 1
    parmes.page = 1;
    getCaseData();
  },
  { deep: true }
);

watch(
  () => parmes.page,
  () => {
    // 仅 page 改变时调用接口
    getCaseData();
  }
);

// 数据总条数
const total = ref(0);
// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / parmes.pageSize);
});

const filterEmptyParmes = (params: any) => {
  if (params) {
    params.industry =
      params.industry === userCaseData.value.tags[0] ? '' : params.industry;
    Object.keys(params).forEach((key) => {
      if (
        params[key] === '' ||
        isNull(params[key]) ||
        isUndefined(params[key])
      ) {
        delete params[key];
      }
    });
  }
  return params;
};

// 控制分页器显示
const isShow = computed(() => {
  return totalPage.value > 1 ? true : false;
});
// 根据滚动位置移动端tag吸顶
const scrollTop = useWindowScroll();
const isTopNavMo = computed(() => {
  if (scrollTop.value > 156) {
    return true;
  } else {
    return false;
  }
});

// 移动端跳转翻页
function jumpPage(page: number) {
  parmes.page = page;
}
// 跳转路径处理
const pathResolving = (path: string) => {
  path = path.endsWith('index')
    ? '/' + path.replace(/(index)$/g, '')
    : '/' + path + '.html';
  return path;
};

// 点击跳转案例详情页面
function goDetail(link: string, item: any, index: number) {
  const search_result_url = pathResolving(link);
  if (cookieStore.isAllAgreed) {
    reportSelectSearchResult(search_result_url, item, index);
  }
  window.open(search_result_url);
}

// ----------------------- 埋点相关 ----------------------------
let SEARCH_EVENT_ID = uniqueId();
const reportSearch = (keyword: string) => {
  SEARCH_EVENT_ID = uniqueId();
  oaReport(
    'searchValue',
    {
      search_event_id: SEARCH_EVENT_ID,
      search_key: keyword,
    },
    'search_portal'
  );
};
const reportSelectSearchResult = (link: string, item: any, index: number) => {
  const searchKeyObj = {
    search_tag: parmes.industry,
    search_rank_num: parmes.pageSize * (parmes.page - 1) + (index + 1),
    search_result_total_num: total.value,
    search_result_url: location.origin + link,
  };

  oaReport(
    'selectSearchResult',
    {
      search_event_id: SEARCH_EVENT_ID,
      search_key: parmes.keyword,
      ...(item || {}),
      ...searchKeyObj,
    },
    'search_portal'
  );
};

// 设置当前tag的所有案例
function getCaseData() {
  loading.value = true;
  getUserCaseData(filterEmptyParmes(JSON.parse(JSON.stringify(parmes))))
    .then((res: any) => {
      if (res?.obj?.records) {
        caseData.value = res.obj.records;
        total.value = res.obj.count;
      } else {
        caseData.value = [];
        total.value = 0;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}

// 根据跳转时url携带的参数显示筛选内容
function getUrlParam() {
  const industry = Number(
    decodeURIComponent(window.location.href.split('=')[1])
  );
  if (industry) {
    activeIndex.value = industry * 1;
    parmes.industry = userCaseData.value.tags[activeIndex.value];
  } else {
    activeIndex.value = 0;
    parmes.industry = userCaseData.value.tags[0];
  }
}

// 获取所有案例及设置当前需要显示的案例
onMounted(() => {
  getUrlParam();
  getCaseData();
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMNUNITY"
    :title="userCaseData.bannerTitle"
    :illustration="search"
  >
    <template #default>
      <a
        v-if="userCaseData.guideline"
        href="https://gitee.com/openeuler/community/blob/master/zh/contributors/user-story-guideline.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OButton type="outline" animation size="nomral">
          {{ userCaseData.guideline }}
          <template #suffixIcon>
            <OIcon class="right-icon"><IconRight /></OIcon>
          </template>
        </OButton>
      </a>
    </template>
  </BannerLevel2>
  <div class="user-case">
    <div class="contribute">
      {{ userCaseData.contribute }}
      <a :href="`mailto:${userCaseData.contributeLink}`">{{
        userCaseData.contributeLink
      }}</a>
    </div>
    <OSearch
      v-model.lazy.trim="searchVal"
      :placeholder="userCaseData.placeHolder"
      :clearable="true"
      @change="handleSearchChange"
    ></OSearch>
    <div class="tag-box" :class="isTopNavMo ? 'tag-top' : ''">
      <TagFilter :label="userCaseData.type" class="tag-pc">
        <OTag
          v-for="(item, index) in userCaseData.tags"
          :key="'tag' + index"
          checkable
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="selectTypeTag(index, item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
      <TagFilter class="tag-h5">
        <OTag
          v-for="(item, index) in userCaseData.tags"
          :key="'tag' + index"
          checkable
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="selectTypeTag(index, item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
    </div>

    <div class="case-header">
      <p class="case-number">
        {{ userCaseData.find1 }} <span>{{ total }}</span>
        {{ userCaseData.find2 }}
      </p>
      <a v-if="userCaseData.caseLink" :href="userCaseData.caseLink">
        <OButton class="case-download" type="outline" size="mini">
          {{ userCaseData.downloadCase }}
          <template #suffixIcon>
            <OIcon><IconDownload /></OIcon>
          </template>
        </OButton>
      </a>
    </div>
    <div
      v-loading="loading"
      element-loading-background="transparent"
      class="case-body"
    >
      <div class="case-list">
        <OCard
          v-for="(item, index) in caseData"
          :key="item.path"
          shadow="hover"
          class="case-card"
        >
          <div class="card-content-text">
            <h4>{{ item.title }}</h4>
            <p class="detail">
              {{ item.summary }}
            </p>
            <a @click="goDetail(item.path, item, index)">
              <OButton type="primary" size="mini" class="confirm-btn">{{
                userCaseData.button
              }}</OButton>
            </a>
          </div>
          <div class="card-type-img">
            <img :src="item.img" alt="" />
            <p class="type">{{ item.industry }}</p>
          </div>
        </OCard>
      </div>
      <NotFound v-if="!total && !loading" />
    </div>
    <div v-if="isShow" class="page-box">
      <ClientOnly>
        <OPagination
          v-model:current-page="parmes.page"
          v-model:page-size="parmes.pageSize"
          :hide-on-single-page="true"
          :page-sizes="[12, 18, 24, 36]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="total"
          @jump-page="jumpPage"
        >
          <span class="pagination-slot">{{ parmes.page }}/{{ totalPage }}</span>
        </OPagination>
      </ClientOnly>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-level2 {
  .o-button {
    color: var(--e-color-white);
    border-color: var(--e-color-white);
    @media (max-width: 767px) {
      padding: 3px 16px;
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
    .right-icon {
      color: var(--e-color-brand2);
      @media (max-width: 767px) {
        font-size: var(--e-font-size-text);
      }
    }
  }
}
.case-body {
  min-height: 200px;
}
.user-case {
  max-width: 1504px;
  padding: 40px 44px 64px;
  margin: 0 auto;
  .pagination-slot {
    font-size: var(--e-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-spacing-h4);
  }
  @media (max-width: 768px) {
    padding: 0 0 40px 0;
    background-color: var(--e-color-bg1);
  }
  .tag-box {
    width: 100%;
    display: flex;
    @media (max-width: 768px) {
      background-color: #ffffff;
      position: sticky;
      top: 48px;
    }
    .tag-filter {
      padding-left: 0;
      :deep(.label) {
        color: var(--e-color-text1);
      }
    }
    .tag-pc {
      width: 100%;
      margin-top: 24px;
      padding: var(--e-spacing-h5) var(--e-spacing-h2);
      box-shadow: var(--e-shadow-l1);
      @media (max-width: 768px) {
        display: none;
      }
    }
    .tag-h5 {
      display: none;
      width: 100%;
      box-shadow: var(--e-shadow-l1);
      padding: 0 16px;
      @media (max-width: 768px) {
        display: block;
      }
      :deep(.tag-filter-box) {
        overflow: scroll;
        white-space: nowrap;
        .e-tag {
          padding: 6px 0;
          margin-right: 28px;
          span {
            white-space: nowrap;
          }
        }
        .o-tag-type-primary {
          border-left: 1px solid transparent;
          border-right: 1px solid transparent;
          border-top: 1px solid transparent;
        }
      }
    }
  }
  :deep(.o-search) {
    height: 48px;
    margin-bottom: 0px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .tag-top {
    @media (max-width: 768px) {
      position: fixed;
      top: 47px;
      left: 0;
      z-index: 9;
    }
  }
  .case-header {
    margin-top: var(--e-spacing-h4);
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      display: none;
    }
    .case-number {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      color: var(--e-color-text1);
      span {
        color: var(--e-color-brand1);
        font-size: var(--e-font-size-text);
      }
    }
  }

  .case-list {
    display: grid;
    width: 100%;
    margin-top: var(--e-spacing-h4);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--e-spacing-h4);
    @media (max-width: 1280px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      grid-gap: var(--e-spacing-h5);
      padding: 0px 16px;
    }
    .case-card {
      height: 198px;
      padding: 40px 26px 40px 40px;
      background-image: url(@/assets/category/showcase/case-card-bg.png);
      background-size: cover;
      position: relative;
      display: flex;
      @media (max-width: 768px) {
        height: 144px;
        padding: 16px 16px 14px 12px;
      }
      .card-content-text {
        color: #ffffff;
        h4 {
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h7);
          max-width: 256px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          @media (max-width: 768px) {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
          }
        }
        .detail {
          max-width: 256px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-top: 2px;
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          @media (max-width: 768px) {
            max-width: 190px;
            margin-top: 8px;
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
        a {
          position: absolute;
          bottom: 40px;
          @media (max-width: 768px) {
            bottom: 14px;
          }
          :deep(.confirm-btn) {
            width: 96px;
            display: flex;
            justify-content: center;

            @media (max-width: 768px) {
              width: 88px;
              font-size: var(--e-font-size-tip);
            }
          }
        }
      }
      :deep(.el-card__body) {
        width: 100%;
        padding: 0;
        display: flex;
        justify-content: space-between;
      }
      .card-type-img {
        img {
          width: 100px;
          height: 100px;
          @media (max-width: 768px) {
            width: 80px;
            height: 80px;
          }
        }
        .type {
          text-align: center;
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
          color: #ad9cd3;
        }
      }
    }
  }
  .page-box {
    margin-top: var(--e-spacing-h2);
    @media (max-width: 768px) {
      margin-top: var(--e-spacing-h5);
    }
  }
}
.contribute {
  font-size: var(--e-font-size-text);
  color: var(--e-color-text1);
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin: 24px 0;
    padding: 0px 16px;
    font-size: var(--e-font-size-tip);
  }
}
</style>
