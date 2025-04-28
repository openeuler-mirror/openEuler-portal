<script lang="ts" setup>
import { computed } from 'vue';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from 'vue-i18n';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import { OPopover, OIcon } from '@opensig/opendesign';

import IconHonor from '~icons/user-group/honor.svg';
import IconMail from '~icons/user-group/mail.svg';
import { RowAlign } from 'element-plus';

const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const { isPhone } = useScreen();
const { t } = useI18n();

const props = defineProps({
  ambassadorList: {
    type: Array,
    required: true,
    default: () => [],
  },
  organizerList: {
    type: Array,
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
</script>

<template>
  <AppSection :title="t('usergroup.honoraryMember')" class="detail-member">
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
              backgroundImage: `url(${isDark ? item.avatarDark : item.avatar})`,
            }"
          >
            <div class="card-title">
              <span class="name">{{ item.name }}</span>
              <template v-if="item.contribution">
                <OPopover position="top">
                  <template #target>
                    <OIcon class="icon"><IconHonor /></OIcon>
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
    width: 100%;
    height: 100%;
    background: linear-gradient(
      270deg,
      rgba(240, 188, 0, 0.7),
      rgba(240, 188, 0) 104.702%
    );
    opacity: 0.2;
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
    width: 100%;
    height: 100%;
    background: linear-gradient(
      270deg,
      rgba(98, 178, 246, 0.7),
      rgba(98, 178, 246) 104.702%
    );
    opacity: 0.2;
  }

  .member-item {
    background-size: 60% auto;
  }
}
</style>
<style lang="scss" scoped>
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
