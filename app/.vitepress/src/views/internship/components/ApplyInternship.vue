<script setup lang="ts">
import { OIcon, OButton, OLink } from '@opensig/opendesign';
import IconOutlink from '~icons/app/icon-outlink.svg';
import IconDownload from '~icons/app/icon-download.svg';
import { internshipTaskLinks } from './internshipTask';
import { internshipTaskTemplate } from './types';
import { useScreen } from '~@/composables/useScreen';
import { downloadByUrl } from '@/shared/download';
import { useI18n } from '@/i18n';
const i18n = useI18n();
const { lePadV } = useScreen();
</script>

<template>
  <div class="apply-internship-container" :class="{'mobile-apply-internship': lePadV}">
    <h2 class="apply-internship-title">{{ i18n.internship.applyInternshipTitle }}</h2>
    <div class="step">{{ i18n.internship.applyInternshipDesc1 }}</div>
    <div class="step">
      <span>{{ i18n.internship.applyInternshipDesc2 }}</span>
      <span class="contact-container">
        <OLink class="contact" :href="internshipTaskLinks.internshipTestTask" target="_blank">{{ i18n.internship.applyInternshipDesc3 }}</OLink>
        <OIcon class="jump-out-icon"><IconOutlink /></OIcon>
      </span>
      <span>{{ i18n.internship.applyInternshipDesc4 }}</span>
    </div>
    <div class="step">{{ i18n.internship.applyInternshipDesc5 }}</div>
    <div class="summary">{{ i18n.internship.applyInternshipDesc6 }}</div>
    <div class="attention">
      <div class="attention-text">{{ i18n.internship.attention }}</div>
      <div>{{ i18n.internship.applyInternshipDesc7 }}</div>
    </div>
    <div class="download-file">
      <OButton
        variant="outline"
        size="small"
        class="icon-download"
        color="primary"
        @click="downloadByUrl(internshipTaskTemplate.file, internshipTaskTemplate.filename)"
        :icon="IconDownload"
        >{{ i18n.internship.applyInternshipDesc8 }}
      </OButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.apply-internship-container {
  background-color: var(--o-color-control2-light);
  padding: 24px;
  border-radius: 4px;
  color: var(--o-color-info2);
  @include text1;

  .o-link {
    color: var(--o-color-primary1);
    @include text1;
  }
}

.apply-internship-title {
  @include h3;
  margin-bottom: 16px;
  color: var(--o-color-info1);
}

.jump-out-icon {
  --icon-size: 16px;
  margin-left: 4px;
}

.step {
   margin-bottom: 8px;

   &:last-child {
    margin-bottom: 16px;
   }
}

.contact-container {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: var(--o-color-primary1);
  cursor: pointer;
  margin-left: 4px;
  margin-right: 4px;

  &:hover {
    color: var(--o-color-primary2);

    .o-link {
      color: var(--o-color-primary2);
      text-decoration: underline;
    }
  }
}

.attention {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 16px;
  
  .attention-text {
    font-weight: 600;
    white-space: nowrap;
    margin-right: 8px;
    color: var(--o-color-info1);
  }
}

.download-file {
  margin-top: 16px;
  
  .o-btn.o-btn-outline:not(.ghost-btn):not(.o-btn-disabled):hover {
    background-color: transparent;
    color: var(--o-color-primary2);
  }

  .icon-download {
    font-size: 14px;
    :deep(.o-btn-prefix) {
      width: 16px;
      height: 16px;
    }
  }
}

.mobile-apply-internship {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

@include respond-to('>pc_b') {
  .jump-out-icon {
    width: 24px;
    height: 24px;
    font-size: 20px;
  }
}
</style>