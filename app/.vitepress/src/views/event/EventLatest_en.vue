<script setup lang="ts">
import eventData from '@/data/salon/event';

import AppContent from '@/components/AppContent.vue';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import IconLocation from '~icons/app/icon-location.svg';
import IconDeta from '~icons/app/icon-deta.svg';
</script>
<template>
  <AppContent class="salon-content">
    <div class="event-latest">
      <OCard
        v-for="item in eventData"
        :key="item.title"
        class="event-latest-card"
        shadow="hover"
      >
        <div class="event-latest-card-img">
          <img :src="item.cover" alt="" />
        </div>
        <div class="event-latest-card-bottom">
          <div class="event-latest-card-title">
            {{ item.title }}
          </div>
          <div class="event-latest-card-info">
            <OIcon>
              <IconDeta></IconDeta>
            </OIcon>
            <span>{{ item.date }}</span>
            <OIcon class="home">
              <IconLocation></IconLocation>
            </OIcon>
            <span class="address" :title="item.location">
              {{ item.location }}</span
            >
          </div>
          <div class="btn-box">
            <a
              v-for="video in item.video"
              :key="video.url"
              :href="video.url"
              type="text"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OButton type="text" size="small" animation>
                {{ video.platform }}
                <template #suffixIcon>
                  <OIcon>
                    <IconArrowRight />
                  </OIcon>
                </template>
              </OButton>
            </a>
          </div>
        </div>
      </OCard>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.pagination {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h5);
  }
}
.pagination-slot {
  font-size: var(--e-font-size-text);
  font-weight: 400;
  color: var(--e-color-text1);
  line-height: var(--e-spacing-h4);
}

.event-latest {
  display: grid;
  width: 100%;
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--e-spacing-h5);
  }

  .event-latest-card {
    width: 100%;
    :deep(.el-card__body) {
      padding: 0;
      width: 100%;
      display: flex;
      flex-flow: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 100%;
    }

    .event-latest-card-title {
      font-weight: 700;
      font-size: var(--e-font-size-h5);
      line-height: var(--e-line-height-h5);
      color: var(--e-color-text1);
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 64px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .event-latest-card-img {
      width: 100%;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      img {
        object-fit: cover;
        width: 100%;
      }
      span {
        position: absolute;
        text-align: center;
        font-size: var(--e-font-size-h6);
        line-height: var(--e-line-height-h6);
        color: #fff;
        max-width: 400px;
        @media (max-width: 768px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
    }

    .event-latest-card-info {
      margin-top: 12px;
      display: flex;
      flex-flow: row;
      justify-content: center;
      align-items: center;
      width: 100%;

      span {
        color: var(--e-color-text4);
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        white-space: nowrap;
        @media (max-width: 768px) {
          color: var(--e-color-neutral8);
        }
      }
      .o-icon {
        font-size: 20px;
        color: var(--e-color-text4);
        margin-right: 8px;
        @media (max-width: 768px) {
          height: 16px;
          width: 16px;
          color: var(--e-color-neutral8);
          margin-right: var(--e-spacing-h10);
        }
      }
    }
    .event-latest-card-bottom {
      padding: 24px;
      width: 100%;
      @media (max-width: 768px) {
        padding: var(--e-spacing-h5) var(--e-spacing-h6);
      }
      .home {
        margin-left: var(--e-spacing-h2);
        @media (max-width: 768px) {
          margin-left: var(--e-spacing-h5);
        }
      }
      .address {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .btn-box {
        margin-top: 24px;
        .o-button {
          margin-right: 32px;
          padding: 0;
          :deep(.suffix-icon) {
            margin-left: 8px;
            color: var(--e-color-brand1);
            font-size: var(--e-font-size-h8);
          }
        }
      }
    }
  }
}
</style>
