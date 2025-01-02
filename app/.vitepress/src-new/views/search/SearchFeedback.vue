<script lang="ts" setup>
import { ref, computed } from 'vue';

import {
  OIcon,
  OButton,
  OTextarea,
  OMessage,
  ODialog,
} from '@opensig/opendesign';

import { getSearchFeedback } from '~@/api/api-feedback';

import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';

import { FeedbackParamsT } from '~@/@types/type-search';

const props = defineProps({
  size: {
    type: String,
    default: '',
  },
  keyword: {
    type: String,
    default: '',
  },
});

import IconFound from '~icons/app-new/icon-good.svg';
import IconNotFound from '~icons/app-new/icon-bad.svg';
import IconFeedback from '~icons/app-new/icon-feedback.svg';

const { t } = useLocale();
const { isPhone, gtPadV, gtPhone } = useScreen();

const feedbackTxa = ref('');
const isMessageSuccess = ref(false);
const isMessageError = ref(false);
// 确定事件
const onClick = (type: string) => {
  isMessageSuccess.value = false;
  isMessageError.value = false;
  if (type === 'found') {
    onReset();
    querySearchFeedback();
  } else {
    isVisible.value = true;
    isFound.value = true;
  }
};

const isDisable = computed(() => feedbackTxa.value === '');
const isFound = ref(false);

// 取消事件
const onReset = () => {
  feedbackTxa.value = '';
  isFound.value = false;
  isVisible.value = false;
};

// 接口
const querySearchFeedback = () => {
  const SearchTypeParams: FeedbackParamsT = {
    searchFlag: !isFound.value,
    keyword: props.keyword,
    feedbackText: feedbackTxa.value,
  };

  getSearchFeedback(SearchTypeParams)
    .then((data) => {
      isMessageSuccess.value = true;
      onReset();
    })
    .catch((e) => {
      isMessageError.value = true;
      setTimeout(() => {
        isMessageError.value = false;
      }, 1000);
    });
};

const isVisible = ref(false);
</script>

<template>
  <div class="search-feedback" :class="size">
    <div class="title">
      <OIcon v-if="gtPadV">
        <IconFeedback />
      </OIcon>
      {{ t('search.searchFeedback') }}
    </div>
    <div class="search-feedback-content">
      <div class="top">
        <p class="text">{{ t('search.searchFeedbackText') }}</p>
        <div class="action">
          <OButton
            color="primary"
            :icon="IconFound"
            class="search-btn"
            @click="onClick('found')"
          >
            {{ t('search.found') }}
          </OButton>
          <OButton
            color="primary"
            :icon="IconNotFound"
            class="search-btn"
            @click="onClick('not-found')"
          >
            {{ t('search.notFound') }}
          </OButton>
        </div>
      </div>
      <OMessage
        v-if="isMessageSuccess"
        :duration="3000"
        status="success"
        class="message-tips"
        >{{ t('search.searchFeedbackMessage') }}</OMessage
      >
      <OMessage
        v-if="isMessageError"
        :duration="3000"
        status="danger"
        class="message-tips danger"
        >{{ t('search.searchFeedbackError') }}</OMessage
      >
      <!-- 反馈 -->
      <div v-if="isFound && gtPhone" class="feedback-form">
        <OTextarea
          v-model="feedbackTxa"
          :placeholder="t('search.searchFeedbackPlaceholder')"
          resize="none"
          :rows="4"
          size="large"
          clearable
          :max-length="200"
          :input-on-outlimit="false"
        />

        <div class="action">
          <OButton
            variant="solid"
            color="primary"
            size="medium"
            :disabled="isDisable"
            :class="{ primary: !isDisable }"
            @click="querySearchFeedback"
            >{{ t('search.submit') }}</OButton
          >
          <OButton
            variant="outline"
            color="primary"
            @click="onReset"
            size="medium"
            class="reset"
            >{{ t('search.cancel') }}</OButton
          >
        </div>
      </div>
      <!-- 移动端弹窗 -->
      <ODialog
        v-if="isPhone && isFound"
        v-model:visible="isVisible"
        class="feedback-layer"
      >
        <div class="out-layer">
          <div class="layer-box">
            <h2 class="layer-title">{{ t('search.searchFeedback') }}</h2>
            <OTextarea
              v-model="feedbackTxa"
              :placeholder="t('search.searchFeedbackPlaceholder')"
              resize="none"
              :rows="4"
              clearable
              size="large"
              style="width: 100%"
              :max-length="200"
              :input-on-outlimit="false"
            />

            <div class="btn-box">
              <OButton variant="text" class="reset-btn" @click="onReset">
                {{ t('search.cancel') }}
              </OButton>
              <OButton
                variant="text"
                color="primary"
                :disabled="isDisable"
                class="confirm-btn"
                @click="querySearchFeedback"
                >{{ t('search.submit') }}</OButton
              >
            </div>
          </div>
        </div>
      </ODialog>
    </div>
  </div>
</template>
<style lang="scss">
.o-dialog.feedback-layer {
  align-items: flex-end;
  padding: 0;
  --dlg-margin: 0;
  --dlg-radius: 8px 8px 0 0;
  --dlg-body-padding: 0;
  .o-layer-main {
    width: 100%;
    .out-layer {
      padding-top: 8px;
      background-color: var(--o-color-fill2);
      border-radius: var(--o-radius-m);
    }
    .layer-box {
      padding: 8px 16px 0;
      @include scrollbar;

      .layer-title {
        text-align: center;
        font-size: 18px;
        line-height: 26px;
        color: var(--o-color-info1);
        font-weight: 500;
        margin-bottom: 12px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.o-textarea {
  --textarea-text-size: 14px;
  --textarea-radius: var(--o-radius-xs);
}
.search-feedback {
  .o-btn {
    @include hover() {
      :deep(.o-btn-prefix) {
        font-size: var(--o-icon_size-xs);
        color: var(--o-color-white);
      }
    }
    :deep(.o-btn-prefix) {
      font-size: var(--o-icon_size-xs);
      svg {
        width: 1em;
        height: 1em;
      }
    }
  }
}
.btn-box {
  position: sticky;
  left: 0;
  padding: 16px 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--o-color-fill2);
  .o-btn {
    position: relative;
    @include hover() {
      :deep(.o-btn-prefix) {
        color: var(--o-color-info1);
      }
    }
    &:first-child {
      &::after {
        content: '';
        position: absolute;
        right: 0;
        width: 1px;
        height: 100%;
        background-color: var(--o-color-control1-light);
      }
    }
    flex: 1;
  }
}
.search-feedback {
  &.medium {
    padding: 24px;
    background: var(--o-color-fill1);
    margin: 40px 0 0;
    border-radius: var(--o-radius-xs);
    @include respond-to('<=pad') {
      margin: 24px 0;
      border-radius: 8px;
    }
    @include respond-to('<=pad_v') {
      padding: 16px;
      margin: 24px 0;
    }
    @include respond-to('phone') {
      background: var(--o-color-fill2);
      margin: 0 0 12px;
    }
    .top {
      display: flex;
      align-items: center;
      @include respond-to('<=pad_v') {
        flex-direction: column;
        align-items: flex-start;
      }
      .action {
        margin: 0 0 0 72px;
        @include respond-to('<=pad_v') {
          margin: 12px 0 0;
        }
      }
    }
    .search-feedback-content {
      padding-left: 32px;
      @include respond-to('<=pad_v') {
        padding: 0;
      }
    }
  }
  &.small {
    .title {
      border-bottom: 1px solid var(--o-color-control4);
      padding: 0 0 12px;
      margin-bottom: 12px;
    }
    .feedback-form {
      background: var(--o-color-fill1);
      padding: 16px;
      border-radius: var(--o-radius-xs);
      .action {
        justify-content: center;
      }
    }
  }
  .search-feedback-content {
    position: relative;
    .message-tips {
      position: absolute;
      top: calc(100% + 24px);
      left: 0;
      @include respond-to('phone') {
        top: calc(50% - 24px);
      }
    }
  }
  .title {
    color: var(--o-color-info1);
    font-weight: 500;
    display: flex;
    margin-bottom: 8px;
    align-items: center;
    @include h4;
    svg {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
  }
  .text {
    color: var(--o-color-info2);
    @include text1;
  }
}
.action {
  display: flex;
  align-items: center;
  margin: 16px 0 0;
  @include respond-to('phone') {
    width: 100%;
  }
  .o-btn + .o-btn {
    margin-left: 16px;
  }
}
.feedback-form {
  margin: 16px 0 0;
  :deep(.o-textarea) {
    width: 100%;
  }
  @include respond-to('phone') {
    margin: 12px 0 0;
  }
}
:deep(.o-btn) {
  @include respond-to('phone') {
    flex: 1;
  }
  .o-btn-prefix {
    color: var(--o-color-primary1);
    svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
      @include respond-to('phone') {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
