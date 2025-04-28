<script lang="ts" setup>
import { computed } from 'vue';
import { OCard, OButton } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from 'vue-i18n';
import { casesZh } from '~@/data/home/case';
import { linkData } from '~@/data/user-group';

defineProps({
  options: {
    type: Array,
    default() {
      return [];
    },
  },
});

const { t } = useI18n();

const toNewsContent = (path: string) => {
  window.open(`/${path}.html`, '_blank');
};

const cardIcon = (type: string) => {
  return casesZh.find((item) => item.label === type)?.icon;
};
</script>

<template>
  <AppSection :title="t('usergroup.showcase')" class="showcase-section">
    <div class="news-list" :class="options.length < 3 ? 'center' : ''">
      <OCard
        v-for="item in options"
        :key="item.path"
        class="news-list-item"
        shadow="hover"
        @click="toNewsContent(item.path)"
        cursor="pointer"
        :icon="cardIcon(item.industry)"
        hoverable
        :title="item.title"
        :title-row="1"
        :detail="item.summary"
        :detail-row="2"
        :detail-max-row="2"
      >
      </OCard>
    </div>

    <template #footer>
      <div class="footer">
        <p>{{ t('usergroup.showcaseDesc') }}</p>
        <OButton
          animation
          variant="solid"
          color="primary"
          size="large"
          class="button"
          :href="linkData.provideCase"
        >
          {{ t('usergroup.provideCase') }}
        </OButton>
      </div>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
@mixin showline {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
:deep(.o-card-cover-img img) {
  height: 254px;
}
.news-list {
  max-width: 1416px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-gap-6);
  grid-auto-rows: 1fr;
  &.center {
    justify-content: center;
    display: flex;
  }

  .news-list-item {
    justify-self: center;
    align-self: center;
    flex: 1;
    width: 100%;
    height: 100%;
    max-width: 475px;
    cursor: pointer;
  }
}
.footer {
  display: flex;
  flex-direction: column;
  gap: var(--o-gap-4);
  align-items: center;
}

.showcase-section {
  :deep(.section-footer) {
    margin-top: var(--o-gap-7);
  }
}

:deep(.o-card .o-card-detail) {
  height: calc(var(--card-detail-row) * var(--card-content-text-height));
}

@include respond-to('phone') {
  .showcase-section {
    :deep(.section-footer) {
      margin-top: var(--o-gap-5);

      .footer {
        text-align: center;
      }
    }
  }

  .news-list {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: var(--o-gap-3);

    &.center {
      flex-direction: column;
    }
  }
}

@include respond-to('pad_v') {
  .news-list {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: var(--o-gap-3);
  }
}
</style>
