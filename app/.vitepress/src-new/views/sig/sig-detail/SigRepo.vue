<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

import { useData } from 'vitepress';

import {
  ORadioGroup,
  ORadio,
  OTag,
  OToggle,
  ODivider,
  OTable,
  OLink,
  OPagination,
  OSelect,
  OOption,
  OButton,
  OIcon,
  useMessage,
  OPopover,
} from '@opensig/opendesign';

import { getSigRepositoryList } from '@/api/api-sig';

import FilterableTableHeader from '~@/components/FilterableTableHeader.vue';

import { useLocale } from '~@/composables/useLocale';

const { t, locale } = useLocale();

const { params } = useData();

const sigName = computed(() => {
  return params.value?.sig || '';
});

// 仓库列表参数
const currentPage = ref(1);
const pageSize = ref(10);
const totalPage = computed(() =>
  Math.ceil(totalRepositoryList.value.length / pageSize.value)
);
// 列表过滤后数据
const totalRepositoryList = ref([] as any[]);
// 列表原始数据
const _totalRepositoryList = ref([] as any[]);

// 仓库列表过滤参数
const repositoryNameList = ref<string[]>([]);
const repositoryNameSelected = ref('');
const maintainerList = ref<string[]>([]);
const maintainerSelected = ref('');
const committerList = ref<string[]>([]);
const committerSelected = ref('');

const repositoryList = computed(() => {
  if (totalRepositoryList.value.length > pageSize.value) {
    return totalRepositoryList.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return totalRepositoryList.value;
  }
});

const filterRepositoryList = () => {
  totalRepositoryList.value = _totalRepositoryList.value.filter((item) => {
    return (
      (!repositoryNameSelected.value ||
        item.repo === repositoryNameSelected.value) &&
      (!maintainerSelected.value ||
        item.maintainers.includes(maintainerSelected.value)) &&
      (!committerSelected.value ||
        item.gitee_id.includes(committerSelected.value))
    );
  });
  totalRepositoryList.value;
};

const getRepositoryList = () => {
  const param = {
    community: 'openeuler',
    sig: sigName.value,
  };
  getSigRepositoryList(param).then((data) => {
    if (data.code === 200) {
      const {
        committerDetails = [],
        committers = [],
        maintainers = [],
      } = data.data;
      _totalRepositoryList.value = committerDetails.map((item: any) => ({
        ...item,
        maintainers,
      }));
      filterRepositoryList();
      repositoryNameList.value = committerDetails.map((item: any) => item.repo);
      maintainerList.value = maintainers;
      committerList.value = committers;
    }
  });
};

// 表格配置
const columns = [
  { label: t('sig.repositoryName'), key: 'repo', style: 'width: 25%' },
  { label: t('sig.maintainerEn'), key: 'maintainer', style: 'width: 35%' },
  {
    label: t('sig.committer'),
    key: 'gitee_id',
    style: 'width: 40%',
  },
];

onMounted(() => {
  getRepositoryList();
});
</script>
<template>
  <div class="sig-repo">
    <h2 class="repo-title">
      {{ $t('sig.repoList', { count: 111 }) }}
    </h2>
    <OTable
      class="repo-table"
      :columns="columns"
      border="row-frame"
      :data="repositoryList"
    >
      <template #header>
        <tr>
          <th>
            <FilterableTableHeader
              v-model="repositoryNameSelected"
              @change="filterRepositoryList"
              :options="repositoryNameList"
            >
              {{ t('sig.repositoryName') }}
            </FilterableTableHeader>
          </th>
          <th>
            <FilterableTableHeader
              v-model="maintainerSelected"
              @change="filterRepositoryList"
              :options="maintainerList"
            >
              {{ t('sig.maintainerEn') }}
            </FilterableTableHeader>
          </th>
          <th>
            <FilterableTableHeader
              v-model="committerSelected"
              @change="filterRepositoryList"
              :options="committerList"
            >
              {{ t('sig.committer') }}
            </FilterableTableHeader>
          </th>
        </tr>
      </template>
      <template #td_repo="{ row }">
        <a
          target="_blank"
          rel="noopener noreferrer"
          :href="`https://gitee.com/${row.repo}`"
        >
          {{ row.repo }}
        </a>
      </template>
      <template #td_maintainer="{ row }">
        <a
          v-for="(item, index) in row.maintainers"
          :key="item"
          target="_blank"
          rel="noopener noreferrer"
          :href="`https://gitee.com/${item}`"
        >
          {{ item
          }}<span v-show="index !== row.maintainers.length - 1">{{
            locale === 'zh' ? '、' : ',&nbsp;'
          }}</span>
        </a>
      </template>
      <template #td_gitee_id="{ row }">
        <a
          v-for="(item, index) in row.gitee_id"
          :key="item"
          target="_blank"
          rel="noopener noreferrer"
          :href="`https://gitee.com/${item}`"
        >
          {{ item
          }}<span v-show="index !== row.gitee_id.length - 1">{{
            locale === 'zh' ? '、' : ',&nbsp;'
          }}</span>
        </a>
      </template>
    </OTable>
    <!-- 页码 -->
    <div
      v-if="totalRepositoryList.length > [10, 20, 30, 40][0]"
      class="pagination"
    >
      <OPagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :layout="['total', 'pagesize', 'pager', 'jumper']"
        :total="totalRepositoryList.length"
        :page-sizes="[10, 20, 30, 40]"
        :show-more="true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-repo {
  .repo-title {
    @include h4;
    font-weight: 500;
  }
  .repo-table {
    margin-top: 24px;
  }
  .pagination {
    @include respond-to('<=pad_v') {
      display: none;
    }
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
