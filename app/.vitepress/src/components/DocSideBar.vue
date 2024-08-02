<script lang="ts" setup></script>

<template>
  <aside class="sidebar">
    <slot></slot>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  right: 0;
  left: 0;
  top: 80px;
  bottom: 0;
  padding: 40px 0;
  min-height: calc(100vh - 80px);
  width: 300px;
  color: var(--o-color-text2);
  background-color: var(--o-color-kleinblue5);

  @media screen and (max-width: 1100px) {
    top: 48px;
    min-height: calc(100vh - 48px);
  }

  &-title + .sidebar-title {
    margin-top: 28px;
  }
}
</style>
