<template>
  <div class="detail">
    <div class="detail-para">
      nestos-kubernetes-deployer简称NKD，是基于NestOS部署kubernetes集群运维而准备的解决方案。其目标是在集群外提供对集群基础设施（包括操作系统和K8S基础组件）的部署、更新和配置管理等服务。
    </div>

    <div class="detail-para">
      <p class="detail-para-title">1、NKD的整体架构：</p>
      <div class="detail-para-one">
        <p>
          ●
          主体模块NKDS（NestOS-kubernetes-deployer-service）：包括部署集群所需的基础设施管理和配置管理，创建系统点火阶段所需的Ignition文件；
        </p>
        <p>
          <span
            >● 升级模块housekeeper：包括部署到集群中HKO (housekeeper
            operator)，与集成到系统镜像中的HKD（housekeeper daemon）组件；</span
          >
          <img src="@/assets/nestos/arch/three_1.png" />
        </p>
        <p>
          ●
          NKD根据集群需求，连接基础设施提供商动态创建所需的IaaS资源，支持裸金属和虚拟化场景，目前优先实现openstack场景。
        </p>
      </div>
    </div>
    <div class="detail-para">
      <p class="detail-para-title">2、效果演示：</p>
      <div class="detail-para-one">
        <div>
          <span>● 演示环境</span>
          <div class="detail-para-one_one">
            <p>(1) master、worker节点各部署三个实例</p>
            <p>(2) NestOS版本：NestOS For Container 22.03_LTS_SP2</p>
          </div>
        </div>

        <div>
          <span>● 部署集群基础设施</span>
          <img src="@/assets/nestos/arch/three_2.png" />
        </div>

        <div>
          <span>● 集群部署完成</span>
          <div class="detail-para-one_one">
            <p>
              <span>(1) 查看节点处于Ready状态</span>
              <img src="@/assets/nestos/arch/three_3.png" />
            </p>
            <p>
              <span>(2) 查看Pod处于running状态</span>
              <img src="@/assets/nestos/arch/three_4.png" />
            </p>
          </div>
        </div>

        <div>
          <span>● 集群版本升级</span>
          <div class="detail-para-one_one">
            <p>
              <span>(1) K8S版本升级前</span>
              <img src="@/assets/nestos/arch/three_5.png" />
            </p>
            <p>
              <span>(2) K8S版本升级后</span>
              <img src="@/assets/nestos/arch/three_6.png" />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-para">
      <p class="detail-para-title">3、说明</p>
      <div class="detail-para-one">
        <p>
          <span>● 项目地址&详细说明：</span>
          <a href="https://gitee.com/openeuler/nestos-kubernetes-deployer"
            >https://gitee.com/openeuler/nestos-kubernetes-deployer</a
          >
        </p>
        <p>● NKD目前仅处于演示阶段，暂不适用于生产环境。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import 'style';
</style>
