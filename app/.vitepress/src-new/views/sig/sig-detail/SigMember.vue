<script lang="ts" setup>
import { ref, computed, type PropType } from 'vue';

import { useData } from 'vitepress';

import { OIcon, ODivider, OScroller } from '@opensig/opendesign';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';
import WordAvatar from '~@/components/WordAvatar.vue';

import IconGitee from '~icons/app-new/icon-gitee.svg';
import IconMail from '~icons/app-new/icon-mail.svg';

import { SIG_ADDRESS, GITEE_ADDRESS } from '~@/shared/config/sig';

import { sigMaintainerT } from '~@/@types/type-sig';

const props = defineProps({
  maintainerList: {
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
</script>
<template>
  <div class="sig-member">
    <div class="sig-member-title">
      {{ $t('sig.sigMember', { num: maintainerList?.length }) }}
    </div>
    <OScroller class="member-list" size="small">
      <div v-for="member in maintainerList" class="member-info">
        <div class="member-info-left">
          <WordAvatar :name="member?.gitee_id" size="medium" />
          <div class="info">
            <div class="member-name">{{ member.gitee_id }}</div>
            <div class="member-post">Maintainer</div>
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
    </OScroller>
  </div>
</template>

<style scoped lang="scss">
.sig-member {
  padding: 24px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  height: fit-content;
  .sig-member-title {
    @include h4;
    font-weight: 500;
  }
  .member-list {
    margin-top: 24px;
    max-height: 744px;
    .member-info {
      display: flex;
      align-items: center;
      & + .member-info {
        margin-top: 16px;
      }
      .member-info-left {
        --avatar-width: 40px;
        --info-width: 165px;
        --avatar-gap: 16px;
        display: flex;
        min-width: var(--info-width);
        .info {
          margin-left: var(--avatar-gap);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          @include tip2;
          .member-name {
            @include text-truncate(1);
            width: calc(
              var(--info-width) - var(--avatar-width) - var(--avatar-gap)
            );
            word-break: break-all;
            font-weight: 500;
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
        height: 40px;
        --o-divider-label-gap: 0 24px;
      }
    }
  }
}
</style>
