<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import { PageDataT } from '@/shared/@types/type-usergroup';
import cityData from '@/data/user-group/city/';
import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';
import CityMember from './city-detail/CityMember.vue';
import ShowCase from './city-detail/ShowCase.vue';
import SalonReview from './city-detail/SalonReview.vue';
import NewsItem from './city-detail/NewsItem.vue';

const i18n = useI18n();
const router = useRouter();
const cityName = ref('');
const { frontmatter, lang } = useData();
const groupI18n = computed(() => {
  return i18n.value.group;
});
const blogInfo = {
  link: `/${lang.value}/community/user-group/`,
  name: groupI18n.value.BANNER_TITLE,
};
const pageData = ref<PageDataT>({} as PageDataT);

// 点击跳转案例详情页面
const jumpTo = (link: string) => {
  window.open(`${link}`, '_blank');
};

onMounted(() => {
  if (location.href.split('=')[1]) {
    cityName.value = decodeURIComponent(window.location.href.split('=')[1]);

    cityData.forEach((item) => {
      if (item.name === cityName.value) {
        pageData.value = item.data;
      }
    });
  } else {
    router.go('/zh/community/user-group/');
  }
});
</script>

<template>
  <AppContent :pc-top="40" :mobile-top="24">
    <div class="bread">
      <BreadCrumbs
        :bread1="blogInfo.name"
        :bread2="cityName + frontmatter.title"
        :link1="blogInfo.link"
      />
    </div>
    <div class="city-info">
      <h3 class="title">{{ pageData.title }}</h3>
      <p v-if="pageData.organizational" class="organizational">
        组织单位：{{ pageData.organizational }}
      </p>
    </div>
    <div class="city-member">
      <!-- 核心成员 -->
      <h2>{{ groupI18n.CORE_MEMBERS }}</h2>
      <CityMember
        v-if="pageData.organizer && pageData.organizer.length > 0"
        title="Organizer"
        :options="pageData.organizer"
      />
      <CityMember
        v-if="pageData.ambassador && pageData.ambassador.length > 0"
        title="Ambassador"
        :options="pageData.ambassador"
      />
      <CityMember
        v-if="pageData.member && pageData.member.length > 0"
        title="Member"
        :options="pageData.member"
      />
      <div class="city-action">
        <OButton
          type="primary"
          @click="jumpTo(groupI18n.LINK)"
          class="button-size-large"
          size="large"
          >申请加入</OButton
        >
      </div>

      <!-- 用户组活动 -->
      <div v-if="pageData.salon && pageData.salon.length > 0" class="show-case">
        <h2>用户组活动</h2>
        <SalonReview :options="pageData.salon" />
        <p class="case-text">
          社区鼓励用广组成员白发举办活动，社区将给子活动资源支持，并给子组织者柴誉身份和社区纪念品。欢迎申办活动。
        </p>
        <div class="city-action">
          <OButton
            type="primary"
            @click="jumpTo('/zh/interaction/event-list/collect/')"
            class="button-size-large"
            size="large"
            >申请举报活动</OButton
          >
        </div>
      </div>

      <!-- 用户组新闻 -->
      <div v-if="pageData.news && pageData.news.length > 0" class="show-case">
        <h2>用户组活动回顾</h2>
        <NewsItem :options="pageData.news" />
      </div>

      <!-- 用户案例 -->
      <div
        v-if="pageData.showcase && pageData.showcase.length > 0"
        class="show-case"
      >
        <h2>用户案例</h2>
        <ShowCase :options="pageData.showcase" />
        <p class="case-text">
          欢迎在使用openEuler的用户积板投递案例，社区将提供展示宣传渠道，共同打造企业影响力。
        </p>
        <div class="city-action">
          <OButton
            type="primary"
            @click="
              jumpTo(
                'https://gitee.com/openeuler/community/blob/master/zh/contributors/user-story-guideline.md'
              )
            "
            class="button-size-large"
            size="large"
            >投稿案例</OButton
          >
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
:deep(.o-button.button-size-large) {
  min-width: 248px;
  justify-content: center;
  --o-button-font-size: var(--o-font-size-h6);
  line-height: 38px;
  height: 60px;
  @media screen and (max-width: 1100px) {
    height: 48px;
    min-width: 200px;
    --o-button-font-size: var(--o-font-size-h7);
  }
}
.city-action {
  text-align: center;
  margin-top: 40px;
}
.city-info {
  padding: 40px;
  background: var(--o-color-bg2);
  box-shadow: var(--o-shadow-l1);
  margin: 40px 0;
  @media screen and (max-width: 1100px) {
    padding: 24px;
    margin: 24px 0;
  }
  .title {
    font-size: var(--o-font-size-h4);
    line-height: var(--o-line-height-h4);
    color: var(--o-color-text1);
    font-weight: 500;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
    }
  }
  .organizational {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    color: var(--o-color-text1);
    margin-top: 20px;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
}
.city-member {
  h2 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 300;
    margin-bottom: 40px;
    margin-top: var(--o-spacing-h1);
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      margin: 40px 0 24px;
    }
  }
}

// 用户案例
.show-case {
  .case-text {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    color: var(--o-color-text1);
    text-align: center;
    margin: 40px 0;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin: 16px 0;
    }
  }
}
</style>
