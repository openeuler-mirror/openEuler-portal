<script setup lang="ts">
import { OIcon, OLink } from '@opensig/opendesign';
import IconSalary from '~icons/app/icon-internship-salary.svg';
import IconCertificate from '~icons/app/icon-internship-certificate.svg';
import IconOutstanding from '~icons/app/icon-outstanding-internship-cerficate.svg';
import IconCheckMark from '~icons/app/icon-check-mark.svg';
import salaryBgLight from '@/assets/category/internship/internship-salary-bg-light.png';
import salaryBgDark from '@/assets/category/internship/internship-salary-bg-dark.png';
import certificateBgLight from '@/assets/category/internship/internship-certificate-bg-light.png';
import certificateBgDark from '@/assets/category/internship/internship-certificate-bg-dark.png';
import outstandingBgLight from '@/assets/category/internship/outstanding-internship-bg-light.png';
import outstandingBgDark from '@/assets/category/internship/outstanding-internship-bg-dark.png';
import { EMAIL_ADDRESS } from './types';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

const i18n = useI18n();
const commonStore = useCommon();

const isDark = computed(() => {
  return commonStore.theme === 'dark' ? true : false;
});

const rewardCards = computed(() => [
  {
    title: i18n.value.internship.rewardCardTitle1,
    icon: IconSalary,
    bg: isDark.value ? salaryBgDark : salaryBgLight,
    items: [
      i18n.value.internship.rewardSalary1,
      i18n.value.internship.rewardSalary2,
    ],
  },
  {
    title: i18n.value.internship.rewardCardTitle2,
    icon: IconCertificate,
    bg: isDark.value ? certificateBgDark : certificateBgLight,
    items: [
      i18n.value.internship.report1,
      i18n.value.internship.report2,
      i18n.value.internship.report3,
    ],
    desc: i18n.value.internship.rewardCardDesc2,
  },
  {
    title: i18n.value.internship.rewardCardTitle3,
    icon: IconOutstanding,
    bg: isDark.value ? outstandingBgDark : outstandingBgLight,
    items: [
      i18n.value.internship.excellentComment1,
      i18n.value.internship.excellentComment2,
    ],
    desc: i18n.value.internship.rewardCardDesc3,
    hasEmail: true,
  },
]);
</script>

<template>
  <div class="internship-reward-container">
    <div class="reward-card-list">
      <div
        v-for="(card, index) in rewardCards"
        :key="index"
        class="reward-card"
        :style="{ backgroundImage: `url(${card.bg})` }"
      >
        <div class="card-header">
          <OIcon class="card-icon"><component :is="card.icon" /></OIcon>
          <h3 class="card-title">{{ card.title }}</h3>
        </div>
        <div class="reward-content">
          <ul class="card-items">
            <li v-for="(item, i) in card.items" :key="i" class="card-item">
              <OIcon class="check-icon"><IconCheckMark /></OIcon>
              <span>{{ item }}</span>
            </li>
          </ul>
          <p v-if="card.desc" class="card-desc">
            {{ card.desc }}
            <OLink v-if="card.hasEmail" class="contact-email" :href="`mailto:${EMAIL_ADDRESS}`">{{ EMAIL_ADDRESS }}</OLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.internship-reward-container {
  border-radius: 4px;
}

.reward-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.reward-content {
  background-color: var(--o-color-info3-inverse);
  padding: 16px;
  flex: 1;
  border-radius: 4px;
  border: 1px solid var(--o-color-fill2);
  color: var(--o-color-info2);
  @include text1;
  display: flex;
  flex-direction: column;
}

.reward-card {
  flex: 0 0 calc(33.33% - 11px);
  border-radius: 4px;
  padding: 20px;
  background-size: cover;
  background-position: right center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  .card-icon {
    --icon-size: 24px;
    margin-right: 8px;
    color: var(--o-color-info1);

    svg {
      fill: none;
    }

    :deep(path) {
      fill: currentColor;
    }
  }

  .card-title {
    @include h4;
  }
}

.card-items {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
}

.card-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  svg {
    fill: none;
    color: var(--o-color-info1);
  }

  :deep(path) {
    fill: currentColor;
  }

  &:last-child {
    margin-bottom: 0;
  }

  .check-icon {
    --icon-size: 16px;
    margin-right: 6px;
    flex-shrink: 0;
    margin-top: 4px;
    color: var(--o-color-info2);
  }
}

.card-desc {
  color: var(--o-color-text2);
  font-size: 14px;
  line-height: 22px;
  margin-top: auto;
  padding-top: 12px;
  border-top: 1px solid var(--o-color-control4);

  .contact-email {
    color: var(--o-color-primary1);

    &:hover {
      color: var(--o-color-primary2);
      text-decoration: underline;
    }
  }
}

@media screen and (max-width: 840px) {
  .reward-card {
    flex: 0 0 100% !important;
    padding: 12px;
  }
}
</style>
