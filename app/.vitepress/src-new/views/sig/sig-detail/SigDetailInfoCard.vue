<script lang="ts" setup>
import { ref, computed } from 'vue';

import { useData } from 'vitepress';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

import { OIcon, OButton, ODivider } from '@opensig/opendesign';

import IconGitee from '~icons/app-new/icon-gitee.svg';
import IconMail from '~icons/app-new/icon-mail.svg';

const { isPhone, isPad, isPadVToLaptop, lePadV } = useScreen();
const { locale } = useLocale();
const { lang, params } = useData();

const props = defineProps({
  sigName: {
    type: String,
    default: '',
  },
  giteeAddress: {
    type: String,
    default: '',
  },
  mail: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});
</script>
<template>
  <div class="sig-detail-info-card">
    <div class="sig-name">
      {{ sigName }}
    </div>
    <div class="mail-line">
      <a
        :href="giteeAddress"
        target="_blank"
        rel="noopener noreferrer"
        class="gitee-icon"
      >
        <OIcon class="icon">
          <IconGitee />
        </OIcon>
        {{ giteeAddress }}
      </a>
      <ODivider direction="v" />
      <a class="mail" :href="`mailto:${mail}`">
        <OIcon class="icon">
          <IconMail />
        </OIcon>
        {{ mail }}
      </a>
      <a
        v-if="
          mail?.split('@').length && mail?.split('@')[1] === 'openeuler.org'
        "
        class="subscribe-sig-mail"
        :href="`https://mailweb.openeuler.org/postorius/lists/${mail}/`"
        target="_blank"
        rel="noopener noreferrer"
      >
        <OButton size="medium" color="primary">
          {{ $t('sig.subscribe') }}
        </OButton>
      </a>
    </div>
    <div class="sig-description">
      {{ description }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-detail-info-card {
  padding: 24px 40px;
  border-radius: var(--o-radius-xs);
  background-image: url('~@/assets/category/sig/sig-card_bg_light.png');
  background-size: 100% 100%;
  background-position: right bottom;
  background-repeat: no-repeat;
  .sig-name {
    @include h2;
    font-weight: 500;
  }
  .mail-line {
    margin-top: 16px;
    display: flex;
    align-items: center;
    @include text1;
    .gitee-icon,
    .mail {
      display: flex;
      align-items: center;
      .icon {
        font-size: var(--o-icon_size-m);
        margin-right: 8px;
        color: var(--o-color-info2);
      }
    }
    .subscribe-sig-mail {
      margin-left: 8px;
    }
    .o-divider {
      font-size: var(--o-font_size-text1);
    }
  }
  .sig-description {
    margin-top: 8px;
    @include text1;
  }
}

[data-o-theme='dark'] {
  .sig-detail-info-card {
    background-image: url('~@/assets/category/sig/sig-card_bg_dark.png');
  }
}
</style>
