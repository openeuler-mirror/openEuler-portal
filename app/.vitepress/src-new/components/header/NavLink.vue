<script setup lang="ts">
import { useData, useRouter } from 'vitepress';

import { useDownload } from '~@/stores/download';
import { getUrlParams } from '~@/utils/common';

const { lang } = useData();
const props = defineProps({
  url: {
    type: String,
    required: true,
    default() {
      return '';
    },
  },
});

const downloadStore = useDownload();

const isExternal = () => {
  return props.url.startsWith('https');
};

const emits = defineEmits(['link-click']);
const router = useRouter();

const linkClick = () => {
  emits('link-click');
  // 解决下载tag 高亮问题
  if (props.url.startsWith('/download/')) {
    getDownloadQuery(props.url);
  }
  router.go(`/${lang.value}${props.url}`);
};

const getDownloadQuery = (url: string) => {
  const scenario = getUrlParams(`${window.location.origin}${url}`).get(
    'scenario'
  );
  if (scenario) {
    downloadStore.setScenario(scenario);
    downloadStore.setVersion(url.split('#').at(-1) || '');
  }
};
</script>

<template>
  <a
    v-if="isExternal()"
    :href="url"
    target="_blank"
    class="link"
    rel="noopener noreferrer"
  >
    <slot></slot>
  </a>
  <div v-else @click="linkClick" class="link" :class="{ 'without-url': !url }">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.link {
  color: var(--o-color-info1);
  display: flex;
  align-items: center;

  @include hover {
    color: var(--o-color-primary1);
  }
}

.without-url {
  pointer-events: none;
  color: var(--o-color-info1) !important;
}
</style>
