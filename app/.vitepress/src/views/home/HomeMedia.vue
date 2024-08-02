<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useI18n } from '@/i18n';
import dayjs from 'dayjs';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();

const roomName = i18n.value.home.HOME_ROOMS.ROOM_NAME;

const tabType: Ref<string> = ref('blog');

const blogList: Ref<any[]> = ref([]);

const newsList: Ref<any[]> = ref([]);

const props = defineProps({
  newsData: {
    type: Object,
    default: undefined,
  },
  blogData: {
    type: Object,
    default: undefined,
  },
});

const resolvePostDate = (date: any) => {
  return dayjs(date).format('YYYY-MM-DD');
};

const filterSiteData = (datas: any[]) => {
  let newData = datas;
  const englishMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Spt',
    'Oct',
    'Nov',
    'Dec',
  ];
  newData.sort(function (date1: { date: any }, date2: { date: any }) {
    const origin1 = date1.date;
    const origin2 = date2.date;

    const parsed1 = Date.parse(origin1);
    const parsed2 = Date.parse(origin2);

    return parsed2 - parsed1;
  });
  newData = newData.slice(0, 4);
  newData.forEach((item) => {
    let date = item.date;
    date = resolvePostDate(date).split('-');
    date.forEach((arrItem: string, index: string | number) => {
      if (arrItem[0] === '0') {
        date[index] = arrItem.substring(1);
      }
    });
    date[1] = englishMonth[date[1] - 1];
    item.date = date;
  });
  return newData;
};

const initNewsData = (datas: any) => {
  let newsData = [];

  newsData = filterSiteData(datas);

  newsList.value = newsData;
};

const initBlogData = (datas: any) => {
  let blogData = [];

  blogData = filterSiteData(datas);

  blogList.value = blogData;
};

const jumpTo = (path: string) => {
  window.open(path, '_blank');
};

onMounted(async () => {
  props.blogData?.obj?.records && initBlogData(props.blogData.obj.records);
  props.newsData?.obj?.records && initNewsData(props.newsData.obj.records);
});
</script>
<template>
  <div
    data-aos="fade-up"
    data-aos-anchor-placement="center-bottom"
    class="home-media"
  >
    <div class="title-list">
      <OTabs v-model="tabType">
        <OTabPane
          v-for="item in roomName"
          :key="item.ID"
          :label="item.NAME"
          :name="item.ID"
        ></OTabPane>
      </OTabs>
    </div>
    <OContainer :level-index="1">
      <div
        class="room-contain-media"
        :class="{ 'is-visible': tabType === 'blog' }"
      >
        <h4 class="type-title">
          {{ i18n.home.HOME_ROOMS.BLOG_NAME }}
        </h4>
        <div class="room-box">
          <div v-for="(item, index) in blogList" :key="index" class="room-item">
            <div class="room-item-pc">
              <div class="room-item-left">
                <span class="day">{{ item.date[2] }}</span>
                <div class="left-bottom">
                  <span class="month">{{ item.date[1] }}</span>
                  <span class="year">{{ item.date[0] }}</span>
                </div>
              </div>
              <div class="room-item-right">
                <div class="room-top">
                  <a
                    :href="`/${item.path}.html`"
                    :title="item.title"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.title }}
                  </a>
                  <p>
                    <span
                      v-for="(authorName, index2) in item.author"
                      :key="authorName"
                      >{{ authorName
                      }}<span v-show="item.author.length !== index2 + 1"
                        >,&nbsp;</span
                      >
                    </span>
                  </p>
                </div>
                <div class="room-bottom">
                  <a
                    class="word-hover"
                    :title="item.summary"
                    :href="`/${item.path}.html`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.summary }}
                  </a>
                </div>
              </div>
            </div>
            <div class="room-item-mo">
              <p class="author">
                <span
                  v-for="(authorName, index2) in item.author"
                  :key="authorName"
                  >{{ authorName
                  }}<span v-show="item.author.length !== index2 + 1"
                    >,&nbsp;</span
                  >
                </span>
              </p>
              <a
                class="word-hover"
                :title="item.summary"
                :href="`/${item.path}.html`"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.summary }}
              </a>
            </div>
          </div>
        </div>

        <div class="media-bottom">
          <OButton
            animation
            type="text"
            class="media-bottom-button"
            @click="jumpTo('interaction/blog-list/')"
          >
            {{ i18n.home.USER_CASE.VIEW_MORE }}
            <template #suffixIcon>
              <IconArrowRight class="media-bottom-icon"></IconArrowRight>
            </template>
          </OButton>
        </div>
      </div>
      <div
        class="room-contain-media"
        :class="{ 'is-visible': tabType === 'news' }"
      >
        <h4 class="type-title">
          {{ i18n.home.HOME_ROOMS.NEWS_NAME }}
        </h4>
        <div class="room-box">
          <div v-for="(item, index) in newsList" :key="index" class="room-item">
            <div class="room-item-pc">
              <div class="room-item-left">
                <span class="day">{{ item.date[2] }}</span>
                <div class="left-bottom">
                  <span class="month">{{ item.date[1] }}</span>
                  <span class="year">{{ item.date[0] }}</span>
                </div>
              </div>
              <div class="room-item-right">
                <div class="room-top">
                  <a
                    :href="`/${item.path}.html`"
                    :title="item.title"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.title }}
                  </a>
                  <p>
                    <span
                      v-for="(authorName, index2) in item.author"
                      :key="authorName"
                      >{{ authorName
                      }}<span v-show="item.author.length !== index2 + 1"
                        >,&nbsp;</span
                      >
                    </span>
                  </p>
                </div>
                <div class="room-bottom">
                  <a
                    class="word-hover"
                    :title="item.summary"
                    :href="`/${item.path}.html`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {{ item.summary }}
                  </a>
                </div>
              </div>
            </div>
            <div class="room-item-mo">
              <p class="author">
                <span
                  v-for="(authorName, index2) in item.author"
                  :key="authorName"
                  >{{ authorName
                  }}<span v-show="item.author.length !== index2 + 1"
                    >,&nbsp;</span
                  >
                </span>
              </p>
              <a
                class="word-hover"
                :title="item.summary"
                :href="`/${item.path}.html`"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ item.summary }}
              </a>
            </div>
          </div>
        </div>
        <div class="media-bottom">
          <OButton
            animation
            type="text"
            class="media-bottom-button"
            @click="jumpTo('interaction/news-list/')"
          >
            {{ i18n.home.USER_CASE.VIEW_MORE }}
            <template #suffixIcon>
              <IconArrowRight class="media-bottom-icon"></IconArrowRight>
            </template>
          </OButton>
        </div>
      </div>
    </OContainer>
  </div>
</template>
<style lang="scss" scoped>
.word-hover {
  display: block;
  cursor: pointer;
  color: var(--e-color-text1);
  &:hover {
    color: var(--e-color-brand1);
  }
}
.media-bottom {
  display: flex;
  margin-top: var(--e-spacing-h2);
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1080px) {
    margin-top: var(--e-spacing-h5);
  }
  @media screen and (max-width: 768px) {
    margin: var(--e-spacing-h5) 0 var(--e-spacing-h10) 0;
    :deep(.o-button) {
      font-size: var(--e-font-size-tip) !important;
      line-height: var(--e-line-height-tip) !important;
    }
  }

  :deep(.o-button) {
    padding: 0;
  }

  .media-bottom-icon {
    color: var(--e-color-brand1);
    width: var(--e-font-size-h8);
    height: var(--e-font-size-h8);
  }
}

.room-item-mo {
  display: none;
}
.home-media {
  margin: var(--e-spacing-h2) auto;
  .room-contain-media {
    display: none;
    padding: var(--e-spacing-h2);
    background-color: var(--e-color-bg2);
    .type-title {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-font-size-h7);
      font-weight: 500;
      color: var(--e-color-text1);
      display: block;
      @media screen and (max-width: 1080px) {
        display: none;
      }
    }
    .room-box {
      display: grid;
      margin-top: var(--e-spacing-h2);
      grid-template-columns: repeat(2, minmax(82px, 1fr));
      column-gap: var(--e-spacing-h2);
      row-gap: var(--e-spacing-h2);
      .room-item-pc {
        display: flex;
        padding-bottom: var(--e-spacing-h2);
        border-bottom: 1px solid var(--e-color-division1);
        p {
          text-align: left;
        }
        .room-item-left {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          margin-right: var(--e-spacing-h4);
          width: 100px;
          height: 110px;
          background-color: var(--e-color-bg3);
          color: var(--e-color-text1);
          .day {
            margin-bottom: var(--e-spacing-h8);
            font-size: var(--e-font-size-h4);
          }
          .year {
            padding-left: var(--e-spacing-h10);
          }
          .left-bottom {
            font-size: var(--e-font-size-tip);
          }
        }
        .room-item-right {
          display: flex;
          flex: 1;
          min-width: 0;
          font-size: var(--e-font-size-text);
          justify-content: space-between;
          flex-direction: column;
          .room-top {
            min-width: 0;
            a {
              display: block;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-weight: 500;
              font-size: var(--e-font-size-h7);
              color: var(--e-color-text1);
              &:hover {
                color: var(--e-color-brand1);
              }
            }
            p {
              line-height: var(--e-line-height-text);
              font-size: var(--e-font-size-text);
              margin-top: var(--e-spacing-h9);
              color: var(--e-color-text1);
            }
            @media screen and (max-width: 768px) {
              a {
                font-size: var(--e-font-size-text);
              }
            }
          }
          .room-bottom {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            color: var(--e-color-text1);
            a {
              text-decoration: none;
            }
            @media screen and (max-width: 768px) {
              display: none;
            }
          }
        }
      }
    }
    @media screen and (max-width: 1080px) {
      .room-box {
        margin: 0;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        row-gap: var(--e-spacing-h5);
      }
    }
    @media screen and (max-width: 768px) {
      padding: var(--e-spacing-h6);
      padding-bottom: var(--e-spacing-h5);
      .room-box {
        margin: 0;
        grid-template-columns: repeat(1, minmax(300px, 1fr));
        .room-item {
          border-bottom: 1px solid var(--e-color-division1);

          .room-item-pc {
            border-bottom: none;
            padding-bottom: var(--e-spacing-h5);
            .room-item-left {
              margin-right: var(--e-spacing-h6);
              width: var(--e-line-height-h3);
              height: var(--e-line-height-h3);
              .day {
                margin: 0;
                font-size: var(--e-font-size-text);
              }
              .left-bottom {
                display: flex;
                transform: scale(0.5);
              }
            }
            .room-item-right {
              .room-top {
                a {
                  display: -webkit-box;
                  white-space: inherit;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  line-height: var(--e-line-height-text);
                  font-size: var(--e-font-size-text);
                }
                p {
                  display: none;
                }
              }
            }
          }
          .room-item-mo {
            display: flex;
            flex-direction: column;
            font-size: var(--e-font-size-tip);
            color: var(--e-color-text4);
            .author {
              padding-bottom: var(--e-spacing-h8);
            }
            a {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              line-height: var(--e-line-height-tip);
              margin-bottom: var(--e-spacing-h5);
              color: inherit;
              text-decoration: none;
            }
          }
        }
      }
    }
  }
  .is-visible {
    display: block;
  }
}

:deep(.title-list) {
  display: flex;
  padding-bottom: var(--e-spacing-h2);
  justify-content: flex-end;
  .el-tabs__header {
    margin: 0;
  }
  @media screen and (max-width: 1080px) {
    padding-bottom: var(--e-spacing-h5);
    justify-content: center;
  }
  .el-tabs__nav-scroll {
    @media screen and (max-width: 1080px) {
      display: flex;
      justify-content: center;
    }
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .title-item {
    cursor: pointer;
    padding: var(--e-spacing-h6);
    &:hover {
      color: var(--e-color-brand1);
    }
  }
  .active {
    background-color: var(--e-color-brand1);
    color: var(--e-color-text2) !important;
  }
}
</style>
