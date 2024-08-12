<script lang="ts" setup>
import { ref, computed, Ref, toRefs, onMounted, watch } from 'vue';

import { useI18n } from '@/i18n';
import lodash from 'lodash-es';
import { useRouter, useData } from 'vitepress';

import useWindowResize from '@/components/hooks/useWindowResize';
import { ElMessage } from 'element-plus';
import { selectMirror } from '@/api/api-mirror';
import { getUrlParam } from '@/shared/utils';
import { useCommon } from '@/stores/common';
import type {
  DownloadCommunityDataT,
  LinkListItemT,
  DetailedLinkItemT,
  ScenarioT,
} from '@/shared/@types/type-download';
import type { MirrorLsitT } from '@/shared/@types/type-mirror';

import TagFilter from '@/components/TagFilter.vue';
import IconCopy from '~icons/app/icon-copy.svg';
import IconDownload from '~icons/app/icon-download.svg';
import IconTips from '~icons/app/icon-tips.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconChevronDown from '~icons/app/icon-chevron-down.svg';

const router = useRouter();
const commonStore = useCommon();
const props = defineProps({
  version: {
    required: true,
    type: String,
    default: () => {
      return '';
    },
  },
});
const { version } = toRefs(props);
const i18n = useI18n();
const downloadList = lodash.cloneDeep(i18n.value.download.COMMUNITY_LIST);
const { lang } = useData();
const shaText = 'SHA256';
const contentData: Ref<DownloadCommunityDataT[]> = computed(() => {
  return downloadList.filter(
    (item: DownloadCommunityDataT) => item.NAME === version.value
  );
});
const screenWidth = useWindowResize();
// 复制
const inputDom: Ref<HTMLElement | null> = ref(null);
async function handleUrlCopy(value: string | undefined) {
  if (!value) return;
  if (inputDom.value) {
    (inputDom.value as HTMLInputElement).value = value;
    (inputDom.value as HTMLInputElement).select();
    document.execCommand('copy');
  }
  ElMessage({
    message: i18n.value.download.COPY_SUCCESSFULLY,
    type: 'success',
  });
}
onMounted(() => {
  inputDom.value = document.getElementById('useCopy');
});

// tag筛选
const activeArch = ref('');
const activeScenario = ref('');
const architectureList: Ref<string[]> = ref([]);
const scenarioList: Ref<ScenarioT[]> = ref([]);
function initActiveScenario() {
  // 查看是否有携带筛选参数
  const scenario = getUrlParam('scenario');
  if (scenario) {
    activeScenario.value = scenario;
    let flag = true;
    contentData.value[0].DETAILED_LINK.forEach((item: DetailedLinkItemT) => {
      if (item.SCENARIO === activeScenario.value && flag) {
        activeArch.value = item.ARCH;
        flag = false;
      }
    });
  } else {
    activeScenario.value = contentData.value[0].DETAILED_LINK[0].SCENARIO;
    activeArch.value = contentData.value[0].DETAILED_LINK[0].ARCH;
  }
}
onMounted(() => {
  watch(
    () => router.route.path,
    () => {
      initActiveScenario();
    },
    { immediate: true }
  );
});

function setTagList() {
  const temp: string[] = [];
  architectureList.value = [];
  scenarioList.value = [];
  contentData.value[0].DETAILED_LINK.forEach((item: DetailedLinkItemT) => {
    if (!architectureList.value.includes(item.ARCH)) {
      architectureList.value.push(item.ARCH);
    }
    if (!temp.includes(item.SCENARIO)) {
      temp.push(item.SCENARIO);
    }
  });
  temp.forEach((item: string) => {
    i18n.value.download.SCENARIO_LIST.forEach((itemList: ScenarioT) => {
      if (item === itemList.KEY && !scenarioList.value.includes(itemList)) {
        scenarioList.value.push(itemList);
      }
    });
  });
  // 查看是否有携带筛选参数
  initActiveScenario();
}

const onArchTagClick = (i: number, select: string) => {
  activeArch.value = select;
};

const onScenarioTagClick = (select: string) => {
  activeScenario.value = select;
};
//控制不能组合的tag的禁用
const tempTag = ref('');
function setTempTag() {
  let flag = true;
  contentData.value[0].DETAILED_LINK.forEach((item: DetailedLinkItemT) => {
    if (item.ARCH === activeArch.value) {
      if (flag) {
        tempTag.value = item.SCENARIO;
        flag = false;
      }
    }
  });
}
function isDisable(tag: string) {
  let flag = false;
  contentData.value[0].DETAILED_LINK.forEach((item: DetailedLinkItemT) => {
    if (item.ARCH === activeArch.value && item.SCENARIO === tag) {
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
const tableData: Ref<LinkListItemT[]> = ref([]);
const activeMirror: Ref<string[]> = ref([]);
const activeMirrorLink: Ref<string[]> = ref([]);
const allMirrorList: Ref<MirrorLsitT[]> = ref([]);
const mirrorList: Ref<MirrorLsitT[]> = ref([]);
const moreMirrorList: Ref<MirrorLsitT[]> = ref([]);
function setActiveMirror() {
  activeMirror.value = [];
  activeMirrorLink.value = [];
  if (mirrorList.value[0]) {
    tableData.value.forEach(() => {
      const temp = lodash.cloneDeep(mirrorList.value);
      temp[0].NameSpend =
        temp[0].Name + ' (' + temp[0].NetworkBandwidth + 'Mb/s)';
      activeMirror.value.push(temp[0].NameSpend);
      activeMirrorLink.value.push(temp[0].HttpURL);
    });
  } else {
    tableData.value.forEach(() => {
      activeMirror.value.push(contentData.value[0].GET_ISO_URL);
      activeMirrorLink.value.push(contentData.value[0].GET_ISO_URL);
    });
  }
}
function getTableData() {
  tableData.value = [];
  contentData.value[0].DETAILED_LINK.forEach((item: DetailedLinkItemT) => {
    if (
      item.ARCH === activeArch.value &&
      item.SCENARIO === activeScenario.value
    ) {
      tableData.value = item.LINK_LIST;
    }
  });
  if (
    !activeMirror.value[0] &&
    !activeMirrorLink.value[0] &&
    tableData.value[0]
  ) {
    setActiveMirror();
  }
}
async function getMirrorList() {
  try {
    const mirrorData = await selectMirror(contentData.value[0].VERSION);
    mirrorList.value = [];
    moreMirrorList.value = [];
    if (mirrorData) {
      for (let i = 0; i < mirrorData.MirrorList.length; i++) {
        for (let j = i; j < mirrorData.MirrorList.length; j++) {
          if (
            mirrorData.MirrorList[i].NetworkBandwidth <
            mirrorData.MirrorList[j].NetworkBandwidth
          ) {
            [mirrorData.MirrorList[i], mirrorData.MirrorList[j]] = [
              mirrorData.MirrorList[j],
              mirrorData.MirrorList[i],
            ];
          }
        }
      }
      mirrorData.MirrorList.forEach((item: MirrorLsitT) => {
        item.NameSpend = item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)';
      });
      allMirrorList.value = lodash.cloneDeep(mirrorData.MirrorList);
      mirrorList.value = lodash.cloneDeep(mirrorData.MirrorList.splice(0, 3));
      moreMirrorList.value = lodash.cloneDeep(mirrorData.MirrorList);
      if (mirrorList.value.length === 1) {
        mirrorList.value = [
          {
            Name: 'openEuler-HongKong',
            NetworkBandwidth: '500',
            HttpURL: 'https://repo.openeuler.org/',
          },
        ];
      }
    } else {
      mirrorList.value = [];
      moreMirrorList.value = [];
    }
    setActiveMirror();
  } catch (e: any) {
    throw new Error(e);
  }
}
onMounted(async () => {
  setTagList();
  getTableData();
  watch(activeArch, function () {
    getTableData();
    setTempTag();
  });
  watch(activeScenario, function () {
    getTableData();
  });
  watch(
    version,
    async function () {
      await getMirrorList();
      setTagList();
      getTableData();
    },
    {
      immediate: true,
    }
  );
  watch(tableData, function () {
    setActiveMirror();
  });
});

function setMirrorLink(index: number) {
  allMirrorList.value.forEach((item: MirrorLsitT) => {
    if (item.NameSpend === activeMirror.value[index]) {
      activeMirrorLink.value[index] = item.HttpURL;
    }
  });
  return '';
}
// 移动端提示语
const showIndex = ref(-1);
function setShowIndex(index: number) {
  showIndex.value = index;
}
// 控制移动端镜像选择
const mirrorIndex = ref(-1);
function setMirrorIndex(index: number) {
  if (mirrorIndex.value === index) {
    mirrorIndex.value = -1;
  } else {
    mirrorIndex.value = index;
  }
}
function setActiveMirrorMobile(index: number, item: string) {
  activeMirror.value[index] = item;
  mirrorIndex.value = -1;
  setMirrorLink(index);
}
</script>

<template>
  <div class="content-wrap">
    <h2 class="title">{{ contentData[0].NAME }}</h2>
    <p class="subtitle">{{ contentData[0].DESC }}</p>
    <p class="subtitle">Planned EOL: {{ contentData[0].PLANNED_EOL }}</p>
    <div class="other-link">
      <a
        v-if="contentData[0].RELEASE_DESC_URL"
        :href="contentData[0].RELEASE_DESC_URL"
        target="_blank"
        rel="noopener noreferrer"
        >{{ i18n.download.RELEASE_DESC }}</a
      ><a
        v-if="contentData[0].INSTALL_GUIDENCE_URL"
        :href="contentData[0].INSTALL_GUIDENCE_URL"
        target="_blank"
        rel="noopener noreferrer"
        >{{ i18n.download.INSTALL_GUIDENCE }}</a
      >
      <a
        v-if="contentData[0].WHITE_PAPER"
        :href="contentData[0].WHITE_PAPER"
        target="_blank"
        rel="noopener noreferrer"
        >{{ i18n.download.WHITE_PAPER }}</a
      >
      <a
        v-if="contentData[0].LIFE_CYCLE_URL"
        :href="contentData[0].LIFE_CYCLE_URL"
        target="_blank"
        rel="noopener noreferrer"
        >{{ i18n.download.LIFE_CYCLE }}</a
      >
    </div>
    <div class="filter-card">
      <TagFilter
        class="architecture-box"
        :label="i18n.download.ARCHITECTURE2"
        :show="false"
        :class="'tag-' + lang"
      >
        <OTag
          v-for="(item, index) in architectureList"
          :key="'tag' + index"
          checkable
          :type="activeArch === item ? 'primary' : 'text'"
          @click="onArchTagClick(index, item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
      <TagFilter
        class="os-box"
        :class="'tag-' + lang"
        :label="i18n.download.SCENARIO2"
        :show="false"
      >
        <OTag
          v-for="(item, index) in scenarioList"
          :key="item.VALUE + index"
          checkable
          :type="activeScenario === item.KEY ? 'primary' : 'text'"
          :class="{ disable: isDisable(item.KEY) }"
          @click="isDisable(item.KEY) ? '' : onScenarioTagClick(item.KEY)"
        >
          {{ item.VALUE }}
        </OTag>
      </TagFilter>
    </div>
    <div class="content-item">
      <!-- pc  -->
      <div v-if="screenWidth > 1100" class="download-pc">
        <OTable :data="tableData" style="width: 100%">
          <el-table-column
            :width="screenWidth > 1310 ? '280' : '230'"
            :label="i18n.download.TABLE_HEAD[0]"
            prop="name"
          >
            <template #default="scope: any">
              <div class="name-info">
                {{ scope.row.TYPE }}
                <template v-if="scope.row.TIPS">
                  <el-tooltip
                    placement="right-start"
                    :offset-y="60"
                    :effect="commonStore.theme"
                  >
                    <template #content>
                      <p class="tips-text">
                        {{ scope.row.TIPS }}
                      </p>
                    </template>
                    <IconTips class="server-tips" />
                  </el-tooltip>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :width="screenWidth > 1310 ? '200' : '130'"
            :label="i18n.download.TABLE_HEAD[1]"
            prop="size"
          >
            <template #default="scope: any">
              {{ scope.row.SIZE || '-' }}
            </template>
          </el-table-column>
          <el-table-column :label="i18n.download.TABLE_HEAD[2]" prop="down_url">
            <template #default="scope: any">
              <ClientOnly>
                <el-select
                  v-model="activeMirror[scope.$index]"
                  placeholder="Select"
                  placement="bottom-end"
                  class="mirror-select"
                  @change="setMirrorLink(scope.$index)"
                >
                  <li>
                    <p class="select-text">
                      {{ i18n.download.APPROVE_MIRROR }}
                    </p>
                  </li>
                  <el-option
                    v-for="item in mirrorList"
                    :key="item.Name"
                    :label="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
                    :value="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
                  >
                  </el-option>
                  <li>
                    <p class="select-text">{{ i18n.download.MORE_MIRROR }}</p>
                  </li>

                  <el-option
                    v-for="item in moreMirrorList"
                    :key="item.Name"
                    :label="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
                    :value="item.Name + ' (' + item.NetworkBandwidth + 'Mb/s)'"
                  >
                  </el-option>
                  <li>
                    <div class="all-mirror">
                      <a :href="'/' + lang + '/mirror/list/'">
                        <OButton size="mini" type="text" animation>
                          {{ i18n.download.ALL_MIRROR }}
                          <template #suffixIcon>
                            <OIcon
                              ><IconArrowRight class="download-button-icon"
                            /></OIcon>
                          </template>
                        </OButton>
                      </a>
                    </div>
                  </li>
                </el-select>
              </ClientOnly>
            </template>
          </el-table-column>
          <el-table-column
            :width="screenWidth > 1310 ? '200' : '150'"
            prop="sha_code"
          >
            <template #header>
              {{ !tableData[0]?.IS_FOLDER ? i18n.download.TABLE_HEAD[3] : '' }}
            </template>
            <template #default="scope: any">
              <div v-if="scope.row.SHACODE" class="down-action">
                <OButton
                  class="down-copy"
                  size="mini"
                  type="text"
                  @click="handleUrlCopy(scope.row.SHACODE)"
                >
                  {{ shaText }}
                  <template #suffixIcon>
                    <IconCopy />
                  </template>
                </OButton>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            :width="screenWidth > 1310 ? '200' : '160'"
            :label="i18n.download.TABLE_HEAD[4]"
            prop="docsName"
          >
            <template #default="scope: any">
              <a
                class="down-link"
                :href="activeMirrorLink[scope.$index] + scope.row.DOWNLOAD_LINK"
                :target="scope.row.IS_FOLDER ? '_blank' : '_self'"
                rel="noopener noreferrer"
              >
                <OButton v-if="!scope.row.IS_FOLDER" size="mini" type="primary">
                  {{ i18n.download.DOWNLOAD_BTN_NAME }}
                  <template #suffixIcon>
                    <IconDownload />
                  </template>
                </OButton>
                <OButton v-else type="text" animation size="mini">
                  {{ i18n.download.DOWNLOADGO }}
                  <template #suffixIcon>
                    <IconArrowRight />
                  </template>
                </OButton>
              </a>
            </template>
          </el-table-column>
        </OTable>
      </div>

      <!-- mobild -->

      <ul v-else class="download-mobile">
        <li
          v-for="(item, index) in tableData"
          :key="item.TYPE"
          class="download-item"
        >
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[0] + ':' }}</span
            ><span class="tips-box"
              >{{ item.TYPE }}
              <template v-if="item.TIPS">
                <p v-show="showIndex === index" class="tips-text">
                  {{ item.TIPS }}
                </p>
                <IconTips class="server-tips" @click="setShowIndex(index)" />
                <div
                  v-show="showIndex !== -1"
                  class="mask-mobile"
                  @click="setShowIndex(-1)"
                ></div>
              </template>
            </span>
          </div>
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[1] + ':' }}</span
            ><span class="text-size">{{ item.SIZE }}</span>
          </div>
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[2] + ':' }}</span>
            <div class="select-mirror">
              <div class="select" @click="setMirrorIndex(index)">
                <p>{{ activeMirror[index] }}</p>
                <OIcon
                  ><IconChevronDown
                    :class="{ 'mirror-show-icon': mirrorIndex === index }"
                    class="chevron-icon"
                /></OIcon>
              </div>
              <ul
                v-if="mirrorList[0]"
                class="mirror-box"
                :class="{ 'mirror-show': mirrorIndex === index }"
              >
                <li>
                  {{ i18n.download.APPROVE_MIRROR }}
                </li>
                <li
                  v-for="itemMirror in mirrorList"
                  :key="itemMirror.Name"
                  class="mirror-item"
                  @click="setActiveMirrorMobile(index, itemMirror.NameSpend)"
                >
                  {{ itemMirror.NameSpend }}
                </li>

                <li>
                  {{ i18n.download.MORE_MIRROR }}
                </li>
                <li
                  v-for="itemMirror in moreMirrorList"
                  :key="itemMirror.Name"
                  class="mirror-item"
                  @click="setActiveMirrorMobile(index, itemMirror.NameSpend)"
                >
                  {{ itemMirror.NameSpend }}
                </li>
                <li>
                  <div class="all-mirror">
                    <a :href="'/' + lang + '/mirror/list/'">
                      <OButton size="mini" type="text" animation>
                        {{ i18n.download.ALL_MIRROR }}
                        <template #suffixIcon>
                          <OIcon
                            ><IconArrowRight class="download-button-icon"
                          /></OIcon>
                        </template>
                      </OButton>
                    </a>
                  </div>
                </li>
              </ul>
              <ul
                v-else
                class="mirror-box"
                :class="{ 'mirror-show': mirrorIndex === index }"
              >
                <li>{{ i18n.download.EMPTY_TIP }}</li>
              </ul>
              <div
                v-show="mirrorIndex !== -1"
                class="mirror-mask"
                @click="setMirrorIndex(-1)"
              ></div>
            </div>
          </div>
          <div v-if="item.SHACODE" class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[3] + ':' }}</span>
            <div class="copy-box">
              <OButton
                class="down-copy"
                size="mini"
                type="text"
                @click="handleUrlCopy(item.SHACODE)"
              >
                {{ shaText }}
                <template #suffixIcon>
                  <IconCopy />
                </template>
              </OButton>
            </div>
          </div>
          <div class="item-text">
            <span>{{ i18n.download.TABLE_HEAD[4] + ':' }}</span>
            <a
              class="down-link"
              :href="activeMirrorLink[index] + item.DOWNLOAD_LINK"
            >
              {{ i18n.download.CLICK_DOWNLOAD }}
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="input-box">
      <!-- 用于复制RSNC的值 -->
      <input id="useCopy" type="text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  margin-top: var(--o-spacing-h4);
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2) var(--o-spacing-h1);
  box-shadow: var(--o-shadow-l2);
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
    padding: var(--o-spacing-h4) var(--o-spacing-h8);
  }
  .title {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .subtitle {
    margin-top: var(--o-spacing-h5);
    text-align: center;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text3);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .other-link {
    margin-top: var(--o-spacing-h5);
    text-align: center;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h8);
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
    a {
      display: inline-block;
      padding: 0 var(--o-spacing-h5);
      @media (max-width: 1100px) {
        padding: 0 var(--o-spacing-h8);
      }
      & ~ a {
        border-left: 1px solid var(--o-color-border2);
      }
    }
  }
  .filter-card {
    margin: var(--o-spacing-h4) 0;
    background-color: var(--o-color-bg2);
    padding: var(--o-spacing-h5) var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      padding: 0;
      font-size: var(--o-font-size-tip);
    }
    :deep(.tag-filter) {
      padding: 0;
      @media screen and (max-width: 768px) {
        display: flex;
        gap: 32px;
        &.tag-en{
          gap: 48px;
          .tag-filter-box{
            gap:6px;
          }
        }
      }
      .label {
        color: var(--o-color-text1);
        @media screen and (max-width: 768px) {
          width: 26px;
          white-space: nowrap;
          font-size: var(--o-font-size-tip);
        }
      }
      .tag-filter-box {
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
      }
      .o-tag {
        padding: 0 12px;
        font-size: var(--o-font-size-text);
        height: 28px;
        line-height: 28px;
        display: flex;
        align-items: flex-start;
        @media screen and (max-width: 768px) {
          padding: 0 6px;
          font-size: var(--o-font-size-tip) !important;
          height: 24px;
          line-height: 24px;
          margin-bottom: 2px;
        }
      }
      &.os-box {
        margin-top: var(--o-spacing-h5);
        @media screen and (max-width: 768px) {
          margin-top: var(--o-spacing-h8);
        }
      }
    }
    .disable {
      color: var(--o-color-text5);
      cursor: not-allowed;
    }
  }
  .content-item {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h4);
    }
    :deep(.el-scrollbar) {
      tr {
        &:hover {
          background-color: var(--o-color-bg2);
        }
      }
    }
    :deep(.el-table__inner-wrapper) {
      &::before {
        background-color: var(--o-color-border2);
      }
    }
    :deep(.o-table.el-table) {
      box-shadow: none;
    }
    h3 {
      text-align: center;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text1);
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .download-pc {
      margin-top: var(--o-spacing-h4);
      .name-info {
        display: flex;
        align-items: center;
        gap: var(--o-spacing-h8);
        color: var(--o-color-text1);
        .server-tips {
          width: var(--o-font-size-h6);
          height: 32px;
          color: var(--o-color-text4);
        }
      }
      .down-copy {
        font-size: var(--o-font-size-text);
        padding-left: 0;
        color: var(--o-color-brand1);
        :deep(.suffix-icon) {
          width: 14px;
          @media (max-width: 1100px) {
            width: 12px;
          }
        }
        &:hover {
          color: var(--o-color-brand2);
        }
      }
      .down-link {
        display: inline-block;
        :deep(.o-button-type-primary) {
          color: #fff;
          .suffix-icon {
            width: 14px;
            height: 18px;
            color: #fff;
          }
        }
        :deep(.o-button-type-text) {
          padding: 6px 0;
          font-size: 14px;
          .suffix-icon {
            width: 14px;
            height: 18px;
          }
        }
      }
      :deep(.el-table) {
        box-shadow: none !important;
        .el-table__inner-wrapper::before {
          display: none;
        }
        .cell {
          line-height: 46px;
          overflow: visible;
          padding-left: var(--o-spacing-h2);
          a {
            word-break: normal;
          }
          .el-input__wrapper {
            box-shadow: none;
            background-color: transparent;
            padding: 0;
            width: 200px;
            input,
            i {
              color: var(--o-color-brand1);
            }
          }
        }
        table {
          position: relative;
          .el-table__row {
            &:hover {
              > td.el-table__cell {
                background-color: transparent;
              }
            }
          }
        }
        .el-table__body-wrapper {
          border-bottom: 1px solid var(--o-color-border2);
        }
        tr::after {
          width: 100%;
        }
      }

      :deep(.el-select) {
        width: 230px;
        .el-input .el-input__wrapper {
          box-shadow: none !important;
        }
        .is-focus {
          box-shadow: none !important;
        }
      }
      :deep(.el-table__cell) {
        padding: 8px 0;
      }
    }
    .download-mobile {
      margin-top: var(--o-spacing-h5);
      .download-item {
        padding: var(--o-spacing-h5);
        &:nth-of-type(2n + 1) {
          background-color: var(--o-color-bg4);
        }
        .item-text {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-font-height-tip);
          color: var(--o-color-text1);
          display: flex;
          & ~ .item-text {
            margin-top: var(--o-spacing-h8);
          }
          span {
            display: inline-block;
            &:nth-of-type(1) {
              width: 72px;
            }
          }
          .text-size {
            color: var(--o-color-text4);
          }
          .down-copy {
            color: var(--o-color-brand1);
            padding: 0;
            line-height: 0;
          }
          .select-mirror {
            position: relative;
            .select {
              display: flex;
              p {
                width: 160px;
                overflow: scroll;
                white-space: nowrap;
                margin-right: var(--o-spacing-h7);
                &::-webkit-scrollbar {
                  display: none;
                }
              }
              .o-icon {
                .chevron-icon {
                  transition: all 0.3s;
                }
                .mirror-show-icon {
                  transform: rotateZ(180deg);
                }
              }
            }
            .mirror-box {
              position: absolute;
              top: calc(100% + 6px);
              left: 0;
              width: 210px;
              background-color: var(--o-color-bg2);
              z-index: 2147483647;
              overflow: hidden;
              transition: all 0.3s;
              max-height: 0;
              box-sizing: border-box;
              box-shadow: var(--o-shadow-l5);
              &.mirror-show {
                padding: var(--o-spacing-h8) 0;
                max-height: 800px;
              }
              li {
                padding: 0 var(--o-spacing-h8);
                line-height: var(--o-line-height-h8);
                color: var(--o-color-text3);
                &.mirror-item {
                  width: 210px;
                  color: var(--o-color-text1);
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  &:hover {
                    background-color: var(--o-color-bg4);
                  }
                }
                .all-mirror {
                  a {
                    display: inline-block;
                    .o-button {
                      white-space: nowrap;
                      padding: 0;
                      :deep(.suffix-icon) {
                        width: 20px;
                        display: flex;
                        flex-grow: 0;
                        color: var(--o-color-brand1);
                      }
                    }
                  }
                }
              }
            }
            .mirror-mask {
              position: fixed;
              width: 100vw;
              height: 100vh;
              left: 0;
              top: 0;
            }
          }
          .tips-box {
            display: flex;
            align-items: center;
            position: relative;
            .tips-text {
              position: absolute;
              left: 0;
              top: -46px;
              background-color: var(--o-color-bg2);
              padding: var(--o-spacing-h9);
            }
            .server-tips {
              width: var(--o-font-size-tip);
              height: var(--o-font-size-tip);
              color: var(--o-color-text4);
              margin-left: var(--o-spacing-h9);
              transform: translateY(-1px);
            }
            .mask-mobile {
              position: fixed;
              left: 0;
              top: 0;
              width: 100vw;
              height: 100vh;
              z-index: 99;
            }
          }
          :deep(.el-select) {
            position: relative;
            height: 16px;
            padding: 0;
            .select-trigger {
              height: 16px;
              padding: 0;
            }
            .el-input {
              height: 16px;
              padding: 0;
            }
            .el-input__wrapper {
              background-color: transparent;
              border: none;
              outline: none;
              box-shadow: none;
              height: 16px;
              padding: 0;
              input {
                font-size: var(--o-font-size-tip);
                vertical-align: top;
                line-height: auto;
                height: 16px;
                position: relative;
                top: -2px;
                display: flex;
                align-items: center;
                &:focus {
                  height: 16px;
                }
              }
              .el-input__suffix {
                position: relative;
                top: -2px;
              }
            }
          }
          .copy-box {
            :deep(.o-button) {
              font-size: 12px;
            }
            :deep(.suffix-icon) {
              width: 12px;
              height: 12px;
            }
          }
        }
      }
    }
  }
  .input-box #useCopy {
    position: absolute;
    opacity: 0;
  }
}
</style>
