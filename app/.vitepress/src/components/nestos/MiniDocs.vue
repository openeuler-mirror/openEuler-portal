<template>
  <div class="document">
    <div class="content">
      <div class="desc">
        <span class="title" @click="goLink(item)">{{
          i18n.nestos.resource.file[item.title]
        }}</span>
      </div>
      <div class="back"></div>
      <img :src="item.IMG" alt="" />
    </div>
  </div>
</template>

<script setup>
import illustration from '@/assets/nestos/resource/illustration-file.png';
import { useI18n } from '@/i18n';

const i18n = useI18n();
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  title: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  IMG: {
    type: String,
    default: illustration,
  },
});
const goLink = (item) => {
  window.open(item.path, '_blank');
};
</script>

<style lang="scss" scoped>
.document {
  height: 240px;
  overflow: hidden;
  display: flex;
  align-items: center;

  .content {
    width: 430px;
    position: relative;
    background-color: var(--o-color-fill2);
    box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);

    .desc {
      width: 60%;
      height: 190px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        display: inline-block;
        width: 100%;
        text-align: center;
        padding: 4px;
      }

      .title {
        font-weight: 600;

        &:hover {
          color: #357aef;
          cursor: pointer;
        }
      }
    }

    img {
      width: 130px;
      height: 130px;
      position: absolute;
      right: 30px;
      top: 30px;
      bottom: 30px;
      z-index: 2;
    }

    .back {
      width: 300px;
      height: 240px;
      background-image: url('@/assets/nestos/resource/group.png');
      background-size: 100%;
      position: absolute;
      right: -39px;
      top: -36px;
      z-index: 1;
    }

    &:hover {
      box-shadow: 0 6px 18px rgba(0, 47, 167, 0.14);
    }
  }
}
</style>
