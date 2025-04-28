<script lang="ts" setup>
import AppSection from '~@/components/AppSection.vue';

import { guideData } from '~@/data/user-group';
import IconMail from '~icons/user-group/mail.svg';
import IconWechat from '~icons/user-group/wechat.svg';
</script>

<template>
  <AppSection class="group-guide" :title="guideData.title">
    <div class="guide">
      <div class="guide-left">
        <p class="subtitle">{{ guideData.subtitle1 }}</p>
        <p class="desc">{{ guideData.desc1 }}</p>
      </div>
      <div class="split-line1"></div>
      <div class="guide-right">
        <p class="subtitle">{{ guideData.subtitle2 }}</p>
        <div class="contact-method">
          <div class="method">
            <div class="contact-item">
              <OIcon class="icon"><IconMail /></OIcon>
              <p class="desc">{{ guideData.desc2 }}</p>
            </div>
            <a :href="`mailto:${guideData.link1}`">{{ guideData.link1 }}</a>
            <a :href="guideData.link2">{{ guideData.mail }}</a>
          </div>
          <div class="split-line2"></div>
          <div class="method method-right">
            <div>
              <div class="contact-item">
                <OIcon class="icon"><IconWechat /></OIcon>
                <p class="desc">{{ guideData.desc3 }}</p>
              </div>
              <p class="tip">{{ guideData.tip1 }}</p>
              <p class="tip">{{ guideData.tip2 }}</p>
            </div>
            <img class="code" :src="guideData.wechat" />
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.group-guide {
  :deep(.section-wrapper) {
    margin-top: 54px;

    @include respond-to('phone') {
      margin-top: 28px;
    }
  }
}

.guide {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  min-height: 224px;
  padding: var(--o-gap-7) 76px;
  display: flex;
  gap: 78px;

  .guide-left {
    flex: 1.2;
  }

  .split-line1 {
    display: none;
  }

  .guide-right {
    flex: 1;

    .contact-method {
      display: flex;
      gap: var(--o-gap-5);

      .method {
        display: flex;
        flex-direction: column;
        gap: var(--o-gap-2);

        &.method-right {
          flex-direction: row;
          gap: var(--o-gap-5);
        }
      }
      .split-line2 {
        height: 62px;
        border-left: 1px solid var(--o-color-control4);
      }
      .code {
        max-width: 88px;
        max-height: 88px;
        border-radius: var(--o-radius-xs);
      }
    }
  }

  .subtitle {
    @include h3;
    margin-bottom: var(--o-gap-5);
    font-weight: 500;
    color: var(--o-color-info1);
  }

  .desc {
    @include text1;
    color: var(--o-color-info2);
    text-align: justify;
  }

  .contact-item {
    display: flex;
    gap: var(--o-gap-2);
    align-items: center;

    .icon {
      font-size: var(--o-icon_size-m);
    }
  }

  .tip {
    @include tip1;
    color: var(--o-color-info2);
  }
}

@include respond-to('<=pad_v') {
  .guide {
    padding: var(--o-gap-3);
    flex-direction: column;
    gap: var(--o-gap-2);

    .split-line1 {
      display: block;
      border-top: 1px solid var(--o-color-control4);
    }

    .subtitle {
      margin-bottom: var(--o-gap-2);
    }

    .guide-right {
      .contact-method {
        flex-direction: column;
        gap: var(--o-gap-2);

        .split-line2 {
          height: 0;
          border-left: unset;
          border-top: 1px solid var(--o-color-control4);
        }
      }

      .desc {
        @include text2;
        font-weight: 400;
      }
      .method-right {
        justify-content: space-between;
        .contact-item {
          margin-bottom: var(--o-gap-2);
        }
        .tip {
          @include text2;
        }
      }
    }
  }
}

@include respond-to('pad_v-laptop') {
  .guide {
    flex-direction: column;
    gap: var(--o-gap-5);

    .contact-method {
      display: flex;

      .method {
        flex: 1;
      }
    }
  }
}
</style>
