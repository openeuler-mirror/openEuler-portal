<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import AOS from 'aos';
import { OButton } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';
import { useScreen } from '~@/composables/useScreen';

import { useCommon } from '@/stores/common';

const props = defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const { lePad, lePadV } = useScreen();

type ThemeT = 'light' | 'dark';
type SizeT = 'pc' | 'pad' | 'mb';

const theme = computed<ThemeT>(() => (commonStore.theme === 'dark' ? 'dark' : 'light'));

// 屏幕档位：<=840px 直接使用移动端 banner；841-1200 为 pad；1201+ 为 pc
const size = computed<SizeT>(() => {
  if (lePadV.value) return 'mb';
  if (lePad.value) return 'pad';
  return 'pc';
});

const bg = computed(() => {
  const data = props.bannerData as Record<string, Record<string, string>> | null;
  if (!data) return '';
  const bgMap: Record<SizeT, Record<string, string>> = {
    pc: data.bgPc,
    pad: data.bgPad,
    mb: data.bgMb,
  };
  return bgMap[size.value]?.[theme.value] ?? '';
});

// 文字图 >840px（pad 横屏 / PC）共用一份；<=840px 不渲染 banner-content，直接使用自带文案的移动端背景图
const textImg = computed(() => {
  const data = props.bannerData as Record<string, Record<string, string>> | null;
  if (!data) return '';
  return data.textImg?.[theme.value] ?? '';
});

// 报名链接：minisite 区分 PC / 移动端报名页，≤840px（整屏报名热区）使用移动端链接
// 链接为空时 PC 端 OButton 渲染为 <button>、移动端热区渲染为无 href 的 <a>，均不发生跳转
const buttonLink = computed(() => {
  const data = props.bannerData as Record<string, string> | null;
  if (!data) return undefined;
  const link = lePadV.value
    ? data.buttonLinkMb || data.buttonLink
    : data.buttonLink;
  return link || undefined;
});

onMounted(() => {
  AOS.init({
    duration: 800,
  });
});
</script>

<template>
  <div class="summit-banner">
    <div class="banner-bg" :style="{ backgroundImage: `url(${bg})` }"></div>
    <div v-if="!lePadV" class="banner-content" data-aos="fade-up">
      <ContentWrapper vertical-padding="0">
        <img class="text-img" :src="textImg" :alt="bannerData.textImgAlt" />
        <OButton
          class="banner-btn"
          variant="solid"
          color="primary"
          size="large"
          :href="buttonLink"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ bannerData.buttonText }}
        </OButton>
      </ContentWrapper>
    </div>
    <!-- <=840px：直接使用移动端 banner（背景图自带文案），整个 banner 为报名热区 -->
    <a
      v-if="lePadV"
      class="banner-hotspot"
      :href="buttonLink"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="bannerData.textImgAlt"
    ></a>
  </div>
</template>

<style lang="scss" scoped>
.summit-banner {
  width: 100%;
  height: 360px;
  position: relative;

  .banner-bg {
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .banner-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    // 覆盖 ContentWrapper 的 margin: 0 auto（flex 子项 auto 边距会水平居中），保证文字图靠左
    :deep(.content-wrapper) {
      width: 100%;
    }

    .text-img {
      display: block;
      height: 180px;
      max-width: 100%;

      @include respond('<=pad') {
        height: 104px;
      }
    }
  }

  .banner-btn {
    margin-top: 24px;
  }
}

// <=840px：直接使用移动端 banner（背景图自带文案），不渲染文字图与按钮，整个 banner 为报名热区
@include respond('<=pad_v') {
  .summit-banner {
    height: 300px;

    .banner-hotspot {
      position: absolute;
      inset: 0;
      display: block;

      &:focus-visible {
        outline: 2px solid var(--o-color-primary1);
        outline-offset: -2px;
      }
    }
  }
}
</style>
