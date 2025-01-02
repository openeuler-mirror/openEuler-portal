<script lang="ts" setup>
import { ref, Ref, toRefs, onMounted, watch, type ComputedRef } from 'vue';

import lodash from 'lodash-es';

import { useLocale } from '~@/composables/useLocale';
import { archMap, SCENARIO_LIST } from '~@/data/download/download';

import { useClipboard } from '~@/composables/useClipboard';

import {
  ORadioGroup,
  ORadio,
  OTag,
  OToggle,
  ODivider,
  OTable,
  OLink,
  OSelect,
  OOption,
  OButton,
  OIcon,
  useMessage,
  OPopover,
} from '@opensig/opendesign';

import type {
  LinkListItemT,
  DetailedLinkItemT,
} from '@/shared/@types/type-download';
import type { MirrorLsitT } from '@/shared/@types/type-mirror';

import { useScreen } from '~@/composables/useScreen';

import IconCopy from '~icons/app-new/icon-copy.svg';
import IconDownload from '~icons/app/icon-download.svg';
import IconTips from '~icons/app-new/icon-help.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const props = defineProps({
  scenario: {
    type: String,
    default: () => {
      return '';
    },
  },
  versionData: {
    type: Object,
    default() {
      return [];
    },
  },
  mirrorList: {
    type: Object,
    default() {
      return [];
    },
  },
  contentData: {
    type: Object,
    default() {
      return {};
    },
  },
});
const { contentData, versionData, mirrorList, scenario } = toRefs(props);
const { t, locale } = useLocale();
const { lePadV } = useScreen();

const message = useMessage();
const shaText = 'SHA256';
// 复制

const handleUrlCopy = (value: string, e: MouseEvent) => {
  useClipboard({
    text: value,
    target: e,
    success: () => {
      message.success({
        content: t('download.COPY_SUCCESSFULLY'),
      });
    },
  });
};

// tag筛选
const activeArch = ref('');
const activeScenario = ref('');

const architectureList: Ref<string[]> = ref([]);
const scenarioList = ref<{ value: string; label: ComputedRef<string> }[]>(
  Array.from(SCENARIO_LIST.values())
);

scenarioList.value.shift();
function initActiveScenario() {
  if (scenario.value) {
    let flag = true;
    activeScenario.value = scenario.value;
    versionData.value.forEach((item: DetailedLinkItemT) => {
      if (item.Scenario === activeScenario.value && flag) {
        activeArch.value = item.Arch;
        flag = false;
      }
    });
  } else {
    activeArch.value = architectureList.value[0];
    activeScenario.value = scenarioList.value[0].value;
  }
}

function setTagList() {
  const tempArch = new Set<string>();
  architectureList.value = [];
  // 对versionData 按照 Map 架构顺序排序 不存在的排最后
  versionData.value = versionData.value.sort((a, b) => {
    const indexA = Array.from(archMap.keys()).indexOf(a.Arch);
    const indexB = Array.from(archMap.keys()).indexOf(b.Arch);
    if (indexA === -1 && indexB === -1) {
      return 0;
    } else if (indexA === -1) {
      return 1;
    } else if (indexB === -1) {
      return -1;
    } else {
      return indexA - indexB;
    }
  });
  // 排完序生成 architectureList
  versionData.value.forEach((item: DetailedLinkItemT) => {
    tempArch.add(item.Arch);
  });
  architectureList.value = Array.from(tempArch);
  initActiveScenario();
}

//控制不能组合的tag的禁用
const tempTag = ref('');
function setTempTag() {
  let flag = true;
  versionData.value.forEach((item: DetailedLinkItemT) => {
    if (item.Arch === activeArch.value) {
      if (flag) {
        tempTag.value = item.Scenario;
        flag = false;
      }
    }
  });
}
function isDisable(tag: string) {
  let flag = false;
  versionData.value.forEach((item: DetailedLinkItemT) => {
    if (item.Arch === activeArch.value && item.Scenario === tag) {
      flag = true;
    }
  });
  if (!flag) {
    if (activeScenario.value === tag) {
      activeScenario.value = tempTag.value;
    }
  }
  return !flag;
}
// 获取镜像仓及表格显示数据
// 表格数据
const tableData: Ref<LinkListItemT[]> = ref([]);

interface SelectMirrorT {
  downloadLink: string;
  bandwidth: string;
}

const selectMirror = ref<SelectMirrorT[]>([]);

const moreMirrorList: Ref<MirrorLsitT[]> = ref([]);
function setActiveMirror() {
  selectMirror.value = [];
  if (mirrorList.value?.length) {
    tableData.value?.forEach(() => {
      const temp = lodash.cloneDeep(mirrorList.value);
      temp[0].NameSpend =
        temp[0].Name + ' (' + temp[0].NetworkBandwidth + 'Mb/s)';

      selectMirror.value?.push({
        downloadLink: temp[0].HttpURL,
        bandwidth: temp[0].NameSpend,
      });
    });
  } else {
    tableData.value.forEach(() => {
      selectMirror.value?.push({
        downloadLink: contentData.value.GET_ISO_URL,
        bandwidth: contentData.value.GET_ISO_URL,
      });
    });
  }
}
function getTableData() {
  tableData.value = [];
  versionData.value.forEach((item: DetailedLinkItemT) => {
    if (
      item.Arch === activeArch.value &&
      item.Scenario === activeScenario.value
    ) {
      tableData.value = item.Tree;
    }
  });
  if (!selectMirror.value[0] && tableData.value?.length) {
    setActiveMirror();
  }
}
async function getMirrorList() {
  moreMirrorList.value = [];
  mirrorList.value.forEach((item: MirrorLsitT, index: number) => {
    item.NameSpend = item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)';
    if (index >= 3) {
      moreMirrorList.value.push(item);
    }
  });
  setActiveMirror();
}
watch(
  () => props.versionData,
  () => {
    if (!versionData.value.length) {
      return;
    }
    getMirrorList();
    setTagList();
    initActiveScenario();
    getTableData();
  },
  {
    immediate: true,
    deep: true,
  }
);
watch(
  () => props.scenario,
  () => {
    initActiveScenario();
  }
);
onMounted(async () => {
  watch(activeArch, function () {
    getTableData();
    setTempTag();
  });
  watch(activeScenario, function () {
    getTableData();
  });
  watch(tableData, function () {
    setActiveMirror();
  });
});

function setMirrorLink(index: number) {
  mirrorList.value.forEach((item: MirrorLsitT) => {
    if (item.NameSpend === selectMirror.value[index].bandwidth) {
      selectMirror.value[index].downloadLink = item.HttpURL;
    }
  });
  return '';
}
const devStation = ['24.03 LTS SP1', '24.09'];

//------------------------ 改版代码 ------------------------------
// 筛选配置信息
const linkConfigs = ref([
  { textKey: 'download.RELEASE_DESC', urlKey: 'RELEASE_DESC_URL' },
  { textKey: 'download.INSTALL_GUIDENCE', urlKey: 'INSTALL_GUIDENCE_URL' },
  { textKey: 'download.WHITE_PAPER', urlKey: 'WHITE_PAPER' },
  { textKey: 'download.LIFE_CYCLE', urlKey: 'LIFE_CYCLE_URL' },
]);

// 表格配置信息
const columns = [
  { label: t('download.TABLE_HEAD_0'), key: 'name', style: 'width: 25%' },
  { label: t('download.TABLE_HEAD_1'), key: 'size', style: 'width: 15%' },
  {
    label: t('download.TABLE_HEAD_2'),
    key: 'recommend',
    style: 'width: 30%',
  },
  { label: t('download.TABLE_HEAD_3'), key: 'shaCode', style: 'width: 15%' },
  { label: t('download.TABLE_HEAD_4'), key: 'download', style: 'width: 15%' },
];
</script>

<template>
  <div class="download-version-card">
    <!-------------- 版本基本信息 -------------->
    <h2 class="title">
      {{ contentData?.NAME }}
      <OTag v-if="contentData?.LTS" class="lts">{{ $t('download.lts') }}</OTag>
      <OTag v-else class="innovation"> {{ $t('download.innovation') }}</OTag>
    </h2>
    <p class="subtitle">Planned EOL: {{ contentData?.PLANNED_EOL }}</p>
    <div class="other-link">
      <template v-for="(linkData, index) in linkConfigs">
        <a
          v-if="contentData[linkData.urlKey]"
          :href="contentData[linkData.urlKey]"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ $t(linkData.textKey) }}
        </a>
        <ODivider
          v-if="contentData[linkData.urlKey] && index < linkConfigs.length - 1"
          :style="{
            '--o-divider-label-gap': '0 8px',
          }"
          direction="v"
        />
      </template>
    </div>
    <p class="subtitle">{{ contentData?.DESC }}</p>
    <!-------------- 架构场景筛选 -------------->
    <div class="filter-box">
      <div class="filter-card">
        <div class="label">{{ $t('download.ARCHITECTURE2') }}</div>
        <ORadioGroup v-model="activeArch">
          <ORadio
            v-for="option in architectureList"
            :key="option"
            :value="option"
          >
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{
                archMap.get(option)?.label || option
              }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <div class="filter-card">
        <div class="label">
          {{ $t('download.SCENARIO2') }}
        </div>
        <ORadioGroup v-model="activeScenario">
          <template v-for="option in scenarioList" :key="option.value">
            <ORadio
              v-show="
                (devStation.includes(contentData.VERSION) &&
                  option.value.toLowerCase() === 'devstation') ||
                option.value.toLowerCase() !== 'devstation'
              "
              :value="option.value"
            >
              <template #radio="{ checked }">
                <OToggle
                  :disabled="isDisable(option.value)"
                  :checked="checked"
                  >{{ option.label }}</OToggle
                >
              </template>
            </ORadio>
          </template>
        </ORadioGroup>
      </div>
    </div>
    <ODivider :style="{ '--o-divider-gap': '16px' }" />
    <!----------------------- 表格 -------------->
    <OTable
      v-if="!lePadV"
      class="download-table-pc"
      :columns="columns"
      border="row-frame"
      :data="tableData"
    >
      <template #td_name="{ row }">
        <div class="name-info">
          {{ row.Name }}
          <OPopover
            v-if="row.Tips"
            position="top"
            trigger="hover"
            wrap-class="popup-tip"
          >
            <template #target>
              <OIcon class="server-tips">
                <IconTips />
              </OIcon>
            </template>
            <p class="tips-text">
              {{ row.Tips }}
            </p>
          </OPopover>
        </div>
      </template>
      <template #td_size="{ row }">
        <div class="size">
          {{ row.Size || '-' }}
        </div>
      </template>
      <template #td_recommend="{ row }">
        <OSelect
          v-model="selectMirror[row.index].bandwidth"
          placeholder="Select"
          optionPosition="br"
          optionWrapClass="mirror-select"
          @change="setMirrorLink(row.index)"
        >
          <div>
            <p class="select-text">
              {{ $t('download.APPROVE_MIRROR') }}
            </p>
          </div>
          <OOption
            v-for="(item, index) in mirrorList"
            v-show="Number(index) < 3"
            :key="item.Name"
            :label="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
            :value="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
          >
          </OOption>
          <ODivider :style="{ '--o-divider-gap': '4px' }" />

          <div v-if="moreMirrorList?.length">
            <p class="select-text">{{ $t('download.MORE_MIRROR') }}</p>
          </div>

          <OOption
            v-for="item in moreMirrorList"
            :key="item.Name"
            :label="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
            :value="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
          >
          </OOption>
          <ODivider
            v-if="moreMirrorList?.length"
            :style="{ '--o-divider-gap': '4px' }"
          />
          <div class="mirror-list">
            <OLink :href="'/' + locale + '/mirror/list/'">
              {{ t('download.ALL_MIRROR') }}
              <template #suffix>
                <OIcon><IconArrowRight class="download-button-icon" /></OIcon>
              </template>
            </OLink>
          </div>
        </OSelect>
      </template>
      <template #td_shaCode="{ row }">
        <div v-if="row.ShaCode" class="down-action">
          <OButton
            class="down-copy"
            size="medium"
            color="primary"
            variant="text"
            :style="{
              '--btn-color-hover': 'var(--o-color-primary2)',
              '--btn-bg-color-hover': 'transprante',
              '--btn-bg-color-active': 'transprante',
              '--btn-padding': '0',
              '--btn-icon-size': 'var(--o-icon_size_control-m)',
            }"
            @click="handleUrlCopy(row.ShaCode, $event)"
          >
            {{ shaText }}
            <template #suffix>
              <OIcon>
                <IconCopy />
              </OIcon>
            </template>
          </OButton>
        </div>
        <div v-else>-</div>
      </template>
      <template #td_download="{ row }">
        <a
          class="download-link"
          :href="selectMirror[row.index]?.downloadLink + row.Path"
          :target="row.Type === 'file' ? '_self' : '_blank'"
          rel="noopener noreferrer"
        >
          <OButton
            v-if="row.Type === 'file'"
            size="medium"
            variant="solid"
            color="primary"
          >
            <template #icon>
              <OIcon>
                <IconDownload />
              </OIcon>
            </template>
            {{ t('download.DOWNLOAD_BTN_NAME') }}
          </OButton>
          <OButton v-else type="text" color="primary" size="medium">
            {{ t('download.DOWNLOADGO') }}
            <template #suffix>
              <OIcon>
                <IconArrowRight />
              </OIcon>
            </template>
          </OButton>
        </a>
      </template>
    </OTable>
    <div v-else class="download-table-mo">
      <div v-for="(item, index) in tableData" class="download-package-card">
        <div class="title">
          {{ item.Name }}
        </div>
        <div v-if="item.Tips" class="tip">{{ item.Tips }}</div>
        <div class="size info-line">
          <div class="label">{{ t('download.TABLE_HEAD_1') }}</div>
          <div class="value">{{ item.Size }}</div>
        </div>
        <div class="recommend info-line">
          <div class="label">{{ t('download.TABLE_HEAD_2') }}</div>
          <div class="value">
            <OSelect
              v-model="selectMirror[item.index].bandwidth"
              placeholder="Select"
              optionPosition="br"
              optionWrapClass="mirror-select"
              @change="setMirrorLink(item.index)"
            >
              <div>
                <p class="select-text">
                  {{ $t('download.APPROVE_MIRROR') }}
                </p>
              </div>
              <OOption
                v-for="(item, index) in mirrorList"
                v-show="Number(index) < 3"
                :key="item.Name"
                :label="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
                :value="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
              >
              </OOption>
              <ODivider :style="{ '--o-divider-gap': '4px' }" />

              <div v-if="moreMirrorList?.length">
                <p class="select-text">{{ $t('download.MORE_MIRROR') }}</p>
              </div>

              <OOption
                v-for="item in moreMirrorList"
                :key="item.Name"
                :label="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
                :value="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
              >
              </OOption>
              <ODivider :style="{ '--o-divider-gap': '4px' }" />
              <div class="mirror-list">
                <OLink :href="'/' + locale + '/mirror/list/'">
                  {{ t('download.ALL_MIRROR') }}
                  <template #suffix>
                    <OIcon
                      ><IconArrowRight class="download-button-icon"
                    /></OIcon>
                  </template>
                </OLink>
              </div>
            </OSelect>
          </div>
        </div>
        <div class="sha info-line">
          <div class="label">{{ t('download.TABLE_HEAD_3') }}</div>
          <div class="value">
            <span>{{ shaText }}</span>
            <OIcon @click="handleUrlCopy(item.ShaCode, $event)">
              <IconCopy></IconCopy>
            </OIcon>
          </div>
        </div>
        <div class="download info-line">
          <div class="label">{{ t('download.TABLE_HEAD_4') }}</div>
          <div class="value">
            <a :href="selectMirror[item.index].downloadLink + item.Path">
              {{ t('download.DOWNLOAD_BTN_NAME') }}
            </a>
          </div>
        </div>
        <ODivider
          v-if="tableData.length !== index + 1"
          :style="{ '--o-divider-gap': '16px' }"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lts {
  background-color: var(--o-color-primary1);
}
.innovation {
  background-color: #03b5a5;
}
.download-version-card {
  margin-top: 24px;
  padding: 32px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  @include respond-to('<=pad_v') {
    margin-top: 16px;
    padding: 16px 12px;
  }
  .title {
    display: flex;
    align-items: center;
    @include h1;
    color: var(--o-color-info1);
    font-weight: 500;
    .o-tag {
      color: var(--o-color-white);
      margin-left: 16px;
      --tag-padding: 3px 12px;
      @include tip2;
      border: none;
      @include respond-to('<=pad_v') {
        margin-left: 8px;
      }
    }
  }
  .subtitle {
    margin-top: 8px;
    color: var(--o-color-info2);
    @include text1;
  }
  .other-link {
    margin-top: 16px;
    @include text1;
    @include respond-to('<=pad_v') {
      margin-left: 12px;
    }
    .o-divider {
      @include tip2;
    }
  }

  .filter-box {
    margin-top: 24px;
    @include respond-to('<=pad_v') {
      margin-top: 16px;
    }
    .filter-card {
      display: flex;
      align-items: center;
      @include respond-to('<=pad_v') {
        margin-top: 12px;
        justify-content: flex-start;
        flex-direction: column;
        align-items: flex-start;
      }
      .label {
        @include text1;
        color: var(--o-color-info1);
        min-width: 32px;
        margin-right: 32px;
        @include respond-to('<=pad_v') {
          min-width: auto;
        }
      }
      .o-radio-group {
        .o-radio + .o-radio {
          margin-left: 8px;
          @include respond-to('<=pad_v') {
            margin-left: 0;
          }
        }
        @include respond-to('<=pad_v') {
          .o-radio {
            margin: 8px 8px 0 0;
          }
        }
      }
    }
    .filter-card:not(:first-child) {
      margin-top: 8px;
      @include respond-to('<=pad_v') {
        margin-top: 12px;
      }
    }
  }
  .o-divider-h {
    @include respond-to('<=pad_v') {
      margin: 12px 0 16px 0;
    }
  }
  .download-table-pc {
    @include text1;
    color: var(--o-color-info1);
    .name-info {
      display: flex;
      align-items: center;
      gap: 8px;
      .server-tips {
        cursor: pointer;
        font-size: 16px;
        @include hover() {
          color: var(--o-color-primary1);
        }
      }
    }
    :deep(.o-select) {
      max-width: 267px;
      width: 100%;
    }
  }
}
// 英文适配
html[lang='en'] {
  .filter-box {
    .filter-card {
      .label {
        min-width: 86px;
      }
    }
  }
}
.download-table-mo {
  .download-package-card {
    .title {
      @include h3;
    }
    .tip {
      margin-top: 8px;
      color: var(--o-color-info2);
      margin-bottom: 16px;
      @include tip1;
    }
    .info-line {
      margin-top: 12px;
      display: flex;
      @include h4;
      color: var(--o-color-info1);
      .label {
        color: var(--o-color-info2);
        margin-right: 16px;
      }
    }
    .recommend {
      flex-direction: column;
      .value {
        margin-top: 8px;
        .o-select {
          width: 100%;
          max-width: 288px;
        }
      }
    }
    .sha {
      .value {
        display: flex;
        align-items: center;
        .o-icon {
          margin-left: 8px;
          color: var(--o-color-primary1);
          font-size: var(--o-font_size-text1);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.mirror-select {
  --option-list-max-height-default: 400px;
  .o-option-list {
    --option-list-max-height-default: '400px';
  }
  .o-select-option-wrap {
    max-height: max-content;
    // padding: 8px;
    .select-text {
      @include tip2;
      color: var(--o-color-info4);
      margin-bottom: 4px;
      padding: 0 12px;
    }
    .mirror-list {
      display: flex;
      align-items: center;
      justify-content: center;
      .o-link {
        padding: 8px 0 4px;
      }
    }
  }
}
.popup-tip {
  max-width: 230px;
  --popup-padding: 18px 8px;
}
</style>
