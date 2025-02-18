<template>
  <div>
    <div class="character">
      <div
        class="character-item"
        v-for="item in 6"
        :key="`${item}key`"
        @click="viewDetail(item)"
      >
        <div class="character-item-img">
          <img :src="features[item - 1]" />
        </div>
        <div class="character-item-text">
          <span class="character-item-text_title">{{
            i18n.nestos.arch[`title${item}`]
          }}</span>
          <span class="character-item-text_desc">{{
            i18n.nestos.arch[`desc${item}`]
          }}</span>
        </div>
      </div>
    </div>

    <el-drawer v-model="drawer" :title="drawerTitle" size="60%">
      <template #header>
        <h2>
          {{ i18n.nestos.arch[`title${detailIndex}`] }}
        </h2>
      </template>
      <div class="detail">
        <v-detail-one v-if="detailIndex === 1" />
        <v-detail-two v-if="detailIndex === 2" />
        <v-detail-three v-if="detailIndex === 3" />
        <v-detail-four v-if="detailIndex === 4" />
        <v-detail-five v-if="detailIndex === 5" />
        <v-detail-six v-if="detailIndex === 6" />
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import vDetailOne from './detail/DetailOne.vue';
import vDetailTwo from './detail/DetailTwo.vue';
import vDetailThree from './detail/DetailThree.vue';
import vDetailFour from './detail/DetailFour.vue';
import vDetailFive from './detail/DetailFive.vue';
import vDetailSix from './detail/DetailSix.vue';
import { useI18n } from '@/i18n';
import { features } from '../utils/resource';
const i18n = useI18n();

const drawer = ref(false);
const detailIndex = ref(1);
const drawerTitle = ref('内核特性增强');

const viewDetail = (index) => {
  detailIndex.value = index;
  drawer.value = true;
};
</script>

<style lang="scss" scoped>
.character {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: var(--o-gap-5);

  @include respond-to('<=pad_v') {
    grid-template-columns: repeat(1, 1fr);
  }

  .character-item {
    height: 134px;
    padding: var(--o-gap-5);
    display: flex;
    cursor: pointer;
    background-color: var(--o-color-control-light);

    .character-item-img {
      width: var(--o-control_size-l);
      height: var(--o-control_size-l);
      margin-right: var(--o-gap-3);
    }

    .character-item-text {
      flex: 1;
      display: flex;
      flex-direction: column;

      .character-item-text_title {
        @include h3;
        display: inline-block;
        font-weight: 500;
        color: var(--o-color-info1);
        margin-bottom: var(--o-gap-2);
      }

      .character-item-text_desc {
        @include text1;
        display: inline-block;
        font-weight: 400;
        color: var(--o-color-info2);
      }
    }
  }
}
</style>
