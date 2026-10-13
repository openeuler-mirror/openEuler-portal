<script lang="ts" setup>
defineProps({
  introduceData: {
    type: Object,
    required: true,
    default: () => null,
  },
});
</script>

<template>
  <div class="introduce">
    <ul class="desc">
      <li v-for="(li, i) in introduceData.desc" :key="i" v-dompurify-html="li"></li>
    </ul>
    <p class="tips">{{ introduceData.tips }}</p>
    <ul class="list">
      <li v-for="(li, i) in introduceData.list" :key="i" v-dompurify-html="li"></li>
    </ul>
    <ul class="slogan">
      <li v-for="(li, i) in introduceData.slogan" :key="i">
        {{ li }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.introduce {
  padding-top: var(--o-gap-9);
  padding-bottom: var(--o-gap-10);
  color: var(--o-color-info1);
  @include text2;

  @include respond('<=pad_v') {
    padding-top: var(--o-gap-7);
    padding-bottom: var(--o-gap-7);
    @include text1;
  }

  .desc {
    li + li {
      margin-top: 12px;
    }

    // 大会名称加粗
    :deep(strong) {
      font-weight: 600;
    }
  }

  .tips {
    margin-top: var(--o-gap-5);

    @include respond('<=pad_v') {
      margin-top: var(--o-gap-4);
    }
  }

  .list {
    padding-left: 20px;
    list-style-type: disc;

    li {
      @include respond('<=pad_v') {
        margin-top: 8px;
      }
    }
  }

  .slogan {
    margin-top: var(--o-gap-5);

    @include respond('<=pad_v') {
      margin-top: var(--o-gap-4);
    }
  }
}
</style>
