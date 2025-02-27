<template>
  <div class="detail">
    <div class="detail-para">
      <span>
        Rubik是一个自适应单机算力调优和服务质量保障的容器混部引擎，NestOS For
        Container版本已预开启Rubik在离线混部相关内核特性，支持基于rubik容器混部引擎的整体解决方案，通过对资源进行合理调度与隔离，在保障关键业务服务质量的前提下极大提升容器云场景资源利用率。
      </span>
      <img src="@/assets/nestos/arch/four.png" />
    </div>

    <div class="detail-para">
      <span>
        在NestOS For
        Container版本针对容器场景在离线混合部署进行了多项优化，其中包括：
      </span>

      <div>
        <p class="detail-para-title">1、preemption绝对抢占</p>
        <div class="detail-para-one">
          <p>○ CPU绝对抢占</p>
          <p>○ 内存绝对抢占</p>
        </div>
      </div>
      <p class="detail-para-title">2、dynCache 访存带宽和LLC限制</p>
      <p class="detail-para-title">3、dynMemory 内存异步分级回收</p>
      <div>
        <p class="detail-para-title">4、支持弹性限流</p>
        <div class="detail-para-one">
          <p>○ quotaBurst 支持弹性限流内核态解决方案</p>
          <p>○ quotaTurbo 支持弹性限流用户态解决方案</p>
        </div>
      </div>
      <p class="detail-para-title">5、ioCost 支持iocost对IO权重控制</p>
      <p class="detail-para-title">6、PSI 支持基于PSI指标的干扰检测</p>
    </div>

    <div class="detail-para">
      未来NestOS还将继续在在离线混部道路上实践，探索更多混部场景下提升资源利用率的手段和技术。
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import 'style';
</style>
