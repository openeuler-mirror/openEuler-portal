<script lang="ts" setup>
import { ref, computed, watch, reactive } from 'vue';
import { OIcon, OTable, OSelect, OOption, OTab, OTabPane, ORadioGroup, ORadio, OToggle, OButton, OLink } from '@opensig/opendesign';

import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';

import IconOutLink from '~icons/app-new/icon-outlink-new.svg';
import IconDownload from '~icons/app-new/icon-download.svg';

import nestosContent from '#content/nestos';

const { t } = useLocale();

type Arch = 'x86' | 'arm';
const activeArch = ref<Arch>('x86');

interface PkgItem {
  name: string;
  path: string;
}

interface VersionGroup {
  date_title: string;
  x86_list: PkgItem[];
  arm_list: PkgItem[];
}

const mirrorVersions = computed(() => nestosContent.zh.mirror_versions);

// Per-row selected package index (reactive array for v-model compatibility)
const selectedIdx = reactive<number[]>(mirrorVersions.value.map(() => 0));

// Reset selections when arch changes
watch(activeArch, () => {
  mirrorVersions.value.forEach((_, i) => {
    selectedIdx[i] = 0;
  });
});

const getList = (v: VersionGroup) =>
  activeArch.value === 'x86' ? v.x86_list : v.arm_list;

const tableColumns = computed(() => [
  { label: t('nestos.mirrorPackage'), key: 'version', style: { width: '30%' } },
  { label: t('nestos.mirrorRepo'), key: 'name', style: { width: '60%' } },
  { label: t('nestos.mirrorDownloadCol'), key: 'action', style: { width: '10%' } },
]);

// Table rows: one per version group (static — mirrorVersions never changes)
const tableData = mirrorVersions.value.map((v, i) => ({ vIdx: i, version: v.date_title }));

const docLinks = computed(() => nestosContent.zh.doc_links);

const otherLinks = computed(() => nestosContent.zh.other_links);
</script>

<template>
  <AppSection :title="t('nestos.resourcesTitle')">
    <OTab default-value="mirror" variant="text" :line="false" class="resource-tab">

      <!-- 镜像下载 -->
      <OTabPane value="mirror" :label="t('nestos.mirrorTab')">
        <div class="resource-card">
          <!-- 架构筛选 -->
          <div class="arch-filter">
            <span class="arch-label">{{ t('nestos.archTitle') }}</span>
            <ORadioGroup v-model="activeArch" class="arch-radio-group">
              <ORadio value="x86">
                <template #radio="{ checked }">
                  <OToggle :checked="checked">{{ t('nestos.archX86') }}</OToggle>
                </template>
              </ORadio>
              <ORadio value="arm">
                <template #radio="{ checked }">
                  <OToggle :checked="checked">{{ t('nestos.archArm') }}</OToggle>
                </template>
              </ORadio>
            </ORadioGroup>
          </div>

          <!-- OTable 下载表格 -->
          <OTable :data="tableData" :columns="tableColumns" border="row-frame" class="mirror-table">
            <template #td_version="{ row }">
              <span class="version-tag">{{ row.version }}</span>
            </template>
            <template #td_name="{ row }">
              <OSelect
                v-model="selectedIdx[row.vIdx]"
                class="repo-select"
                size="medium"
              >
                <OOption
                  v-for="(pkg, pIdx) in getList(mirrorVersions[row.vIdx])"
                  :key="pIdx"
                  :label="pkg.name"
                  :value="pIdx"
                />
              </OSelect>
            </template>
            <template #td_action="{ row }">
              <OButton
                variant="solid"
                color="primary"
                size="small"
                :href="getList(mirrorVersions[row.vIdx])[selectedIdx[row.vIdx]]?.path"
                class="download-btn"
              >
                <OIcon class="download-icon"><IconDownload /></OIcon>
                {{ t('nestos.immediateDownload') }}
              </OButton>
            </template>
          </OTable>
        </div>
      </OTabPane>

      <!-- 文档 -->
      <OTabPane value="document" :label="t('nestos.documentTab')">
        <div class="resource-card">
          <div
            v-for="(item, i) in docLinks"
            :key="i"
            class="link-item"
          >
            <p class="link-title">{{ t(item.title_key) }}</p>
            <OLink
              :href="item.href"
              target="_blank" rel="noopener noreferrer"
              color="primary"
            >
              {{ t('nestos.learnMore') }}
              <template #suffix>
                <OIcon class="outlink-icon"><IconOutLink /></OIcon>
              </template>
            </OLink>
          </div>
        </div>
      </OTabPane>

      <!-- 其他 -->
      <OTabPane value="other" :label="t('nestos.otherTab')">
        <div class="resource-card">
          <div
            v-for="(item, i) in otherLinks"
            :key="i"
            class="link-item"
          >
            <p class="link-title">{{ t(item.title_key) }}</p>
            <OLink
              :href="item.href"
              target="_blank" rel="noopener noreferrer"
              color="primary"
            >
              {{ t('nestos.learnMore') }}
              <template #suffix>
                <OIcon class="outlink-icon"><IconOutLink /></OIcon>
              </template>
            </OLink>
          </div>
        </div>
      </OTabPane>

    </OTab>
  </AppSection>
</template>

<style scoped lang="scss">
.resource-tab {
  :deep(.o-tab-navs) {
    --tab-nav-justify: center;
    margin-bottom: 24px;
  }
}

.resource-card {
  width: 100%;
  background-color: var(--o-color-fill2);
  border-radius: 4px;
  padding: 24px 32px 16px;
}

.arch-filter {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.arch-label {
  font-weight: 500;
  color: var(--o-color-info1);
  flex-shrink: 0;
  margin-right: 32px;
  @include text1;
}

.arch-radio-group {
  display: flex;
  .o-radio + .o-radio {
    margin-left: 8px;
  }
}

.mirror-table {
  width: 100%;
  --table-edge-padding: 40px;
  --table-cell-padding: 12px 20px;

  :deep(.o-table-wrap) {
    overflow: visible;
    &::-webkit-scrollbar {
      display: block;
    }
  }

  :deep(thead th) {
    font-weight: 500;
    color: var(--o-color-info1);
    @include text1;
  }
}

.version-tag {
  font-weight: 500;
  color: var(--o-color-info1);
  @include text1;
}

.repo-select {
  width: 70%;
}

.download-btn {
  width: 112px;
  --btn-height: 28px;
  --btn-border-radius: 100px;
  white-space: nowrap;
}

.download-icon {
  --icon-size: 16px;
  margin-right: 4px;
}

// 文档 / 其他 tab 样式
.link-title {
  font-weight: 600;
  color: var(--o-color-info1);
  @include text1;
}

:deep(.o-link) {
  margin-top: 8px;
  padding: 8px 0;
  @include text1;
}
.outlink-icon {
  --icon-size: 24px;
}

@include respond('<=laptop') {
  .outlink-icon {
    --icon-size: 16px;
  }
}

@include respond('laptop') {
  .resource-card {
    padding: 24px 24px 16px;
  }
}

@include respond('pad_h') {
  .resource-card {
    padding: 16px 16px 8px;
  }
}

@include respond('<=pad_v') {
  .tab-btn {
    padding: 8px 16px;
    font-size: 16px;
  }

  .resource-card {
    padding: 12px 16px 4px;
  }

  .mirror-table {
    :deep(thead th),
    :deep(tbody td) {
      padding: 10px;
      font-size: 12px;
    }
  }

  .repo-select {
    width: 100%;
  }

  .download-btn {
    padding: 5px 10px;
    font-size: 12px;
  }

  :deep(.o-link) {
    @include text2;
  }
}

@include respond('phone') {
  .mirror-table {
    overflow-x: auto;

    :deep(table) {
      min-width: 480px;
    }
  }
}
</style>
