<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { onMounted, ref } from 'vue';

import SigLandscapeFeature from './SigLandscapeFeature.vue';

import { getSigLandscape } from '@/api/api-sig';

import { GroupInfoT } from '@/shared/@types/type-sig';

const configData = useData();
const router = useRouter();
const language = configData.lang;

const toSigDetail = (name: string): void => {
  router.go(`/${language.value}/sig/sig-detail/?name=${name}`);
};

const landscapeInfo = ref<GroupInfoT[]>([]);

onMounted(async () => {
  try {
    landscapeInfo.value = await getSigLandscape(language.value);
  } catch (err: any) {
    throw new Error(err);
  }
});
</script>

<template>
  <div class="landscape">
    <div
      v-for="group in landscapeInfo"
      :key="group.groupName"
      class="landscape-group"
    >
      <p class="landscape-group-title">{{ group.groupName }}</p>
      <SigLandscapeFeature
        :info="group?.features"
        @sig-click="toSigDetail"
      ></SigLandscapeFeature>
    </div>
  </div>
</template>

<style scoped lang="scss">
.landscape {
  margin-top: var(--e-spacing-h2);

  .landscape-group {
    & + .landscape-group {
      margin-top: var(--e-spacing-h2);
    }

    .landscape-group-title {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height7);
      margin-bottom: var(--e-spacing-h4);
      color: var(--e-color-text1);
    }

    &:nth-child(2) {
      :deep(.landscape-feature .landscape-feature-item) {
        &:nth-child(1) {
          .feature-item-title {
            background-color: #8e583d;
          }
        }
        &:nth-child(2) {
          .feature-item-title {
            background-color: #73c0de;
          }
        }
        &:nth-child(3) {
          .feature-item-title {
            background-color: #cec79a;
          }
        }
        &:nth-child(4) {
          .feature-item-title {
            background-color: #4c3e72;
          }
        }
        &:nth-child(5) {
          .feature-item-title {
            background-color: #19647e;
          }
        }
        &:nth-child(6) {
          .feature-item-title {
            background-color: #c44e4e;
          }
        }
      }
    }
  }
}
</style>
