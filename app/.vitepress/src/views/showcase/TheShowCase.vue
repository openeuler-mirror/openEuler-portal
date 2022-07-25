<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useData } from 'vitepress';
import { getUserCaseData, getCaseTagData } from '@/api/api-showcase';

// import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import NotFound from '@/NotFound.vue';

import banner from '@/assets/banner-secondary.png';
import search from '@/assets/illustrations/search.png';

import IconChevronLeft from '~icons/app/icon-chevron-left.svg';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';

// import useCaseZh from '@/i18n/showcase/showcase.json';
const keyWord = ref('');
const { theme: i18n } = useData();
const userCaseData = computed(() => i18n.value.showcase);

const activeIndex = ref(0);
const tagClick = (i: number, type: string) => {
  activeIndex.value = i;
  filterCase(type);
};
// tag筛选及搜索传输的参数
const data = ref({
  keyword: '',
  page: 1,
  pageSize: 10000,
  type: '',
});
// 根据tag筛选需要显示的案例
function filterCase(type: string) {
  if (type === '全部') {
    data.value.type = '';
  } else {
    data.value.type = type;
  }
  setCurrentCaseListAll();
}
// 用户案例类型
const tagArr: any = ref([]);
// 当前显示的页码
const currentPage1 = ref(1);
// 每页数据
const pageSize4 = ref(12);
// 当前分类的所有案例
const currentCaseListAll: any = ref([]);
// 当前显示的案例
const currentCaseList = computed(() => {
  if (currentCaseListAll.value.length > pageSize4.value) {
    return currentCaseListAll.value.slice(
      (currentPage1.value - 1) * pageSize4.value,
      currentPage1.value * pageSize4.value
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
  return Math.ceil(total.value / pageSize4.value);
});
//控制移动端导航栏吸顶
const isTopNavMo = ref(false);
const isShow = computed(() => {
  return totalPage.value === 1 ? false : true;
});
// 根据滚动位置移动端tag吸顶
const onscroll = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  if (scrollTop > 156) {
    isTopNavMo.value = true;
  } else {
    isTopNavMo.value = false;
  }
};
// 移动端翻页事件
function turnPage(option: string) {
  if (option === 'prev' && currentPage1.value > 1) {
    currentPage1.value = currentPage1.value - 1;
  } else if (option === 'next' && currentPage1.value < totalPage.value) {
    currentPage1.value = currentPage1.value + 1;
  }
}
// 点击跳转案例详情页面
function goDetail(link: string, item: any) {
  window.open('/' + item.lang + '/' + link.replace('index', ''));
}
// 设置当前tag的所有案例
function setCurrentCaseListAll() {
  getUserCaseData(data.value).then((res: any) => {
    if (res.status === 200 && res.obj.records) {
      const CaseListAll = res.obj.records;
      CaseListAll.forEach((item: any, index: number) => {
        if (item.summary === '') {
          CaseListAll.splice(index, 1);
        }
      });
      currentCaseListAll.value = CaseListAll;
    } else {
      currentCaseListAll.value = [];
    }
  });
}
// 搜索功能
function searchCase() {
  data.value.keyword = keyWord.value;
  data.value.type = '';
  activeIndex.value = 0;
  setCurrentCaseListAll();
}
// 获取所有案例及设置当前需要显示的案例
onMounted(() => {
  window.addEventListener('scroll', onscroll);
  getCaseTagData().then((res: any) => {
    const orderArr: any = [];
    let countAll = 0;
    tagArr.value = res.obj.totalNum;
    res.obj.totalNum.forEach((item: any) => {
      countAll = countAll + item.count;
      if (item.key === '金融') {
        orderArr[1] = item;
      } else if (item.key === '运营商') {
        orderArr[2] = item;
      } else if (item.key === '能源') {
        orderArr[3] = item;
      } else if (item.key === '物流') {
        orderArr[4] = item;
      } else if (item.key === '其他') {
        orderArr[5] = item;
      }
    });
    orderArr[0] = { count: countAll, key: '全部' };
    tagArr.value = orderArr;
  });
  setCurrentCaseListAll();
});
onUnmounted(() => {
  window.removeEventListener('scroll', onscroll);
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="COMMNUNITY"
    title="用户案例"
    :illustration="search"
  />
  <div class="user-case">
    <OSearch
      v-model="keyWord"
      :style="{ marginBottom: '50px', marginTop: '100px' }"
      class="search"
      @change="searchCase"
    ></OSearch>
    <div class="tag-box" :class="isTopNavMo ? 'tag-top' : ''">
      <TagFilter :label="userCaseData.type" class="tag-pc">
        <OTag
          v-for="(item, index) in tagArr"
          :key="'tag' + index"
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index, item.key)"
        >
          {{ item.key }}
        </OTag>
      </TagFilter>
      <TagFilter class="tag-h5">
        <OTag
          v-for="(item, index) in tagArr"
          :key="'tag' + index"
          :type="activeIndex === index ? 'primary' : 'text'"
          @click="tagClick(index, item.key)"
        >
          {{ item.key }}
        </OTag>
      </TagFilter>
    </div>
    <p class="case-number">
      {{ userCaseData.find1 }}{{ currentCaseListAll.length
      }}{{ userCaseData.find2 }}
    </p>
    <div class="case-list">
      <OCard v-for="item in currentCaseList" :key="item.path" class="case-card">
        <div class="card-content-text">
          <h4>{{ item.company }}</h4>
          <p class="detail">
            {{ item.summary }}
          </p>
          <a @click="goDetail(item.path, item)">
            <OButton type="primary" class="button">{{
              userCaseData.button
            }}</OButton>
          </a>
        </div>
        <div class="card-type-img">
          <img :src="item.img" alt="" />
        </div>
      </OCard>
    </div>
    <NotFound v-if="total === 0" />
    <div v-if="isShow" class="page-box">
      <OPagination
        v-model:currentPage="currentPage1"
        v-model:page-size="pageSize4"
        class="pagination-pc"
        hide-on-single-page="true"
        :page-sizes="[pageSize4]"
        :background="true"
        layout="sizes, prev, pager, next, slot, jumper"
        :total="total"
      >
        <span>{{ currentPage1 }}/{{ totalPage }}</span>
      </OPagination>
      <div class="pagination-h5">
        <OIcon class="icon-prev">
          <IconChevronLeft />
        </OIcon>
        <span
          class="prev"
          :class="currentPage1 === 1 ? 'disable-button' : ''"
          @click="turnPage('prev')"
          >{{ userCaseData.prev }}</span
        >
        <span class="page-number">
          <span>{{ currentPage1 }}</span>
          <span>/{{ totalPage }}</span>
        </span>
        <span
          class="next"
          :class="currentPage1 === totalPage ? 'disable-button' : ''"
          @click="turnPage('next')"
          >{{ userCaseData.next }}</span
        >
        <OIcon class="icon-next">
          <IconChevronRight />
        </OIcon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-case {
  max-width: 1504px;
  padding: 0 44px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 0;
    background-color: var(--o-color-bg2);
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
    }
    .tag-pc {
      width: 100%;
      margin-top: 24px;
      padding: var(--o-spacing-h5) var(--o-spacing-h2);
      box-shadow: var(--o-shadow-base);
      @media (max-width: 768px) {
        display: none;
      }
    }
    .tag-h5 {
      display: none;
      width: 100%;
      box-shadow: var(--o-shadow-base);
      padding: 0 16px;
      @media (max-width: 768px) {
        display: block;
      }
      .tag-filter-box {
        span {
          padding: 6px 0;
          margin-right: 28px;
          &:nth-of-type(1) {
            margin-right: 22px;
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
  .search {
    height: 48px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .tag-top {
    @media (max-width: 768px) {
      position: fixed;
      top: 48px;
      left: 0;
      z-index: 9;
    }
  }
  .case-number {
    margin-top: var(--o-spacing-h4);
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    @media (max-width: 768px) {
      display: none;
    }
  }
  .case-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
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
      background-image: url(@/assets/showcase/case-bg.png);
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
          @media (max-width: 768px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
        .detail {
          max-width: 256px;
          max-height: 46px;
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
          .button {
            width: 96px;
            height: 28px;
            padding: 0;
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            @media (max-width: 768px) {
              width: 88px;
              height: 24px;
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
          @media (max-width: 768px) {
            width: 80px;
            height: 80px;
          }
        }
      }
    }
  }
  .page-box {
    margin-top: var(--o-spacing-h2);
    padding-bottom: var(--o-spacing-h2);
    .pagination-pc {
      @media (max-width: 768px) {
        display: none;
      }
    }
    .pagination-h5 {
      display: none;
      @media (max-width: 768px) {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: var(--o-font-size-tip);
        .icon-prev {
          margin-right: 8px;
          color: var(--o-color-brand);
        }
        .disable-button {
          color: var(--o-color-disabled);
        }
        .page-number {
          margin: 0 28px;
          span:nth-of-type(1) {
            color: var(--o-color-brand);
          }
        }
        .icon-next {
          margin-left: 8px;
          color: var(--o-color-brand);
        }
      }
    }
  }
}
</style>
