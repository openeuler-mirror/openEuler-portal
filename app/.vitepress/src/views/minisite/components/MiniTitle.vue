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
  font-size: var(--e-font-size-h3);
  color: var(--e-color-text1);
  line-height: var(--e-line-height-h3);
  position: relative;
  text-align: center;
  margin-bottom: var(--e-spacing-h2);
  margin-top: var(--e-spacing-h1);
  &-outside {
    position: absolute;
    left: 50%;
    top: 16px;
    transform: translateX(-50%);
    z-index: 1;
  }
  &-inside {
    color: var(--e-color-neutral10);
    // TODO:
    font-size: 40px;
    font-weight: 300;
    user-select: none;
  }
  @media screen and (max-width: 767px) {
    margin-top: var(--e-spacing-h2);
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    height: 30px;
    margin-bottom: var(--e-spacing-h5);
    &-outside {
      top: 8px;
    }
    &-inside {
      color: var(--e-color-bg4);
      font-size: var(--e-font-size-h8);
      user-select: none;
    }
  }
}
.title-special {
  // TODO:
  margin-bottom: var(--e-spacing-h5);
}

.dark .title-inside {
  opacity: 0.1;
}
</style>
