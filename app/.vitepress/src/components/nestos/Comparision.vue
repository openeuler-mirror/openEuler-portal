<template>
  <div class="compare box_shadow">
    <div id="profitNum" :style="{ width: '100%', height: '350px' }"></div>
    <p class="detail">
      {{ i18n.nestos.compare.detail
      }}<span class="compare_link" @click="goLink">{{
        i18n.nestos.compare.url_text
      }}</span>
    </p>
  </div>
</template>

<script setup>
import { comparision_url } from './utils/resource';
import { reactive, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { useI18n } from '@/i18n';

const i18n = useI18n();
// 跳转到性能对比详情页面
const goLink = () => {
  window.open(comparision_url, '_blank');
};
const state = reactive({
  xList: ['100*create', '100*start', '100*stop', '100*rm'],
  yList: [
    {
      name: 'Podman3.4.4(NestOS)',
      type: 'line',
      data: [3436, 5496, 2516, 2971],
    },
    {
      name: 'Podman3.4.4(CentOS8)',
      type: 'line',
      lineStyle: {
        type: 'dotted',
      },
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
      lineStyle: {
        type: 'dotted',
      },
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
      lineStyle: {
        type: 'dotted',
      },
      data: [2919, 18400, 465, 6838],
    },
  ],
});
onMounted(() => {
  nextTick(() => {
    brokenLine(
      state.xList,
      state.yList,
      'profitNum',
      'NestOS For Container-容器性能测试'
    );
  });
});

function brokenLine(xList, yList, id, title = '折线图') {
  // 参数解释：
  // xList => X轴数据
  // yList => y轴数据
  // id => 对应html中DOM元素的id
  // title => 图表标题，非必填

  //每次加载之前，先移除上一次的图表，防止页面跳转后再次返回没有加载图表问题。
  echarts.init(document.getElementById(id)).dispose();

  //初始化画布
  let chartEle = echarts.init(document.getElementById(id));

  // 加载数据绘制图表
  chartEle.setOption({
    title: { text: title },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '2%',
      right: '2%',
      containLabel: true,
    },
    legend: {
      bottom: 15,
      left: 'center',
      icon: 'rect',
      itemHeight: 6,
      itemWidth: 20,
    },
    xAxis: {
      data: xList,
    },
    yAxis: {},
    series: yList,
    color: ['#a00000', '#FF0087', '#13663a', '#49C066', '#1450B8', '#37A2FF'],
  });

  // 自适应大小
  window.onresize = function () {
    chartEle.resize();
  };
}
</script>

<style lang="scss" scoped>
.compare {
  background-color: var(--o-color-fill2);
  padding: 20px;

  .detail {
    font-size: 14px;
    font-weight: bold;
    color: var(--o-color-text1);

    .compare_link {
      &:hover {
        cursor: pointer;
        color: #002f9c;
      }
    }
  }
}
</style>
