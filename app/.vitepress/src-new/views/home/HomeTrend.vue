<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { OCard, OScroller, OTab, OTabPane } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

import { getHomeBlog, getHomeNews } from '~@/api/api-search';

import blogBg1 from '~@/assets/category/home/trend/blog-bg1.jpg';
import blogBg2 from '~@/assets/category/home/trend/blog-bg2.jpg';
import blogBg3 from '~@/assets/category/home/trend/blog-bg3.jpg';

import IconUser from '~icons/app-new/icon-user.svg';

const { t, locale } = useLocale();
const { gtLaptop, gtPad, gtPadV, gtPhone, lePadV } = useScreen();

// -------------------- 选中tab页 --------------------
const activeTab = ref('blog');

// -------------------- 格式化信息 --------------------
const normalizeData = (data: Array<any>) => {
  const normalizedData = [...data];
  for (let i = 0, len = normalizedData.length; i < len; i++) {
    const item = normalizedData[i];

    item.date = item.date.replace(/-/g, '/');
  }
  return normalizedData;
};

// 获取博客背景
const calcBlogStyle = (idx: number) => {
  if (idx % 3 === 0) {
    return {
      bg: blogBg1,
      theme: 'dark',
    };
  } else if (idx % 3 === 1) {
    return {
      bg: blogBg2,
      theme: 'light',
    };
  } else if (idx % 3 === 2) {
    return {
      bg: blogBg3,
      theme: 'light',
    };
  }
};

// -------------------- 获取新闻、博客 --------------------
const newsArr = ref([]);
const blogArr = ref([]);
const getData = () => {
  getHomeBlog(locale.value).then((blogRes) => {
    if (blogRes && blogRes.obj && blogRes.obj.records) {
      blogArr.value = normalizeData(blogRes.obj.records);

      getHomeNews(locale.value).then((newsRes) => {
        if (newsRes && newsRes.obj && newsRes.obj.records) {
          newsArr.value = normalizeData(newsRes.obj.records);
        }
      });
    }
  });
};
onMounted(() => {
  getData();
});
</script>

<template>
  <AppSection
    class="home-trend"
    :title="t('home.trend')"
    :footer="t('home.more')"
    :footer-href="`/${locale}/interaction/${activeTab}-list/`"
    :full="lePadV"
  >
    <OTab v-model="activeTab" variant="text" :line="false">
      <!-- 博客 -->
      <OTabPane v-if="blogArr.length" value="blog" :label="$t('home.blog')">
        <OScroller
          class="trend-scroller"
          :show-type="lePadV ? 'never' : 'always'"
          size="small"
          disabled-y
        >
          <OCard
            v-for="(blog, idx) in blogArr"
            cursor="pointer"
            class="trend-card trend-blog"
            :class="{ 'le-pad_v': lePadV }"
            hoverable
            :data-o-theme="calcBlogStyle(idx)?.theme"
            :title="blog.title"
            :title-row="2"
            :title-max-row="2"
            :detail-max-row="2"
            :detail="!lePadV ? blog.summary : ''"
            :cover="calcBlogStyle(idx)?.bg"
            :cover-ratio="
              gtLaptop
                ? 451 / 382
                : gtPad
                ? 418 / 368
                : gtPadV
                ? 325 / 274
                : gtPhone
                ? 292 / 238
                : 165 / 162
            "
            :href="`/${blog.path}.html`"
            target="_blank"
          >
            <div class="blog-bottom">
              <p class="blog-date">{{ blog.date }}</p>
              <p class="blog-author">
                <OIcon class="icon-user">
                  <IconUser />
                </OIcon>
                {{ blog.author && blog.author[0] }}
              </p>
            </div>
          </OCard>
        </OScroller>
      </OTabPane>
      <!-- 新闻 -->
      <OTabPane v-if="newsArr.length" value="news" :label="t('home.news')">
        <OScroller
          class="trend-scroller"
          :show-type="lePadV ? 'never' : 'always'"
          size="small"
          disabled-y
        >
          <OCard
            v-for="(news, idx) in newsArr"
            :key="idx"
            cursor="pointer"
            class="trend-card"
            hoverable
            :title="news.title"
            :title-row="2"
            :title-max-row="2"
            :detail-max-row="2"
            :detail="!lePadV ? news.summary : news.date"
            :cover="`/${news.banner}`"
            :cover-ratio="456 / 188"
            :href="`/${news.path}.html`"
            target="_blank"
          >
          </OCard>
        </OScroller>
      </OTabPane>
    </OTab>
  </AppSection>
</template>

<style lang="scss" scoped>
.trend-scroller {
  :deep(.o-scrollbar) {
    --scrollbar-height: 100%;
  }

  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
  padding: 32px 0 36px;

  @include respond-to('<=laptop') {
    padding: 16px 0 24px;
  }

  @include respond-to('<=pad') {
    padding: 12px 0 24px;
  }

  @include respond-to('<=pad_v') {
    padding-bottom: 0;
    --scroller-padding: 0 var(--layout-content-padding);
  }

  @include respond-to('phone') {
    padding: 12px 0 0;
  }
}

.trend-card {
  height: 100%;
  display: inline-flex;
  white-space: normal;
  --trend-card-gap: 32px;
  --card-main-padding: 32px;
  --card-content-gap: 24px;
  width: calc((100% - var(--trend-card-gap) * 2) / 3);

  & + .trend-card {
    margin-left: var(--trend-card-gap);
  }

  @include respond-to('<=laptop') {
    --trend-card-gap: 24px;
    --card-main-padding: 24px;
    --card-content-gap: 18px;
  }

  @include respond-to('<=pad') {
    --trend-card-gap: 18px;
    --card-main-padding: 18px;
    --card-content-gap: 12px;
  }

  @include respond-to('<=pad_v') {
    width: calc((100% - var(--trend-card-gap) * 2) / 2.5);
    --card-content-gap: 12px;
  }

  @include respond-to('phone') {
    width: calc(50vw - 30px);
    --trend-card-gap: 12px;
    --card-main-padding: 12px;
    --card-content-gap: 8px;
  }
}

.o-figure {
  --figure-radius: 8px;
}

.trend-blog {
  position: relative;
}

.trend-blog {
  :deep(.o-card-main) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  :deep(.o-card-content) {
    height: 100%;
  }
}

.blog-title {
  @include h2;
}

.blog-detail {
  margin-top: 12px;
  color: var(--o-color-info2);
}

.blog-bottom {
  position: absolute;
  bottom: var(--card-main-padding);
  display: flex;
  width: calc(100% - 2 * var(--card-main-padding));
  justify-content: space-between;
  color: rgba(var(--o-white), 0.8);
  font-size: var(--card-content-text-size);
  line-height: var(--card-content-text-height);
}

.le-pad_v {
  .blog-bottom {
    flex-direction: column;
    .blog-author {
      margin-top: 2px;
    }
  }
}

.blog-author {
  display: flex;
  align-items: center;
}

.icon-user {
  color: rgba(var(--o-white), 0.8);
  fill: currentColor;
  margin-right: 4px;
  @include h2;
}
</style>
