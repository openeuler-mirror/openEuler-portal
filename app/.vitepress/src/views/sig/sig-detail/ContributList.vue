<script setup lang="ts">
import ListProgress from './ListProgress.vue';
import ListFormRadio from './ListFormRadio.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import { querySigUserContribute } from '@/api/api-sig';
import IconSearch from '~icons/app/icon-search.svg';
import NotFound from '@/NotFound.vue';
import { IObject } from './interface';
import useWindowResize from '@/components/hooks/useWindowResize';
import { SigContributeArrT } from '@/shared/@types/type-sig';

const { lang } = useData();
const i18n = useI18n();
const sigDetail = computed(() => {
  return i18n.value.sig.SIG_DETAIL;
});
const props = defineProps({
  sig: {
    type: String,
    required: true,
    default: '',
  },
});
const contributionSelectBox = ref([
  {
    color: 'bg-color-maintainer',
    isSelected: true,
    label: 'Maintainer',
    key: 'maintainers',
  },
  {
    color: 'bg-color-committer',
    isSelected: true,
    label: 'Committer',
    key: 'committers',
  },
  {
    color: 'bg-color-contributor',
    isSelected: true,
    label: 'Contributor',
    key: 'contributor',
  },
]);
const filterReallData = () => {
  reallData.value = reallData.value.filter((item) => {
    return contributionSelectBox.value.some((it) => {
      return it.isSelected && item.usertype === it.key;
    });
  });
};
const reallData = ref([] as IObject[]);
const param = ref({
  contributeType: 'pr',
  timeRange: 'all',
  community: 'openeuler',
  sig: computed(() => props.sig),
} as IObject);
const memberData = ref<SigContributeArrT[]>([]);
const memberMax = ref(0);
const searchInput = ref('');
const sortExp = (key: string, isAsc: boolean) => {
  return function (x: IObject, y: IObject) {
    return (x[key] - y[key]) * (isAsc ? 1 : -1);
  };
};
const getMemberData = () => {
  querySigUserContribute(param.value).then((data) => {
    const memberList = data?.data?.sort(sortExp('contribute', false)) || [];
    if (memberList.length === 0) {
      memberMax.value = 0;
      memberData.value = [];
    } else {
      memberMax.value = memberList[0].contribute;
      memberData.value = memberList.map((item: any, index: any) => ({
        ...item,
        rank: index + 1,
      }));
      reallData.value = memberData.value;
    }
    filterReallData();
    currentPage.value = 1;
  });
};

const lastformOption = computed(() => {
  return [
    {
      label: sigDetail.value.METRIC,
      id: 'contributeType',
      active: 'pr',
      list: [
        { label: sigDetail.value.PRS, value: 'pr' },
        { label: sigDetail.value.ISSUES, value: 'issue' },
        { label: sigDetail.value.COMMENTS, value: 'comment' },
      ],
    },
    {
      label: sigDetail.value.TIMERANGE,
      id: 'timeRange',
      active: 'all',
      list: [
        { label: sigDetail.value.LAST_ONE_MONTH, value: 'lastonemonth' },
        { label: sigDetail.value.LAST_HALF_YEAR, value: 'lasthalfyear' },
        { label: sigDetail.value.LAST_YEAR, value: 'lastoneyear' },
        { label: sigDetail.value.ALL, value: 'all' },
      ],
    },
  ];
});
// theform组件调用
const componentName = 'member';
const loading = ref(true);
const getContributeInfo = (e: IObject) => {
  param.value[e.id] = e.active;
  getMemberData();
  switchType();
};
const typeLable = ref('');
const switchType = () => {
  switch (param.value.contributeType) {
    case 'pr':
      typeLable.value = sigDetail.value.PRS;
      break;
    case 'issue':
      typeLable.value = sigDetail.value.ISSUES;
      break;
    case 'comment':
      typeLable.value = sigDetail.value.COMMENTS;
      break;
  }
};
switchType();
watch(
  () => props.sig,
  () => {
    getMemberData();
  }
);
onMounted(() => {
  loading.value = false;
});
// 默认显示第1页
const currentPage = ref(1);
const pageSize = ref(10);
const totalPage = computed(() =>
  Math.ceil(reallData.value.length / pageSize.value)
);

// 搜索过滤

const querySearch = () => {
  if (searchInput.value !== '') {
    const newList = memberData.value.filter((item: any) =>
      item.gitee_id.toLowerCase().includes(searchInput.value)
    );
    reallData.value = newList;
    filterReallData();
  } else {
    getMemberData();
  }
};
const clearSearchInput = () => {
  getMemberData();
  searchInput.value = '';
};

// 按颜色过滤
const getcontributeValue = (item: any) => {
  item.isSelected = !item.isSelected;
  querySearch();
};
// 跳转个人详情
const goToUser = (data: string) => {
  const url = 'https://datastat.openeuler.org';
  const path = `/${lang.value}/user/${data}`;
  window.open(url + path, '_blank');
};
const screenWidth = useWindowResize();
const isIphone = computed(() => {
  return screenWidth.value <= 768 ? true : false;
});
const paginLayout = computed(() =>
  isIphone.value
    ? 'prev, slot, jumper, next'
    : 'sizes, prev, pager, next, slot, jumper'
);
const jumpPage = (val: number) => {
  currentPage.value = val;
};
</script>
<template>
  <div>
    <div class="second-form">
      <ListFormRadio
        :option="lastformOption"
        @get-contribute-info="getContributeInfo($event)"
      >
        <template #searchInput>
          <div class="search-box">
            <OInput
              v-model="searchInput"
              :trigger-on-focus="false"
              clearable
              :debounce="300"
              size="large"
              :placeholder="sigDetail.ENTER_GITEE"
              @change="querySearch"
              @clear="clearSearchInput"
            >
              <template #prefix>
                <OIcon class="search-icon"
                  ><IconSearch></IconSearch
                ></OIcon> </template
            ></OInput>
          </div>
        </template>
      </ListFormRadio>
    </div>
    <div class="edcolor-box">
      <div
        v-for="value in contributionSelectBox"
        :key="value.label"
        class="yellow-box"
        style="cursor: pointer"
        @click="getcontributeValue(value)"
      >
        <div
          class="box"
          :class="value.isSelected ? value.color : 'bg-color-cancel'"
        ></div>
        <span :class="value.isSelected ? '' : 'color-cancel'">{{
          value.label
        }}</span>
      </div>
    </div>
    <div class="leader">
      <div class="leader-box">Leader</div>
      <span>SIG Leader</span>
    </div>
    <div v-if="reallData?.length" class="ranking-list">
      <div class="ranking-list-item">
        <p class="caption"></p>
        <OTable
          v-loading="loading"
          :data="
            reallData.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )
          "
          style="width: 100%"
        >
          <el-table-column
            prop="rank"
            align="center"
            :label="sigDetail.NUMBER"
            width="120"
          />
          <el-table-column
            prop="gitee_id"
            align="left"
            label="Gitee ID"
            show-overflow-tooltip
            width="200"
            ><template #default="scope">
              <div class="usertype-box">
                <span
                  v-show="scope.row.usertype !== 'committers'"
                  class="usertypecolorbox"
                  :class="
                    scope.row.usertype === 'maintainers'
                      ? 'bg-color-maintainer'
                      : 'bg-color-contributor'
                  "
                ></span>
                <span
                  v-show="scope.row.usertype === 'committers'"
                  class="usertypecolorbox bg-color-committer"
                ></span>
                <span
                  class="num"
                  :style="{
                    cursor: 'pointer',
                  }"
                  @click="goToUser(scope.row.gitee_id)"
                  >{{ scope.row.gitee_id }}</span
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            class-name="type-label"
            :label="typeLable"
          >
            <template #default="scope">
              <div class="box">
                <span class="num">{{ scope.row.contribute }}</span>

                <ListProgress
                  :item="scope.row.contribute"
                  :component-name="componentName"
                  :member-list="memberMax"
                  :usertype="scope.row.usertype"
                ></ListProgress>
              </div>
            </template>
          </el-table-column>
        </OTable>
      </div>
    </div>
    <NotFound v-else></NotFound>
    <div class="sig-pagination">
      <ClientOnly>
        <OPagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          class="repository-pagin"
          :hide-on-single-page="true"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          :layout="paginLayout"
          :total="reallData.length"
          @jump-page="jumpPage"
        >
          <span class="pagination-slot">{{ currentPage }}/{{ totalPage }}</span>
        </OPagination>
      </ClientOnly>
    </div>
  </div>
</template>
<style scoped lang="scss">
.sig-pagination {
  margin-top: var(--e-spacing-h2);
  @media screen and (max-width: 768px) {
    margin-top: var(--e-spacing-h5);
  }
}

.e-table {
  box-shadow: none;
}
.pagination-slot {
  font-size: var(--e-font-size-text);
  font-weight: 400;
  color: var(--e-color-text1);
  line-height: var(--e-spacing-h4);
}
@media screen and (min-width: 857px) {
  .repository-pagin {
    margin-top: var(--e-spacing-h2);
  }
}
@media screen and (max-width: 857px) {
  .repository-pagin {
    margin-top: var(--e-spacing-h5);
  }
}
.ranking-list {
  display: grid;
  grid-template-columns: 100%;
  // padding-right: 24px;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0px;
  }
  .caption {
    font-size: var(--e-font-size-h8);
    color: var(--e-color-black);
    line-height: var(--e-line-height-h8);
    margin-bottom: var(--e-spacing-h8);
  }
  .box {
    display: flex;
    .num {
      width: 50px;
      text-align: right;
    }
  }
  .usertype-box {
    display: flex;
    align-items: center;
    .num {
      width: 100px;
      text-align: left;
      color: var(--e-color-brand1);
    }
  }
}
.edcolor-box {
  display: flex;
  padding-bottom: 10px;

  .yellow-box {
    margin-right: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      width: 12px;
      height: 12px;
      border-radius: 2px;
      font-size: 10px;
      color: var(--e-color-white);
      line-height: 12px;
      text-align: center;
      margin-right: 8px;
      border-radius: 50%;
    }
  }
}
.usertypecolorbox {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
.leader {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &-box {
    width: 54px;
    height: 22px;
    background: var(--e-color-kleinblue7);
    border-radius: 2px;
    color: var(--e-color-white);
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: 300;
  }
}
.search-box {
  width: 100%;
  margin: 10px 0 20px;
  .search-icon {
    font-size: 20px;
  }
}
.bg-color-maintainer {
  background-color: #f0bc00;
}
.bg-color-committer {
  background-color: #009ce5;
}
.bg-color-contributor {
  background-color: var(--o-color-primary1);
}
.bg-color-cancel {
  background-color: var(--e-color-neutral10);
}
.color-cancel {
  color: var(--e-color-neutral10);
}
</style>
