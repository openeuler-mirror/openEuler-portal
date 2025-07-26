<script lang="ts" setup>
import { ref } from 'vue';
import { ORow, OCol, OIcon, OLink, OPopover } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';
import HomeCalendar from '~@/views/home/HomeCalendar.vue';

import { participate } from '~@/data/online-meeting';

import banner from '~@/assets/category/mailing/mailing-banner.jpg';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';
import IconWechat from '~icons/app/icon-wechat.svg';

import { getMeetingActivity } from '~@/api/api-calendar';

import { useLocale } from '~@/composables/useLocale';

const { locale, t } = useLocale();

const calendarData = ref<string[]>([]);
const getMeetingData = () => {
  getMeetingActivity({ type: 'all' }).then((res) => {
    calendarData.value = res.data;
  });
}
getMeetingData();
</script>

<template>
  <BannerLevel2 class="meeting-banner" :title="t('onlineMeeting.title')" :background-image="banner" />
  <AppSection :title="t('onlineMeeting.participate')" class="participate">
    <ORow gap="32px 32px" wrap="wrap" class="participate-list">
      <OCol v-for="(item, i) in participate" :key="i" flex="0 0 50%">
        <div class="card-item">
          <OIcon class="icon">
            <component :is="item.icon"></component>
          </OIcon>
          <div class="card-content">
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
            <template v-if="item.btn?.length">
              <OLink v-for="n in item.btn" :key="n.url" :href="n.url" target="_blank">
                <span>{{ n.text }}</span>
                <OIcon><IconChevronRight /></OIcon>
              </OLink>
            </template>
            <div v-if="item?.WeChat" class="we-chat">
              <OIcon><IconWechat /></OIcon>
              <OPopover
                position="top"
                trigger="hover"
                wrap-class="we-chat-popup"
              >
                <template #target>
                  <p class="text">{{ item.text }}</p>
                </template>
                <div class="popup-content">
                  {{ item.text }}
                </div>
              </OPopover>
            </div>
          </div>
        </div>
      </OCol>
    </ORow>
  </AppSection>
  <div id="calendar">
    <HomeCalendar
      v-if="calendarData?.length"
      :table-data="calendarData"
      :shown-icon="false"
    />
  </div>
</template>

<style scoped lang="scss">
.meeting-banner {
  :deep(.wrap) {
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    height: 280px;

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

.card-item {
  width: 100%;
  height: 100%;
  background-color: var(--o-color-fill2);
  padding: 24px;
  border-radius: var(--o-radius-xs);
  display: flex;
  align-items: flex-start;
  .icon {
    --icon-size: 40px;
    margin-right: 12px;
    flex-shrink: 0;
  }
  .title {
    font-weight: 500;
    color: var(--o-color-info1);
    @include h3;
  }
  .desc {
    color: var(--o-color-info2);
    margin-top: 8px;
    @include text1;
  }
  .o-link {
    margin-top: 16px;
    :deep(.o-link-label) {
      display: flex;
      align-items: center;
    }
    .o-icon {
      --icon-size: 16px;
      margin-left: 4px;
    }
  }
  .o-link + .o-link {
    margin-left: 32px;
  }
  .we-chat {
    margin-top: 16px;
    display: inline-flex;
    align-items: center;
    color: var(--o-color-info1);
    .o-icon {
      --icon-size: 24px;
    }
    .text {
      cursor: pointer;
      margin-left: 8px;
      @include text1;
      @include hover {
        color: var(--o-color-link2);
      }
    }
  }
}
</style>
