<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';

import NotFound from '@/NotFound.vue';
import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-interaction.png';
import illustration from '@/assets/illustrations/the-moon.png';
import IconSearch from '~icons/app/icon-search.svg';

import { getSortData, getTagsData } from '@/api/api-search';
import type { NewsDataT, ParamsTypeT } from '@/shared/@types/type-news';

const router = useRouter();
const { lang } = useData();

const sortParams = reactive({
  page: 1,
  pageSize: 9,
  lang: lang.value,
  category: 'news',
  tags: '社区运作报告',
});
// 新闻列表数据
const newsCardData = ref<NewsDataT[]>([]);

// 分页数据
const paginationData = ref({
  total: 0,
  pagesize: 9,
  currentpage: 0,
});

// 获取标签数据
const tagsParams = reactive({
  lang: lang.value,
  category: 'news',
  want: 'archives',
  condition: {
    tags: '社区运作报告',
  },
});
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);

const loading = ref(true);

const toNewsContent = (path: string) => {
  router.go(`/${path}`);
};

//筛选数据
const selectData = ref<{ title: string; select: string[] }>({
  title: '时间',
  select: [],
});
const selectTimeVal = ref('');

const changeTime = () => {
  const params = {
    page: 1,
    pageSize: 9,
    lang: lang.value,
    category: 'news',
    tags: '社区运作报告',
    archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
  };
  getListData(params);
};

//获取数据
const getListData = (params: ParamsTypeT) => {
  loading.value = true;
  getSortData(params)
    .then((res) => {
      if (res.obj.count) {
        paginationData.value.total = res.obj.count;
        paginationData.value.currentpage = res.obj.page;
        paginationData.value.pagesize = res.obj.pageSize;
        newsCardData.value = res.obj.records;
        for (let i = 0; i < newsCardData.value.length; i++) {
          if (typeof newsCardData.value[i].author === 'string') {
            newsCardData.value[i].author = [newsCardData.value[i].author];
          }
          newsCardData.value[i].banner = '/' + newsCardData.value[i].banner;
        }
      }
    })
    .finally(() => {
      loading.value = false;
    });
};

onMounted(() => {
  getListData(sortParams);
  getTagsData(tagsParams).then((res) => {
    selectData.value.select = [];
    res.obj.totalNum.forEach((item: { key: string }) => {
      selectData.value.select.push(item.key);
    });
  });
});

const changeCurrent = (val: number) => {
  sortParams.page = val;
  sortParams.pageSize = paginationData.value.pagesize;
  getListData(sortParams);
};

const pageTotal = computed(() =>
  Math.ceil(paginationData.value.total / paginationData.value.pagesize)
);
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONNECT"
    title="月刊"
    :illustration="illustration"
  />
  <AppContent :mobile-top="16">
    <div class="news-select">
      <div class="news-select-item">
        <span class="news-select-item-title">{{ userCaseData.TIME }}</span>
        <ClientOnly>
          <OSelect
            v-model="selectTimeVal"
            filterable
            clearable
            :placeholder="userCaseData.ALL"
            @change="changeTime"
          >
            <template #prefix>
              <OIcon>
                <IconSearch />
              </OIcon>
            </template>
            <OOption
              v-for="item in selectData.select"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ClientOnly>
      </div>
    </div>
    <div
      v-loading="loading"
      element-loading-background="transparent"
      class="monthly-body"
    >
      <template v-if="newsCardData.length">
        <div class="news-list">
          <OCard
            v-for="item in newsCardData"
            :key="item.path"
            class="news-list-item"
            shadow="hover"
            @click="toNewsContent(item.path)"
          >
            <div class="news-img">
              <img :src="item.banner" :alt="item.banner" />
            </div>
            <div class="news-info">
              <p class="news-title">{{ item.title }}</p>
              <p class="news-time">{{ item.date }}</p>
              <p class="news-content">
                {{ item.summary }}
              </p>
            </div>
          </OCard>
        </div>
        <div class="news-pagination">
          <ClientOnly>
            <OPagination
              v-model:current-page="paginationData.currentpage"
              v-model:page-size="paginationData.pagesize"
              :background="true"
              :hide-on-single-page="true"
              layout="sizes, prev, pager, next, slot, jumper"
              :total="paginationData.total"
              :page-sizes="[3, 6, 9]"
              @current-change="changeCurrent"
              @size-change="changeCurrent(1)"
              @jump-page="changeCurrent"
            >
              <span class="pagination-slot"
                >{{ paginationData.currentpage }}/{{ pageTotal }}</span
              >
            </OPagination>
          </ClientOnly>
        </div>
      </template>
      <NotFound v-else-if="!loading" />
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.el-select {
  min-width: 227px;
}

@mixin showline {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.monthly-body {
  min-height: 420px;
}
:deep(.el-card__body) {
  padding: 0;
  @media (max-width: 980px) {
    display: flex;
    flex-direction: row;
  }
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
}
::-webkit-scrollbar {
  display: none;
}
.dark img {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.news-pagination {
  margin-top: var(--e-spacing-h2);
  @media (max-width: 768px) {
    margin-top: var(--e-spacing-h5);
  }
  .pagination-slot {
    font-size: var(--e-font-size-text);
    font-weight: 400;
    color: var(--e-color-text1);
    line-height: var(--e-spacing-h4);
  }
}

.news-tag {
  display: none;
}
.news-select {
  display: flex;
  flex-direction: row;
  width: 1416px;
  @media (max-width: 1100px) {
    display: none;
  }
  .news-select-item {
    display: flex;
    align-items: center;
    margin-right: var(--e-spacing-h1);
    @media (max-width: 1100px) {
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--e-spacing-h5);
      :deep(.e-select) {
        width: 100%;
      }
    }
    .o-icon {
      font-size: var(--e-font-size-h7);
      @media screen and (max-width: 768px) {
        font-size: var(--e-font-size-h8);
      }
    }
    .news-select-item-title {
      white-space: nowrap;
      margin-right: var(--e-spacing-h5);
      color: var(--e-color-text1);
      font-size: var(--e-font-size-h7);
      @media (max-width: 1100px) {
        width: 50px;
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
    }
  }
}
.news-list {
  max-width: 1448px;
  margin: var(--e-spacing-h2) auto 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--e-spacing-h4);
  @media (max-width: 1450px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1100px) {
    margin-top: var(--e-spacing-h5);
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0;
  }
  @media (max-width: 768px) {
    grid-gap: var(--e-spacing-h5);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .news-list-item {
    justify-self: center;
    align-self: center;
    flex: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
    &:hover {
      .news-img img {
        transform: scale(1.05);
      }
    }
    @media (max-width: 620px) {
      height: auto;
    }
    .news-img {
      width: 100%;
      height: 188px;
      max-height: 188px;
      object-fit: cover;
      overflow: hidden;
      @media (max-width: 980px) {
        flex: 1;
      }
      @media (max-width: 500px) {
        height: 180px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
    }
    .news-info {
      padding: var(--e-spacing-h4);
      color: var(--e-color-text1);
      @media (max-width: 980px) {
        flex: 1;
      }
      @media (max-width: 500px) {
        width: 100%;
        padding: var(--e-spacing-h6);
      }
      .news-title {
        font-weight: 400;
        height: 52px;
        line-height: var(--e-line-height-h7);
        font-size: var(--e-font-size-h7);
        margin-bottom: var(--e-spacing-h10);
        @include showline();
        -webkit-line-clamp: 2;
        @media (max-width: 500px) {
          height: auto;
          line-height: var(--e-line-height-text);
          font-size: var(--e-font-size-text);
          font-weight: 500;
          -webkit-line-clamp: 1;
          margin-bottom: var(--e-spacing-h8);
        }
      }
      .news-time {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--e-line-height-tip);
          font-size: var(--e-font-size-tip);
          color: var(--e-color-neutral5);
        }
      }
      .news-content {
        margin-top: var(--e-spacing-h5);
        @include showline();
        -webkit-line-clamp: 2;
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--e-line-height-tip);
          font-size: var(--e-font-size-tip);
          color: var(--e-color-neutral5);
        }
      }
    }
  }
}
</style>
