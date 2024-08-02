<script setup lang="ts">
import { ref, onMounted } from 'vue';

import meetingConfig from '@/data/meeting';

import AppContent from '@/components/AppContent.vue';
import AppCalendar from '@/components/AppCalendar.vue';

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
      <h3>openEuler 开发者日历</h3>
      <AppCalendar
        v-if="calendarData?.length"
        id="meeting"
        :table-data="calendarData"
      />
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
h3 {
  font-size: var(--o-font-size-h3);
  font-weight: 300;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h3);
  width: 100%;
  text-align: center;
  margin-top: var(--o-spacing-h1);
  margin-bottom: var(--o-spacing-h2);
  @media (max-width: 768px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-top: var(--o-spacing-h2);
    margin-bottom: var(--o-spacing-h5);
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
    color: var(--o-color-text1);
    padding: 24px;

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    .join-title {
      font-weight: 500;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        grid-template-columns: repeat(1, minmax(200px, 1fr));
      }
    }
    .join-des {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-top: 24px;
      @media (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        grid-template-columns: repeat(1, minmax(200px, 1fr));
      }
    }
    .join-btn {
      display: block;
      margin-top: auto;
      margin-top: 32px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      .o-button {
        :deep(.prefix-icon) {
          margin-right: 8px;
          font-size: var(--o-font-size-h5);
        }
      }
      a {
        margin-right: 16px;
      }
    }
  }
}
</style>
