<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useCommon } from '@/stores/common';

import IconMoonLight from '~icons/app/sun.svg';
import IconMoonDark from '~icons/app/moon.svg';

// device是否是pc、mobile
defineProps({
  device: {
    type: Boolean,
    default: true,
  },
});

const commonStore = useCommon();
// const { t } = useI18n();

const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
const mobileTheme = ref(!isLight.value);
</script>

<template>
  <div class="theme-box">
    <div v-if="device" class="theme-box-pc">
      <OIcon class="icon">
        <IconMoonDark v-if="isLight" />
        <IconMoonLight v-else />
      </OIcon>
    </div>
    <div v-else class="theme-box-mobile">
      <el-switch
        v-model="mobileTheme"
        size="large"
        active-text="dark"
        inactive-text="light"
        active-color="#00685a"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.theme-box {
  &-pc {
    cursor: pointer;
    .icon {
      font-size: var(--o-font-size-h5);
      color: var(--o-color-text2);
    }
  }
  &-mobile {
    :deep(.el-switch) {
      .el-switch__label {
        color: var(--o-color-text3) !important;
      }
      .el-switch__label.is-active {
        color: var(--o-color-brand) !important;
        font-weight: 600;
      }
    }
  }
}
.dark {
  .icon {
    color: var(--o-color-text2);
  }
}
</style>
