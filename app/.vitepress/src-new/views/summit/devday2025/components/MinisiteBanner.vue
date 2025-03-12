<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import AOS from 'aos';
import { useScreen } from '~@/composables/useScreen';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import { useCommon } from '@/stores/common';

const { isPhone } = useScreen();

const props = defineProps({
  bannerData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
onMounted(() => {
  AOS.init({
    duration: 800,
  });
});
const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});
const bannerImage = computed(() => {
  return isDark.value
    ? isPhone.value
      ? props.bannerData.bgMoDark
      : props.bannerData.bgPcDark
    : isPhone.value
    ? props.bannerData.bgMo
    : props.bannerData.bgPc;
});
</script>

<template>
  <div class="banner">
    <div
      class="banner-image"
      :style="{
        backgroundImage: `url(${bannerImage})`,
      }"
    ></div>
    <div class="banner-panel-content">
      <div
        data-aos="fade-down"
        :style="{
          backgroundImage: `url(${bannerData.bgText})`,
        }"
        class="banner-text"
      ></div>
      <div v-if="bannerData.signUpTitle" data-aos="fade-up">
        <a :href="bannerData.signUpHref">
          <OButton animation class="home-banner-btn">
            {{ bannerData.signUpTitle }}
            <template #suffixIcon>
              <OIcon><IconArrowRight /></OIcon>
            </template>
          </OButton>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 360px;
  position: relative;
  .banner-image {
    height: 100%;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
  }
  .banner-panel-content {
    position: absolute;
    width: 100%;
    max-width: 1504px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 44px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    @include respond-to('<=laptop') {
      padding: 0 40px;
    }

    .banner-text {
      width: 355px;
      height: 166px;
      background-size: contain;
      background-repeat: no-repeat;

      @include respond-to('pad_v-laptop') {
        width: 284px;
        height: 133px;
      }
      @include respond-to('pad_v') {
        width: 213px;
        height: 100px;
      }
    }
  }
}
.home-banner-btn {
  border-color: #000;
  color: #000;
  padding: 11px 13px 11px 25px;
  margin-top: var(--o-gap-4);
}

@include respond-to('<=pad') {
  .banner {
    height: 270px;
    .banner-image {
      height: 100%;
      margin: 0 auto;
      background: no-repeat center/cover;
    }
  }
}

@include respond-to('<=pad_v') {
  .banner {
    height: 180px;
    .banner-image {
      height: 100%;
      margin: 0 auto;
      background: cover;
    }
    .banner-panel-content {
      position: absolute;
      min-width: 200px;
      height: 100%;
      top: 0;
      left: 0;
      transform: translateX(0);
      padding: 0 32px;
    }
  }
  .home-banner-btn {
    padding: 3px 11px;
    margin-top: 8px;
  }
}

@include respond-to('phone') {
  .banner {
    height: 180px;
    .banner-image {
      height: 100%;
      margin: 0 auto;
      background: cover;
    }
    .banner-panel-content {
      display: none;
    }
  }
  .home-banner-btn {
    display: none;
  }
}
</style>
