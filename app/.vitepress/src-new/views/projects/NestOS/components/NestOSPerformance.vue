<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { OLink } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

const { t } = useLocale();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: any = null;
let mounted = false;

const xList = ['100*create', '100*start', '100*stop', '100*rm'];
const yList = [
  {
    name: 'Podman3.4.4(NestOS)',
    type: 'line',
    data: [3436, 5496, 2516, 2971],
  },
  {
    name: 'Podman3.4.4(CentOS8)',
    type: 'line',
    lineStyle: { type: 'dotted' },
    data: [6761, 10130, 2532, 3141],
  },
  {
    name: 'iSulad2.1.2(NestOS)',
    type: 'line',
    data: [858, 1885, 457, 501],
  },
  {
    name: 'iSulad2.1.2(CentOS8)',
    type: 'line',
    lineStyle: { type: 'dotted' },
    data: [882, 2123, 497, 566],
  },
  {
    name: 'Docker18.09(NestOS)',
    type: 'line',
    data: [1375, 7397, 1052, 1116],
  },
  {
    name: 'Docker18.09(CentOS8)',
    type: 'line',
    lineStyle: { type: 'dotted' },
    data: [2919, 18400, 465, 6838],
  },
];

const comparisionUrl =
  'https://atomgit.com/openeuler/NestOS/blob/master/docs/zh/usr_manual/%E6%80%A7%E8%83%BD%E5%AF%B9%E6%AF%94%E6%B5%8B%E8%AF%95.md';

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
        data: xList,
        axisLine: { lineStyle: { color: borderColor } },
        axisLabel: { color: labelColor },
      },
      yAxis: {
        name: '占用率（%）',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
        axisLabel: { color: labelColor },
      },
      series: yList,
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
          target="_blank"
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

@include respond-to('laptop') {
  .performance-card {
    padding: 24px;
  }
}

@include respond-to('pad_h') {
  .performance-card {
    padding: 20px;
  }
}

@include respond-to('<=pad_v') {
  .performance-card {
    padding: 16px;
  }
}
</style>
