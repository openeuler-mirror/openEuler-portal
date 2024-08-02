<script lang="ts" setup>
defineProps({
  insideTitle: {
    type: String,
    default: '',
  },
  outsideTitle: {
    type: String,
    default: '',
  },
  specialComponent: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div :class="`${specialComponent ? 'title title-special' : 'title'}`">
    <div class="title-outside">{{ outsideTitle }}</div>
    <div class="title-inside">{{ insideTitle }}</div>
  </div>
</template>

<style lang="scss" scoped>
.title {
  margin: 0 auto;
  height: 64px;
  font-size: var(--o-font-size-h3);
  color: var(--o-color-text1);
  line-height: var(--o-line-height-h3);
  position: relative;
  text-align: center;
  margin-bottom: var(--o-spacing-h2);
  margin-top: var(--o-spacing-h1);
  &-outside {
    position: absolute;
    left: 50%;
    top: 16px;
    transform: translateX(-50%);
    z-index: 1;
  }
  &-inside {
    color: var(--o-color-neutral10);
    // TODO:
    font-size: 40px;
    font-weight: 300;
    user-select: none;
  }
  @media screen and (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    height: 30px;
    margin-bottom: var(--o-spacing-h5);
    &-outside {
      top: 8px;
    }
    &-inside {
      color: var(--o-color-bg4);
      font-size: var(--o-font-size-h8);
      user-select: none;
    }
  }
}
.title-special {
  // TODO:
  margin-bottom: var(--o-spacing-h5);
}

.dark .title-inside {
  opacity: 0.1;
}
</style>
