<script lang="ts" setup></script>
<template>
  {{ $t('home.homeTitle') }}
</template>

<style scoped lang="scss">
:deep(.talent-title) {
  @include display3;
  font-weight: 500;
  color: var(--o-color-info1);
  text-align: center;
  margin-top: 72px;
  @media (max-width: 768px) {
    margin-top: 32px;
  }
}
:deep(.o-card) {
  --card-radius: 0;
}
:deep(.o-btn) {
  --btn-radius: 28px;
}
</style>
