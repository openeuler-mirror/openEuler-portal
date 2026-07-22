<script lang="ts" setup>
import { computed } from 'vue';
import { OBreadcrumb, OBreadcrumbItem, ODivider } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import { hardWareInfo } from '~@/data/compatibility';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
</script>

<template>
  <ContentWrapper :vertical-padding="['32px', '72px']">
    <OBreadcrumb v-if="!lePadV">
      <OBreadcrumbItem :href="`/${locale}/compatibility`">{{
        t('compatibility.title')
      }}</OBreadcrumbItem>
      <OBreadcrumbItem>{{ t('compatibility.desc2') }}</OBreadcrumbItem>
    </OBreadcrumb>
    <div class="info-content">
      <div v-for="item in hardWareInfo[locale]" :key="item.title" class="item-content">
        <p class="title">{{ item.title }}</p>
        <template v-if="item.desc">
          <p v-for="text in item.desc" v-dompurify-html="text" class="text"></p>
        </template>
        <template v-if="item.list">
          <div v-for="(val, v) in item.list" :key="v" class="item-list">
            <div class="num">{{ `0${v + 1}` }}</div>
            <ODivider direction="v" />
            <div class="right-content">
              <p class="subtitle">{{ val.title }}</p>
              <p v-if="val.desc" v-dompurify-html="val.desc" class="item-desc"></p>
              <div v-if="val.tips">
                <p class="tips">{{ val.tips }}</p>
                <div class="table" :class="{'table-dark': isDark}">
                  <div class="table-head">
                    <span v-for="col in val.columns" class="table-col">{{ col }}</span>
                  </div>
                  <div v-for="row in val.data" class="table-row">
                    <span class="table-col">{{ row.content }}</span>
                    <span v-dompurify-html="row.info" class="table-col"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </ContentWrapper>
</template>

<style scoped lang="scss">
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
  --breadcrumb-seperator-size: 16px;
}
.info-content {
  background-color: var(--o-color-fill2);
  padding: 40px;
  border-radius: var(--o-radius-xs);
  margin-top: 32px;
}
.item-content + .item-content {
  margin-top: 40px;
}
.title {
  color: var(--o-color-info1);
  margin-bottom: 32px;
  @include h2;
}
.text {
  color: var(--o-color-info3);
  @include text1;
}
.text + .text {
  margin-top: 8px;
}

.item-list {
  padding: 32px;
  display: flex;
}
.o-divider {
  height: auto;
  --o-divider-label-gap: 0 32px;
}
.num {
  color: var(--o-color-primary1);
  font-weight: 500;
  display: flex;
  align-items: center;
  @include display2;
}
.subtitle {
  color: var(--o-color-info1);
  @include text2;
}
.item-desc {
  color: var(--o-color-info3);
  margin-top: 12px;
  @include tip1;
}
.tips {
  color: var(--o-color-info3);
  margin-top: 8px;
  @include tip1;
}
.table-head {
  display: flex;
  background-color: #e5e8f0;
  margin-top: 4px;
  .table-col {
    color: var(--o-color-info1);
  }
}
.table-col {
  flex: 1;
  min-width: 0;
  padding: 16px 40px;
  color: var(--o-color-info3);
  @include text1;
}
.table-row {
  display: flex;
  border-bottom: 1px solid #e5e5e5;
}

.table-dark {
  .table-head {
    background-color: #2e2e2e;
  }
  .table-row {
    border-bottom: 1px solid #2d2d2d;
  }
}

:deep(.underline-link) {
  --link-color-hover: var(--o-color-primary1);
  --link-underline-x: 100%;

  color: var(--o-color-primary1);
  background: linear-gradient(0deg, var(--link-color-hover), var(--link-color-hover)) no-repeat var(--link-underline-x) bottom;
  background-size: 0 1px;
  transition: background-size var(--o-easing-standard) var(--o-duration-m2);

  @include hover {
    background-size: var(--link-underline-x) 1px;
    background-position-x: left;
  }
}

@include respond('<=laptop') {
  .info-content {
    padding: 32px;
  }
  .title {
    margin-bottom: 24px;
  }
  .item-content + .item-content {
    margin-top: 32px;
  }
  .item-list {
    padding: 24px;
  }
  .o-divider {
    --o-divider-label-gap: 0 24px;
  }
  .table-col {
    padding: 16px 32px;
  }
}
@include respond('<=pad_v') {
  .info-content {
    padding: 24px;
    margin-top: 0;
  }
  .item-content + .item-content {
    margin-top: 24px;
  }
  .item-list {
    padding: 16px 0;
  }
  .table-col {
    padding: 16px 24px;
  }
}
@include respond('phone') {
  .info-content {
    padding: 16px;
  }
  .title {
    margin-bottom: 16px;
  }
  .item-content + .item-content {
    margin-top: 16px;
  }
  .item-list {
    padding: 16px 0;
  }
  .o-divider {
    --o-divider-label-gap: 0 16px;
  }
  .item-desc {
    margin-top: 8px;
    @include text1;
  }
  .table-col {
    padding: 12px;
  }
}
</style>
