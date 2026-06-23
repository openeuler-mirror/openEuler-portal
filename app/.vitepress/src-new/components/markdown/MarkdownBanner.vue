<script setup lang="ts">
import { onMounted, useSlots } from 'vue';
import AOS from 'aos';
import { OButton, OIcon } from '@opensig/opendesign';
import IconOutlink from '~icons/app-new/icon-outlink-new.svg';

import { useScreen } from '~@/composables/useScreen';

const { lePadV } = useScreen();

const slots = useSlots();

const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  }
});

onMounted(() => {
  AOS.init();
});

const isSelfDomain = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    const selfDomains = ['www.openeuler.org', 'www.openeuler.openatom.cn'];
    return selfDomains.includes(hostname);
  } catch (error) {
    return false;
  }
}
</script>

<template>
  <div class="banner-markdown">
    <img :src="props.data[0]?.src" class="banner-bg" />
    <div class="wrap">
      <div
        class="banner-text"
        data-aos="fade-up"
        data-aos-once="true"
        data-aos-duration="800"
      >
        <div class="banner-default">
          <p class="banner-title" v-if="props.data[1]?.content">{{ props.data[1].content }}</p>
          <p class="banner-subtitle" v-if="props.data[2]?.content">{{ props.data[2].content }}</p>
        </div>

        <div v-if="props.data[3]?.type === 'a'" class="banner-btn">
          <OButton
            variant="solid"
            color="primary"
            :size="lePadV ? 'medium' : 'large'"
            :href="props.data[3]?.link"
            target="_blank"
          >
            {{ props.data[3]?.content }}
            <template #suffix v-if="!isSelfDomain(props.data[3]?.link)"><OIcon><IconOutlink /></OIcon></template>
          </OButton>
          <OButton
           v-if="props.data[4]?.type === 'a'"
            variant="outline"
            color="primary"
            :size="lePadV ? 'medium' : 'large'"
            class="certificate-btn"
            :href="props.data[4]?.link"
            target="_blank"
          >
            {{ props.data[4]?.content }}
            <template #suffix v-if="!isSelfDomain(props.data[4]?.link)"><OIcon><IconOutlink /></OIcon></template>
          </OButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 公共样式 mixin
@mixin mixin-title {
  color: rgba(var(--o-black));
  position: relative;
  z-index: 1;
  margin-bottom: 0;
  font-weight: 500;
  @include display2;
}

@mixin mixin-subtitle {
  position: relative;
  color: rgba(var(--o-black));
  margin-top: var(--o-gap-2);
  z-index: 1;
  font-weight: unset;
  @include text2;
}

.dark {
  .banner-bg {
    filter: brightness(0.8) grayscale(0.2) contrast(1.2);
  }

  .banner-markdown {
    background-color: var(--o-color-primary1);
  }
}

.banner-markdown {
  position: relative;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: var(--o-color-primary1);

  .banner-bg {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    user-select: none;
  }

  .wrap {
    position: relative;
    max-width: var(--layout-content-max-width);
    padding: 0 var(--layout-content-padding);
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 280px;

    @media screen and (max-width: 1680px) {
      height: 220px;
    }

    @media screen and (max-width: 1200px) {
      height: 180px;
    }

    .banner-text {
      display: flex;
      flex-direction: column;
      position: relative;
      max-width: 60%;
      
      .banner-title {
        @include mixin-title;
      }

      .banner-subtitle {
        @include mixin-subtitle;
      }

      .banner-default {
        :deep(h1) {
          @include mixin-title;
        }

        :deep(h2) {
          @include mixin-subtitle;
        }
      }
    }

    .banner-btn {
      display: flex;
      flex-wrap: wrap;
      .o-btn {
        margin-top: var(--o-gap-5);
        &:first-child {
          margin-right: 24px;
        }
      }
      .o-icon {
        --icon-size: 24px;
      }
    }
  }
}

@include respond('<=laptop') {
  .banner-markdown {
    .wrap {
      .banner-btn {
        .o-btn {
          &:first-child {
            margin-right: 16px;
          }
        }
        .o-icon {
          --icon-size: 16px;
        }
      }
    }
  }
}

// 移动端样式
@include respond('<=pad_v') {
  .banner-markdown {
    background-color: unset;
    
    .banner-bg {
      display: none;
    }
    
    .wrap {
      height: auto;
      margin-top: var(--o-gap-5);

      .banner-text {
        max-width: 100%;

        // 移动端 h1 样式
        h1,
        .banner-title {
          color: var(--o-color-info1);
          @include display1;
        }

        .banner-subtitle {
          color: var(--o-color-info2);
          margin-top: var(--o-gap-2);
          @include text1;
        }
      }
    }
  }
}

@include respond('phone') {
  .banner-markdown {
    .wrap {
      .banner-btn {
        .o-btn {
          margin-top: 12px;
        }
      }
    }
  }
}
</style>
