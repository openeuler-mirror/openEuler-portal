<script setup lang="ts">
import { reactive, onMounted, ref, computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import { getSortData } from '@/api/api-search';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.interaction);
const newsInfo = {
  link: `/${lang.value}/interaction/news-list/`,
  name: i18n.value.common.NAV_ROUTER.NEWS,
};

const router = useRouter();

const sortParams = reactive({
  page: 1,
  pageSize: 100,
  lang: lang.value,
  category: 'news',
});
const newsTitle = ref<any>([]);
const newsLint = ref<any>([]);
const prev = ref('');
const prevLint = ref('');
const nextLint = ref('');
const next = ref('');
const goPrve = () => {
  router.go(`/${prevLint.value}`);
  getNewsData();
};
const goNext = () => {
  router.go(`/${nextLint.value}`);
  getNewsData();
};
const getNewsData = async () => {
  await getSortData(sortParams).then((res) => {
    res.obj.records.forEach((item: any) => {
      newsTitle.value.push(item.title);
      newsLint.value.push(item.path);
    });
    newsTitle.value.forEach((item: any, index: number) => {
      if (item === frontmatter.value.title && index !== 0) {
        prev.value = newsTitle.value[index - 1];
        prevLint.value = newsLint.value[index - 1];
      }
      if (
        item === frontmatter.value.title &&
        index !== res.obj.records.length - 1
      ) {
        next.value = newsTitle.value[index + 1];
        nextLint.value = newsLint.value[index + 1];
      }
    });
  });
};
onMounted(() => {
  getNewsData();
});
</script>

<template>
  <div class="bread">
    <BreadCrumbs
      :bread1="newsInfo.name"
      :bread2="frontmatter.title"
      :link1="newsInfo.link"
    />
  </div>
  <div class="markdown">
    <div class="news-markdown-detail">
      <AppMdHead :frontmatter="frontmatter" />
      <Content />
    </div>
    <hr />
    <div class="news-markdown-detail">
      <div v-if="prev !== ''" class="skip" @click="goPrve">
        <span>{{ userCaseData.PREV }}</span>
        <p>{{ prev }}</p>
      </div>
      <div v-if="next !== ''" class="skip" @click="goNext">
        <span>{{ userCaseData.NEXT }}</span>
        <p>{{ next }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-markdown-detail {
  // max-width: 880px;
  margin: 0 auto;
}
.bread {
  padding-top: 40px;
  padding-left: 44px;
  padding-right: 44px;
  max-width: 1504px;
  margin: 0 auto;
  @media (max-width: 1439px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    padding-top: 16px;
  }
}
.skip {
  margin-top: var(--e-spacing-h5);
  cursor: pointer;
  span {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    color: var(--e-color-text1);
    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  p {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    color: var(--e-color-text1);
    margin: 0;
    display: inline-block;

    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  p:hover {
    @media (min-width: 1100px) {
      color: var(--e-color-link2);
    }
  }
}
</style>
