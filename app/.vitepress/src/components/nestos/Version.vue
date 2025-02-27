<template>
  <div class="version">
    <div class="version-btn">
      <div class="version-btn_style" @click="changeVersion('container')">
        NestOS For Container
      </div>
      <div class="version-btn_style" @click="changeVersion('virt')">
        NestOS For Virt
      </div>
    </div>
    <div class="version-content">
      <div class="version-content-text">
        <span class="version-content-text_title">{{
          i18n.nestos.version[verLink[version].TITLE]
        }}</span>
        <p class="version-content-text_desc">
          {{ i18n.nestos.version[verLink[version].DESC] }}
        </p>
      </div>
      <!-- virt 暂时没有图片， 不展示 -->
      <div v-if="verLink[version].BTN !== 'virt'" class="version-content-img">
        <img class="archImg" :src="verLink[version].IMG" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { verLink } from './utils/resource';
import { useI18n } from '@/i18n';

const i18n = useI18n();

const version = ref('0');

function changeVersion(type) {
  type === 'virt' ? (version.value = 1) : (version.value = 0);
}
</script>

<style lang="scss" scoped>
.version {
  width: 100%;

  &-btn {
    display: flex;
    justify-content: center;
    cursor: pointer;
    margin-bottom: var(--o-gap-4);

    &_style {
      @include h3;
      min-width: 120px;
      padding: var(--o-gap-3);
      background: var(--o-color-primary1);
      color: #fff;
      text-align: center;
      border-radius: var(--o-radius-m);
      border: 1px solid #012fa6;

      & + .version-btn_style {
        margin-left: var(--o-gap-4);
      }
    }
  }

  &-content {
    display: flex;
    justify-content: space-around;

    &-text {
      flex: 1;
      background: var(--o-color-fill2);
      box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
      padding: var(--o-gap-5) var(--o-gap-6);
      background-image: url('@/assets/nestos/resource/group.png');

      &_title {
        @include h1;
      }
      &_desc {
        @include h4;
      }
    }

    &-img {
      width: 520px;
      background: var(--o-color-fill2);
      box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
      margin-left: var(--o-gap-5);
      padding: var(--o-gap-5);
      text-align: center;

      img {
        width: 90%;
        background: #e4e4e4;
        padding: var(--o-gap-4);
      }
    }

    @include respond-to('<=pad') {
      flex-direction: column;

      .version-content-img {
        margin-left: 0;
        width: 100%;
        margin-top: var(--o-gap-3);
      }
    }
  }
}
</style>
