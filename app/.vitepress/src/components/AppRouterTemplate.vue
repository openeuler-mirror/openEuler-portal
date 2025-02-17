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
  btnDatas: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
const router = useRouter();
const active = computed(() => {
  return router.route.path.split('/');
});

const activeRoute = computed(() => {
  if (props.activeTab) {
    return props.activeTab;
  } else {
    return active.value[active.value.length - 2];
  }
});

const emits = defineEmits(['click-tab']);

function handleTabClick(val: any) {
  emits('click-tab', val?.props.name);
}
</script>
<template>
  <div>
    <BannerLevel2
      :background-image="bannerData.bannerImg"
      :background-text="bannerData.bannerText"
      :title="bannerData.bannerTitle.value"
      :illustration="bannerData.bannerIllustration"
    >
      <a
        v-for="btn in btnDatas"
        :href="btn.link.value"
        target="_blank"
        rel="noopener noreferrer"
      >
        <template v-if="btn?.text?.value">
          <OButton class="post-btn" type="outline" animation size="nomral">
            {{ btn.text.value }}
            <template #suffixIcon>
              <OIcon class="right-icon"><IconRight /></OIcon>
            </template>
          </OButton>
        </template>
      </a>
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
  background-color: var(--e-color-bg2);
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    justify-content: center;
  }
  :deep(.is-scrollable) {
    .el-tabs__nav-scroll {
      display: block;
    }
  }
}
.post-btn {
  margin-right: 24px;
  color: var(--e-color-white);
  border-color: var(--e-color-white);
  @media (max-width: 767px) {
    margin-top: 12px;
    margin-right: 0;
    padding: 3px 16px;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
  .right-icon {
    color: var(--e-color-brand2);
    @media (max-width: 767px) {
      font-size: var(--e-font-size-text);
    }
  }
}
</style>
