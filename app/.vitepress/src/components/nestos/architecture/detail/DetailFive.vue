<template>
  <div class="detail">
    <div class="detail-para">
      NestOS for
      Containers，作为基于不可变基础设施思想的容器云底座操作系统，将文件系统作为一个整体进行分发和更新。这一方案在运维与安全方面带来了巨大的提升。然而，在实际生产环境中，官方发布的版本往往难以满足用户的需求，因此需要更方便的定制手段。现NestOS
      For Container集成ostree native
      container特性，可使容器云场景用户利用熟悉的技术栈，只需编写一个ContainerFile(Dockerfile)文件，即可轻松构建定制版镜像，用于自定义集成组件或后续的升级维护工作。
    </div>

    <div class="detail-para">
      <p class="detail-para-title">● 简要定制步骤</p>
      <div class="detail-para-one">
        <p>1.选择与已部署环境相同发布流和架构的NestOS容器镜像作为base镜像</p>
        <div>
          <span>2.编写Containerfile(Dockerfile)文件，示例如下：</span>
          <div class="detail-para-code">
            <p>
              FROM
              hub.oepkgs.net/nestos/nestos-test:22.03-LTS-SP2.20230922.0-x86_64
            </p>
            <p># 执行自定义构建步骤，例如安装软件或拷贝自构建组件</p>
            <p>
              RUN rpm-ostree install strace && rm -rf /var/cache && ostree
              container commit
            </p>
          </div>
          <p>
            3.执行docker build或集成于CICD中构建相应镜像，推送至Registry以备使用
          </p>
        </div>
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">● 简要部署步骤</p>
      <div class="detail-para-one">
        <p>
          1.假设上述步骤构建容器镜像被推送为hub.oepkgs.net/nestos/nestos-test:demo-strace
        </p>
        <div>
          <span>2.在已部署NestOS For Container的环境中执行如下命令：</span>
          <div class="detail-para-code">
            <p>
              sudo rpm-ostree rebase
              ostree-unverified-registry:hub.oepkgs.net/nestos/nestos-test:demo-strace
              --bypass-driver
            </p>
          </div>
          <p>3.重新引导后完成定制版本部署</p>
        </div>
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">● 效果展示</p>
      <div class="detail-para-one">
        <p>
          <span>○ 部署过程</span>
          <img src="@/assets/nestos/arch/five_1.png" />
        </p>
        <p>
          <span>○ 完成部署</span>
          <img src="@/assets/nestos/arch/five_2.png" />
        </p>
      </div>
    </div>

    <div class="detail-para">
      <p class="detail-para-title">● 详细说明请参阅</p>
      <p>
        <a
          href="https://gitee.com/openeuler/NestOS/blob/master/docs/zh/usr_manual/NestOS-For-Container%E4%BB%A5OCI%E6%96%B9%E5%BC%8F%E5%AE%9A%E5%88%B6%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.md"
          >NestOS For Container以OCI方式定制使用手册</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import 'style';
</style>
