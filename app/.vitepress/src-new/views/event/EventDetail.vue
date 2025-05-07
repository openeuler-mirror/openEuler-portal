<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import {
  OBreadcrumb,
  OBreadcrumbItem,
  OTag,
  OIcon,
  OFigure,
  OButton,
} from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import { getUrlParam } from '@/shared/utils';

import { EventState, MEETUP_DATA } from '~@/data/activity/list';

import banner from '~@/assets/category/event/list/banner.png';
import bannerDark from '~@/assets/category/event/list/banner-dark.png';

import IconTime from '~icons/app-new/icon-time.svg';
import IconAddress from '~icons/app-new/icon-address.svg';

import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

const { t, locale } = useLocale();
const { lePadV } = useScreen();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const activityId = ref('');

const detailObj = ref<any>();

const getActivitiesData = () => {
  activityId.value = getUrlParam('id');
  detailObj.value = MEETUP_DATA[locale.value].find(
    (item) => item.id === Number(activityId.value)
  );
};

// 活动回顾
const review = () => {
  const banner = document.querySelector('.event-detail .banner') as HTMLElement;

  window?.scrollTo({
    top: lePadV ? banner?.offsetHeight + 48 : banner?.offsetHeight + 140,
    behavior: 'smooth',
  });
};

onMounted(() => {
  getActivitiesData();
});
</script>

<template>
  <div class="event-detail">
    <ContentWrapper :vertical-padding="['32px', '72px']">
      <OBreadcrumb v-if="!lePadV">
        <OBreadcrumbItem :href="`/${locale}/interaction/event-list/latest/`">
          {{ t('eventOverview.list') }}
        </OBreadcrumbItem>
        <OBreadcrumbItem>{{ detailObj?.title }}</OBreadcrumbItem>
      </OBreadcrumb>
      <div
        class="banner"
        :style="{
          backgroundImage: `url(${isDark ? bannerDark : banner})`,
        }"
      >
        <div>
          <div class="title-box">
            <span class="title">{{ detailObj?.title }}</span>
            <OTag
              v-if="detailObj?.activity_type"
              class="type-tag"
              :class="{ 'tag-completed': detailObj?.activity_type === 1 }"
            >
              <span class="tag-text">
                {{ EventState.get(detailObj?.activity_type)?.label[locale] }}
              </span>
            </OTag>
          </div>
          <p class="synopsis">{{ detailObj?.synopsis }}</p>
          <div class="date">
            <OIcon><IconTime /></OIcon>
            {{ detailObj?.date }}
          </div>
          <div class="address">
            <OIcon><IconAddress /></OIcon>
            {{ detailObj?.address }}
          </div>
        </div>
        <OButton
          variant="solid"
          color="primary"
          :size="lePadV ? 'medium' : 'large'"
          class="review-btn"
          @click="review"
        >
          <span>{{ t('eventOverview.review') }}</span>
        </OButton>
      </div>
      <div class="content" :class="{ 'content-dark': isDark }">
        <p class="title">{{ t('eventOverview.agenda') }}</p>
        <OFigure :src="detailObj?.detail_img"></OFigure>
      </div>
    </ContentWrapper>
  </div>
</template>

<style lang="scss" scoped>
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
}
.banner {
  background-color: var(--o-color-fill2);
  padding: 32px 68px 32px 32px;
  border-radius: var(--o-radius-xs);
  margin-top: 24px;
  color: var(--o-color-info2);
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: auto;
  display: flex;
  align-items: center;
  @include tip1;
}
.title-box {
  display: flex;
  align-items: center;
}
.title {
  font-weight: 500;
  @include h2;
}
.type-tag {
  margin-left: 16px;
  --tag-padding: 3px 12px;
  --tag-bg-color: rgba(var(--o-blue-6));
  --tag-bd-color: rgba(var(--o-blue-6));
  --tag-color: var(--o-color-white);
}
.tag-completed {
  --tag-bg-color: var(--o-color-primary4);
  --tag-bd-color: var(--o-color-primary4);
}
.synopsis {
  width: 69%;
  margin-top: 16px;
}
.date {
  margin-top: 24px;
}
.address {
  margin-top: 12px;
}

.date,
.address {
  display: flex;
  align-items: center;
  .o-icon {
    margin-right: 8px;
    @include text1;
  }
}

.content {
  background-color: var(--o-color-fill2);
  padding: 32px;
  border-radius: var(--o-radius-xs);
  margin-top: 32px;
}
.o-figure {
  margin-top: 32px;
  max-width: 100%;
}
.content-dark {
  .o-figure {
    @include img-in-dark;
  }
}

@include respond-to('<=pad_v') {
  .banner {
    background-image: none !important;
    padding: 16px;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 0;
  }
  .title-box {
    display: inline-block;
  }
  .synopsis {
    width: 100%;
  }
  .date {
    margin-top: 12px;
  }
  .address {
    margin-top: 8px;
  }
  .review-btn {
    margin-top: 16px;
  }
  .content {
    background-color: transparent;
    padding: 0;
    margin-top: 16px;
  }
  .o-figure {
    margin-top: 12px;
    --figure-radius: var(--o-radius-xs);
  }
}
</style>
