<script setup lang="ts">
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import { useI18n } from '@/i18n';

import TWEEN from '@tweenjs/tween.js';
import { useCommon } from '@/stores/common';
import { onMounted, Ref, ref } from 'vue';
import { getStatistic } from '@/api/api-search';
import useWindowResize from '@/components/hooks/useWindowResize';

const commonStore = useCommon();

const i18n = useI18n();
const trendRef = ref();
const roundList: Ref<any[]> = ref([]);
const isShowCommunity = ref(false);
const roundNumber = ref([
  {
    ROUND_VALUE: 0,
  },
]);
const jumpTo = (path: string) => {
  window.open(path, '_blank');
};

const changeNum = () => {
  roundNumber.value.forEach((item: { ROUND_VALUE: number }, index: number) => {
    new TWEEN.Tween(item)
      .to(
        {
          ROUND_VALUE: roundList.value[index].ROUND_VALUE || 0,
        },
        2500
      )
      .start();
    function animate() {
      if (TWEEN.update()) {
        requestAnimationFrame(animate);
      }
    }
    animate();
  });
};

const addValue = (arr: any) => {
  const template = JSON.parse(
    JSON.stringify(i18n.value.home.HOME_ROUND.ROUND_LIST)
  );
  template.forEach(
    (item: { ROUND_VALUE: number; ROUND_KEY: string | number }) => {
      item.ROUND_VALUE = arr[item.ROUND_KEY];
    }
  );
  return template;
};
const windowWidth = ref(useWindowResize());
onMounted(async () => {
  try {
    const responeData = await getStatistic();
    roundList.value = addValue(responeData?.data);
    roundNumber.value = JSON.parse(
      JSON.stringify(i18n.value.home.HOME_ROUND.ROUND_LIST)
    );
    const observe = new IntersectionObserver((res) => {
      if (res[0].intersectionRatio <= 0) return;
      isShowCommunity.value = true;
      changeNum();
    });
    trendRef.value && observe.observe(trendRef.value);
  } catch (error: any) {
    throw new Error(error);
  }
});
</script>

<template>
  <div ref="trendRef" class="home-trend">
    <h3>{{ i18n.home.COMMUNITY_ACTIVITY.TITLE }}</h3>
    <div  class="trend-list">
      <OContainer data-aos="fade-right" class="trend-card">
        <div class="trend-title">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.TITLE }}
        </div>
        <div class="trend-word">
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.CONTENT }}
        </div>

        <OButton
          animation
          type="text"
          class="trend-detail"
          @click="jumpTo(i18n.home.COMMUNITY_ACTIVITY.CARD.LINK)"
        >
          {{ i18n.home.COMMUNITY_ACTIVITY.CARD.VIEW_DETAILS }}
          <template #suffixIcon>
            <IconArrowRight class="trend-detail-icon"></IconArrowRight>
          </template>
        </OButton>
      </OContainer>
      <OContainer
        :level-index="windowWidth > 768 ? 2 : 1"
        data-aos="fade-left"
        class="round-card"
      >
        <div class="round-list">
          <div
            v-for="(item, index) in roundList"
            :key="item.ROUND_TEXT"
            class="round-item"
          >
            <img
              :src="
                commonStore.theme === 'dark'
                  ? item.ROUND_IMG_DARK
                  : item.ROUND_IMG
              "
              alt="openEuler"
              class="round-img"
            />

            <div v-if="isShowCommunity" class="round-value">
              {{ roundNumber[index].ROUND_VALUE.toFixed(0) }}
            </div>
            <div class="round-title">{{ item.ROUND_TEXT }}</div>
          </div>
        </div>
      </OContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.round-card {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;

  :deep(.el-card__body) {
    width: 100%;
    padding: var(--o-spacing-h2);
    @media (max-width: 768px) {
      padding: var(--o-spacing-h4) 0 0 0;
    }
  }
}

.round-list {
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
  @media (max-width: 768px) {
    justify-content: center;
  }
}
.round-item {
  display: flex;
  flex-flow: column;
  flex-shrink: 0;
  max-width: 110px;
  width: 100%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 32%;
    margin-bottom: var(--o-spacing-h4);
  }
}

.round-value {
  font-size: var(--o-font-size-h5);
  font-weight: 500;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h5);
  margin-top: var(--o-spacing-h5);
  animation: scaleNumber 1s 2.5s;
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h10);
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}

.round-title {
  font-size: var(--o-font-size-h7);
  font-weight: 400;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h7);
  margin-top: var(--o-spacing-h8);
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h10);
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
  }
}

.round-img {
  width: 48px;
  @media (max-width: 768px) {
    width: 40px;
  }
}
.home-trend {
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
    .o-container {
      padding-bottom: 0;
    }
  }
  h3 {
    margin-top: var(--o-spacing-h1);
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: var(--o-spacing-h2);
      margin-bottom: var(--o-spacing-h5);
    }
  }

  .trend-title {
    font-size: var(--o-font-size-h7);
    font-weight: 500;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h7);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  .trend-word {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text4);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h5);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .trend-list {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: var(--o-spacing-h2);

    @media (max-width: 1080px) {
      display: grid;
      grid-template-columns: 1fr;
      margin-top: var(--o-spacing-h5);
      grid-gap: var(--o-spacing-h5);
    }
  }

  .trend-detail {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    &:hover {
      color: var(--o-color-brand1);
      @media screen and (max-width: 1416px) {
        color: var(--o-color-text1);
      }
    }

    .trend-detail-icon {
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand1);
    }

    @media (max-width: 768px) {
      margin-top: var(--o-spacing-h4);
    }
  }

  .trend-card {
    width: 100%;
    background-image: url('../../assets/category/home/round-bg.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
    padding: var(--o-spacing-h2);
    @media (max-width: 768px) {
      padding: var(--o-spacing-h5) var(--o-spacing-h6);
    }
  }
}
@keyframes scaleNumber {
  from {
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
  to {
    transform: scale(1);
  }
}
</style>
