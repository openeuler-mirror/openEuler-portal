<script lang="ts" setup>
import AppSection from '~@/components/AppSection.vue';
import { guideData } from '~@/data/user-group';
import { useI18n } from 'vue-i18n';
import { OButton } from '@opensig/opendesign';

const { t } = useI18n();
</script>

<template>
  <AppSection class="group-guide" :title="t('usergroup.joinCityGroup')">
    <div class="guide">
      <div class="guide-left">
        <p class="title">{{ t('usergroup.subscribe') }}</p>
        <p class="desc">{{ t('usergroup.subscribeDesc') }}</p>
        <div>
          <a :href="`mailto:${guideData.link1}`">{{ guideData.link1 }}</a>
        </div>
        <OButton
          animation
          variant="outline"
          color="primary"
          size="medium"
          class="button"
          :href="guideData.link2"
        >
          {{ t('usergroup.subscribe') }}
        </OButton>
      </div>
      <div class="split-line"></div>
      <div class="guide-right">
        <p class="title">{{ t('usergroup.joinWechat') }}</p>
        <div class="tip-content">
          <img class="code" :src="guideData.wechat" />
          <p class="tip">{{ t('usergroup.wechatDesc') }}</p>
        </div>
      </div>

      <div class="guide-right-mb">
        <div class="tip-content">
          <p class="title">{{ t('usergroup.joinWechat') }}</p>
          <p class="tip">{{ t('usergroup.wechatDesc') }}</p>
        </div>
        <img class="code" :src="guideData.wechat" />
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.group-guide {
  :deep(.section-wrapper) {
    margin-top: 54px;
  }
}

.guide {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  padding: var(--o-gap-5) var(--o-gap-6);
  display: flex;
  gap: 64px;

  .guide-left {
    flex: 1;

    .desc {
      @include text1;
      color: var(--o-color-info2);
      width: 100%;
    }

    .button {
      margin-top: var(--o-gap-4);
    }
  }

  .guide-right {
    flex: 1;

    .tip-content {
      display: flex;
      align-items: flex-end;
    }

    .tip {
      @include tip1;
      color: var(--o-color-info3);
      margin-left: var(--o-gap-4);
    }
  }
  .guide-right-mb {
    display: none;
  }

  .split-line {
    height: 64px;
    border-left: 1px solid var(--o-color-control4);
    align-self: center;
  }

  .title {
    @include text2;
    margin-bottom: var(--o-gap-3);
    font-weight: 500;
    color: var(--o-color-info1);
  }

  .code {
    max-width: 88px;
    max-height: 88px;
    border-radius: var(--o-radius-xs);
    margin-right: unset;
  }
}

@include respond-to('phone') {
  .group-guide {
    .guide {
      flex-direction: column;
      gap: var(--o-gap-4);

      .guide-left {
        .desc {
          @include text2;
        }
      }
    }

    .split-line {
      height: 0;
      width: 100%;
      border-left: unset;
      border-bottom: 1px solid var(--o-color-control4);
    }

    .guide-right {
      display: none;
    }
    .guide-right-mb {
      display: flex;
      justify-content: space-between;
      gap: var(--o-gap-5);

      .tip {
        @include text2;
      }
    }

    .title {
      @include h3;
    }
  }
}
</style>
