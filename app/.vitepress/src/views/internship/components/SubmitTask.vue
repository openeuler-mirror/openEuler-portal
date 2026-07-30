<script setup lang="ts">
import imgLight from '@/assets/category/internship/submit-task-light.png';
import imgDark from '@/assets/category/internship/submit-task-dark.png';
import { OLink } from '@opensig/opendesign';
import { internshipTaskLinks } from './internshipTask';
import { useScreen } from '~@/composables/useScreen';
import { useI18n } from '@/i18n';
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

const i18n = useI18n();
const { lePadV } = useScreen();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const flowImg = computed(() => (isDark.value ? imgDark : imgLight));
</script>

<template>
  <div class="submit-task-container" :class="{'mobile-submit-task': lePadV}">
    <h2 class="submit-task-title">{{ i18n.internship.submitTaskTitle }}</h2>
    <div class="step">
      <span>{{ i18n.internship.issueNum1 }}</span>
      <span class="code">{{ i18n.internship.issueNum2 }}</span>
      <span>{{ i18n.internship.issueNum3 }}</span>
    </div>
    <div class="step">
      <span>{{ i18n.internship.commentPr1 }}</span>
      <span class="code">{{ i18n.internship.commentPr2 }}</span>
      <span>{{ i18n.internship.commentPr3 }}</span>
    </div>
    <div class="step">
      <span>{{ i18n.internship.reviewPr1 }}</span>
      <span class="code">{{ i18n.internship.reviewPr2 }}</span>
      <span>{{ i18n.internship.reviewPr3 }}</span>
    </div>
    <div class="attention">
      <span class="attention-text">{{ i18n.internship.attention1 }}</span>
      <div>
        <span>{{ i18n.internship.attention1Desc1 }}</span>
        <OLink class="contact" :href="internshipTaskLinks.aiCodingAssistants" target="_blank">{{ i18n.internship.attention1Link }}</OLink>
        <span>{{ i18n.internship.attention1Desc2 }}</span>
      </div>
    </div>
    <div class="attention">
      <span class="attention-text">{{ i18n.internship.attention2 }}</span>
      <div>
        <span>{{ i18n.internship.attention2Desc1 }}</span>
        <span class="code">{{ i18n.internship.attention2Code }}</span>
        <span>{{ i18n.internship.attention2Desc2 }}</span>
      </div>
    </div>
    <div class="flow-img">
      <img :src="flowImg" alt="flow" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.submit-task-container {
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
  background-color: rgba(var(--o-grey-5), .4);
  color: var(--o-color-info1);
  margin-left: 4px;
  margin-right: 4px;
  white-space: nowrap;
}

.submit-task-title {
  @include h3;
  margin-bottom: 16px;
  color: var(--o-color-info1);
}

.step {
   margin-bottom: 8px;

   &:last-child {
    margin-bottom: 16px;
   }
}

.attention {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .attention-text {
    font-weight: 600;
    white-space: nowrap;
    color: var(--o-color-info1);
  }

  .contact {
    color: var(--o-color-primary1);
    cursor: pointer;
    &:hover {
      color: var(--o-color-primary2);
      text-decoration: underline;
    }
  }
}

.attention + .attention {
  margin-top: 8px;
}

.flow-img {
  margin-top: 16px;

  img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }
}

.mobile-submit-task {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}
</style>
