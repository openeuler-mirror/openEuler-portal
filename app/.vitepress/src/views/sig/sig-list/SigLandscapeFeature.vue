<script setup lang="ts">
import { PropType } from 'vue';
import { FeatureInfoT } from '@/shared/@types/type-sig';

defineProps({
  info: {
    type: Array as PropType<FeatureInfoT[]>,
    default: () => {
      return [];
    },
  },
});
const emits = defineEmits(['sig-click']);

const handleSigClick = (sigName: string) => {
  emits('sig-click', sigName);
};
</script>

<template>
  <div class="landscape-feature">
    <div
      v-for="feature in info"
      :key="feature.featureName"
      class="landscape-feature-item"
    >
      <div class="feature-item-title">{{ feature.featureName }}</div>
      <ul class="feature-item-sig">
        <li
          v-for="sig in feature.sigs"
          :key="sig"
          class="sig-item"
          @click="handleSigClick(sig)"
        >
          {{ sig }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.landscape-feature {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  column-gap: var(--e-spacing-h6);
  .landscape-feature-item {
    max-width: 180px;
    &:nth-child(1) {
      .feature-item-title {
        background-color: #7f6bbe;
      }
    }
    &:nth-child(2) {
      .feature-item-title {
        background-color: #4d7dff;
      }
    }
    &:nth-child(3) {
      .feature-item-title {
        background-color: #db7c61;
      }
    }
    &:nth-child(4) {
      .feature-item-title {
        background-color: #8e9aaf;
      }
    }
    &:nth-child(5) {
      .feature-item-title {
        background-color: #505d75;
      }
    }
    &:nth-child(6) {
      .feature-item-title {
        background-color: #2a9d8f;
      }
    }
    &:nth-child(7) {
      .feature-item-title {
        background-color: #fec456;
      }
    }

    .feature-item-title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 18px;
      height: 80px;
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      color: var(--e-color-white);
      text-align: center;
      word-break: break-all;
    }
    .feature-item-title-en {
      font-size: var(--e-font-size-text);
    }

    .feature-item-sig {
      margin-top: var(--e-spacing-h5);
      .sig-item {
        & + .sig-item {
          margin-top: var(--e-spacing-h5);
        }
        cursor: pointer;
        width: 100%;
        text-align: center;
        padding: 0 23px;
        height: 46px;

        font-size: var(--e-font-size-text);
        line-height: 46px;
        color: #002fa7;
        border: 1px solid #002fa7;
        background-color: #ffffff;
        transition: all 0.3s;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;

        &:hover {
          background: #002fa7;
          color: #ffffff;
          transform: scale(1.05, 1.05);
        }
      }
    }
  }
}

.dark {
  .landscape-feature {
    .landscape-feature-item {
      .feature-item-sig {
        .sig-item {
          color: #ffffff;
          background: #383838;
          border: 1px solid #b2b2b2;

          &:hover {
            background: #406fe7;
            color: #ffffff;
            border-color: #406fe7;
          }
        }
      }
    }
  }
}
</style>
