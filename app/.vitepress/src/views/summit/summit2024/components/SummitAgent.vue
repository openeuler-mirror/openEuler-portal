<script lang="ts" setup>
import { watch, PropType, ref } from 'vue';
import PreviewSubtitle from './PreviewSubtitle.vue';
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
  console.log('in doactivedate');
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
  // console.log('in doactivespan');
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
const doActiveBig = () => {
  // console.log('in doactivebig');
  if (bigList.value?.length) {
    // 大类别是并排显示，把每个大类别下小类别一项激活
    bigList.value.forEach((one) => {
      if (one.smallClass?.length) {
        const item = one.smallClass?.find((item) => {
          return item.isActive;
        });
        if (!item) {
          one.smallClass[0].isActive = true;
          one.activeBigSmallId = one.smallClass[0].id;
        } else {
          one.activeBigSmallId = item.id;
        }
      }
    });
  }
  // console.log('after doactivebig');
};
// span下有大类别，大类别下有小类别，激活大类别下的小列表，
const clickBigSmall = (big: BigClassT, small: SmallClassT) => {
  activeBigSmall.value = small;
  // console.log('in clickBigSmall');
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
  // console.log('after clickBigSmall');
};
// -------------------------------------   small 的交互   ---------------------------------
// span下的small, 大类别bigClass下的small没在这里
const activeSpanSmall = ref<SmallClassT>();
const smallList = ref<SmallClassT[]>();
const doActiveSmall = (small: SmallClassT | undefined = undefined) => {
  // console.log('in doactivesmall');
  let item = {} as SmallClassT;
  if (!small) {
    // 没有数据，初始化数据 返回
    if (!smallList.value?.length) {
      return;
    }
    // 有数据，找到激活项或第一项
    const one = smallList.value.find((item) => {
      return item.isActive;
    });
    if (!one) {
      item = smallList.value[0];
    } else {
      item = one;
    }
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
  activeSpanSmall.value = item;
  item.isActive = true;
  // console.log('after doactivesmall');
};
// console.log('props.data1', props.data);

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
    <!-- <PreviewSubtitle
      :title="props.data.title"
      :title-stripe="props.data.titleStripe"
    /> -->
    <h3>{{ props.data.title }}</h3>
    <div class="agenda">
      <!--  日期列表  -->
      <div class="date-list">
        <template v-for="date of dateList">
          <div
            v-if="date.date !== 'default'"
            :key="date.date"
            :class="{ activeDate: date.isActive }"
            class="date-title"
            @click="doActiveDate(date)"
          >
            <div class="title-date">
              {{
                date.date?.length <= 2
                  ? date.date
                  : new Date(date.date).getDate()
              }}
            </div>
            <div class="title-desc">DEC</div>
          </div>
        </template>
      </div>
      <!--  分时段类别列表  -->
      <div class="span-list">
        <template v-for="span of spanList">
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
        <div v-for="big of bigList" :key="big.title" class="bigClass">
          <div v-if="big.title !== 'default'" class="big-title">
            {{ big.title }}
          </div>
          <!--    小类别列表    -->
          <div v-if="big.smallClass?.length" class="smallClass">
            <template v-for="small of big.smallClass">
              <div
                v-if="small.title !== 'default'"
                :key="small.title"
                class="small-title"
                :class="{ activeSmall: small.isActive }"
                @click="clickBigSmall(big, small)"
              >
                {{ small.title }}
              </div>
            </template>
          </div>
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
      <template v-if="smallList?.length">
        <div class="smallClass">
          <template v-for="small of smallList">
            <div
              v-if="small.title !== 'default'"
              :key="small.title"
              class="small-title"
              :class="{ activeSmall: small.isActive }"
              @click="doActiveSmall(small)"
            >
              {{ small.title }}
            </div>
          </template>
        </div>
        <!--   小类别下面的数据2  -->
        <AgendaTable
          :id="activeSpanSmall?.id"
          :datas="props.data.datas"
          :key="activeSpanSmall?.id"
        ></AgendaTable>
      </template>
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
  .date-list {
    display: flex;
    justify-content: center;
    .date-title {
      margin: 20px;
      width: 106px;
      height: 123px;
      border-radius: 8px;
      border: 1px solid #cbcbcb;
      color: #cbcbcb;
      cursor: pointer;
      &.activeDate {
        color: #fff;
        background-color: #002fa7;
        .title-date {
          border-bottom: 1px solid #fff;
        }
      }
      .title-date {
        font-size: 40px;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid;
      }
      .title-desc {
        font-size: 22px;
        height: 50px;
        line-height: 50px;
      }
    }
  }
  .span-list {
    display: flex;
    justify-content: center;
    margin: 20px;
    .span-title {
      min-width: 116px;
      height: 40px;
      line-height: 40px;
      border: 1px solid #e5e5e5;
      border-collapse: collapse;
      padding: 0 15px;
      cursor: pointer;
      &.activeSpan {
        background-color: #002fa7;
        color: rgba(255, 255, 255, 0.85);
        border: 1px solid #002fa7;
      }
    }
  }
  .big-title {
    font-size: 20px;
    margin: 20px;
  }
  .smallClass {
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
  .span-data {
    margin: 10px 0;
  }
}
</style>
