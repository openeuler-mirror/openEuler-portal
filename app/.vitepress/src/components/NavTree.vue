<script setup lang="ts">
import { ref, toRefs } from 'vue';

import IconChevronDown from '~icons/app/icon-chevron-down.svg';
const props = defineProps({
  data: {
    type: Object,
    default() {
      return [];
    },
  },
  defaultProps: {
    type: Object,
    default() {
      return {};
    },
  },
  nodeKey: {
    type: String,
    default: '',
  },
  currentNodeKey: { type: String || Number, default: '' },
});
const emits = defineEmits(['node-click']);
const { data, defaultProps } = toRefs(props);

// 导航栏点击事件
function handleNodeClick(obj: any) {
  emits('node-click', obj);
}
const tree = ref(null);
defineExpose({
  tree,
});
</script>
<template>
  <OTree
    ref="tree"
    :node-key="nodeKey"
    :data="data"
    :props="defaultProps"
    accordion
    :highlight-current="true"
    :icon="IconChevronDown"
    :current-node-key="currentNodeKey"
    @node-click="handleNodeClick"
  >
  </OTree>
</template>
<style lang="scss" scoped>
.el-tree {
  width: 360px;
  overflow: hidden;
  background-color: var(--o-color-bg2);
  @media screen and (max-width: 1100px) {
    width: 100%;
  }
  :deep(.el-tree-node__content:hover) {
    background-color: var(--o-color-bg4);
  }
  &.el-tree--highlight-current {
    :deep(.el-tree-node.is-current > .el-tree-node__content) {
      background-color: var(--o-color-bg4);
      @media screen and (max-width: 1100px) {
        background-color: transparent;
      }
    }
  }
}

:deep(.el-tree-node) {
  &:focus > .el-tree-node__content {
    background-color: var(--o-color-bg4) !important;
  }
}
:deep(.el-tree-node__content > .el-tree-node__expand-icon) {
  order: 2;
  padding: 12px;
  font-size: var(--o-font-size-h5);
  color: var(--o-color-text1);
  @media screen and (max-width: 1100px) {
    font-size: var(--o-font-size-h8);
  }
}
:deep(.el-tree-node__expand-icon.expanded) {
  transform: rotate(180deg);
}
:deep(
    .el-tree-node:nth-of-type(1)
      > .el-tree-node__content
      > .el-tree-node__expand-icon
  ) {
  display: none;
}

.el-tree {
  & > :deep(.el-tree-node) {
    & > .el-tree-node__children {
      padding: 0;
      .is-leaf {
        display: none;
      }
    }
  }
}
:deep(.el-tree-node__children) {
  padding-left: 8px;
  background-color: var(--o-color-bg1);
}
:deep(.el-tree-node__children .is-current .el-tree-node__content) {
  background-color: transparent;
  position: relative;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    left: 0;
    width: 2px;
    height: 60px;
    background-color: var(--o-color-brand1);
    @media screen and (max-width: 1100px) {
      display: none;
    }
  }
}

:deep(.el-tree-node__label) {
  font-size: 16px;
  line-height: 16px;
  color: var(--o-color-text1);
  @media screen and (max-width: 1100px) {
    font-size: 14px;
  }
}
:deep(.el-tree-node__children .el-tree-node__label) {
  font-size: 14px;
  line-height: 20px;
  white-space: pre-wrap;
}
:deep(.el-tree-node .el-tree-node__content) {
  padding: 28px var(--o-spacing-h4) !important;
  justify-content: space-between;
  @media screen and (max-width: 1100px) {
    padding: 19px var(--o-spacing-h5) !important;
  }
}

@media screen and (max-width: 1100px) {
  :deep(.el-tree-node__expand-icon.expanded) {
    transform: rotate(180deg);
  }
  :deep(
      .el-tree-node:nth-of-type(1)
        > .el-tree-node__content
        > .el-tree-node__expand-icon
    ) {
    display: none;
  }
  :deep(.el-tree-node__children .is-current .el-tree-node__label) {
    color: var(--o-color-brand1);
  }
}
</style>
