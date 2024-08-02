<script setup lang="ts">
import { toRefs } from 'vue';
const props = defineProps({
  item: {
    type: Number,
    default() {
      return 0;
    },
  },
  componentName: {
    type: String,
    default() {
      return 'personal';
    },
  },
  memberList: {
    type: Number,
    default() {
      return 0;
    },
  },
  usertype: {
    type: String,
    default() {
      return '';
    },
  },
  width: {
    type: String,
    default: '240px',
  },
});
const { componentName, memberList, usertype } = toRefs(props);
const progressColor = () => {
  if (componentName.value === 'member' && usertype.value === 'contributor') {
    return 'bgColor-contributor';
  } else if (
    componentName.value === 'member' &&
    usertype.value === 'maintainers'
  ) {
    return 'bgColor-maintainer';
  } else if (
    componentName.value === 'member' &&
    usertype.value === 'committers'
  ) {
    return 'bgColor-committer';
  } else {
    return 'bgColor-maintainer';
  }
};

// 动态计算参数赋值
const progressFormat = (item: number) => {
  return memberList.value ? (100 / memberList.value) * item : 0;
};
</script>

<template>
  <el-progress
    :style="{ width }"
    :show-text="false"
    :class="progressColor()"
    :stroke-width="8"
    :percentage="progressFormat(props.item)"
  />
</template>

<style lang="scss" scoped>
.el-progress {
  margin-left: 10px;
  :deep(.el-progress-bar__outer) {
    background: none;
  }
}
.bgColor-maintainer {
  background-color: inherit !important;
  .el-progress-bar__inner {
    background-color: var(--o-color-brand1);
  }
}
.bgColor-committer {
  background-color: inherit !important;
  :deep(.el-progress-bar__inner) {
    background-color: var(--o-color-yellow5);
  }
}
.bgColor-contributor {
  background-color: inherit !important;
  :deep(.el-progress-bar__inner) {
    background-color: #4aaead;
  }
}
</style>
