<script lang="ts" setup>
import { watch, PropType, ref } from 'vue';
import AgendaTable from './AgendaTable.vue';
import {
  AgendaInfoT,
  BigClassT,
  DateDataT,
  SmallClassT,
  SpanDataT,
} from '../@type/agenda';
const props = defineProps({
  data: {
    type: Object as PropType<AgendaInfoT>,
    default: () => ({}),
  },
});

// -------------------------------------   date 的交互    -------------------------------
const dateList = ref<DateDataT[]>(props.data.agenda);
const doActiveDate = (date: DateDataT | undefined = undefined) => {
  let item = {} as DateDataT;
  // 参数为空
  if (!date) {
    // 没有数据，初始化数据 返回
    if (!dateList.value?.length) {
      spanList.value = [];
      bigList.value = [];
      smallList.value = [];
      return;
    }
    // 有数据，找到激活项或第一项
    const one = dateList.value.find((item) => {
      return item.isActive;
    });
    if (!one) {
      item = dateList.value[0];
    } else {
      item = one;
    }
  } else {
    // 参数不为空，重置激活项
    dateList.value.forEach((item) => {
      item.isActive = false;
    });
    // 查找选中数据
    const one = dateList.value.find((item) => {
      return item.date === date.date;
    });
    if (one) {
      item = one;
    } else {
      spanList.value = [];
      bigList.value = [];
      smallList.value = [];
      return;
    }
  }
  // 设置激活状态，设置下级数据
  item.isActive = true;
  spanList.value = item.spans;
  doActiveSpan();
};

// -------------------------------------   span 的交互    --------------------------------
const activeSpan = ref<SpanDataT>();
const spanList = ref<SpanDataT[]>();
const doActiveSpan = (span: SpanDataT | undefined = undefined) => {
  let item = {} as SpanDataT;
  if (!span) {
    // 没有数据，初始化数据 返回
    if (!spanList.value?.length) {
      bigList.value = [];
      smallList.value = [];
      activeSpan.value = {} as SpanDataT;
      return;
    }
    // 有数据，找到激活项或第一项
    const one = spanList.value.find((item) => {
      return item.isActive;
    });
    if (!one) {
      item = spanList.value[0];
    } else {
      item = one;
    }
  } else {
    // 参数不为空，重置激活项
    spanList.value?.forEach((item) => {
      item.isActive = false;
    });
    // 查找选中数据
    const one = spanList.value?.find((item) => {
      return item.id === span.id;
    });
    if (one) {
      item = one;
    } else {
      bigList.value = [];
      smallList.value = [];
      activeSpan.value = {} as SpanDataT;
      return;
    }
  }
  // 设置激活状态，设置下级数据
  activeSpan.value = item;
  item.isActive = true;
  bigList.value = item.bigClass;
  smallList.value = item.smallClass;
  if (bigList.value?.length) {
    doActiveBig();
  }
  if (smallList.value?.length) {
    doActiveSmall();
  }
};

// -------------------------------------   big 的交互   -----------------------------------
const bigList = ref<BigClassT[]>();
const activeBigSmall = ref<SmallClassT>();
// 默认激活第一项
const doActiveBig = () => {
  if (bigList.value?.length) {
    // 大类别是并排显示，把每个大类别下小类别一项激活
    bigList.value.forEach((one) => {
      if (one.smallClass?.length) {
        one.smallClass.forEach((item) => {
          item.isActive = false;
        });
        one.smallClass[0].isActive = true;
        one.activeBigSmallId = one.smallClass[0].id;
      }
    });
  }
};
// span下有大类别，大类别下有小类别，激活大类别下的小列表，
// -------------------------- tab 高亮 ------------------
const clickBigSmall = (big: BigClassT, small: SmallClassT) => {
  activeBigSmall.value = small;
  big.smallClass?.forEach((one) => {
    one.isActive = false;
  });
  big.smallClass?.forEach((one) => {
    if (one.id === small.id) {
      one.isActive = true;
      big.activeBigSmallId = one.id;
    }
  });
  // 数据保存，防止失效
  bigList.value = bigList.value?.map((item) => {
    if (item.id === big.id) {
      return big;
    }
    return item;
  });
};
// -------------------------------------   small 的交互   ---------------------------------
// span下的small, 大类别bigClass下的small没在这里
const activeSpanSmall = ref<SmallClassT>();
const smallList = ref<SmallClassT[]>();
const spansmallId = ref<string>();
const doActiveSmall = (small: SmallClassT | undefined = undefined) => {
  let item = {} as SmallClassT;
  if (!small) {
    // 没有数据，初始化数据 返回
    if (!smallList.value?.length) {
      return;
    }
    smallList.value.forEach((item) => {
      item.isActive = false;
    });
    item = smallList.value[0];
  } else {
    // 参数不为空，重置激活项
    smallList.value?.forEach((item) => {
      item.isActive = false;
    });
    // 查找选中数据
    const one = smallList.value?.find((item) => {
      return item.id === small.id;
    });
    if (one) {
      item = one;
    } else {
      return;
    }
  }
  spansmallId.value = item.id;
  activeSpanSmall.value = item;
  item.isActive = true;
};

watch(
  () => props.data.agenda,
  (nv) => {
    dateList.value = nv;
    doActiveDate();
  },
  {
    immediate: true,
  }
);

// -------------------------------------   table数据      ---------------------------------
// title 为 default 默认不显示，default时默认只有一条数据
</script>
<template>
  <div v-if="dateList?.length" class="section">
    <h3>{{ props.data.title }}</h3>
    <div class="agenda">
      <!--  日期列表  -->
      <div class="date">
        <template v-for="date of dateList" :key="date.date">
          <div
            v-if="date.date !== 'default'"
            :key="date.date"
            :class="{ active: date.isActive }"
            class="date-item"
            @click="doActiveDate(date)"
          >
            <div class="date-day">
              {{
                date.date?.length <= 2
                  ? date.date
                  : new Date(date.date).getDate()
              }}
            </div>
            <div class="date-month">NOV</div>
          </div>
        </template>
      </div>
      <!--  分时段类别列表  -->
      <div class="span-list">
        <template v-for="span of spanList" :key="span.span">
          <div
            v-if="span.span !== 'default'"
            :key="span.span"
            :class="{ activeSpan: span.isActive }"
            class="span-title"
            @click="doActiveSpan(span)"
          >
            {{ span.span }}
          </div>
        </template>
      </div>
      <!--   分时段类别下面的  大类别列表   -->
      <template v-if="bigList?.length">
        <!--    小类别列表    -->
        <div v-for="big of bigList" :key="big.title" class="bigClass">
          <div v-if="big.title !== 'default'" class="big-title">
            {{ big.title }}
          </div>
          <!--    小类别列表    -->
          <el-tabs
            v-if="
              big.smallClass?.length && big.smallClass[0].title !== 'default'
            "
            v-model="big.activeBigSmallId"
            :key="`tabs-${big.id}`"
          >
            <el-tab-pane
              v-for="small of big.smallClass"
              :key="`tab-pane-${big.id}-${small.id}`"
              :name="small.id"
            >
              <template #label>
                <div
                  class="time-tabs"
                  v-if="small.title !== 'default'"
                  :class="{ activeSmall: small.isActive }"
                  @click="clickBigSmall(big, small)"
                >
                  {{ small.title }}
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
          <!--  小类别下面的数据1   -->
          <AgendaTable
            :id="big.activeBigSmallId"
            :datas="props.data.datas"
            :key="big.activeBigSmallId"
          ></AgendaTable>
          <!--   大类别下面的数据   -->
          <AgendaTable
            :id="big.id"
            :datas="props.data.datas"
            :key="big.id"
          ></AgendaTable>
        </div>
      </template>
      <!--   分时段类别下面的  小类别列表    -->
      <el-tabs v-if="smallList?.length" v-model.number="spansmallId">
        <el-tab-pane
          v-for="(small, index) of smallList"
          :key="small.title"
          :name="index"
        >
          <template #label>
            <div
              class="time-tabs"
              v-if="small.title !== 'default'"
              :key="small.title"
              :class="{ activeSmall: small.isActive }"
              @click="doActiveSmall(small)"
            >
              {{ small.title }}
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <!--  分时段类别下面的数据  -->
      <div
        v-if="activeSpan?.id && !bigList?.length && !smallList?.length"
        class="span-data"
      >
        <AgendaTable
          :id="activeSpan?.id"
          :datas="props.data.datas"
          :key="activeSpan?.id"
        ></AgendaTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.agenda {
  margin: 0 auto;
  text-align: center;
  .date {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    .date-item {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #cbcbcb;
      border-radius: 8px;
      border: 1px solid #cbcbcb;
      transition: all 0.3s ease-out;

      & ~ div {
        margin-left: 40px;
      }
      &.active {
        color: #fff;
        background-color: var(--e-color-brand1);
        border: 1px solid #fff;
      }
      .date-day {
        padding: 13px 17px 3px 15px;
        line-height: 48px;
        font-size: 48px;
        font-weight: 700;
        border-bottom: 1px solid #cbcbcb;
        @media screen and (max-width: 1120px) {
          padding: 6px 16px;
          font-size: 32px;
          line-height: 32px;
        }
      }
      .date-month {
        padding: 6px 0;
        font-size: 24px;
        font-weight: 100;
        line-height: 24px;
        @media screen and (max-width: 1120px) {
          padding: 4px 0;
          font-size: 16px;
        }
      }
    }
  }
  .span-list {
    margin: 24px 0;
    display: flex;
    justify-content: center;
    .span-title {
      display: inline-block;
      cursor: pointer;
      border: 1px solid var(--e-color-border2);
      color: var(--e-color-text1);
      text-align: center;
      background: var(--e-color-bg2);
      font-size: 14px;
      line-height: 38px;
      padding: 0 16px;
      min-width: 172px;
      @media (max-width: 1100px) {
        min-width: 160px;
        line-height: 28px;
        font-size: 12px;
        padding: 0 12px;
      }
      &.activeSpan {
        color: #fff;
        background: var(--e-color-brand1);
        border-color: var(--e-color-brand1);
      }
    }
  }
  .big-title {
    margin-top: 32px;
    margin-bottom: 24px;
    text-align: center;
    font-size: 20px;
    line-height: 24px;
    font-weight: 400;
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      margin-top: 24px;
      margin-bottom: 24px;
      font-size: 14px;
      line-height: 20px;
    }
  }
  .small-class {
    margin-top: var(--e-spacing-h4);

    width: 1416px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 5px 0 rgba(45, 47, 51, 0.1);
    .small-title {
      margin: 20px 20px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;
      &.activeSmall {
        color: #002fa7;
        padding-bottom: 10px;
        border-bottom: 1px solid #002fa7;
      }
    }
  }
  .big-class {
  }

  :deep(.el-tabs) {
    background-color: var(--e-color-bg2);
    padding: 24px;
    padding-bottom: 0;
    @media (max-width: 1100px) {
      padding: 16px;
      padding-bottom: 0;
    }
    .el-tabs__nav-wrap::after {
      display: none;
    }
    .el-tabs__header.is-top .el-tabs__item.is-top {
      padding: 0px 20px 0px 0;
      @media (max-width: 1100px) {
        height: auto;
        padding: 0px 18px 0px 0;
        line-height: 22px;
      }
    }
    .el-tabs__nav {
      @media (max-width: 1100px) {
        line-height: 44px;
      }
    }
    .el-tabs__header {
      text-align: center;
      margin: 0;
      .el-tabs__item {
        @media (max-width: 1100px) {
          font-size: 12px;
          line-height: 18px;
        }
      }
    }
  }
  :deep(.el-tabs__nav-scroll) {
    color: var(--e-color-text1);
    display: flex;
    justify-content: center;
  }
  :deep(.el-tabs__content) {
    overflow: visible;
    margin-top: 0;
  }
  :deep(.el-tabs__nav) {
    @media (max-width: 1100px) {
      line-height: 44px;
    }
  }
  .other-text {
    margin: 24px auto 0 auto;
    color: var(--e-color-text1);
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 1100px) {
      font-size: 14px;
      line-height: 22px;
      margin: 16px 0;
    }
    svg {
      margin-right: 8px;
    }
  }
  .other-title {
    margin: 24px auto;
    color: var(--e-color-text1);
    font-size: 18px;
    line-height: 26px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: normal;
    @media (max-width: 1100px) {
      font-size: 14px;
      line-height: 22px;
      margin: 16px 0;
    }
  }
  .content-list {
    .detail {
      display: none;
    }
    .show-detail {
      .detail {
        display: block;
      }
    }
  }
  .exit-detail {
    cursor: pointer;
  }
  .detail {
    display: none;
  }
  :deep(.time-tabs) {
    color: var(--e-color-text1);
    font-size: var(--e-font-size-text);
    line-height: 38px;
    &:hover {
      color: var(--e-color-brand1);
    }
  }
  :deep(.is-active) {
    .time-tabs {
      color: var(--e-color-brand1);
    }
  }
  .span-data {
    margin: 10px 0;
  }
}
</style>
