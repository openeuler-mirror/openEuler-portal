<script setup lang="ts">
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import qrcodeLight from '@/assets/category/internship/qrCode.png';
import qrcodeDark from '@/assets/category/internship/qrCode-dark.png';
import { computed } from 'vue';

const i18n = useI18n();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const qrcodeImage = computed(() => isDark.value ? qrcodeDark : qrcodeLight);
</script>

<template>
  <div class="internship-help-container">
    <div class="help-content">
      <div class="help-text">
        <div class="help-email">
          {{ i18n.internship.helpContactEmail }}
          <span class="email-address">{{ i18n.internship.helpEmail }}</span>
        </div>
        <div class="help-desc">{{ i18n.internship.helpEmailDesc }}</div>
      </div>
      <div class="help-qrcode">
        <img :src="qrcodeImage" :alt="i18n.internship.internshipHelp" class="qrcode-image" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.help-content {
  display: flex;
  gap: 60px;
  background-color: var(--o-color-fill2);
  padding: 24px;
  border-radius: 4px;
}

.help-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.help-email {
  color: var(--o-color-info2);
  @include text1;
}

.help-desc {
  color: var(--o-color-info2);
  @include text1;
  line-height: 1.6;
}

.help-qrcode {
  flex-shrink: 0;

  .qrcode-image {
    width: 180px;
    height: 180px;
    object-fit: contain;
  }
}

@media screen and (max-width: 840px) {
  .help-content {
    flex-direction: column;
    gap: 24px;
    padding: 12px;
  }

  .help-qrcode {
    width: 100%;
    display: flex;
    justify-content: center;

    .qrcode-image {
      width: 150px;
      height: 150px;
    }
  }
}
</style>