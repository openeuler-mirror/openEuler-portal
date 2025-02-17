<template>
  <div class="detail">
    <div class="detail-para">
      x2nestos是一款将通用形态操作系统转换为 NestOS For Container
      版本的快捷部署工具。NestOS For
      Virt版本默认集成，也可通用于以yum或apt主流包管理器管理的其他通用linux操作系统。该工具基于kexec动态加载内核特性，实现跳过引导阶段完成操作系统部署，有效降低现有集群转换为NestOS
      For Container难度和成本。
    </div>
    <div class="detail-para">
      <p class="detail-para-title">●适用场景：</p>
      <div class="detail-para-one">
        <p>1.现有容器云场景用户大规模批量转换场景</p>
        <p>2.无BMC，不方便实地重新引导安装的远程环境</p>
        <p>3.限制使用自定义镜像安装的云主机环境</p>
        <p>4.个人爱好者尝鲜</p>
      </div>
    </div>
    <div class="detail-para">
      <p class="detail-para-title">●限制说明：</p>
      <div class="detail-para-one">
        <p>1.本转换工具非迁移工具，不保留磁盘数据</p>
        <p>2.此转换不可逆</p>
        <p>3.使用本工具时需保留足够空闲内存（推荐>2G）</p>
      </div>
    </div>
    <div class="detail-para">
      <p class="detail-para-title">●效果演示</p>
      <div class="detail-para-one">
        <p>
          <span>○转换前</span><br />
          <img src="@/assets/nestos/arch/six_before.png" />
        </p>
        <p>
          <span>○转换后</span><br />
          <img src="@/assets/nestos/arch/six_after.png" />
        </p>
      </div>
    </div>
    <div class="detail-para">
      <p class="detail-para-title">●详细说明请参阅：</p>
      <div class="detail-para-one">
        <a href="https://gitee.com/openeuler/x2nestos"
          >https://gitee.com/openeuler/x2nestos</a
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import 'style';
</style>
