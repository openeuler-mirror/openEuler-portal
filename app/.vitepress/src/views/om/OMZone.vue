<script setup lang="ts">
import { computed } from 'vue';
import { oaReport } from '@opendesign-plus/plugins/analytics';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import OmCard from './OmCard.vue';
import banner from '@/assets/banner/banner-community.png';
import illustration from '@/assets/category/om/ill.png';
import infoIll from '@/assets/category/om/info-ill.png';
import OSMindIll from '@/assets/category/om/OSMind-ill.png';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import omContent from '#content/om';

const helpContents = computed(() => omContent.zh.help_contents);
const qrCodes = computed(() => omContent.zh.qr_codes);
const OMSet = computed(() => omContent.zh.om_set);
const featuresDownloadUrl = omContent.zh.features_download_url;
const guideDownloadUrl = omContent.zh.guide_download_url;
const toolsUrl = omContent.zh.tools_url;

const oMSetTitleStyle = (height: number) => {
  return {
    height: `${height}px`,
    'line-height': `${height}px`,
  };
};

const downloadByUrl = (url: string) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = '';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
  reportDownload(url);
};

const reportDownload = (url: string) => {
  oaReport('OM', {
    downloadURrl: url,
    date: new Date().getTime(),
  });
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    title="运维专区"
    :illustration="illustration"
  >
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
    <div class="scroll-box">
      <OCard class="om-set-card">
        <el-row class="card-item" justify="center">
          <div v-for="item in OMSet" :key="item.title" class="om-set-box">
            <p class="om-set-title" :style="oMSetTitleStyle(item.height)">
              {{ item.title }}
            </p>
            <om-card
              v-for="card in item.card_list"
              :key="card.title"
              :title="card.title"
              :items="card.items"
              :width="card.width"
              :height="item.height"
            />
          </div>
        </el-row>
      </OCard>
    </div>
    <p class="om-subtitle">openEuler运维工具</p>
    <OCard class="osmind-card">
      <el-row class="card-item" justify="space-between">
        <el-row class="osmind-box" justify="space-between">
          <img class="osmind-img" :src="OSMindIll" />
          <div class="osmind-info-box">
            <p class="osmind-title">OSMind</p>
            <p class="osmind-desc">OSMind是一款openEuler运维管理工具套件</p>
          </div>
        </el-row>
        <div class="jump-btns">
          <el-dropdown popper-class="om-zone-dropdown">
            <OButton size="mini">
              工具下载
              <template #suffixIcon>
                <OIcon><icon-arrow-right class="icon-down" /></OIcon>
              </template>
            </OButton>
            <template #dropdown>
              <el-dropdown-menu class="om-zone-dropdown-menu">
                <el-dropdown-item disabled>基础能力：</el-dropdown-item>
                <el-dropdown-item
                  v-for="item in toolsUrl.base"
                  :key="item.name"
                  @click="downloadByUrl(item.url)"
                >
                  {{ item.name }}
                </el-dropdown-item>
                <el-dropdown-item disabled divided
                  >高级运维组件：</el-dropdown-item
                >
                <el-dropdown-item
                  v-for="item in toolsUrl.feature"
                  :key="item.name"
                  @click="downloadByUrl(item.url)"
                >
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
          <OButton v-if="false" size="mini">
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
          <p v-for="item in helpContents" :key="item" class="help-content">
            {{ item }}
          </p>
        </div>
        <el-row class="qr-codes" justify="space-between">
          <div
            v-for="{ value, label } in qrCodes"
            :key="value"
            class="qr-code-box"
          >
            <img class="qr-code" :src="value" />
            <p class="qr-code-label">{{ label }}</p>
          </div>
        </el-row>
      </el-row>
    </OCard>
  </AppContent>
</template>

<style lang="scss" scoped>
@mixin mobile() {
  @media screen and (max-width: 768px) {
    @content;
  }
}

$descIllWidth: 160px;
$descSpace: 40px;
$osmindCardHeight: 145px;

:deep(.el-card__body) {
  padding: 40px;
}

.e-card {
  @include mobile() {
    :deep(.el-card__body) {
      padding: 16px 12px;
    }
  }
}

.card-item {
  box-sizing: border-box;
  align-items: center;

  @include mobile() {
    &.is-justify-space-between {
      justify-content: center;
      flex-direction: column;
    }

    .om-desc {
      width: 100%;
      text-align: center;
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
}

.desc-ill-img {
  width: $descIllWidth;
}

.om-desc {
  width: calc(100% - ($descSpace + $descIllWidth));
  font-size: var(--e-font-size-text);
  color: var(--e-color-text4);
  line-height: var(--e-line-height-text);
}

.om-subtitle {
  font-size: var(--e-font-size-h3);
  color: var(--e-color-text1);
  text-align: center;
  margin: 64px 0 32px 0;

  @include mobile() {
    margin: 32px 0 16px 0;
    font-size: var(--e-font-size-h6);
    line-height: var(--e-line-height-h6);
  }
}

.osmind-card {
  :deep(.el-card__body) {
    padding: 0 30px 0 20px;

    @include mobile() {
      padding: 0 12px;
    }
  }

  .card-item {
    height: $osmindCardHeight;
    background: url('@/assets/category/om/grap-ill.png') no-repeat 100% 15px /
      125px;
  }
}

.osmind-img {
  width: 100px;
  margin-right: 30px;

  @include mobile() {
    width: 0;
  }
}

.osmind-info-box {
  @include mobile() {
    width: 100%;
    text-align: left;
  }
}

.osmind-title {
  font-size: var(--e-font-size-h5);
  line-height: 36px;
  margin-bottom: 8px;

  @include mobile() {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
  }
}

.osmind-desc {
  font-size: var(--e-font-size-text);
  color: var(--e-color-text4);
  line-height: 22px;

  @include mobile() {
    margin-bottom: 5px;
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
  }
}

.osmind-box {
  padding-top: 15px;

  @include mobile() {
    width: 100%;

    &.is-justify-space-between {
      justify-content: center;
      flex-direction: column;
    }
  }
}

.o-button {
  margin-left: 22px;
}

.icon-down {
  transform: rotate(90deg);
}

.jump-btns {
  margin-right: 80px;

  @include mobile() {
    display: inline-block;
    margin: 0;
    text-align: left;

    .o-button {
      margin: 0 4px 4px 0;
      padding: 4px 9px;
    }
  }
}

.help-content {
  font-size: var(--e-font-size-h7);
  color: var(--e-color-text4);
  line-height: 38px;

  @include mobile() {
    width: 100%;
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
    text-align: center;
  }
}

.qr-codes {
  width: 443px;
  margin-right: 110px;

  @include mobile() {
    width: 200px;
    margin-right: 0;
    margin-top: 10px;
  }
}

.qr-code-box {
  float: left;
  text-align: center;
}

.qr-code {
  width: 150px;

  @include mobile() {
    width: 78px;
  }
}

.qr-code-label {
  text-align: center;
  font-size: var(--e-font-size-h7);
  margin-top: 12px;

  @include mobile() {
    width: 100%;
    font-size: 12px;
  }
}

.om-set-box {
  overflow: hidden;
}

.scroll-box {
  overflow-x: auto;
  box-shadow: var(--e-shadow-l2);
}

.om-set-card {
  min-width: 1246px;

  @include mobile() {
    min-width: 1180px;
    line-height: var(--e-line-height-h6);
  }
}

.om-set-title {
  float: left;
  margin: 6px 20px 6px 0;

  @include mobile() {
    font-size: var(--e-font-size-text);
    margin: 6px 10px 6px 0;
  }
}

.om-card-box {
  float: left;
}
</style>
<style lang="scss">
.om-zone-dropdown {
  max-width: calc(100% - 20px);

  .om-zone-dropdown-menu {
    background-color: var(--e-color-bg2);
    border: 1px solid var(--e-color-brand1);
    padding: 30px 0;

    .el-dropdown-menu__item {
      padding: 4px 30px;
      box-sizing: border-box;
      word-break: break-all;
      word-wrap: break-word;
      white-space: normal;
      color: var(--e-color-text4);

      &:hover {
        color: var(--el-dropdown-menuItem-hover-color);
      }
    }

    @media screen and (max-width: 768px) {
      padding: 5px 0;

      .el-dropdown-menu__item {
        padding: 4px 10px;
      }
    }
  }
}
</style>
