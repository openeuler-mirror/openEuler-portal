<script setup lang="ts">
import { ORow, OCol, OCard, OIcon, OFigure, OLink } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';

import eventData from '@/data/salon/event';

import IconTime from '~icons/app-new/icon-time.svg';
import IconAddress from '~icons/app-new/icon-address.svg';
import IconChevronRight from '~icons/app-new/icon-chevron-right.svg';

import { changeTimeStamp } from '~@/utils/common';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { lePadV } = useScreen();
const { t } = useLocale();
</script>
<template>
  <AppSection :title="t('eventOverview.list')">
    <ORow :gap="lePadV ? '0 12px' : '32px 32px'" wrap="wrap">
      <OCol
        :flex="lePadV ? ' 0 0 100%' : '0 0 33.33%'"
        v-for="(item, i) in eventData"
        :key="i"
      >
        <OCard hoverable class="event-item">
          <template #cover>
            <OFigure hoverable :src="item.cover"></OFigure>
          </template>
          <template #header>
            <div class="title">{{ item.title }}</div>
          </template>
          <template #footer>
            <div class="event-info-top">
              <div class="time">
                <OIcon><IconTime /></OIcon>
                <p>{{ changeTimeStamp(new Date(item.date).getTime()) }}</p>
              </div>
              <div class="location">
                <OIcon><IconAddress /></OIcon>
                <p>{{ item.location }}</p>
              </div>
            </div>
            <div class="btn-box">
              <OLink
                v-for="video in item.video"
                :key="video.url"
                :href="video.url"
                target="_blank"
                variant="text"
                hoverUnderline
              >
                {{ video.platform }}
                <OIcon><IconChevronRight /></OIcon>
              </OLink>
            </div>
          </template>
        </OCard>
      </OCol>
    </ORow>
  </AppSection>
</template>
<style lang="scss" scoped>
.o-card {
  --card-content-gap: 0;
  --card-footer-gap: 12px;
  cursor: pointer;
}
.event-info-top {
  display: flex;
  align-items: center;
}
.time,
.location {
  display: flex;
  align-items: center;
  .o-icon {
    margin-right: 8px;
  }
}
.location {
  margin-left: 16px;
}
.btn-box {
  margin-top: 16px;
  :deep(.o-link-label) {
    display: flex;
    align-items: center;
    .o-icon {
      margin-top: 0;
    }
  }
  .o-link + .o-link {
    margin-left: 16px;
  }
}
</style>
