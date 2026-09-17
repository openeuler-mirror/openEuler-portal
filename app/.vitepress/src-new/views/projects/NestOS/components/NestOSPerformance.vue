<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { OLink } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import nestosContent from '#content/nestos';

const { t } = useLocale();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: any = null;
let mounted = false;

const xList = computed(() => nestosContent.zh.performance_x_list);
const yList = computed(() =>
  nestosContent.zh.performance_y_list.map((item) => {
    const { line_style, ...rest } = item;
    return line_style ? { ...rest, lineStyle: line_style } : rest;
  })
);
const comparisionUrl = computed(() => nestosContent.zh.performance_comparison_url);

const handleResize = () => {
  chartInstance?.resize();
};

onMounted(() => {
  mounted = true;
  import('echarts').then((echarts) => {
    if (!mounted || !chartRef.value) return;

    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--o-color-info1').trim();
    const labelColor = style.getPropertyValue('--o-color-info2').trim();
    const borderColor = style.getPropertyValue('--o-color-control4').trim();

    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption({
      title: {
        text: '网口宽带占用率',
        textStyle: {
          fontSize: 14,
          fontWeight: 500,
          color: textColor,
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '2%',
        right: '2%',
        containLabel: true,
      },
      legend: {
        bottom: 0,
        left: 'center',
        icon: 'rect',
        itemHeight: 6,
        itemWidth: 20,
        textStyle: { fontSize: 12, color: labelColor },
      },
      xAxis: {
        data: xList.value,
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: labelColor },
      },
      yAxis: {
        name: '占用率（%）',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
        axisLabel: { color: labelColor },
      },
      series: yList.value,
      color: ['#a00000', '#FF0087', '#13663a', '#49C066', '#1450B8', '#37A2FF'],
    });

    window.addEventListener('resize', handleResize);
  });
});

onBeforeUnmount(() => {
  mounted = false;
  window.removeEventListener('resize', handleResize);
  chartInstance?.dispose();
  chartInstance = null;
});
</script>

<template>
  <AppSection :title="t('nestos.performanceTitle')">
    <div class="performance-card">
      <div ref="chartRef" class="performance-chart"></div>
      <p class="performance-note">
        {{ t('nestos.performanceTips') }}
        <OLink
          :href="comparisionUrl"
          target="_blank" rel="noopener noreferrer"
          color="primary"
          hover-underline
          class="performance-link"
        >{{ t('nestos.performanceTipsText') }}</OLink>
      </p>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.performance-card {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 32px;
}

.performance-chart {
  width: 100%;
  height: 350px;
}

.performance-note {
  margin-top: 16px;
  color: var(--o-color-info3);
  @include tip2;
}

@include respond('laptop') {
  .performance-card {
    padding: 24px;
  }
}

@include respond('pad_h') {
  .performance-card {
    padding: 20px;
  }
}

@include respond('<=pad_v') {
  .performance-card {
    padding: 16px;
  }
}
</style>
