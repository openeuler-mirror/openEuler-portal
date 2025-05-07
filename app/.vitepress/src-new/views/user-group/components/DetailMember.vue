<script lang="ts" setup>
import { ref, computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';
import { OPopover, OIcon, ODialog } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import { questionData } from '~@/data/user-group';
import type { PersonT } from '~@/@types/type-user-group';
import AppSection from '~@/components/AppSection.vue';

import IconHonor from '~icons/user-group/honor.svg';
import IconMail from '~icons/user-group/mail.svg';
import IconHook from '~icons/user-group/hook.svg';
import empty_light from '~@/assets/category/user-group/common/empty-light.png';
import empty_dark from '~@/assets/category/user-group/common/empty-dark.png';

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const { lePadV } = useScreen();
const { t } = useI18n();

const props = defineProps({
  ambassadorList: {
    type: Array as PropType<Array<PersonT>>,
    required: true,
    default: () => [],
  },
  organizerList: {
    type: Array as PropType<Array<PersonT>>,
    required: true,
    default: () => [],
  },
});

const roleMapping = computed(() => [
  {
    id: 'organizer',
    title: t('usergroup.organizer'),
    data: props.organizerList,
  },
  {
    id: 'ambassador',
    title: t('usergroup.ambassador'),
    data: props.ambassadorList,
  },
]);

const dialogVisible = ref(false);
</script>

<template>
  <AppSection :title="t('usergroup.honoraryMember')" class="detail-member">
    <div v-if="ambassadorList.length || organizerList.length">
      <div v-for="role in roleMapping" :key="role.id">
        <div v-if="role.data?.length" :class="role.id">
          <div class="title">
            <div class="color-block"></div>
            <div class="title-bg">{{ role.title }}</div>
          </div>
          <div class="member-content">
            <div
              v-for="item in role.data"
              :key="item.name"
              class="member-item"
              :style="{
                backgroundImage: `url(${
                  isDark ? item.avatarDark : item.avatar
                })`,
              }"
            >
              <div class="card-title">
                <span class="name">{{ item.name }}</span>
                <template v-if="item.contribution">
                  <OPopover position="top">
                    <template #target>
                      <OIcon class="icon-honor"><IconHonor /></OIcon>
                    </template>
                    <div>
                      <p class="popover-title">
                        {{ t('usergroup.contribution') }}
                      </p>
                      <p class="popover-desc">{{ item.contribution }}</p>
                    </div>
                  </OPopover>
                </template>
              </div>

              <p class="position">{{ item.position }}</p>
              <div class="tag-list">
                <div
                  v-for="(tag, index) in item.technology"
                  :key="'tag' + index"
                  class="tag"
                >
                  {{ tag }}
                </div>
              </div>

              <div class="card-end">
                <p v-if="item.homePage" class="home-page">
                  <a
                    :href="item.homePage"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover-underline"
                    >{{ t('usergroup.personalPage') }}</a
                  >
                </p>
                <p v-if="item.email">
                  <a
                    :href="`mailto:${item.email}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <OIcon class="icon"><IconMail /></OIcon>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">
      <img :src="isDark ? empty_dark : empty_light" class="image" />
      <p class="empty-title">{{ t('usergroup.waiting') }}</p>
      <p class="empty-desc">
        {{ t('usergroup.waitDesc')
        }}<span
          @click="dialogVisible = true"
          class="empty-button hover-underline"
          >{{ t('usergroup.viewNow') }}</span
        >
      </p>

      <ODialog
        v-model:visible="dialogVisible"
        :phone-half-full="lePadV"
        class="member-dialog"
        :size="lePadV ? 'medium' : 'large'"
      >
        <template #header>
          <span class="member-dialog-title">{{ t('usergroup.waitDesc') }}</span>
        </template>
        <div class="member-dialog-body">
          <p class="dialog-desc">
            {{ questionData.desc1 }}
            <a :href="`mailto:${questionData.mail}`" class="hover-underline"
              >user@openeuler.sh</a
            >
            {{ questionData.desc2 }}。
          </p>
          <p class="dialog-title">{{ questionData.subtitle1 }}</p>
          <p class="dialog-desc">{{ questionData.intro1 }}</p>
          <p class="dialog-title">{{ questionData.subtitle2 }}</p>
          <p class="dialog-desc">{{ questionData.intro2 }}</p>
          <div
            v-for="(tip, index) in questionData.tip"
            :key="index"
            class="tip-item"
            :class="{ 'first-item': index === 0 }"
          >
            <OIcon class="icon"><IconHook /></OIcon>
            <p class="tip">{{ tip }}</p>
          </div>
        </div>
      </ODialog>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.detail-member {
  :deep(.section-wrapper) {
    margin-top: var(--o-gap-7);
  }
}

.title {
  display: flex;
  height: 56px;
  position: relative;
  gap: var(--o-gap-2);

  .color-block {
    width: 8px;
    border-radius: var(--o-radius-xs);
  }

  .title-bg {
    @include h2;
    flex: 1;
    border-radius: var(--o-radius-xs);
    padding: var(--o-gap-3) var(--o-gap-5);
    font-weight: 500;
    color: var(--o-color-info1);
    display: flex;
    align-items: center;
    isolation: isolate;
  }
}

.member-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--o-gap-6);
  margin-top: var(--o-gap-5);

  .member-item {
    box-shadow: var(--o-shadow-1);
    min-height: 184px;
    position: relative;
    padding: var(--o-gap-4) var(--o-gap-5) var(--o-gap-5);
    border-radius: var(--o-radius-xs);
    background: var(--o-color-fill2) no-repeat no-repeat right bottom;
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat;
    background-position: bottom right;

    .card-title {
      display: flex;
      gap: var(--o-gap-2);
      align-items: center;
      margin-bottom: var(--o-gap1);

      .name {
        @include text2;
        color: var(--o-color-info1);
        font-weight: 500;
      }

      .icon-honor {
        font-size: var(--o-icon_size-m);

        @include hover {
          color: var(--o-color-link2);
        }
      }
    }

    .position {
      @include tip1;
      color: var(--o-color-info3);
      margin-bottom: var(--o-gap-2);
    }

    .tag-list {
      display: flex;
      gap: var(--o-gap-2);
      max-width: 210px;
      flex-wrap: wrap;

      .tag {
        @include tip2;
        border-radius: var(--o-radius-xs);
        padding: 3px var(--o-gap-3);
        background-color: var(--o-color-control2-light);
      }
    }

    .card-end {
      margin-top: auto;

      .home-page {
        @include tip2;
      }
    }

    .icon {
      font-size: var(--o-icon_size-m);
    }
  }
}
.popover-title {
  @include text1;
  color: var(--o-color-info1);
  margin-bottom: var(--o-gap-1);
  font-weight: 500;
}
.popover-desc {
  @include tip1;
  color: var(--o-color-info2);
  max-height: 72px;
  max-width: 310px;
  overflow-y: auto;
}
.organizer {
  .color-block {
    background-color: #f0bc00;
  }

  .title-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: var(--o-gap-4);
    width: calc(100% - var(--o-gap-4));
    height: 100%;
    background: linear-gradient(
      270deg,
      rgba(240, 188, 0, 0.7),
      rgba(240, 188, 0) 104.702%
    );
    opacity: 0.2;
    z-index: -1;
  }

  .member-item {
    background-size: 80% auto;
  }
}

.ambassador {
  margin-top: var(--o-gap-6);
  .color-block {
    background-color: #007af0;
  }

  .title-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: var(--o-gap-4);
    width: calc(100% - var(--o-gap-4));
    height: 100%;
    background: linear-gradient(
      270deg,
      rgba(98, 178, 246, 0.7),
      rgba(98, 178, 246) 104.702%
    );
    opacity: 0.2;
    z-index: -1;
  }

  .member-item {
    background-size: 60% auto;
  }
}

[data-o-theme='dark'] {
  .title .title-bg::before {
    background: rgb(var(--o-mixedgray-4));
    opacity: 1;
  }
}

@include respond-to('phone') {
  .member-content {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 450px) {
    .organizer .member-item {
      background-size: 60% auto;
    }
    .ambassador .member-item {
      background-size: 50% auto;
    }
  }
}

@include respond-to('pad_v') {
  .member-content {
    grid-template-columns: repeat(2, 1fr);
  }
  .organizer .member-item {
    background-size: 70% auto;
  }
  .ambassador .member-item {
    background-size: 60% auto;
  }
}

@include respond-to('pad_v-laptop') {
  .member-content {
    grid-template-columns: repeat(3, 1fr);
  }
  .organizer .member-item {
    background-size: 60% auto;
  }
  .ambassador .member-item {
    background-size: 50% auto;
  }
}
</style>
<style lang="scss" scoped>
.empty {
  max-height: 402px;
  border-radius: var(--o-radius-xs);
  background-color: var(--o-color-fill2);
  padding-top: var(--o-gap-6);
  padding-bottom: var(--o-gap-8);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .image {
    height: 248px;
    width: 248px;
    margin-bottom: var(--o-gap-3);
  }

  .empty-title {
    @include h3;
    color: var(--o-color-info1);
    margin-bottom: var(--o-gap-2);
  }

  .empty-desc {
    @include text1;
    color: var(--o-color-info1);
  }

  .empty-button {
    color: var(--o-color-link1);
    cursor: pointer;

    @include hover {
      color: var(--o-color-link2);
    }
  }
}

.member-dialog-body {
  .dialog-desc {
    @include text1;
    color: var(--o-color-info2);
  }

  .dialog-title {
    @include text2;
    margin-bottom: var(--o-gap-4);
    margin-top: var(--o-gap-5);
    color: var(--o-color-info2);
    font-weight: 500;
  }

  .tip-item {
    display: flex;
    gap: var(--o-gap-3);
    align-items: flex-start;

    &.first-item {
      padding-top: var(--o-gap-4);
    }

    &:not(:last-child) {
      margin-bottom: var(--o-gap-3);
    }

    .icon {
      font-size: var(--o-icon_size-m);
      color: var(--o-color-primary1);
    }

    .tip {
      @include text1;
      color: var(--o-color-info1);
    }
  }

  .hover-underline {
    --link-color-hover: var(--o-color-link2);
    --link-underline-x: 100%;
    background: linear-gradient(
        0deg,
        var(--link-color-hover),
        var(--link-color-hover)
      )
      no-repeat var(--link-underline-x) bottom;
    background-size: 0 1px;
    transition: background-size var(--o-easing-standard) var(--o-duration-m2);

    @include hover {
      background-size: var(--link-underline-x) 1px;
      background-position-x: left;
    }
  }
}
</style>
<style less>
.member-dialog {
  --dlg-radius: var(--o-radius-xs) !important;
  --dlg-bg-color: var(--o-color-control5-light);
}
.o-popup-wrap {
  --popup-bg-color: var(--o-color-control5-light);
}
</style>
