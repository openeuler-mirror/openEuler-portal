<script lang="ts" setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';

import { useData } from 'vitepress';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';

import { OIcon, OButton, ODivider, OPopover } from '@opensig/opendesign';

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

const OMIT = '/openeuler/community/tree/master/';
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
        {{ giteeAddress.replace(OMIT, '...') }}
      </a>
      <ODivider direction="v" />
      <div class="mail-info">
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
          <OButton
            size="medium"
            :variant="lePadV ? 'text' : 'outline'"
            color="primary"
          >
            {{ $t('sig.subscribe') }}
          </OButton>
        </a>
      </div>
    </div>
    <ODivider class="divider-mo" direction="h" />
    <div class="content">
      <div class="sig-description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sig-detail-info-card {
  position: relative;
  padding: 24px 40px;
  border-radius: var(--o-radius-xs);
  background-size: 100% auto;
  background-position: right top;
  background-repeat: no-repeat;
  background-image: url('~@/assets/category/sig/sig-card_bg_light.png'),
    linear-gradient(163deg, #e3f0ff 0%, #cae4ff 100%);
  @include respond-to('<=pad_v') {
    padding: 16px;
    background-image: linear-gradient(163deg, #eef4fe 0%, #dfecfe 100%);
  }

  .sig-name {
    font-weight: 500;
    @include h2;
  }

  .mail-line {
    margin-top: 16px;
    display: flex;
    align-items: center;
    @include text1;
    @include respond-to('<=pad_v') {
      margin-top: 8px;
      align-items: flex-start;
      flex-direction: column;
    }

    .mail-info {
      display: flex;
      @include respond-to('<=pad_v') {
        width: 100%;
        margin-top: 4px;
        justify-content: space-between;
      }
    }

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
      @include respond-to('<=pad_v') {
        display: none;
      }
    }
  }

  .sig-description {
    margin-top: 8px;
    @include text1;
  }

  .divider-mo {
    display: none;
    @include respond-to('<=pad_v') {
      display: block;
    }
  }
}

[data-o-theme='dark'] {
  .sig-detail-info-card {
    background-image: url('~@/assets/category/sig/sig-card_bg_dark.png'),
      linear-gradient(163deg, #30364E 0%, #1D2855 100%);
  }
}
</style>
