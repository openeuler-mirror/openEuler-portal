<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vitepress';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import IconRight from '~icons/app/icon-arrow-right.svg';

const props = defineProps({
  bannerData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  tabsData: {
    type: Object,
    default: () => {
      return {};
    },
  },
  activeTab: {
    type: String,
    default: '',
  },
  buttonText: {
    type: String,
    default: '',
  },
  buttonLink: {
    type: String,
    default: '',
  },
});
const router = useRouter();

const active = router.route.path.split('/');

const activeRoute = computed(() => {
  if (props.activeTab) {
    return props.activeTab;
  } else {
    return active[active.length - 2];
  }
});

const emits = defineEmits(['click-tab']);

function handleTabClick(val: any) {
  emits('click-tab', val?.props.name);
}

function goDetail(link: string) {
  router.go(link);
}
</script>
<template>
  <div>
    <BannerLevel2
      :background-image="bannerData.bannerImg"
      :background-text="bannerData.bannerText"
      :title="bannerData.bannerTitle"
      :illustration="bannerData.bannerIllustration"
    >
      <OButton
        v-if="buttonText"
        class="post-btn"
        type="outline"
        animation
        size="nomral"
        @click="goDetail(buttonLink)"
      >
        {{ buttonText }}
        <template #suffixIcon>
          <OIcon class="right-icon"><IconRight /></OIcon>
        </template>
      </OButton>
    </BannerLevel2>
    <div class="router-tabs">
      <OTabs v-model="activeRoute" @tab-click="handleTabClick">
        <OTabPane
          v-for="item in tabsData.tabPane"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></OTabPane>
      </OTabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.router-tabs {
  margin: 0 auto;
  background-color: var(--o-color-bg2);
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
  }
}
.post-btn {
  color: var(--o-color-white);
  border-color: var(--o-color-white);
  @media (max-width: 767px) {
    padding: 3px 16px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  .right-icon {
    color: var(--o-color-brand2);
    @media (max-width: 767px) {
      font-size: var(--o-font-size-text);
    }
  }
}
</style>
