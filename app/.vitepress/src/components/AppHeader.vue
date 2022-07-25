<script setup lang="ts">
// 返回首页
const goHome = () => {
  window.open('https://www.openeuler.org/zh/', '_blank');
};
</script>

<template>
  <header class="app-header">
    <div class="app-header-body">
      <img
        class="logo"
        alt="openEuler logo"
        src="../assets/logo.png"
        @click="goHome"
      />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background-color: var(--o-color-bg);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  &-body {
    display: flex;
    align-items: center;
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    height: 80px;

    @media (max-width: 1100px) {
      padding: 0 16px;
      height: 48px;
    }
  }
}
.logo {
  height: 32px;
  cursor: pointer;
  @media (max-width: 1100px) {
    height: 24px;
  }
}
</style>
