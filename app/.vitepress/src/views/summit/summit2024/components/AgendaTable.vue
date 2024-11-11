<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { StoreDataT, TableDataT } from '../@type/agenda';
import { getPersonTitle } from '../utils';

const props = defineProps({
  datas: {
    type: Object as PropType<StoreDataT[]>,
    default: () => ({}),
  },
  id: {
    type: String,
    default: '',
  },
});

const tableData = computed<TableDataT[]>(() => {
  if (!Array.isArray(props.datas)) {
    console.log('props.datas2', props.datas);
    return [];
  }
  const item = props?.datas?.find((item: StoreDataT) => item.id === props.id);
  if (item) {
    return item?.data || [];
  } else {
    return [];
  }
});
</script>
<template>
  <div v-if="tableData?.length" class="event-table">
    <div v-for="item of tableData" :key="item.id" class="table-row">
      <div class="time">{{ item.time }}</div>
      <div class="event">{{ item.event }}</div>
      <div class="guest-info">
        <div v-for="guest of item.guestData" :key="guest.id" class="guest">
          <div class="guest-name">{{ guest.name }}</div>
          <div
            class="guest-title"
            v-for="title of getPersonTitle(guest.title)"
            :key="title"
          >
            {{ title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event-table {
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(45, 47, 51, 0.1);
  padding: 0 20px 10px;
  .table-row {
    display: flex;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    min-height: 60px;
    justify-content: center;
    align-items: center;
    text-align: left;
    &:last-child {
      border-bottom: none;
    }
    .time {
      flex: 1;
    }
    .event {
      flex: 2.5;
    }
    .guest-info {
      flex: 2.5;
      .guest {
        display: flex;
        color: #707070;
      }
      .guest-name {
        min-width: 160px;
      }
      .guest-title {
        flex: 1;
      }
    }
  }
}
</style>
