<script lang="ts" setup>
import { ref } from 'vue';
import { OButton, ODialog } from '@opensig/opendesign';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  href: {
    type: String,
    required: true,
    default: () => '',
  },
});
const showDlg = ref(true);
const { t } = useI18n();

const emits = defineEmits<{
  (e: 'change'): void;
}>();

const jumpOut = () => {
  emits('change');
  window.open(props.href, '_blank');
};

const onChange = () => {
  emits('change');
};
</script>

<template>
  <ODialog
    v-model:visible="showDlg"
    :unmount-on-hide="true"
    :style="{
      '--dlg-radius': 'var(--o-radius-s)',
    }"
    @change="onChange"
  >
    <template #header>
      <p class="external-title">{{ t('search.externalTipTitle') }}</p>
    </template>
    <div class="external-content">
      <p class="text">{{ t('search.externalTipText') }}</p>
      <div class="content-link">
        <div class="external-link-href" :title="href">{{ href }}</div>
      </div>
    </div>
    <template #footer>
      <div class="dlg-action">
        <OButton variant="solid" size="large" color="primary" @click="jumpOut">
          {{ t('search.externalBtn1') }}
        </OButton>
        <OButton
          variant="outline"
          size="large"
          color="primary"
          @click="onChange"
        >
          {{ t('search.externalBtn2') }}
        </OButton>
      </div>
    </template>
  </ODialog>
</template>

<style lang="scss" scoped>
.dlg-action {
  display: flex;
  justify-content: center;
  .o-btn + .o-btn {
    margin-left: 16px;
  }
}
.external-content {
  margin: 0 0 24px;
  max-width: 600px;
  .text {
    color: var(--o-color-info1);
    @include text2;
  }
  .content-link {
    color: var(--o-color-info2);
    margin-top: 24px;
    word-break: break-all;
    @include text2;
    .external-link-href {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      position: relative;
      word-break: break-all;
    }
  }
}
</style>
