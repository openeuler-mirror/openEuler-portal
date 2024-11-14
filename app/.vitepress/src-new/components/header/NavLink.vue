<script setup lang="ts">
import { useData, useRouter } from 'vitepress';

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

const isExternal = () => {
  return props.url.startsWith('https');
}

const emits = defineEmits(['link-click']);
const router = useRouter();

const linkClick = () => {
  emits('link-click');
  // 解决下载Tab高亮问题
  if (props.url.startsWith('/download/')) {
    window.open(`/${lang.value}${props.url}`, '_self');
    return;
  }
  router.go(`/${lang.value}${props.url}`);
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
  <div
    v-else
    @click="linkClick"
    class="link"
    :class="{'without-url': !url}">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.link {
  color: var(--o-color-info1);
  display: flex;
  align-items: center;

  @include hover {
    color:var(--o-color-primary1);
  }
}

.without-url {
  pointer-events: none;
  color: var(--o-color-info1) !important;
}
</style>