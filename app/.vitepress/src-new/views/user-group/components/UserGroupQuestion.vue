<script lang="ts" setup>
import AppSection from '~@/components/AppSection.vue';
import { questionData } from '~@/data/user-group';
import IconHook from '~icons/user-group/hook.svg';
</script>

<template>
  <AppSection :title="questionData.title" class="ques-section">
    <template #subtitle>
      <div class="subtitle">
        <span>
          {{ questionData.desc1 }}
          <a :href="`mailto:${questionData.mail}`">user@openeuler.sh</a>
          {{ questionData.desc2 }}
        </span>
      </div>
    </template>

    <div class="content">
      <div class="card organizer">
        <p class="title">{{ questionData.subtitle1 }}</p>
        <p class="desc">{{ questionData.intro1 }}</p>
        <div class="background"></div>
      </div>
      <div class="card">
        <p class="title">{{ questionData.subtitle2 }}</p>
        <p class="desc">{{ questionData.intro2 }}</p>
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
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.ques-section {
  :deep(.section-subtitle) {
    max-width: 1290px;
  }

  .subtitle {
    display: flex;
    align-items: center;
    text-align: center;
    white-space: normal;
  }

  .content {
    display: flex;
    gap: var(--o-gap-6);

    .card {
      flex: 1;
      border-radius: var(--o-radius-xs);
      background-color: var(--o-color-fill2);
      padding: var(--o-gap-7);

      .title {
        @include h2;
        font-weight: 500;
        margin-bottom: var(--o-gap-5);
        color: var(--o-color-info1);
      }

      .desc {
        @include text1;
        color: var(--o-color-info1);
      }
    }
  }

  .organizer {
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: bottom;
    background-image: url('~@/assets/category/user-group/common/organizer.png');
  }

  .tip-item {
    display: flex;
    gap: var(--o-gap-3);
    align-items: center;

    &.first-item {
      padding-top: var(--o-gap-7);

      .icon {
        margin-bottom: var(--o-gap-5);
      }
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
      color: var(--o-color-info2);
    }
  }
}

@include respond-to('<=pad_v') {
  .ques-section {
    :deep(.section-subtitle) {
      text-align: unset;

      .subtitle {
        text-align: unset;
      }
    }

    .content {
      flex-direction: column;
      gap: var(--o-gap-3);
      max-height: unset;

      .card {
        padding: var(--o-gap-4);

        .title {
          margin-bottom: var(--o-gap-1);
        }
        .background {
          height: 78px;
          margin-top: var(--o-gap-4);

          @media (min-width: 450px) {
            height: 108px;
          }
          @media (min-width: 600px) {
            height: 168px;
          }
        }
        .first-item {
          padding-top: var(--o-gap-5);
        }
      }
    }
  }
}
</style>
