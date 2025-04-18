<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from 'vue';
import { useI18n } from '@/i18n';

import useWindowResize from '@/components/hooks/useWindowResize';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import MoocContent from '@/views/mooc/MoocContent.vue';
import universityAnchor from './UniversityAnchor.vue';

import banner from '@/assets/banner/banner-university.png';
import universityIllustration from '@/assets/illustrations/university.png';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const universityData = computed(() => i18n.value.university);

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

// 处理导航锚点功能
const navRef: any = ref([]);
const activeIndex = ref(0);
const titleList: any = ref();
onMounted(() => {
  titleList.value = document.querySelectorAll('.floor-title');
  if (titleList.value.length) {
    navRef.value = [];
    Object.keys(titleList.value).forEach((item: any) => {
      navRef.value.push(titleList.value[item]);
    });
  }
});
const isShow = ref(false);
const handleScrollEvent = () => {
  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const activeList: Array<number> = [];
  isShow.value = scrollTop > 160;
  navRef.value.forEach((item: any, index: number) => {
    if (scrollTop + 100 > item.offsetTop) {
      activeList.push(index);
    }
  });
  if (!activeList.length) {
    activeList.push(0);
  }
  activeIndex.value = activeList[activeList.length - 1];
};
onMounted(() => {
  window.addEventListener('scroll', handleScrollEvent);
});
</script>

<template>
  <div class="university">
    <BannerLevel2
      :background-image="banner"
      :title="universityData.title"
      :illustration="universityIllustration"
    ></BannerLevel2>
    <div v-if="isMobile" class="university-tab-mobile">
      <el-tabs v-model.number="activeIndex" class="other-tabs">
        <el-tab-pane
          v-for="(item, index) in navRef"
          :key="item.id"
          :name="index"
        >
          <template #label>
            <div class="time-tabs">
              <a :href="'#' + item.id">{{ item.id }}</a>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <AppContent>
      <universityAnchor
        v-show="isShow"
        :nav-ref="navRef"
        :active-index="activeIndex"
      />
      <div class="university-technical">
        <h2
          :id="universityData.technicalGroup.title"
          class="university-technical-title floor-title"
        >
          {{ universityData.technicalGroup.title }}
        </h2>
        <div class="university-technical-description">
          <span>{{ universityData.technicalGroup.description.text }}</span>
        </div>
        <div class="university-technical-group">
          <OCard
            v-for="item in universityData.technicalGroup.groupList"
            :key="item.name"
            class="group-item"
          >
            <div class="group-item-head">
              <div class="head-logo">
                <img :src="item.logo" alt="" />
              </div>
              <div class="head-text">
                <h3 class="head-text-name">{{ item.name }}</h3>
                <div class="head-text-description">{{ item.description }}</div>
              </div>
            </div>
            <div
              v-for="itemContent in item.contentList"
              :key="itemContent.description"
              class="group-item-content"
            >
              <h4 class="content-title">{{ itemContent.title }}</h4>
              <p class="content-detail">
                <span
                  v-for="itemDeatil in itemContent.description.split('/n')"
                  :kry="itemDeatil"
                  >{{ itemDeatil }}</span
                >
              </p>
            </div>
          </OCard>
        </div>
      </div>
      <div class="university-activity">
        <h2
          :id="universityData.activityGame.title"
          class="university-activity-title floor-title"
        >
          {{ universityData.activityGame.title }}
        </h2>
        <div class="university-activity-list">
          <OCard
            v-for="item in universityData.activityGame.activityList"
            :key="item.title"
            class="activity-item"
            :class="item.id"
            :style="{ backgroundImage: `url(${item.bgImg})` }"
          >
            <div class="activity-item-left">
              <h3 class="activity-item-title">{{ item.title }}</h3>
              <div class="activity-item-detail">{{ item.detail }}</div>
              <p v-if="!isMobile" class="activity-item-link">
                <a
                  :href="item.linkHref"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ item.linkText }}
                </a>
              </p>
              <div v-else class="activity-item-footer">
                <a
                  :href="item.linkHref"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ item.linkText }}
                </a>
                <div v-if="item.bgInset" class="activity-item-inset">
                  <img :src="item.bgInset" alt="" />
                </div>
              </div>
            </div>
            <div v-if="item.bgInset && !isMobile" class="activity-item-right">
              <img :src="item.bgInset" alt="" />
            </div>
          </OCard>
        </div>
      </div>
      <div class="university-contribution">
        <h2
          :id="universityData.universityContribution.title"
          class="university-contribution-title floor-title"
        >
          {{ universityData.universityContribution.title }}
        </h2>
        <div class="university-contribution-list1">
          <OCard
            v-for="item in universityData.universityContribution
              .universityContentList"
            :key="item.title"
            class="university-item"
          >
            <div class="item-head">
              <div v-if="false" class="item-logo">
                <img :src="item.logo" alt="" />
              </div>
              <h4 class="item-name">{{ item.name }}</h4>
              <div class="item-detail">{{ item.detail }}</div>
            </div>
            <div class="item-footer">
              <div class="item-tag">
                <span class="tag-title">{{ item.contributionName }}</span>
                <p class="tag-box">
                  <span
                    v-for="itemTag in item.contributionTagList"
                    :key="itemTag"
                    class="tag-name"
                    >{{ itemTag }}</span
                  >
                </p>
              </div>
              <p class="item-link">
                <a
                  v-if="item.contributionDetail"
                  :href="item.contributionDetailLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{{ item.contributionDetail }}</span>
                  <OIcon class="right-icon"><IconChevronRight /></OIcon>
                </a>
                <a
                  v-if="item.officialWebsite"
                  :href="item.officialWebsiteLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{{ item.officialWebsite }}</span>
                  <OIcon class="right-icon"><IconChevronRight /></OIcon>
                </a>
              </p>
            </div>
          </OCard>
        </div>
        <div class="university-contribution-list2">
          <OCard
            v-for="item in universityData.universityContribution.universityList"
            :key="item.title"
            class="list2-university-item"
          >
            <div v-if="false" class="list2-item-logo">
              <img :src="item.logo" alt="" />
            </div>
            <h4 class="list2-item-name">{{ item.name }}</h4>
          </OCard>
          <OCard class="list2-university-more">
            {{ universityData.universityContribution.more }}
          </OCard>
        </div>
      </div>
      <div class="university-mooc">
        <h2
          :id="universityData.universityMooc"
          class="university-mooc-title floor-title"
        >
          {{ universityData.universityMooc }}
        </h2>
        <MoocContent></MoocContent>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.university {
  h3,
  h4 {
    font-weight: 500;
  }
  .university-tab-mobile {
    width: 100%;
    height: 34px;
    padding: 0 16px;
    background-color: var(--e-color-bg2);
    position: sticky;
    top: 48px;
    z-index: 9;
    .el-tabs {
      --el-tabs-header-height: 34px;
      :deep(.el-tabs__nav-wrap) {
        &::after {
          background-color: transparent;
        }
        &.is-scrollable {
          padding: 0;
        }
        .el-tabs__nav-scroll {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        :deep(.is-scrollable) {
          .el-tabs__nav-scroll {
            display: block;
          }
        }
        .el-tabs__nav {
          display: flex;
          margin: 0 auto;
        }
        .el-tabs__item {
          padding: 0 8px;
          a {
            color: var(--e-color-text1);
          }
          &.is-active {
            a {
              color: var(--e-color-brand1);
            }
          }
        }
        .el-tabs__nav-next,
        .el-tabs__nav-prev {
          display: none;
        }
      }
    }
  }
  .university-technical {
    .university-technical-title {
      text-align: center;
      font-weight: 500;
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      @media (max-width: 767px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
    }
    .university-technical-description {
      margin-top: var(--e-spacing-h4);
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      color: var(--e-color-text4);
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h5);
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
    }
    .university-technical-group {
      margin-top: var(--e-spacing-h4);
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h5);
      }
      .group-item {
        @media (min-width: 767px) {
          &:hover {
            background-color: var(--e-color-fill2_hover);
            box-shadow: var(--e-shadow-l2_hover);
          }
        }

        & ~ .group-item {
          margin-top: var(--e-spacing-h4);
          @media (max-width: 767px) {
            margin-top: var(--e-spacing-h5);
          }
        }
        :deep(.el-card__body) {
          padding: 40px;
          @media (max-width: 767px) {
            padding: 16px;
          }
        }
        .group-item-head {
          display: flex;
          .head-logo {
            margin-right: var(--e-spacing-h4);
            @media (max-width: 767px) {
              margin-right: var(--e-spacing-h6);
            }
            img {
              width: 62px;
              @media (max-width: 767px) {
                width: 50px;
              }
            }
          }
          .head-text {
            .head-text-name {
              font-size: var(--e-font-size-h5);
              line-height: var(--e-line-height-h5);
              color: var(--e-color-text1);
              @media (max-width: 767px) {
                font-size: var(--e-font-size-h8);
                line-height: var(--e-line-height-h8);
              }
            }
            .head-text-description {
              margin-top: 8px;
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              color: var(--e-color-text4);
              @media (max-width: 767px) {
                font-size: var(--e-font-size-tip);
                line-height: var(--e-line-height-tip);
              }
            }
          }
        }
        .group-item-content {
          margin-top: var(--e-spacing-h4);
          @media (max-width: 767px) {
            margin-top: var(--e-spacing-h5);
          }

          .content-title {
            font-size: var(--e-font-size-h8);
            line-height: var(--e-line-height-h8);
            color: var(--e-color-brand1);
            position: relative;
            padding-left: 14px;
            @media (max-width: 767px) {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              padding-left: 16px;
            }
            &::before {
              content: '';
              display: inline-block;
              width: 6px;
              height: 6px;
              background-color: var(--e-color-brand1);
              border-radius: 50%;
              position: absolute;
              top: 50%;
              left: 0;
              transform: translateY(-50%);
              @media (max-width: 767px) {
                width: 8px;
                height: 8px;
              }
            }
          }
          .content-detail {
            margin-top: 8px;
            padding-left: 14px;
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text4);
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            @media (max-width: 767px) {
              gap: 12px;
              padding-left: 0;
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
            }
          }
        }
      }
    }
  }
  .university-activity {
    margin-top: var(--e-spacing-h1);
    @media (max-width: 767px) {
      margin-top: var(--e-spacing-h2);
    }
    .university-activity-title {
      text-align: center;
      font-weight: 500;
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      @media (max-width: 767px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
    }
    .university-activity-list {
      margin-top: 40px;
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h5);
      }
      .activity-item {
        background-size: cover;
        background-repeat: no-repeat;
        @media (min-width: 767px) {
          &:hover {
            background-color: var(--e-color-fill2_hover);
            box-shadow: var(--e-shadow-l2_hover);
          }
        }

        &:nth-of-type(1) {
          @media (max-width: 767px) {
            background-size: 100%;
            background-color: var(--e-color-bg2);
            background-position: right bottom;
          }
        }

        & ~ .activity-item {
          margin-top: var(--e-spacing-h4);
          @media (max-width: 767px) {
            margin-top: var(--e-spacing-h5);
          }
        }
        :deep(.el-card__body) {
          display: flex;
          gap: 120px;
          padding: 40px;
          @media (max-width: 767px) {
            display: block;
            padding: 16px;
          }
        }
        .activity-item-left {
          max-width: 910px;
          .activity-item-title {
            font-size: var(--e-font-size-h5);
            line-height: var(--e-line-height-h5);
            color: var(--e-color-text1);
            @media (max-width: 767px) {
              font-size: var(--e-font-size-h8);
              line-height: var(--e-line-height-h8);
            }
          }
          .activity-item-detail {
            margin-top: var(--e-spacing-h8);
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
            color: var(--e-color-text4);
            min-height: 66px;
          }
          .activity-item-link {
            margin-top: var(--e-spacing-h4);
            font-size: var(--e-font-size-h8);
            line-height: var(--e-line-height-h8);
            position: relative;
            padding-left: 14px;
            &::before {
              content: '';
              display: block;
              width: 6px;
              height: 6px;
              background-color: var(--e-color-brand1);
              border-radius: 50%;
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .activity-item-footer {
            margin-top: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 76px;
            position: relative;
            padding-left: 16px;
            a {
              display: block;
              &::before {
                content: '';
                display: inline-block;
                width: 6px;
                height: 6px;
                background-color: var(--e-color-brand1);
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                @media (max-width: 767px) {
                  width: 6px;
                  height: 6px;
                }
              }
            }
            .activity-item-inset {
              img {
                height: 76px;
              }
            }
          }
        }
      }
      .ccf {
        background-size: contain;
        background-position: right bottom;
        background-repeat: no-repeat;
        @media (max-width: 767px) {
          background-size: auto 76px;
        }
      }
    }
  }
  .university-contribution {
    margin-top: var(--e-spacing-h1);
    @media (max-width: 767px) {
      margin-top: var(--e-spacing-h2);
    }
    .university-contribution-title {
      text-align: center;
      font-weight: 500;
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      @media (max-width: 767px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
      }
    }
    .university-contribution-list1 {
      margin-top: var(--e-spacing-h2);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--e-spacing-h2);
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h5);
        grid-template-columns: repeat(1, 1fr);
        gap: var(--e-spacing-h4);
      }
      .university-item {
        @media (min-width: 767px) {
          &:hover {
            background-color: var(--e-color-fill2_hover);
            box-shadow: var(--e-shadow-l2_hover);
          }
        }
        :deep(.el-card__body) {
          padding: 32px 32px 24px;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          @media (max-width: 767px) {
            padding: 16px;
          }
        }
        .item-logo {
          img {
            height: 64px;
          }
        }
        .item-name {
          font-size: var(--e-font-size-h5);
          line-height: var(--e-line-height-h5);
          color: var(--e-color-text1);
          @media (max-width: 767px) {
            font-size: var(--e-font-size-h8);
            line-height: var(--e-line-height-h8);
          }
        }
        .item-detail {
          margin-top: var(--e-spacing-h5);
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
          color: var(--e-color-text4);
          @media (max-width: 767px) {
            margin-top: var(--e-spacing-h8);
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
        .item-tag {
          margin-top: var(--e-spacing-h5);
          display: flex;
          align-items: center;
          @media (max-width: 767px) {
            display: block;
          }
          span {
            display: inline-block;
            @media (max-width: 767px) {
              display: block;
            }
            &.tag-title {
              font-size: var(--e-font-size-h8);
              line-height: var(--e-line-height-h8);
              color: var(--e-color-text1);
              margin-right: var(--e-spacing-h5);
              @media (max-width: 767px) {
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
              }
            }
            &.tag-name {
              margin-right: var(--e-spacing-h8);
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-h8);
              color: var(--e-color-text4);
              padding: 0 12px;
              background-color: var(--e-color-bg-secondary);
              @media (max-width: 767px) {
                display: inline-block;
                padding: 0 8px;
                font-size: var(--e-font-size-tip);
              }
            }
          }
          .tag-box {
            @media (max-width: 767px) {
              margin-top: 8px;
            }
          }
        }
        .item-link {
          margin-top: var(--e-spacing-h4);
          display: flex;
          align-items: center;
          @media (max-width: 767px) {
            margin-top: var(--e-spacing-h5);
          }
          a {
            margin-right: var(--e-spacing-h5);
            font-size: var(--e-font-size-h8);
            line-height: var(--e-line-height-h8);
            color: var(--e-color-text1);
            display: flex;
            align-items: center;
            @media (max-width: 767px) {
              margin-right: var(--e-spacing-h6);
              font-size: var(--e-font-size-tip);
              line-height: var(--e-line-height-tip);
            }
            &:hover {
              color: var(--e-color-brand1);
            }
            .o-icon {
              margin-left: 8px;
            }
          }
        }
      }
    }
    .university-contribution-list2 {
      margin-top: var(--e-spacing-h2);
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--e-spacing-h2);
      @media (max-width: 767px) {
        margin-top: var(--e-spacing-h5);
        grid-template-columns: repeat(2, 1fr);
        gap: var(--e-spacing-h5);
      }
      .list2-university-item {
        @media (min-width: 767px) {
          &:hover {
            background-color: var(--e-color-fill2_hover);
            box-shadow: var(--e-shadow-l2_hover);
          }
        }
        :deep(.el-card__body) {
          padding: 32px;
          @media (max-width: 767px) {
            padding: 8px;
          }
        }
        .list2-item-logo {
          img {
            height: 64px;
            @media (max-width: 767px) {
              padding: 32px;
            }
          }
        }
        .list2-item-name {
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
          color: var(--e-color-text1);
          @media (max-width: 767px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
      }
      .list2-university-more {
        @media (min-width: 767px) {
          &:hover {
            background-color: var(--e-color-fill2_hover);
            box-shadow: var(--e-shadow-l2_hover);
          }
        }
        :deep(.el-card__body) {
          padding: 32px 32px 24px;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          @media (max-width: 767px) {
            padding: 8px;
            justify-content: center;
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
        @media (max-width: 767px) {
          grid-column: 1/3;
        }
      }
    }
  }
  .university-mooc {
    margin-top: var(--e-spacing-h1);
    @media (max-width: 767px) {
      margin-top: var(--e-spacing-h2);
    }
    .university-mooc-title {
      text-align: center;
      font-weight: 500;
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
      color: var(--e-color-text1);
      margin-bottom: var(--e-spacing-h2);
      @media (max-width: 767px) {
        font-size: var(--e-font-size-h8);
        line-height: var(--e-line-height-h8);
        margin-bottom: var(--e-spacing-h5);
      }
    }
  }
}
</style>
