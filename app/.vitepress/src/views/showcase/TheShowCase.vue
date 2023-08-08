<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useData } from 'vitepress';
import { getUserCaseData } from '@/api/api-showcase';
import { useI18n } from '@/i18n';

import useWindowScroll from '@/components/hooks/useWindowScroll';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import TagFilter from '@/components/TagFilter.vue';
import NotFound from '@/NotFound.vue';

import IconRight from '~icons/app/icon-arrow-right.svg';
import IconDownload from '~icons/app/icon-download.svg';
import banner from '@/assets/banner/banner-community.png';
import search from '@/assets/illustrations/search.png';

const keyWord = ref('');
const i18n = useI18n();
const { lang } = useData();

const userCaseData = computed(() => i18n.value.showcase);
// 当前选中的tag
const currentTag = ref(userCaseData.value.tags[0]);

const activeIndex = ref(0);
const selectTypeTag = (i: number, type: string) => {
  activeIndex.value = i;
  currentTag.value = type;
  filterCase();
};
// 获取全部案例的参数
const data = ref({
  page: 1,
  pageSize: 100,
  lang: lang.value,
  category: 'showcase',
});
// 搜索接口传递参数
const searchData = computed(() => {
  return {
    keyword: keyWord.value,
    page: 1,
    pageSize: 100,
    lang: lang.value,
  };
});

// 当前显示的页码
const currentPage = ref(1);
// 每页数据
const pageSize = ref(12);
// 接收所有案例
const CaseListAll: any = ref([]);
// 当前分类的所有案例
const currentCaseListAll: any = ref([]);
// 当前显示的案例
const currentCaseList = computed(() => {
  if (currentCaseListAll.value.length > pageSize.value) {
    return currentCaseListAll.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return currentCaseListAll.value;
  }
});

// 数据总条数
const total = computed(() => {
  return currentCaseListAll.value.length;
});
// 分页器总页数
const totalPage = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

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
// 移动端翻页事件
function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
  }
}
// 移动端跳转翻页
function jumpPage(page: number) {
  currentPage.value = page;
}
// 点击跳转案例详情页面
function goDetail(link: string) {
  const search_result_url = '/' + link.replace('index', '');
  window.open(search_result_url);
}
// 设置当前tag的所有案例
function setCurrentCaseListAll() {
  try {
    getUserCaseData(data.value).then((res: any) => {
      currentCaseListAll.value = [];
      if (res.status === 200 && res.obj.records) {
        CaseListAll.value = res.obj.records;
        if (activeIndex.value === 0) {
          currentCaseListAll.value = res.obj.records;
        } else {
          CaseListAll.value.forEach((item: any) => {
            if (item.industry === currentTag.value) {
              currentCaseListAll.value.push(item);
            }
          });
        }
      } else {
        currentCaseListAll.value = [];
      }
      filterCase();
    });
  } catch (error: any) {
    console.error(error);
  }
}
// 根据tag筛选需要显示的案例
function filterCase() {
  currentCaseListAll.value = [];
  if (activeIndex.value === 0) {
    currentCaseListAll.value = CaseListAll.value;
  } else {
    CaseListAll.value.forEach((item: any) => {
      if (item.industry === currentTag.value) {
        currentCaseListAll.value.push(item);
      }
    });
  }
}
// }
// 搜索功能
function searchCase() {
  activeIndex.value = 0;
  currentTag.value = userCaseData.value.tags[0];
  if (keyWord.value) {
    getUserCaseData(searchData.value).then((res) => {
      if (res.status === 200 && res.obj.records) {
        CaseListAll.value = res.obj.records;
      }
      currentCaseListAll.value = CaseListAll.value;
    });
  } else {
    setCurrentCaseListAll();
  }
}
// 根据跳转时url携带的参数显示筛选内容
function getUrlParam() {
  const industry = Number(
    decodeURIComponent(window.location.href.split('=')[1])
  );
  if (industry) {
    activeIndex.value = industry * 1;
    currentTag.value = userCaseData.value.tags[activeIndex.value];
  } else {
    activeIndex.value = 0;
    currentTag.value = userCaseData.value.tags[0];
  }
}
const downloadCase = (path: string) => {
  window.location.href = path;
};
// 获取所有案例及设置当前需要显示的案例
onMounted(() => {
  getUrlParam();
  setCurrentCaseListAll();
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
      v-model="keyWord"
      :placeholder="userCaseData.placeHolder"
      :clearable="true"
      @change="searchCase"
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
        {{ userCaseData.find1 }} <span>{{ currentCaseListAll.length }}</span>
        {{ userCaseData.find2 }}
      </p>
      <OButton
        v-if="userCaseData.caseLink"
        class="case-download"
        type="outline"
        size="mini"
        @click="downloadCase(userCaseData.caseLink)"
      >
        {{ userCaseData.downloadCase }}
        <template #suffixIcon>
          <OIcon><IconDownload /></OIcon>
        </template>
      </OButton>
    </div>
    <div class="case-list">
      <OCard
        v-for="item in currentCaseList"
        :key="item.path"
        shadow="hover"
        class="case-card"
      >
        <div class="card-content-text">
          <h4>{{ item.title }}</h4>
          <p class="detail">
            {{ item.summary }}
          </p>
          <a @click="goDetail(item.path)">
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
    <NotFound v-if="total === 0" />
    <div v-if="isShow" class="page-box">
      <ClientOnly>
        <OPagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          class="pagination-pc"
          :hide-on-single-page="true"
          :page-sizes="[pageSize]"
          :background="true"
          layout="sizes, prev, pager, next, slot, jumper"
          :total="total"
        >
          <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
        </OPagination>
      </ClientOnly>
      <AppPaginationMo
        :current-page="currentPage"
        :total-page="totalPage"
        @turn-page="turnPage"
        @jump-page="jumpPage"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-level2 {
  .o-button {
    color: var(--o-color-white);
    border-color: var(--o-color-white);
    @media (max-width: 767px) {
      padding: 3px 16px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .right-icon {
      color: var(--o-color-brand2);
      @media (max-width: 767px) {
        font-size: var(--o-font-size-text);
      }
    }
  }
}
.user-case {
  max-width: 1504px;
  padding: 40px 44px 64px;
  margin: 0 auto;
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  @media (max-width: 768px) {
    padding: 0 0 40px 0;
    background-color: var(--o-color-bg1);
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
        color: var(--o-color-text1);
      }
    }
    .tag-pc {
      width: 100%;
      margin-top: 24px;
      padding: var(--o-spacing-h5) var(--o-spacing-h2);
      box-shadow: var(--o-shadow-l1);
      @media (max-width: 768px) {
        display: none;
      }
    }
    .tag-h5 {
      display: none;
      width: 100%;
      box-shadow: var(--o-shadow-l1);
      padding: 0 16px;
      @media (max-width: 768px) {
        display: block;
      }
      :deep(.tag-filter-box) {
        overflow: scroll;
        white-space: nowrap;
        .o-tag {
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
    margin-bottom: 0;
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
    margin-top: var(--o-spacing-h4);
    display: flex;
    justify-content: space-between;
    @media (max-width: 768px) {
      display: none;
    }
    .case-number {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-text1);
      span {
        color: var(--o-color-brand1);
        font-size: var(--o-font-size-text);
      }
    }
  }

  .case-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h4);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 1280px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 0 16px;
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
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          max-width: 256px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
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
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          @media (max-width: 768px) {
            max-width: 190px;
            margin-top: 8px;
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
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
            color: #ffffff;

            @media (max-width: 768px) {
              width: 88px;
              font-size: var(--o-font-size-tip);
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
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: #ad9cd3;
        }
      }
    }
  }
  .page-box {
    margin-top: var(--o-spacing-h2);
    :deep(.pagination-pc) {
      @media (max-width: 768px) {
        display: none;
      }
    }
    .pagination-mobile {
      display: none;
      @media (max-width: 768px) {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: var(--o-font-size-tip);
        .icon-prev {
          margin-right: 8px;
          color: var(--o-color-brand1);
        }
        .page-number {
          margin: 0 28px;
          span:nth-of-type(1) {
            color: var(--o-color-brand1);
          }
        }
        .icon-next {
          margin-left: 8px;
          color: var(--o-color-brand1);
        }
        .disable-button {
          color: var(--o-color-text5);
        }
      }
    }
  }
}
.contribute {
  font-size: var(--o-font-size-text);
  color: var(--o-color-text1);
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin: 24px 0;
    padding: 0 16px;
    font-size: var(--o-font-size-tip);
  }
}
</style>
