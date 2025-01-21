<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import { querySigUserContribute } from '@/api/api-sig';
import IconSearch from '~icons/app-new/icon-search.svg';
import { SigContributeArrT } from '@/shared/@types/type-sig';

import ListProgress from './ListProgress.vue';
import ListFormRadio from './ListFormRadio.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';
import { OInput, OPagination } from '@opensig/opendesign';
import { ORadioGroup, ORadio, OToggle } from '@opensig/opendesign';

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
const reallData = ref([] as any[]);
const param = ref({
  contributeType: 'pr',
  timeRange: 'all',
  community: 'openeuler',
  sig: computed(() => props.sig),
});
const memberData = ref<SigContributeArrT[]>([]);
const memberMax = ref(0);
const searchVal = ref('');

const sortExp = (key: string, isAsc: boolean) => {
  return function (x: any, y: any) {
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
        { label: sigDetail.value.ALL, value: 'all' },
        { label: sigDetail.value.LAST_ONE_MONTH, value: 'lastonemonth' },
        { label: sigDetail.value.LAST_HALF_YEAR, value: 'lasthalfyear' },
        { label: sigDetail.value.LAST_YEAR, value: 'lastoneyear' },
      ],
    },
  ];
});
// theform组件调用
const loading = ref(true);

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

// 搜索过滤

const querySearch = () => {
  if (searchVal.value !== '') {
    const newList = memberData.value.filter((item: any) =>
      item.gitee_id.toLowerCase().includes(searchVal.value)
    );
    reallData.value = newList;
    filterReallData();
  } else {
    getMemberData();
  }
};

// 按颜色过滤
const getcontributeValue = (item: any) => {
  item.isSelected = !item.isSelected;
  querySearch();
};

const getContributeInfo = () => {
  getMemberData();
  switchType();
};

const renderData = computed(() => {
  return reallData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
});
</script>
<template>
  <div>
    <div class="sig-contribut-title">
      {{ $t('sig.contributeTitle') }}
    </div>
    <div class="sig-contribut-intro">
      {{ $t('sig.contributeSubTitle') }}
    </div>
    <!-------------- 架构场景筛选 -------------->
    <div class="filter-box">
      <div
        v-for="(item, index) in lastformOption"
        :key="item.id"
        class="filter-card"
      >
        <div class="label">{{ item.label }}</div>
        <ORadioGroup v-model="param[item.id]">
          <ORadio
            v-for="list in item.list"
            class="list-radio"
            :key="list.value"
            @change="getContributeInfo"
            :label="list.value"
            :value="list.value"
          >
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ list.label }} </OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
        <OInput
          v-if="index === 1"
          class="serach-input"
          :placeholder="$t('download.PLACEHOLDER')"
          v-model.lazy="searchVal"
          @change="querySearch"
        >
          <template #prefix>
            <OIcon class="icon"><IconSearch></IconSearch></OIcon>
          </template>
        </OInput>
      </div>
    </div>
    <div class="contribut-rank">
      <div class="contribut-color-box">
        {{ typeLable }}
        <div class="contribut-list">
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
      </div>
      <div class="rank-list">
        <template v-if="renderData.length">
          <div v-for="(item, index) in renderData" class="rank-line">
            <div class="rank-nub">
              {{ currentPage * index + 1 }}
            </div>
            <ListProgress
              :giteeName="item.gitee_id"
              :item="item.contribute"
              :member-list="memberMax"
              :usertype="item.usertype"
            ></ListProgress>
          </div>
        </template>
        <ResultEmpty
          :style="{
            '--result-image-width': '140px',
            '--result-image-height': '170px',
          }"
          v-else
        />
      </div>
    </div>

    <!-- 页码 -->
    <div v-if="reallData.length > [10, 20, 30, 40][0]" class="pagination">
      <OPagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :layout="['total', 'pagesize', 'pager', 'jumper']"
        :total="reallData.length"
        :page-sizes="[10, 20, 30, 40]"
        :show-more="true"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.pagination {
  @include respond-to('<=pad_v') {
    display: none;
  }
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
}
.sig-contribut-title {
  @include h4;
  font-weight: 500;
}
.sig-contribut-intro {
  margin-top: 8px;
  @include text1;
}

// 筛选卡片
.filter-box {
  margin-top: 24px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px;
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
  .serach-input {
    margin-left: auto;
    max-width: 320px;
    :deep(.o_box-main) {
      .o-icon {
        font-size: var(--o-font_size-text1);
      }
      border-radius: var(--o-radius-xs);
    }
  }
}

.contribut-rank {
  margin-top: 16px;
  background-color: var(--o-color-fill2);
  border: 1px solid var(--o-color-control4);
  border-radius: var(--o-radius-xs);
  .contribut-color-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 56px;
    .contribut-list {
      display: flex;
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
  }
  .rank-list {
    border-top: 1px solid var(--o-color-control4);
    .o-result {
      margin: 40px;
    }
    .rank-line {
      display: flex;
      align-items: center;
      .rank-nub {
        padding: 16px;
        @include tip1;
      }
    }
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
