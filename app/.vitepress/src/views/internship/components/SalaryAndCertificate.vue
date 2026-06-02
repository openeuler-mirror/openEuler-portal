<script setup lang="ts">
import { OButton, OTable, type TableColumnT, OLink } from '@opensig/opendesign';
import IconDownload from '~icons/app/icon-download.svg';
import { EMAIL_ADDRESS, internshipCertTemplate } from './types';
import { useScreen } from '~@/composables/useScreen';
import { downloadByUrl } from '@/shared/download';
import { computed } from 'vue';
import { useI18n } from '@/i18n';

const i18n = useI18n();
const { lePadV } = useScreen();

const columns = computed<TableColumnT[]>(() => [
  { label: i18n.value.internship.scoreTable, key: 'score', style: { width: '80px' } },
  { label: i18n.value.internship.score1, key: 's1', style: { width: '90px' } },
  { label: i18n.value.internship.score2, key: 's2', style: { width: '90px' } },
  { label: i18n.value.internship.score3, key: 's3', style: { width: '90px' } },
  { label: i18n.value.internship.score4, key: 's4', style: { width: '90px' } },
  { label: i18n.value.internship.score5, key: 's5', style: { width: '90px' } },
  { label: i18n.value.internship.score6, key: 's6', style: { width: '90px' } },
  { label: i18n.value.internship.score7, key: 's7', style: { width: '100px' } },
]);

const tableData = computed(() => [{
  score: i18n.value.internship.salaryTable,
  s1: i18n.value.internship.salary1,
  s2: i18n.value.internship.salary2,
  s3: i18n.value.internship.salary3,
  s4: i18n.value.internship.salary4,
  s5: i18n.value.internship.salary5,
  s6: i18n.value.internship.salary6,
  s7: i18n.value.internship.salary7,
}]);

const mobileColumns = computed<TableColumnT[]>(() => [
  { label: i18n.value.internship.scoreTable, key: 'label', style: { width: '50%' } },
  { label: i18n.value.internship.salaryTable, key: 'value', style: { width: '50%' } },
]);

const mobileTableData = computed(() => [
  { label: i18n.value.internship.score1, value: i18n.value.internship.salary1 },
  { label: i18n.value.internship.score2, value: i18n.value.internship.salary2 },
  { label: i18n.value.internship.score3, value: i18n.value.internship.salary3 },
  { label: i18n.value.internship.score4, value: i18n.value.internship.salary4 },
  { label: i18n.value.internship.score5, value: i18n.value.internship.salary5 },
  { label: i18n.value.internship.score6, value: i18n.value.internship.salary6 },
  { label: i18n.value.internship.score7, value: i18n.value.internship.salary7 },
]);
</script>

<template>
  <div class="salary-and-certificate-container" :class="{'mobile-salary-and-certificate': lePadV}">
    <h2 class="salary-and-certificate-title">{{ i18n.internship.salaryAndCertificateTitle }}</h2>
    <div class="step">{{ i18n.internship.salaryAndCertificateDesc1 }}</div>
    <OTable border="all" v-if="!lePadV" :columns="columns" :data="tableData" class="salary-table" />
    <OTable border="all" v-else :columns="mobileColumns" :data="mobileTableData" class="mobile-salary-table" />
    <div class="step">
      <span>{{ i18n.internship.applyCertificate1 }}</span>
      <span class="certificate">{{ i18n.internship.applyCertificate2 }}</span>
      <span>{{ i18n.internship.applyCertificate3 }}</span>
      <OLink class="contact" :href="`mailto:${EMAIL_ADDRESS}`">{{ EMAIL_ADDRESS }}</OLink>
      <span>{{ i18n.internship.salaryAndCertificateDesc3 }}</span>
    </div>
    <div class="attention">
      <span class="attention-text">{{ i18n.internship.attention }}</span>
      <div>
        <p>{{ i18n.internship.salaryAndCertificateDesc4 }}</p>
        <p>{{ i18n.internship.salaryAndCertificateDesc5 }}</p>
      </div>
    </div>
    <div class="download-file">
      <OButton
        variant="outline"
        size="small"
        class="icon-download"
        color="primary"
        @click="downloadByUrl(internshipCertTemplate.file, internshipCertTemplate.filename)"
        :icon="IconDownload"
      >
        {{ i18n.internship.internshipCertTemplate }}
      </OButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.salary-and-certificate-container {
  background-color: var(--o-color-control2-light);
  padding: 24px;
  border-radius: 4px;
  color: var(--o-color-info2);
  @include text1;
}

.salary-and-certificate-title {
  @include h3;
  margin-bottom: 16px;
  color: var(--o-color-info1);
}

.certificate {
  font-weight: 600;
}

.step {
   margin-bottom: 8px;

   &:last-child {
    margin-bottom: 16px;
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

.salary-table {
  margin-bottom: 16px;

  :deep(.o-table-border-all) {
    border: none;
  }

  :deep(th),
  :deep(td) {
    font-size: 14px;
    background-color: var(--o-color-fill2) !important;
    line-height: 22px;
    height: 32px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-right: 1px solid var(--o-color-control4);
  }

  :deep(th) {
    border-bottom: 1px solid var(--o-color-control4);
    border-top: 1px solid var(--o-color-control4);
    &:first-child {
      border-left: 1px solid var(--o-color-control4);
      border-right: 1px solid var(--o-color-primary1);
      font-weight: 600;
    }
  }

  :deep(td) {
    border-bottom-color: var(--o-color-control4) !important;
    &:first-child {
      border-left: 1px solid var(--o-color-control4);
      border-right: 1px solid var(--o-color-primary1);
      font-weight: 600;
    }
  }
}

.attention {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  .attention-text {
    font-weight: 600;
    white-space: nowrap;
    margin-right: 8px;
    color: var(--o-color-info1);
  }
}

.download-file {
  margin-top: 8px;

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

.icon-download {
  font-size: 14px;
}

.mobile-salary-and-certificate {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

.mobile-salary-table {
  margin-bottom: 16px;

  :deep(.o-table-border-all) {
    border: none;
  }

  :deep(th),
  :deep(td) {
    font-size: 14px;
    background-color: var(--o-color-fill2) !important;
    line-height: 22px;
    height: 32px;
    padding-bottom: 5px;
    padding-top: 5px;
    border-right: 1px solid var(--o-color-control4);
  }

  :deep(th) {
    font-weight: 600;
    border-bottom: 1px solid var(--o-color-primary1);
    border-top: 1px solid var(--o-color-control4);
    &:first-child {
      border-left: 1px solid var(--o-color-control4);
    }
  }

  :deep(td) {
    border-bottom-color: var(--o-color-control4) !important;
    &:first-child {
      border-left: 1px solid var(--o-color-control4);
    }
  }
}
</style>
