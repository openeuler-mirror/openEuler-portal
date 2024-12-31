<script setup lang="ts">
import { ref } from 'vue';
import {
  ORadio,
  ORadioGroup,
  OToggle,
  OIcon,
  OSelect,
  OOption,
  DialogActionT,
  ODialog,
} from '@opensig/opendesign';
import { useVModel } from '@vueuse/core';

import AppFilterMo from '~@/components/AppFilterMo.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import IconVersion from '~icons/download/version.svg';
import { useLocale } from '~@/composables/useLocale';

const props = defineProps({
  versionList: {
    type: Object,
    default() {
      return [];
    },
  },
  modelValue: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);

const { t } = useLocale();
const activeVersion = useVModel(props, 'modelValue', emit);
const isShownDialog = ref(false);
const handleToggleDrawer = () => {
  isShownDialog.value = !isShownDialog.value;
};
const dlgAction: DialogActionT[] = [
  {
    id: 'reset',
    label: t('common.reset'),
    variant: 'text',
    size: 'small',
    onClick: () => {
      activeVersion.value = '';
    },
  },
  {
    id: 'confirm',
    variant: 'text',
    label: t('common.confirm'),
    size: 'small',
    onClick: () => {
      handleToggleDrawer();
    },
  },
];
</script>
<template>
  <div class="download-detail-filter">
    <div class="filter-title">
      <OIcon>
        <IconVersion />
      </OIcon>
      <span class="version">{{ $t('download.VERSION') }}</span>
    </div>
    <ORadioGroup v-model="activeVersion">
      <ORadio v-for="version in versionList" :value="version.Version">
        {{ version.Version }}
      </ORadio>
    </ORadioGroup>
  </div>
  <OSelect v-model="activeVersion" size="large">
    <OOption
      v-for="itemData in versionList"
      :key="itemData.Version"
      :label="itemData.Version"
      :value="itemData.Version"
    />
  </OSelect>
  <ContentWrapper>
    <AppFilterMo
      @click="isShownDialog = true"
      :label="$t('download.versionFilter')"
    />
  </ContentWrapper>
  <!--移动端筛选-->
  <ClientOnly>
    <ODialog
      v-model:visible="isShownDialog"
      :show-close="true"
      :actions="dlgAction"
      :style="{
        '--dlg-radius': 'var(--o-radius-s)',
      }"
      custom-class="filter-drawer"
      size="medium"
    >
      <template #header>
        {{ $t('common.filter') }}
      </template>
      <div class="filter-drawer-title">
        {{ t('download.VERSION') }}
      </div>
      <ORadioGroup v-model="activeVersion">
        <ORadio
          v-for="option in versionList"
          :key="option.Version"
          :value="option.Version"
        >
          <template #radio="{ checked }">
            <OToggle :checked="checked">{{ option.Version }}</OToggle>
          </template>
        </ORadio>
      </ORadioGroup>
    </ODialog>
  </ClientOnly>
</template>
<style lang="scss" scoped>
.download-detail-filter {
  min-width: 276px;
  @include respond-to('<=laptop') {
    display: none;
  }
  .filter-title {
    display: flex;
    .o-icon {
      margin-right: 8px;
      font-size: var(--o-icon_size-m);
    }
    .version {
      @include text1;
    }
  }
  .o-radio-group {
    margin-top: 16px;
    margin-left: 31px;
    justify-content: left;
    flex-direction: column;
    align-items: flex-start;
    .o-radio {
      margin: 0;
      @include text1;
      & + .o-radio {
        margin-top: 16px;
      }
    }
  }
}
.o-select {
  display: none;
  @include respond-to('pad_v-laptop') {
    display: inline-flex;
    max-width: 312px;
  }
}
.content-wrapper {
  margin: 0;
  display: none;
  @include respond-to('<=pad_v') {
    display: block;
  }
}

.o-dlg-body-content {
  .filter-drawer-title {
    font-weight: 500;
    @include h4;
  }
  .o-radio-group {
    margin-top: 12px;
    .o-radio {
      margin: 8px 8px 0 0;
    }
  }
}
</style>
