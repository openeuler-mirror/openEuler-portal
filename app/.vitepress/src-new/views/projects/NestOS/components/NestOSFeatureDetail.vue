<script lang="ts" setup>
import { computed } from 'vue';
import { OBreadcrumb, OBreadcrumbItem, OLink } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import nestosContent from '#content/nestos';

const { t } = useLocale();
const { lePadV, isPadVToLaptop } = useScreen();

const props = defineProps<{
  featureSlug: string;
}>();

const featureMap = computed(() => nestosContent.zh.feature_map);
const feature = computed(() => featureMap.value[props.featureSlug]);
const featureTitle = computed(() => (feature.value ? t(feature.value.title_key) : ''));

const verticalPadding = computed(() => {
  if (isPadVToLaptop.value) {
    return ['16px', '40px'];
  } else if (lePadV.value) {
    return ['16px', '32px'];
  } else {
    return ['32px', '72px'];
  }
});
</script>

<template>
  <div v-if="feature">
    <ContentWrapper :vertical-padding="verticalPadding">
      <!-- 面包屑 -->
      <OBreadcrumb>
        <OBreadcrumbItem href="/zh/other/projects/nestos/">NestOS</OBreadcrumbItem>
        <OBreadcrumbItem>{{ featureTitle }}</OBreadcrumbItem>
      </OBreadcrumb>

      <!-- 内容区 -->
      <div class="detail-body">
        <!-- 摘要描述 -->
        <p class="detail-summary">{{ featureTitle }}</p>

        <!-- 章节内容 -->
        <div class="detail-sections">
          <template v-for="(section, idx) in feature.sections" :key="idx">
            <!-- 标题 -->
            <p v-if="section.type === 'heading'" class="section-heading">
              {{ section.content }}
            </p>

            <!-- 普通文本 -->
            <p v-else-if="section.type === 'text'" class="section-text">
              {{ section.content }}
            </p>

            <!-- 列表 -->
            <ul v-else-if="section.type === 'list'" class="section-list">
              <li v-for="(item, i) in section.items" :key="i" class="section-list-item">
                {{ item }}
              </li>
            </ul>

            <!-- 代码块 -->
            <pre v-else-if="section.type === 'code'" class="section-code"><code>{{ section.content }}</code></pre>

            <!-- 图片 -->
            <div v-else-if="section.type === 'image'" class="section-image">
              <img :src="section.src" :alt="section.content" />
            </div>

            <!-- 链接 -->
            <p v-else-if="section.type === 'link'" class="section-link">
              <OLink
                :href="section.href"
                target="_blank" rel="noopener noreferrer"
                color="primary"
                hover-underline
                class="detail-link"
              >{{ section.content }}</OLink>
            </p>
          </template>
        </div>
      </div>
    </ContentWrapper>
  </div>
</template>

<style scoped lang="scss">
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
}

.detail-body {
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: 24px 40px;
  margin-top: 24px;
}

.detail-summary {
  color: var(--o-color-info2);
  line-height: 1.8;
  padding-bottom: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--o-color-control4);
  @include text2;
}

.detail-sections {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-heading {
  font-weight: 500;
  color: var(--o-color-info1);
  margin-top: 8px;
  @include text2;
}

.section-text {
  color: var(--o-color-info2);
  line-height: 1.8;
  padding-left: 16px;
  @include text2;
}

.section-list {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-list-item {
  color: var(--o-color-info2);
  line-height: 1.8;
  list-style: none;
  @include text2;
}

.section-code {
  background-color: var(--o-color-fill4);
  color: var(--o-color-info1);
  border-radius: var(--o-radius-xs);
  padding: 16px 20px;
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 4px 0;
  border: 1px solid var(--o-color-control4);
  @include text1;
}

.section-image {
  margin: 8px 0;
  border-radius: var(--o-radius-xs);
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--o-radius-xs);
    border: 1px solid var(--o-color-control4);
  }
}

.section-link {
  padding-left: 16px;
}

.detail-link {
  word-break: break-all;
}

@include respond('laptop') {
  .detail-body {
    padding: 32px 36px;
  }
}

@include respond('pad_h') {
  .detail-body {
    padding: 24px 28px;
  }
}

@include respond('<=pad_v') {
  .breadcrumb {
    margin-bottom: 24px;
  }

  .detail-body {
    padding: 20px 16px;
  }

  .detail-summary {
    @include text1;
  }

  .section-heading,
  .section-text,
  .section-list-item {
    @include text1;
  }

  .section-list {
    padding-left: 20px;
  }
}
</style>
