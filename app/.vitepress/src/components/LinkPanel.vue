<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
const props = withDefaults(
  defineProps<{
    linkList: any[];
    row?: number;
  }>(),
  {
    row: 4,
  }
);
</script>

<template>
  <div class="picture-panel" v-bind="attrs">
    <a
      v-for="item in props.linkList"
      :key="item.LINK"
      :href="item.LINK"
      data-aos="fade-up"
      target="_blank"
      rel="noopener noreferrer"
      class="link-item"
    >
      <img
        loading="lazy"
        :src="attrs.theme === 'light' ? item.IMG : item.IMG_DARK"
        alt="openEuler"
      />
    </a>
  </div>
</template>

<style scoped lang="scss">
.picture-panel {
  display: grid;
  grid-template-columns: repeat(v-bind('props.row'), minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  .link-item {
    display: flex;
    margin: 0px -1px -1px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--o-color-division1);
    background-color: var(--o-color-bg2);
    max-height: 120px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  @media screen and (max-width: 1416px) {
    grid-template-columns: repeat(v-bind('(props.row)-1'), minmax(82px, 270px));
    justify-content: center;
    .link-item {
      min-height: 40px;
      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(v-bind('(props.row)-2'), minmax(82px, 270px));
  }
}
</style>
