<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { OTab, OTabPane, ORow, OCol, OCard, OLink, OIcon, OLayer, OFigure, OScroller, ODivider, isClient } from '@opensig/opendesign';
import { useRouter } from 'vitepress';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import banner from '~@/assets/category/honor/honor-banner.jpg';

import newCardBg from '~@/assets/category/honor/new-card-bg.jpg';
import newCardBgDark from '~@/assets/category/honor/new-card-bg-dark.png';
import personalCardBg from '~@/assets/category/honor/personal-card-bg.png';
import personalCardBgDark from '~@/assets/category/honor/personal-card-bg-dark.png';

import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';
import IconOutLink from '~icons/yuanrong/icon-outlink.svg';

import { year2021 } from '~@/data/honor/2021';
import { year2022 } from '~@/data/honor/2022';
import { year2023 } from '~@/data/honor/2023';
import { year2024 } from '~@/data/honor/2024';
import { year2025 } from '~@/data/honor/2025';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale, t } = useLocale();
const { lePadV, isPhone, lePad, leLaptop } = useScreen();
const router = useRouter();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

const activeTab = ref('2021');

const honorData = [
  {
    label: '2021',
    data: year2021,
  },
  {
    label: '2022',
    data: year2022,
  },
  {
    label: '2023',
    data: year2023,
  },
  {
    label: '2024',
    data: year2024,
  },
  {
    label: '2025',
    data: year2025,
  }
];

// -------------------- 证书图片弹窗--------------------
const certificateVisible = ref(false);
const certificateImg = ref();
const openCertificate = (val: any) => {
  certificateImg.value = val;
  certificateVisible.value = true;
};

const personalDetail = (event: Event) => {
  if (lePadV.value) {
    const target = event.currentTarget as HTMLElement;
    const opacity = target.style.opacity;
    if (opacity === '1') {
      target.style.opacity = '0';
    } else {
      target.style.opacity = '1';
    }
  }
};

// -------------------- 切换tab --------------------
const changeTab = (val: number) => {
  router.go(`/${locale.value}/community/honor/?year=${val}`);
};

const flexGap = computed(() => {
  if (leLaptop.value) {
    return '24px 24px';
  } else if (lePad.value) {
    return '16px 16px';
  } else if (lePadV.value) {
    return '0 12px';
  }
  return '32px 32px';
});
const flexCol = computed(() =>
  lePadV.value ? '0 0 100%' : '0 0 33.33%'
);

watch(
  () => router.route.path,
  () => {
    if (!isClient) return;
    if (!location.search) {
      router.go(`/${locale.value}/community/honor/?year=2025`);
      activeTab.value = '2025';
    } else {
      activeTab.value = location.search.split('=')[1];
    }
  },
  { immediate: true }
)
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="honor-banner" title="社区荣誉" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">社区荣誉</p>
  </div>
  <div>
    <ClientOnly>
      <OTab v-model="activeTab" :line="false" @change="changeTab">
        <OTabPane v-for="tab in honorData" :label="tab.label" :value="tab.label" :class="[`tab-${tab.label}`]">
          <!-- 新闻 -->
          <ContentWrapper v-if="tab.data?.news?.length" class="new-content">
            <ORow :gap="flexGap" flex-wrap="wrap" class="new-row">
              <OCol v-for="item in tab.data.news" :key="item.link" :flex="flexCol">
                <OCard class="new-card" :style="{ backgroundImage: `url(${isDark ? newCardBgDark : newCardBg})` }">
                  <p class="card-name">{{ item.name }}</p>
                  <template #footer>
                    <OLink color="normal" :href="item.link" target="_blank">
                      查看新闻<OIcon><IconChevronRight /></OIcon>
                    </OLink>
                    <OLink v-if="item?.certificate" color="normal" @click="openCertificate(item.certificate)">
                      查看证书<OIcon><IconChevronRight /></OIcon>
                    </OLink>
                  </template>
                </OCard>
              </OCol>
            </ORow>
          </ContentWrapper>
          <!-- 突出贡献单位 -->
          <ContentWrapper v-if="tab.data?.company" class="company-content">
            <p class="floor-title">
              <p v-for="item in tab.data?.company.title" :key="item">{{ item }}</p>
            </p>
            <div class="logo-list">
              <div v-for="(logo, i) in tab.data?.company.list" :key="i" class="item-logo">
                <img :src="logo[commonStore.theme]" />
              </div>
            </div>
            <p class="company-tips">{{ tab.data?.company.tips }}</p>
          </ContentWrapper>
          <!-- 贡献奖 -->
          <ContentWrapper v-if="tab.data?.contribution && tab.label === '2025'" class="contribution-content">
            <p class="floor-title">
              <p v-for="item in tab.data?.contribution.title" :key="item">{{ item }}</p>
            </p>
            <!-- 个人奖 -->
            <template v-if="tab.data?.contribution.personal?.length">
              <div v-for="(per, p) in tab.data?.contribution.personal" :key="p" class="personal">
                <p v-if="per.title" class="subtitle">{{ per.title }}</p>
                <ORow :gap="flexGap" flex-wrap="wrap" class="personal-row">
                  <OCol v-for="perCard in per.list" :key="perCard.name" :flex="flexCol">
                    <OCard hoverable class="personal-card" :style="{ backgroundImage: `url(${isDark ? personalCardBgDark : personalCardBg})` }">
                      <p class="card-name">{{ perCard.name }}</p>
                      <p v-for="itemPost in perCard.post" :key="itemPost" class="card-detail card-post">
                        {{ itemPost }}
                      </p>
                      <img :src="perCard.img" alt="" class="card-avatar" />
                      <div class="card-hover" @click="personalDetail">
                        <p class="card-name">{{ perCard.name }}</p>
                        <OScroller show-type="always" class="card-detail-scroller">
                          <p v-for="itemDetail in perCard.detail" :key="itemDetail">
                            {{ itemDetail }}
                          </p>
                        </OScroller>
                      </div>
                    </OCard>
                  </OCol>
                </ORow>
              </div>
            </template>
            <!-- 团队奖 -->
            <template v-if="tab.data?.contribution.team">
              <p class="subtitle">{{ tab.data?.contribution.team.title }}</p>
              <ORow gap="0 32px" flex-wrap="wrap" class="team-row">
                <OCol v-for="t in tab.data?.contribution.team.list" :key="t.name" flex="0 1 100%">
                  <OCard class="team-card">
                    <p class="card-name">{{ t.name }}</p>
                    <div class="card-detail">
                      <p v-for="itemDetail in t.detail" :key="itemDetail">
                        {{ itemDetail }}
                      </p>
                    </div>
                    <template #footer>
                      <OLink color="normal" :href="t.link" target="_blank" hoverUnderline>
                        项目地址<OIcon><IconChevronRight /></OIcon>
                      </OLink>
                    </template>
                  </OCard>
                </OCol>
              </ORow>
            </template>
          </ContentWrapper>
          <!-- 年度优秀项目 -->
          <ContentWrapper v-if="tab.data?.project" class="project-content">
            <p class="floor-title">
              <p v-for="item in tab.data?.project.title" :key="item">{{ item }}</p>
            </p>
            <template v-if="tab.data?.project.list?.length">
              <div v-for="(pro, p) in tab.data?.project.list" :key="p" class="project">
                <p v-if="pro.title" class="subtitle">{{ pro.title }}</p>
                <ORow :gap="flexGap" flex-wrap="wrap" class="project-row">
                  <OCol v-for="proItem in pro.list" :key="proItem.link" :flex="flexCol">
                    <OCard class="project-card" :class="[`project-card-${tab.label}`]" :style="{ backgroundImage: `url(${isDark ? pro.bgDark : pro.bg})` }">
                      <p class="card-name">{{ proItem.name }}</p>
                      <div class="card-detail">
                        <p v-for="itemDetail in proItem.detail" :key="itemDetail">
                          {{ itemDetail }}
                        </p>
                      </div>
                      <template #footer>
                        <ODivider v-if="isPhone" />
                        <OLink color="normal" :href="proItem.link" target="_blank" :hover-underline="!isPhone">
                          {{proItem.link1 ? '项目地址1' : '项目地址'}}<OIcon><IconOutLink /></OIcon>
                        </OLink>
                        <ODivider v-if="isPhone && proItem.link1" />
                        <OLink v-if="proItem.link1" color="normal" :href="proItem.link1" target="_blank" hoverUnderline>
                          项目地址2<OIcon><IconOutLink /></OIcon>
                        </OLink>
                      </template>
                    </OCard>
                  </OCol>
                </ORow>
              </div>
            </template>
          </ContentWrapper>
          <!-- 贡献奖 -->
          <ContentWrapper v-if="tab.data?.contribution && tab.label !== '2025'" class="contribution-content">
            <p class="floor-title">
              <p v-for="item in tab.data?.contribution.title" :key="item">{{ item }}</p>
            </p>
            <!-- 个人奖 -->
            <template v-if="tab.data?.contribution.personal?.length">
              <div v-for="(per, p) in tab.data?.contribution.personal" :key="p" class="personal">
                <p v-if="per.title" class="subtitle">{{ per.title }}</p>
                <ORow :gap="flexGap" flex-wrap="wrap" class="personal-row">
                  <OCol v-for="perCard in per.list" :key="perCard.name" :flex="flexCol">
                    <OCard hoverable class="personal-card" :style="{ backgroundImage: `url(${isDark ? personalCardBgDark : personalCardBg})` }">
                      <p class="card-name">{{ perCard.name }}</p>
                      <p v-for="itemPost in perCard.post" :key="itemPost" class="card-detail card-post">
                        {{ itemPost }}
                      </p>
                      <img :src="perCard.img" alt="" class="card-avatar" />
                      <div class="card-hover" @click="personalDetail">
                        <p class="card-name">{{ perCard.name }}</p>
                        <OScroller show-type="always" class="card-detail-scroller">
                          <p v-for="itemDetail in perCard.detail" :key="itemDetail">
                            {{ itemDetail }}
                          </p>
                        </OScroller>
                      </div>
                    </OCard>
                  </OCol>
                </ORow>
              </div>
            </template>
            <!-- 团队奖 -->
            <template v-if="tab.data?.contribution.team">
              <p class="subtitle">{{ tab.data?.contribution.team.title }}</p>
              <ORow gap="0 32px" flex-wrap="wrap" class="team-row">
                <OCol v-for="t in tab.data?.contribution.team.list" :key="t.name" flex="0 1 100%">
                  <OCard class="team-card">
                    <p class="card-name">{{ t.name }}</p>
                    <div class="card-detail">
                      <p v-for="itemDetail in t.detail" :key="itemDetail">
                        {{ itemDetail }}
                      </p>
                    </div>
                    <template #footer>
                      <OLink color="normal" :href="t.link" target="_blank" hoverUnderline>
                        项目地址<OIcon><IconChevronRight /></OIcon>
                      </OLink>
                    </template>
                  </OCard>
                </OCol>
              </ORow>
            </template>
          </ContentWrapper>
          <!-- 提名者 -->
          <ContentWrapper v-if="tab.data?.nomination" class="nomination-content">
            <p class="subtitle">{{ tab.data?.nomination.title }}</p>
            <div class="nomination-row">
              <div
                v-for="n in tab.data?.nomination.list" :key="n.name"
                class="nomination-item"
              >
                {{ n.name }}
              </div>
            </div>
          </ContentWrapper>
          <!-- notice -->
           <ContentWrapper v-if="tab.data?.notice" class="notice-content">
             <div class="notice">{{ tab.data?.notice }}</div>
           </ContentWrapper>
        </OTabPane>
      </OTab>
    </ClientOnly>
  </div>
  <OLayer v-model:visible="certificateVisible" class="certificate-layer">
    <OFigure :src="certificateImg" class="certificate-img"></OFigure>
  </OLayer>
</template>

<style scoped lang="scss">
.honor-banner {
  background-color: transparent;
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.mo-banner {
  @include respond('<=pad_v') {
    padding: 24px 24px 20px;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
  }
  @include respond('phone') {
    .mo-title {
      @include display1;
    }
  }
}

:deep(.o-tab) {
  --tab-nav-padding: 16px 0 18px 0;
  .o-tab-head {
    background-color: var(--o-color-fill2);
    @include h4;
  }
  .o-tab-body {
    padding: 40px 0 72px;
  }
}

.content-wrapper + .content-wrapper {
  padding-top: 72px;
}
.content-wrapper {
  &.nomination-content {
    padding-top: 0;
  }
  &.notice-content {
    padding-top: 24px !important;
  }
}

.company-tips {
  padding-top: 24px;
  color: var(--o-color-info3);
  @include text1;
}

.certificate-img {
  height: 100%;
}

.o-col {
  min-width: 0;
}
.o-link {
  padding: 8px 0;
  --link-color: var(--o-color-info2);
  @include text1;
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
  }
  .o-icon {
    --icon-size: 24px;
    margin-left: 4px;
  }
}
.o-link + .o-link {
  margin-left: 16px;
}

.logo-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}
.item-logo {
  width: calc((100% - 128px) / 5);
  margin: 32px 32px 0 0;
  &:nth-child(5n) {
    margin-right: 0;
  }
  &:nth-child(-n + 5) {
    margin-top: 0;
  }
}
img {
  width: 100%;
  border-radius: 4px;
}

.o-card {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.new-card {
  width: 100%;
  height: 184px;
  --card-main-padding: 24px 32px;
}
.card-name {
  color: var(--o-color-info1);
  font-weight: 500;
  @include h3;
}

.floor-title {
  color: var(--o-color-info1);
  font-weight: 500;
  text-align: center;
  @include display3;
}
.subtitle {
  color: var(--o-color-info1);
  font-weight: 500;
  text-align: center;
  margin-top: 40px;
  @include h2;
}
.personal-row {
  margin-top: 16px;
}
.personal-card {
  height: 190px;
  position: relative;
  cursor: pointer;
  @include hover {
    .card-hover {
      opacity: 1;
    }
  }
}
.card-detail {
  color: var(--o-color-info3);
  margin-top: 8px;
  @include text1;
}
.card-post {
  width: 188px;
}
.card-post + .card-post {
  margin-top: 4px;
}
.card-avatar {
  width: 120px;
  position: absolute;
  right: 12px;
  bottom: 12px;
}
.card-hover {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: var(--o-color-fill2);
  padding: 24px;
  border-radius: 4px;
}
.card-detail-scroller {
  color: var(--o-color-info2);
  margin-top: 12px;
  height: 100px;
  @include text1;
}

.team-row {
  margin-top: 16px;
}
.team-card {
  height: 270px;
}
.project-card {
  height: 366px;
}
.project-card-2025 {
  height: 390px;
}
.project-row {
  margin-top: 16px;
}

.nomination-row {
  width: 100%;
  background-color: var(--o-color-fill2);
  padding: 24px 32px;
  border-radius: 4px;
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
}
.nomination-item {
  width: calc((100% - 96px) / 4);
  color: var(--o-color-info1);
  font-weight: 500;
  margin: 32px 32px 0 0;
  @include h3;
  @include text-truncate(1);
  &:nth-child(4n) {
    margin-right: 0;
  }
  &:nth-child(-n + 4) {
    margin-top: 0;
  }
}

.notice {
  color: var(--o-color-info3);
  @include text1;
}

@include respond('<=laptop') {
  :deep(.o-tab) {
    .o-tab-body {
      padding: 40px 0 56px;
    }
  }
  .content-wrapper + .content-wrapper {
    padding-top: 56px;
  }
  .logo-list {
    margin-top: 24px;
  }
  .subtitle {
    margin-top: 24px;
  }
  .item-logo {
    width: calc((100% - 96px) / 4);
    &:nth-child(n) {
      margin: 32px 32px 0 0;
    }
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:nth-child(-n + 4) {
      margin-top: 0;
    }
  }
  .new-card {
    height: 148px;
    --card-main-padding: 16px 24px;
  }
}
@include respond('<=pad') {
  :deep(.o-tab) {
    .o-tab-body {
      padding: 40px 0;
    }
  }
  .content-wrapper + .content-wrapper {
    padding-top: 40px;
  }
  .logo-list {
    margin-top: 16px;
  }
  .subtitle {
    margin-top: 16px;
  }
  .item-logo {
    width: calc((100% - 64px) / 3);
    &:nth-child(n) {
      margin: 32px 32px 0 0;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(-n + 3) {
      margin-top: 0;
    }
  }
  .new-card {
    height: 120px;
    --card-main-padding: 16px 24px;
  }
  .team-card,
  .project-card {
    height: 100%;
  }
  .card-hover {
    padding: 12px 16px;
  }
  .nomination-item {
    width: calc((100% - 64px) / 3);
    margin: 32px 32px 0 0;
    &:nth-child(n) {
      margin: 32px 32px 0 0;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
    &:nth-child(-n + 3) {
      margin-top: 0;
    }
  }
}
@include respond('<=pad_v') {
  :deep(.o-tab) {
    .o-tab-body {
      padding: 40px 0 32px;
    }
  }
  .content-wrapper + .content-wrapper {
    padding-top: 32px;
  }
  .logo-list {
    margin-top: 12px;
  }
  .subtitle {
    margin-top: 12px;
  }
  .item-logo {
    width: calc((100% - 32px) / 2);
    &:nth-child(n) {
      margin: 16px 16px 0 0;
    }
    &:nth-child(2n) {
      margin-right: 0;
    }
    &:nth-child(-n + 2) {
      margin-top: 0;
    }
  }
  .new-card {
    height: auto;
    --card-main-padding: 12px 16px;
  }
  .personal-card {
    height: 190px;
  }
  .team-card {
    height: auto;
  }
  .project-card {
    height: auto;
  }
  .project-card-2025 {
    height: auto;
  }
  .nomination-item {
    width: calc((100% - 12px) / 2);
    margin: 12px 12px 0 0;
    &:nth-child(n) {
      margin: 12px 12px 0 0;
    }
    &:nth-child(2n) {
      margin-right: 0;
      flex-basis: fit-content;
    }
    &:nth-child(-n + 2) {
      margin-top: 0;
    }
  }
  .o-link {
    &:last-child {
      padding-bottom: 0;
    }
  }
}
@include respond('phone') {
  .o-link {
    @include text2;
  }
  .project-card {
    .o-divider {
      --o-divider-gap: 0;
    }
    .o-link {
      width: 100%;
      :deep(.o-link-label) {
        width: 100%;
        justify-content: space-between;
      }
    }
    .o-link + .o-link {
      margin-left: 0;
    }
  }
}
</style>

<style lang="scss">
.certificate-layer {
  .o-layer-main {
    height: 80%;
  }
}
</style>
