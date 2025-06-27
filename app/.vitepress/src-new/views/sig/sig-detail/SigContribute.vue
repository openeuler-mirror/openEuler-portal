<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';

import { SigContributeArrT } from '@/shared/@types/type-sig';

import IconSearch from '~icons/app-new/icon-search.svg';
import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

import { querySigUserContribute } from '@/api/api-sig';
import ListProgress from './ListProgress.vue';
import ResultEmpty from '~@/components/ResultEmpty.vue';
import { OInput, OPagination } from '@opensig/opendesign';
import { ORadioGroup, ORadio, OToggle } from '@opensig/opendesign';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const props = defineProps({
  sig: {
    type: String,
    required: true,
    default: '',
  },
});

const { lePadV } = useScreen();
const { t } = useLocale();
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
const filterrealData = () => {
  realData.value = realData.value.filter((item) => {
    return contributionSelectBox.value.some((it) => {
      return it.isSelected && item.usertype === it.key;
    });
  });
};
const realData = ref([] as any[]);
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
      realData.value = memberData.value;
    }
    filterrealData();
    currentPage.value = 1;
  });
};

const lastformOption = computed(() => {
  return [
    {
      label: t('sig.METRIC'),
      id: 'contributeType',
      active: 'pr',
      list: [
        { label: t('sig.PRS'), value: 'pr' },
        { label: t('sig.ISSUES'), value: 'issue' },
        { label: t('sig.COMMENTS'), value: 'comment' },
      ],
    },
    {
      label: t('sig.TIMERANGE'),
      id: 'timeRange',
      active: 'all',
      list: [
        { label: t('sig.ALL'), value: 'all' },
        { label: t('sig.LAST_ONE_MONTH'), value: 'lastonemonth' },
        { label: t('sig.LAST_HALF_YEAR'), value: 'lasthalfyear' },
        { label: t('sig.LAST_YEAR'), value: 'lastoneyear' },
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
      typeLable.value = t('sig.PRS');
      break;
    case 'issue':
      typeLable.value = t('sig.ISSUES');
      break;
    case 'comment':
      typeLable.value = t('sig.COMMENTS');
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
    realData.value = newList;
    filterrealData();
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

// 移动端判断数据是否完全展示
const isFullyDisplayed = computed(() => {
  return currentPage.value * pageSize.value >= (realData.value.length || 0);
});

const getMoreClick = () => {
  if (isFullyDisplayed.value) {
    currentPage.value = 1;
  } else {
    currentPage.value++;
  }
};

const renderData = computed(() => {
  if (!lePadV.value) {
    return realData.value.slice(
      (currentPage.value - 1) * pageSize.value,
      currentPage.value * pageSize.value
    );
  } else {
    return realData.value.slice(0, currentPage.value * pageSize.value);
  }
});
</script>
<template>
  <div>
    <div class="sig-contribute-title">
      {{ $t('sig.contributeTitle') }}
    </div>
    <div class="sig-contribute-intro">
      {{ $t('sig.contributeSubTitle', { sig: sig }) }}
    </div>
    <!-------------- 筛选 -------------->
    <div class="filter-box">
      <OInput
        v-if="lePadV"
        class="serach-input"
        :placeholder="$t('sig.contributePlaceholder')"
        v-model.lazy="searchVal"
        @change="querySearch"
      >
        <template #prefix>
          <OIcon class="icon"><IconSearch></IconSearch></OIcon>
        </template>
      </OInput>
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
          v-if="index === 1 && !lePadV"
          class="serach-input"
          :placeholder="$t('sig.contributePlaceholder')"
          v-model.lazy="searchVal"
          @change="querySearch"
        >
          <template #prefix>
            <OIcon class="icon"><IconSearch></IconSearch></OIcon>
          </template>
        </OInput>
      </div>
    </div>
    <div v-if="lePadV" class="contribute-list contribute-list-mo">
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
    <div class="contribute-rank">
      <div class="contribute-color-box">
        {{ typeLable }}
        <div v-if="!lePadV" class="contribute-list">
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
          <!-- 底部分割线 -->
          <div
            v-for="line in 5"
            class="divider"
            :class="`divider-${line}`"
          ></div>
          <div v-for="(item, index) in renderData" class="rank-line">
            <div class="rank-nub">
              <span v-if="!lePadV">{{ (currentPage - 1) * 10 + index + 1 }}</span>
              <span v-else>{{ index + 1 }}</span>
            </div>
            <ListProgress
              :giteeName="item.gitee_id"
              :item="item.contribute"
              :member-list="memberMax"
              :usertype="item.usertype"
              :width="lePadV ? '230px' : '640px'"
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
    <div
      v-if="lePadV && (realData?.length || 0) > pageSize"
      class="get-more"
      @click="getMoreClick"
    >
      <span>{{
        isFullyDisplayed ? $t('common.collapse') : $t('common.more')
      }}</span>
      <OIcon :class="{ reversal: isFullyDisplayed }">
        <IconChevronDown />
      </OIcon>
    </div>

    <!-- 页码 -->
    <div v-if="realData.length > [10, 20, 30, 40][0]" class="pagination">
      <OPagination
        v-model:page="currentPage"
        v-model:page-size="pageSize"
        :layout="['total', 'pagesize', 'pager', 'jumper']"
        :total="realData.length"
        :page-sizes="[10, 20, 30, 40]"
        :show-more="true"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
.pagination {
  margin-top: 32px;
  display: flex;
  justify-content: flex-end;
  @include respond-to('<=pad_v') {
    display: none;
  }
}

.sig-contribute-title {
  font-weight: 500;
  @include h4;
  @include respond-to('<=pad_v') {
    margin-bottom: 12px;
    @include h3;
  }
}

.sig-contribute-intro {
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
    margin-top: 12px;
    padding: 12px;
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
      color: var(--o-color-info1);
      min-width: 32px;
      margin-right: 32px;
      font-weight: 500;
      @include text1;
      @include respond-to('<=pad_v') {
        min-width: auto;
      }
    }

    .o-radio-group {
      @include respond-to('<=pad_v') {
        .o-radio {
          margin: 8px 8px 0 0;
        }
      }

      .o-radio + .o-radio {
        margin-left: 8px;
        @include respond-to('<=pad_v') {
          margin-left: 0;
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
    @include respond-to('<=pad_v') {
      max-width: 100%;
      width: 100%;
    }
    :deep(.o_input) {
      width: 100%;
    }

    :deep(.o_box) {
      width: 320px;
      @include respond-to('pad_h') {
        width: 100%;
      }
      @include respond-to('<=pad_v') {
        width: 100%;
      }
    }

    :deep(.o_box-main) {
      border-radius: var(--o-radius-xs);

      .o-icon {
        font-size: var(--o-font_size-text1);
      }
    }
  }
}

.contribute-rank {
  margin-top: 16px;
  background-color: var(--o-color-fill2);
  border: 1px solid var(--o-color-control4);
  border-radius: var(--o-radius-xs);
  @include respond-to('<=pad_v') {
    margin-top: 8px;
  }

  .contribute-color-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px 12px 56px;
    @include respond-to('<=pad_v') {
      padding: 8px 56px;
    }
  }

  .rank-list {
    position: relative;
    border-top: 1px solid var(--o-color-control4);
    @for $i from 1 through 5 {
      .divider-#{$i} {
        right: calc((100% - 44px) / 6 * #{$i});
      }
    }

    .divider {
      position: absolute;
      height: 100%;
      width: 1px;
      background-color: var(--o-color-control4);
    }

    .o-result {
      margin: 40px 0;
    }

    .rank-line {
      display: flex;
      align-items: center;

      .rank-nub {
        border-right: 1px solid var(--o-color-control4);
        padding: 9px 0;
        width: 44px;
        text-align: center;
        @include tip1;
        @include respond-to('<=pad_v') {
          width: 38px;
        }
      }

      .o-progress {
        padding: 0 12px;
      }
    }
  }
}

.contribute-list {
  display: flex;
  font-family: 500;

  .yellow-box {
    font-weight: 500;
    @include text2;
    &:not(:last-child) {
      margin-right: 24px;
    }
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
      width: 8px;
      height: 8px;
      font-size: 10px;
      color: var(--e-color-white);
      line-height: 12px;
      text-align: center;
      margin-right: 8px;
      border-radius: 50%;
      @include respond-to('<=pad_v') {
        width: 8px;
        height: 8px;
      }
    }
  }
}

.get-more {
  cursor: pointer;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  @include text1;
  color: var(--o-color-info3);
  .o-icon {
    margin-left: 8px;
    font-size: var(--o-icon_size-xs);
    transition: all 0.3s;
  }
}
.reversal {
  transform: rotate(180deg);
}

.contribute-list-mo {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  .yellow-box {
    margin-right: 0;
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
