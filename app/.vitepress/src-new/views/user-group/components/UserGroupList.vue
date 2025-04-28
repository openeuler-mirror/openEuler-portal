<script lang="ts" setup>
import AppSection from '~@/components/AppSection.vue';
import { OCard } from '@opensig/opendesign';
import cityData from '~@/data/user-group/city/';
import { useI18n } from 'vue-i18n';
import { useData } from 'vitepress';

const { t } = useI18n();
const { lang } = useData();
</script>

<template>
  <AppSection :title="t('usergroup.userGroup')" class="group">
    <div class="city-list">
      <OCard
        v-for="city in cityData"
        :key="city.name"
        class="city-card"
        cursor="pointer"
        hoverable
        :cover="city.img"
        :href="`/${lang}/community/user-group/detail/?name=${city.name}`"
      >
        {{ city.name }}
      </OCard>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.city-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--o-gap-6);

  .city-card {
    position: relative;

    :deep(.o-card-main) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    :deep(.o-card-main-wrap) {
      justify-content: center;
      align-items: center;
      height: 100%;
    }

    :deep(.o-card-content) {
      @include h2;
      color: rgba(var(--o-white));
    }
  }
}

@include respond-to('phone') {
  .city-list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--o-gap-3);
  }
}
@include respond-to('pad_v') {
  .city-list {
    grid-gap: var(--o-gap-4);
  }
}
@include respond-to('pad_h') {
  .city-list {
    grid-gap: var(--o-gap-5);
  }
}
@include respond-to('laptop') {
  .city-list {
    grid-gap: var(--o-gap-6);
  }
}
</style>
