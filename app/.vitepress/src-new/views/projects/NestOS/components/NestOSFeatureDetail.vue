<script lang="ts" setup>
import { computed } from 'vue';
import { OBreadcrumb, OBreadcrumbItem, ORow, OCol, OLink } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import two_1 from '@/assets/nestos/arch/two_1.png';
import two_2 from '@/assets/nestos/arch/two_2.png';
import two_3 from '@/assets/nestos/arch/two_3.png';
import three_1 from '@/assets/nestos/arch/three_1.png';
import three_2 from '@/assets/nestos/arch/three_2.png';
import three_3 from '@/assets/nestos/arch/three_3.png';
import three_4 from '@/assets/nestos/arch/three_4.png';
import three_5 from '@/assets/nestos/arch/three_5.png';
import three_6 from '@/assets/nestos/arch/three_6.png';
import four from '@/assets/nestos/arch/four.png';
import five_1 from '@/assets/nestos/arch/five_1.png';
import five_2 from '@/assets/nestos/arch/five_2.png';
import six_before from '@/assets/nestos/arch/six_before.png';
import six_after from '@/assets/nestos/arch/six_after.png';

const { t } = useLocale();
const { lePadV, isPadVToLaptop } = useScreen();

const props = defineProps<{
  featureSlug: string;
}>();

interface FeatureItem {
  titleKey: string;
  descKey: string;
  sections: Section[];
}

interface Section {
  type: 'text' | 'heading' | 'list' | 'code' | 'image' | 'link';
  content?: string;
  items?: string[];
  src?: string;
  href?: string;
  children?: Section[];
}

const featureMap: Record<string, FeatureItem> = {
  kernel: {
    titleKey: 'nestos.feature1Title',
    descKey: 'nestos.feature1Desc',
    sections: [
      {
        type: 'heading',
        content: '1、Compact Numa Aware (CNA) spinlock 功能支持',
      },
      {
        type: 'text',
        content:
          '支持CNA spinlock功能，使qspinlock在不同NUMA节点上的CPU竞争spinlock时，尽量将锁交给同一NUMA节点的CPU，以减少跨NUMA的次数。开启该功能后，sysbench测试中可以获得10%以上的性能提升。',
      },
      { type: 'heading', content: '2、虚拟机启动优化' },
      {
        type: 'text',
        content: '优化irqbypass列表遍历和锁争用，加速高密度场景下虚拟机的并发启动。',
      },
      { type: 'heading', content: '3、memcg THP control' },
      {
        type: 'text',
        content:
          '通过在cgroup中添加THP的控制，解决THP（Transparent Huge Pages）带来的内存性能优化和增加内存负担的矛盾。',
      },
      { type: 'heading', content: '4、UKFEF' },
      {
        type: 'text',
        content:
          '支持UKFEF功能，系统可以对各种可能引发系统异常事件进行统计，并自动评估事件的严重程度，方便开发和运维人员定位问题。',
      },
      { type: 'heading', content: '5、性能调优' },
      {
        type: 'text',
        content:
          '将容器网络namespace中的net.core.somaxconn缺省值调至4096，减少高并发情况下半连接队列满的丢包问题；关闭cgroup.memory，使能后会在slab管理的page分配和释放流程上增加额外的处理逻辑，对性能造成影响；使能iommu.passthrough，在物理机环境中，减少页表映射的转换。',
      },
      { type: 'heading', content: '6、支持线程 NAPI' },
      {
        type: 'text',
        content:
          '通过为每个支持NAPI的网络接口创建独立的内核线程，NAPI轮询工作可以从原先的软中断上下文切换到内核线程上下文中进行，从而提高网络资源的管理效率。',
      },
      { type: 'heading', content: '7、支持pagecache limit 功能' },
      {
        type: 'text',
        content:
          '提供一种限制page cache的能力，能够对page cache的总量进行控制，增强系统在数据库等page cache占比较高场景下的稳定性。',
      },
    ],
  },
  pilotgo: {
    titleKey: 'nestos.feature2Title',
    descKey: 'nestos.feature2Desc',
    sections: [
      {
        type: 'text',
        content:
          'PilotGo是麒麟软件在openEuler社区孵化的插件式运维管理平台。本次PilotGo针对NestOS平台特性及最佳应用实践，为NestOS平台带来了定制化的运维管理功能及全新的架构感知插件特性。',
      },
      { type: 'heading', content: '功能概览：' },
      {
        type: 'list',
        items: [
          '1、NestOS平台双模式纳管及日常运维处理；',
          '2、单机资源及进程结构可视化；',
          '3、多机应用集群拓扑图展示。',
        ],
      },
      { type: 'heading', content: '效果展示：' },
      { type: 'text', content: '1、PilotGo 纳管 NestOS 系统；' },
      { type: 'image', src: two_1, content: 'PilotGo 纳管 NestOS' },
      { type: 'text', content: '2、集群拓扑展示；' },
      { type: 'image', src: two_2, content: '集群拓扑' },
      { type: 'text', content: '3、集群拓扑节点信息展示。' },
      { type: 'image', src: two_3, content: '集群拓扑节点信息' },
    ],
  },
  nkd: {
    titleKey: 'nestos.feature3Title',
    descKey: 'nestos.feature3Desc',
    sections: [
      {
        type: 'text',
        content:
          'nestos-kubernetes-deployer简称NKD，是基于NestOS部署kubernetes集群运维而准备的解决方案。其目标是在集群外提供对集群基础设施（包括操作系统和K8S基础组件）的部署、更新和配置管理等服务。',
      },
      { type: 'heading', content: '1、NKD的整体架构：' },
      {
        type: 'list',
        items: [
          '主体模块NKDS（NestOS-kubernetes-deployer-service）：包括部署集群所需的基础设施管理和配置管理，创建系统点火阶段所需的Ignition文件；',
          '升级模块housekeeper：包括部署到集群中HKO (housekeeper operator)，与集成到系统镜像中的HKD（housekeeper daemon）组件；',
          'NKD根据集群需求，连接基础设施提供商动态创建所需的IaaS资源，支持裸金属和虚拟化场景，目前优先实现openstack场景。',
        ],
      },
      { type: 'image', src: three_1, content: 'NKD架构图' },
      { type: 'heading', content: '2、效果演示：' },
      { type: 'heading', content: '演示环境' },
      {
        type: 'list',
        items: [
          '(1) master、worker节点各部署三个实例',
          '(2) NestOS版本：NestOS For Container 22.03_LTS_SP2',
        ],
      },
      { type: 'text', content: '部署集群基础设施' },
      { type: 'image', src: three_2, content: '部署集群基础设施' },
      { type: 'heading', content: '集群部署完成' },
      { type: 'text', content: '(1) 查看节点处于Ready状态' },
      { type: 'image', src: three_3, content: '节点Ready状态' },
      { type: 'text', content: '(2) 查看Pod处于running状态' },
      { type: 'image', src: three_4, content: 'Pod运行状态' },
      { type: 'heading', content: '集群版本升级' },
      { type: 'text', content: '(1) K8S版本升级前' },
      { type: 'image', src: three_5, content: '升级前' },
      { type: 'text', content: '(2) K8S版本升级后' },
      { type: 'image', src: three_6, content: '升级后' },
      { type: 'heading', content: '3、说明' },
      {
        type: 'link',
        content: '项目地址&详细说明：',
        href: 'https://atomgit.com/openeuler/nestos-kubernetes-deployer',
      },
      {
        type: 'text',
        content: 'NKD目前仅处于演示阶段，暂不适用于生产环境。',
      },
    ],
  },
  rubik: {
    titleKey: 'nestos.feature4Title',
    descKey: 'nestos.feature4Desc',
    sections: [
      {
        type: 'text',
        content:
          'Rubik是一个自适应单机算力调优和服务质量保障的容器混部引擎，NestOS For Container版本已预开启Rubik在离线混部相关内核特性，支持基于rubik容器混部引擎的整体解决方案，通过对资源进行合理调度与隔离，在保障关键业务服务质量的前提下极大提升容器云场景资源利用率。',
      },
      { type: 'image', src: four, content: 'Rubik混部架构' },
      {
        type: 'text',
        content:
          '在NestOS For Container版本针对容器场景在离线混合部署进行了多项优化，其中包括：',
      },
      { type: 'heading', content: '1、preemption绝对抢占' },
      {
        type: 'list',
        items: ['○ CPU绝对抢占', '○ 内存绝对抢占'],
      },
      { type: 'heading', content: '2、dynCache 访存带宽和LLC限制' },
      { type: 'heading', content: '3、dynMemory 内存异步分级回收' },
      { type: 'heading', content: '4、支持弹性限流' },
      {
        type: 'list',
        items: [
          '○ quotaBurst 支持弹性限流内核态解决方案',
          '○ quotaTurbo 支持弹性限流用户态解决方案',
        ],
      },
      { type: 'heading', content: '5、ioCost 支持iocost对IO权重控制' },
      { type: 'heading', content: '6、PSI 支持基于PSI指标的干扰检测' },
      {
        type: 'text',
        content:
          '未来NestOS还将继续在在离线混部道路上实践，探索更多混部场景下提升资源利用率的手段和技术。',
      },
    ],
  },
  'custom-image': {
    titleKey: 'nestos.feature5Title',
    descKey: 'nestos.feature5Desc',
    sections: [
      {
        type: 'text',
        content:
          'NestOS for Containers，作为基于不可变基础设施思想的容器云底座操作系统，将文件系统作为一个整体进行分发和更新。这一方案在运维与安全方面带来了巨大的提升。然而，在实际生产环境中，官方发布的版本往往难以满足用户的需求，因此需要更方便的定制手段。现NestOS For Container集成ostree native container特性，可使容器云场景用户利用熟悉的技术栈，只需编写一个ContainerFile(Dockerfile)文件，即可轻松构建定制版镜像，用于自定义集成组件或后续的升级维护工作。',
      },
      { type: 'heading', content: '简要定制步骤' },
      {
        type: 'list',
        items: [
          '1. 选择与已部署环境相同发布流和架构的NestOS容器镜像作为base镜像',
        ],
      },
      { type: 'text', content: '2. 编写Containerfile(Dockerfile)文件，示例如下：' },
      {
        type: 'code',
        content:
          'FROM hub.oepkgs.net/nestos/nestos-test:22.03-LTS-SP2.20230922.0-x86_64\n# 执行自定义构建步骤，例如安装软件或拷贝自构建组件\nRUN rpm-ostree install strace && rm -rf /var/cache && ostree container commit',
      },
      {
        type: 'text',
        content: '3. 执行docker build或集成于CICD中构建相应镜像，推送至Registry以备使用',
      },
      { type: 'heading', content: '简要部署步骤' },
      {
        type: 'text',
        content:
          '1. 假设上述步骤构建容器镜像被推送为hub.oepkgs.net/nestos/nestos-test:demo-strace',
      },
      { type: 'text', content: '2. 在已部署NestOS For Container的环境中执行如下命令：' },
      {
        type: 'code',
        content:
          'sudo rpm-ostree rebase ostree-unverified-registry:hub.oepkgs.net/nestos/nestos-test:demo-strace --bypass-driver',
      },
      { type: 'text', content: '3. 重新引导后完成定制版本部署' },
      { type: 'heading', content: '效果展示' },
      { type: 'text', content: '○ 部署过程' },
      { type: 'image', src: five_1, content: '部署过程' },
      { type: 'text', content: '○ 完成部署' },
      { type: 'image', src: five_2, content: '完成部署' },
      {
        type: 'link',
        content: '详细说明请参阅：NestOS For Container以OCI方式定制使用手册',
        href: 'https://atomgit.com/openeuler/NestOS/blob/master/docs/zh/usr_manual/NestOS-For-Container%E4%BB%A5OCI%E6%96%B9%E5%BC%8F%E5%AE%9A%E5%88%B6%E4%BD%BF%E7%94%A8%E6%89%8B%E5%86%8C.md',
      },
    ],
  },
  x2nestos: {
    titleKey: 'nestos.feature6Title',
    descKey: 'nestos.feature6Desc',
    sections: [
      {
        type: 'text',
        content:
          'x2nestos是一款将通用形态操作系统转换为 NestOS For Container 版本的快捷部署工具。NestOS For Virt版本默认集成，也可通用于以yum或apt主流包管理器管理的其他通用linux操作系统。该工具基于kexec动态加载内核特性，实现跳过引导阶段完成操作系统部署，有效降低现有集群转换为NestOS For Container难度和成本。',
      },
      { type: 'heading', content: '适用场景：' },
      {
        type: 'list',
        items: [
          '1. 现有容器云场景用户大规模批量转换场景',
          '2. 无BMC，不方便实地重新引导安装的远程环境',
          '3. 限制使用自定义镜像安装的云主机环境',
          '4. 个人爱好者尝鲜',
        ],
      },
      { type: 'heading', content: '限制说明：' },
      {
        type: 'list',
        items: [
          '1. 本转换工具非迁移工具，不保留磁盘数据',
          '2. 此转换不可逆',
          '3. 使用本工具时需保留足够空闲内存（推荐>2G）',
        ],
      },
      { type: 'heading', content: '效果演示' },
      { type: 'text', content: '○ 转换前' },
      { type: 'image', src: six_before, content: '转换前' },
      { type: 'text', content: '○ 转换后' },
      { type: 'image', src: six_after, content: '转换后' },
      {
        type: 'link',
        content: '详细说明请参阅：https://atomgit.com/openeuler/x2nestos',
        href: 'https://atomgit.com/openeuler/x2nestos',
      },
    ],
  },
};

const feature = computed(() => featureMap[props.featureSlug]);
const featureTitle = computed(() => (feature.value ? t(feature.value.titleKey) : ''));

const verticalPadding = computed(() => {
  if (isPadVToLaptop.value) {
    return ['16px', '40px'];
  } else if (lePadV.value) {
    return ['16px', '32px'];
  } else {
    return ['32px', '72px'];
  }
});
</script>

<template>
  <div v-if="feature">
    <ContentWrapper :vertical-padding="verticalPadding">
      <!-- 面包屑 -->
      <OBreadcrumb>
        <OBreadcrumbItem href="/zh/other/projects/nestos/">NestOS</OBreadcrumbItem>
        <OBreadcrumbItem>{{ featureTitle }}</OBreadcrumbItem>
      </OBreadcrumb>

      <!-- 内容区 -->
      <div class="detail-body">
        <!-- 摘要描述 -->
        <p class="detail-summary">{{ featureTitle }}</p>

        <!-- 章节内容 -->
        <div class="detail-sections">
          <template v-for="(section, idx) in feature.sections" :key="idx">
            <!-- 标题 -->
            <p v-if="section.type === 'heading'" class="section-heading">
              {{ section.content }}
            </p>

            <!-- 普通文本 -->
            <p v-else-if="section.type === 'text'" class="section-text">
              {{ section.content }}
            </p>

            <!-- 列表 -->
            <ul v-else-if="section.type === 'list'" class="section-list">
              <li v-for="(item, i) in section.items" :key="i" class="section-list-item">
                {{ item }}
              </li>
            </ul>

            <!-- 代码块 -->
            <pre v-else-if="section.type === 'code'" class="section-code"><code>{{ section.content }}</code></pre>

            <!-- 图片 -->
            <div v-else-if="section.type === 'image'" class="section-image">
              <img :src="section.src" :alt="section.content" />
            </div>

            <!-- 链接 -->
            <p v-else-if="section.type === 'link'" class="section-link">
              <OLink
                :href="section.href"
                target="_blank"
                color="primary"
                hover-underline
                class="detail-link"
              >{{ section.content }}</OLink>
            </p>
          </template>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<style scoped lang="scss">
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
}

.detail-body {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 40px;
  margin-top: 24px;
}

.detail-summary {
  @include text2;
  color: var(--o-color-info2);
  line-height: 1.8;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--o-color-control4);
}

.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-heading {
  font-weight: 500;
  color: var(--o-color-info1);
  margin-top: 8px;
  @include text2;
}

.section-text {
  @include text2;
  color: var(--o-color-info2);
  line-height: 1.8;
  padding-left: 16px;
}

.section-list {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-list-item {
  @include text2;
  color: var(--o-color-info2);
  line-height: 1.8;
  list-style: none;
}

.section-code {
  background-color: var(--o-color-fill4);
  color: var(--o-color-info1);
  border-radius: var(--o-radius-xs);
  padding: 16px 20px;
  @include text1;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 4px 0;
  border: 1px solid var(--o-color-control4);
}

.section-image {
  margin: 8px 0;
  border-radius: var(--o-radius-xs);
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--o-radius-xs);
    border: 1px solid var(--o-color-control4);
  }
}

.section-link {
  padding-left: 16px;
}

.detail-link {
  word-break: break-all;
}

@include respond-to('laptop') {
  .detail-body {
    padding: 32px 36px;
  }
}

@include respond-to('pad_h') {
  .detail-body {
    padding: 24px 28px;
  }
}

@include respond-to('<=pad_v') {
  .breadcrumb {
    margin-bottom: 24px;
  }

  .detail-body {
    padding: 20px 16px;
  }

  .detail-summary {
    @include text1;
  }

  .section-heading,
  .section-text,
  .section-list-item {
    @include text1;
  }

  .section-list {
    padding-left: 20px;
  }
}
</style>
