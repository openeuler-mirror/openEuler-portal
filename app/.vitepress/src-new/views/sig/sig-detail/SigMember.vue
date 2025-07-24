<script lang="ts" setup>
import { ref, computed, type PropType, watch } from 'vue';

import { OIcon, ODivider } from '@opensig/opendesign';

import WordAvatar from '~@/components/WordAvatar.vue';

import IconGitee from '~icons/app-new/icon-gitee.svg';
import IconMail from '~icons/app-new/icon-mail.svg';
import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';

import { GITEE_ADDRESS } from '~@/shared/config/sig';

import { sigMaintainerT } from '~@/@types/type-sig';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';

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

const { t } = useLocale();
const { lePadV } = useScreen();
const commonStore = useCommon();
const isDark = computed(() => {
  return commonStore.theme === 'dark';
});

const currentMaintainerPage = ref(1);
const currentCommitterPage = ref(1);
const pageSize = ref(5);

const isAllMaintainer = ref(false);
const viewAllMaintainer = () => {
  isAllMaintainer.value = !isAllMaintainer.value
}
const maintainerData = computed(() => {
  if (!lePadV.value) {
    return isAllMaintainer.value ? props.maintainerList : props.maintainerList.slice(0, 11);
  } else {
    return props.maintainerList?.slice(0, currentMaintainerPage.value * pageSize.value);
  }
});

const isAllCommitter = ref(false);
const viewAllCommitter = () => {
  isAllCommitter.value = !isAllCommitter.value;
}
const committerData = computed(() => {
  if (!lePadV.value) {
    return isAllCommitter.value ? props.committerList : props.committerList.slice(0, 11);
  } else {
    return props.committerList?.slice(0, currentCommitterPage.value * pageSize.value);
  }
});

const isAllMaintainerData = ref(false);
const isAllCommitterData = ref(false);
const viewMore = () => {
  if (!isAllMaintainerData.value) {
    currentMaintainerPage.value++;
  } else {
    currentCommitterPage.value++;
  }

  if (isAllMaintainerData.value && isAllCommitterData.value) {
    currentMaintainerPage.value = 1;
    currentCommitterPage.value = 1;
  }
}

watch(
  () => currentMaintainerPage.value,
  (val) => {
    isAllMaintainerData.value = val * pageSize.value >= props.maintainerList.length;
  }
)
watch(
  () => currentCommitterPage.value,
  (val) => {
    isAllCommitterData.value = val * pageSize.value >= props.committerList.length;
  }
)
</script>
<template>
  <div>
    <P class="sig-core">{{
      t('sig.sigCore', {
        num: maintainerList?.length + committerList?.length,
      })
    }}</P>
    <div class="sig-member">
      <div v-if="maintainerList?.length" class="sig-member-title">
        {{ t('sig.sigMaintainer', { num: maintainerList?.length }) }}
      </div>
      <div class="member-list" :class="{'member-list-all': isAllMaintainer || maintainerList?.length < 12, 'member-list-dark': isDark}">
        <div v-for="member in maintainerData" class="member-info">
          <div class="member-info-left" :class="{'member-info-id': !member.name}">
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
      </div>
      <div v-if="!lePadV && maintainerList?.length > 11" class="more-btn">
        <div
          class="view-all"
          @click="viewAllMaintainer"
        >
          <span>{{ isAllMaintainer ? t('common.collapse') : t('sig.viewAll') }}</span>
          <OIcon :class="{ reversal: isAllMaintainer }"><IconChevronDown /></OIcon>
        </div>
      </div>
      <div v-if="(committerList?.length && isAllMaintainerData) || (committerList?.length && !lePadV)" class="sig-member-title sig-committer-title">
        {{ t('sig.sigCommitter', { num: committerList?.length }) }}
      </div>
      <div v-if="isAllMaintainerData || !lePadV" class="member-list" :class="{'member-list-all': isAllCommitter || committerList?.length < 12, 'member-list-dark': isDark}">
        <div v-for="member in committerData" class="member-info">
          <div class="member-info-left" :class="{'member-info-id': !member.name}">
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
      </div>
      <div v-if="!lePadV && committerList?.length > 11" class="more-btn">
        <div
          class="view-all"
          @click="viewAllCommitter"
        >
          <span>{{ isAllCommitter ? t('common.collapse') : t('sig.viewAll') }}</span>
          <OIcon :class="{ reversal: isAllCommitter }"><IconChevronDown /></OIcon>
        </div>
      </div>
    </div>
    <div v-if="lePadV" class="more-btn">
      <div
        class="view-more view-all"
        @click="viewMore"
      >
        <span>{{ isAllMaintainerData && isAllCommitterData ? t('common.collapse') : t('common.more') }}</span>
        <OIcon :class="{ reversal: isAllMaintainerData && isAllCommitterData }"><IconChevronDown /></OIcon>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-core {
  font-weight: 500;
  margin-bottom: 24px;
  @include h4;

  @include respond-to('<=pad_v') {
    margin-bottom: 12px;
    @include h3;
  }
}
.sig-member {
  padding: 24px;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  height: calc(100% - 48px);
  @include respond-to('<=laptop') {
    padding: 16px 24px;
    height: auto;
  }

  .sig-member-title {
    font-weight: 500;
    @include text2;
  }

  .sig-committer-title {
    margin-top: 24px;
  }

  .member-list {
    margin-top: 16px;
    position: relative;
    &::before {
      position: absolute;
      content: '';
      left: 0;
      bottom: 0;
      width: 100%;
      height: 25px;
      background-image: linear-gradient(180deg, rgba(var(--o-mixedgray-1), 0) 0%, rgba(var(--o-mixedgray-1), 1.0) 100%);
    }
    @include respond-to('<=laptop') {
      margin-top: 0;
      height: auto;
    }
    @include respond-to('<=pad_v') {
      &::before {
        display: none;
      }
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
            @include respond-to('<=pad_v') {
              @include text1;
            }
          }
          .member-name {
            color: var(--o-color-info4);
            @include tip2;
            @include respond-to('<=pad_v') {
              @include text1;
            }
          }
        }
      }
      .member-info-id {
        align-items: center;
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
  .member-list-all {
    &::before {
      display: none;
    }
  }
  .member-list-dark {
    &::before {
      background-image: linear-gradient(180deg, rgba(var(--o-mixedgray-4), 0) 0%, rgba(var(--o-mixedgray-4), 1.0) 100%);
    }
  }
}

.more-btn {
  text-align: center;
}
.view-all {
  cursor: pointer;
  margin-top: 6px;
  display: inline-flex;
  justify-content: center;
  color: var(--o-color-info3);
  @include tip1;
  .o-icon {
    margin-left: 6px;
    font-size: var(--o-icon_size-xs);
    transition: all 0.3s;
  }
}
.reversal {
  transform: rotate(180deg);
}

.view-more {
  padding: 4px 0;
}
</style>
