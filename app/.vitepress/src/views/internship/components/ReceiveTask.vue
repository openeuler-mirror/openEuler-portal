<script setup lang="ts">
import { OIcon, OButton, OLink } from '@opensig/opendesign';
import IconOutlink from '~icons/app/icon-outlink.svg';
import IconDownload from '~icons/app/icon-download.svg';
import { internshipTaskLinks } from './internshipTask';
import { internshipTaskEmailTemplate } from './types';
import { useScreen } from '~@/composables/useScreen';
import { downloadByUrl } from '@/shared/download';
import { useI18n } from '@/i18n';
const i18n = useI18n();
const { lePadV } = useScreen();
</script>

<template>
  <div class="receive-task-container" :class="{'mobile-receive-task': lePadV}">
    <h2 class="receive-task-title">{{ i18n.internship.receiveTaskTitle1 }}</h2>
    <div class="step">
      <span>{{ i18n.internship.receiveTaskDesc1 }}</span>
      <OLink class="contact" :href="internshipTaskLinks.viewTask" target="_blank">{{ i18n.internship.receiveTaskDesc2 }}</OLink>
      <span>{{ i18n.internship.receiveTaskDesc3 }}</span>
    </div>
    <div class="step">
      <span>{{ i18n.internship.claimTaks1 }}</span>
      <span class="code">{{ i18n.internship.claimTaks2 }}</span>
      <span>{{ i18n.internship.claimTaks3 }}</span>
    </div>
    <div class="download-file">
      <OButton
        variant="outline"
        size="small"
        class="icon-download"
        color="primary"
        @click="downloadByUrl(internshipTaskEmailTemplate.file, internshipTaskEmailTemplate.filename)"
        target="_blank"
        :icon="IconDownload"
      >
        {{ i18n.internship.internshipTaskEmailTemplate }}
      </OButton>
    </div>
    <div class="step">
      <div>{{ i18n.internship.tutorReview1 }}</div>
      <div class="single-line">
        <span class="code">{{ i18n.internship.tutorReview2 }}</span>
        <span>{{ i18n.internship.tutorReview3 }}</span>
      </div>
      <div class="single-line">
        <span class="code">{{ i18n.internship.tutorReview4 }}</span>
        <span>{{ i18n.internship.tutorReview5 }}</span>
      </div>
    </div>
    <div class="step">
      <span>{{ i18n.internship.abandonTask1 }}</span>
      <span class="code">{{ i18n.internship.abandonTask2 }}</span>
      <span>{{ i18n.internship.abandonTask3 }}</span>
      <span class="limit">{{ i18n.internship.receiveTaskDesc5 }}</span>
    </div>
    <div class="attention">
      <span class="attention-text">{{ i18n.internship.attention }}</span>
      <div>
        <p>{{ i18n.internship.receiveTaskDesc6 }}</p>
        <div>
          <span>{{ i18n.internship.releaseTask1 }}</span>
          <span class="code">{{ i18n.internship.releaseTask2 }}</span>
          <span>{{ i18n.internship.releaseTask3 }}</span>
        </div>
      </div>
    </div>
    <h2 class="other-title">{{ i18n.internship.OtherInternship }}</h2>
    <div class="step">{{ i18n.internship.receiveTaskDesc8 }}</div>
    <div class="link-row" :class="{'mobile-link-row': lePadV}">
      <div class="link-group">
        <OLink class="contact" :href="internshipTaskLinks.mindsporeLink" target="_blank">{{ i18n.internship.mindspore }}</OLink>
        <OIcon class="jump-out-icon"><IconOutlink /></OIcon>
      </div>
      <div class="link-group">
        <OLink class="contact" :href="internshipTaskLinks.vllmAscendLink" target="_blank">{{ i18n.internship.vLLM }}</OLink>
        <OIcon class="jump-out-icon"><IconOutlink /></OIcon>
      </div>
    </div>
    <div class="attention" :class="{'mobile-attention': lePadV}">
      <span class="attention-text">{{ i18n.internship.attention }}</span>
      <span>{{ i18n.internship.receiveTaskDesc9 }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.receive-task-container, .other-internship-container {
  background-color: var(--o-color-control2-light);
  padding: 24px;
  border-radius: 4px;
  color: var(--o-color-info2);
  @include text1;
}

.code {
  padding-left: 4px;
  padding-right: 4px;
  border: 1px solid var(--o-color-control1-light);
  border-radius: 4px;
  background-color: var(--o-color-control6-light);
  color: var(--o-color-info1);
  margin-left: 4px;
  margin-right: 4px;
  white-space: nowrap;
}

.single-line {
  padding-left: 30px;
}

.other-internship-container {
  margin-top: 24px;
}

.receive-task-title {
  @include h3;
  margin-bottom: 16px;
  color: var(--o-color-info1);
}

.step {
   margin-bottom: 8px;

   .limit {
    font-weight: 600;
    color: var(--o-color-info1);
   }

   &:last-child {
    margin-bottom: 16px;
   }

   .o-link {
    color: var(--o-color-link1);

    &:hover {
      color: var(--o-color-link2);
    }
   }
}

.download-file {
  margin-top: 8px;
  margin-bottom: 8px;

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

.attention {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 16px;

  .attention-text {
    font-weight: 600;
    margin-right: 8px;
    white-space: nowrap;
    color: var(--o-color-info1);
  }
}

.other-title {
  @include h3;
  margin-bottom: 16px;
  color: var(--o-color-info1);
  margin-top: 24px;
}

.link-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;

  .link-group {
    display: flex;
    align-items: center;
    margin-right: 24px;

    .contact {
      color: var(--o-color-primary1);
      cursor: pointer;
      &:hover {
        color: var(--o-color-primary2);
        text-decoration: underline;
      }
    }

    .jump-out-icon {
      --icon-size: 16px;
      margin-left: 4px;
      color: var(--o-color-primary1);
      transition: color 0.2s;
    }

    &:hover .contact,
    &:hover .jump-out-icon {
      color: var(--o-color-primary2);
    }
  }
}

.icon-download {
  font-size: 14px;
}

.mobile-link-row {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0;

  .link-group {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 18px;
  }
}

.mobile-attention {
  margin-top: 0;
}

.mobile-receive-task {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

.mobile-other-internship {
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
