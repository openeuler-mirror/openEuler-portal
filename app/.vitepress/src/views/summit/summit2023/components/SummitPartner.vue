<script setup lang="ts">
import AOS from 'aos';
import { onMounted } from 'vue';
import { useData } from 'vitepress';

import partnerData from '../data/partner';
import { useCommon } from '@/stores/common';

const { lang } = useData();
const commonStore = useCommon();
const props = withDefaults(
  defineProps<{
    row?: number;
  }>(),
  {
    row: 4,
  }
);
onMounted(() => {
  AOS.init({
    offset: 100,
    duration: 800,
    delay: 100,
  });
});
</script>

<template>
  <div class="partner">
    <h3 class="partner-title">
      {{ lang==="zh"?partnerData.title:partnerData.titleEn }}
    </h3>
    <div
      v-for="item in partnerData.partnerList"
      :key="item.subTitle"
      class="partner-item"
    >
      <h4>{{ lang==="zh"?item.subTitle:item.subTitleEn }}</h4>

      <div class="picture-panel" data-aos="fade-zoom-in" :class="item?.class">
        <a
          v-for="itemLogo in item.logoList"
          :key="itemLogo.img"
          class="link-item"
        >
          <img
            :src="
              commonStore.theme === 'light' ? itemLogo.img : itemLogo.img_dark
            "
          />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.picture-panel {
  display: grid;
  grid-template-columns: repeat(v-bind('props.row'), minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  .link-item {
    display: flex;
    margin: 0px -1px -1px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--o-color-division1);
    background-color: var(--o-color-bg2);
    max-height: 120px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media screen and (max-width: 1416px) {
    grid-template-columns: repeat(v-bind('(props.row)-1'), minmax(82px, 270px));
    justify-content: center;
    .link-item {
      min-height: 40px;
      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(v-bind('(props.row)-2'), minmax(82px, 270px));
  }
}

.center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
    justify-content: flex-start;
  }
  .link-item {
    width: 25%;
    @media screen and (max-width: 1416px) {
      width: 33%;
    }
    @media screen and (max-width: 768px) {
      width: 50%;
    }
  }
}
.guidance-unit {
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
}
.partner {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
  }
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .partner-item {
    margin-top: var(--o-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h4);
    }
    .picture-panel {
      @media screen and (max-width: 1416px) {
        max-width: 1053px;
        grid-template-columns: repeat(3, minmax(82px, 1fr));
      }
      @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, minmax(82px, 1fr));
      }
    }
    h4 {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text1);
      font-weight: 400;
      text-align: center;
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .picture-panel {
      margin-top: var(--o-spacing-h4);
      margin-left: auto;
      margin-right: auto;
      @media screen and (max-width: 768px) {
        margin-top: var(--o-spacing-h5);
      }
      :deep(a) {
        cursor: default;
      }
    }
  }
}
</style>
