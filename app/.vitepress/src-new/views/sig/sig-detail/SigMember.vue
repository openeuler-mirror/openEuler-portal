<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue';

import { OIcon, ODivider, OScroller } from '@opensig/opendesign';

import WordAvatar from '~@/components/WordAvatar.vue';

import IconGitee from '~icons/app-new/icon-gitee.svg';
import IconMail from '~icons/app-new/icon-mail.svg';
import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

import { GITEE_ADDRESS } from '~@/shared/config/sig';

import { sigMaintainerT } from '~@/@types/type-sig';

import { useScreen } from '~@/composables/useScreen';

const props = defineProps({
  maintainerList: {
    type: Array as PropType<sigMaintainerT[]>,
    define: () => {
      return [];
    },
  },
  committerList: {
    type: Array as PropType<sigMaintainerT[]>,
    define: () => {
      return [];
    },
  },
  sigName: {
    type: String,
    default: '',
  },
});

const { lePadV } = useScreen();
const pageSize = ref(5);
const currentPage = ref(1);

const renderMaintainer = computed(() => {
  if (!lePadV.value) {
    return props.maintainerList;
  } else {
    return props.maintainerList?.slice(0, currentPage.value * pageSize.value);
  }
});
const isFullyDisplayed = computed(() => {
  return (
    currentPage.value * pageSize.value >= (props.maintainerList?.length || 0)
  );
});
const getMoreClick = () => {
  if (isFullyDisplayed.value) {
    currentPage.value = 1;
  } else {
    currentPage.value++;
  }
};
</script>
<template>
  <div>
    <P class="sig-core">{{
      $t('sig.sigCore', {
        num: maintainerList?.length + committerList?.length,
      })
    }}</P>
    <div class="sig-member">
      <div class="sig-member-title">
        {{ $t('sig.sigMaintainer', { num: maintainerList?.length }) }}
      </div>
      <OScroller class="member-list" size="small">
        <div v-for="member in maintainerList" class="member-info">
          <div class="member-info-left">
            <WordAvatar
              :name="member?.gitee_id"
              size="medium"
              :custom-size="lePadV ? 32 : 0"
            />
            <div class="info">
              <div class="member-id">{{ member.gitee_id }}</div>
              <div class="member-name">{{ member.name }}</div>
            </div>
          </div>
          <ODivider direction="v" />
          <div class="member-info-right">
            <a
              :href="`${GITEE_ADDRESS}/${member?.gitee_id}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OIcon>
                <IconGitee />
              </OIcon>
            </a>
            <a
              :href="`mailto:${member.email}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OIcon>
                <IconMail />
              </OIcon>
            </a>
          </div>
        </div>
        <!-- <div
          v-if="lePadV && (maintainerList?.length || 0) > pageSize"
          class="get-more"
          @click="getMoreClick"
        >
          <span>{{
            isFullyDisplayed ? $t('common.collapse') : $t('common.more')
          }}</span>
          <OIcon :class="{ reversal: isFullyDisplayed }">
            <IconChevronDown />
          </OIcon>
        </div> -->
      </OScroller>
      <div class="sig-member-title sig-committer-title">
        {{ $t('sig.sigCommitter', { num: committerList?.length }) }}
      </div>
      <OScroller class="member-list" size="small">
        <div v-for="member in committerList" class="member-info">
          <div class="member-info-left">
            <WordAvatar
              :name="member?.gitee_id"
              size="medium"
              :custom-size="lePadV ? 32 : 0"
            />
            <div class="info">
              <div class="member-id">{{ member.gitee_id }}</div>
              <div class="member-name">{{ member.name }}</div>
            </div>
          </div>
          <ODivider direction="v" />
          <div class="member-info-right">
            <a
              :href="`${GITEE_ADDRESS}/${member?.gitee_id}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OIcon>
                <IconGitee />
              </OIcon>
            </a>
            <a
              :href="`mailto:${member.email}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              <OIcon>
                <IconMail />
              </OIcon>
            </a>
          </div>
        </div>
        <!-- <div
          v-if="lePadV && (maintainerList?.length || 0) > pageSize"
          class="get-more"
          @click="getMoreClick"
        >
          <span>{{
            isFullyDisplayed ? $t('common.collapse') : $t('common.more')
          }}</span>
          <OIcon :class="{ reversal: isFullyDisplayed }">
            <IconChevronDown />
          </OIcon>
        </div> -->
      </OScroller>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-core {
  font-weight: 500;
  margin-bottom: 24px;
  @include h4;
}
.sig-member {
  padding: 24px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  height: 100%;
  @include respond-to('<=laptop') {
    padding: 20px 32px;
    height: auto;
  }

  .sig-member-title {
    font-weight: 500;
    @include h4;
  }

  .sig-committer-title {
    margin-top: 24px;
  }

  .member-list {
    margin-top: 16px;
    @include respond-to('<=laptop') {
      margin-top: 0;
      height: auto;
    }

    .member-info {
      display: flex;
      align-items: center;
      & + .member-info {
        margin-top: 12px;
        @include respond-to('<=laptop') {
          margin-top: 8px;
        }
      }

      .member-info-left {
        --avatar-width: 40px;
        --avatar-gap: 16px;
        margin-right: auto;
        @include respond-to('<=laptop') {
          --avatar-width: 32px;
        }

        display: flex;

        .info {
          margin-left: var(--avatar-gap);
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .member-id {
            color: var(--o-color-info1);
            @include tip1;
            @include text-truncate(1);
            word-break: break-all;
            font-weight: 500;
          }
          .member-name {
            color: var(--o-color-info4);
            @include tip2;
          }
        }
      }

      .member-info-right {
        display: flex;
        align-items: center;
        height: 100%;
        gap: 16px;

        .o-icon {
          color: var(--o-color-info2);
          font-size: var(--o-icon_size-m);
        }
      }

      .o-divider {
        --o-divider-label-gap: 0 16px;

        height: 40px;
      }
    }
  }
  .get-more {
    cursor: pointer;
    margin-top: 12px;
    display: flex;
    justify-content: center;
    @include text1;
    color: var(--o-color-info3);
    .o-icon {
      margin-left: 8px;
      font-size: var(--o-icon_size-xs);
      transition: all 0.3s;
    }
  }
  .reversal {
    transform: rotate(180deg);
  }
}
</style>
