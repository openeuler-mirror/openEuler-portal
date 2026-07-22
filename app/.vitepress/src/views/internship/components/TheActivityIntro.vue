<script setup lang="ts">
import { OLink, OIcon } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';
import IconApply from '~icons/app/icon-apply-internship.svg';
import IconReceive from '~icons/app/icon-receive-task.svg';
import IconSubmit from '~icons/app/icon-submit-result.svg';
import IconCertificate from '~icons/app/icon-salary-certificate.svg';
import IconTriangle from '~icons/app/icon-triangle-arrow.svg';
import IconChevronDown from '~icons/app/icon-chevron-down.svg';
import { EMAIL_ADDRESS, InternshipStep } from './types';
import ApplyInternship from './ApplyInternship.vue';
import ReceiveTask from './ReceiveTask.vue';
import SubmitTask from './SubmitTask.vue';
import SalaryAndCertificate from './SalaryAndCertificate.vue';
import { useI18n } from '@/i18n';
import { ref } from 'vue';

const { lePadV } = useScreen();
const i18n = useI18n();

const activeStep = ref(InternshipStep.APPLY);
const expandedSteps = ref<Set<InternshipStep>>(new Set([InternshipStep.APPLY]));

const stepList = [
  {
    title: i18n.value.internship.step1,
    icon: IconApply,
    val: InternshipStep.APPLY,
  },
  {
    title: i18n.value.internship.step2,
    icon: IconReceive,
    val: InternshipStep.RECEIVE,
  },
  {
    title: i18n.value.internship.step3,
    icon: IconSubmit,
    val: InternshipStep.SUBMIT,
  },
  {
    title: i18n.value.internship.step4,
    icon: IconCertificate,
    val: InternshipStep.SALARY,
  },
];

const handleStepClick = (clickedStep: InternshipStep) => {
  activeStep.value = clickedStep;
};

const toggleMobileStep = (step: InternshipStep) => {
  if (expandedSteps.value.has(step)) {
    expandedSteps.value.delete(step);
  } else {
    expandedSteps.value.add(step);
  }
};

const isExpanded = (step: InternshipStep) => expandedSteps.value.has(step);
</script>

<template>
  <div class="activity-intro" v-if="!lePadV">
    <div class="activity-intro-container">
      <p>{{ i18n.internship.activityDesc1 }}</p>
      <div class="intro-contact">
        <span>{{ i18n.internship.activityDesc2 }}</span>
        <OLink class="contact" :href="`mailto:${EMAIL_ADDRESS}`">{{ EMAIL_ADDRESS }}</OLink>
      </div>
      <div class="steps-container">
        <div class="custom-steps">
          <div class="steps-icons-row">
            <div class="step-lines">
              <div class="step-line"></div>
              <div class="step-line"></div>
              <div class="step-line"></div>
            </div>
            <div
              v-for="step in stepList"
              :key="step.val"
              class="step-icon-wrapper"
              :class="{ active: activeStep === step.val}"
              @click="handleStepClick(step.val)"
            >
              <component :is="step.icon" />
            </div>
          </div>
          <div class="steps-titles-row">
            <div
              v-for="step in stepList"
              :key="step.val"
              class="step-title"
              :class="{ active: activeStep === step.val }"
              @click="handleStepClick(step.val)"
            >
              <span>{{ step.title }}</span>
              <div v-if="activeStep === step.val" class="step-title-arrow">
                <component :is="IconTriangle" />
              </div>
            </div>
          </div>
        </div>
        <div class="step-content">
          <ApplyInternship v-if="activeStep === InternshipStep.APPLY" />
          <ReceiveTask v-if="activeStep === InternshipStep.RECEIVE" />
          <SubmitTask v-if="activeStep === InternshipStep.SUBMIT" />
          <SalaryAndCertificate v-if="activeStep === InternshipStep.SALARY" />
        </div>
      </div>
    </div>
  </div>
  <!-- 移动端 -->
  <div v-else class="mobile-container">
    <div class="mobile-activity-intro">
      <p>{{ i18n.internship.activityDesc1 }}</p>
      <div class="mobile-contact">
        <span>{{ i18n.internship.activityDesc2 }}</span>
        <OLink class="contact" :href="`mailto:${EMAIL_ADDRESS}`">{{ EMAIL_ADDRESS }}</OLink>
      </div>
    </div>
    <div class="mobile-step-list">
      <div
        v-for="step in stepList"
        :key="step.val"
        class="mobile-step-item"
      >
        <div
          class="mobile-step-header"
          :class="{ active: isExpanded(step.val) }"
          @click="toggleMobileStep(step.val)"
        >
          <div class="mobile-step-title">
            <component :is="step.icon" />
            <span>{{ step.title }}</span>
          </div>
          <OIcon
            class="chevron-icon"
            :class="{ expanded: isExpanded(step.val) }"
          >
            <IconChevronDown />
          </OIcon>
        </div>
        <div
          v-if="isExpanded(step.val)"
          class="mobile-step-content"
        >
          <ApplyInternship v-if="step.val === InternshipStep.APPLY" />
          <ReceiveTask v-if="step.val === InternshipStep.RECEIVE" />
          <SubmitTask v-if="step.val === InternshipStep.SUBMIT" />
          <SalaryAndCertificate v-if="step.val === InternshipStep.SALARY" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.activity-intro-container {
  background-color: var(--o-color-fill2);
  padding: 24px;
  border-radius: 4px;
  color: var(--o-color-info2);

  p {
    color: var(--o-color-info2);
    @include text1;
  }

  .o-link {
    color: var(--o-color-primary1);
    @include text1;

    &:hover {
      color: var(--o-color-primary2);
      text-decoration: underline;
    }
  }
}

.activity-desc-list {
  list-style: disc;
  padding-left: 20px;
  color: var(--o-color-info2);
  margin-top: 16px;
  margin-bottom: 16px;
  @include text1;

  li::marker {
    font-size: 12px;
  }
}

.steps-container {
  margin-top: 24px;
}

.goto-receive-task {
  display: flex;
  align-items: center;

  .receive-task-link {
    color: var(--o-color-primary1);
    cursor: pointer;

    &:hover {
      color: var(--o-color-primary2);
    }
  }

  .jump-out-icon {
    --icon-size: 16px;
    margin-left: 4px;
    color: var(--o-color-primary1);
  }

  &:hover .receive-task-link,
  &:hover .jump-out-icon {
    color: var(--o-color-primary2);
  }
}

.custom-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.steps-icons-row {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.step-lines {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .step-line {
    position: absolute;
    height: 2px;
    background: var(--o-color-control4);

    &:nth-child(1) {
      left: calc(12.5% + 24px);
      width: calc(25% - 48px);
    }

    &:nth-child(2) {
      left: calc(37.5% + 24px);
      width: calc(25% - 48px);
    }

    &:nth-child(3) {
      left: calc(62.5% + 24px);
      width: calc(25% - 48px);
    }
  }
}

.step-icon-wrapper {
  flex: 0 0 25%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  z-index: 1;

  :deep(svg) {
    width: 32px;
    height: 32px;

    path {
      fill: var(--o-color-control3) !important;
    }
  }

  &.active {
    :deep(svg) {
      path {
        fill: var(--o-color-primary1) !important;
      }
    }
  }
}

.steps-titles-row {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  width: 100%;
}

.step-title {
  flex: 1;
  font-weight: 400;
  color: var(--o-color-info3);
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  @include text1;

  &.active {
    color: var(--o-color-primary1);
    font-weight: 500;
  }
}

.step-title-arrow {
  height: 16px;
  color: var(--o-color-control2-light);
  margin-top: 8px;
  &:deep(svg) {
    path {
      fill: currentColor;
    }
  }
}

.intro-contact {
  @include text1;
  @include title-margin-top4;
}

.mobile-activity-intro {
  background-color: var(--o-color-fill2);
  padding: 12px;
  border-radius: 4px;
  color: var(--o-color-info2);

  p {
    color: var(--o-color-info2);
    @include text1;
  }

  .mobile-contact {
    color: var(--o-color-info2);
    margin-top: 8px;
    @include text1;
  }

  .o-link {
    color: var(--o-color-primary1);
    @include text1;

    &:hover {
      color: var(--o-color-primary2);
      text-decoration: underline;
    }
  }
}

.mobile-step-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-step-item {
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--o-color-fill2);
}

.mobile-step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  cursor: pointer;

  .mobile-step-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;

    :deep(svg) {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      path {
        fill: var(--o-color-control3) !important;
      }
    }
  }

  .chevron-icon {
    --icon-size: 20px;
    color: var(--o-color-text2);

    &.expanded {
      transform: rotate(180deg);
    }
  }

  &.active {
    color: var(--o-color-primary1);

    :deep(svg) {
      path {
        fill: var(--o-color-primary1) !important;
      }
    }

    .chevron-icon {
      color: var(--o-color-primary1);
    }
  }
}

.mobile-step-content {
  position: relative;
  padding: 12px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--o-color-control4);
  }
}

@include respond('>pc_b') {
  .activity-intro-container {
    padding: 32px;
  }
}
</style>
