<template>
  <div class="detail">
    <div class="detail-para">
      <p class="detail-para-title">1、Compact Numa Aware (CNA) spinlock 功能支持</p>
      <div class="detail-para-one">
        支持CNA spinlock功能，使qspinlock在不同NUMA节点上的CPU竞争spinlock时，尽量将锁交给同一NUMA节点的CPU，以减少跨NUMA的次数。开启该功能后，sysbench测试中可以获得10%以上的性能提升。
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">2、虚拟机启动优化</p>
      <div class="detail-para-one">
        优化irqbypass列表遍历和锁争用，加速高密度场景下虚拟机的并发启动。
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">3、memcg THP control</p>
      <div class="detail-para-one">
        通过在cgroup中添加THP的控制，解决THP（Transparent Huge Pages）带来的内存性能优化和增加内存负担的矛盾。
      </div>
    </div>
    
    <div class="detail-para">
      <p class="detail-para-title">4、UKFEF</p>
      <div class="detail-para-one">
        支持UKFEF功能，系统可以对各种可能引发系统异常事件进行统计，并自动评估事件的严重程度，方便开发和运维人员定位问题。
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">5、性能调优</p>
      <div class="detail-para-one">
        将容器网络namespace中的net.core.somaxconn缺省值调至4096，减少高并发情况下半连接队列满的丢包问题；
      关闭cgroup.memory，使能后会在slab管理的page分配和释放流程上增加额外的处理逻辑，对性能造成影响；
      使能iommu.passthrough，在物理机环境中，减少页表映射的转换。
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">6、支持线程 NAPI</p>
      <div class="detail-para-one">
        通过为每个支持NAPI的网络接口创建独立的内核线程，NAPI轮询工作可以从原先的软中断上下文切换到内核线程上下文中进行，从而提高网络资源的管理效率。
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">7、支持pagecache limit 功能</p>
      <div class="detail-para-one">
        提供一种限制page cache的能力，能够对page cache的总量进行控制, 增强系统在数据库等page cache占比较高场景下的稳定性。
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "style";
</style>