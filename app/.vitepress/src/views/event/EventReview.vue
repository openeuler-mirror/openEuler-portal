<script setup lang="ts">
import { reactive, onMounted, Ref, ref, watch } from 'vue';
import { useData, useRouter } from 'vitepress';

import _ from 'lodash';

import { useCommon } from '@/stores/common';

import AppContent from '@/components/AppContent.vue';

import { getSalon } from '@/api/api-sig';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404_dark.png';

import IconCalendar from '~icons/app/icon-calendar.svg';
import IconHome from '~icons/app/icon-home.svg';

interface LatestActivity {
  id: number;
  date: string;
  posterImg: string;
  title: string;
  synopsis: string;
  address: string;
  windowOpen: string;
  [propName: string]: any;
}

const commonStore = useCommon();
const { lang } = useData();
const router = useRouter();

const total = ref(0);

const loading = ref(true);

const allReviewList: Ref<Array<LatestActivity>> = ref([]);

// 精彩回顾下展示列表
const goDetail = (item: { id: number; windowOpen: string }) => {
  if (item.windowOpen) {
    window.open(item.windowOpen);
  } else {
    const query = 'id=' + item.id + '&isMini=1';
    router.go('/' + lang.value + `/interaction/event-list/detail/?` + query);
  }
};

const params = reactive({
  currentPage: 1,
  pageSize: 6,
});

// 移动端翻页
const jumpPage = (val: number) => {
  params.currentPage = val;
};

const paramsGetSalon = () => {
  loading.value = true;
  getSalon({
    page: params.currentPage,
    size: params.pageSize,
    activity: 'completed',
  })
    .then((res) => {
      total.value = res.total;
      res.data.reverse();
      allReviewList.value = [];
      res.data.forEach((item: LatestActivity) => {
        item.posterImg = `https://openeuler-website-beijing.obs.cn-north-4.myhuaweicloud.com/website-meetup/website${item.poster}.png`;
        allReviewList.value.unshift(item);
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
onMounted(() => {
  paramsGetSalon();
});
watch(
  () => params,
  () => {
    paramsGetSalon();
  },
  {
    deep: true,
  }
);
</script>

<template>
  <AppContent class="salon-content">
    <div v-loading="loading" element-loading-background="transparent" class="salon-review-mian">
      <template v-if="allReviewList?.length">
        <div class="salon-review">
          <OCard
            v-for="item in allReviewList"
            :key="item.id"
            class="salon-review-card"
            shadow="hover"
            @click="goDetail(item)"
          >
            <div class="salon-review-card-title">
              {{ item.title }}
            </div>
            <div v-if="item.posterImg" class="salon-review-card-img">
              <img :src="item.posterImg" alt="" />
              <span>{{ item.title }}</span>
            </div>
            <div
              v-else
              class="salon-review-card-desc"
              :title="item.synopsis ? item.synopsis : ''"
            >
              {{ item.synopsis ? item.synopsis : '' }}
            </div>
            <div class="salon-review-card-bottom">
              <div class="salon-review-card-mobile">
                <div class="salon-review-card-title-mobile">
                  {{ item.title }}
                </div>
                <div
                  class="salon-review-card-desc-mobile"
                  :title="item.synopsis ? item.synopsis : ''"
                >
                  {{ item.synopsis ? item.synopsis : '' }}
                </div>
              </div>
              <div class="salon-review-card-info">
                <IconCalendar class="salon-review-card-icon"></IconCalendar>
                <span>{{ item.date }}</span>
                <IconHome class="home salon-review-card-icon"></IconHome>
                <span class="address" :title="item.address">
                  {{ item.address }}</span
                >
              </div>
            </div>
          </OCard>
        </div>
        <div class="page-box">
          <ClientOnly>
            <OPagination
              v-if="allReviewList.length"
              v-model:current-page="params.currentPage"
              v-model:page-size="params.pageSize"
              :page-sizes="[3, 6, 9, 12]"
              :background="true"
              layout="sizes, prev, pager, next, slot, jumper"
              :total="total"
              @jump-page="jumpPage"
            >
              <span class="pagination-slot"
                >{{
                  params.pageSize * params.currentPage < total
                    ? params.pageSize * params.currentPage
                    : total
                }}
                / {{ total }}</span
              >
            </OPagination>
          </ClientOnly>
        </div>
      </template>
      <div v-else-if="!loading">
        <div class="nofound">
          <img
            class="empty-img"
            :src="
              commonStore.theme === 'light'
                ? notFoundImg_light
                : notFoundImg_dark
            "
            alt="404"
          />
          <p class="empty-text">
            {{ lang === 'zh' ? '暂无数据！' : 'NotFound !' }}
          </p>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.salon-tabs {
  :deep(.el-tabs__active-bar) {
    transition: none;
  }
}
.salon-review-mian {
  min-height: 420px;
}
.nofound {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: var(--e-font-size-h6);
  color: var(--e-color-text1);
  height: 100%;
  .empty-img {
    height: 300px;
  }
  .empty-text {
    margin-top: var(--e-spacing-h5);
  }
}
.page-box {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h5);
  }
}

.split-line {
  height: 1px;
  border: none;
  background-color: var(--e-color-division1);
  margin-top: var(--e-spacing-h1);
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.salon-review {
  display: grid;
  width: 100%;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--e-spacing-h2) var(--e-spacing-h4);
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--e-spacing-h5);
  }

  .salon-review-card {
    cursor: pointer;
    width: 100%;
    :deep(.el-card__body) {
      padding: var(--e-spacing-h4);
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
      @media (max-width: 768px) {
        padding: 0;
      }
    }

    .salon-review-card-mobile {
      display: none;
      @media (max-width: 768px) {
        display: flex;
        flex-flow: column;
      }

      .salon-review-card-title-mobile {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        color: var(--e-color-text1);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-all;
      }
      .salon-review-card-desc-mobile {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        color: var(--e-color-text4);
        margin-top: var(--e-spacing-h9);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        word-break: break-all;
      }
    }

    .salon-review-card-icon {
      height: 24px;
      width: 24px;
      color: var(--e-color-text4);
      margin-right: var(--e-spacing-h9);
      @media (max-width: 768px) {
        height: 16px;
        width: 16px;
        color: var(--e-color-neutral8);
        margin-right: var(--e-spacing-h10);
      }
    }

    .salon-review-card-title {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      color: var(--e-color-text1);
      overflow: hidden;
      text-overflow: ellipsis;
      height: 52px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      @media (max-width: 768px) {
        display: none;
      }
    }

    .salon-review-card-desc {
      width: 100%;
      height: 172px;
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      color: var(--e-color-text1);
      overflow: hidden;
      margin-top: var(--e-spacing-h4);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      word-break: break-all;
      @media (max-width: 768px) {
        display: none;
      }
    }

    .salon-review-card-img {
      width: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      margin-top: var(--e-spacing-h4);
      @media (max-width: 768px) {
        margin-top: 0px;
      }
      img {
        object-fit: cover;
        height: 172px;
        width: 100%;
        @media (max-width: 768px) {
          height: 120px;
        }
      }
      span {
        position: absolute;
        text-align: center;
        max-width: 400px;
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
        color: #fff;
        @media (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
    }

    .salon-review-card-info {
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: var(--e-spacing-h4);
      @media (max-width: 768px) {
        margin-top: var(--e-spacing-h5);
      }
    }

    .salon-review-card-bottom {
      padding: 0;
      width: 100%;
      @media (max-width: 768px) {
        padding: var(--e-spacing-h5) var(--e-spacing-h6);
      }

      .home {
        margin-left: var(--e-spacing-h2);
        @media (max-width: 768px) {
          margin-left: var(--e-spacing-h5);
        }
      }
      .address {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      span {
        color: var(--e-color-text4);
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        white-space: nowrap;
        @media (max-width: 768px) {
          color: var(--e-color-neutral8);
        }
      }
    }
  }
}

.salon-time {
  margin-top: var(--e-spacing-h2);
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
}
.salon-tabs {
  background-color: var(--e-color-bg2);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  :deep(.el-tabs__header) {
    margin: 0px;
  }
}
</style>
