<script setup lang="ts">
import { computed, ref, onMounted, reactive } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';

// import MobileFilter from '@/components/MobileFilter.vue';
import NotFound from '@/NotFound.vue';
import AppContent from '@/components/AppContent.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';

import banner from '@/assets/banner/banner-interaction.png';
import illustration from '@/assets/illustrations/news.png';
import IconSearch from '~icons/app/icon-search.svg';

import { getSortData, getTagsData } from '@/api/api-search';
import type { NewsData, ParamsType } from '@/shared/@types/type-news';

const router = useRouter();
const { lang } = useData();
const screenWidth = useWindowResize();

const sortParams = reactive({
  page: 1,
  pageSize: 9,
  lang: lang.value,
  category: 'news',
});
// 新闻列表数据
const newsCardData = ref<NewsData[]>([]);
const isPc = computed(() => (screenWidth.value <= 768 ? true : false));

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
  want: '',
});
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);

const toNewsContent = (path: string) => {
  router.go(`/${path}`);
};

//筛选数据
const selectData = ref<any>([
  {
    title: '时间',
    select: [],
  },
  {
    title: '作者',
    select: [],
  },
  {
    title: '标签',
    select: [],
  },
]);
const selectTimeVal = ref('');
const selectAuthorVal = ref('');
const selectTagsVal = ref('');

// pc筛选
const selectMethod = () => {
  const params = {
    page: 1,
    pageSize: 9,
    lang: lang.value,
    category: 'news',
    archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
    author: selectAuthorVal.value === '' ? undefined : selectAuthorVal.value,
    tags: selectTagsVal.value === '' ? undefined : selectTagsVal.value,
  };
  getListData(params);
};
const changeTime = () => {
  selectMethod();
  if (selectTimeVal.value !== '') {
    const wantauthor = {
      lang: lang.value,
      category: 'news',
      want: 'author',
      condition: {
        archives: selectTimeVal.value,
        tags: selectTagsVal.value === '' ? undefined : selectTagsVal.value,
      },
    };
    const wanttags = {
      lang: lang.value,
      category: 'news',
      want: 'tags',
      condition: {
        archives: selectTimeVal.value,
        author:
          selectAuthorVal.value === '' ? undefined : selectAuthorVal.value,
      },
    };
    getTagsData(wantauthor).then((res) => {
      selectData.value[1].select = [];
      res.obj.totalNum.forEach((item: any) => {
        selectData.value[1].select.push(item.key);
      });
      getTagsData(wanttags)
        .then((res) => {
          selectData.value[2].select = [];
          res.obj.totalNum.forEach((item: any) => {
            selectData.value[2].select.push(item.key);
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  } else if (
    selectTimeVal.value === '' &&
    selectAuthorVal.value === '' &&
    selectTagsVal.value === ''
  ) {
    getTagsList();
  } else {
    const params = {
      lang: lang.value,
      category: 'news',
      want: 'archives',
      condition: {
        author:
          selectAuthorVal.value === '' ? undefined : selectAuthorVal.value,
        tags: selectTagsVal.value === '' ? undefined : selectTagsVal.value,
      },
    };
    getTagsData(params).then((res) => {
      selectData.value[0].select = [];
      res.obj.totalNum.forEach((item: any) => {
        selectData.value[0].select.push(item.key);
      });
    });
  }
};
const changeAuthor = () => {
  selectMethod();
  if (selectAuthorVal.value !== '') {
    const wantarchive = {
      lang: lang.value,
      category: 'news',
      want: 'archives',
      condition: {
        author: selectAuthorVal.value,
        tags: selectTagsVal.value === '' ? undefined : selectTagsVal.value,
      },
    };
    const wanttags = {
      lang: lang.value,
      category: 'news',
      want: 'tags',
      condition: {
        archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
        author: selectAuthorVal.value,
      },
    };
    getTagsData(wantarchive).then((res) => {
      selectData.value[0].select = [];
      res.obj.totalNum.forEach((item: any) => {
        selectData.value[0].select.push(item.key);
      });
      getTagsData(wanttags)
        .then((res) => {
          selectData.value[2].select = [];
          res.obj.totalNum.forEach((item: any) => {
            selectData.value[2].select.push(item.key);
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  } else if (
    selectTimeVal.value === '' &&
    selectAuthorVal.value === '' &&
    selectTagsVal.value === ''
  ) {
    getTagsList();
  } else {
    const params = {
      lang: lang.value,
      category: 'news',
      want: 'author',
      condition: {
        archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
        tags: selectTagsVal.value === '' ? undefined : selectTagsVal.value,
      },
    };
    getTagsData(params).then((res) => {
      selectData.value[1].select = [];
      res.obj.totalNum.forEach((item: any) => {
        selectData.value[1].select.push(item.key);
      });
    });
  }
};
const changeTags = () => {
  selectMethod();
  if (selectTagsVal.value !== '') {
    const wantarchive = {
      lang: lang.value,
      category: 'news',
      want: 'archives',
      condition: {
        author:
          selectAuthorVal.value === '' ? undefined : selectAuthorVal.value,
        tags: selectTagsVal.value,
      },
    };
    const wantauthor = {
      lang: lang.value,
      category: 'news',
      want: 'author',
      condition: {
        archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
        tags: selectTagsVal.value,
      },
    };
    getTagsData(wantarchive).then((res) => {
      selectData.value[0].select = [];
      res.obj.totalNum.forEach((item: any) => {
        selectData.value[0].select.push(item.key);
      });
      getTagsData(wantauthor)
        .then((res) => {
          selectData.value[1].select = [];
          res.obj.totalNum.forEach((item: any) => {
            selectData.value[1].select.push(item.key);
          });
        })
        .catch((error) => {
          throw new Error(error);
        });
    });
  } else if (
    selectTimeVal.value === '' &&
    selectAuthorVal.value === '' &&
    selectTagsVal.value === ''
  ) {
    getTagsList();
  } else {
    const params = {
      lang: lang.value,
      category: 'news',
      want: 'tags',
      condition: {
        author:
          selectAuthorVal.value === '' ? undefined : selectAuthorVal.value,
        archives: selectTimeVal.value === '' ? undefined : selectTimeVal.value,
      },
    };
    getTagsData(params).then((res) => {
      selectData.value[2].select = [];
      res.obj.totalNum.forEach((item: any) => {
        selectData.value[2].select.push(item.key);
      });
    });
  }
};

// 获取标签数据
const getTagsList = () => {
  tagsParams.want = 'archives';
  getTagsData(tagsParams).then((res) => {
    selectData.value[0].select = [];
    res.obj.totalNum.forEach((item: any) => {
      selectData.value[0].select.push(item.key);
    });
    tagsParams.want = 'author';
    getTagsData(tagsParams)
      .then((res) => {
        selectData.value[1].select = [];
        res.obj.totalNum.forEach((item: any) => {
          selectData.value[1].select.push(item.key);
        });
        tagsParams.want = 'tags';
        getTagsData(tagsParams).then((res) => {
          selectData.value[2].select = [];
          res.obj.totalNum.forEach((item: any) => {
            selectData.value[2].select.push(item.key);
          });
        });
      })
      .catch((error: any) => {
        throw new Error(error);
      });
  });
};

//获取数据
const getListData = (params: ParamsType) => {
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
    .catch((error: any) => {
      console.error(error);
    });
};

onMounted(() => {
  getListData(sortParams);
  getTagsList();
});

const changeCurrent = (val: number) => {
  const params = {
    category: 'news',
    lang: lang.value,
    page: val,
    pageSize: paginationData.value.pagesize,
  };
  getListData(params);
};

const pageTotal = computed(() =>
  Math.ceil(paginationData.value.total / paginationData.value.pagesize)
);
const changeCurrentMoblie = (val: string) => {
  if (val === 'prev' && paginationData.value.currentpage > 1) {
    paginationData.value.currentpage = paginationData.value.currentpage - 1;
    changeCurrent(paginationData.value.currentpage);
  } else if (
    val === 'next' &&
    paginationData.value.currentpage < pageTotal.value
  ) {
    paginationData.value.currentpage = paginationData.value.currentpage + 1;
    changeCurrent(paginationData.value.currentpage);
  }
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="CONNECT"
    :title="userCaseData.NEWS"
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
              v-for="item in selectData[0].select"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ClientOnly>
      </div>
      <div class="news-select-item">
        <span class="news-select-item-title">{{ userCaseData.AUTHOR }}</span>
        <ClientOnly>
          <OSelect
            v-model="selectAuthorVal"
            filterable
            clearable
            :placeholder="userCaseData.ALL"
            @change="changeAuthor"
          >
            <template #prefix>
              <OIcon>
                <IconSearch />
              </OIcon>
            </template>
            <OOption
              v-for="item in selectData[1].select"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ClientOnly>
      </div>
      <div class="news-select-item">
        <span class="news-select-item-title">{{ userCaseData.TAGS }}</span>
        <ClientOnly>
          <OSelect
            v-model="selectTagsVal"
            filterable
            clearable
            :placeholder="userCaseData.ALL"
            @change="changeTags"
          >
            <template #prefix>
              <OIcon>
                <IconSearch />
              </OIcon>
            </template>
            <OOption
              v-for="item in selectData[2].select"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ClientOnly>
      </div>
    </div>
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
            v-if="!isPc"
            v-model:currentPage="paginationData.currentpage"
            v-model:page-size="paginationData.pagesize"
            :background="true"
            layout="sizes, prev, pager, next, slot, jumper"
            :total="paginationData.total"
            :page-sizes="[3, 6, 9]"
            @current-change="changeCurrent"
            @size-change="changeCurrent(1)"
          >
            <span class="pagination-slot"
              >{{ paginationData.currentpage }}/{{ pageTotal }}</span
            >
          </OPagination>
          <AppPaginationMo
            v-else
            :current-page="paginationData.currentpage"
            :total-page="pageTotal"
            @turn-page="changeCurrentMoblie"
          >
          </AppPaginationMo>
        </ClientOnly>
      </div>
    </template>
    <NotFound v-else />
  </AppContent>
</template>

<style lang="scss" scoped>
@mixin showline {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
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
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
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
    margin-right: var(--o-spacing-h1);
    @media (max-width: 1100px) {
      margin: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-bottom: var(--o-spacing-h5);
      :deep(.o-select) {
        width: 100%;
      }
    }
    .o-icon {
      font-size: var(--o-font-size-h7);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
      }
    }
    .news-select-item-title {
      margin-right: var(--o-spacing-h5);
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h7);
      @media (max-width: 1100px) {
        width: 50px;
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
  }
}
.news-list {
  max-width: 1448px;
  margin: var(--o-spacing-h2) auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h4);
  @media (max-width: 1450px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
  }
  @media (max-width: 980px) {
    grid-template-columns: repeat(1, 1fr);
    margin-top: 0;
  }
  @media (max-width: 768px) {
    margin-bottom: var(--o-spacing-h5);
    grid-gap: var(--o-spacing-h5);
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
      padding: var(--o-spacing-h4);
      color: var(--o-color-text1);
      @media (max-width: 980px) {
        flex: 1;
      }
      @media (max-width: 500px) {
        width: 100%;
        padding: var(--o-spacing-h6);
      }
      .news-title {
        font-weight: 400;
        height: 52px;
        line-height: var(--o-line-height-h7);
        font-size: var(--o-font-size-h7);
        margin-bottom: var(--o-spacing-h10);
        @include showline();
        -webkit-line-clamp: 2;
        @media (max-width: 500px) {
          height: auto;
          line-height: var(--o-line-height-text);
          font-size: var(--o-font-size-text);
          font-weight: 500;
          -webkit-line-clamp: 1;
          margin-bottom: var(--o-spacing-h8);
        }
      }
      .news-time {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--o-line-height-tip);
          font-size: var(--o-font-size-tip);
          color: var(--o-color-neutral5);
        }
      }
      .news-content {
        margin-top: var(--o-spacing-h5);
        @include showline();
        -webkit-line-clamp: 2;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        @media (max-width: 500px) {
          line-height: var(--o-line-height-tip);
          font-size: var(--o-font-size-tip);
          color: var(--o-color-neutral5);
        }
      }
    }
  }
}
</style>
