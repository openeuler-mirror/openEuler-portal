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
    class="link link-item"
    :class="{'without-url': !url}">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.link {
  color: var(--o-color-info1);
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color:var(--o-color-primary1);
  }
}

.link-item {
  display: inline-block;
}

.without-url {
  pointer-events: none;
}
</style>