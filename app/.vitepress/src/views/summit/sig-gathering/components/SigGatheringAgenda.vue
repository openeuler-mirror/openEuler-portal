<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useCommon } from '@/stores/common';

import SigGatheringSchedule from './SigGatheringSchedule.vue';

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const tabType = ref('main');

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
</script>

<template>
  <div class="sig-agenda">
    <div class="title-img">
      {{ agendaData.title }}
      <img
        class="introduction-img"
        :src="isDark ? agendaData.titleImDark : agendaData.titleImg"
        alt=""
      />
    </div>
    <div class="agenda">
      <OTabs v-model="tabType" class="agenda-tabs">
        <OTabPane
          v-for="item in agendaData.list"
          :key="item.id"
          :name="item.id"
          :label="item.time"
        >
          <SigGatheringSchedule :options="item.list" />
        </OTabPane>
      </OTabs>
      <span class="agenda-date">{{ agendaData.date }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sig-agenda {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: 40px;
  }
}
.agenda {
  position: relative;
  margin-top: 53px;
  @media (max-width: 767px) {
    margin-top: 16px;
  }
}
.agenda-tabs {
  :deep(.el-tabs__header) {
    border-bottom: 1px solid rgba(#002fa7, 0.1);
    .el-tabs__item {
      padding-top: 0;
      padding-bottom: 18px;
      font-size: 22px;
      line-height: 30px;
      font-weight: 500;
      @media (max-width: 767px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        padding-bottom: 4px;
      }
    }
  }
}
.agenda-date {
  opacity: 0.25;
  font-size: 32px;
  color: var(--o-color-brand1);
  font-weight: 900;
  position: absolute;
  top: 0;
  right: 0;
  @media (max-width: 767px) {
    font-size: var(--o-font-size-h8);
  }
}
</style>
