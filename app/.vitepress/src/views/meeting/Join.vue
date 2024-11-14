<script setup lang="ts">
import { ref, onMounted } from 'vue';

import meetingConfig from '@/data/meeting';

import AppContent from '@/components/AppContent.vue';

import HomeCalendar from '~@/views/home/HomeCalendar.vue';

import { getMeetingActivity } from '@/api/api-calendar';

const calendarData = ref<string[]>([]);
onMounted(() => {
  // 获取会议活动数据
  getMeetingActivity({
    type: 'all',
  }).then((res) => {
    calendarData.value = res.data;
  });
});
</script>

<template>
  <AppContent :pc-top="0">
    <div class="join">
      <h3>参与方式</h3>
      <div class="join-card-box">
        <div v-for="join in meetingConfig" class="join-card" :key="join.title">
          <div class="join-content">
            <div class="join-title">{{ join.title }}</div>
            <div class="join-des">{{ join.des }}</div>
          </div>
          <div class="join-btn">
            <a v-for="btn in join.btn" :href="btn.url">
              <OButton :animation="btn.animation" size="mini" :type="btn.type">
                <template v-slot:[btn.postion]>
                  <OIcon><component :is="btn.icon"></component></OIcon>
                </template>
                {{ btn.text }}
                <template v-slot:[btn.postion]>
                  <OIcon><component :is="btn.icon"></component></OIcon>
                </template>
              </OButton>
            </a>
          </div>
        </div>
      </div>
      <div id="calendar">
        <HomeCalendar
          v-if="calendarData?.length"
          :table-data="calendarData"
          :shown-icon="false"
        />
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
h3 {
  font-size: var(--e-font-size-h3);
  font-weight: 300;
  color: var(--e-color-text1);
  line-height: var(--e-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--e-spacing-h1);
  margin-bottom: var(--e-spacing-h2);
  @media (max-width: 768px) {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    margin-top: var(--e-spacing-h2);
    margin-bottom: var(--e-spacing-h5);
  }
}
#calendar {
  min-height: 400px;
  :deep(.app-section) {
    .section-wrapper {
      padding: 0;
    }
    .section-body {
      padding: 0;
    }
  }
}
.join-card-box {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  column-gap: 32px;
  row-gap: 32px;
  @media (max-width: 1530px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
  .join-card {
    color: var(--e-color-text1);
    padding: 24px;

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l1);
    .join-title {
      font-weight: 500;
      font-size: var(--e-font-size-h5);
      line-height: var(--e-line-height-h5);
      @media (max-width: 768px) {
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
        grid-template-columns: repeat(1, minmax(200px, 1fr));
      }
    }
    .join-des {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      margin-top: 24px;
      @media (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        grid-template-columns: repeat(1, minmax(200px, 1fr));
      }
    }
    .join-btn {
      display: block;
      margin-top: auto;
      margin-top: 32px;
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      @media (max-width: 768px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
      .o-button {
        :deep(.prefix-icon) {
          margin-right: 8px;
          font-size: var(--e-font-size-h5);
        }
      }
      a {
        margin-right: 16px;
      }
    }
  }
}
</style>
