<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { ORow, OCol, OIcon, OLink, OPopover, OFigure } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';
import HomeCalendar from '~@/views/home/HomeCalendar.vue';

import { participate } from '~@/data/online-meeting';

import banner from '~@/assets/category/online-meeting/online-meeting-banner.jpg'
import communityHelper from '~@/assets/category/online-meeting/community-helper.jpeg';

import IconChevronRight from '~icons/app/icon-chevron-right.svg';
import IconWechat from '~icons/app-new/icon-wechat.svg';

import { getMeetingActivity } from '~@/api/api-calendar';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { locale, t } = useLocale();
const { lePadV, leLaptop, lePad } = useScreen();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

const calendarData = ref<string[]>([]);
const getMeetingData = () => {
  getMeetingActivity({ type: 'all' }).then((res) => {
    calendarData.value = res.data;
  });
}
onMounted(() => {
  getMeetingData();
})

const gap = computed(() => {
  if (lePadV.value) {
    return '0 16px';
  } else if (lePad.value) {
    return '16px 16px';
  } else if (leLaptop.value) {
    return '24px 24px';
  }
  return '32px 32px';
})
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="meeting-banner" :title="t('onlineMeeting.title')" :background-image="banner" />
  <div v-else class="mo-banner">
    <p class="mo-title">{{ $t('onlineMeeting.title') }}</p>
  </div>
  <AppSection :title="t('onlineMeeting.participate')" class="participate">
    <ORow :gap="gap" wrap="wrap" class="participate-list">
      <OCol v-for="(item, i) in participate" :key="i" :flex="lePadV ? '0 0 100%' : '0 0 50%'">
        <div class="card-item">
          <OIcon class="icon">
            <component :is="item.icon"></component>
          </OIcon>
          <div class="card-content">
            <p class="title">{{ item.title }}</p>
            <p class="desc">{{ item.desc }}</p>
            <div class="link" v-if="item.btn?.length">
              <OLink v-for="n in item.btn" :key="n.url" :href="n.url" target="_blank">
                <span>{{ n.text }}</span>
                <OIcon><IconChevronRight /></OIcon>
              </OLink>
            </div>
            <div v-if="item?.WeChat" class="we-chat">
              <OIcon><IconWechat /></OIcon>
              <OPopover
                position="top"
                trigger="hover"
                :wrap-class="isDark ? 'we-chat-popup-dark' : 'we-chat-popup'"
              >
                <template #target>
                  <p class="text">{{ item.text }}</p>
                </template>
                <div class="popup-content">
                  <OFigure :src="communityHelper" />
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

.mo-banner {
  @include respond-to('<=pad_v') {
    padding: 24px 24px 20px;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
  }
  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
  }
}

.participate {
  :deep(.section-wrapper) {
    margin-top: 40px;
    @include respond-to('<=laptop') {
      margin-top: 32px;
    }
    @include respond-to('phone') {
      margin-top: 16px;
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
  .card-content {
    height: 100%;
    display: flex;
    flex-direction: column;
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
  .link {
    margin-top: auto;
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
      color: var(--o-color-info2);
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

@include respond-to('<=pad') {
  .card-item {
    padding: 16px;
    .icon {
      --icon-size: 32px;
    }
  }
}

@include respond-to('<=pad_v') {
  .card-item {
    .icon {
      --icon-size: 24px;
      margin-right: 8px;
    }
    .o-link {
      :deep(.o-link-label) {
        @include text1;
      }
    }
    .o-link + .o-link {
      margin-left: 16px;
    }
  }
}

@include respond-to('phone') {
  .card-item {
    .o-link {
      :deep(.o-link-label) {
        @include text2;
      }
    }
    .o-link + .o-link {
      margin-left: 8px;
    }
  }
}

.popup-content {
  .o-figure {
    width: 180px;
  }
}
</style>

<style lang="scss">
.we-chat-popup-dark {
  --popup-bg-color: rgb(var(--o-mixedgray-7));
}
</style>
