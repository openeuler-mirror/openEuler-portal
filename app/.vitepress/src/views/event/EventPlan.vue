<script lang="ts" setup>
import { useData } from 'vitepress';
import { computed } from 'vue';
import AppContent from '@/components/AppContent.vue';

import { useI18n } from '@/i18n';

import { yearPlanData, months, editionData } from '@/data/salon/plan';

import IconRight from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();
const salonData = computed(() => i18n.value.interaction.MEETUPSLIST);

const lang = useData().lang;
const yearPlan = computed(() => {
  return yearPlanData[lang.value as 'zh' | 'en'];
});
</script>
<template>
  <AppContent class="salon-content">
    <!-- openEuler Meetup 申请攻略 -->
    <OCard v-if="lang === 'zh'" class="meetup-form">
      <div class="info">
        <h3>openEuler Meetup 申请攻略</h3>
        <p class="desc">
          无论是企业、SIG 组、用户组、科研院所或其他组织，我们都欢迎与 openEuler
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
    <div class="year-plan">
      <div class="year-plan-main">
        <div class="line line1"></div>
        <div class="line line2"></div>
        <div class="line line3"></div>
        <div class="months-box">
          <div v-for="month in months" :key="month" class="month">
            {{ month }}
          </div>
        </div>
        <div
          v-for="(value, key) in yearPlan"
          :key="value"
          class="active-box"
          :class="yearPlan[key].id"
        >
          <!-- 社区峰会、成员单位会议、开源项目、开发者活动 -->
          <div
            v-if="yearPlan[key].id !== 'college'"
            :style="{ backgroundImage: `url(${yearPlan[key].titleBg})` }"
            class="title-box"
          >
            <p>{{ yearPlan[key].title }}</p>
          </div>
          <div
            v-if="yearPlan[key].id !== 'college'"
            :style="{ backgroundImage: `url(${yearPlan[key].contentBg})` }"
            class="content-box"
          >
            <div
              v-for="item in yearPlan[key]['events']"
              :key="item"
              :class="['month' + item.month]"
              class="layout"
            >
              <!-- 社区峰会、成员单位会议、开源项目、开发者活动 -->
                <component  :is="it.href ? 'a':'div'" :href="it.href" :target="it.href ? '_blank':null" v-for="it in item.actives" :key="it" class="event-box">
                  <div class="event-item">
                    <li></li>
                    <p class="location">
                      {{ it.location }}
                    </p>
                    <p >
                      {{ it.activeName }}
                    </p>
                  </div>
                </component>
            </div>
          </div>
          <div v-if="yearPlan[key].id === 'opensource'" class="otherlink">
            <p>
              {{ salonData.MARKING_EMAIL
              }}<a href="mailto:marketing@openeuler.org"
                >marketing@openeuler.org</a
              ><span v-if="lang === 'en'">.</span>
            </p>
          </div>
          <!-- 高校活动 -->
          <div
            v-if="yearPlan[key].id === 'college'"
            :style="{ backgroundImage: `url(${yearPlan[key].titleBg})` }"
            class="title-box"
          >
            <p>{{ yearPlan[key].title }}</p>
          </div>
          <div
            v-if="yearPlan[key].id === 'college'"
            :style="{ backgroundImage: `url(${yearPlan[key].contentBg})` }"
            class="collegee"
          >
            <div
              v-for="colact in yearPlan['college'].actives"
              :key="colact"
              :style="{
                width: (colact.endTime - (colact.startTime - 1)) * 104 + 'px',
                marginLeft: (colact.startTime - 1) * 104 + 'px',
              }"
              class="collegee-item"
            >
              <a
                v-if="colact.hasOwnProperty('activelink')"
                :key="colact.activelink"
                :href="colact.activelink"
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
        <div class="active-box edition">
          <div
            class="title-box"
            :style="{ backgroundImage: `url(${editionData.titleBg})` }"
          >
            {{ lang === 'zh' ? editionData.title.zh : editionData.title.en }}
          </div>
          <div
            :style="{ backgroundImage: `url(${editionData.contentBg})` }"
            class="edition-box"
          >
            <div
              v-for="edit in editionData.actives"
              :key="edit.content"
              :class="['edit-' + edit.month]"
              class="layout-edition"
            >
              <component :is="edit.href ? 'a':'div'" :href="edit.href ? `/${lang}${edit.href}`:null" :target="edit.href ? '_blank':null"  class="edition-item">
                <p class="edition-time">{{ edit.time }}</p>
                <p class="edition-content">{{ edit.content }}</p>
              </component>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
$lineSpace: 312px;
$eventboxWidth: 104px;
$contentWidth: 1302px;
$titleboxWidth: 168px;
$gridGap: var(--o-spacing-h6);
$lineLeft: calc($titleboxWidth);

.months-box {
  display: flex;
  justify-content: flex-end;
  padding: 24px 0;
  background-color: #e6e7ea4d;
  .month {
    padding: 0 8px;
    min-width: 104px;
    text-align: center;
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
  }
}

.meetup-form {
  margin-bottom: 40px;
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
      .event-box,
      .collegee-item {
        background-image: none !important;
        background-color: rgba(0, 0, 0, 0.2) !important;
      }
    }
  }
}
.year-plan {
  color: var(--o-color-text1);
  @media screen and (max-width: 1416px) {
    overflow: auto;
    @include scrollbar;
  }
  .year-plan-main {
    position: relative;
    width: 1416px;
    min-height: 500px;
    display: grid;
    grid-row-gap: $gridGap;
    .line {
      height: calc(100% - 18px);
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
    @for $i from 1 through 3 {
      $a: $i + px;
      .line#{$i} {
        left: calc(calc($lineLeft + calc($lineSpace * $i)));
      }
    }
    .title-box {
      background-position: bottom;
      background-size: contain;
      background-repeat: no-repeat;
      background-color: var(--o-color-kleinblue5);
      color: var(--o-color-white);
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      flex-shrink: 0;
      width: $titleboxWidth;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 var(--o-spacing-h6);
    }
    .content-box {
      background-color: var(--o-color-fill2);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: right 40px;
      padding: 20px 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      a {
        cursor: pointer;
        &:hover {
          p:not(.location) {
            color:var(--o-color-brand1)
          }
        }
      }
    }
    .collegee {
      background-color: var(--o-color-fill2);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: right 40px;
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
          rgba(237, 245, 255, 0.7) 10%,
          rgba(195, 225, 255, 0.36) 100%
        );
        margin-bottom: var(--o-spacing-h9);
        p,
        a {
          line-height: 34px;
          color: var(--o-color-text1);
        }
        a:hover {
          color: var(--o-color-brand1);
        }
        .internship {
          margin-left: 40px;
        }
      }
    }
    .layout,
    .layout-edition {
      width: 0px;
      height: auto;
      position: relative;
    }
    .layout-edition {
      position: absolute;
      width: 104px;
    }
    .event-box {
      position: relative;
      padding: 8px;
      display: inline-block;
      min-width: $eventboxWidth;
      &:not(:first-child) {
        margin-top: 8px;
      }

      h5 {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-text);
        font-weight: 500;
      }
      .event-item {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        position: relative;
        padding-left: 8px;

        li {
          position: absolute;
          left: 0;
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          width: 4px;
          margin-right: 4px;
        }
        a,
        p {
          margin-top: 8px;
          font-size: var(--o-font-size-tip);
          color: var(--o-color-text1);
          position: relative;
          line-height: var(--o-line-height-tip);
        }
        .location {
          margin-top: 0;
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
      }
    }
    .active-box {
      min-width: 1416px;
      display: flex;
      flex-direction: row;
      position: relative;
      .otherlink {
        position: absolute;
        bottom: -27px;
        right: 0;
        z-index: 3;
        p,
        a {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      .content-box {
        .event-box {
          box-shadow: var(--o-shadow-l1);
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
        .event-box {
          background-image: linear-gradient(
            90deg,
            rgba(247, 241, 218, 0.3) 0%,
            rgba(251, 234, 175, 0.4) 100%
          );
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

    .opensource {
      .content-box {
        .event-box {
          background-image: linear-gradient(
            90deg,
            rgba(236, 240, 243, 0.5) 0%,
            #cde8e7 100%
          );
          h5 {
            color: #00685a;
          }
          .event-item {
            li {
              color: #5ab2aeff;
            }
          }
        }
      }
    }
    .ecology {
      margin-top: 33px;
      .content-box {
        .event-box {
          background-image: linear-gradient(
            90deg,
            rgba(255, 252, 243, 0.3) 0%,
            rgba(251, 234, 175, 0.4) 100%
          );
          h5 {
            color: #00685a;
          }
          .event-item {
            li {
              color: #f0bc00ff;
            }
          }
        }
      }
    }
    .developer {
      .title-box {
        padding: 0 36px;
      }
      .content-box {
        .event-box {
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(252, 235, 252, 1) 100%
          );
          .event-item {
            li {
              color: #ff87eeff;
            }
          }
        }
      }
    }
    .edition {
      margin-top: 33px;

      .title-box {
        padding: 72px 0;
      }
      .edition-box {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: right 30px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: var(--o-color-fill2);
        @for $i from 1 through 12 {
          .edit-#{$i} {
            left: calc(104px * $i + 62px);
          }
        }
        .edition-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--o-color-text1);

          p {
            font-size: var(--o-font-size-tip);
            white-space: nowrap;
          }
        }
        a {
          &:hover {
            .edition-content {
              color: var(--o-color-brand1)
            }
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
