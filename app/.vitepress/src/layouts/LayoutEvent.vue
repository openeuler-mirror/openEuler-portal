<script lang="ts" setup>
import { computed } from 'vue';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';

import AppRouterTemplate from '~@/components/AppRouterTemplate.vue';
import AppRouterTemplateMo from '~@/components/AppRouterTemplateMo.vue';

import banner from '~@/assets/category/event/activity-banner.jpg';

import IconEventOverview from '~icons/event/icon-event-overview.svg';
import IconEventList from '~icons/event/icon-event-list.svg';

import { useScreen } from '~@/composables/useScreen';

const { lang } = useData();
const i18n = useI18n();
const { lePadV } = useScreen();

const salonData = computed(() => i18n.value.interaction.MEETUPSLIST);

const bannerData = {
  bannerImg: banner,
  bannerText: 'CONNECT',
  bannerTitle: computed(() => {
    return salonData.value.MEETUPS;
  }),
};

const tabsData = computed(() => [
  {
    title: i18n.value.interaction.MEETUPSLIST.LATEST_OVERVIEW,
    name: 'event-list',
    href: `/${lang.value}/interaction/event-list/`,
    icon: IconEventOverview,
    subtitle: '',
  },
  {
    title: i18n.value.interaction.MEETUPSLIST.LATEST_EVENTS,
    name: 'latest',
    href: `/${lang.value}/interaction/event-list/latest/`,
    icon: IconEventList,
    subtitle: '',
  },
]);
</script>
<template>
  <div>
    <component
      :is="lePadV ? AppRouterTemplateMo : AppRouterTemplate"
      :banner-data="bannerData"
      :tabs-data="tabsData"
    ></component>
    <Content />
  </div>
</template>

<style scoped lang="scss">
:deep(.banner-level2 .wrap) {
  .banner-text {
    max-width: 60%;
    .banner-title {
      @include display2;
      color: var(--o-color-black);
    }
    .banner-subtitle {
      @include text2;
      color: var(--o-color-black);
      margin-top: var(--o-gap-2);
    }
  }

  height: 280px;

  @media screen and (max-width: 1680px) {
    height: 220px;

    .banner-text {
      .banner-title {
        font-size: 40px;
        line-height: 56px;
      }
      .banner-subtitle {
        font-size: 16px;
        line-height: 24px;
      }
      .banner-operation {
        margin-top: var(--o-gap-4);

        .o-btn {
          --btn-height: 32px;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {
    height: 180px;

    .banner-text {
      .banner-title {
        @include display2;
      }
      .banner-subtitle {
        @include text2;
      }
    }
  }
}
</style>
