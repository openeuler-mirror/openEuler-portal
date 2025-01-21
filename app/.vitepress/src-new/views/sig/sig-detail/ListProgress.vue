<script setup lang="ts">
import { toRefs, ref, watch, nextTick } from 'vue';

import { OProgress } from '@opensig/opendesign';
import WordAvatar from '~@/components/WordAvatar.vue';
import { useLocale } from '~@/composables/useLocale';

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
      return 'member';
    },
  },
  giteeName: {
    type: String,
    default: '',
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
    default: '600px',
  },
});
const { componentName, memberList, usertype } = toRefs(props);

const { locale } = useLocale();
const progressRef = ref();
const progressColor = () => {
  if (componentName.value === 'member' && usertype.value === 'contributor') {
    return 'color-contributor';
  } else if (
    componentName.value === 'member' &&
    usertype.value === 'maintainers'
  ) {
    return 'color-maintainer';
  } else if (
    componentName.value === 'member' &&
    usertype.value === 'committers'
  ) {
    return 'color-committer';
  } else {
    return 'color-maintainer';
  }
};

// 动态计算参数赋值
const progressFormat = (item: number) => {
  return memberList.value ? (100 / memberList.value) * item : 0;
};

// 跳转个人详情
const goToUser = (data: string) => {
  const url = 'https://datastat.openeuler.org';
  return `${url}/${locale.value}/user/${data}`;
};

watch(
  () => props.item,
  () => {
    nextTick(() => {
      progressRef.value?.$el
        .querySelector('.o-progress-line-bar')
        ?.setAttribute('contributor', props.item.toString());
    });
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <OProgress
    color="primary"
    ref="progressRef"
    class=""
    :percentage="progressFormat(item)"
    :class="progressColor()"
    :style="{ width }"
    label-inside
    :stroke-width="32"
  >
    <template #default="{ percentage }">
      <WordAvatar :name="giteeName" size="small" />
      <a
        class="gitee-name"
        :title="giteeName"
        :href="goToUser(giteeName)"
        >{{ giteeName }}</a
      >
    </template>
  </OProgress>
</template>

<style lang="scss" scoped>
.o-progress {
  :deep(.o-progress-line-wrap) {
    .o-progress-line-track {
      background-color: transparent;
      overflow: visible;
      .o-progress-line-bar {
        display: flex;
        align-items: center;
        position: relative;
        min-width: 130px !important;
        &::after {
          content: attr(contributor);
          position: absolute;
          right: -12px;
          top: 50%;
          transform: translate(100%, -50%);
          color: var(--o-color-info1);
          @include tip1;
        }
      }
      .o-progress-line-inner-label {
        display: flex;
        width: 100%;
        align-items: center;
        color: var(--o-color-primary1);
        .word-avatar {
          flex-shrink: 0;
        }
        .gitee-name {
          text-align: left;
          margin-left: 8px;
          @include text-truncate(1);
          word-break: break-all;
          min-width: 80px;
        }
      }
    }
  }
}
.color-contributor {
  :deep(.o-progress-line-bar) {
    background-color: #ebf1fa !important;
  }
}
.color-committer {
  :deep(.o-progress-line-bar) {
    background-color: #e8f7fc !important;
  }
}
.color-maintainer {
  :deep(.o-progress-line-bar) {
    background-color: #fdf7e8 !important;
    // background-color: var(--o-color-primary1);
  }
}
</style>
