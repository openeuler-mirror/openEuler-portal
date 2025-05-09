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
const { lePadV, isPadVToLaptop } = useScreen();

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

const verticalPadding = computed(() => {
  if (isPadVToLaptop.value) {
    return ['16px', '40px'];
  } else if (lePadV.value) {
    return ['16px', '32px'];
  } else {
    return ['32px', '72px'];
  }
});

onMounted(() => {
  getActivitiesData();
});
</script>

<template>
  <div class="event-detail">
    <ContentWrapper :vertical-padding="verticalPadding">
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
          :href="detailObj?.new_url"
          target="_blank"
          class="review-btn"
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
  justify-content: space-between;
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
  --tag-padding: 1px 8px;
  --tag-bg-color: rgba(var(--o-blue-6));
  --tag-bd-color: rgba(var(--o-blue-6));
  --tag-color: var(--o-color-white);
}
.tag-completed {
  --tag-bg-color: rgba(var(--o-kleinblue-3), 0.4);
  --tag-bd-color: transparent;
}
.synopsis {
  width: 932px;
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

.review-btn {
  --btn-min-width: 112px;
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

@include respond-to('laptop') {
  .synopsis {
    width: 860px;
  }
}

@include respond-to('pad_h') {
  .banner {
    padding: 24px;
  }
  .synopsis {
    width: 580px;
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
  .title {
    @include h1;
  }
  .synopsis {
    width: 100%;
    @include tip2;
  }
  .date {
    margin-top: 12px;
    @include tip2;
  }
  .address {
    margin-top: 8px;
    align-items: flex-start;
    @include tip2;
  }
  .o-icon {
    font-size: 16px !important;
    margin-top: 1px;
  }
  .review-btn {
    margin-top: 16px;
    --btn-min-width: 80px;
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
@include respond-to('phone') {
  .title {
    @include display3;
  }
  .synopsis {
    width: 100%;
    @include text1;
  }
  .date {
    @include text1;
  }
  .address {
    @include text1;
  }
}
</style>
