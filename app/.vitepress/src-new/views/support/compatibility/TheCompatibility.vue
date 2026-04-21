<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { OTab, OTabPane, OLink, OSelect, OOption, OInput, OIcon, OTable, OPagination, ORow, OCol, OCollapse, OCollapseItem } from '@opensig/opendesign';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import AppSection from '~@/components/AppSection.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';

import { useDebounceSearch } from '~@/composables/useDebounceSearch';

import banner from '~@/assets/category/compatibility/compatibility-banner.jpg'

import IconSearch from '~icons/app-new/icon-header-search.svg';

import { getOS, getArchitecture, getCpu, getCompatibilityList, getDriveTypes, getDriverList, getTestOrganizations, getBusinessSoftwareList, getSolution, getCertificationType, getSolutionList } from '~@/api/api-security';

import { CompatibilityQueryT } from '~@/@types/type-support';

import { useRoute } from 'vitepress';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const route = useRoute();
const { locale, t, isZh } = useLocale();
const { lePadV, lePad, leLaptop, } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

// -------------------- 参数 --------------
const queryData = reactive<CompatibilityQueryT>({
  pages: {
    page: 1,
    size: 10,
  },
  architecture: '',
  keyword: '',
  cpu: '',
  os: '',
  testOrganization: '',
  type: '',
  cardType: '',
  lang: `${locale.value}`,
  dataSource: '',
  solution: '',
  certificationType: '',
});

const COUNT_PER_PAGE = [10, 20, 30, 40];
const total = ref(0);
const tableData = ref();

const initParams = () => {
  queryData.pages.page = 1;
  queryData.pages.size = 10;
  queryData.architecture = '';
  queryData.keyword = '';
  queryData.cpu = '';
  queryData.os = '';
  queryData.testOrganization = '';
  queryData.type = '';
  queryData.cardType = '';
  queryData.dataSource = '';
  queryData.solution = '';
  queryData.certificationType = '';
}

// -------------------- 搜索 类别 input字段做防抖处理 --------------------
const searchValue = ref();
const onInput = useDebounceSearch((val: string) => {
  queryData.keyword = val;
}, 300);

// -------------------- 整机 --------------------
// 架构 option
const architectureValue = ref('');
const architectureList = ref();
const getArchitectureData = () => {
  getArchitecture().then((res) => {
    architectureList.value = res.result;
  });
};
const architectureChange = () => {
  queryData.architecture = architectureValue.value;
};

// cpu option
const cpuList = ref();
const cpuValue = ref('');
const getCpuData = () => {
  getCpu(locale.value).then((res) => {
    cpuList.value = res.result;
  });
};
const cpuChange = () => {
  queryData.cpu = cpuValue.value;
};

// 操作系统 option
const osList = ref();
const osValue = ref('');
const getOSData = () => {
  getOS().then((res) => {
    osList.value = res.result;
  });
};
const osChange = () => {
  queryData.os = osValue.value;
};

// 整机列表
const columns1 = [
  { label: t('compatibility.architecture'), key: 'architecture', style: 'width: 10%' },
  { label: t('compatibility.hardwareManufacturer'), key: 'hardwareFactory', style: 'width: 20%' },
  { label: t('compatibility.hardwareMOdel'), key: 'hardwareModel', style: 'width: 17%' },
  { label: t('compatibility.os'), key: 'osVersion', style: 'width: 17%' },
  { label: t('compatibility.cpu'), key: 'cpu', style: 'width: 14%' },
  { label: t('compatibility.date'), key: 'date', style: 'width: 11%' },
  { label: t('compatibility.config'), key: 'config', style: 'width: 11%' },
];
const getCompatibilityData = (params: CompatibilityQueryT) => {
  getCompatibilityList(params).then((res) => {
    total.value = res.result.totalCount;
    tableData.value = res.result.hardwareCompList.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  })
};

// -------------------- 板卡 --------------------
// 板卡类型 option
const boardList = ref();
const boardValue = ref('');
const getBoardData = () => {
  getDriveTypes(locale.value).then((res) => {
    boardList.value = res.result;
  });
};
const boardChange = () => {
  queryData.cardType = boardValue.value;
};

// 板卡列表
const columns2 = [
  { label: t('compatibility.architecture'), key: 'architecture', style: 'width: 9%' },
  { label: t('compatibility.drive'), key: 'driverName', style: 'width: 9%' },
  { label: t('compatibility.os'), key: 'os', style: 'width: 16%' },
  { label: t('compatibility.version'), key: 'version', style: 'width: 7%' },
  { label: t('compatibility.type'), key: 'type', style: 'width: 8%' },
  { label: t('compatibility.manufacturer'), key: 'chipVendor', style: 'width: 15%' },
  { label: t('compatibility.boardModel'), key: 'boardModel', style: 'width: 16%' },
  { label: t('compatibility.chipModel'), key: 'chipModel', style: 'width: 10%' },
  { label: t('compatibility.date'), key: 'driverDate', style: 'width: 12%' },
];
const getDriverData = (params: CompatibilityQueryT) => {
  getDriverList(params).then((res) => {
    total.value = res.result.totalCount;
    tableData.value = res.result.driverCompList.sort((a: any, b: any) => {
      return (
        new Date(b.driverDate).getTime() - new Date(a.driverDate).getTime()
      );
    });
  })
};

// -------------------- 商业软件 --------------------
// 数据来源 option
const dataSourceList = [
  {
    label: '社区发行版',
    value: 'assessment',
  },
  {
    label: '商业发行版',
    value: 'upload',
  }
];
const dataSourceValue = ref('assessment');
const dataSourceChange = () => {
  queryData.dataSource = dataSourceValue.value;
  getBusinessSoftwareData(queryData);
};

// 测试机构 option
const testList = ref();
const testValue = ref('');
const getTestData = () => {
  getTestOrganizations().then((res) => {
    testList.value = res.result.testOrganizations;
  });
};
const testChange = () => {
  queryData.testOrganization = testValue.value;
};

// 商业软件列表
const columns3 = [
  { label: t('compatibility.softwareName'), key: 'productName', style: 'width: 20%' },
  { label: t('compatibility.version'), key: 'productVersion', style: 'width: 8%' },
  { label: t('compatibility.softwareType'), key: 'type', style: 'width: 10%' },
  { label: t('compatibility.os'), key: 'osConfig', style: 'width: 12%' },
  { label: t('compatibility.hardwareMOdel'), key: 'hardwareConfig', style: 'width: 10%' },
  { label: t('compatibility.manufacturer'), key: 'companyName', style: 'width: 20%' },
  { label: t('compatibility.testOrganization'), key: 'testOrganization', style: 'width: 20%' },
];
const getBusinessSoftwareData = (params: CompatibilityQueryT) => {
  getBusinessSoftwareList(params).then((res) => {
    total.value = res.result.totalNum;
    tableData.value = res.result.data.sort((a: any, b: any) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  })
};

// -------------------- 解决方案 --------------------
// 解决方案 option
const solutionList = ref();
const solutionValue = ref('');
const getSolutionData = () => {
  getSolution({lang: locale.value}).then((res) => {
    solutionList.value = res.result;
  });
};
const solutionChange = () => {
  queryData.solution = solutionValue.value;
};
// 认证类型 option
const certificationList = ref();
const certificationValue = ref('');
const getCertificationData = () => {
  getCertificationType({lang: locale.value}).then((res) => {
    certificationList.value = res.result;
  });
};
const certificationChange = () => {
  queryData.certificationType = certificationValue.value;
};
// 虚拟化信息
const virtualizationTableData = ref();
const columns5 = [
  { label: t('compatibility.virtualizationInfo'), key: 'title', style: 'width: 40%' },
  { label: t('compatibility.desc'), key: 'desc', style: 'width: 60%' },
];
// 服务器信息
const serverListData = ref();
// 解决方案
const columns4 = [
  { label: t('compatibility.architecture'), key: 'architecture', style: 'width: 10%' },
  { label: t('compatibility.solution'), key: 'solution', style: 'width: 10%' },
  { label: t('compatibility.type'), key: 'certificationType', style: 'width: 10%' },
  { label: t('compatibility.manufacturer'), key: 'serverVendor', style: 'width: 14%' },
  { label: t('compatibility.model'), key: 'serverModel', style: 'width: 14%' },
  { label: t('compatibility.os'), key: 'os', style: 'width: 18%' },
  { label: t('compatibility.date'), key: 'date', style: 'width: 12%' },
  { label: t('compatibility.intro'), key: 'intro', style: 'width: 12%' },
];
const getSolutionListData = (params: CompatibilityQueryT) => {
  getSolutionList(params).then((res) => {
    total.value = res.result.totalNum;
    tableData.value = res.result.solutionCompList.sort((a: any, b: any) => {
      return new Date(b.driverDate).getTime() - new Date(a.driverDate).getTime();
    });
    const info = tableData.value[0];
    virtualizationTableData.value = [
      {
        title: 'OS/OS Version',
        desc: info.os,
      },
      {
        title: 'OVS version',
        desc: info.OVSVersion,
      },
      {
        title: 'Stratovirt version',
        desc: info.stratovirtVersion,
      },
      {
        title: 'libvirt version',
        desc: info.libvirtVersion,
      },
      {
        title: 'Qemu version',
        desc: info.qemuVersion,
      }
    ];
    serverListData.value = tableData.value;
  })
};

// -------------------- 初始化 --------------------
onMounted(() => {
  getArchitectureData(); // 架构
  getCpuData(); // CPU
  getOSData(); // 操作系统
  getCompatibilityData(queryData); // 获取整机列表 表格数据
  getBoardData(); // 板卡类型
  getTestData(); // 测试机构
  getSolutionData(); // 解决方案
  getCertificationData(); // 认证类型
})

// -------------------- tab切换 --------------------
const activeTab = ref(0);
const changeTab = () => {
  if (activeTab.value === 1) {
    getDriverData(queryData);
  } else if (activeTab.value === 2) {
    dataSourceChange();
    getBusinessSoftwareData(queryData);
  } else if (activeTab.value === 3) {
    getSolutionListData(queryData);
  } else {
    getCompatibilityData(queryData);
  }
}
const clickTab = () => {
  initParams();
  changeTab();
};

// -------------------- 分页 --------------------
const onPaginationChange = (val: { page: number; pageSize: number }) => {
  // 当 pageSize 变化时将page_num 置为1
  if (val.pageSize !== queryData.pages.size) {
    queryData.pages.page = 1;
  } else {
    queryData.pages.page = val.page;
  }
  queryData.pages.size = val.pageSize;
  changeTab();
};

// -------------------- 更新数据 --------------------
watch(
  () => [
    queryData.architecture,
    queryData.cpu,
    queryData.os,
    queryData.keyword,
    queryData.cardType,
    queryData.testOrganization,
    queryData.solution,
    queryData.certificationType,
  ],
  () => {
    queryData.pages.page = 1;
    queryData.pages.size = 10;
    changeTab();
  }
);

const activeName = ref<number[]>([0]);

const gap = computed(() => {
  if (lePadV.value) {
    return '0 12px';
  } else if (lePad.value) {
    return '16px 16px';
  } else if (leLaptop.value) {
    return '24px 24px';
  }
  return '32px 32px';
})
</script>

<template>
  <BannerLevel2 v-if="!lePadV" class="compatibility-banner" :title="t('compatibility.title')" :background-image="banner"></BannerLevel2>
  <div v-else class="mo-banner">
    <p class="mo-title">{{ t('compatibility.title') }}</p>
  </div>
  <OTab v-model="activeTab" :line="false" :key="locale" @change="clickTab">
    <OTabPane :value="0" :label="t('compatibility.completeMachine')">
      <AppSection>
        <div class="tips">{{ t('compatibility.desc1') }} <OLink color="primary" variant="text" :href="`/${locale}/compatibility/hardware/`" target="_blank" hover-underline>{{ t('compatibility.desc2') }}</OLink></div>
        <div class="filter-box machine-filter">
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.architecture') }}</span>
            <OSelect v-model="architectureValue" size="large" @change="architectureChange">
              <OOption :label="t('compatibility.all')" value=""> </OOption>
              <OOption
                v-for="item in architectureList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.cpu') }}</span>
            <OSelect v-model="cpuValue" size="large" @change="cpuChange">
              <OOption :label="t('compatibility.all')" value="" class="cpu-option"> </OOption>
              <OOption
                v-for="item in cpuList"
                :key="item"
                :label="item"
                :value="item"
                class="cpu-option"
              >
                <p class="cpu-option-item">{{ item }}</p>
              </OOption>
            </OSelect>
          </div>
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.os') }}</span>
            <OSelect v-model="osValue" size="large" @change="osChange">
              <OOption :label="t('compatibility.all')" value=""> </OOption>
              <OOption
                v-for="item in osList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter item-search">
            <span class="item-title">{{ t('compatibility.search') }}</span>
            <OInput
              v-model="searchValue"
              :size="lePadV ? 'medium' : 'large'"
              @input="(e) => onInput(e.target?.value)"
              :placeholder="t('compatibility.inputPlaceholder1')"
              clearable
              @clear="onInput('')"
              class="input-search"
            >
              <template #prefix>
                <OIcon><IconSearch /></OIcon>
              </template>
            </OInput>
          </div>
        </div>
        <OTable v-if="!lePadV" :columns="columns1" :data="tableData">
          <template #td_hardwareFactory="{ row }">
            <OLink
              v-if="row.friendlyLink"
              color="primary"
              variant="text"
              :href="row.friendlyLink"
              target="_blank"
              hover-underline
            >
              {{ row.hardwareFactory }}
            </OLink>
            <span v-else>{{ row.hardwareFactory }}</span>
          </template>
          <template #td_config="{ row }">
            <OLink
              color="primary"
              variant="text"
              :href="`/${locale}/compatibility/software-info/?id=${row.id}`"
              target="_blank"
              hover-underline
            >
              {{t('compatibility.detailInfo')}}
            </OLink>
          </template>
        </OTable>
        <template v-else>
          <OCollapse v-if="tableData?.length" v-model="activeName" accordion>
            <OCollapseItem v-for="(item, i) in tableData" :key="i" :value="i">
              <template #title>
                <div class="head-title">
                  <OLink
                    v-if="item.friendlyLink"
                    color="primary"
                    variant="text"
                    :href="item.friendlyLink"
                    target="_blank"
                  >
                    {{ item.hardwareFactory }}
                  </OLink>
                  <span v-else>{{ item.hardwareFactory }}</span>
                  <p class="hardware-model">{{ item.hardwareModel }}</p>
                </div>
              </template>
              <div class="content-boy">
                <div class="info-item">
                  <p class="label">{{  t('compatibility.architecture') }}</p>
                  <p class="text">{{ item.architecture }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.os') }}</p>
                  <p class="text">{{ item.osVersion }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.cpu') }}</p>
                  <p class="text">{{ item.cpu }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.date') }}</p>
                  <p class="text">{{ item.date }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.config') }}</p>
                  <OLink
                    color="primary"
                    variant="text"
                    :href="`/${locale}/compatibility/software-info/?id=${item.id}`"
                    target="_blank"
                    class="text"
                  >
                    {{ t('compatibility.detailInfo') }}
                  </OLink>
                </div>
              </div>
            </OCollapseItem>
          </OCollapse>
          <ResultEmpty
            v-else
            :style="{
              'margin-top': '40px',
              '--result-image-width': '140px',
              '--result-image-height': '170px',
            }"
          />
        </template>
        <div v-if="total > COUNT_PER_PAGE[0]" class="pagination">
          <OPagination
            :total="total"
            :page="queryData.pages.page"
            :page-size="queryData.pages.size"
            :page-sizes="COUNT_PER_PAGE"
            :layout="['total', 'jumper', 'pager', 'pagesize']"
            :show-more="false"
            :simple="lePadV"
            @change="onPaginationChange"
          ></OPagination>
        </div>
      </AppSection>
    </OTabPane>
    <OTabPane :value="1" :label="t('compatibility.board')">
      <AppSection>
        <div class="tips">{{ t('compatibility.desc1') }} <OLink color="primary" variant="text" :href="`/${locale}/compatibility/hardware/`" target="_blank" hover-underline>{{ t('compatibility.desc2') }}</OLink></div>
        <div class="filter-box board-filter">
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.architecture') }}</span>
            <OSelect v-model="architectureValue" size="large" @change="architectureChange">
              <OOption :label="t('compatibility.all')" value=""> </OOption>
              <OOption
                v-for="item in architectureList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.os') }}</span>
            <OSelect v-model="osValue" size="large" @change="osChange">
              <OOption :label="t('compatibility.all')" value=""> </OOption>
              <OOption
                v-for="item in osList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.boardType') }}</span>
            <OSelect v-model="boardValue" size="large" @change="boardChange">
              <OOption :label="t('compatibility.all')" value=""> </OOption>
              <OOption
                v-for="item in boardList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter item-search">
            <span class="item-title">{{ t('compatibility.search') }}</span>
            <OInput
              v-model="searchValue"
              size="large"
              @input="(e) => onInput(e.target?.value)"
              :placeholder="t('compatibility.inputPlaceholder2')"
              :title="!queryData.keyword ? t('compatibility.inputPlaceholder2') : ''"
              clearable
              @clear="onInput('')"
              class="input-search"
            >
              <template #prefix>
                <OIcon><IconSearch /></OIcon>
              </template>
            </OInput>
          </div>
        </div>
        <OTable v-if="!lePadV" :columns="columns2" :data="tableData"></OTable>
        <template v-else>
          <OCollapse v-if="tableData?.length" v-model="activeName" accordion>
            <OCollapseItem v-for="(item, i) in tableData" :key="i" :value="i">
              <template #title>
                <div class="head-title">
                  <p class="hardware-model">{{ item.boardModel }}</p>
                </div>
              </template>
              <div class="content-boy">
                <div class="info-item">
                  <p class="label">{{  t('compatibility.architecture') }}</p>
                  <p class="text">{{ item.architecture }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.drive') }}</p>
                  <p class="text">{{ item.driverName }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.os') }}</p>
                  <p class="text">{{ item.os }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.version') }}</p>
                  <p class="text">{{ item.version }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.type') }}</p>
                  <p class="text">{{ item.type }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.manufacturer') }}</p>
                  <p class="text">{{ item.chipVendor }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.chipModel') }}</p>
                  <p class="text">{{ item.chipModel }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.date') }}</p>
                  <p class="text">{{ item.driverDate }}</p>
                </div>
              </div>
            </OCollapseItem>
          </OCollapse>
          <ResultEmpty
            v-else
            :style="{
              'margin-top': '40px',
              '--result-image-width': '140px',
              '--result-image-height': '170px',
            }"
          />
        </template>
        <div v-if="total > COUNT_PER_PAGE[0]" class="pagination">
          <OPagination
            :total="total"
            :page="queryData.pages.page"
            :page-size="queryData.pages.size"
            :page-sizes="COUNT_PER_PAGE"
            :layout="['total', 'jumper', 'pager', 'pagesize']"
            :show-more="false"
            :simple="lePadV"
            @change="onPaginationChange"
          ></OPagination>
        </div>
      </AppSection>
    </OTabPane>
    <OTabPane v-if="locale === 'zh'" :value="2" :label="'商业软件'">
      <AppSection>
        <div class="tips">
          <div>{{ t('compatibility.desc3') }} <OLink color="primary" variant="text" href="https://atomgit.com/openeuler/technical-certification" target="_blank" hover-underline>{{ t('compatibility.desc4') }}</OLink></div>
          <div>{{ t('compatibility.desc5') }}</div>
        </div>
        <div class="filter-box">
          <div class="item-filter">
            <span class="item-title">数据来源</span>
            <OSelect v-model="dataSourceValue" size="large" @change="dataSourceChange">
              <OOption
                v-for="item in dataSourceList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </OSelect>
          </div>
          <div class="item-filter">
            <span class="item-title">测试机构</span>
            <OSelect v-model="testValue" size="large" @change="testChange">
              <OOption :label="t('compatibility.all')" value=""></OOption>
              <OOption
                v-for="item in testList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter item-search">
            <span class="item-title">{{ t('compatibility.search') }}</span>
            <OInput
              v-model="searchValue"
              size="large"
              @input="(e) => onInput(e.target?.value)"
              :placeholder="t('compatibility.inputPlaceholder1')"
              clearable
              @clear="onInput('')"
              class="input-search"
            >
              <template #prefix>
                <OIcon><IconSearch /></OIcon>
              </template>
            </OInput>
          </div>
        </div>
        <OTable v-if="!lePadV" :columns="columns3" :data="tableData">
          <template #td_osConfig="{ row }">
            <p>{{ row.osName }} {{ row.osVersion }}</p>
          </template>
          <template #td_hardwareConfig="{ row }">
            <div
              v-for="item in row.platformTypeAndServerModel"
              :key="item"
            >
              <p>{{ item.serverTypes[0] }}</p>
              <p>{{ item.serverTypes[1] }}</p>
            </div>
          </template>
        </OTable>
        <template v-else>
          <OCollapse v-if="tableData?.length" v-model="activeName" accordion>
            <OCollapseItem v-for="(item, i) in tableData" :key="i" :value="i">
              <template #title>
                <div class="head-title">
                  <p class="hardware-model">{{ item.productName }}</p>
                </div>
              </template>
              <div class="content-boy">
                <div class="info-item">
                  <p class="label">{{  t('compatibility.version') }}</p>
                  <p class="text">{{ item.productVersion }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.softwareType') }}</p>
                  <p class="text">{{ item.type }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.os') }}</p>
                  <p class="text">{{ item.osName }} {{ item.osVersion }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.hardwareMOdel') }}</p>
                  <p class="text">
                    <div
                      v-for="val in item.platformTypeAndServerModel"
                      :key="val"
                    >
                      {{ val.serverTypes[0] }}{{ val.serverTypes[1] }}
                    </div>
                  </p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.manufacturer') }}</p>
                  <p class="text">{{ item.companyName }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.testOrganization') }}</p>
                  <p class="text">{{ item.testOrganization }}</p>
                </div>
              </div>
            </OCollapseItem>
          </OCollapse>
          <ResultEmpty
            v-else
            :style="{
              'margin-top': '40px',
              '--result-image-width': '140px',
              '--result-image-height': '170px',
            }"
          />
        </template>
        <div v-if="total > COUNT_PER_PAGE[0]" class="pagination">
          <OPagination
            :total="total"
            :page="queryData.pages.page"
            :page-size="queryData.pages.size"
            :page-sizes="COUNT_PER_PAGE"
            :layout="['total', 'jumper', 'pager', 'pagesize']"
            :show-more="false"
            :simple="lePadV"
            @change="onPaginationChange"
          ></OPagination>
        </div>
      </AppSection>
    </OTabPane>
    <OTabPane :value="3" :label="t('compatibility.solution')">
      <AppSection>
        <div class="filter-box">
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.solution') }}</span>
            <OSelect v-model="solutionValue" size="large" @change="solutionChange">
              <OOption :label="t('compatibility.all')" value=""> </OOption>
              <OOption
                v-for="item in solutionList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter">
            <span class="item-title">{{ t('compatibility.certificationType') }}</span>
            <OSelect v-model="certificationValue" size="large" @change="certificationChange">
              <OOption :label="t('compatibility.all')" value=""> </OOption>
              <OOption
                v-for="item in certificationList"
                :key="item"
                :label="item"
                :value="item"
              />
            </OSelect>
          </div>
          <div class="item-filter item-search">
            <span class="item-title">{{ t('compatibility.search') }}</span>
            <OInput
              v-model="searchValue"
              size="large"
              @input="(e) => onInput(e.target?.value)"
              :placeholder="t('compatibility.inputPlaceholder1')"
              clearable
              @clear="onInput('')"
              class="input-search"
            >
              <template #prefix>
                <OIcon><IconSearch /></OIcon>
              </template>
            </OInput>
          </div>
        </div>
        <OTable v-if="!lePadV" :columns="columns4" :data="tableData">
          <template #td_intro="{ row }">
            <OLink
              color="primary"
              variant="text"
              :href="row.introduceLink"
              target="_blank"
              hover-underline
            >
              {{t('compatibility.detailInfo')}}
            </OLink>
          </template>
        </OTable>
        <template v-else>
          <OCollapse v-if="tableData?.length" v-model="activeName" accordion>
            <OCollapseItem v-for="(item, i) in tableData" :key="i" :value="i">
              <template #title>
                <div class="head-title">
                  <p class="hardware-model">{{ item.serverModel }}</p>
                </div>
              </template>
              <div class="content-boy">
                <div class="info-item">
                  <p class="label">{{  t('compatibility.architecture') }}</p>
                  <p class="text">{{ item.architecture }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.solution') }}</p>
                  <p class="text">{{ item.solution }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.type') }}</p>
                  <p class="text">{{ item.certificationType }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.manufacturer') }}</p>
                  <p class="text">{{ item.serverVendor }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.model') }}</p>
                  <p class="text">{{ item.serverModel }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.os') }}</p>
                  <p class="text">{{ item.os }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.date') }}</p>
                  <p class="text">{{ item.date }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.intro') }}</p>
                  <OLink
                    color="primary"
                    variant="text"
                    :href="item.introduceLink"
                    target="_blank"
                    class="text"
                  >
                    {{t('compatibility.detailInfo')}}
                  </OLink>
                </div>
              </div>
            </OCollapseItem>
          </OCollapse>
          <ResultEmpty
            v-else
            :style="{
              'margin-top': '40px',
              '--result-image-width': '140px',
              '--result-image-height': '170px',
            }"
          />
        </template>
        <div v-if="total > COUNT_PER_PAGE[0]" class="pagination">
          <OPagination
            :total="total"
            :page="queryData.pages.page"
            :page-size="queryData.pages.size"
            :page-sizes="COUNT_PER_PAGE"
            :layout="['total', 'jumper', 'pager', 'pagesize']"
            :show-more="false"
            :simple="lePadV"
            @change="onPaginationChange"
          ></OPagination>
        </div>
        <div class="solution-details">
          <p class="detail-title">{{ t('compatibility.virtualizationInfo') }}</p>
          <OTable :columns="columns5" :data="virtualizationTableData"></OTable>
        </div>
        <div class="server-details">
          <p class="detail-title">{{ t('compatibility.serverInfo') }}</p>
          <ORow :gap="gap" flex-wrap="wrap">
            <OCol v-for="item in serverListData" :key="item.id" :flex="lePadV ? '0 0 100%' : lePad ? '0 0 50%' : '0 0 33.33%'">
              <div class="card-detail">
                <p class="info-title">{{ item.serverVendor }}</p>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.product') }}</p>
                  <p class="text">{{ item.product }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.bios') }}</p>
                  <p class="text">{{ item.biosUefi }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.architecture') }}</p>
                  <p class="text">{{ item.architecture }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.cpu') }}</p>
                  <p class="text">{{ item.cpu }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.network') }}</p>
                  <p class="text">{{ item.networkCard }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.driver') }}</p>
                  <p class="text">{{ item.driver }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.hard') }}</p>
                  <p class="text">{{ item.hardDiskDrive }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.raid') }}</p>
                  <p class="text">{{ item.raid }}</p>
                </div>
                <div class="info-item">
                  <p class="label">{{  t('compatibility.ram') }}</p>
                  <p class="text">{{ item.ram }}</p>
                </div>
              </div>
            </OCol>
          </ORow>
        </div>
      </AppSection>
    </OTabPane>
  </OTab>
</template>

<style scoped lang="scss">
.compatibility-banner {
  background-color: var(--o-color-fill2);
  :deep(.wrap) {
    height: 280px;
    .banner-text {
      max-width: 60%;
      .banner-title {
        color: var(--o-color-black);
        @include display2;
      }
    }

    @media screen and (max-width: 1680px) {
      height: 220px;

      .banner-text {
        .banner-title {
          font-size: 40px;
          line-height: 56px;
        }
      }
    }

    @media screen and (max-width: 1200px) {
      height: 180px;

      .banner-text {
        .banner-title {
          @include display2;
        }
      }
    }
  }
}

.mo-banner {
  @include respond-to('<=pad_v') {
    padding: 24px var(--layout-content-padding) 20px;
    .mo-title {
      font-weight: 500;
      @include display3;
    }
  }
  @include respond-to('phone') {
    .mo-title {
      @include display1;
    }
  }
}

:deep(.app-section) {
  --o-gap-section: 40px;
  .section-wrapper {
    padding-bottom: 72px !important;
  }

  @include respond-to('<=laptop') {
    --o-gap-section: 32px;
    .section-wrapper {
      padding-bottom: 48px !important;
    }
  }
  @include respond-to('phone') {
    --o-gap-section: 16px;
    .section-wrapper {
      padding-bottom: 24px !important;
    }
  }
}

.o-tab {
  --tab-nav-padding: 16px 0 18px 0;
  --tab-nav-gap: 40px;
  :deep(.o-tab-head) {
    background-color: var(--o-color-fill2);
    @include h4;
  }
}

.tips {
  text-align: center;
  @include text1;
  .o-link {
    display: inline;
  }
}
.o-link {
  padding: 0;
}

.filter-box {
  background-color: var(--o-color-fill2);
  padding: 16px 32px;
  border-radius: var(--o-radius-xs);
  display: flex;
  align-items: center;
  margin-top: 40px;
}
.item-title {
  margin-right: 24px;
  color: var(--o-color-info2);
  @include text1;
}
.o-select {
  width: 220px;
}
.item-filter + .item-filter {
  margin-left: 32px;
}
.item-filter {
  &:last-child {
    margin-left: auto !important;
    .item-title {
      display: none;
    }
  }
}
.o-input {
  width: 320px;
  :deep(.o_box) {
    width: 100%;
    .o_input {
      width: 100%;
    }
  }
}
:deep(.o-option-item) {
  white-space: nowrap;
  @include text-truncate(1);
}

.o-table {
  margin-top: 32px;
}
.pagination {
  margin-top: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.detail-title {
  margin-top: 72px;
  color: var(--o-color-info1);
  font-weight: 500;
  text-align: center;
  @include display3;
}

.server-details {
  .o-row {
    margin-top: 40px;
  }
  .card-detail {
    height: 100%;
    background-color: var(--o-color-fill2);
    padding: 24px;
    border-radius: var(--o-radius-xs);
  }
  .info-title {
    color: var(--o-color-info1);
    font-weight: 500;
    @include h3;
  }
  .info-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    color: var(--o-color-info1);
    @include tip1;
  }
  .label {
    color: var(--o-color-info2);
  }
  .text {
    text-align: right;
  }
  .info-item + .info-item {
    margin-top: 8px;
  }
}

@media (max-width: 1500px) {
  .board-filter {
    .o-select {
      width: 210px;
    }
    .o-input {
      width: 300px;
    }
  }
}

@include respond-to('<=laptop') {
  .filter-box {
    padding: 16px 24px;
  }
  .item-title {
    margin-right: 16px;
  }
  .o-select {
    width: 180px;
  }
  .item-filter + .item-filter {
    margin-left: 24px;
  }
  .o-input {
    width: 280px;
  }
  .board-filter {
    .o-select {
      width: 180px;
    }
    .o-input {
      width: 280px;
    }
  }
  .solution-details {
    .o-table {
      margin-top: 24px;
    }
  }
  .server-details {
    .o-row {
      margin-top: 24px;
    }
  }
  .detail-title {
    margin-top: 56px;
  }
}

@include respond-to('pad_h') {
  .filter-box {
    flex-direction: column;
    align-items: flex-start;
  }
  .item-filter + .item-filter {
    margin-left: 0;
    margin-top: 16px;
  }
  .item-filter {
    .item-title {
      width: 64px;
      display: inline-block;
    }
    &:last-child {
      margin-left: 0 !important;
      .item-title {
        display: inline-block;
      }
    }
  }
  .o-select {
    width: 320px;
  }
  .o-input {
    width: 320px;
  }
  .cpu-option {
    width: 306px;
    .cpu-option-item {
      width: 306px;
      @include text-truncate(1);
    }
  }
  .machine-filter,
  .board-filter {
    flex-direction: row;
    flex-wrap: wrap;
    .item-filter {
      &:nth-child(2n) {
        margin-left: 64px !important;
      }
      &:nth-of-type(2) {
        margin-top: 0;
      }
    }
    .o-select {
      width: 280px;
      @media (max-width: 900px) {
        width: 220px;
      }
    }
    .o-input {
      width: 280px;
      @media (max-width: 900px) {
        width: 220px;
      }
    }
  }
  .solution-details {
    .o-table {
      margin-top: 16px;
    }
  }
  .server-details {
    .o-row {
      margin-top: 16px;
    }
  }
  .detail-title {
    margin-top: 40px;
  }
}

@include respond-to('<=pad_v') {
  .o-tab {
    --tab-nav-padding: 0;
    --tab-nav-gap: 16px;
    --tab-nav-justify: flex-start;
    :deep(.o-tab-head) {
      background-color: transparent;
      padding: 0 var(--layout-content-padding);
      @include h4;
    }
  }
  .tips {
    text-align: left;
    @include text2;
  }
  .filter-box {
    background-color: transparent;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 24px;
  }
  .item-filter + .item-filter {
    margin-left: 0;
    margin-top: 16px;
  }
  .item-filter {
    width: 100%;
    .item-title {
      display: block;
      margin-bottom: 8px;
    }
    &:last-child {
      .item-title {
        display: block;
      }
    }
  }
  .o-select {
    width: 100%;
  }
  .o-input {
    width: 100%;
    :deep(.o_box) {
      --box-height: 40px;
    }
  }
  .cpu-option {
    width: 100%;
    .cpu-option-item {
      max-width: 100%;
      @include text-truncate(1);
    }
  }

  .board-filter {
    .o-select {
      width: 100%;
    }
    .o-input {
      width: 100%;
    }
  }

  .solution-details {
    .o-table {
      margin-top: 12px;
      --table-edge-padding: 12px;
      --table-head-cell-padding: 8px 12px;
    }
  }
  .server-details {
    .o-row {
      margin-top: 12px;
    }
    .card-detail {
      padding: 12px 16px;
    }
    .info-item {
      @include text1;
    }
  }
  .detail-title {
    margin-top: 32px;
  }

  .o-collapse {
    margin-top: 24px;
    overflow: auto;
    :deep(.o-collapse-item-icon) {
      height: min-content;
    }
    :deep(.o-collapse-item-title) {
      white-space: normal;
    }
  }
  .head-title {
    .o-link {
      margin-bottom: 8px;
    }
  }
  .info-item {
    display: flex;
    align-items: center;
    color: var(--o-color-info1);
    @include text1;
  }
  .label {
    color: var(--o-color-info2);
    width: 80px;
    margin-right: 16px;
    flex-shrink: 0;
  }
  .info-item + .info-item {
    margin-top: 8px;
  }
  .pagination {
    margin-top: 16px;
    justify-content: center;
  }
}

@include respond-to('phone') {
  .item-title {
    @include text2;
  }
  .info-item {
    @include text2;
  }
  .server-details {
    .info-item {
      @include text2;
    }
  }
}
</style>
