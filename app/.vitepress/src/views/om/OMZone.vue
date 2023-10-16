<script setup lang="ts">
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import OmCard from './OmCard.vue';
import Banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/category/om/ill.png';
import infoIll from '@/assets/category/om/info-ill.png';
import OSMindIll from '@/assets/category/om/OSMind-ill.png';
import accountsQR from '@/assets/category/om/accounts-QR.png';
import helperQR from '@/assets/category/om/helper-QR.png';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const helpContents = [
  '如有疑问可扫描二维码，我们会有专人为您解答',
  'openEuler公众号进入运维专区，点击“加群”，进入技术交流群',
  'openEuler小助手，备注“运维”，进入技术交流群',
]

const qrCodes = [
  { value: accountsQR, label: 'openEuler公众号' },
  { value: helperQR, label: 'openEuler小助手' },
]

const OMSet = [
  {
    title: '系统运维',
    height: 122,
    cardList: [
      { title: '日常维护', width: 248, items: ['告警管理', '补丁升级', '系统巡检', '安全扫描', '日志监控', '应急恢复'] },
      { title: '系统管理', width: 248, items: ['部署迁移', '镜像管理', '热补丁', '备份恢复', '预警整改', '配置溯源'] },
      { title: '系统优化', width: 268, items: ['系统调优', '业务调优', '网络调优'] },
      { title: '自动化', width: 268, items: ['运维编排', '自动部署', '自动恢复'] }
    ]
  },
  {
    title: '故障处理',
    height: 98,
    cardList: [
      { title: '工具', width: 628, items: ['日志收集', '远程操作', '故障分析', '故障诊断', '巡检修复', '安全加固', '告警修复', '异常检测'] },
      { title: '数据', width: 428, items: ['监控大屏', '数据报表', '智能探针', '架构感知'] },
    ]
  },
  {
    title: '运维支撑',
    height: 98,
    cardList: [
      { title: '标准规范', width: 548, items: ['系统巡检标准', '运维流程规范', '升级流程规范', '安全加固标准', '故障处理规范', '应急恢复流程'] },
      { title: '维护管理', width: 316, items: ['权限管理', '版本管理', '配置管理', '变更管理'] },
      { title: '资产管理', width: 180, items: ['主机管理', '知识管理'] },
    ]
  }
]

const oMSetTitleStyle = (height: number) => {
  return {
    'height': `${height}px`,
    'line-height': `${height}px`,
  }
}

const downloadByUrl = (url: string,) => {
  const a = document.createElement('a')
  a.href = url
  a.download = ''
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

const featuresDownloadUrl = 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/OSMind%20%E5%85%B3%E9%94%AE%E7%89%B9%E6%80%A7%E4%B8%8E%E4%BB%B7%E5%80%BC.pdf'
const guideDownloadUrl = 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/IT%20Service%20Tools%201.0.T3%20OS%20Mind%20%E4%BA%A7%E5%93%81%E6%96%87%E6%A1%A3.docx'

const tools = [
  { name: 'ITServiceTools_1.0.T3.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3.zip' },
  { name: 'ITServiceTools_1.0.T3_OSManager_Asset.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3_OSManager_Asset.zip' },
  { name: 'ITServiceTools_1.0.T3_OSManager_Tools.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3_OSManager_Tools.zip' },
  { name: 'ITServiceTools_1.0.T3_ThirdParty_EulerOS2.0SP10-aarch64.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3_ThirdParty_EulerOS2.0SP10-aarch64.zip' },
  { name: 'ITServiceTools_1.0.T3_ThirdParty_EulerOS2.0SP10-x86_64.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3_ThirdParty_EulerOS2.0SP10-x86_64.zip' },
  { name: 'ITServiceTools_1.0.T3_ThirdParty_openEuler20.03LTS-aarch64.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3_ThirdParty_openEuler20.03LTS-aarch64.zip' },
  { name: 'ITServiceTools_1.0.T3_ThirdParty_openEuler20.03LTS-x86_64.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3_ThirdParty_openEuler20.03LTS-x86_64.zip' },
  { name: 'ITServiceTools_1.0.T3_Arangodb_Any-aarch64.zip', url: 'https://obs-transfer.obs.cn-north-4.myhuaweicloud.com/openeuler/obsi-openeuler-msx/ITServiceTools_1.0.T3_Arangodb_Any-aarch64.zip' },
]
</script>

<template>
  <BannerLevel2 :background-image="Banner" title="运维专区" :illustration="illustration">
  </BannerLevel2>
  <AppContent>
    <OCard>
      <el-row class="card-item" justify="space-between">
        <img class="desc-ill-img" :src="infoIll" />
        <p class="om-desc">
          随着openEuler操作系统的逐渐普及和市场需求的不断增长，越来越多的人与组织开始使用这款开源、安全、稳定的操作系统。然而，随着使用数量的不断攀升，openEuler系统也面临着越来越多的挑战，如系统稳定性、安全性、兼容性等问题。为了确保openEuler系统能够长期稳定运行，用户希望有系统性的运维方案与工具。针对用户对于运维的核心诉求，openEuler开源社区及伙伴构建了一系列专、精的运维组件，以及各种统一运维工具，协助用户更好地使用openEuler操作系统。
        </p>
      </el-row>
    </OCard>
    <p class="om-subtitle">运维全集</p>
    <OCard>
      <el-row class="card-item" justify="center">
        <div class="OM-set-box" v-for="item in OMSet" :key="item.title">
          <p class="OM-set-title" :style="oMSetTitleStyle(item.height)">{{ item.title }}</p>
          <om-card v-for="card in item.cardList" :title="card.title" :items="card.items" :width="card.width"
            :height="item.height" />
        </div>
      </el-row>
    </OCard>
    <p class="om-subtitle">openEuler运维工具</p>
    <OCard class="osmind-card">
      <el-row class="card-item" justify="space-between">
        <el-row class="osmind-box" justify="space-between">
          <img class="OSMind-img" :src="OSMindIll" />
          <div>
            <p class="OSMind-title">OSMind</p>
            <p class="OSMind-desc">OSMind是一款openEuler运维管理工具套件</p>
          </div>
        </el-row>
        <div class="jump-btns">
          <el-dropdown>
            <OButton size="mini">
              工具下载
              <template #suffixIcon>
                <OIcon><icon-arrow-right class="icon-down" /></OIcon>
              </template>
            </OButton>
            <template #dropdown>
              <el-dropdown-menu class="OM-zone-dropdown-menu">
                <el-dropdown-item v-for="item in tools" :key="item.name" @click="downloadByUrl(item.url)">
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <OButton size="mini" @click="downloadByUrl(featuresDownloadUrl)">
            关键特性与价值
            <template #suffixIcon>
              <OIcon><icon-arrow-right /></OIcon>
            </template>
          </OButton>
          <OButton size="mini" @click="downloadByUrl(guideDownloadUrl)">
            使用指南
            <template #suffixIcon>
              <OIcon><icon-arrow-right /></OIcon>
            </template>
          </OButton>
          <OButton size="mini" v-if="false">
            视频实操
            <template #suffixIcon>
              <OIcon><icon-arrow-right /></OIcon>
            </template>
          </OButton>
        </div>
      </el-row>
    </OCard>
    <p class="om-subtitle">帮助咨询</p>
    <OCard>
      <el-row class="card-item" justify="space-between">
        <div>
          <p class="help-content" v-for="item in helpContents" :key="item">{{ item }}</p>
        </div>
        <el-row class="qr-codes" justify="space-between">
          <div class="qr-code-box" v-for="{ value, label } in qrCodes" :key="value">
            <img class="qr-code" :src="value">
            <p class="qr-code-label">{{ label }}</p>
          </div>
        </el-row>
      </el-row>
    </OCard>
  </AppContent>
</template>

<style lang="scss" scoped>
$descIllWidth: 160px;
$descSpace: 40px;
$osmindCardHeight: 145px;

:deep(.el-card__body) {
  padding: 40px;
}

.card-item {
  box-sizing: border-box;
  align-items: center;
}

.desc-ill-img {
  width: $descIllWidth;
}

.om-desc {
  width: calc(100% - ($descSpace + $descIllWidth));
  font-size: var(--o-font-size-text);
  color: var(--o-color-text4);
  line-height: var(--o-line-height-text);
}

.om-subtitle {
  font-size: var(--o-font-size-h3);
  color: var(--o-color-text1);
  text-align: center;
  margin: 64px 0 32px 0;
}

.osmind-card {
  :deep(.el-card__body) {
    padding: 0 30px 0 20px;
  }

  .card-item {
    height: $osmindCardHeight;
    background: url("@/assets/category/om/grap-ill.png") no-repeat 100% 15px / 125px;
  }
}

.OSMind-img {
  width: 100px;
  margin-right: 30px;
}

.OSMind-title {
  font-size: var(--o-font-size-h5);
  line-height: 36px;
  margin-bottom: 8px;
}

.OSMind-desc {
  font-size: var(--o-font-size-text);
  color: var(--o-color-text4);
  line-height: 22px;
}

.osmind-box {
  padding-top: 15px;
}

.o-button {
  margin-left: 22px;
}

.icon-down {
  transform: rotate(90deg);
}

.jump-btns {
  margin-right: 80px;
}

.help-content {
  font-size: var(--o-font-size-h7);
  color: var(--o-color-text4);
  line-height: 38px;
}

.qr-codes {
  width: 443px;
  margin-right: 110px;
}

.qr-code-box {
  float: left;
  text-align: center;
}

.qr-code {
  width: 150px;
}

.qr-code-label {
  text-align: center;
  font-size: var(--o-font-size-h7);
  margin-top: 12px;
}

.OM-set-box {
  overflow: hidden;
}

.OM-set-title {
  float: left;
  margin-right: 20px;
}

.om-card-box {
  float: left;
}
</style>
<style lang="scss">
.el-dropdown__popper {
  .OM-zone-dropdown-menu {
    background-color: var(--o-color-bg2);
    border: 1px solid var(--o-color-brand1);
    padding: 30px 0;

    .el-dropdown-menu__item {
      padding: 4px 30px;
      color: var(--o-color-text4);

      &:hover {
        color: var(--el-dropdown-menuItem-hover-color);
      }
    }
  }
}
</style>
