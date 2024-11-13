<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { StoreDataT, TableDataT } from '../@type/agenda';

import IconTime from '~icons/app/icon-time.svg';

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
      <div class="time">
        <IconTime v-show="item.time" />
        {{ item.time }}
      </div>
      <div class="desc">
        <span v-for="subItem in item.event?.split('\n')" :key="subItem">
          {{ subItem }}
        </span>
      </div>
      <div class="name-box">
        <div v-for="guest of item.guestData" :key="guest.id" class="guest">
          <div class="name">{{ guest.name }}</div>
          <div class="post">
            {{ guest.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event-table {
  width: 100%;
  padding: 24px;
  background-color: var(--e-color-bg2);
  text-align: left;
  @media screen and (max-width: 1100px) {
    position: relative;
  }
  @media (max-width: 1100px) {
    padding: 16px;
  }
  .table-row {
    display: grid;
    grid-template-columns: 192px 580px 480px;
    padding: 20px 0px;
    transition: all 0.25s ease;
    align-items: center;
    min-height: 64px;
    position: relative;
    & + .table-row {
      border-top: 1px solid var(--e-color-border2);
    }
    @media screen and (max-width: 1328px) {
      grid-template-columns: 192px 450px 400px;
    }
    @media screen and (max-width: 1100px) {
      grid-template-columns: 80px auto;
      padding: 6px 0;
      min-height: 36px;
      position: static;
    }
    .name-box {
      @media screen and (max-width: 1100px) {
        grid-column-end: 3;
      }
      div {
        display: flex;
        align-items: center;
        @media screen and (max-width: 1100px) {
          grid-column-start: 2;
          grid-column-end: 3;
          display: block;
        }
      }
    }
    .desc {
      font-size: 18px;
      line-height: 30px;
      color: var(--e-color-text1);
      display: block;
      margin-right: 36px;
      cursor: default;
      word-wrap: break-word;
      > span {
        display: block;
        & ~ span {
          margin-top: var(--e-spacing-h6);
        }
      }
      @media (max-width: 1100px) {
        margin-right: 0;
        font-size: 12px;
        line-height: 18px;
      }
    }

    .name {
      width: 200px;
      display: inline-block;
      color: var(--e-color-text3);
      font-size: 16px;
      line-height: var(--e-line-height-h8);
      @media (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
        width: auto;
      }
    }
    .post {
      width: 100%;
      display: inline-block;
      color: var(--e-color-text3);
      font-size: 16px;
      line-height: 24px;
      flex: 1;
      @media (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
      }
    }
    .post-more {
      width: 345px;
      @media screen and (max-width: 1100px) {
        width: 100%;
      }
    }
    .time {
      width: 192px;
      font-size: 18px;
      line-height: 26px;
      color: var(--e-color-text3);
      display: flex;
      align-items: center;
      @media screen and (max-width: 1100px) {
        font-size: 12px;
        line-height: 18px;
        width: 80px;
      }
      svg {
        width: 18px;
        height: 18px;
        color: var(--e-color-text3);
        margin-right: 6px;
        @media screen and (max-width: 1100px) {
          display: none;
        }
      }
    }
    .info .desc {
      width: 460px;
      margin-right: 40px;
      display: inline-block;
    }
  }
}
</style>
