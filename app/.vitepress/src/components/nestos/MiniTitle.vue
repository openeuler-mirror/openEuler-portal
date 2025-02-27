<template>
  <div class="title">
    <div class="title-outside">{{ outsideTitle }}</div>
    <div class="title-inside">{{ insideTitle }}</div>
  </div>
</template>

<script setup>
defineProps({
  insideTitle: {
    type: String,
    default: '',
  },
  outsideTitle: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
@import './style/color-pick.scss';

.title {
  margin: 80px auto 40px;
  font-size: 40px;
  color: var(--o-color-info1);
  position: relative;
  text-align: center;

  &-outside {
    position: absolute;
    left: 50%;
    top: -46%;
    transform: translateX(-50%);
    color: $gray-text;
    opacity: 0.3;
    font-weight: 300;
    z-index: 1;
    -webkit-user-select: none;
    user-select: none;
  }

  &-inside {
    font-size: 36px;
    -webkit-user-select: none;
    user-select: none;
  }
}
</style>
