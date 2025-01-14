<script setup lang="ts">
import { computed } from 'vue';

import repoData from '~@/data/download/repo-size';

import { OTable } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { t } = useLocale();
const { lePadV } = useScreen();

const splitArrayInHalf = (arr: { release: string; size: string }[]) => {
  const mid = Math.ceil(arr.length / 2); // 找到中间位置，向上取整以保证奇数时前一半多一个
  const firstHalf = arr.slice(0, mid); // 从开头到中间
  const secondHalf = arr.slice(mid); // 从中间到结尾
  return [firstHalf, secondHalf]; // 返回结果
};

const renderDatas = computed(() => {
  if (lePadV.value) {
    return [repoData];
  }
  return splitArrayInHalf(repoData);
});

const columns = [
  { label: t('download.MIRROR_ALL_RELEASE'), key: 'release' },
  {
    label: t('download.MIRROR_ALL_SIZE'),
    key: 'size',
  },
];
</script>

<template>
  <AppSection :title="$t('download.sizeTitle')" class="mirror-siez">
    <p class="mirror-text">
      {{ t('download.sizeTip') }}
    </p>
    <!-- 表格 -->
    <div class="mirror-size">
      <template v-if="!lePadV">
        <OTable
          v-for="(renderData, index) in renderDatas"
          :key="index"
          :data="renderData"
          :columns="columns"
          border="row-frame"
        >
        </OTable>
      </template>

      <!-- 移动端 -->
      <div
        v-else
        class="table-mo"
        v-for="(renderData, index) in renderDatas"
        :key="index"
      >
        <div
          v-for="content in renderData"
          :key="content.release"
          class="table-content"
        >
          <span>
            {{ content.release }}
          </span>
          <span>
            {{ content.size }}
          </span>
        </div>
      </div>
    </div>
  </AppSection>
</template>
<style lang="scss" scoped>
.mirror-text {
  @include text1;
  color: var(--o-color-info1);
  text-align: center;
}

.mirror-size {
  margin-top: 40px;
  padding: 32px;
  background-color: var(--o-color-fill2);
  display: flex;
  gap: 32px;
  border-radius: var(--o-radius-xs);
  @include respond-to('<=pad_v') {
    margin-top: 24px;
    padding: 12px;
  }
  .o-table {
    &:last-child {
      :deep(tr.last) {
        font-weight: 500;
      }
    }
  }
}

.o-table {
  width: 100%;
}

.table-mo {
  width: 100%;
  padding: 0 12px;
  border: 1px solid var(--o-color-control4);
  border-radius: var(--o-radius-xs);
  .table-content {
    display: flex;
    padding: 12px;
    justify-content: space-between;
    @include text2;
    font-weight: 500;
    border-bottom: 1px solid var(--o-color-control4);
    &:last-child {
      border-bottom: none;
    }
  }
}
.app-section {
  --o-gap-t2c: 16px;
}
</style>
