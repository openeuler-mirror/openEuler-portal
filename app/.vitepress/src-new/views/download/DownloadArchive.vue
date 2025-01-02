<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useData } from 'vitepress';
import cloneTool from 'lodash-es';

import {
  ORadioGroup,
  ORadio,
  OToggle,
  ODivider,
  OIcon,
  OCollapse,
  OCollapseItem,
  OLink,
} from '@opensig/opendesign';

import { getVersionInfo } from '@/api/api-mirror';
import { getVersionList } from '@/shared/download';
import communityVersionData from '~@/data/download/download';

import FilterableTableHeader from '~@/components/FilterableTableHeader.vue';

import { archMap } from '~@/data/download/download';

import { VERSION_LIST, SCENARIO_LIST } from '~@/data/download/download';

import type { VersionInfoT } from '@/shared/@types/type-download';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { lang } = useData();
const { t, locale } = useLocale();
const { lePadV, isPadVToLaptop } = useScreen();

//数据筛选
const activeScenario = ref(SCENARIO_LIST?.get('')?.value);

const tagArch = ref<string[]>([]);
const activeArch = ref('');
const activeVersionType = ref(VERSION_LIST[0].value);
const allList: any = ref();
const loading = ref(true);

const setTagArch = () => {
  const tempArch = new Set<string>();
  versionList.value.forEach((item: any) => {
    item?.Arch?.forEach((arch: any) => {
      tempArch.add(arch);
    });
  });
  // 按照Map顺序排列
  for (const key of archMap.keys()) {
    if (tempArch.has(key)) {
      tagArch.value.push(key);
    }
  }
  // 不在Map中的排最后
  for (const item of tempArch) {
    if (!archMap.has(item)) {
      tagArch.value.push(item);
    }
  }
  tagArch.value.unshift(t('common.all'));
  activeArch.value = tagArch.value[0];
};

const versionList = ref();
const queryGetVersionInfo = () => {
  loading.value = true;
  getVersionInfo()
    .then((res) => {
      versionList.value = getVersionList(
        res.RepoVersion,
        localeCommunityVersionData.value
      );
      allList.value = cloneTool.cloneDeep(versionList.value);
      setTagArch();
    })
    .finally(() => {
      loading.value = false;
    });
};

// ------------ 筛选逻辑 -------------------
const filterList = computed(() => {
  return allList.value?.filter((item: VersionInfoT) => {
    const versionFilteredList = filterByVersionType(
      [item],
      activeVersionType.value
    );
    if (versionFilteredList.length === 0) {
      return false;
    }
    // 按场景筛选
    const scenarioFilteredList = filterByScenario(
      versionFilteredList,
      activeScenario.value
    );
    if (scenarioFilteredList.length === 0) {
      return false;
    }
    // 按架构筛选
    const archFilteredList = filterByArch(
      scenarioFilteredList,
      activeArch.value
    );
    if (archFilteredList.length === 0) {
      return false;
    }
    // 根据配置对象中的版本过滤启用标志决定是否应用版本过滤条件
    if (searchVal.value && item.Version !== searchVal.value) {
      return false;
    }
    item.Scenario.sort((a, b) => {
      const indexA = Array.from(SCENARIO_LIST.keys()).indexOf(a);
      const indexB = Array.from(SCENARIO_LIST.keys()).indexOf(b);
      return indexA - indexB;
    });
    return true;
  });
});

const filterVersinList = computed(() => {
  return allList.value?.filter((item: VersionInfoT) => {
    // 按版本类型筛选
    const versionFilteredList = filterByVersionType(
      [item],
      activeVersionType.value
    );
    if (versionFilteredList.length === 0) {
      return false;
    }
    // 按场景筛选
    const scenarioFilteredList = filterByScenario(
      versionFilteredList,
      activeScenario.value
    );
    if (scenarioFilteredList.length === 0) {
      return false;
    }
    // 按架构筛选
    const archFilteredList = filterByArch(
      scenarioFilteredList,
      activeArch.value
    );
    if (archFilteredList.length === 0) {
      return false;
    }
    return true;
  });
});

function filterByVersionType(list: VersionInfoT[], activeVersionType: string) {
  const versionTypeFilterMap: Record<
    string,
    (list: VersionInfoT[]) => VersionInfoT[]
  > = {
    [VERSION_LIST[0].value]: (list) => list,
    [VERSION_LIST[1].value]: (list) => list.filter((item) => item.LTS),
    [VERSION_LIST[2].value]: (list) => list.filter((item) => !item.LTS),
  };
  return versionTypeFilterMap[activeVersionType]
    ? versionTypeFilterMap[activeVersionType](list)
    : list;
}

function filterByArch(list: VersionInfoT[], activeArch: string) {
  if (activeArch === tagArch.value[0]) {
    return list;
  }
  return list.filter((item) => item.Arch.some((arch) => arch === activeArch));
}

function filterByScenario(list: VersionInfoT[], activeScenario: any) {
  if (activeScenario === SCENARIO_LIST.get('')?.value) {
    return list;
  }
  const result: VersionInfoT[] = [];
  list.forEach((item) => {
    const hasMatchingScenario = item.Scenario.some(
      (scenario) => scenario === activeScenario
    );
    if (hasMatchingScenario) {
      result.push(item);
    }
  });
  return result;
}

onMounted(() => {
  queryGetVersionInfo();
});
// -------------- 改版代码 --------------------
// 表格配置信息
const columns = [
  { label: t('download.VERSION'), key: 'version', style: 'width: 20%' },
  { label: t('download.ARCHITECTURE'), key: 'arch', style: 'width: 20%' },
  {
    label: t('download.SCENARIO'),
    key: 'scenario',
    style: 'width: 25%',
  },
  { label: t('download.RELEASE_DATE'), key: 'date', style: 'width: 8%' },
  { label: t('download.eol'), key: 'eol', style: 'width: 12%' },
  { label: t('download.DOWNLOAD_LINK'), key: 'download', style: 'width: 15%' },
];

// 本地存储版本信息
const localeCommunityVersionData = computed(() => {
  return communityVersionData[locale.value].COMMUNITY_LIST;
});

// 版本名称搜索
const versionNameList = computed(() => {
  return filterVersinList.value?.map((version) => {
    return version.Version;
  });
});
const searchVal = ref('');
</script>

<template>
  <div class="download-archive">
    <i18n-t keypath="download.DETAIL3" tag="p" class="detail-last">
      <template #link>
        <a :href="$t('download.MIRROR_LIST_LINK')">{{
          $t('download.CLICK_LIST')
        }}</a>
      </template>
    </i18n-t>
    <!-- 筛选 -->
    <div class="filter-box">
      <div class="filter-card">
        <div class="label">{{ $t('download.ARCHITECTURE2') }}</div>
        <ORadioGroup v-model="activeArch">
          <ORadio v-for="option in tagArch" :key="option" :value="option">
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
          <ORadio
            v-for="option in SCENARIO_LIST.values()"
            :key="option.value"
            :value="option.value"
          >
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ option.label }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
      <div class="filter-card">
        <div class="label">
          {{ $t('download.VERSION_TYPE') }}
        </div>
        <ORadioGroup v-model="activeVersionType">
          <ORadio
            v-for="option in VERSION_LIST"
            :key="option.value"
            :value="option.value"
          >
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ option.label }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </div>
    </div>
    <!-- 表格 -->

    <el-table
      v-if="!lePadV"
      class="download-list"
      max-height="607px"
      :data="filterList"
    >
      <el-table-column
        :label="t('download.VERSION')"
        :width="!isPadVToLaptop ? '260' : '200'"
      >
        <template #header>
          <FilterableTableHeader v-model="searchVal" :options="versionNameList">
            {{ t('download.VERSION') }}
          </FilterableTableHeader>
        </template>
        <template #default="scope">
          {{ scope.row?.Version }}
        </template>
      </el-table-column>
      <el-table-column
        :label="t('download.ARCHITECTURE')"
        :width="!isPadVToLaptop ? '300' : ''"
      >
        <template #default="scope">
          <div class="arch-box">
            <div
              v-for="(item, index) in scope.row?.Arch"
              :key="item"
              class="arch-item"
            >
              <span>
                {{ archMap.get(item)?.label || item }}
              </span>
              <ODivider
                v-if="index < scope.row?.Arch.length - 1"
                :style="{
                  '--o-divider-label-gap': '0 4px',
                }"
                direction="v"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('download.SCENARIO')"
        :width="!isPadVToLaptop ? '300' : ''"
      >
        <template #default="scope">
          <div class="scenario-box">
            <div
              v-for="(scenario, index) in scope.row?.Scenario"
              :key="scenario"
              class="scenario-item"
            >
              <span>
                {{ SCENARIO_LIST.get(scenario)?.label || scenario }}
              </span>
              <ODivider
                v-if="index < scope.row?.Scenario.length - 1"
                :style="{
                  '--o-divider-label-gap': '0 4px',
                }"
                direction="v"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('download.RELEASE_DATE')"
        :width="!isPadVToLaptop ? '' : '100'"
      >
        <template #default="scope">
          {{ scope.row?.publishDate }}
        </template>
      </el-table-column>
      <el-table-column
        :label="t('download.eol')"
        :width="!isPadVToLaptop ? '' : '140'"
      >
        <template #default="scope">
          {{ scope.row?.plannedEol }}
        </template>
      </el-table-column>
      <el-table-column
        :label="t('download.DOWNLOAD_LINK')"
        :width="!isPadVToLaptop ? '200' : '140'"
      >
        <template #default="scope">
          <OLink
            :href="
              '/' +
              lang +
              '/download/archive/detail/?version=' +
              scope.row.Version
            "
          >
            <span>{{ t('download.DOWNLOADGO') }}</span>
            <template #suffix>
              <OIcon><IconArrowRight class="download-button-icon" /></OIcon>
            </template>
          </OLink>
        </template>
      </el-table-column>
    </el-table>
    <ODivider
      v-if="lePadV"
      :style="{
        '--o-divider-label-gap': '0 12px',
      }"
    />
    <div v-if="lePadV" class="download-list-mo">
      <OCollapse
        accordion
        :style="{
          '--collapse-padding': '0',
          '--collapse-item-header-padding': '12px 0px',
        }"
      >
        <OCollapseItem
          v-for="(version, index) in filterList"
          :key="index"
          :value="index"
          :style="{
            '--collapse-item-header-padding': '12px 0px',
          }"
        >
          <template #title>
            {{ version.Version }}
          </template>
          <div class="version-info">
            <div class="version-line">
              <div class="label">{{ t('download.ARCHITECTURE') }}</div>
              <div class="value">
                <span
                  v-for="(item, index) in version?.Arch"
                  :key="item"
                  class="arch-box"
                >
                  <span>
                    {{ archMap.get(item)?.label || item }}
                  </span>
                  <ODivider
                    v-if="index < version?.Arch.length - 1"
                    :style="{
                      '--o-divider-label-gap': '0 4px',
                    }"
                    direction="v"
                  />
                </span>
              </div>
            </div>
            <div class="version-line">
              <div class="label">{{ t('download.SCENARIO') }}</div>
              <div class="value">
                <span
                  v-for="(scenario, index) in version?.Scenario"
                  :key="scenario"
                  class="scenario-box"
                >
                  <span>
                    {{ SCENARIO_LIST.get(scenario)?.label }}
                  </span>
                  <ODivider
                    v-if="index < version?.Scenario.length - 1"
                    :style="{
                      '--o-divider-label-gap': '0 4px',
                    }"
                    direction="v"
                  />
                </span>
              </div>
            </div>
            <div class="version-line">
              <div class="label">{{ t('download.RELEASE_DATE') }}</div>
              <div class="value">
                {{ version.publishDate }}
              </div>
            </div>
            <div class="version-line">
              <div class="label">{{ t('download.eol') }}</div>
              <div class="value">
                {{ version.plannedEol }}
              </div>
            </div>
            <div class="version-line">
              <div class="label">{{ t('download.DOWNLOAD_LINK') }}</div>
              <div class="value">
                <OLink
                  :href="
                    '/' +
                    lang +
                    '/download/archive/detail/?version=' +
                    version.Version
                  "
                >
                  <span>{{ t('download.DOWNLOADGO') }}</span>
                  <template #suffix>
                    <OIcon
                      ><IconArrowRight class="download-button-icon"
                    /></OIcon>
                  </template>
                </OLink>
              </div>
            </div>
          </div>
        </OCollapseItem>
      </OCollapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.download-archive {
  margin-top: 24px;
  background-color: var(--o-color-fill2);
  padding: 32px;
  border-radius: var(--o-radius-xs);
  @include respond-to('<=pad_v') {
    margin-top: 16px;
    padding: 12px;
  }
  .detail-last {
    @include text1;
    color: var(--o-color-info1);
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
        min-width: 64px;
        margin-right: 32px;
        @include respond-to('<=pad_v') {
          min-width: auto;
        }
      }
      .o-radio-group {
        .o-radio + .o-radio {
          margin-left: 8px;
          @include respond-to('<=laptop') {
            margin-left: 0;
          }
        }
        @include respond-to('<=laptop') {
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
  .download-list {
    margin-top: 24px;
    .o-link {
      color: var(--o-color-primary1);
    }
    .o-divider-v {
      @include text1;
      border-color: var(--o-color-info1);
    }
    .scenario-box {
      display: flex;
      align-items: center;
    }
  }
  .download-list-mo {
    border: 1px solid var(--o-color-control4);
    border-radius: var(--o-radius-xs);
    padding: 0 12px;
    :deep(.o-collapse-item-body) {
      margin-bottom: 0;
    }
    .version-line {
      margin-top: 8px;
      display: flex;
      @include h4;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: var(--collapse-item-gap);
      }
      color: var(--o-color-info1);
      .label {
        min-width: 84px;
        color: var(--o-color-info2);
        margin-right: 16px;
      }
      .value {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .o-link {
          color: var(--o-color-primary1);
        }
      }
    }
  }
  :deep(.el-table) {
    .version-box {
      border-bottom: 1px solid var(--o-color-control4) !important;
      text-align: center;
    }
    .cell {
      color: var(--o-color-info1);
    }
    .header-cell {
      display: flex;
      align-items: center;
    }
    .o-icon svg {
      width: 16px;
      height: 16px;
    }
  }
}

.scenario-box,
.arch-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  > div {
    display: flex;
    align-items: center;
  }
  .o-divider {
    font-size: inherit;
  }
}

html[lang='en'] {
  .download-archive {
    .filter-card {
      .label {
        min-width: 86px;
      }
    }
  }
}

:deep(.el-table) {
  --el-table-header-bg-color: var(--o-color-control3-light);
  --el-table-border-color: var(--o-color-control4);
  --el-table-tr-bg-color: var(--o-color-fill2);
  --el-table-expanded-cell-bg-color: var(--o-color-fill2);
  --el-table-bg-color: var(--o-color-fill2);
  --el-table-row-hover-bg-color: var(--o-color-control2-light);
  border-radius: 4px;
  --el-table-border: 1px solid var(--o-color-control4);
  border-spacing: 0;
  color: var(--o-color-info1);
  @include text1;
  &.is-scrolling-right
    .el-table-fixed-column--left.is-last-column.el-table__cell,
  &.is-scrolling-middle
    .el-table-fixed-column--left.is-last-column.el-table__cell {
    border-right: 1px solid transparent !important;
  }

  .el-table__row {
    &.hover-row {
      .el-table-fixed-column--left,
      .el-table-fixed-column--right {
        background: var(--el-table-row-hover-bg-color);
      }
    }
  }
  .el-table__cell.is-leaf,
  .el-table td.el-table__cell {
    border-bottom: 0;
  }
  .el-table__inner-wrapper::before {
    display: none;
  }
  .el-table__body-wrapper {
    border-radius: 0 0 var(--o-radius-xs) var(--o-radius_control-xs);
    border: 1px solid var(--o-color-control4);
    border-top: none;
    .el-scrollbar__bar.is-horizontal {
      display: none;
    }
  }
  .el-table__cell {
    padding: 12px 0;
    transition: none;
    .cell {
      padding: 0 20px;
    }
    &.el-table-fixed-column--left,
    &.el-table-fixed-column--right {
      background: var(--el-table-tr-bg-color);
    }
  }

  thead {
    tr {
      &:first-child {
        th {
          &.el-table__cell {
            &:first-child {
              border-radius: 4px 0 0 0;
            }
            &:last-child {
              border-radius: 0 4px 0 0;
            }
          }
        }
      }
    }
    th {
      font-weight: 500;
      color: var(--o-color-info1);
      border-bottom: 0 none;
      @include text1;
      &.el-table__cell {
        background: var(--el-table-header-bg-color);

        &.el-table-fixed-column--left,
        &.el-table-fixed-column--right {
          background: var(--el-table-header-bg-color);
        }
      }
    }
  }
  &.el-table--border {
    &::after,
    &::before {
      display: none;
    }
  }
  tr:last-child {
    td {
      border-bottom: 0;
      &:first-child {
        border-radius: 0 0 0 4px;
      }
      &:last-child {
        border-radius: 0 0 4px 0;
      }
    }
  }

  td,
  th {
    &:first-child {
      .cell {
        padding-left: 32px !important;
      }
    }
    &:last-child {
      .cell {
        padding-right: 32px !important;
      }
    }
  }

  .el-table__expand-icon {
    display: flex;
    align-items: center;
    > .el-icon {
      font-size: 16px;
      color: var(--o-color-info1);
    }
  }
  .el-table__placeholder {
    display: none;
  }
  .el-scrollbar__wrap {
    padding: 1px 0;
  }

  .el-table__empty-block {
    min-height: 250px;
  }
}
</style>
