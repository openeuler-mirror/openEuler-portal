<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { computed, onMounted, ref, reactive, watch, PropType } from 'vue';
import { debounce, filter, uniq } from 'lodash';

import useWindowResize from '@/components/hooks/useWindowResize';
import { useI18n } from '@/i18n';

import AppPaginationMo from '@/components/AppPaginationMo.vue';

import { getCompleteList, getAllList, getRepoList } from '@/api/api-sig';

import IconGitee from '~icons/app/icon-gitee.svg';
import IconSearch from '~icons/app/icon-search.svg';
import IconHome from '~icons/app/icon-home.svg';

interface LIST_PARAMS {
  page: number;
  pageSize: number;
}
interface MAINTAINER_INFO {
  email: string;
  gitee_id: string;
  name: string;
  organization: string;
}
interface SIGLIST {
  created_at: string;
  description: string;
  is_sig_original: number;
  mailing_list: string;
  maintainer_info: Array<MAINTAINER_INFO>;
  maintainers: Array<string>;
  repos: Array<string>;
  sig_name: string;
}
interface oldSigList {
  group_name: string;
  maillist: string;
}

// sig列表采用老接口数据的邮箱做渲染
const props = defineProps({
  oldSigList: {
    type: Array as PropType<oldSigList[]>,
    default: () => [],
  },
});

const configData = useData();
const i18n = useI18n();
const router = useRouter();
const language = configData.lang;
const screenWidth = useWindowResize();
// 所有数据与展示数据
const allList = ref<Array<any>>([]);
const sigList = ref<Array<SIGLIST>>([]);
// 仓库列表过滤参数
const sigSelectList = ref<Array<string>>([]);
const repositioryList = ref<Array<string>>([]);
const repoRenderList = ref<Array<string>>([]);
const maintainerList = ref<Array<string>>([]);
const slectedInfo = reactive({
  sigSelected: '',
  repositiorySelected: '',
  maintainerSelected: '',
});
// 单个仓库或maintainer
const singleInfo = reactive({
  trueRepo: '',
  trueMaintainer: '',
});
// 分页条的显示与隐藏
const paginationShow = ref(true);
const initialParams = reactive({
  page: 1,
  pageSize: 12,
});

const paginationData = ref({
  total: 0,
  pageSize: 12,
  currentPage: 1,
});
const isMobile = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});

const getSigList = (params: LIST_PARAMS) => {
  try {
    getCompleteList(params).then((res) => {
      const { data } = res;
      sigList.value = data[0].data;
      props.oldSigList.forEach((oldMail) => {
        sigList.value.map((newMail) => {
          if (newMail.sig_name === oldMail.group_name) {
            newMail.mailing_list = oldMail.maillist;
          }
        });
      });
      paginationData.value.total = data[0].total;
    });
  } catch (error) {
    throw Error;
  }
};
const getAllRepo = () => {
  getRepoList()
    .then((res) => {
      repositioryList.value = JSON.parse(JSON.stringify(res.data));
      repositioryList.value.sort((a, b) => {
        return a.localeCompare(b);
      });
      repoRenderList.value = res.data.slice(0, 99);
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const getRepositoryList = () => {
  try {
    getAllList().then((res) => {
      const { code, data } = res;
      if (code === 200) {
        allList.value = data;
        replaceMail();
        data.map((item: SIGLIST) => {
          sigSelectList.value.push(item.sig_name);
          item?.maintainers?.forEach((subItem: string) => {
            maintainerList.value.push(subItem);
          });
          sigSelectList.value.sort((a, b) => {
            return a.localeCompare(b);
          });
        });
        maintainerList.value = uniq(maintainerList.value);
        maintainerList.value.sort((a, b) => {
          return a.localeCompare(b);
        });
      }
    });
  } catch (error) {
    throw Error;
  }
};
const filterRepositoryList = () => {
  if (
    !slectedInfo.sigSelected &&
    !slectedInfo.repositiorySelected &&
    !slectedInfo.maintainerSelected
  ) {
    repoRenderList.value = repositioryList.value.slice(0, 99);
    getSigList(initialParams);
  } else {
    sigList.value = filter(allList.value, (item: any) => {
      return (
        (!slectedInfo.sigSelected ||
          item.sig_name === slectedInfo.sigSelected) &&
        (!slectedInfo.repositiorySelected ||
          item.repos?.find((subItem: string) => {
            return subItem === slectedInfo.repositiorySelected;
          })) &&
        (!slectedInfo.maintainerSelected ||
          item.maintainers?.find((subItem: string) => {
            return subItem === slectedInfo.maintainerSelected;
          }))
      );
    });
    paginationData.value.total = sigList.value.length;
  }
};

const changeCurrent = (val: number) => {
  const params = {
    page: val,
    pageSize: paginationData.value.pageSize,
  };
  if (
    !slectedInfo.sigSelected &&
    !slectedInfo.repositiorySelected &&
    !slectedInfo.maintainerSelected
  ) {
    getSigList(params);
  }
};
const changeSize = (val: number) => {
  const params = {
    page: paginationData.value.currentPage,
    pageSize: val,
  };
  if (
    !slectedInfo.sigSelected &&
    !slectedInfo.repositiorySelected &&
    !slectedInfo.maintainerSelected
  ) {
    getSigList(params);
  }
};

const toSigDetail = (value: SIGLIST) => {
  router.go(`/${language.value}/sig/sig-detail/?name=${value.sig_name}`);
};
// select 滑动到底部翻页
function getNextPage() {
  if (!slectedInfo.repositiorySelected && !slectedInfo.sigSelected) {
    repoRenderList.value = repositioryList.value.slice(
      0,
      repoRenderList.value.length + 100
    );
  }
}
// 自定义筛选事件
function filterRope(val: string) {
  slectedInfo.repositiorySelected = val;
  repoRenderList.value = repositioryList.value.filter((item) => {
    return item.includes(val);
  });
  if (repoRenderList.value.length > 300) {
    repoRenderList.value = repoRenderList.value.slice(0, 300);
  }
}
function turnPage(option: string) {
  if (option === 'prev' && paginationData.value.currentPage > 1) {
    paginationData.value.currentPage = paginationData.value.currentPage - 1;
  } else if (
    option === 'next' &&
    paginationData.value.currentPage < paginationData.value.total
  ) {
    paginationData.value.currentPage = paginationData.value.currentPage + 1;
  }
  changeCurrent(paginationData.value.currentPage);
}
function replaceMail() {
  props.oldSigList.forEach((oldMail) => {
    allList.value.map((newMail) => {
      if (newMail.sig_name === oldMail.group_name) {
        newMail.mailing_list = oldMail.maillist;
      }
    });
  });
}
// 输入框防抖
const debounceEvent = debounce(filterRope, 300, {
  trailing: true,
});
watch(
  () => sigList.value,
  (data) => {
    if (data.length > 0 && slectedInfo.repositiorySelected) {
      singleInfo.trueRepo = slectedInfo.repositiorySelected;
    }
    if (data.length > 0 && slectedInfo.maintainerSelected) {
      singleInfo.trueMaintainer = slectedInfo.maintainerSelected;
    }
  }
);
watch(
  () => slectedInfo.repositiorySelected,
  (data) => {
    if (!data) {
      singleInfo.trueRepo = slectedInfo.repositiorySelected;
    }
  }
);
watch(
  () => slectedInfo.maintainerSelected,
  (data) => {
    if (!data) {
      singleInfo.trueMaintainer = slectedInfo.maintainerSelected;
    }
  }
);
watch(
  () => slectedInfo.sigSelected,
  (data) => {
    (allList.value as any).forEach((item: SIGLIST) => {
      if (item.sig_name === data) {
        repoRenderList.value = item.repos;
      }
    });
  }
);
onMounted(() => {
  getSigList(initialParams);
  getRepositoryList();
  getAllRepo();
});
</script>

<template>
  <div class="sig-table">
    <div class="sig-select">
      <div class="sig-select-item">
        <span class="select-item-name">
          {{ i18n.sig.SIG_LIST.SIG }}
        </span>
        <ClientOnly>
          <OSelect
            v-model="slectedInfo.sigSelected"
            filterable
            clearable
            :placeholder="i18n.sig.SIG_ALL"
            @change="filterRepositoryList()"
          >
            <template #prefix>
              <OIcon>
                <IconSearch />
              </OIcon>
            </template>
            <OOption
              v-for="item in sigSelectList"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ClientOnly>
      </div>
      <div class="sig-select-item">
        <span class="select-item-name">
          {{ i18n.sig.SIG_LIST.REPOSITORY }}
        </span>
        <ClientOnly>
          <OSelect
            v-model="slectedInfo.repositiorySelected"
            filterable
            clearable
            :placeholder="i18n.sig.SIG_ALL"
            :filter-method="debounceEvent"
            :listener-scorll="true"
            @scorll-bottom="getNextPage()"
            @change="filterRepositoryList()"
          >
            <template #prefix>
              <OIcon>
                <IconSearch />
              </OIcon>
            </template>
            <OOption
              v-for="item in repoRenderList"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ClientOnly>
      </div>
      <div class="sig-select-item">
        <span class="select-item-name">
          {{ i18n.sig.SIG_LIST.MAINTAINER }}
        </span>
        <ClientOnly>
          <OSelect
            v-model="slectedInfo.maintainerSelected"
            filterable
            clearable
            :placeholder="i18n.sig.SIG_ALL"
            @change="filterRepositoryList()"
          >
            <template #prefix>
              <OIcon>
                <IconSearch />
              </OIcon>
            </template>
            <OOption
              v-for="item in maintainerList"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ClientOnly>
      </div>
      <span class="sig-tip">{{ i18n.sig.SIG_LIST.TIPS }}</span>
    </div>
    <OTable v-show="!isMobile" :data="sigList">
      <el-table-column :label="i18n.sig.SIG_LIST.NAME">
        <template #default="scope">
          <div class="sig-name">
            <a
              target="_blank"
              rel="noopener noreferrer"
              style="cursor: pointer"
              class="sig-name-info"
              @click="toSigDetail(scope.row)"
            >
              {{ scope.row.sig_name }}
            </a>
            <a
              :href="
                'https://gitee.com/openeuler/community/tree/master/sig/' +
                scope.row.sig_name
              "
              target="_blank"
              rel="noopener noreferrer"
              class="gitee-icon"
            >
              <OIcon class="icon">
                <IconGitee />
              </OIcon>
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.sig.SIG_LIST.REPOSITORY">
        <template #default="scope">
          <div v-show="!singleInfo.trueRepo">
            <div v-for="(item, index) in scope.row.repos" :key="item">
              <div v-if="index < 3">
                <a
                  :href="'https://gitee.com/' + item"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="sig-repo"
                  >{{ item }}</a
                >
              </div>
            </div>
            <p v-show="scope.row.repos.length > 3" class="ellipsis">……</p>
          </div>
          <div v-show="singleInfo.trueRepo">
            <a
              :href="'https://gitee.com/' + singleInfo.trueRepo"
              target="_blank"
              rel="noopener noreferrer"
              class="sig-repo"
              >{{ singleInfo.trueRepo }}</a
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.sig.SIG_LIST.MAINTAINER">
        <template #default="scope">
          <div v-show="!singleInfo.trueMaintainer">
            <div class="sig-maintainer">
              <div
                v-for="(item, index) in scope.row.maintainers"
                :key="item"
                class="sig-maintainer-item"
              >
                <a
                  :href="'https://gitee.com/' + item"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ item
                  }}<i v-show="index !== scope.row.maintainers.length - 1"
                    >{{ language === 'zh' ? '、' : ',&nbsp;' }}
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div v-show="singleInfo.trueMaintainer">
            <a
              :href="'https://gitee.com/' + singleInfo.trueMaintainer"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ singleInfo.trueMaintainer }}</a
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="i18n.sig.SIG_LIST.MAIL">
        <template #default="scope">
          <div class="sig-mail">
            <a :href="'mailto:' + scope.row.mailing_list" class="sig-email">
              {{ scope.row.mailing_list }}
            </a>
            <a
              v-if="
                scope.row.mailing_list?.split('@').length &&
                scope.row.mailing_list?.split('@')[1] === 'openeuler.org'
              "
              class="subscribe-sig"
              :href="`https://mailweb.openeuler.org/postorius/lists/${scope.row.mailing_list}/`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ i18n.mailing.MAILING_LIST.SUBSCRIBE.BUTTON }}
            </a>
          </div>
        </template>
      </el-table-column>
    </OTable>
    <div v-show="!isMobile" class="sig-pagination">
      <ClientOnly>
        <OPagination
          v-model:currentPage="paginationData.currentPage"
          v-model:page-size="paginationData.pageSize"
          :page-sizes="[12, 24, 36, 48]"
          :total="paginationData.total"
          :background="true"
          :hide-on-single-page="paginationShow"
          layout="sizes, prev, pager, next, slot, jumper"
          @current-change="changeCurrent"
          @size-change="changeSize"
        >
          <span
            >{{ paginationData.currentPage }}/{{
              Math.ceil(paginationData.total / paginationData.pageSize)
            }}</span
          >
        </OPagination>
      </ClientOnly>
    </div>
    <div v-show="isMobile" class="sig-table-mo">
      <div class="sig-table-card">
        <div
          v-for="(item, index) in sigList"
          :key="item.sig_name"
          :class="['mo-item', index % 2 === 0 ? 'mo-item-odd' : '']"
        >
          <div class="mo-item-text">
            <span class="mo-item-title">{{ i18n.sig.SIG_LIST.NAME }}:</span>
            <a class="mo-item-name" @click="toSigDetail(item)">{{
              item.sig_name
            }}</a>
          </div>
          <div class="mo-item-text">
            <span class="mo-item-title"
              >{{ i18n.sig.SIG_LIST.GITEE_PAGE }}：</span
            >
            <a
              :href="
                'https://gitee.com/openeuler/community/tree/master/sig/' +
                item.sig_name
              "
              ><IconHome class="sig-board-icon"
            /></a>
          </div>
          <div class="mo-item-text">
            <span class="mo-item-title">{{ i18n.sig.SIG_LIST.MAIL }}:</span>
            <a :href="'mailto:' + item.mailing_list" class="mo-item-mail">
              {{ item.mailing_list }}
            </a>
            <a
              v-if="
                item.mailing_list?.split('@').length &&
                item.mailing_list?.split('@')[1] === 'openeuler.org'
              "
              class="mo-subscribe-sig"
              :href="`https://mailweb.openeuler.org/postorius/lists/${item.mailing_list}/`"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </div>
          <div class="mo-item-text mo-item-repos">
            <span class="mo-item-title"
              >{{ i18n.sig.SIG_LIST.REPOSITORY }}:</span
            >
            <div v-show="!singleInfo.trueRepo">
              <div v-for="(subItem, subIndex) in item.repos" :key="subItem">
                <div v-if="subIndex < 4" class="mo-item-repo">
                  <a
                    :href="'https://gitee.com/' + subItem"
                    target="_blank"
                    rel="noopener noreferrer"
                    >{{ subItem }}</a
                  >
                </div>
              </div>
              <p v-show="item.repos.length > 4" class="ellipsis">……</p>
            </div>
            <div v-show="singleInfo.trueRepo" class="mo-item-repo">
              <a
                :href="'https://gitee.com/' + singleInfo.trueRepo"
                target="_blank"
                rel="noopener noreferrer"
                >{{ singleInfo.trueRepo }}</a
              >
            </div>
          </div>
          <div class="mo-item-text mo-item-maintainers">
            <span class="mo-item-title"
              >{{ i18n.sig.SIG_LIST.MAINTAINER }}:</span
            >
            <div v-show="!singleInfo.trueMaintainer">
              <div class="mo-item-maintainersbox">
                <div
                  v-for="(nameItem, nameIndex) in item.maintainers"
                  :key="nameItem"
                >
                  <a
                    :href="'https://gitee.com/' + nameItem"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="mo-item-maintainer"
                    >{{ nameItem }}</a
                  >
                  <span
                    v-show="nameIndex !== item.maintainers.length - 1"
                    class="mo-item-maintainer"
                    >{{ language === 'zh' ? '、' : ',' }}</span
                  >
                </div>
              </div>
            </div>
            <div v-show="singleInfo.trueMaintainer">
              <a
                :href="'https://gitee.com/' + singleInfo.trueMaintainer"
                target="_blank"
                rel="noopener noreferrer"
                class="mo-item-maintainer"
                >{{ singleInfo.trueMaintainer }}</a
              >
            </div>
          </div>
        </div>
      </div>
      <AppPaginationMo
        :current-page="paginationData.currentPage"
        :total-page="paginationData.total"
        @turn-page="turnPage"
      >
      </AppPaginationMo>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-table {
  margin-top: var(--o-spacing-h2);
  @media (max-width: 768px) {
    margin-top: var(--o-spacing-h4);
  }
  .sig-name {
    display: flex;
    align-items: center;
    &-info {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
    .gitee-icon {
      display: flex;
      margin-left: var(--o-spacing-h8);
      align-items: center;
    }
  }
  .sig-mail {
    display: flex;
    align-items: center;
    .subscribe-sig {
      cursor: pointer;
      color: var(--o-color-brand1);
      padding: 2px 11px;
      margin-left: 8px;
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      border: 1px solid var(--o-color-brand1);
      &:hover {
        border: 1px solid var(--o-color-brand2);
      }
    }
  }
  .ellipsis {
    color: var(--o-color-brand1);
  }
  .pagination-slot {
    font-size: var(--o-font-size-text);
    font-weight: 400;
    color: var(--o-color-text1);
    line-height: var(--o-spacing-h4);
  }
  .sig-maintainer {
    display: grid;
    grid-template-columns: auto 1fr;
    @media (max-width: 1100px) {
      display: block;
    }
    &-item {
      a {
        white-space: nowrap;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-h5);
      }
    }
  }
  .sig-email {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  .sig-repo {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-h5);
  }
}
.sig-select {
  margin-bottom: var(--o-spacing-h4);
  display: flex;
  align-items: flex-end;
  align-items: center;
  .sig-tip {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text1);
  }
  &-item {
    display: flex;
    align-items: center;
    margin-right: var(--o-spacing-h1);
    flex-wrap: nowrap;
    .select-item-name {
      margin-right: var(--o-spacing-h5);
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h7);
      @media (max-width: 1000px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        width: 100px;
      }
    }
    span {
      font-size: var(--o-font-size-h7);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
      }
    }
    @media (max-width: 1280px) {
      margin-right: var(--o-spacing-h5);
      :deep(.el-select) {
        width: 150px;
      }
    }
    @media (max-width: 1000px) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: var(--o-spacing-h5);
      margin-right: 0;
      :deep(.el-select) {
        width: 100%;
      }
    }
  }
  @media (max-width: 1416px) {
    span {
      max-width: 150px;
    }
  }
  @media (max-width: 1000px) {
    display: block;
  }
}
.sig-pagination {
  margin-top: var(--o-spacing-h2);
}
.sig-table-mo {
  .mo-item {
    padding: var(--o-spacing-h5);
    &-text {
      display: flex;
      align-items: center;
      margin-bottom: var(--o-spacing-h5);
      .mo-item-title {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text1);
        margin-right: var(--o-spacing-h7);
      }
      .mo-subscribe-sig {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 8px;
        font-size: 12px;
      }
      .sig-board-icon {
        height: var(--o-font-size-text);
        width: var(--o-font-size-text);
        margin-top: 2px;
        position: relative;
        right: 10px;
      }
      .mo-item-name,
      .mo-item-mail,
      .mo-item-repo,
      .mo-item-maintainer {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
      .mo-item-maintainersbox {
        display: grid;
        grid-template-columns: auto 1fr;
      }
    }
    &-repos {
      display: flex;
    }
    &-maintainers {
      display: flex;
      margin-bottom: 0;
    }
  }
  .pagination-mobile {
    margin-top: var(--o-spacing-h5);
  }
  .mo-item-odd {
    background-color: var(--o-color-bg4);
  }
}
</style>
