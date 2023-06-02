<script lang="ts" setup>
import AppContent from '@/components/AppContent.vue';

import planLink from '@/data/salon/plan';

import { ref } from 'vue';
import IconRight from '~icons/app/icon-arrow-right.svg';

const editionList = ref([
  {
    time: '3.30',
    content: '23.03',
  },
  {
    time: '6.30',
    content: '22.03 LTS SP2',
  },
  {
    time: '9.30',
    content: '23.09',
  },
  {
    time: '12.30',
    content: '22.03 LTS SP3',
  },
]);
</script>
<template>
  <AppContent class="salon-content">
    <div class="year-plan">
      <div class="year-plan-main">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
        <div class="line line4"></div>
        <div
          v-for="(value, key) in planLink"
          :key="value"
          class="activebox"
          :class="planLink[key].id"
        >
          <!-- 社区峰会、成员单位会议、开源项目、开发者活动 -->
          <div v-if="planLink[key].id !== 'college'" class="title-box">
            <p>{{ planLink[key].title }}</p>
          </div>
          <div v-if="planLink[key].id !== 'college'" class="content-box">
            <div
              v-for="item in planLink[key]['events']"
              :key="item"
              :class="['month' + item.month]"
              class="layout"
            >
              <!-- 社区峰会、成员单位会议、开源项目 -->
              <div v-if="planLink[key].id !== 'developer'" class="event-box">
                <h5>{{ item.month }}月</h5>
                <div v-for="it in item.actives" :key="it" class="event-item">
                  <li></li>
                  <a
                    v-if="it.hasOwnProperty('activelink')"
                    :key="it.activelink.url"
                    :href="it.activelink.url"
                    :class="it.activelink.className"
                    :target="it.activelink.target || '_blank'"
                    >{{ it.activeName }}</a
                  >
                  <p v-if="!it.hasOwnProperty('activelink')">
                    {{ it.activeName }}
                  </p>
                </div>
              </div>
              <!-- 开发者活动  需要添加tab-->
              <div v-if="planLink[key].id === 'developer'" class="event-box">
                <h5>{{ item.month }}月</h5>
                <div
                  v-for="devel in item.actives"
                  :key="devel.activeType"
                  class="develper"
                >
                  <span class="tab">{{ devel.activeType }}</span>
                  <div
                    v-for="it in devel.activeEvent"
                    :key="it"
                    class="event-item"
                  >
                    <li></li>
                    <a
                      v-if="it.hasOwnProperty('activelink')"
                      :key="it.activelink.url"
                      :href="it.activelink.url"
                      :class="it.activelink.className"
                      :target="it.activelink.target || '_blank'"
                      >{{ it.activeName }}</a
                    >
                    <p v-if="!it.hasOwnProperty('activelink')">
                      {{ it.activeName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="planLink[key].id === 'opensoucrce'" class="otherlink">
            <p>
              对上述大会有任何疑问或建议，请联系：<a
                href="mailto:marketing@openeuler.org"
                >marketing@openeuler.org</a
              >
            </p>
          </div>
          <!-- 高校活动 -->
          <div v-if="planLink[key].id === 'college'" class="title-box">
            <p>{{ planLink[key].title }}</p>
          </div>
          <div v-if="planLink[key].id === 'college'" class="collegee">
            <div
              v-for="colact in planLink['college'].actives"
              :key="colact"
              :style="{
                width:
                  (colact.endTime - (colact.startTime - 1)) *
                    (colact.endTime === 12 ? 108.5 : 104) +
                  'px',
                marginLeft: (colact.startTime - 1) * 104 + 'px',
              }"
              class="collegee-item"
            >
              <a
                v-if="colact.hasOwnProperty('activelink')"
                :key="colact.activelink.url"
                :href="colact.activelink.url"
                :class="colact.activelink.className"
                :target="colact.activelink.target || '_blank'"
                >{{ colact.activeName }}</a
              >
              <p v-if="!colact.hasOwnProperty('activelink')">
                {{ colact.activeName }}
              </p>
            </div>
            <div class="otherlink">
              <p>
                如果您想组织社区活动，参与议题分享，请联系：<a
                  href="mailto:events@openeuler.sh"
                  >events@openeuler.sh</a
                >
              </p>
            </div>
          </div>
        </div>
        <!-- 版本发布计划 -->
        <div class="activebox edition">
          <div class="title-box">版本发布计划</div>
          <div class="edition-box">
            <div
              v-for="(edit, index) in editionList"
              :key="edit.content"
              :class="['edit' + index]"
              class="layout"
            >
              <div class="edition-item">
                <p class="edition-time">{{ edit.time }}</p>
                <p class="edition-content">{{ edit.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- openEuler Meetup 申请攻略 -->
      <OCard class="meetup-form">
        <div class="info">
          <h3>openEuler Meetup 申请攻略</h3>
          <p class="desc">
            无论是企业、SIG 组、用户组、科研院所或其他组织，我们都欢迎与
            openEuler
            一起组织开发者活动，共同探讨前沿技术和开源发展趋势，分享创新成果和实践经验，与
            openEuler 社区共同成长！
          </p>
        </div>
        <div class="meetup-form-btn">
          <a href="/zh/interaction/event-list/collect/">
            <OButton type="outline" animation size="mini">
              查看攻略
              <template #suffixIcon>
                <OIcon class="right-icon"><IconRight /></OIcon>
              </template>
            </OButton>
          </a>
        </div>
      </OCard>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
$lineSpace: 315px;
$eventboxWidth: 127px;
$contentWidth: 1302px;
$titleboxWidth: 98px;
$contenML: var(--o-spacing-h5);
$gridGap: var(--o-spacing-h6);
$lineLeft: calc($titleboxWidth + $contenML);

.meetup-form {
  margin-top: 40px;
  :deep(.el-card__body) {
    padding: 8px 24px;
    display: flex;
    justify-content: space-between;
    @media (max-width: 1100px) {
      display: block;
      padding: 16px;
    }
  }
  .info {
    padding-left: 142px;
    height: 130px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &::before {
      background: url(@/assets/category/salon/meetup-img.png) no-repeat
        center/cover;
      height: 100%;
      width: 130px;
      content: '';
      display: block;
      position: absolute;
      left: 0;
      top: 0;
      @media (max-width: 1100px) {
        display: none;
      }
    }
    @media (max-width: 1100px) {
      padding: 0;
      height: auto;
    }
    h3 {
      font-size: 18px;
      font-weight: 500;
      color: var(--o-color-text1);
      line-height: 26px;
      margin-bottom: 12px;
    }
    .desc {
      font-size: var(--o-font-size-text);
      font-weight: 400;
      color: var(--o-color-text3);
      line-height: var(--o-line-height-text);
    }
  }
  .meetup-form-btn {
    width: 300px;
    background: url(@/assets/category/salon/meetup-img1.png) no-repeat
      center/contain;
    display: grid;
    place-items: center;
    @media (max-width: 1100px) {
      width: auto;
      background: none;
      display: block;
      margin-top: 12px;
    }
  }
}
.dark {
  .year-plan {
    .year-plan-main {
      .line {
        background-image: linear-gradient(
          to bottom,
          #555555 0%,
          #555555 50%,
          transparent 50%
        );
      }
      .community {
        .content-box {
          background-image: linear-gradient(to right, #181f31, #273b70);
          .event-box {
            h5 {
              color: #7ba9ea;
            }
            .event-item {
              li {
                color: #7ba9ea;
              }
            }
          }
        }
      }
      .units {
        .content-box {
          background-image: linear-gradient(to right, #282114, #543c12);
          .event-box {
            h5 {
              color: #feaa11;
            }
            .event-item {
              li {
                color: #feaa11;
              }
            }
          }
        }
      }
      .opensoucrce {
        .content-box {
          background-image: linear-gradient(to right, #101a19, #0d2a26);
          .event-box {
            h5 {
              color: #00685a;
            }
            .event-item {
              li {
                color: #00685a;
              }
            }
          }
        }
      }
      .developer {
        .content-box {
          background-image: linear-gradient(to right, #1d1528, #301b4e);
          .event-box {
            h5 {
              color: #7d32ea;
            }
            .event-item {
              li {
                color: #7d32ea;
              }
            }
          }
        }
      }
      .collegee {
        .collegee-item {
          background-image: linear-gradient(to right, #121b24, #104370);
        }
      }
    }
  }
}
.year-plan {
  color: var(--o-color-text1);
  overflow: auto;
  .year-plan-main {
    position: relative;
    min-width: 1416px;
    min-height: 500px;
    display: grid;
    grid-row-gap: $gridGap;
    .line {
      height: calc(100% - 65px);
      width: 1px;
      background-size: 20px 10px;
      background-repeat: repeat-y;
      position: absolute;
      z-index: 1;
      background-image: linear-gradient(
        to bottom,
        #cccccc 0%,
        #cccccc 50%,
        transparent 50%
      );
    }
    @for $i from 1 through 4 {
      $a: $i + px;
      .line#{$i} {
        left: calc(calc($lineLeft + calc($lineSpace * $i)) - $a);
      }
    }
    .title-box {
      background-color: var(--o-color-kleinblue5);
      color: var(--o-color-white);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      min-width: $titleboxWidth;
      max-width: $titleboxWidth;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 var(--o-spacing-h6);
      p {
        word-spacing: 100vw;
      }
    }
    .content-box {
      margin-left: $contenML;
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .collegee {
      margin-left: $contenML;
      div:last-of-type {
        margin-bottom: 0;
      }
      .collegee-item {
        height: 34px;
        font-size: var(--o-font-size-tip);
        color: var(--o-color-text1);
        text-align: center;
        background-image: linear-gradient(
          90deg,
          rgba(235, 242, 251, 0.7) 0%,
          rgba(202, 226, 250, 0.7) 100%
        );
        margin-bottom: var(--o-spacing-h10);
        p,
        a {
          line-height: 34px;
          color: var(--o-color-text1);
        }
        a:hover {
          color: var(--o-color-brand1);
        }
        p {
          cursor: default;
        }
        .internship {
          margin-left: 40px;
        }
      }
    }
    .layout {
      width: 0px;
      height: auto;
      position: relative;
    }
    .event-box {
      position: relative;
      padding: var(--o-spacing-h6);
      min-width: $eventboxWidth;
      h5 {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-text);
        font-weight: 500;
        cursor: default;
      }
      .event-item {
        display: flex;
        align-items: flex-start;

        li {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          width: 4px;
          margin-right: 4px;
        }
        a,
        p {
          font-size: var(--o-font-size-tip);
          color: var(--o-color-text1);
          position: relative;
          line-height: var(--o-line-height-tip);
        }
        p {
          cursor: default;
        }
        a {
          &:hover {
            color: var(--o-color-brand1);
          }
        }
      }
    }
    .develper {
      .tab {
        display: flex;
        width: fit-content;
        align-items: center;
        border: 1px solid #a358ff;
        height: 22px;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        text-align: center;
        color: #a358ff;
        padding: 0 4px;
        margin: 4px 0;
        cursor: default;
      }
    }
    .activebox {
      min-width: 1416px;
      display: flex;
      flex-direction: row;
      position: relative;
      .otherlink {
        position: absolute;
        bottom: -25px;
        right: 0;
        z-index: 3;
        p,
        a {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      .content-box {
        background-image: linear-gradient(to right, #eff3fb, #dfeafb);
        .event-box {
          h5 {
            color: var(--o-color-kleinblue5);
          }
          .event-item {
            li {
              color: var(--o-color-kleinblue5);
            }
          }
        }
      }
    }
    .community {
      .content-box {
        background-image: linear-gradient(
          90deg,
          rgba(247, 241, 218, 0.3) 0%,
          rgba(251, 234, 175, 0.4) 100%
        );
        .event-box {
          h5 {
            color: var(--o-color-kleinblue5);
          }
          .event-item {
            li {
              color: var(--o-color-kleinblue5);
            }
          }
        }
      }
    }
    .units {
      .content-box {
        background-image: linear-gradient(
          90deg,
          rgba(232, 242, 255, 0.5) 0%,
          rgba(192, 218, 254, 0.43) 100%
        );
        .event-box {
          h5 {
            color: #feaa11;
          }
          .event-item {
            li {
              color: #feaa11;
            }
          }
        }
      }
    }
    .opensoucrce {
      margin-bottom: 18px;
      .content-box {
        background-image: linear-gradient(
          90deg,
          rgba(236, 240, 243, 0.5) 0%,
          #cde8e7 100%
        );
        .event-box {
          h5 {
            color: #00685a;
          }
          .event-item {
            li {
              color: #00685a;
            }
          }
        }
      }
    }
    .developer {
      .content-box {
        background-image: linear-gradient(
          90deg,
          rgba(236, 237, 252, 0.5) 0%,
          #ebecfc 100%
        );
        .event-box {
          h5 {
            color: #7d32ea;
          }
          .event-item {
            li {
              color: #7d32ea;
            }
          }
        }
      }
    }
    .edition {
      margin-top: 25px;

      .title-box {
        min-height: 72px;
      }
      .edition-box {
        margin-left: var(--o-spacing-h5);
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        @for $i from 0 through 3 {
          .edit#{$i} {
            left: calc($lineSpace * calc($i + 1));
          }
        }
        .edition-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            font-size: var(--o-font-size-tip);
            white-space: nowrap;
          }
        }
      }
    }
    @for $i from 1 through 12 {
      .month#{$i} {
        left: calc(calc($i - 1) * 104px);
      }
    }
  }
}
</style>
