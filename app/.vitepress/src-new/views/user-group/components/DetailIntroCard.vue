<script lang="ts" setup>
import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from 'vue-i18n';
import ContentWrapper from '~@/components/ContentWrapper.vue';
import { detailData } from '~@/data/user-group';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import IconJoinGroup from '~icons/user-group/join-group.svg';

const { isPhone } = useScreen();

const { t } = useI18n();
const { lang } = useData();

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const props = defineProps({
  cityGroup: {
    type: String,
    required: true,
    default: () => '',
  },
  organizational: {
    type: String,
    required: true,
    default: () => '',
  },
});

const breadCrumbs = computed(() => {
  return [
    {
      title: t('usergroup.openEulerGroup'),
      to: `/${lang.value}/community/user-group/`,
    },
    {
      title: props.cityGroup,
      to: '',
    },
  ];
});

const bannerImage = computed(() => {
  return isPhone.value
    ? isDark.value
      ? detailData.banner_mb_dark
      : detailData.banner_mb
    : isDark.value
    ? detailData.banner_dark
    : detailData.banner;
});
</script>
<template>
  <ContentWrapper class="group-detail">
    <OBreadcrumb>
      <OBreadcrumbItem
        v-for="breadCrumb in breadCrumbs"
        :title="breadCrumb.title"
      >
        <a :href="breadCrumb.to">
          {{ breadCrumb.title }}
        </a>
      </OBreadcrumbItem>
    </OBreadcrumb>

    <div
      class="detail-banner"
      :style="{
        backgroundImage: `url(${bannerImage})`,
      }"
    >
      <div>
        <p class="title">{{ props.cityGroup }}</p>
        <div v-if="organizational">
          <span class="org-title">{{ t('usergroup.organization') }}</span>
          <span class="org-name">{{ organizational }}</span>
        </div>
      </div>
      <div class="tip-content">
        <OIcon class="icon"><IconJoinGroup /></OIcon>
        <a class="tip" href="#group-detail-guide">{{
          t('usergroup.joinGroup')
        }}</a>
      </div>
    </div>
  </ContentWrapper>
</template>

<style lang="scss" scoped>
.group-detail {
  margin-top: var(--o-gap-6);

  :deep(.o-breadcrumb-item:last-child .o-breadcrumb-item-label) {
    color: var(--o-color-link1);

    @include hover {
      color: var(--o-color-link2);
    }
  }
}

.detail-banner {
  margin-top: var(--o-gap-5);
  padding: 28px 38px 33px 38px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: var(--o-radius-xs);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    @include h2;
    color: var(--o-color-info1);
    font-weight: 500;
    margin-bottom: var(--o-gap-4);
  }

  .org-title {
    @include text1;
    color: var(--o-color-info3);
    margin-right: var(--o-gap-6);
  }

  .org-name {
    @include text1;
    color: var(--o-color-info1);
  }

  .tip-content {
    color: var(--o-color-info2);
    display: flex;
    align-items: center;
    margin-top: var(--o-gap-5);
    cursor: pointer;
    @include hover {
      color: var(--o-color-link2);
    }

    .icon {
      font-size: 18px;
    }

    .tip {
      @include text1;
      margin-left: var(--o-gap-2);
      color: var(--o-color-info2);
      @include hover {
        color: var(--o-color-link2);
      }
    }
  }
}

@include respond-to('phone') {
  .detail-banner {
    padding: var(--o-gap-5);
  }
}
</style>
