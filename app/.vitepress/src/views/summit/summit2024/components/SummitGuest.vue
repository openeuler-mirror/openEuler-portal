<script lang="ts" setup>
import { PropType } from 'vue';
import GuestCentent from './GuestCentent.vue';
import { GuestInfoT, StoreDataT } from './@type';
const props = defineProps({
  data: {
    type: Object as PropType<GuestInfoT>,
    default: () => ({}),
  },
});

const getPersonInfo = (id: string) => {
  const res = props.data.datas?.find((one: StoreDataT) => one.id === id);
  return res?.data || [];
};
</script>
<template>
  <div
    v-if="props.data.guestClass?.length || props.data.datas?.length"
    class="section"
  >
    <h3>
      {{ props.data.title }}
    </h3>
    <!-- 有分类 -->
    <template v-if="props.data.guestClass?.length !== 0">
      <div
        v-for="item of props.data.guestClass"
        :key="item.title"
        class="guest-wrapper"
      >
        <template v-if="getPersonInfo(item.id)?.length > 0">
          <p class="class-title">{{ item.title }}</p>
          <GuestCentent
            :lecturer-list="getPersonInfo(item.id)"
            shape="circle"
            :web-columns-num="4"
            :mobile-columns-num="2"
          />
        </template>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.section {
  text-align: center;
  .class-title {
    margin-top: 20px;
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    color: var(--e-color-text1);
    font-weight: 400;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      margin-top: var(--e-spacing-h5);
    }
  }
  .avatar-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .avatar {
    width: 25%;
    margin: 10px 0;
    text-align: center;
    box-sizing: border-box;
    .avatar-img {
      margin: 0 auto;
      width: 120px;
      height: 120px;
      border-radius: 80px;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .person-name {
      color: #475ba4;
      font-weight: bold;
      padding: 8px;
    }
  }
}
</style>
