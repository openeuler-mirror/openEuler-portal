<script lang="ts" setup>
import { ref, reactive, onMounted, nextTick, computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import TagFilter from '@/components/TagFilter.vue';
import AppPaginationMo from '@/components/AppPaginationMo.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/banner/banner-security.png';
import compatibility from '@/assets/illustrations/support/compatibility.png';

import useWindowResize from '@/components/hooks/useWindowResize';

import type {
  CveQuery,
  FilterList,
  CompatibilityList,
  BoardCardList,
  BusinessSoftWareList,
} from '@/shared/@types/type-support';

import {
  getCompatibilityList,
  getDriverList,
  driverArchitectureOptions,
  driverOSOptions,
  getSoftwareList,
  getBusinessSoftwareList,
  getTestOrganizations,
  getCpu,
  getSoftFilter,
  getDriveTypes,
} from '@/api/api-security';

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));
const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const all = computed(() => {
  if (lang.value === 'en') {
    return 'All';
  } else if (lang.value === 'ru') {
    return 'Bсе';
  } else {
    return '全部';
  }
});

const searchContent = ref('');
const activeIndex = ref(0);
const activeIndex1 = ref(0);
const activeIndex2 = ref(0);
const activeIndex3 = ref(0);
const activeIndex4 = ref(0);
const activeIndex5 = ref(0);
const activeIndex6 = ref(0);
const total = ref(0);
const layout = ref('sizes, prev, pager, next, slot, jumper');
const architectureSelect = ref<string[]>([`${all.value}`]);
const osOptions = ref<string[]>([`${all.value}`]);
const cpuList = ref<string[]>([`${all.value}`]);
const softType = ref<string[]>([`${all.value}`]);
const osLists = ref<string[]>([`${all.value}`]);
const typeLists = ref<string[]>([`${all.value}`]);

const activeName = ref('1');
const testOrganizationsLists = ref<string[]>([`${all.value}`]);
const lastActiveName = ref('1');
const currentPage = ref(1);
const totalPage = ref(0);
const osName = ref('');
const architehture = ref('');
const cpuName = ref('');
const typeName = ref('');
const driveType = ref('');
const dataSourceList = ref<string[]>(['社区发行版', '商业发行版']);

const filterData = ref<FilterList[]>([
  {
    select: [],
    title: '操作系统',
  },
  {
    select: [],
    title: '架构',
  },
  {
    select: [],
    title: 'CPU',
  },
]);
const filterDataTwo = ref<FilterList[]>([
  {
    select: [],
    title: '操作系统',
  },
  {
    select: [],
    title: '架构',
  },
]);

const queryData: CveQuery = reactive({
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
  lang: `${lang.value}`,
  dataSource: '',
});

const tableData = ref<
  CompatibilityList[] | BoardCardList[] | BusinessSoftWareList[]
>([]);
// const tableData = ref<any>([]);

// 整机
const getCompatibilityData = (data: CveQuery) => {
  try {
    getCompatibilityList(data).then((res: any) => {
      total.value = res.result.totalCount;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
      tableData.value = res.result.hardwareCompList.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });
  } catch (e: any) {
    console.log(e)
  }
};

// 板卡
const getDriverData = (data: CveQuery) => {
  try {
    getDriverList(data).then((res: any) => {
      total.value = res.result.totalCount;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
      tableData.value = res.result.driverCompList.sort((a: any, b: any) => {
        return (
          new Date(b.driverDate).getTime() - new Date(a.driverDate).getTime()
        );
      });
    });
  } catch (e: any) {
    console.log(e)
  }
};

// 开源软件
const getSoftwareData = (data: CveQuery) => {
  try {
    getSoftwareList(data).then((res: any) => {
      total.value = res.total;
      totalPage.value = Math.ceil(total.value / queryData.pages.size);
      tableData.value = res.info;
    });
  } catch (e: any) {
    console.log(e)
  }
};

// 商业软件
const getBusinessSoftwareData = (data: CveQuery) => {
  try {
    getBusinessSoftwareList(data).then((res: any) => {
      total.value = res.result.totalNum;
      tableData.value = res.result.data;
    });
  } catch (e: any) {
    console.log(e)
  }
};

function turnPage(option: string) {
  if (option === 'prev' && currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    queryData.pages.page = currentPage.value;
    initMobileData(queryData);
  } else if (option === 'next' && currentPage.value < totalPage.value) {
    currentPage.value = currentPage.value + 1;
    queryData.pages.page = currentPage.value;
    initMobileData(queryData);
  }
}

const jumpPage = (page: number) => {
  currentPage.value = page;
  queryData.pages.page = currentPage.value;
  initMobileData(queryData);
};

const handleChange = () => {
  initQueryData();

  currentPage.value = 1;
  if (activeName.value) {
    lastActiveName.value = activeName.value;
  } else {
    activeName.value = lastActiveName.value;
  }
  initMobileData(queryData);
};

const initQueryData = () => {
  queryData.pages.page = 1;
  queryData.pages.size = 10;
  queryData.architecture = '';
  queryData.keyword = '';
  queryData.cpu = '';
  queryData.os = '';
  queryData.cardType = '';
  queryData.dataSource = 'assessment';

  currentPage.value = 1;

  searchContent.value = '';
  activeIndex1.value = 0;
  activeIndex.value = 0;

  osName.value = '';
  architehture.value = '';
  cpuName.value = '';
  typeName.value = '';
};

const handleClick = () => {
  initQueryData();

  nextTick(() => {
    initData(queryData);
  });
};

const initMobileData = (params: CveQuery) => {
  if (activeName.value === '1') {
    getCompatibilityData(params);
  } else if (activeName.value === '2') {
    getDriverData(params);
  } else if (activeName.value === '3') {
    getSoftwareData(params);
  } else {
    getBusinessSoftwareData(params);
  }
};

const initData = (params: CveQuery) => {
  if (activeName.value === '1') {
    getCompatibilityData(params);
  } else if (activeName.value === '2') {
    getDriverData(params);
  } else if (activeName.value === '3') {
    getSoftwareData(params);
  } else {
    getBusinessSoftwareData(params);
  }
};

const selectTypeTag = (i: number, item: string) => {
  activeIndex.value = i;
  osName.value = item;
  queryData.os = item === '全部' ? '' : item;
  initData(queryData);
};

const selectOptionTag = (i: number, item: string) => {
  activeIndex1.value = i;
  if (activeName.value === 'fourth') {
    queryData.testOrganization = item === '全部' ? '' : item;
  } else {
    queryData.architecture = item === '全部' ? '' : item;
    architehture.value = item === '全部' ? '' : item;
  }
  initData(queryData);
};

const clickDriveType = (i: number, item: string) => {
  activeIndex4.value = i;
  queryData.cardType = item === '全部' ? '' : item;
  driveType.value = item;

  initData(queryData);
};

function clickCpuTag(index: number, item: string) {
  activeIndex2.value = index;
  queryData.cpu = item === '全部' ? '' : item;
  cpuName.value = item === '全部' ? '' : item;
  initData(queryData);
}

const handleSizeChange = (val: number) => {
  queryData.pages.size = val;
  initData(queryData);
};

const handleCurrentChange = (val: number) => {
  queryData.pages.page = val;
  currentPage.value = val;
  initData(queryData);
};

function changeSearchVal() {
  queryData.keyword = searchContent.value;
  initData(queryData);
}

function searchTestOrganization(i: number, item: string) {
  activeIndex5.value = i;
  queryData.testOrganization = item === '全部' ? '' : item;
  initData(queryData);
}

function searchDataSource(i: number, item: string) {
  activeIndex6.value = i;
  queryData.dataSource = item === '商业发行版' ? 'upload' : 'assessment';
  initData(queryData);
}

const goBackPage = () => {
  if (activeName.value === '1' || activeName.value === '2') {
    router.go(`/${lang.value}/compatibility/hardware/`);
  } else if (activeName.value === '3') {
    router.go(`/${lang.value}/compatibility/software/`);
  } else {
    window.open(
      'https://gitee.com/openeuler/technical-certification',
      '_blank'
    );
  }
};

function selectDriveType(val: string) {
  queryData.cardType = val === '全部' ? '' : val;
  activeIndex4.value = typeLists.value.indexOf(val);
  initMobileData(queryData);
}

function selectOsName(val: string) {
  queryData.os = val === '全部' ? '' : val;
  activeIndex.value = osOptions.value.indexOf(val);

  initMobileData(queryData);
}

function selectArchitehture(val: string) {
  queryData.architecture = val === '全部' ? '' : val;
  activeIndex1.value = architectureSelect.value.indexOf(val);
  architehture.value = val;
  initMobileData(queryData);
}

function selectCpu(val: string) {
  queryData.cpu = cpuName.value = val === '全部' ? '' : val;
  activeIndex2.value = cpuList.value.indexOf(val);
  cpuName.value = val;
  initMobileData(queryData);
}

function clickSoftType(i: number, val: string) {
  queryData.type = val === '全部' ? '' : val;
  activeIndex3.value = i;
  typeName.value = val;
  initMobileData(queryData);
}

function selectType(val: string) {
  activeIndex3.value = softType.value.indexOf(val);
  queryData.type = typeName.value = val === '全部' ? '' : val;
  initMobileData(queryData);
}

const goSoftwareInfo = (id: number) => {
  router.go(`${router.route.path}software-info/?id=${id}`);
};

onMounted(() => {
  getCompatibilityData(queryData);

  try {
    getDriveTypes(lang.value).then((res: any) => {
      if (res.success) {
        res.result.forEach((item: string) => {
          typeLists.value.push(item);
        });
      }
    });
  } catch (e: any) {
    console.log(e)
  }

  try {
    driverArchitectureOptions({ lang: `${lang.value}` }).then((res: any) => {
      res.result.forEach((item: string) => {
        architectureSelect.value.push(item);
        filterData.value.forEach((it) => {
          if (it.title === '架构') {
            it.select.push(item);
          }
        });
        filterDataTwo.value.forEach((it) => {
          if (it.title === '架构') {
            it.select.push(item);
          }
        });
      });
    });
  } catch (e: any) {
    console.log(e)
  }

  try {
    driverOSOptions({ lang: `${lang.value}` }).then((res: any) => {
      res.result.forEach((item: string) => {
        osOptions.value.push(item);
        filterData.value.forEach((it) => {
          if (it.title === '操作系统') {
            it.select.push(item);
          }
        });
        filterDataTwo.value.forEach((it) => {
          if (it.title === '操作系统') {
            it.select.push(item);
          }
        });
      });
    });
  } catch (e: any) {
    console.log(e)
  }

  try {
    getTestOrganizations().then((res: any) => {
      res.result.testOrganizations.forEach((item: string) => {
        testOrganizationsLists.value.push(item);
      });
    });
  } catch (e: any) {
    console.log(e)
  }

  try {
    getCpu({ lang: `${lang.value}` }).then((res: any) => {
      res.result.forEach((item: string) => {
        cpuList.value.push(item);
        filterData.value.forEach((it) => {
          if (it.title === 'CPU') {
            it.select.push(item);
          }
        });
      });
    });
  } catch (e: any) {
    console.log(e)
  }

  try {
    getSoftFilter().then((res: any) => {
      res.Type.forEach((item: string) => {
        softType.value.push(item);
      });
      osLists.value.push(res.OS[0]);
    });
  } catch (e: any) {
    console.log(e)
  }
});
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    background-text="SUPPORT"
    :title="i18n.compatibility.COMPATIBILITY"
    subtitle=""
    :illustration="compatibility"
  />

  <OTabs v-model="activeName" class="tabs-pc" @tab-click="handleClick">
    <AppContent>
      <OTabPane :label="i18n.compatibility.HARDWARE" name="1">
        <OSearch
          v-model="searchContent"
          class="o-search"
          :placeholder="i18n.compatibility.HARDWARE_SEARCH_PLACEHOLDER"
          @change="changeSearchVal"
        ></OSearch>

        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.OS" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  checkable
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="selectTypeTag(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter :show="false" :label="i18n.compatibility.ARCHITECTURE">
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                checkable
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="selectOptionTag(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
            <TagFilter :show="false" :label="i18n.compatibility.CPU">
              <OTag
                v-for="(item, index) in cpuList"
                :key="'tag' + index"
                checkable
                :type="activeIndex2 === index ? 'primary' : 'text'"
                @click="clickCpuTag(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>

        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE"
            prop="architecture"
            width="140"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR"
            prop="hardwareFactory"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL"
            prop="hardwareModel"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_DETAIL.LABELS.CPU"
            prop="cpu"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS"
            prop="osVersion"
            width="220"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE"
            prop="date"
          ></OTableColumn>
          <el-table-column
            :label="
              i18n.compatibility.HARDWARE_TABLE_COLUMN
                .COMPATIBILITY_CONFIGURATION
            "
            width="220"
          >
            <template #default="scope">
              <span
                class="hardware-info"
                @click="goSoftwareInfo(scope.row.id)"
                >{{
                  i18n.compatibility.HARDWARE_TABLE_COLUMN
                    .COMPATIBILITY_CONFIGURATION2
                }}</span
              >
            </template>
          </el-table-column>
          <el-table-column
            :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.REFERRENCE"
            width="100"
          >
            <template #default="scope">
              <a
                class="friendly-link"
                :href="scope.row.friendlyLink"
                target="_blank"
                rel="noopener noreferrer"
                >link</a
              >
            </template>
          </el-table-column>
        </OTable>
      </OTabPane>

      <OTabPane :label="i18n.compatibility.DRIVE" name="2">
        <OSearch
          v-model="searchContent"
          class="o-search"
          :placeholder="i18n.compatibility.DRIVE_SEARCH_PLACEHOLDER"
          @change="changeSearchVal"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.OS" :show="false" checkable>
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  checkable
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="selectTypeTag(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter
              :show="false"
              :label="i18n.compatibility.ARCHITECTURE"
              checkable
            >
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                checkable
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="selectOptionTag(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>

            <TagFilter
              :show="false"
              :label="i18n.compatibility.DRIVETYPE"
              checkable
            >
              <OTag
                v-for="(item, index) in typeLists"
                :key="'tag' + index"
                checkable
                :type="activeIndex4 === index ? 'primary' : 'text'"
                @click="clickDriveType(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE"
            prop="architecture"
            width="130"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME"
            prop="driverName"
            width="160"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS"
            prop="os"
            width="200"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION"
            prop="version"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE"
            prop="type"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_DATE"
            prop="driverDate"
            width="150"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR"
            prop="chipVendor"
            width="140"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL"
            prop="boardModel"
            width="180"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL"
            prop="chipModel"
          ></OTableColumn>
        </OTable>
      </OTabPane>

      <OTabPane
        v-if="lang === 'zh'"
        :label="i18n.compatibility.SOFTWARE"
        name="3"
      >
        <OSearch
          v-model="searchContent"
          class="o-search"
          :placeholder="i18n.compatibility.SOFTWARE_SEARCH_PLACEHOLDER"
          @change="changeSearchVal"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.OS" :show="false">
                <OTag
                  v-for="(item, index) in osOptions"
                  :key="'tag' + index"
                  checkable
                  :type="activeIndex === index ? 'primary' : 'text'"
                  @click="selectTypeTag(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter :show="false" :label="i18n.compatibility.SOFTWARETYPE">
              <OTag
                v-for="(item, index) in softType"
                :key="'tag' + index"
                checkable
                :type="activeIndex3 === index ? 'primary' : 'text'"
                @click="clickSoftType(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>

            <TagFilter :show="false" :label="i18n.compatibility.ARCHITECTURE">
              <OTag
                v-for="(item, index) in architectureSelect"
                :key="'tag' + index"
                checkable
                :type="activeIndex1 === index ? 'primary' : 'text'"
                @click="selectOptionTag(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE"
            prop="arch"
            width="130"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME"
            prop="softwareName"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM"
            prop="os"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION"
            prop="version"
            width="140"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE"
            prop="group"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES"
            prop="property"
            width="160"
          ></OTableColumn>

          <el-table-column
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK"
            width="130"
          >
            <template #default="scope">
              <a
                class="friendly-link"
                :href="scope.row.downloadLink"
                target="_blank"
                rel="noopener noreferrer"
                >link</a
              >
            </template>
          </el-table-column>
          <OTableColumn
            :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE"
            prop="license"
          ></OTableColumn>
        </OTable>
      </OTabPane>

      <OTabPane
      v-if="lang === 'zh'"
        :label="i18n.compatibility.BUSINESS_SOFTWARE"
        name="4"
      >
        <OSearch
          v-model="searchContent"
          class="o-search"
          @change="changeSearchVal"
        ></OSearch>
        <OCard class="filter-card">
          <template #header>
            <div class="card-header">
              <TagFilter :label="i18n.compatibility.DATA_SOURCE" :show="false">
                <OTag
                  v-for="(item, index) in dataSourceList"
                  :key="'tag' + index"
                  checkable
                  :type="activeIndex6 === index ? 'primary' : 'text'"
                  @click="searchDataSource(index, item)"
                >
                  {{ item }}
                </OTag>
              </TagFilter>
            </div>
          </template>
          <div class="card-body">
            <TagFilter
              :show="false"
              :label="i18n.compatibility.BUSINESS_TESTING_ORGANIZATION"
            >
              <OTag
                v-for="(item, index) in testOrganizationsLists"
                :key="'tag' + index"
                :type="activeIndex5 === index ? 'primary' : 'text'"
                @click="searchTestOrganization(index, item)"
              >
                {{ item }}
              </OTag>
            </TagFilter>
          </div>
        </OCard>
        <OTable class="pc-list" :data="tableData" style="width: 100%">
          <OTableColumn
            :label="
              i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SOFTWARENAME
            "
            prop="productName"
            width="220"
          >
          </OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VERSION"
            prop="productVersion"
            width="120"
          ></OTableColumn>
          <OTableColumn
            :label="
              i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SOFTWARETYPE
            "
            prop="type"
            width="120"
          ></OTableColumn>
          <OTableColumn
            :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VENDOR"
            prop="companyName"
          ></OTableColumn>
          <el-table-column
            :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SYSTEM"
          >
            <template #default="scope">
              <p>{{ scope.row.osName }} {{ scope.row.osVersion }}</p>
            </template>
          </el-table-column>
          <el-table-column
            :label="
              i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SERVER_NAME
            "
            width="120"
          >
            <template #default="scope">
              <div
                v-for="item in scope.row.platformTypeAndServerModel"
                :key="item"
              >
                <p>{{ item.serverTypes[0] }}</p>
                <p>{{ item.serverTypes[1] }}</p>
              </div>
            </template>
          </el-table-column>
          <OTableColumn
            :label="
              i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN
                .TESTING_ORGANIZATION
            "
            prop="testOrganization"
          ></OTableColumn>
        </OTable>
      </OTabPane>

      <div class="bottom-wrapper">
        <ClientOnly>
          <OPagination
            v-if="total && !isMobile"
            v-model:page-size="queryData.pages.size"
            v-model:currentPage="queryData.pages.page"
            class="pagination"
            :page-sizes="[10, 20, 40, 80]"
            :layout="layout"
            :total="total"
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
            <span class="pagination-slot">
              {{ currentPage }}/{{
                Math.ceil(total / queryData.pages.size)
              }}</span
            >
          </OPagination>
        </ClientOnly>
        <p v-if="activeName === '1' || activeName === '2'" class="about">
          {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}

          <a href="#" @click="goBackPage">{{
            i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE
          }}</a>
        </p>
        <p v-if="activeName === '3'" class="about">
          {{ i18n.compatibility.SOFTWARE_OEC_DETAIL.TEXT }}

          <a href="#" @click="goBackPage">{{
            i18n.compatibility.SOFTWARE_OEC_DETAIL.TITLE
          }}</a>
        </p>
        <p v-if="activeName === '4'" class="about">
          {{ i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TEXT }}

          <a href="#" @click="goBackPage">{{
            i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TITLE
          }}</a>
          <br />
          {{ i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TEXT_2 }}
        </p>
      </div>
    </AppContent>
  </OTabs>

  <AppContent class="mobile-content" :mobile-top="16">
    <div class="tabs-mobile">
      <el-collapse v-model="activeName" accordion @change="handleChange">
        <el-collapse-item :title="i18n.compatibility.HARDWARE" name="1">
          <ClientOnly>
            <OSearch
              v-model="searchContent"
              class="o-search"
              :placeholder="i18n.compatibility.HARDWARE_SEARCH_PLACEHOLDER"
              @change="changeSearchVal"
            ></OSearch>

            <OSelect
              v-model="osName"
              :placeholder="i18n.compatibility.OS"
              @change="selectOsName"
            >
              <OOption
                v-for="item in osOptions"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>
            <OSelect
              v-model="architehture"
              :placeholder="i18n.compatibility.ARCHITECTURE"
              @change="selectArchitehture"
            >
              <OOption
                v-for="item in architectureSelect"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>
            <OSelect
              v-model="cpuName"
              :placeholder="i18n.compatibility.CPU"
              @change="selectCpu"
            >
              <OOption
                v-for="item in cpuList"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>
          </ClientOnly>

          <ul v-if="totalPage !== 0" class="mobile-list">
            <li v-for="item in tableData" :key="item.id" class="item">
              <ul>
                <li>
                  <span
                    >{{
                      i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE
                    }}:</span
                  >{{ item.architecture }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR
                    }}:</span
                  >{{ item.hardwareFactory }}
                </li>
                <li>
                  <span
                    >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL }}:</span
                  >{{ item.hardwareModel }}
                </li>
                <li>
                  <span
                    >{{ i18n.compatibility.HARDWARE_DETAIL.LABELS.CPU }}:</span
                  >{{ item.cpu }}
                </li>
                <li>
                  <span
                    >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS }}:</span
                  >{{ item.osVersion }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.HARDWARE_TABLE_COLUMN
                        .COMPATIBILITY_CONFIGURATION
                    }}:
                  </span>
                  <a class="friendly-link" @click="goSoftwareInfo(item.id)">{{
                    i18n.compatibility.HARDWARE_TABLE_COLUMN
                      .COMPATIBILITY_CONFIGURATION2
                  }}</a>
                </li>
                <li>
                  <span
                    >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE }}:</span
                  >{{ item.certificationTime }}
                </li>
              </ul>
            </li>
          </ul>
          <div v-if="totalPage === 0" class="empty-status">
            {{ i18n.compatibility.EMPTY_SEARCH_RESULT }}
          </div>

          <AppPaginationMo
            v-if="totalPage !== 0"
            :current-page="currentPage"
            :total-page="totalPage"
            @turn-page="turnPage"
            @jump-page="jumpPage"
          />
          <p class="mobile-about">
            {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
            <a href="#" @click="goBackPage">{{
              i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE
            }}</a>
          </p>
        </el-collapse-item>

        <el-collapse-item :title="i18n.compatibility.DRIVE" name="2">
          <ClientOnly>
            <OSearch
              v-model="searchContent"
              class="o-search"
              :placeholder="i18n.compatibility.DRIVE_SEARCH_PLACEHOLDER"
              @change="changeSearchVal"
            ></OSearch>

            <OSelect
              v-model="osName"
              :placeholder="i18n.compatibility.OS"
              @change="selectOsName"
            >
              <OOption
                v-for="item in osOptions"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>

            <OSelect
              v-model="architehture"
              :placeholder="i18n.compatibility.ARCHITECTURE"
              @change="selectArchitehture"
            >
              <OOption
                v-for="item in architectureSelect"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>

            <OSelect
              v-model="driveType"
              :placeholder="i18n.compatibility.DRIVETYPE"
              @change="selectDriveType"
            >
              <OOption
                v-for="item in typeLists"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>
          </ClientOnly>

          <ul v-if="totalPage !== 0" class="mobile-list">
            <li v-for="item in tableData" :key="item.id" class="item">
              <ul>
                <li>
                  <span
                    >{{
                      i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE
                    }}:</span
                  >{{ item.architecture }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME
                    }}:</span
                  >
                  {{ item.driverName }}
                </li>
                <li>
                  <span
                    >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS }}:</span
                  >
                  {{ item.os }}
                </li>
                <li>
                  <span
                    >{{ i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION }}:</span
                  >
                  {{ item.version }}
                </li>
                <li>
                  <span>{{ i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE }}:</span>
                  {{ item.type }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_DATE
                    }}:</span
                  >
                  {{ item.driverDate }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR
                    }}:</span
                  >
                  {{ item.chipVendor }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL
                    }}:</span
                  >
                  {{ item.boardModel }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL
                    }}:</span
                  >
                  {{ item.chipModel }}
                </li>
              </ul>
            </li>
          </ul>

          <div v-if="totalPage === 0" class="empty-status">
            {{ i18n.compatibility.EMPTY_SEARCH_RESULT }}
          </div>

          <AppPaginationMo
            v-if="totalPage !== 0"
            :current-page="currentPage"
            :total-page="totalPage"
            @turn-page="turnPage"
            @jump-page="jumpPage"
          />
          <p class="mobile-about">
            {{ i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT }}
            <a href="#" @click="goBackPage">{{
              i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE
            }}</a>
          </p>
        </el-collapse-item>

        <el-collapse-item
          v-if="lang === 'zh'"
          :title="i18n.compatibility.SOFTWARE"
          name="3"
        >
          <ClientOnly>
            <OSearch
              v-model="searchContent"
              class="o-search"
              :placeholder="i18n.compatibility.SOFTWARE_SEARCH_PLACEHOLDER"
              @change="changeSearchVal"
            ></OSearch>
            <!-- 架构 -->
            <OSelect
              v-model="architehture"
              :placeholder="i18n.compatibility.ARCHITECTURE"
              @change="selectArchitehture"
            >
              <OOption
                v-for="item in architectureSelect"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>
            <!-- 软件类型 -->
            <OSelect
              v-model="typeName"
              :placeholder="i18n.compatibility.SOFTWARETYPE"
              @change="selectType"
            >
              <OOption
                v-for="item in softType"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>
            <!-- 操作系统-->
            <OSelect
              v-model="osName"
              :placeholder="i18n.compatibility.OS"
              @change="selectOsName"
            >
              <OOption
                v-for="item in osLists"
                :key="item"
                :class="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </OOption>
            </OSelect>
          </ClientOnly>

          <ul v-if="totalPage !== 0" class="mobile-list">
            <li v-for="item in tableData" :key="item.id" class="item">
              <ul>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE
                    }}:</span
                  >{{ item.arch }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE
                    }}:</span
                  >
                  {{ item.group }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME
                    }}:</span
                  >
                  {{ item.softwareName }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION
                    }}:</span
                  >
                  {{ item.version }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES
                    }}:</span
                  >
                  {{ item.property }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM
                    }}:</span
                  >
                  {{ item.os }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK
                    }}:</span
                  >
                  <a
                    :href="item.downloadLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="friendly-link"
                    >link</a
                  >
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE
                    }}:</span
                  >
                  {{ item.license }}
                </li>
              </ul>
            </li>
          </ul>

          <div v-if="totalPage === 0" class="empty-status">
            {{ i18n.compatibility.EMPTY_SEARCH_RESULT }}
          </div>

          <AppPaginationMo
            v-if="totalPage !== 0"
            :current-page="currentPage"
            :total-page="totalPage"
            @turn-page="turnPage"
            @jump-page="jumpPage"
          />
          <p class="mobile-about">
            {{ i18n.compatibility.SOFTWARE_OEC_DETAIL.TEXT }}
            <a href="#" @click="goBackPage">{{
              i18n.compatibility.SOFTWARE_OEC_DETAIL.TITLE
            }}</a>
          </p>
        </el-collapse-item>

        <el-collapse-item
          v-if="lang === 'zh'"
          :title="i18n.compatibility.BUSINESS_SOFTWARE"
          name="4"
        >
          <ul v-if="totalPage !== 0" class="mobile-list">
            <li v-for="item in tableData" :key="item.id" class="item">
              <ul>
                <li>
                  <span
                    >{{
                      i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN
                        .SOFTWARENAME
                    }}:</span
                  >{{ item.productName }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VERSION
                    }}:</span
                  >
                  {{ item.productVersion }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VENDOR
                    }}:</span
                  >
                  {{ item.companyName }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SYSTEM
                    }}:</span
                  >
                  {{ item.osName }} {{ item.osVersion }}
                </li>
                <li>
                  <span
                    >{{
                      i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN
                        .SERVER_NAME
                    }}:</span
                  >
                  <span v-for="it in item.platformTypeAndServerModel" :key="it">
                    {{ it.serverTypes[0] }} {{ it.serverTypes[1] }}
                  </span>
                </li>
              </ul>
            </li>
          </ul>
          <AppPaginationMo
            v-if="totalPage !== 0"
            :current-page="currentPage"
            :total-page="totalPage"
            @turn-page="turnPage"
          />
          <p class="mobile-about last-mobile-about">
            {{ i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TEXT }}
            <a href="#" @click="goBackPage">{{
              i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TITLE
            }}</a>
            <br />
            {{ i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TEXT_2 }}
          </p>
        </el-collapse-item>
      </el-collapse>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
:deep(.el-tabs__header) {
  margin: 0;
}
:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
  background-color: var(--o-color-bg2);
  height: 48px;
}
.mobile-content {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
}
.tabs-pc {
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.tabs-mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  :deep(.el-collapse) {
    --el-collapse-border-color: none;
    .el-collapse-item__header {
      padding-left: var(--o-spacing-h8);
      background-color: var(--o-color-bg2);
      color: var(--o-color-text1);
      border-bottom: none;
      box-shadow: var(--o-shadow-l1);
      height: 34px;
    }
    .el-collapse-item__content {
      background-color: var(--o-color-bg1);
    }
    .el-collapse-item__content:last-child {
      padding-bottom: 0;
    }
  }
  :deep(.o-select) {
    width: 100%;
    margin-top: var(--o-spacing-h6);
  }
  :deep(.o-search) {
    height: 36px;
    margin-top: 12px;
    .el-input__prefix-inner {
      --el-input-icon-color: var(--el-text-color-placeholder);
    }
    .el-input__wrapper {
      font-size: var(--o-font-size-tip);
    }
    .el-input__prefix-inner {
      font-size: 18px;
    }
  }
}
.bottom-wrapper {
  max-width: 1504px;
  margin: 0 auto;
  padding: 0 var(--o-spacing-h2);
}
.o-search {
  height: 48px;
}

// .blog-tag {
//   display: none;
//   @media screen and (max-width: 768px) {
//     display: block;
//   }
// }
.filter-card {
  margin: var(--o-spacing-h4) 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
  :deep(.el-card__body) {
    padding: var(--o-spacing-h8) var(--o-spacing-h2);
    .o-tag {
      margin: var(--o-spacing-h10);
    }
  }
}
.friendly-link {
  color: var(--o-color-link1);
}
.pc-list {
  margin-bottom: var(--o-spacing-h2);
  .hardware-info {
    cursor: pointer;
    color: var(--o-color-link1);
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
}
.empty-status {
  text-align: center;
  font-size: var(--o-font-size-tip);
  color: var(--o-color-text4);
  line-height: var(--o-spacing-tip);
  padding: var(--o-spacing-h2) 0 var(--o-spacing-h5);
}
.mobile-list {
  display: none;
  margin-bottom: var(--o-spacing-h5);
  margin-top: var(--o-spacing-h6);
  box-shadow: var(--o-shadow-l1);
  @media screen and (max-width: 768px) {
    display: block;
  }

  .item {
    padding: var(--o-spacing-h5);
    font-size: var(--o-font-size-tip);
    font-weight: 400;
    color: var(--o-color-neutral8);
    line-height: var(--o-line-height-tip);
    background-color: var(--o-color-bg2);
    &:nth-child(odd) {
      background: var(--o-color-bg4);
    }
    & li {
      margin-bottom: 8px;
    }
    li:last-child {
      margin-bottom: 0;
    }
    li:nth-child(2) {
      display: flex;
      span {
        min-width: 30px;
      }
    }
    span {
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h8);
    }
  }
}

.pagination {
  margin-top: var(--o-spacing-h2);
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
}
.about {
  margin-top: var(--o-spacing-h4);
  font-size: var(--o-font-size-h8);
  font-weight: 400;
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h8);
  a {
    color: var(--o-color-link1);
  }
}
.mobile-about {
  padding: var(--o-spacing-h5);
  font-size: var(--o-font-size-tip);
  font-weight: 400;
  color: var(--o-color-text4);
  line-height: var(--o-line-height-tip);
  a {
    color: var(--o-color-link1);
  }
}
.last-mobile-about {
  padding-bottom: 0;
}
</style>
