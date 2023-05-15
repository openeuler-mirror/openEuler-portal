<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import AppContext from '@/components/AppContent.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import SummitBanner from '@/assets/category/summit/summit2022-changsha/summit-banner.png';
import SummitBannerMo from '@/assets/category/summit/summit2022-changsha/summit-banner_mo.png';
import cooperation from '@/assets/category/summit/summit2022-changsha/cooperation.png';
import cooperationDark from '@/assets/category/summit/summit2022-changsha/cooperation-dark.png';
import schedule from '@/assets/category/summit/summit2022-changsha/schedule.png';
import scheduleDark from '@/assets/category/summit/summit2022-changsha/schedule-dark.png';
import IconTime from '~icons/app/icon-time.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const screenWidth = useWindowResize();
const commonStore = useCommon();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));
const cooperationImg = computed(() =>
  commonStore.theme === 'dark' ? cooperationDark : cooperation
);
const scheduleImg = computed(() =>
  commonStore.theme === 'dark' ? scheduleDark : schedule
);

const location: any = 'top';
const scheduleList = [
  {
    time: '10:00-10:20',
    agenda: '领导致辞',
  },
  {
    time: '10:20-10:30',
    agenda: '湖南欧拉生态创新中心成立签约暨揭牌仪式',
  },
  {
    time: '10:30-10:45',
    agenda: '中国开源创新的新境界',
    guests: '王怀民',
    title: '中国科学院院士',
  },
  {
    time: '10:45-10:55',
    agenda: '欧拉志高远，开源汇智创未来',
    guests: '江大勇',
    title: '欧拉开源社区理事长',
  },
  {
    time: '10:55-11:05',
    agenda: '欧拉走进行业，走向世界',
    guests: '熊伟',
    title: '欧拉开源社区技术委员会委员',
  },
  {
    time: '11:05-11:20',
    agenda: '携手欧拉 ，共推操作系统产业新发展',
    guests: '刘文清',
    title: '麒麟信安总裁',
  },
  {
    time: '11:20-11:25',
    agenda: '意向签约仪式',
  },
  {
    time: '11:25-11:35',
    agenda: '欧拉行业用户实践分享',
  },
  {
    time: '11:35-11:40',
    agenda: '湖南欧拉技术创新与产业发展联盟发起仪式',
  },
  {
    time: '11:40-11:50',
    agenda: '欧拉开源治理工程能力分享',
    guests: '高琨',
    title: '华为2012实验室专家',
  },
];
</script>

<template>
  <div class="banner-box">
    <img :src="SummitBanner" class="banner" />
    <img :src="SummitBannerMo" class="banner banner-mo" />
    <div class="btn-warper">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://wx.vzan.com/live/page/79AC53DBFC5436AC4716DE0D9AA85D5B?topicid=1224869310&shauid=LhgDaMCuY3kvTXNHvA7Ndg**&vprid=0&sharetstamp=1663939231852"
      >
        <OButton animation class="home-banner-btn">
          观看直播
          <template #suffixIcon
            ><OIcon><IconArrowRight /></OIcon
          ></template>
        </OButton>
      </a>
    </div>
  </div>
  <AppContext :mobile-top="40">
    <div class="middle">
      <div class="middle-top">
        <img :src="scheduleImg" class="headline" />
        <div v-show="!isMobile" class="middle-top-context">
          <OTable :data="scheduleList">
            <el-table-column width="200">
              <template #default="scope">
                <div class="active-time">
                  <IconTime class="clock" />
                  <p>{{ scope.row.time }}</p>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <p class="agenda">{{ scope.row.agenda }}</p>
              </template>
            </el-table-column>
            <el-table-column width="200">
              <template #default="scope">
                <p class="guests">{{ scope.row.guests }}</p>
              </template>
            </el-table-column>
            <el-table-column width="300">
              <template #default="scope">
                <p class="title">{{ scope.row.title }}</p>
              </template>
            </el-table-column>
          </OTable>
        </div>
        <div v-show="isMobile" class="mo-context">
          <el-timeline>
            <el-timeline-item
              v-for="item in scheduleList"
              :key="item.time"
              :timestamp="item.time"
              :placement="location"
            >
              <div class="mo-context-item">
                <p class="agenda">{{ item.agenda }}</p>
                <div class="context-box">
                  <p class="guests">{{ item.guests }}</p>
                  <p class="title">{{ item.title }}</p>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="middle-bottom">
        <img :src="cooperationImg" class="headline" />
        <div class="middle-bottom-context">
          <p class="title">指导单位</p>
          <p class="details">
            中共湖南省委网络安全和信息化委员会办公室、湖南省工业和信息化厅、湖南省人民政府国有资产监督管理委员会、湖南湘江新区管委会、开放原子开源基金会
          </p>
          <p class="title">支持单位</p>
          <p class="details">
            中国软件行业协会、中国计算机学会开源发展委员会、openEuler社区
          </p>
          <p class="title">主办单位</p>
          <p class="details">长沙市工业和信息化局、长沙信息产业园管理委员会</p>
          <p class="title">承办单位</p>
          <p class="details">湖南麒麟信安科技股份有限公司、华为技术有限公司</p>
          <p class="title">协办单位</p>
          <p class="details last-details">
            湖南省软件行业协会、湖南省鲲鹏生态创新中心、长沙市移动互联网及应用软件产业链推进办公室、长沙市先进计算及信息安全产业链推进办公室
          </p>
        </div>
      </div>
    </div>
  </AppContext>
</template>

<style scoped lang="scss">
.headline {
  height: 80px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: var(--o-spacing-h2);
  @media (max-width: 768px) {
    height: 38px;
    margin-top: var(--o-spacing-h5);
  }
}
.banner-box {
  display: flex;
  justify-content: center;
  position: relative;
  .banner {
    width: 100%;
    text-align: center;
    object-fit: cover;
    height: 380px;
    @media (max-width: 1550px) {
      height: 300px;
    }
    @media (max-width: 1080px) {
      height: 200px;
    }
    @media (max-width: 768px) {
      display: none;
      height: 126px;
    }
  }
  .btn-warper {
    position: absolute;
    top: 0;
    left: 50%;
    padding: 0 var(--o-spacing-h2);
    transform: translateX(-50%);
    max-width: 1504px;
    width: 100%;
    height: 100%;
    .home-banner-btn {
      position: absolute;
      bottom: var(--o-spacing-h2);
      border-color: #fff;
      color: #fff;
    }
    @media (max-width: 1440px) {
      padding: 0 var(--o-spacing-h4);
    }
    @media (max-width: 1080px) {
      padding: 0 var(--o-spacing-h5);
      .home-banner-btn {
        bottom: var(--o-spacing-h5);
        padding: 4px 12px 4px 16px;
        line-height: 22px;
        font-size: 14px;
        .o-icon {
          font-size: 14px;
        }
      }
    }
    @media (max-width: 768px) {
      .home-banner-btn {
        bottom: var(--o-spacing-h8);
      }
    }
    @media screen and (max-width: 768px) {
    }
  }
  // .o-botton {
  //   position: absolute;
  // }
  .banner-mo {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
    }
  }
}
.dark {
  .banner {
    filter: brightness(0.8) grayscale(0.2) contrast(1.2);
  }
}
.middle {
  &-top {
    margin: 0 auto;
    background-color: var(--o-color-bg2);
    margin-bottom: var(--o-spacing-h2);
    padding-bottom: var(--o-spacing-h1);
    box-shadow: var(--o-shadow-l1);
    @media (max-width: 768px) {
      padding-bottom: var(--o-spacing-h5);
    }
    &-context {
      margin-top: var(--o-spacing-h2);
      padding: 0px 80px;
      @media (max-width: 1080px) {
        padding: 0px var(--o-spacing-h3);
      }
      :deep(.el-table tbody tr:hover > td) {
        background-color: var(--o-color-bg2) !important;
      }
      :deep(.el-table__inner-wrapper::before) {
        width: 0px;
        height: 0px;
      }
      :deep(.el-table__header-wrapper) {
        display: none;
      }
      :deep(.el-table--fit) {
        box-shadow: none;
      }
      .active-time {
        display: flex;
        align-items: center;
        .clock {
          height: 24px;
          width: 24px;
          margin-right: var(--o-spacing-h8);
        }
        p {
          font-weight: normal;
          color: var(--o-color-text4);
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
      }
      .agenda {
        font-size: var(--o-font-size-h6);
        font-weight: normal;
        color: var(--o-color-text1);
        line-height: var(--o-line-height-h6);
      }
      .guests {
        font-size: var(--o-font-size-h6);
        font-weight: normal;
        color: var(--o-color-text1);
        line-height: var(--o-line-height-h6);
      }
      .title {
        font-size: var(--o-font-size-h8);
        font-weight: normal;
        color: var(--o-color-text4);
        line-height: var(--o-line-height-h8);
      }
    }
    .mo-context {
      margin-top: var(--o-spacing-h6);
      padding: 0 var(--o-spacing-h5);
      :deep(.el-timeline-item__timestamp) {
        color: var(--o-color-brand1);
        font-size: var(--o-font-size-tip);
        font-weight: 400;
        line-height: var(--o-line-height-tip);
      }
      :deep(.el-timeline-item__node) {
        background-color: var(--o-color-brand1);
      }
      :deep(.el-timeline-item__tail) {
        border-left: 2px dashed var(--o-color-brand1);
      }
      :deep(.el-timeline-item__wrapper) {
        padding-left: var(--o-spacing-h5);
      }
      :deep(.el-timeline-item__timestamp) {
        margin-bottom: 0px;
      }
      &-item {
        .agenda {
          padding-top: var(--o-spacing-h8);
          font-size: var(--o-font-size-tip);
          font-weight: 400;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-tip);
        }
        .context-box {
          margin-top: var(--o-spacing-h8);
          display: flex;
          font-size: var(--o-font-size-tip);
          font-weight: 400;
          color: var(--o-color-text4);
          line-height: var(--o-line-height-tip);
          .guests {
            width: 100px;
          }
        }
      }
    }
  }
  &-bottom {
    margin: 0 auto;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    &-context {
      padding: 0px 80px;
      margin-top: var(--o-spacing-h2);
      padding-bottom: var(--o-spacing-h2);
      @media (max-width: 1080px) {
        padding: 0px var(--o-spacing-h3);
      }
      @media (max-width: 768px) {
        padding: 0px var(--o-spacing-h5);
        margin-top: var(--o-spacing-h6);
      }
      .title {
        color: var(--o-color-text1);
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        margin-bottom: var(--o-spacing-h4);
        font-weight: 500;
        @media (max-width: 768px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          margin-bottom: var(--o-spacing-h8);
        }
      }
      .details {
        color: var(--o-color-text4);
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        margin-bottom: var(--o-spacing-h3);
        font-weight: normal;
        @media (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          margin-bottom: var(--o-spacing-h6);
        }
      }
      .last-details {
        margin-bottom: 0px;
        padding-bottom: 0px;
        @media (max-width: 768px) {
          padding-bottom: var(--o-spacing-h5);
        }
      }
    }
  }
}
</style>
