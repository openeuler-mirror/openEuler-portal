<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useCommon } from '@/stores/common';

import MinisiteSchedule from './MinisiteSchedule.vue';

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
      <p class="title-text">{{ agendaData.title }}</p>
      <img :src="isDark ? agendaData.titleImDark : agendaData.titleImg" />
    </div>
    <div class="agenda">
      <OTabs v-model="tabType" class="agenda-tabs">
        <OTabPane
          v-for="item in agendaData.list"
          :key="item.id"
          :name="item.id"
          :label="item.time"
        >
          <ClientOnly>
            <MinisiteSchedule :options="item.list" />
          </ClientOnly>
        </OTabPane>
      </OTabs>
      <span class="agenda-date">{{ agendaData.date }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sig-agenda {
  margin-top: 72px;
  @include respond-to('<=pad_v') {
    margin-top: 40px;
  }
}
.agenda {
  position: relative;
  margin-top: 53px;
  @include respond-to('<=pad_v') {
    margin-top: 16px;
  }
}
.agenda-tabs {
  :deep(.el-tabs__header) {
    border-bottom: 1px solid rgba(#002fa7, 0.1);
    .el-tabs__item {
      @include h3;
      padding-top: 0;
      padding-bottom: 18px;
      font-weight: 500;
      @include respond-to('<=pad_v') {
        padding-bottom: 4px;
      }
    }
  }
}
.agenda-date {
  opacity: 0.25;
  font-size: 32px;
  color: var(--o-color-primary1);
  font-weight: 900;
  position: absolute;
  top: 0;
  right: 0;
  @include respond-to('<=pad_v') {
    font-size: 16px;
  }
}
</style>
